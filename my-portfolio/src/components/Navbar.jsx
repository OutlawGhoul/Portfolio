import React from "react";
import { useAppContext } from "../context/AppContext";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const { language } = useAppContext();

    const labels = {
        de: { about: "Über mich", skills: "Skills", contact: "Kontakt" },
        en: { about: "About", skills: "Skills", contact: "Contact" }
    };

    const t = labels[language];

    return (
        <nav className="navbar">
            <div className="nav-left">
                <a href="#about" className="logo">Steven</a>
            </div>
            <div className="nav-right">
                <a href="#about">{t.about}</a>
                <a href="#skills">{t.skills}</a>
                <LanguageToggle />
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;