import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/events", label: "Events" },
  { to: "/estate", label: "The Estate" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);

  // Other sections size themselves against the header's real height.
  useEffect(() => {
    const set = () => {
      if (header.current) {
        document.documentElement.style.setProperty("--navh", `${header.current.offsetHeight}px`);
      }
    };
    set();
    window.addEventListener("resize", set);
    window.addEventListener("load", set);
    return () => {
      window.removeEventListener("resize", set);
      window.removeEventListener("load", set);
    };
  }, []);

  return (
    <>
      <header ref={header} className="site-header">
        <nav>
          <Link to="/" className="brand" aria-label="The Sovereign Cove — home">
            <img src="/images/logo.webp" alt="" width={56} height={56} />
            <span>The Sovereign Cove</span>
          </Link>
          <div className="site-links">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="nav-link" activeProps={{ className: "nav-link active" }}>
                {l.label}
              </Link>
            ))}
            <Link to="/availability" className="btn">
              Check Availability
            </Link>
            <button type="button" className="menu-btn" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div className="mobile-menu">
          <button type="button" className="close" aria-label="Close menu" onClick={() => setOpen(false)}>
            <X className="h-6 w-6" strokeWidth={1.25} />
          </button>
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link to="/availability" onClick={() => setOpen(false)}>
            Check Availability
          </Link>
        </div>
      )}
    </>
  );
}
