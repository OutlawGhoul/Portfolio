import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const SocialLinks = () => {
    const links = [
        {
            name: "LinkedIn",
            icon: <FaLinkedin size={28} />,
            url: "https://www.linkedin.com/in/steven-rene-schwarz",
        },
        {
            name: "GitHub",
            icon: <FaGithub size={28} />,
            url: "https://github.com/OutlawGhoul",
        },
    ];

    return (
        <div className="social-links">
            {links.map((link) => (
                <div key={link.name} className="social-item">
                    <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${link.name}-Profil öffnen`}
                    >
                        {link.icon}
                    </a>
                </div>
            ))}
        </div>
    );
};

export default SocialLinks;