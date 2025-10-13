import React from "react";
import { useAppContext } from "../context/AppContext";
import translations, { TranslationSet } from "../i18n";

const About: React.FC = () => {
  const { language } = useAppContext();
  const lang: TranslationSet = translations[language];

  return (
    <section id="about" className="about-section">
      <h2>{lang.about}</h2>

      <div className="about-cards">
        <p>
          <strong>{lang.age}:</strong> 24 {lang.yearsOld}
        </p>
        <p>
          <strong>{lang.location}:</strong> Zürich, Schweiz
        </p>
        <p>
          <strong>{lang.experience}:</strong> 9 {lang.months}
        </p>
        <p>
          <strong>{lang.profile}:</strong> {lang.webdev}
        </p>
      </div>
    </section>
  );
};

export default About;
