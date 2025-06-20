import React from "react";

const SidebarNav = ({ onLinkClick , t }) =>  {
    return (
        <nav className="sidebar-nav">
            <ul>
                <li><a href="#about" onClick={onLinkClick}>{t.about}</a></li>
                <li><a href="#bio" onClick={onLinkClick}>{t.titleBio}</a></li>
                <li><a href="#expirience" onClick={onLinkClick}>{t.titleExpirience}</a></li>
                <li><a href="#skills" onClick={onLinkClick}>{t.skills}</a></li>
            </ul>
        </nav>
    );
};

export default SidebarNav;