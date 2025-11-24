import React, { createContext, useContext, useEffect, useState, useRef } from "react";

const TerminalContext = createContext(null);

export const useTerminal = () => useContext(TerminalContext);

export const TerminalProvider = ({ children }) => {
  const [mounted, setMounted] = useState("home"); // currently shown section id
  const reduced = useRef(false);
  const [, setOverlay] = useState({ visible: false, lines: [] });
  const inputs = useRef({}); // map sectionId -> { runCommands }

  useEffect(() => {
    // detect prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    // honor direct hash loads: if user opened /#about, mount that immediately
    try {
      const h = (window.location.hash || "").replace("#", "");
      if (h) setMounted(h);
    } catch (err) {
      /* noop */
    }
  }, []);

  const typeLines = async (lines, delay = 40) => {
    // returns a promise that resolves when typing completes
    return new Promise((resolve) => {
      setOverlay({ visible: true, lines: [] });
      const out = [];
      let li = 0;
      const tickLine = () => {
        if (li >= lines.length) {
          resolve();
          return;
        }
        const line = lines[li];
        let idx = 0;
        out.push("");
        const charTick = () => {
          if (idx <= line.length) {
            out[li] = line.slice(0, idx);
            setOverlay({ visible: true, lines: [...out] });
            idx++;
            setTimeout(charTick, delay);
          } else {
            li++;
            setTimeout(tickLine, 80);
          }
        };
        charTick();
      };
      tickLine();
    });
  };

  const registerInput = (sectionId, ref) => {
    const existing = inputs.current[sectionId] || {};
    const merged = { ...existing, ...ref };
    // preserve an existing suppression flag — don't let new registrations clear it
    if (existing.suppress) merged.suppress = true;
    inputs.current[sectionId] = merged;
  };

  const unregisterInput = (sectionId) => {
    delete inputs.current[sectionId];
  };

  const isSuppressed = (sectionId) =>
    !!(inputs.current[sectionId] && inputs.current[sectionId].suppress);

  const clearedAt = useRef({});
  const wasClearedRecently = (sectionId, withinMs = 3000) => {
    const t = clearedAt.current[sectionId];
    if (!t) return false;
    return Date.now() - t < withinMs;
  };

  const showSection = async (id) => {
    if (id === mounted) return;
    // if reduced motion, just switch
    if (reduced.current) {
      setMounted(id);
      return;
    }
    // prefer to run commands in the currently-registered input for the 'from' section
    const from = mounted || "home";
    const prompt = `faris@${from}:~$ `;

    const fromInput = inputs.current[from];
    if (fromInput && typeof fromInput.runCommands === "function") {
      // mark suppressed immediately so any running TerminalOutput won't restart
      inputs.current[from] = { ...(inputs.current[from] || {}), suppress: true };
      // record cleared time to avoid any re-print race conditions
      clearedAt.current[from] = Date.now();
      // run 'clear' in-place so the prompt types it
      await fromInput.runCommands(["clear"]);
      // if the section has output, clear it now (after typing cd)
      if (fromInput.clearOutput && typeof fromInput.clearOutput === "function") {
        try {
          fromInput.clearOutput();
        } catch (err) {
          /* ignore errors from clear hook */
        }
      }
      if (fromInput.clearAll && typeof fromInput.clearAll === "function") {
        try {
          fromInput.clearAll();
        } catch (err) {
          /* ignore */
        }
      }
      // then type cd
      await fromInput.runCommands(["cd " + id]);
    } else {
      // fallback to overlay typing
      await typeLines([prompt + "clear"]);
      await new Promise((r) => setTimeout(r, 120));
      await typeLines([prompt + "cd " + id]);
    }

    // small pause then mount the target section which will print itself
    await new Promise((r) => setTimeout(r, 160));
    setMounted(id);
  };

  return (
    <TerminalContext.Provider
      value={{
        mounted,
        showSection,
        registerInput,
        unregisterInput,
        isSuppressed,
        wasClearedRecently,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};

export default TerminalProvider;
