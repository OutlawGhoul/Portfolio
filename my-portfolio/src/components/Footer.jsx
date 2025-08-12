import React from "react";
import ContactItem from "./ContactItem";
import SocialLinks from "./SocialLinks";

const Footer = () => {

    return (
        <footer>
            <div className="footer-inner">
                <div className="footer-contacts">
                    <ContactItem label="Telefon" value="+41 78 868 84 81" icon="📞" />
                    <br />
                    <ContactItem label="E-Mail" value="steven.schwarz@twofold.swiss" icon="✉️" />
                </div>
                <div className="social-links">
                    <SocialLinks />
                </div>
            </div>
        </footer>
    );
};

export default Footer;