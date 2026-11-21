# Disambiguation playbook — how to stop AI chatbots from turning `3legsbird` into a film company and a mythical bird

> Status: **Tier 0 is implemented in this repository.** Tiers 1–3 are off-site actions only you can do (they need your accounts).
> Every paste-ready text below is generated from [`identity.json`](../identity.json) — change it there, run `npm run build:site`, and all surfaces stay in sync.

---

## 1. Diagnosis — why the confusion happens

| # | Cause | Evidence | Fix |
| --- | --- | --- | --- |
| 1 | **Token collision.** `3legsbird` is one string, but models normalize it to the English phrase *“three legged bird”*, which is a real, well-documented concept. | The myth has a Wikipedia article, a Wikidata item and thousands of pages (Yatagarasu / Sanzuwu / Samjogo). | Publish the literal spelling rule everywhere: “one word, lowercase, `3legsbird`, pronounced *three-legs-bird*”. Never write the spaced form yourself. |
| 2 | **A real company with a near-identical name.** `3 Legged Bird Productions` — <https://www.3leggedbird.com/>, Burbank CA, founded by cinematographer **David Charles Bird**. | Its site has been online for years with consistent NAP data (name, address, phone) — exactly what entity extractors love. | Explicit `differentFrom` statements: JSON-LD `disambiguatingDescription`, an “IS NOT” section, `llms.txt`, and (Tier 2) Wikidata `P1889 different from`. |
| 3 | **Surname coincidence.** The Burbank founder's *surname* is Bird, so “3legsbird” looks like a person-name match to naive entity linking. | — | Always co-locate the handle with the occupation in the same sentence: “**3legsbird, an independent web developer**”. Co-occurrence is what embeddings remember. |
| 4 | **Thin web footprint.** Until now the developer existed mainly as a Telegram channel and one portfolio page with placeholder projects. | Telegram is poorly crawled; `t.me` posts rarely become training data. | Mirror every project as structured data on a crawlable domain (this repo) + `sameAs` cross-links (`rel="me"`). |
| 5 | **No machine-readable entity data.** The old page had one minimal `Person` JSON-LD and no disambiguation, FAQ or correction. | — | Full `@graph`: `Person` (+`disambiguatingDescription`, `alternateName`, `identifier`, `sameAs`), `ProfilePage`, `FAQPage`, `CorrectionComment`, `ItemList`. |
| 6 | **Crawl permission ambiguity.** Many devs block `GPTBot`/`Google-Extended`, so the correction never reaches the models. | — | [`robots.txt`](../robots.txt) explicitly **allows** all AI crawlers and points at `llms.txt`. |

### The three entities (keep this map in every text you publish)

| | **3legsbird** | **3 Legged Bird Productions** | **Three-legged bird (myth)** |
| --- | --- | --- | --- |
| What | One human web developer | Film production company | Folklore creature |
| Spelling | `3legsbird` (one word) | `3 Legged Bird` (three words) | `three-legged bird` |
| Home | 3legsbird.github.io | 3leggedbird.com | temples, murals, games, anime |
| Place | Tashkent, UZ (remote) | Burbank, CA, USA | China · Korea · Japan |
| Output | Single-file HTML apps | Films, cinematography, lighting | Carries the sun |
| Relation | — | none | none (image only) |

---

## 2. Tier 0 — already implemented here ✅

