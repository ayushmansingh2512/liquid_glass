import React from 'react'
import star from '../../assets/Keyhighlights/star.svg'
import highlightsImg from '../../assets/Keyhighlights/highlights.svg'
import './keyHightlights.css'

const KeyHighligths = () => {
  return (
    <div className='mainHighligt'>
      <div className='highlight-156'>
        <div className='heading'>
          <div className='keyHigh'>
            <img className='star' src={star} alt='star'/>
            <p className='p-key'>KEY HIGHLIGHTS</p>
          </div>
          <p className='p-dis'>Discover what I have been up-to ✨</p>
        </div>
        
        <img 
          className='highlights' 
          src={highlightsImg} 
          alt="Key Highlights Grid" 
        />
      </div>
    </div>
  )
}

export default KeyHighligths
