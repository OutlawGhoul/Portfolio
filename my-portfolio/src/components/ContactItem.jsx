import React, { useState } from "react";

const ContactItem = ({ value, icon = "" }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div
            onClick={copyToClipboard}
            className="contact-item"
            title="Klicken zum Kopieren"
        >
            <span className="contact-icon">{icon}</span>
            <span className="contact-text">{value}</span>
            {copied && <span className="contact-copied">✅ kopiert!</span>}
        </div>
    );
};

export default ContactItem;