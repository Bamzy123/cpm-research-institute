import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Menu, X,
  Microscope, Globe2, BrainCircuit, Dna, Activity, BarChart3,
} from "lucide-react";
import { useState } from "react";
import teamPhoto from "../assets/team.jpeg?url";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — CPM International Research Institute for Climate Health" },
      {
        name: "description",
        content:
          "Learn about CPM International Research Institute for Climate Health — our identity, vision, mission, and the multidisciplinary mandate that drives everything we do.",
      },
    ],
  }),
});

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About CPM" },
  { href: "/#research", label: "Research" },
  { href: "/chip", label: "CHIP™" },
  { href: "/news", label: "News" },
  { href: "/resources", label: "Resources" },
  { href: "/leadership", label: "Leadership" },
  { href: "/#contact", label: "Contact" },
];

const missionCards = [
  { icon: Microscope, title: "Scientific Discovery", body: "Generating cutting-edge knowledge at the intersection of climate, pathogens and public health." },
  { icon: Globe2, title: "Climate Intelligence", body: "Integrating climate data and environmental intelligence into disease surveillance frameworks." },
  { icon: BrainCircuit, title: "Artificial Intelligence", body: "Developing AI-driven tools that transform health data into actionable predictive intelligence." },
  { icon: Dna, title: "Pathogen Genomics", body: "Advancing molecular epidemiology and genomic surveillance to track emerging threats." },
  { icon: Activity, title: "One Health", body: "Recognising the interconnectedness of human, animal, plant and environmental health." },
  { icon: BarChart3, title: "Decision Support", body: "Translating evidence into practical tools for policymakers, hospitals and agencies." },
];

