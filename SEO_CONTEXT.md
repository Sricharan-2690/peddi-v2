# PEDDI MOVIE WEBSITE — SEO CONTEXT FILE
# Read this before doing anything. Do not re-explore the codebase.

## Project
- React SPA (Vite + React Router)
- Deployed on Vercel (official domain coming later)
- Pages: / (Home), /cast-crew, /gallery, /music, /tickets, /updates, /analytics

## Movie Details
- Title: Peddi
- Release Date: 30 April 2026
- Language: Telugu
- Genre: Action/Thriller (update if different)

## What has already been done
- SEO_CONTEXT.md created ✓
- Mobile viewport meta: PRESENT in index.html
- Favicon: PRESENT

## Steps (check each file before starting — skip if already done)
- [ ] Step 1 — Install react-helmet-async
- [ ] Step 2 — Add HelmetProvider to src/App.jsx
- [ ] Step 3 — Add Helmet + hidden h1 to src/pages/Home.jsx
- [ ] Step 4 — Add Helmet + hidden h1 to src/pages/CastCrew.jsx
- [ ] Step 5 — Add Helmet + hidden h1 to src/pages/Music.jsx
- [ ] Step 6 — Add Helmet + hidden h1 to src/pages/Tickets.jsx
- [ ] Step 7 — Add Helmet + hidden h1 to src/pages/Gallery.jsx
- [ ] Step 8 — Add Helmet + hidden h1 to src/pages/Updates.jsx
- [ ] Step 9 — Add JSON-LD Movie schema to Home.jsx
- [ ] Step 10 — Create public/sitemap.xml
- [ ] Step 11 — Create public/robots.txt
- [ ] Step 12 — Fix image alt text across all pages

## STRICT RULES — DO NOT VIOLATE
- DO NOT touch any styling, CSS, animations, or visual layout
- DO NOT restructure or rename any existing components
- DO NOT change routing logic in App.jsx
- DO NOT modify index.html
- DO NOT install any package except react-helmet-async
- ONLY add new code — never delete or replace existing working code
- After every step, say: "Done: Step X — [filename] modified"

## File Structure (do not change this)
src/
  App.jsx           ← Step 2: add HelmetProvider wrap only
  App.css           ← DO NOT TOUCH
  pages/
    Home.jsx        ← Step 3, 9
    CastCrew.jsx    ← Step 4
    Music.jsx       ← Step 5
    Tickets.jsx     ← Step 6
    Gallery.jsx     ← Step 7
    Updates.jsx     ← Step 8
    Analytics.jsx   ← DO NOT TOUCH (internal page)
public/
  index.html        ← DO NOT TOUCH
  (add sitemap.xml here — Step 10)
  (add robots.txt here — Step 11)

## Session Continuity
If resuming: read this file, check which steps have [ ] vs [x],
start from the first uncomplete step. Do not redo completed work.
When you finish a step, remind me to mark it [x] in this file.