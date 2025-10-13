import React from "react";
import { useAppContext } from "../context/AppContext";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

type Language = "de" | "en";

const labels: Record<
  Language,
  { about: string; skills: string; contact: string }
> = {
  de: { about: "Über mich", skills: "Skills", contact: "Kontakt" },
  en: { about: "About", skills: "Skills", contact: "Contact" },
};

const Navbar: React.FC = () => {
  const { language } = useAppContext();
  const lang = labels[language];

  return (
    <nav className="navbar">
      <div className="nav-left">
        <a href="#about" className="logo">
          Steven
        </a>
      </div>
      <div className="nav-right">
        <a href="#about">{lang.about}</a>
        <a href="#skills">{lang.skills}</a>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
