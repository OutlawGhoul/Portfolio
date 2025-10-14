import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppContext } from "../context/AppContext";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
const labels = {
    de: { about: "Über mich", skills: "Skills", contact: "Kontakt" },
    en: { about: "About", skills: "Skills", contact: "Contact" },
};
const Navbar = () => {
    const { language } = useAppContext();
    const lang = labels[language];
    return (_jsxs("nav", { className: "navbar", children: [_jsx("div", { className: "nav-left", children: _jsx("a", { href: "#about", className: "logo", children: "Steven" }) }), _jsxs("div", { className: "nav-right", children: [_jsx("a", { href: "#about", children: lang.about }), _jsx("a", { href: "#skills", children: lang.skills }), _jsx(LanguageToggle, {}), _jsx(ThemeToggle, {})] })] }));
};
export default Navbar;
