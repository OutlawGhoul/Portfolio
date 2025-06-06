import React from "react";
import { useAppContext } from "../context/AppContext";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import translations from "../i18n";

const Navbar = () => {
    const { language } = useAppContext();
    const t = translations[language];

    return (
        <nav className="navbar">
            <div className="nav-left">
                <a href="#about">{t.about}</a>
                <a href="#skills">{t.skills}</a>
                <a href="#contact">{t.contact}</a>
            </div>
            <div className="nav-right">
                <LanguageToggle />
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;