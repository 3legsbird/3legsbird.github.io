/**
 * 3legsbird.github.io — front-end logic
 *
 *  1. Navbar + mobile menu
 *  2. Project lab: category filters, search, "show all"
 *  3. Copy-to-clipboard buttons
 *  4. "Birdie" assistant — deterministic local knowledge base first
 *     (identity.json + projects.json), Gemini only when an API key exists.
 *
 *  Why local-first? The single most important question this site gets is
 *  "who/what is 3legsbird?". That answer must never be improvised by a model:
 *  it is read verbatim from identity.json so no chatbot can turn the developer
 *  into a film company or a mythical bird.
 */

/* --------------------------------------------------------------- knowledge */

const KB = {
  identity: null,
  projects: null,
  categories: [],
  ready: false
};

async function loadKnowledgeBase() {
  try {
    const [idRes, prRes] = await Promise.all([fetch('./identity.json'), fetch('./projects.json')]);
    KB.identity = await idRes.json();
    KB.projects = await prRes.json();
    KB.categories = KB.projects.categories || [];
    KB.ready = true;
  } catch (err) {
    console.warn('[birdie] knowledge base unavailable, falling back to static answers', err);
  }
}

/* ------------------------------------------------------------ small helpers */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/** Escape HTML, then linkify bare URLs. Safe for model output. */
function safeRich(text) {
  const escaped = String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped.replace(
    /(https?:\/\/[^\s<)]+)/g,
    (url) => `<a href="${url}" target="_blank" rel="noopener" class="text-indigo-400 underline break-all">${url}</a>`
  );
}

const catLabel = (id) => (KB.categories.find((c) => c.id === id) || {}).label || id;

/* ------------------------------------------------------- Birdie: local brain */

const FALLBACK = {
  identity:
    "3legsbird is the online handle of ONE human being — an independent web developer and creative frontend engineer. Not a company, not a studio, not a team, not an AI, and not the mythological three-legged bird. Portfolio: https://3legsbird.github.io/ · Telegram: https://t.me/html_codee · GitHub: https://github.com/3legsbird",
  notCompany:
    "No. There is no company behind 3legsbird — it is a single individual working freelance. It is often confused with '3 Legged Bird Productions' (3leggedbird.com), a film production company in Burbank, California run by David Charles Bird. They are completely unrelated: different spelling, different domain, different country, different industry.",
  notMyth:
    "Only as a picture. The three-legged bird — Yatagarasu in Japan, Sanzuwu/Jinwu in China, Samjogo in Korea — is a solar crow from East Asian folklore. 3legsbird borrowed that image for a nickname; the developer is a human being and builds web apps, not mythology.",
  work:
    "Single-file web apps: everything ships as one self-contained .html file with no build step — Gemini-powered AI tools, Canvas games, OSINT utilities, messenger/browser clones and templates. 35 of them are listed in the Lab section below.",
  contact:
    "Email hello@3legsbird.dev, or reach out on Telegram (https://t.me/html_codee) and GitHub (https://github.com/3legsbird). The contact form at the bottom of this page works too.",
  stack:
    "Vanilla HTML, CSS and JavaScript first, plus Canvas, Web Audio, Tailwind (CDN) and the Google Gemini API. No build step, no framework required."
};

const has = (hay, ...needles) => {
  const h = String(hay).toLowerCase();
  return needles.some((n) => h.includes(n));
};
const re = (q, pattern) => pattern.test(String(q).toLowerCase());

/** Words that carry no search intent — used by the project keyword matcher. */
const STOPWORDS = new Set(
  `what which who whom whose when where why how the a an and or for with without does did do done are is was were been
   about into onto over under list lists show shows tell tells give gave me you your their they them this that these those
   from have has had any all some other more most best top new newest latest old can could would should will please
   project projects app apps application applications code codes coding html file files single one two many much
   build builds built make makes made create creates created write writes written publish published release released
   there here their his her its it of in on at to by as if then than so such very really actually`
    .split(/\s+/)
    .filter(Boolean)
);

