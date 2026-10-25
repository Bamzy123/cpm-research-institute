import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "../lib/site";

const links = [
  { href: "/about", label: "About the institute" },
  { href: "/#research", label: "Our research" },
  { href: "/chip", label: "CHIP™" },
  { href: "/news", label: "News & Events" },
  { href: "/leadership", label: "Scientific leadership" },
  { href: "/fellowships", label: "Fellowships & training" },
  { href: "/resources", label: "Resources & publications" },
];

export function Footer() {
  return (
    <footer className="bg-[#102e27] text-[#edf0e8]">
      <div className="mx-auto max-w-[1320px] px-6 pt-14 lg:px-10 lg:pt-16">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-20">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex" aria-label="CPM Int’l home">
              <img
                src="/logo_8-removebg-preview.png"
                alt="CPM Int’l Research Institute for Climate Health"
                width={180}
                height={52}
                className="h-12 w-auto brightness-0 invert"
                loading="lazy"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-[#bfcec4]">
              Independent research at the intersection of climate science, infectious disease and
              public health.
            </p>
            <Link
              to="/about"
              className="mt-5 inline-flex min-h-11 items-center gap-4 text-sm font-medium underline decoration-white/30 underline-offset-8 hover:decoration-white"
            >
              Discover CPM Int’l <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <nav aria-label="Footer Navigation">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em]">Explore</h2>
            <ul className="mt-5 space-y-1">
              {links.map((item) => (
                <li key={item.href}>
                  {item.href.includes("#") ? (
                    <a
                      href={item.href}
                      className="inline-flex min-h-8 items-center py-1 text-sm text-[#bfcec4] hover:text-white hover:underline underline-offset-4"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="inline-flex min-h-8 items-center py-1 text-sm text-[#bfcec4] hover:text-white hover:underline underline-offset-4"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em]">Contact</h2>
            <address className="mt-6 max-w-xs text-sm not-italic leading-7 text-[#bfcec4]">
              {SITE.address}
            </address>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 inline-flex min-h-9 items-center break-all text-sm underline decoration-white/30 underline-offset-4 hover:text-white"
            >
              {SITE.email}
            </a>
            <br />
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="inline-flex min-h-9 items-center text-sm text-[#bfcec4] hover:text-white"
            >
              {SITE.phone}
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 border-t border-white/20 py-6 sm:flex-row sm:items-center">
          <p className="text-xs leading-5 text-[#a9bcb0]">
            © {new Date().getFullYear()} CPM Int’l Research Institute for Climate Health.
          </p>
          <p className="text-[9px] uppercase leading-5 tracking-[0.16em] text-[#a9bcb0]">
            Science · Innovation · Intelligence · Impact
          </p>
        </div>
      </div>
    </footer>
  );
}
