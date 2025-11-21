/**
 * Header component
 *
 * Top navigation bar for your site. Set to remain visible as the
 * user scrolls so that they can constantly reach any part of your page.
 */
import React from "react";

const Header = () => {
  return (
    <div
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
      <a href="#home" style={{ color: "#33ff66", textDecoration: "none" }}>Home</a>
      <a href="#about" style={{ color: "#33ff66", textDecoration: "none" }}>About</a>
      <a href="#portfolio" style={{ color: "#33ff66", textDecoration: "none" }}>Portfolio</a>
      <a href="#footer" style={{ color: "#33ff66", textDecoration: "none" }}>Contact</a>
    </div>
  );
};

export default Header;
