import { createFileRoute } from "@tanstack/react-router";
import { PhoneIncoming, AudioLines, Brain, Gauge, BellRing } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — SentryCall" },
      { name: "description", content: "Learn how SentryCall detects and stops scam calls in real time." },
    ],
  }),
  component: HowItWorks,
});

const STEPS = [
  {
    n: 1,
    icon: PhoneIncoming,
    title: "Call Received",
    body: "As soon as an unknown or suspicious call arrives, SentryCall silently activates in the background — no user action required.",
  },
  {
    n: 2,
    icon: AudioLines,
    title: "Real-Time Transcription",
    body: "Voice is converted to text on-device using our multilingual speech engine, tuned for Indian accents and regional languages.",
  },
  {
    n: 3,
    icon: Brain,
    title: "AI Threat Analysis",
    body: "Multiple specialized agents scan the transcript in parallel for fraud intent, OTP requests, urgency tactics, and impersonation patterns.",
  },
  {
    n: 4,
    icon: Gauge,
    title: "Risk Scoring",
    body: "Signals are fused into a live risk score and confidence value that update every few seconds as the conversation unfolds.",
  },
  {
    n: 5,
    icon: BellRing,
    title: "Alert & Protection",
    body: "If risk crosses a critical threshold, SentryCall warns you instantly and logs the call for review — before any damage is done.",
  },
];

function HowItWorks() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-20 pt-14">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary">
          How It Works
        </span>
        <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
          Five steps from ring<br />to real protection.
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          SentryCall works quietly behind the scenes — turning every incoming call into a stream of signals that our AI evaluates in real time.
        </p>
      </div>

      <div className="relative mt-16">
        {/* Vertical line */}
        <div className="absolute left-6 top-2 bottom-2 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

        <ol className="space-y-10">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isRight = i % 2 === 1;
            return (
              <li key={step.n} className="relative">
                {/* Marker */}
                <div className="absolute left-6 top-4 z-10 -translate-x-1/2 md:left-1/2">
                  <div className="grid h-12 w-12 place-items-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-md">
                    <span className="text-sm font-bold">{step.n}</span>
                  </div>
                </div>

                <div className={`md:grid md:grid-cols-2 md:gap-16 ${isRight ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className={`ml-16 md:ml-0 ${isRight ? "md:pl-16" : "md:pr-16 md:text-right"}`}>
                    <div className={`rounded-2xl border border-border bg-card p-6 shadow-sm ${isRight ? "" : "md:ml-auto"}`}>
                      <div className={`flex items-center gap-3 ${isRight ? "" : "md:justify-end"}`}>
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
                        </span>
                        <h3 className="text-lg font-bold tracking-tight">{step.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                    </div>
                  </div>
                  <div />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
