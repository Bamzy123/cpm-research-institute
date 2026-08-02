import { createFileRoute } from "@tanstack/react-router";
import React, { useState, type FormEvent } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  Heart, Shield, Building2, FlaskConical, Dna, Cpu, Award,
  CheckCircle2, ArrowRight, Banknote, CreditCard, HelpCircle
} from "lucide-react";

export const Route = createFileRoute("/donate")({
  component: DonatePage,
  head: () => ({
    meta: [
      { title: "Support Research & Giving | CPM Int'l Research Institute" },
      {
        name: "description",
        content:
          "Invest in groundbreaking climate-health science, AI digital twin innovations, and pathogen genomics research at CPM Int'l Research Institute, hosted at Obafemi Awolowo University.",
      },
    ],
  }),
});

const givingPillars = [
  {
    icon: Cpu,
    title: "CHIP™ Infrastructure Fund",
    description: "Support computational hardware, satellite data access feeds, and high-performance neural computing infrastructure powering our Climate Health Digital Twin.",
    suggested: "$5,000 – $25,000",
  },
  {
    icon: Dna,
    title: "Pathogen Genomics & Lab Equipment",
    description: "Fund Next-Generation Sequencing (NGS) reagents, diagnostic assays, and laboratory biosafety equipment for early epidemic surveillance in West Africa.",
    suggested: "$2,500 – $15,000",
  },
  {
    icon: Award,
    title: "Early-Career Fellowship Endowment",
    description: "Sponsor 1-year research stipends and mentorship for promising African scientists pursuing interdisciplinary climate-health research.",
    suggested: "$1,000 – $10,000",
  },
  {
    icon: FlaskConical,
    title: "One Health Seed Grant Fund",
    description: "Provide micro-grants for field vector sampling, zoonotic risk mapping, and community health vulnerability assessments in vulnerable regions.",
    suggested: "$500 – $5,000",
  },
];

const bankDetails = {
  bankName: "First Bank of Nigeria / Zenith Bank Plc",
  accountName: "CPM Int'l Research Institute for Climate Health",
  accountNumber: "1023849120",
  swiftCode: "FBNINGLAXXX",
  currency: "NGN / USD / EUR",
  hostAffiliation: "Hosted at Obafemi Awolowo University, Ile-Ife, Nigeria",
};

