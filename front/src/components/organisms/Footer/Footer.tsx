import { FC } from "react";
import { FiPhone, FiMail } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiFacebookBoxFill, RiInstagramFill, RiLinkedinFill } from "react-icons/ri";

const Footer: FC = () => {

    return (
        <footer className="main-footer">
            <div className="footer-container">
                <div>
                    <img src="/Images/logo.svg" width="175" alt="logo" />
                </div>
                <div>
                    <div className="footer-title">Suivez-nous sur nos réseaux sociaux</div>
                    <div style={{ display: "flex", gap: '12px', justifyContent: 'center' }}>
                        <RiFacebookBoxFill size={32} />
                        <RiInstagramFill size={32} />
                        <RiLinkedinFill size={32} />
                    </div>
                </div>
                <div style={{ textAlign: 'left'}}>
                    <div className="footer-title">Informations légales</div>
                    <div>Politique de confidentialité</div>
                    <div>Mentions légales</div>
                    <div>Politique d'utilisation des cookies</div>
                </div>
                <div style={{ textAlign: 'left'}}>
                    <div className="footer-title">Contactez-nous</div>
                    <div>
                        <FiPhone size={16} style={{ marginRight: '8px'}} />
                        +3630
                    </div>
                    <div>
                        <FiMail size={16} style={{ marginRight: '8px'}} />
                        contact@troquetonobject.fr
                    </div>
                    <div>
                        <HiOutlineLocationMarker size={16} style={{ marginRight: '8px'}} />
                        6 Cr de Verdun Rambaud, 69002 Lyon
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;