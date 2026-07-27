import { createFileRoute, Link } from "@tanstack/react-router";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import {
  ArrowLeft, Activity, Cpu, AlertCircle, Globe2, Dna, Monitor, Leaf,
  HeartPulse, Target, Sparkles, CheckCircle2, Maximize2, X, Shield, Menu,
  Layers, Database, BrainCircuit, Eye, ArrowRight
} from "lucide-react";

export const Route = createFileRoute("/chip")({
  component: ChipPage,
  head: () => ({
    meta: [
      { title: "CHIP™ — Climate Health Intelligence Platform | CPM Int'l Research Institute" },
      { name: "description", content: "CHIP™ is the flagship scientific innovation of CPM Int'l Research Institute for Climate Health — an AI-enabled Climate Health Digital Twin for predictive public health." },
      { property: "og:title", content: "CHIP™ — Climate Health Intelligence Platform" },
      { property: "og:description", content: "The flagship scientific innovation of CPM Int'l Research Institute for Climate Health." },
      { property: "og:image", content: "/chip.jpeg" },
      { property: "og:type", content: "article" },
    ],
  }),
});

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About CPM Int'l" },
  { href: "/#research", label: "Research" },
  { href: "/chip", label: "CHIP™" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/resources", label: "Resources" },
  { href: "/leadership", label: "Leadership" },
  { href: "/#contact", label: "Contact" },
];

const capabilities: { label: string; icon: typeof Activity; desc: string }[] = [
  { label: "Climate-sensitive infectious disease surveillance", icon: Activity, desc: "Real-time surveillance integrating meteorological and epidemiological parameters." },
  { label: "AI-driven outbreak prediction", icon: Cpu, desc: "Machine learning algorithms modeling pathogen spillover and transmission risks." },
  { label: "Early warning and risk intelligence", icon: AlertCircle, desc: "Proactive alert systems to notify healthcare centers before disease surges." },
  { label: "Environmental and satellite data integration", icon: Globe2, desc: "Remote sensing and environmental intelligence feeding predictive models." },
  { label: "Laboratory and pathogen genomic surveillance", icon: Dna, desc: "High-throughput genomic variant tracking and drug resistance monitoring." },
  { label: "Digital decision-support systems", icon: Monitor, desc: "Interactive executive dashboards translating complex data into policy actions." },
  { label: "One Health implementation", icon: Leaf, desc: "Operationalizing human, animal, vector, and ecosystem health data streams." },
  { label: "Climate-resilient health systems", icon: HeartPulse, desc: "Inoculating clinical networks against extreme weather shocks." },
  { label: "Resource prioritization and policy planning", icon: Target, desc: "Evidence-based resource allocation and rapid response deployment." },
];

// ── Scroll-reveal hook ───────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") { setInView(true); return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); io.unobserve(el); }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function reveal(inView: boolean, delay = 0): CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : "translateY(22px)",
    transition: `opacity 650ms ease-out ${delay}ms, transform 650ms ease-out ${delay}ms`,
  };
}

