import React from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero/Hero';
import './App.css';
import Header from './components/Header/Header';
import KeyHighligths from './components/highlights/KeyHighligths';
import SelectedWork from './components/selectedWorker/SelectedWork';
// import Preety from './components/Preety/Preety';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/CustomCursor';
import LifeOutsidePixels from './components/LifeOutsidePixels/LifeOutsidePixels';

function App() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <div className='main-container'>
        <Hero />
        <Header />
        <KeyHighligths />
        <SelectedWork />
        {/* <Preety /> */}
        <LifeOutsidePixels />
        <Footer />
      </div>
    </>
  );
}

export default App;