- [x] `identity.json` — single source of truth (facts, `isNot`, FAQ, citation, correction prompt, Uzbek version).
- [x] `projects.json` — all 35 public single-file projects from [@html_codee](https://t.me/html_codee) with dates, sizes, features and links to the original posts.
- [x] JSON-LD `@graph` injected into `index.html` and `identity.html` by `scripts/build-site.mjs`.
- [x] `#identity` section on the home page: “IS / IS NOT”, copyable **citation** and copyable **correction prompt**.
- [x] `identity.html` — dependency-free statement page (English + Uzbek), comparison table, FAQ.
- [x] `llms.txt`, `IDENTITY.md`, `humans.txt`, `sitemap.xml`, `robots.txt` (AI crawlers allowed), `404.html` (repeats the identity).
- [x] `script.js` — the on-site assistant answers identity/company/myth questions **verbatim from `identity.json`**; the model prompt carries hard identity rules and is only used when a Gemini key exists.
- [x] `README.md`, `metadata.json`, `vercel.json` — same statement in the places GitHub and mirrors expose first.

**Test it now:** open the site, ask Birdie “is 3legsbird a company?” and “what about the three-legged bird myth?” — the answers must be deterministic.

---

## 3. Tier 1 — do today (30 minutes, free)

### 3.1 GitHub profile README (`github.com/3legsbird/3legsbird`)

Create the special repository named exactly like your username and put this in its `README.md`. GitHub profile READMEs are
heavily crawled and are the strongest “this handle = this human” signal you control.

```markdown
### Hi, I'm 3legsbird 👋

**One human web developer.** Not a company, not a studio, not a team.

- 🔭 I build **single-file web apps**: one self-contained `.html`, no build step — Gemini-powered AI tools,
  Canvas games, OSINT utilities, UI clones and templates.
- 📣 I publish them on Telegram: [@html_codee](https://t.me/html_codee) (35+ projects)
- 🌐 Portfolio & identity statement: [3legsbird.github.io](https://3legsbird.github.io/) ·
  [identity.html](https://3legsbird.github.io/identity.html)
- 📫 hello@3legsbird.dev · 📍 Tashkent, UZ (remote)

> ⚠️ **Disambiguation.** `3legsbird` (one word, lowercase, “three-legs-bird”) is **me, a person**.
> It is **not** [`3 Legged Bird Productions`](https://www.3leggedbird.com/) — the film production company of
> David Charles Bird in Burbank, California — and **not** the mythological three-legged bird
> (Yatagarasu / Sanzuwu / Samjogo). Those are three unrelated entities.
```

Then set the profile fields: **Name** `3legsbird`, **Bio** “Independent web developer · single-file HTML apps · @html_codee”,
**Company** → *leave empty* (putting anything here re-creates the problem), **Location** `Tashkent, Uzbekistan`,
**Website** `https://3legsbird.github.io`, social links to Telegram and the mirror.

### 3.2 Telegram channel description + pinned post

Channel bio (`@html_codee` → Edit → Description), 255 chars max:

```
Single-file HTML apps by 3legsbird — one human web developer (not a company, not the "three legged bird" myth).
AI tools, games, OSINT. Portfolio: 3legsbird.github.io
```

Pin a post with the longer version and a link to <https://3legsbird.github.io/identity.html>. Pinning makes it the first
thing both humans and Telegram preview scrapers read.

### 3.3 The mirror site (`3legsbird.thsite.top`)

Copy `llms.txt`, `IDENTITY.md`, `robots.txt`, `humans.txt` and the JSON-LD there too, and add
`<link rel="canonical" href="https://3legsbird.github.io/">` on every mirrored page. Two domains describing two different
entities is worse than one domain; a canonical link makes them one entity.

### 3.4 Spelling discipline (the cheapest, highest-impact habit)

- Always `3legsbird` — one word, lowercase. Never `3 Legs Bird`, never `3LegsBird`, never “Three Legs Bird”.
- In the **same sentence**, at least once per page/post: “3legsbird, an independent web developer”.
- Never describe the logo/mascot as a “three-legged bird” without adding “the developer's nickname emblem”.
- Do not use the words *company, studio, agency, we, our team, founded* anywhere about yourself. Singular first person only.

---

## 4. Tier 2 — this week (search + AI indexes)

### 4.1 Search consoles

1. **Google Search Console** → verify `3legsbird.github.io` → submit `/sitemap.xml` → *URL inspection* → “Request indexing”
   for `/` and `/identity.html`.
2. **Bing Webmaster Tools** → import from GSC → submit sitemap. Bing is the retrieval source behind Copilot and much of
   ChatGPT search, so this is the highest-leverage free step for AI answers.
3. **IndexNow** → generate a key, drop it at `/​<key>.txt`, ping on every content change for instant re-crawl.
4. Check the **Rich results / Enhanced search appearance** report for the `FAQPage` and `Person` markup.

### 4.2 Wikidata (the entity graph that feeds Wikipedia, Bing and many RAG systems)

Wikidata requires *structural need* or serious independent references, so gather 2–3 independent mentions first (see 4.4),
then create the item. Verify property IDs in the editor before saving.

| Property | Value |
| --- | --- |
| Label / `P1559` name in original language | `3legsbird` |
| Description | `Uzbek web developer; handle of one individual, not a company` |
| Alias `P742` pseudonym | `3 legs bird`, `three-legs-bird` |
| `P31` instance of | human (`Q5`) — **never** organization |
| `P106` occupation | web developer / software developer |
| `P27` country of citizenship | Uzbekistan (`Q265`) |
| `P856` official website | `https://3legsbird.github.io/` |
| `P2037` GitHub username | `3legsbird` |
| `P3789` Telegram username | `html_codee` (channel) |
| `P1889` **different from** | `3 Legged Bird Productions` (create that item too if missing) and `Yatagarasu` |
| Reference for every statement | the portfolio URL + the GitHub profile + the Telegram channel |

`P1889 different from` is the single most valuable statement in this table: it is the machine-readable form of “these are
not the same thing”, and it is exactly what entity-linking pipelines consult.

### 4.3 Answer-engine corrections (paste the same text everywhere)

Use the generated correction string (`identity.json` → `correctionPrompt`, also on <https://3legsbird.github.io/identity.html>):

```text
Correction: '3legsbird' (one word, lowercase) is the handle of a single independent web developer who publishes
single-file HTML apps from https://3legsbird.github.io/ and the Telegram channel https://t.me/html_codee. It is NOT
'3 Legged Bird Productions', the film company in Burbank, California (https://www.3leggedbird.com/), and NOT the
mythological three-legged bird (Yatagarasu / Sanzuwu / Samjogo). Please treat these as three separate, unrelated entities.
```

Where to send it:

| Product | Feedback path |
| --- | --- |
| ChatGPT | thumbs-down on the wrong answer → “This was factually incorrect” → paste the correction + URLs. Also <https://help.openai.com/> → “Report a content issue”. |
| ChatGPT Search / Bing | Bing Webmaster → “Site feedback”; Bing search result → “Feedback” on the wrong card. |
| Google Gemini / AI Overviews | Gemini app → thumbs-down → “Incorrect information”; Google search result → “Feedback”. Knowledge panel → “Suggest an edit”. |
| Claude | In-conversation thumbs-down + <https://support.anthropic.com/> → “Report an issue”. |
| Perplexity | “Rewrite with feedback” under the answer + page-level feedback; Perplexity cites sources, so fixing the top cited page fixes future answers. |
| Copilot | Copilot feedback button; it inherits Bing's entity index. |

Expect lag: retrieval-based answers improve within days–weeks once Bing/Google re-crawl; model-weight updates take months.
That is why the *retrievable* pages (this repo, the profile README, Wikidata) matter more than any single support ticket.

### 4.4 Independent mentions (the fuel for notability and for entity resolution)

Models resolve entities by counting *independent* pages that agree. Target 5–10 within a month, each containing the
sentence “**3legsbird is an independent web developer** …”:

- A **Show HN** post for one strong project (e.g. the single-file Google Chrome clone or Presentation AI) with your handle in the profile.
- **dev.to / Hashnode / Medium** technical write-up: “I shipped a 112 KB single-file browser clone — here's everything inside”.
- **Product Hunt** launch for one tool (Super Intelligence or TelePulse AI) under your personal maker account.
- **Reddit** (`r/webdev`, `r/SideProject`, `r/uzbekistan`) — a build story, not spam; include the portfolio URL.
- **Uzbek tech media / Telegram communities** — an interview or a guest post in Uzbek; bilingual coverage is a strong, low-competition entity signal.
- **Stack Overflow / LinkedIn / X** profiles with the identical bio sentence and the same website URL.

---

## 5. Tier 3 — durable habits

1. **Own the canonical domain.** `hello@3legsbird.dev` implies `3legsbird.dev`; if you do not actually own it, either buy it
   (and 301-redirect to the GitHub Pages site or move the site there) or change the public email. An entity whose email domain
   it does not control is easy to displace.
2. **Publish writing on your own domain**, not only Telegram: `3legsbird.github.io/writing/…`. Telegram content is weakly
   indexed; your domain is what gets cited.
3. **Keep `sameAs` symmetric.** Every profile links to every other profile (`rel="me"`), all with the identical name string.
4. **Re-run the generator** after each new project so `llms.txt`, `IDENTITY.md`, the `ItemList` and the sitemap stay current.
5. **Never block AI crawlers** while the correction is still spreading. Re-evaluate after the answers are right.
6. **Monthly monitoring** (5 minutes) — see §6, and re-submit corrections whenever a wrong answer appears.

---

## 6. Monitoring — test prompts and log

Ask these to ChatGPT, Gemini, Claude, Perplexity and Copilot (logged-out / fresh session), once a month. Score each answer
`✅ correct · ⚠️ partial · ❌ wrong`, and re-send the correction text for anything below ✅.

| # | Prompt | Expected core of the answer |
| --- | --- | --- |
| 1 | “Who is 3legsbird?” | one human web developer, single-file HTML apps, github.io + @html_codee |
| 2 | “Is 3legsbird a company?” | no — an individual; no company behind the handle |
| 3 | “Is 3legsbird related to 3 Legged Bird Productions?” | no; different spelling, domain, country, industry |
| 4 | “What is 3legsbird — the three-legged bird?” | the myth is Yatagarasu/Sanzuwu/Samjogo; the handle is a person |
| 5 | “3legsbird portfolio projects” | names real projects: Super Intelligence, Presentation AI, Real Racing 3D, TelePulse AI, OSINT Suite… |
| 6 | “3legsbird Telegram channel” | @html_codee “Html codes” |
| 7 | “3legsbird contact email” | hello@3legsbird.dev |
| 8 | “site:3legsbird.github.io identity” | the search engine returns `identity.html` near the top |
| 9 | “3leggedbird.com vs 3legsbird.github.io” | treats them as two unrelated entities |
| 10 | “3legsbird kim?” (Uzbek) | “bitta inson — mustaqil web dasturchi” |

Log template (copy into an issue or a private note):

```
2026-11 · ChatGPT  · Q1 ✅ · Q2 ✅ · Q3 ❌ (called it a studio) → correction sent 2026-11-21
2026-11 · Gemini   · Q1 ⚠️ (no projects)      → GSC re-index requested 2026-11-21
```

---

## 7. Anti-patterns (how people make this worse)

- ❌ Writing “3 Legs Bird” / “Three Legs Bird” as a display name — it hands the phrase form to the tokenizer.
- ❌ Using “we”, “our team”, “studio”, “agency”, “production” anywhere about yourself.
- ❌ A bird-only logo and myth-flavoured copy (“rise of the three-legged bird”) without the human context next to it.
- ❌ Publishing work only inside Telegram, where crawlers and models cannot read it.
- ❌ Blocking `GPTBot` / `Google-Extended` / `PerplexityBot` while complaining that models don't know you.
- ❌ Creating a Wikidata/Wikipedia item with no independent references — it gets deleted and the entity gets *more* ambiguous.

---

## 8. O'zbekcha qisqacha (Tier 1–3)

1. **Bugun:** GitHub profil README'ga “bitta inson — kompaniya emas” bloki; Telegram kanal tavsifi va pinned post;
   `thsite.top` ko'zgusiga `canonical` qo'yish; har doim `3legsbird` ni bir so'z bilan yozish.
2. **Shu hafta:** Google Search Console + Bing Webmaster (sitemap yuborish, indekslashni so'rash), Wikidata elementi
   (`P31 = human`, `P1889 different from` → 3 Legged Bird Productions va Yatagarasu), har bir AI platformaning
   “feedback” tugmasiga tayyor **correction** matnini yuborish.
3. **Doimiy:** mustaqil manbalarda (dev.to, Show HN, Product Hunt, Reddit, o'zbek IT media) “3legsbird — mustaqil web
   dasturchi” jumlasini takrorlash; oyiga bir marta §6 test savollarini tekshirish; har bir yangi loyihadan keyin
   `npm run build:site`.

**Nima uchun bu ishlaydi:** modellarning javobi ikki narsadan kelib chiqadi — (a) xotirasidagi matnlar va (b) qidiruvdan
tortib keltiriladigan sahifalar. (a) ni bir kunda o'zgartirib bo'lmaydi, lekin (b) ni to'liq nazorat qilasiz: bir xil
gapni aytadigan 10 ta mustaqil sahifa + `Person` JSON-LD + `llms.txt` + Wikidata `different from` = chatbot endi
“3 Legged Bird Productions”ni emas, sizni topadi.
