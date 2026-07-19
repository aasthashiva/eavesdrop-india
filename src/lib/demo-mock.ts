/**
 * Mock scripted demo data. Structured so a developer can later swap in
 * real API calls without restructuring the UI:
 *   - transcript[] can come from a live STT stream
 *   - riskTarget/confidenceTarget can be replaced with model outputs
 *   - threats[] can be populated by a real classifier
 *   - agentSequence[] can reflect real agent orchestration events
 */

export interface TranscriptLine {
  at: number; // seconds from recording start
  speaker: string;
  text: string;
}

export const MOCK_TRANSCRIPT: TranscriptLine[] = [
  { at: 3, speaker: "Caller", text: "Good afternoon sir, am I speaking with Mr. Ankit?" },
  { at: 8, speaker: "Caller", text: "This is regarding your bank account verification." },
  { at: 14, speaker: "Caller", text: "There seems to be some suspicious activity on your account." },
  { at: 21, speaker: "Caller", text: "To secure your account, I need you to share the OTP sent to your mobile." },
];

export const RISK_TARGET = 78;
export const CONFIDENCE_TARGET = 86;

export interface ThreatItem {
  at: number; // seconds — when it "detects"
  label: string;
  level: "detected" | "medium";
}

export const MOCK_THREATS: ThreatItem[] = [
  { at: 8, label: "Financial Fraud Intent", level: "detected" },
  { at: 14, label: "OTP / Sensitive Info Request", level: "detected" },
  { at: 17, label: "Urgency / Pressure Tactic", level: "medium" },
  { at: 20, label: "Authority Impersonation", level: "detected" },
  { at: 22, label: "Social Engineering", level: "medium" },
];

export interface AgentState {
  name: string;
  states: { at: number; label: string; tone: "muted" | "info" | "warn" | "danger" | "success" }[];
}

export const AGENTS: AgentState[] = [
  {
    name: "Transcript Agent",
    states: [
      { at: 0, label: "Idle", tone: "muted" },
      { at: 2, label: "Listening", tone: "success" },
    ],
  },
  {
    name: "Pattern Detection",
    states: [
      { at: 0, label: "Standby", tone: "muted" },
      { at: 5, label: "Detecting Keywords", tone: "warn" },
    ],
  },
  {
    name: "Reputation Check",
    states: [
      { at: 0, label: "Standby", tone: "muted" },
      { at: 9, label: "Checking Database", tone: "warn" },
    ],
  },
  {
    name: "Verification",
    states: [
      { at: 0, label: "Standby", tone: "muted" },
      { at: 13, label: "Cross-validating", tone: "info" },
    ],
  },
  {
    name: "Decision Engine",
    states: [
      { at: 0, label: "Standby", tone: "muted" },
      { at: 18, label: "High Risk", tone: "danger" },
    ],
  },
  {
    name: "Response Generator",
    states: [
      { at: 0, label: "Standby", tone: "muted" },
      { at: 22, label: "Alert Sent", tone: "success" },
    ],
  },
];
