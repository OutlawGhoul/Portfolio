import React from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import About from "./About";
import Bio from "./Bio";
import Experience from "./Experience";
import Skills from "./Skills";
import WorkSection from "./WorkSection";
import Footer from "./Footer";

export default function MainContent(): React.ReactElement {
  return (
    <>
      <div className="page-top-controls">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <main className="main-content">
        <div className="main-inner">
          <Bio />
          <About />
          <Experience />
          <Skills />
          <WorkSection />
          <Footer />
        </div>
      </main>
    </>
  );
}
