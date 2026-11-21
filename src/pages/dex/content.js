// Dex decisions, condensed from the author's doc. Screenshots come from the Synthesizer session and are
// picked up automatically from src/assets/dex/<name>.webp; a missing one shows the "coming soon" placeholder.
const shots = import.meta.glob("../../assets/dex/*.webp", {
  eager: true,
  import: "default",
});
export const shot = (name) => shots[`../../assets/dex/${name}.webp`];

const WHY = "Why";
const TRADE_OFF = "Trade-off";

// "What Dex can do, and why each part exists"
export const CAPABILITIES = [
  {
    id: "reads-sow",
    title: "Reads the SOW, asks only what it can’t work out",
    tldrLabel: "Finding",
    tldr: "SOWs already held most of a first draft.",
    tabs: {
      now: {
        status: "shipped",
        image: shot("dex-reads-sow"),
        title: "Asks only the gaps",
        points: [
          "Reads a SOW, a plain request or a linked API doc",
          "Records each answer, never asks twice",
        ],
        why: "Every question Dex can answer itself is time nobody should spend.",
        whyLabel: WHY,
      },
    },
  },
  {
    id: "plan-check",
    title: "Plans first, then checks its own plan",
    tldrLabel: "Finding",
    tldr: "Admins were afraid of breaking the IVR. A confident wrong flow is worse than none.",
    tabs: {
      now: {
        status: "shipped",
        image: shot("dex-plan-check"),
        title: "A planner and a verifier",
        points: [
          "Drafts the flow as concept cards",
          "Test-calls the plan in the customer’s own words",
          "A failed call goes back to the planner",
        ],
        why: "Dex catches its own mistakes before anyone sees them.",
        whyLabel: WHY,
      },
    },
  },
  {
    id: "builds-live",
    title: "Builds live, where the admin can watch",
    tldrLabel: "Principle",
    tldr: "People trust what they watch being built.",
    tabs: {
      now: {
        status: "shipped",
        image: shot("dex-builds-live"),
        title: "Nothing happens off-screen",
        points: [
          "Builds step by step, with a caption for each",
          "The camera follows the work",
          "A stopped build can be finished by hand",
        ],
      },
    },
  },
  {
    id: "confirm",
    title: "Changes only what the admin approves",
    tldrLabel: "Finding",
    tldr: "The fear was about changing live flows.",
    tabs: {
      now: {
        status: "shipped",
        image: shot("dex-confirm"),
        maxw: 400,
        title: "Marks the nodes, then waits",
        points: [
          "Shows exactly which nodes will change",
          "Enforced in code, not the prompt",
          "Replays test calls afterwards",
        ],
        why: "An admin should know what will change before saying yes.",
        whyLabel: WHY,
      },
    },
  },
  {
    id: "undo",
    title: "Undoes a whole turn in one click",
    tldrLabel: "Principle",
    tldr: "Safe to try. Trying Dex should cost nothing.",
    tabs: {
      now: {
        status: "shipped",
        image: shot("dex-undo"),
        maxw: 375,
        title: "“Made N changes” + Undo",
        points: [
          "Every turn ends with a summary card",
          "Undo takes the whole turn back, however many nodes",
        ],
      },
    },
  },
  {
    id: "explain",
    title: "Hand-holds admins who aren’t engineers",
    tldrLabel: "Finding",
    tldr: "The product’s words were written for engineers.",
    tabs: {
      now: {
        status: "shipped",
        image: shot("dex-explain"),
        maxw: 343,
        title: "Explains as you work",
        points: [
          "/explain, /fix, /build, /script, /report",
          "@ a node to bring it into the chat",
          "Dictation for admins who’d rather talk",
        ],
        why: "Dex teaches the terms in place, instead of sending people to the docs or a ticket.",
        whyLabel: WHY,
      },
    },
  },
  {
    id: "byok",
    title: "Runs on the customer’s own AI key",
    tldrLabel: "Need",
    tldr: "Bring Claude, Gemini or OpenAI keys, or use Exotel’s managed models.",
    tabs: {
      now: {
        status: "shipped",
        image: shot("dex-byok"),
        maxw: 602,
        title: "Keys as a fallback chain",
        points: [
          "Detects the provider from the pasted key",
          "If one key fails, the next takes over, even across providers",
        ],
      },
    },
  },
];

