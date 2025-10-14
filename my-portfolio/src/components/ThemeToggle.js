import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";
const ThemeToggle = () => {
    const { darkMode, setDarkMode, language } = useAppContext();
    const lang = translations[language];
    const onToggle = useCallback(() => {
        setDarkMode((v) => !v);
    }, [setDarkMode]);
    return (_jsx("button", { type: "button", className: `theme-toggle ${darkMode ? "is-on" : ""}`, onClick: () => setDarkMode(!darkMode), role: "switch", "aria-checked": darkMode, "aria-label": darkMode ? lang.darkModeActive : lang.darkModeInactive, children: _jsx("span", { className: "theme-toggle_thumb" }) }));
};
export default ThemeToggle;
