import React from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";
import SocialLinks from "./SocialLinks";
import profilePic from "/public/Profilbild.jpg";

const Bio = () => {
    const { language } = useAppContext();
    const t = translations[language];

    return (
        <section className="bio-section">
            <div className="text-block">
                <p className="small-heading">{t.titleBio}</p>
                <h1>Steven<br />Schwarz</h1>
                <p>{t.bio}</p>
                <SocialLinks />
            </div>
            <div className="image-block">
                <img src={profilePic} alt="Profilbild" />
            </div>
        </section>
    );
};

export default Bio;