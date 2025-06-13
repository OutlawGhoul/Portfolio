import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import animateProgressBars from "../animateProgressBars";
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

    useEffect(() => {
        animateProgressBars();
    }, []);

    return (
        <section id="skills">
            <h2>{t.skills}</h2>
            <div>
                {skillsData.map((skill) => (
                    <div key={skill.name} className="skill-block">
                        <span className="skill-label">{skill.name}</span>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                data-target={`${skill.level}%`}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;