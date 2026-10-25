import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About CPM Int’l" },
  { href: "/#research", label: "Research" },
  { href: "/chip", label: "CHIP™" },
  { href: "/news", label: "News & Events" },
  { href: "/fellowships", label: "Fellowships" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onChange = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background">
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between gap-6 px-6 lg:h-20 lg:px-10">
        <Link to="/" className="shrink-0" aria-label="CPM Int’l home">
          <img
            src="/logo_8-removebg-preview.png"
            alt="CPM Int’l Research Institute for Climate Health"
            width={180}
            height={52}
            className="h-11 w-auto sm:h-12"
          />
        </Link>
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-6 text-[13px] font-medium xl:flex"
        >
          {navItems.map((item) =>
            item.href.includes("#") ? (
              <a
                key={item.href}
                href={item.href}
                className="py-3 transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                activeOptions={{ exact: item.href === "/" }}
                activeProps={{
                  className: "text-primary underline decoration-primary/40 underline-offset-8",
                }}
                className="py-3 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            to="/donate"
            className="hidden min-h-11 items-center gap-4 bg-primary px-4 py-3 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex"
          >
            Support Research <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="flex h-11 w-11 items-center justify-center border border-border text-primary xl:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent className="z-[60] flex w-[min(360px,90vw)] flex-col px-7 pb-8 pt-9 motion-reduce:animate-none motion-reduce:transition-none [&>button]:right-4 [&>button]:top-4 [&>button]:flex [&>button]:h-11 [&>button]:w-11 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-none">
              <div className="border-b border-border pb-7 pr-8">
                <SheetTitle className="font-serif text-2xl font-normal text-primary">
                  CPM Int’l
                </SheetTitle>
                <SheetDescription className="mt-2 text-xs leading-5">
                  Research Institute for Climate Health
                </SheetDescription>
              </div>
              <nav aria-label="Mobile Navigation" className="mt-2 overflow-y-auto">
                <ul>
                  {navItems.map((item) => (
                    <li key={item.href} className="border-b border-border/60">
                      {item.href.includes("#") ? (
                        <a
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex min-h-14 items-center justify-between py-4 text-base hover:text-primary"
                        >
                          {item.label}
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground" aria-hidden />
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={() => setMenuOpen(false)}
                          activeOptions={{ exact: item.href === "/" }}
                          activeProps={{ className: "text-primary" }}
                          className="flex min-h-14 items-center justify-between py-4 text-base hover:text-primary"
                        >
                          {item.label}
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground" aria-hidden />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <Link
                to="/donate"
                onClick={() => setMenuOpen(false)}
                className="mt-5 flex min-h-12 items-center justify-between gap-4 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
              >
                Support Research <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
              <p className="mt-auto pt-7 text-[10px] uppercase leading-5 tracking-[0.18em] text-muted-foreground">
                Science · Innovation · Intelligence · Impact
              </p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
