-- Table
CREATE TABLE IF NOT EXISTS forecasts (
  name_key       TEXT    NOT NULL,
  event_key      TEXT    NOT NULL,
  is_flake       INTEGER NOT NULL,
  verdict_phrase TEXT    NOT NULL,
  outcome_text   TEXT    NOT NULL,
  created_at     TEXT    NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (name_key, event_key)
);

-- Triggers
CREATE TRIGGER IF NOT EXISTS cleanup_after_insert
AFTER INSERT ON forecasts
BEGIN
  DELETE FROM forecasts WHERE created_at < datetime('now', '-7 days');
END;

CREATE TRIGGER IF NOT EXISTS cleanup_after_update
AFTER UPDATE ON forecasts
BEGIN
  DELETE FROM forecasts WHERE created_at < datetime('now', '-7 days');
END;
