import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

// Illustrative conversation (drafted by Claude, pending the author's review).
// mood: 0 calm → 3 furious, shown on the sentiment meter as the bot keeps failing.
const SCRIPT = [
  { from: "order", wait: 400 },
  { from: "event", text: "8:52 PM · Still not delivered", wait: 700 },
  {
    from: "user",
    text: "Hi, my order was supposed to arrive 40 mins ago. Where is it?",
    mood: 1,
  },
  {
    from: "bot",
    text: "Hi Priya! 👋 I can help with your order. What would you like to do?",
    chips: ["Track order", "Cancel order", "Something else"],
  },
  { from: "user", text: "Track order" },
  {
    from: "bot",
    text: "Your order is on the way! 🛵 Estimated arrival: 8:10 PM",
  },
  { from: "user", text: "It’s 8:52. That time already passed.", mood: 2 },
  {
    from: "bot",
    text: "Sorry, I didn’t get that. Would you like to track your order?",
    chips: ["Track order", "Cancel order"],
    fail: true,
  },
  {
    from: "user",
    text: "The rider hasn’t moved in 20 minutes. I want a refund.",
  },
  {
    from: "bot",
    text: "Cancellations aren’t possible once food is picked up.",
    fail: true,
  },
  { from: "user", text: "I don’t want to cancel. TALK TO A HUMAN 😤", mood: 3 },
  { from: "handoff", wait: 1800 },
];
const CONTEXT = [
  "Order #4821",
  "42 min late",
  "Rider idle 20 min",
  "Asked for refund",
  "Sentiment: Frustrated",
];
const MOODS = ["Calm", "Annoyed", "Frustrated", "Furious"];

const typingTime = (s) =>
  s.text ? Math.min(1800, 500 + s.text.length * 18) : 0;

export const ChatDemo = () => {
  const ref = useRef(null);
  const feed = useRef(null);
  const inView = useInView(ref, { margin: "-120px" });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? SCRIPT.length : 0);
  const [typing, setTyping] = useState(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce || !inView || count >= SCRIPT.length) return;
    const next = SCRIPT[count];
    const isTyper =
      next.from === "bot" || next.from === "agent" || next.from === "user";
    const pause = next.wait ?? (next.from === "user" ? 900 : 300);
    let t2;
    const t1 = setTimeout(() => {
      if (isTyper) setTyping(next.from);
      t2 = setTimeout(
        () => {
          setTyping(null);
          setCount((c) => c + 1);
        },
        isTyper ? typingTime(next) : 0,
      );
    }, pause);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [count, inView, reduce, run]);

  useEffect(() => {
    feed.current?.scrollTo({
      top: feed.current.scrollHeight,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [count, typing, reduce]);

  const shown = SCRIPT.slice(0, count);
  const handedOff = shown.some((s) => s.from === "handoff");
  const mood = shown.reduce((m, s) => s.mood ?? m, 0);
  const done = count >= SCRIPT.length;

  return (
    <div className="cs-phone" ref={ref}>
      <div className="cs-phone-head">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={handedOff ? "agent" : "bot"}
            className="cs-phone-who"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <span className={"cs-avatar is-bot"}>🤖</span>
            <span>
              <strong>Support Bot</strong>
              <small>
                {handedOff ? "Connecting to an agent…" : "Automated assistant"}
              </small>
            </span>
          </motion.div>
        </AnimatePresence>
        <div
          className="cs-mood"
          aria-label={`Customer sentiment: ${MOODS[mood]}`}
        >
          <span className="cs-mood-bar">
            <motion.span
              animate={{ width: `${18 + mood * 27}%` }}
              className={`is-m${mood}`}
              transition={{ duration: 0.6 }}
            />
          </span>
          <small>{MOODS[mood]}</small>
        </div>
      </div>

      <div className="cs-phone-feed" ref={feed} aria-live="polite">
        {shown.map((s, i) => (
          <motion.div
            key={`${run}-${i}`}
            className={`cs-line is-${s.from}`}
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {s.from === "order" && (
              <div className="cs-order">
                <span className="cs-order-icon">🍛</span>
                <span>
                  <strong>Biryani Bowl · Order #4821</strong>
                  <small>Arriving by 8:10 PM</small>
                </span>
              </div>
            )}
            {s.from === "event" && <span className="cs-event">{s.text}</span>}
            {s.from === "handoff" && (
              <div className="cs-handoff">
                <span className="cs-handoff-title">
                  Transferring to a human agent…
                </span>
                <span className="cs-handoff-sub">
                  Shared with the agent, so nobody repeats themselves
                </span>
                <div className="cs-handoff-chips">
                  {CONTEXT.map((c, j) => (
                    <motion.span
                      key={c}
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + j * 0.18 }}
                    >
                      {c}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
            {s.text && !["event"].includes(s.from) && (
              <div className={`cs-bubble ${s.fail ? "is-fail" : ""}`}>
                {s.text}
              </div>
            )}
            {s.chips && (
              <div className="cs-chips">
                {s.chips.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
        {typing && (
          <div className={`cs-line is-${typing}`}>
            <div className="cs-bubble cs-typing" aria-label="typing">
              <i />
              <i />
              <i />
            </div>
          </div>
        )}
      </div>

      <div className="cs-phone-foot">
        <span>{handedOff ? "Waiting for an agent…" : "Type a message…"}</span>
        {done && !reduce && (
          <button
            type="button"
            className="cs-replay"
            onClick={() => {
              setCount(0);
              setRun((r) => r + 1);
            }}
          >
            ↺ Replay
          </button>
        )}
      </div>
    </div>
  );
};
