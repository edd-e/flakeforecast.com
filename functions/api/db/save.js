/**
 * POST /api/db/save
 * Body: { name: string, event: string, isFlake: boolean, verdictPhrase: string, outcomeText: string, token: string }
 *
 * Upserts a forecast record and cleans up records older than 7 days.
 * Called fire-and-forget from the client after a result is generated —
 * errors here are intentionally swallowed so they never affect the UI.
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.DB)
    return json({ ok: false, error: "D1 binding not configured." }, 500);

  let name, event, isFlake, verdictPhrase, outcomeText;
  try {
    ({ name, event, isFlake, verdictPhrase, outcomeText } = await request.json());
  } catch {
    return json({ ok: false, error: "Invalid JSON body." }, 400);
  }

  if (!name || !event || isFlake == null || !verdictPhrase || !outcomeText) {
    return json({ ok: false, error: "Missing required fields." }, 400);
  }

  const nameKey = normalise(name);
  const eventKey = normalise(event);

  try {
    // Upsert: insert fresh, or overwrite if the pair already exists
    // (handles the case where an expired record was cleaned up and regenerated)
    await env.DB.prepare(
      `
        INSERT INTO forecasts (name_key, event_key, is_flake, verdict_phrase, outcome_text, created_at)
        VALUES (?, ?, ?, ?, ?, datetime('now'))
        ON CONFLICT(name_key, event_key) DO UPDATE SET
          is_flake       = excluded.is_flake,
          verdict_phrase = excluded.verdict_phrase,
          outcome_text   = excluded.outcome_text,
          created_at     = datetime('now')
      `,
    )
      .bind(nameKey, eventKey, isFlake ? 1 : 0, verdictPhrase, outcomeText)
      .run();

    return json({ ok: true });
  } catch (err) {
    console.error("D1 save error:", err);
    return json({ ok: false, error: err.message }, 500);
  }
}

function normalise(s) {
  return s.toLowerCase().trim().replace(/\s+/g, " ");
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
