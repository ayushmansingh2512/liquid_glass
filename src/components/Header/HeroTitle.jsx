import React from 'react';
import { motion } from 'framer-motion';

const HeroTitle = () => {
  return (
    <h1 className="hero-title">
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
    </h1>
  );
};

export default HeroTitle;
