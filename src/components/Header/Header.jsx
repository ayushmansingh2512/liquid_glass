import React from 'react'
import { motion } from 'framer-motion'
import './header.css'
import exotel from '../../assets/hero/Group.svg'
import plane from '../../assets/hero/plane.svg'
//  --- all of the images for this section are in hero/assests for both exotel logo and contact me ---  
const Header = () => {
  return (
    <div className='h-100'>
      <div className="header-container">
      <p className='intro'>Hey,I'm <span>Aditya</span></p>
      <div className='header-container2'>
        <h1 className='h1-header'><span className='design'>Designing</span> products, systems & stories</h1>
      </div>
      <div className='currently'>
        <div className='greendot'></div>
        <p className='currently-para'>Currently designing CCaaS Enterprise Experiences for</p>
        <img className='exotel' src={exotel} alt="Exotel"/>
      </div>
    
       <a href="https://www.linkedin.com/in/aditya-pratap-singh-8672581aa/" target="_blank"><motion.button whileTap={{ scale: 0.95 }}><img className='plane' src={plane} alt="plane"/> Contact Me</motion.button></a>
      </div>
    </div>
  )
}

export default Header