// "Around Dex: the product it builds in"
export const AROUND = [
  {
    id: "try-a-call",
    title: "Safe to try: test calls and live checks",
    tldrLabel: "Problem",
    tldr: "Admins found out a change was broken after it went live.",
    tabs: {
      now: {
        status: "shipped",
        image: shot("around-try-a-call"),
        title: "Try a call + Problems panel",
        points: [
          "Plays the flow like a phone, path drawn on the canvas",
          "Warns before download if anything would break a call",
        ],
      },
    },
  },
  {
    id: "templates",
    title: "Start from a template, not a blank canvas",
    tldrLabel: "Finding",
    tldr: "PS rebuilt the same three flows over and over.",
    tabs: {
      now: {
        status: "shipped",
        image: shot("around-templates"),
        title: "Three templates, two clicks",
        points: [
          "Single queue · Menu to 3 queues · Language menu",
          "Named, described and tagged with the ticket ID",
        ],
      },
    },
  },
  {
    id: "decision-box",
    title: "Conditions without JavaScript",
    tldrLabel: "Problem",
    tldr: "Every condition needed a script.",
    tabs: {
      now: {
        status: "shipped",
        image: shot("around-decision-box"),
        title: "The Decision Box",
        points: [
          "“If variable equals value” rows",
          "Keypad menus create an outcome per key",
        ],
        why: "The raw JavaScript view stays one click away for PS.",
        whyLabel: TRADE_OFF,
      },
    },
  },
  {
    id: "canvas",
    title: "A canvas you can read at a glance",
    tldrLabel: "Problem",
    tldr: "Node names like ACD, DTMF and AMD meant nothing to an operations lead.",
    tabs: {
      now: {
        status: "shipped",
        image: shot("around-canvas"),
        title: "Readable node cards",
        points: [
          "Plain names, real terms in brackets: Route to Agent Queue (ACD)",
          "Each outcome is a labelled row on the card",
        ],
        why: "Folding end nodes hides real nodes; “Show all wires” keeps PS in control.",
        whyLabel: TRADE_OFF,
      },
    },
  },
  // Drafted by Claude from Synthesizer's code; pending the author's review.
  {
    id: "palette",
    title: "Add a node where you’re working, not by drag and drop",
    tldrLabel: "Problem",
    tldr: "Every node came from a sidebar: drag it onto the canvas, then wire it by hand.",
    tabs: {
      now: {
        status: "shipped",
        image: shot("around-palette"),
        title: "A node palette on every stub and handle",
        points: [
          "Unwired outcomes show as stubs; click one to pick what comes next",
          "Click a handle, drop a wire on empty canvas, or + on a wire to insert",
          "The picked node is placed and wired in one step",
          "Suggested nodes first, only those this flow type supports",
        ],
        why: "The sidebar is gone, so the canvas gets the full width.",
        whyLabel: WHY,
      },
    },
  },
  {
    id: "signal",
    title: "Rebuilt on Signal, Exotel’s design system",
    tldrLabel: "Problem",
    tldr: "A mix of Materialize forms and hand-rolled widgets.",
    tabs: {
      now: {
        status: "shipped",
        image: shot("after-signal"),
        // light/dark drag slider once the dark twin exists; until then the plain screenshot shows
        compare: shot("after-signal-dark") && {
          start: 50,
          ratio: "2880 / 1800",
          rounded: true,
          left: {
            src: shot("after-signal"),
            alt: "Synthesizer on Signal in light mode",
            label: "Light mode",
          },
          right: {
            src: shot("after-signal-dark"),
            alt: "Synthesizer on Signal in dark mode",
            label: "Dark mode",
          },
        },
        title: "One system, every surface",
        points: [
          "Canvas, drawer, dialogs, flow list and Dex",
          "Dark mode for free",
        ],
        why: "Signal had no flow or chat patterns yet; 19 gaps went back to the design system team.",
        whyLabel: TRADE_OFF,
      },
    },
  },
];
