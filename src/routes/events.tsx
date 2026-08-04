import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, TouchEvent } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";


import {
  Calendar, MapPin, Building2, Globe, Shield, Sparkles,
  ChevronLeft, ChevronRight, Play, Pause, Maximize2, X, Microscope,
  CheckCircle2, Award, Menu, Image as ImageIcon, Users,
  Grid
} from "lucide-react";

export const Route = createFileRoute("/events")({
  component: EventsPage,
  head: () => ({
    meta: [
      { title: "Events & Scientific Engagements | CPM Int'l Research Institute" },
      {
        name: "description",
        content:
          "Discover landmark scientific visits, institutional partnerships, and global dialogues in pathogenomics, climate-health innovation, and One Health by CPM Int'l Research Institute.",
      },
    ],
  }),
});

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About CPM Int'l" },
  { href: "/#research", label: "Research" },
  { href: "/chip", label: "CHIP™" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/resources", label: "Resources" },
  { href: "/leadership", label: "Leadership" },
  { href: "/#contact", label: "Contact" },
];

const acegidPhotos = [
  { url: "/WhatsApp Image 2026-07-25 at 5.11.26 AM.jpeg", title: "Delegation Arrival at ACEGID", caption: "Scientific delegation from CPM Int'l Research Institute, OAUTHC, and OAU arriving at ACEGID, Redeemer's University, Ede." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.27 AM.jpeg", title: "Genomics Infrastructure Inspection", caption: "Delegation members observing high-throughput pathogen genomics sequencing platforms." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.27 AM (1).jpeg", title: "Molecular Diagnostics Suite", caption: "Guided facility tour showcasing advanced molecular diagnostics and PCR platforms." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.27 AM (2).jpeg", title: "Surveillance Workflows", caption: "ACEGID scientific team demonstrating cutting-edge genomic surveillance workflows." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.27 AM (3).jpeg", title: "One Health Strategic Session", caption: "Delegation leaders engaging in discussions on One Health and pathogenomics." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.28 AM.jpeg", title: "Bioinformatics Workstations", caption: "Prof. Joseph Omololu-Aso and delegates examining high-performance bioinformatics setups." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.28 AM (1).jpeg", title: "Multidisciplinary Exchange", caption: "Multidisciplinary research discussion during the ACEGID facility walk-through." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.28 AM (2).jpeg", caption: "ACEGID laboratory personnel presenting diagnostic automation systems." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.28 AM (3).jpeg", title: "Sequencing Instrument Review", caption: "Visiting delegates from OAU and OAUTHC evaluating genomic sequencing instruments." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.28 AM (4).jpeg", title: "Infectious Disease Surveillance", caption: "Group interaction on climate-sensitive infectious disease surveillance systems." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.29 AM.jpeg", title: "Advanced PCR & Genotyping", caption: "Delegation observing advanced PCR and HPV genotyping instrumentation." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.29 AM (1).jpeg", title: "Outbreak Response Briefing", caption: "Scientific briefing on outbreak response and computational biology pipelines." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.29 AM (2).jpeg", title: "Genomic Data Interpretation", caption: "CPM Int'l Research Institute delegates reviewing pathogen genome sequencing output data." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.29 AM (3).jpeg", title: "Cleanroom Biology Suites", caption: "Facility tour of cleanroom molecular biology suites at ACEGID." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.29 AM (4).jpeg", title: "Institutional Leadership Dialogue", caption: "Prof. Joseph Omololu-Aso exchanging insights with Redeemer's University hosts." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.30 AM.jpeg", title: "AMR Monitoring Systems", caption: "Demonstration of antimicrobial resistance (AMR) detection technologies." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.30 AM (1).jpeg", title: "Computational Science Hub", caption: "Delegation exploring computational biology and data science workstations." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.30 AM (2).jpeg", title: "Consortium Partnership", caption: "Scientific collaboration exchange between ACEGID, CPM Int'l Institute, OAU, and OAUTHC." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.30 AM (3).jpeg", title: "Osun State Surveillance Pilot", caption: "Delegates discussing Osun State Climate-Health Surveillance Pilot synergies." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.31 AM.jpeg", title: "ACEGID Group Commemoration", caption: "Group photo highlight of visiting scientific consortium delegates inside ACEGID." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.31 AM (1).jpeg", title: "Biosafety & Preparedness", caption: "Guided tour highlighting public health preparedness and biosafety standards." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.31 AM (2).jpeg", title: "Data Visualization Platform", caption: "Delegation viewing high-throughput genomic data visualization platforms." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.32 AM.jpeg", title: "Consortium Gathering", caption: "Institutional group gathering commemorating the scientific visit to Ede." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.32 AM (1).jpeg", title: "Leadership Conclusion", caption: "Delegation leadership concluding facility tour with Redeemer's University hosts." },
  { url: "/WhatsApp Image 2026-07-25 at 5.11.32 AM (2).jpeg", title: "Final Delegation Group Photo", caption: "Final commemorative group photo of CPM Int'l Institute, OAUTHC, and OAU delegation at ACEGID." },
  { url: "/cpm google meeting.jpeg", title: "Google Meet with ACEGID", caption: "Google Meet with ACEGID, OAUTHC, and OAU delegation at ACEGID." },
];

const cpmPhotos = [
  { url: "/citadel.jpeg", title: "Climate Surveillance Pilot Initiative", caption: "Professor Joseph Omololu-Aso (DG) with Ms. Oladimeji Abigail Eniola (Unit Head) During Climate Surveillance Pilot." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.52 PM.jpeg", title: "CPM Field Intelligence & Sampling", caption: "CPM Int'l field research team during climate health surveillance data gathering." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.52 PM (1).jpeg", title: "Environmental Health Monitoring", caption: "Monitoring environmental variables and pathogen vectors during regional field study." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.53 PM.jpeg", title: "Laboratory Diagnostic Operations", caption: "Laboratory medicine specialists performing pathogen diagnostic assessments." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.53 PM (1).jpeg", title: "Climate-Pathogen Research Consultation", caption: "Scientific investigators reviewing climate-pathogen nexus metrics and field notes." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.53 PM (2).jpeg", title: "Community Surveillance Engagement", caption: "Engaging local healthcare units and community leaders during surveillance pilot." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.54 PM.jpeg", title: "Field Team Briefing & Protocol Review", caption: "Field research coordinators reviewing biosafety and data collection protocols." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.54 PM (1).jpeg", title: "Pathogen Genomics Sample Processing", caption: "Collecting and storing biological specimens for downstream genomic sequencing." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.54 PM (2).jpeg", title: "One Health Ecosystem Mapping", caption: "Mapping vector breeding habitats and environmental risk parameters." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.54 PM (3).jpeg", title: "Interdisciplinary Research Dialogue", caption: "Cross-disciplinary dialogue between clinicians, epidemiologists, and data analysts." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.55 PM.jpeg", title: "CHIP™ Data Validation Session", caption: "Validating real-time field observations against CHIP™ predictive algorithms." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.55 PM (1).jpeg", title: "Clinical Microbiology Diagnostics", caption: "Diagnostic evaluation of microbial isolate samples from surveillance sites." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.55 PM (2).jpeg", title: "Regional Health Network Collaboration", caption: "Strengthening joint surveillance efforts with regional healthcare facilities." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.55 PM (3).jpeg", title: "Scientific Leadership Field Inspection", caption: "Prof. Joseph Omololu-Aso inspecting field surveillance workflows and equipment." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.56 PM.jpeg", title: "Epidemiological Surveillance Briefing", caption: "Briefing on spatial epidemiology data and localized climate anomaly patterns." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.56 PM (1).jpeg", title: "Public Health Intervention Planning", caption: "Formulating early intervention strategies for climate-sensitive health threats." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.56 PM (2).jpeg", title: "Capacity Building & Training Session", caption: "Hands-on training session for junior researchers and laboratory technicians." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.56 PM (3).jpeg", title: "Digital Health Data Pipeline Review", caption: "Reviewing cloud upload protocols for remote field data entry devices." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.57 PM.jpeg", title: "Stakeholder Alignment & Policy Dialogue", caption: "Presenting preliminary surveillance insights to healthcare administration leads." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.57 PM (1).jpeg", title: "Research Delegation Commemoration", caption: "Commemorative session marking successful completion of field surveillance pilot." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.57 PM (2).jpeg", title: "Consortium Field Research Team", caption: "CPM Int'l Research Institute investigators and unit leaders during field operations." },
  { url: "/cpm research/WhatsApp Image 2026-08-04 at 1.20.57 PM (3).jpeg", title: "Climate Health Research Group Photo", caption: "Group photo of CPM research team members, laboratory heads, and field staff." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.23.59 PM.jpeg", title: "Strategic Planning Session", caption: "CPM Int'l Research Institute leadership and core scientific team during strategic planning sessions." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.04 PM.jpeg", title: "Research Consortium Dialogue", caption: "Interdisciplinary research discussion on climate-sensitive disease surveillance and One Health." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.07 PM.jpeg", title: "Pathogenomics & Digital Health Forum", caption: "Delegates reviewing computational biology and pathogen genomics frameworks." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.24 PM.jpeg", title: "Institutional Executive Session", caption: "Prof. Joseph Omololu-Aso addressing consortium partners on institutional development." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.26 PM.jpeg", title: "Climate Health Science Briefing", caption: "Scientific briefing on vector-borne disease dynamics and climate modeling." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.28 PM.jpeg", title: "AMR & Surveillance Strategy", caption: "Antimicrobial resistance monitoring and surveillance strategy exchange." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.28 PM (1).jpeg", title: "Clinical Microbiology Consultation", caption: "Consultation between hospital leaders and CPM research investigators." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.28 PM (2).jpeg", title: "Field Operations Planning", caption: "Planning field operations for regional environmental health and vector surveillance." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.29 PM.jpeg", title: "CHIP Platform Technical Review", caption: "Technical discussion on AI-driven Climate Health Intelligence Platform (CHIP™) deployment." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.29 PM (1).jpeg", title: "Consortium Partnership Dialogue", caption: "Multi-institutional scientific partnership meeting with regional healthcare stakeholders." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.30 PM.jpeg", title: "Research Infrastructure Assessment", caption: "Assessing laboratory facilities and technological requirements for climate health projects." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.32 PM.jpeg", title: "Capacity Building Workshop", caption: "Training and scientific capacity development engagement with early-career researchers." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.34 PM.jpeg", title: "One Health Working Group", caption: "One Health working group reviewing environmental, human, and animal health data integration." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.34 PM (1).jpeg", title: "Genomic Epidemiology Discussion", caption: "In-depth review of genomic epidemiology protocols for outbreak preparedness." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.35 PM.jpeg", title: "Stakeholder Alignment Session", caption: "Aligning research goals with public health policy and government health agencies." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.35 PM (1).jpeg", title: "Institutional Governance Forum", caption: "Governing council and scientific board strategic direction dialogue." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.36 PM.jpeg", title: "Interdisciplinary Exchange", caption: "Collaborative session bringing together climatologists, epidemiologists, and clinicians." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.36 PM (1).jpeg", title: "Field Data Collection Briefing", caption: "Operational briefing for field teams conducting climate-pathogen sample gathering." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.36 PM (2).jpeg", title: "AI & Machine Learning Presentation", caption: "Presentation on machine learning models for disease surge prediction." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.37 PM.jpeg", title: "Regional Health Systems Alignment", caption: "Strengthening health systems resilience across West African partner networks." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.37 PM (1).jpeg", title: "Laboratory Quality & Standards", caption: "Discussion on biosafety standards and laboratory accreditation pathways." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.38 PM.jpeg", title: "Translational Science Strategy", caption: "Strategies for translating climate health research into actionable clinical interventions." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.38 PM (1).jpeg", title: "Public Health Preparedness Panel", caption: "Panel session on rapid outbreak response protocols and diagnostic deployment." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.38 PM (2).jpeg", title: "Youth & Fellowship Mentorship", caption: "Prof. Omololu-Aso engaging with postgraduate fellows and junior researchers." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.39 PM.jpeg", title: "International Engagement Briefing", caption: "Briefing on global partnerships with European and North American institutions." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.39 PM (1).jpeg", title: "Data Integration Architecture", caption: "Technical roadmap for cloud data pipelines and environmental satellite data." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.39 PM (2).jpeg", title: "Community Health Outreach", caption: "Engaging community stakeholders on climate health literacy and vector control." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.40 PM.jpeg", title: "Scientific Advisory Review", caption: "Scientific advisory board evaluating ongoing research project milestones." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.40 PM (1).jpeg", title: "Publication & Impact Strategy", caption: "Planning high-impact peer-reviewed publications and policy whitepapers." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.41 PM.jpeg", title: "Executive Commemoration", caption: "Commemorative group portrait of CPM Int'l Research Institute delegation." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.41 PM (1).jpeg", title: "Consortium Leadership Dialogue", caption: "High-level dialogue on expanding regional research centers and field hubs." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.41 PM (2).jpeg", title: "Grant & Development Strategy", caption: "Strategic framework for research grants and international donor alignment." },
  { url: "/cpm/WhatsApp Image 2026-08-02 at 12.24.42 PM.jpeg", title: "CPM Institute Delegation Group Photo", caption: "Final group photo of CPM Int'l Research Institute leadership, staff, and partners." },
];

function EventsPage() {
  const [activeEvent, setActiveEvent] = useState<"cpm" | "acegid" | "olubadan" | "hpa-bmz">("cpm");
  const [activeGalleryTab, setActiveGalleryTab] = useState<"cpm" | "acegid" | "all">("cpm");
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // DEFAULT TO FALSE to prevent auto-slide scroll issues!
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isGridMode, setIsGridMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const currentPhotos =
    activeGalleryTab === "cpm"
      ? cpmPhotos
      : activeGalleryTab === "acegid"
      ? acegidPhotos
      : [...cpmPhotos, ...acegidPhotos];

  // Touch swipe handling for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;
    if (distance > minSwipeDistance) {
      // Swiped Left -> Next
      nextPhoto();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev
      prevPhoto();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Auto-slide ONLY if user explicitly turned isPlaying ON
  useEffect(() => {
    if (!isPlaying || isLightboxOpen) return;
    const interval = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % currentPhotos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, isLightboxOpen, currentPhotos.length]);

  // Scroll active thumbnail smoothly into view
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const activeThumb = thumbnailContainerRef.current.children[activePhotoIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [activePhotoIndex]);

  const closeMenu = () => {
    setMenuClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 290);
  };

  const nextPhoto = () => setActivePhotoIndex((prev) => (prev + 1) % currentPhotos.length);
  const prevPhoto = () => setActivePhotoIndex((prev) => (prev - 1 + currentPhotos.length) % currentPhotos.length);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">

      <Header />

      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION — Editorial Style
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        {/* Subtle background graphic */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 backdrop-blur-md shadow-sm">
              <Sparkles className="h-4 w-4 text-emerald-300 shrink-0" />
              <span>EVENTS & SCIENTIFIC ENGAGEMENTS</span>
            </div>
            
            <h1 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight">
              Landmark Scientific Delegations, Palace Audiences & Global Dialogues
            </h1>
            
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-primary-foreground/85 max-w-3xl">
              Documenting strategic scientific engagements, institutional collaborations, and international dialogues in pathogenomics, climate-health surveillance, AMR, and One Health innovation.
            </p>

            {/* Event Navigation Tabs */}
            <div className="mt-10 flex flex-wrap gap-2.5 sm:gap-3 border-t border-primary-foreground/20 pt-8">
              <button
                onClick={() => {
                  setActiveEvent("cpm");
                  setActiveGalleryTab("cpm");
                  setActivePhotoIndex(0);
                  document.getElementById("event-cpm")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-medium transition-all ${
                  activeEvent === "cpm"
                    ? "bg-white text-primary shadow-md font-semibold"
                    : "bg-white/10 text-primary-foreground hover:bg-white/20"
                }`}
              >
                <Users className="h-4 w-4" /> CPM Strategic Sessions (33 Photos)
              </button>

              <button
                onClick={() => {
                  setActiveEvent("acegid");
                  setActiveGalleryTab("acegid");
                  setActivePhotoIndex(0);
                  document.getElementById("event-acegid")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-medium transition-all ${
                  activeEvent === "acegid"
                    ? "bg-white text-primary shadow-md font-semibold"
                    : "bg-white/10 text-primary-foreground hover:bg-white/20"
                }`}
              >
                <Microscope className="h-4 w-4" /> ACEGID Facility Tour (26 Photos)
              </button>

              <button
                onClick={() => {
                  setActiveEvent("olubadan");
                  document.getElementById("event-olubadan")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-medium transition-all ${
                  activeEvent === "olubadan"
                    ? "bg-white text-primary shadow-md font-semibold"
                    : "bg-white/10 text-primary-foreground hover:bg-white/20"
                }`}
              >
                <Building2 className="h-4 w-4" /> Olubadan Audience (Ibadan)
              </button>

              <button
                onClick={() => {
                  setActiveEvent("hpa-bmz");
                  document.getElementById("event-hpa-bmz")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-medium transition-all ${
                  activeEvent === "hpa-bmz"
                    ? "bg-white text-primary shadow-md font-semibold"
                    : "bg-white/10 text-primary-foreground hover:bg-white/20"
                }`}
              >
                <Globe className="h-4 w-4" /> Global Dialogue (HPA-BMZ Germany)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          EVENT 1: CPM STRATEGIC SESSIONS & CONSORTIUM WORKSHOPS
      ══════════════════════════════════════════════════════════════ */}
      <article id="event-cpm" className="border-b border-border/60 py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">

          {/* Article Header & Metadata Card */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-primary mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 uppercase tracking-wider text-primary">
                  <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" /> Executive Strategic Sessions &amp; Field Operations
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> CPM Research Hubs &amp; Field Sites, Nigeria</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl leading-tight font-normal text-foreground tracking-tight">
                CPM INTERNATIONAL RESEARCH INSTITUTE EXECUTIVE STRATEGIC SESSIONS, FIELD SURVEILLANCE &amp; MULTIDISCIPLINARY CONSORTIUM WORKSHOPS
              </h2>

              <p className="mt-3 font-serif text-base sm:text-lg text-muted-foreground leading-relaxed">
                Comprehensive Photographic Record of Institutional Planning, One Health Field Preparedness, Genomics Integration &amp; Regional Stakeholder Engagements
              </p>
            </div>

            {/* Metadata Card */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 lg:col-span-4 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Consortium Metadata</h3>
              <dl className="mt-4 space-y-3.5 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Executive Leadership</dt>
                  <dd className="font-semibold text-foreground">Prof. Joseph Omololu-Aso</dd>
                  <dd className="text-xs text-muted-foreground">Founding Director-General &amp; CEO, CPM Int'l Institute</dd>
                </div>
                <div className="border-t border-border/50 pt-2.5">
                  <dt className="text-xs text-muted-foreground">Key Focus Areas</dt>
                  <dd className="font-medium text-foreground">Climate–Pathogen Nexus · CHIP™ AI · One Health · AMR</dd>
                </div>
                <div className="border-t border-border/50 pt-2.5">
                  <dt className="text-xs text-muted-foreground">Photo Archive</dt>
                  <dd className="text-xs font-semibold text-primary">33 High-Resolution Strategic Session Images</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-8 text-base sm:text-lg leading-relaxed text-foreground/85 space-y-4">
            <p>
              The <strong>CPM International Research Institute for Climate Health</strong> brings together multidisciplinary experts across clinical microbiology, infectious disease epidemiology, pathogenomics, artificial intelligence, and environmental health.
            </p>
            <p>
              The 33 photographic highlights below document executive council meetings, strategic planning sessions, field vector surveillance briefings, and collaborative workshops designed to advance the Institute’s flagship innovation—the <strong>Climate Health Intelligence Platform (CHIP™)</strong>—and regional public health resilience.
            </p>
          </div>
        </div>
      </article>

      {/* ══════════════════════════════════════════════════════════════
          EVENT 2: ACEGID SCIENTIFIC DELEGATION & PHOTO GALLERY
      ══════════════════════════════════════════════════════════════ */}
      <article id="event-acegid" className="border-b border-border/60 py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">

          {/* Article Header & Metadata Card */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-primary mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 uppercase tracking-wider text-primary">
                  <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" /> Facility Tour & Scientific Engagement
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> Redeemer's University, Ede, Nigeria</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl leading-tight font-normal text-foreground tracking-tight">
                ACEGID HOSTS DELEGATION FROM CPM INTERNATIONAL RESEARCH INSTITUTE, OAUTHC AND OAU FOR SCIENTIFIC ENGAGEMENT ON PATHOGENOMICS AND CLIMATE-HEALTH INNOVATION
              </h2>

              <p className="mt-3 font-serif text-base sm:text-lg text-muted-foreground leading-relaxed">
                Redeemer's University Showcases World-Class Genomics Infrastructure to Emerging National Climate-Health and Infectious Disease Consortium
              </p>
            </div>

            {/* Metadata Card */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 lg:col-span-4 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Engagement Metadata</h3>
              <dl className="mt-4 space-y-3.5 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Delegation Leader</dt>
                  <dd className="font-semibold text-foreground">Prof. Joseph Omololu-Aso</dd>
                  <dd className="text-xs text-muted-foreground">DG/CEO CPM Institute & Prof. Infectious Disease, OAU</dd>
                </div>
                <div className="border-t border-border/50 pt-2.5">
                  <dt className="text-xs text-muted-foreground">Collaborating CMD Leadership</dt>
                  <dd className="font-semibold text-foreground">Prof. John Akíntúndé Ọládọ̀tun Òkèníyì</dd>
                  <dd className="text-xs text-muted-foreground">Chief Medical Director, OAUTHC</dd>
                </div>
                <div className="border-t border-border/50 pt-2.5">
                  <dt className="text-xs text-muted-foreground">Key Partners</dt>
                  <dd className="font-medium text-foreground">CPM Research Institute · OAU · OAUTHC · ACEGID</dd>
                </div>
                <div className="border-t border-border/50 pt-2.5">
                  <dt className="text-xs text-muted-foreground">Programme Context</dt>
                  <dd className="text-xs italic text-foreground">"Transforming Clinical Diagnostics with PCR: From Microbiome Analysis to HPV Genotyping"</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              HIGH-IMPACT PHOTO GALLERY & SPOTLIGHT CAROUSEL
              (Engineered for 100% Mobile & Desktop Responsiveness, No Scroll Shift!)
          ══════════════════════════════════════════════════════════════ */}
          <div className="mt-12 rounded-2xl border border-border bg-card p-4 sm:p-6 lg:p-8 shadow-lg">
            
            {/* Gallery Collection Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-4 border-b border-border/40 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">Gallery Collection:</span>
              <button
                onClick={() => { setActiveGalleryTab("cpm"); setActivePhotoIndex(0); }}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition ${
                  activeGalleryTab === "cpm"
                    ? "bg-primary text-primary-foreground border-primary font-semibold shadow-xs"
                    : "bg-background text-foreground border-border hover:bg-muted"
                }`}
              >
                CPM Strategic &amp; Field Sessions (33)
              </button>
              <button
                onClick={() => { setActiveGalleryTab("acegid"); setActivePhotoIndex(0); }}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition ${
                  activeGalleryTab === "acegid"
                    ? "bg-primary text-primary-foreground border-primary font-semibold shadow-xs"
                    : "bg-background text-foreground border-border hover:bg-muted"
                }`}
              >
                ACEGID Facility Tour (26)
              </button>
              <button
                onClick={() => { setActiveGalleryTab("all"); setActivePhotoIndex(0); }}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition ${
                  activeGalleryTab === "all"
                    ? "bg-primary text-primary-foreground border-primary font-semibold shadow-xs"
                    : "bg-background text-foreground border-border hover:bg-muted"
                }`}
              >
                All Collections (59)
              </button>
            </div>

            {/* Gallery Header Controls */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between border-b border-border pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <ImageIcon className="h-4 w-4" /> Photographic Highlights ({currentPhotos.length} Images)
                </div>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Swipe or click thumbnails below to view high-resolution event and strategic session photos.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Autoplay Toggle Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border transition ${
                    isPlaying ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-border bg-background text-foreground hover:bg-muted"
                  }`}
                  title={isPlaying ? "Click to Pause Autoplay" : "Click to Enable Autoplay"}
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5 text-emerald-600" /> : <Play className="h-3.5 w-3.5 text-primary" />}
                  <span>{isPlaying ? "Autoplay ON" : "Autoplay OFF"}</span>
                </button>

                {/* Grid Mode Toggle */}
                <button
                  onClick={() => setIsGridMode(!isGridMode)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border transition ${
                    isGridMode ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  <Grid className="h-3.5 w-3.5" />
                  <span>{isGridMode ? "Spotlight View" : "Grid View"}</span>
                </button>

                {/* Lightbox Expand */}
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition shadow-sm"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </button>
              </div>
            </div>

            {/* SPOTLIGHT DISPLAY MODE */}
            {!isGridMode ? (
              <div className="mt-5 space-y-4">
                {/* Main Image Box with Touch Swipe */}
                <div
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="relative overflow-hidden rounded-xl bg-slate-950 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full flex items-center justify-center select-none shadow-inner"
                >
                  <img
                    src={currentPhotos[activePhotoIndex]?.url}
                    alt={currentPhotos[activePhotoIndex]?.caption}
                    className="h-full w-full object-contain transition-opacity duration-300"
                  />

                  {/* Gradient Overlay for Caption & Index */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent p-4 sm:p-6 text-white">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                      <div>
                        {currentPhotos[activePhotoIndex]?.title && (
                          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
                            {currentPhotos[activePhotoIndex]?.title}
                          </p>
                        )}
                        <p className="text-xs sm:text-base font-medium text-white/95 leading-snug max-w-3xl">
                          {currentPhotos[activePhotoIndex]?.caption}
                        </p>
                      </div>
                      <span className="shrink-0 self-start sm:self-auto rounded-md bg-white/20 px-2.5 py-1 text-xs font-mono text-white backdrop-blur-md">
                        {activePhotoIndex + 1} / {currentPhotos.length}
                      </span>
                    </div>
                  </div>

                  {/* Prev / Next Buttons */}
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black/90 hover:scale-105 active:scale-95 shadow-md"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>

                  <button
                    onClick={nextPhoto}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black/90 hover:scale-105 active:scale-95 shadow-md"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>

                {/* Horizontal Thumbnail Strip */}
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Thumbnail Selector ({currentPhotos.length} Photos):
                  </p>
                  <div
                    ref={thumbnailContainerRef}
                    className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border"
                  >
                    {currentPhotos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setActivePhotoIndex(index);
                          setIsPlaying(false); // Stop autoplay when user manually selects an image!
                        }}
                        className={`relative shrink-0 h-14 w-20 sm:h-18 sm:w-24 overflow-hidden rounded-lg border-2 transition-all ${
                          index === activePhotoIndex
                            ? "border-primary ring-2 ring-primary/30 opacity-100 scale-105"
                            : "border-transparent opacity-50 hover:opacity-100"
                        }`}
                      >
                        <img src={photo.url} alt={photo.caption} className="h-full w-full object-cover" />
                        <span className="absolute bottom-0.5 right-0.5 rounded bg-black/80 px-1 text-[9px] font-mono text-white">
                          {index + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* GRID VIEW MODE */
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-h-[600px] overflow-y-auto pr-1">
                {currentPhotos.map((photo, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setActivePhotoIndex(index);
                      setIsGridMode(false);
                      setIsPlaying(false);
                    }}
                    className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-slate-950 aspect-[4/3] shadow-sm hover:border-primary transition-all duration-200 hover:-translate-y-1"
                  >
                    <img src={photo.url} alt={photo.caption} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-end">
                      <p className="text-[11px] font-medium text-white line-clamp-2 leading-tight">
                        {photo.caption}
                      </p>
                    </div>
                    <span className="absolute top-2 left-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-mono text-white">
                      #{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Article Main Text Content */}
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-foreground/85 lg:col-span-8">
              <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:text-primary">
                The African Centre of Excellence for Genomics of Infectious Diseases (ACEGID), Redeemer’s University, Ede, recently hosted a scientific delegation from CPM International Research Institute for Climate Health as part of activities associated with the programme titled:
              </p>

              <blockquote className="rounded-r-xl border-l-4 border-primary bg-primary/5 p-5 sm:p-6 font-serif text-lg sm:text-xl italic text-foreground shadow-sm">
                “Transforming Clinical Diagnostics with PCR: From Microbiome Analysis to HPV Genotyping.”
              </blockquote>

              <p>
                The visit formed part of ongoing efforts to strengthen scientific capacity, institutional collaboration, and knowledge exchange in the areas of molecular diagnostics, pathogen genomics, infectious disease surveillance, antimicrobial resistance (AMR), and One Health innovation.
              </p>

              <p>
                The delegation was led by <strong>Professor Joseph Omololu-Aso</strong>, Professor of Infectious Disease and Climate Change Intervention at Obafemi Awolowo University and Director-General/CEO of CPM International Research Institute for Climate Health.
              </p>

              <p>
                The visit was undertaken with the support and encouragement of <strong>Professor John Akíntúndé Ọládọ̀tun Òkèníyì</strong>, Chief Medical Director of Obafemi Awolowo University Teaching Hospitals Complex (OAUTHC), under the growing collaboration framework involving CPM International Research Institute, Obafemi Awolowo University (OAU), and OAUTHC.
              </p>

              {/* Sub-section 1 */}
              <div className="pt-4 border-t border-border/40">
                <h3 className="font-serif text-2xl font-normal text-foreground">Scientific Engagement and Facility Tour</h3>
                <p className="mt-3">
                  Although the scheduled onsite workshop sessions did not proceed as originally planned, the visiting team was warmly received by representatives of Redeemer’s University and ACEGID and was provided an extensive guided tour of the Centre’s facilities.
                </p>
                <p className="mt-3">
                  The delegation had the opportunity to observe cutting-edge infrastructure supporting:
                </p>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {[
                    "Molecular diagnostics",
                    "Pathogen genomics",
                    "Genomic surveillance",
                    "Bioinformatics & computational biology",
                    "Advanced PCR technologies",
                    "Infectious disease research",
                    "Public health preparedness & outbreak systems"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 rounded-lg border border-border bg-card p-3 shadow-xs">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      <span className="text-xs sm:text-sm font-medium text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-section 2 */}
              <div className="pt-4 border-t border-border/40">
                <h3 className="font-serif text-2xl font-normal text-foreground">Advancing Climate-Health, Pathogenomics & One Health</h3>
                <p className="mt-3">
                  The engagement is particularly relevant to ongoing efforts by CPM International Research Institute, OAU, and OAUTHC to strengthen climate-sensitive infectious disease surveillance and implementation science in Nigeria.
                </p>

                <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                    <Sparkles className="h-4 w-4" /> Osun State Climate-Health Surveillance Pilot
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                    CPM International Research Institute, working in collaboration with OAUTHC and Obafemi Awolowo University, has commenced implementation activities under the <strong>Osun State Climate-Health Surveillance Pilot</strong>, serving as an emerging clinical demonstration platform for evidence generation and public health innovation.
                  </p>
                </div>
              </div>

              {/* Sub-section 3 */}
              <div className="pt-4 border-t border-border/40">
                <h3 className="font-serif text-2xl font-normal text-foreground">Institutional Collaboration & Appreciation</h3>
                <p className="mt-3">
                  Professor Joseph Omololu-Aso noted that exposure to world-class pathogenomics infrastructure remains essential for the development of sustainable national platforms capable of supporting disease surveillance, outbreak preparedness, precision public health, and translational research.
                </p>
                <p className="mt-3">
                  The visiting delegation expressed profound appreciation to the management and staff of Redeemer’s University and ACEGID for their hospitality, professionalism, and commitment to scientific leadership across Africa.
                </p>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="space-y-6 lg:col-span-4">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
                <h4 className="font-serif text-lg font-normal text-foreground border-b border-border pb-3">Strategic Highlights</h4>
                <div className="mt-4 space-y-3.5 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">1</span>
                    <p><strong className="text-foreground">Genomics Synergy:</strong> Bridging clinical diagnostics with high-throughput sequencing.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">2</span>
                    <p><strong className="text-foreground">Osun State Pilot:</strong> Real-time climate-pathogen field data collection.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">3</span>
                    <p><strong className="text-foreground">One Health Framework:</strong> Unifying clinical medicine, climate science, and public health.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ══════════════════════════════════════════════════════════════
          EVENT 2: OLUBADAN OF IBADANLAND ROYAL AUDIENCE
      ══════════════════════════════════════════════════════════════ */}
      <article id="event-olubadan" className="border-b border-border/60 bg-secondary/30 py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">

          {/* Article Header & Metadata Card */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-primary mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 uppercase tracking-wider text-primary">
                  <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" /> Royal Audience & Stakeholder Engagement
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3.5 w-3.5" /> 13 April 2026</span>
                <span className="text-muted-foreground">•</span>
                <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> Palace of the Olubadan of Ibadanland</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl leading-tight font-normal text-foreground tracking-tight">
                OLUBADAN OF IBADANLAND RECEIVES CPM INTERNATIONAL RESEARCH INSTITUTE DELEGATION, EXPRESSES SUPPORT FOR CLIMATE-HEALTH AND ONE HEALTH INNOVATION INITIATIVE
              </h2>

              <p className="mt-3 font-serif text-base sm:text-lg text-muted-foreground leading-relaxed">
                Historic Palace Engagement Strengthens Vision for Climate-Sensitive Infectious Disease Research, Pathogenomics, AMR and One Health Innovation in Ibadanland
              </p>
            </div>

            {/* Metadata Card */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 lg:col-span-4 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Engagement Metadata</h3>
              <dl className="mt-4 space-y-3.5 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Royal Audience Host</dt>
                  <dd className="font-semibold text-foreground">His Imperial Majesty, Oba Rashidi Adewolu Akanmu Ladoja</dd>
                  <dd className="text-xs text-muted-foreground">Olubadan of Ibadanland</dd>
                </div>
                <div className="border-t border-border/50 pt-2.5">
                  <dt className="text-xs text-muted-foreground">Institute Leadership</dt>
                  <dd className="font-semibold text-foreground">Prof. Joseph Omololu-Aso</dd>
                  <dd className="text-xs text-muted-foreground">Director-General/CEO, CPM Research Institute</dd>
                </div>
                <div className="border-t border-border/50 pt-2.5">
                  <dt className="text-xs text-muted-foreground">Audience Facilitation</dt>
                  <dd className="font-semibold text-foreground">Rear Admiral Ibikunle Akintola (Rtd.)</dd>
                  <dd className="text-xs text-muted-foreground">Are Aago of Ibadanland</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Article Main Text Content */}
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-foreground/85 lg:col-span-8">
              <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:text-primary">
                The Director-General and Chief Executive Officer of CPM International Research Institute for Climate Health, <strong>Professor Joseph Omololu-Aso</strong>, on 13th April 2026 paid an official visit to the Palace of His Imperial Majesty, <strong>Oba Rashidi Adewolu Akanmu Ladoja</strong>, Olubadan of Ibadanland, as part of ongoing stakeholder engagement and strategic consultations on advancing climate-health innovation, infectious disease preparedness, pathogenomics, antimicrobial resistance (AMR), and One Health research in Nigeria.
              </p>

              <p>
                The visit was facilitated through the distinguished support of the Are Aago of Ibadanland, <strong>Rear Admiral Ibikunle Akintola (Rtd.)</strong>, who graciously arranged the audience and accompanied the engagement.
              </p>

              {/* Sub-section 1 */}
              <div className="pt-4 border-t border-border/40">
                <h3 className="font-serif text-2xl font-normal text-foreground">Royal Audience and Strategic Discussions</h3>
                <p className="mt-3">
                  During the meeting, Professor Omololu-Aso presented the vision of CPM International Research Institute for Climate Health, including ongoing initiatives in climate-sensitive infectious disease surveillance, pathogenomics, antimicrobial resistance research, One Health innovation, and public health preparedness.
                </p>
                <p className="mt-3">
                  Particular attention was given to the emerging concept of establishing an <strong>innovation and research hub</strong> that would contribute to scientific advancement, workforce development, disease surveillance, research capacity strengthening, and community impact within Ibadanland and beyond.
                </p>
              </div>

              {/* Sub-section 2 */}
              <div className="pt-4 border-t border-border/40">
                <h3 className="font-serif text-2xl font-normal text-foreground">Royal Encouragement & Traditional Partnership</h3>
                <blockquote className="rounded-r-xl border-l-4 border-primary bg-card p-5 sm:p-6 font-serif text-lg sm:text-xl leading-relaxed text-foreground shadow-sm">
                  "His Imperial Majesty warmly received the delegation and expressed appreciation for initiatives aimed at advancing health, research, innovation, and human capacity development. The Olubadan encouraged the pursuit of impactful scientific and public health initiatives capable of benefiting Ibadanland, Oyo State, Nigeria, and the wider African region."
                </blockquote>
                <p className="mt-3">
                  His Imperial Majesty assured the delegation of his goodwill, fatherly support, prayers, and openness to future engagements as the vision continues to develop.
                </p>
              </div>

              {/* Documentation Statement Card */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <Shield className="h-4 w-4" /> Official Palace Audience Report Note
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  This report documents the official audience granted to Professor Joseph Omololu-Aso, Director-General/CEO of CPM International Research Institute for Climate Health, by His Imperial Majesty, Oba Rashidi Adewolu Akanmu Ladoja, Olubadan of Ibadanland, on 13 April 2026.
                </p>
                <p className="mt-2 text-xs italic text-muted-foreground">
                  *Photographs were not taken during this initial courtesy and strategic engagement. Future meetings and project activities will be documented as appropriate.*
                </p>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="space-y-6 lg:col-span-4">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
                <h4 className="font-serif text-lg font-normal text-foreground border-b border-border pb-3">Palace Engagement Focus</h4>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>Establishment of Innovation & Research Hub in Ibadanland</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>Role of Traditional Leadership in Public Health Preparedness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>Centre of Excellence on Climate-Sensitive Diseases & AMR</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ══════════════════════════════════════════════════════════════
          EVENT 3: GLOBAL KICK-OFF DIALOGUE (HPA-BMZ GERMANY)
      ══════════════════════════════════════════════════════════════ */}
      <article id="event-hpa-bmz" className="py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">

          {/* Article Header & Metadata Card */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-primary mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 uppercase tracking-wider text-primary">
                  <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" /> Global International Dialogue
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3.5 w-3.5" /> 7 July 2026</span>
                <span className="text-muted-foreground">•</span>
                <span className="flex items-center gap-1 text-muted-foreground"><Globe className="h-3.5 w-3.5" /> Virtual Forum (Germany)</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl leading-tight font-normal text-foreground tracking-tight">
                Global Kick-off Dialogue on Climate Change and Health: Engaging with the Hospital Partnerships Alliance (HPA–BMZ), Germany
              </h2>

              <p className="mt-3 font-serif text-base sm:text-lg text-muted-foreground leading-relaxed">
                CPM International Research Institute Presents AI-Enabled CP-Nexus Framework for Climate-Sensitive Disease Early Warning at High-Level International Forum
              </p>
            </div>

            {/* Metadata Card */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 lg:col-span-4 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Partnership Details</h3>
              <dl className="mt-4 space-y-3.5 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Organizers</dt>
                  <dd className="font-semibold text-foreground">Hospital Partnerships Alliance (HPA)</dd>
                  <dd className="text-xs text-muted-foreground">German Federal Ministry for Economic Cooperation and Development (BMZ) & GIZ</dd>
                </div>
                <div className="border-t border-border/50 pt-2.5">
                  <dt className="text-xs text-muted-foreground">CPM Delegation</dt>
                  <dd className="font-semibold text-foreground">Prof. Joseph Omololu-Aso & Delegates</dd>
                  <dd className="text-xs text-muted-foreground">Multidisciplinary Team & Postgraduate Researchers</dd>
                </div>
                <div className="border-t border-border/50 pt-2.5">
                  <dt className="text-xs text-muted-foreground">Featured Framework</dt>
                  <dd className="font-medium text-foreground">Climate–Pathogen Nexus (CP-Nexus) AI Engine</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Article Main Text Content */}
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-foreground/85 lg:col-span-8">
              <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:text-primary">
                The <strong>CPM International Research Institute for Climate Health</strong>, Nigeria, proudly participated in the <strong>Global Kick-off Dialogue on Climate Change and Health</strong>, organized by the Hospital Partnerships Alliance (HPA) in collaboration with the German Federal Ministry for Economic Cooperation and Development (BMZ) and implemented through GIZ, Germany.
              </p>

              <p>
                The virtual high-level engagement brought together healthcare leaders, researchers, clinicians, public health experts, and institutions from across the world to initiate collaborative discussions on developing innovative <strong>Flagship Initiatives</strong> aimed at strengthening climate-resilient health systems in low- and middle-income countries (LMICs).
              </p>

              <div className="my-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
                <h4 className="flex items-center gap-2 font-serif text-xl font-normal text-foreground">
                  <Award className="h-5 w-5 text-primary" /> Presenting the CP-Nexus AI Framework
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  The Institute shared its vision for advancing AI-enabled climate-health intelligence, particularly through the <strong>Climate–Pathogen Nexus (CP-Nexus)</strong> framework for the early detection and prediction of climate-sensitive infectious disease threats.
                </p>
              </div>

              <p>
                The participation marks another important milestone in CPM International Research Institute for Climate Health’s growing global engagement and reinforces its commitment to building strategic international partnerships that address the complex intersection of climate change, infectious diseases, artificial intelligence, and global health.
              </p>
            </div>

            {/* Sidebar Summary */}
            <div className="space-y-6 lg:col-span-4">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
                <h4 className="font-serif text-lg font-normal text-foreground border-b border-border pb-3">Global Engagement Focus</h4>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>AI-Enabled Climate Health Intelligence</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>International Flagship Initiatives for LMICs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Early Warning for Pathogen Threat Spikes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ══════════════════════════════════════════════════════════════
          FULLSCREEN LIGHTBOX MODAL (Touch Swipe & Keyboard Navigation)
      ══════════════════════════════════════════════════════════════ */}
      {isLightboxOpen && (
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 sm:p-6 backdrop-blur-xl select-none"
        >
          {/* Lightbox Controls Header */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-10">
            <div className="text-white text-xs font-mono">
              {activePhotoIndex + 1} / {currentPhotos.length}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsGridMode(!isGridMode)}
                className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20 transition"
              >
                <Grid className="h-3.5 w-3.5" /> {isGridMode ? "Single View" : "All Photos"}
              </button>

              <button
                onClick={() => setIsLightboxOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
                aria-label="Close Lightbox"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {!isGridMode ? (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition z-10"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>

              <div className="max-h-[85vh] max-w-[92vw] flex flex-col items-center">
                <img
                  src={currentPhotos[activePhotoIndex]?.url}
                  alt={currentPhotos[activePhotoIndex]?.caption}
                  className="max-h-[72vh] sm:max-h-[78vh] w-auto object-contain rounded-xl shadow-2xl"
                />
                <p className="mt-3 text-center text-xs sm:text-sm font-medium text-white/90 max-w-2xl leading-relaxed">
                  {currentPhotos[activePhotoIndex]?.caption}
                </p>
              </div>

              <button
                onClick={nextPhoto}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition z-10"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          ) : (
            <div className="w-full max-w-6xl max-h-[80vh] overflow-y-auto pt-14 pb-6 px-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {currentPhotos.map((photo, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setActivePhotoIndex(index);
                      setIsGridMode(false);
                    }}
                    className={`relative cursor-pointer overflow-hidden rounded-lg aspect-[4/3] border-2 transition ${
                      index === activePhotoIndex ? "border-emerald-400 ring-2 ring-emerald-400/50" : "border-transparent opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img src={photo.url} alt={photo.caption} className="h-full w-full object-cover" />
                    <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[9px] font-mono text-white">
                      #{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}