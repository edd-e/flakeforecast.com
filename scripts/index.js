// SCREEN TRANSITIONS
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

// OUTPUT STRINGS
const STRINGS = {
  eyebrow: [
    "Promises",
    "Flakiness",
    "Reliability",
    "Excuses",
    "Deception",
    "Friendship",
    "Chaos",
    "Cancellations",
    "Truth",
    "Hope",
    "Loyalty",
    "Ghosts",
    "Commitment",
    "Punctuality",
    "Audacity",
    "Vibes",
    "Character",
    "Tardiness",
    "Good Intentions",
    "Miracles",
    "Nerve",
    "Accountability",
  ],

  forecasting: [
    "Checking the flakiness radar",
    "Scanning the horizon for excuses",
    "Gauging the probability of presence",
    "Calculating the probability of ghosting",
    "Assessing the commitment climate",
    "Predicting the plan's chance of success",
    "Analyzing the group chat atmosphere",
    "Detecting the flake",
    "Monitoring the incoming excuses",
    "Launching the social weather balloon",
    "Determining the 'Maybe' pressure",
    "Updating the attendance outlook",
    "Reviewing the reliability forecast",
    "Scanning for incoming radio silence",
    "Forecasting the social fallout",
    "Detecting the social cold front",
    "Reading the social altimeter",
    "Calibrating sensors",
    "Initiating the presence scan",
    "Detecting social turbulence",
    "Observing the RSVP cloud cover",
    "Calculating the friction of personalities",
    "Measuring the gravity of the couch",
    "Checking the social UV index",
    "Quantifying the social exhaustion",
    "Predicting the 'I'm tired' storm",
    "Assessing stress test",
    "Factoring in the comfort-zone climate",
    "Checking the commitment compass",
    "Forecasting unforeseen events",
    "Gauging the social sunlight",
    "Detecting the 'can't make it' hurricane",
    "Measuring the social visibility",
    "Assessing the social freeze",
    "Monitoring the group chat pressure",
    "Calculating the probability of ghosting",
    "Observing the flake-formation",
    "Scanning the commitment horizon",
    "Evaluating the social pressure",
    "Checking the attendance barometer",
    "Analyzing the social ecosystem",
    "Measuring the social magnetic field",
    "Forecasting the vibe shift",
    "Predicting the excuse-velocity",
    "Scanning for social anomalies",
    "Checking the flake-alert system",
    "Evaluating the flake-density",
    "Analyzing the social forecast data",
    "Predicting the social ice age",
    "Scanning the 'maybe' mist",
    "Forecasting the group chat drought",
    "Observing the social orbit",
    "Calculating the social drag",
    "Measuring the flake-frequency",
    "Assessing the commitment probability",
    "Predicting the social lightning strike",
    "Scanning the social topography",
    "Gauging the social depth",
    "Piercing the fog of uncertainty",
    "Monitoring the excuse-horizon",
    "Reading the stars",
    "Finalizing the social outlook",
  ],

  verdict: {
    flake: [
      "confirmed flake",
      "total flake",
      "certified flake",
      "absolute flake",
      "grade-A flake",
      "notorious flake",
      "textbook flake",
      "irredeemable flake",
      "habitual flake",
      "professional flake",
      "legendary flake",
      "unapologetic flake",
      "chronic flake",
      "peak flake",
      "elite flake",
      "clearly a flake",
      "unrivaled flake",
      "pure flake",
      "committed flake",
      "recurring flake",
      "predictable flake",
      "master flake",
      "shameless flake",
      "world-class flake",
      "olympic-level flake",
      "natural-born flake",
      "terminal flake",
      "flake of distinction",
      "award-winning flake",
      "hall of fame flake",
      "gold-tier flake",
      "seasoned flake",
      "artisanal flake",
      "deeply a flake",
      "documented flake",
      "advanced-stage flake",
      "flake of the century",
      "born to flake",
      "a historic flake",
      "flake, full stop",
      "irreversible flake",
      "lifelong flake",
      "legally a flake",
      "clinically a flake",
      "catastrophic flake",
      "generational flake",
      "supreme flake",
      "signature flake",
    ],
    noFlake: [
      "not a flake",
      "flake-free",
      "zero flake energy",
      "absolutely not a flake",
      "flake probability: zero",
      "surprisingly unflaky",
      "a non-flake, somehow",
      "the anti-flake",
      "flake-proof",
      "genuinely not a flake",
      "confirmed non-flake",
      "the never flake",
      "rare non-flake",
      "flakeless wonder",
      "solid, no-flake",
      "reliably not a flake",
      "zero-percent flake",
      "'never call me' flake",
      "certified non-flake",
      "mythical non-flake",
      "reliable non-flake",
      "no flake detected",
      "flake-negative",
      "zero flake risk",
      "a flake? never",
      "no flake, ever",
      "refuses to flake",
      "simply not a flake",
      "officially not a flake",
      "no flake on record",
      "flake? what flake?",
      "incapable of flake",
      "flake chance: none",
      "anti-flake, always",
      "historically no flake",
      "flake risk: zero",
      "legally not a flake",
      "no flake in sight",
      "flake? not today",
      "flake chance: none",
      "the flake that wasn't",
      "not the flake type",
      "too reliable to flake",
      "a flake? impossible",
      "no flake energy here",
    ],
  },

  responses: {
    flake: [
      "Their phone is already on silent. They're not coming.",
      "They said 'I'll try to make it!'... That's always a no.",
      "Something will come up. It always comes up. It is, in fact, currently coming up.",
      "Can't make it at all and won't propose alternate plans.",
      "History is the best predictor of the future. History says no.",
      "Their bed will win the custody battle for their soul.",
      "Will be 'putting on pajamas' right as the event starts.",
      "A 10/10 chance they won't leave the couch.",
      "They will suddenly realize they 'have no clothes,' despite a full closet.",
      "Will start a movie they won't finish and ignore the 'where you at?' text.",
      "The social battery will hit 0% by the time they need to start getting ready.",
      "Will look at the front door and decide 'not today, Satan.'",
      "Their house will feel way too cozy to leave.",
      "Will blame a 'long week' even if it's only Tuesday.",
      "A sudden, unexplained exhaustion will strike them at the worst moment.",
      "They will 'accidentally' fall asleep for a long nap.",
      "Will be busy staring at a wall wondering why they agreed to this.",
      "Will 'forget' to check their notifications.",
      "Will find a reason to reorganize their kitchen instead.",
      "Their cat/dog will look too cute to move, and they'll stay.",
      "They will decide that 'outside' is a scam.",
      "Will fall into an internet rabbit hole for hours.",
      "Will be lost to doom-scrolling.",
      "A 'quiet night in' will beat your plans in a landslide victory.",
      "Will convince themselves that nobody actually wants them there anyway.",
      "Will realize they haven't washed their hair and call it a day.",
      "The 'leaving' process will prove too mentally taxing.",
      "Will be 'getting ready' in spirit only.",
      "Will choose a solo pizza over a social outing.",
      "Will decide to save money by staying in.",
      "Their social anxiety will enter the chat. It will win.",
      "Will claim their car is making a 'weird noise.'",
      "A 'family thing' will miraculously manifest out of thin air.",
      "Will say they're 'waiting for a package' that requires a signature.",
      "Will develop a well-timed, headache.",
      "Will claim they 'didn't see the invite' (they definitely saw it).",
      "Will pretend their phone died.",
      "Will blame the traffic.",
      "Will say they have to 'wake up early' for something vague.",
      "Will claim they're 'still at work'.",
      "Will say they're 'feeling under the weather' (the weather is fine).",
      "Will cite a 'sudden plumbing emergency.'",
      "Will pretend they have 'guests coming over' unexpectedly.",
      "Will claim they 'already have plans' (the plans are Netflix).",
      "Will blame a 'deadline' that doesn't exist.",
      "Will say they're 'just waiting on a call' that won't come.",
      "Will claim they 'misread the date' in the group chat.",
      "Will say they 'can't find their keys'.",
      "Will claim they 'need to finish chores' first.",
      "Will blame a 'migraine' that only affects social events.",
      "Will say they 'didn't think it was still happening.'",
      "Will claim they 'double-booked' themselves.",
      "Will claim they're 'not feeling the vibe' today.",
      "Will say they 'ran out of gas' metaphorically and literally.",
      "They will leave you on 'read'.",
      "The typing bubbles will appear... and then vanish forever.",
      "Will look at the text, sigh, and put the phone face down.",
      "You'll see them posting on their story while ignoring your DM.",
      "Will respond three days later with 'omg so sorry just saw this!'",
      "Will 'like' the message but never actually show up.",
      "Their location will remain stubbornly at home all night.",
      "Will 'be there in 10,' which is code for 'I haven't showered.'",
      "They will vanish into the witness protection program for the evening.",
      "Will 'let you know soon' and never report back.",
      "Will send a 'see you soon!' and then never be seen again.",
      "Their phone will conveniently enter 'Do Not Disturb' mode.",
      "Will become a ghost in the group chat.",
      "Will dodge your calls like a professional athlete.",
      "Will claim they 'passed out' at 7 PM.",
      "Will ask 'who else is going?' before deciding not to go.",
      "Will say 'keep me posted!' which is the universal sign for no.",
      "Will ask for all the details again just to look interested.",
      "Will wait until you're already there to say they can't make it.",
      "Will send a very long, overly-detailed apology text at 2 AM.",
      "Will react with a 'thumbs up' and then disappear.",
      "Will say 'maybe' and we all know what that means.",
      "Will pretend they 'never got the notification.'",
      "Will be 'super busy' doing absolutely nothing.",
      "Will just... not.",
      "They were never coming. You knew it. They knew it.",
      "They only said yes to avoid the immediate awkwardness.",
      "Will check the weather, see a cloud, and cancel.",
      "Their social battery is currently at 1%.",
      "They'd rather walk on Legos than leave the house right now.",
      "Will find a reason to be offended by the plan.",
      "Will decide the parking situation is too stressful.",
      "Will realize they don't actually like the activity.",
      "Will stay home to 'save their energy' for something else.",
      "Will wait for someone else to cancel first so they don't feel bad.",
      "Will realize the commute is 15 minutes and decide it's too far.",
      "Will think about the small talk and choose silence instead.",
      "Will convince themselves that 'next time' will be better.",
      "Will be 'too tired' despite doing nothing all day.",
      "Will let the group chat die before committing.",
      "Their commitment level is currently 'absolute zero.'",
      "Will choose a book over people every single time.",
      "Will decide to 'reset' their life by sleeping.",
      "Will talk themselves out of it while putting on their shoes.",
      "Will sit in their car for 10 minutes and then drive back home.",
      "Will see the 'left on read' and feel no guilt.",
      "Will realize they haven't done laundry and 'have nothing to wear.'",
      "Will flake, and they won't even have a good reason.",
      "They're staying home. Accept it. Move on.",
    ],
    noFlake: [
      "Actually coming. Don't ask questions. Just enjoy it.",
      "Coming! the stars have aligned in your favor.",
      "Mark the calendar. This one's happening.",
      "Will confirm. And mean it.",
      "Will be the first one there.",
      "Will be checking the menu before arriving.",
      "Will arrive exactly 5 minutes early.",
      "Will be there, and bring the good vibes.",
      "Already locked and loaded.",
      "Will be texting 'I'm here' before anyone else.",
      "Will be already in the Uber/car.",
      "Will show up with a smile and a story.",
      "Wouldn't miss this for the world.",
      "Will be there, rain or shine.",
      "Will be actually looking forward to this.",
      "Will be the life of the party.",
      "Already has an outfit.",
      "Will arrive with snacks.",
      "Will be there, and be on time.",
      "Will be the last one to leave.",
      "Will be bringing their A-game.",
      "Will show up and make everyone laugh.",
      "Will counting down the minutes.",
      "Will be there before you even arrive.",
      "Will be the first one there and scoping out the place.",
      "Will show up and save the day.",
      "Is a person of their word. They'll be there.",
      "If they said yes, they meant it.",
      "Will show up even if they're tired.",
      "Will be the 'mom/dad' of the group; of course they're coming.",
      "Will be there to document everything on their story.",
      "Will be coming, and bringing a 'plus one.'",
      "Will show up and stay until the very end.",
      "Will be coming to make sure you actually show up.",
      "Will be there, even if you change your mind.",
      "Will be coming because they actually value your friendship.",
      "Will be coming, and bringing all the good energy.",
      "Will show up and be the 'responsible one.'",
      "Will be coming to see everyone they haven't seen in ages.",
      "Will be there to make sure the 'flake' doesn't win.",
      "Will be coming because they need a good time out.",
      "Will show up and be the first to start the fun.",
      "Will be coming, and they've already booked the Uber.",
      "Will be there to hear all the gossip.",
      "Will be coming because they actually like the plan.",
      "Will show up and be the MVP of the outing.",
      "Will be there, no excuses.",
      "Will be coming, and is ready to party.",
      "Will show up and make it a night to remember.",
      "Will be already hyping everyone up in the group chat.",
      "Will be coming because they've been bored all week.",
      "Will be there to take all the photos.",
      "Will be coming, and they're bringing a bottle of something.",
      "Will show up and be the most dressed-up person there.",
      "Will be coming because they genuinely love this group.",
      "Will be there to make sure everyone has a drink.",
      "Will be coming, and they're bringing the music.",
      "Will show up and be the person everyone wants to talk to.",
      "Will be coming because they need to vent about their week.",
      "Will be there to support you, no matter what.",
      "Will be coming because they love a good gathering.",
      "Will show up and be the one to order the appetizers.",
      "Will be coming, and they've already planned their exit strategy.",
      "Will be there for the vibes.",
      "Will be coming because they promised, and they keep promises.",
      "Will show up and be the most enthusiastic person there.",
      "Will be coming, and they're ready for anything.",
      "Will be there to help you clean up afterward.",
      "Will be coming because they want to make memories.",
      "Will show up and be the reason the night is a success.",
      "Will be coming, and they're bringing their best self.",
      "Will be there, and they'll be glad they came.",
      "Will be sneaking in through the back door.",
      "Will be there, even if they're the only ones.",
      "Will be coming, and they've already blocked off the whole night.",
      "Will show up and be the heart of the event.",
      "Will be coming because they wouldn't dream of being anywhere else.",
      "Will be there to make sure everyone feels included.",
      "Will be coming, and they're bringing a surprise.",
      "Will show up and be the one to keep the party going.",
      "Will be coming because they value the invite.",
      "Will be there to make sure you're okay.",
      "Will be coming, and is ready to let loose.",
      "Will show up and be the one to start the deep conversations.",
      "Will be coming because they need this as much as you do.",
      "Will be there to make sure everyone has a good time.",
      "Will be coming, and they've already told everyone else to come.",
      "Will show up and become the most reliable person you know.",
      "Will be coming because they're a 'yes' person.",
      "Will be there to make sure the plan actually happens.",
      "Will be coming, and they're bringing the fun.",
      "Will show up and be the one everyone remembers.",
      "Will be coming because they're your biggest fan.",
      "Will be there, and they'll be the best part of the night.",
      "Will be coming, and they're ready for a legendary time.",
      "Will show up and prove that some people actually care.",
      "Will be coming. Believe it. It's happening!",
    ],
  },
};

