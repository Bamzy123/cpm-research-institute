import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowRight, Building2, Heart } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About CPM Int'l" },
  { href: "/#research", label: "Research" },
  { href: "/chip", label: "CHIP™" },
  { href: "/events", label: "Events & News" },
  { href: "/fellowships", label: "Fellowships" },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  const closeMenu = () => {
    if (prefersReduced) {
      setMenuOpen(false);
      return;
    }
    setMenuClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 290);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-3.5 lg:px-10">
          {/* Logo & University Affiliation Badge */}
          <div className="flex items-center gap-4 min-w-0">
            <Link to="/" className="flex shrink-0 items-center">
              <img
                src="/logo_8-removebg-preview.png"
                alt="CPM Int'l Research Institute for Climate Health"
                className="h-10 md:h-11 w-auto object-contain"
              />
            </Link>
            <div className="hidden xl:flex items-center gap-1.5 border-l border-border/70 pl-4 py-0.5 text-xs text-muted-foreground">
              <Building2 className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>Hosted at <strong>Obafemi Awolowo University</strong></span>
            </div>
          </div>

          {/* Primary Nav Links */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-6 text-xs font-medium text-foreground/80">
            {navItems.map((n) =>
              n.href.includes("#") ? (
                <a
                  key={n.href}
                  href={n.href}
                  className="transition-colors hover:text-primary py-1"
                >
                  {n.label}
                </a>
              ) : (
                <Link
                  key={n.href}
                  to={n.href}
                  className="transition-colors hover:text-primary py-1"
                >
                  {n.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/donate"
              className="hidden sm:inline-flex items-center gap-2 border px-4 py-2 text-xs font-medium transition-all hover:scale-105"
              style={{ background: "oklch(0.72 0.14 75)", color: "oklch(0.15 0.04 230)", borderColor: "oklch(0.72 0.14 75)" }}
            >
              <Heart className="h-3.5 w-3.5 fill-current" />
              <span>Support Research</span>
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={menuOpen ? closeMenu : () => setMenuOpen(true)}
              className="relative inline-flex h-9 w-9 items-center justify-center border border-border transition-colors hover:border-primary/60 lg:hidden"
            >
              <span
                className="absolute"
                style={{
                  opacity: menuOpen ? 0 : 1,
                  transition: prefersReduced ? "none" : "opacity 200ms, transform 200ms",
                  transform: menuOpen ? "rotate(45deg) scale(0.6)" : "none",
                }}
              >
                <Menu className="h-5 w-5" aria-hidden />
              </span>
              <span
                className="absolute"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transition: prefersReduced ? "none" : "opacity 200ms, transform 200ms",
                  transform: menuOpen ? "none" : "rotate(-45deg) scale(0.6)",
                }}
              >
                <X className="h-5 w-5" aria-hidden />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {menuOpen && (
        <>
          <div
            className={`fixed inset-0 z-40 bg-foreground/40 lg:hidden ${
              menuClosing ? "nav-backdrop-out" : "nav-backdrop-in"
            }`}
            onClick={closeMenu}
            aria-hidden
          />
          <nav
            aria-label="Mobile Navigation"
            className={`fixed top-0 right-0 z-50 flex h-full w-80 max-w-[88vw] flex-col border-l border-border bg-background shadow-2xl lg:hidden ${
              menuClosing ? "nav-slide-out" : "nav-slide-in"
            }`}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div className="flex flex-col">
                <span className="font-serif text-lg font-semibold tracking-tight text-primary">CPM Int'l</span>
                <span className="text-[11px] text-muted-foreground">Hosted at Obafemi Awolowo University</span>
              </div>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="inline-flex h-8 w-8 items-center justify-center border border-border transition-colors hover:border-primary/60"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <ul className="flex flex-col py-3">
              {navItems.map((n) => (
                <li key={n.href}>
                  {n.href.includes("#") ? (
                    <a
                      href={n.href}
                      onClick={closeMenu}
                      className="block px-6 py-3.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
                    >
                      {n.label}
                    </a>
                  ) : (
                    <Link
                      to={n.href}
                      onClick={closeMenu}
                      className="block px-6 py-3.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
                    >
                      {n.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Link
                  to="/donate"
                  onClick={closeMenu}
                  className="block px-6 py-3.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                >
                  Support Research / Donate →
                </Link>
              </li>
            </ul>
            <div className="mt-auto border-t border-border px-6 py-6 bg-muted/20">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
                Science · Innovation · Intelligence · Impact
              </p>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
