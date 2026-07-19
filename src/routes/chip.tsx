import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

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

const capabilities = [
  "Climate-sensitive infectious disease surveillance",
  "AI-driven outbreak prediction",
  "Early warning and risk intelligence",
  "Environmental and satellite data integration",
  "Laboratory and pathogen genomic surveillance",
  "Digital decision-support systems",
  "One Health implementation",
  "Climate-resilient health systems",
  "Resource prioritization and policy planning",
];

function ChipPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-5 lg:px-10">
          <Link to="/" className="flex min-w-0 items-baseline gap-3">
            <span className="font-serif text-2xl font-medium tracking-tight text-primary">CPM</span>
            <span className="hidden truncate text-xs uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              International Research Institute for Climate Health
            </span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back to Institute
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">CHIP™</p>
          <h1 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[68px]">
            Climate Health Intelligence Platform
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            CPM International Research Institute's Flagship Scientific Innovation
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="hairline-b">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-20 lg:grid-cols-12 lg:px-10 lg:py-24">
          <div className="space-y-6 text-[17px] leading-relaxed text-foreground/85 lg:col-span-8">
            <p>
              The Climate Health Intelligence Platform (CHIP™) is the flagship scientific innovation of CPM International Research Institute for Climate Health. It represents an AI-enabled Climate Health Digital Twin that transforms conventional public health surveillance into an intelligent, predictive, and continuously learning decision-support ecosystem.
            </p>
            <p>
              Unlike traditional surveillance systems that often respond after disease transmission has begun, CHIP™ integrates diverse streams of climate, environmental, epidemiological, laboratory, genomic, and geospatial intelligence into a single interoperable platform capable of simulating, predicting, visualizing, and supporting timely public health action.
            </p>
            <p>
              At the heart of CHIP™ is the concept of the Climate Health Digital Twin — a living digital representation of the climate environment–pathogen–host–health system. By continuously updating with historical and real-time observations, the Digital Twin enables advanced predictive analytics, scenario simulation, and evidence-informed decision-making for climate-sensitive infectious diseases.
            </p>
            <p>
              The framework is built on a unified architecture comprising one platform, one harmonized database, one AI engine, one Digital Twin, and one integrated decision dashboard. This architecture allows multidisciplinary expertise from climate science, microbiology, epidemiology, artificial intelligence, genomics, environmental science, clinical medicine, and public health to converge within a single operational system.
            </p>
          </div>
          <aside className="lg:col-span-4 lg:border-l lg:border-border lg:pl-10">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Framework</p>
            <p className="mt-4 font-serif text-2xl leading-snug text-foreground">
              One platform · One database · One AI engine · One Digital Twin · One dashboard
            </p>
          </aside>
        </div>
      </section>

      {/* Designed to support */}
      <section className="hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Capabilities</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground lg:text-4xl">
            CHIP™ is designed to support
          </h2>
          <ul className="mt-12 border-t border-border">
            {capabilities.map((c, i) => (
              <li key={c} className="grid grid-cols-[3rem_1fr] items-baseline gap-6 border-b border-border py-6">
                <span className="font-serif text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif text-lg text-foreground md:text-xl">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing paragraphs */}
      <section className="hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="space-y-6 text-[17px] leading-relaxed text-foreground/85 lg:col-span-8 lg:col-start-3">
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
          </div>
        </div>
      </section>

      {/* Signature closing block */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1400px] px-6 py-24 text-center lg:px-10 lg:py-32">
          <p className="font-serif text-6xl tracking-tight lg:text-7xl">CHIP™</p>
          <p className="mt-8 text-sm font-medium uppercase tracking-[0.32em] text-primary-foreground/85">
            Integrate · Predict · Protect · Prepare
          </p>
          <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-primary-foreground/85">
            The Signature Scientific Innovation of CPM International Research Institute for Climate Health.
          </p>
        </div>
      </section>

      {/* Acknowledgements */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
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

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-10 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} CPM International Research Institute for Climate Health · Hosted at Obafemi Awolowo University.</p>
          <p className="text-xs uppercase tracking-[0.2em]">Research · Innovation · Education · Policy · Impact</p>
        </div>
      </footer>
    </div>
  );
}
