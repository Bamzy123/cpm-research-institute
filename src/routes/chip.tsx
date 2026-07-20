import { createFileRoute, Link } from "@tanstack/react-router";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Activity,
  Cpu,
  AlertCircle,
  Globe2,
  Dna,
  Monitor,
  Leaf,
  HeartPulse,
  Target,
} from "lucide-react";

export const Route = createFileRoute("/chip")({
  component: ChipPage,
  head: () => ({
    meta: [
      { title: "CHIP™ — Climate Health Intelligence Platform | CPM International Research Institute" },
      { name: "description", content: "CHIP™ is the flagship scientific innovation of CPM International Research Institute for Climate Health — an AI-enabled Climate Health Digital Twin for predictive public health." },
      { property: "og:title", content: "CHIP™ — Climate Health Intelligence Platform" },
      { property: "og:description", content: "The flagship scientific innovation of CPM International Research Institute for Climate Health." },
      { property: "og:type", content: "article" },
    ],
  }),
});

// ── Data ─────────────────────────────────────────────────────────────

const capabilities: { label: string; icon: typeof Activity }[] = [
  { label: "Climate-sensitive infectious disease surveillance", icon: Activity },
  { label: "AI-driven outbreak prediction", icon: Cpu },
  { label: "Early warning and risk intelligence", icon: AlertCircle },
  { label: "Environmental and satellite data integration", icon: Globe2 },
  { label: "Laboratory and pathogen genomic surveillance", icon: Dna },
  { label: "Digital decision-support systems", icon: Monitor },
  { label: "One Health implementation", icon: Leaf },
  { label: "Climate-resilient health systems", icon: HeartPulse },
  { label: "Resource prioritization and policy planning", icon: Target },
];

// ── Scroll-reveal hook ───────────────────────────────────────────────

function useInView(threshold = 0.12) {
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

/** Returns inline-style object for a reveal transition with optional delay (ms). */
function reveal(inView: boolean, delay = 0): CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : "translateY(22px)",
    transition: `opacity 650ms ease-out ${delay}ms, transform 650ms ease-out ${delay}ms`,
  };
}

// ── Component ────────────────────────────────────────────────────────

