import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";
import workspace from "../../assets/agent-workspace/workspace.webp";
import legacyGwt from "../../assets/agent-workspace/legacy-gwt.webp";
import legacyCampaign from "../../assets/agent-workspace/legacy-campaign.webp";
import parityLogos from "../../assets/agent-workspace/parity-logos.webp";
import lostDeals from "../../assets/agent-workspace/lost-deals.webp";
import agents from "../../assets/agent-workspace/agents.webp";
import shiftBots from "../../assets/agent-workspace/shift-bots.webp";
import shiftHumans from "../../assets/agent-workspace/shift-humans.webp";
import amplitude1 from "../../assets/agent-workspace/research-amplitude-1.webp";
import amplitude2 from "../../assets/agent-workspace/research-amplitude-2.webp";
import clientLogos from "../../assets/agent-workspace/client-logos.webp";
import researchNda from "../../assets/agent-workspace/research-nda.webp";
import aiDisposition from "../../assets/agent-workspace/ai-disposition.webp";
import aiContextTransfer from "../../assets/agent-workspace/ai-context-transfer.webp";
import aiAlert from "../../assets/agent-workspace/ai-alert.webp";
import aiSummary from "../../assets/agent-workspace/ai-summary.webp";
import uiLogin from "../../assets/agent-workspace/ui-login.webp";
import uiWhitelabel from "../../assets/agent-workspace/ui-whitelabel.webp";
import uiCampaign from "../../assets/agent-workspace/ui-campaign.webp";
import uiClosed from "../../assets/agent-workspace/ui-closed.webp";
import { SOLUTIONS } from "./content";
import { ChatDemo } from "./ChatDemo";
import { ImpactStats } from "./ImpactStats";
import { Solution } from "./Solution";
import { More } from "./More";
import "./agent-workspace.css";

const EASE = [0.22, 1, 0.36, 1];
export const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: EASE, delay },
});

/** Chapter header: title on the left, the skim line (+ optional details) on the right. */
export const Head = ({ eyebrow, title, tldr, children }) => (
  <motion.div className="cs-split cs-split-head" {...rise()}>
    <div>
      <p className="cs-eyebrow">{eyebrow}</p>
      <h2 className="cs-h2">{title}</h2>
    </div>
    <div className="cs-split-body">
      {tldr && <p className="cs-tldr">{tldr}</p>}
      {children}
    </div>
  </motion.div>
);

export const Stage = ({ tint, className = "", children, ...rest }) => (
  <motion.div
    className={`cs-stage tint-${tint} ${className}`}
    {...rise(0.05)}
    {...rest}
  >
    {children}
  </motion.div>
);

const META = [
  ["Role", "Research, Concept, Design, Handoff"],
  [
    "Team",
    "Me (IC) · Ravi Manne, Lead PM · Sahil Gandhi, Director of PM (AI) · ECC Engineering",
  ],
  ["Timeline", "4 Months"],
  ["Domain", "B2B · Enterprise Contact Center"],
];

const PAINS = [
  {
    title: "Rigid workflows, fragmented context",
    image: legacyCampaign,
    tint: "stone",
  },
  {
    title: "Feature parity gap vs Sprinklr, Intercom & more",
    image: parityLogos,
    tint: "butter",
    crop: true,
  },
  { title: "Lost deals due to UX maturity", image: lostDeals, tint: "blush" },
];

const SHIFTS = [
  { caption: "Bots handle frontline queries", image: shiftBots },
  { caption: "Humans handle complex, high-empathy cases", image: shiftHumans },
  { caption: "State, Vibe and Intent become critical" },
];

const AI_FEATURES = [
  {
    title: "Sentiment Signals",
    body: "Real-time tone cues across past and live conversations.",
    tint: "butter",
  },
  {
    title: "Auto Disposition",
    body: "AI suggests outcomes and sub-dispositions from the conversation.",
    image: aiDisposition,
    tint: "lilac",
  },
  {
    title: "Context Transfer",
    body: "Bot → human or human → human, nothing gets lost.",
    image: aiContextTransfer,
    tint: "sky",
  },
  {
    title: "Critical Conversation Alert",
    body: "Urgency, negative sentiment or SLA risk surfaces first.",
    image: aiAlert,
    tint: "blush",
  },
  {
    title: "AI Summaries (Past + Live)",
    body: "Condensed cases and live calls. Less transcript scanning.",
    image: aiSummary,
    tint: "sage",
    wide: true,
  },
];

const UI_SCREENS = [
  { image: uiLogin, label: "Default Login", tint: "stone" },
  { image: uiWhitelabel, label: "White labelled Login", tint: "sky" },
  { image: uiCampaign, label: "Campaign Selection", tint: "lilac" },
  { image: uiClosed, label: "Closed Interactions (Table)", tint: "sand" },
];

