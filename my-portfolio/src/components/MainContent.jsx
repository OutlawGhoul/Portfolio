import React from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import About from "./About";
import Bio from "./Bio";
import Expirience from "./Expirience";
import Skills from "./Skills";
import Footer from "./Footer";

const MainContent = () => {
    return (
        <main className="main-content">
            <div className="top-controls">
                <LanguageToggle />
                <ThemeToggle />
            </div>
            <div className="main-inner">
                <About />
                <Bio />
                <Expirience />
                <Skills />
                <Footer />
            </div>
        </main>
    );
};

export default MainContent;