// CYCLING EYEBROW WORD
const wordSlot = document.getElementById("word-slot");
const wordInner = document.getElementById("word-slot-inner");

const probe = document.createElement("span");
probe.style.cssText =
  "position:absolute;visibility:hidden;white-space:nowrap;font:inherit";
wordSlot.appendChild(probe);

function measureWord(txt) {
  probe.textContent = txt;
  return probe.offsetWidth;
}

let eyebrowIdx = STRINGS.eyebrow.indexOf(wordInner.textContent);

function cycleWord() {
  eyebrowIdx = (eyebrowIdx + 1) % STRINGS.eyebrow.length;
  const next = STRINGS.eyebrow[eyebrowIdx];
  wordSlot.style.width = measureWord(next) + "px";
  wordInner.classList.remove("slot-in");
  wordInner.classList.add("slot-out");
  setTimeout(() => {
    wordInner.textContent = next;
    wordInner.classList.remove("slot-out");
    wordInner.classList.add("slot-in");
  }, 280);
}

wordSlot.style.width = measureWord(wordInner.textContent) + "px";
wordInner.classList.add("slot-in");
setInterval(cycleWord, 2200);

// DOM
const heroEl = document.getElementById("hero");
const forecastingEl = document.getElementById("forecasting");
const resultEl = document.getElementById("result");
const verdictWord = document.getElementById("verdict-word");
const outcomeText = document.getElementById("outcome-text");
const tapBtn = document.getElementById("tap-btn");
const resetBtn = document.getElementById("reset-btn");
const nameInput = document.getElementById("name-input");
const eventInput = document.getElementById("event-input");
const h1Name = document.getElementById("h1-name");
const flakeNameTxt = document.getElementById("flake-name-text");
const eventTitle = document.getElementById("event-title");
const screenHero = document.getElementById("screen-hero");
const screenResult = document.getElementById("screen-result");

