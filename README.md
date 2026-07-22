# Eavesdrop-India

### Real-time conversational risk detection for voice-based fraud.

> Six specialized agents analyzing a live call. A family alerted before the money moves.

**Status: Deployed** — Backend live on Render, frontend live on Vercel, WhatsApp alerts dispatched via Twilio. Telecom-level call interception not yet integrated — the current Live Test Mode captures audio through the device microphone.

**Live Backend:** https://eavesdrop-backend.onrender.com
**Live Website:** https://eavesdrop-india.vercel.app

---

## The Problem

India lost an estimated ₹22,495 crore (~$2.7B USD) to cybercrime in 2025, across 28+ lakh registered cases — a 24% increase year over year. A particularly damaging subset, "digital arrest" scams, involves callers impersonating police, CBI, or customs officials to pressure victims — often financially established, educated individuals — into transferring large sums within minutes.

Existing defenses all act at the wrong time:

| Defense Layer | When It Acts | Limitation |
|---|---|---|
| Caller ID / spam blockers | Before the call | Scammers rotate numbers daily; blacklists lag |
| Awareness campaigns | Before the call | Rarely holds up under live pressure |
| Bank fraud alerts | After money moves | Often too late to prevent the loss |

The scam script itself follows a repeatable structure — authority claim → false accusation → legal threat → urgency and secrecy → payment extraction. By the time a victim would normally pause and call someone, the pressure has already worked.

**EavesDrop intervenes during the call**, while it is still in progress.

---

## The Solution

A six-agent pipeline analyzes the live transcript, cross-references caller reputation, filters false positives through a second contextual pass, computes a numeric risk score, and — only at high risk — triggers a dual-channel alert.

| Agent | Role | Model Call |
|---|---|---|
| 1. Transcript Agent | Normalizes incoming transcript text | None |
| 2. Pattern Detection | Scans for 6 fraud indicators (authority impersonation, legal coercion, false emergency, credential extraction, secrecy, continuity control) | Groq — llama-3.3-70b |
| 3. Reputation Agent | Checks caller number against `flagged_numbers` table | None |
| 4. Verification Agent | Re-examines flags in full context to suppress false positives | Groq — llama-3.3-70b |
| 5. Decision Agent | Computes weighted risk score (0–100), tracks sustained pressure over time | None |
| 6. Family Alert Agent | Dispatches WhatsApp alert and silent victim signal | None |

A single keyword match never triggers an alert on its own. The Verification Agent exists specifically because words like "urgent" or "verification" appear constantly in legitimate calls — bank reminders, courier deliveries, billing notices.

---

## System Architecture

<img width="1606" height="954" alt="image" src="https://github.com/user-attachments/assets/ac5653a6-8007-44e1-9e78-dc9023b977ed" />


Three components communicate over HTTPS: a React + TanStack frontend (Vercel) running in scripted-demo or live-mic mode, a FastAPI backend (Render) running the detection pipeline, and downstream services — a SQLite reputation store and Twilio for WhatsApp delivery.

### Data Flow Sequence

<img width="1574" height="1258" alt="image" src="https://github.com/user-attachments/assets/6ac075c0-4d12-4b8b-a3bf-0616877e320a" />


Pattern Detection and the Reputation Check run in parallel off the Transcript Agent. The Verification Agent reconciles both before the Decision Agent scores the call and a router decides whether to escalate.

---

## Risk Scoring & Decision Flow

Risk score = `min(100, (flags × 25) + (50 if reputation-flagged))`, reduced if the Verification Agent rules a false positive.

<img width="994" height="1402" alt="image" src="https://github.com/user-attachments/assets/2cf6b03c-450e-41c8-8f5d-58df09b0879a" />


| Behavior | Low (0–39) | Medium (40–69) | High (70+ or force-escalated) |
|---|---|---|---|
| Family WhatsApp Alert | No | No | Dispatched immediately |
| Silent Vibrate Signal | No | No | Queued to victim's device |
| Reputation DB Update | No | No | Number auto-flagged |
| Time Escalation Monitor | Not needed | Active | Already triggered |
| UI State | Green | Amber | Red — "Scam Detected" |

A **time-based escalation mechanism** catches scams that build pressure gradually: if the risk score stays at or above 40 for 15+ continuous seconds, the call escalates to High even without crossing 70 outright.

---

## Family Alert System

Two channels fire simultaneously on High-Risk classification:

