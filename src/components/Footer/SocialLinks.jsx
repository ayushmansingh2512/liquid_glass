import { motion } from 'framer-motion';
import behence from '../../assets/socialMedia/behence.svg';
import gmail from '../../assets/socialMedia/gmail.svg';
import instagram from '../../assets/socialMedia/instagram.svg';
import linkin from '../../assets/socialMedia/linkin.svg';

const SocialLinks = () => {
    return (
        <div className="footer-social-links">
            <a href="https://www.linkedin.com/in/aditya-pratap-singh-8672581aa/" target="_blank" rel="noopener noreferrer">
                <motion.div whileTap={{ scale: 0.95 }} className='socialMediaBtn'>
                    <img className='socialMediaIcon' src={linkin} alt="LinkedIn" />
                </motion.div>
            </a>
            <a href="mailto:contact@example.com" target="_blank" rel="noopener noreferrer">
                <motion.div whileTap={{ scale: 0.95 }} className='socialMediaBtn'>
                    <img className='socialMediaIcon' src={gmail} alt="Gmail" />
                </motion.div>
            </a>
            <a href="https://www.instagram.com/aditya_ps219/?hl=en" target="_blank" rel="noopener noreferrer">
                <motion.div whileTap={{ scale: 0.95 }} className='socialMediaBtn'>
                    <img className='socialMediaIcon' src={instagram} alt="Instagram" />
                </motion.div>
            </a>
            <a href="https://www.behance.net/aditya219" target="_blank" rel="noopener noreferrer">
                <motion.div whileTap={{ scale: 0.95 }} className='socialMediaBtn'>
                    <img className='socialMediaIcon' src={behence} alt="Behance" />
                </motion.div>
            </a>
            <a href="https://drive.google.com/file/d/1yNpPA3WGhI_-a3C6SXfZQoAXNy2P0qi5/view?usp=drivesdk" target="_blank" rel="noopener noreferrer" className="view-resume-btn">
                View Resume
            </a>
        </div>
    )
}

export default SocialLinks;
