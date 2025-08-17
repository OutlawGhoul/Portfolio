import React from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";


const ThemeToggle = () => {
    const { darkMode, setDarkMode } = useAppContext();

    const { language } = useAppContext();
    const lang = translations[language];

    return (
        <button
            type="button"
            className={`theme-toggle ${darkMode ? "is-on" : ""}`}
            onClick={() => setDarkMode(!darkMode)}
            role="switch"
            aria-checked={darkMode}
            aria-label={darkMode ? lang.darkModeActive : lang.darkModeInactive}
        >
            <span className="theme-toggle_thumb" />
        </button>
    );
};

export default ThemeToggle;