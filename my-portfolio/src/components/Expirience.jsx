import React from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";

const Expirience = () => {
    const { language } = useAppContext();
    const t = translations[language];

    return (
        <section id="expirience" className="expirience-section">
            <h2>{t.titleExpirience}</h2>
            <ul>
                <li>
                    <strong>twofold</strong> {t.buildup} 11/2024 - {t.today}<br />
                    {t.expirienceDescription}
                </li>
            </ul>
        </section>
    );
};

export default Expirience;