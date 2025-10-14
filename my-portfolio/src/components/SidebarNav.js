import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SidebarNav = ({ onLinkClick, t }) => {
    return (_jsx("nav", { className: "sidebar-nav", children: _jsxs("ul", { children: [_jsx("li", { children: _jsx("a", { href: "#bio", onClick: onLinkClick, children: t.navBio }) }), _jsx("li", { children: _jsx("a", { href: "#about", onClick: onLinkClick, children: t.about }) }), _jsx("li", { children: _jsx("a", { href: "#experience", onClick: onLinkClick, children: t.titleExperience }) }), _jsx("li", { children: _jsx("a", { href: "#skills", onClick: onLinkClick, children: t.skills }) }), _jsx("li", { children: _jsx("a", { href: "#projects", onClick: onLinkClick, children: t.projectsTitle }) })] }) }));
};
export default SidebarNav;
