import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const circleRef = useRef(null);
  const labelTextRef = useRef(null);

  const lastAngle = useRef(0);

  useEffect(() => {
    // Check if device supports hover and has pointer fine (mouse/trackpad)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    document.documentElement.classList.add('custom-cursor-active');

    const dot = dotRef.current;
    const circle = circleRef.current;
    const labelText = labelTextRef.current;

    let clientX = -100;
    let clientY = -100;

    // Lerped coordinate states
    let dotLerpX = -100;
    let dotLerpY = -100;

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
      const hoveredBtn = element && element.closest('a, button, [role="button"], .clickable, .magnetic-btn, .tech-stack-bubble');

      let targetDotX = clientX;
      let targetDotY = clientY;
      let isCaptured = false;

      if (hoveredBtn) {
        const rect = hoveredBtn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        // Snapping attraction algorithm: lock center with light mouse drag responsiveness
        targetDotX = btnCenterX + (clientX - btnCenterX) * 0.25;
        targetDotY = btnCenterY + (clientY - btnCenterY) * 0.25;
        isCaptured = true;
      }

      // Smooth interpolation values
      const dotSpeed = isCaptured ? 0.35 : 0.2;
      dotLerpX += (targetDotX - dotLerpX) * dotSpeed;
      dotLerpY += (targetDotY - dotLerpY) * dotSpeed;

      // Translate coordinates using 3D hardware-acceleration
      if (dot) {
        dot.style.transform = `translate3d(${dotLerpX}px, ${dotLerpY}px, 0) translate(-50%, -50%)`;
      }

      // Calculate stretching/deformation physics based on velocity
      const dx = targetDotX - dotLerpX;
      const dy = targetDotY - dotLerpY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      let angle = lastAngle.current;
      let scaleX = 1;
      let scaleY = 1;

      if (!isCaptured && distance > 2) {
        angle = Math.atan2(dy, dx) * (180 / Math.PI);
        lastAngle.current = angle;

        // Normalize velocity
        const maxDistance = 150;
        const velocity = Math.min(distance, maxDistance) / maxDistance;

        // Cuberto-style organic stretch and squish
        scaleX = 1 + velocity * 0.45;
        scaleY = 1 - velocity * 0.25;
      }

      if (circle) {
        circle.style.transform = `rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
      }

      // Element text label captures (data-cursor attributes)
      const isSuppress = element && element.closest('[data-cursor-suppress]');
      const cursorTarget = !isSuppress && element && element.closest('[data-cursor]');
      const hasCursorText = !!cursorTarget && !hoveredBtn;

      if (hasCursorText) {
        const text = cursorTarget.getAttribute('data-cursor');
        if (text !== lastLabelText) {
          if (labelText) {
            // Automatically break two-word or multi-word labels inside the circular cursor
            const formattedText = text.trim().replace(/\s+/g, '<br />');
            labelText.innerHTML = formattedText;
          }
          lastLabelText = text;
        }
        if (dot) {
          dot.classList.add('custom-cursor-dot-has-text');
          if (text === 'Coming Soon') {
            dot.classList.add('custom-cursor-dot-small-text');
          } else {
            dot.classList.remove('custom-cursor-dot-small-text');
          }
        }
      } else {
        if (dot) {
          dot.classList.remove('custom-cursor-dot-has-text');
          dot.classList.remove('custom-cursor-dot-small-text');
        }
      }

      if (dot) {
        // Toggle theme based on background element's section
        const isDarkBg = element && element.closest('#my-experiences, .footer-container, .n-100, .nav, .menu-container, .menu-overlay, .lop-music-card');
        if (isDarkBg) {
          dot.classList.add('custom-cursor-dark-bg');
          dot.classList.remove('custom-cursor-light-bg');
        } else {
          dot.classList.add('custom-cursor-light-bg');
          dot.classList.remove('custom-cursor-dark-bg');
        }

        // Detect if snapped element is a tech stack bubble or a filled/outline button
        const isStack = hoveredBtn && hoveredBtn.classList.contains('tech-stack-bubble');
        const isDarkBtn = hoveredBtn && (hoveredBtn.closest('.btn-header-filled, .btn-primary, .lop-music-card') || (hoveredBtn.tagName === 'A' && hoveredBtn.querySelector('.btn-header-filled, .btn-primary')));
        const isLightBtn = hoveredBtn && (hoveredBtn.closest('.btn-header-outline, .btn-outline') || (hoveredBtn.tagName === 'A' && hoveredBtn.querySelector('.btn-header-outline, .btn-outline')));

        dot.classList.toggle('custom-cursor-dot-stack', !!isStack);
        dot.classList.toggle('custom-cursor-on-dark-btn', !!isDarkBtn);
        dot.classList.toggle('custom-cursor-on-light-btn', !!isLightBtn);

        // Apply classes to trigger CSS transitions for sizes and shapes
        const isHoverable = !hasCursorText && (hoveredBtn || isSuppress);
        dot.classList.toggle('custom-cursor-dot-hover', !!isHoverable && !isCaptured);
        dot.classList.toggle('custom-cursor-dot-captured', !!isCaptured);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => {
      if (dot) dot.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (dot) dot.style.opacity = '1';
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
    <div ref={dotRef} className="custom-cursor-dot custom-cursor-light-bg">
      <div ref={circleRef} className="custom-cursor-circle" />
      <span ref={labelTextRef} className="custom-cursor-text" />
    </div>
  );
};

export default CustomCursor;