function ChipPage() {
  const heroSection    = useInView(0.05);
  const introSection   = useInView(0.1);
  const twinSection    = useInView(0.1);
  const capSection     = useInView(0.08);
  const visionSection  = useInView(0.1);
  const closingSection = useInView(0.15);
  const ackSection     = useInView(0.1);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);

  const closeMenu = () => {
    setMenuClosing(true);
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 290);
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">

      {/* ── Sticky Header ────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-4 py-3.5 sm:px-6 lg:px-10">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img src="/logo_8-removebg-preview.png" alt="CPM Logo" className="h-9 sm:h-11 w-auto object-contain mix-blend-multiply" />
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-6 text-sm font-medium text-foreground/80 lg:flex">
            {navItems.map((n) =>
              n.href.startsWith("/") && !n.href.includes("#") ? (
                <Link key={n.label} to={n.href} activeProps={{ className: "text-primary font-semibold" }} className="transition-colors hover:text-primary">
                  {n.label}
                </Link>
              ) : (
                <a key={n.label} href={n.href} className="transition-colors hover:text-primary">
                  {n.label}
                </a>
              )
            )}
          </nav>

          <button
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden hover:bg-muted focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className={`fixed inset-0 z-50 flex flex-col bg-background/98 px-6 py-6 backdrop-blur-md transition-opacity duration-300 lg:hidden ${menuClosing ? "opacity-0" : "opacity-100"}`}>
          <div className="flex items-center justify-between border-b border-border pb-4">
            <img src="/logo 9.jpeg" alt="CPM Logo" className="h-9 w-auto object-contain mix-blend-multiply" />
            <button onClick={closeMenu} className="p-2 text-foreground"><X className="h-6 w-6" /></button>
          </div>
          <nav className="mt-6 flex flex-col gap-4 text-base font-medium">
            {navItems.map((n) => (
              <Link key={n.label} to={n.href} onClick={closeMenu} className="py-2 border-b border-border/40 text-foreground hover:text-primary">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          1. HERO BAND — Full Green Band & Stat Chips
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div ref={heroSection.ref} style={reveal(heroSection.inView)} className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 backdrop-blur-md shadow-sm">
              <Sparkles className="h-4 w-4 text-emerald-300 shrink-0" />
              <span>CHIP™ — FLAGSHIP SCIENTIFIC INNOVATION</span>
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight sm:text-6xl lg:text-[76px] font-normal">
              Climate Health<br className="hidden sm:block" /> Intelligence Platform
            </h1>

            <p className="mt-5 max-w-3xl text-lg sm:text-xl leading-relaxed text-primary-foreground/85">
              CPM International Research Institute's Flagship Scientific Innovation — An AI-Enabled Climate Health Digital Twin for Predictive Public Health Decision-Support.
            </p>

            {/* Stat chips */}
            <div className="mt-12 flex flex-wrap gap-6 sm:gap-10 border-t border-primary-foreground/20 pt-8">
              {[
                { n: "1", label: "Unified Platform" },
                { n: "1", label: "Harmonized DB" },
                { n: "1", label: "AI Engine" },
                { n: "1", label: "Digital Twin" },
                { n: "9", label: "Core Capabilities" },
              ].map(({ n, label }) => (
                <div key={label} className="border-l-2 border-emerald-400/50 pl-4 sm:pl-5">
                  <p className="font-serif text-3xl sm:text-4xl font-normal leading-none">{n}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-primary-foreground/75">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. FEATURED ARTICLE MEDIA BANNER (/chip.jpeg)
      ══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-border/60 bg-card py-10 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <figure className="group relative overflow-hidden rounded-2xl border border-border bg-slate-950 shadow-xl transition-all duration-300">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden flex items-center justify-center">
              <img
                src="/chip.jpeg"
                alt="Climate Health Intelligence Platform (CHIP™) — AI Digital Twin Ecosystem"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Expand Overlay Button */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-4 right-4 flex items-center gap-2 rounded-lg bg-black/70 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-black/90 shadow-md"
              >
                <Maximize2 className="h-4 w-4" /> View Full Image
              </button>

              {/* Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-5 sm:p-8 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1.5">
                  <Sparkles className="h-4 w-4" /> Featured Innovation Diagram
                </div>
                <figcaption className="text-sm sm:text-base font-medium text-white/95 leading-snug max-w-4xl">
                  The Climate Health Intelligence Platform (CHIP™) — An AI-enabled Climate Health Digital Twin integrating climate, environmental, epidemiological, laboratory, genomic, and geospatial intelligence into a single predictive ecosystem.
                </figcaption>
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. MAIN ARTICLE NARRATIVE (WHAT IS CHIP™ & DIGITAL TWIN)
      ══════════════════════════════════════════════════════════════ */}
      <article className="border-b border-border/60 py-16 sm:py-24">
        <div ref={introSection.ref} style={reveal(introSection.inView)} className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            
            {/* Main Article Body */}
            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-foreground/85 lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" /> Flagship Scientific Innovation
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-foreground tracking-tight">
                Transforming Conventional Surveillance into Predictive Intelligence
              </h2>

              <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:text-primary">
                The <strong>Climate Health Intelligence Platform (CHIP™)</strong> is the flagship scientific innovation of CPM International Research Institute for Climate Health. It represents an AI-enabled Climate Health Digital Twin that transforms conventional public health surveillance into an intelligent, predictive, and continuously learning decision-support ecosystem.
              </p>

              <p>
                Unlike traditional surveillance systems that often respond after disease transmission has begun, CHIP™ integrates diverse streams of climate, environmental, epidemiological, laboratory, genomic, and geospatial intelligence into a single interoperable platform capable of simulating, predicting, visualizing, and supporting timely public health action.
              </p>

              {/* Digital Twin Callout */}
              <div className="my-8 rounded-2xl border border-primary/20 bg-secondary/50 p-6 sm:p-8 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">The Climate Health Digital Twin</p>
                <blockquote className="font-serif text-xl sm:text-2xl leading-relaxed text-foreground italic">
                  "At the heart of CHIP™ is the concept of the Climate Health Digital Twin — a living digital representation of the climate environment–pathogen–host–health system. By continuously updating with historical and real-time observations, the Digital Twin enables advanced predictive analytics, scenario simulation, and evidence-informed decision-making for climate-sensitive infectious diseases."
                </blockquote>
              </div>

              <p>
                The framework is built on a unified architecture comprising <strong>one platform, one harmonized database, one AI engine, one Digital Twin, and one integrated decision dashboard</strong>. This architecture allows multidisciplinary expertise from climate science, microbiology, epidemiology, artificial intelligence, genomics, environmental science, clinical medicine, and public health to converge within a single operational system.
              </p>
            </div>

            {/* Framework Architecture Sidebar */}
            <aside className="rounded-2xl border border-border bg-card p-6 sm:p-8 lg:col-span-5 shadow-sm space-y-6">
              <div className="border-b border-border pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Unified Architecture</p>
                <h3 className="mt-2 font-serif text-2xl font-normal text-foreground">
                  One Operational Convergence Ecosystem
                </h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                CHIP™ bridges eight critical scientific disciplines into a single harmonized computational workflow:
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { name: "Climate Science", icon: Globe2 },
                  { name: "Microbiology", icon: Activity },
                  { name: "Epidemiology", icon: HeartPulse },
                  { name: "Artificial Intelligence", icon: Cpu },
                  { name: "Genomics", icon: Dna },
                  { name: "Environmental Science", icon: Leaf },
                  { name: "Clinical Medicine", icon: Monitor },
                  { name: "Public Health", icon: Target },
                ].map(({ name, icon: Icon }) => (
                  <div key={name} className="flex items-center gap-2.5 rounded-lg border border-border/80 bg-background p-3 shadow-xs">
                    <Icon className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-xs font-medium text-foreground">{name}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/15">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Operational Pillars</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    1 Platform · 1 Harmonized DB · 1 AI Engine · 1 Digital Twin · 1 Decision Dashboard
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* ══════════════════════════════════════════════════════════════
          4. CAPABILITIES — 3×3 Interactive Grid
      ══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-border/60 bg-secondary/30 py-16 sm:py-24">
        <div ref={capSection.ref} style={reveal(capSection.inView)} className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" /> Integrated Capabilities
            </div>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-normal leading-tight text-foreground tracking-tight">
              CHIP™ is Designed to Support
            </h2>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              Nine integrated capabilities that together form a comprehensive climate-health intelligence ecosystem.
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ label, icon: Icon, desc }, i) => (
              <div
                key={label}
                className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
                style={reveal(capSection.inView, 60 + i * 30)}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/5">
                  <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                </div>
                <p className="mt-4 font-mono text-xs font-semibold text-primary">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 font-serif text-lg font-normal leading-snug text-foreground">{label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. VISION & PREDICTIVE PREPAREDNESS
      ══════════════════════════════════════════════════════════════ */}
      <article className="border-b border-border/60 py-16 sm:py-24">
        <div ref={visionSection.ref} style={reveal(visionSection.inView)} className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-foreground/85 lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" /> Strategic Impact & Preparedness
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-foreground tracking-tight">
                A Scalable Scientific Framework for Africa and the World
              </h2>

              <p>
                Beyond being a digital platform, CHIP™ represents a scientific framework for advancing predictive preparedness. It enables governments, hospitals, research institutions, and international partners to move from fragmented surveillance toward integrated intelligence that strengthens prevention, preparedness, response, and resilience.
              </p>

              <p>
                CPM International Research Institute envisions CHIP™ as a scalable framework that can support national surveillance systems, regional collaboration across Africa, and global partnerships in climate-health innovation.
              </p>

              <p>
                As the Institute’s flagship innovation, CHIP™ embodies CPM’s commitment to integrating science, digital technology, and multidisciplinary collaboration to build resilient health systems capable of anticipating rather than merely reacting to climate-sensitive public health threats.
              </p>
            </div>

            {/* Visual Highlight Card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-secondary/50 p-8 shadow-lg">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md mb-6">
                  <BrainCircuit className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-2xl font-normal text-foreground">
                  Anticipating Public Health Threats Before Transmission Begins
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  CHIP™ replaces reactive epidemic response with continuous AI digital twin simulation — converting weather parameters, satellite indices, and genomic reads into actionable risk scores.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Integrate", "Predict", "Protect", "Prepare"].map((w) => (
                    <span key={w} className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </article>

      {/* ══════════════════════════════════════════════════════════════
          6. SIGNATURE GRAND CLOSING BAND — Wordmark & Motto
      ══════════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-primary text-primary-foreground">
        <div
          ref={closingSection.ref}
          className="mx-auto max-w-[1400px] px-4 py-20 text-center sm:px-6 lg:px-10 lg:py-32"
          style={reveal(closingSection.inView)}
        >
          <p
            className="font-serif tracking-tight font-normal"
            style={{
              fontSize: "clamp(3.5rem, 13vw, 9.5rem)",
              lineHeight: 1,
              opacity: closingSection.inView ? 1 : 0,
              transform: closingSection.inView ? "none" : "translateY(30px)",
              transition: "opacity 900ms ease-out 100ms, transform 900ms ease-out 100ms",
            }}
          >
            CHIP™
          </p>

          {/* Animated word reveal */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-8">
            {["Integrate", "Predict", "Protect", "Prepare"].map((word, i) => (
              <span
                key={word}
                className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300"
                style={{
                  opacity: closingSection.inView ? 1 : 0,
                  transition: `opacity 600ms ease-out ${300 + i * 120}ms`,
                }}
              >
                {word}
              </span>
            ))}
          </div>

          <p
            className="mx-auto mt-10 max-w-2xl text-base sm:text-lg leading-relaxed text-primary-foreground/85"
            style={{
              opacity: closingSection.inView ? 1 : 0,
              transform: closingSection.inView ? "none" : "translateY(10px)",
              transition: "opacity 700ms ease-out 700ms, transform 700ms ease-out 700ms",
            }}
          >
            The Signature Scientific Innovation of CPM International Research Institute for Climate Health.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          7. ACKNOWLEDGEMENTS & INSTITUTIONAL PARTNERS
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-background py-16 sm:py-20">
        <div ref={ackSection.ref} style={reveal(ackSection.inView)} className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-4">
              <Shield className="h-4 w-4" /> Institutional Acknowledgements
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground border-t border-border pt-4">
              <p>
                CPM Int'l Research Institute for Climate Health expresses its profound appreciation to the Director-General of the Nigeria Centre for Disease Control and Prevention (NCDC) for his visionary leadership, institutional support, and commitment to strengthening climate-sensitive disease surveillance and public health innovation in Nigeria.
              </p>
              <p>
                We are equally grateful to the Chief Medical Director and the management of the Obafemi Awolowo University Teaching Hospitals Complex (OAUTHC) for their invaluable collaboration, ethical oversight, and unwavering support in advancing this pioneering initiative. Their partnership has been instrumental in laying the foundation for a nationally relevant and internationally connected climate-health research and innovation ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for /chip.jpeg */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 sm:p-8 backdrop-blur-xl select-none">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            aria-label="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="max-h-[85vh] max-w-[92vw] flex flex-col items-center">
            <img
              src="/chip.jpeg"
              alt="Climate Health Intelligence Platform (CHIP™)"
              className="max-h-[78vh] w-auto object-contain rounded-xl shadow-2xl"
            />
            <p className="mt-4 text-center text-sm font-medium text-white/90 max-w-3xl">
              Climate Health Intelligence Platform (CHIP™) — AI-Enabled Climate Health Digital Twin
            </p>
          </div>
        </div>
      )}

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <img src="/logo_1-removebg-preview.png" alt="CPM Int'l Logo" className="h-7 sm:h-9 w-auto object-contain" />
            <p>© {new Date().getFullYear()} CPM Int'l Research Institute for Climate Health.</p>
          </div>
          <p className="text-xs uppercase tracking-[0.2em]">Research · Innovation · Education · Policy · Impact</p>
        </div>
      </footer>
    </div>
  );
}
