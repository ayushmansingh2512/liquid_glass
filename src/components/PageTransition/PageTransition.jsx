import React, { useState, useEffect, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import './pageTransition.css';

// Prevent browser from auto-restoring scroll positions on history navigation
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const PageTransition = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Detect aspect ratio for layout shifts
  useEffect(() => {
    const checkLayout = () => {
      setIsMobile(window.innerWidth <= window.innerHeight);
    };
    checkLayout();
    window.addEventListener('resize', checkLayout);
    return () => window.removeEventListener('resize', checkLayout);
  }, []);

  // Runs synchronously BEFORE browser paints the new page.
  // At this point the enter overlay (opacity:1 white fill) is covering the screen.
  useLayoutEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';

    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'auto' });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  // Restore smooth scroll-behavior AFTER the enter overlay has fully faded out (0.4s)
  useEffect(() => {
    const timer = setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
    }, 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const loaderEase = [0.76, 0, 0.24, 1]; // power4.inOut equivalent
  const viewEase = [0.76, 0, 0.2, 1];   // custom cubic-bezier(.76, 0, .2, 1)

  // Exit transition variants (covering the screen when leaving page)
  const backdropVariants = {
    initial: { opacity: 0, pointerEvents: 'none' },
    exit: { 
      opacity: 1, 
      pointerEvents: 'auto',
      transition: { duration: 0.7, ease: loaderEase } 
    }
  };

  const fillVariants = {
    initial: { scaleY: 0, pointerEvents: 'none' },
    exit: { 
      scaleY: 1, 
      pointerEvents: 'auto',
      transition: { duration: 0.7, ease: loaderEase } 
    }
  };

  // Enter transition variants (revealing the screen when new page loads)
  const enterFillVariants = {
    initial: { opacity: 1, pointerEvents: 'auto' },
    animate: { 
      opacity: 0, 
      pointerEvents: 'none',
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  return (
    <>
      {/* Enter phase overlay (fades out when new page mounts) */}
      <motion.div
        className="cb-loader"
        initial={{ display: "block" }}
        animate={{ display: "none", transition: { delay: 0.4 } }}
        style={{ pointerEvents: "none" }}
      >
        <motion.div
          className="cb-loader-fill"
          variants={enterFillVariants}
          initial="initial"
          animate="animate"
        />
      </motion.div>

      {/* Actual Page Content (#view-main) */}
      <motion.div
        id="view-main"
        exit={{ y: isMobile ? "-5vh" : "-10vh" }}
        transition={{ duration: 0.9, ease: viewEase }}
      >
        {children}
      </motion.div>

      {/* Exit phase overlay (slides up when current page unmounts) */}
      <motion.div
        className="cb-loader"
        initial={{ display: "none" }}
        exit={{ display: "block" }}
      >
        <motion.div
          className="cb-loader-backdrop"
          variants={backdropVariants}
          initial="initial"
          exit="exit"
        />
        <motion.div
          className="cb-loader-fill"
          style={{ transformOrigin: "bottom" }}
          variants={fillVariants}
          initial="initial"
          exit="exit"
        />
      </motion.div>
    </>
  );
};

export default PageTransition;
