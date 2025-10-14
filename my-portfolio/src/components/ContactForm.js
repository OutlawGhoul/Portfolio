import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";
const ContactForm = () => {
    const { language } = useAppContext();
    const lang = translations[language];
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
    };
    return (_jsxs("section", { id: "contact", children: [_jsx("h2", { children: lang.contact }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { type: "text", name: "name", placeholder: lang.name, value: form.name, onChange: handleChange, required: true }), _jsx("input", { type: "email", name: "email", placeholder: lang.email, value: form.email, onChange: handleChange, required: true }), _jsx("textarea", { name: "message", placeholder: lang.message, value: form.message, onChange: handleChange, required: true }), _jsx("button", { type: "submit", children: lang.submit }), submitted && _jsx("p", { children: lang.success })] })] }));
};
export default ContactForm;
