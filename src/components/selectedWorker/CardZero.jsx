import React from 'react'
import { motion } from 'framer-motion'
import ExotelLogo from '../../assets/SelectedWork/exotel.svg'
import ExotelLeft from '../../assets/SelectedWork/exotelLeft.svg'
import arrowDown from '../../assets/SelectedWork/TrendDown.svg'
import arrowUp from '../../assets/SelectedWork/TrendUp.svg'
import AnimatedCounter from './AnimatedCounter'


const CardZero = () => {
    return (
        <div className='card-zero'>
            <div className='image-section-zero'>
                <img className='photo-img-zero' src={ExotelLeft} alt="Exotel Interface" />
            </div>
            <div className='content-section-zero'>
                <div className='text-content-zero'>
                    <div className='logo-container-zero'>
                        <img src={ExotelLogo} alt="Exotel Logo" className='exotel-logo' />
                    </div>
                    <div className='text-write-zero'>
                        <h1 className='main-heading-zero'>Scaling Agent Productivity through a Context First Interaction Workspace</h1>
                        <p className='description-text-zero'>Transforming a legacy contact center interface into an AI powered efficient and future ready workspace for millions of customers.</p>
                    </div>
                    <div className='metrics-container-zero'>
                        <div className='metric-item'>
                            <p className='metric-label'>Average Handling Time</p>
                            <div className='metric-value-container'>
                                <img src={arrowDown} alt="Decrease" className='metric-arrow' />
                                <p className='metric-value'><AnimatedCounter value={30} className='metric-value' />%</p>
                            </div>
                        </div>
                        <div className='metric-item'>
                            <p className='metric-label'>First Call Resolution</p>
                            <div className='metric-value-container'>
                                <img src={arrowUp} alt="Increase" className='metric-arrow' />
                                <p className='metric-value'><AnimatedCounter value={18} className='metric-value' />%</p>
                            </div>
                        </div>
                        <div className='metric-item'>
                            <p className='metric-label'>CSAT</p>
                            <div className='metric-value-container'>
                                <img src={arrowUp} alt="Increase" className='metric-arrow' />
                                <p className='metric-value'><AnimatedCounter value={12} className='metric-value' />%</p>
                            </div>
                        </div>

                    </div>
                </div>
               <div className="button-section-zero">
  <a
    href="https://www.behance.net/gallery/244967223/Enterprise-Agent-Workspace-Redesign"
    target="_blank"
    rel="noopener noreferrer"
  >
    <motion.button
      whileTap={{ scale: 0.95 }}
      className="read-case-btn-zero"
    >
      Read Case Study
    </motion.button>
  </a>
</div>
            </div>
        </div>
    )
}

export default CardZero