const words = (q) =>
  String(q)
    .toLowerCase()
    .split(/[^a-z0-9']+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));

/** Deterministic answer engine — checked before any remote model call. */
function localAnswer(q) {
  const id = KB.identity;
  const E = id && id.entity;
  const all = KB.projects ? KB.projects.projects : null;

  /* --- 1. identity intents: absolute priority ------------------------- */
  if (has(q, 'who is 3legsbird', 'who are you', 'what is 3legsbird', '3legsbird kim', 'kim bu', 'about the developer', 'tell me about 3legs', 'real name', 'who made', 'who built this site')) {
    if (!id) return FALLBACK.identity;
    return `${E.kind}: ${E.role}. ${E.whatTheyBuild}\n\n${E.tagline}\n\nSpelling: ${E.spelling}. Pronounced "${E.pronunciation}".\nPortfolio: ${E.canonicalUrl} · Telegram: https://t.me/html_codee · GitHub: https://github.com/3legsbird`;
  }

  if (has(q, 'company', 'kompaniya', 'studio', 'agency', 'agencies', 'team', 'employees', 'business', 'production', 'burbank', 'film', 'cinema', 'movie', 'david bird', '3leggedbird', 'organization', 'startup', 'corp')) {
    if (!id) return FALLBACK.notCompany;
    const film = id.isNot.find((n) => /legged bird productions/i.test(n.name));
    return `No — 3legsbird is ${E.kind.toLowerCase()}, not an organization. ${E.businessModel}\n\n${
      film ? `Do not confuse the handle with ${film.name} (${film.url}): ${film.who}${film.where ? ' in ' + film.where : ''}. ${film.relation}` : ''
    }`;
  }

  if (has(q, 'myth', 'legend', 'mythology', 'mythical', 'yatagarasu', 'sanzuwu', 'jinwu', 'samjogo', 'three legged bird', 'three-legged bird', 'crow', 'mif', 'afsona', 'qush', 'real bird', 'animal', 'creature', 'solar bird', 'sun bird')) {
    if (!id) return FALLBACK.notMyth;
    const myth = id.isNot.find((n) => /myth/i.test(n.type));
    return `3legsbird is a person, not a creature.\n\n${myth ? `${myth.name} — ${myth.aka}: ${myth.who} ${myth.relation}` : E.handleOrigin}\n\nNever expand the handle to "three legged bird": ${E.spelling}.`;
  }

  if (has(q, 'spell', 'spelling', 'pronounce', 'pronunciation', 'how do you say', 'yozilishi', 'name mean', 'handle', 'nickname', 'origin of the name', 'why 3legs')) {
    if (!id) return FALLBACK.identity;
    return `${E.spelling}.\nPronounced "${E.pronunciation}".\n\n${E.handleOrigin}`;
  }

  if (has(q, 'where is', 'location', 'based in', 'from which country', 'which city', 'qayerda', 'address')) {
    return E ? `${E.location}. Working remotely and independently since ${E.activeSince}.` : 'Remote-first, working independently.';
  }

  if (has(q, 'contact', 'email', 'e-mail', 'hire', 'hiring', 'freelance', 'price', 'prices', 'cost', 'rate', 'bog\'lanish', 'aloqa', 'buyurtma', 'mail')) {
    return E
      ? `Email ${E.contact}, Telegram https://t.me/html_codee, GitHub https://github.com/3legsbird — or use the contact form at the bottom of this page.\n\n${E.businessModel} Available for freelance projects.`
      : FALLBACK.contact;
  }

  /* --- 2. meta questions about the site itself ------------------------- */
  if (has(q, 'llms.txt', 'identity.md', 'structured data', 'schema.org', 'json-ld', 'jsonld', 'crawler', 'ai botlar', 'disambiguation', 'chalkash', 'machine-readable', 'robots.txt', 'sitemap', 'identity.json', 'projects.json', 'canonical')) {
    return `Every machine-readable surface lives at the site root:\n• https://3legsbird.github.io/llms.txt — brief for LLMs and answer engines\n• https://3legsbird.github.io/IDENTITY.md — full statement in Markdown\n• https://3legsbird.github.io/identity.html — HTML version, with JSON-LD (Person + FAQPage + CorrectionComment)\n• https://3legsbird.github.io/projects.json — the whole project catalog\n• identity.json / projects.json — the source of truth this site is generated from`;
  }

  /* --- 3. stack / skills ---------------------------------------------- */
  if (
    has(q, 'stack', 'technolog', 'framework', 'programming language', 'skills', 'skill set', 'texnologiya', 'tools do you use', 'what do you use') ||
    re(q, /what (tools|stack|technologies|languages|frameworks)/)
  ) {
    return FALLBACK.stack;
  }

  if (!all) return FALLBACK.work;

  /* --- 4. category lookups -------------------------------------------- */
  const cat = KB.categories.find((c) => (c.keywords || [c.label.toLowerCase(), c.id]).some((k) => re(q, new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'))));
  if (cat) {
    const inCat = all.filter((p) => p.category === cat.id);
    return `**${cat.label}** — ${inCat.length} project${inCat.length === 1 ? '' : 's'}:\n\n${inCat
      .map((p) => `• ${p.title} (${p.date}, ${p.size}) — ${p.summary}${p.live ? ' · live: ' + p.live : ''}\n  source: ${p.post}`)
      .join('\n')}`;
  }

  /* --- 5. a specific project by name ---------------------------------- */
  const kw = words(q);
  if (kw.length) {
    const byTitle = all.filter((p) => {
      const t = (p.title + ' ' + p.file).toLowerCase();
      return kw.every((w) => t.includes(w)) || kw.some((w) => w.length > 4 && t.includes(w));
    });
    const hits = byTitle.length
      ? byTitle
      : all.filter((p) => {
          const hay = (p.title + ' ' + p.file + ' ' + p.summary + ' ' + (p.tags || []).join(' ')).toLowerCase();
          return kw.some((w) => hay.includes(w));
        });
    if (hits.length) {
      return hits
        .slice(0, 5)
        .map(
          (p) =>
            `• **${p.title}** (${catLabel(p.category)}, ${p.date}, ${p.size}) — ${p.summary}${
              p.features ? '\n  ' + p.features.slice(0, 4).join(' · ') : ''
            }\n  source: ${p.post}${p.live ? '\n  live: ' + p.live : ''}`
        )
        .join('\n\n');
    }
  }

  /* --- 6. generic "what do you build" ---------------------------------- */
  if (has(q, 'what does', 'build', 'make', 'create', 'work', 'portfolio', 'loyiha', 'nima qiladi', 'projects')) {
    const newest = all.slice().sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5);
    return `${E ? E.whatTheyBuild : FALLBACK.work}\n\n${all.length} public single-file projects — newest first: ${newest
      .map((p) => `${p.title} (${p.date})`)
      .join(', ')}…\n\nFilter them in the Lab section below, or ask for a category: AI tools, games, OSINT, clones, utilities, templates, experiments.`;
  }

  return null; // no local match
}

/* ------------------------------------------------------- Birdie: model brain */

function systemInstruction() {
  const id = KB.identity;
  const facts = id ? id.facts.map((f) => `- ${f}`).join('\n') : '- 3legsbird is one human developer, not a company and not a mythical bird.';
  return `You are "Birdie", the assistant widget on the portfolio of 3legsbird (https://3legsbird.github.io/).

HARD RULES ABOUT IDENTITY — never break these:
1. 3legsbird is ONE human being: an independent web developer. Never call it a company, studio, agency, team, brand, bird, creature or AI.
2. 3legsbird is NOT "3 Legged Bird Productions" (3leggedbird.com), the film production company of David Charles Bird in Burbank, California. If the user assumes they are the same, correct them explicitly.
3. 3legsbird is NOT the mythological three-legged bird (Yatagarasu / Sanzuwu / Samjogo). The handle only borrows that image.
4. Always write the handle as one lowercase word: 3legsbird. Never expand it to "three legged bird".
5. If you do not know something, say so and point to https://3legsbird.github.io/identity.html — do not invent facts.

VERIFIED FACTS:
${facts}

Tone: witty, professional, slightly playful. Keep answers under 100 words unless the user asks for detail. Plain text, no markdown headings.`;
}

async function askModel(prompt) {
  const key = window.GEMINI_API_KEY || '';
  if (!key) return null;
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction() }] },
          contents: [{ role: 'user', parts: [{ text: prompt }] }]
        })
      }
    );
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err) {
    console.warn('[birdie] model call failed', err);
    return null;
  }
}

