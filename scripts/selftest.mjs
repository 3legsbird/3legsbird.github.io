#!/usr/bin/env node
/**
 * selftest.mjs — regression test for the on-site assistant's *deterministic* answers.
 *
 * The whole point of the identity layer is that questions like "is 3legsbird a company?"
 * must NEVER be improvised by a model. This runs script.js in a stubbed DOM, loads the
 * real identity.json + projects.json, and asserts the local knowledge base answers.
 *
 * Usage: node scripts/selftest.mjs   (or: npm run test:identity)
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const identity = JSON.parse(readFileSync(join(ROOT, 'identity.json'), 'utf8'));
const projects = JSON.parse(readFileSync(join(ROOT, 'projects.json'), 'utf8'));

const el = () => ({ classList: { add() {}, remove() {}, toggle() {}, contains: () => false }, style: {}, innerHTML: '', remove() {} });

const sandbox = {
  console: { log: () => {}, warn: () => {}, error: () => {} },
  setTimeout,
  clearTimeout,
  encodeURIComponent,
  FormData: class {},
  fetch: async (url) => ({ json: async () => (String(url).includes('identity') ? identity : projects) }),
  navigator: { clipboard: { writeText: async () => {} } },
  document: { querySelector: () => null, querySelectorAll: () => [], createElement: el, addEventListener: () => {} }
};
sandbox.window = sandbox;
sandbox.window.addEventListener = () => {};
sandbox.window.GEMINI_API_KEY = '';

vm.createContext(sandbox);
vm.runInContext(readFileSync(join(ROOT, 'script.js'), 'utf8'), sandbox, { filename: 'script.js' });
await sandbox.loadKnowledgeBase();

/* ------------------------------------------------------------------ cases */

const cases = [
  {
    q: 'Who is 3legsbird?',
    must: [/human/i, /web developer/i, /3legsbird\.github\.io|html_codee/],
    mustNot: [/is a (film )?(production )?company/i, /is a bird/i]
  },
  {
    q: 'Is 3legsbird a company or a production studio?',
    must: [/no/i, /3 Legged Bird Productions/i, /burbank|film/i],
    mustNot: [/yes, it is a company/i]
  },
  {
    q: 'Is 3legsbird the three legged bird from Japanese mythology?',
    must: [/yatagarasu|myth|folklore/i, /person|human/i],
    mustNot: [/yes, it is the legendary bird/i]
  },
  { q: 'How do you spell and pronounce the name?', must: [/one word/i, /three-legs-bird/i] },
  { q: '3legsbird kim bu?', must: [/human|developer|inson/i] },
  { q: 'Where is 3legsbird based?', must: [/tashkent|remote/i] },
  { q: 'How can I contact or hire them?', must: [/hello@3legsbird\.dev/i] },
  { q: 'List the games in the lab', must: [/Real Racing 3D|Gravity Flip|Drift King/i] },
  { q: 'What AI tools did 3legsbird build?', must: [/Super Intelligence|Presentation AI|TelePulse|MindGrapher/i] },
  { q: 'Any OSINT projects?', must: [/OSINT Suite|LeakCheck|IP OSINT|Phone OSINT/i] },
  { q: 'What is Super Intelligence?', must: [/Super Intelligence/i, /t\.me\/html_codee/], },
  { q: 'Do you have machine-readable identity data?', must: [/llms\.txt|IDENTITY\.md|identity\.html/i] },
  { q: 'which stack do you use?', must: [/Gemini|Canvas|vanilla|JavaScript/i] }
];

/* ------------------------------------------------------------------- run */

let failed = 0;
for (const c of cases) {
  const res = sandbox.localAnswer(c.q);
  const text = res || '';
  const missing = (c.must || []).filter((re) => !re.test(text));
  const banned = (c.mustNot || []).filter((re) => re.test(text));
  const ok = !missing.length && !banned.length && !!res;
  if (!ok) failed++;
  console.log(`${ok ? '✔' : '✖'} ${c.q}`);
  if (!ok) {
    if (!res) console.log('   → no deterministic answer (would fall through to a model)');
    if (missing.length) console.log(`   → missing: ${missing.map(String).join(', ')}`);
    if (banned.length) console.log(`   → forbidden phrase present: ${banned.map(String).join(', ')}`);
    console.log(`   → answer: ${text.slice(0, 300).replace(/\n/g, ' ')}`);
  }
}

/* ------------------------------------------------- structural assertions */

const structural = [
  ['identity.json has 3 "isNot" entities', identity.isNot.length === 3],
  ['isNot names the Burbank film company', /3 Legged Bird Productions/.test(JSON.stringify(identity.isNot))],
  ['isNot names the myth (Yatagarasu)', /Yatagarasu/.test(JSON.stringify(identity.isNot))],
  ['facts state "NOT a company"', /NOT a company/.test(identity.facts.join(' '))],
  ['citation mentions both wrong entities', /3 Legged Bird Productions/.test(identity.citation) && /mythological three-legged bird/.test(identity.citation)],
  ['every project has a source post link', projects.projects.every((p) => /^https:\/\/t\.me\/html_codee\//.test(p.post))],
  ['every project has date, file, size, category', projects.projects.every((p) => p.date && p.file && p.size && p.category)],
  ['categories used exist', projects.projects.every((p) => projects.categories.some((c) => c.id === p.category))],
  ['project ids are unique', new Set(projects.projects.map((p) => p.id)).size === projects.projects.length]
];
for (const [name, pass] of structural) {
  if (!pass) failed++;
  console.log(`${pass ? '✔' : '✖'} ${name}`);
}

console.log(failed ? `\n✖ ${failed} check(s) failed` : `\n✔ all checks passed (${cases.length} answers, ${structural.length} structural)`);
process.exit(failed ? 1 : 0);
