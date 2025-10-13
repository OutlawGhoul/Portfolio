import React, { useCallback } from "react";
import { useAppContext } from "../context/AppContext";
import translations, { TranslationSet } from "../i18n";

const ThemeToggle: React.FC = () => {
  const { darkMode, setDarkMode, language } = useAppContext();
  const lang: TranslationSet = translations[language];

  const onToggle = useCallback(() => {
    setDarkMode((v) => !v);
  }, [setDarkMode]);

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
