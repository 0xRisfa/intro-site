/**
 * Header component
 *
 * Top navigation bar for your site. Set to remain visible as the
 * user scrolls so that they can constantly reach any part of your page.
 */
import React from "react";

const Header = () => {
  const smoothTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const header = document.getElementById('site-header');
    const offset = header ? header.offsetHeight + 8 : 0;
    // use relative scroll to avoid layout calculation issues in some browsers
    const duration = 600;
    try {
      // let browser handle smooth scrolling; `scroll-margin-top` on sections offsets the fixed header.
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      const y = el.getBoundingClientRect().top - offset;
      const start = window.scrollY || window.pageYOffset;
      window.scrollTo(0, start + y);
    }
    // update hash after animation completes to avoid default jump
    setTimeout(() => {
      try { history.replaceState(null, '', `#${id}`); } catch (err) {}
    }, duration + 50);
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
      <a href="#home" onClick={(e) => smoothTo(e, 'home')} style={{ color: "#33ff66", textDecoration: "none" }}>Home</a>
      <a href="#about" onClick={(e) => smoothTo(e, 'about')} style={{ color: "#33ff66", textDecoration: "none" }}>About</a>
      <a href="#portfolio" onClick={(e) => smoothTo(e, 'portfolio')} style={{ color: "#33ff66", textDecoration: "none" }}>Portfolio</a>
      <a href="#footer" onClick={(e) => smoothTo(e, 'footer')} style={{ color: "#33ff66", textDecoration: "none" }}>Contact</a>
    </div>
  );
};

export default Header;
