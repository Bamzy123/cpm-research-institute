import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";


import {
  ArrowRight, Menu, X,
  Microscope, Globe2, BrainCircuit, Dna, Activity, BarChart3,
  Mail, Phone, MapPin, Shield, Sparkles, Cpu, Users, 
  CheckCircle2, GraduationCap, Compass, BookOpen, HeartPulse
} from "lucide-react";
import about from "../assets/about.jpeg"
import prof from "../assets/prof.jpg"

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — CPM Int'l Research Institute for Climate Health" },
      {
        name: "description",
        content:
          "Learn about CPM Int'l Research Institute for Climate Health — our identity, vision, mission, and the multidisciplinary mandate that drives everything we do.",
      },
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

const pillars = [
  { 
    icon: Globe2, 
    title: "Climate Change and Health", 
    body: "Evaluating the systemic pathways through which shifts in climate parameters impact human wellness and global health systems." 
  },
  { 
    icon: Microscope, 
    title: "Climate-Sensitive Infectious Diseases", 
    body: "Investigating the distribution, ecology, and transmission patterns of vector-borne, water-borne, and zoonotic pathogens." 
  },
  { 
    icon: BrainCircuit, 
    title: "Artificial Intelligence and Digital Health", 
    body: "Developing machine learning architectures and digital twins to predict outbreaks and enhance public health decision-support." 
  },
  { 
    icon: Dna, 
    title: "Pathogen Genomics and Molecular Epidemiology", 
    body: "Deploying high-throughput genomic sequencing to track pathogen evolution, drug resistance, and transmission chains." 
  },
  { 
    icon: Activity, 
    title: "One Health", 
    body: "Operationalising the critical interfaces between human, animal, plant, and environmental health domains." 
  },
  { 
    icon: BarChart3, 
    title: "Health Systems Innovation", 
    body: "Designing smart, adaptive, and resilient clinical networks equipped to withstand climate shocks and load surges." 
  },
];

const researchChallenges = [
  "Climate-sensitive infectious diseases",
  "Emerging and re-emerging pathogens",
  "Pandemic preparedness",
  "Antimicrobial resistance",
  "Digital public health",
  "Artificial intelligence for health",
  "Climate-resilient health systems",
  "Environmental health",
  "Precision public health",
  "One Health implementation"
];

const values = [
  { icon: Shield, name: "Scientific Excellence", desc: "Pursuing research of the highest quality." },
  { icon: Sparkles, name: "Innovation", desc: "Developing transformative ideas and technologies." },
  { icon: Compass, name: "Integrity", desc: "Upholding ethical conduct, transparency, and accountability." },
  { icon: Users, name: "Collaboration", desc: "Working across disciplines, institutions, and borders." },
  { icon: HeartPulse, name: "Impact", desc: "Translating science into meaningful societal benefit." },
  { icon: Activity, name: "Sustainability", desc: "Building resilient systems that endure." }
];

