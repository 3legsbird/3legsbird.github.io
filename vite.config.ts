import { defineConfig, loadEnv } from 'vite';

/**
 * Optional dev server for 3legsbird.github.io.
 *
 * The site is static and works straight from the repo root (`npm run serve` needs no deps at all);
 * Vite is only useful when you want the Gemini key injected for the on-site assistant.
 *
 *   cp .env.example .env.local   # then put your key in it
 *   npm run dev                  # http://localhost:3000
 *
 * Without a key everything still works: identity and project answers come from identity.json
 * and projects.json (see script.js), never from a model.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      // the sandbox/live-preview origin must be accepted
      allowedHosts: true
    },
    preview: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: true
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || '')
    }
  };
});
