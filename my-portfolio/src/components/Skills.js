import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppContext } from "../context/AppContext";
import useProgressBarAnimation from "../useProgressBarAnimation";
import translations from "../i18n";
const skillsData = [
    { name: "HTML", level: 85 },
    { name: "CSS", level: 50 },
    { name: "JavaScript", level: 55 },
    { name: "React", level: 40 },
    { name: "PHP", level: 60 },
    { name: "Laravel", level: 35 },
];
const Skills = () => {
    const { language } = useAppContext();
    const lang = translations[language];
    // Animation
    useProgressBarAnimation();
    return (_jsxs("section", { id: "skills", children: [_jsx("h2", { children: lang.skills }), _jsx("div", { children: skillsData.map((skill) => (_jsxs("div", { className: "skill-block", children: [_jsx("span", { className: "skill-label", children: skill.name }), _jsx("div", { className: "progress-bar", children: _jsx("div", { className: "progress-fill", "data-width": `${skill.level}%` }) })] }, skill.name))) })] }));
};
export default Skills;
