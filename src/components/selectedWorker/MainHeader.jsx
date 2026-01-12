import React from 'react'
import star from '../../assets/Keyhighlights/star.svg'

import './select.css'
const MainHeader = () => {
  return (
    <div className='selectedWork'>
      <img className='star' src={star} alt star />
      <h1>Design in Action</h1>

    </div>
  )
}

export default MainHeader
