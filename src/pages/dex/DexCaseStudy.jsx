import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Head, Stage, rise } from "../agent-workspace/AgentWorkspaceCaseStudy";
import { More } from "../agent-workspace/More";
import { Solution } from "../agent-workspace/Solution";
import { RollingNumber } from "../agent-workspace/RollingNumber";
import { AROUND, CAPABILITIES, shot } from "./content";
import { IvrDemo } from "./IvrDemo";
import dexDemo from "../../assets/dex/dex-demo.mp4";
import { CompareSlider } from "./CompareSlider";
import "../agent-workspace/agent-workspace.css";
import "./dex.css";

const EASE = [0.22, 1, 0.36, 1];

// Kalice's "%" is decorative; set it in the sans face so big numbers stay legible.
const Pct = ({ v }) =>
  v.endsWith("%") ? (
    <>
      <RollingNumber value={v.slice(0, -1)} />
      <span className="cs-headline-unit">%</span>
    </>
  ) : (
    <RollingNumber value={v} />
  );

const META = [
  ["Role", "Design + engineering, end to end (frontend and the Dex backend)"],
  ["Team", "Me · Sachin Taneja, Product · Amit Birla, Principal Engineer"],
  ["Timeline", "8 weeks · Sep – Nov 2026"],
  ["Platform", "Synthesizer, Exotel’s visual IVR builder"],
];

const IN_SHORT = [
  ["Problem", "Every IVR change was a PS ticket and a two-week wait."],
  [
    "Key decision",
    "An AI copilot that builds from the SOW, with the admin approving every change.",
  ],
  ["Proof", "Admins now ship nearly half of all flow changes themselves."],
  ["Status", "Live with pilot customers."],
];

const HEADLINE = [
  { value: "62%", label: "fewer flow-change tickets" },
  { value: "1 day", label: "SOW to live flow, down from 2 weeks" },
  { value: "48%", label: "of changes now made by admins, up from 0" },
  { value: "74%", label: "of each Dex build kept without hand fixes" },
];

const BEFORE_FLOW = [
  "SOW",
  "Ticket",
  "PS queue",
  "Built by hand",
  "Tested",
  "Live",
];
const AFTER_FLOW = ["SOW", "Dex drafts", "Admin checks", "Live"];

const FINDINGS = [
  {
    stat: "71%",
    title: "Most tickets were tiny",
    body: "One or two nodes: a prompt, a holiday, a menu key.",
  },
  {
    stat: "5 / 6",
    title: "Admins were afraid, not unable",
    body: "They’d self-serve if they couldn’t break the IVR.",
  },
  {
    stat: "ACD",
    title: "The words were for engineers",
    body: "DTMF, AMD, and JavaScript for every condition.",
  },
  {
    stat: "80%",
    title: "PS rebuilt the same 3 flows",
    body: "Single queue, a 3-queue menu, a language menu.",
  },
  {
    stat: "SOW",
    title: "SOWs were already structured",
    body: "Menus, keys, queues and hours: most of a draft.",
  },
];

const PRINCIPLES = [
  [
    "Safe to try",
    "Nothing reaches callers until the admin has seen it work.",
    "sage",
  ],
  ["Plain words", "Name nodes by what they do, real terms in brackets.", "sky"],
  ["Start from something", "Templates and Dex. No empty canvas.", "butter"],
  [
    "Scripts are the exception",
    "Controls for admins, JavaScript kept for PS.",
    "blush",
  ],
];

// [metric, before, after]
const IMPACT = [
  ["SOW to deployed flow", "~2 weeks", "1 day"],
  ["Flow-change tickets / month", "210", "80"],
  ["Admin activation, 30 days", "0%", "57%"],
  ["Time to a safe first change", "Not possible", "11 min"],
  ["Task success, five core edits", "38%", "91%"],
  ["SUS score", "52", "81"],
];

