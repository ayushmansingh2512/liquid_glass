import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import behence from '../assets/socialMedia/behence.svg';
import gmail from '../assets/socialMedia/gmail.svg';
import instagram from '../assets/socialMedia/instagram.svg';
import linkin from '../assets/socialMedia/linkin.svg';
import aditya from '../assets/title/aditya.svg';
import MenuOverlay from './MenuOverlay';
import './nav.css';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Visibility logic
  const showCenterLinks = !isScrolled && !isMenuOpen && !isMobile;
  const showSocials = !isScrolled && !isMenuOpen && !isMobile;
  const showMenuButton = isScrolled || isMenuOpen || isMobile;

  return (
    <div className='n-100'>
      <div className='grid-background'>
        <div className='gradient-blob'></div>
        <div className='nav'>

          {/* --- LEFT: Title / Logo --- */}
          <div className='title'>
            <div className='title-photo'>
              <img className='title-png' src={aditya} alt="Aditya" />
            </div>
            <h1 className='nav-head'>Aditya PS.</h1>
          </div>

          {/* --- CENTER: Nav Links (Visible at top) --- */}
          <div className='nav-center'>
            <AnimatePresence>
              {showCenterLinks && (
                <motion.div
                  key="center-links"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                  className='center-links-container'
                >
                  <a href="https://drive.google.com/file/d/1yNpPA3WGhI_-a3C6SXfZQoAXNy2P0qi5/view?usp=drivesdk" target="_blank" rel="noreferrer">
                    <motion.p whileTap={{ scale: 0.95 }} className='para-1'>Resume</motion.p>
                  </a>
                  <a href="#my-experiences">
                    <motion.p whileTap={{ scale: 0.95 }} className='para-1'>My Experiences</motion.p>
                  </a>
                  <a href="https://www.linkedin.com/in/aditya-pratap-singh-8672581aa/" target="_blank" rel="noreferrer">
                    <motion.p whileTap={{ scale: 0.95 }} className='para-1'>Contact</motion.p>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- RIGHT: Socials <-> Menu Button --- */}
          <div className='nav-right'>
            <AnimatePresence mode="wait">
              {showSocials ? (
                <motion.div
                  key="socials"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                  className='socialMedia'
                >
                  <a href="https://www.instagram.com/aditya_ps219/?hl=en" target="_blank" rel="noreferrer">
                    <motion.div whileTap={{ scale: 0.95 }} className='socialMediaBtn'>
                      <img className='socialMediaIcon' src={instagram} alt="Instagram" />
                    </motion.div>
                  </a>
                  <a href="mailto:contact@example.com" target="_blank" rel="noreferrer">
                    <motion.div whileTap={{ scale: 0.95 }} className='socialMediaBtn'>
                      <img className='socialMediaIcon' src={gmail} alt="Gmail" />
                    </motion.div>
                  </a>
                  <a href="https://www.linkedin.com/in/aditya-pratap-singh-8672581aa/" target="_blank" rel="noreferrer">
                    <motion.div whileTap={{ scale: 0.95 }} className='socialMediaBtn'>
                      <img className='socialMediaIcon' src={linkin} alt="LinkedIn" />
                    </motion.div>
                  </a>
                  <a href="https://www.behance.net/aditya219" target="_blank" rel="noreferrer">
                    <motion.div whileTap={{ scale: 0.95 }} className='socialMediaBtn'>
                      <img className='socialMediaIcon' src={behence} alt="Behance" />
                    </motion.div>
                  </a>
                </motion.div>
              ) : (
                <motion.button
                  key="menu-btn"
                  onClick={toggleMenu}
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20, transition: { duration: 0.2 } }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='menu-button'
                >
                  <motion.div
                    key={isMenuOpen ? "close" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className='menu-icon'
                  >
                    {isMenuOpen ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                      </svg>
                    )}
                  </motion.div>
                  <span className='menu-text'>
                    {isMenuOpen ? "Close" : "Menu"}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Nav;