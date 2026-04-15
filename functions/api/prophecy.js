/**
 * Cloudflare Pages Function — /api/prophecy
 * POST body: { event: string, verdict: "YES"|"NO", person: string, token: string }
 *
 * ── SETUP (Cloudflare Dashboard, one-time) ────────────────────────────────────
 *
 * 1. AI Binding
 *    Pages → Settings → Functions → AI Bindings
 *    Variable name : AI
 *    Service       : Workers AI
 *
 * 2. Secret token
 *    Pages → Settings → Environment Variables
 *    SECRET_TOKEN = your_secret_word
 *    Share the URL as: https://yoursite.pages.dev/?t=your_secret_word
 *    Requests without a valid token get a 401; the client silently falls back
 *    to static responses — no visible breakage for friends using the link.
 */

// export async function onRequestPost(context) {
//   const { request, env } = context;

//   if (!env.AI) {
//     return json({ error: 'AI binding not configured. See setup comments at the top of this file.' }, 500);
//   }

//   let event, verdict, person, token;
//   try {
//     ({ event, verdict, person, token } = await request.json());
//   } catch {
//     return json({ error: 'Invalid JSON body.' }, 400);
//   }

//   // ── Token check ──────────────────────────────────────────────────────────────
//   if (!env.SECRET_TOKEN || token !== env.SECRET_TOKEN) {
//     return json({ error: 'Unauthorized.' }, 401);
//   }

//   if (!event || !verdict || !person) {
//     return json({ error: 'Missing required fields.' }, 400);
//   }

//   const willFlake = verdict === 'YES';

//   // ── Per-person personalities ─────────────────────────────────────────────────
//   // Edit these freely to match how you actually know these people.
//   const personalities = {
//     Dragon : 'chaotic, unreliable, always distracted by the next shiny thing — never malicious but chronically flaky',
//     Queen  : 'dependable, punctual, the most reliable person in any group — cancellations are genuinely rare',
//     Eddie  : 'well-meaning and enthusiastic but 50/50 on follow-through; loves the idea of plans more than executing them',
//   };

//   const personality = personalities[person] ?? 'a person of uncertain reliability';

//   const systemPrompt =
//     'You write punchy, dry one-liners. ' +
//     'Never use quotation marks. Never explain yourself. ' +
//     'Respond with ONLY the one-liner — no preamble, no sign-off, nothing else.';

//   const userPrompt = willFlake
//     ? `${person} (${personality}) was invited to "${event}" and is going to bail.
// Write ONE dry, witty sentence (max 15 words) explaining why ${person} specifically would skip this event. Be specific to the event, not generic.`
//     : `${person} (${personality}) was invited to "${event}" and is actually showing up.
// Write ONE dry, witty sentence (max 15 words) that fits ${person}'s character and reacts to them coming to this particular event.`;

//   try {
//     const aiResponse = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
//       messages: [
//         { role: 'system', content: systemPrompt },
//         { role: 'user',   content: userPrompt   },
//       ],
//       max_tokens  : 60,
//       temperature : 0.9,
//     });

//     const raw  = aiResponse?.response ?? '';
//     const text = raw.replace(/^["']|["']$/g, '').trim();

//     return json({ text });
//   } catch (err) {
//     return json({ error: 'AI inference failed.', detail: err.message }, 502);
//   }
// }

// function json(body, status = 200) {
//   return new Response(JSON.stringify(body), {
//     status,
//     headers: { 'Content-Type': 'application/json' },
//   });
// }
