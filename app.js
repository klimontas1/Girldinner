/*
  girl dinner — app logic
  -------------------------------
  One page laid out like a flow chart:
    (1) pick a mood  ->  (2) tap what's in your kitchen  ->  (3) tonight's options
  Recipes appear and disappear live as you make choices.
  Tapping a recipe opens its own page (with steps and ratings).

  Everything runs in the browser. Nothing is sent anywhere; your
  ingredients and ratings are saved only on this device (localStorage).
*/
(function () {
  "use strict";

  // ---------- Settings ----------
  const STORE_KEY = "whatsfordinner.v1";
  const FAST_MINUTES = 15;   // recipes this quick count as "Quick & easy"
  const MAX_MISSING = 2;     // "just missing a few things" = missing this many or fewer
  const RECENT_LIMIT = 3;    // "Surprise me" won't repeat the last 3 picks
  const ANIM_MS = 260;       // how long cards take to fade in/out

  const MOODS = [
    { id: "any", emoji: "✨", label: "Honestly, anything" },
    { id: "comfort", emoji: "🍝", label: "Cozy & comforting" },
    { id: "light", emoji: "🥗", label: "Light & fresh" },
    { id: "fast", emoji: "⏱️", label: "Quick & easy" },
    { id: "flavor", emoji: "🌶️", label: "Bold & flavorful" },
    { id: "breakfast", emoji: "🥞", label: "Breakfast for dinner" }
  ];

  // ---------- Lookups ----------
  // (If a browser still has an older recipes.js saved, carry on without nicknames.)
  const NICKNAMES = typeof OTHER_NAMES === "object" ? OTHER_NAMES : {};
  const ING = {};
  INGREDIENT_GROUPS.forEach(g => g.items.forEach(i => { ING[i.id] = i; }));
  const RECIPE_BY_ID = {};
  RECIPES.forEach(r => { RECIPE_BY_ID[r.id] = r; });
  const MOOD_BY_ID = {};
  MOODS.forEach(m => { MOOD_BY_ID[m.id] = m; });

  // ---------- Saved state ----------
  const defaults = { mood: "any", have: [], ratings: {}, recent: [], extras: [] };
  const state = loadState();

  function loadState() {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    } catch (e) { saved = null; }
    const s = Object.assign({}, defaults, saved && typeof saved === "object" ? saved : {});
    // Clean up anything that no longer matches the data files.
    s.have = Array.isArray(s.have) ? s.have.filter(id => ING[id]) : [];
    s.recent = Array.isArray(s.recent) ? s.recent.filter(id => RECIPE_BY_ID[id]) : [];
    s.ratings = s.ratings && typeof s.ratings === "object" ? s.ratings : {};
    s.mood = MOOD_BY_ID[s.mood] ? s.mood : "any";
    s.extras = Array.isArray(s.extras) ? s.extras.filter(x => typeof x === "string" && x.trim()) : [];
    return s;
  }

  function saveState() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* private mode etc. — app still works */ }
  }

  // ---------- Helpers ----------
  const app = document.getElementById("app");
  const stepLabel = document.getElementById("step-label");
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(text) {
    return String(text).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function fitsMood(recipe, mood) {
    if (mood === "any") return true;
    if (mood === "fast") return recipe.time <= FAST_MINUTES;
    return recipe.moods.includes(mood);
  }

  // A recipe ingredient is either one id ("eggs") or a list of
  // interchangeable ids (["garlic", "garlic-powder"]) where any one works.
  function hasReq(req, haveSet) {
    return Array.isArray(req) ? req.some(id => haveSet.has(id)) : haveSet.has(req);
  }

  function missingFor(recipe, haveSet) {
    return recipe.ingredients.filter(req => !hasReq(req, haveSet));
  }

  function ingName(id) { return ING[id] ? ING[id].name : id; }

  function reqName(req) {
    if (!Array.isArray(req)) return ingName(req);
    const names = req.map((id, i) => i === 0 ? ingName(id) : ingName(id).toLowerCase());
    if (names.length === 2) return names.join(" or ");
    return names.slice(0, -1).join(", ") + ", or " + names[names.length - 1];
  }

  // Short version for small badges: "black beans or similar".
  function reqShort(req) {
    if (!Array.isArray(req)) return ingName(req);
    if (req.length === 2) return req.map(ingName).join(" or ");
    return ingName(req[0]) + " or similar";
  }

  function listNames(reqs) { return reqs.map(req => reqShort(req).toLowerCase()).join(", "); }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Random order for results, picked fresh each time the app opens.
  // It stays the same while you tap, so cards don't jump around.
  const shuffleRank = {};
  shuffle(RECIPES.map(r => r.id)).forEach((id, i) => { shuffleRank[id] = i; });

  // ---------- Page state (not saved) ----------
  let showHidden = false;
  let searchText = "";
  const openGroups = new Set([INGREDIENT_GROUPS[0].title, INGREDIENT_GROUPS[1].title]);
  let flowScrollY = 0;
  let cardEls = new Map();   // recipe id -> card element currently on screen
  let barObserver = null;

  // ---------- Navigation ----------
  // "#" (or nothing) = the flow page; "#recipe/<id>" = a recipe page.
  let currentView = null;

  function go(hash) {
    if (location.hash === "#" + hash) route();
    else location.hash = hash;
  }

  function route() {
    const [view, arg] = location.hash.slice(1).split("/");
    const previous = currentView;

    if (view === "recipe" && RECIPE_BY_ID[arg]) {
      currentView = "recipe";
      renderRecipe(RECIPE_BY_ID[arg]);
      window.scrollTo(0, 0);
    } else {
      currentView = "flow";
      renderFlow();
      // Coming back from a recipe? Return to where you were.
      window.scrollTo(0, previous === "recipe" ? flowScrollY : 0);
    }
    app.focus({ preventScroll: true });
  }

  // ---------- The flow page ----------
  function renderFlow() {
    stepLabel.textContent = "oui!";
    document.title = "girl dinner";
    cardEls = new Map();
    const have = new Set(state.have);

    app.innerHTML = `
      <div class="intro">
        <span class="note" aria-hidden="true"><svg class="doodle"><use href="#d-wine"/></svg>cheers!</span>
        <h1>Let's figure<br>out <em>dinner</em></h1>
        <p class="lead">Follow the flow: pick a mood, tap what you have, and watch tonight's options appear.</p>
      </div>

      <ol class="flow">
        <li class="node check" id="node-mood" aria-labelledby="h-mood">
          <div class="check-bar" aria-hidden="true"><span>Guest check</span><span>No. 1</span><span>xoxo</span></div>
          <div class="check-body">
          <h2 id="h-mood">What are you <em>in the mood for?</em></h2>
          <div class="mood-row" role="group" aria-labelledby="h-mood">
            ${MOODS.map(m => `
              <button type="button" class="mood" data-action="pick-mood" data-mood="${m.id}" aria-pressed="${state.mood === m.id}">
                <span class="ink-emoji" aria-hidden="true"><span>${m.emoji}</span></span>
                <span class="mood-label">${esc(m.label)}</span>
              </button>`).join("")}
          </div>
          </div>
        </li>

        <li class="connector" aria-hidden="true"><span>then</span></li>

        <li class="node check" id="node-kitchen" aria-labelledby="h-kitchen">
          <div class="check-bar" aria-hidden="true"><span>Guest check</span><span>No. 2</span><span>$</span></div>
          <div class="check-body">
          <h2 id="h-kitchen">What's in your <em>kitchen?</em></h2>
          <p class="small">Tap everything you have. We'll assume ${esc(STAPLES.join(", ").toLowerCase())}.</p>
          <div class="search">
            <label for="ing-search" class="visually-hidden">Search ingredients</label>
            <input type="search" id="ing-search" placeholder="Search ingredients…" autocomplete="off" value="${esc(searchText)}">
            <button type="button" class="live-count" id="live-count" data-action="jump"></button>
          </div>
          <div class="no-match" id="no-match" hidden>
            <p class="small">That's not on our list. Try another word, or add it anyway:</p>
            <button type="button" class="btn btn-dashed" data-action="add-extra" id="add-extra"></button>
          </div>
          <div id="kitchen">
            ${INGREDIENT_GROUPS.map(g => `
              <details class="group" data-group="${esc(g.title)}"${openGroups.has(g.title) ? " open" : ""}>
                <summary><span>${esc(g.title)}</span><span class="group-count"></span></summary>
                <div class="chips">
                  ${g.items.map(i => `
                    <div class="chip" data-name="${esc([i.name].concat(NICKNAMES[i.id] || []).join("|").toLowerCase())}">
                      <input type="checkbox" id="ing-${i.id}" value="${i.id}"${have.has(i.id) ? " checked" : ""}>
                      <label for="ing-${i.id}">${esc(i.name)}</label>
                    </div>`).join("")}
                </div>
              </details>`).join("")}
          </div>
          <div id="extras"></div>
          <div class="kitchen-foot">
            <span class="small" id="kitchen-count"></span>
            <button type="button" class="btn-link quiet" data-action="clear-kitchen">Clear all</button>
          </div>
          </div>
        </li>

        <li class="connector" aria-hidden="true"><span>so tonight…</span></li>

        <li class="node check" id="node-results" aria-labelledby="h-results">
          <div class="check-bar" aria-hidden="true"><span>Guest check</span><span>No. 3</span><span>♡</span></div>
          <div class="check-body">
          <h2 id="h-results">Here's your <em>girl dinner</em></h2>
          <p class="small results-summary" id="results-summary" aria-live="polite"></p>
          <button type="button" class="btn btn-dashed btn-block surprise" data-action="surprise" id="surprise">✧ Can't decide? Surprise me</button>
          <div id="start-hint" class="hint">
            <svg class="doodle" aria-hidden="true"><use href="#d-sparkle"/></svg>
            Tap a few ingredients above and dinners will start appearing here.
          </div>
          <div id="empty" class="hint" hidden></div>
          <h3 class="list-title" id="ready-title" hidden></h3>
          <div class="cards" id="ready-list"></div>
          <h3 class="list-title" id="close-title" hidden></h3>
          <p class="small" id="close-note" hidden>One or two things short. Open a recipe to see what you can swap in.</p>
          <div class="cards" id="close-list"></div>
          <div class="hidden-toggle" id="hidden-toggle" hidden>
            <button type="button" class="btn-link" data-action="toggle-hidden" aria-expanded="false"></button>
          </div>
          <div class="cards" id="hidden-list"></div>
          </div>
        </li>
      </ol>

      <div class="reset-row">
        <button type="button" class="btn-link quiet" data-action="reset">Reset app (clears ingredients, extras &amp; ratings)</button>
      </div>

      <div class="float-bar" id="float-bar" hidden>
        <button type="button" class="btn btn-primary btn-block" data-action="jump"></button>
      </div>`;

    if (searchText) applySearch();
    renderExtras();
    updateKitchenCounts();
    updateResults(true);
    watchResultsNode();
  }

  function updateKitchenCounts() {
    const have = new Set(state.have);
    document.querySelectorAll("#kitchen .group").forEach(d => {
      const g = INGREDIENT_GROUPS.find(x => x.title === d.dataset.group);
      const n = g.items.filter(i => have.has(i.id)).length;
      d.querySelector(".group-count").textContent = n ? `${n} selected` : "";
    });
    const n = state.have.length;
    const el = document.getElementById("kitchen-count");
    if (el) el.textContent = n === 0 ? "Nothing selected yet" : `${n} ingredient${n === 1 ? "" : "s"} selected`;
  }

  // ---------- Live results ----------
  function buildResults() {
    const haveSet = new Set(state.have);
    const ready = [], close = [], hidden = [];
    RECIPES.forEach(r => {
      if (!fitsMood(r, state.mood)) return;
      const missing = missingFor(r, haveSet);
      const owned = r.ingredients.length - missing.length;
      let group = null;
      if (missing.length === 0) group = ready;
      else if (missing.length <= MAX_MISSING && owned >= 1) group = close;
      if (!group) return;
      const item = { recipe: r, missing };
      if (state.ratings[r.id] === "down") hidden.push(item);
      else group.push(item);
    });
    const byShuffle = (a, b) => shuffleRank[a.recipe.id] - shuffleRank[b.recipe.id];
    ready.sort(byShuffle);
    close.sort((a, b) => (a.missing.length - b.missing.length) || byShuffle(a, b));
    hidden.sort(byShuffle);
    return { ready, close, hidden };
  }

  function cardInner(item, isHidden) {
    const r = item.recipe;
    const liked = state.ratings[r.id] === "up";
    let badge;
    if (isHidden) badge = `<span class="badge badge-hidden">Hidden</span>`;
    else if (item.missing.length === 0) badge = `<span class="badge badge-ready">✓ You have everything</span>`;
    else badge = `<span class="badge badge-missing">Missing ${item.missing.length}: ${esc(listNames(item.missing))}</span>`;
    return `
      <span class="ink-emoji" aria-hidden="true"><span>${r.emoji}</span></span>
      <span class="card-body">
        <span class="card-title">${esc(r.name)}${liked ? ' <span class="heart" aria-label="You loved this">♥</span>' : ""}</span>
        <span class="meta">${timeText(r)} · ${esc(r.difficulty)}</span><br>
        ${badge}
        ${!isHidden && item.missing.some(req => swapsYouHave(req).length) ? '<span class="swap-hint">↺ you have a swap for this</span>' : ""}
      </span>
      <span class="card-arrow" aria-hidden="true">›</span>`;
  }

  function timeText(r) {
    return r.cook ? `Prep ${r.prep} · Cook ${r.cook} min` : `${r.prep} min, no cooking`;
  }

  // ---------- Substitutes ----------
  // All swap ideas for a (possibly either/or) recipe ingredient.
  function swapIdeas(req) {
    const ids = Array.isArray(req) ? req : [req];
    const seen = new Set();
    const ideas = [];
    ids.forEach(id => (SUBSTITUTES[id] || []).forEach(s => {
      const key = s.use || s.text;
      if (ids.includes(s.use) || seen.has(key)) return;
      seen.add(key);
      ideas.push(s);
    }));
    return ideas;
  }

  function swapsYouHave(req) {
    const have = new Set(state.have);
    return swapIdeas(req).filter(s => s.use && have.has(s.use));
  }

  function swapBox(req) {
    const ideas = swapIdeas(req);
    const have = new Set(state.have);
    const yours = ideas.filter(s => s.use && have.has(s.use)).length;
    const items = ideas.length
      ? ideas.map(s => {
          const mine = s.use && have.has(s.use);
          return `<li${mine ? ' class="mine"' : ""}><strong>${esc(s.use ? ingName(s.use) : s.text)}</strong>${mine ? ' <span class="you-have">you have this!</span>' : ""}<br><span class="small">${esc(s.how)}</span></li>`;
        }).join("")
      : `<li><span class="small">No easy swap for this one. Try leaving it out; many simple dishes still work.</span></li>`;
    return `
      <details class="swap"${yours ? " open" : ""}>
        <summary>What can I substitute?${yours ? " <span class=\"you-have\">you have a swap</span>" : ""}</summary>
        <ul>${items}</ul>
      </details>`;
  }

  // ---------- Beginner notes ----------
  function notesFor(r) {
    const text = r.steps.join(" ");
    const notes = KITCHEN_NOTES.filter(n => n.match.test(text));
    const flat = new Set(r.ingredients.flat());
    const done = DONENESS.filter(d => d.ids.some(id => flat.has(id)));
    return { notes, done };
  }

  // Put exactly these cards into a list, in order. Cards that are new
  // fade in; cards that no longer belong fade out (unless they're just
  // moving to another list, e.g. from "missing a few things" to "ready").
  function syncList(listEl, items, isHidden, keepIds, animate) {
    const wanted = new Set(items.map(i => i.recipe.id));

    Array.from(listEl.children).forEach(el => {
      const id = el.dataset.id;
      if (wanted.has(id) || keepIds.has(id) || el.classList.contains("leave")) return;
      if (!animate || reduceMotion) { el.remove(); cardEls.delete(id); return; }
      el.classList.remove("enter");
      el.classList.add("leave");
      el.tabIndex = -1;
      setTimeout(() => {
        if (el.classList.contains("leave")) { el.remove(); if (cardEls.get(id) === el) cardEls.delete(id); }
      }, ANIM_MS);
    });

    let prev = null;
    items.forEach(item => {
      const id = item.recipe.id;
      let el = cardEls.get(id);
      const isNew = !el || el.classList.contains("leave");
      if (!el) {
        el = document.createElement("button");
        el.type = "button";
        el.className = "card";
        el.dataset.action = "open";
        el.dataset.id = id;
        cardEls.set(id, el);
      }
      el.classList.remove("leave");
      el.tabIndex = 0;
      el.classList.toggle("is-hidden", isHidden);
      el.innerHTML = cardInner(item, isHidden);
      const ref = prev ? prev.nextSibling : listEl.firstChild;
      if (el.parentNode !== listEl || el !== ref) listEl.insertBefore(el, ref);
      if (isNew && animate && !reduceMotion) {
        el.classList.remove("enter");
        void el.offsetWidth; // restart the animation
        el.classList.add("enter");
      }
      prev = el;
    });
  }

  function updateResults(firstPaint) {
    const animate = !firstPaint;
    const mood = MOOD_BY_ID[state.mood];
    const started = state.have.length > 0;
    let { ready, close, hidden } = buildResults();
    if (!started) { ready = []; close = []; hidden = []; }
    const nothing = started && ready.length === 0 && close.length === 0;

    const keep = new Set([...ready, ...close, ...(showHidden ? hidden : [])].map(i => i.recipe.id));
    syncList(document.getElementById("ready-list"), ready, false, keep, animate);
    syncList(document.getElementById("close-list"), close, false, keep, animate);
    syncList(document.getElementById("hidden-list"), showHidden ? hidden : [], true, keep, animate);

    const $ = id => document.getElementById(id);
    $("start-hint").hidden = started;
    $("surprise").hidden = !(ready.length || close.length);

    $("ready-title").hidden = !ready.length;
    $("ready-title").textContent = `Ready to cook (${ready.length})`;
    $("close-title").hidden = !close.length;
    $("close-title").textContent = `You're just missing a few things (${close.length})`;
    $("close-note").hidden = !close.length;

    $("empty").hidden = !nothing;
    if (nothing) {
      $("empty").innerHTML = `
        <strong>Nothing for “${esc(mood.label)}” yet.</strong><br>
        Tap a few more ingredients, or pick a different mood.
        <div class="btn-stack">
          <button type="button" class="btn" data-action="scroll-to" data-to="node-mood">↑ Change mood</button>
          <button type="button" class="btn" data-action="scroll-to" data-to="node-kitchen">↑ Add ingredients</button>
        </div>`;
    }

    const toggle = $("hidden-toggle");
    toggle.hidden = !hidden.length;
    const tbtn = toggle.querySelector("button");
    tbtn.textContent = `${showHidden ? "Hide" : "Show"} hidden recipes (${hidden.length})`;
    tbtn.setAttribute("aria-expanded", String(showHidden));

    // Summary line + floating bar.
    let summary;
    if (!started) summary = `${mood.label}. Waiting on your ingredients…`;
    else if (nothing) summary = `${mood.label}. No matches yet.`;
    else summary = `${mood.label}. ${ready.length} ready, ${close.length} just missing a few things.`;
    $("results-summary").textContent = summary;

    const bar = $("float-bar");
    const barBtn = bar.querySelector("button");
    if (!started) barBtn.textContent = "Tap ingredients to see dinners";
    else if (nothing) barBtn.textContent = "No matches yet ↓";
    else if (!ready.length) barBtn.textContent = `See ${close.length} idea${close.length === 1 ? "" : "s"} (missing a few things) ↓`;
    else if (!close.length) barBtn.textContent = `See ${ready.length} ready to cook ↓`;
    else barBtn.textContent = `See ${ready.length} ready · ${close.length} more ↓`;
    barBtn.disabled = !started;

    // The count next to the search box (shown while you're in the kitchen).
    const live = $("live-count");
    const total = ready.length + close.length;
    live.textContent = !started ? "0 ideas" : `${total} idea${total === 1 ? "" : "s"} ↓`;
    live.disabled = !started;
    live.setAttribute("aria-label", started ? `See ${total} dinner ideas` : "No ideas yet");
  }

  // The floating button only shows when it can't get in the way:
  // hidden while the kitchen list (it has its own count by the search
  // box) or the results are on screen.
  function watchResultsNode() {
    const bar = document.getElementById("float-bar");
    if (barObserver) barObserver.disconnect();
    if (!("IntersectionObserver" in window)) { bar.hidden = true; return; }
    const visible = {};
    barObserver = new IntersectionObserver(entries => {
      entries.forEach(en => { visible[en.target.id] = en.isIntersecting; });
      bar.hidden = !!(visible["node-kitchen"] || visible["node-results"]);
    }, { rootMargin: "0px 0px -30% 0px" });
    barObserver.observe(document.getElementById("node-kitchen"));
    barObserver.observe(document.getElementById("node-results"));
  }

  // Ingredient search: hide chips (and empty groups) that don't match.
  function applySearch() {
    const q = searchText.trim().toLowerCase();
    let anyShown = false;
    document.querySelectorAll("#kitchen .group").forEach(group => {
      let groupShown = false;
      group.querySelectorAll(".chip").forEach(chip => {
        const show = !q || chip.dataset.name.includes(q);
        chip.hidden = !show;
        if (show) groupShown = true;
      });
      group.hidden = !groupShown;
      if (q && groupShown) group.open = true;
      if (!q) group.open = openGroups.has(group.dataset.group);
      if (groupShown) anyShown = true;
    });
    document.getElementById("no-match").hidden = anyShown;
    if (!anyShown) document.getElementById("add-extra").textContent = `+ Add “${cleanName(searchText)}” to my kitchen`;
  }

  // ---------- Your extras ----------
  // Ingredients someone has that aren't on our list. They're remembered
  // and shown, but no recipe uses them (add them to recipes.js for that).
  function cleanName(text) {
    const t = text.trim().replace(/\s+/g, " ").slice(0, 40);
    return t.charAt(0).toUpperCase() + t.slice(1);
  }

  function addExtra() {
    const name = cleanName(searchText);
    if (!name) return;
    if (!state.extras.some(x => x.toLowerCase() === name.toLowerCase())) state.extras.push(name);
    saveState();
    searchText = "";
    document.getElementById("ing-search").value = "";
    applySearch();
    renderExtras();
  }

  function renderExtras() {
    const box = document.getElementById("extras");
    if (!state.extras.length) { box.innerHTML = ""; return; }
    box.innerHTML = `
      <div class="extras">
        <p class="extras-title">Your extras</p>
        <div class="chips">
          ${state.extras.map((x, i) => `
            <button type="button" class="extra-chip" data-action="remove-extra" data-index="${i}" aria-label="Remove ${esc(x)}">
              ${esc(x)} <span aria-hidden="true">✕</span>
            </button>`).join("")}
        </div>
        <p class="small">No recipes use these yet, but we'll remember them. Tap one to remove it.</p>
      </div>`;
  }

  function surprise() {
    const { ready, close } = buildResults();
    const pool = (ready.length ? ready : close).map(i => i.recipe.id);
    if (!pool.length) return;
    const fresh = pool.filter(id => !state.recent.includes(id));
    const choices = fresh.length ? fresh : pool;
    const pick = choices[Math.floor(Math.random() * choices.length)];
    state.recent = [pick].concat(state.recent.filter(id => id !== pick)).slice(0, RECENT_LIMIT);
    saveState();
    openRecipe(pick);
  }

  function openRecipe(id) {
    flowScrollY = window.scrollY;
    go("recipe/" + id);
  }

  // ---------- Recipe page ----------
  function renderRecipe(r) {
    stepLabel.textContent = "table for one ♡";
    document.title = `${r.name} · girl dinner`;
    const have = new Set(state.have);
    const rating = state.ratings[r.id] || null;
    const moodTags = MOODS
      .filter(m => m.id !== "any" && fitsMood(r, m.id))
      .map(m => `<span class="tag">${esc(m.label)}</span>`).join("");
    const { notes, done } = notesFor(r);

    app.innerHTML = `
      <button type="button" class="btn-link back" data-action="back">← Back to the flow</button>
      <div class="check recipe-check">
        <div class="check-bar" aria-hidden="true"><span>Guest check</span><span>${r.time} min</span><span>xoxo</span></div>
        <span class="stamp" aria-hidden="true">on the house!</span>
        <div class="check-body">
          <span class="ink-emoji" aria-hidden="true"><span>${r.emoji}</span></span>
          <span class="eyebrow">On the menu tonight</span>
          <h1>${esc(r.name)}</h1>
          <div class="tags">${moodTags}</div>
        </div>
        <dl class="times">
          <div><dt>Prep</dt><dd>${r.prep} min</dd></div>
          <div><dt>Cook</dt><dd>${r.cook ? r.cook + " min" : "none"}</dd></div>
          <div><dt>Total</dt><dd>~${r.time} min</dd></div>
          <div><dt>Level</dt><dd>${esc(r.difficulty)}</dd></div>
        </dl>
      </div>

      <section class="check panel">
        <div class="check-body">
        <h2>You'll need</h2>
        <ul class="ing-list">
          ${r.ingredients.map(id => {
            const ok = hasReq(id, have);
            return `
            <li class="${ok ? "" : "is-missing"}">
              <div class="ing-row"><span class="ing-name">${esc(reqName(id))}</span><span class="leader" aria-hidden="true"></span>
              ${ok ? '<span class="have">✓ have it</span>' : '<span class="need">missing</span>'}</div>
              ${ok ? "" : swapBox(id)}
            </li>`;
          }).join("")}
        </ul>
        ${r.optional && r.optional.length ? `<p class="small"><strong>Nice extras (optional):</strong> ${esc(listNames(r.optional))}</p>` : ""}
        <p class="small"><strong>Plus basics:</strong> ${esc(STAPLES.join(", ").toLowerCase())}</p>
        </div>
      </section>

      <section class="check panel">
        <div class="check-body">
        <h2>Steps</h2>
        <ol class="steps">${r.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
        </div>
      </section>

      ${r.tip ? `<p class="tip"><span class="tip-label">psst… a little tip</span>${esc(r.tip)}</p>` : ""}

      ${notes.length || done.length ? `
      <section class="check panel notes">
        <div class="check-body">
        <h2>New to <em>cooking?</em></h2>
        <p class="small">What the words in this recipe mean.</p>
        ${notes.length ? `<dl class="note-list">${notes.map(n => `<div><dt>${esc(n.term)}</dt><dd>${esc(n.text)}</dd></div>`).join("")}</dl>` : ""}
        ${done.length ? `<h3 class="list-title">How to tell it's done</h3>
        <ul class="done-list">${done.map(d => `<li>${esc(d.text)}</li>`).join("")}</ul>` : ""}
        </div>
      </section>` : ""}

      <section class="rate" aria-labelledby="rate-title">
        <h2 id="rate-title">How was it?</h2>
        <p class="small">Your ratings keep suggestions fresh.</p>
        <div class="rate-buttons">
          <button type="button" class="btn like" data-action="rate" data-id="${r.id}" data-value="up" aria-pressed="${rating === "up"}">
            <span class="rate-icon" aria-hidden="true">♥</span><span>Loved it</span><span class="rate-sub">save as a favorite ♥</span>
          </button>
          <button type="button" class="btn dislike" data-action="rate" data-id="${r.id}" data-value="down" aria-pressed="${rating === "down"}">
            <span class="rate-icon" aria-hidden="true">✕</span><span>Not for me</span><span class="rate-sub">hide it from my results</span>
          </button>
        </div>
        <p class="rate-note" aria-live="polite">${rateNote(rating)}</p>
      </section>`;
  }

  function rateNote(rating) {
    if (rating === "up") return "Saved as a favorite ♥ Tap again to undo.";
    if (rating === "down") return "Hidden from your results. Tap again to undo.";
    return "";
  }

  function rate(id, value) {
    if (state.ratings[id] === value) delete state.ratings[id];
    else state.ratings[id] = value;
    saveState();
    const rating = state.ratings[id] || null;
    document.querySelectorAll('[data-action="rate"]').forEach(btn => {
      btn.setAttribute("aria-pressed", String(btn.dataset.value === rating));
    });
    const note = document.querySelector(".rate-note");
    if (note) note.textContent = rateNote(rating);
  }

  // ---------- Events ----------
  let cameFromFlow = false;

  document.addEventListener("click", e => {
    const el = e.target.closest("[data-action]");
    if (!el || el.classList.contains("leave")) return;
    const action = el.dataset.action;

    if (action === "pick-mood") {
      state.mood = el.dataset.mood;
      saveState();
      document.querySelectorAll('[data-action="pick-mood"]').forEach(b => {
        b.setAttribute("aria-pressed", String(b.dataset.mood === state.mood));
      });
      updateResults(false);
    } else if (action === "open") {
      cameFromFlow = true;
      openRecipe(el.dataset.id);
    } else if (action === "surprise") {
      cameFromFlow = true;
      surprise();
    } else if (action === "back") {
      if (cameFromFlow) history.back(); else go("");
    } else if (action === "toggle-hidden") {
      showHidden = !showHidden;
      updateResults(false);
    } else if (action === "jump") {
      document.getElementById("node-results").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    } else if (action === "scroll-to") {
      document.getElementById(el.dataset.to).scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    } else if (action === "rate") {
      rate(el.dataset.id, el.dataset.value);
    } else if (action === "clear-kitchen") {
      state.have = [];
      saveState();
      document.querySelectorAll('#kitchen input[type="checkbox"]').forEach(i => { i.checked = false; });
      updateKitchenCounts();
      updateResults(false);
    } else if (action === "add-extra") {
      addExtra();
    } else if (action === "remove-extra") {
      state.extras.splice(Number(el.dataset.index), 1);
      saveState();
      renderExtras();
    } else if (action === "reset") {
      if (confirm("Clear all your ingredients and ratings?")) {
        state.have = [];
        state.ratings = {};
        state.recent = [];
        state.mood = "any";
        state.extras = [];
        saveState();
        searchText = "";
        renderFlow();
        window.scrollTo(0, 0);
      }
    }
  });

  document.addEventListener("change", e => {
    if (!e.target.matches('#kitchen input[type="checkbox"]')) return;
    const id = e.target.value;
    const set = new Set(state.have);
    if (e.target.checked) set.add(id); else set.delete(id);
    state.have = Array.from(set);
    saveState();
    updateKitchenCounts();
    updateResults(false);
  });

  document.addEventListener("input", e => {
    if (e.target.id !== "ing-search") return;
    searchText = e.target.value;
    applySearch();
  });

  // Pressing Enter (or "Search" on a phone keyboard) when nothing matches adds it as an extra.
  document.addEventListener("keydown", e => {
    if (e.target.id !== "ing-search" || e.key !== "Enter") return;
    e.preventDefault();
    if (searchText.trim() && !document.getElementById("no-match").hidden) addExtra();
  });

  // Hide the floating button while the phone keyboard is open for search.
  document.addEventListener("focusin", e => {
    if (e.target.id === "ing-search") document.body.classList.add("typing");
  });
  document.addEventListener("focusout", e => {
    if (e.target.id === "ing-search") document.body.classList.remove("typing");
  });

  // Remember which ingredient groups you opened or closed.
  document.addEventListener("toggle", e => {
    const d = e.target;
    if (!d.matches || !d.matches("#kitchen .group") || searchText.trim()) return;
    if (d.open) openGroups.add(d.dataset.group); else openGroups.delete(d.dataset.group);
  }, true);

  window.addEventListener("hashchange", () => {
    if (!location.hash.startsWith("#recipe/")) cameFromFlow = false;
    route();
  });
  route();

  // ---------- Offline + install ----------
  // Only works on a real web address (https or localhost), not a double-clicked file.
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => { /* app still works online */ });
    });
  }
})();
