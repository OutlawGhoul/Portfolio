import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import translations from "../i18n";

const ContactForm = () => {
    const { language } = useAppContext();
    const t = translations[language];

    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", form);
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact">
            <h2>{t.contact}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder={t.name}
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder={t.email}
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder={t.message}
                    value={form.message}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{t.submit}</button>
                {submitted && <p>{t.success}</p>}
            </form>
        </section>
    );
};

export default ContactForm;