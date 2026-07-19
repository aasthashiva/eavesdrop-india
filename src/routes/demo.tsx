import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Info, ShieldCheck, Lock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { PhoneMockup, IncomingCallScreen } from "@/components/PhoneMockup";
import {
  MOCK_TRANSCRIPT,
  RISK_TARGET,
  CONFIDENCE_TARGET,
  MOCK_THREATS,
  AGENTS,
  type TranscriptLine,
  type ThreatItem,
} from "@/lib/demo-mock";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Try Live Demo — SentryCall" },
      { name: "description", content: "See SentryCall analyze a suspicious call in real time." },
    ],
  }),
  component: DemoPage,
});

function DemoPage() {
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (recording) {
      timerRef.current = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    }
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [recording]);

  const start = () => {
    setElapsed(0);
    setRecording(true);
  };
  const stop = () => {
    setRecording(false);
    setElapsed(0);
  };

  // Derived: which transcript lines are visible so far
  const visibleTranscript = recording
    ? MOCK_TRANSCRIPT.filter((l) => elapsed >= l.at)
    : [];
  const visibleThreats = recording ? MOCK_THREATS.filter((t) => elapsed >= t.at) : [];

  // Ramp risk/confidence toward target based on elapsed
  const ramp = (target: number, atFull = 22) =>
    recording ? Math.min(target, Math.round((elapsed / atFull) * target)) : 0;
  const risk = ramp(RISK_TARGET);
  const confidence = ramp(CONFIDENCE_TARGET);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-16 pt-10">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black tracking-tight">Try Live Demo</h1>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
              <span className="h-2 w-2 rounded-full bg-success pulse-dot" />
              System Active
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Speak as the caller. We'll analyze in real time.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground">
          <Info className="h-4 w-4 text-primary" />
          Tip: Speak naturally. The system is analyzing in real-time.
        </div>
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Left — phone */}
        <div>
          <PhoneMockup>
            <IncomingCallScreen
              initials="RS"
              name="Ravi Sinha"
              number="+91 98765 43210"
              location="Lucknow, Uttar Pradesh"
              carrier="Jio True 5G"
              onAccept={start}
              onDecline={stop}
              recording={recording}
              onStop={stop}
            />
          </PhoneMockup>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            Your number is not visible to the caller.
          </p>
        </div>

        {/* Right — panels */}
        <div className="grid gap-6 md:grid-cols-2">
          <TranscriptPanel
            lines={visibleTranscript}
            recording={recording}
            elapsed={elapsed}
            onStop={stop}
          />
          <RiskPanel risk={risk} />
          <ConfidencePanel confidence={confidence} />
          <ThreatPanel threats={visibleThreats} />
          <div className="md:col-span-2">
            <AgentPanel elapsed={elapsed} recording={recording} />
          </div>
        </div>
      </div>

      {/* Bottom status */}
      <div className="mt-10 rounded-2xl border border-border bg-card p-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-success/10 text-success">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">System Status</p>
              <p className="text-xs text-muted-foreground">All systems operational</p>
              <p className="text-xs text-muted-foreground">Real-time analysis active</p>
            </div>
          </div>
          <StatusItem label="6/6" title="Agents Active" />
          <StatusItem label="In Progress" title="Live Analysis" tone="success" />
          <StatusItem label="Your data is protected" title="Secure & Private" />
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5" />
          Your voice is processed securely and not stored.
        </p>
      </div>
    </div>
  );
}