export const AgentWorkspaceCaseStudy = () => (
  <div className="cs">
    {/* ---------- hero ---------- */}
    <header className="cs-hero cs-wide">
      <motion.nav
        className="cs-crumb"
        aria-label="Breadcrumb"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link to="/#my-experiences">← Work</Link>
        <span aria-hidden="true">/</span>
        <span>Exotel · 2025</span>
      </motion.nav>
      <motion.h1
        className="cs-h1"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
      >
        Rethinking the <em>Agent Workspace</em>
      </motion.h1>
      <motion.div
        className="cs-split cs-hero-foot"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
      >
        <p className="cs-lede">
          Transforming a legacy contact center interface into an AI powered
          efficient and future ready workspace for millions of customers
        </p>
        <dl className="cs-meta">
          {META.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </header>

    <motion.div
      className="cs-stage tint-dawn cs-wide cs-hero-stage"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.8 }}
    >
      <img src={workspace} alt="The redesigned Exotel agent workspace" />
    </motion.div>

    <ImpactStats />

    {/* ---------- context ---------- */}
    <section className="cs-block cs-wide">
      <Head
        eyebrow="Context"
        title="What is a Enterprise Contact Center Solution?"
        tldr="When the bot fails, a human agent inherits the conversation, live, with the customer waiting."
      />
      <Stage tint="sand" className="cs-story">
        <ChatDemo />
        <aside className="cs-note" aria-label="Meanwhile, the agent">
          <span className="cs-note-tape" aria-hidden="true" />
          <p className="cs-note-title">Meanwhile, the agent is expected to…</p>
          <ul>
            <li>Instantly understand what went wrong</li>
            <li>See order details, payment status, delivery partner notes</li>
            <li>Know what the bot already asked and promised</li>
            <li>Resolve it ASAP, while you’re waiting on the line</li>
          </ul>
        </aside>
      </Stage>
    </section>

    {/* ---------- why revamp ---------- */}
    <section className="cs-block cs-wide">
      <Head
        eyebrow="Why Revamp?"
        title="A Once-in-a-Decade Reset"
        tldr="A 12-year-old GWT system: patched to keep working, too rigid to evolve."
      >
        <More
          body={[
            "Built over a decade ago on Google Web Toolkit (GWT), the system had grown rigid and difficult to evolve. Incremental patches kept it functional, but the architecture constrained modern interaction patterns, performance improvements, and scalable UX innovation.",
          ]}
        />
      </Head>
      <Stage tint="lilac" className="cs-stage-pad">
        <img
          className="cs-shot"
          src={legacyGwt}
          alt="Legacy ECC agent workspace used by Uber"
          loading="lazy"
        />
        <p className="cs-annot cs-annot-br">
          Uber used the legacy workspace with their Knowledge Base as the
          primary page
        </p>
      </Stage>
      <div className="cs-grid-3">
        {PAINS.map((p, i) => (
          <motion.figure key={p.title} className="cs-tile" {...rise(i * 0.08)}>
            <div className={`cs-stage tint-${p.tint} cs-tile-stage`}>
              <img
                src={p.image}
                alt=""
                className={p.crop ? "is-crop" : ""}
                loading="lazy"
              />
            </div>
            <figcaption>{p.title}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>

    {/* ---------- the real user ---------- */}
    <section className="cs-block cs-wide">
      <div className="cs-split cs-split-media">
        <motion.div {...rise()}>
          <p className="cs-eyebrow">The Real User</p>
          <h2 className="cs-h2">The Agent Is the System</h2>
          <ul className="cs-points">
            <li>Handle complex, emotional conversations</li>
            <li>Switch between tools constantly</li>
            <li>Carry business reputation in every call</li>
          </ul>
          <p className="cs-pull">
            It was their command center. And it was lagging behind.
          </p>
        </motion.div>
        <Stage tint="sand" className="cs-agents">
          <img
            src={agents}
            alt="Two contact center agents wearing headsets"
            loading="lazy"
          />
        </Stage>
      </div>
    </section>

    {/* ---------- industry shift ---------- */}
    <section className="cs-block cs-wide">
      <Head
        eyebrow="The Industry Shift"
        title="AI Changes the Role of the Agent"
        tldr="Bots take the easy queries, so every human conversation is the hard one."
      />
      <div className="cs-grid-3">
        {SHIFTS.map((s, i) => (
          <motion.figure
            key={s.caption}
            className="cs-tile"
            {...rise(i * 0.08)}
          >
            <div className="cs-stage tint-ink cs-tile-stage">
              {s.image ? (
                <img src={s.image} alt="" className="is-fill" loading="lazy" />
              ) : (
                <div className="cs-signals" aria-hidden="true">
                  <span>State: Customer has 3 complains in 1 week</span>
                  <span className="is-hot">Vibe: Customer Frustrated 😠</span>
                  <span>Intent: Delivery Delayed</span>
                </div>
              )}
            </div>
            <figcaption>
              <span className="cs-num">0{i + 1}</span> {s.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>

    {/* ---------- research ---------- */}
    <section className="cs-block cs-wide">
      <Head
        eyebrow="Discovery & Research"
        title="How We Validated the Hypothesis"
        tldr="Behavioural analytics at scale, then on the floor with agents."
      />
      <div className="cs-grid-2">
        <motion.figure className="cs-tile" {...rise()}>
          <div className="cs-stage tint-ink cs-stage-pad">
            <img
              className="cs-shot"
              src={amplitude1}
              alt="Amplitude funnel analysis (blurred)"
              loading="lazy"
            />
          </div>
          <figcaption>
            <span className="cs-tag">Quantitative</span>
            Amplitude replays, event tracking and funnels to find drop-offs, tab
            switching and time-to-information bottlenecks.
          </figcaption>
        </motion.figure>
        <motion.figure className="cs-tile" {...rise(0.08)}>
          <div className="cs-stage tint-ink cs-stage-pad">
            <img
              className="cs-shot"
              src={amplitude2}
              alt="Amplitude session replay (blurred)"
              loading="lazy"
            />
          </div>
          <figcaption>
            <span className="cs-tag">Qualitative</span>
            Agent shadowing, supervisor interviews and live floor observations
            at client sites.
          </figcaption>
        </motion.figure>
      </div>
      <motion.div className="cs-logos" {...rise()}>
        <span className="cs-eyebrow">Visited</span>
        <img
          src={clientLogos}
          alt="Myntra, Zepto, Razorpay, Zerodha and Navi"
          loading="lazy"
        />
      </motion.div>
      <motion.img
        className="cs-nda-img"
        src={researchNda}
        alt="Research and discovery board, blurred because it is under NDA"
        loading="lazy"
        {...rise()}
      />
    </section>

    {/* ---------- decisions index ---------- */}
    <section className="cs-block cs-wide">
      <Head
        eyebrow="Key Insights"
        title="From Insight to Interaction"
        tldr="Six problems, the explorations behind each, and what got axed and why."
      >
        <More
          body={[
            "Each insight uncovered during research translated into a deliberate product decision. This section captures the critical problems we identified, the design explorations we ran, the trade-offs we made, and how those choices shaped the final system. Where relevant, I’ve included variations, what worked, what didn’t, and why.",
          ]}
        />
      </Head>
      <motion.nav className="cs-toc" aria-label="Decisions" {...rise()}>
        {SOLUTIONS.map((s, i) => (
          <a key={s.id} href={`#${s.id}`}>
            <span className="cs-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="cs-toc-title">{s.title}</span>
            <span aria-hidden="true" className="cs-toc-arrow">
              ↓
            </span>
          </a>
        ))}
      </motion.nav>
    </section>

    {SOLUTIONS.map((s, i) => (
      <Solution key={s.id} solution={s} index={i} />
    ))}

    {/* ---------- AI ---------- */}
    <section className="cs-block cs-wide">
      <Head
        eyebrow="AI Magic, Sprinkled On"
        title="Intelligence layered into every interaction"
        tldr="Not a separate AI feature. Intelligence embedded directly into the agent workflow."
      />
      <div className="cs-bento">
        {AI_FEATURES.map((f, i) => (
          <motion.figure
            key={f.title}
            className={`cs-tile ${f.wide ? "is-wide" : ""}`}
            {...rise((i % 2) * 0.08)}
          >
            <div
              className={`cs-stage tint-${f.tint} cs-tile-stage cs-ai-stage`}
            >
              <span className="cs-status is-shipped cs-corner">Shipped</span>
              {f.image ? (
                <img src={f.image} alt="" loading="lazy" />
              ) : (
                <div className="cs-moods" aria-hidden="true">
                  <span className="is-neutral">😐 Neutral</span>
                  <span className="is-happy">🙂 Happy</span>
                  <span className="is-frustrated">☹️ Frustrated</span>
                </div>
              )}
            </div>
            <figcaption>
              <strong>{f.title}</strong> {f.body}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>

    {/* ---------- UI ---------- */}
    <section className="cs-block cs-wide">
      <Head
        eyebrow="UI and Visuals"
        title="Beyond the Core Flow"
        tldr="Production-ready interfaces across login, white-label flows, customer views, and campaign selection."
      />
      <div className="cs-grid-2">
        {UI_SCREENS.map((s, i) => (
          <motion.figure
            key={s.label}
            className="cs-tile"
            {...rise((i % 2) * 0.08)}
          >
            <div
              className={`cs-stage tint-${s.tint} cs-tile-stage cs-ui-stage`}
            >
              <img src={s.image} alt={s.label} loading="lazy" />
            </div>
            <figcaption>{s.label}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>

    {/* ---------- closing ---------- */}
    <section className="cs-block cs-wide">
      <motion.div className="cs-split cs-closing" {...rise()}>
        <p className="cs-closing-lead">
          This project wasn’t about redesigning screens.
        </p>
        <p className="cs-tldr">
          It was about reducing friction in high-pressure conversations. By
          restructuring context, embedding intelligence, and respecting real
          agent workflows, we built a system that scales clarity not just
          capacity.
        </p>
      </motion.div>
    </section>

    <Footer />
  </div>
);
