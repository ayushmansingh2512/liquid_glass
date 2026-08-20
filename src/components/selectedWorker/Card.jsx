import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import PasswordModal from './PasswordModal'

const Card = ({ tag, title, description, image, actions = [], isComingSoon, password, isProtected }) => {
  const navigate = useNavigate();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const isCardProtected = Boolean(password || isProtected);

  const primaryAction = actions.find(action => action.type === 'button' && action.href);
  const mainHref = primaryAction ? primaryAction.href : null;
  const isInternal = primaryAction ? primaryAction.isInternalLink : false;

  const handleOpenDestination = () => {
    if (mainHref) {
      if (isInternal) {
        navigate(mainHref);
      } else {
        window.open(mainHref, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleCardClick = (e) => {
    if (e.target.closest('.portfolio-card-actions') || e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    if (isComingSoon) return;

    if (isCardProtected) {
      setIsPasswordModalOpen(true);
      return;
    }

    if (mainHref) {
      handleOpenDestination();
    }
  };

  const handleActionClick = (e, action) => {
    if (isCardProtected || action.isProtected) {
      e.preventDefault();
      setIsPasswordModalOpen(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`portfolio-card ${mainHref || isCardProtected ? 'is-clickable' : ''} ${isComingSoon ? 'is-coming-soon' : ''}`}
        data-cursor={isComingSoon ? "Coming Soon" : (isCardProtected ? "UNLOCK" : (mainHref ? "VIEW" : undefined))}
        onClick={handleCardClick}
      >
        <div className='portfolio-card-image-wrap'>
          <img className='portfolio-card-image' src={image} alt={title} />
          {isCardProtected && (
            <div className='portfolio-lock-badge'>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Passcode Protected</span>
            </div>
          )}
        </div>
        <div className='portfolio-card-content'>
          <div className='portfolio-card-desc-box'>
            <div className='portfolio-card-tag-wrap'>
              <span className='portfolio-card-tag'>{tag}</span>
            </div>
            <div className='portfolio-card-text-wrap'>
              <h2 className='portfolio-card-title'>{title}</h2>
              <p className='portfolio-card-desc'>{description}</p>
            </div>
            <div className='portfolio-card-actions'>
              {actions.map((action, i) => {
                if (action.type === 'button') {
                  if (action.isInternalLink) {
                    return (
                      <Link
                        key={i}
                        to={action.href}
                        onClick={(e) => handleActionClick(e, action)}
                      >
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className={`portfolio-btn ${action.variant === 'outline' ? 'btn-outline' : 'btn-primary'}`}
                        >
                          {action.hasDot && <span className='btn-status-dot'></span>}
                          {isCardProtected && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '2px' }}>
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                          )}
                          {action.text}
                        </motion.button>
                      </Link>
                    );
                  }
                  return (
                    <a
                      key={i}
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => handleActionClick(e, action)}
                    >
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className={`portfolio-btn ${action.variant === 'outline' ? 'btn-outline' : 'btn-primary'}`}
                      >
                        {action.hasDot && <span className='btn-status-dot'></span>}
                        {isCardProtected && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '2px' }}>
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                          </svg>
                        )}
                        {action.text}
                      </motion.button>
                    </a>
                  );
                } else {
                  return (
                    <span
                      key={i}
                      className={`portfolio-text-action ${action.variant === 'muted' ? 'text-muted' : 'text-default'}`}
                    >
                      {action.text}
                    </span>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Password Modal */}
      {isCardProtected && (
        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          onSuccess={handleOpenDestination}
          projectTitle={title}
          targetPassword={password || "25012109"}
        />
      )}
    </>
  )
}

export default Card

