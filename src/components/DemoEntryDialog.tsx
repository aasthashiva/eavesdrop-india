import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle2, ShieldCheck } from "lucide-react";

interface DemoEntryDialogProps {
  open: boolean;
  onStart: (name: string) => void;
}

export const TRUSTED_CONTACT_DISPLAY = "+91 6398 808 024";
export const TRUSTED_CONTACT_E164 = "+916398808024";

export function DemoEntryDialog({ open, onStart }: DemoEntryDialogProps) {
  const [name, setName] = useState("");
  const [touched, setTouched] = useState(false);
  const trimmed = name.trim();
  const invalid = touched && trimmed.length === 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!trimmed) return;
    onStart(trimmed);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-md rounded-2xl border-border bg-card p-6 shadow-lg [&>button]:hidden"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="text-xl font-black tracking-tight">Set up your demo</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            First, tell us who you are — then you'll play the scammer and watch our system catch you in real time.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="mt-4 space-y-5" noValidate>
          <div>
            <label htmlFor="demo-name" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Your name
            </label>
            <input
              id="demo-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="e.g. Sanjay Kumar"
              autoFocus
              required
              aria-invalid={invalid}
              className={`mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                invalid ? "border-danger" : "border-border"
              }`}
            />
            {invalid && <p className="mt-1.5 text-xs font-medium text-danger">Please enter a name to continue.</p>}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Trusted contact</p>
            <div className="mt-1.5 flex items-center justify-between rounded-xl border-2 border-primary bg-primary/5 px-3.5 py-3">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{TRUSTED_CONTACT_DISPLAY}</p>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Demo Contact</p>
                </div>
              </div>
              <CheckCircle2 className="h-5 w-5 text-primary" aria-label="Selected" />
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Alerts during this demo are sent to this fixed number.
            </p>
          </div>

          <button
            type="submit"
            disabled={!trimmed}
            className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Start Demo
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
