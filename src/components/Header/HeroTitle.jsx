import React from 'react';
import { motion } from 'framer-motion';

const HeroTitle = () => {
  return (
    <h1 className="hero-title">
      {/* Desktop view: rigid line split for reveal animation */}
      <span className="hero-title-desktop">
        <div style={{ overflow: 'hidden', display: 'block' }}>
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            style={{ display: 'inline-block' }}
          >
            Building <span className="highlight-text">products</span> people love. Solving
          </motion.span>
        </div>
        <div style={{ overflow: 'hidden', display: 'block' }}>
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.85 }}
            style={{ display: 'inline-block' }}
          >
            problems <span className="highlight-text">businesses</span> care about.
          </motion.span>
        </div>
      </span>

      {/* Tablet / Mobile view: single fluid text block for natural wrapping */}
      <span className="hero-title-mobile">
        <motion.span
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          style={{ display: 'block' }}
        >
          Building <span className="highlight-text">products</span> people love. Solving problems <span className="highlight-text">businesses</span> care about.
        </motion.span>
      </span>
    </h1>
  );
};

export default HeroTitle;
