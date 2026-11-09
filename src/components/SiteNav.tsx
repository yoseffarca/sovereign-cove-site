import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Search, X } from "lucide-react";

type NavItem =
  | { to: string; label: string }
  | { label: string; children: { to: string; label: string }[] };

const items: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/discover", label: "Discover" },
  {
    label: "Events & Retreats",
    children: [
      { to: "/events/weddings", label: "Weddings" },
      { to: "/events/family-celebrations", label: "Family Celebrations" },
      { to: "/events/corporate", label: "Corporate Events" },
    ],
  },
  { to: "/queries", label: "Queries" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenuOpen(false), 140);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white text-black reveal-fade">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <Link to="/" className="font-serif text-lg md:text-xl tracking-[0.35em] uppercase">
          {"Sovereign Cove"}
        </Link>
        <div className="flex items-center gap-8 text-[11px] tracking-[0.25em] uppercase">
          {items.map((item) =>
            "to" in item ? (
              <Link key={item.to} to={item.to} className="nav-link hidden md:inline">
                {item.label}
              </Link>
            ) : (
              <div
                key={item.label}
                className="relative hidden md:block"
                onMouseEnter={openMenu}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className="nav-link inline-flex items-center gap-1.5"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  {item.label}
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`}
                    strokeWidth={1.25}
                  />
                </button>
                <div
                  role="menu"
                  className={`absolute left-1/2 top-full -translate-x-1/2 pt-5 transition-all duration-300 ease-out ${
                    menuOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                >
                  <div className="min-w-[280px] bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] px-8 py-8">
                    <ul className="flex flex-col gap-5">
                      {item.children.map((c) => (
                        <li key={c.to}>
                          <Link
                            to={c.to}
                            onClick={() => setMenuOpen(false)}
                            className="nav-link block text-[11px] tracking-[0.3em] uppercase text-black/80 hover:text-black"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ),
          )}
          <Search
            className="h-4 w-4 hidden md:block opacity-80 hover:opacity-100 transition"
            strokeWidth={1.25}
          />
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="md:hidden opacity-90 hover:opacity-100 transition"
          >
            <Menu className="h-5 w-5" strokeWidth={1.25} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative flex h-full flex-col items-center justify-center gap-8 text-white overflow-y-auto py-20">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 opacity-90 hover:opacity-100"
            >
              <X className="h-6 w-6" strokeWidth={1.25} />
            </button>
            {items.map((item) =>
              "to" in item ? (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="font-serif text-2xl tracking-[0.35em] uppercase nav-link"
                >
                  {item.label}
                </Link>
              ) : (
                <div key={item.label} className="flex flex-col items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setMobileEventsOpen((v) => !v)}
                    aria-expanded={mobileEventsOpen}
                    className="font-serif text-2xl tracking-[0.35em] uppercase nav-link inline-flex items-center gap-2"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${mobileEventsOpen ? "rotate-180" : ""}`}
                      strokeWidth={1.25}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      mobileEventsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="flex flex-col items-center gap-4 pt-2">
                        {item.children.map((c) => (
                          <li key={c.to}>
                            <Link
                              to={c.to}
                              onClick={() => {
                                setOpen(false);
                                setMobileEventsOpen(false);
                              }}
                              className="text-[13px] tracking-[0.3em] uppercase text-white/80 hover:text-white nav-link"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
}
