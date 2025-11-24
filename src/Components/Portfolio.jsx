import React, { useEffect, useState } from "react";
import TerminalOutput from "./TerminalOutput";
import { useTerminal } from "./TerminalProvider";

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
  const lines = [
    "Portfolio",
    "Hey! I'm Faris, a computer science student who loves turning code into cool, working ideas — from games to web apps and everything in between.",
    "",
    "Featured Work:",
    ...projectList.map((p) => `- ${p.title} — ${p.description}`),
    "",
    "What I Do Best:",
    ...skills.map((s) => `- ${s.title}: ${s.description}`),
    "",
    "Education:",
    ...education.map((e) => `- ${e.school} — ${e.period}`),
    "",
    "Work Experience:",
    ...work.map((w) => `- ${w.company} — ${w.period}`),
    "",
  ];

  const { registerInput, unregisterInput } = useTerminal() || {};
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    setShowHeader(true);
    if (registerInput && typeof registerInput === "function") {
      // clearAll will hide only the static header (image/title), not the terminal prompt
      registerInput("portfolio", { clearAll: () => setShowHeader(false) });
    }
    return () => {
      if (unregisterInput && typeof unregisterInput === "function") unregisterInput("portfolio");
    };
  }, [registerInput, unregisterInput]);

  return (
    <section className="padding terminal" id="portfolio">
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
        {showHeader && (
          <div className="term-hero">
            <img
              src="https://farisosmic.splet.arnes.si/files/2025/04/97c2818d-1ccd-46d2-9ee4-2b2d4375160d-e1745253047888.png"
              alt="logo"
              style={{ width: 120, height: 120, objectFit: "cover", display: "block", marginBottom: "1rem" }}
            />
            <h2 style={{ marginTop: 0 }}>Featured Work</h2>
          </div>
        )}

        <TerminalOutput sectionId="portfolio" lines={lines} promptLabel="portfolio" />
      </div>
    </section>
  );
};

// drive typed width after mount
const useTypedResize = () => {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("#portfolio .typed"));
    if (!els.length) return;

    const animate = (el) => {
      const text = el.textContent || "";
      const len = Math.max(1, text.length);
      const duration = Math.max(0.6, len * 0.06);
      el.style.width = "0ch";
      // set transition and then trigger width change
      el.style.transition = `width ${duration}s steps(${len}, end)`;
      setTimeout(() => {
        el.style.width = `${len}ch`;
      }, 40);
    };

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);
};

// apply the typed resize when Portfolio mounts
const _orig = Portfolio;
const PortfolioWithTyped = (props) => {
  useTypedResize();
  return _orig(props);
};

export default PortfolioWithTyped;

// module exports the wrapped component with typing effect
