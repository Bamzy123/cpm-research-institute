import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Network, Layers, Globe2, Building2, BookOpen,
  GraduationCap, Scale, Cpu, Dna, Leaf, FlaskConical,
  HeartPulse, Compass, ArrowRight, Menu, X, MapPin, Mail, Phone,
  ChevronDown, CheckCircle2, Download, ExternalLink, Users,
  Microscope, BarChart3, Thermometer, Shield, Zap,
  Satellite, Cloud, Hospital, TestTube2, TrendingUp, LayoutDashboard,
  BrainCircuit, Activity, Handshake,
} from "lucide-react";
import officeHeader from "../assets/header.jpeg?url";
import directorPhoto from "../assets/director.jpeg?url";
import teamPhoto from "../assets/team.jpeg?url";

export const Route = createFileRoute("/")({
  component: Index,
});

// ── Data ─────────────────────────────────────────────────────────────

const navItems = [
  { href: "#top", label: "Home" },
  { href: "/about", label: "About CPM Int'l" },
  { href: "#research", label: "Research" },
  { href: "/chip", label: "CHIP™" },
  { href: "/events", label: "Events" },
  { href: "#digital-twin", label: "Digital Twin" },
  { href: "#partnerships", label: "Partnerships" },
  { href: "/news", label: "News" },
  { href: "#innovation", label: "Innovation" },
  { href: "#contact", label: "Contact" },
];

const chipFlow = [
  "Climate Observations",
  "Environmental Intelligence",
  "Disease Surveillance",
  "Laboratory Diagnostics",
  "Pathogen Genomics",
  "Satellite Information",
  "AI Engine",
  "Predictive Analytics",
  "Decision Support",
  "Health System Resilience",
];

const digitalTwinFlow = [
  { icon: Satellite, label: "Satellite" },
  { icon: Cloud, label: "Weather" },
  { icon: Hospital, label: "Hospital" },
  { icon: TestTube2, label: "Laboratory" },
  { icon: Dna, label: "Genomics" },
  { icon: BrainCircuit, label: "AI" },
  { icon: TrendingUp, label: "Prediction" },
  { icon: LayoutDashboard, label: "Dashboard" },
];

const researchAreas = [
  { icon: Thermometer, label: "Climate Change & Health" },
  { icon: FlaskConical, label: "Clinical Microbiology" },
  { icon: HeartPulse, label: "One Health" },
  { icon: Shield, label: "Antimicrobial Resistance" },
  { icon: Cpu, label: "Artificial Intelligence" },
  { icon: Dna, label: "Pathogen Genomics" },
  { icon: BarChart3, label: "Public Health Surveillance" },
  { icon: Network, label: "Climate–Pathogen Nexus" },
  { icon: Zap, label: "Digital Health" },
  { icon: Leaf, label: "Environmental Health" },
  { icon: Microscope, label: "Data Science" },
  { icon: Building2, label: "Health Systems" },
];

const whyCPM = [
  "AI-enabled Climate Health Digital Twin (CHIP™)",
  "Flagship Climate–Pathogen Nexus Framework",
  "Integrated Climate Intelligence Platform",
  "One Health Multidisciplinary Research",
  "Global Strategic Partnerships",
  "Scientific Excellence & Peer-Reviewed Research",
  "Predictive Analytics & Decision Support",
  "Capacity Building & Fellowship Programmes",
];

const partnerships = [
  { country: "Nigeria", region: "Africa", x: "76%", y: "54%", detail: "Host country: Obafemi Awolowo University, Ile-Ife" },
  { country: "Uganda", region: "Africa", x: "79%", y: "58%", detail: "East Africa research collaboration" },
  { country: "Tanzania", region: "Africa", x: "80%", y: "63%", detail: "One Health field research programme" },
  { country: "United Kingdom", region: "Europe", x: "49%", y: "22%", detail: "Academic and research institute partnerships" },
  { country: "Germany", region: "Europe", x: "52%", y: "22%", detail: "Volkswagen Foundation collaboration" },
  { country: "Canada", region: "Americas", x: "23%", y: "24%", detail: "International scientific advisory network" },
  { country: "Colombia", region: "Americas", x: "26%", y: "54%", detail: "Tropical disease research partnership" },
  { country: "Japan", region: "Asia-Pacific", x: "88%", y: "30%", detail: "AI and digital health innovation exchange" },
];


