"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { EchoProfile } from "./echo-profile";
import { StaffSignalPanel } from "./staff-signal-panel";
import { FlipCard } from "./flip-card";

type StayEntry = { property: string; year: number; companion: string | null };
type DecisionRow = {
  opportunity: string;
  aiDecision: string;
  category: string;
  why: string;
  fresh?: boolean;
};
type Guest = {
  id: string;
  name: string;
  age: number;
  occupation: string;
  echoScore: number;
  arrivalStatus: string;
  stayHistory: StayEntry[];
  preferences: string[];
  lifeSignals: string[];
  emotionalContext: string;
  decisionTable: DecisionRow[];
  whisperBriefText: string;
  afterglowText?: string;
};

type Status = "pre-arrival" | "checked-in" | "checked-out";

const STATUSES: Status[] = ["pre-arrival", "checked-in", "checked-out"];

const STATUS_CONFIG: Record<
  Status,
  { label: string; short: string; bg: string; text: string; accent: string }
> = {
  "pre-arrival": {
    label: "Arriving Today",
    short: "Arriving",
    bg: "#EFE3C8",
    text: "#7A5C1E",
    accent: "#B8963E",
  },
  "checked-in": {
    label: "In Residence",
    short: "In Residence",
    bg: "#1C1917",
    text: "#B8963E",
    accent: "#B8963E",
  },
  "checked-out": {
    label: "Checked Out",
    short: "Checked Out",
    bg: "#E8E4DC",
    text: "#5a5450",
    accent: "#A8926D",
  },
};

const SECTION_DEFAULTS: Record<Status, Record<string, boolean>> = {
  "pre-arrival": {
    stayHistory: true,
    lifeSignals: true,
    whisperBrief: true,
    echoDecisions: true,
    afterglow: false,
    staffSignal: false,
  },
  "checked-in": {
    stayHistory: false,
    lifeSignals: false,
    whisperBrief: true,
    echoDecisions: true,
    afterglow: false,
    staffSignal: true,
  },
  "checked-out": {
    stayHistory: false,
    lifeSignals: false,
    whisperBrief: false,
    echoDecisions: false,
    afterglow: true,
    staffSignal: false,
  },
};

const CATEGORY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  "act-invisibly":  { label: "Act Invisibly",  color: "#6B7C6B", bg: "#6B7C6B18" },
  "offer-gently":   { label: "Offer Gently",   color: "#D97706", bg: "#D9770618" },
  "ask-permission": { label: "Ask Permission", color: "#4A6FA5", bg: "#4A6FA518" },
  "stay-silent":    { label: "Stay Silent",    color: "#9CA3AF", bg: "#9CA3AF18" },
};

function DecisionBadge({ category }: { category: string }) {
  const cfg = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG["stay-silent"];
  return (
    <span
      className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest font-medium whitespace-nowrap"
      style={{ color: cfg.color, backgroundColor: cfg.bg }}
    >
      {cfg.label}
    </span>
  );
}

function AudioPlayer({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play();
      setPlaying(true);
    }
  }

  return (
    <div className="mt-8">
      <audio ref={ref} src={src} onEnded={() => setPlaying(false)} />
      <button
        onClick={toggle}
        className="flex items-center gap-4 w-full bg-[#1C1917] px-6 py-5 hover:bg-[#2a2522] transition-colors group"
      >
        <span className="w-10 h-10 rounded-full border border-[#B8963E] flex items-center justify-center shrink-0">
          <span className="text-[#B8963E] text-sm leading-none">
            {playing ? "▐▐" : "▶"}
          </span>
        </span>
        <span className="flex flex-col items-start gap-0.5">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8a8680]">
            {playing ? "Now Playing" : "Play"}
          </span>
          <span className="text-sm text-[#FAF8F5] font-light">{label}</span>
        </span>
      </button>
    </div>
  );
}

function Collapsible({
  label,
  defaultOpen,
  rightSlot,
  children,
}: {
  label: string;
  defaultOpen: boolean;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 group pb-1"
      >
        <span className="flex items-center gap-3">
          <span
            className="inline-block w-3 text-[10px] leading-none text-[#8a8680] transition-transform"
            style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}
            aria-hidden
          >
            ▼
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8a8680] group-hover:text-[#1C1917] transition-colors">
            {label}
          </span>
        </span>
        {rightSlot && <span className="shrink-0">{rightSlot}</span>}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </section>
  );
}

