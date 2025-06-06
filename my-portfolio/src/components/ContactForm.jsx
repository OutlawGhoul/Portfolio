import React, { useState } from "react";

const ContactForm = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Nachricht gesendet! (soon)");
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact">
            <h2>Kontakt</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    value={form.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={handleChange}
                />
                <textarea
                    name="message"
                    placeholder="Nachricht"
                    required
                    value={form.message}
                    onChange={handleChange}
                ></textarea>
                <button type="submit">Abesenden</button>
            </form>
        </section>
    );
};

export default ContactForm;