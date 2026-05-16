"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { EchoScore } from "./echo-score";

type StayEntry = { property: string; year: number; companion: string | null };
type DecisionRow = {
  opportunity: string;
  aiDecision: string;
  category: string;
  why: string;
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

function AudioPlayer({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (playing) { el.pause(); setPlaying(false); }
    else { el.play(); setPlaying(true); }
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
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#5a5450]">
            {playing ? "Now Playing" : "Play"}
          </span>
          <span className="text-sm text-[#FAF8F5] font-light">{label}</span>
        </span>
      </button>
    </div>
  );
}

export function WhisperBrief({ guest }: { guest: Guest }) {
  const isHighScore = guest.echoScore >= 70;
  const whisperSrc = `/audio/${guest.id === "guest-001" ? "isabella-whisper" : "daniel-whisper"}.mp3`;

  return (
    <div className="min-h-screen bg-[#FAF8F5]">

      {/* Back nav */}
      <div className="px-8 pt-8">
        <Link
          href="/"
          className="text-[10px] uppercase tracking-[0.25em] text-[#5a5450] hover:text-[#B8963E] transition-colors"
        >
          ← Dashboard
        </Link>
      </div>

      {/* Guest header */}
      <header className="px-8 pt-8 pb-10 max-w-4xl">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <h1 className="font-serif text-[48px] font-light text-[#1C1917] leading-none">
              {guest.name}
            </h1>
            <p className="mt-3 text-sm text-[#5a5450]">
              {guest.occupation} · {guest.age}
            </p>
            <p className="mt-6 font-serif text-base italic text-[#1C1917] leading-relaxed max-w-xl opacity-70">
              "{guest.emotionalContext}"
            </p>
          </div>
          <div className="flex flex-col items-center gap-1 shrink-0 pt-2">
            <EchoScore score={guest.echoScore} variant={isHighScore ? "gold" : "amber"} />
            <span className="text-[10px] uppercase tracking-widest text-[#5a5450]">Echo Score</span>
          </div>
        </div>
        <div className="mt-10 h-px bg-[#B8963E] opacity-30" />
      </header>

      <main className="px-8 pb-24 max-w-4xl space-y-14">

        {/* Stay History */}
        <section>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#5a5450] mb-6">
            Stay History
          </p>
          <div className="relative flex items-start gap-0">
            {guest.stayHistory.map((stay, i) => (
              <div key={i} className="flex-1 flex flex-col items-center relative">
                {/* Connector line */}
                {i < guest.stayHistory.length - 1 && (
                  <div className="absolute top-[7px] left-1/2 w-full h-px bg-[#e8e4dc]" />
                )}
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#B8963E] bg-[#FAF8F5] z-10 shrink-0" />
                <p className="mt-3 text-xs text-[#1C1917] text-center leading-snug px-1">
                  {stay.property}
                </p>
                <p className="mt-1 text-[10px] text-[#5a5450] text-center">{stay.year}</p>
                {stay.companion && (
                  <p className="mt-0.5 text-[10px] text-[#B8963E] text-center italic">
                    w/ {stay.companion}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Life Signals */}
        <section>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#5a5450] mb-4">
            Life Signals
          </p>
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
        </section>

        {/* Whisper Brief */}
        <section>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#5a5450] mb-4">
            Whisper Brief
          </p>
          <div className="border-l-2 border-[#B8963E] pl-6 py-1">
            <p className="font-serif text-xl font-light text-[#1C1917] leading-relaxed italic">
              "{guest.whisperBriefText}"
            </p>
          </div>
          <AudioPlayer src={whisperSrc} label="Whisper Brief" />
        </section>

        {/* Decision Table */}
        <section>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#5a5450] mb-4">
            Echo Decisions
          </p>
          <div className="border border-[#e8e4dc]">
            {/* Table header */}
            <div className="grid grid-cols-[2fr_1fr_2fr] bg-[#f5f1ea] px-6 py-3 border-b border-[#e8e4dc]">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#5a5450]">Opportunity</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#5a5450]">Decision</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#5a5450]">Why</span>
            </div>
            {/* Rows */}
            {guest.decisionTable.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[2fr_1fr_2fr] px-6 py-4 border-b border-[#e8e4dc] last:border-b-0 items-start gap-4"
              >
                <p className="text-sm text-[#1C1917]">{row.opportunity}</p>
                <DecisionBadge category={row.category} />
                <p className="text-xs text-[#5a5450] leading-relaxed italic">{row.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Afterglow — Isabella only */}
        {guest.afterglowText && (
          <section className="border border-[#e8e4dc] bg-[#FFFDF8] p-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#5a5450] mb-4">
              Afterglow · Post-Stay Memory
            </p>
            <p className="font-serif text-lg font-light text-[#1C1917] leading-relaxed italic">
              "{guest.afterglowText}"
            </p>
            <AudioPlayer src="/audio/isabella-afterglow.mp3" label="Afterglow Message" />
          </section>
        )}

      </main>
    </div>
  );
}
