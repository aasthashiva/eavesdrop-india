import { createFileRoute } from "@tanstack/react-router";
import { PhoneIncoming, AudioLines, Brain, Gauge, BellRing } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Eavesdrop" },
    ],
  }),
  component: HowItWorks,
});

const STEPS = [
  {
    n: 1,
    icon: PhoneIncoming,
    title: "Play Both Sides",
    body: "This demo puts you on both ends of the call. First, you set it up as the person receiving it: enter your name and a trusted contact who'd be alerted if things went wrong (for this prototype, that contact is fixed to a demo number). Then you switch sides. Hit accept, and speak as the scammer, however you like. Keep it casual, or go all in: a fake bank officer, an urgent OTP request, threats about a frozen account. Eavesdrop reacts to whatever you say, in real time.",
  },
  {
    n: 2,
    icon: AudioLines,
    title: "Real-Time Transcription",
    body: "As soon as you start talking, your words show up as text on screen, live. There's no delay, no waiting for the call to end. This is the same transcription pipeline that would run on a real incoming call, just pointed at your voice instead.",
  },
  {
    n: 3,
    icon: Brain,
    title: "AI Threat Analysis",
    body: "Behind the scenes, six agents are working on your transcript at once, each one watching for something different. The Transcript Agent tracks what's being said as it comes in. Pattern Detection looks for known scam scripts and pressure tactics. Reputation Check flags anything suspicious about the caller's number. Verification cross-checks claims made during the call against known facts. The Decision Engine pulls all of that together into a single judgment, and the Response Generator decides what you should see next. All six run in parallel, so nothing is sitting in a queue waiting its turn.",
  },
  {
    n: 4,
    icon: Gauge,
    title: "Risk Scoring",
    body: "Every few seconds, those six signals get boiled down into two numbers you can actually read at a glance: a Risk Score and a Confidence level, both out of 100. Say something harmless, and the numbers stay low. Start pushing for an OTP or threatening a frozen account, and watch them climb.",
  },
  {
    n: 5,
    icon: BellRing,
    title: "Alert & Protection",
    body: "Cross a critical risk level, and you'll see a warning appear on screen immediately, no waiting around. At the same time, a real WhatsApp message goes out to your trusted contact, telling them something's wrong. Right now that contact is a fixed demo number, but the alert itself isn't a mockup. It's the same message a real trusted contact would get.",
  },
];

function HowItWorks() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-20 pt-14">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary">
          How It Works
        </span>
        <h1 className="mt-6 text-3xl font-black tracking-tight text-balance sm:text-4xl">
          We could just tell you to trust us. <br />We'd rather show you.
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Here's what "AI detects scams" actually means.
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
