import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import translations, { TranslationSet } from "../i18n";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const { language } = useAppContext();
  const lang: TranslationSet = translations[language];

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
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
