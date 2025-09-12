import React from 'react'
import { motion } from 'framer-motion'
import logo from '../../assets/SelectedWork/nationalEnblem.svg'
import Frame from '../../assets/SelectedWork/Frame.svg'
import pixel from '../../assets/SelectedWork/placeholder.svg'
import arrow2 from '../../assets/SelectedWork/arrow2.svg'

const Card = () => {
  return (
    <div className='card'>
      <div className='text-card'>
        <div className='content-section'>
          <img className='logo-img' src={logo}/>
          <div className='text-write'>
            <h1 className='main-heading'>UX4G Design System: Transforming Government UX Standards </h1>
            <p className='description-text'>Crafting a unified design language to empower consistency, accessibility, and innovation across India's digital governance landscape.</p>
          </div>
          <img className='frame-img' src={Frame}/>
        </div>
        <div className='button-section'>
          <motion.button whileTap={{ scale: 0.95 }} className='read-case-btn'>Read case Study</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} className='ux4g-btn'><span className='btn-span'></span>UX4G Design System 2.0 <img className='arrow-img' src={arrow2} alt='arrow'/> </motion.button>
          
        </div>
      </div>
      <div className='text-photo'>
        <img className='photo-img' src={pixel}/>
      </div>
    </div>
  )
}

export default Card