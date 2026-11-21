import { RollingNumber } from "./RollingNumber";
import { BUSINESS_OUTCOMES, HEADLINE_STATS, STAT_GROUPS } from "./content";

const ARROW = { up: "↑", down: "↓" };

// Dev-only marker so unconfirmed numbers never ship silently.
const ConfirmBadge = ({ show }) =>
  show && import.meta.env.DEV ? (
    <span className="cs-confirm">to confirm</span>
  ) : null;

const tone = (s) => (s.dir === s.good ? "is-good" : "is-bad");

export const ImpactStats = () => (
  <section className="cs-block cs-wide" aria-labelledby="cs-impact">
    <div className="cs-split cs-split-head">
      <div>
        <p className="cs-eyebrow" id="cs-impact">
          Impact
        </p>
        <h2 className="cs-h2">Faster answers, fewer escalations</h2>
      </div>
    </div>

    <ul className="cs-headline">
      {HEADLINE_STATS.map((s) => (
        <li key={s.label} className={tone(s)}>
          <span className="cs-headline-num">
            <RollingNumber value={s.value} />
            <span className="cs-headline-unit">%</span>
          </span>
          <span className="cs-headline-label">
            <span className="cs-delta">{ARROW[s.dir]}</span> {s.label}
          </span>
        </li>
      ))}
    </ul>

    <div className="cs-ledger">
      {STAT_GROUPS.map((g) => (
        <div key={g.title}>
          <h3>{g.title}</h3>
          <ul>
            {g.items.map((s) => (
              <li key={s.label} className={tone(s)}>
                <span>
                  {s.label} <ConfirmBadge show={s.confirm} />
                </span>
                <span className="cs-ledger-val">
                  {ARROW[s.dir]} {s.value}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <h3>Business Outcomes</h3>
        <ul>
          {BUSINESS_OUTCOMES.map((o) => (
            <li key={o.label} className="is-good">
              <span>{o.label}</span>
              <span className="cs-ledger-val">{ARROW[o.dir]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
