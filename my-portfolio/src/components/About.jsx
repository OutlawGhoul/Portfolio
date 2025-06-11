import React from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";
import profilePic from "../assets/images/Profilbild.png";
import ContactItem from "./ContactItem";
import SocialLinks from "./SocialLinks";

const About = () => {
    const { language } = useAppContext();
    const t = translations[language];

    return (
        <section id="about" className="about-section">
            <div className="about-content">
            <h2>{t.about}</h2>
                <p><strong>Name:</strong> Steven Schwarz</p>
                <p><strong>{t.age}:</strong> 23 {t.yearsOld}</p>
                <p><strong>{t.location}:</strong> Zürich, Schweiz</p>
                <p><strong>{t.expirience}:</strong> 7 {t.months}</p>
                <p><strong>{t.profile}:</strong> {t.webdev}</p>
                <ContactItem label="Telefon" value="+41 78 868 84 81" icon="📞" />
                <ContactItem label="E-Mail" value="steven.schwarz@twofold.swiss" icon="✉️" />
                <div className="cv-button">
                    <a href="/Lebenslauf.pdf" target="_blank" rel="noopener noreferrer">
                        <button>Lebenslauf</button>
                    </a>
                </div>

                <SocialLinks />
            </div>
            <div className="about-image-container">
                <img src={profilePic} alt="Profilbild" className="about-image" />
            </div>
        </section>
    );
};

export default About;