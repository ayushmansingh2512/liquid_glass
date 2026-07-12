import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import behence from '../assets/socialMedia/behence.svg';

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

  // Mobile + Tablet detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1200);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Visibility logic
  const showSocials = !isScrolled && !isMenuOpen && !isMobile;
  const showMenuButton = isScrolled || isMenuOpen || isMobile;

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`n-100 ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}
    >
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

          {/* --- RIGHT: Socials & Menu Button --- */}
          <div className='nav-right'>
            <div className='socialMedia'>
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
            </div>

            <motion.button
              onClick={toggleMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='menu-button'
            >
              <div className='menu-icon'>
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
              </div>
              <span className='menu-text'>
                {isMenuOpen ? "Close" : "Menu"}
              </span>
            </motion.button>
          </div>

        </div>
      </div>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </motion.div>
  );
};

export default Nav;