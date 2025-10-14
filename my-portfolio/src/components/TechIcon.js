import { jsx as _jsx } from "react/jsx-runtime";
import { SiReact, SiJavascript, SiHtml5, SiCss3, SiNodedotjs, SiVite, SiGithub, SiGit, SiPhp, SiLaravel, SiLinkedin, } from "react-icons/si";
const MAP = {
    react: SiReact,
    javascript: SiJavascript,
    js: SiJavascript,
    html5: SiHtml5,
    html: SiHtml5,
    css3: SiCss3,
    css: SiCss3,
    nodejs: SiNodedotjs,
    "node.js": SiNodedotjs,
    node: SiNodedotjs,
    vite: SiVite,
    github: SiGithub,
    gh: SiGithub,
    git: SiGit,
    php: SiPhp,
    laravel: SiLaravel,
    linkedin: SiLinkedin,
};
const CANON = {
    react: "react",
    javascript: "js",
    js: "js",
    html5: "html",
    html: "html",
    css3: "css",
    css: "css",
    nodejs: "node",
    node: "node",
    "node.js": "node",
    vite: "vite",
    github: "git",
    gh: "git",
    git: "git",
    php: "php",
    laravel: "laravel",
    linkedin: "linkedin",
};
const norm = (name) => String(name ?? "")
    .trim()
    .toLowerCase();
const TechIcon = ({ name, label, size = 18 }) => {
    const key = norm(name);
    const Icon = MAP[key];
    const canon = CANON[key] ?? key;
    if (!Icon)
        return (_jsx("span", { className: "tech-icon", title: label || name, "aria-label": label || name, children: "\uD83E\uDDE9" }));
    return (_jsx(Icon, { title: label || key, "aria-label": label || key, size: size, className: "tech-icon", "data-name": canon }));
};
export default TechIcon;
