// "Read more" disclosure: skimmers get the annotation, readers get the author's full text.
export const More = ({ heading, body, list, after, label = "Read more" }) => (
  <details className="cs-more">
    <summary>{label}</summary>
    <div className="cs-more-body">
      {heading && <h5>{heading}</h5>}
      {body?.map((t) => (
        <p key={t}>{t}</p>
      ))}
      {list?.length > 0 && (
        <ul>
          {list.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
      {after?.map((t) => (
        <p key={t}>{t}</p>
      ))}
    </div>
  </details>
);
