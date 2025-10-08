import React from "react";

const SidebarNav = ({ onLinkClick , t }) =>  {
    return (
        <nav className="sidebar-nav">
            <ul>
                <li><a href="#bio" onClick={onLinkClick}>{t.navBio}</a></li>
                <li><a href="#about" onClick={onLinkClick}>{t.about}</a></li>
                <li><a href="#experience" onClick={onLinkClick}>{t.titleExperience}</a></li>
                <li><a href="#skills" onClick={onLinkClick}>{t.skills}</a></li>
                <li><a href="#projects" onClick={onLinkClick}>{t.projectsTitle}</a></li>
            </ul>
        </nav>
    );
};

export default SidebarNav;