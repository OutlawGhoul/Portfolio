import React from "react";
import { useAppContext } from "../context/AppContext";

const ThemeToggle = () => {
    const { darkMode, setDarkMode } = useAppContext();

    return (
        <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '🌞' : '🌙'}
        </button>
    );
};

export default ThemeToggle;