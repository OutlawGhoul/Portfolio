import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import About from "./About";
import Bio from "./Bio";
import Experience from "./Experience";
import Skills from "./Skills";
import WorkSection from "./WorkSection";
import Footer from "./Footer";
export default function MainContent() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "page-top-controls", children: [_jsx(LanguageToggle, {}), _jsx(ThemeToggle, {})] }), _jsx("main", { className: "main-content", children: _jsxs("div", { className: "main-inner", children: [_jsx(Bio, {}), _jsx(About, {}), _jsx(Experience, {}), _jsx(Skills, {}), _jsx(WorkSection, {}), _jsx(Footer, {})] }) })] }));
}