// Helpers
function pick(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

function getDisplayName() {
  return nameInput.value.trim();
}

nameInput.addEventListener("input", () => {
  h1Name.textContent = getDisplayName();
});

function normalize(s) {
  return s.toLowerCase().trim().replace(/\s+/g, " ");
}

// DB helpers
async function dbLookup(name, event) {
  try {
    const res = await fetch("/api/db/lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: normalize(name),
        event: normalize(event),
      }),
    });
    if (res.ok) return await res.json();
  } catch (_) {}
  return { found: false };
}

function dbSave(name, event, isFlake, verdictPhrase, outcomeStr) {
  fetch("/api/db/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: normalize(name),
      event: normalize(event),
      isFlake,
      verdictPhrase,
      outcomeText: outcomeStr,
    }),
  }).catch(() => {});
}

async function fetchAiForecast(name, event, isFlake) {
  try {
    const res = await fetch("/api/ai_forecast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, event, isFlake }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.text || null;
    }
  } catch (_) {}
  return null;
}

// Reveal
async function reveal() {
  if (!nameInput.value.trim()) {
    nameInput.focus();
    return;
  }
  const event = eventInput.value.trim();
  const name = getDisplayName();

  // Show forecasting screen immediately
  document.querySelector(".forecast-label").textContent = pick(
    STRINGS.forecasting,
  );
  showScreen("forecasting");
  forecastingEl.classList.remove("visible");
  void forecastingEl.offsetWidth;
  forecastingEl.classList.add("visible");

  const minDelay = new Promise((res) =>
    setTimeout(res, 3200 + Math.random() * 5500),
  );

  // DB lookup runs concurrently with the min delay
  let isFlake, verdictPhrase, outcomeStr;
  const cached = event ? await dbLookup(name, event) : null;

  if (cached?.found) {
    // Cache hit — skip min delay, go straight to results
    isFlake = cached.isFlake;
    verdictPhrase = cached.verdictPhrase;
    outcomeStr = cached.outcomeText;
  } else {
    // Cache miss — generate normally, respect min delay
    isFlake = Math.random() < 0.5;
    outcomeStr = pick(
      isFlake ? STRINGS.responses.flake : STRINGS.responses.noFlake,
    );

    const aiCall = event
      ? fetchAiForecast(name, event, isFlake)
      : Promise.resolve(null);
    const [aiText] = await Promise.all([aiCall, minDelay]);
    if (aiText) outcomeStr = aiText;

    verdictPhrase = pick(
      isFlake ? STRINGS.verdict.flake : STRINGS.verdict.noFlake,
    );

    if (event) dbSave(name, event, isFlake, verdictPhrase, outcomeStr);
  }

  // Populate & reveal result ────────────────────────────────────────
  verdictWord.textContent = verdictPhrase;
  verdictWord.className = "verdict " + (isFlake ? "yes" : "no");
  verdictWord.classList.remove("visible");
  outcomeText.textContent = outcomeStr;
  outcomeText.classList.remove("visible");

  eventTitle.textContent = event || "";
  eventTitle.classList.remove("visible");
  flakeNameTxt.textContent = "";
  flakeNameTxt.className = "flake-name " + (isFlake ? "yes" : "no");

  document.body.classList.remove("yes-bg", "no-bg");

  showScreen("result");

  resetBtn.classList.remove("visible");

  await new Promise((resolve) => {
    let i = 0;
    const typeNext = () => {
      if (i < name.length) {
        flakeNameTxt.textContent += name[i++];
        setTimeout(typeNext, 160);
      } else {
        resolve();
      }
    };
    typeNext();
  });

  await delay(600);
  eventTitle.classList.add("visible");

  await delay(1000);
  verdictWord.classList.add("visible");
  document.body.classList.add(isFlake ? "yes-bg" : "no-bg");

  await delay(1500);
  outcomeText.classList.add("visible");

  await delay(3000);
  resetBtn.classList.add("visible");
}

// Reset
function reset() {
  resultEl.classList.remove("visible");
  resetBtn.classList.remove("visible");
  eventTitle.classList.remove("visible");
  verdictWord.classList.remove("visible");
  outcomeText.classList.remove("visible");
  document.body.style.transition =
    "background-color 5s cubic-bezier(0.16, 1, 0.3, 1)";
  document.body.classList.remove("yes-bg", "no-bg");
  setTimeout(() => {
    document.body.style.transition = "";
  }, 2000);

  showScreen("hero");

  setTimeout(() => {
    heroEl.style.animation = "none";
    void heroEl.offsetWidth;
    heroEl.style.animation = "";
  }, TRANSITION_MS);
}

tapBtn.querySelector("span").textContent = window.matchMedia(
  "(pointer: coarse)",
).matches
  ? "tap me!"
  : "click me!";

tapBtn.addEventListener("click", reveal);
resetBtn.addEventListener("click", reset);

eventInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && screenHero.classList.contains("screen--active"))
    reveal();
});
nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && screenHero.classList.contains("screen--active"))
    reveal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && screenResult.classList.contains("screen--active"))
    reset();
});
