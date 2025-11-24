import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef } from "react";
import { useTerminal } from "./TerminalProvider";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TerminalLine = forwardRef(({ sectionId, promptPrefix = "faris@home:~$ ", initial = "", auto = false }, ref) => {
  const [text, setText] = useState("");
  const typing = useRef(false);
  const mountedRef = useRef(true);
  const { registerInput, unregisterInput } = useTerminal() || {};

  useEffect(() => {
    mountedRef.current = true;
    if (registerInput) registerInput(sectionId, { runCommands, suppress: false });
    return () => {
      mountedRef.current = false;
      if (unregisterInput) unregisterInput(sectionId);
    };
  }, [sectionId]);

  useEffect(() => {
    if (auto && initial) {
      runCommands([initial]);
    } else {
      setText(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // types an array of commands sequentially into this line
  async function runCommands(commands = [], charDelay = 35) {
    if (!mountedRef.current) return;
    if (typing.current) return;
    typing.current = true;
    for (let cmd of commands) {
      // clear current visible text
      setText("");
      await sleep(120);
      for (let i = 0; i <= cmd.length; i++) {
        if (!mountedRef.current) break;
        setText(cmd.slice(0, i));
        await sleep(charDelay);
      }
      await sleep(120);
    }
    typing.current = false;
    return;
  }

  useImperativeHandle(ref, () => ({ runCommands }), []);

  return (
    <span className="prompt" aria-live="polite">
      <span className="prompt-prefix">{promptPrefix}</span>
      <span className="handle">{text}</span>
      <span className="cursor" aria-hidden></span>
    </span>
  );
});

export default TerminalLine;
