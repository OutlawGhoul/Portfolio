import React from "react";
import { useAppContext } from "../context/AppContext";

const UPPER = { de: "DE", en: "EN" };

const LanguageToggle = () => {
    const { language, setLanguage } = useAppContext();

    const cycle = () => setLanguage(language === "de" ? "en" : "de");

    return (
        <button
            type="button"
            onClick={cycle}
            className="lang-toggle"
            aria-label="Language"
            aria-live="polite"
    >
        <span className="lang-toggle_label">{UPPER[language] || "DE"}</span>
    </button>
    );
};

export default LanguageToggle;