import React from 'react';
import HeaderTopBar from './HeaderTopBar';
import HeroTitle from './HeroTitle';
import HeroStack from './HeroStack';
import './header.css';

const Header = () => {
  return (
    <div className='h-100'>
      <div className="header-container">
        
        {/* --- Top Row: Profile info & Contact buttons --- */}
        <HeaderTopBar />

        {/* --- 60px Spacer Gap --- */}
        <div className="spacer-60" />

        {/* --- Hero Body Section (Title & Stack Icons) --- */}
        <div className="hero-body-container">
          <HeroTitle />
          <HeroStack />
        </div>

      </div>
    </div>
  );
};

export default Header;
