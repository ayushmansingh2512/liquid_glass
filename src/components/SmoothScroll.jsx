import { useState, useEffect, useRef } from 'react';
import { motion, useTransform, useSpring, useScroll } from 'framer-motion';

const SmoothScroll = ({ children }) => {
  const [pageHeight, setPageHeight] = useState(0);
  const scrollRef = useRef(null);

  const { scrollY } = useScroll();

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setPageHeight(entry.contentRect.height);
      }
    });

    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const transform = useTransform(scrollY, [0, pageHeight], [0, -pageHeight]);
  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const spring = useSpring(transform, physics);

  return (
    <>
      <motion.div
        ref={scrollRef}
        style={{ y: spring, willChange: 'transform' }}
        className="scroll-container"
      >
        {children}
      </motion.div>
      <div style={{ height: pageHeight }} />
    </>
  );
};

export default SmoothScroll;