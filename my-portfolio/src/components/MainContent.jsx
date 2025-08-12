import React from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import About from "./About";
import Bio from "./Bio";
import Expirience from "./Expirience";
import Skills from "./Skills";
import WorkSection from "./WorkSection";
import Footer from "./Footer";

export default function MainContent () {
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
                    <Expirience />
                    <Skills />
                    <WorkSection />
                    <Footer />
                </div>
            </main>
        </>
    );
};