function StatusPill({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className="inline-block px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] font-medium"
      style={{ backgroundColor: cfg.bg, color: cfg.text }}
    >
      {cfg.short}
    </span>
  );
}

export function WhisperBrief({ guest }: { guest: Guest }) {
  const whisperSrc = `/audio/${
    guest.id === "guest-001" ? "isabella-whisper" : "daniel-whisper"
  }.mp3`;

  const initialStatus: Status =
    guest.arrivalStatus === "checked-in" ? "checked-in" : "pre-arrival";
  const [status, setStatus] = useState<Status>(initialStatus);
  const [pendingStatus, setPendingStatus] = useState<Status | null>(null);
  const [decisions, setDecisions] = useState<DecisionRow[]>(guest.decisionTable);

  function addDecision(rec: { action: string; category: string; reasoning: string }) {
    setDecisions((prev) => [
      {
        opportunity: rec.action,
        aiDecision: rec.action,
        category: rec.category,
        why: rec.reasoning,
        fresh: true,
      },
      ...prev,
    ]);
  }

  const displayedStatus = pendingStatus ?? status;
  const cfg = STATUS_CONFIG[displayedStatus];
  const defaults = SECTION_DEFAULTS[status];

  const hasPanel = true;
  const panelOrder = status === "checked-in" ? 1 : 100;

  function changeStatus(next: Status) {
    if (next === status || pendingStatus !== null) return;
    setPendingStatus(next);
    setTimeout(() => {
      setStatus(next);
      setPendingStatus(null);
    }, 500);
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Top nav: back + status toggle */}
      <div className="px-8 pt-8 max-w-5xl">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.25em] text-[#8a8680] hover:text-[#B8963E] transition-colors"
          >
            ← Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8a8680] mr-1">
              Demo · Status
            </span>
            {STATUSES.map((s) => {
              const active = s === displayedStatus;
              const c = STATUS_CONFIG[s];
              return (
                <button
                  key={s}
                  onClick={() => changeStatus(s)}
                  disabled={pendingStatus !== null}
                  className="px-3 py-1.5 text-[9px] uppercase tracking-[0.22em] transition-all disabled:cursor-wait"
                  style={{
                    backgroundColor: active ? c.bg : "transparent",
                    color: active ? c.text : "#8a8680",
                    border: `1px solid ${active ? c.bg : "#e8e4dc"}`,
                  }}
                >
                  {c.short}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Guest header */}
      <header className="px-8 pt-8 pb-10 max-w-4xl">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <h1 className="font-serif text-[48px] font-light text-[#1C1917] leading-none">
              {guest.name}
            </h1>
            <div className="mt-3 flex items-center gap-3 flex-wrap">
              <p className="text-sm text-[#8a8680]">
                {guest.occupation} · {guest.age}
              </p>
              <span className="text-[#cfc8be]">·</span>
              <StatusPill status={displayedStatus} />
            </div>
            <p className="mt-6 font-serif text-base italic text-[#1C1917] leading-relaxed max-w-xl opacity-70">
              "{guest.emotionalContext}"
            </p>
          </div>
          <div className="pt-2">
            <EchoProfile score={guest.echoScore} />
          </div>
        </div>
        <div
          className="mt-10 h-px"
          style={{ backgroundColor: cfg.accent, opacity: 0.35 }}
        />
      </header>

      {pendingStatus !== null ? (
        <div className="px-8 pb-24 max-w-4xl flex items-center justify-center min-h-[500px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-[#B8963E] border-t-transparent animate-spin" />
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#8a8680]">
              Updating Echo · {STATUS_CONFIG[pendingStatus].short}
            </p>
          </div>
        </div>
      ) : (
      <main className="px-8 pb-24 max-w-4xl flex flex-col gap-10">
        {/* Staff Signal Panel — single instance, position via CSS order */}
        {hasPanel && (
          <div style={{ order: panelOrder }}>
            <StaffSignalPanel
              guest={guest}
              defaultOpen={defaults.staffSignal}
              decisions={decisions}
              onAddDecision={addDecision}
            />
          </div>
        )}

        {/* Stay History — only pre-arrival */}
        {status === "pre-arrival" && (
          <div style={{ order: 2 }}>
            <Collapsible label="Stay History" defaultOpen={defaults.stayHistory}>
              <div className="relative flex items-start gap-0 pt-2">
                {guest.stayHistory.map((stay, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center relative"
                  >
                    {i < guest.stayHistory.length - 1 && (
                      <div className="absolute top-[7px] left-1/2 w-full h-px bg-[#e8e4dc]" />
                    )}
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-[#B8963E] bg-[#FAF8F5] z-10 shrink-0" />
                    <p className="mt-3 text-xs text-[#1C1917] text-center leading-snug px-1">
                      {stay.property}
                    </p>
                    <p className="mt-1 text-[10px] text-[#8a8680] text-center">
                      {stay.year}
                    </p>
                    {stay.companion && (
                      <p className="mt-0.5 text-[10px] text-[#B8963E] text-center italic">
                        w/ {stay.companion}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Collapsible>
          </div>
        )}

        {/* Life Signals */}
        <div style={{ order: 3 }}>
          <Collapsible label="Life Signals" defaultOpen={defaults.lifeSignals}>
            <div className="flex flex-wrap gap-2">
              {guest.lifeSignals.map((signal, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-xs text-[#92400e] bg-[#FEF3C7] border border-[#FDE68A]"
                >
                  {signal}
                </span>
              ))}
            </div>
          </Collapsible>
        </div>

        {/* Whisper Brief — color scheme tied to status */}
        <div style={{ order: 4 }}>
          <Collapsible
            label="Whisper Brief"
            defaultOpen={defaults.whisperBrief}
            rightSlot={<StatusPill status={status} />}
          >
            <div
              className="border-l-2 pl-6 py-1 transition-colors"
              style={{ borderColor: cfg.accent }}
            >
              <p className="font-serif text-xl font-light text-[#1C1917] leading-relaxed italic">
                "{guest.whisperBriefText}"
              </p>
            </div>
            <AudioPlayer src={whisperSrc} label="Whisper Brief" />
          </Collapsible>
        </div>

        {/* Echo Decisions */}
        <div style={{ order: 5 }}>
          <Collapsible
            label="Echo Decisions"
            defaultOpen={defaults.echoDecisions}
          >
            <div className="border border-[#e8e4dc]">
              <div className="grid grid-cols-[2fr_1fr_2fr] bg-[#f5f1ea] px-6 py-3 border-b border-[#e8e4dc]">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#8a8680]">
                  Opportunity
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#8a8680]">
                  Decision
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#8a8680]">
                  Why
                </span>
              </div>
              {decisions.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[2fr_1fr_2fr] px-6 py-4 border-b border-[#e8e4dc] last:border-b-0 items-start gap-4"
                  style={
                    row.fresh
                      ? { backgroundColor: "#FFFDF8", borderLeft: "2px solid #B8963E" }
                      : undefined
                  }
                >
                  <div className="flex items-start gap-2 flex-wrap">
                    <p className="text-sm text-[#1C1917]">{row.opportunity}</p>
                    {row.fresh && (
                      <span className="px-2 py-0.5 text-[9px] uppercase tracking-widest font-medium bg-[#EFE3C8] text-[#7A5C1E] whitespace-nowrap">
                        + Just Added
                      </span>
                    )}
                  </div>
                  <DecisionBadge category={row.category} />
                  <p className="text-xs text-[#8a8680] leading-relaxed italic">
                    {row.why}
                  </p>
                </div>
              ))}
            </div>
          </Collapsible>
        </div>

        {/* Afterglow — only after checkout */}
        {status === "checked-out" && guest.afterglowText && (
          <div style={{ order: 6 }}>
            <Collapsible
              label="Afterglow · Post-Stay Memory"
              defaultOpen={defaults.afterglow}
            >
              {guest.id === "guest-001" ? (
                <FlipCard />
              ) : (
                <div className="border border-[#e8e4dc] bg-[#FFFDF8] p-8">
                  <p className="font-serif text-lg font-light text-[#1C1917] leading-relaxed italic">
                    "{guest.afterglowText}"
                  </p>
                </div>
              )}
            </Collapsible>
          </div>
        )}
      </main>
      )}
    </div>
  );
}