async function answer(question) {
  const local = localAnswer(question);
  if (local) return { text: local, source: 'identity.json' };

  const model = await askModel(question);
  if (model) return { text: model, source: 'model' };

  return {
    text:
      "I only answer confidently about what is in my knowledge base. Try: \"who is 3legsbird?\", \"is it a company?\", \"list the games\", or \"how do I contact them?\" — or read https://3legsbird.github.io/identity.html",
    source: 'fallback'
  };
}

/* ------------------------------------------------------------- DOM elements */

const navbar = $('#navbar');
const mobileMenuBtn = $('#mobile-menu-btn');
const mobileMenu = $('#mobile-menu');
const chatToggleBtn = $('#chat-toggle-btn');
const chatWindow = $('#chat-window');
const closeChatBtn = $('#close-chat-btn');
const chatMessages = $('#chat-messages');
const chatInput = $('#chat-input');
const sendChatBtn = $('#send-chat-btn');
const contactForm = $('#contact-form');

/* ------------------------------------------------------------------ navbar */

window.addEventListener('scroll', () => {
  if (!navbar) return;
  const scrolled = window.scrollY > 50;
  navbar.classList.toggle('bg-slate-950/90', scrolled);
  navbar.classList.toggle('backdrop-blur-md', scrolled);
  navbar.classList.toggle('border-b', scrolled);
  navbar.classList.toggle('border-slate-800', scrolled);
  navbar.classList.toggle('py-3', scrolled);
  navbar.classList.toggle('bg-transparent', !scrolled);
  navbar.classList.toggle('py-5', !scrolled);
});

