import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus } from "lucide-react";

const themes = [
  {
    title: "Climate & environment",
    description:
      "Understanding how a changing environment shapes the conditions for disease and affects the health of communities.",
    areas: [
      [
        "Climate change & health",
        "Temperature extremes, rainfall variability and ecological shifts affecting population health.",
      ],
      [
        "Environmental health",
        "Water quality, air pollution and environmental disruptions that influence health.",
      ],
      [
        "Climate–pathogen nexus",
        "The relationships between climatic drivers, pathogen behaviour and disease transmission.",
      ],
    ],
  },
  {
    title: "Pathogens & One Health",
    description:
      "Connecting laboratory science with human, animal and environmental health to understand infectious disease threats.",
    areas: [
      [
        "Clinical microbiology",
        "Diagnostic innovation, laboratory capacity and rapid pathogen characterisation.",
      ],
      [
        "Pathogen genomics",
        "Genomic sequencing, lineage tracking and the evolution of infectious organisms.",
      ],
      ["One Health", "Research across the connected health of people, animals and ecosystems."],
      [
        "Antimicrobial resistance",
        "Resistance surveillance and microbial evolution to safeguard essential treatments.",
      ],
    ],
  },
  {
    title: "Data & health intelligence",
    description:
      "Bringing together computational methods and health information to turn complex observations into useful evidence.",
    areas: [
      [
        "Artificial intelligence",
        "Machine learning and predictive approaches to disease dynamics and outbreak risks.",
      ],
      ["Data science", "Biostatistics, spatial epidemiology and computational modelling."],
      [
        "Digital health",
        "Digital tools and integrated data platforms for research and field epidemiology.",
      ],
    ],
  },
  {
    title: "Surveillance & resilient systems",
    description:
      "Strengthening the evidence and capacity that health services need to anticipate, prepare for and respond to emerging risks.",
    areas: [
      [
        "Public health surveillance",
        "Integrated epidemic intelligence and early warning across health networks.",
      ],
      [
        "Health systems",
        "Climate resilience, resource allocation and evidence-informed health policy.",
      ],
    ],
  },
];

export function ResearchOverview() {
  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto grid max-w-[1320px] gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-10 lg:py-24">
        <div>
          <p className="home-eyebrow">Our research</p>
          <h2 id="research-heading" className="home-heading mt-5">
            Connected science.
            <br />
            Healthier communities.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-muted-foreground">
            Health challenges cross disciplines. Our research does too, bringing climate science,
            laboratory discovery and public health into the same conversation.
          </p>
          <Link to="/resources" className="home-text-link mt-8">
            Explore our research library <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="border-t border-foreground/70">
          {themes.map((theme, index) => (
            <details key={theme.title} className="group border-b border-border" open={index === 0}>
              <summary className="flex min-h-24 cursor-pointer list-none items-center gap-4 py-6 [&::-webkit-details-marker]:hidden">
                <span className="w-6 shrink-0 text-xs tabular-nums text-muted-foreground">
                  0{index + 1}
                </span>
                <h3 className="flex-1 font-serif text-2xl leading-tight tracking-tight sm:text-[28px]">
                  {theme.title}
                </h3>
                <Plus
                  className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-45 motion-reduce:transition-none"
                  aria-hidden
                />
              </summary>
              <div className="pb-7 pl-10 pr-4">
                <p className="max-w-lg text-sm leading-6 text-muted-foreground">
                  {theme.description}
                </p>
                <dl className="mt-6 space-y-4">
                  {theme.areas.map(([title, description]) => (
                    <div key={title}>
                      <dt className="text-sm font-semibold text-primary">{title}</dt>
                      <dd className="mt-1 text-sm leading-6 text-muted-foreground">
                        {description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
