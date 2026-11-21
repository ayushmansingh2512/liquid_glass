// All copy comes from the Behance/Figma case study. Items marked `confirm` are awaiting the author's check.
import contextBefore from "../../assets/agent-workspace/context-before.webp";
import navigationBefore from "../../assets/agent-workspace/navigation-before.webp";
import workspaceBefore from "../../assets/agent-workspace/workspace-before.webp";
import workspace from "../../assets/agent-workspace/workspace.webp";
import multisessionBefore from "../../assets/agent-workspace/multisession-before.webp";
import multisessionShipped from "../../assets/agent-workspace/multisession-shipped.webp";
import multisessionExplored from "../../assets/agent-workspace/multisession-explored.webp";
import contextPanel from "../../assets/agent-workspace/context-panel.webp";
import navigationExplored from "../../assets/agent-workspace/navigation-explored.webp";
import navigationShipped from "../../assets/agent-workspace/navigation-shipped.webp";
import monitoringBefore from "../../assets/agent-workspace/monitoring-before.webp";
import monitoringNow from "../../assets/agent-workspace/monitoring-now.webp";
import composer from "../../assets/agent-workspace/composer.webp";

export const TAGS = ["Exotel", "B2B", "Enterprise Contact Center"];

// good: the direction that is an improvement for this metric
export const HEADLINE_STATS = [
  { value: 9, dir: "down", good: "down", label: "Average Handling Time" },
  { value: 18, dir: "up", good: "up", label: "First Contact Resolution" },
  { value: 28, dir: "down", good: "down", label: "Escalation Rate" },
  { value: 7.5, dir: "up", good: "up", label: "CSAT" },
];

export const STAT_GROUPS = [
  {
    title: "Efficiency Drivers",
    items: [
      {
        value: 4,
        dir: "down",
        good: "down",
        label: "Tab Switching",
        confirm: true,
      },
      { value: 13, dir: "down", good: "down", label: "Clicks per Interaction" },
      { value: 30, dir: "up", good: "up", label: "Disposition Compliance" },
    ],
  },
  {
    title: "Effectiveness Drivers",
    items: [
      {
        value: 20,
        dir: "down",
        good: "down",
        label: "Time-to-Information (TTI)",
      },
      { value: 18, dir: "up", good: "up", label: "First Contact Resolution" },
      { value: 28, dir: "down", good: "down", label: "Escalation Rate" },
    ],
  },
  {
    title: "Customer Outcomes",
    items: [
      { value: 7.5, dir: "up", good: "up", label: "CSAT" },
      { value: 2, dir: "down", good: "down", label: "Repeat Contact Rate" },
    ],
  },
];

export const BUSINESS_OUTCOMES = [
  { dir: "up", label: "Tender Win Rate" },
  { dir: "down", label: "Churn Risk" },
  { dir: "down", label: "Training Time" },
  { dir: "up", label: "Agent Retention" },
];

export const WORKSPACE_PANELS = [
  { n: 1, label: "Omni Channel Interaction list", x: 8, y: 58 },
  { n: 2, label: "Call Actions, Chat and Transcript Panel", x: 33, y: 58 },
  { n: 3, label: "Unified Customer Context", x: 57, y: 58 },
  {
    n: 4,
    label: "3rd Party App Panel for CRM, order details, KB",
    x: 85,
    y: 58,
  },
];

