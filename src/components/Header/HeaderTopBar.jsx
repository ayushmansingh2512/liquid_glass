import React from 'react';
import { motion } from 'framer-motion';

const HeaderTopBar = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className="header-top-bar"
    >
      <div className="intro-container">
        <h2 className="intro-text">Hey, I'm Aditya</h2>
        <h2 className="intro-text-sub">Senior Product Designer @ Exotel</h2>
      </div>

      <div className="btn-group">
        <a 
          href="https://www.linkedin.com/in/aditya-pratap-singh-8672581aa/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <motion.button 
            whileTap={{ scale: 0.95 }} 
            className="btn-header-outline"
          >
            Contact Me
          </motion.button>
        </a>
        <a 
          href="https://drive.google.com/file/d/1rxs_T187DeilHCrqFZsitrOdsrKVWGBA/view?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <motion.button 
            whileTap={{ scale: 0.95 }} 
            className="btn-header-filled"
          >
            Download Resume
          </motion.button>
        </a>
      </div>
    </motion.div>
  );
};

export default HeaderTopBar;
