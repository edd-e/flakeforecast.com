/**
 * POST /api/db/lookup
 * Body: { name: string, event: string, token: string }
 *
 * Returns a cached forecast if one exists for this name+event pair
 * that is less than 7 days old.
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.DB) {
    return json(
      {
        error:
          "D1 binding not configured. See setup comments at the top of this file.",
      },
      500,
    );
  }

  let name, event;
  try {
    ({ name, event } = await request.json());
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  if (!name || !event) {
    return json({ found: false });
  }

  const nameKey = normalize(name);
  const eventKey = normalize(event);

  try {
    const row = await env.DB.prepare(
      `
        SELECT is_flake, verdict_phrase, outcome_text
        FROM   forecasts
        WHERE  name_key  = ?
        AND    event_key = ?
        AND    created_at > datetime('now', '-7 days')
        LIMIT  1
      `,
    )
      .bind(nameKey, eventKey)
      .first();

    if (row) {
      return json({
        found: true,
        isFlake: Boolean(row.is_flake),
        verdictPhrase: row.verdict_phrase,
        outcomeText: row.outcome_text,
      });
    }

    return json({ found: false });
  } catch (err) {
    // DB errors should not break the UI — client will generate normally
    console.error("D1 lookup error:", err);
    return json({ found: false });
  }
}

function normalize(s) {
  return s.toLowerCase().trim().replace(/\s+/g, " ");
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