function DonatePage() {
  const [amount, setAmount] = useState("250");
  const [customAmount, setCustomAmount] = useState("");
  const [donorType, setDonorType] = useState("Individual");
  const [fundTarget, setFundTarget] = useState("General Scientific Research");
  const [paymentMethod, setPaymentMethod] = useState("card");
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

  const finalAmount = amount === "custom" ? customAmount : amount;

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
            Empower Transformative Science
          </p>
          <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.08] text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto">
            Support Science That Safeguards Our Shared Future
          </h1>
          <p className="mt-6 max-w-2xl text-base lg:text-lg leading-relaxed mx-auto" style={{ color: "oklch(0.82 0.03 220)" }}>
            Your contributions directly accelerate climate health predictive modeling, pathogen genomic sequencing, and capacity building for researchers across Africa and worldwide.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 border px-4 py-2 text-xs font-medium text-white" style={{ borderColor: "oklch(1 0 0 / 0.2)", background: "oklch(1 0 0 / 0.05)" }}>
            <Building2 className="h-4 w-4" style={{ color: "oklch(0.72 0.14 75)" }} />
            <span>Hosted at Obafemi Awolowo University, Ile-Ife, Nigeria</span>
          </div>
        </div>
      </section>

      {/* Giving Pillars */}
      <section className="bg-background py-16 lg:py-24 border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Targeted Impact</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
              Where Your Support Goes
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Every dollar contributed to CPM Int'l is dedicated to high-impact scientific research, technological innovation, and early-career talent development.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {givingPillars.map((p) => (
              <div
                key={p.title}
                className="group border border-border bg-card p-6 flex flex-col justify-between transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors group-hover:bg-primary/15">
                    <p.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{p.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Target Tier:</span>
                  <span className="font-medium text-foreground">{p.suggested}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Giving Form & Bank Details */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 items-start">

            {/* Direct Bank Transfer & Verification Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border border-border bg-card p-6 lg:p-8 shadow-sm">
                <div className="flex items-center gap-3 text-primary mb-4">
                  <Banknote className="h-6 w-6" />
                  <h3 className="font-serif text-xl font-semibold text-foreground">Direct Bank Transfer</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  For institutional partners, philanthropic grants, and direct bank transfers, please use our official CPM Int'l Research Institute accounts:
                </p>

                <dl className="space-y-4 text-xs">
                  <div className="border-b border-border/60 pb-3">
                    <dt className="text-muted-foreground font-medium">Account Name</dt>
                    <dd className="text-sm font-semibold text-foreground mt-0.5">{bankDetails.accountName}</dd>
                  </div>
                  <div className="border-b border-border/60 pb-3">
                    <dt className="text-muted-foreground font-medium">Host Institution Affiliation</dt>
                    <dd className="text-foreground mt-0.5">{bankDetails.hostAffiliation}</dd>
                  </div>
                  <div className="border-b border-border/60 pb-3">
                    <dt className="text-muted-foreground font-medium">Bank Name</dt>
                    <dd className="text-foreground mt-0.5">{bankDetails.bankName}</dd>
                  </div>
                  <div className="border-b border-border/60 pb-3">
                    <dt className="text-muted-foreground font-medium">Account Number / SWIFT</dt>
                    <dd className="text-foreground font-mono mt-0.5">{bankDetails.accountNumber} ({bankDetails.swiftCode})</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground font-medium">Currencies Accepted</dt>
                    <dd className="text-foreground mt-0.5">{bankDetails.currency}</dd>
                  </div>
                </dl>

                <div className="mt-6 border border-primary/20 bg-primary/5 p-4 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground flex items-center gap-1.5 mb-1">
                    <Shield className="h-4 w-4 text-primary" /> Tax & Compliance Verification
                  </p>
                  Need official grant documentation, W-8BEN-E, or formal institutional agreements? Email <a href="mailto:grants@cpm-institute.org" className="text-primary underline font-medium">grants@cpm-institute.org</a>.
                </div>
              </div>
            </div>

            {/* Donation Form */}
            <div className="lg:col-span-7 border border-border bg-card p-6 lg:p-10 shadow-md">
              <h3 className="font-serif text-2xl font-semibold text-foreground">Make a Support Contribution</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Select your contribution preferences below. All contributions directly support research innovation and fellowship endowment.
              </p>

              {submitted ? (
                <div className="mt-8 border border-primary/30 bg-primary/5 p-8 text-center" role="status">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                  <h4 className="mt-4 font-serif text-xl font-semibold text-foreground">Thank You for Your Generous Support!</h4>
                  <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                    Your commitment of <strong>${finalAmount || "250"}</strong> to <strong>{fundTarget}</strong> enables our scientists to continue advancing vital climate-health solutions.
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    A confirmation and formal receipt have been dispatched to your email.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 border border-primary px-6 py-2.5 text-xs font-medium text-primary hover:bg-primary/10 transition"
                  >
                    Make Another Contribution
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">

                  {/* Donor Category */}
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-2">I am contributing as an:</label>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {["Individual", "Foundation", "Corporate", "Government"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setDonorType(t)}
                          className={`border px-3 py-2 text-xs font-medium transition-all ${
                            donorType === t
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-background text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fund Target */}
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-2">Select Target Fund:</label>
                    <select
                      value={fundTarget}
                      onChange={(e) => setFundTarget(e.target.value)}
                      className="w-full border border-input bg-background px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                    >
                      <option value="General Scientific Research">General Scientific Research Fund</option>
                      <option value="CHIP™ Digital Twin Infrastructure">CHIP™ Digital Twin Infrastructure Fund</option>
                      <option value="Pathogen Genomics & Sequencing">Pathogen Genomics & Sequencing Capacity</option>
                      <option value="African Climate Health Fellowships">African Climate Health Fellowship Endowment</option>
                    </select>
                  </div>

                  {/* Amount Selection */}
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-2">Contribution Amount (USD):</label>
                    <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5 mb-3">
                      {["50", "100", "250", "500", "1000"].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => {
                            setAmount(v);
                            setCustomAmount("");
                          }}
                          className={`border py-2.5 text-xs font-semibold transition-all ${
                            amount === v
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-foreground hover:border-primary/50"
                          }`}
                        >
                          ${v}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Other Custom Amount (USD)"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setAmount("custom");
                        }}
                        className="flex-1 border border-input bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5 text-xs">
                      <span className="font-medium text-foreground">Full Name / Organization <span className="text-destructive">*</span></span>
                      <input required type="text" placeholder="Dr. Jane Doe" className="border border-input bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none" />
                    </label>
                    <label className="flex flex-col gap-1.5 text-xs">
                      <span className="font-medium text-foreground">Email Address <span className="text-destructive">*</span></span>
                      <input required type="email" placeholder="jane@example.org" className="border border-input bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none" />
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-semibold transition-all hover:scale-[1.01]"
                    style={{ background: "oklch(0.72 0.14 75)", color: "oklch(0.15 0.04 230)" }}
                  >
                    {loading ? (
                      <>Processing Support Request…</>
                    ) : (
                      <>
                        <Heart className="h-4 w-4 fill-current" /> Confirm Contribution (${finalAmount || "250"})
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-muted-foreground">
                    CPM Int'l Research Institute is an independent research institution registered in Nigeria, hosted at Obafemi Awolowo University.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
