/**
 * Header component
 *
 * Top navigation bar for your site. Set to remain visible as the
 * user scrolls so that they can constantly reach any part of your page.
 */
import React from "react";
import { useTerminal } from "./TerminalProvider";

const Header = () => {
  const { showSection } = useTerminal();
  const smoothTo = (e, id) => {
    e.preventDefault();
    // delegate to terminal controller to orchestrate mount/typing
    if (showSection) showSection(id);
  };

  return (
    <div
      id="site-header"
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        background: "rgba(0,0,0,0.85)",
        padding: "0.75rem 1rem",
        top: 0,
        width: "100%",
        zIndex: 999,
        borderBottom: "1px solid rgba(51,255,102,0.06)",
      }}
    >
      <a href="#home" onClick={(e) => smoothTo(e, "home")} style={{ color: "#33ff66", textDecoration: "none" }}>Home</a>
      <a href="#about" onClick={(e) => smoothTo(e, "about")} style={{ color: "#33ff66", textDecoration: "none" }}>About</a>
      <a href="#portfolio" onClick={(e) => smoothTo(e, "portfolio")} style={{ color: "#33ff66", textDecoration: "none" }}>Portfolio</a>
      <a href="#computer" onClick={(e) => smoothTo(e, "computer")} style={{ color: "#33ff66", textDecoration: "none" }}>Computer</a>
    </div>
  );
};

export default Header;
