import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const DIGITS = "0123456789";
const SPINS = 2; // full 0–9 passes before settling, so every digit visibly rolls

// Odometer-style number: each digit is a vertical strip that rolls to its value when scrolled into view.
// Non-digit characters (".", "/", spaces) render as-is. The real value stays readable to screen readers.
export const RollingNumber = ({ value, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const text = String(value);
  let digitIndex = 0;

  return (
    <span ref={ref} className="roll" aria-label={text}>
      {[...text].map((ch, i) => {
        if (!DIGITS.includes(ch))
          return (
            <span key={i} className="roll-char" aria-hidden="true">
              {ch}
            </span>
          );
        const n = Number(ch);
        const order = digitIndex++;
        const target = -(SPINS * 10 + n);
        return (
          <span key={i} className="roll-digit" aria-hidden="true">
            <motion.span
              className="roll-strip"
              initial={{ y: reduce ? `${target}em` : "0em" }}
              animate={{ y: inView || reduce ? `${target}em` : "0em" }}
              transition={{
                duration: 1.6 + order * 0.25,
                delay: delay + order * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {Array.from({ length: (SPINS + 1) * 10 }, (_, k) => (
                <span key={k}>{k % 10}</span>
              ))}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};
