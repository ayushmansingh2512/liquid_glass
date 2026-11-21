import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Illustrative helpline flow (drafted by Claude, pending the author's review). Node labels match Synthesizer's.
const SCENARIOS = {
  open: "Normal day",
  holiday: "Holiday",
  closed: "After hours",
};

const MENU = [
  { key: 1, label: "Prepaid" },
  { key: 2, label: "Postpaid" },
  { key: 3, label: "Broadband" },
];

const voiceLine = (scenario, key) => {
  if (scenario === "holiday")
    return "“We’re closed today for Diwali. Please call us tomorrow.”";
  if (scenario === "closed")
    return "“Our team is available 9am to 9pm. Please call back then.”";
  if (!key)
    return "“Welcome to Airtel. Press 1 for prepaid, 2 for postpaid, 3 for broadband.”";
  return `“Connecting you to a ${MENU[key - 1].label.toLowerCase()} expert…”`;
};

export const IvrDemo = () => {
  const [scenario, setScenario] = useState("open");
  const [key, setKey] = useState(null);
  const open = scenario === "open";

  // which step of the flow is lit
  const lit = (step) => {
    if (step === "call") return true;
    if (step === "holiday") return true;
    if (step === "hours") return scenario !== "holiday";
    if (step === "menu") return open;
    if (step === "queue") return open && key;
    return false;
  };
  const pick = (s) => {
    setScenario(s);
    setKey(null);
  };

  return (
    <div className="ivr">
      <div className="ivr-phone" aria-label="A caller's phone">
        <div className="ivr-phone-top">
          <span className="ivr-dot" aria-hidden="true" />
          <strong>Airtel customer care</strong>
          <small>{open && key ? "Connected" : "On call · 00:12"}</small>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={scenario + key}
            className="ivr-voice"
            aria-live="polite"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {voiceLine(scenario, key)}
          </motion.p>
        </AnimatePresence>
        <div className="ivr-keypad" role="group" aria-label="Keypad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((k) => {
            const live = open && typeof k === "number" && k >= 1 && k <= 3;
            return (
              <button
                key={k}
                type="button"
                className={`ivr-key ${live ? "is-live" : ""} ${key === k ? "is-pressed" : ""}`}
                disabled={!live}
                onClick={() => setKey(k)}
                aria-label={live ? `Press ${k}, ${MENU[k - 1].label}` : `${k}`}
              >
                {k}
              </button>
            );
          })}
        </div>
        <p className="ivr-hint">
          {open
            ? key
              ? "Try another key"
              : "Press 1, 2 or 3"
            : "Switch to a normal day to use the menu"}
        </p>
      </div>

      <div className="ivr-flow">
        <div
          className="ivr-scenarios"
          role="radiogroup"
          aria-label="When is the call made?"
        >
          {Object.entries(SCENARIOS).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={scenario === id}
              className={`ivr-chip ${scenario === id ? "is-on" : ""}`}
              onClick={() => pick(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <ol className="ivr-steps">
          <li className={`ivr-step ${lit("call") ? "is-lit" : ""}`}>
            <span className="ivr-icon" aria-hidden="true">
              📞
            </span>
            <span>
              <strong>A customer calls</strong>
              <small>Start</small>
            </span>
          </li>
          <li className={`ivr-step ${lit("holiday") ? "is-lit" : ""}`}>
            <span className="ivr-icon" aria-hidden="true">
              📅
            </span>
            <span>
              <strong>Is today a holiday?</strong>
              <small>Holiday node</small>
            </span>
            <span
              className={`ivr-branch ${scenario === "holiday" ? "is-end" : ""}`}
            >
              {scenario === "holiday"
                ? "Yes → play the closed message, end"
                : "No → continue"}
            </span>
          </li>
          <li className={`ivr-step ${lit("hours") ? "is-lit" : ""}`}>
            <span className="ivr-icon" aria-hidden="true">
              🕘
            </span>
            <span>
              <strong>Is it within office hours?</strong>
              <small>Office Hour node</small>
            </span>
            {scenario !== "holiday" && (
              <span
                className={`ivr-branch ${scenario === "closed" ? "is-end" : ""}`}
              >
                {scenario === "closed"
                  ? "No → ask to call back, end"
                  : "Yes → continue"}
              </span>
            )}
          </li>
          <li className={`ivr-step ${lit("menu") ? "is-lit" : ""}`}>
            <span className="ivr-icon" aria-hidden="true">
              🔢
            </span>
            <span>
              <strong>Press 1, 2 or 3</strong>
              <small>Selection node</small>
            </span>
          </li>
          <li className={`ivr-step ivr-queues ${lit("queue") ? "is-lit" : ""}`}>
            <span className="ivr-icon" aria-hidden="true">
              🎧
            </span>
            <span>
              <strong>Connected to the right agent</strong>
              <small>Route to Agent Queue (ACD)</small>
            </span>
            <span className="ivr-queue-row">
              {MENU.map((m) => (
                <span
                  key={m.key}
                  className={`ivr-queue ${open && key === m.key ? "is-on" : ""}`}
                >
                  {m.key} · {m.label}
                </span>
              ))}
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
};
