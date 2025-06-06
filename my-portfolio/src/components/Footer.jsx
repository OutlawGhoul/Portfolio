import React from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";

const Footer = () => {
    const { language } = useAppContext();
    const year = new Date().getFullYear();
    const t = translations[language];

    return (
        <footer>
            <p>© {year} {t.copyright}</p>
        </footer>
    );
};

export default Footer;