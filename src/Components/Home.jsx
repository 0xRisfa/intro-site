/**
 * Home component
 *
 * The section at the top of the page to display image of your
 * choice, name and title that describes your career focus.
 */

import React, { useEffect, useRef, useState } from "react";
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

const Home = ({ name, title }) => {
  const typedRef = useRef(null);

  useEffect(() => {
    const el = typedRef.current;
    if (!el) return;
    const text = el.textContent || "";
    const len = Math.max(1, text.length);
    const duration = Math.max(0.6, len * 0.06); // seconds
    // prepare for animation
    el.style.width = "0ch";
    el.style.transition = `width ${duration}s steps(${len}, end)`;
    // small delay to ensure transition applies
    const id = setTimeout(() => {
      el.style.width = `${len}ch`;
    }, 40);
    return () => clearTimeout(id);
  }, []);

  return (
    <section id="home" className="min-height terminal" style={{ paddingTop: "6rem" }}>
      <div className="term-hero" style={{ maxWidth: 900, margin: "3rem auto 1rem auto", textAlign: "center" }}>
        <img
          src="https://farisosmic.splet.arnes.si/files/2025/04/97c2818d-1ccd-46d2-9ee4-2b2d4375160d-e1745253047888.png"
          alt="logo"
          style={{ width: 140, height: 140, objectFit: "cover", display: "block", margin: "0 auto 1rem auto" }}
        />
        <p className="prompt" style={{ marginBottom: "0.25rem" }}>
          <span className="prompt-prefix">faris@home:~$</span>
          <span className="handle typed" ref={typedRef}> whoami</span>
          <span className="cursor" aria-hidden></span>
        </p>
        <h1 style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "2.2rem" }}>{name}</h1>
        <h2 style={{ fontWeight: 300, marginTop: "0.25rem" }}>{title}</h2>
        <p className="small" style={{ marginTop: "0.75rem", maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}>
          I turn code into working ideas — games, web apps, and systems that solve problems.
        </p>
        <div style={{ marginTop: "10rem" }}>
          <Donut />
        </div>
      </div>
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
