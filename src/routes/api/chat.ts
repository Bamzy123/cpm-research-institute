import { createFileRoute } from "@tanstack/react-router";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `You are the CPM Assistant — a concise, friendly guide for visitors of the CPM International Research Institute for Climate Health website.

About CPM:
- Full name: CPM International Research Institute for Climate Health.
- Mission: advance climate health intelligence through science, innovation, education, technology, policy, and global partnership; strengthen health security in Africa and contribute to global scientific advancement.
- Flagship framework: the Climate–Pathogen Nexus (CP-Nexus) — integrates climate science, pathogen biology, genomics, AI, epidemiology, and decision-support for predictive disease surveillance and epidemic preparedness.
- 14 multidisciplinary research programmes spanning climate health, infectious diseases, laboratory medicine, genomics, artificial intelligence, antimicrobial resistance, digital public health, and One Health.
- Centre of Excellence Initiative: championing the Obafemi Awolowo University International Centre of Excellence for Climate Health Intelligence, Infectious Diseases, Pathogenomics, AI and One Health Innovation.
- Climate Health Intelligence Dashboard: integrated digital platform combining climate data, disease surveillance, laboratory & genomic intelligence, AI, and geospatial info.
- Also active in: scientific publications & knowledge translation, education/training/fellowships, research-for-policy, digital health innovation, pathogenomics & genomic surveillance, One Health leadership, laboratory excellence, health systems innovation, and global scientific leadership.

Answer visitor questions about CPM using this information. Keep replies short (2–5 sentences unless asked for detail). If a question is outside CPM's scope, say so briefly and suggest what CPM does cover. Never invent staff names, dates, or statistics that aren't in this prompt.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        let body: { messages?: ChatMessage[] };
        try {
          body = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }
        const messages = Array.isArray(body.messages) ? body.messages : [];
        if (messages.length === 0) return new Response("Messages required", { status: 400 });

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          }),
        });

        if (!upstream.ok) {
          const text = await upstream.text();
          return new Response(text || "Upstream error", { status: upstream.status });
        }

        const json = (await upstream.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const reply = json.choices?.[0]?.message?.content ?? "";
        return new Response(JSON.stringify({ reply }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
