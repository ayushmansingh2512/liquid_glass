import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import star from '../../assets/Keyhighlights/star.svg'
import highlightsImg from '../../assets/Keyhighlights/highlights.svg'
import './keyHightlights.css'

const KeyHighligths = () => {
  const [startAnimate, setStartAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimate(true);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='mainHighligt'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={startAnimate ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className='highlight-156'
      >
        <div className='heading'>
          <div className='keyHigh cb-btn cb-btn_cta'>
            <span className="cb-btn_cta-border"></span>
            <span className="cb-btn_cta-ripple">
              <span></span>
            </span>
            <span className="cb-btn_cta-title">
              <img className='star' src={star} alt='star' />
              <span className='p-key'>Key Highlights</span>
            </span>
          </div>
          <p className='p-dis'>Discover what I have been up-to ✨</p>
        </div>

        <img
          className='highlights'
          src={highlightsImg}
          alt="Key Highlights Grid"
        />
      </motion.div>
    </div>
  )
}

export default KeyHighligths;
