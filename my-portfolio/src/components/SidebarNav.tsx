import React from "react";

interface SidebarNavProps {
  onLinkClick: React.MouseEventHandler<HTMLAnchorElement>;
  t: {
    navBio: string;
    about: string;
    titleExperience: string;
    skills: string;
    projectsTitle: string;
  };
}

const SidebarNav: React.FC<SidebarNavProps> = ({ onLinkClick, t }) => {
  return (
    <nav className="sidebar-nav">
      <ul>
        <li>
          <a href="#bio" onClick={onLinkClick}>
            {t.navBio}
          </a>
        </li>
        <li>
          <a href="#about" onClick={onLinkClick}>
            {t.about}
          </a>
        </li>
        <li>
          <a href="#experience" onClick={onLinkClick}>
            {t.titleExperience}
          </a>
        </li>
        <li>
          <a href="#skills" onClick={onLinkClick}>
            {t.skills}
          </a>
        </li>
        <li>
          <a href="#projects" onClick={onLinkClick}>
            {t.projectsTitle}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
