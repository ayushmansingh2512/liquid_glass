import "./footer.css"
import FooterHeader from "./FooterHeader"
import SocialLinks from "./SocialLinks"
import FooterName from "./FooterName"

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-top">
                <FooterHeader />
                <SocialLinks />
            </div>
            <FooterName />
        </div>
    )
}

export default Footer;
