import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const AnimatedCounter = ({ value, duration = 1, className = '' }) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 40,
        stiffness: 60,
    });
    const isInView = useInView(ref, { once: true, margin: '0px' });

    useEffect(() => {
        if (isInView) {
            motionValue.set(parseFloat(value));
        }
    }, [motionValue, isInView, value]);

    useEffect(() => {
        springValue.on('change', (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat('en-US').format(
                    latest.toFixed(0)
                );
            }
        });
    }, [springValue]);

    return <motion.span ref={ref} className={className} />;
};

export default AnimatedCounter;
