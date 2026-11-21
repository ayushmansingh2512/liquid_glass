import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { WORKSPACE_PANELS } from "./content";
import { More } from "./More";
import { CompareSlider } from "../dex/CompareSlider";

const TABS = { before: "Before", explored: "Explored", now: "Now" };
const TINT = { before: "stone", explored: "blush", now: "sage" };
const STATUS = { shipped: "Shipped", axed: "Axed" };
const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: "easeOut" },
};

// Animations are CSS and start once the stage scrolls into view; the tab content is keyed,
// so switching tabs remounts it and replays them.
const usePlay = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  return [ref, inView ? "is-play" : ""];
};

const Zoom = ({ tab }) => {
  const [ref, play] = usePlay();
  return (
    <div className={`cs-zoom ${play}`} ref={ref}>
      <img
        src={tab.image}
        alt={tab.title}
        style={{ transformOrigin: tab.zoom.origin, "--zoom": tab.zoom.scale }}
      />
    </div>
  );
};

const Visual = ({ tab }) => {
  if (tab.compare) return <CompareSlider {...tab.compare} />;
  if (tab.zoom) return <Zoom tab={tab} />;
  if (!tab.image)
    return (
      <div className="cs-placeholder">
        <p>{tab.caption || tab.title}</p>
        <span>Screenshot coming soon</span>
      </div>
    );
  if (tab.anatomy)
    return (
      <div className="cs-anatomy">
        <img
          src={tab.image}
          alt="Agent workspace with four persistent panels"
          loading="lazy"
        />
        {WORKSPACE_PANELS.map((p) => (
          <span
            key={p.n}
            className="cs-pin"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            aria-hidden="true"
          >
            {p.n}
          </span>
        ))}
      </div>
    );
  return (
    <img
      className={`cs-shot ${tab.fill ? "is-fill" : ""}`}
      style={tab.maxw ? { maxWidth: `min(100%, ${tab.maxw}px)` } : undefined}
      src={tab.image}
      alt={tab.title || ""}
      loading="lazy"
    />
  );
};

const Notes = ({ tab }) => (
  <div className="cs-side-notes">
    {tab.status && (
      <span className={`cs-status is-${tab.status}`}>{STATUS[tab.status]}</span>
    )}
    {!tab.status && <span className="cs-status is-before">Before</span>}
    <h4>{tab.title || tab.caption}</h4>
    {tab.anatomy && (
      <ol className="cs-legend">
        {WORKSPACE_PANELS.map((p) => (
          <li key={p.n}>
            <span className="cs-pin is-static" aria-hidden="true">
              {p.n}
            </span>
            {p.label}
          </li>
        ))}
      </ol>
    )}
    {tab.points && (
      <ul className="cs-points">
        {tab.points.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    )}
    {tab.why && (
      <p className={`cs-why ${tab.whyLabel ? "is-neutral" : ""}`}>
        <span>{tab.whyLabel ?? "Why it was axed"}</span>
        {tab.why}
      </p>
    )}
    {tab.quote && <p className="cs-quote">“{tab.quote}”</p>}
    {!tab.image && !tab.status && (
      <p className="cs-fine">The legacy screen will be added here.</p>
    )}
    {tab.detail && <More {...tab.detail} />}
  </div>
);

export const Solution = ({ solution, index }) => {
  const keys = Object.keys(TABS).filter((k) => solution.tabs[k]);
  const [active, setActive] = useState(keys[keys.length - 1]);
  const id = useId();
  const refs = useRef({});
  const tab = solution.tabs[active];

  const onKeyDown = (e) => {
    const i = keys.indexOf(active);
    const next = {
      ArrowRight: i + 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: keys.length - 1,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const k = keys[(next + keys.length) % keys.length];
    setActive(k);
    refs.current[k]?.focus();
  };

  return (
    <article className="cs-block cs-wide cs-decision" id={solution.id}>
      <motion.header
        className="cs-split cs-split-head"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <p className="cs-eyebrow">
            <span className="cs-num">{String(index + 1).padStart(2, "0")}</span>{" "}
            Decision
          </p>
          <h3 className="cs-h2">{solution.title}</h3>
        </div>
        <div className="cs-split-body">
          {solution.tldr && (
            <p className="cs-tldr">
              <span className="cs-tag">{solution.tldrLabel ?? "Problem"}</span>
              {solution.tldr}
            </p>
          )}
          {solution.detail && <More body={solution.detail} />}
        </div>
      </motion.header>

      <div className="cs-decision-body">
        <div className={`cs-stage tint-${TINT[active]} cs-stage-tabs`}>
          {keys.length > 1 && (
            <div className="cs-stage-bar">
              <div
                className="cs-tabs"
                role="tablist"
                aria-label={`${solution.title}: before and after`}
                onKeyDown={onKeyDown}
              >
                {keys.map((k) => (
                  <button
                    key={k}
                    ref={(el) => (refs.current[k] = el)}
                    role="tab"
                    id={`${id}-${k}-tab`}
                    aria-selected={active === k}
                    aria-controls={`${id}-panel`}
                    tabIndex={active === k ? 0 : -1}
                    className={`cs-tab ${active === k ? "is-active" : ""}`}
                    onClick={() => setActive(k)}
                  >
                    {active === k && (
                      <motion.span
                        layoutId={`${id}-pill`}
                        className="cs-tab-pill"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 36,
                        }}
                      />
                    )}
                    <span>{TABS[k]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <div
            className={`cs-stage-body ${keys.length > 1 ? "" : "is-solo"} ${tab.fill ? "is-fill" : ""} ${tab.zoom ? "is-zoom" : ""}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active} className="cs-stage-inner" {...fade}>
                <Visual tab={tab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div
          className="cs-side"
          role={keys.length > 1 ? "tabpanel" : undefined}
          id={`${id}-panel`}
          aria-labelledby={keys.length > 1 ? `${id}-${active}-tab` : undefined}
          aria-live="polite"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active} {...fade}>
              <Notes tab={tab} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
};