const Flow = ({ steps, tone, days, label }) => (
  <div className={`dex-flow is-${tone}`}>
    <span className="dex-flow-label">{label}</span>
    <ol>
      {steps.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ol>
    <div className="dex-flow-time">
      <span
        className="dex-flow-bar"
        style={{ width: `${(days / 14) * 100}%` }}
      />
      <span className="dex-flow-days">
        {tone === "after" ? `${days} day` : `~${days} days`}
      </span>
    </div>
  </div>
);

export const DexCaseStudy = () => (
  <div className="cs dex">
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
        <span>Exotel · 2026</span>
      </motion.nav>
      <motion.h1
        className="cs-h1 dex-h1"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
      >
        Dex copilot: <em>62% fewer tickets</em>. New IVRs live in{" "}
        <span className="dex-nowrap">
          <em>1 day</em>.
        </span>
      </motion.h1>
      <motion.div
        className="cs-split cs-hero-foot"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
      >
        <p className="cs-lede">
          An AI copilot in Synthesizer, Exotel’s IVR builder. It reads a
          statement of work and builds a tested phone menu while the admin
          watches.
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
      className="cs-stage tint-dawn cs-wide dex-hero-stage"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.8 }}
    >
      <CompareSlider
        start={55}
        left={{
          src: shot("hero-synthesizer"),
          alt: "The new Synthesizer with Dex docked beside an IVR flow",
          label: "Now · Synthesizer with Dex",
        }}
        right={{
          src: shot("hero-legacy"),
          alt: "The legacy Synthesizer editor: node palette and grey node cards",
          label: "Before · legacy editor",
        }}
      />
      <p className="cmp-hint">Drag to compare</p>
    </motion.div>

    {/* ---------- what is an IVR ---------- */}
    <section className="cs-block cs-wide">
      <Head
        eyebrow="First, what’s an IVR?"
        title="The menu you hear when you call a helpline"
        tldr="Call Airtel and a voice asks you to press 1 for prepaid, 2 for postpaid or 3 for broadband. That’s an IVR (interactive voice response). Behind it, a flow checks holidays and office hours before routing you to the right agent."
      />
      <Stage tint="sky" className="ivr-stage">
        <IvrDemo />
      </Stage>
      <motion.p className="ivr-caption" {...rise()}>
        Every one of these flows is built in Synthesizer. Changing even one
        step, like a holiday date, used to need a ticket.
      </motion.p>
    </section>

    {/* ---------- in short + numbers ---------- */}
    <section className="cs-block cs-wide">
      <motion.dl className="dex-short" {...rise()}>
        <p className="cs-eyebrow">In short</p>
        {IN_SHORT.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </motion.dl>
      <ul className="cs-headline dex-headline">
        {HEADLINE.map((s) => (
          <li key={s.label}>
            <span className="cs-headline-num">
              <Pct v={s.value} />
            </span>
            <span className="cs-headline-label">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>

    {/* ---------- demo video (copy drafted by Claude, pending the author's review) ---------- */}
    <section className="cs-block cs-wide">
      <Head
        eyebrow="Watch it work"
        title="Dex builds an IVR, then edits one node"
        tldr="Attach a SOW, ask for the IVR and watch it build. Then select a node, ask for a change and confirm it."
      />
      <Stage tint="sage" className="dex-video-stage">
        <video
          className="dex-video"
          src={dexDemo}
          poster={shot("dex-builds-live")}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          aria-label="Screen recording: Dex builds an IVR from a sample SOW, then sets the Language menu’s retries to 2"
        />
      </Stage>
    </section>

    {/* ---------- problem ---------- */}
    <section className="cs-block cs-wide">
      <Head
        eyebrow="The problem"
        title="One prompt change meant a ticket and a two-week wait"
        tldr="Customers couldn’t touch even a holiday date. Every change went back to PS."
      />
      <Stage tint="sand" className="dex-flows">
        <Flow label="Before" steps={BEFORE_FLOW} tone="before" days={14} />
        <Flow label="With Dex" steps={AFTER_FLOW} tone="after" days={1} />
        <p className="dex-flows-note">
          Same SOW. PS and the ticket queue leave the everyday path.
        </p>
      </Stage>
    </section>

    {/* ---------- research ---------- */}
    <section className="cs-block cs-wide">
      <Head
        eyebrow="Research"
        title="The work was small. The fear was big."
        tldr="A ticket audit, interviews with admins and PS engineers, and builds observed from SOW to go-live."
      />
      <div className="dex-findings">
        {FINDINGS.map((f, i) => (
          <motion.div key={f.title} className="dex-finding" {...rise(i * 0.06)}>
            <span className="dex-finding-stat">
              {/\d/.test(f.stat) ? <Pct v={f.stat} /> : f.stat}
            </span>
            <h4>{f.title}</h4>
            <p>{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ---------- north star + principles ---------- */}
    <section className="cs-block cs-wide">
      <Head
        eyebrow="North star"
        title="Changes shipped without a ticket"
        tldr="If admins ship more changes themselves, tickets fall as a result, not because they’re suppressed."
      >
        <More
          body={[
            "Guardrails: call-handling incidents traced to admin changes must not rise, and admin edits that PS has to repair must stay low.",
            "Usability: task success and time on five core edits, plus SUS. Everything is instrumented in Amplitude, PII-safe.",
          ]}
        />
      </Head>
      <div className="dex-principles">
        {PRINCIPLES.map(([t, b, tint], i) => (
          <motion.div key={t} className={`tint-${tint}`} {...rise(i * 0.06)}>
            <span className="cs-num">0{i + 1}</span>
            <h4>{t}</h4>
            <p>{b}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ---------- what dex can do ---------- */}
    <section className="cs-block cs-wide dex-chapter">
      <Head
        eyebrow="The solution"
        title="What Dex can do, and why each part exists"
        tldr="Each capability answers a research finding. One rule sits above them all: the admin stays in charge."
      >
        <More
          heading="The backend underneath (with Amit Birla)"
          list={[
            "Retrieval grounded in the node catalogue, help docs and 185 PS-built flows",
            "Memory per flow, so Dex never asks twice",
            "A model gateway with fallbacks when a provider is down",
            "A reader for API docs linked from the SOW",
            "A correction pipeline from every hand fix",
          ]}
        />
      </Head>
    </section>
    {CAPABILITIES.map((s, i) => (
      <Solution key={s.id} solution={s} index={i} />
    ))}

    {/* ---------- around dex ---------- */}
    <section className="cs-block cs-wide dex-chapter">
      <Head
        eyebrow="Around Dex"
        title="The product it builds in"
        tldr="Dex needs a canvas an admin can read and test. Every Dex build depends on these."
      />
    </section>
    {AROUND.map((s, i) => (
      <Solution key={s.id} solution={s} index={CAPABILITIES.length + i} />
    ))}

    {/* ---------- impact ---------- */}
    <section className="cs-block cs-wide">
      <Head
        eyebrow="Impact"
        title="Admins took over the small changes"
        tldr="Eight weeks after launch, admins were shipping nearly half of all flow changes themselves. PS got its time back."
      />
      <div className="dex-impact">
        {IMPACT.map(([m, b, a]) => (
          <div key={m}>
            <span className="dex-impact-label">{m}</span>
            <span className="dex-impact-before">{b}</span>
            <span className="dex-impact-after">
              <Pct v={a} />
            </span>
          </div>
        ))}
      </div>
    </section>

    {/* ---------- reflection ---------- */}
    <section className="cs-block cs-wide">
      <motion.div className="cs-split cs-closing" {...rise()}>
        <p className="cs-closing-lead">Trust was the feature.</p>
        <div className="cs-split-body">
          <p className="cs-tldr">
            Getting Dex to build a flow wasn’t the hard part. Making an
            operations lead confident enough to press deploy was. Test calls,
            the confirm step and one-click undo did more for adoption than any
            single capability.
          </p>
          <More
            label="What I’d do differently"
            list={[
              "Measure sooner: analytics landed late, so early calls rested on the audit and interviews.",
              "Rename with users, not for them: test plain-language node names in the product first.",
              "Design the gaps upstream: co-design chat and flow patterns with the Signal team.",
            ]}
          />
        </div>
      </motion.div>
    </section>

    <Footer />
  </div>
);
