import React from 'react'
import { motion } from 'framer-motion'
import logo from '../../assets/SelectedWork/nationalEnblem.svg'
import pixel from '../../assets/SelectedWork/telangana.svg'
 

const CardTwo = () => {
  return (
    <div className='card-two'>
      <div className='text-photo-two'>
        <img className='photo-img-two' src={pixel}/>
      </div>
      <div className='text-card-two'>
        <div className='content-section-two'>
           
          <div className='text-write-two'>
            <h1 className='main-heading-two'>Empowering Telangana: Seamless Access to Government Services with T App Folio </h1>
            <p className='description-text-two'>Crafting a unified design language to empower consistency, accessibility, and innovation across India's digital governance landscape.</p>
          </div>
          <div className='clips-container'>
            <div className='clip'><p className='cliptext'>Mobile App Redesign</p></div>
            <div className='clip'><p className='cliptext'>Live Project</p></div>
            <div className='clip'><p className='cliptext'>Government of Telanagana</p></div>
          </div>
        </div>
        <div className='button-section-two'>
          <motion.button whileTap={{ scale: 0.95 }} className='read-case-btn-two'>Read case Study</motion.button>
        </div>
      </div>
    </div>
  )
}

export default CardTwo