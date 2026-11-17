import { ADDRESS, CONCIERGE_EMAIL } from "../content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="row">
        <span>The Sovereign Cove</span>
        <span>{ADDRESS.replace(", Tavernier", " · Tavernier")}</span>
        <a href={`mailto:${CONCIERGE_EMAIL}`} className="nav-link">
          Concierge · {CONCIERGE_EMAIL}
        </a>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
