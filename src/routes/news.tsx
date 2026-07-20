import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Calendar, User, Tag, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/news")({
  component: NewsPage,
  head: () => ({
    meta: [
      { title: "News & Updates | CPM International Research Institute" },
      { name: "description", content: "Latest research updates, news, and announcements from CPM International Research Institute for Climate Health." },
    ],
  }),
});

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  featured?: boolean;
};

const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "CPM Launches Climate–Pathogen Nexus Framework for Advanced Disease Surveillance",
    excerpt: "The institute introduces its flagship scientific innovation, integrating climate science with pathogen genomics for predictive public health intelligence.",
    content: "The CPM International Research Institute for Climate Health has officially launched the Climate–Pathogen Nexus (CP-Nexus) framework, a groundbreaking scientific innovation that integrates climate science, pathogen biology, genomics, and artificial intelligence. This framework represents a major step toward advancing climate health intelligence across Africa and globally.",
    date: "2026-07-18",
    author: "Prof. Omololu J Aso",
    category: "Research",
    featured: true,
  },
  {
    id: "2",
    title: "CPM and Obafemi Awolowo University Establish International Centre of Excellence",
    excerpt: "Strategic partnership to strengthen climate health research capacity and international collaboration in West Africa.",
    content: "Building on decades of research excellence, CPM and Obafemi Awolowo University have established a formal Centre of Excellence for Climate Health Intelligence. This initiative aims to strengthen laboratory capacity, train the next generation of scientists, and position Africa as a leader in climate health research.",
    date: "2026-07-15",
    author: "University Administration",
    category: "Partnership",
    featured: false,
  },
  {
    id: "3",
    title: "New Study Reveals Climate-Disease Links in West African Populations",
    excerpt: "Research team publishes findings on seasonal pathogen dynamics under shifting climate patterns.",
    content: "CPM researchers have completed a comprehensive study examining the intersection of climate variability and infectious disease patterns in West African communities. The study, conducted over three years, provides critical insights for epidemic preparedness and climate-informed public health planning.",
    date: "2026-07-10",
    author: "Research Team",
    category: "Publication",
    featured: false,
  },
  {
    id: "4",
    title: "CHIP™ Platform Development Reaches Milestone—Beta Release Coming Q3 2026",
    excerpt: "Climate Health Intelligence Platform nears completion with advanced AI capabilities for real-time surveillance.",
    content: "The CHIP™ (Climate Health Intelligence Platform) development team has announced a major milestone. The AI-enabled Climate Health Digital Twin is now entering final integration testing, with a beta release expected in Q3 2026. The platform will integrate climate data, disease surveillance, laboratory intelligence, and genomic data in real time.",
    date: "2026-07-05",
    author: "Technology Team",
    category: "Innovation",
    featured: true,
  },
  {
    id: "5",
    title: "CPM Hosts Regional Training Workshop on Genomic Surveillance",
    excerpt: "Over 50 scientists and public health professionals participate in capacity-building initiative.",
    content: "CPM successfully conducted a week-long training workshop on pathogenomics and genomic surveillance for researchers and public health professionals across West Africa. The workshop covered molecular epidemiology, sequencing technologies, and data interpretation for outbreak response.",
    date: "2026-06-28",
    author: "Education Team",
    category: "Training",
    featured: false,
  },
];

const categories = ["All", "Research", "Partnership", "Publication", "Innovation", "Training"];

