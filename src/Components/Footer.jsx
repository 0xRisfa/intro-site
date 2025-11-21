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

import devDotToIcon from "../images/socials/devdotto.svg";
import envelopeIcon from "../images/socials/envelope.svg";
import gitHubIcon from "../images/socials/github.svg";
import instagramIcon from "../images/socials/instagram.svg";
import linkedInIcon from "../images/socials/linkedin.svg";
import mediumIcon from "../images/socials/medium.svg";
import twitterIcon from "../images/socials/twitter.svg";
import youTubeIcon from "../images/socials/youtube.svg";

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
    <div
      id="footer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.25rem",
        padding: "3rem 0 2rem",
        backgroundColor: "#000",
        width: "100vw",
        borderTop: "1px solid rgba(51,255,102,0.06)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {email && (
          <div style={{ marginBottom: 8 }}>
            <a href={`mailto:${email}`} style={{ color: "#33ff66", textDecoration: "none" }}>{email}</a>
          </div>
        )}
        {gitHub && (
          <div>
            <a href={`https://github.com/${gitHub}`} target="_blank" rel="noopener noreferrer" style={{ color: "#33ff66", textDecoration: "none" }}>
              GitHub: {gitHub}
            </a>
          </div>
        )}
      </div>
      <p className="small" style={{ marginTop: 0, color: "#33ff66" }}>
        Created by {name}
      </p>
    </div>
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
