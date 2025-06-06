import React from "react";

const Header = () => {
    const copyEmail = () => {
        navigator.clipboard.writeText("steven.schwarz0724@gmail.com");
        alert("E-Mail-Adresse kopiert!");
    };

    return (
        <header>
            <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Profilbild" />
            <h1>Steven Schwarz</h1>
            <p>Webentwickler</p>
            <p>
                <a href="#" onClick={copyEmail}>steven.schwarz0724@gmail.com</a>
            </p>
        </header>
    );
};

export default Header;