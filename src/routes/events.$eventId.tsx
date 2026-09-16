import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar, Copy, MapPin, Share2 } from "lucide-react";
import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { eventRecordById, type EventId } from "../lib/event-data";

export const Route = createFileRoute("/events/$eventId")({
  component: EventDetailPage,
  head: ({ params }) => {
    const event = eventRecordById[params.eventId as EventId];
    return {
      meta: [
        {
          title: event
            ? `${event.label} | CPM Int'l Research Institute`
            : "Event | CPM Int'l Research Institute",
        },
        {
          name: "description",
          content:
            event?.summary ??
            "Scientific engagements and institutional events from CPM Int'l Research Institute.",
        },
      ],
    };
  },
});

function EventDetailPage() {
  const { eventId } = Route.useParams();
  const event = eventRecordById[eventId as EventId];
  const [copied, setCopied] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Event archive
          </p>
          <h1 className="mt-4 font-serif text-4xl">Event not found</h1>
          <p className="mt-4 text-muted-foreground">
            This event may have moved or is not yet published.
          </p>
          <Link
            to="/events"
            className="mt-8 inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Browse events
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const copyLink = async () => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/75 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Events archive
            </Link>
            <div className="mt-10 max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                {event.category}
              </p>
              <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {event.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/85">
                {event.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-primary-foreground/80">
                {event.date && (
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> {event.date}
                  </span>
                )}
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {event.location}
                </span>
              </div>
              <button
                type="button"
                onClick={copyLink}
                className="mt-8 inline-flex items-center gap-2 border border-white/25 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
              >
                {copied ? <Copy className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                {copied ? "Link copied" : "Copy event link"}
              </button>
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 py-14 sm:py-20">
          <div className="mx-auto max-w-[900px] px-6 lg:px-10">
            <div className="border-l-4 border-primary bg-primary/5 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Official event record
              </p>
              <p className="mt-3 font-serif text-xl leading-relaxed text-foreground sm:text-2xl">
                {event.summary}
              </p>
            </div>
            <p className="mt-10 text-base leading-relaxed text-muted-foreground sm:text-lg">
              This event is part of the CPM International Research Institute for Climate Health
              archive of scientific engagements, institutional partnerships and public health
              dialogues.
            </p>
            <Link
              to="/events"
              hash={event.anchor}
              className="mt-8 inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Read the full event report <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
