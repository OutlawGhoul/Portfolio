import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import SidebarNav from "./SidebarNav";
import profilePic from "/src/assets/images/Profilbild.jpg";
import SocialLinks from "./SocialLinks";
import translations from "../i18n";
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language } = useAppContext();
    const lang = translations[language];
    const toggleSidebar = () => setIsOpen(!isOpen);
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);
    return (_jsxs(_Fragment, { children: [_jsx("button", { className: "mobile-toggle", onClick: toggleSidebar, "aria-label": isOpen ? "Close sidebar" : "Open sidebar", "aria-expanded": isOpen, "aria-controls": "sidebar", children: isOpen ? _jsx(FaTimes, {}) : _jsx(FaBars, {}) }), isOpen && (_jsx("div", { className: "sidebar-overlay", onClick: () => setIsOpen(false) })), _jsxs("aside", { id: "sidebar", className: `sidebar ${isOpen ? "open" : ""}`, role: "navigation", "aria-label": "Sidebar navigation", children: [_jsxs("div", { className: "profile", children: [_jsx("img", { src: profilePic, alt: "Profil", className: "profile-img" }), _jsx("h1", { className: "profile-name", children: "Steven Schwarz" }), _jsx(SocialLinks, {})] }), _jsx(SidebarNav, { onLinkClick: () => setIsOpen(false), t: lang })] })] }));
};
export default Sidebar;
