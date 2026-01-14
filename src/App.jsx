import React from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero/Hero';
import './App.css';
import Header from './components/Header/Header';
import KeyHighligths from './components/highlights/KeyHighligths';
import SelectedWork from './components/selectedWorker/SelectedWork';
import SmoothScroll from './components/SmoothScroll';
import Preety from './components/Preety/Preety';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Nav />
      <SmoothScroll>
        <div className='main-container'>
          <Hero />
          <Header />
          <KeyHighligths />
          <SelectedWork />
          <Preety />
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}

export default App;
