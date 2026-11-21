import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav';
import Hero from './components/Hero/Hero';
import './App.css';
import Header from './components/Header/Header';
import KeyHighligths from './components/highlights/KeyHighligths';
import SelectedWork from './components/selectedWorker/SelectedWork';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/CustomCursor';
import LifeOutsidePixels from './components/LifeOutsidePixels/LifeOutsidePixels';
import UmangCaseStudy from './pages/UmangCaseStudy';
import { DexCaseStudy } from './pages/dex/DexCaseStudy';
import { AgentWorkspaceCaseStudy } from './pages/agent-workspace/AgentWorkspaceCaseStudy';
import PageTransition from './components/PageTransition/PageTransition';
import { Preloader } from './components/Preloader';

const Home = () => {
  return (
    <div className='main-container'>
      <Hero />
      <Header />
      <KeyHighligths />
      <SelectedWork />
      <LifeOutsidePixels />
      <Footer />
    </div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  // Fires after exit animation completes — screen is fully covered by loader
  // Scroll to top here. Hash scrolling is handled in PageTransition after new DOM exists.
  const handleExitComplete = () => {
    // Disable smooth scrolling for the entire transition lifecycle
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/case-study/umang" element={<PageTransition><UmangCaseStudy /></PageTransition>} />
        <Route path="/case-study/dex" element={<PageTransition><DexCaseStudy /></PageTransition>} />
        <Route path="/case-study/agent-workspace" element={<PageTransition><AgentWorkspaceCaseStudy /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <Preloader />
      <CustomCursor />
      <Nav />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