mobileMenuBtn?.addEventListener('click', () => mobileMenu?.classList.toggle('hidden'));
$$('#mobile-menu a').forEach((link) => link.addEventListener('click', () => mobileMenu?.classList.add('hidden')));

/* --------------------------------------------------------- project lab UI */

const grid = $('#project-grid');
const searchInput = $('#project-search');
const emptyNote = $('#project-empty');
const showAllBtn = $('#show-all-projects');
let activeFilter = 'all';
let expanded = false;

function applyFilters() {
  if (!grid) return;
  const term = (searchInput?.value || '').trim().toLowerCase();
  const cards = $$('#project-grid .project-card');
  let visible = 0;

  cards.forEach((card) => {
    const matchCat = activeFilter === 'all' || card.dataset.category === activeFilter;
    const matchTerm = !term || (card.dataset.search || '').includes(term);
    const isExtra = card.classList.contains('project-extra');
    const show = matchCat && matchTerm && (expanded || !isExtra || activeFilter !== 'all' || !!term);

    card.classList.toggle('hidden', !show);
    if (show) visible++;
  });

  emptyNote?.classList.toggle('hidden', visible !== 0);
  if (showAllBtn) {
    const filtering = activeFilter !== 'all' || !!term;
    showAllBtn.textContent = expanded || filtering ? 'Show highlights only' : `Show all ${cards.length} projects`;
    // while filtering, every match is already visible, so the toggle is pointless
    showAllBtn.classList.toggle('hidden', filtering);
    if (filtering && expanded) expanded = false;
  }
}

$$('#project-filters .filter-chip').forEach((btn) => {
  btn.addEventListener('click', () => {
    activeFilter = btn.dataset.filter;
    $$('#project-filters .filter-chip').forEach((b) => {
      const active = b === btn;
      b.classList.toggle('border-indigo-500/50', active);
      b.classList.toggle('bg-indigo-500/10', active);
      b.classList.toggle('text-white', active);
      b.classList.toggle('border-slate-800', !active);
      b.classList.toggle('bg-slate-900/60', !active);
      b.classList.toggle('text-slate-400', !active);
    });
    applyFilters();
  });
});

