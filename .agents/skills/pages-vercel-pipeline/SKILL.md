---
name: pages-vercel-pipeline
description: >-
  Deployment rules, CORS configuration, and site asset maintenance for the dual GitHub Pages (frontend)
  and Vercel (serverless APIs) portfolio architecture. Use when deploying changes, configuring CORS for /api/,
  updating sitemap.xml or robots.txt, checking Git remotes, or managing serverless endpoints.
---

# GitHub Pages & Vercel Pipeline Architecture Guide

This skill governs deployment rules, repository remotes, CORS policies, and SEO indexing for Dr. Apisit's personal web portfolio (`apisit-man.github.io`).

---

## 1. Git Repository & Remote Integrity (Strict Rule)

Always verify the Git remote before pushing:
* **Live Portfolio URL**: `https://apisit-man.github.io`
* **Target Git Repository**: `apisit-man/apisit-man.github.io`
* **Prohibited Remote**: NEVER reference or push to `apisittongchai/apisittongchai.github.io`.

```powershell
# Verify active remote
git remote -v
```

---

## 2. GitHub Pages Static Assets & `.nojekyll`

GitHub Pages uses Jekyll by default, which ignores folders beginning with `.` or `_`.
* **The `.nojekyll` file** at the workspace root MUST always be preserved.
* If assets, Draco decoders, or sub-application folders fail to load in production, verify that `.nojekyll` exists at the root.

---

## 3. Vercel Serverless API CORS Configuration

The frontend runs on `https://apisit-man.github.io` while serverless functions (like contact forms, AI prompt helpers) run on Vercel (`/api/*`). Every serverless function in `/api/` must handle CORS correctly:

```javascript
// Example Vercel Serverless Function pattern (api/example.js)
export default async function handler(req, res) {
  // Allowed origins
  const allowedOrigins = [
    'https://apisit-man.github.io',
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:5500'
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://apisit-man.github.io');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request immediately
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body;
    // Process request logic...
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Serverless Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
```

---

## 4. SEO & Indexing Maintenance (`sitemap.xml`)

When adding a new application or article:
1. Add an entry to `sitemap.xml` with `<loc>`, `<lastmod>` (format: `YYYY-MM-DD`), and appropriate `<priority>`:
   ```xml
   <url>
       <loc>https://apisit-man.github.io/applications/new-app/</loc>
       <lastmod>2026-09-17</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
   </url>
   ```
2. Verify that `robots.txt` points to the correct sitemap location:
   ```text
   User-agent: *
   Allow: /
   Sitemap: https://apisit-man.github.io/sitemap.xml
   ```

---

## 5. Security & Secret Guardrails

* Never commit `.env` files or hardcode API keys (such as OpenAI keys or SMTP credentials) into client-side scripts.
* Server-side credentials belong exclusively in the **Vercel Project Settings > Environment Variables** dashboard.
