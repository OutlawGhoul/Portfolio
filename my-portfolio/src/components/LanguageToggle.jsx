import React from "react";
import { useAppContext } from "../context/AppContext";

const LanguageToggle = () => {
    const { language, setLanguage } = useAppContext();

    return (
        <button onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}>
            {language === 'de' ? 'EN' : 'DE'}
        </button>
    );
};

export default LanguageToggle;