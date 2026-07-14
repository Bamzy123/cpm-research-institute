import { createFileRoute } from "@tanstack/react-router";
import {
  Layers, Network, Globe2, Building2, LineChart, BookOpen,
  GraduationCap, Scale, Cpu, Dna, Leaf, FlaskConical,
  HeartPulse, Compass, ArrowRight, Search, Sparkles, MapPin,
  Activity, Thermometer, CloudRain, Bug, Satellite, AlertTriangle,
  ArrowUpRight, Play,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const strengths = [
  { icon: Layers, title: "14 Multidisciplinary Research Programmes", body: "Cutting-edge research across climate health, infectious diseases, laboratory medicine, genomics, AI, antimicrobial resistance, digital public health and One Health." },
  { icon: Network, title: "Climate–Pathogen Nexus (CP-Nexus)", body: "Our flagship scientific innovation integrating climate science, pathogen biology, genomics, AI, epidemiology, and decision-support systems." },
  { icon: Globe2, title: "Global Research Partnerships", body: "Strategic collaborations with universities, research institutes, governments, teaching hospitals, and multilateral organizations worldwide." },
  { icon: Building2, title: "Centre of Excellence Initiative", body: "Championing the Obafemi Awolowo University International Centre of Excellence for Climate Health Intelligence and One Health Innovation." },
  { icon: LineChart, title: "Climate Health Intelligence Dashboard", body: "An integrated digital platform combining climate data, disease surveillance, genomics, AI, and geospatial intelligence." },
  { icon: BookOpen, title: "Publications & Knowledge Translation", body: "High-quality peer-reviewed publications, technical reports, and policy briefs that inform national and international health policy." },
  { icon: GraduationCap, title: "Education, Training & Fellowships", body: "Building the next generation of scientists through postgraduate education, fellowships, internships and scientific exchange." },
  { icon: Scale, title: "Research for Policy and Impact", body: "Transforming scientific evidence into practical solutions for health systems, epidemic preparedness and climate adaptation." },
  { icon: Cpu, title: "Innovation and Digital Health", body: "Harnessing AI, bioinformatics, digital epidemiology and advanced analytics for prediction, surveillance and diagnostics." },
  { icon: Dna, title: "Pathogenomics & Genomic Surveillance", body: "Advancing molecular epidemiology and genomic surveillance for pathogens with epidemic and pandemic potential." },
  { icon: Leaf, title: "One Health Leadership", body: "Integrated research recognizing the interconnectedness of human, animal, plant and environmental health." },
  { icon: FlaskConical, title: "Laboratory Excellence", body: "Molecular diagnostics, quality management, biospecimen repositories and advanced research infrastructure." },
  { icon: HeartPulse, title: "Health Systems Innovation", body: "Resilient, evidence-informed health systems through implementation research and digital transformation." },
  { icon: Compass, title: "Global Scientific Leadership", body: "Positioning Africa at the forefront of climate-health research through equitable international collaboration." },
];

const glance = [
  { n: "14", label: "Research Programmes" },
  { n: "1", label: "Flagship Framework — Climate–Pathogen Nexus" },
  { n: "1", label: "Climate Health Intelligence Platform" },
  { n: "1", label: "Proposed International Centre of Excellence" },
  { n: "∞", label: "International Research Partnerships" },
  { n: "◍", label: "Global Scientific Collaboration Network" },
];

const dashboardTiles = [
  { icon: Thermometer, label: "Heat stress index", value: "38.4°C", trend: "+1.2 vs. 10-yr mean", tone: "text-orange-600" },
  { icon: CloudRain, label: "Rainfall anomaly", value: "−22%", trend: "West-African monsoon window", tone: "text-primary" },
  { icon: Bug, label: "Arbovirus signal", value: "Elevated", trend: "Lagos · Ibadan · Abidjan clusters", tone: "text-destructive" },
  { icon: Dna, label: "Genomic sequences", value: "12,847", trend: "Uploaded this quarter", tone: "text-accent" },
  { icon: Satellite, label: "Sentinel sites active", value: "146 / 152", trend: "Across 9 partner countries", tone: "text-primary" },
  { icon: AlertTriangle, label: "AI outbreak forecasts", value: "3 watch", trend: "Cholera · Lassa · Dengue", tone: "text-orange-600" },
];

const partners = [
  { country: "Nigeria", city: "Ile-Ife · Lagos · Abuja", projects: 24, tone: "bg-accent" },
  { country: "Germany", city: "Berlin · Heidelberg", projects: 9, tone: "bg-primary" },
  { country: "United Kingdom", city: "London · Oxford", projects: 7, tone: "bg-primary" },
  { country: "United States", city: "Boston · Atlanta", projects: 11, tone: "bg-primary" },
  { country: "Japan", city: "Tokyo · Nagasaki", projects: 4, tone: "bg-primary" },
  { country: "Canada", city: "Toronto · Montréal", projects: 5, tone: "bg-primary" },
  { country: "Kenya", city: "Nairobi · Kilifi", projects: 8, tone: "bg-accent" },
  { country: "Senegal", city: "Dakar", projects: 3, tone: "bg-accent" },
];

const news = [
  { tag: "Publication", date: "12 Jul 2026", title: "Rainfall variability and Lassa fever emergence: a 20-year retrospective across West Africa", journal: "Lancet Planetary Health" },
  { tag: "Programme", date: "04 Jul 2026", title: "CP-Nexus consortium expands to nine African sentinel sites for integrated arbovirus surveillance", journal: "CPM Newsroom" },
  { tag: "Policy", date: "28 Jun 2026", title: "Briefing to the African Union on climate-informed epidemic preparedness architecture", journal: "Policy Brief 04/2026" },
  { tag: "Fellowship", date: "20 Jun 2026", title: "Applications open — CPM–OAU International Fellowship in Climate Health Intelligence", journal: "Education" },
];

const observatory = [
  { icon: Thermometer, label: "Heat & humidity" },
  { icon: CloudRain, label: "Precipitation" },
  { icon: Bug, label: "Vector ecology" },
  { icon: Dna, label: "Genomic surveillance" },
  { icon: Activity, label: "Syndromic signals" },
  { icon: Satellite, label: "Earth observation" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="hairline-b sticky top-0 z-40 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-5 lg:px-10">
          <a href="/" className="flex min-w-0 items-baseline gap-3">
            <span className="font-serif text-2xl font-medium tracking-tight text-primary">CPM</span>
            <span className="hidden truncate text-xs uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              International Research Institute for Climate Health
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/80 lg:flex">
            <a href="#institute" className="hover:text-primary">Institute</a>
            <a href="#research" className="hover:text-primary">Research</a>
            <a href="#dashboard" className="hover:text-primary">Intelligence</a>
            <a href="#observatory" className="hover:text-primary">Observatory</a>
            <a href="#partners" className="hover:text-primary">Partners</a>
            <a href="#news" className="hover:text-primary">Newsroom</a>
            <a href="#careers" className="hover:text-primary">Careers</a>
          </nav>
          <button className="hidden items-center gap-2 border border-foreground/20 px-3 py-2 text-xs uppercase tracking-[0.16em] text-foreground/70 hover:border-foreground/60 md:inline-flex">
            <Search className="h-3.5 w-3.5" /> Search
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hairline-b relative overflow-hidden">
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
                CPM generates transformative scientific knowledge at the intersection of climate, pathogens, genomics and artificial intelligence — strengthening health security in Africa and contributing to global scientific advancement.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#dashboard" className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                  Open the Intelligence Dashboard <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#nexus" className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3 text-sm font-medium text-foreground transition hover:border-foreground/60">
                  <Play className="h-3.5 w-3.5" /> The CP-Nexus explained
                </a>
              </div>
            </div>
            <aside className="lg:col-span-4 lg:border-l lg:border-border lg:pl-10">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Ask CPM · AI research assistant</p>
              <div className="mt-4 border border-border bg-card p-5">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <p className="font-serif text-lg leading-snug text-foreground">
                    "Show me climate-health research in West Africa."
                  </p>
                </div>
                <div className="mt-5 space-y-2 text-xs text-muted-foreground">
                  <p className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent" /> 148 publications · 32 projects</p>
                  <p className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent" /> 4 dashboards · 27 experts</p>
                  <p className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent" /> 9 active policy briefs</p>
                </div>
                <a href="#assistant" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  Try the assistant <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Climate Health Intelligence Dashboard preview */}
      <section id="dashboard" className="hairline-b bg-secondary/40">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <header className="lg:col-span-6">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Signature platform</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight lg:text-5xl">
                Climate Health Intelligence Dashboard
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                A living operational picture of climate, pathogens and populations — live maps, alerts, disease trends and AI-driven outbreak forecasts, integrated in one scientific instrument.
              </p>
            </header>
            <div className="lg:col-span-6 lg:text-right">
              <a href="#dashboard" className="inline-flex items-center gap-2 border border-primary/40 bg-background px-5 py-3 text-sm font-medium text-primary transition hover:border-primary">
                Enter the dashboard <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {dashboardTiles.map(({ icon: Icon, label, value, trend, tone }) => (
              <div key={label} className="bg-background p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
                  <Icon className={`h-4 w-4 ${tone}`} strokeWidth={1.5} />
                </div>
                <p className={`mt-4 font-serif text-4xl leading-none tracking-tight ${tone}`}>{value}</p>
                <p className="mt-3 text-xs text-muted-foreground">{trend}</p>
                <div className="mt-5 flex h-8 items-end gap-[3px]">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-full bg-foreground/15"
                      style={{ height: `${20 + ((i * 37) % 80)}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CP-Nexus */}
      <section id="nexus" className="hairline-b bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground/70">Our signature science</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight lg:text-6xl">
                The Climate–Pathogen Nexus
              </h2>
              <p className="mt-6 text-base leading-relaxed text-primary-foreground/80">
                CP-Nexus is CPM's original scientific framework — a coupled model of how a changing climate reshapes the biology, ecology and transmission of pathogens, and how AI and genomics can turn that understanding into anticipation.
              </p>
              <p className="mt-4 text-sm uppercase tracking-[0.22em] text-primary-foreground/60">
                Climate · Pathogens · Genomics · AI · Populations
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-px bg-primary-foreground/15 sm:grid-cols-2">
                {[
                  { t: "Climate forcing", b: "Temperature, humidity, rainfall and extreme-event drivers modelled at continental resolution." },
                  { t: "Pathogen biology", b: "Vector competence, reservoir dynamics and pathogen evolution under environmental stress." },
                  { t: "Genomic surveillance", b: "Real-time sequencing pipelines tracing lineages, resistance and spillover." },
                  { t: "AI decision support", b: "Forecast models translating signals into actionable warnings for ministries and clinicians." },
                ].map((c) => (
                  <div key={c.t} className="bg-primary p-8">
                    <h3 className="font-serif text-xl">{c.t}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">{c.b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why CPM */}
      <section id="institute" className="hairline-b bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <header className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Why CPM?</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight lg:text-5xl">
                Advancing climate health intelligence through science, innovation and global partnership
              </h2>
            </header>
            <div className="lg:col-span-8 lg:pt-3">
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                CPM is committed to generating transformative scientific knowledge that addresses the evolving health challenges of a changing climate. Our multidisciplinary approach integrates research, innovation, education, technology, and policy to strengthen health security in Africa and contribute to global scientific advancement.
              </p>
            </div>
          </div>

          <div id="research" className="mt-16">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Our strategic strengths</p>
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
                  <h3 className="mt-6 font-serif text-lg leading-snug text-foreground">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Partnership Map */}
      <section id="partners" className="hairline-b bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <header className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">International network</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight lg:text-5xl">
                Global partnership map
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Interactive collaborations across continents. Explore active projects, partner institutions, scientists, funding and publications country by country.
              </p>
              <a href="#partners" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                Open interactive map <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </header>
            <div className="lg:col-span-8">
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-border bg-secondary/50">
                {/* Stylized world grid */}
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                {/* Dots */}
                {[
                  { top: "38%", left: "48%" }, // Nigeria
                  { top: "28%", left: "51%" }, // Germany
                  { top: "26%", left: "47%" }, // UK
                  { top: "34%", left: "24%" }, // US
                  { top: "36%", left: "82%" }, // Japan
                  { top: "26%", left: "22%" }, // Canada
                  { top: "48%", left: "56%" }, // Kenya
                  { top: "40%", left: "45%" }, // Senegal
                ].map((p, i) => (
                  <span key={i} className="absolute" style={{ top: p.top, left: p.left }}>
                    <span className="absolute -inset-2 animate-ping rounded-full bg-accent/40" />
                    <span className="relative block h-2.5 w-2.5 rounded-full bg-accent shadow" />
                  </span>
                ))}
                <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Illustrative · live map in the platform
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4">
                {partners.map((p) => (
                  <button key={p.country} className="group flex flex-col items-start bg-background p-4 text-left transition hover:bg-secondary">
                    <span className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {p.country}
                    </span>
                    <span className="mt-2 font-serif text-lg text-foreground">{p.projects} projects</span>
                    <span className="mt-1 text-xs text-muted-foreground">{p.city}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Research Assistant */}
      <section id="assistant" className="hairline-b bg-secondary/40">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Ask CPM</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight lg:text-5xl">
                An AI research assistant for a scientific institute
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Ask a question in natural language. Ask CPM retrieves publications, projects, dashboards, experts and policy briefs — grounded in the Institute's own scientific record.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="border border-border bg-background p-6">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Live query</span>
                </div>
                <p className="mt-6 font-serif text-2xl leading-snug text-foreground">
                  "Which pathogens are most sensitive to rising temperatures across the Sahel, and where are we sequencing them?"
                </p>
                <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                  {[
                    "42 peer-reviewed publications (2018–2026)",
                    "7 active surveillance projects in 4 countries",
                    "3 CP-Nexus dashboards with live signals",
                    "12 CPM scientists and affiliated experts",
                  ].map((r) => (
                    <div key={r} className="flex items-start gap-2 border border-border p-3 text-muted-foreground">
                      <ArrowRight className="mt-0.5 h-3.5 w-3.5 text-accent" /> {r}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 border border-border bg-secondary/40 p-3">
                  <input
                    placeholder="Ask CPM a research question…"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <button className="inline-flex items-center gap-1 bg-primary px-3 py-2 text-xs font-medium text-primary-foreground">
                    Ask <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Climate Observatory */}
      <section id="observatory" className="hairline-b bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <header className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">A destination, not a brochure</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight lg:text-5xl">
                The CPM Climate Observatory
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                An open scientific observatory bringing together heat maps, rainfall, vector ecology, genomic surveillance, environmental risk indicators and predictive analytics.
              </p>
              <a href="#observatory" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                Enter the observatory <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </header>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
                {observatory.map(({ icon: Icon, label }) => (
                  <div key={label} className="group relative flex aspect-square flex-col justify-between bg-card p-5 transition hover:bg-primary hover:text-primary-foreground">
                    <Icon className="h-5 w-5 text-primary transition group-hover:text-primary-foreground" strokeWidth={1.5} />
                    <div>
                      <p className="font-serif text-lg leading-tight">{label}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground group-hover:text-primary-foreground/70">Live layer</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsroom */}
      <section id="news" className="hairline-b bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Newsroom</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight lg:text-5xl">
                Publications, programmes and policy
              </h2>
            </div>
            <a href="#news" className="hidden shrink-0 items-center gap-2 text-sm font-medium text-primary hover:underline md:inline-flex">
              All updates <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {news.map((n) => (
              <article key={n.title} className="group flex flex-col justify-between bg-background p-8 transition hover:bg-secondary">
                <div>
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <span className="bg-accent/10 px-2 py-1 text-accent">{n.tag}</span>
                    <span>{n.date}</span>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl leading-snug text-foreground group-hover:text-primary">{n.title}</h3>
                </div>
                <div className="mt-8 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{n.journal}</span>
                  <ArrowUpRight className="h-4 w-4 transition group-hover:text-primary" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CPM at a Glance */}
      <section id="glance" className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <header className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground/70">By the numbers</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight lg:text-5xl">
                CPM at a glance
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
                    <dd className="mt-4 text-sm leading-relaxed text-primary-foreground/80">{g.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section id="careers" className="hairline-b bg-background">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-20 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Join CPM</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight lg:text-5xl">
              Build the science of a healthier, more resilient world.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Fellowships, postdoctoral positions, PhD tracks, laboratory scientists, epidemiologists, data engineers and AI researchers. CPM is recruiting across all 14 programmes.
            </p>
          </div>
          <div className="flex items-end gap-3 lg:col-span-5 lg:justify-end">
            <a href="#careers" className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Open positions <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#careers" className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3 text-sm font-medium text-foreground hover:border-foreground/60">
              Fellowships
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hairline-t bg-background">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-6 py-14 text-sm text-muted-foreground lg:grid-cols-4 lg:px-10">
          <div className="lg:col-span-2">
            <p className="font-serif text-xl text-primary">CPM International Research Institute for Climate Health</p>
            <p className="mt-3 max-w-md text-sm">
              Advancing climate health intelligence through science, innovation and global partnership.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground">Institute</p>
            <ul className="mt-4 space-y-2">
              <li><a href="#institute" className="hover:text-primary">About</a></li>
              <li><a href="#research" className="hover:text-primary">Research</a></li>
              <li><a href="#partners" className="hover:text-primary">Partners</a></li>
              <li><a href="#careers" className="hover:text-primary">Careers</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground">Platforms</p>
            <ul className="mt-4 space-y-2">
              <li><a href="#dashboard" className="hover:text-primary">Intelligence Dashboard</a></li>
              <li><a href="#observatory" className="hover:text-primary">Climate Observatory</a></li>
              <li><a href="#assistant" className="hover:text-primary">Ask CPM · AI Assistant</a></li>
              <li><a href="#nexus" className="hover:text-primary">CP-Nexus</a></li>
            </ul>
          </div>
        </div>
        <div className="hairline-t">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-6 py-6 text-xs text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <p>© {new Date().getFullYear()} CPM International Research Institute for Climate Health.</p>
            <p className="uppercase tracking-[0.2em]">Science · Innovation · Global Partnership</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
