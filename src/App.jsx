import React from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero/Hero';
import './App.css';
import Header from './components/Header/Header';
import KeyHighligths from './components/highlights/KeyHighligths';
import SelectedWork from './components/selectedWorker/SelectedWork';
import SmoothScroll from './components/SmoothScroll';

function App() {
  return (
    <>
      <Nav />
      <SmoothScroll>
        <div className='main-container'>
          <Hero />
          <Header/>
          <KeyHighligths/>
          <SelectedWork/>
        </div>
      </SmoothScroll>
    </>
  );
}

export default App;