- **WhatsApp Family Alert** — built from pre-written, deterministic templates (not model-generated, for consistent latency and zero paraphrasing risk) in English, Hindi, and Marathi, delivered via Twilio.
- **Silent Victim Signal** — a `silent_vibrate` flag, invisible on a shared screen. Documented cases show scammers forcing victims onto video calls or screen-shares to prevent them from alerting anyone visibly.

---

## Validation Results

| Metric | Value |
|---|---|
| Detection accuracy (scam scenarios) | > 90% |
| False-positive rate (benign calls) | < 15% |
| End-to-end latency (request to response) | ~2.5 sec |
| Model inference time | ~800 ms |
| WhatsApp alert dispatch time | < 1 sec |
| Cold start (after Render idle spin-down) | ~50 sec |

---

## Sample Output

### Live Demo Interface
<img width="2372" height="1550" alt="image" src="https://github.com/user-attachments/assets/d81ccc9c-c119-4bd9-bf5d-aa4066446a92" />

### Family Alert — Delivered
<img width="1066" height="825" alt="image" src="https://github.com/user-attachments/assets/fb778d36-9583-471c-aa72-f5836e3893c9" />
<img width="1080" height="630" alt="image" src="https://github.com/user-attachments/assets/f7c4b853-fe23-4b8a-9f4a-c591692a00ab" />


---

## Project Structure

```
eavesdrop/
├── backend/
│   ├── main.py              # FastAPI server and route definitions
│   ├── pipeline.py          # Pipeline graph definition
│   ├── agents.py            # Implementation of all six agents
│   ├── utils.py             # Scoring functions, templates, helpers
│   ├── requirements.txt     # Python dependency list
│   └── data/                # SQLite database directory (auto-created)
├── frontend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── demo.tsx     # Primary demo page component
│   │   └── components/      # React UI component library
│   └── package.json
└── README.md
```

---

## Setup

**1. Clone the repo**
```bash
git clone https://github.com/<your-username>/eavesdrop
cd eavesdrop
```

**2. Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**3. Frontend**
```bash
cd frontend
npm install
npm run dev
```

**4. Environment variables** (backend `.env`)
```
GROQ_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_NUMBER=
```

---

## Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Inference | Groq — llama-3.3-70b-versatile | Sub-second latency for real-time analysis |
| Orchestration | LangGraph + LangChain | Stateful, auditable multi-step pipeline |
| Backend | FastAPI (Render) | Async support, auto-deploy from GitHub |
| Database | SQLite | Zero-config for rapid iteration |
| Messaging | Twilio API | WhatsApp delivery |
| Frontend | React + TanStack Start (Vercel) | Type-safe, file-based routing |
| Styling | Tailwind CSS | Utility-first, consistent design |
| Speech Input | Web Speech API | Zero-dependency live transcription |

---

## Current Status & Known Limitations

- Six-agent detection pipeline: complete, deployed, and validated against test scenarios (see Validation Results)
- Self-learning reputation loop: functional, but data does not persist across Render redeploys on the free tier — production would need a persistent hosted database (PostgreSQL)
- Twilio integration: live, currently on the WhatsApp Sandbox tier, which requires recipient opt-in via `join <code>`
- Live Test Mode uses device microphone input via the Web Speech API, not telecom-level call interception — a production version would require carrier or OS-level integration

---

## Team
 
Built by **Aastha Upadhyay** and **Harsh Mishra**, under the guidance of **Dr. Anand Jee**.
 
### Acknowledgment
 
We would like to express our sincere gratitude to *Dr. Anand Jee, formerly an Assistant Professor in the Department of Electronics and Communication Engineering, Maulana Azad National Institute of Technology (MANIT), Bhopal*, for his invaluable guidance, encouragement, and continued support throughout the development of this project.
 
His expertise in wireless communication, intelligent communication systems, and emerging technologies, reflected through his extensive research contributions in areas including NOMA, RIS, ISAC, and next-generation wireless networks, provided us with valuable academic perspective and inspiration. His guidance has been instrumental not only in shaping this project, but also in encouraging us to approach technical problems with greater depth, curiosity, and rigor.
 
Having had the opportunity to work under his guidance on multiple projects, we are especially grateful for the trust, patience, and valuable insights he has extended to us. His mentorship has played an important role in shaping our approach to engineering, research, and problem-solving. We sincerely thank him for his guidance and for the lasting impact he has had on our academic journey.
