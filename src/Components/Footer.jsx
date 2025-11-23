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
import TerminalOutput from "./TerminalOutput";
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

  const lines = [
    "Contact",
    email ? `- Email: ${email}` : "",
    gitHub ? `- GitHub: https://github.com/${gitHub}` : "",
    "",
    `Created by ${name}`,
  ];

  return (
    <section id="footer" style={{ backgroundColor: "#000" }}>
      <div style={{ maxWidth: 900, margin: "2rem auto", padding: "1rem" }}>
        <TerminalOutput sectionId="footer" lines={lines} promptLabel="footer" />
      </div>
    </section>
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
