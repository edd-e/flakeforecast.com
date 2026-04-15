// ═══════════════════════════════════════════════════════════════════════
// SCREEN TRANSITIONS
// ═══════════════════════════════════════════════════════════════════════
const SCREENS = ["hero", "prophesying", "result"];
const TRANSITION_MS = 320; // keep in sync with --transition-dur in CSS

function showScreen(name) {
  const next = document.getElementById("screen-" + name);
  if (!next || next.classList.contains("screen--active")) return;

  const current = document.querySelector(".screen.screen--active");
  if (current) {
    current.classList.remove("screen--active");
    current.classList.add("screen--exit");
    setTimeout(() => current.classList.remove("screen--exit"), TRANSITION_MS);
  }

  next.classList.add("screen--active");
}

// ═══════════════════════════════════════════════════════════════════════
// CYCLING EYEBROW WORD  (unchanged)
// ═══════════════════════════════════════════════════════════════════════
const WORDS = [
  "Reliability",
  "Flakiness",
  "Friendship",
  "Truth",
  "Commitment",
  "Punctuality",
  "Excuses",
  "Chaos",
  "Promises",
  "Loyalty",
  "Vibes",
  "Deception",
  "Cancellations",
  "Hope",
  "Delusion",
  "Character",
  "Tardiness",
  "Audacity",
  "Memory",
  "Nerve",
  "Good Intentions",
  "Accountability",
  "Ghosts",
];

const wordSlot = document.getElementById("word-slot");
const wordInner = document.getElementById("word-slot-inner");

const probe = document.createElement("span");
probe.style.cssText =
  "position:absolute;visibility:hidden;white-space:nowrap;" +
  "font-size:11px;font-weight:300;letter-spacing:0.3em;text-transform:uppercase;" +
  'font-family:"DM Mono",monospace;';
document.body.appendChild(probe);

function measureWord(w) {
  probe.textContent = w;
  return probe.offsetWidth;
}

wordSlot.style.width = measureWord(WORDS[0]) + "px";
wordInner.style.transform = "translateY(0)";
wordInner.style.opacity = "1";

let wordIndex = 0;

function cycleWord() {
  wordIndex = (wordIndex + 1) % WORDS.length;
  const nextWord = WORDS[wordIndex];
  wordInner.classList.remove("slot-in");
  wordInner.classList.add("slot-out");
  wordInner.addEventListener(
    "animationend",
    function onOut() {
      wordInner.removeEventListener("animationend", onOut);
      wordInner.textContent = nextWord;
      wordSlot.style.width = measureWord(nextWord) + "px";
      wordInner.classList.remove("slot-out");
      void wordInner.offsetWidth;
      wordInner.classList.add("slot-in");
    },
    { once: true },
  );
}

setInterval(cycleWord, 3200);

// ═══════════════════════════════════════════════════════════════════════
// PEOPLE CONFIG  (unchanged)
// ═══════════════════════════════════════════════════════════════════════
const PEOPLE = {
  friend: {
    label: "My Friend",
    flakeChance: 0.5,
    useAI: false,
    responses: {
      flake: [
        "Their phone is already on silent. They're not coming.",
        "They said 'I'll try to make it.' That's always a no.",
        "Something will come up. It always comes up. It is, in fact, currently coming up.",
        "Their Uber is 'three minutes away.' It will remain three minutes away forever.",
        "History is the best predictor of the future. History says no.",
      ],
      show: [
        "They're actually coming. Don't ask questions. Just enjoy it.",
        "Shockingly, the stars have aligned in your favour.",
        "Mark the calendar. This one's a keeper.",
        "They confirmed. Twice. And they meant it.",
        "They're already in the car. Do not jinx this.",
      ],
    },
  },
  dragon: {
    label: "Dragon",
    flakeChance: 0.8,
    useAI: true,
    responses: {
      flake: [
        "Dragon has found something shinier. You were never the priority.",
        "Dragon said yes. Dragon always says yes. Dragon is not coming.",
        "The chaos energy is strong today. Dragon has exited the chat.",
        "Dragon's schedule is a work of abstract fiction. Today is no exception.",
        "Something caught Dragon's eye exactly 20 minutes before the plan. Classic.",
      ],
      show: [
        "Dragon is coming. This is a rare and sacred event. Treat it accordingly.",
        "Against all known Dragon lore — they're actually showing up.",
        "Dragon has committed. Do not question it. Do not mention their track record.",
        "The oracle is as surprised as you are. Dragon is en route.",
      ],
    },
  },
  queen: {
    label: "Queen",
    flakeChance: 0.2,
    useAI: true,
    responses: {
      flake: [
        "Even royalty cancels sometimes. This is one of those rare times.",
        "Queen has a conflict. A very important, very vague conflict.",
        "The court has been cancelled. Rescheduling is not on the agenda.",
        "Queen sends her regrets. And also her exact location, which is not here.",
      ],
      show: [
        "Queen arrives. As expected. As always. The reliable one.",
        "Queen confirmed, Queen committed, Queen is coming. Classic Queen.",
        "Of course Queen is showing up. Did you really need to check?",
        "Queen is already there, honestly. You're the one running late.",
        "Queen has been ready for an hour. Longer than the plan has existed.",
      ],
    },
  },
  eddie: {
    label: "Eddie",
    flakeChance: 0.5,
    useAI: true,
    responses: {
      flake: [
        "Eddie meant well. Eddie always means well. Eddie is not coming.",
        "Eddie got halfway there and turned around. No explanation forthcoming.",
        "Eddie has entered a state of deep ambiguity. Interpret as needed.",
        "Eddie's last known text was 'omw'. That was 40 minutes ago.",
        "The Eddie outcome was always uncertain. Today, the coin landed wrong.",
      ],
      show: [
        "Eddie shows up. Surprising no one and everyone simultaneously.",
        "Eddie is coming and he's bringing snacks. This is a good day.",
        "Eddie pulled through. The coin landed right. Cherish this.",
        "Eddie confirmed three times and means it. All three times.",
        "Eddie's here. Early, even. Something is different about today.",
      ],
    },
  },
};

