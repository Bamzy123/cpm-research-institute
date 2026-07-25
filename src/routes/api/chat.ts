import { createFileRoute } from "@tanstack/react-router";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `You are the CPM Assistant — an intelligent, authoritative, and friendly scientific guide for visitors of the CPM International Research Institute for Climate Health website.

Key Knowledge Base:

1. ABOUT CPM INSTITUTE:
- Full Name: CPM International Research Institute for Climate Health.
- Leadership: Professor Joseph Omololu-Aso (Director-General / CEO & Professor of Infectious Disease and Climate Change Intervention at Obafemi Awolowo University).
- Key Partners: Obafemi Awolowo University (OAU), Obafemi Awolowo University Teaching Hospitals Complex (OAUTHC) led by CMD Prof. John Akíntúndé Ọládọ̀tun Òkèníyì, NCDC, Redeemer's University (ACEGID), and international partners.
- Mission: Advance climate health intelligence through science, innovation, education, technology, policy, and global partnership; strengthen health security in Africa and worldwide.
- Core Focus Areas: Climate-sensitive infectious disease surveillance, pathogenomics, molecular epidemiology, antimicrobial resistance (AMR), One Health innovation, and climate-resilient health systems.

2. FLAGSHIP SCIENTIFIC INNOVATION — CHIP™:
- CHIP™ stands for Climate Health Intelligence Platform.
- Description: An AI-enabled Climate Health Digital Twin that transforms public health surveillance into an intelligent, predictive, and continuously learning decision-support ecosystem.
- Tagline: CHIP™ — Integrate • Predict • Protect • Prepare.
- 1-Platform Architecture: One platform, one harmonized database, one AI engine, one Digital Twin, and one integrated decision dashboard.
- 9 Core Capabilities:
  1. Climate-sensitive infectious disease surveillance
  2. AI-driven outbreak prediction
  3. Early warning and risk intelligence
  4. Environmental and satellite data integration
  5. Laboratory and pathogen genomic surveillance
  6. Digital decision-support systems
  7. One Health implementation
  8. Climate-resilient health systems
  9. Resource prioritization and policy planning

3. RECENT LANDMARK EVENTS & ENGAGEMENTS:
a) ACEGID Scientific Delegation & Facility Tour (Redeemer's University, Ede):
   - Led by Prof. Joseph Omololu-Aso with OAU & OAUTHC leadership.
   - Programme: "Transforming Clinical Diagnostics with PCR: From Microbiome Analysis to HPV Genotyping".
   - Toured cutting-edge genomics, molecular diagnostics, bioinformatics, and outbreak response infrastructure.
   - Showcases 25 high-resolution event photographs on the /events page gallery.
b) Olubadan of Ibadanland Royal Audience (13 April 2026):
   - Audience with His Imperial Majesty Oba Rashidi Adewolu Akanmu Ladoja, Olubadan of Ibadanland.
   - Facilitated by Are Aago Rear Admiral Ibikunle Akintola (Rtd.).
   - Strategic discussions on establishing a Climate-Health Innovation & Research Hub in Ibadanland, traditional leadership in public health, and One Health implementation.
c) Global Kick-off Dialogue on Climate Change & Health (7 July 2026):
   - Organized by Hospital Partnerships Alliance (HPA), BMZ (German Federal Ministry for Economic Cooperation and Development), and GIZ Germany.
   - Multidisciplinary CPM delegation presented the AI-enabled Climate–Pathogen Nexus (CP-Nexus) framework for early disease threat prediction in LMICs.

4. DEMONSTRATION PLATFORM:
- Osun State Climate-Health Surveillance Pilot: Emerging clinical demonstration platform for real-time climate-pathogen evidence generation and public health innovation in collaboration with OAU and OAUTHC.

Answer visitor questions clearly, professionally, and accurately using this information. Keep answers concise (2-4 paragraphs max). Be enthusiastic about CPM's science and impact!`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { messages?: ChatMessage[] };
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ reply: getFallbackResponse("") }), {
            headers: { "Content-Type": "application/json" },
          });
        }

        const messages = Array.isArray(body.messages) ? body.messages : [];
        const lastMsg = messages[messages.length - 1]?.content || "";

        const key = process.env.LOVABLE_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

        if (key) {
          try {
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

            if (upstream.ok) {
              const json = (await upstream.json()) as {
                choices?: { message?: { content?: string } }[];
              };
              const reply = json.choices?.[0]?.message?.content ?? "";
              if (reply.trim()) {
                return new Response(JSON.stringify({ reply }), {
                  headers: { "Content-Type": "application/json" },
                });
              }
            }
          } catch (e) {
            console.error("Upstream AI call failed, switching to local knowledge engine:", e);
          }
        }

        // Always fallback seamlessly to local knowledge engine if upstream is unavailable!
        const reply = getFallbackResponse(lastMsg);
        return new Response(JSON.stringify({ reply }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});

function getFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("chip") || q.includes("digital twin") || q.includes("platform")) {
    return "CHIP™ (Climate Health Intelligence Platform) is CPM International Research Institute's flagship scientific innovation — an AI-enabled Climate Health Digital Twin that transforms public health surveillance into a predictive decision-support ecosystem. It unifies one platform, one database, one AI engine, one Digital Twin, and one decision dashboard across 9 core capabilities. Learn more on our /chip page!";
  }

  if (q.includes("acegid") || q.includes("redeemer") || q.includes("ede") || q.includes("pcr") || q.includes("genomics")) {
    return "CPM International Research Institute, along with OAU and OAUTHC leadership, recently led a scientific delegation to ACEGID at Redeemer's University, Ede. The visit focused on pathogenomics, molecular diagnostics, AMR surveillance, and outbreak preparedness. You can explore the full report and interactive 25-photo gallery on our /events page!";
  }

  if (q.includes("olubadan") || q.includes("ibadan") || q.includes("palace") || q.includes("ladoja")) {
    return "On 13 April 2026, DG/CEO Prof. Joseph Omololu-Aso and Rear Admiral Ibikunle Akintola (Rtd.) had an official audience with His Imperial Majesty Oba Rashidi Adewolu Akanmu Ladoja, Olubadan of Ibadanland. The meeting focused on establishing an Innovation & Research Hub in Ibadanland and strengthening traditional leadership support for One Health.";
  }

  if (q.includes("germany") || q.includes("hpa") || q.includes("bmz") || q.includes("giz") || q.includes("dialogue")) {
    return "On 7 July 2026, CPM Institute participated in the Global Kick-off Dialogue on Climate Change and Health organized by HPA, BMZ, and GIZ Germany. Our multidisciplinary team presented the AI-enabled Climate–Pathogen Nexus (CP-Nexus) framework for early threat prediction in low- and middle-income countries.";
  }

  if (q.includes("osun") || q.includes("pilot") || q.includes("surveillance")) {
    return "The Osun State Climate-Health Surveillance Pilot is an active clinical demonstration platform developed by CPM Institute in collaboration with OAU and OAUTHC to generate real-time evidence for climate-sensitive pathogen surveillance and precision public health.";
  }

  if (q.includes("director") || q.includes("omololu") || q.includes("ceo") || q.includes("leader") || q.includes("okeniyi")) {
    return "CPM International Research Institute for Climate Health is led by Director-General/CEO Professor Joseph Omololu-Aso (OAU). Our collaborating leadership includes Chief Medical Director Prof. John Akíntúndé Ọládọ̀tun Òkèníyì (OAUTHC) and our multidisciplinary team of climate scientists, genomicists, and epidemiologists. Visit /leadership to read more!";
  }

  if (q.includes("contact") || q.includes("email") || q.includes("location") || q.includes("address") || q.includes("where")) {
    return "CPM International Research Institute for Climate Health is headquartered in Osun State, Nigeria, in collaboration with Obafemi Awolowo University (OAU) and OAUTHC. You can get in touch with us via the contact form on our home page or by emailing our secretariat.";
  }

  return "Welcome to CPM International Research Institute for Climate Health! We advance research across climate-sensitive infectious diseases, pathogenomics, AI-driven surveillance (CHIP™), antimicrobial resistance, and One Health innovation. Feel free to ask about our CHIP™ platform, recent ACEGID genomics visit, Olubadan palace audience, or global partnerships!";
}
