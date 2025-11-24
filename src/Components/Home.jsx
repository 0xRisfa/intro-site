/**
 * Home component
 *
 * The section at the top of the page to display image of your
 * choice, name and title that describes your career focus.
 */

import React, { useEffect, useState } from "react";
import TerminalLine from "./TerminalLine";
import PropTypes from "prop-types";

const Donut = () => {
  const [frame, setFrame] = useState('');
  const rafRef = React.useRef(null);

  useEffect(() => {
    let A = 0;
    let B = 0;
    const width = 80;
    const height = 32;
    const size = width * height;

    function renderFrame() {
      const b = new Array(size).fill(' ');
      const z = new Array(size).fill(0);

      for (let j = 0; j < 6.28; j += 0.07) {
        for (let i = 0; i < 6.28; i += 0.02) {
          const c = Math.sin(i);
          const d = Math.cos(j);
          const e = Math.sin(A);
          const f = Math.sin(j);
          const g = Math.cos(A);
          const h = d + 2;
          const D = 1 / (c * h * e + f * g + 5);
          const l = Math.cos(i);
          const m = Math.cos(B);
          const n = Math.sin(B);
          const t = c * h * g - f * e;
          const x = Math.floor(40 + 30 * D * (l * h * m - t * n));
          const y = Math.floor(12 + 15 * D * (l * h * n + t * m));
          const o = x + width * y;
          const N = Math.floor(8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n));
          if (y >= 0 && y < height && x >= 0 && x < width && D > z[o]) {
            z[o] = D;
            b[o] = " .,-~:;=!*#$@"[N > 0 ? N : 0];
          }
        }
      }

      let out = '';
      for (let k = 0; k < size; k++) {
        out += k % width ? b[k] : '\n' + b[k];
      }
      // remove initial newline
      out = out.replace(/^\n/, '');
      setFrame(out);
      A += 0.01;
      B += 0.003;
      rafRef.current = requestAnimationFrame(renderFrame);
    }

    rafRef.current = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <pre className="donut" aria-hidden style={{ whiteSpace: 'pre', margin: '0 auto' }}>{frame}</pre>;
};

import { useTerminal } from "./TerminalProvider";

const Home = ({ name, title }) => {
  const [showContent, setShowContent] = useState(true);
  const { registerInput, unregisterInput } = useTerminal() || {};

  useEffect(() => {
    if (registerInput && typeof registerInput === "function") {
      registerInput("home", {
        clearAll: () => {
          setShowContent(false);
        },
      });
    }
    return () => {
      if (unregisterInput && typeof unregisterInput === "function") unregisterInput("home");
    };
  }, [registerInput, unregisterInput]);

  return (
    <section
      id="home"
      className={showContent ? "terminal" : "padding terminal"}
      style={
        showContent
          ? { padding: "2rem 0", display: "flex", alignItems: "center", justifyContent: "center" }
          : {}
      }
    >
      {showContent ? (
        <div
          className={`term-hero`}
          style={{ margin: "0 auto", textAlign: "center", padding: "1rem" }}
        >
          <img
            src="https://farisosmic.splet.arnes.si/files/2025/04/97c2818d-1ccd-46d2-9ee4-2b2d4375160d-e1745253047888.png"
            alt="logo"
            style={{
              width: 140,
              height: 140,
              objectFit: "cover",
              display: "block",
              margin: "0 auto 1rem auto",
            }}
          />

          <div className="home-terminal-line" style={{ marginTop: 8 }}>
            <TerminalLine sectionId={"home"} promptPrefix={`faris@home:~$ `} initial={""} />
          </div>

          <div className="home-main-content">
            <h1 style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "2.2rem" }}>
              {name}
            </h1>
            <h2 style={{ fontWeight: 300, marginTop: "0.25rem" }}>{title}</h2>
            <p className="small term-wrap">
              I turn code into working ideas — games, web apps, and systems that solve problems.
            </p>
            <div style={{ marginTop: "1.25rem", fontSize: "0.7rem" }}>
              <Donut />
            </div>
          </div>
        </div>
      ) : null}
      {!showContent && (
        <div style={{ maxWidth: 900, margin: "2rem auto", padding: "1rem" }}>
          <TerminalLine sectionId={"home"} promptPrefix={`faris@home:~$ `} initial={""} />
        </div>
      )}
    </section>
  );
};

Home.defaultProps = {
  name: "",
  title: "",
};

Home.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Home;