// ── DOM ───────────────────────────────────────────────────────────────
const heroEl = document.getElementById("hero");
const prophesying = document.getElementById("prophesying");
const resultEl = document.getElementById("result");
const verdictWord = document.getElementById("verdict-word");
const outcomeText = document.getElementById("outcome-text");
const tapBtn = document.getElementById("tap-btn");
const resetBtn = document.getElementById("reset-btn");
const personSelect = document.getElementById("person-select");
const nameInput = document.getElementById("name-input");
const eventInput = document.getElementById("event-input");
const nameField = document.getElementById("name-field");
const h1Name = document.getElementById("h1-name");
const flakeNameTxt = document.getElementById("flake-name-text");

// ── Verdict phrase pools ──────────────────────────────────────────────
const FLAKE_PHRASES = [
  "confirmed flake",
  "total flake",
  "certified flake",
  "absolute flake",
  "grade-A flake",
  "notorious flake",
  "textbook flake",
  "irredeemable flake",
];

const NO_FLAKE_PHRASES = [
  "not a flake",
  "flake-free",
  "zero flake energy",
  "anti-flake",
  "flake immunity confirmed",
  "flake probability: zero",
  "surprisingly unflaky",
  "a non-flake, somehow",
];

function pickPhrase(isFlake) {
  const pool = isFlake ? FLAKE_PHRASES : NO_FLAKE_PHRASES;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── Person dropdown logic ─────────────────────────────────────────────
function getDisplayName() {
  const key = personSelect.value;
  if (key === "friend") return nameInput.value.trim() || "my friend";
  return PEOPLE[key].label.toLowerCase();
}

function onPersonChange() {
  const isFriend = personSelect.value === "friend";
  nameField.classList.toggle("hidden", !isFriend);
  h1Name.textContent = getDisplayName();
}

personSelect.addEventListener("change", onPersonChange);
nameInput.addEventListener("input", () => {
  h1Name.textContent = getDisplayName();
});
onPersonChange();

// ── Helpers ───────────────────────────────────────────────────────────
function pickVerdict(flakeChance) {
  return Math.random() < flakeChance ? "YES" : "NO";
}

function pickStatic(person, verdict) {
  const pool =
    verdict === "YES" ? person.responses.flake : person.responses.show;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── Reveal ────────────────────────────────────────────────────────────
async function reveal() {
  const key = personSelect.value;
  const person = PEOPLE[key];
  const verdict = pickVerdict(person.flakeChance);
  const isFlake = verdict === "YES";
  const event = eventInput.value.trim();
  const name = getDisplayName();

  // Transition to loading screen; trigger content animation
  showScreen("prophesying");
  prophesying.classList.remove("visible");
  void prophesying.offsetWidth; // force reflow to re-run animation
  prophesying.classList.add("visible");

  const minDelay = new Promise((res) => setTimeout(res, 2200));

  let flavorText = pickStatic(person, verdict);

  const aiCall =
    person.useAI && event
      ? (async () => {
          const token =
            new URLSearchParams(window.location.search).get("t") ?? "";
          try {
            const res = await fetch("/api/prophecy", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                event,
                verdict,
                person: person.label,
                token,
              }),
            });
            if (res.ok) {
              const data = await res.json();
              if (data.text) flavorText = data.text;
            }
          } catch (_) {
            /* fall back to static */
          }
        })()
      : Promise.resolve();

  await Promise.all([aiCall, minDelay]);

  // Populate result content
  verdictWord.textContent = pickPhrase(isFlake);
  verdictWord.className = "verdict " + (isFlake ? "yes" : "no");
  outcomeText.textContent = flavorText;

  flakeNameTxt.textContent = name;
  flakeNameTxt.className = "flake-name " + (isFlake ? "yes" : "no");

  document.body.classList.remove("yes-bg", "no-bg");
  document.body.classList.add(isFlake ? "yes-bg" : "no-bg");

  // Transition to result screen; re-trigger content animation
  showScreen("result");
  resultEl.classList.remove("visible");
  void resultEl.offsetWidth; // force reflow to re-run animation
  resultEl.classList.add("visible");
}

// ── Reset ─────────────────────────────────────────────────────────────
function reset() {
  resultEl.classList.remove("visible");
  document.body.classList.remove("yes-bg", "no-bg");

  showScreen("hero");

  // Re-trigger hero entrance animation after the screen transition settles
  setTimeout(() => {
    heroEl.style.animation = "none";
    void heroEl.offsetWidth;
    heroEl.style.animation = "";
  }, TRANSITION_MS);
}

tapBtn.addEventListener("click", reveal);
resetBtn.addEventListener("click", reset);
eventInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") reveal();
});
nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") reveal();
});
