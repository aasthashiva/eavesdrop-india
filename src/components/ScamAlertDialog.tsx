import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface ScamAlertDialogProps {
  open: boolean;
  onDismiss: () => void;
  trustedContact: string;
}

export function ScamAlertDialog({ open, onDismiss, trustedContact }: ScamAlertDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onDismiss()}>
      <DialogContent className="sm:max-w-md rounded-2xl border-border bg-card p-6 text-center shadow-lg">
        <DialogHeader className="items-center space-y-3">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-danger/10 text-danger">
            <AlertTriangle className="h-7 w-7" />
          </span>
          <DialogTitle className="text-xl font-black tracking-tight text-danger">Potential Scam Call</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Alert has been sent to your trusted contact
            <span className="mt-1 block text-sm font-semibold text-foreground">{trustedContact}</span>
          </DialogDescription>
        </DialogHeader>
        <button
          onClick={onDismiss}
          className="mt-4 w-full rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95"
        >
          Dismiss
        </button>
      </DialogContent>
    </Dialog>
  );
}
