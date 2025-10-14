import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useContext, useEffect, useMemo, } from "react";
const AppContext = createContext(null);
export const AppProvider = ({ children, }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState("de");
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        const saved = localStorage.getItem("theme");
        if (saved === "dark" || saved === "light") {
            setDarkMode(saved === "dark");
        }
        else {
            const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
            setDarkMode(!!prefersDark);
        }
    }, []);
    useEffect(() => {
        if (typeof document === "undefined")
            return;
        document.body.classList.toggle("dark", darkMode);
        try {
            localStorage.setItem("theme", darkMode ? "dark" : "light");
        }
        catch {
            // ignore
        }
        const meta = document.querySelector('meta[name="color-scheme"]');
        if (meta)
            meta.setAttribute("content", darkMode ? "dark light" : "light dark");
    }, [darkMode]);
    const value = useMemo(() => ({ darkMode, setDarkMode, language, setLanguage }), [darkMode, language]);
    return _jsx(AppContext.Provider, { value: value, children: children });
};
export const useAppContext = () => {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error("useAppContext must be used within <AppProvider>");
    return ctx;
};