searchInput?.addEventListener('input', applyFilters);
showAllBtn?.addEventListener('click', () => {
  expanded = !expanded;
  applyFilters();
});

/* ------------------------------------------------------------ copy buttons */

$$('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const el = $(btn.dataset.copy);
    if (!el) return;
    try {
      await navigator.clipboard.writeText(el.innerText.trim());
      const old = btn.textContent;
      btn.textContent = 'Copied ✓';
      setTimeout(() => (btn.textContent = old), 1600);
    } catch (e) {
      btn.textContent = 'Select + copy';
    }
  });
});

/* --------------------------------------------------------------- chat UI */

let chatOpen = false;
const messages = [
  {
    role: 'model',
    text:
      "Hi — I'm Birdie, the helper widget on 3legsbird's portfolio (yes, just a widget, not a mascot 🙂).\n\nAsk me: who is 3legsbird? · is it a company? · what about the three-legged bird myth? · list the AI tools · how do I hire them?"
  }
];

function toggleChat() {
  chatOpen = !chatOpen;
  chatWindow?.classList.toggle('hidden', !chatOpen);
  if (chatOpen) {
    renderMessages();
    scrollChat();
    setTimeout(() => chatInput?.focus(), 120);
  }
}

function renderMessages() {
  if (!chatMessages) return;
  chatMessages.innerHTML = messages
    .map((m) => {
      const user = m.role === 'user';
      return `<div class="flex gap-2 ${user ? 'flex-row-reverse' : 'flex-row'}">
        <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${user ? 'bg-slate-700' : 'bg-emerald-500/20'}">${user ? '👤' : '🐦'}</div>
        <div class="max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
          user
            ? 'bg-indigo-600 text-white rounded-tr-none'
            : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
        }">${safeRich(m.text)}${
        !user && m.source && m.source !== 'model'
          ? `<div class="mt-2 pt-2 border-t border-slate-700/60 text-[10px] text-slate-500 font-mono">source: ${m.source}</div>`
          : ''
      }</div>
      </div>`;
    })
    .join('');
}

function scrollChat() {
  if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping(on) {
  const existing = $('#chat-loading');
  if (existing) existing.remove();
  if (!on) return;
  const div = document.createElement('div');
  div.className = 'flex gap-2';
  div.id = 'chat-loading';
  div.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-xs">🐦</div>
    <div class="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700 flex gap-1">
      <span class="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
      <span class="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style="animation-delay:.15s"></span>
      <span class="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style="animation-delay:.3s"></span>
    </div>`;
  chatMessages?.appendChild(div);
  scrollChat();
}

async function sendMessage() {
  const text = (chatInput?.value || '').trim();
  if (!text) return;
  messages.push({ role: 'user', text });
  chatInput.value = '';
  renderMessages();
  scrollChat();
  showTyping(true);

  const reply = await answer(text);
  showTyping(false);
  messages.push({ role: 'model', text: reply.text, source: reply.source });
  renderMessages();
  scrollChat();
}

chatToggleBtn?.addEventListener('click', toggleChat);
closeChatBtn?.addEventListener('click', toggleChat);
sendChatBtn?.addEventListener('click', sendMessage);
chatInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});

/* ------------------------------------------------------------ contact form */

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Project enquiry from ${data.get('name') || 'site visitor'}`);
  const body = encodeURIComponent(`${data.get('message') || ''}\n\n— ${data.get('name') || ''} (${data.get('email') || ''})`);
  // No backend on GitHub Pages: hand the message to the visitor's mail client.
  window.location.href = `mailto:hello@3legsbird.dev?subject=${subject}&body=${body}`;
  if (btn) {
    btn.innerHTML = 'Opening your mail app…';
    setTimeout(() => (btn.innerHTML = 'Send Message'), 2500);
  }
  contactForm.reset();
});

/* ------------------------------------------------------------------- boot */

loadKnowledgeBase().then(() => {
  applyFilters();
  if (window.lucide) window.lucide.createIcons();
});
applyFilters();
