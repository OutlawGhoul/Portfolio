import React from "react";

const About = () => {
    const copyEmail = () => {
        navigator.clipboard.writeText("steven.schwarz0724@gmail.com");
        alert("E-Mail-Adresse kopiert!");
    };

    const copyPhone = () => {
        navigator.clipboard.writeText("+41 78 868 84 81");
        alert("Telefonnummer kopiert!");
    };

    return (
        <section id="about">
            <h2>Über mich</h2>
            <div className="bio">
                <p><strong>Name:</strong> Steven Schwarz</p>
                <p><strong>Alter:</strong> 23 Jahre</p>
                <p><strong>Standort:</strong> Zürich, Schweiz</p>
                <p><strong>Erfahrung:</strong> 7 Monate</p>
                <p><strong>Profil:</strong> Webentwicklung (Full-Stack)</p>
                <p>
                    <strong>E-Mail:</strong>{' '}
                    <a href="#" onClick={copyEmail}>steven.schwarz0724@gmail.com</a>
                </p>
                <p>
                    <strong>Telefon:</strong>{' '}
                    <a href="#" onClick={copyPhone}>+41 78 868 84 81</a>
                </p>
            </div>
        </section>
    );
};

export default About;