import { Phone, PhoneOff, CheckCircle2, Square } from "lucide-react";
import type { ReactNode } from "react";

interface PhoneMockupProps {
  children?: ReactNode;
  className?: string;
}

/**
 * iPhone 15/16 Pro-style frame. Renders a screen area (children)
 * inside a realistic titanium-black body with side buttons and Dynamic Island.
 */
export function PhoneMockup({ children, className = "" }: PhoneMockupProps) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ width: 300 }}>
      {/* Side buttons — left edge */}
      <div className="absolute -left-[3px] top-[92px] h-8 w-[3px] rounded-l bg-neutral-700" />
      <div className="absolute -left-[3px] top-[148px] h-14 w-[3px] rounded-l bg-neutral-700" />
      <div className="absolute -left-[3px] top-[212px] h-14 w-[3px] rounded-l bg-neutral-700" />
      {/* Power button — right edge */}
      <div className="absolute -right-[3px] top-[170px] h-20 w-[3px] rounded-r bg-neutral-700" />

      {/* Outer titanium frame */}
      <div
        className="relative rounded-[3rem] p-[3px]"
        style={{
          background: "linear-gradient(145deg, #4a4a4a, #1a1a1a 40%, #2a2a2a 60%, #4a4a4a)",
          boxShadow: "0 25px 60px -20px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05) inset",
        }}
      >
        {/* Inner bezel */}
        <div className="rounded-[2.85rem] bg-black p-[2px]">
          {/* Screen */}
          <div className="relative overflow-hidden rounded-[2.7rem] bg-[#faf9f6]" style={{ aspectRatio: "9/19.5" }}>
            {/* Dynamic Island */}
            <div className="absolute left-1/2 top-2.5 z-20 h-7 w-[95px] -translate-x-1/2 rounded-full bg-black" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface IncomingCallScreenProps {
  initials: string;
  name: string;
  number: string;
  location: string;
  carrier: string;
  onAccept?: () => void;
  onDecline?: () => void;
  recording?: boolean;
  onStop?: () => void;
  notification?: ReactNode;
}


export function IncomingCallScreen({
  initials,
  name,
  number,
  location,
  carrier,
  onAccept,
  onDecline,
  recording,
  onStop,
  notification,
}: IncomingCallScreenProps) {
  return (
    <div className="relative flex h-full w-full flex-col px-6 pb-8 pt-14">
      {notification && (
        <div className="pointer-events-none absolute inset-x-3 top-12 z-30 flex justify-center">
          <div className="pointer-events-auto w-full">{notification}</div>
        </div>
      )}
      <p className="mt-2 text-center text-[13px] font-medium text-neutral-500">Incoming Call</p>


      <div className="mt-6 flex flex-1 flex-col items-center">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-neutral-200 text-2xl font-semibold text-neutral-700">
          {initials}
        </div>
        <h3 className="mt-5 text-xl font-bold tracking-tight text-neutral-900">{name}</h3>
        <p className="mt-1 text-sm text-neutral-600">{number}</p>
        <p className="text-sm text-neutral-500">{location}</p>

        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
          {carrier}
          <CheckCircle2 className="h-3.5 w-3.5 fill-success text-success-foreground" />
        </div>
      </div>

      {/* Buttons */}
      {recording ? (
        <div className="flex justify-center pb-2">
          <button
            onClick={onStop}
            className="flex flex-col items-center gap-1.5"
            aria-label="Stop"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-danger text-danger-foreground shadow-lg transition hover:scale-105">
              <Square className="h-5 w-5 fill-current" />
            </span>
            <span className="text-[11px] font-medium text-neutral-600">Stop</span>
          </button>
        </div>
      ) : (
        <div className="flex justify-between px-4 pb-2">
          <button onClick={onDecline} className="flex flex-col items-center gap-1.5" aria-label="Decline">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-danger text-danger-foreground shadow-lg transition hover:scale-105">
              <PhoneOff className="h-5 w-5" />
            </span>
            <span className="text-[11px] font-medium text-neutral-600">Decline</span>
          </button>
          <button onClick={onAccept} className="flex flex-col items-center gap-1.5" aria-label="Accept">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-success text-success-foreground shadow-lg transition hover:scale-105">
              <Phone className="h-5 w-5" />
            </span>
            <span className="text-[11px] font-medium text-neutral-600">Accept</span>
          </button>
        </div>
      )}
    </div>
  );
}
