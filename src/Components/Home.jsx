/**
 * Home component
 *
 * The section at the top of the page to display image of your
 * choice, name and title that describes your career focus.
 */

import React from "react";
import PropTypes from "prop-types";

const Home = ({ name, title }) => {
  return (
    <section id="home" className="min-height terminal" style={{ paddingTop: "6rem" }}>
      <div style={{ maxWidth: 900, margin: "3rem auto 1rem auto", textAlign: "center" }}>
        <img
          src="https://farisosmic.splet.arnes.si/files/2025/04/97c2818d-1ccd-46d2-9ee4-2b2d4375160d-e1745253047888.png"
          alt="logo"
          style={{ width: 140, height: 140, objectFit: "cover", display: "block", margin: "0 auto 1rem auto" }}
        />
        <p className="prompt" style={{ marginBottom: "0.25rem" }}>
          <span className="prompt-prefix">faris@home:~$</span>
          <span className="handle typed"> whoami</span>
          <span className="cursor" aria-hidden>&nbsp;</span>
        </p>
        <h1 style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "2.2rem" }}>{name}</h1>
        <h2 style={{ fontWeight: 300, marginTop: "0.25rem" }}>{title}</h2>
        <p className="small" style={{ marginTop: "0.75rem", maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}>
          I turn code into working ideas — games, web apps, and systems that solve problems.
        </p>
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
