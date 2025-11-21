import React from "react";

/**
 * Project list
 *
 * An array of objects that will be used to display for your project
 * links section. Below is a sample, update to reflect links you'd like to highlight.
 */
const projectList = [
  {
    title: "Brik Brik",
    description: "A project showcased with interactive visuals and gameplay snippets.",
    url: "https://farisosmic.splet.arnes.si/portfolio/brik-brik/",
    image:
      "https://farisosmic.splet.arnes.si/files/2025/04/Screenshot-2025-04-21-190007.png",
  },
  {
    title: "From The Maze",
    description: "Web game project focusing on maze generation and player interaction.",
    url: "https://farisosmic.splet.arnes.si/portfolio/from-themaze",
    image:
      "https://farisosmic.splet.arnes.si/files/2025/04/Screenshot-2025-04-21-185242.png",
  },
];

const skills = [
  {
    title: "Game Development",
    description:
      "Creating engaging games using web technologies, focusing on mechanics and visuals.",
    icon: "🎮",
  },
  {
    title: "Web Development",
    description:
      "Responsive, user-friendly sites using HTML, CSS and JavaScript with attention to UX.",
    icon: "🌐",
  },
  {
    title: "Java Programming",
    description:
      "Object-oriented design and structured applications using Java for robust solutions.",
    icon: "☕",
  },
  {
    title: "Database Management",
    description:
      "Working with SQL and PL/SQL for efficient querying and data manipulation.",
    icon: "🗄️",
  },
];

const education = [
  {
    period: "Future",
    school: "FRI Ljubljana",
    details:
      "Faculty of Computer and Information Science — deepening expertise in algorithms and systems.",
    link: "https://fri.uni-lj.si/en",
  },
  {
    period: "September 2021 - May 2025",
    school: "ERŠ Nova Gorica",
    details:
      "School of Electrical Engineering and Computer Science — foundations in Java, Python, Web and SQL.",
    link: "https://ers.scng.si/",
  },
];

const work = [
  {
    period: "October 2023",
    company: "Carlos Criado Informatica",
    details:
      "Set up and managed local server environments; deployment and maintenance experience.",
  },
  {
    period: "November 2022",
    company: "MA-NO",
    details:
      "Configured wireless APs, cabling and assisted with network device setup and testing.",
  },
];

const Portfolio = () => {
  return (
    <section className="padding terminal" id="portfolio">
      <div className="term-hero">
        <img
          src="https://farisosmic.splet.arnes.si/files/2025/04/97c2818d-1ccd-46d2-9ee4-2b2d4375160d-e1745253047888.png"
          alt="logo"
          style={{ width: 120, height: 120, objectFit: "cover", display: "block", marginBottom: "1rem" }}
        />
        <p className="prompt">
          <span className="prompt-prefix">faris@portfolio:~$</span>
          <span className="handle typed"> cat intro.md</span>
          <span className="cursor" aria-hidden>
            &nbsp;
          </span>
        </p>
        <h2>Hey! I’m Faris, a computer science student who loves turning code into cool, working ideas — from games to web apps and everything in between.</h2>
      </div>

      <div className="container">
        <h3 style={{ marginTop: 0 }}>Featured Work</h3>
        {projectList.map((project) => (
          <div className="box" key={project.title}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <img src={project.image} alt={project.title} style={{ width: 180, height: 90, objectFit: "cover" }} />
              <div>
                <a className="project-url" href={project.url} target="_blank" rel="noopener noreferrer">
                  <div className="project-title">{project.title}</div>
                </a>
                <p className="small">{project.description}</p>
                <a className="cta" href={project.url} target="_blank" rel="noopener noreferrer">View Project</a>
              </div>
            </div>
          </div>
        ))}

        <div className="box" style={{ marginTop: 18 }}>
          <h3>What I Do Best</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {skills.map((s) => (
              <div key={s.title} style={{ padding: 8, borderRadius: 6, background: "rgba(51,255,102,0.02)" }}>
                <strong>{s.icon} {s.title}</strong>
                <p className="small">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="box">
          <h3>Education</h3>
          {education.map((e) => (
            <div key={e.school} style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 600 }}>{e.school} <span style={{ fontWeight: 300, color: "#9fffb0" }}>— {e.period}</span></div>
              <p className="small">{e.details} <a className="project-url" href={e.link} target="_blank" rel="noreferrer">(link)</a></p>
            </div>
          ))}
        </div>

        <div className="box">
          <h3>Work Experience</h3>
          {work.map((w) => (
            <div key={w.company} style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 600 }}>{w.company} <span style={{ fontWeight: 300, color: "#9fffb0" }}>— {w.period}</span></div>
              <p className="small">{w.details}</p>
            </div>
          ))}
        </div>

        <div className="box">
          <h3>Contact</h3>
          <p className="small">Email: <a className="project-url" href="mailto:farisosmic@hotmail.com">farisosmic@hotmail.com</a></p>
          <p className="small">Feel free to contact me with any inquiries or questions.</p>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
