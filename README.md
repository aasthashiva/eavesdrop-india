# EavesDrop — Frontend

**Real-time, in-call scam detection — protection that listens when you can't.**

EavesDrop analyzes a phone conversation *while it's happening* and brings a trusted family member into the moment before a scammer can complete the transaction. This repository is the web frontend — the interactive prototype that lets anyone experience the detection system end-to-end in the browser, built by **Aastha Upadhyay**.

[Live Demo](https://eavesdrop-india.vercel.app/) · [Backend API](https://eavesdrop-backend.onrender.com)

Built for **PS-6: AI for Digital Public Safety — Defeating Counterfeiting, Fraud & Digital Arrest Scams**

---

## What this app does

The `/demo` route puts the visitor on both ends of a simulated call and renders a live risk assessment as the conversation unfolds, entirely from state returned by the detection backend.

### Two modes

**Scripted Demo**
A pre-written, timestamped conversation plays out automatically once the call is accepted — lines appear on a timer, risk and confidence ramp up visually for a consistent, presentation-ready walkthrough. No microphone required. Every line is still posted to the live backend in the background, so the risk shown is grounded in a real analysis, not just animation.

**Live Test**
Speak naturally into your own microphone. The browser's Web Speech API transcribes speech in real time; each new line is sent to the backend as it's captured, and the UI reflects the backend's actual score the moment it comes back — no artificial build-up, no scripting.

A mode toggle at the top of the page switches between the two without leaving the page; both reuse the same panel components underneath.

---

## Components

| Component | What it shows |
|---|---|
| `PhoneMockup` / `IncomingCallScreen` | A realistic incoming-call UI — caller name, number, location, carrier — with accept/decline controls wired to start/stop each mode |
| `DemoEntryDialog` | Onboarding step: capture the visitor's name and (for the prototype) confirm the trusted contact who'd be alerted |
| `TranscriptPanel` | Timestamped transcript lines as they arrive, with a live waveform animation while recording |
| `RiskPanel` | The headline 0–100 risk score with a green → amber → red gradient and a Low/Medium/High badge |
| `ConfidencePanel` | A secondary metric showing how confident the system is in its own current assessment |
| `ThreatPanel` | The specific fraud patterns detected (e.g. authority impersonation, urgency, OTP request), with a warning banner once several stack up |
| `AgentPanel` | A live status view of the six backend agents (Transcript, Pattern Detection, Reputation, Verification, Decision, Response) |
| `ScamAlertDialog` + in-call banner | Fires once, the moment risk crosses the critical threshold — mirrors what the trusted contact would see |

All of these are shared between both modes; only where their data comes from changes (scripted mock data vs. live backend responses).

---

## How data flows

```
Speak (mic) or scripted line arrives
        │
POST /analyze  ──▶  backend detection pipeline (separate service)
        │
risk_score · risk_tier · flags_found · verification_result
        │
RiskPanel · ThreatPanel · AgentPanel · ScamAlertDialog update
```

The frontend never scores anything itself — every number on screen is either backend-sourced (Live Test, and the real alert side-effects in Scripted Demo) or a deliberate presentation animation (the visual ramp in Scripted Demo) layered on top of a real backend call running underneath.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React + [TanStack Start](https://tanstack.com/start) |
| Styling | Tailwind CSS + shadcn/ui |
| Icons | lucide-react |
| Speech input | Web Speech API (browser-native) |
| Package manager | Bun |
| Hosting | Vercel |

---

## Getting started

```bash
# install dependencies
bun install

# start the dev server
bun run dev
```

By default the app talks to the deployed backend at `https://eavesdrop-backend.onrender.com`. To point it at a local backend instead, update the `ANALYZE_ENDPOINT` constant in `src/routes/demo.tsx`.

> Note: the backend runs on Render's free tier and spins down on inactivity — the first request after idle time can take up to ~50 seconds while it wakes up.

### Project structure

```
src/
├── components/     # PhoneMockup, panels, dialogs — the UI library above
├── hooks/
├── lib/
├── routes/
│   └── demo.tsx     # primary demo page — scripted + live modes
└── styles.css
```

---

## Roadmap

- Native mobile app with a real telecom-level call-audio pipeline
- User-configured trusted contacts, call history, and personalised risk profiles
- Commercial-grade speech recognition for code-mixed Hindi-English calls
- Banking and telecom partnerships for broader fraud-intelligence integration

---

## Team

Frontend built by **Aastha Upadhyay**, as part of the EavesDrop project by **Aastha Upadhyay** and **Harsh Mishra** for ET AI Hackathon 2.0 — PS-6, Digital Public Safety.

*A scam call should never be a private crisis.*
