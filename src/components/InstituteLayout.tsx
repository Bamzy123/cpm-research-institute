import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function InstituteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="institute-page min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only z-[100] bg-primary px-5 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="institute-main outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  links?: { href: string; label: string }[];
};

export function PageIntro({ eyebrow, title, description, links = [] }: PageIntroProps) {
  return (
    <section className="page-intro border-b border-border" aria-labelledby="page-title">
      <div className="mx-auto max-w-[1320px] px-6 pb-9 pt-8 sm:pb-12 lg:px-10 lg:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-3 text-xs text-muted-foreground"
        >
          <Link
            to="/"
            className="inline-flex min-h-8 items-center hover:text-primary hover:underline underline-offset-4"
          >
            Home
          </Link>
          <span aria-hidden>/</span>
          <span aria-current="page">{eyebrow}</span>
        </nav>
        <div className="pb-2 pt-8 sm:pt-10 lg:pt-12">
          <p className="home-eyebrow">{eyebrow}</p>
          <h1
            id="page-title"
            className="mt-5 max-w-4xl font-serif text-[44px] font-normal leading-[1.06] tracking-[-0.04em] sm:text-6xl lg:text-[68px]"
          >
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {description}
          </p>
        </div>
        {links.length > 0 && (
          <nav
            aria-label="On this page"
            className="mt-7 flex flex-wrap gap-x-7 gap-y-1 border-t border-border pt-3 sm:mt-9"
          >
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="inline-flex min-h-11 items-center gap-3 text-xs font-medium text-primary hover:underline underline-offset-4"
              >
                {label}
                <ArrowDown className="h-3.5 w-3.5" aria-hidden />
              </a>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
