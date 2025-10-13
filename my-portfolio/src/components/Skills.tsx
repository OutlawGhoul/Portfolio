import React from "react";
import { useAppContext } from "../context/AppContext";
import useProgressBarAnimation from "../useProgressBarAnimation";
import translations, { TranslationSet } from "../i18n";

type Skill = {
  name: string;
  level: number;
};

const skillsData: readonly Skill[] = [
  { name: "HTML", level: 85 },
  { name: "CSS", level: 50 },
  { name: "JavaScript", level: 55 },
  { name: "React", level: 40 },
  { name: "PHP", level: 60 },
  { name: "Laravel", level: 35 },
] as const;

const Skills: React.FC = () => {
  const { language } = useAppContext();
  const lang: TranslationSet = translations[language];

  // Animation
  useProgressBarAnimation();

  return (
    <section id="skills">
      <h2>{lang.skills}</h2>
      <div>
        {skillsData.map((skill) => (
          <div key={skill.name} className="skill-block">
            <span className="skill-label">{skill.name}</span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                data-width={`${skill.level}%`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
