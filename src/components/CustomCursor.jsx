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
    
    // Lerped coordinate states
    let dotLerpX = 0;
    let dotLerpY = 0;
    let labelLerpX = 0;
    let labelLerpY = 0;
    
    let animationFrameId = null;
    let lastLabelText = '';

    const handleMouseMove = (e) => {
      clientX = e.clientX;
      clientY = e.clientY;
    };

    const animate = () => {
      // Find element under cursor
      const element = document.elementFromPoint(clientX, clientY);
      
      // Bounding captures for magnetic snap effect (a tags, buttons, magnetic classes)
      const hoveredBtn = element && element.closest('a, button, [role="button"], .clickable, .magnetic-btn');
      
      let targetDotX = clientX;
      let targetDotY = clientY;
      let isCaptured = false;

      if (hoveredBtn) {
        const rect = hoveredBtn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        
        // Snapping attraction algorithm: lock center with light mouse drag responsiveness
        targetDotX = btnCenterX + (clientX - btnCenterX) * 0.2;
        targetDotY = btnCenterY + (clientY - btnCenterY) * 0.2;
        isCaptured = true;
      }

      // Smooth interpolation values
      const dotSpeed = isCaptured ? 0.35 : 0.25;
      dotLerpX += (targetDotX - dotLerpX) * dotSpeed;
      dotLerpY += (targetDotY - dotLerpY) * dotSpeed;

      labelLerpX += (clientX - labelLerpX) * 0.20;
      labelLerpY += (clientY - labelLerpY) * 0.20;

      // Translate coordinates using 3D hardware-acceleration
      if (dot) {
        dot.style.transform = `translate3d(${dotLerpX}px, ${dotLerpY}px, 0) translate(-50%, -50%)`;
      }
      if (labelPos) {
        labelPos.style.transform = `translate3d(${labelLerpX}px, ${labelLerpY}px, 0) translate(-50%, -50%)`;
      }

      // Element text label captures (data-cursor attributes)
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

      // Apply classes to trigger CSS transitions for sizes and shapes
      if (dot) {
        const isHoverable = !hasCursorText && (hoveredBtn || isSuppress);
        dot.classList.toggle('custom-cursor-dot-hover', !!isHoverable && !isCaptured);
        dot.classList.toggle('custom-cursor-dot-captured', !!isCaptured);
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
