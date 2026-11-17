import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="row">
        <span>The Sovereign Cove</span>
        <span>Tavernier · Florida Keys</span>
        <Link to="/availability" className="nav-link">
          Check Availability
        </Link>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
