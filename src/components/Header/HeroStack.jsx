import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

// Import local assets
import figmaIcon from '../../assets/hero/stack-figma.svg';
import framerIcon from '../../assets/hero/stack-framer.svg';
import notionIcon from '../../assets/hero/stack-notion.svg';
import claudeIcon from '../../assets/hero/claude-icon.png';
import cursorIcon from '../../assets/hero/stack-cursor.png';
import higgsfieldIcon from '../../assets/hero/stack-higgsfield.png';

const stackData = [
  { name: 'Figma', logo: figmaIcon, iconSize: 20 },
  { name: 'Claude', logo: claudeIcon, rounded: true },
  { name: 'Higgsfield', logo: higgsfieldIcon, rounded: true },
  { name: 'Cursor', logo: cursorIcon, rounded: true, iconSize: 24 },
  { name: 'Framer', logo: framerIcon, iconSize: 20 },
  { name: 'Notion', logo: notionIcon, iconSize: 20 }
];

// --- Magnetic attraction hook ---
function useMagnetic(ref, strength = 0.3) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    };

    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref, strength, x, y]);

  return { x: springX, y: springY };
}

// --- Individual stack bubble icon ---
const StackBubble = ({ tool, index, total }) => {
  const ref = useRef(null);
  const { x, y } = useMagnetic(ref, 0.4);
  const [hovered, setHovered] = useState(false);
  const size = tool.iconSize ?? (tool.rounded ? 22 : 18);

  // 3D tilt on hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-20, 20], [15, -15]);
  const rotateY = useTransform(mouseX, [-20, 20], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      title={tool.name}
      // Staggered blur entrance
      initial={{ opacity: 0, scale: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.6 + index * 0.09
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x,
        y,
        rotateX: hovered ? rotateX : 0,
        rotateY: hovered ? rotateY : 0,
        perspective: 600,
        transformStyle: 'preserve-3d',
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: '#ffffff',
        border: hovered ? '2px solid rgba(213,73,2,0.2)' : '2.2px solid #ffffff',
        boxShadow: hovered
          ? '0 6px 24px rgba(213,73,2,0.15), 0 2px 6px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)'
          : '0 1px 6px rgba(0,0,0,0.10)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginLeft: index === 0 ? 0 : -8,
        zIndex: hovered ? 50 : total - index,
        position: 'relative',
        cursor: 'default',
        transition: 'border 0.3s, box-shadow 0.4s'
      }}
    >
      {/* Breathing glow ring on hover */}
      <motion.div
        animate={{
          boxShadow: hovered
            ? [
                '0 0 0 0px rgba(213,73,2,0.0)',
                '0 0 0 5px rgba(213,73,2,0.12)',
                '0 0 0 0px rgba(213,73,2,0.0)'
              ]
            : '0 0 0 0px rgba(0,0,0,0)'
        }}
        transition={hovered ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: -1,
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />

      {/* Floating wobble wrapper */}
      <motion.div
        animate={{
          y: [0, -5, 0, 3, 0],
          x: [0, 2, 0, -2, 0],
          rotate: [0, index % 2 === 0 ? 3 : -3, 0, index % 2 === 0 ? -2 : 2, 0]
        }}
        transition={{
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.2
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <motion.img
          src={tool.logo}
          alt={tool.name}
          animate={hovered ? { scale: 1.3, rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
          transition={hovered
            ? { scale: { type: 'spring', stiffness: 300, damping: 12 }, rotate: { duration: 0.5, ease: 'easeInOut' } }
            : { type: 'spring', stiffness: 200, damping: 15 }
          }
          style={{
            width: size,
            height: size,
            objectFit: 'contain',
            borderRadius: tool.rounded ? 6 : 0
          }}
        />
      </motion.div>

      {/* Tooltip on hover */}
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.7 }}
        animate={hovered
          ? { opacity: 1, y: -6, scale: 1 }
          : { opacity: 0, y: 6, scale: 0.7 }
        }
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1e1e1e',
          color: '#fff',
          padding: '3px 8px',
          borderRadius: 5,
          fontSize: 10,
          fontFamily: "'Satoshi', sans-serif",
          fontWeight: 600,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          letterSpacing: '-0.2px'
        }}
      >
        {tool.name}
      </motion.div>
    </motion.div>
  );
};

const HeroStack = () => {
  return (
    <div className="hero-stack-container">
      <div className="stack-row">
        {stackData.map((tool, idx) => (
          <StackBubble key={tool.name} tool={tool} index={idx} total={stackData.length} />
        ))}
      </div>
    </div>
  );
};

export default HeroStack;
