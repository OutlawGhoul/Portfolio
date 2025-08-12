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
            style={{
                cursor: "pointer",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                userSelect: "none",
                position: "relative",
            }}
            title="Klicken zum Kopieren"
        >
            {icon} {value}
            {copied && (
                <span
                    style={{
                        position: "absolute",
                        top: "-1.2rem",
                        left: 0,
                        fontSize: "0.75rem",
                    }}
                >
                    ✅ kopiert!
                </span>
            )}
        </div>
    );
};

export default ContactItem;