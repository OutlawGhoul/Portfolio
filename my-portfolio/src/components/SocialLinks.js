import { jsx as _jsx } from "react/jsx-runtime";
import { FaLinkedin, FaGithub } from "react-icons/fa";
const links = [
    {
        name: "LinkedIn",
        icon: _jsx(FaLinkedin, { size: 28 }),
        url: "https://www.linkedin.com/in/steven-rene-schwarz",
    },
    {
        name: "GitHub",
        icon: _jsx(FaGithub, { size: 28 }),
        url: "https://github.com/OutlawGhoul",
    },
];
const SocialLinks = () => (_jsx("div", { className: "social-links", children: links.map((link) => (_jsx("div", { className: "social-item", children: _jsx("a", { href: link.url, target: "_blank", rel: "noopener noreferrer", title: `${link.name}-Profil öffnen`, children: link.icon }) }, link.name))) }));
export default SocialLinks;
