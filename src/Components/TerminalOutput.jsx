import React, { useEffect, useState, useRef } from "react";
import TerminalLine from "./TerminalLine";
import { useTerminal } from "./TerminalProvider";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TerminalOutput = ({ sectionId, lines = [], promptLabel }) => {
  const [printed, setPrinted] = useState([]);
  const mountedRef = useRef(true);
  const containerRef = useRef(null);
  const { registerInput } = useTerminal() || {};

  useEffect(() => {
    mountedRef.current = true;
    let cancelled = false;

    const run = async () => {
      for (let ln of lines) {
        if (cancelled) return;
        // append an empty line then type into it
        setPrinted((p) => [...p, ""]);
        // small per-char typing
        for (let i = 0; i <= ln.length; i++) {
          if (cancelled) return;
          setPrinted((p) => {
            const copy = [...p];
            copy[copy.length - 1] = ln.slice(0, i);
            return copy;
          });
          await sleep(18 + Math.random() * 12);
        }
        await sleep(60);
      }
    };

    run();

    return () => {
      cancelled = true;
      mountedRef.current = false;
    };
  }, [lines]);

  // after output, render an interactive prompt line (TerminalLine)
  return (
    <div ref={containerRef}>
      {printed.map((l, i) => (
        <div key={i} style={{ whiteSpace: "pre" }}>{l}</div>
      ))}
      <div style={{ marginTop: 8 }}>
        <TerminalLine sectionId={sectionId} promptPrefix={`faris@${promptLabel || sectionId}:~$ `} initial={""} />
      </div>
    </div>
  );
};

export default TerminalOutput;
