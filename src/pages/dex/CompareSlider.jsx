import { useRef, useState } from "react";

// Image comparison: `left` shows left of the handle, `right` shows right of it. Drag anywhere (or use arrow
// keys on the knob). Labels float above the frame so each side is named outside the screenshots themselves.
export const CompareSlider = ({ left, right, start = 50, ratio, rounded }) => {
  const [pos, setPos] = useState(start);
  const box = useRef(null);
  const dragging = useRef(false);

  const moveTo = (clientX) => {
    const r = box.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };
  const onPointerDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };
  const onPointerMove = (e) => dragging.current && moveTo(e.clientX);
  const onPointerUp = () => (dragging.current = false);
  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 2;
    const next = {
      ArrowLeft: pos - step,
      ArrowRight: pos + step,
      Home: 0,
      End: 100,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setPos(Math.min(100, Math.max(0, next)));
  };

  return (
    <div className="cmp-wrap">
      <div className="cmp-labels" aria-hidden="true">
        <span className={`cmp-label is-left ${pos < 8 ? "is-dim" : ""}`}>
          {left.label}
        </span>
        <span className={`cmp-label is-right ${pos > 92 ? "is-dim" : ""}`}>
          {right.label}
        </span>
      </div>
      <div
        className={`cmp ${rounded ? "is-rounded" : ""}`}
        style={ratio ? { aspectRatio: ratio } : undefined}
        ref={box}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        data-cursor-suppress
      >
        <img
          className="cmp-img"
          src={right.src}
          alt={right.alt}
          draggable={false}
        />
        <img
          className="cmp-img"
          src={left.src}
          alt={left.alt}
          draggable={false}
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />
        <div className="cmp-handle" style={{ left: `${pos}%` }}>
          <span
            className="cmp-knob"
            role="slider"
            tabIndex={0}
            aria-label={`Compare: ${left.label} on the left, ${right.label} on the right`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)}% ${left.label}`}
            onKeyDown={onKeyDown}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 5L2 10l5 5M13 5l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};
