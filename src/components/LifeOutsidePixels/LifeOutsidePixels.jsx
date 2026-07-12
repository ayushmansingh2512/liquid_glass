import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import './lifeOutsidePixels.css';

// Import local assets
import img1 from '../../assets/LifeOutsidePixels/1.webp';
import img2 from '../../assets/LifeOutsidePixels/2.webp';
import img3 from '../../assets/LifeOutsidePixels/3.webp';
import img4 from '../../assets/LifeOutsidePixels/4.webp';
import img5 from '../../assets/LifeOutsidePixels/5.webp';
import img6 from '../../assets/LifeOutsidePixels/6.webp';
import img7 from '../../assets/LifeOutsidePixels/7.webp';
import img8 from '../../assets/LifeOutsidePixels/8.webp';
import spotifyOpeth from '../../assets/LifeOutsidePixels/spotify-opeth.jpg';
import spotifyPinkFloyd from '../../assets/LifeOutsidePixels/spotify-pinkfloyd.jpg';

// Photography and music cards data
const cardsData = [
  { id: 3, type: 'image', src: img1, w: 240, h: 169, x: 30, y: 55, rot: 9, depth: 1, wave: 3, drift: -80 },
  { id: 2, type: 'image', src: img2, w: 300, h: 147, x: 20, y: 425, rot: 4, depth: 1, wave: 3, drift: -145 },
  { id: 4, type: 'image', src: img3, w: 270, h: 148, x: 15, y: 690, rot: -2, depth: 1, wave: 4, drift: -120 },
  { id: 5, type: 'image', src: img4, w: 200, h: 265, x: 370, y: 560, rot: 6, depth: 2, wave: 2, drift: -215 },
  { id: 6, type: 'image', src: img5, w: 200, h: 267, x: 600, y: 140, rot: 2, depth: 2, wave: 1, drift: -280 },
  { id: 13, type: 'image', src: img6, w: 255, h: 165, x: 800, y: 690, rot: 5, depth: 1, wave: 4, drift: -135 },
  { id: 7, type: 'image', src: img7, w: 165, h: 242, x: 1040, y: 55, rot: -5, depth: 1, wave: 3, drift: -175 },
  { id: 8, type: 'music', track: 'Persephone', artist: 'Opeth', coverUrl: spotifyOpeth, trackUrl: 'https://open.spotify.com/track/66ovOAlYsAUFnsl7ti8tvm', w: 158, h: 195, x: 1270, y: 120, rot: 4, depth: 0, wave: 4, drift: -65, group: 'right', fanOffset: { x: 20, y: -90, rot: 4 } },
  { id: 10, type: 'image', src: img8, w: 220, h: 293, x: 1090, y: 540, rot: -3, depth: 2, wave: 3, drift: -310, startScale: 1.45, group: 'right', fanOffset: { x: 0, y: 0, rot: 0 } },
  { id: 14, type: 'music', track: 'Terminal Frost', artist: 'Pink Floyd', coverUrl: spotifyPinkFloyd, trackUrl: 'https://open.spotify.com/track/4hO2y5DRbeMppklIroS1O8', w: 158, h: 195, x: 320, y: 190, rot: -4, depth: 0, wave: 1, drift: -110 }
];

const WAVE_OFFSETS = {
  1: [0, 0.18],
  2: [0.06, 0.28],
  3: [0.14, 0.38],
  4: [0.24, 0.5]
};

const M_IDS = [3, 4, 6, 7];
const N_IDS = [2, 5, 13, 10];
const P_IDS = [3, 6, 4];
const F_IDS = [7, 2, 13];
const I_IDS = [10, 5];

const getCardsByIDs = (ids) => {
  const cardsMap = Object.fromEntries(cardsData.map(c => [c.id, c]));
  return ids.map(id => cardsMap[id]).filter(Boolean);
};

const O_VAL = 750;
const K_VAL = 400;

const getCardPosition = (card) => {
  const t = (card.id * 13 % 17 - 8) * 2.2;
  const n = (card.id * 7 % 11 - 5) * 2.2;
  return {
    cx: O_VAL - card.w / 2 + t,
    cy: K_VAL - card.h / 2 + n
  };
};

