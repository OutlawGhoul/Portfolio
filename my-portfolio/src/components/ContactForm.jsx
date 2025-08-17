import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";

const ContactForm = () => {
    const { language } = useAppContext();
    const lang = translations[language];

    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact">
            <h2>{lang.contact}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder={lang.name}
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder={lang.email}
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder={lang.message}
                    value={form.message}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{lang.submit}</button>
                {submitted && <p>{lang.success}</p>}
            </form>
        </section>
    );
};

export default ContactForm;