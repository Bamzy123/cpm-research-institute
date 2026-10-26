import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { InstituteLayout, PageIntro } from "../components/InstituteLayout";
import {
  Heart,
  Shield,
  FlaskConical,
  Dna,
  Cpu,
  Award,
  CheckCircle2,
  Banknote,
} from "lucide-react";

export const Route = createFileRoute("/donate")({
  component: DonatePage,
  head: () => ({
    meta: [
      { title: "Support Research & Giving | CPM Int'l Research Institute" },
      {
        name: "description",
        content:
          "Support climate-health science, AI innovation and pathogen genomics research at CPM Int'l Research Institute in Ibadan, Oyo State, Nigeria.",
      },
    ],
  }),
});

const givingPillars = [
  {
    icon: Cpu,
    title: "CHIP™ Infrastructure Fund",
    description:
      "Support computational hardware, satellite data access feeds, and high-performance neural computing infrastructure powering our Climate Health Digital Twin.",
    suggested: "$5,000 – $25,000",
  },
  {
    icon: Dna,
    title: "Pathogen Genomics & Lab Equipment",
    description:
      "Fund Next-Generation Sequencing (NGS) reagents, diagnostic assays, and laboratory biosafety equipment for early epidemic surveillance in West Africa.",
    suggested: "$2,500 – $15,000",
  },
  {
    icon: Award,
    title: "Early-Career Fellowship Endowment",
    description:
      "Sponsor 1-year research stipends and mentorship for promising African scientists pursuing interdisciplinary climate-health research.",
    suggested: "$1,000 – $10,000",
  },
  {
    icon: FlaskConical,
    title: "One Health Seed Grant Fund",
    description:
      "Provide micro-grants for field vector sampling, zoonotic risk mapping, and community health vulnerability assessments in vulnerable regions.",
    suggested: "$500 – $5,000",
  },
];

