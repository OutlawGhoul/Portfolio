import React from "react";
import ContactItem from "./ContactItem";

const Header = () => {
    const copyEmail = () => {
        navigator.clipboard.writeText("steven.schwarz0724@gmail.com");
        alert("E-Mail-Adresse kopiert!");
    };

    return (
        <header>
            <h1>Steven Schwarz</h1>
            <p>Webentwickler</p>
            <ContactItem label="E-Mail" value="steven.schwarz0724@gmail.com" />
        </header>
    );
};

export default Header;