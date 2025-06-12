import React from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";

const Bio = () => {
    const { language } = useAppContext();
    const t = translations[language];

    return (
        <section id="bio" className="bio-section">
            <h2>{t.titleBio}</h2>
            <p>{t.bio}</p>
        </section>
    );
};

export default Bio;