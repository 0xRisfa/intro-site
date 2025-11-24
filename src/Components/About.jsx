/**
 * About component
 *
 * Space for you to describe more about yourself.
 */

import React from "react";
import TerminalOutput from "./TerminalOutput";

const lines = [
  "About Me",
  "I\'m a computer science student exploring game development, web applications, Java programming and databases.",
  "",
  "Skills:",
  "- Game Development",
  "- Web Development (HTML/CSS/JS)",
  "- Java",
  "- SQL & PL/SQL",
  "- System Architecture",
  "",
  "I like to combine creative problem solving with practical engineering to build useful projects and learn new technologies along the way.",
];

const About = () => {
  return (
    <section className="padding terminal" id="about">
      <div style={{ maxWidth: 900, margin: "2rem auto", padding: "1rem" }}>
        <TerminalOutput sectionId="about" lines={lines} promptLabel="about" />
      </div>
    </section>
  );
};

export default About;
