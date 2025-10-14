import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ContactItem from "./ContactItem";
import SocialLinks from "./SocialLinks";
const Footer = () => {
    return (_jsx("footer", { children: _jsxs("div", { className: "footer-inner", children: [_jsxs("div", { className: "footer-contacts", children: [_jsx(ContactItem, { label: "Telefon", value: "+41 78 868 84 81", icon: "\uD83D\uDCDE" }), _jsx(ContactItem, { label: "E-Mail", value: "steven.schwarz@twofold.swiss", icon: "\u2709\uFE0F" })] }), _jsx("div", { className: "social-links", children: _jsx(SocialLinks, {}) })] }) }));
};
export default Footer;
