import React from 'react'
import MainHeader from './MainHeader'
import Card from './Card'
import CardTwo from './CardTwo'
import CardThree from './CardThree'
import './select.css'
const SelectedWork = () => {
  return (
    <div className='class-container'>
       <MainHeader/>
       <Card/>
       <CardTwo/>
       <CardThree/>
    </div>
  )
}

export default SelectedWork
