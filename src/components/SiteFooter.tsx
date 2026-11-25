import { ADDRESS, CONCIERGE_EMAIL } from "../content/site";

export function SiteFooter() {
  const [street, ...rest] = ADDRESS.split(", ");
  return (
    <footer className="site-footer">
      <div className="row">
        <span>The Sovereign Cove</span>
        {/* Each pair sits on one line on wide screens and on two lines on phones. */}
        <span className="pair-line">
          <span>{street}</span>
          <span className="dot"> · </span>
          <span>{rest.join(", ")}</span>
        </span>
        <a href={`mailto:${CONCIERGE_EMAIL}`} className="pair-line">
          <span>Concierge</span>
          <span className="dot"> · </span>
          <span>{CONCIERGE_EMAIL}</span>
        </a>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
