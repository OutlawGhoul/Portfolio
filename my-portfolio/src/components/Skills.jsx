import React from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";

const skillsData = [
    { name: "HTML", level: 85},
    { name: "CSS", level: 60},
    { name: "JavaScript", level: 75},
    { name: "React", level: 80},
    { name: "PHP", level: 65},
    { name: "Laravel", level: 60},
];

const Skills = () => {
    const { language } = useAppContext();
    const t = translations[language];

    return (
        <section id="skills">
            <h2>{t.skills}</h2>
            <div>
                {skillsData.map((skill) => (
                    <div key={skill.name} className="progress-bar">
                        <div style={{ width: `${skill.level}%` }}></div>
                        <span className="progress-text">{skill.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;