const buildingFuturePoints = [
  { label: "Advancing climate-health intelligence", detail: "Integrating environmental data streams with clinical informatics." },
  { label: "Supporting the next generation of researchers", detail: "Fostering local capacity, scientific leadership, and expert networks." },
  { label: "Developing innovative digital technologies", detail: "Creating software solutions, dashboards, and interactive twins." },
  { label: "Strengthening evidence-informed policy", detail: "Translating complex datasets into clear guidelines for ministries." },
  { label: "Promoting responsible science", detail: "Conducting ethical research with open standards and community consent." },
  { label: "Building resilient health systems", detail: "Inoculating systems against extreme weather disruption and epidemiological shifts." }
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

      <Header />

      {/* ── Page Hero ──────────────────────────────────────────────────── */}
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
            CPM Int'l Research Institute for Climate Health
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl max-w-3xl">
            About Us
          </h1>
          <p className="mt-6 text-lg font-light tracking-wide max-w-2xl" style={{ color: "oklch(0.85 0.04 220)" }}>
            Where Climate Intelligence Meets Health Innovation
          </p>
          <nav aria-label="Breadcrumb" className="mt-10 flex items-center gap-2 text-xs" style={{ color: "oklch(0.70 0.04 220)" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span aria-hidden>/</span>
            <span className="text-white">About Us</span>
          </nav>
        </div>
      </section>

      {/* ── Section 1: Welcome / Who We Are ────────────────────────────── */}
      <section id="welcome" className="bg-background hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Introduction</p>
              <h2 className="mt-4 font-serif text-3xl leading-[1.1] tracking-tight text-foreground lg:text-4xl">
                Welcome to CPM Int'l Research Institute for Climate Health
              </h2>
              <div className="mt-3 h-0.5 w-16" style={{ background: "oklch(0.72 0.14 75)" }} aria-hidden />
              
              <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted-foreground">
                <p className="font-medium text-foreground">
                  The CPM International Research Institute for Climate Health (CPM Int’l) is an independent, 
                  multidisciplinary research and innovation institute hosted at <strong>Obafemi Awolowo University (OAU), 
                    Ile-Ife, Nigeria</strong> — committed to advancing scientific excellence at the intersection of climate
                     change, infectious diseases, artificial intelligence, pathogen genomics, One Health, and health 
                     systems innovation.
                </p>
                <p>
                  We were established on a simple but powerful conviction: the future of global health depends on our ability to anticipate health threats rather than merely respond to them.
                </p>
                <p>
                  As climate change continues to reshape the distribution, transmission, and severity of infectious diseases, new scientific approaches are required to protect populations and strengthen health systems. CPM exists to pioneer those approaches through cutting-edge research, digital innovation, strategic partnerships, and evidence-based solutions that improve lives.
                </p>
                <p>
                  Our Institute brings together scientists, clinicians, engineers, environmental experts, epidemiologists, data scientists, policymakers, and development partners to transform scientific knowledge into practical tools that strengthen preparedness, resilience, and sustainable development.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="relative">
                <img
                  src={about}
                  alt="CPM research team"
                  className="w-full border border-border object-cover shadow-md"
                  style={{ aspectRatio: "4/3" }}
                />
                <div className="absolute -bottom-3 -left-3 h-12 w-12 border-b-2 border-l-2" style={{ borderColor: "oklch(0.72 0.14 75)" }} aria-hidden />
              </div>
              <div className="border-l-4 p-6 bg-card" style={{ borderColor: "oklch(0.34 0.06 160)" }}>
                <p className="italic text-sm text-muted-foreground">
                  "The future of global health depends on our ability to anticipate health threats rather than merely respond to them."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section: Institute Facts & Governance ───────────────────────── */}
      <section id="governance-facts" className="bg-sky/20 hairline-b py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Institutional Disclosure & Governance</p>
            <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Institute Facts & Legal Framework
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Official registration, institutional hosting, and governing structures supporting transparent scientific inquiry.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-border bg-card p-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Founding Year</p>
                <p className="mt-2 font-serif text-3xl font-semibold text-primary">2024</p>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Established as an independent scientific research institute pioneering climate-health prediction models.
              </p>
            </div>

            <div className="border border-border bg-card p-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Host Institution</p>
                <p className="mt-2 font-serif text-xl font-semibold text-foreground">Obafemi Awolowo University</p>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Hosted at Obafemi Awolowo University (OAU), Ile-Ife, Nigeria, fostering academic research and laboratory collaboration.
              </p>
            </div>

            <div className="border border-border bg-card p-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Legal & Regulatory Status</p>
                <p className="mt-2 font-serif text-lg font-semibold text-foreground">Independent Research Institute</p>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Registered non-profit scientific institute in Nigeria, dedicated to public health research and international partnerships.
              </p>
            </div>

            <div className="border border-border bg-card p-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Governance Model</p>
                <p className="mt-2 font-serif text-lg font-semibold text-foreground">Directorate & Advisory Council</p>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Governed by the Director-General and an International Scientific Advisory Board spanning climate, health, and AI ethics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Our Story ───────────────────────────────────────── */}
      <section id="story" className="bg-sky/30 hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            {/* Left Column: Prof Picture */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-md">
                <img
                  src={prof}
                  alt="Professor Joseph Omololu-Aso"
                  className="w-full border border-border object-cover shadow-xl rounded-sm"
                  style={{ aspectRatio: "4/5" }}
                />
                <div className="absolute -bottom-3 -left-3 h-16 w-16 border-b-2 border-l-2" style={{ borderColor: "oklch(0.72 0.14 75)" }} aria-hidden />
              </div>
              <div className="mt-5 text-center">
                <p className="font-serif text-lg font-semibold text-foreground">Prof. Joseph Omololu-Aso</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Founding Director-General &amp; CEO</p>
              </div>
            </div>

            {/* Right Column: Our Story Content */}
            <div className="lg:col-span-7">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Foundational Journey</p>
                <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground lg:text-4xl">Our Story</h2>
                <div className="mt-3 h-0.5 w-12" style={{ background: "oklch(0.72 0.14 75)" }} aria-hidden />
              </div>
              <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  CPM International Research Institute was founded with a vision to build a globally connected research ecosystem capable of addressing one of the twenty-first century’s greatest challenges—the complex relationship between climate change and human health.
                </p>
                <p>
                  Recognizing that conventional disease surveillance systems often operate independently of environmental intelligence, the Institute set out to create a new generation of scientific frameworks that integrate climate science, public health, artificial intelligence, laboratory medicine, genomics, and digital technologies into unified decision-support systems.
                </p>
                <p className="font-serif text-base text-foreground italic border-l-2 pl-4 py-3 my-6" style={{ borderColor: "oklch(0.72 0.14 75)" }}>
                  Today, CPM Int'l is evolving into a platform where multidisciplinary science drives innovation, partnerships inspire discovery, and research translates into meaningful public health impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: What Makes Us Different ──────────────────────────── */}
      <section id="differentiation" className="bg-background hairline-b">
        <div className="mx-auto max-w-[1000px] px-6 py-20 lg:py-24">
          <div className="border border-primary/20 bg-card p-8 lg:p-12 relative overflow-hidden text-center rounded-lg shadow-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-32 bg-primary" />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Integrated Framework</p>
            <h2 className="mt-4 font-serif text-2xl tracking-tight text-foreground lg:text-3xl">What Makes CPM Int'l Different?</h2>
            
            <p className="mt-8 font-serif text-xl leading-relaxed text-primary max-w-2xl mx-auto">
              "At CPM Int'l, we do not see climate, pathogens, health systems, artificial intelligence, or environmental change as separate disciplines. We see them as interconnected components of a single ecosystem."
            </p>
            
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground max-w-3xl mx-auto">
              <p>
                This philosophy shapes every aspect of our work—from research and innovation to training, policy engagement, and international collaboration.
              </p>
              <p>
                Our strength lies in our ability to integrate diverse scientific disciplines into practical solutions that anticipate emerging health threats and improve decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Vision & Mission ────────────────────────────────── */}
      <section id="vision-mission" className="bg-sky/10 hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Vision Card */}
            <div className="border border-border bg-card p-8 lg:p-12 relative overflow-hidden flex flex-col justify-between card-lift">
              <div className="absolute top-0 left-0 h-1 w-20 bg-primary" />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Outlook</span>
                <h3 className="mt-3 font-serif text-2xl text-foreground font-semibold">Our Vision</h3>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground font-serif italic">
                  To become a globally recognized centre of excellence advancing transformative research, innovation, and intelligent solutions that build climate-resilient health systems and improve population health worldwide.
                </p>
              </div>
              <div className="mt-8 border-t pt-4 text-xs tracking-widest text-muted-foreground uppercase">
                Global Excellence
              </div>
            </div>

            {/* Mission Card */}
            <div className="border border-border bg-card p-8 lg:p-12 relative overflow-hidden flex flex-col justify-between card-lift">
              <div className="absolute top-0 left-0 h-1 w-20" style={{ background: "oklch(0.72 0.14 75)" }} />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Purpose</span>
                <h3 className="mt-3 font-serif text-2xl text-foreground font-semibold">Our Mission</h3>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  To generate world-class scientific knowledge, develop innovative technologies, strengthen research capacity, foster strategic partnerships, and translate climate-health intelligence into practical solutions that improve health security, preparedness, and sustainable development.
                </p>
              </div>
              <div className="mt-8 border-t pt-4 text-xs tracking-widest text-muted-foreground uppercase">
                Evidence-Led Solutions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Our Scientific Identity (6 Pillars) ──────────────── */}
      <section id="pillars" className="bg-background hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Core Competencies</p>
            <h2 className="mt-4 font-serif text-3xl leading-[1.1] tracking-tight text-foreground lg:text-4xl">
              Our Scientific Identity
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              CPM Int'l is built upon six interconnected pillars:
            </p>
          </div>
          
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map(({ icon: Icon, title, body }) => (
              <div key={title} className="group border border-border bg-card p-8 card-lift relative overflow-hidden flex flex-col justify-between">
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300" aria-hidden />
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/8 transition-all duration-300 group-hover:bg-primary/15">
                    <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden />
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-medium text-foreground">{title}</h3>
                  <div className="mt-2 h-0.5 w-6 transition-all duration-300 group-hover:w-12" style={{ background: "oklch(0.72 0.14 75)" }} aria-hidden />
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{body}</p>
                </div>
                <div className="mt-6 text-[10px] text-primary font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Active Program
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Our Flagship Innovation (CHIP™) ──────────────────── */}
      <section id="chip-spotlight" className="relative overflow-hidden text-white" style={{ background: "oklch(0.18 0.04 160)" }}>
        <div className="absolute inset-0 opacity-[0.03]" aria-hidden style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28 relative">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider text-black rounded-full uppercase" style={{ background: "oklch(0.72 0.14 75)" }}>
                Flagship Project
              </span>
              <h2 className="mt-5 font-serif text-3xl sm:text-4xl text-white tracking-tight leading-none">
                CHIP™ – Climate Health Intelligence Platform
              </h2>
              <div className="mt-8 space-y-5 text-sm leading-relaxed text-white/80">
                <p>
                  At the heart of CPM Int'l is CHIP™ (Climate Health Intelligence Platform)—our flagship scientific framework.
                </p>
                <p>
                  CHIP™ is an AI-enabled Climate Health Digital Twin that continuously integrates climate observations, environmental intelligence, disease surveillance, laboratory diagnostics, pathogen genomics, satellite information, and predictive analytics into a unified decision-support ecosystem.
                </p>
                <p>
                  Rather than focusing solely on outbreak detection, CHIP™ enables predictive preparedness by simulating future risks, identifying emerging threats, and supporting timely public health interventions.
                </p>
              </div>
              <div className="mt-8">
                <Link to="/chip" className="inline-flex items-center gap-2 text-sm font-semibold transition-colors" style={{ color: "oklch(0.72 0.14 75)" }}>
                  Explore CHIP™ Technology <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-5 border border-white/10 p-8 rounded-lg" style={{ background: "oklch(0.15 0.03 160)" }}>
              <div className="font-serif text-lg leading-relaxed text-white italic">
                "Our vision is to transform health systems from reactive surveillance to predictive preparedness."
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Digital Twin", "AI Predictive Model", "Genomic Integration", "One Health Platform"].map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 bg-white/5 border border-white/10 text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7: Research That Matters ───────────────────────────── */}
      <section id="research-areas" className="bg-background hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Focus Areas</p>
              <h2 className="mt-4 font-serif text-3xl leading-[1.1] tracking-tight text-foreground lg:text-4xl">
                Research That Matters
              </h2>
              <div className="mt-3 h-0.5 w-16" style={{ background: "oklch(0.72 0.14 75)" }} aria-hidden />
              <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
                Our work addresses some of the world’s most pressing challenges. Every research programme is designed to generate knowledge that informs policy, strengthens healthcare systems, and improves community resilience.
              </p>
            </div>
            
            <div className="lg:col-span-7 bg-card border border-border p-8 lg:p-12 rounded-sm shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-6">Active Investigations</p>
              <ul className="grid gap-4 sm:grid-cols-2 text-sm text-foreground">
                {researchChallenges.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-primary opacity-80" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 8: Global Impact, Collaboration, Future ────────────────── */}
      <section id="outlook-future" className="bg-sky/5 hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-3">
            
            {/* Impact */}
            <div className="space-y-4">
              <span className="text-[10px] font-semibold tracking-wider text-primary uppercase">Reach</span>
              <h3 className="font-serif text-2xl text-foreground font-semibold">Innovation for Global Impact</h3>
              <div className="h-0.5 w-12" style={{ background: "oklch(0.72 0.14 75)" }} aria-hidden />
              <div className="text-sm leading-relaxed text-muted-foreground space-y-3">
                <p>
                  Innovation at CPM Int'l extends beyond scientific discovery. We develop intelligent digital platforms, predictive models, data integration systems, and decision-support technologies that enable partners to make informed decisions based on robust scientific evidence.
                </p>
                <p>
                  Our ambition is not simply to publish research, but to create innovations that improve health outcomes and strengthen resilience across Africa and the wider global community.
                </p>
              </div>
            </div>

            {/* Collaboration */}
            <div className="space-y-4">
              <span className="text-[10px] font-semibold tracking-wider text-primary uppercase">Networks</span>
              <h3 className="font-serif text-2xl text-foreground font-semibold">Collaboration Without Borders</h3>
              <div className="h-0.5 w-12" style={{ background: "oklch(0.72 0.14 75)" }} aria-hidden />
              <div className="text-sm leading-relaxed text-muted-foreground space-y-3">
                <p>
                  The challenges of climate change and health transcend national boundaries. For this reason, CPM Int'l actively promotes multidisciplinary and international collaboration with universities, teaching hospitals, research institutes, public health agencies, and development organizations.
                </p>
                <p>
                  We believe that meaningful scientific progress is achieved through partnerships built on shared knowledge, mutual respect, and a commitment to improving lives.
                </p>
              </div>
            </div>

            {/* Building Future */}
            <div className="space-y-4">
              <span className="text-[10px] font-semibold tracking-wider text-primary uppercase">Mandate</span>
              <h3 className="font-serif text-2xl text-foreground font-semibold">Building the Future</h3>
              <div className="h-0.5 w-12" style={{ background: "oklch(0.72 0.14 75)" }} aria-hidden />
              <p className="text-sm leading-relaxed text-muted-foreground">
                CPM Int'l is more than a research institute. It is a growing scientific ecosystem dedicated to:
              </p>
              <ul className="mt-4 space-y-2 text-xs text-foreground">
                {buildingFuturePoints.map(({ label }) => (
                  <li key={label} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span className="font-medium">{label}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── Section 9: Our Values ──────────────────────────────────────── */}
      <section id="values" className="bg-background hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Principles</p>
            <h2 className="mt-4 font-serif text-3xl leading-[1.1] tracking-tight text-foreground lg:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Everything we do is guided by six core values:
            </p>
          </div>
          
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, name, desc }) => (
              <div key={name} className="border border-border bg-card p-6 rounded-sm card-lift flex gap-4 items-start">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/5">
                  <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-foreground">{name}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 10: Our Invitation & Contact Details ───────────────── */}
      <section id="invitation" className="bg-sky/15 py-20 lg:py-28">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-stretch">
            
            {/* Invitation copy */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Joint Effort</p>
              <h2 className="mt-4 font-serif text-3xl tracking-tight text-foreground lg:text-4xl">Our Invitation</h2>
              <div className="mt-3 h-0.5 w-12" style={{ background: "oklch(0.72 0.14 75)" }} aria-hidden />
              
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Whether you are a researcher, clinician, policymaker, student, funder, or development partner, we invite you to join us in shaping a future where scientific discovery drives healthier communities and more resilient societies.
              </p>
              <p className="mt-4 text-sm font-medium text-foreground">
                Together, we can transform climate-health intelligence into action, innovation into impact, and collaboration into lasting solutions.
              </p>
              
              <div className="mt-8">
                <Link to="/" className="inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                  Back to Home <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>

            {/* Address Block Card */}
            <div className="lg:col-span-5 bg-card border border-border p-8 rounded-lg shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 h-1 w-full bg-primary" />
              <div>
                <h3 className="font-serif text-xl font-semibold text-foreground">CPM Int'l</h3>
                <p className="text-xs text-primary font-medium tracking-wide uppercase mt-1">Research Institute for Climate Health</p>
                
                <hr className="my-6 border-border" />
                
                <div className="space-y-4 text-xs text-muted-foreground">
                  <div className="flex gap-3">
                    <MapPin className="h-4.5 w-4.5 shrink-0 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Office Address</p>
                      <p className="mt-1 leading-relaxed">
                        7, Grand-mart Hub, Opposite Omololu Hospital, Akobo Ojuirin, Ibadan, Oyo State, Nigeria
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="h-4.5 w-4.5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="mt-1">info@cpm-institute.org</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="h-4.5 w-4.5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <p className="mt-1">+234 803 377 0933</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 border-t pt-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-center">
                Science · Innovation · Intelligence · Impact
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
