import { ArrowDown, ArrowUpRight, CloudSun, Dna, Microscope, Sprout } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ChipConcept() {
  return (
    <section
      id="chip-section"
      className="relative scroll-mt-24 bg-[#123c31] text-[#f5f3eb]"
      aria-labelledby="chip-heading"
    >
      <span id="innovation" className="absolute top-0 scroll-mt-24" />
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-24">
        <div>
          <p className="home-eyebrow text-[#d7bc76]">Our signature innovation</p>
          <h2 id="chip-heading" className="home-heading mt-5 text-inherit">
            From complex signals
            <br />
            to earlier action.
          </h2>
          <p className="mt-7 font-serif text-3xl">
            Meet CHIP<span className="align-super font-sans text-xs">™</span>
          </p>
          <p className="mt-2 text-sm text-[#c0d1c8]">Climate Health Intelligence Platform</p>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#d2dfd7]">
            Our AI-enabled Climate Health Digital Twin brings climate observations, laboratory
            evidence and disease surveillance into one framework for predictive public health.
          </p>
          <p className="mt-4 max-w-lg text-base leading-7 text-[#d2dfd7]">
            The ambition is simple: help researchers and health systems anticipate emerging risks
            and make better-informed decisions.
          </p>
          <Link
            to="/chip"
            id="btn-explore-chip"
            className="mt-8 inline-flex min-h-12 items-center gap-8 border border-[#9db3a6] px-5 py-3 text-sm font-medium transition-colors hover:bg-white/10 focus-visible:outline-white"
          >
            Explore CHIP™ <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <figure
          id="digital-twin"
          className="scroll-mt-24 border border-white/20 bg-[#19483b] px-5 py-8 sm:px-8 sm:py-10"
        >
          <figcaption className="border-b border-white/20 pb-5 text-xs font-medium uppercase tracking-[0.16em] text-[#d7bc76]">
            The CHIP™ approach
          </figcaption>
          <div className="mt-8 grid grid-cols-4 gap-2">
            {[
              { icon: CloudSun, name: "Climate" },
              { icon: Microscope, name: "Clinical" },
              { icon: Dna, name: "Genomic" },
              { icon: Sprout, name: "Environment" },
            ].map(({ icon: Icon, name }) => (
              <div key={name} className="flex min-w-0 flex-col items-center gap-3 text-center">
                <Icon strokeWidth={1.25} className="h-6 w-6 text-[#d7bc76]" aria-hidden />
                <span className="text-[10px] font-medium text-[#d2dfd7] sm:text-xs">{name}</span>
              </div>
            ))}
          </div>
          <svg
            viewBox="0 0 400 60"
            className="mx-auto mt-4 h-12 w-full text-[#86a296]"
            fill="none"
            aria-hidden
          >
            <path
              d="M50 0V22H350V0M150 0V22M250 0V22M200 22V60"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path d="m195 53 5 6 5-6" stroke="currentColor" strokeWidth="1" />
          </svg>
          <div className="border border-[#bdccbe] bg-[#e9ecdf] px-4 py-7 text-center text-[#173f33]">
            <p className="font-serif text-4xl tracking-tight">
              CHIP<span className="align-super font-sans text-xs">™</span>
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em]">
              Climate Health Digital Twin
            </p>
            <p className="mt-4 text-sm text-[#456354]">Integrate. Model. Anticipate.</p>
          </div>
          <ArrowDown className="mx-auto my-4 h-6 w-6 text-[#86a296]" strokeWidth={1} aria-hidden />
          <div className="grid grid-cols-3 gap-3 text-center text-xs leading-5 text-[#e1e9e2]">
            {["Understand risk", "Explore scenarios", "Inform response"].map((label) => (
              <p key={label} className="border-t border-white/25 pt-4">
                {label}
              </p>
            ))}
          </div>
        </figure>
      </div>
    </section>
  );
}
