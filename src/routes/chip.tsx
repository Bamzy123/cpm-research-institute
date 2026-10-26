import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { InstituteLayout, PageIntro } from "../components/InstituteLayout";

import {
  Activity,
  Cpu,
  AlertCircle,
  Globe2,
  Dna,
  Monitor,
  Leaf,
  HeartPulse,
  Target,
  Microscope,
  Maximize2,
  X,
  Shield,
  Network,
} from "lucide-react";

export const Route = createFileRoute("/chip")({
  component: ChipPage,
  head: () => ({
    meta: [
      { title: "CHIP™: Climate Health Intelligence Platform | CPM Int'l Research Institute" },
      {
        name: "description",
        content:
          "CHIP™ is the flagship scientific innovation of CPM Int'l Research Institute for Climate Health, an AI-enabled Climate Health Digital Twin for predictive public health.",
      },
      { property: "og:title", content: "CHIP™: Climate Health Intelligence Platform" },
      {
        property: "og:description",
        content:
          "The flagship scientific innovation of CPM Int'l Research Institute for Climate Health.",
      },
      { property: "og:image", content: "/chip.jpeg" },
      { property: "og:type", content: "article" },
    ],
  }),
});

const capabilities: { label: string; icon: typeof Activity; desc: string }[] = [
  {
    label: "Climate-sensitive infectious disease surveillance",
    icon: Activity,
    desc: "Real-time surveillance integrating meteorological and epidemiological parameters.",
  },
  {
    label: "AI-driven outbreak prediction",
    icon: Cpu,
    desc: "Machine learning algorithms modeling pathogen spillover and transmission risks.",
  },
  {
    label: "Early warning and risk intelligence",
    icon: AlertCircle,
    desc: "Proactive alert systems to notify healthcare centers before disease surges.",
  },
  {
    label: "Environmental and satellite data integration",
    icon: Globe2,
    desc: "Remote sensing and environmental intelligence feeding predictive models.",
  },
  {
    label: "Laboratory and pathogen genomic surveillance",
    icon: Dna,
    desc: "High-throughput genomic variant tracking and drug resistance monitoring.",
  },
  {
    label: "Digital decision-support systems",
    icon: Monitor,
    desc: "Interactive executive dashboards translating complex data into policy actions.",
  },
  {
    label: "One Health implementation",
    icon: Leaf,
    desc: "Operationalizing human, animal, vector, and ecosystem health data streams.",
  },
  {
    label: "Climate-resilient health systems",
    icon: HeartPulse,
    desc: "Inoculating clinical networks against extreme weather shocks.",
  },
  {
    label: "Resource prioritization and policy planning",
    icon: Target,
    desc: "Evidence-based resource allocation and rapid response deployment.",
  },
];