const ScrollReveal = ({ children, delay = 0, duration = 0.55, shift = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: shift ? 20 : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const MusicCard = ({ card, hovered }) => {
  return (
    <div className="lop-music-card" style={{ width: card.w, height: card.h }}>
      <div className="lop-music-cover" style={{
        backgroundImage: card.coverUrl ? `url(${card.coverUrl})` : undefined
      }}>
        {/* Play overlay on hover */}
        <motion.div
          className="lop-music-play-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
            <polygon points="6,3 20,12 6,21" />
          </svg>
        </motion.div>
      </div>
      <div className="lop-music-info">
        <p className="lop-music-track">{card.track}</p>
        <p className="lop-music-artist">{card.artist}</p>
        <div className="lop-music-spotify">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#1DB954">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span>Spotify</span>
        </div>
      </div>
    </div>
  );
};

const ImageCard = ({ card, hovered }) => {
  return (
    <div className="lop-image-card" style={{ width: card.w, height: card.h }}>
      <motion.img
        src={card.src}
        width={card.w}
        height={card.h}
        loading="eager"
        decoding="async"
        draggable={false}
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        alt=""
      />
    </div>
  );
};

const InteractiveCard = ({ card, stickyP, hoveredGroup, onGroupEnter, onGroupLeave }) => {
  const [hovered, setHovered] = useState(false);
  const [start, end] = WAVE_OFFSETS[card.wave];
  const { cx, cy } = getCardPosition(card);

  const isGroupHovered = card.group != null && hoveredGroup === card.group;
  const fanOffset = card.fanOffset ?? { x: 0, y: 0, rot: 0 };

  // Position: center → final position
  const xTransform = useTransform(stickyP, [start, end], [cx, card.x]);
  const rotTransform = useTransform(stickyP, [start, end], [card.rot * 0.1, card.rot]);
  const scaleTransform = useTransform(stickyP, [start, end], [card.startScale ?? 0.88, 1]);

  const yTransform = useTransform(stickyP, (val) => {
    const progress = Math.max(0, Math.min(1, (val - start) / (end - start)));
    return cy + progress * (card.y - cy) + val * card.drift;
  });

  // Scroll-linked opacity: cards fade in as they fan out
  const cardOpacity = useTransform(stickyP, [start, Math.min(start + 0.08, end)], [0, 1]);

  const zIndex = card.depth * 3 + 1 + (hovered ? 20 : isGroupHovered ? 8 : 0);

  return (
    <motion.div
      data-cursor={card.trackUrl ? 'Listen' : undefined}
      style={{
        position: 'absolute',
        x: xTransform,
        y: yTransform,
        rotate: rotTransform,
        scale: scaleTransform,
        opacity: cardOpacity,
        zIndex,
        cursor: 'pointer',
        willChange: 'transform, opacity'
      }}
      onClick={() => card.trackUrl && window.open(card.trackUrl, '_blank', 'noopener,noreferrer')}
      onMouseEnter={() => {
        setHovered(true);
        if (card.group) onGroupEnter(card.group);
      }}
      onMouseLeave={() => {
        setHovered(false);
        if (card.group) onGroupLeave();
      }}
    >
      <motion.div
        animate={{
          x: isGroupHovered ? fanOffset.x : 0,
          y: isGroupHovered ? fanOffset.y + (hovered ? -14 : 0) : (hovered ? -14 : 0),
          rotate: isGroupHovered ? fanOffset.rot : 0,
          scale: hovered ? 1.04 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 22
        }}
      >
        {card.type === 'music' && <MusicCard card={card} hovered={hovered} />}
        {card.type === 'image' && <ImageCard card={card} hovered={hovered} />}
      </motion.div>
    </motion.div>
  );
};

const MobileCard = ({ card, index, skipReveal = false }) => {
  const [hovered, setHovered] = useState(false);
  const content = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {card.type === 'image' && (
        <div className="lop-mobile-image-wrap" style={{ aspectRatio: `${card.w} / ${card.h}` }}>
          <motion.img
            src={card.src}
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      {card.type === 'music' && <MusicCard card={card} hovered={hovered} />}
    </div>
  );
  return skipReveal ? content : <ScrollReveal delay={index * 0.03}>{content}</ScrollReveal>;
};

const MobileColumn = ({ images, startIndex = 0, skipReveal = false }) => {
  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {images.map((card, idx) => (
        <MobileCard key={card.id} card={card} index={startIndex + idx} skipReveal={skipReveal} />
      ))}
    </div>
  );
};

const MobileGrid = ({ columns, className = '', padTop = 8, skipReveal = false }) => {
  let startIndex = 0;
  const gridContent = (
    <div className={`items-stretch ${className}`} style={{ gap: 12, padding: `${padTop}px 24px 52px` }}>
      {columns.map((col, idx) => {
        const colEl = <MobileColumn key={idx} images={col} startIndex={startIndex} skipReveal={skipReveal} />;
        startIndex += col.length;
        return colEl;
      })}
    </div>
  );
  return skipReveal ? <ScrollReveal duration={0.45} shift={false}>{gridContent}</ScrollReveal> : gridContent;
};

// Scroll-driven center title that fades out as cards spread
const CenterTitle = ({ stickyP }) => {
  // Title visible at the start, fades out as cards fan
  const titleOpacity = useTransform(stickyP, [0, 0.12], [1, 0]);
  const titleScale = useTransform(stickyP, [0, 0.12], [1, 0.92]);
  const titleY = useTransform(stickyP, [0, 0.12], [0, 20]);

  return (
    <div className="lop-center-title">
      <motion.div style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}>
        <h2 className="lop-title">
          Not Just a<br />Designer
        </h2>
      </motion.div>
    </div>
  );
};

const LifeOutsidePixels = () => {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const hoverTimeoutRef = useRef(null);

  const handleGroupEnter = useCallback((group) => {
    clearTimeout(hoverTimeoutRef.current);
    setHoveredGroup(group);
  }, []);

  const handleGroupLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => setHoveredGroup(null), 80);
  }, []);

  const { scrollYProgress: enterProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const { scrollYProgress: stickyProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const containerOpacity = useTransform(enterProgress, [0.78, 0.96], [1, 0.84]);

  const handleScrollProgress = useCallback((val) => {
    const trigger = triggerRef.current;
    if (trigger) {
      if (val < 0.01) {
        trigger.setAttribute('data-cursor', 'Scroll');
      } else {
        trigger.removeAttribute('data-cursor');
      }
    }
  }, []);

  useEffect(() => {
    handleScrollProgress(stickyProgress.get());
  }, [handleScrollProgress, stickyProgress]);

  useMotionValueEvent(stickyProgress, 'change', handleScrollProgress);

  const leftCols = getCardsByIDs(M_IDS);
  const rightCols = getCardsByIDs(N_IDS);
  const col1 = getCardsByIDs(P_IDS);
  const col2 = getCardsByIDs(F_IDS);
  const col3 = getCardsByIDs(I_IDS);

  return (
    <div>
      {/* Desktop view */}
      <div ref={containerRef} className="hidden lg:block" style={{ height: '300vh', background: 'transparent' }}>
        <div ref={triggerRef} style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
          <motion.div
            className="lop-desktop-container"
            style={{ opacity: containerOpacity }}
          >
            {cardsData.map((card) => (
              <InteractiveCard
                key={card.id}
                card={card}
                stickyP={stickyProgress}
                hoveredGroup={hoveredGroup}
                onGroupEnter={handleGroupEnter}
                onGroupLeave={handleGroupLeave}
              />
            ))}
            {/* Center title — fades out as cards spread */}
            <CenterTitle stickyP={stickyProgress} />
          </motion.div>
        </div>
      </div>

      {/* Mobile/Tablet view */}
      <div className="lg:hidden" style={{ background: 'transparent', padding: '72px 0 0' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ padding: '0 24px', marginBottom: 27 }}
        >
          <h2 className="lop-mobile-title">Not Just a Designer</h2>
        </motion.div>

        {/* Mobile (flex list) */}
        <MobileGrid className="flex md:hidden" columns={[leftCols, rightCols]} skipReveal={true} />

        {/* Tablet (flex list) */}
        <MobileGrid className="hidden md:flex lg:hidden" columns={[col1, col2, col3]} />
      </div>
    </div>
  );
};

export default LifeOutsidePixels;
