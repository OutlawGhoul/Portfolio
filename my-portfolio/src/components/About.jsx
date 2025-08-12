import React from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";

const About = () => {
    const { language } = useAppContext();
    const t = translations[language];

    return (
        <section id="about" className="about-section">
            <h2>{t.about}</h2>

            <div className="about-cards">
                <p><strong>{t.age}:</strong> 23 {t.yearsOld}</p>
                <p><strong>{t.location}:</strong> Zürich, Schweiz</p>
                <p><strong>{t.expirience}:</strong> 8 {t.months}</p>
                <p><strong>{t.profile}:</strong> {t.webdev}</p>
            </div>
        </section>
    );
};

export default About;