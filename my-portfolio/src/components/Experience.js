import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";
const Experience = () => {
    const { language } = useAppContext();
    const lang = translations[language];
    return (_jsxs("section", { id: "experience", className: "expirience-section", children: [_jsx("h2", { children: lang.titleExperience }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("strong", { children: "twofold" }), " ", lang.buildup, " 11/2024 - 09/2025", _jsx("br", {}), lang.experienceBuildup] }), _jsxs("li", { children: [_jsx("strong", { children: "twofold" }), " ", lang.apprenticeship, " 10/2025 - ", lang.today, " ", _jsx("br", {}), lang.experienceApprenticeship] })] })] }));
};
export default Experience;
