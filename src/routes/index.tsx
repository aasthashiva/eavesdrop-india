import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, ShieldCheck, Zap, AudioLines, Lock, ChevronRight } from "lucide-react";
import { PhoneMockup, IncomingCallScreen } from "@/components/PhoneMockup";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-14 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              AI-Powered Call Scam Detection
            </span>

            <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              We answer<br />
              so you don't have to.
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              SentryCall listens, analyzes, and protects you from suspicious calls in real-time using advanced voice intelligence.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                <Phone className="h-4 w-4" />
                Try Live Demo
              </Link>
              <Link to="/how-it-works" className="inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary">
                How It Works <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right — phone with sonar */}
          <div className="relative flex items-center justify-center">
            {/* Blob */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[520px] w-[520px] rounded-full bg-gradient-to-br from-primary/10 via-success/10 to-transparent blur-2xl" />
            </div>
            {/* Sonar rings */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="sonar-ring absolute h-64 w-64 rounded-full border-2 border-primary/25"
                  style={{ animationDelay: `${i * 1}s` }}
                />
              ))}
            </div>
            <div className="relative">
              <PhoneMockup>
                <IncomingCallScreen
                  initials="SK"
                  name="Sanjay Kumar"
                  number="+91 89456 27193"
                  location="Rajasthan, India"
                  carrier="Airtel"
                />
              </PhoneMockup>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20">
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">TRUSTED AI. REAL IMPACT.</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Stat icon={<ShieldCheck className="h-5 w-5" />} value="97.2%" label="Scam Detection Accuracy" />
            <Stat icon={<Zap className="h-5 w-5" />} value="4.3 sec" label="Average Detection Time" />
            <Stat icon={<AudioLines className="h-5 w-5" />} value="7" label="AI Signals Analysed Per Call" />
            <Stat icon={<Lock className="h-5 w-5" />} value="100%" label="Offline Voice Processing" />
          </div>
        </div>

        {/* Bottom banner */}
        <div className="mt-16 rounded-2xl border border-border bg-muted/60 p-6 lg:p-8">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div>
                <p className="text-lg font-bold tracking-tight">Built for India.</p>
                <p className="text-lg font-bold tracking-tight">Protecting millions.</p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground lg:ml-6">
              SentryCall is designed to understand the way scammers speak. Because every voice tells a story. We just know the risky ones.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-muted text-primary">{icon}</span>
      <div className="min-w-0">
        <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
        <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
