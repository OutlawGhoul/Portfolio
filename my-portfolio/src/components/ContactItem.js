import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";
const ContactItem = ({ value, icon = "" }) => {
    const [copied, setCopied] = useState(false);
    const { language } = useAppContext();
    const lang = translations[language];
    const copyToClipboard = () => {
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    return (_jsxs("div", { onClick: copyToClipboard, className: "contact-item", title: lang.copy, children: [_jsx("span", { className: "contact-icon", children: icon }), _jsx("span", { className: "contact-text", children: value }), copied && _jsx("span", { className: "contact-copied", children: "\u2705 kopiert!" })] }));
};
export default ContactItem;
