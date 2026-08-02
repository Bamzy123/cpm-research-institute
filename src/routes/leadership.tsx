import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Menu, X, FlaskConical, Globe2, Users, ShieldCheck,
  Lightbulb, Handshake, TrendingUp, GraduationCap,
  BookOpen, Cpu, Dna, Leaf, HeartPulse, BarChart3, Award,
  Syringe, Laptop2, Activity,
} from "lucide-react";
import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";


import directorPhoto from "../assets/prof.jpg?url";

export const Route = createFileRoute("/leadership")({
  component: LeadershipPage,
  head: () => ({
    meta: [
      { title: "Leadership CPM Int'l Research Institute for Climate Health" },
      {
        name: "description",
        content:
          "Meet the visionary leadership team of CPM Int'l Research Institute for Climate Health, committed to scientific excellence, innovation, and global impact.",
      },
    ],
  }),
});

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About CPM Int'l" },
  { href: "/#research", label: "Research" },
  { href: "/chip", label: "CHIP™" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/resources", label: "Resources" },
  { href: "/leadership", label: "Leadership" },
  { href: "/#contact", label: "Contact" },
];

const principles = [
  {
    icon: FlaskConical,
    title: "Scientific Excellence",
    body: "Pursuing rigorous, high-quality research that addresses pressing global health challenges.",
    color: "from-blue-600 to-blue-800",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    body: "Developing transformative technologies, digital platforms, and scientific frameworks that improve public health outcomes.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    body: "Building strong partnerships across disciplines, institutions, sectors, and countries to maximise scientific impact.",
    color: "from-emerald-600 to-teal-700",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    body: "Maintaining the highest ethical standards, transparency, accountability, and responsible conduct in research and institutional governance.",
    color: "from-violet-600 to-purple-800",
  },
  {
    icon: TrendingUp,
    title: "Societal Impact",
    body: "Ensuring that scientific discoveries translate into policies, technologies, and interventions that improve lives and strengthen health systems.",
    color: "from-rose-500 to-red-700",
  },
];

const expertiseAreas = [
  { icon: Globe2, label: "Climate Change and Health" },
  { icon: HeartPulse, label: "Infectious Diseases" },
  { icon: FlaskConical, label: "Clinical Microbiology" },
  { icon: Syringe, label: "Immunology" },
  { icon: Dna, label: "Pathogen Genomics" },
  { icon: Cpu, label: "Artificial Intelligence" },
  { icon: BarChart3, label: "Bioinformatics" },
  { icon: Leaf, label: "Environmental Health" },
  { icon: TrendingUp, label: "Epidemiology" },
  { icon: Users, label: "Public Health" },
  { icon: Activity, label: "One Health" },
  { icon: Laptop2, label: "Digital Health" },
  { icon: Globe2, label: "Climate Intelligence" },
  { icon: Award, label: "Health Systems Research" },
];

function LeadershipPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);

  const closeMenu = () => {
    setMenuClosing(true);
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 290);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Shared Header ──────────────────────────────────────────────── */}
      <Header />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, oklch(0.20 0.06 230) 0%, oklch(0.26 0.08 220) 50%, oklch(0.30 0.07 210) 100%)",
          minHeight: "420px",
        }}
      >
        {/* Decorative grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          aria-hidden
          style={{
            backgroundImage: "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gold accent line */}
        <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "linear-gradient(90deg, transparent, oklch(0.72 0.14 75), transparent)" }} aria-hidden />

        <div className="relative mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.25em]" style={{ color: "oklch(0.72 0.14 75)" }}>
            CPM Int'l Research Institute for Climate Health
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl max-w-3xl">
            Leadership at CPM Int'l
          </h1>
          <p className="mt-5 text-lg font-light tracking-wide" style={{ color: "oklch(0.85 0.04 220)" }}>
            Visionary Leadership &nbsp;·&nbsp; Scientific Excellence &nbsp;·&nbsp; Global Impact
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed" style={{ color: "oklch(0.80 0.03 220)" }}>
            At CPM Int'l Research Institute for Climate Health, leadership is founded on the principles of scientific integrity, innovation, collaboration, accountability, and service to humanity.
          </p>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mt-10 flex items-center gap-2 text-xs" style={{ color: "oklch(0.70 0.04 220)" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span aria-hidden>/</span>
            <span className="text-white">Leadership</span>
          </nav>
        </div>
      </section>

      {/* ── Leadership Mission Statement ─────────────────────────────── */}
      <section className="bg-sky border-b border-border/40">
        <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-base leading-relaxed text-foreground/80">
              We believe that addressing the complex challenges posed by climate change and emerging infectious diseases requires leaders who can bridge disciplines, inspire partnerships, and translate research into meaningful societal impact. Through strategic partnerships with universities, teaching hospitals, government agencies, international organizations, and development partners, CPM Int'l provides a platform where science becomes a catalyst for sustainable development and global health security.
            </p>
          </div>
        </div>
      </section>

      {/* ── Founding Director-General ───────────────────────────────────── */}
      <section id="founding-director" className="bg-background hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20 items-start">
            {/* Photo column */}
            <div className="lg:col-span-4">
              <div className="relative">
                <img
                  src={directorPhoto}
                  alt="Portrait of Professor Joseph Omololu-Aso"
                  className="w-full border border-border object-cover shadow-xl"
                  style={{ aspectRatio: "4/5" }}
                />
                {/* Gold accent corner */}
                <div className="absolute -bottom-3 -right-3 h-24 w-24 border-b-2 border-r-2" style={{ borderColor: "oklch(0.72 0.14 75)" }} aria-hidden />
              </div>
              {/* Credentials badge */}
              <div className="mt-8 border border-border bg-card p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Position</p>
                <p className="mt-2 font-serif text-sm font-medium text-foreground leading-relaxed">
                  Founding Director-General and Chief Executive Officer
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">Expertise</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Infectious Disease &amp; Climate Change Intervention
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">Institute</p>
                <p className="mt-2 text-sm text-muted-foreground">CPM Int'l Research Institute for Climate Health</p>
              </div>
            </div>

            {/* Bio column */}
            <div className="lg:col-span-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Founding Director-General &amp; CEO</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-foreground lg:text-5xl">
                Professor Joseph Omololu-Aso
              </h2>
              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                Professor of Infectious Disease &amp; Climate Change Intervention
              </p>
              <hr className="my-8 grad-divider" />

              <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  Professor Joseph Omololu-Aso is an internationally engaged academic, researcher, and scientific leader whose work focuses on the intersection of climate change, infectious diseases, clinical microbiology, pathogen genomics, antimicrobial resistance, artificial intelligence, and One Health.
                </p>
                <p>
                  He founded CPM Int'l Research Institute with the vision of creating a multidisciplinary platform capable of addressing the growing challenges posed by climate-sensitive infectious diseases through innovative research, advanced technology, strategic partnerships, and evidence-informed policy.
                </p>
                <p>
                  His research philosophy emphasises integrating climate science, microbiology, epidemiology, digital health, and artificial intelligence to improve disease prediction, surveillance, preparedness, and response.
                </p>
                <p>
                  Professor Omololu-Aso has contributed to research, teaching, scientific capacity development, and institutional leadership while fostering collaborations across academia, healthcare institutions, government agencies, and international organizations. His work aims to strengthen climate-resilient health systems and position Africa as a leading contributor to global scientific innovation.
                </p>
                <p>
                  As the founding Director-General, he provides strategic leadership for the Institute's research agenda, international collaborations, innovation programmes, and long-term institutional development.
                </p>
              </div>

              {/* Focus areas */}
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {["Climate Change", "Infectious Diseases", "Clinical Microbiology", "Pathogen Genomics", "Antimicrobial Resistance", "Artificial Intelligence", "One Health", "Digital Health", "Epidemiology"].map((area) => (
                  <div key={area} className="border border-border bg-card px-3 py-2 text-xs font-medium text-foreground/80 text-center">
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership Philosophy ────────────────────────────────────── */}
      <section id="philosophy" className="bg-sky hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Core Principles</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-foreground lg:text-5xl">
              Our Leadership Philosophy
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Leadership at CPM Int'l is guided by five core principles that underpin every research programme, partnership, and institutional decision.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {principles.map(({ icon: Icon, title, body, color }) => (
              <div
                key={title}
                className="group relative overflow-hidden border border-border bg-background card-lift flex flex-col"
              >
                {/* Top gradient strip */}
                <div className={`h-1.5 bg-gradient-to-r ${color}`} />
                <div className="flex flex-col gap-4 p-6 flex-1">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${color} text-white`}>
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground flex-1">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Executive Leadership Team ────────────────────────────────── */}
      <section id="executive" className="bg-background hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <header className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Governance</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-foreground lg:text-5xl">
                Executive Leadership Team
              </h2>
            </header>
            <div className="lg:col-span-8 lg:pt-2">
              <p className="text-base leading-relaxed text-muted-foreground">
                The Institute's Executive Leadership Team provides strategic direction across research, innovation, administration, partnerships, finance, capacity development, and institutional growth. Working collaboratively, the Executive Leadership Team ensures that CPM Int'l continues to deliver scientific excellence while remaining responsive to emerging global health priorities.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { role: "Director-General & CEO", name: "Prof. Joseph Omololu-Aso", desc: "Executive leadership & strategic research direction" },
                  { role: "Scientific Advisory Board", name: "International Advisory Council", desc: "Distinguished academic & clinical leaders" },
                  { role: "Pathogen Genomics Lead", name: "Genomics Research Group", desc: "Microbial surveillance & sequencing initiatives" },
                  { role: "CHIP™ AI & Digital Twin Lead", name: "Data Science Directorate", desc: "Machine learning & epidemiological modeling" },
                  { role: "One Health & Field Operations", name: "Regional Network Leads", desc: "Vector monitoring & clinical surveillance" },
                  { role: "Institutional Expansion", name: "Executive Directorate 2026", desc: "Recruiting senior research chairs in AMR & Climate Policy" },
                ].map(({ role, name, desc }) => (
                  <div key={role} className="border border-border bg-card p-5 flex flex-col justify-between transition-all hover:border-primary/40">
                    <div>
                      <div className="mb-3 h-9 w-9 rounded-full border border-primary/20 bg-primary/8 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" strokeWidth={1.5} />
                      </div>
                      <p className="text-[11px] font-semibold text-primary uppercase tracking-wider">{role}</p>
                      <p className="mt-1 font-serif text-sm font-medium text-foreground">{name}</p>
                      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Scientific Leadership ────────────────────────────────────── */}
      <section
        id="scientific"
        style={{ background: "linear-gradient(135deg, oklch(0.20 0.06 230) 0%, oklch(0.23 0.07 220) 100%)" }}
      >
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-[0.22em]" style={{ color: "oklch(0.72 0.14 75)" }}>Multidisciplinary</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-white lg:text-5xl">
              Scientific Leadership
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "oklch(0.80 0.03 220)" }}>
              Scientific leadership at CPM Int'l is multidisciplinary and collaborative. The Institute brings together expertise across 14 domains of climate health science to generate innovative solutions to complex health challenges.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
            {expertiseAreas.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="group flex flex-col items-center gap-3 border p-4 text-center transition-all duration-200 hover:scale-105"
                style={{ borderColor: "oklch(1 0 0 / 0.12)", background: "oklch(1 0 0 / 0.04)" }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "oklch(0.72 0.14 75 / 0.15)" }}>
                  <Icon className="h-5 w-5" style={{ color: "oklch(0.72 0.14 75)" }} strokeWidth={1.5} />
                </div>
                <p className="text-xs font-medium leading-snug text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Advisory Boards ──────────────────────────────────────────── */}
      <section id="advisory" className="bg-background hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Strategic Guidance</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-foreground lg:text-5xl">
                Advisory Boards
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                CPM Int'l benefits from the guidance of distinguished national and international experts who contribute strategic advice, scientific oversight, and global perspectives. The Institute is committed to engaging respected leaders from academia, healthcare, government, industry, and international organizations to strengthen research quality and institutional development.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { sector: "Academia", desc: "Leading professors and research scientists from top universities worldwide" },
                { sector: "Healthcare", desc: "Senior clinicians and hospital directors from teaching institutions" },
                { sector: "Government", desc: "Public health officials, ministry advisors, and policy architects" },
                { sector: "Industry", desc: "Technology and pharmaceutical leaders driving health innovation" },
                { sector: "International Organizations", desc: "WHO, UN, and multilateral health agency representatives" },
                { sector: "Development Partners", desc: "Wellcome Trust, Belmont Forum, and major funders" },
              ].map(({ sector, desc }) => (
                <div key={sector} className="border border-border bg-card p-5 card-lift">
                  <Award className="h-5 w-5 text-primary mb-3" strokeWidth={1.5} />
                  <h3 className="font-medium text-sm text-foreground">{sector}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Building Future Leaders ──────────────────────────────────── */}
      <section id="future-leaders" className="bg-sky hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Next Generation</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-foreground lg:text-5xl">
                Building Future Leaders
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                One of CPM Int'l's defining priorities is developing the next generation of scientific leaders. Through mentorship, fellowships, postgraduate training, research internships, leadership programmes, and international collaborations, the Institute seeks to equip young scientists with the knowledge, skills, and networks required to address future climate and health challenges.
              </p>
              <Link
                to="/resources"
                className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                View Training Programmes <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {[
                { icon: GraduationCap, label: "Postgraduate Training", desc: "MSc and PhD research programmes in climate health sciences" },
                { icon: Award, label: "Fellowships", desc: "Competitive research fellowships for early-career scientists" },
                { icon: Users, label: "Mentorship", desc: "One-to-one mentoring by senior international researchers" },
                { icon: BookOpen, label: "Research Internships", desc: "Hands-on laboratory and field research opportunities" },
                { icon: Globe2, label: "International Collaborations", desc: "Joint research programmes with global partner institutions" },
                { icon: TrendingUp, label: "Leadership Programmes", desc: "Scientific and institutional leadership development" },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="border border-border bg-background p-5 card-lift">
                  <Icon className="h-5 w-5 text-primary mb-3" strokeWidth={1.5} />
                  <h3 className="font-medium text-sm text-foreground">{label}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Commitment ───────────────────────────────────────────────── */}
      <section
        id="commitment"
        style={{ background: "linear-gradient(135deg, oklch(0.20 0.06 230) 0%, oklch(0.26 0.08 220) 60%, oklch(0.28 0.06 210) 100%)" }}
      >
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          {/* Gold rule */}
          <div className="mx-auto w-16 h-0.5 mb-10" style={{ background: "oklch(0.72 0.14 75)" }} aria-hidden />
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-medium uppercase tracking-[0.22em]" style={{ color: "oklch(0.72 0.14 75)" }}>Our Commitment</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.1] tracking-tight text-white lg:text-5xl">
              Science. Innovation. Integrity. Impact.
            </h2>
            <p className="mt-8 text-base leading-relaxed" style={{ color: "oklch(0.80 0.03 220)" }}>
              The leadership of CPM International Research Institute for Climate Health is committed to creating an institution recognized for scientific excellence, responsible innovation, and meaningful societal impact. We believe that leadership is measured not only by scientific achievements but also by the ability to inspire collaboration, strengthen institutions, mentor future generations, and transform research into solutions that improve lives.
            </p>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "oklch(0.80 0.03 220)" }}>
              Together with our partners, we are building an institution dedicated to advancing climate-health intelligence, strengthening resilient health systems, and contributing to a healthier and more sustainable future for Africa and the world.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-medium transition-all hover:opacity-90"
                style={{ background: "oklch(0.72 0.14 75)", color: "oklch(0.15 0.04 230)" }}
              >
                Partner With Us <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 border px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                style={{ borderColor: "oklch(1 0 0 / 0.3)" }}
              >
                Explore the Institute
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
