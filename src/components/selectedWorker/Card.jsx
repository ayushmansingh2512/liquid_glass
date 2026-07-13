import React from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

const Card = ({ tag, title, description, image, actions = [], isComingSoon }) => {
  const navigate = useNavigate();
  const primaryAction = actions.find(action => action.type === 'button' && action.href);
  const mainHref = primaryAction ? primaryAction.href : null;
  const isInternal = primaryAction ? primaryAction.isInternalLink : false;

  const handleCardClick = (e) => {
    if (e.target.closest('.portfolio-card-actions') || e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    if (mainHref) {
      if (isInternal) {
        navigate(mainHref);
      } else {
        window.open(mainHref, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`portfolio-card ${mainHref ? 'is-clickable' : ''} ${isComingSoon ? 'is-coming-soon' : ''}`}
      data-cursor={isComingSoon ? "Coming Soon" : (mainHref ? "VIEW" : undefined)}
      onClick={handleCardClick}
    >
      <div className='portfolio-card-image-wrap'>
        <img className='portfolio-card-image' src={image} alt={title} />
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
                    >
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className={`portfolio-btn ${action.variant === 'outline' ? 'btn-outline' : 'btn-primary'}`}
                      >
                        {action.hasDot && <span className='btn-status-dot'></span>}
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
                  >
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className={`portfolio-btn ${action.variant === 'outline' ? 'btn-outline' : 'btn-primary'}`}
                    >
                      {action.hasDot && <span className='btn-status-dot'></span>}
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
  )
}

export default Card
