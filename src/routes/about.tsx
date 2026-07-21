import { createFileRoute } from "@tanstack/react-router";
import { Github, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Eavesdrop" },
      { name: "description", content: "Meet the team building Eavesdrop!" },
    ],
  }),
  component: About,
});

const TEAM = [
  {
    initials: "HM",
    name: "Harsh Mishra",
    role: "Developer, Backend & Agents",
    bio: "Led backend architecture and API development, while co-building the multi-agent system powering EavesDrop’s real-time call analysis.",
    color: "bg-primary/10 text-primary",
  },
  {
    initials: "AU",
    name: "Aastha Upadhyay",
    role: "Developer, Frontend & Systems",
    bio: "Led frontend and UI/UX, while co-building system architecture and contributing across agent orchestration, backend development, and debugging.",
    color: "bg-success/15 text-success",
  },
];

function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-20 pt-14">
      {/* Intro */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary">
          About Us
        </span>
        <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
          A small team.<br />A big mission.
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Scams rarely begin with an obvious threat. They begin with a conversation. Eavesdrop is being built to understand those conversations, recognize the patterns of manipulation, and help people see what may otherwise go unnoticed.
        </p>
      </div>

      {/* Team */}
      <div className="mt-16">
        <h2 className="mb-6 text-center text-xs font-semibold tracking-[0.2em] text-muted-foreground">THE TEAM</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {TEAM.map((m) => (
            <div key={m.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-full text-lg font-bold ${m.color}`}>
                  {m.initials}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-bold tracking-tight">{m.name}</h3>
                  <p className="text-sm text-primary">{m.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission card + GitHub */}
      <div className="mt-12 rounded-2xl border border-border bg-muted/60 p-8 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Explore the work, the thinking, and the code behind Eavesdrop.
        </p>
        <a
          href="https://github.com/aasthashiva/eavesdrop-india"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Github className="h-4 w-4" />
          View on GitHub
        </a>
      </div>
    </div>
  );
}