function StatusItem({ label, title, tone = "default" }: { label: string; title: string; tone?: "default" | "success" }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <p className={`text-sm ${tone === "success" ? "text-success" : "text-muted-foreground"}`}>{label}</p>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-border bg-card p-5 shadow-sm ${className}`}>{children}</div>;
}

function fmtTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function TranscriptPanel({
  lines, recording, elapsed, onStop,
}: { lines: TranscriptLine[]; recording: boolean; elapsed: number; onStop: () => void }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-bold">Live Transcript</h3>
          <p className="text-xs text-muted-foreground">Real-time speech to text</p>
        </div>
        {recording && (
          <span className="text-xs font-medium text-success">Recording... {fmtTime(elapsed)}</span>
        )}
      </div>

      <div className="mt-4 min-h-[180px] space-y-3">
        {lines.length === 0 && (
          <div className="grid min-h-[160px] place-items-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
            Press the call button to begin.
          </div>
        )}
        {lines.map((l, i) => (
          <div key={i} className="animate-fade-in-up rounded-xl bg-muted/60 p-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold text-primary">{l.speaker}</span>
              <span className="text-[11px] text-muted-foreground">{fmtTime(l.at)}</span>
            </div>
            <p className="text-sm leading-snug text-foreground">{l.text}</p>
          </div>
        ))}
      </div>

      {/* Waveform */}
      <div className="mt-4 flex h-12 items-center gap-[3px] rounded-lg bg-muted/40 px-3">
        {Array.from({ length: 48 }).map((_, i) => (
          <span
            key={i}
            className={`w-[3px] rounded-full ${recording ? "wave-bar bg-success" : "bg-muted-foreground/30"}`}
            style={{
              height: `${20 + ((i * 13) % 70)}%`,
              animationDelay: `${(i % 8) * 0.08}s`,
            }}
          />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{recording ? "Recording in progress" : "Idle"}</span>
        {recording ? (
          <button onClick={onStop} className="inline-flex items-center gap-1.5 rounded-lg bg-danger px-3 py-1.5 text-xs font-semibold text-danger-foreground">
            ■ Stop
          </button>
        ) : (
          <span className="text-xs text-muted-foreground">00:00</span>
        )}
      </div>
    </Card>
  );
}

function RiskPanel({ risk }: { risk: number }) {
  const level = risk >= 60 ? "High Risk" : risk >= 30 ? "Medium Risk" : "Low Risk";
  const badgeTone = risk >= 60 ? "bg-danger/10 text-danger" : risk >= 30 ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground";
  return (
    <Card>
      <h3 className="text-base font-bold">Live Risk Score</h3>
      <div className="mt-3 flex items-end justify-between">
        <div className="flex items-baseline">
          <span className="text-5xl font-black tracking-tight">{risk}</span>
          <span className="ml-1 text-xl font-semibold text-muted-foreground">%</span>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeTone}`}>{level}</span>
      </div>
      <div className="relative mt-4 h-2 rounded-full" style={{ background: "linear-gradient(to right, #22c55e, #f59e0b, #dc2626)" }}>
        <span
          className="absolute -top-1 h-4 w-1 rounded-full bg-foreground transition-all duration-500"
          style={{ left: `calc(${risk}% - 2px)` }}
        />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {risk >= 60 ? "Risk is elevated. Continue speaking." : "Analyzing incoming signals..."}
      </p>
    </Card>
  );
}

function ConfidencePanel({ confidence }: { confidence: number }) {
  const label = confidence >= 70 ? "High Confidence" : confidence >= 40 ? "Medium Confidence" : "Building";
  return (
    <Card>
      <h3 className="text-base font-bold">Confidence</h3>
      <div className="mt-3 flex items-end justify-between">
        <div className="flex items-baseline">
          <span className="text-5xl font-black tracking-tight">{confidence}</span>
          <span className="ml-1 text-xl font-semibold text-muted-foreground">%</span>
        </div>
        <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">{label}</span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-success transition-all duration-500" style={{ width: `${confidence}%` }} />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Model is highly confident in this analysis.</p>
    </Card>
  );
}

function ThreatPanel({ threats }: { threats: ThreatItem[] }) {
  return (
    <Card>
      <h3 className="text-base font-bold">Threat Analysis</h3>
      <div className="mt-4 space-y-2.5">
        {threats.length === 0 && (
          <p className="text-xs text-muted-foreground">Threats will appear as they are detected.</p>
        )}
        {threats.map((t, i) => (
          <div key={i} className="animate-fade-in-up flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className={`h-2 w-2 rounded-full ${t.level === "detected" ? "bg-danger" : "bg-warning"}`} />
              {t.label}
            </div>
            <span className={`text-xs font-semibold ${t.level === "detected" ? "text-danger" : "text-warning"}`}>
              {t.level === "detected" ? "Detected" : "Medium"}
            </span>
          </div>
        ))}
      </div>
      {threats.length >= 3 && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-danger/10 px-3 py-2.5 text-xs font-medium text-danger">
          <AlertTriangle className="h-4 w-4" />
          This call shows multiple high-risk indicators.
        </div>
      )}
    </Card>
  );
}

function AgentPanel({ elapsed, recording }: { elapsed: number; recording: boolean }) {
  return (
    <Card>
      <div className="flex items-baseline justify-between">
        <h3 className="text-base font-bold">Multi-Agent Analysis</h3>
        <span className="text-xs text-muted-foreground">AI agents running in parallel</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {AGENTS.map((agent) => {
          const activeState = [...agent.states].reverse().find((s) => (recording ? elapsed >= s.at : s.at === 0)) ?? agent.states[0];
          const tone = activeState.tone;
          const toneClass =
            tone === "success" ? "text-success"
            : tone === "warn" ? "text-warning"
            : tone === "danger" ? "text-danger"
            : tone === "info" ? "text-primary"
            : "text-muted-foreground";
          const dotClass =
            tone === "muted" ? "bg-muted-foreground/40" : tone === "danger" ? "bg-danger" : tone === "warn" ? "bg-warning" : tone === "info" ? "bg-primary" : "bg-success";
          return (
            <div key={agent.name} className="flex items-center justify-between rounded-xl border border-border/60 px-3.5 py-2.5">
              <div className="flex items-center gap-2.5 text-sm font-medium">
                <span className={`h-2 w-2 rounded-full ${dotClass} ${recording && tone !== "muted" ? "pulse-dot" : ""}`} />
                {agent.name}
              </div>
              <span className={`text-xs font-semibold ${toneClass}`}>{activeState.label}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-xs text-success">
        <CheckCircle2 className="h-3.5 w-3.5" />
        6/6 agents active
      </div>
    </Card>
  );
}