function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = newsItems.filter((item) => {
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
    const searchMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const featuredNews = filteredNews.filter((item) => item.featured);
  const regularNews = filteredNews.filter((item) => !item.featured);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-5 lg:px-10">
          <Link to="/" className="flex min-w-0 items-center">
            <img src="/cpm-logo.png" alt="CPM International Research Institute for Climate Health" className="h-10 md:h-12 w-auto object-contain mix-blend-multiply" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back to Home
          </Link>
        </div>
      </header>

      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground/70">News & Updates</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.1] tracking-tight lg:text-6xl">
              Latest from CPM Institute
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/85">
              Stay informed about our latest research breakthroughs, partnerships, and updates from the International Research Institute for Climate Health.
            </p>
          </div>
        </div>
      </section>

      {/* ── Search & Filter ────────────────────────────────────────── */}
      <section className="border-b border-border/40 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-3">Search news</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-input rounded-lg px-4 py-3 bg-background text-sm focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-input rounded-lg px-4 py-3 bg-background text-sm focus:border-primary focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured News ───────────────────────────────────────────── */}
      {featuredNews.length > 0 && (
        <section className="border-b border-border/40 bg-background">
          <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary mb-8">Featured</p>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredNews.map((item) => (
                <article
                  key={item.id}
                  className="group border border-border p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:shadow-primary/5"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1 border border-primary/30 rounded-full px-3 py-1 text-xs font-medium text-primary bg-primary/5">
                      <Tag className="h-3 w-3" aria-hidden />
                      {item.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" aria-hidden />
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl leading-tight text-foreground mb-3 group-hover:text-primary transition">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-5">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/20">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User className="h-3 w-3" aria-hidden />
                      {item.author}
                    </span>
                    <button className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
                      Read more <ArrowRight className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All News Items ──────────────────────────────────────────── */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
          {regularNews.length === 0 && featuredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No news items found matching your search.</p>
            </div>
          ) : (
            <>
              {featuredNews.length > 0 && <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary mb-8">All Updates</p>}
              <div className="space-y-6">
                {regularNews.map((item) => (
                  <article
                    key={item.id}
                    className="group border-b border-border/20 pb-6 last:border-b-0 transition-all duration-300 hover:pl-2"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 rounded px-2 py-1">
                            {item.category}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" aria-hidden />
                            {new Date(item.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg leading-snug text-foreground mb-2 group-hover:text-primary transition">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" aria-hidden />
                            {item.author}
                          </span>
                          <button className="inline-flex items-center gap-1 text-primary hover:gap-2 transition-all font-medium">
                            Read more <ArrowRight className="h-3 w-3" aria-hidden />
                          </button>
                        </div>
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
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24 text-center">
          <h2 className="font-serif text-3xl leading-tight mb-4">Stay Updated</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Have questions about our research or want to collaborate? Contact us or visit our resources page for more information.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/#contact" className="inline-flex items-center gap-2 bg-primary-foreground px-6 py-3 text-sm font-medium text-primary hover:bg-primary-foreground/90 transition">
              Get in Touch <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link to="/resources" className="inline-flex items-center gap-2 border border-primary-foreground/40 px-6 py-3 text-sm font-medium text-primary-foreground hover:border-primary-foreground/60 transition">
              View Resources
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="bg-background border-t border-border/40">
        <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10">
          <div className="grid gap-10 md:grid-cols-4 lg:gap-16">
            <div>
              <p className="font-serif text-lg font-medium text-foreground">CPM Institute</p>
              <p className="mt-2 text-sm text-muted-foreground">
                International Research Institute for Climate Health, hosted at Obafemi Awolowo University, Nigeria.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Navigation</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition">Home</Link></li>
                <li><Link to="/chip" className="text-muted-foreground hover:text-primary transition">CHIP™</Link></li>
                <li><Link to="/news" className="text-muted-foreground hover:text-primary transition">News</Link></li>
                <li><Link to="/resources" className="text-muted-foreground hover:text-primary transition">Resources</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Contact</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>info@cpm-institute.org</li>
                <li>+234 803 377 0933</li>
                <li className="text-xs">Ile-Ife, Osun State, Nigeria</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Legal</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="/privacy" className="text-muted-foreground hover:text-primary transition">Privacy Policy</a></li>
                <li><a href="/terms" className="text-muted-foreground hover:text-primary transition">Terms of Use</a></li>
                <li><a href="/accessibility" className="text-muted-foreground hover:text-primary transition">Accessibility</a></li>
                <li><a href="/sitemap" className="text-muted-foreground hover:text-primary transition">Sitemap</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-border/40 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="bg-white/95 px-2.5 py-1.5 rounded-md shadow-sm"><img src="/cpm-logo.png" alt="CPM Logo" className="h-8 md:h-10 w-auto object-contain mix-blend-multiply" /></div>
              <p>© {new Date().getFullYear()} CPM International Research Institute.</p>
            </div>
            <p className="uppercase tracking-[0.2em]">Research · Innovation · Education · Policy · Impact</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
