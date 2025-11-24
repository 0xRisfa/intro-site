import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import TerminalLine from "./TerminalLine";
import { useTerminal } from "./TerminalProvider";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TerminalOutput = ({
  sectionId,
  lines = [],
  promptLabel,
  speed,
  preserveWhitespace = false,
}) => {
  TerminalOutput.propTypes = {
    sectionId: PropTypes.string.isRequired,
    lines: PropTypes.arrayOf(PropTypes.string),
    promptLabel: PropTypes.string,
    speed: PropTypes.number,
    preserveWhitespace: PropTypes.bool,
  };
  const [printed, setPrinted] = useState([]);
  const leftColWidth = React.useMemo(() => {
    let max = 0;
    for (let ln of lines) {
      if (typeof ln === "string" && ln.includes("|||")) {
        const left = ln.split("|||")[0];
        if (left.length > max) max = left.length;
      }
    }
    return max;
  }, [lines]);
  const mountedRef = useRef(true);
  const containerRef = useRef(null);
  const { registerInput, unregisterInput, isSuppressed, wasClearedRecently } = useTerminal() || {};

  useEffect(() => {
    mountedRef.current = true;
    let cancelled = false;
    let localCancel = { value: false };
    const clearOutput = () => {
      localCancel.value = true;
      setPrinted([]);
    };

    // register a clear handler with the terminal controller so 'clear' actually clears this output
    if (registerInput && typeof registerInput === "function") {
      // also reset suppression when a component mounts
      registerInput(sectionId, { clearOutput, suppress: false });
    }

    // if this section has been suppressed by a recent clearAll, or was just cleared, don't start printing
    if (isSuppressed && typeof isSuppressed === "function" && isSuppressed(sectionId)) {
      return () => {
        // cleanup
        if (unregisterInput && typeof unregisterInput === "function") unregisterInput(sectionId);
      };
    }
    if (
      wasClearedRecently &&
      typeof wasClearedRecently === "function" &&
      wasClearedRecently(sectionId)
    ) {
      return () => {
        if (unregisterInput && typeof unregisterInput === "function") unregisterInput(sectionId);
      };
    }

    const run = async () => {
      const charSpeed = typeof speed === "number" ? speed : 18;
      const charRand = typeof speed === "number" ? 0 : 12;
      const linePause = typeof speed === "number" ? Math.max(20, speed * 3) : 60;
      for (let ln of lines) {
        if (cancelled || localCancel.value) return;
        if (isSuppressed && typeof isSuppressed === "function" && isSuppressed(sectionId)) return;
        if (
          wasClearedRecently &&
          typeof wasClearedRecently === "function" &&
          wasClearedRecently(sectionId)
        )
          return;
        setPrinted((p) => [...p, ""]);
        for (let i = 0; i <= ln.length; i++) {
          if (cancelled || localCancel.value) return;
          if (isSuppressed && typeof isSuppressed === "function" && isSuppressed(sectionId)) return;
          if (
            wasClearedRecently &&
            typeof wasClearedRecently === "function" &&
            wasClearedRecently(sectionId)
          )
            return;
          setPrinted((p) => {
            const copy = [...p];
            copy[copy.length - 1] = ln.slice(0, i);
            return copy;
          });
          await sleep(charSpeed + Math.random() * charRand);
        }
        await sleep(linePause);
      }
    };

    run();

    return () => {
      cancelled = true;
      localCancel.value = true;
      mountedRef.current = false;
      if (unregisterInput && typeof unregisterInput === "function") {
        unregisterInput(sectionId);
      }
    };
  }, [lines]);

  // after output, render an interactive prompt line (TerminalLine)
  return (
    <div ref={containerRef}>
      {printed.map((l, i) => {
        const full = lines[i] || "";
        const isSplit = typeof full === "string" && full.includes("|||");
        if (isSplit) {
          const parts = l.split("|||");
          const left = parts[0] || "";
          const right = parts[1] || "";
          return (
            <div key={i} style={{ display: "block", whiteSpace: "nowrap" }}>
              <span
                className="terminal-left"
                style={{
                  display: "inline-block",
                  width: leftColWidth ? `${leftColWidth}ch` : "auto",
                  fontFamily: "'Source Code Pro', monospace",
                  whiteSpace: "pre",
                }}
              >
                {left}
              </span>
              <span
                className="terminal-right"
                style={{
                  display: "inline-block",
                  verticalAlign: "top",
                  whiteSpace: preserveWhitespace ? "pre-wrap" : "pre-line",
                  wordBreak: "break-word",
                  marginLeft: "5ch",
                }}
              >
                {right}
              </span>
            </div>
          );
        }
        return (
          <div
            key={i}
            style={{
              whiteSpace: preserveWhitespace ? "pre-wrap" : "pre-line",
              wordBreak: "break-word",
            }}
          >
            {l}
          </div>
        );
      })}
      <div style={{ marginTop: 8 }}>
        <TerminalLine
          sectionId={sectionId}
          promptPrefix={`faris@${promptLabel || sectionId}:~$ `}
          initial={""}
        />
      </div>
    </div>
  );
};

export default TerminalOutput;
