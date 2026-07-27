import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles, HelpCircle } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hello! I am the  CPM Int'l Scientific Assistant. Ask me anything about our CHIP™ platform, pathogenomics research, ACEGID visit, Olubadan palace audience, or global climate-health initiatives.",
};

const SUGGESTIONS = [
  "What is CHIP™?",
  "Tell me about the ACEGID visit",
  "Olubadan Palace Audience",
  "HPA–BMZ Germany Dialogue",
  "Osun State Surveillance Pilot",
];

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, loading]);

  async function handleSend(textToSend?: string) {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const nextMessages: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (res.ok) {
        const data = (await res.json()) as { reply?: string };
        const reply = data.reply?.trim();
        if (reply) {
          setMessages((m) => [...m, { role: "assistant", content: reply }]);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn("Server API call error, using local  CPM Int'l knowledge engine:", err);
    }

    // Instant Client Fallback Knowledge Matcher - ALWAYS responds reliably!
    setTimeout(() => {
      const fallbackReply = getLocalCPMReply(text);
      setMessages((m) => [...m, { role: "assistant", content: fallbackReply }]);
      setLoading(false);
    }, 400);
  }

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Open  CPM Int'l Assistant"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 transition-all duration-300 hover:scale-110 hover:bg-primary/95 focus:outline-none ring-2 ring-primary/20"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Floating Panel */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 flex h-[min(580px,calc(100vh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-border bg-primary px-4 py-3.5 text-primary-foreground">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-emerald-300">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="font-serif text-base font-medium leading-tight"> CPM Int'l Assistant</p>
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-primary-foreground/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Always Active 24/7
                </div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close panel"
              className="rounded-lg p-1.5 text-primary-foreground/80 hover:bg-white/10 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          {/* Quick Suggestions Chips */}
          <div className="flex items-center gap-2 overflow-x-auto bg-muted/40 px-3 py-2 border-b border-border/60 scrollbar-none">
            <HelpCircle className="h-3.5 w-3.5 shrink-0 text-muted-foreground ml-1" />
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="shrink-0 rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-foreground/80 hover:border-primary hover:text-primary transition shadow-xs"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Messages Scroll View */}
          <div ref={scrollRef} className="flex-1 space-y-3.5 overflow-y-auto bg-background p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] rounded-2xl rounded-tr-xs bg-primary px-3.5 py-2.5 text-xs sm:text-sm text-primary-foreground shadow-sm"
                      : "max-w-[90%] rounded-2xl rounded-tl-xs border border-border/60 bg-muted/40 p-3.5 text-xs sm:text-sm leading-relaxed text-foreground shadow-xs"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground p-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                 CPM Int'l Assistant is querying response…
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-border bg-card p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about  CPM Int'l research, CHIP™, events..."
              className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:opacity-40 shadow-sm"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function getLocalCPMReply(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("chip") || q.includes("digital twin") || q.includes("platform")) {
    return "CHIP™ (Climate Health Intelligence Platform) is  CPM Int'l International Research Institute's flagship scientific innovation — an AI-enabled Climate Health Digital Twin that transforms public health surveillance into an intelligent, predictive decision-support ecosystem. It unifies one platform, one database, one AI engine, one Digital Twin, and one decision dashboard across 9 core capabilities. Explore more on our /chip page!";
  }

  if (q.includes("acegid") || q.includes("redeemer") || q.includes("ede") || q.includes("pcr") || q.includes("genomics")) {
    return " CPM Int'l International Research Institute, along with OAU and OAUTHC leadership, recently led a scientific delegation to ACEGID at Redeemer's University, Ede. The visit focused on pathogenomics, molecular diagnostics, AMR surveillance, and outbreak response. You can explore the full report and interactive 25-photo gallery on our /events page!";
  }

  if (q.includes("olubadan") || q.includes("ibadan") || q.includes("palace") || q.includes("ladoja")) {
    return "On 13 April 2026, DG/CEO Prof. Joseph Omololu-Aso and Rear Admiral Ibikunle Akintola (Rtd.) had an official audience with His Imperial Majesty Oba Rashidi Adewolu Akanmu Ladoja, Olubadan of Ibadanland. The meeting focused on establishing an Innovation & Research Hub in Ibadanland and strengthening traditional leadership support for One Health.";
  }

  if (q.includes("germany") || q.includes("hpa") || q.includes("bmz") || q.includes("giz") || q.includes("dialogue")) {
    return "On 7 July 2026,  CPM Int'l Institute participated in the Global Kick-off Dialogue on Climate Change and Health organized by HPA, BMZ, and GIZ Germany. Our multidisciplinary team presented the AI-enabled Climate–Pathogen Nexus (CP-Nexus) framework for early threat prediction in low- and middle-income countries.";
  }

  if (q.includes("osun") || q.includes("pilot") || q.includes("surveillance")) {
    return "The Osun State Climate-Health Surveillance Pilot is an active clinical demonstration platform developed by  CPM Int'l Institute in collaboration with OAU and OAUTHC to generate real-time evidence for climate-sensitive pathogen surveillance and precision public health.";
  }

  if (q.includes("director") || q.includes("omololu") || q.includes("ceo") || q.includes("leader") || q.includes("okeniyi")) {
    return " CPM Int'l International Research Institute for Climate Health is led by Director-General/CEO Professor Joseph Omololu-Aso (OAU). Our collaborating leadership includes Chief Medical Director Prof. John Akíntúndé Ọládọ̀tun Òkèníyì (OAUTHC) and our multidisciplinary team of climate scientists, genomicists, and epidemiologists. Visit /leadership to read more!";
  }

  if (q.includes("contact") || q.includes("email") || q.includes("location") || q.includes("address") || q.includes("where")) {
    return " CPM Int'l International Research Institute for Climate Health is headquartered in Osun State, Nigeria, in collaboration with Obafemi Awolowo University (OAU) and OAUTHC. You can get in touch with us via the contact form on our home page or by emailing our secretariat.";
  }

  return "Welcome to  CPM Int'l International Research Institute for Climate Health! We advance research across climate-sensitive infectious diseases, pathogenomics, AI-driven surveillance (CHIP™), antimicrobial resistance, and One Health innovation. Feel free to ask about our CHIP™ platform, recent ACEGID genomics visit, Olubadan palace audience, or global partnerships!";
}
