import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import './umangCaseStudy.css';

// Import image assets
import fourImg from '../assets/SelectedWork/four.svg';
import arrowIcon from '../assets/arrow/Icon.svg';
import headerPhoto from '../assets/umang/headerphto.jpg';
import umangVideo from '../assets/video/umang/Screen_Recording_20260713_213550_Figma.mp4';
import myUmangPoster from '../assets/beforeLoader/myUmang.jpg';
import homeImg1 from '../assets/umang/home/1.jpg';
import homeImg2 from '../assets/umang/home/2.jpg';
import homeImg3 from '../assets/umang/home/3.jpg';
import homeImg4 from '../assets/umang/home/4.jpg';
import voiceImg1 from '../assets/umang/videoSearch/1.jpg';
import voiceImg2 from '../assets/umang/videoSearch/2.jpg';
import voiceImg3 from '../assets/umang/videoSearch/3.jpg';
import profileImg1 from '../assets/umang/multiProfile/1.svg';
import profileImg2 from '../assets/umang/multiProfile/2.svg';
import profileImg3 from '../assets/umang/multiProfile/3.svg';
import profileImg4 from '../assets/umang/multiProfile/4.svg';
import suggestImg1 from '../assets/umang/searchSuggestion/1.svg';
import suggestImg2 from '../assets/umang/searchSuggestion/2.svg';
import suggestImg3 from '../assets/umang/searchSuggestion/3.svg';
import suggestImg4 from '../assets/umang/searchSuggestion/4.svg';
import weatherImg1 from '../assets/umang/weather/1.svg';
import weatherImg2 from '../assets/umang/weather/3.svg';
import weatherImg3 from '../assets/umang/weather/4.svg';
import digiImg1 from '../assets/umang/digilocker/1.svg';
import digiImg2 from '../assets/umang/digilocker/2.svg';

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

      {/* Header Photo with Video Overlay */}
      <motion.div
        className="umang-cs-header-photo-wrap"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
      >
        <img src={headerPhoto} alt="UMANG Redesign Mockup" className="umang-cs-header-photo" />
        <div className="umang-cs-header-video-overlay">
          <video 
            src={umangVideo} 
            poster={myUmangPoster}
            autoPlay 
            loop 
            muted 
            playsInline 
            className="umang-cs-header-video"
          />
        </div>
      </motion.div>

      {/* Info Card */}
      <motion.div 
        className="umang-cs-info-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="umang-cs-info-col team-col">
          <div className="umang-cs-info-title">Team</div>
          <div className="umang-cs-info-list">
            <div className="umang-cs-info-item">1 Designer</div>
            <div className="umang-cs-info-item">1 PM</div>
            <div className="umang-cs-info-item">4 Engineers</div>
          </div>
        </div>
        <div className="umang-cs-info-col role-col">
          <div className="umang-cs-info-title">My Role & Scope</div>
          <div className="umang-cs-info-list">
            <div className="umang-cs-info-item">Research & Benchmarking</div>
            <div className="umang-cs-info-item">Conceptualisation</div>
            <div className="umang-cs-info-item">Design</div>
            <div className="umang-cs-info-item">Handoff</div>
          </div>
        </div>
        <div className="umang-cs-info-col time-col">
          <div className="umang-cs-info-title">Time</div>
          <div className="umang-cs-info-list">
            <div className="umang-cs-info-item">3 Months</div>
          </div>
        </div>
      </motion.div>

      {/* What I Worked On Section */}
      <motion.section 
        className="umang-cs-work-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="umang-cs-work-title">What I worked on</h3>
        <ul className="umang-cs-work-list">
          <li>Redesigned the Home experience with personalized recommendations based on frequently used services, user personas, and state/location-specific offerings.</li>
          <li>Improved search and discovery by helping citizens understand what they can accomplish within UMANG.</li>
          <li>Introduced contextual utilities such as AQI, weather insights for farmers, and emergency information to make the platform more proactive and relevant.</li>
          <li>Designed the DigiLocker integration, enabling users to securely access their DigiLocker documents directly within UMANG. This reduced the need to switch between multiple apps and improved accessibility for users with low-storage devices.</li>
        </ul>
      </motion.section>

      {/* Impact Section */}
      <motion.section 
        className="umang-cs-impact-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="umang-cs-impact-title">Impact</h3>
        <ul className="umang-cs-impact-list">
          <li>⭐ Google Play rating improved from 2.8 → 4.0.</li>
          <li>Reduced service discovery time through better information architecture and personalization.</li>
          <li>Increased engagement with frequently used government services.</li>
          <li>Contributed to higher DigiLocker adoption by making document access available within the UMANG ecosystem.</li>
        </ul>
      </motion.section>

      {/* NDA Disclaimer Box */}
      <motion.div 
        className="umang-cs-nda-box"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        Due to my NDA with the Government of India, I cannot share detailed product strategy, research, or complete design flows. The following screens are shared solely to demonstrate my UI and interaction design capabilities while respecting confidentiality.
      </motion.div>

      {/* Home Mockups Section */}
      <motion.section 
        className="umang-cs-home-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="umang-cs-home-title">Home</h3>
        <div className="umang-cs-home-mockups">
          <img src={homeImg1} alt="UMANG Home Screen 1" />
          <img src={homeImg2} alt="UMANG Home Screen 2" />
          <img src={homeImg3} alt="UMANG Home Screen 3" />
          <img src={homeImg4} alt="UMANG Home Screen 4" />
        </div>
      </motion.section>

      {/* Voice Search Mockups Section */}
      <motion.section 
        className="umang-cs-voice-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="umang-cs-voice-title">Voice Search</h3>
        <div className="umang-cs-voice-mockups">
          <img src={voiceImg1} alt="UMANG Voice Search Screen 1" />
          <img src={voiceImg2} alt="UMANG Voice Search Screen 2" />
          <img src={voiceImg3} alt="UMANG Voice Search Screen 3" />
        </div>
      </motion.section>

      {/* Search Suggestions Mockups Section */}
      <motion.section 
        className="umang-cs-suggest-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="umang-cs-suggest-title">Search Suggestions</h3>
        <div className="umang-cs-suggest-mockups">
          <img src={suggestImg1} alt="UMANG Search Suggestion Screen 1" />
          <img src={suggestImg2} alt="UMANG Search Suggestion Screen 2" />
          <img src={suggestImg3} alt="UMANG Search Suggestion Screen 3" />
          <img src={suggestImg4} alt="UMANG Search Suggestion Screen 4" />
        </div>
      </motion.section>

      {/* Multi Profile Creation Mockups Section */}
      <motion.section 
        className="umang-cs-profile-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="umang-cs-profile-title">Multi Profile Creation</h3>
        <div className="umang-cs-profile-mockups">
          <img src={profileImg1} alt="UMANG Multi Profile Screen 1" />
          <img src={profileImg2} alt="UMANG Multi Profile Screen 2" />
          <img src={profileImg3} alt="UMANG Multi Profile Screen 3" />
          <img src={profileImg4} alt="UMANG Multi Profile Screen 4" />
        </div>
      </motion.section>

      {/* Weather Mockups Section */}
      <motion.section 
        className="umang-cs-weather-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="umang-cs-weather-title">Weather</h3>
        <div className="umang-cs-weather-mockups">
          <img src={weatherImg1} alt="UMANG Weather Screen 1" />
          <img src={weatherImg2} alt="UMANG Weather Screen 2" />
          <img src={weatherImg3} alt="UMANG Weather Screen 3" />
        </div>
      </motion.section>

      {/* DigiLocker Mockups Section */}
      <motion.section 
        className="umang-cs-digi-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="umang-cs-digi-title">DigiLocker</h3>
        <div className="umang-cs-digi-mockups">
          <img src={digiImg1} alt="UMANG DigiLocker Screen 1" />
          <img src={digiImg2} alt="UMANG DigiLocker Screen 2" />
        </div>
      </motion.section>
    </div>
  );
};

export default UmangCaseStudy;
