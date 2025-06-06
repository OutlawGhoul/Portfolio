import React from "react";

const skills = [
    { name: "HTML", level: 70 },
    { name: "CSS", level: 50 },
    { name: "JavaScript", level: 80 },
    { name: "React", level: 75 },
    { name: "PHP", level: 65 },
    { name: "Laravel", level: 60 },
];

const Skills = () => {
    return (
        <section id="skills" className="skills">
            <h2>Skills</h2>
            {skills.map((skill, index) => (
                <div className="progress-bar" key={index}>
                    <div style={{ width: `${skill.level}%` }}></div>
                    <span className="progress-text">{skill.name}</span>
                </div>
            ))}
        </section>
    );
};

export default Skills;