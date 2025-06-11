import React from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";

const skillsData = [
    { name: "HTML", level: 85},
    { name: "CSS", level: 50},
    { name: "JavaScript", level: 55},
    { name: "React", level: 40},
    { name: "PHP", level: 60},
    { name: "Laravel", level: 35},
];

const Skills = () => {
    const { language } = useAppContext();
    const t = translations[language];

    return (
        <section id="skills">
            <h2>{t.skills}</h2>
            <div>
                {skillsData.map((skill) => (
                    <div key={skill.name} className="skill-block">
                        <span className="skill-label">{skill.name}</span>
                        <div className="progress-bar">
                            <div
                                className="animate-bar"
                                style={{
                                    width: `${skill.level}%`,
                                    '--target-width': `${skill.level}%`
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;