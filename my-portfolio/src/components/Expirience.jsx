import React from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";

const Expirience = () => {
    const { language } = useAppContext();
    const lang = translations[language];

    return (
        <section id="expirience" className="expirience-section">
            <h2>{lang.titleExpirience}</h2>
            <ul>
                <li>
                    <strong>twofold</strong> {lang.buildup} 11/2024 - {lang.today}<br />
                    {lang.expirienceDescription}
                </li>
            </ul>
        </section>
    );
};

export default Expirience;