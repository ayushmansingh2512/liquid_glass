import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue } from 'framer-motion';
import './lifeOutsidePixels.css';

// Import local assets
import assassinsCreedImg from '../../assets/LifeOutsidePixels/assassins_creed.svg';
import songKhushnaseebiImg from '../../assets/LifeOutsidePixels/song.svg';
import cs2Img from '../../assets/LifeOutsidePixels/cs2.svg';
import containerImg from '../../assets/LifeOutsidePixels/Container.svg';
import songFreebirdImg from '../../assets/LifeOutsidePixels/song_1.svg';
import mountainsCallingImg from '../../assets/LifeOutsidePixels/mountains_calling.svg';
import stephImg from '../../assets/LifeOutsidePixels/steph.svg';
import f1Img from '../../assets/LifeOutsidePixels/f1.svg';
import billyJoelImg from '../../assets/LifeOutsidePixels/billy_joel.svg';

// Photography and music cards data configured for the interactive board
const cardsData = [
  { id: 1, type: 'image', src: assassinsCreedImg, top: '5%', left: '9%', rotate: '-6deg', w: 240, side: 'left', label: "Assassin's Creed" },
  { id: 2, type: 'music', src: songKhushnaseebiImg, top: '4%', left: '37%', rotate: '4deg', w: 190, side: 'left', label: 'Listen' },
  { id: 3, type: 'image', src: cs2Img, top: '5%', left: '58%', rotate: '-3deg', w: 150, side: 'right', label: 'CS2' },
  { id: 4, type: 'image', src: containerImg, top: '6%', left: '76%', rotate: '6deg', w: 170, side: 'right', label: 'Guitar' },
  { id: 5, type: 'music', src: songFreebirdImg, top: '52%', left: '9%', rotate: '-4deg', w: 200, side: 'left', label: 'Listen' },
  { id: 6, type: 'image', src: mountainsCallingImg, top: '38%', left: '42%', rotate: '2deg', w: 180, side: 'left', label: 'Mountain' },
  { id: 7, type: 'image', src: stephImg, top: '36%', left: '65%', rotate: '-5deg', w: 165, side: 'right', label: 'Steph Curry' },
  { id: 8, type: 'image', src: f1Img, top: '64%', left: '53%', rotate: '3deg', w: 160, side: 'right', label: 'F1 Racing' },
  { id: 9, type: 'music', src: billyJoelImg, top: '58%', left: '76%', rotate: '5deg', w: 200, side: 'right', label: 'Listen' }
];

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

  // Local motion values for drag position initialized with the transformed scroll value
  const dragX = useMotionValue(xTransform.get());
  const dragY = useMotionValue(yTransform.get());
  const [isDragged, setIsDragged] = useState(false);

  // Sync scroll values to drag values until the user starts dragging manually
  useMotionValueEvent(xTransform, 'change', (val) => {
    if (!isDragged) {
      dragX.set(val);
    }
  });

  useMotionValueEvent(yTransform, 'change', (val) => {
    if (!isDragged) {
      dragY.set(val);
    }
  });

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
    setIsDragged(true);
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
      drag={true}
      dragMomentum={false}
      whileDrag={{ scale: 1.08 }}
      onDragStart={handleDragStart}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cursor-grab active:cursor-grabbing"
      style={{
        position: 'absolute', // Hardcoded inline style to bypass missing Tailwind definitions
        top: card.top,
        left: card.left,
        rotate: card.rotate,
        zIndex: imgZIndexes[index],
        x: dragX,
        y: dragY,
        opacity: opacityTransform,
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
        <ImageCard card={card} hovered={hovered} />
      </motion.div>
    </motion.div>
  );
};

const CenterTitle = () => {
  return (
    <div className="lop-center-title">
      Life outside work...
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
    offset: ['start end', 'end end']
  });

  // Enable dragging lock once user scrolls past 95%
  useMotionValueEvent(scrollYProgress, 'change', (val) => {
    if (val >= 0.95) {
      setLanded(true);
    } else if (val < 0.9) {
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
