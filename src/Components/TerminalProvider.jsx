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
    inputs.current[sectionId] = ref;
  };

  const unregisterInput = (sectionId) => {
    delete inputs.current[sectionId];
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
      // run in-place: clear then cd
      await fromInput.runCommands(["clear", "cd " + id]);
    } else {
      // fallback to overlay typing
      await typeLines([prompt + "clear", prompt + "cd " + id]);
    }

    // small pause then mount the target section which will print itself
    await new Promise((r) => setTimeout(r, 220));
    setMounted(id);
  };

  return (
    <TerminalContext.Provider value={{ mounted, showSection, registerInput, unregisterInput }}>
      {children}
    </TerminalContext.Provider>
  );
};

export default TerminalProvider;