// Each decision: `tldr` + per-tab `points` are short annotations (drafted by Claude from the author's
// copy, pending review). The author's full text stays in `detail` and shows under "Read more".
// A "before" tab without an image shows a placeholder until the legacy screenshots arrive.
export const SOLUTIONS = [
  {
    id: "tab-switching",
    title: "The Cost of Tab Switching",
    tldr: "Solving one query meant bouncing between CRM, order details, KB and past tickets.",
    detail: [
      "Agents constantly switched between CRM, order details, KB, and past tickets to resolve a single query. Screen replays showed repeated back-and-forth navigation before resolution.",
      "Each switch increased time-to-information, cognitive load, and the risk of missing context.",
    ],
    tabs: {
      before: {
        image: workspaceBefore,
        title: "Legacy workspace",
        points: [
          "One module per screen: Home, Call Details, Call Back",
          "CRM, KB and tickets lived in other tabs",
        ],
      },
      now: {
        status: "shipped",
        image: workspace,
        anatomy: true,
        title: "Four persistent panels, one view",
        detail: {
          body: [
            "We eliminated unnecessary tab switching by restructuring the workspace into four persistent panels: interactions, transcript, unified customer context, and third-party tools, all visible in a single view.",
          ],
        },
      },
    },
  },
  {
    id: "multi-session",
    title: "High Cognitive Load from Multi-Session Handling",
    tldr: "Clicking a floating PIP silently swapped the customer behind it. The issue wasn’t volume. It was fragmented attention.",
    detail: [
      "Agents handled multiple interactions through floating PIP windows. Clicking on a PIP would silently swap the background customer context often without clear visual grounding.",
      "This led to: Accidental context switches, Increased cognitive load, Higher risk of errors, Slower resolution time.",
    ],
    tabs: {
      before: {
        image: multisessionBefore,
        title: "Legacy multi-session PIP windows",
        points: [
          "A floating chat PIP over the customer view",
          "Clicking it silently swapped the context behind",
        ],
      },
      explored: {
        status: "axed",
        image: multisessionExplored,
        title: "Customer-Centric Unified Model",
        points: [
          "One interaction list and one transcript per customer",
          "Voice/Video kept apart from passive channels",
          "Serve and dispose the customer once",
        ],
        why: "SLAs and reporting are tracked per interaction. A unified thread broke accountability and backward compatibility.",
        detail: {
          heading: "Solution 1 - Customer-Centric Unified Model",
          body: ["We explored a unified, customer-first model."],
          list: [
            "Single interaction list per customer (no channel split) with one disposition model",
            "One consolidated transcript across voice, chat, and email",
            "Active channels (Voice/Video) surfaced separately to prevent accidental switching",
            "Passive channels (WhatsApp, Messenger, Mail) handled through a secondary switcher",
          ],
          after: [
            "The idea: serve and dispose the customer once — not each interaction separately.",
            "This reduced context switching and felt operationally clean.",
            "Why It Didn’t Ship: Backend architecture defines SLAs and reporting at the interaction level. Each call, chat, or email must be tracked independently, disposed separately, and SLA-compliant with current customers (Failed Backward Compatibility). A fully unified thread would break operational accountability.",
          ],
        },
      },
      now: {
        status: "shipped",
        image: multisessionShipped,
        title: "Channel-Centric Model",
        points: [
          "Interactions grouped under the customer name",
          "Channel-specific transcript",
          "SLA-safe disposal, built to evolve toward unification",
        ],
        detail: {
          body: [
            "A hundred discussions, multiple iterations and twenty coffees later… here’s what shipped.",
            "We retained interaction-level tracking but:",
          ],
          list: [
            "Structured interactions clearly under the customer name",
            "Channel specific Transcript",
            "Maintained SLA-safe disposal flows",
            "Designed the UI to evolve toward full unification in the future",
          ],
          after: [
            "The result balances operational reality with experience ambition.",
          ],
        },
      },
    },
  },
  {
    id: "context-panel",
    title: "Customer Context Panel",
    tldr: null, // confirm: the Figma intro here repeats the multi-session text; awaiting the real copy
    tabs: {
      before: {
        image: contextBefore,
        title: "Legacy customer view",
        points: [
          "Blank form fields and a separate CRM frame below",
          "Disposition lived in the CRM, not the call",
        ],
      },
      now: {
        status: "shipped",
        image: contextPanel,
        title: "Context, Before Conversation",
        points: [
          "Verified contact details",
          "AI summary of the last interactions",
          "Sentiment signals",
          "Chronological case history",
        ],
        quote:
          "The goal wasn’t more data. It was the right context, surfaced at the right time.",
        detail: {
          body: [
            "Agents shouldn’t have to search before they solve.",
            "The Customer Context Panel brings identity, recent interactions, sentiment, and AI summaries into one structured view visible the moment an interaction begins.",
            "This reduces re-orientation time and lets agents respond with clarity immediately.",
          ],
        },
      },
    },
  },
  {
    id: "flexibility",
    title: "Keeping Context While Allowing Flexibility",
    tldr: "Agents open CRM, KB and callbacks mid-call. The live conversation had to survive full-screen navigation.",
    detail: [
      "During a live interaction, they frequently: Open full-page CRM views, reference Knowledge Base articles, reschedule callbacks etc.",
      "The system needed to: Preserve live interaction context, allow full-screen navigation, avoid cognitive disorientation, maintain speed.",
    ],
    tabs: {
      before: {
        image: navigationBefore,
        maxw: 340,
        title: "Legacy navigation during a live interaction",
        points: [
          "The live call sat in a pop-over beside the page",
          "Call details only, no conversation context",
        ],
      },
      explored: {
        status: "axed",
        image: navigationExplored,
        zoom: { origin: "99% 0%", scale: 2.8 }, // push in on the header avatars
        title: "Persistent Avatars in Header",
        points: [
          "Active conversations as avatars in the top bar",
          "Switch interactions from any module",
        ],
        why: "Avatars show presence, not state. It preserved access, not continuity.",
        detail: {
          body: [
            "Active conversations appear as avatars in the top navigation bar. Agents can switch between interactions while navigating across modules.",
            "Why It Seemed Promising, PMs raised concerns over weak context persistence. Avatars show presence, not state. Agents still had to:",
          ],
          list: [
            "Click back into workbench",
            "Re-orient to interaction",
            "Re-scan conversation history",
          ],
          after: ["It preserved access, not continuity."],
        },
      },
      now: {
        status: "shipped",
        image: navigationShipped,
        zoom: { origin: "97% 12%", scale: 1.8 }, // push in on the floating PiP window
        title: "Floating PiP (Picture-in-Picture)",
        points: [
          "Persists across navigation",
          "Expands instantly",
          "Maintains real-time context",
        ],
      },
    },
  },
  {
    id: "monitoring",
    title: "Monitoring Was Competing With Conversations",
    tldr: "The monitoring app sat in the app slot during live calls. Monitoring shouldn’t interrupt service.",
    detail: [
      "Previously, the Agent Monitoring App lived in the app slot, accessible at all times, even during live calls.",
      "It created a subtle distractions: Agents could switch context mid-conversation, performance metrics competed with customer focus, Cognitive load increased during active interactions.",
    ],
    tabs: {
      before: {
        image: monitoringBefore,
        title: "Agent Monitoring App in the app slot",
        points: [
          "Reachable mid-conversation",
          "Metrics competed with customer focus",
        ],
      },
      now: {
        status: "shipped",
        image: monitoringNow,
        title: "From Utility App to Contextual Dashboard",
        points: [
          "Moved to the Home Dashboard",
          "Visible between interactions",
          "Not intrusive during live calls",
        ],
        detail: {
          body: ["We moved performance monitoring to the Home Dashboard."],
          after: [
            "Now, agents review metrics when it’s relevant not when a customer is waiting on the line.",
          ],
        },
      },
    },
  },
  {
    id: "composer",
    title: "Rethinking the Chat Composer",
    tldrLabel: "Goal",
    tldr: "A flexible, scalable and context-aware reply system built for speed, attachments, smart responses, and multi-channel workflow",
    tabs: {
      before: { caption: "Legacy chat composer" },
      now: {
        status: "shipped",
        image: composer,
        fill: true,
        title: "One composer, every channel",
        points: ["Attachments", "Smart responses", "Multi-channel replies"],
      },
    },
  },
];
