import { createFileRoute } from "@tanstack/react-router";
import React, { useState, type FormEvent } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  GraduationCap, BookOpen, Dna, Cpu, CheckCircle2,
  Calendar, Award, Users, ArrowRight, FileText, Send, Building2
} from "lucide-react";

export const Route = createFileRoute("/fellowships")({
  component: FellowshipsPage,
  head: () => ({
    meta: [
      { title: "Fellowships & Training Programmes | CPM Int'l Research Institute" },
      {
        name: "description",
        content:
          "Apply for CPM Int'l Research Institute Fellowships, Pathogen Genomics Traineeships, and AI Data Science Residencies hosted at Obafemi Awolowo University, Nigeria.",
      },
    ],
  }),
});

const fellowshipTracks = [
  {
    icon: GraduationCap,
    title: "Climate-Health Research Fellowship",
    duration: "12 Months (Full-Time Funded)",
    target: "Postdoctoral scholars & mid-career researchers",
    description: "Conduct cutting-edge interdisciplinary research on climate-driven disease dynamics, ecological modeling, and One Health frameworks under senior mentorship.",
    stipend: "Full living stipend, research allowance & conference travel grant included.",
  },
  {
    icon: Dna,
    title: "Pathogen Genomics & Molecular Diagnostics Traineeship",
    duration: "6 Months (Hands-on Lab Track)",
    target: "Microbiologists, bioinformaticians & lab scientists",
    description: "Master Next-Generation Sequencing (NGS) workflows, viral lineage identification, phylodynamic analysis, and antimicrobial resistance surveillance.",
    stipend: "Laboratory supplies provided + monthly training honorarium.",
  },
  {
    icon: Cpu,
    title: "CHIP™ AI & Digital Twin Data Science Residency",
    duration: "3 to 6 Months (Intensive Tech Track)",
    target: "Data scientists, AI engineers & spatial modelers",
    description: "Collaborate on machine learning algorithms, satellite climate data processing, and predictive outbreak modeling for the CHIP™ platform.",
    stipend: "High-performance compute access + monthly data stipend.",
  },
];

const eligibilityCriteria = [
  "Hold a Master's or Ph.D. in Public Health, Microbiology, Genomics, Environmental Science, Data Science, or related disciplines.",
  "Demonstrated commitment to climate-health research, One Health frameworks, or infectious disease surveillance in Africa.",
  "Proficiency in scientific writing and quantitative/computational analytical methods (R, Python, GIS, or laboratory NGS).",
  "Availability for physical or hybrid residency at Obafemi Awolowo University, Ile-Ife, Nigeria, or partner regional hubs.",
];