const impactMetrics = [
  { value: 14, suffix: "+", label: "Research Programmes", numeric: true },
  { value: 8, suffix: "+", label: "Partner Institutions", numeric: true },
  { value: 5, suffix: "+", label: "Innovation Platforms", numeric: true },
  { value: 3, suffix: "+", label: "Countries Reached", numeric: true },
  { value: 1, suffix: "", label: "AI Digital Twin (CHIP™)", numeric: true },
  { value: 1, suffix: "", label: "Centre of Excellence Proposed", numeric: true },
  { value: 12, suffix: "+", label: "Research Publications", numeric: true },
  { value: 1, suffix: "", label: "Flagship Scientific Framework", numeric: true },
];

// ── Utilities ───────────────────────────────────────────────────────

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

function useCountUp(target: number, runKey: number, duration = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (runKey === 0) { setN(0); return; }
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target); return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, runKey, duration]);
  return n;
}

function ImpactCounter({ item, runKey }: { item: typeof impactMetrics[number]; runKey: number }) {
  const n = useCountUp(item.value, runKey);
  return (
    <div className="text-center">
      <p className="font-serif text-5xl font-medium text-white lg:text-6xl">
        {item.numeric ? n : item.value}{item.suffix}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.16em]" style={{ color: "oklch(0.72 0.14 75)" }}>{item.label}</p>
    </div>
  );
}

type FormStatus = "idle" | "loading" | "success" | "error";

