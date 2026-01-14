import React from 'react'
import { motion } from 'framer-motion'
import umangLogo from '../../assets/SelectedWork/umang.svg'
import UmangLeft from '../../assets/SelectedWork/umangLeft.svg'
import arrowDown from '../../assets/SelectedWork/TrendDown.svg'
import arrowUp from '../../assets/SelectedWork/TrendUp.svg'
import AnimatedCounter from './AnimatedCounter'


const CardZero = () => {
  return (
    <div className='card-zero'>
      <div className='image-section-zero'>
        <img className='photo-img-zero' src={UmangLeft} alt="Exotel Interface" />
      </div>
      <div className='content-section-zero'>
        <div className='text-content-zero'>
          <div className='logo-container-zero'>
            <img src={umangLogo} alt="Exotel Logo" className='exotel-logo' />
          </div>
          <div className='text-write-zero2'>
            <h1 className='main-heading-zero'>Redesigning UMANG for India: Integrated Services, Higher Adoption, Smarter Discovery</h1>
            <div className='description-text-zero'>
              <p className='description-text-zero'>Transforming UMANG into a seamless, scalable super-app by integrating key government services and improving service discovery through intelligence and personalization.</p>
            </div>
          </div>
          <div className='metrics-container-zero'>
            <div className='metric-item'>
              <p className='metric-label'>New Service Onboarding</p>
              <div className='metric-value-container'>

                <p className='metric-value'><AnimatedCounter value={120} className='metric-value' />+</p>
              </div>
            </div>
            <div className='metric-item'>
              <p className='metric-label'>Service Discovery Time</p>
              <div className='metric-value-container'>
                <img src={arrowDown} alt="Increase" className='metric-arrow' />
                <p className='metric-value'><AnimatedCounter value={18} className='metric-value' />%</p>
              </div>
            </div>
            <div className='metric-item'>
              <p className='metric-label'>DigiLocker & MyScheme adoption</p>
              <div className='metric-value-container'>
                <img src={arrowUp} alt="Increase" className='metric-arrow' />
                <p className='metric-value'><AnimatedCounter value={38} className='metric-value' />%</p>
              </div>
            </div>

          </div>
        </div>
        <div className='button-section-two'>
          <motion.button whileTap={{ scale: 0.95 }} className='read-case-btn-two'>Read Case Study</motion.button>
        </div>
      </div>
    </div>
  )
}

export default CardZero