import React from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";

const About = () => {
    const { language } = useAppContext();
    const lang = translations[language];

    return (
        <section id="about" className="about-section">
            <h2>{lang.about}</h2>

            <div className="about-cards">
                <p><strong>{lang.age}:</strong> 23 {lang.yearsOld}</p>
                <p><strong>{lang.location}:</strong> Zürich, Schweiz</p>
                <p><strong>{lang.expirience}:</strong> 8 {lang.months}</p>
                <p><strong>{lang.profile}:</strong> {lang.webdev}</p>
            </div>
        </section>
    );
};

export default About;