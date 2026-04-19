/**
 * Cloudflare Pages Function — /api/ai_forecast
 * POST body: { name: string, event: string, isFlake: boolean }
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

  let name, event, isFlake;
  try {
    ({ name, event, isFlake } = await request.json());
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  if (!name || !event || isFlake == null) {
    return json({ error: "Missing required fields." }, 400);
  }

  // ── Per-person personalities ─────────────────────────────────────────────────
  const personalities = {
    dragon:
      "chaotic, unreliable, always distracted by the next shiny thing (never malicious but chronically flaky)",
    queen:
      "dependable, punctual, the most reliable person in any group (cancellations are genuinely rare)",
    eddie:
      "well-meaning and enthusiastic but 50/50 on follow-through (loves the idea of plans more than executing them)",
  };

  const personality =
    personalities[name.toLowerCase()] ?? "a person of uncertain reliability";

  const systemPrompt = `Your task is to comment on someone attending (or avoiding) an UPCOMING social event.
    STRICT RULES:
    1. Use FUTURE TENSE only (e.g., 'will', 'is going to'): the event has not happened yet.
    2. Only refer to the person by name: do not assume gender, do not use pronouns.
    2. Reference or acknowledge the event: affirming attendance should be enthusiastic while excuses can be anywhere from typical to humorous.
    3. No quotation marks, no preamble, and no sign-off.
    4. Maximum 20 words.`;

  const userPrompt = isFlake
    ? `Context: A friend named ${name} (${personality}) is bailing on ${event}.`
    : `Context: A friend named ${name} (${personality}) is actually attending ${event}.`;

  // const systemPrompt =
  //   "Your task is to comment on someone attending (or avoiding) an upcoming and highly anticipated social event. " +
  //   "The event must be referenced in your final comment and make sense contextually. " +
  //   "Try to avoid using 'he/she' pronouns, if you must use their name use it in the third person. " +
  //   "Never use quotation marks. Never explain yourself. Respond with ONLY your comment — no preamble, no sign-off. Max 20 words. Here is your context: ";

  // const userPrompt = isFlake
  //   ? `A friend named ${name} (who is ${personality}) was invited to "${event}" and is going to bail.`
  //   : `A friend named ${name} (who is ${personality}) was invited to "${event}" and is actually showing up.`;

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
