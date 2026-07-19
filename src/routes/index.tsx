import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Network, Layers, Globe2, Building2, LineChart, BookOpen,
  GraduationCap, Scale, Cpu, Dna, Leaf, FlaskConical,
  HeartPulse, Compass, ArrowRight, Menu, X, MapPin, Mail, Phone,
  ChevronDown,
} from "lucide-react";
import officeHeader from "../assets/header.jpeg?url";
import directorPhoto from "../assets/director.jpeg?url";
import teamPhoto from "../assets/team.jpeg?url";

export const Route = createFileRoute("/")({
  component: Index,
});

type Strength = { icon: typeof Network; title: string; body: string; flagship?: boolean };

const strengths: Strength[] = [
  { icon: Network, flagship: true, title: "Climate–Pathogen Nexus (CP-Nexus)", body: "Our flagship scientific innovation integrating climate science, pathogen biology, genomics, artificial intelligence, epidemiology, and decision-support systems to strengthen predictive disease surveillance and epidemic preparedness." },
  { icon: Layers, title: "14 Multidisciplinary Research Programmes", body: "Driving cutting-edge research across climate health, infectious diseases, laboratory medicine, genomics, artificial intelligence, antimicrobial resistance, digital public health, and One Health." },
  { icon: Globe2, title: "Global Research Partnerships", body: "Building strategic collaborations with universities, research institutes, governments, teaching hospitals, multilateral organizations, and development partners to accelerate scientific discovery and capacity development." },
  { icon: Building2, title: "Centre of Excellence Initiative", body: "Championing the establishment of the Obafemi Awolowo University International Centre of Excellence for Climate Health Intelligence, Infectious Diseases, Pathogenomics, Artificial Intelligence and One Health Innovation, creating a globally connected platform for research, postgraduate education, and innovation." },
  { icon: LineChart, title: "Climate Health Intelligence Dashboard", body: "Developing an integrated digital platform that combines climate data, disease surveillance, laboratory intelligence, genomic analysis, artificial intelligence, and geospatial information to support evidence-based public health decision-making." },
  { icon: BookOpen, title: "Scientific Publications and Knowledge Translation", body: "Producing high-quality peer-reviewed publications, technical reports, policy briefs, and educational resources that advance scientific understanding and inform national and international health policies." },
  { icon: GraduationCap, title: "Education, Training and Fellowships", body: "Building the next generation of scientists through postgraduate education, professional development, research fellowships, internships, and international scientific exchange." },
  { icon: Scale, title: "Research for Policy and Impact", body: "Transforming scientific evidence into practical solutions that strengthen health systems, improve epidemic preparedness, support climate adaptation, and enhance population health." },
  { icon: Cpu, title: "Innovation and Digital Health", body: "Harnessing artificial intelligence, bioinformatics, digital epidemiology, and advanced analytics to develop innovative technologies for disease prediction, surveillance, diagnostics, and health systems strengthening." },
  { icon: Dna, title: "Pathogenomics and Genomic Surveillance", body: "Advancing molecular epidemiology and genomic surveillance to improve the detection, characterization, and monitoring of pathogens with epidemic and pandemic potential." },
  { icon: Leaf, title: "One Health Leadership", body: "Promoting integrated research that recognizes the interconnectedness of human, animal, plant, and environmental health to address complex health challenges through interdisciplinary collaboration." },
  { icon: FlaskConical, title: "Laboratory Excellence", body: "Strengthening laboratory science through molecular diagnostics, quality management systems, biospecimen repositories, and advanced research infrastructure that supports high-impact scientific discovery." },
  { icon: HeartPulse, title: "Health Systems Innovation", body: "Developing resilient, evidence-informed health systems through implementation research, digital transformation, workforce development, and policy engagement." },
  { icon: Compass, title: "Global Scientific Leadership", body: "Positioning Africa at the forefront of climate-health research by fostering innovation, promoting equitable international collaboration, and translating scientific excellence into meaningful societal impact." },
];

