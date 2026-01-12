import React from 'react'
import { motion } from 'framer-motion'
import logo from '../../assets/SelectedWork/nic.svg'
import nic from '../../assets/SelectedWork/nicLeft.svg'


const Card = () => {
  return (
    <div className='card-one'>
      <div className='content-section-one'>
        <div className='text-content-one'>
          <div className='logo-container-one'>
            <img src={logo} className='logo-container-nic' alt="Government of India Logo" />
          </div>
          <div className='text-write-one'>
            <h1 className='main-heading-one'>Redesigning the eOffice experience</h1>
            <p className='description-text-one'>Crafting a unified design language to empower consistency, accessibility, and innovation across India's digital governance landscape.</p>
          </div>
          <div className='metrics-container-one'>
            <div className='metric-item-one'>
              <p className='metric-label-one'>Downloads on Figma</p>
              <div className='metric-value-container-one'>
                <p className='metric-value-one'>7,000+</p>
              </div>
            </div>
            <div className='metric-item-one'>
              <p className='metric-label-one'>Ministries Adopted</p>
              <div className='metric-value-container-one'>
                <p className='metric-value-one'>30+</p>
              </div>
            </div>
            <div className='metric-item-one'>
              <p className='metric-label-one'>States</p>
              <div className='metric-value-container-one'>
                <p className='metric-value-one'>Codasjn</p>
              </div>
            </div>
          </div>
        </div>
        <div className='button-section-three'>
          <motion.button whileTap={{ scale: 0.95 }} className='read-case-btn-three'>Read Case Study</motion.button>
        </div>
      </div>
      <div className='image-section-one'>
        <img className='photo-img-one' src={nic} alt="UX4G Design System" />
      </div>
    </div>
  )
}

export default Card