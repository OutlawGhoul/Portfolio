import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import translations, { TranslationSet } from "../i18n";

type ContactItemProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

const ContactItem: React.FC<ContactItemProps> = ({ value, icon = "" }) => {
  const [copied, setCopied] = useState(false);

  const { language } = useAppContext();
  const lang: TranslationSet = translations[language];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div onClick={copyToClipboard} className="contact-item" title={lang.copy}>
      <span className="contact-icon">{icon}</span>
      <span className="contact-text">{value}</span>
      {copied && <span className="contact-copied">✅ kopiert!</span>}
    </div>
  );
};

export default ContactItem;