const bankDetails = {
  bankName: "First Bank of Nigeria / Zenith Bank Plc",
  accountName: "CPM Int'l Research Institute for Climate Health",
  accountNumber: "1023849120",
  swiftCode: "FBNINGLAXXX",
  currency: "NGN / USD / EUR",
  headquarters: "Ibadan, Oyo State, Nigeria",
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
    <InstituteLayout>
      {/* Hero */}
      <PageIntro
        eyebrow="Support our work"
        title="Support climate-health research"
        description="Contribute to scientific research, laboratory capacity, public health innovation and the development of early-career researchers."
        links={[
          { href: "#research-funds", label: "Research funds" },
          { href: "#giving", label: "Ways to contribute" },
        ]}
      />

      {/* Giving Pillars */}
      <section
        id="research-funds"
        className="bg-background py-16 lg:py-24 border-b border-border/60"
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">
              Targeted Impact
            </p>
            <h2 className="mt-3 text-foreground">Where Your Support Goes</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Every dollar contributed to CPM Int'l is dedicated to high-impact scientific research,
              technological innovation, and early-career talent development.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {givingPillars.map((p) => (
              <div
                key={p.title}
                className="group border border-border bg-card p-6 flex flex-col justify-between transition-all duration-300 hover:border-primary/40"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-none bg-primary/8 text-primary transition-colors group-hover:bg-primary/15">
                    <p.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 text-foreground group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
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
      <section id="giving" className="bg-secondary/40 py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Direct Bank Transfer & Verification Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border border-border bg-card p-6 lg:p-8">
                <div className="flex items-center gap-3 text-primary mb-4">
                  <Banknote className="h-6 w-6" />
                  <h3 className="text-foreground">Direct Bank Transfer</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  For institutional partners, philanthropic grants, and direct bank transfers,
                  please use our official CPM Int'l Research Institute accounts:
                </p>

                <dl className="space-y-4 text-xs">
                  <div className="border-b border-border/60 pb-3">
                    <dt className="text-muted-foreground font-medium">Account Name</dt>
                    <dd className="text-sm font-semibold text-foreground mt-0.5">
                      {bankDetails.accountName}
                    </dd>
                  </div>
                  <div className="border-b border-border/60 pb-3">
                    <dt className="text-muted-foreground font-medium">Institute Headquarters</dt>
                    <dd className="text-foreground mt-0.5">{bankDetails.headquarters}</dd>
                  </div>
                  <div className="border-b border-border/60 pb-3">
                    <dt className="text-muted-foreground font-medium">Bank Name</dt>
                    <dd className="text-foreground mt-0.5">{bankDetails.bankName}</dd>
                  </div>
                  <div className="border-b border-border/60 pb-3">
                    <dt className="text-muted-foreground font-medium">Account Number / SWIFT</dt>
                    <dd className="text-foreground font-mono mt-0.5">
                      {bankDetails.accountNumber} ({bankDetails.swiftCode})
                    </dd>
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
                  Need official grant documentation, W-8BEN-E, or formal institutional agreements?
                  Email{" "}
                  <a
                    href="mailto:grants@cpm-institute.org"
                    className="text-primary underline font-medium"
                  >
                    grants@cpm-institute.org
                  </a>
                  .
                </div>
              </div>
            </div>

            {/* Donation Form */}
            <div className="lg:col-span-7 border border-border bg-card p-6 lg:p-10">
              <h3 className="text-foreground">Make a Support Contribution</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Select your contribution preferences below. All contributions directly support
                research innovation and fellowship endowment.
              </p>

              {submitted ? (
                <div
                  className="mt-8 border border-primary/30 bg-primary/5 p-8 text-center"
                  role="status"
                >
                  <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                  <h4 className="mt-4 font-serif text-xl font-semibold text-foreground">
                    Thank You for Your Generous Support!
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                    Your commitment of <strong>${finalAmount || "250"}</strong> to{" "}
                    <strong>{fundTarget}</strong> enables our scientists to continue advancing vital
                    climate-health solutions.
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
                    <label className="block text-xs font-medium text-foreground mb-2">
                      I am contributing as an:
                    </label>
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
                    <label className="block text-xs font-medium text-foreground mb-2">
                      Select Target Fund:
                    </label>
                    <select
                      value={fundTarget}
                      onChange={(e) => setFundTarget(e.target.value)}
                      className="w-full border border-input bg-background px-3 py-2.5 text-foreground focus:border-primary focus:outline-none text-base sm:text-sm"
                    >
                      <option value="General Scientific Research">
                        General Scientific Research Fund
                      </option>
                      <option value="CHIP™ Digital Twin Infrastructure">
                        CHIP™ Digital Twin Infrastructure Fund
                      </option>
                      <option value="Pathogen Genomics & Sequencing">
                        Pathogen Genomics & Sequencing Capacity
                      </option>
                      <option value="African Climate Health Fellowships">
                        African Climate Health Fellowship Endowment
                      </option>
                    </select>
                  </div>

                  {/* Amount Selection */}
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-2">
                      Contribution Amount (USD):
                    </label>
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
                        className="flex-1 border border-input bg-background px-3 py-2 focus:border-primary focus:outline-none text-base sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5 text-xs">
                      <span className="font-medium text-foreground">
                        Full Name / Organization <span className="text-destructive">*</span>
                      </span>
                      <input
                        required
                        type="text"
                        placeholder="Dr. Jane Doe"
                        className="border border-input bg-background px-3 py-2 focus:border-primary focus:outline-none text-base sm:text-sm"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5 text-xs">
                      <span className="font-medium text-foreground">
                        Email Address <span className="text-destructive">*</span>
                      </span>
                      <input
                        required
                        type="email"
                        placeholder="jane@example.org"
                        className="border border-input bg-background px-3 py-2 focus:border-primary focus:outline-none text-base sm:text-sm"
                      />
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-semibold transition-all"
                    style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                  >
                    {loading ? (
                      <>Processing Support Request…</>
                    ) : (
                      <>
                        <Heart className="h-4 w-4 fill-current" /> Confirm Contribution ($
                        {finalAmount || "250"})
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-muted-foreground">
                    CPM Int'l Research Institute is an independent research institution based in
                    Ibadan, Oyo State, Nigeria.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </InstituteLayout>
  );
}
