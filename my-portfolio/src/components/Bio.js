import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";
import SocialLinks from "./SocialLinks";
import profilePic from "/src/assets/images/Profilbild.jpg";
const Bio = () => {
    const { language } = useAppContext();
    const lang = translations[language];
    return (_jsxs("section", { className: "bio-section", children: [_jsxs("div", { className: "text-block", children: [_jsx("p", { className: "small-heading", children: lang.titleBio }), _jsxs("h1", { children: ["Steven", _jsx("br", {}), "Schwarz"] }), _jsx("p", { children: lang.bio }), _jsx(SocialLinks, {})] }), _jsx("div", { className: "image-block", children: _jsx("img", { src: profilePic, alt: "Profilbild" }) })] }));
};
export default Bio;
