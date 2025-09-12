import React from 'react'
import { motion } from 'framer-motion'
import behence from '../assets/socialMedia/behence.svg';
import gmail from '../assets/socialMedia/gmail.svg';
import instagram from '../assets/socialMedia/instagram.svg';
import linkin from '../assets/socialMedia/linkin.svg';
import './nav.css'
const Nav = () => {
  return (
    // --- this is n-100 because it will have 100% width --- 
    <div className='n-100'>
    <div className='grid-background'>
    <div className='gradient-blob'></div>
        <div className='nav'>
        {/* --- main navigation menu --- */}
        <div className='menu'>
            <a href="https://drive.google.com/file/d/1yNpPA3WGhI_-a3C6SXfZQoAXNy2P0qi5/view?usp=drivesdk " target="_blank"><motion.p whileTap={{ scale: 0.95 }} tag="resume" className='para-1'>Resume</motion.p></a>
            <a href="#my-experiences" target="_blank"><motion.p whileTap={{ scale: 0.95 }} tag="my-experiences" className='para-1'>My Experiences</motion.p></a>
            <a href="https://www.linkedin.com/in/aditya-pratap-singh-8672581aa/" target="_blank"><motion.p whileTap={{ scale: 0.95 }} tag="contact" className='para-1'>contact</motion.p></a>
        </div>
        {/* --- main title --- */}
        <div className='title'>
            <h1 className='nav-head'>Aditya PS.</h1>
        </div>
        {/* --- social media icons with link --- */}
      <div className='socialMedia'>
            {/* Each link now wraps a container for the button and the image */}
            <a href="https://www.instagram.com/aditya_ps219/?hl=en" target="_blank">
              <motion.div whileTap={{ scale: 0.95 }} className='socialMediaBtn'>
                <img className='socialMediaIcon' src={instagram} alt="Instagram" />
              </motion.div>
            </a>
            <a href="" target="_blank">
              <motion.div whileTap={{ scale: 0.95 }} className='socialMediaBtn'>
                <img className='socialMediaIcon' src={gmail} alt="Gmail" />
              </motion.div>
            </a>
            <a href="https://www.linkedin.com/in/aditya-pratap-singh-8672581aa/" target="_blank">
              <motion.div whileTap={{ scale: 0.95 }} className='socialMediaBtn'>
                <img className='socialMediaIcon' src={linkin} alt="LinkedIn" />
              </motion.div>
            </a>
            <a href="https://www.behance.net/aditya219" target="_blank">
              <motion.div whileTap={{ scale: 0.95 }} className='socialMediaBtn'>
                <img className='socialMediaIcon' src={behence} alt="Behance" />
              </motion.div>
            </a>
          </div>
      </div>
    </div>
    </div>
  )
}

export default Nav