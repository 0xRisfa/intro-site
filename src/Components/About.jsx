/**
 * About component
 *
 * Space for you to describe more about yourself.
 */

import React from "react";

const description =
  "I’m a computer science student exploring game development, web applications, Java programming and databases. I enjoy building projects that are both playful and useful.";

const skillsList = [
  "Game Development",
  "Web Development (HTML/CSS/JS)",
  "Java",
  "SQL & PL/SQL",
  "System Architecture",
  "Problem Solving",
];

const About = () => {
  return (
    <section className="padding terminal" id="about">
      <div style={{ maxWidth: 900, margin: "2rem auto", padding: "1rem" }}>
        <h2>About Me</h2>
        <p className="large" style={{ color: "#9fffb0" }}>{description}</p>
        <hr className="ascii-divider" />
        <h3>Skills</h3>
        <ul style={{ textAlign: "left", columns: 2, gap: "1rem" }}>
          {skillsList.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <hr className="ascii-divider" />
        <p style={{ paddingTop: "1rem" }} className="small">I like to combine creative problem solving with practical engineering to build useful projects and learn new technologies along the way.</p>
      </div>
    </section>
  );
};

export default About;
