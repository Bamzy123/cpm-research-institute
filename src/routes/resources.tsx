import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";


import { ArrowLeft, Download, FileText, Filter, Search as SearchIcon } from "lucide-react";

export const Route = createFileRoute("/resources")({
  component: ResourcesPage,
  head: () => ({
    meta: [
      { title: "Resources & Publications | CPM Int'l Research Institute" },
      { name: "description", content: "Download research publications, policy briefs, technical reports, and educational resources from CPM Int'l Research Institute for Climate Health." },
    ],
  }),
});

type Resource = {
  id: string;
  title: string;
  description: string;
  type: "Publication" | "Policy Brief" | "Report" | "Toolkit" | "Dataset";
  date: string;
  authors: string;
  downloadUrl: string;
  downloadFormat: "PDF" | "Excel" | "Dataset";
};

const resources: Resource[] = [
  {
    id: "1",
    title: "Climate–Pathogen Nexus: Integrating Climate Science with Infectious Disease Epidemiology",
    description: "Comprehensive framework paper on the CP-Nexus approach, methodology, and applications for public health surveillance.",
    type: "Publication",
    date: "2026-07-01",
    authors: "Prof. Omololu J Aso, CPM Int'l Research Team",
    downloadUrl: "#",
    downloadFormat: "PDF",
  },
  {
    id: "2",
    title: "Policy Brief: Climate-Informed Disease Surveillance for African Health Systems",
    description: "Evidence-based policy recommendations for integrating climate data into national disease surveillance systems.",
    type: "Policy Brief",
    date: "2026-06-15",
    authors: "CPM Int'l Policy & Impact Team",
    downloadUrl: "#",
    downloadFormat: "PDF",
  },
  {
    id: "3",
    title: "Annual Research Report 2025-2026",
    description: "Comprehensive overview of CPM Int'l research activities, findings, partnerships, and institutional achievements.",
    type: "Report",
    date: "2026-06-01",
    authors: "CPM Int'l Institute",
    downloadUrl: "#",
    downloadFormat: "PDF",
  },
  {
    id: "4",
    title: "Genomic Surveillance Toolkit: A Practical Guide for African Laboratories",
    description: "Step-by-step operational toolkit for implementing pathogenomics and genomic surveillance in resource-limited settings.",
    type: "Toolkit",
    date: "2026-05-20",
    authors: "Laboratory Excellence Team",
    downloadUrl: "#",
    downloadFormat: "PDF",
  },
  {
    id: "5",
    title: "West Africa Climate-Disease Longitudinal Dataset (2015-2025)",
    description: "Curated dataset integrating climate variables, disease surveillance data, and laboratory diagnostics for research use.",
    type: "Dataset",
    date: "2026-05-10",
    authors: "Data Science Team",
    downloadUrl: "#",
    downloadFormat: "Dataset",
  },
  {
    id: "6",
    title: "Training Manual: One Health Integration in Climate Health Research",
    description: "Educational resource for postgraduate students and researchers on One Health principles applied to climate health.",
    type: "Toolkit",
    date: "2026-04-30",
    authors: "Education & Training Team",
    downloadUrl: "#",
    downloadFormat: "PDF",
  },
  {
    id: "7",
    title: "Seasonal Pathogen Dynamics Under Climate Variability in West Africa",
    description: "Peer-reviewed research article examining temporal patterns of infectious diseases in relation to climate shifts.",
    type: "Publication",
    date: "2026-04-15",
    authors: "CPM Research Collaboration",
    downloadUrl: "#",
    downloadFormat: "PDF",
  },
  {
    id: "8",
    title: "Technical Report: CHIP™ Platform Architecture and Data Integration",
    description: "Technical documentation on the Climate Health Intelligence Platform's system design and data harmonization processes.",
    type: "Report",
    date: "2026-04-01",
    authors: "Technology Team",
    downloadUrl: "#",
    downloadFormat: "PDF",
  },
];

const resourceTypes = ["All", "Publication", "Policy Brief", "Report", "Toolkit", "Dataset"];

function ResourcesPage() {
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter((item) => {
    const typeMatch = selectedType === "All" || item.type === selectedType;
    const searchMatch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.authors.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && searchMatch;
  });

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Publication: "bg-blue-50 text-blue-700 border-blue-200",
      "Policy Brief": "bg-green-50 text-green-700 border-green-200",
      Report: "bg-purple-50 text-purple-700 border-purple-200",
      Toolkit: "bg-orange-50 text-orange-700 border-orange-200",
      Dataset: "bg-red-50 text-red-700 border-red-200",
    };
    return colors[type] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground/70">Resources Library</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.1] tracking-tight lg:text-6xl">
              Research & Publications
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/85">
              Access CPM Int'l's research publications, policy briefs, technical reports, educational toolkits, and datasets. All resources are available for download and research use.
            </p>
          </div>
        </div>
      </section>

      {/* ── Search & Filter ────────────────────────────────────────── */}
      <section className="border-b border-border/40 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-3">Search resources</label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <input
                  type="text"
                  placeholder="Search by title, author, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-input rounded-lg pl-10 pr-4 py-3 bg-background text-sm focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" aria-hidden /> Resource Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full border border-input rounded-lg px-4 py-3 bg-background text-sm focus:border-primary focus:outline-none"
              >
                {resourceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ── Resources Grid ──────────────────────────────────────────── */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
          {filteredResources.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-2">No resources found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("All");
                }}
                className="text-sm font-medium text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing <strong>{filteredResources.length}</strong> resource{filteredResources.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                {filteredResources.map((resource) => (
                  <article
                    key={resource.id}
                    className="group border border-border rounded-lg p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:shadow-primary/5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1 min-w-0">
                        {/* Type Badge */}
                        <div className="mb-3">
                          <span className={`inline-flex items-center gap-1 text-xs font-medium rounded-full px-3 py-1 border ${getTypeColor(resource.type)}`}>
                            <FileText className="h-3 w-3" aria-hidden />
                            {resource.type}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-lg leading-snug text-foreground mb-2 group-hover:text-primary transition">
                          {resource.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                          {resource.description}
                        </p>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span>
                            <strong>Authors:</strong> {resource.authors}
                          </span>
                          <span>
                            <strong>Date:</strong> {new Date(resource.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Download Button */}
                      <div className="flex flex-col gap-2 sm:items-end">
                        <button
                          onClick={() => {
                            // Placeholder for download functionality
                            alert(`Downloading: ${resource.title}`);
                          }}
                          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded-md hover:bg-primary/90 transition whitespace-nowrap"
                        >
                          <Download className="h-4 w-4" aria-hidden />
                          Download
                        </button>
                        <span className="text-xs text-muted-foreground text-right">
                          {resource.downloadFormat}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── CTA Section ─────────────────────────────────────────────── */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary mb-3">Request Resources</p>
              <h2 className="font-serif text-3xl leading-tight text-foreground mb-4">
                Need a specific resource?
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                If you can't find what you're looking for, contact our research team. We're happy to provide additional materials or discuss collaboration opportunities.
              </p>
              <Link to="/#contact" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
                Get in Touch →
              </Link>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary mb-3">Learn More</p>
              <h2 className="font-serif text-3xl leading-tight text-foreground mb-4">
                Explore our research
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                Visit our News page for the latest updates, or explore the CHIP™ platform to learn about our flagship scientific innovation.
              </p>
              <Link to="/news" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
                Latest News →
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ── Footer ─────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
