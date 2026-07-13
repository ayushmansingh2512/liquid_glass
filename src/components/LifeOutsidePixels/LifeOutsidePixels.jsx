import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue } from 'framer-motion';
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

// Photography and music cards data configured for the interactive board
const cardsData = [
  { id: 1, type: 'image', src: img1, top: '2%', left: '6%', rotate: '-6deg', w: 220, side: 'left', label: 'Vintage Lens' },
  { id: 2, type: 'image', src: img2, top: '4%', left: '30%', rotate: '4deg', w: 250, side: 'left', label: 'Mountain Retreat' },
  { id: 3, type: 'image', src: img3, top: '5%', left: '55%', rotate: '-3deg', w: 270, side: 'right', label: 'Morning Brew' },
  { id: 4, type: 'image', src: img4, top: '3%', left: '78%', rotate: '6deg', w: 200, side: 'right', label: 'Shadow Play' },
  { id: 5, type: 'image', src: img5, top: '32%', left: '3%', rotate: '4deg', w: 200, side: 'left', label: 'Desk Inspiration' },
  { id: 6, type: 'image', src: img6, top: '30%', left: '26%', rotate: '-4deg', w: 255, side: 'right', label: 'Misty Woods' },
  { id: 7, type: 'image', src: img7, top: '34%', left: '54%', rotate: '2deg', w: 165, side: 'right', label: 'Minimal Portrait' },
  { id: 8, type: 'music', track: 'Persephone', artist: 'Opeth', coverUrl: spotifyOpeth, top: '30%', left: '76%', rotate: '-5deg', w: 158, h: 195, side: 'right', label: 'Opeth Album' },
  { id: 9, type: 'image', src: img8, top: '68%', left: '8%', rotate: '-4deg', w: 220, side: 'left', label: 'Abstract Concept' },
  { id: 10, type: 'music', track: 'Terminal Frost', artist: 'Pink Floyd', coverUrl: spotifyPinkFloyd, top: '68%', left: '42%', rotate: '5deg', w: 158, h: 195, side: 'right', label: 'Floyd Album' }
];

const MusicCard = ({ card }) => {
  return (
    <div className="lop-music-card" style={{ width: card.w, height: card.h }}>
      <div className="lop-music-cover" style={{
        backgroundImage: card.coverUrl ? `url(${card.coverUrl})` : undefined
      }} />
      <div className="lop-music-info">
        <p className="lop-music-track">{card.track}</p>
        <p className="lop-music-artist">{card.artist}</p>
      </div>
    </div>
  );
};

const ImageCard = ({ card, hovered }) => {
  return (
    <div className="lop-image-card" style={{ width: card.w, height: card.h || 'auto' }}>
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
        alt={card.label}
      />
    </div>
  );
};