const glance: { value: string; numeric?: number; label: string }[] = [
  { value: "14", numeric: 14, label: "Research Programmes" },
  { value: "1", numeric: 1, label: "Flagship Scientific Framework (Climate–Pathogen Nexus)" },
  { value: "1", numeric: 1, label: "Climate Health Intelligence Platform" },
  { value: "1", numeric: 1, label: "Proposed International Centre of Excellence" },
  { value: "Global", label: "International Research Partnerships & Scientific Collaboration Network" },
];

type Leader = { name: string; title: string; credentials?: string; bio: string; photo?: string };

const leaders: Leader[] = [
  {
    name: "Prof. [Director Name]",
    title: "Director, CPM International Research Institute for Climate Health",
    credentials: "MBBS, PhD, FAS",
    bio: "Leads the institute's scientific vision at the intersection of climate, pathogens and public health, with decades of research and international collaboration experience.",
    photo: directorPhoto,
  },
  {
    name: "Our Research Team",
    title: "CPM International Research Institute",
    bio: "Our multidisciplinary research team leads CPM's scientific programmes — spanning climate science, epidemiology, genomics, artificial intelligence, and public health — working together to advance the Institute's research agenda and translate science into impact.",
    photo: teamPhoto,
  },
  // {
  //   name: "Dr. [Research Lead Name]",
  //   title: "Head, One Health & Laboratory Sciences",
  //   credentials: "DVM, PhD",
  //   bio: "Oversees One Health research and laboratory operations spanning molecular diagnostics, biospecimen science and antimicrobial resistance.",
  // },
];

const navItems = [
  { href: "#about", label: "Institute" },
  { href: "#why", label: "Research" },
  { href: "/chip", label: "CHIP™" },
  { href: "#leadership", label: "Leadership" },
  { href: "#partners", label: "Partners" },
  { href: "#contact", label: "Contact" },
];

// ── Utilities ────────────────────────────────────────────────────────

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

