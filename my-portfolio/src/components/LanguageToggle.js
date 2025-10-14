import { jsx as _jsx } from "react/jsx-runtime";
import { useAppContext } from "../context/AppContext";
const UPPER = { de: "DE", en: "EN" };
const LanguageToggle = () => {
    const { language, setLanguage } = useAppContext();
    const cycle = () => setLanguage(language === "de" ? "en" : "de");
    return (_jsx("button", { type: "button", onClick: cycle, className: "lang-toggle", "aria-label": "Language", "aria-live": "polite", children: _jsx("span", { className: "lang-toggle_label", children: UPPER[language] || "DE" }) }));
};
export default LanguageToggle;
