import React from "react";
import { useAppContext } from "../context/AppContext";

const ThemeToggle = () => {
    const { darkMode, setDarkMode } = useAppContext();

    return (
        <button
            type="button"
            className={`theme-toggle ${darkMode ? "is-on" : ""}`}
            onClick={() => setDarkMode(!darkMode)}
            role="switch"
            aria-checked={darkMode}
            aria-label={darkMode ? "Dark Mode aktiviert" : "Dark Mode deaktiviert"}
        >
            <span className="theme-toggle_thumb" />
        </button>
    );
};

export default ThemeToggle;