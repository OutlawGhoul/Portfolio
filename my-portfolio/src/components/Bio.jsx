import React from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";

const Bio = () => {
    const { language } = useAppContext();
    const t = translations[language];

    return (
        <section id="bio" className="bio-section">
            <h2>{t.titleBio}</h2>
            <p>
                Ich bin ein junger, leidenschaftöicher Webentwickler mit Fokus auf Frontend-Technologie,
                sauberen Code und benutzerfreundliche Interfaces. Mein Ziel ist es, digitale Produkte zu
                entwickeln, die sowohl funktional als auch ästhetisch überzeugen.
            </p>
        </section>
    );
};

export default Bio;