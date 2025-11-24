/**
 * Footer component
 *
 * Displays avenues to contact you.
 * Contact information is passed in from the App component that
 * renders the Footer.
 *
 * If a social value has an empty string it will not be displayed.
 */
import React from "react";
import PropTypes from "prop-types";

/**
 * 💡 Learning resources
 *
 *  HTML hyperlinks: https://www.w3schools.com/html/html_links.asp
 *  Opening links in new tabs: https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/
 */

const Footer = (props) => {
  const {
    devDotTo,
    email,
    gitHub,
    instagram,
    linkedIn,
    medium,
    name,
    primaryColor,
    twitter,
    youTube,
  } = props;

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: "#000",
        color: "#33ff66",
        padding: "1.5rem 1rem",
        borderTop: "1px solid rgba(51,255,102,0.06)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
        <div style={{ color: "#9fffb0" }}>
          {email && (
            <div style={{ marginBottom: 6 }}>
              <a href={`mailto:${email}`} style={{ color: "#33ff66", textDecoration: "none" }}>{email}</a>
            </div>
          )}
          {gitHub && (
            <div>
              <a href={`https://github.com/${gitHub}`} target="_blank" rel="noopener noreferrer" style={{ color: "#33ff66", textDecoration: "none" }}>GitHub: {gitHub}</a>
            </div>
          )}
        </div>
        <div style={{ color: "#33ff66", fontSize: "0.95rem" }}>Created by {name}</div>
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  name: "",
};

Footer.propTypes = {
  devDotTo: PropTypes.string,
  email: PropTypes.string,
  gitHub: PropTypes.string,
  instagram: PropTypes.string,
  linkedIn: PropTypes.string,
  medium: PropTypes.string,
  name: PropTypes.string.isRequired,
  primaryColor: PropTypes.string,
  twitter: PropTypes.string,
  youTube: PropTypes.string,

};

export default Footer;
