import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import './umangCaseStudy.css';

// Import image assets
import fourImg from '../assets/SelectedWork/four.svg';
import arrowIcon from '../assets/arrow/Icon.svg';

const pills = [
  'Government of India (via UX4G / Digital India)',
  'Gov Tech',
  'G2C',
  'Mobile App',
];

const UmangCaseStudy = () => {
  return (
    <div className="umang-cs-container">

      {/* Hero Blob Background */}
      <div className="umang-cs-blob-wrap">
        <div className="umang-cs-blob"></div>
      </div>

      {/* Go Back Link */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="umang-cs-go-back"
      >
        <Link to="/#my-experiences" className="umang-cs-go-back-link">
          <img src={arrowIcon} alt="Arrow" className="umang-cs-go-back-arrow" />
          <span>Go back</span>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <section className="umang-cs-hero">
        {/* Title with line-by-line reveal */}
        <div className="umang-cs-title-wrap">
          <div style={{ overflow: 'hidden', display: 'block' }}>
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              style={{ display: 'inline-block' }}
              className="umang-cs-title-line"
            >
              Redesigning <span className="umang-cs-highlight">UMANG for India</span> - Integrated Services, Higher Adoption, Smarter Discovery
            </motion.span>
          </div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            className="umang-cs-subtitle"
          >
            Transforming UMANG into a seamless, scalable super-app by integrating key government services and improving service discovery through intelligence and personalization.
          </motion.p>
        </div>

        {/* Subtitle */}


        {/* Pills with staggered reveal */}
        <motion.div
          className="umang-cs-pills"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.95 } }
          }}
        >
          {pills.map((pill, i) => (
            <motion.span
              key={i}
              className="umang-cs-pill"
              variants={{
                hidden: { y: 16, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
            >
              {pill}
            </motion.span>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default UmangCaseStudy;