// ── Component ────────────────────────────────────────────────────────
function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [impactRunKey, setImpactRunKey] = useState(0);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState("");
  const [activePartner, setActivePartner] = useState<string | null>(null);
  const [chipStep, setChipStep] = useState(0);
  const [dtStep, setDtStep] = useState(0);
  const impactRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  // Impact counter observer
  useEffect(() => {
    if (!impactRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setImpactRunKey((k) => k + 1);
        else setImpactRunKey(0);
      },
      { threshold: 0.3 },
    );
    io.observe(impactRef.current);
    return () => io.disconnect();
  }, []);

  // CHIP™ flow animation
  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => {
      setChipStep((s) => (s + 1) % chipFlow.length);
    }, 700);
    return () => clearInterval(interval);
  }, [prefersReduced]);

  // Digital twin flow animation
  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => {
      setDtStep((s) => (s + 1) % digitalTwinFlow.length);
    }, 900);
    return () => clearInterval(interval);
  }, [prefersReduced]);

  const closeMenu = () => {
    if (prefersReduced) { setMenuOpen(false); return; }
    setMenuClosing(true);
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 290);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    setFormError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { success?: boolean; message?: string };
      if (res.ok && json.success) {
        setFormStatus("success");
      } else {
        throw new Error(json.message ?? "Submission failed. Please try again.");
      }
    } catch (err) {
      setFormStatus("error");
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Sticky Header ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4 lg:px-10">
          <a href="#top" className="flex min-w-0 items-center">
            <img src="/logo_8-removebg-preview.png" alt="CPM Int'l Research Institute for Climate Health" className="h-10 md:h-12 w-auto object-contain" />
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-6 text-xs font-medium text-foreground/80 lg:flex">
            {navItems.map((n) =>
              n.href.startsWith("/") ? (
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
            className="relative inline-flex h-10 w-10 items-center justify-center border border-border transition-colors hover:border-primary/60 lg:hidden"
          >
            <span className="absolute" style={{ opacity: menuOpen ? 0 : 1, transition: prefersReduced ? "none" : "opacity 200ms, transform 200ms", transform: menuOpen ? "rotate(45deg) scale(0.6)" : "none" }}>
              <Menu className="h-5 w-5" aria-hidden />
            </span>
            <span className="absolute" style={{ opacity: menuOpen ? 1 : 0, transition: prefersReduced ? "none" : "opacity 200ms, transform 200ms", transform: menuOpen ? "none" : "rotate(-45deg) scale(0.6)" }}>
              <X className="h-5 w-5" aria-hidden />
            </span>
          </button>
        </div>
      </header>

      {/* ── Mobile Nav ─────────────────────────────────────────────────── */}
      {menuOpen && (
        <>
          <div className={`fixed inset-0 z-40 bg-foreground/40 lg:hidden ${menuClosing ? "nav-backdrop-out" : "nav-backdrop-in"}`} onClick={closeMenu} aria-hidden />
          <nav aria-label="Mobile" className={`fixed top-0 right-0 z-50 flex h-full w-72 max-w-[85vw] flex-col border-l border-border bg-background shadow-2xl lg:hidden ${menuClosing ? "nav-slide-out" : "nav-slide-in"}`}>
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <span className="font-serif text-xl font-medium tracking-tight text-primary">CPM Int'l</span>
              <button type="button" onClick={closeMenu} aria-label="Close menu" className="inline-flex h-9 w-9 items-center justify-center border border-border transition-colors hover:border-primary/60">
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <ul className="flex flex-col py-2">
              {navItems.map((n) => (
                <li key={n.href}>
                  {n.href.startsWith("/") ? (
                    <Link to={n.href} onClick={closeMenu} className="block px-6 py-4 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary">{n.label}</Link>
                  ) : (
                    <a href={n.href} onClick={closeMenu} className="block px-6 py-4 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary">{n.label}</a>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-auto border-t border-border px-6 py-6">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Science · Innovation · Intelligence · Impact</p>
            </div>
          </nav>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section id="top" className="relative overflow-hidden" style={{ minHeight: "90vh" }}>
        {/* Background image */}
        <div className="absolute inset-0" aria-hidden>
          <img src={officeHeader} alt="" className="h-full w-full object-cover" />
          {/* Blue overlay */}
          <div className="absolute inset-0" style={{ background: "oklch(0.20 0.06 230 / 0.72)" }} />
          {/* Bottom gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>
        {/* Gold top accent */}
        <div className="absolute left-0 top-0 h-1 w-full z-10" style={{ background: "linear-gradient(90deg, transparent, oklch(0.72 0.14 75), transparent)" }} aria-hidden />

        <div className="relative mx-auto flex min-h-[90vh] max-w-[1400px] flex-col items-center justify-center px-6 py-24 text-center lg:px-10">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em]" style={{ color: "oklch(0.72 0.14 75)" }}>
            Science • Innovation • Intelligence • Impact
          </p>
          <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[72px] max-w-5xl">
            Transforming Climate Intelligence into Health Security
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: "oklch(0.87 0.04 220)" }}>
            CPM Int'l Research Institute for Climate Health advances scientific discovery, innovation, and evidence-based solutions at the intersection of climate change, infectious diseases, artificial intelligence, and One Health.
          </p>
          <p className="mt-2 text-sm" style={{ color: "oklch(0.72 0.14 75)" }}>
            Advancing Climate Health Intelligence for a Resilient World
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#research"
              id="cta-explore-research"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium transition-all hover:scale-105"
              style={{ background: "oklch(0.72 0.14 75)", color: "oklch(0.15 0.04 230)" }}
            >
              Explore Our Research <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <Link
              to="/chip"
              id="cta-discover-chip"
              className="inline-flex items-center gap-2 border-2 px-8 py-4 text-sm font-medium text-white transition-all hover:bg-white/10"
              style={{ borderColor: "oklch(1 0 0 / 0.35)" }}
            >
              Discover CHIP™
            </Link>
          </div>
        </div>
        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden>
          <ChevronDown className="h-6 w-6 animate-bounce text-white/50" />
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — CHIP™ SIGNATURE INNOVATION
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="chip-section"
        style={{ background: "linear-gradient(135deg, oklch(0.20 0.06 230) 0%, oklch(0.26 0.08 220) 50%, oklch(0.18 0.05 230) 100%)" }}
      >
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-12 items-center">
            {/* Left: text */}
            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em]" style={{ color: "oklch(0.72 0.14 75)" }}>
                Our Signature Innovation
              </p>
              <h2 className="mt-4 font-serif text-5xl font-medium leading-tight tracking-tight text-white lg:text-6xl">
                CHIP™
              </h2>
              <p className="mt-2 text-lg font-light" style={{ color: "oklch(0.80 0.04 220)" }}>
                Climate Health Intelligence Platform
              </p>
              <div className="mt-6 h-0.5 w-16" style={{ background: "oklch(0.72 0.14 75)" }} aria-hidden />
              <div className="mt-8 space-y-4 text-sm leading-relaxed" style={{ color: "oklch(0.80 0.03 220)" }}>
                <p>
                  CHIP™ is CPM Int'l's flagship scientific framework and technological innovation: an AI-enabled Climate Health Digital Twin that continuously integrates climate observations, environmental intelligence, disease surveillance, laboratory diagnostics, pathogen genomics, satellite information, and predictive analytics into a unified decision-support ecosystem.
                </p>
                <p>
                  Rather than reacting after disease transmission has begun, CHIP™ enables governments, hospitals, researchers, and public health agencies to anticipate emerging risks, simulate future scenarios, and support timely evidence-based interventions.
                </p>
                <p className="font-medium" style={{ color: "oklch(0.87 0.04 220)" }}>
                  Our vision: transform public health from reactive surveillance to predictive preparedness.
                </p>
              </div>
              <Link
                to="/chip"
                id="btn-explore-chip"
                className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium transition-all hover:scale-105"
                style={{ background: "oklch(0.72 0.14 75)", color: "oklch(0.15 0.04 230)" }}
              >
                Explore CHIP™ <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            {/* Right: animated flow */}
            <div className="lg:col-span-7">
              <div className="border p-8 lg:p-10" style={{ borderColor: "oklch(1 0 0 / 0.12)", background: "oklch(1 0 0 / 0.04)" }}>
                <p className="mb-8 text-center text-xs uppercase tracking-[0.22em]" style={{ color: "oklch(0.72 0.14 75)" }}>
                  CHIP™ Intelligence Flow
                </p>
                <div className="flex flex-col items-center gap-0">
                  {chipFlow.map((step, i) => (
                    <div key={step} className="flex flex-col items-center w-full">
                      <div
                        className="w-full max-w-xs px-5 py-3 text-center text-sm font-medium transition-all duration-500"
                        style={{
                          background: chipStep >= i ? "oklch(0.72 0.14 75 / 0.18)" : "oklch(1 0 0 / 0.04)",
                          borderLeft: `3px solid ${chipStep >= i ? "oklch(0.72 0.14 75)" : "oklch(1 0 0 / 0.15)"}`,
                          color: chipStep >= i ? "oklch(0.95 0.01 220)" : "oklch(0.60 0.03 220)",
                          transform: chipStep === i ? "scale(1.04)" : "scale(1)",
                        }}
                      >
                        {step}
                      </div>
                      {i < chipFlow.length - 1 && (
                        <div className="h-4 w-px transition-colors duration-500" style={{ background: chipStep > i ? "oklch(0.72 0.14 75)" : "oklch(1 0 0 / 0.15)" }} aria-hidden />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 — CLIMATE HEALTH DIGITAL TWIN
      ══════════════════════════════════════════════════════════════════ */}
      <section id="digital-twin" className="bg-background hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Next Generation Intelligence</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-foreground lg:text-5xl">
              Climate Health Digital Twin
            </h2>
            <p className="mt-5 text-lg font-light text-muted-foreground">
              "The next generation of climate-health intelligence."
            </p>
          </div>

          {/* Animated data flow dashboard */}
          <div className="mt-14 border border-border bg-card overflow-hidden shadow-xl">
            {/* Mock dashboard header */}
            <div className="border-b border-border px-6 py-3 flex items-center gap-3" style={{ background: "oklch(0.20 0.06 230)" }}>
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <div className="h-3 w-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-white/70 font-medium uppercase tracking-widest">CHIP™ Digital Twin — Live Intelligence Dashboard</span>
            </div>
            <div className="p-8 lg:p-12">
              {/* Flow nodes */}
              <div className="flex flex-wrap justify-center gap-4">
                {digitalTwinFlow.map(({ icon: DtIcon, label }, i) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div
                      className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-500"
                      style={{
                        borderColor: dtStep >= i ? "oklch(0.72 0.14 75)" : "oklch(0.84 0.008 140)",
                        background: dtStep >= i ? "oklch(0.72 0.14 75 / 0.12)" : "transparent",
                        transform: dtStep === i ? "scale(1.15)" : "scale(1)",
                      }}
                    >
                      <DtIcon
                        className="h-6 w-6 transition-colors duration-500"
                        style={{ color: dtStep >= i ? "oklch(0.72 0.14 75)" : "oklch(0.55 0.02 220)" }}
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      {dtStep === i && (
                        <div
                          className="absolute inset-0 rounded-full map-ping"
                          style={{ background: "oklch(0.72 0.14 75 / 0.3)" }}
                          aria-hidden
                        />
                      )}
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">{label}</p>
                    {i < digitalTwinFlow.length - 1 && (
                      <ArrowRight
                        className="h-4 w-4 mt-1 hidden sm:block"
                        style={{ color: dtStep > i ? "oklch(0.72 0.14 75)" : "oklch(0.84 0.008 140)" }}
                        aria-hidden
                      />
                    )}
                  </div>
                ))}
              </div>
              {/* Mock metrics row */}
              <div className="mt-10 grid grid-cols-4 gap-4 border-t border-border pt-8">
                {[
                  { label: "Climate Risk Index", value: "7.4 / 10", trend: "↑" },
                  { label: "Disease Alert Level", value: "Moderate", trend: "→" },
                  { label: "Genomic Sequences", value: "2,847", trend: "↑" },
                  { label: "Prediction Confidence", value: "91.3%", trend: "↑" },
                ].map(({ label, value, trend }) => (
                  <div key={label} className="text-center">
                    <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
                    <p className="mt-2 font-serif text-xl font-medium text-foreground">{value}</p>
                    <p className="text-xs text-primary">{trend}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link to="/chip" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              Learn more about the Digital Twin <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6 — RESEARCH AREAS (12 cards)
      ══════════════════════════════════════════════════════════════════ */}
      <section id="research" className="bg-sky hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">What We Do</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-foreground lg:text-5xl">
              Research Areas
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              CPM Int'l works across the complete climate-health continuum, integrating 12 multidisciplinary research programmes to address the defining health challenges of a changing climate.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {researchAreas.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="group border border-border bg-background p-6 text-center card-lift cursor-default"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/8 transition-all duration-300 group-hover:bg-primary/15">
                  <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-sm font-medium text-foreground">{label}</h3>
                <div className="mt-2 mx-auto h-0.5 w-0 transition-all duration-300 group-hover:w-8" style={{ background: "oklch(0.72 0.14 75)" }} aria-hidden />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 7 — WHY CPM Int'l?
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="why-cpm Int'l"
        style={{ background: "linear-gradient(135deg, oklch(0.18 0.05 230) 0%, oklch(0.22 0.07 225) 50%, oklch(0.20 0.06 230) 100%)" }}
      >
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em]" style={{ color: "oklch(0.72 0.14 75)" }}>Why CPM Int'l?</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-white lg:text-5xl">
                Defining What Makes CPM Int'l Different
              </h2>
              <p className="mt-6 text-sm leading-relaxed" style={{ color: "oklch(0.75 0.03 220)" }}>
                CPM Int'l represents a new model for climate health research, integrating science, technology, policy, and global partnerships to address the most pressing health challenges of our era.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {whyCPM.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 border p-5 transition-all duration-200 hover:scale-[1.02]"
                  style={{ borderColor: "oklch(1 0 0 / 0.1)", background: "oklch(1 0 0 / 0.04)" }}
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "oklch(0.72 0.14 75)" }} strokeWidth={2} />
                  <span className="text-sm font-medium text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 8 — GLOBAL PARTNERSHIPS (world map)
      ══════════════════════════════════════════════════════════════════ */}
      <section id="partnerships" className="bg-background hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <header className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Global Reach</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-foreground lg:text-5xl">
                Collaboration Without Borders
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                CPM Int'l actively fosters partnerships among universities, teaching hospitals, national public health agencies, research institutes, governments, international organizations, and development partners to accelerate innovation and strengthen scientific capacity.
              </p>
              {/* Active partner detail */}
              {activePartner && (
                <div className="mt-6 border border-primary/30 bg-primary/5 p-5">
                  {(() => {
                    const p = partnerships.find((x) => x.country === activePartner);
                    return p ? (
                      <>
                        <p className="font-serif text-lg font-medium text-foreground">{p.country}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">{p.region}</p>
                        <p className="mt-3 text-sm text-muted-foreground">{p.detail}</p>
                      </>
                    ) : null;
                  })()}
                </div>
              )}
              {!activePartner && (
                <p className="mt-6 text-xs text-muted-foreground italic">Click a country on the map to learn more.</p>
              )}
            </header>

            {/* World map SVG */}
            <div className="lg:col-span-8">
              <div
                className="relative w-full overflow-hidden border border-border bg-card"
                style={{ paddingBottom: "56.25%" }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  {/* Simplified world map placeholder with SVG dots */}
                  <svg
                    viewBox="0 0 400 225"
                    className="w-full h-full"
                    style={{ background: "oklch(0.97 0.006 95)" }}
                    aria-label="World map showing CPM Int'l partner countries"
                  >
                    {/* Continent outlines (simplified) */}
                    <g fill="oklch(0.88 0.008 130)" stroke="oklch(0.84 0.008 140)" strokeWidth="0.5">
                      {/* North America */}
                      <rect x="15" y="25" width="85" height="80" rx="4" opacity="0.7" />
                      {/* South America */}
                      <rect x="30" y="110" width="60" height="85" rx="4" opacity="0.7" />
                      {/* Europe */}
                      <rect x="170" y="18" width="50" height="50" rx="3" opacity="0.7" />
                      {/* Africa */}
                      <rect x="175" y="72" width="60" height="95" rx="4" opacity="0.7" />
                      {/* Asia */}
                      <rect x="225" y="18" width="110" height="80" rx="4" opacity="0.7" />
                      {/* Australia */}
                      <rect x="310" y="125" width="65" height="50" rx="4" opacity="0.7" />
                    </g>

                    {/* Ocean labels */}
                    <text x="110" y="100" textAnchor="middle" fontSize="5" fill="oklch(0.70 0.015 220)" opacity="0.7">ATLANTIC</text>
                    <text x="270" y="145" textAnchor="middle" fontSize="5" fill="oklch(0.70 0.015 220)" opacity="0.7">INDIAN</text>

                    {/* Partner dots */}
                    {partnerships.map(({ country, x, y }) => {
                      const cx = (parseFloat(x) / 100) * 400;
                      const cy = (parseFloat(y) / 100) * 225;
                      const isActive = activePartner === country;
                      return (
                        <g key={country}>
                          {isActive && (
                            <circle
                              cx={cx} cy={cy} r="10"
                              fill="oklch(0.72 0.14 75 / 0.25)"
                              className="map-ping"
                            />
                          )}
                          <circle
                            cx={cx} cy={cy} r={isActive ? 6 : 5}
                            fill={isActive ? "oklch(0.72 0.14 75)" : "oklch(0.34 0.06 160)"}
                            stroke="white" strokeWidth="1.5"
                            className="cursor-pointer transition-all duration-200"
                            onClick={() => setActivePartner(isActive ? null : country)}
                            role="button"
                            aria-label={`Partner country: ${country}`}
                          />
                          <text
                            x={cx + 7} y={cy + 4}
                            fontSize="6" fill="oklch(0.25 0.012 160)"
                            fontWeight="500"
                            className="pointer-events-none select-none"
                          >
                            {country}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
              {/* Country buttons */}
              <div className="mt-4 flex flex-wrap gap-2">
                {partnerships.map(({ country }) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => setActivePartner(activePartner === country ? null : country)}
                    className="border px-3 py-1.5 text-xs font-medium transition-all"
                    style={{
                      borderColor: activePartner === country ? "oklch(0.72 0.14 75)" : "oklch(0.84 0.008 140)",
                      background: activePartner === country ? "oklch(0.72 0.14 75 / 0.1)" : "transparent",
                      color: activePartner === country ? "oklch(0.34 0.06 160)" : "oklch(0.42 0.015 155)",
                    }}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          SECTION 11 — IMPACT DASHBOARD (animated counters)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="innovation"
        style={{ background: "linear-gradient(135deg, oklch(0.20 0.06 230) 0%, oklch(0.25 0.08 225) 50%, oklch(0.22 0.06 230) 100%)" }}
      >
        <div ref={impactRef} className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.22em]" style={{ color: "oklch(0.72 0.14 75)" }}>
              Impact Dashboard
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-white lg:text-5xl">
              CPM Int'l by the Numbers
            </h2>
            <p className="mt-5 text-sm leading-relaxed max-w-xl mx-auto" style={{ color: "oklch(0.75 0.03 220)" }}>
              Building the scientific ecosystem — from research programmes and innovation platforms to global partnerships and policy impact.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-4">
            {impactMetrics.map((item) => (
              <div key={item.label} className="text-center border py-8 px-4" style={{ borderColor: "oklch(1 0 0 / 0.1)", background: "oklch(1 0 0 / 0.04)" }}>
                <ImpactCounter item={item} runKey={impactRunKey} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 12 — JOIN THE CPM Int'l NETWORK
      ══════════════════════════════════════════════════════════════════ */}
      <section id="join" className="bg-sky hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Get Involved</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-foreground lg:text-5xl">
              Join the CPM Int'l Network
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Whether you are a researcher, institution, government agency, or development partner, there are multiple ways to engage with CPM Int'l International Research Institute and contribute to our mission.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#contact" id="btn-partner" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium transition-all hover:scale-105" style={{ background: "oklch(0.72 0.14 75)", color: "oklch(0.15 0.04 230)" }}>
                Partner With Us <Handshake className="h-4 w-4" aria-hidden />
              </a>
              <a href="#contact" id="btn-support" className="inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                Support Research <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <Link to="/resources" id="btn-fellowship" className="inline-flex items-center gap-2 border border-border px-7 py-3.5 text-sm font-medium transition hover:border-primary/60 hover:text-primary">
                <GraduationCap className="h-4 w-4" aria-hidden /> Apply for Fellowship
              </Link>
              <a href="#contact" id="btn-contact" className="inline-flex items-center gap-2 border border-border px-7 py-3.5 text-sm font-medium transition hover:border-primary/60 hover:text-primary">
                <Mail className="h-4 w-4" aria-hidden /> Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          ABOUT + CONTACT
      ══════════════════════════════════════════════════════════════════ */}
      <section id="contact-section" className="hairline-b bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">About the Institute</p>

              <dl className="mt-10 space-y-5 text-sm">
                <div className="flex gap-4">
                  <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="font-medium text-foreground">Address</dt>
                    <dd className="mt-1 text-muted-foreground">7, Grand-mart  Hub,  Opposite Omololu Hospital, Akobo Ojuirin, Ibadan Oyo State,Nigeria</dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="font-medium text-foreground">Email</dt>
                    <dd className="mt-1 text-muted-foreground">info@cpm-institute.org</dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="font-medium text-foreground">Phone</dt>
                    <dd className="mt-1 text-muted-foreground">+234 803 377 0933</dd>
                  </div>
                </div>
              </dl>
            </div>

            {/* ── Contact form ── */}
            <div id="contact" className="lg:col-span-7 lg:border-l lg:border-border lg:pl-16">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Contact</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground lg:text-4xl">Get in touch</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                For research collaborations, funding enquiries, media requests and academic partnerships.
              </p>

              {formStatus === "success" ? (
                <div className="mt-10 border border-primary/30 bg-primary/5 p-6 text-sm text-foreground" role="status">
                  <p className="font-medium text-primary">Message received</p>
                  <p className="mt-1 text-muted-foreground">Thank you — your message has been received. We'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2" noValidate>
                  <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
                  <input type="hidden" name="subject" value="CPM Int'l Institute — Website Enquiry" />
                  <input type="hidden" name="from_name" value="CPM Int'l Research Institute Website" />
                  <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden />

                  <label className="flex flex-col gap-2 text-sm">
                    <span className="font-medium text-foreground">Name <span className="text-destructive" aria-hidden>*</span></span>
                    <input required name="name" type="text" autoComplete="name" disabled={formStatus === "loading"} className="border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none disabled:opacity-50" />
                  </label>
                  <label className="flex flex-col gap-2 text-sm">
                    <span className="font-medium text-foreground">Email <span className="text-destructive" aria-hidden>*</span></span>
                    <input required name="email" type="email" autoComplete="email" disabled={formStatus === "loading"} className="border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none disabled:opacity-50" />
                  </label>
                  <label className="flex flex-col gap-2 text-sm sm:col-span-2">
                    <span className="font-medium text-foreground">Institution</span>
                    <input name="institution" type="text" disabled={formStatus === "loading"} className="border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none disabled:opacity-50" />
                  </label>
                  <label className="flex flex-col gap-2 text-sm sm:col-span-2">
                    <span className="font-medium text-foreground">Message <span className="text-destructive" aria-hidden>*</span></span>
                    <textarea required name="message" rows={5} disabled={formStatus === "loading"} className="resize-y border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none disabled:opacity-50" />
                  </label>

                  {formStatus === "error" && formError && (
                    <div className="sm:col-span-2 border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive" role="alert">{formError}</div>
                  )}

                  <div className="sm:col-span-2">
                    <button type="submit" disabled={formStatus === "loading"} className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50">
                      {formStatus === "loading" ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" aria-hidden />
                          Sending…
                        </>
                      ) : (
                        <>Send message <ArrowRight className="h-4 w-4" aria-hidden /></>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER (dark)
      ══════════════════════════════════════════════════════════════════ */}
      <footer style={{ background: "oklch(0.14 0.04 230)" }}>
        {/* Gold top accent */}
        <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, oklch(0.72 0.14 75), transparent)" }} aria-hidden />
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
          <div className="grid gap-10 md:grid-cols-5 lg:gap-16">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="inline-block mb-2">
                <img src="/logo 3.jpeg" alt="CPM Int'l International Research Institute for Climate Health" className="h-10 md:h-12 w-auto object-contain mix-blend-screen" />
              </div>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "oklch(0.65 0.03 220)" }}>
                An independent multidisciplinary research institute dedicated to advancing scientific discovery, innovation, and evidence-based solutions at the intersection of climate change, infectious diseases, AI, and One Health.
              </p>
              <p className="mt-5 text-xs uppercase tracking-[0.2em]" style={{ color: "oklch(0.72 0.14 75)" }}>
                Science · Innovation · Intelligence · Impact
              </p>
              {/* Newsletter */}
              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-white mb-2">Newsletter</p>
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Enter your email" className="h-9 min-w-0 flex-1 border border-border bg-black/30 px-3 text-xs text-white outline-none focus:border-primary/80" />
                  <button type="submit" className="h-9 border border-primary/50 bg-primary/20 px-3 text-xs font-medium text-white transition hover:bg-primary/40">Join</button>
                </form>
              </div>
            </div>

            {/* Scientific Pillars */}
            <div>
              <p className="text-sm font-medium text-white">Research Focus</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {researchAreas.slice(0, 6).map((area) => (
                  <li key={area.label}>
                    <a href="#research" className="transition hover:text-white" style={{ color: "oklch(0.65 0.03 220)" }}>{area.label}</a>
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
                    {n.href.startsWith("/") ? (
                      <Link to={n.href} className="transition hover:text-white" style={{ color: "oklch(0.65 0.03 220)" }}>{n.label}</Link>
                    ) : (
                      <a href={n.href} className="transition hover:text-white" style={{ color: "oklch(0.65 0.03 220)" }}>{n.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-sm font-medium text-white">Contact</p>
              <ul className="mt-4 space-y-3 text-sm" style={{ color: "oklch(0.65 0.03 220)" }}>
                <li className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: "oklch(0.72 0.14 75)" }} />
                  <span className="text-xs">7, Grand-mart  Hub,  Opposite Omololu Hospital, Akobo Ojuirin, Ibadan Oyo State,Nigeria</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 shrink-0" style={{ color: "oklch(0.72 0.14 75)" }} />
                  <span className="text-xs">info@cpm-institute.org</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0" style={{ color: "oklch(0.72 0.14 75)" }} />
                  <span className="text-xs">+234 803 377 0933</span>
                </li>
              </ul>
            </div>

            {/* Legal / Social */}
            <div>
              <p className="text-sm font-medium text-white">Information</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {["Privacy Policy", "Terms of Use", "Accessibility", "Sitemap"].map((item) => (
                  <li key={item}>
                    <a href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="transition hover:text-white" style={{ color: "oklch(0.65 0.03 220)" }}>{item}</a>
                  </li>
                ))}
              </ul>
              {/* Institutional statement */}
              <div className="mt-8 border-t pt-5" style={{ borderColor: "oklch(1 0 0 / 0.1)" }}>
                <p className="text-xs leading-relaxed italic" style={{ color: "oklch(0.50 0.02 220)" }}>
                  CPM Int'l is more than a research institute. It is a platform for scientific discovery, technological innovation, and global collaboration.
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 border-t pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs" style={{ borderColor: "oklch(1 0 0 / 0.1)", color: "oklch(0.45 0.02 220)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="px-2.5 py-1.5 rounded-md shadow-sm"><img src="/logo 3.jpeg" alt="CPM Int'l Int'l Logo" className="h-10 md:h-12 w-auto object-contain mix-blend-screen" /></div>
              <p>© {new Date().getFullYear()} CPM Int'l Research Institute.</p>
            </div>
            <p className="uppercase tracking-[0.2em]">Science · Innovation · Intelligence · Impact</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

