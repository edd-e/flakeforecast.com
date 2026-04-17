/**
 * Cloudflare Pages Function — /api/ai_forecast
 * POST body: { event: string, isFlake: boolean, person: string, token: string }
 *
 * ── SETUP (Cloudflare Dashboard, one-time) ────────────────────────────────────
 *
 * 1. AI Binding
 *    Pages → Settings → Functions → AI Bindings
 *    Variable name : AI
 *    Service       : Workers AI
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.AI) {
    return json(
      {
        error:
          "AI binding not configured. See setup comments at the top of this file.",
      },
      500,
    );
  }

  let person, event, isFlake;
  try {
    ({ event, isFlake, person } = await request.json());
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  if (!event || isFlake == null || !person) {
    return json({ error: "Missing required fields." }, 400);
  }

  // ── Per-person personalities ─────────────────────────────────────────────────
  const personalities = {
    Dragon:
      "chaotic, unreliable, always distracted by the next shiny thing (never malicious but chronically flaky)",
    Queen:
      "dependable, punctual, the most reliable person in any group (cancellations are genuinely rare)",
    Eddie:
      "well-meaning and enthusiastic but 50/50 on follow-through (loves the idea of plans more than executing them)",
  };

  const personality =
    personalities[person] ?? "a person of uncertain reliability";

  const systemPrompt =
    "Your task is to comment on someone attending (or avoiding) an upcoming and highly anticipated social event. " +
    "The event must be referenced in your final comment (the reference can be explicit, implicit, factual, or anything as long as it makes contextual sense). " +
    "Never use quotation marks. Never explain yourself. Respond with ONLY your comment — no preamble, no sign-off. Max 20 words";

  const userPrompt = isFlake
    ? `${person} (who is ${personality}) was invited to "${event}" and is going to bail.`
    : `${person} (who is ${personality}) was invited to "${event}" and is actually showing up.`;

  try {
    const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 60,
      temperature: 0.9,
    });

    const raw = aiResponse?.response ?? "";
    const text = raw.replace(/^["']|["']$/g, "").trim();

    return json({ text });
  } catch (err) {
    return json({ error: "AI inference failed.", detail: err.message }, 502);
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
