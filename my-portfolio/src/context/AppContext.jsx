import React, { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('de');

    useEffect(() => {
        document.body.className = darkMode ? 'dark' : '';
    }, [darkMode]);

    return (
        <AppContext.Provider value={{ darkMode, setDarkMode, language, setLanguage }}>
            {children}
        </AppContext.Provider>
    );
};