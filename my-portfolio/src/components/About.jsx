import React from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";

const About = () => {
    const { language } = useAppContext();
    const t = translations[language];

    return (
        <section id="about">
            <h2>{t.about}</h2>
            <div className="bio">
                <p><strong>Name:</strong> Steven Schwarz</p>
                <p><strong>{language === 'de' ? 'Alter' : 'Age'}:</strong> 23 {language === 'de' ? 'Jahre' : 'years old'}</p>
                <p><strong>{language === 'de' ? 'Standort' : 'Location'}:</strong> Zürich, Schweiz</p>
                <p><strong>{language === 'de' ? 'Erfahrung' : 'Experience'}:</strong> 7 {language === 'de' ? 'Monate' : 'months'}</p>
                <p><strong>{language === 'de' ? 'Profil' : 'Profile'}:</strong> {language === 'de' ? 'Webentwicklung (Full-Stack)' : 'Web Developer (Full-Stack)'}</p>
                <p><strong>{t.email}:</strong> <a href="mailto:steven.schwarz0724@gmail.com">steven.schwarz0724@gmail.com</a></p>
                <p><strong>{language === 'de' ? 'Telefon' : 'Phone'}:</strong> <a href="tel: +41788688481">+41 78 868 84 81</a></p>
            </div>
        </section>
    );
};

export default About;