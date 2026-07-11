import React from 'react';
import { motion } from 'framer-motion';

const HeaderTopBar = () => {
  return (
    <div className="header-top-bar">
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
            className="btn-outline"
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
            className="btn-filled"
          >
            Download Resume
          </motion.button>
        </a>
      </div>
    </div>
  );
};

export default HeaderTopBar;
