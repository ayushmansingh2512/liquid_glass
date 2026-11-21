import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MAX_WAIT = 8000; // never hold the page longer than this, even on a slow connection
const MIN_SHOW = 700;

// First-visit loader: waits for fonts and the page's eager (above-the-fold) images, then fades out.
// Lazy images are skipped on purpose; they load as the visitor scrolls.
export const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const started = performance.now();
    const finish = () => {
      if (cancelled) return;
      const wait = Math.max(0, MIN_SHOW - (performance.now() - started));
      setTimeout(() => !cancelled && setDone(true), wait);
    };
    const cap = setTimeout(finish, MAX_WAIT);

    // let the first route render so its <img> tags exist
    const frame = requestAnimationFrame(() => {
      const imgs = [...document.images].filter(
        (i) => i.loading !== "lazy" && !i.complete,
      );
      const total = imgs.length + 1;
      let loaded = 0;
      const tick = () => {
        loaded += 1;
        if (!cancelled) setProgress(loaded / total);
        if (loaded >= total) finish();
      };
      document.fonts.ready.then(tick);
      imgs.forEach((img) => {
        img.addEventListener("load", tick, { once: true });
        img.addEventListener("error", tick, { once: true });
      });
    });

    return () => {
      cancelled = true;
      clearTimeout(cap);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = done ? "" : "hidden";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading"
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <span className="preloader-name">Aditya PS.</span>
          <span className="preloader-track">
            <motion.span
              className="preloader-fill"
              animate={{ scaleX: progress }}
              transition={{ ease: "easeOut", duration: 0.4 }}
            />
          </span>
          <span className="preloader-pct">{Math.round(progress * 100)}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
