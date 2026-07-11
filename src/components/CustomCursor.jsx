import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const labelPosRef = useRef(null);
  const labelRef = useRef(null);
  const labelTextRef = useRef(null);

  useEffect(() => {
    // Check if device supports hover and has pointer fine (mouse/trackpad)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    document.documentElement.classList.add('custom-cursor-active');

    const dot = dotRef.current;
    const labelPos = labelPosRef.current;
    const label = labelRef.current;
    const labelText = labelTextRef.current;

    let clientX = 0;
    let clientY = 0;
    let lerpX = 0;
    let lerpY = 0;
    let animationFrameId = null;
    let lastLabelText = '';

    const handleMouseMove = (e) => {
      clientX = e.clientX;
      clientY = e.clientY;
      if (dot) {
        dot.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      lerpX += (clientX - lerpX) * 0.25;
      lerpY += (clientY - lerpY) * 0.25;

      if (labelPos) {
        labelPos.style.transform = `translate3d(${lerpX}px, ${lerpY}px, 0) translate(-50%, -50%)`;
      }

      // Check element under cursor
      const element = document.elementFromPoint(clientX, clientY);
      const isSuppress = element && element.closest('[data-cursor-suppress]');
      const cursorTarget = !isSuppress && element && element.closest('[data-cursor]');
      const hasCursorText = !!cursorTarget;

      if (hasCursorText) {
        const text = cursorTarget.getAttribute('data-cursor');
        if (text !== lastLabelText) {
          if (labelText) labelText.textContent = text;
          lastLabelText = text;
        }
        if (label) label.classList.add('custom-cursor-label-active');
        if (dot) dot.classList.add('custom-cursor-dot-hidden');
      } else {
        if (label) label.classList.remove('custom-cursor-label-active');
        if (dot) dot.classList.remove('custom-cursor-dot-hidden');
      }

      // Grow dot on hoverable selectors
      const isHoverable = !hasCursorText && element && (
        element.closest('a, button, [role="button"], input, textarea, select, .clickable') || isSuppress
      );

      if (dot) {
        dot.classList.toggle('custom-cursor-dot-hover', !!isHoverable);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => {
      if (dot) dot.style.opacity = '0';
      if (labelPos) labelPos.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (dot) dot.style.opacity = '1';
      if (labelPos) labelPos.style.opacity = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={labelPosRef} className="custom-cursor-label-pos">
        <div ref={labelRef} className="custom-cursor-label">
          <span ref={labelTextRef} />
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