function ChipPage() {
  const heroSection    = useInView(0.05);
  const introSection   = useInView(0.1);
  const twinSection    = useInView(0.1);
  const capSection     = useInView(0.08);
  const visionSection  = useInView(0.1);
  const closingSection = useInView(0.15);
  const ackSection     = useInView(0.1);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-5 lg:px-10">
          <Link to="/" className="flex min-w-0 items-center">
            <img src="/cpm-logo.png" alt="CPM International Research Institute for Climate Health" className="h-10 md:h-12 w-auto object-contain mix-blend-multiply" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back to Institute
          </Link>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════
          1. HERO — full green band, dramatic headline, key stats
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-primary text-primary-foreground">
        <div ref={heroSection.ref} style={reveal(heroSection.inView)} className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-36">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-primary-foreground/70">CHIP™</p>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-[80px]">
            Climate Health<br className="hidden sm:block" /> Intelligence Platform
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
            CPM International Research Institute's Flagship Scientific Innovation — an AI-enabled Climate Health Digital Twin for predictive public health.
          </p>
          {/* Stat chips */}
          <div className="mt-14 flex flex-wrap gap-8">
            {[
              { n: "1", label: "Unified Platform" },
              { n: "1", label: "AI Engine" },
              { n: "1", label: "Digital Twin" },
              { n: "9", label: "Core Capabilities" },
            ].map(({ n, label }) => (
              <div key={label} className="border-l-2 border-primary-foreground/30 pl-5">
                <p className="font-serif text-4xl font-medium leading-none">{n}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-primary-foreground/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. WHAT IS CHIP™ — intro paragraphs + framework sidebar
      ══════════════════════════════════════════════════════════════ */}
      <section className="hairline-b">
        <div ref={introSection.ref} style={reveal(introSection.inView)} className="mx-auto grid max-w-[1400px] gap-16 px-6 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
          <div className="space-y-6 text-[17px] leading-relaxed text-foreground/85 lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">What is CHIP™?</p>
            <p>
              The Climate Health Intelligence Platform (CHIP™) is the flagship scientific innovation of CPM International Research Institute for Climate Health. It represents an AI-enabled Climate Health Digital Twin that transforms conventional public health surveillance into an intelligent, predictive, and continuously learning decision-support ecosystem.
            </p>
            <p>
              Unlike traditional surveillance systems that often respond after disease transmission has begun, CHIP™ integrates diverse streams of climate, environmental, epidemiological, laboratory, genomic, and geospatial intelligence into a single interoperable platform capable of simulating, predicting, visualizing, and supporting timely public health action.
            </p>
          </div>

          {/* Framework sidebar */}
          <aside className="lg:col-span-5 lg:border-l lg:border-border lg:pl-12">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Framework Architecture</p>
            <p className="mt-5 font-serif text-2xl leading-snug text-foreground">
              One platform · One harmonized database · One AI engine · One Digital Twin · One integrated dashboard
            </p>
            <div className="mt-8 space-y-3 border-t border-border pt-8">
              {["Climate science", "Microbiology", "Epidemiology", "Artificial intelligence", "Genomics", "Environmental science", "Clinical medicine", "Public health"].map((d) => (
                <div key={d} className="flex items-center gap-3">
                  <span className="h-1 w-1 shrink-0 bg-primary" aria-hidden />
                  <span className="text-sm text-muted-foreground">{d}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. DIGITAL TWIN — tinted section with pull-quote
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-secondary hairline-b">
        <div ref={twinSection.ref} style={reveal(twinSection.inView)} className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-2">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Digital Twin</p>
            </div>
            <div className="lg:col-span-10">
              <blockquote className="font-serif text-2xl leading-relaxed text-foreground lg:text-3xl">
                "A living digital representation of the climate–pathogen–host–health system — continuously updating with historical and real-time observations to enable advanced predictive analytics, scenario simulation, and evidence-informed decision-making."
              </blockquote>
              <p className="mt-8 max-w-3xl text-[17px] leading-relaxed text-foreground/80">
                The framework is built on a unified architecture comprising one platform, one harmonized database, one AI engine, one Digital Twin, and one integrated decision dashboard. This architecture allows multidisciplinary expertise from climate science, microbiology, epidemiology, artificial intelligence, genomics, environmental science, clinical medicine, and public health to converge within a single operational system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. CAPABILITIES — 3×3 interactive tile grid
      ══════════════════════════════════════════════════════════════ */}
      <section className="hairline-b">
        <div ref={capSection.ref} style={reveal(capSection.inView)} className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-12">
            <header className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Capabilities</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground lg:text-4xl">
                CHIP™ is designed to support
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Nine integrated capabilities that together form a comprehensive climate-health intelligence ecosystem.
              </p>
            </header>

            {/* Tile grid */}
            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
              {capabilities.map(({ label, icon: Icon }, i) => (
                <div
                  key={label}
                  className="group border border-border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md hover:shadow-primary/5"
                  style={reveal(capSection.inView, 80 + i * 40)}
                >
                  <div className="flex h-10 w-10 items-center justify-center border border-border text-primary transition-colors group-hover:border-primary/50 group-hover:bg-primary/5">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </div>
                  <p className="mt-4 font-serif text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-1 font-serif text-base leading-snug text-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. VISION — closing paragraphs + image slot
      ══════════════════════════════════════════════════════════════ */}
      <section className="hairline-b bg-background">
        <div ref={visionSection.ref} style={reveal(visionSection.inView)} className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="space-y-6 text-[17px] leading-relaxed text-foreground/85 lg:col-span-7">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Vision</p>
              <p>
                Beyond being a digital platform, CHIP™ represents a scientific framework for advancing predictive preparedness. It enables governments, hospitals, research institutions, and international partners to move from fragmented surveillance toward integrated intelligence that strengthens prevention, preparedness, response, and resilience.
              </p>
              <p>
                CPM International Research Institute envisions CHIP™ as a scalable framework that can support national surveillance systems, regional collaboration across Africa, and global partnerships in climate-health innovation.
              </p>
              <p>
                As the Institute's flagship innovation, CHIP™ embodies CPM's commitment to integrating science, digital technology, and multidisciplinary collaboration to build resilient health systems capable of anticipating rather than merely reacting to climate-sensitive public health threats.
              </p>
            </div>

            {/* ── IMAGE SLOT ───────────────────────────────────────────────────
                Replace this placeholder once you upload a real CHIP/lab/fieldwork
                photo. Import it with ?url and swap the <div> below for an <img>.

                Example:
                  import chipPhoto from "../assets/chip-photo.jpeg?url";
                  <img src={chipPhoto} alt="CHIP platform in use" className="h-full min-h-[320px] w-full object-cover lg:min-h-full" />
                ─────────────────────────────────────────────────────────────── */}
            <div className="flex min-h-[280px] items-center justify-center border border-border bg-secondary lg:col-span-5 lg:min-h-full">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Photo · Coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          6. CLOSING BAND — large CHIP™ wordmark, entrance animation
      ══════════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-primary text-primary-foreground">
        <div
          ref={closingSection.ref}
          className="mx-auto max-w-[1400px] px-6 py-28 text-center lg:px-10 lg:py-40"
          style={reveal(closingSection.inView)}
        >
          <p
            className="font-serif tracking-tight"
            style={{
              fontSize: "clamp(4rem, 14vw, 10rem)",
              lineHeight: 1,
              opacity: closingSection.inView ? 1 : 0,
              transform: closingSection.inView ? "none" : "translateY(30px)",
              transition: "opacity 900ms ease-out 100ms, transform 900ms ease-out 100ms",
            }}
          >
            CHIP™
          </p>

          {/* Animated word reveal */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {["Integrate", "Predict", "Protect", "Prepare"].map((word, i) => (
              <span
                key={word}
                className="text-sm font-medium uppercase tracking-[0.32em] text-primary-foreground/80"
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
            className="mx-auto mt-12 max-w-2xl text-base leading-relaxed text-primary-foreground/80"
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
          7. ACKNOWLEDGEMENTS
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-background">
        <div ref={ackSection.ref} style={reveal(ackSection.inView)} className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Acknowledgements</p>
            <div className="mt-6 space-y-5 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
              <p>
                CPM International Research Institute for Climate Health expresses its profound appreciation to the Director-General of the Nigeria Centre for Disease Control and Prevention (NCDC) for his visionary leadership, institutional support, and commitment to strengthening climate-sensitive disease surveillance and public health innovation in Nigeria.
              </p>
              <p>
                We are equally grateful to the Chief Medical Director and the management of the Obafemi Awolowo University Teaching Hospitals Complex (OAUTHC) for their invaluable collaboration, ethical oversight, and unwavering support in advancing this pioneering initiative. Their partnership has been instrumental in laying the foundation for a nationally relevant and internationally connected climate-health research and innovation ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-10 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="bg-white/95 px-2.5 py-1.5 rounded-md shadow-sm"><img src="/cpm-logo.png" alt="CPM Logo" className="h-8 md:h-10 w-auto object-contain mix-blend-multiply" /></div>
            <p>© {new Date().getFullYear()} CPM International Research Institute.</p>
          </div>
          <p className="text-xs uppercase tracking-[0.2em]">Research · Innovation · Education · Policy · Impact</p>
        </div>
      </footer>
    </div>
  );
}
