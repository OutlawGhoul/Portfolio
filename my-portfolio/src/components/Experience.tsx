import React from "react";
import { useAppContext } from "../context/AppContext";
import translations, { TranslationSet } from "../i18n";

const Experience = () => {
  const { language } = useAppContext();
  const lang: TranslationSet = translations[language];

  return (
    <section id="experience" className="expirience-section">
      <h2>{lang.titleExperience}</h2>
      <ul>
        <li>
          <strong>twofold</strong> {lang.buildup} 11/2024 - 09/2025
          <br />
          {lang.experienceBuildup}
        </li>
        <li>
          <strong>twofold</strong> {lang.apprenticeship} 10/2025 - {lang.today}{" "}
          <br />
          {lang.experienceApprenticeship}
        </li>
      </ul>
    </section>
  );
};

export default Experience;
