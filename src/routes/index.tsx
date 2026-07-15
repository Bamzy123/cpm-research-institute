import { createFileRoute } from "@tanstack/react-router";
import {
  Layers, Network, Globe2, Building2, LineChart, BookOpen,
  GraduationCap, Scale, Cpu, Dna, Leaf, FlaskConical,
  HeartPulse, Compass, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const strengths = [
  { icon: Layers, title: "14 Multidisciplinary Research Programmes", body: "Driving cutting-edge research across climate health, infectious diseases, laboratory medicine, genomics, artificial intelligence, antimicrobial resistance, digital public health, and One Health." },
  { icon: Network, title: "Climate–Pathogen Nexus (CP-Nexus)", body: "Our flagship scientific innovation integrating climate science, pathogen biology, genomics, artificial intelligence, epidemiology, and decision-support systems to strengthen predictive disease surveillance and epidemic preparedness." },
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

const glance = [
  { n: "14", label: "Research Programmes" },
  { n: "1", label: "Flagship Scientific Framework — Climate–Pathogen Nexus" },
  { n: "1", label: "Climate Health Intelligence Platform" },
  { n: "1", label: "Proposed International Centre of Excellence" },
  { n: "∞", label: "International Research Partnerships" },
  { n: "◍", label: "Global Scientific Collaboration Network" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
          <a href="/" className="flex items-baseline gap-3">
            <span className="font-serif text-2xl font-medium tracking-tight text-primary">CPM</span>
            <span className="hidden text-xs uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              International Research Institute for Climate Health
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
            <a href="#why" className="hover:text-primary">Institute</a>
            <a href="#why" className="hover:text-primary">Research</a>
            <a href="#glance" className="hover:text-primary">Impact</a>
            <a href="#why" className="hover:text-primary">Newsroom</a>
            <a href="#why" className="hover:text-primary">Careers</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hairline-b">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-accent">
                Climate Health Intelligence · Africa · Worldwide
              </p>
              <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[76px]">
                Advancing the science of a changing climate — for the health of people, animals and the planet.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                The CPM International Research Institute for Climate Health generates transformative scientific knowledge at the intersection of climate, pathogens, genomics and artificial intelligence — strengthening health security in Africa and contributing to global scientific advancement.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#why" className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                  Discover the Institute <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#glance" className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3 text-sm font-medium text-foreground transition hover:border-foreground/60">
                  CPM at a Glance
                </a>
              </div>
            </div>
            <aside className="lg:col-span-4 lg:border-l lg:border-border lg:pl-10">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">In focus</p>
              <h3 className="mt-4 font-serif text-2xl leading-tight text-foreground">
                The Climate–Pathogen Nexus
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Our flagship framework integrates climate science, pathogen biology, genomics and AI-driven decision support to anticipate and contain the epidemics of tomorrow.
              </p>
              <a href="#why" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                Read the science <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* Why CPM */}
      <section id="why" className="hairline-b bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <header className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Why CPM?</p>
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
            <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {strengths.map(({ icon: Icon, title, body }, i) => (
                <article
                  key={title}
                  className="group relative flex flex-col bg-card p-8 transition duration-300 hover:bg-secondary"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center border border-primary/20 bg-primary/5 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <span className="font-serif text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-serif text-lg leading-snug text-foreground">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CPM at a Glance */}
      <section id="glance" className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <header className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground/70">
                By the numbers
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight lg:text-5xl">
                CPM at a Glance
              </h2>
              <p className="mt-6 text-sm uppercase tracking-[0.22em] text-primary-foreground/70">
                Research · Innovation · Education · Policy · Impact
              </p>
            </header>
            <div className="lg:col-span-8">
              <dl className="grid grid-cols-2 gap-px overflow-hidden bg-primary-foreground/15 md:grid-cols-3">
                {glance.map((g) => (
                  <div key={g.label} className="bg-primary p-8">
                    <dt className="font-serif text-5xl leading-none tracking-tight">{g.n}</dt>
                    <dd className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
                      {g.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hairline-t bg-background">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-10 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p>
            © {new Date().getFullYear()} CPM International Research Institute for Climate Health.
          </p>
          <p className="text-xs uppercase tracking-[0.2em]">
            Science · Innovation · Global Partnership
          </p>
        </div>
      </footer>
    </div>
  );
}
