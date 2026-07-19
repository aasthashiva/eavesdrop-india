import { Link } from "@tanstack/react-router";
import { Phone, ShieldCheck } from "lucide-react";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
            <Phone className="absolute h-3 w-3 translate-x-[1px] translate-y-[2px]" strokeWidth={2.5} />
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">SentryCall</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/how-it-works">How It Works</NavLink>
          <NavLink to="/about">About Us</NavLink>
        </nav>

        <Link
          to="/demo"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
        >
          Try Live Demo
        </Link>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-sm font-medium text-foreground/70 transition hover:text-foreground"
      activeProps={{ className: "text-primary font-semibold" }}
      activeOptions={{ exact: true }}
    >
      {children}
    </Link>
  );
}
