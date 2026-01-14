import React from 'react'
import { motion } from 'framer-motion'
import logo from '../../assets/SelectedWork/nationalEnblem.svg'
import ux4g from '../../assets/SelectedWork/ux4gLeft.svg'
import AnimatedCounter from './AnimatedCounter'


const Card = () => {
  return (
    <div className='card-one'>
      <div className='content-section-one'>
        <div className='text-content-one'>
          <div className='logo-container-one'>
            <img src={logo} alt="Government of India Logo" className='govt-logo' />
          </div>
          <div className='text-write-one'>
            <h1 className='main-heading-one'>UX4G Design System: Transforming Government UX Standards</h1>
            <p className='description-text-one'>Crafting a unified design language to empower consistency, accessibility, and innovation across India's digital governance landscape.</p>
          </div>
          <div className='metrics-container-one'>
            <div className='metric-item-one'>
              <p className='metric-label-one'>Downloads on Figma</p>
              <div className='metric-value-container-one'>
                <p className='metric-value-one'><AnimatedCounter value={7000} className='metric-value-one' />+</p>
              </div>
            </div>
            <div className='metric-item-one'>
              <p className='metric-label-one'>Ministries Adopted</p>
              <div className='metric-value-container-one'>
                <p className='metric-value-one'><AnimatedCounter value={30} className='metric-value-one' />+</p>
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
        <div className='button-section-one'>
          <motion.button whileTap={{ scale: 0.95 }} className='read-case-btn-one'>Read Case Study</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} className='ux4g-btn-one'>
            <span className='btn-span-one'></span>
            UX4G Design System 2.0

          </motion.button>
        </div>
      </div>
      <div className='image-section-one'>
        <img className='photo-img-one' src={ux4g} alt="UX4G Design System" />
      </div>
    </div>
  )
}

export default Card