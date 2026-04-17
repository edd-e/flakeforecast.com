-- Migration: rename verdict → verdict_phrase, add is_flake boolean
-- Safe to run on existing data — records expire in 7 days anyway so we just clear stale rows.

ALTER TABLE forecasts RENAME COLUMN verdict TO verdict_phrase;

ALTER TABLE forecasts ADD COLUMN is_flake INTEGER NOT NULL DEFAULT 0;

-- Old verdict_phrase values are "YES"/"NO" — not valid phrases.
-- Backfill is_flake from them, then clear the stale text.
UPDATE forecasts SET is_flake = CASE WHEN verdict_phrase = 'YES' THEN 1 ELSE 0 END;
UPDATE forecasts SET verdict_phrase = '';
