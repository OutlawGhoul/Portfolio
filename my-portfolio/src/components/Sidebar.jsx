import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import SidebarNav from "./SidebarNav";
import profilePic from "/public/Profilbild.jpg";
import SocialLinks from "./SocialLinks";
import translations from "../i18n";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language } = useAppContext();
    const t = translations[language];

    const toggleSidebar = () => setIsOpen(!isOpen);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [isOpen]);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className="mobile-toggle"
                onClick={toggleSidebar}
                aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
                aria-expanded={isOpen}
                aria-controls="sidebar"
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
            )}

            {/* Sidebar */}
            <aside
                id="sidebar"
                className={`sidebar ${isOpen ? 'open' : ''}`}
                role="navigation"
                aria-label="Sidebar navigation"
            >
            <div className="top-controls">
                <LanguageToggle />
                <ThemeToggle />
            </div>

                <div className="profile">
                    <img src={profilePic} alt="Profil" className="profile-img" />
                    <h1 className="profile-name">Steven Schwarz</h1>
                    <SocialLinks />
                </div>

                <SidebarNav onLinkClick={() => setIsOpen(false)} t ={t} />
            </aside>
        </>
    );
};

export default Sidebar;