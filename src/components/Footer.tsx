import React from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Mail, Phone, Building2 } from "lucide-react";

const researchAreas = [
  "Climate Change & Health",
  "Clinical Microbiology",
  "One Health",
  "Antimicrobial Resistance",
  "Artificial Intelligence",
  "Pathogen Genomics",
];

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About CPM Int'l" },
  { href: "/#research", label: "Research Areas" },
  { href: "/chip", label: "CHIP™ Digital Twin" },
  { href: "/events", label: "Events & News" },
  { href: "/fellowships", label: "Fellowships & Training" },
  { href: "/leadership", label: "Institute Leadership" },
  { href: "/resources", label: "Resources & Publications" },
  { href: "/donate", label: "Support & Giving" },
];

export function Footer() {
  return (
    <footer style={{ background: "oklch(0.14 0.04 230)" }}>
      {/* Gold top accent */}
      <div
        className="h-0.5"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.72 0.14 75), transparent)",
        }}
        aria-hidden
      />
      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-5 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="inline-block mb-2">
              <img
                src="/logo 3.jpeg"
                alt="CPM Int'l International Research Institute for Climate Health"
                className="h-10 md:h-12 w-auto object-contain mix-blend-screen"
              />
            </div>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "oklch(0.65 0.03 220)" }}
            >
              An independent multidisciplinary research institute hosted at <strong>Obafemi Awolowo University, Ile-Ife, Nigeria</strong> — dedicated to advancing scientific discovery, innovation, and evidence-based solutions at the intersection of climate change, infectious diseases, AI, and One Health.
            </p>
            <p
              className="mt-5 text-xs uppercase tracking-[0.2em]"
              style={{ color: "oklch(0.72 0.14 75)" }}
            >
              Science · Innovation · Intelligence · Impact
            </p>
            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-white mb-2">
                Subscribe to Institute Intelligence
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-9 min-w-0 flex-1 border border-border bg-black/30 px-3 text-xs text-white outline-none focus:border-primary/80"
                />
                <button
                  type="submit"
                  className="h-9 border border-primary/50 bg-primary/20 px-3.5 text-xs font-medium text-white transition hover:bg-primary/40"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Scientific Pillars */}
          <div>
            <p className="text-sm font-medium text-white">Research Focus</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {researchAreas.map((area) => (
                <li key={area}>
                  <a
                    href="/#research"
                    className="transition hover:text-white"
                    style={{ color: "oklch(0.65 0.03 220)" }}
                  >
                    {area}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-medium text-white">Institute</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navItems.map((n) => (
                <li key={n.label}>
                  {n.href.includes("#") ? (
                    <a
                      href={n.href}
                      className="transition hover:text-white"
                      style={{ color: "oklch(0.65 0.03 220)" }}
                    >
                      {n.label}
                    </a>
                  ) : (
                    <Link
                      to={n.href}
                      className="transition hover:text-white"
                      style={{ color: "oklch(0.65 0.03 220)" }}
                    >
                      {n.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-medium text-white">Contact & Host</p>
            <ul
              className="mt-4 space-y-3 text-sm"
              style={{ color: "oklch(0.65 0.03 220)" }}
            >
              <li className="flex items-start gap-2">
                <Building2
                  className="h-3.5 w-3.5 shrink-0 mt-0.5"
                  style={{ color: "oklch(0.72 0.14 75)" }}
                />
                <span className="text-xs font-medium text-white">
                  Obafemi Awolowo University (OAU), Ile-Ife, Osun State, Nigeria
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin
                  className="h-3.5 w-3.5 shrink-0 mt-0.5"
                  style={{ color: "oklch(0.72 0.14 75)" }}
                />
                <span className="text-xs">
                  7, Grand-mart Hub, Opposite Omololu Hospital, Akobo Ojuirin, Ibadan, Oyo State, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: "oklch(0.72 0.14 75)" }}
                />
                <span className="text-xs">info@cpm-institute.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: "oklch(0.72 0.14 75)" }}
                />
                <span className="text-xs">+234 803 377 0933</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-10 border-t pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs"
          style={{
            borderColor: "oklch(1 0 0 / 0.1)",
            color: "oklch(0.45 0.02 220)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="px-2.5 py-1.5 rounded-md shadow-sm">
              <img
                src="/logo 3.jpeg"
                alt="CPM Int'l Logo"
                className="h-10 md:h-12 w-auto object-contain mix-blend-screen"
              />
            </div>
            <p>© {new Date().getFullYear()} CPM Int'l Research Institute for Climate Health. All rights reserved.</p>
          </div>
          <p className="uppercase tracking-[0.2em]">
            Science · Innovation · Intelligence · Impact
          </p>
        </div>
      </div>
    </footer>
  );
}
