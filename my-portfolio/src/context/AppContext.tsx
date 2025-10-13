import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";

export type Language = "de" | "en";

type AppContextType = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>("de");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setDarkMode(saved === "dark");
    } else {
      const prefersDark = window.matchMedia?.(
        "(prefers-color-scheme: dark)"
      )?.matches;
      setDarkMode(!!prefersDark);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("dark", darkMode);
    try {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    } catch {
      // ignore
    }
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta)
      meta.setAttribute("content", darkMode ? "dark light" : "light dark");
  }, [darkMode]);

  const value = useMemo(
    () => ({ darkMode, setDarkMode, language, setLanguage }),
    [darkMode, language]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within <AppProvider>");
  return ctx;
};