function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);

  const closeMenu = () => {
    setMenuClosing(true);
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 290);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-4 lg:px-10">
          <Link to="/" className="flex min-w-0 items-center">
            <img src="/cpm-logo.png" alt="CPM International Research Institute for Climate Health" className="h-10 md:h-12 w-auto object-contain mix-blend-multiply" />
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-7 text-sm font-medium text-foreground/80 md:flex">
            {navItems.map((n) =>
              n.href.startsWith("/") && !n.href.includes("#") ? (
                <Link key={n.href} to={n.href} className="transition-colors hover:text-primary">{n.label}</Link>
              ) : (
                <a key={n.href} href={n.href} className="transition-colors hover:text-primary">{n.label}</a>
              )
            )}
          </nav>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={menuOpen ? closeMenu : () => setMenuOpen(true)}
            className="relative inline-flex h-10 w-10 items-center justify-center border border-border transition-colors hover:border-primary/60 md:hidden"
          >
            <span className="absolute" style={{ opacity: menuOpen ? 0 : 1, transition: "opacity 200ms" }}>
              <Menu className="h-5 w-5" aria-hidden />
            </span>
            <span className="absolute" style={{ opacity: menuOpen ? 1 : 0, transition: "opacity 200ms" }}>
              <X className="h-5 w-5" aria-hidden />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      {menuOpen && (
        <>
          <div className={`fixed inset-0 z-40 bg-foreground/40 md:hidden ${menuClosing ? "nav-backdrop-out" : "nav-backdrop-in"}`} onClick={closeMenu} aria-hidden />
          <nav aria-label="Mobile" className={`fixed top-0 right-0 z-50 flex h-full w-72 max-w-[85vw] flex-col border-l border-border bg-background shadow-2xl md:hidden ${menuClosing ? "nav-slide-out" : "nav-slide-in"}`}>
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <span className="font-serif text-xl font-medium tracking-tight text-primary">CPM</span>
              <button type="button" onClick={closeMenu} aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center border border-border transition-colors hover:border-primary/60">
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <ul className="flex flex-col py-2">
              {navItems.map((n) => (
                <li key={n.href}>
                  {n.href.startsWith("/") && !n.href.includes("#") ? (
                    <Link to={n.href} onClick={closeMenu}
                      className="block px-6 py-4 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary">
                      {n.label}
                    </Link>
                  ) : (
                    <a href={n.href} onClick={closeMenu}
                      className="block px-6 py-4 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary">
                      {n.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}

      {/* Page Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, oklch(0.20 0.06 230) 0%, oklch(0.26 0.08 220) 50%, oklch(0.30 0.07 210) 100%)",
          minHeight: "380px",
        }}
      >
        <div className="absolute inset-0 opacity-[0.06]" aria-hidden style={{ backgroundImage: "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, transparent, oklch(0.72 0.14 75), transparent)" }} aria-hidden />
        <div className="relative mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.25em]" style={{ color: "oklch(0.72 0.14 75)" }}>
            CPM International Research Institute for Climate Health
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl max-w-3xl">
            About CPM
          </h1>
          <p className="mt-5 text-lg font-light tracking-wide" style={{ color: "oklch(0.85 0.04 220)" }}>
            Identity &nbsp;·&nbsp; Vision &nbsp;·&nbsp; Mission
          </p>
          <nav aria-label="Breadcrumb" className="mt-10 flex items-center gap-2 text-xs" style={{ color: "oklch(0.70 0.04 220)" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span aria-hidden>/</span>
            <span className="text-white">About CPM</span>
          </nav>
        </div>
      </section>

      {/* Who We Are */}
      <section id="about" className="bg-background hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20 items-center">
            <div className="lg:col-span-6">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Welcome to CPM</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-foreground lg:text-5xl">
                CPM International Research Institute for Climate Health
              </h2>
              <div className="mt-3 h-0.5 w-16" style={{ background: "oklch(0.72 0.14 75)" }} aria-hidden />
              <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  CPM International Research Institute for Climate Health is an independent multidisciplinary research institute dedicated to advancing scientific discovery, innovation, and evidence-based solutions at the intersection of climate change, infectious diseases, artificial intelligence, pathogen genomics, and One Health.
                </p>
                <p>
                  Established with a global outlook and an African perspective, the Institute brings together researchers, clinicians, public health professionals, environmental scientists, data scientists, engineers, policymakers, and development partners to address one of the defining challenges of our time: the growing impact of climate change on human, animal, and environmental health.
                </p>
                <p>
                  Our work integrates advanced scientific research with digital innovation to strengthen disease surveillance, improve outbreak prediction, support health systems resilience, and accelerate the translation of research into public health action.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/#research" className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                  Our Research Areas <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <Link to="/leadership" className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium transition hover:border-primary/60 hover:text-primary">
                  Meet Our Leadership
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6 flex flex-col gap-8">
              <div className="relative">
                <img
                  src={teamPhoto}
                  alt="CPM research team"
                  className="w-full border border-border object-cover shadow-lg"
                  style={{ aspectRatio: "16/9" }}
                />
                <div className="absolute -bottom-3 -left-3 h-16 w-16 border-b-2 border-l-2" style={{ borderColor: "oklch(0.72 0.14 75)" }} aria-hidden />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "12+", label: "Research Themes" },
                  { value: "Growing", label: "Strategic Partnerships" },
                  { value: "5+", label: "Innovation Platforms" },
                  { value: "Expanding", label: "Countries for Collaboration" },
                ].map(({ value, label }) => (
                  <div key={label} className="border border-border bg-card p-5 text-center card-lift">
                    <p className="font-serif text-3xl font-medium text-primary">{value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="bg-sky hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="font-serif text-[120px] leading-none select-none" style={{ color: "oklch(0.34 0.06 160 / 0.12)" }} aria-hidden>&ldquo;</div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary -mt-8">Our Vision</p>
            <blockquote className="mt-6 font-serif text-2xl leading-relaxed text-foreground lg:text-3xl">
              To become a globally recognised centre of excellence driving transformative research, innovation, and intelligent solutions that build climate-resilient health systems and improve population health worldwide.
            </blockquote>
            <div className="mt-8 flex justify-center">
              <div className="h-0.5 w-24" style={{ background: "linear-gradient(90deg, transparent, oklch(0.72 0.14 75), transparent)" }} aria-hidden />
            </div>
            <p className="mt-6 text-sm uppercase tracking-[0.22em] text-muted-foreground">
              CPM International Research Institute for Climate Health
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="bg-background hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Our Mission</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-foreground lg:text-5xl">
              What Drives Everything We Do
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              To generate cutting-edge scientific knowledge, develop innovative digital technologies, strengthen research capacity, and foster strategic partnerships that transform climate-health intelligence into practical solutions.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {missionCards.map(({ icon: Icon, title, body }) => (
              <div key={title} className="group border border-border bg-card p-8 card-lift relative overflow-hidden">
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300" aria-hidden />
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/8 transition-all duration-300 group-hover:bg-primary/15">
                    <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-medium text-foreground">{title}</h3>
                  <div className="mt-2 h-0.5 w-8 transition-all duration-300 group-hover:w-16" style={{ background: "oklch(0.72 0.14 75)" }} aria-hidden />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link to="/" className="inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
              Back to Home <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "oklch(0.14 0.04 230)" }}>
        <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, oklch(0.72 0.14 75), transparent)" }} aria-hidden />
        <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs" style={{ color: "oklch(0.50 0.02 220)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="bg-white/95 px-2.5 py-1.5 rounded-md shadow-sm"><img src="/cpm-logo.png" alt="CPM Logo" className="h-8 md:h-10 w-auto object-contain mix-blend-multiply" /></div>
              <p>© {new Date().getFullYear()} CPM International Research Institute.</p>
            </div>
            <p className="uppercase tracking-[0.2em]">Science · Innovation · Intelligence · Impact</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
