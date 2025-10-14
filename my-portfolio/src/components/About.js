import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";
const About = () => {
    const { language } = useAppContext();
    const lang = translations[language];
    return (_jsxs("section", { id: "about", className: "about-section", children: [_jsx("h2", { children: lang.about }), _jsxs("div", { className: "about-cards", children: [_jsxs("p", { children: [_jsxs("strong", { children: [lang.age, ":"] }), " 24 ", lang.yearsOld] }), _jsxs("p", { children: [_jsxs("strong", { children: [lang.location, ":"] }), " Z\u00FCrich, Schweiz"] }), _jsxs("p", { children: [_jsxs("strong", { children: [lang.experience, ":"] }), " 9 ", lang.months] }), _jsxs("p", { children: [_jsxs("strong", { children: [lang.profile, ":"] }), " ", lang.webdev] })] })] }));
};
export default About;
