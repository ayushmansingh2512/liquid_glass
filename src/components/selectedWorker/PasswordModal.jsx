import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PasswordModal.css';

const PasswordModal = ({ isOpen, onClose, onSuccess, projectTitle = "Case Study", targetPassword = "25012109" }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(false);
      setIsSuccess(false);
      setShake(false);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (isSuccess) return;

    if (password === targetPassword) {
      setIsSuccess(true);
      setError(false);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 600);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="pwd-modal-portal" data-cursor-suppress>
          <motion.div
            className="pwd-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <div className="pwd-modal-container">
            <motion.div
              className={`pwd-modal-card ${shake ? 'pwd-modal-shake' : ''} ${isSuccess ? 'pwd-modal-success' : ''}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top specular reflection / glow */}
              <div className="pwd-modal-glow" />

              {/* Close Button */}
              <button 
                type="button" 
                className="pwd-close-btn" 
                onClick={onClose}
                aria-label="Close modal"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Lock Icon Badge */}
              <div className="pwd-icon-wrapper">
                <motion.div 
                  className={`pwd-icon-bubble ${isSuccess ? 'is-unlocked' : ''}`}
                  animate={isSuccess ? { scale: [1, 1.15, 1], rotate: [0, -10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {isSuccess ? (
                    /* Unlocked Icon */
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
                    </svg>
                  ) : (
                    /* Locked Icon */
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  )}
                </motion.div>
              </div>

              {/* Header */}
              <div className="pwd-header-section">
                <div className="pwd-badge">
                  <span className="pwd-badge-dot"></span>
                  Restricted Access
                </div>
                <h3 className="pwd-title">
                  {isSuccess ? "Access Granted" : "Protected Project"}
                </h3>
                <p className="pwd-subtitle">
                  {isSuccess 
                    ? "Redirecting you to the case study..." 
                    : `Please enter the passcode to view ${projectTitle}.`
                  }
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="pwd-form">
                <div className={`pwd-input-wrap ${error ? 'has-error' : ''} ${isSuccess ? 'is-valid' : ''}`}>
                  <div className="pwd-input-left-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <input
                    ref={inputRef}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(false);
                    }}
                    placeholder="Enter passcode..."
                    className="pwd-input"
                    disabled={isSuccess}
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <button
                    type="button"
                    className="pwd-toggle-visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      /* Eye Off */
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      /* Eye */
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>

                {error && (
                  <motion.div 
                    className="pwd-error-msg"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>Incorrect passcode. Please try again.</span>
                  </motion.div>
                )}

                <div className="pwd-actions">
                  <motion.button
                    type="submit"
                    className={`pwd-submit-btn ${isSuccess ? 'btn-success' : ''}`}
                    whileHover={{ scale: isSuccess ? 1 : 1.02 }}
                    whileTap={{ scale: isSuccess ? 1 : 0.98 }}
                    disabled={isSuccess}
                  >
                    {isSuccess ? (
                      <span className="pwd-btn-content">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Unlocked
                      </span>
                    ) : (
                      <span className="pwd-btn-content">
                        Unlock Case Study
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </span>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PasswordModal;