function useCountUp(target: number, runKey: number, duration = 1000) {
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

function Stat({ item, runKey }: { item: (typeof glance)[number]; runKey: number }) {
  const n = useCountUp(item.numeric ?? 0, runKey);
  return (
    <div className="flex flex-col gap-3 border-t border-primary-foreground/20 pt-5 sm:gap-4 sm:pt-6">
      <dt className="font-serif text-4xl font-medium leading-none tracking-tight sm:text-5xl lg:text-6xl">
        {item.numeric != null ? n : item.value}
      </dt>
      <dd className="text-xs leading-relaxed text-primary-foreground/85 sm:text-sm">{item.label}</dd>
    </div>
  );
}

// ── Form state ───────────────────────────────────────────────────────
type FormStatus = "idle" | "loading" | "success" | "error";

// ── Component ────────────────────────────────────────────────────────
function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [statsRunKey, setStatsRunKey] = useState(0);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState("");
  const [openStrength, setOpenStrength] = useState<number | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  // Stats intersection observer
  useEffect(() => {
    if (!statsRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsRunKey((k) => k + 1);
        else setStatsRunKey(0);
      },
      { threshold: 0.3 },
    );
    io.observe(statsRef.current);
    return () => io.disconnect();
  }, []);

  // Close mobile nav — plays slide-out animation then unmounts
  const closeMenu = () => {
    if (prefersReduced) { setMenuOpen(false); return; }
    setMenuClosing(true);
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 290);
  };

  // Strength accordion toggle
  const toggleStrength = (i: number) =>
    setOpenStrength((prev) => (prev === i ? null : i));

  // Contact form — Web3Forms
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
      setFormError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Sticky header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-5 lg:px-10">
          <a href="#top" className="flex min-w-0 items-baseline gap-3">
            <span className="font-serif text-2xl font-medium tracking-tight text-primary">CPM</span>
            <span className="hidden truncate text-xs uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              International Research Institute for Climate Health
            </span>
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
            {navItems.map((n) =>
              n.href.startsWith("/") ? (
                <Link key={n.href} to={n.href} className="transition-colors hover:text-primary">{n.label}</Link>
              ) : (
                <a key={n.href} href={n.href} className="transition-colors hover:text-primary">{n.label}</a>
              ),
            )}
          </nav>
          {/* Hamburger — icon morphs Menu ↔ X */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={menuOpen ? closeMenu : () => setMenuOpen(true)}
            className="relative inline-flex h-10 w-10 items-center justify-center border border-border transition-colors hover:border-primary/60 md:hidden"
          >
            <span
              className="absolute"
              style={{
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "rotate(45deg) scale(0.6)" : "none",
                transition: prefersReduced ? "none" : "opacity 200ms, transform 200ms",
              }}
            >
              <Menu className="h-5 w-5" aria-hidden />
            </span>
            <span
              className="absolute"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "none" : "rotate(-45deg) scale(0.6)",
                transition: prefersReduced ? "none" : "opacity 200ms, transform 200ms",
              }}
            >
              <X className="h-5 w-5" aria-hidden />
            </span>
          </button>
        </div>
      </header>

      {/* ── Mobile nav — fixed right-side slide panel ──────────────── */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-40 bg-foreground/40 md:hidden ${menuClosing ? "nav-backdrop-out" : "nav-backdrop-in"}`}
            onClick={closeMenu}
            aria-hidden
          />
          {/* Panel */}
          <nav
            aria-label="Mobile"
            className={`fixed top-0 right-0 z-50 flex h-full w-72 max-w-[85vw] flex-col border-l border-border bg-background shadow-2xl md:hidden ${menuClosing ? "nav-slide-out" : "nav-slide-in"}`}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <span className="font-serif text-xl font-medium tracking-tight text-primary">CPM</span>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center border border-border transition-colors hover:border-primary/60 hover:text-primary"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <ul className="flex flex-col py-2">
              {navItems.map((n) => (
                <li key={n.href}>
                  {n.href.startsWith("/") ? (
                    <Link
                      to={n.href}
                      onClick={closeMenu}
                      className="block px-6 py-4 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
                    >
                      {n.label}
                    </Link>
                  ) : (
                    <a
                      href={n.href}
                      onClick={closeMenu}
                      className="block px-6 py-4 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
                    >
                      {n.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-auto border-t border-border px-6 py-6">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Research · Innovation · Policy · Impact
              </p>
            </div>
          </nav>
        </>
      )}

      {/* ── Hero — lighter layered gradient so photo reads clearly ──── */}
      <section id="top" className="relative hairline-b overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img src={officeHeader} alt="" className="h-full w-full object-cover" />
          {/* Thin overall tint — keeps image visible */}
          <div className="absolute inset-0 bg-primary/18" />
          {/* Bottom-to-top gradient — anchors text readability at base */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
          {/* Left-to-right gradient — soft tint behind text columns */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 py-20 text-primary-foreground lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground/85">
                Climate Health Intelligence · Africa · Worldwide
              </p>
              <h1 className="font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-[72px]">
                Advancing the science of a changing climate — for the health of people, animals and the planet.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">
                The CPM International Research Institute for Climate Health generates transformative scientific knowledge at the intersection of climate, pathogens, genomics and artificial intelligence — strengthening health security in Africa and contributing to global scientific advancement.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#why" className="inline-flex items-center gap-2 bg-primary-foreground px-6 py-3 text-sm font-medium text-primary transition hover:bg-primary-foreground/90">
                  Discover the Institute <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a href="#glance" className="inline-flex items-center gap-2 border border-primary-foreground/40 px-6 py-3 text-sm font-medium text-primary-foreground transition hover:border-primary-foreground">
                  CPM at a Glance
                </a>
              </div>
            </div>
            <aside className="lg:col-span-4 lg:border-l lg:border-primary-foreground/25 lg:pl-10">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/70">In focus</p>
              <h2 className="mt-4 font-serif text-2xl leading-tight">CHIP™ — Climate Health Intelligence Platform</h2>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/85">
                Our flagship scientific innovation — an AI-enabled Climate Health Digital Twin that integrates climate, pathogen genomics and geospatial intelligence into a single predictive platform.
              </p>
              <Link to="/chip" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary-foreground hover:underline">
                Read the science <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Why CPM? — Strategic Strengths (accordion) ─────────────── */}
      <section id="why" className="hairline-b bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <header className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Why CPM?</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-foreground lg:text-5xl">
                Advancing Climate Health Intelligence Through Science, Innovation and Global Partnership
              </h2>
            </header>
            <div className="lg:col-span-8 lg:pt-3">
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                The CPM International Research Institute for Climate Health is committed to generating transformative scientific knowledge that addresses the evolving health challenges of a changing climate. Our multidisciplinary approach integrates research, innovation, education, technology, and policy to strengthen health security in Africa and contribute to global scientific advancement.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Our Strategic Strengths
            </p>
            <ol className="mt-6 border-t border-border">
              {strengths.map(({ icon: Icon, title, body, flagship }, i) => (
                <li key={title} className="border-b border-border">
                  {/* ── Accordion trigger ── */}
                  <button
                    type="button"
                    onClick={() => toggleStrength(i)}
                    aria-expanded={openStrength === i}
                    aria-controls={`strength-body-${i}`}
                    className="grid w-full grid-cols-[2.5rem_1fr_1.5rem] items-start gap-x-5 py-8 text-left transition-colors hover:bg-primary/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:grid-cols-[3rem_2.5rem_1fr_1.5rem] md:gap-x-8"
                  >
                    <span className="pt-0.5 font-serif text-sm text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="hidden pt-0.5 text-primary md:inline-flex" aria-hidden>
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                        <h3 className="font-serif text-xl leading-snug text-foreground md:text-2xl">{title}</h3>
                        {flagship && (
                          <span className="inline-flex items-center border border-primary px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
                            Flagship
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronDown
                      className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                      style={{
                        transform: openStrength === i ? "rotate(180deg)" : "none",
                        transition: prefersReduced ? "none" : "transform 300ms ease",
                      }}
                      aria-hidden
                    />
                  </button>
                  {/* ── Accordion body — CSS grid-template-rows trick for smooth height ── */}
                  <div
                    id={`strength-body-${i}`}
                    style={{
                      display: "grid",
                      gridTemplateRows: openStrength === i ? "1fr" : "0fr",
                      transition: prefersReduced ? "none" : "grid-template-rows 300ms ease",
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-8 pl-0 max-w-3xl text-[15px] leading-relaxed text-muted-foreground md:pl-[calc(3rem+2.5rem+2rem)]">
                        {body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── CPM at a Glance ────────────────────────────────────────── */}
      <section id="glance" className="bg-primary text-primary-foreground">
        <div ref={statsRef} className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <header className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground/70">By the numbers</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight lg:text-5xl">CPM at a Glance</h2>
              <p className="mt-6 text-sm uppercase tracking-[0.22em] text-primary-foreground/70">
                Research · Innovation · Education · Policy · Impact
              </p>
            </header>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-10 lg:col-span-8 lg:grid-cols-2">
              {glance.map((g) => <Stat key={g.label} item={g} runKey={statsRunKey} />)}
            </dl>
          </div>
        </div>
      </section>

      {/* ── Leadership ─────────────────────────────────────────────── */}
      <section id="leadership" className="hairline-b bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <header className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Leadership</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-foreground lg:text-5xl">
                Scientific direction and research leadership
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                The institute is led by senior scientists with international standing across climate health, pathogen genomics, One Health and public policy.
              </p>
            </header>
            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
              {leaders.map((p) => (
                <article key={p.name} className="flex flex-col">
                  {p.photo ? (
                    <img
                      src={p.photo}
                      alt={p.name === "Our Research Team" ? "CPM research team group photo" : `Portrait of ${p.name}`}
                      className="aspect-[4/5] w-full border border-border object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="aspect-[4/5] w-full border border-border bg-secondary"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, transparent 0 10px, oklch(0 0 0 / 0.03) 10px 11px)",
                      }}
                    />
                  )}
                  <h3 className="mt-5 font-serif text-lg text-foreground">{p.name}</h3>
                  <p className="mt-1 text-sm text-primary">{p.title}</p>
                  {p.credentials && (
                    <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">{p.credentials}</p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Partners ───────────────────────────────────────────────── */}
      <section id="partners" className="hairline-b bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">In Collaboration With</p>
          <h2 className="mt-3 font-serif text-2xl text-foreground">Our Partners</h2>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex h-24 items-center justify-center bg-background text-xs uppercase tracking-[0.18em] text-muted-foreground"
                aria-label={`Partner ${i + 1} logo placeholder`}
              >
                Partner {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About + Contact ────────────────────────────────────────── */}
      <section id="about" className="hairline-b bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">About the Institute</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground lg:text-4xl">
                Hosted at Obafemi Awolowo University, Nigeria
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                CPM operates as an international research institute embedded within the academic and clinical ecosystem of Obafemi Awolowo University — advancing climate health science, training and policy engagement in partnership with institutions worldwide.
              </p>
              <dl className="mt-10 space-y-5 text-sm">
                <div className="flex gap-4">
                  <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <dt className="font-medium text-foreground">Address</dt>
                    <dd className="mt-1 text-muted-foreground">Obafemi Awolowo University, Ile-Ife, Osun State, Nigeria</dd>
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

            {/* ── Contact form — Web3Forms ───────────────────────── */}
            <div id="contact" className="lg:col-span-7 lg:border-l lg:border-border lg:pl-16">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Contact</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground lg:text-4xl">Get in touch</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                For research collaborations, funding enquiries, media requests and academic partnerships.
              </p>

              {formStatus === "success" ? (
                <div className="mt-10 border border-primary/30 bg-primary/5 p-6 text-sm text-foreground" role="status">
                  <p className="font-medium text-primary">Message received</p>
                  <p className="mt-1 text-muted-foreground">
                    Thank you — your message has been received. We'll be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2" noValidate>
                  {/*
                    ── Web3Forms configuration ──────────────────────────────
                    Sign up free at https://web3forms.com, get your Access Key,
                    then replace YOUR_WEB3FORMS_ACCESS_KEY below with your real key.
                    ──────────────────────────────────────────────────────── */}
                  <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
                  <input type="hidden" name="subject" value="CPM Institute — Website Enquiry" />
                  <input type="hidden" name="from_name" value="CPM Research Institute Website" />
                  {/* Honeypot spam field — must stay empty */}
                  <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden />

                  <label className="flex flex-col gap-2 text-sm">
                    <span className="font-medium text-foreground">Name <span className="text-destructive" aria-hidden>*</span></span>
                    <input
                      required
                      name="name"
                      type="text"
                      autoComplete="name"
                      disabled={formStatus === "loading"}
                      className="border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none disabled:opacity-50"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm">
                    <span className="font-medium text-foreground">Email <span className="text-destructive" aria-hidden>*</span></span>
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      disabled={formStatus === "loading"}
                      className="border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none disabled:opacity-50"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm sm:col-span-2">
                    <span className="font-medium text-foreground">Institution</span>
                    <input
                      name="institution"
                      type="text"
                      disabled={formStatus === "loading"}
                      className="border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none disabled:opacity-50"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm sm:col-span-2">
                    <span className="font-medium text-foreground">Message <span className="text-destructive" aria-hidden>*</span></span>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      disabled={formStatus === "loading"}
                      className="resize-y border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none disabled:opacity-50"
                    />
                  </label>

                  {/* Error message */}
                  {formStatus === "error" && formError && (
                    <div className="sm:col-span-2 border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive" role="alert">
                      {formError}
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {formStatus === "loading" ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" aria-hidden />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message <ArrowRight className="h-4 w-4" aria-hidden />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="bg-background">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-10 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} CPM International Research Institute for Climate Health · Hosted at Obafemi Awolowo University.</p>
          <p className="text-xs uppercase tracking-[0.2em]">Research · Innovation · Education · Policy · Impact</p>
        </div>
      </footer>
    </div>
  );
}