function ChipPage() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  return (
    <InstituteLayout>
      {/* ══════════════════════════════════════════════════════════════
          1. HERO BAND: Full Green Band & Stat Chips
      ══════════════════════════════════════════════════════════════ */}
      <PageIntro
        eyebrow="Our research platform"
        title="Climate Health Intelligence Platform"
        description="CHIP™ brings climate, clinical, genomic and environmental intelligence together to support predictive public health."
        links={[
          { href: "#platform-diagram", label: "Platform overview" },
          { href: "#digital-twin", label: "The digital twin" },
          { href: "#capabilities", label: "Capabilities" },
          { href: "#institutional-partners", label: "Collaborations" },
        ]}
      />

      {/* ══════════════════════════════════════════════════════════════
          2. FEATURED ARTICLE MEDIA BANNER (/chip.jpeg)
      ══════════════════════════════════════════════════════════════ */}
      <section id="platform-diagram" className="border-b border-border/60 bg-card py-10 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <figure className="overflow-hidden border border-border bg-background">
            <div className="bg-white">
              <img
                src="/chip.jpeg"
                alt="Climate Health Intelligence Platform (CHIP™): AI Digital Twin Ecosystem"
                className="mx-auto max-h-[640px] w-full object-contain"
              />
            </div>
            <figcaption className="flex flex-col gap-5 border-t border-border p-5 sm:flex-row sm:items-start sm:justify-between sm:p-8">
              <div className="max-w-4xl">
                <p className="home-eyebrow mb-3">The CHIP™ framework</p>
                <p className="text-sm leading-6 text-muted-foreground">
                  The Climate Health Intelligence Platform (CHIP™): An AI-enabled Climate Health
                  Digital Twin integrating climate, environmental, epidemiological, laboratory,
                  genomic, and geospatial intelligence into a single predictive ecosystem.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="inline-flex shrink-0 items-center justify-center gap-2 border border-primary px-4 py-3 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Maximize2 className="h-4 w-4" aria-hidden /> View full image
              </button>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. MAIN ARTICLE NARRATIVE (WHAT IS CHIP™ & DIGITAL TWIN)
      ══════════════════════════════════════════════════════════════ */}
      <article id="digital-twin" className="border-b border-border/60 py-16 sm:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Main Article Body */}
            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-foreground/85 lg:col-span-7">
              <div className="home-eyebrow flex items-center gap-2">
                <Microscope className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden /> Flagship
                Scientific Innovation
              </div>

              <h2 className="text-foreground">
                Transforming Conventional Surveillance into Predictive Intelligence
              </h2>

              <p className="">
                The <strong>Climate Health Intelligence Platform (CHIP™)</strong> is the flagship
                scientific innovation of CPM International Research Institute for Climate Health. It
                represents an AI-enabled Climate Health Digital Twin that transforms conventional
                public health surveillance into an intelligent, predictive, and continuously
                learning decision-support ecosystem.
              </p>

              <p>
                Unlike traditional surveillance systems that often respond after disease
                transmission has begun, CHIP™ integrates diverse streams of climate, environmental,
                epidemiological, laboratory, genomic, and geospatial intelligence into a single
                interoperable platform capable of simulating, predicting, visualizing, and
                supporting timely public health action.
              </p>

              {/* Digital Twin Callout */}
              <div className="my-8 rounded-none border border-primary/20 bg-secondary/50 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                  The Climate Health Digital Twin
                </p>
                <blockquote className="font-serif text-xl sm:text-2xl leading-relaxed text-foreground italic">
                  "At the heart of CHIP™ is the concept of the Climate Health Digital Twin: a living
                  digital representation of the climate environment–pathogen–host–health system. By
                  continuously updating with historical and real-time observations, the Digital Twin
                  enables advanced predictive analytics, scenario simulation, and evidence-informed
                  decision-making for climate-sensitive infectious diseases."
                </blockquote>
              </div>

              <p>
                The framework is built on a unified architecture comprising{" "}
                <strong>
                  one platform, one harmonized database, one AI engine, one Digital Twin, and one
                  integrated decision dashboard
                </strong>
                . This architecture allows multidisciplinary expertise from climate science,
                microbiology, epidemiology, artificial intelligence, genomics, environmental
                science, clinical medicine, and public health to converge within a single
                operational system.
              </p>
            </div>

            {/* Framework Architecture Sidebar */}
            <aside className="rounded-none border border-border bg-card p-6 sm:p-8 lg:col-span-5 space-y-6">
              <div className="border-b border-border pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Unified Architecture
                </p>
                <h3 className="mt-2 text-foreground">One Operational Convergence Ecosystem</h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                CHIP™ bridges eight critical scientific disciplines into a single harmonized
                computational workflow:
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
                  <div
                    key={name}
                    className="flex items-center gap-2.5 rounded-none border border-border/80 bg-background p-3"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-xs font-medium text-foreground">{name}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6">
                <div className="rounded-none bg-primary/5 p-4 border border-primary/15">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Operational Pillars
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    1 Platform · 1 Harmonized DB · 1 AI Engine · 1 Digital Twin · 1 Decision
                    Dashboard
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* ══════════════════════════════════════════════════════════════
          4. CAPABILITIES: 3×3 Interactive Grid
      ══════════════════════════════════════════════════════════════ */}
      <section
        id="capabilities"
        className="border-b border-border/60 bg-secondary/40 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="max-w-3xl mb-12">
            <div className="home-eyebrow flex items-center gap-2">
              <Network className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden /> Integrated
              Capabilities
            </div>
            <h2 className="mt-4 text-foreground">CHIP™ is Designed to Support</h2>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              Nine integrated capabilities that together form a comprehensive climate-health
              intelligence ecosystem.
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ label, icon: Icon, desc }, i) => (
              <div
                key={label}
                className="group relative rounded-none border border-border bg-card p-6 transition-all duration-200 hover:border-primary/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-none border border-border bg-background text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/5">
                  <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                </div>
                <p className="mt-4 font-mono text-xs font-semibold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-foreground">{label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. VISION & PREDICTIVE PREPAREDNESS
      ══════════════════════════════════════════════════════════════ */}
      <article className="border-b border-border/60 py-16 sm:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-foreground/85 lg:col-span-7">
              <div className="home-eyebrow flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden /> Strategic
                Impact & Preparedness
              </div>

              <h2 className="text-foreground">
                A Scalable Scientific Framework for Africa and the World
              </h2>

              <p>
                Beyond being a digital platform, CHIP™ represents a scientific framework for
                advancing predictive preparedness. It enables governments, hospitals, research
                institutions, and international partners to move from fragmented surveillance toward
                integrated intelligence that strengthens prevention, preparedness, response, and
                resilience.
              </p>

              <p>
                CPM International Research Institute envisions CHIP™ as a scalable framework that
                can support national surveillance systems, regional collaboration across Africa, and
                global partnerships in climate-health innovation.
              </p>

              <p>
                As the Institute’s flagship innovation, CHIP™ embodies CPM Int’l’s commitment to
                integrating science, digital technology, and multidisciplinary collaboration to
                build resilient health systems capable of anticipating rather than merely reacting
                to climate-sensitive public health threats.
              </p>
            </div>

            {/* Visual Highlight Card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-none border border-primary/20 bg-secondary/40 p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-none bg-primary text-primary-foreground mb-6">
                  <Activity className="h-7 w-7" aria-hidden />
                </div>
                <h3 className="text-foreground">
                  Anticipating Public Health Threats Before Transmission Begins
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  CHIP™ replaces reactive epidemic response with continuous AI digital twin
                  simulation, converting weather parameters, satellite indices, and genomic reads
                  into actionable risk scores.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Integrate", "Predict", "Protect", "Prepare"].map((w) => (
                    <span
                      key={w}
                      className="rounded-none border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary"
                    >
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
          6. SIGNATURE GRAND CLOSING BAND: Wordmark & Motto
      ══════════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1320px] px-6 py-16 text-center sm:py-20 lg:px-10 lg:py-24">
          <p
            className="font-serif tracking-tight font-normal"
            style={{
              fontSize: "clamp(3.5rem, 13vw, 9.5rem)",
              lineHeight: 1,
            }}
          >
            CHIP™
          </p>

          {/* Platform principles */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-8">
            {["Integrate", "Predict", "Protect", "Prepare"].map((word) => (
              <span
                key={word}
                className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-[#d7bc76]"
              >
                {word}
              </span>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-base sm:text-lg leading-relaxed text-primary-foreground/85">
            The Signature Scientific Innovation of CPM International Research Institute for Climate
            Health.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          7. ACKNOWLEDGEMENTS & INSTITUTIONAL PARTNERS
      ══════════════════════════════════════════════════════════════ */}
      <section id="institutional-partners" className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl rounded-none border border-border bg-card p-6 sm:p-10">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-4">
              <Shield className="h-4 w-4" /> Institutional Acknowledgements
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground border-t border-border pt-4">
              <p>
                CPM Int'l Research Institute for Climate Health expresses its profound appreciation
                to the Director-General of the Nigeria Centre for Disease Control and Prevention
                (NCDC) for his visionary leadership, institutional support, and commitment to
                strengthening climate-sensitive disease surveillance and public health innovation in
                Nigeria.
              </p>
              <p>
                We are equally grateful to the Chief Medical Director and the management of the
                Obafemi Awolowo University Teaching Hospitals Complex (OAUTHC) for their invaluable
                collaboration, ethical oversight, and unwavering support in advancing this
                pioneering initiative. Their partnership has been instrumental in laying the
                foundation for a nationally relevant and internationally connected climate-health
                research and innovation ecosystem.
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
              className="max-h-[78vh] w-auto object-contain rounded-none"
            />
            <p className="mt-4 text-center text-sm font-medium text-white/90 max-w-3xl">
              Climate Health Intelligence Platform (CHIP™): AI-Enabled Climate Health Digital Twin
            </p>
          </div>
        </div>
      )}

      {/* ── Footer ─────────────────────────────────────────────────── */}
    </InstituteLayout>
  );
}