const BoardCard = ({ card, index, scrollYProgress, landed, imgZIndexes, setImgZIndexes, zCounterRef }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const rectRef = useRef(null);
  const animationFrameId = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Local drag values for framer motion
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Position math derived from Yanilu's scattered state
  const sameSideCards = cardsData.slice(0, index).filter(c => c.side === card.side).length;
  const startX = card.side === 'left' ? 0 : 826.2;
  const targetX = (parseFloat(card.left) / 100) * 972;
  const targetY = (parseFloat(card.top) / 100) * 578;

  // Scattered initial offsets
  const staggerOffset = card.side === 'left'
    ? (sameSideCards - 2) * 50 + ([0, 30, -20, 15, -10, 25, -15, 20, -25, 10][sameSideCards] ?? 0)
    : -((sameSideCards - 2) * 50) + ([0, -30, 20, -15, 10, -25, 15, -20, 25, -10][sameSideCards] ?? 0);

  const initialXOffset = startX + staggerOffset - targetX;
  const initialYOffset = -491.3 + 70 * sameSideCards - targetY;

  // Transforms mapping scroll to visual target coordinates
  const xTransform = useTransform(scrollYProgress, [0, 0.3, 0.85], [initialXOffset, initialXOffset, 0]);
  const yTransform = useTransform(scrollYProgress, [0, 0.3, 0.85], [initialYOffset, initialYOffset, 0]);
  const opacityTransform = useTransform(scrollYProgress, [0.25, 0.45, 0.85, 1], [0, 1, 1, 1]);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    zCounterRef.current += 1;
    setImgZIndexes(prev => {
      const next = [...prev];
      next[index] = zCounterRef.current;
      return next;
    });
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  }, [index, setImgZIndexes, zCounterRef]);

  const handleMouseMove = useCallback((e) => {
    const rect = rectRef.current;
    if (!rect) return;

    if (animationFrameId.current === null) {
      animationFrameId.current = requestAnimationFrame(() => {
        animationFrameId.current = null;
        const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
        const yPercent = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({
          rotateX: -20 * yPercent,
          rotateY: 20 * xPercent
        });
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (animationFrameId.current !== null) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    setTilt({ rotateX: 0, rotateY: 0 });
    setHovered(false);
    rectRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const handleDragStart = () => {
    zCounterRef.current += 1;
    setImgZIndexes(prev => {
      const next = [...prev];
      next[index] = zCounterRef.current;
      return next;
    });
  };

  return (
    <motion.div
      ref={cardRef}
      drag={landed}
      dragMomentum={false}
      whileDrag={{ scale: 1.08 }}
      onDragStart={handleDragStart}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={card.label}
      className="cursor-grab active:cursor-grabbing"
      style={{
        position: 'absolute', // Hardcoded inline style to bypass missing Tailwind definitions
        top: card.top,
        left: card.left,
        rotate: card.rotate,
        zIndex: imgZIndexes[index],
        x: landed ? dragX : xTransform,
        y: landed ? dragY : yTransform,
        opacity: landed ? 1 : opacityTransform,
        perspective: 600
      }}
    >
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: hovered ? 1.04 : 1
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {card.type === 'music' ? (
          <MusicCard card={card} hovered={hovered} />
        ) : (
          <ImageCard card={card} hovered={hovered} />
        )}
      </motion.div>
    </motion.div>
  );
};

const CenterTitle = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        pointerEvents: 'none',
        textAlign: 'center',
        width: '100%'
      }}
    >
      <h2
        style={{
          fontFamily: "'kalice', Georgia, serif",
          fontSize: '40px',
          fontWeight: 500,
          color: '#161616',
          lineHeight: 1.15,
          letterSpacing: '-1.5px',
          margin: 0,
          textTransform: 'uppercase',
          opacity: 0.9
        }}
      >
        Not Just a Designer
      </h2>
    </div>
  );
};

const LifeOutsidePixels = () => {
  const boardRef = useRef(null);
  const [landed, setLanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Z-Index layer manager state
  const [imgZIndexes, setImgZIndexes] = useState(() => cardsData.map((_, i) => i + 1));
  const zCounterRef = useRef(cardsData.length);

  // Monitor viewport width for mobile layout scaling
  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const { scrollYProgress } = useScroll({
    target: boardRef,
    offset: ['start end', 'center center']
  });

  // Enable dragging lock once user scrolls past 90%
  useMotionValueEvent(scrollYProgress, 'change', (val) => {
    if (val >= 0.9 && !landed) {
      setLanded(true);
    }
    if (val < 0.85 && landed) {
      setLanded(false);
    }
  });

  return (
    <div className="lop-section-wrapper">
      <motion.div
        className="lop-board-outer board-float"
        initial={{ opacity: 0, y: 150, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-150px' }}
      >
        {/* Board Wooden Frame "Mat" */}
        <div className="lop-board-mat">
          {/* Inner Bulletin Board */}
          <div
            ref={boardRef}
            className={`lop-board-inner ${isMobile ? 'lop-board-mobile' : 'lop-board-desktop'}`}
          >
            {/* Fine Paper Noise Overlay */}
            <div className="lop-noise-overlay" />

            {/* Dotted Grid Layout Overlay */}
            <div className="lop-grid-overlay" />

            {/* Geographical Coordinates Overlay */}
            <div className="lop-coordinates-col">
              {"47.6062°N 122.3321°W"
                .split("")
                .map((char, index) => (
                  <span
                    key={index}
                    className="lop-coordinates-char"
                  >
                    {char}
                  </span>
                ))}
            </div>

            {/* Center Title (Not Just a Designer) */}
            <CenterTitle />

            {/* Board Cards Render Layer */}
            <div
              className="lop-cards-layer"
              style={
                isMobile
                  ? {
                      position: 'absolute',
                      inset: 0,
                      transform: 'scale(0.55)',
                      transformOrigin: 'top left',
                      width: `${100 / 0.55}%`,
                      height: `${100 / 0.55}%`
                    }
                  : {
                      position: 'absolute',
                      inset: 0
                    }
              }
            >
              {cardsData.map((card, index) => (
                <BoardCard
                  key={card.id}
                  card={card}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  landed={isMobile || landed}
                  imgZIndexes={imgZIndexes}
                  setImgZIndexes={setImgZIndexes}
                  zCounterRef={zCounterRef}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LifeOutsidePixels;
