import React, { useState } from "react";
import { FaBars, FaTimes, FaLinkedin, FaGithub } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import profilePic from "../assets/images/Profilbild.png";
import translations from "../i18n";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language } = useAppContext();
    const t = translations[language];
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Toggle-Button für Mobile */}
            <button className="mobile-toggle" onClick={toggleSidebar}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Sidebar */}
            <aside className={`sidebar${isOpen ? 'open' : ''}`}>
                <div className="profile">
                    <img src={profilePic} alt="Profil" className="profile-img" />
                    <h1 className="profile-name">Steven Schwarz</h1>

                    <div className="social-links">
                        <a
                            href="https://www.linkedin.com/in/steven-schwarz"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="https://github.com/OutlawGhoul"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </a>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        <li><a href="#about">{t.about}</a></li>
                        <li><a href="#skills">{t.skills}</a></li>
                        <li><a href="#bio">{t.titleBio}</a></li>
                        <li><a href="#expirience">{t.titleExpirience}</a></li>
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;