/**
 * Application component
 *
 * To contain application wide settings, routes, state, etc.
 */

import React from "react";

import About from "./Components/About";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Portfolio from "./Components/Portfolio";
import TerminalProvider, { useTerminal } from "./Components/TerminalProvider";

import "./styles.css";

/**
 * This object represents your information. The project is set so that you
 * only need to update these here, and values are passed a properties to the
 * components that need that information.
 *
 * Update the values below with your information.
 *
 * If you don't have one of the social sites listed, leave it as an empty string.
 */
const siteProps = {
  name: "Faris",
  title: "Computer Science Student",
  email: "farisosmic@hotmail.com",
  gitHub: "0xRisfa",
  instagram: "https://www.instagram.com/farinat0r_/",
  linkedIn: "",
  medium: "",
  twitter: "",
  youTube: "",
};

const primaryColor = "#000"; // terminal background for footer
const secondaryColor = "#33ff66"; // terminal green accent

const App = () => {
  const Main = () => {
    const { mounted } = useTerminal();
    return (
      <div id="main">
        <Header />
        {mounted === "home" && <Home name={siteProps.name} title={siteProps.title} />}
        {mounted === "about" && <About />}
        {mounted === "portfolio" && <Portfolio />}
        {mounted === "footer" && (
          <Footer {...siteProps} primaryColor={primaryColor} secondaryColor={secondaryColor} />
        )}
      </div>
    );
  };

  return (
    <TerminalProvider>
      <Main />
    </TerminalProvider>
  );
};

export default App;
