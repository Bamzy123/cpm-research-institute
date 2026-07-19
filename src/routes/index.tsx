import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Network, Layers, Globe2, Building2, LineChart, BookOpen,
  GraduationCap, Scale, Cpu, Dna, Leaf, FlaskConical,
  HeartPulse, Compass, ArrowRight, Menu, X, MapPin, Mail, Phone,
} from "lucide-react";
import officeHeader from "../assets/office-header.jpeg.asset.json";
import directorPhoto from "../assets/director.jpeg.asset.json";

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

const leaders = [
  { name: "Prof. [Director Name]", title: "Director, CPM International Research Institute for Climate Health", credentials: "MBBS, PhD, FAS", bio: "Leads the institute's scientific vision at the intersection of climate, pathogens and public health, with decades of research and international collaboration experience." },
  { name: "Dr. [Research Lead Name]", title: "Head, Climate–Pathogen Nexus Programme", credentials: "PhD, Genomics & AI", bio: "Directs the flagship CP-Nexus, integrating pathogen genomics, climate modelling and machine learning to advance predictive surveillance." },
  { name: "Dr. [Research Lead Name]", title: "Head, One Health & Laboratory Sciences", credentials: "DVM, PhD", bio: "Oversees One Health research and laboratory operations spanning molecular diagnostics, biospecimen science and antimicrobial resistance." },
];

const navItems = [
  { href: "#about", label: "Institute" },
  { href: "#why", label: "Research" },
  { href: "#leadership", label: "Leadership" },
  { href: "#partners", label: "Partners" },
  { href: "#contact", label: "Contact" },
];

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
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
  }, [target, active, duration]);
  return n;
}

function Stat({ item, active }: { item: (typeof glance)[number]; active: boolean }) {
  const n = useCountUp(item.numeric ?? 0, active);
  return (
    <div className="flex flex-col gap-4 border-t border-primary-foreground/20 pt-6">
      <dt className="font-serif text-5xl font-medium leading-none tracking-tight lg:text-6xl">
        {item.numeric != null ? n : item.value}
      </dt>
      <dd className="text-sm leading-relaxed text-primary-foreground/85">{item.label}</dd>
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [statsActive, setStatsActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsActive(true); io.disconnect(); } },
      { threshold: 0.3 },
    );
    io.observe(statsRef.current);
    return () => io.disconnect();
  }, []);

  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-5 lg:px-10">
          <a href="#top" className="flex min-w-0 items-baseline gap-3">
            <span className="font-serif text-2xl font-medium tracking-tight text-primary">CPM</span>
            <span className="hidden truncate text-xs uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              International Research Institute for Climate Health
            </span>
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
            {navItems.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-primary">{n.label}</a>
            ))}
          </nav>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center border border-border md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile" className="border-t border-border bg-background md:hidden">
            <ul className="mx-auto flex max-w-[1400px] flex-col px-6 py-2">
              {navItems.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-border/60 py-3 text-sm font-medium text-foreground/85 last:border-b-0 hover:text-primary"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                Climate Health Intelligence · Africa · Worldwide
              </p>
              <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[72px]">
                Advancing the science of a changing climate — for the health of people, animals and the planet.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                The CPM International Research Institute for Climate Health generates transformative scientific knowledge at the intersection of climate, pathogens, genomics and artificial intelligence — strengthening health security in Africa and contributing to global scientific advancement.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#why" className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                  Discover the Institute <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a href="#glance" className="inline-flex items-center gap-2 border border-foreground/25 px-6 py-3 text-sm font-medium text-foreground transition hover:border-foreground/70">
                  CPM at a Glance
                </a>
              </div>
            </div>
            <aside className="lg:col-span-4 lg:border-l lg:border-border lg:pl-10">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">In focus</p>
              <h2 className="mt-4 font-serif text-2xl leading-tight text-foreground">The Climate–Pathogen Nexus</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Our flagship framework integrates climate science, pathogen biology, genomics and AI-driven decision support to anticipate and contain the epidemics of tomorrow.
              </p>
              <a href="#why" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                Read the science <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* Why CPM? */}
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
                  <article className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 py-8 md:grid-cols-[3rem_2.5rem_1fr] md:gap-x-8">
                    <span className="font-serif text-sm text-muted-foreground md:pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="hidden text-primary md:inline-flex md:pt-0.5" aria-hidden>
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    <div className="col-span-2 md:col-span-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                        <h3 className="font-serif text-xl leading-snug text-foreground md:text-2xl">{title}</h3>
                        {flagship && (
                          <span className="inline-flex items-center border border-primary px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
                            Flagship
                          </span>
                        )}
                      </div>
                      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CPM at a Glance */}
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
            <dl className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-2">
              {glance.map((g) => <Stat key={g.label} item={g} active={statsActive} />)}
            </dl>
          </div>
        </div>
      </section>

      {/* Leadership */}
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
                  <div
                    aria-hidden
                    className="aspect-[4/5] w-full border border-border bg-secondary"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, transparent 0 10px, oklch(0 0 0 / 0.03) 10px 11px)",
                    }}
                  />
                  <h3 className="mt-5 font-serif text-lg text-foreground">{p.name}</h3>
                  <p className="mt-1 text-sm text-primary">{p.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">{p.credentials}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
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

      {/* About + Contact */}
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
                    <dd className="mt-1 text-muted-foreground">+234 (0) 000 000 0000</dd>
                  </div>
                </div>
              </dl>
            </div>

            <div id="contact" className="lg:col-span-7 lg:border-l lg:border-border lg:pl-16">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Contact</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground lg:text-4xl">Get in touch</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                For research collaborations, funding enquiries, media requests and academic partnerships.
              </p>

              {submitted ? (
                <div className="mt-10 border border-primary/30 bg-secondary p-6 text-sm text-foreground" role="status">
                  Thank you — your message has been received. A member of the CPM team will respond by email.
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm">
                    <span className="font-medium text-foreground">Name</span>
                    <input required name="name" type="text" className="border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none" />
                  </label>
                  <label className="flex flex-col gap-2 text-sm">
                    <span className="font-medium text-foreground">Email</span>
                    <input required name="email" type="email" className="border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none" />
                  </label>
                  <label className="flex flex-col gap-2 text-sm sm:col-span-2">
                    <span className="font-medium text-foreground">Institution</span>
                    <input name="institution" type="text" className="border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none" />
                  </label>
                  <label className="flex flex-col gap-2 text-sm sm:col-span-2">
                    <span className="font-medium text-foreground">Message</span>
                    <textarea required name="message" rows={5} className="resize-y border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none" />
                  </label>
                  <div className="sm:col-span-2">
                    <button type="submit" className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                      Send message <ArrowRight className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-10 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} CPM International Research Institute for Climate Health · Hosted at Obafemi Awolowo University.</p>
          <p className="text-xs uppercase tracking-[0.2em]">Research · Innovation · Education · Policy · Impact</p>
        </div>
      </footer>
    </div>
  );
}
