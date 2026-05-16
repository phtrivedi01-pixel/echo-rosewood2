"use client";

import { useRef, useState } from "react";

function TeaCupIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 14h18v10a6 6 0 01-6 6h-6a6 6 0 01-6-6V14z" stroke="#B8963E" strokeWidth="1.2" fill="none" />
      <path d="M24 17h2a4 4 0 010 8h-2" stroke="#B8963E" strokeWidth="1.2" fill="none" />
      <path d="M12 10c0-2 1-3 1-4" stroke="#B8963E" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M15 9c0-2 1-3 1-4" stroke="#B8963E" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M18 10c0-2 1-3 1-4" stroke="#B8963E" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function TrailIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6v20" stroke="#B8963E" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M18 12c-4-1-7 2-7 5s4 4 7 3" stroke="#B8963E" strokeWidth="1.2" fill="none" />
      <path d="M18 8c3-1 6 1 6 4s-3 4-6 3" stroke="#B8963E" strokeWidth="1.2" fill="none" />
      <path d="M18 18c-3-1-5 1-5 3s3 3 5 2" stroke="#B8963E" strokeWidth="1.2" fill="none" />
      <ellipse cx="18" cy="30" rx="5" ry="2" stroke="#B8963E" strokeWidth="1" fill="none" opacity="0.4" />
    </svg>
  );
}

function PotteryIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 28h12" stroke="#B8963E" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M13 28c-1-3-2-6-1-10 1-3 3-5 6-5s5 2 6 5c1 4 0 7-1 10" stroke="#B8963E" strokeWidth="1.2" fill="none" />
      <path d="M14 16c2-1 6-1 8 0" stroke="#B8963E" strokeWidth="0.8" opacity="0.5" />
      <path d="M13.5 20c2.5 1 6.5 1 9 0" stroke="#B8963E" strokeWidth="0.8" opacity="0.5" />
      <ellipse cx="18" cy="8" rx="2" ry="1" stroke="#B8963E" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M18 9v4" stroke="#B8963E" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

const moments = [
  { icon: <TeaCupIcon />, label: "Jasmine tea", subtitle: "Both mornings" },
  { icon: <TrailIcon />, label: "Creek trail", subtitle: "Visited twice" },
  { icon: <PotteryIcon />, label: "Ceramics studio", subtitle: "Four hours, Saturday" },
];

export function FlipCardFront() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function togglePlay(e: React.MouseEvent) {
    e.stopPropagation();
    const el = audioRef.current;
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
    <div className="flex flex-col h-full bg-cream border border-border-warm">
      <audio
        ref={audioRef}
        src="/audio/isabella-afterglow.mp3"
        onEnded={() => setPlaying(false)}
      />

      <div className="flex items-center justify-between px-6 py-4 bg-charcoal">
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-500">
            A memory from
          </p>
          <h2 className="font-serif text-xl text-gold mt-0.5">
            Rosewood Sand Hill
          </h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-neutral-400">Menlo Park, California</p>
          <p className="text-[10px] text-neutral-500 mt-0.5">May 14–16, 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-px bg-border-warm">
        {moments.map((m) => (
          <div
            key={m.label}
            className="flex flex-col items-center gap-2 py-5 px-3 bg-cream"
          >
            {m.icon}
            <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-medium">
              {m.label}
            </span>
            <span className="text-[10px] text-muted">{m.subtitle}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 px-6 py-5 border-t border-border-warm">
        <p className="font-serif italic text-[15px] leading-relaxed text-charcoal">
          Dear Isabella.
        </p>
        <p className="font-serif italic text-[13px] leading-relaxed text-charcoal/80 mt-3">
          You didn&apos;t ask for anything memorable. You asked for a window, a walk,
          and a cup of tea each morning. But a stay like yours is the kind we
          remember most. The creek trail. The ceramics studio on a quiet Saturday.
          The jasmine tea we left before you woke.
        </p>
        <p className="font-serif italic text-[13px] leading-relaxed text-charcoal/80 mt-3">
          Until next time.
          <br />
          Rosewood Sand Hill.
        </p>
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-t border-border-warm">
        <p className="font-serif italic text-sm text-gold">Until next time</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause memory" : "Play your memory"}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-charcoal text-cream hover:bg-charcoal/90 transition-colors"
          >
            {playing ? (
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                <rect x="0" y="0" width="3" height="12" />
                <rect x="7" y="0" width="3" height="12" />
              </svg>
            ) : (
              <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
                <path d="M0 0v14l12-7z" />
              </svg>
            )}
          </button>
          <span className="text-[10px] text-muted">
            {playing ? "Now playing" : "Play your memory"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-2.5 bg-gold/10 border-t border-border-warm">
        <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-medium">
          Écho · Stay Memory
        </span>
        <span className="text-[9px] text-gold/70">
          Generated for Isabella Reyes · Stay 4
        </span>
      </div>

      <div className="py-2.5 text-center">
        <span className="text-[10px] text-muted">
          Tap to see your Rosewood journey →
        </span>
      </div>
    </div>
  );
}
