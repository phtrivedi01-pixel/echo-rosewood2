# Écho — Rosewood Hospitality Intelligence

A staff-facing intelligence dashboard for Rosewood Hotels. Écho gives front-desk and concierge teams a calm, considered read on each guest — not a marketing prompt, but a whispered brief in their ear. Built as a hackathon prototype on the question: how do you do AI-driven personalization without making the guest feel surveilled?

**Live demo:** <a href="https://echo-rosewood2.vercel.app" target="_blank" rel="noopener noreferrer">echo-rosewood2.vercel.app</a>

**Walkthrough video:** <a href="https://www.loom.com/share/0d36010154ed4db7a9cc5b0ac400c53b" target="_blank" rel="noopener noreferrer">loom.com/share/0d36010154ed4db7a9cc5b0ac400c53b</a>

**GitHub repo:** <a href="https://github.com/phtrivedi01-pixel/echo-rosewood2" target="_blank" rel="noopener noreferrer">github.com/phtrivedi01-pixel/echo-rosewood2</a>

The demo follows two contrasting guests at Rosewood Sand Hill on May 16, 2026:
- **Isabella Reyes** — long-known returning guest, four prior stays, traveling solo this time
- **Daniel Park** — first-timer, intentionally private, app-only orders

The same system reads each profile and produces very different recommendations, layouts, and gestures.

## What it does

**Dashboard.** Two guest cards. Click anywhere on a card to open the guest's profile. The Echo Profile tier (Deeply Known / Familiar / Forming / Newly Met) replaces a numeric "score" — it describes the *hotel's depth of knowledge*, not the guest's value.

**Guest profile.** A status lifecycle toggle (Arriving / In Residence / Checked Out) at the top reflows the entire page:
- **Stay History** is shown pre-arrival, hidden the moment they check in
- **Whisper Brief** changes its status color scheme, and its section pill always shows current status
- **Echo Decisions** auto-opens during the active stay
- **Afterglow** appears only after checkout (Isabella gets a 3D flip card — postcard on the front, passport with a journey map on the back; Daniel gets a quiet text card)
- **Staff Signal Panel** auto-opens at the top of the page when the guest is in residence

Every section is independently collapsible, with status-driven defaults.

**Staff Signal Panel.** Live signal capture during the stay. Staff log:
- A **Moment landed** — a past gesture that worked
- A **Moment missed** — a past gesture that didn't connect
- A **New observation** — fresh data Écho didn't know

Tag with Dining · Spa · Family · Room · Activity · Emotional. Submit, and Écho fires a Claude API call that returns a single next-action recommendation rooted in the full guest profile + the new signal. The recommendation auto-appends to the Echo Decisions table with a "Just Added" gold pill.

**Recommendation engine.** Backed by Claude Sonnet 4.6 with a system prompt that encodes:
- Temporal correctness — `landed` builds on a past success, `missed` proposes a categorically different recovery, `observation` proposes a first move
- Substance-switch rule — if tea missed, never recommend more tea; if a written message missed, never write another
- Wellness/relaxation framing on misses — pivot to bath rituals, foot soaks, atmospheric shifts, sleep aids
- Low-data branch — for private first-timers like Daniel, default toward generic, app-mediated, low-presence gestures and lean on `stay-silent` more often

## Design tenets

- Restraint over abundance. The highest-quality recommendation is the one the guest experiences as serendipity, not service.
- Status drives layout. The page's shape — what's hidden, what's open, what's at the top — should match where the guest is in their stay.
- Word tiers, not scores. "Echo Profile · Deeply Known" instead of "Echo Score · 94/100."
- For a guest who hasn't shared themselves, invisibility is the highest care.

## Tech stack

- **Next.js 15** App Router with Turbopack
- **React 19**
- **Tailwind v4** with custom theme tokens
- **TypeScript**
- **Claude API** (`@anthropic-ai/sdk`) — Sonnet 4.6 with prompt caching
- **ElevenLabs** — pre-generated audio for whisper briefs and Isabella's afterglow
- **next/font** — DM Sans (body) + Cormorant Garamond (display serif)
- Deployed on **Vercel**

## Project layout

```
app/
  page.tsx                       Dashboard with two guest cards
  loading.tsx                    Dashboard loading state
  globals.css                    Tailwind v4 theme tokens
  guests/[id]/
    page.tsx                     Server component, loads guest by id
    loading.tsx                  Profile loading state
  api/
    generate-decision/route.ts   Initial decision table generation
    recommend-next/route.ts      Next-action recommendation from a signal

components/
  whisper-brief.tsx              Full guest profile, status lifecycle, layout reflow
  staff-signal-panel.tsx         Signal capture + recommendation card
  echo-profile.tsx               Word-tier replacement for numeric score
  flip-card/                     3D afterglow flip card (Isabella only)
    index.tsx                    Container with rotation transform
    flip-card-front.tsx          Postcard side with audio playback
    flip-card-back.tsx           Passport side with SVG journey map

data/
  guests.json                    Two seeded guest profiles

public/audio/                    Pre-generated ElevenLabs audio
scripts/generate-audio.ts        Regenerate audio (requires ELEVENLABS_API_KEY)
```
