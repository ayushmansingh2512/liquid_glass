import React from 'react'
import { motion } from 'framer-motion'
import logo from '../../assets/SelectedWork/nic.svg'
import nic from '../../assets/SelectedWork/nicLeft.svg'
import AnimatedCounter from './AnimatedCounter'


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
        <div className='button-section-three'>
          <a
            href="https://www.figma.com/proto/E3zX9maA7IeObyeczTx81R/eFile?page-id=2358%3A45299&node-id=2377-46747&viewport=63%2C281%2C0.05&t=7s7Tz5KLfQxbOT1I-1&scaling=contain&content-scaling=fixed&starting-point-node-id=2358%3A45300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button whileTap={{ scale: 0.95 }} className='read-case-btn-three'>
              Read Case Study
            </motion.button>
          </a>
        </div>
      </div>
      <div className='image-section-one'>
        <img className='photo-img-one' src={nic} alt="UX4G Design System" />
      </div>
    </div>
  )
}

export default Card