function FellowshipsPage() {
  const [selectedTrack, setSelectedTrack] = useState("Climate-Health Research Fellowship");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-border/60"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.05 230) 0%, oklch(0.24 0.08 220) 50%, oklch(0.16 0.04 230) 100%)",
        }}
      >
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em]" style={{ color: "oklch(0.72 0.14 75)" }}>
            Capacity Building & Scientific Excellence
          </p>
          <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.08] text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto">
            CPM Int'l Fellowship & Training Programmes
          </h1>
          <p className="mt-6 max-w-2xl text-base lg:text-lg leading-relaxed mx-auto" style={{ color: "oklch(0.82 0.03 220)" }}>
            Nurturing the next generation of climate health researchers, genomic scientists, and data science leaders across Africa and international research networks.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 border px-4 py-2 text-xs font-medium text-white" style={{ borderColor: "oklch(1 0 0 / 0.2)", background: "oklch(1 0 0 / 0.05)" }}>
            <Building2 className="h-4 w-4" style={{ color: "oklch(0.72 0.14 75)" }} />
            <span>Hosted at Obafemi Awolowo University, Ile-Ife, Nigeria</span>
          </div>
        </div>
      </section>

      {/* Fellowship Tracks */}
      <section className="bg-background py-16 lg:py-24 border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Specialized Tracks</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
              2026 Academic Fellowship Opportunities
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Select a fellowship track tailored to your scientific expertise and career growth objectives.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {fellowshipTracks.map((t) => (
              <div
                key={t.title}
                className="group border border-border bg-card p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors group-hover:bg-primary/15">
                    <t.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {t.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium">
                    <span className="border border-primary/30 bg-primary/5 px-2.5 py-1 text-primary">
                      {t.duration}
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-medium text-foreground">Target Candidates: <span className="text-muted-foreground font-normal">{t.target}</span></p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{t.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 text-xs">
                  <p className="font-medium text-foreground">Stipend & Support:</p>
                  <p className="mt-1 text-muted-foreground">{t.stipend}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTrack(t.title);
                      const el = document.getElementById("apply-form");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 border border-primary px-4 py-2 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition"
                  >
                    Apply for This Track <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility & Timeline */}
      <section className="bg-muted/30 py-16 lg:py-24 border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 items-center">

            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Requirements & Qualifications</p>
              <h2 className="font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                Who Should Apply?
              </h2>
              <p className="text-xs leading-relaxed text-muted-foreground">
                We seek dedicated researchers, clinicians, bioinformaticians, and data specialists passionate about solving complex climate health challenges.
              </p>

              <ul className="space-y-4 pt-2">
                {eligibilityCriteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs leading-relaxed text-foreground">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 border border-border bg-card p-6 lg:p-8 shadow-sm">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" /> 2026 Cohort Key Dates
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <span className="font-medium text-foreground">Applications Open:</span>
                  <span className="text-primary font-semibold">September 1, 2026</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <span className="font-medium text-foreground">Application Deadline:</span>
                  <span className="text-foreground font-semibold">November 15, 2026</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <span className="font-medium text-foreground">Interview & Selection:</span>
                  <span className="text-foreground font-semibold">December 1 – 15, 2026</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-medium text-foreground">Cohort Residency Commencement:</span>
                  <span className="text-primary font-semibold">February 1, 2027</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <div className="border border-border bg-card p-6 lg:p-10 shadow-lg">
            <h2 className="font-serif text-2xl font-semibold text-foreground">Fellowship Application Portal</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Submit your expression of interest for the 2026 Fellowship Cohort. Our academic committee reviews submissions on a rolling basis.
            </p>

            {submitted ? (
              <div className="mt-8 border border-primary/30 bg-primary/5 p-8 text-center" role="status">
                <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">Application Received</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                  Thank you for applying to the <strong>{selectedTrack}</strong>. Our Selection Secretariat will review your dossier and contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 border border-primary px-6 py-2.5 text-xs font-medium text-primary hover:bg-primary/10 transition"
                >
                  Submit Another Expression of Interest
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">

                {/* Track Selection */}
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">Select Fellowship Track <span className="text-destructive">*</span></label>
                  <select
                    value={selectedTrack}
                    onChange={(e) => setSelectedTrack(e.target.value)}
                    className="w-full border border-input bg-background px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  >
                    {fellowshipTracks.map((t) => (
                      <option key={t.title} value={t.title}>{t.title} ({t.duration})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-xs">
                    <span className="font-medium text-foreground">Full Name <span className="text-destructive">*</span></span>
                    <input required type="text" placeholder="Dr. Alex Morgan" className="border border-input bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-xs">
                    <span className="font-medium text-foreground">Email Address <span className="text-destructive">*</span></span>
                    <input required type="email" placeholder="alex@university.edu" className="border border-input bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none" />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-xs">
                    <span className="font-medium text-foreground">Current Institution / Organization <span className="text-destructive">*</span></span>
                    <input required type="text" placeholder="University of Ibadan / OAU" className="border border-input bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-xs">
                    <span className="font-medium text-foreground">Highest Academic Degree <span className="text-destructive">*</span></span>
                    <select className="border border-input bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none">
                      <option>Ph.D. / Doctorate</option>
                      <option>M.Sc. / M.P.H. / Master's</option>
                      <option>MBBS / M.D. (Medical Degree)</option>
                      <option>B.Sc. (Honours)</option>
                    </select>
                  </label>
                </div>

                <label className="flex flex-col gap-1.5 text-xs">
                  <span className="font-medium text-foreground">Brief Statement of Research Interest (Max 250 words) <span className="text-destructive">*</span></span>
                  <textarea required rows={4} placeholder="Summarize your background and how this fellowship aligns with your climate health research goals..." className="border border-input bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none resize-y" />
                </label>

                <label className="flex flex-col gap-1.5 text-xs">
                  <span className="font-medium text-foreground">Curriculum Vitae (CV) / Portfolio URL</span>
                  <input type="url" placeholder="https://linkedin.com/in/username or Google Drive link" className="border border-input bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none" />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                  style={{ background: "oklch(0.34 0.06 160)" }}
                >
                  {loading ? (
                    <>Submitting Application…</>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Submit Fellowship Application
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
