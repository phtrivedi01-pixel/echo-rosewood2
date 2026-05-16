"use client";

const properties = [
  {
    date: "MARCH 22",
    name: "Rosewood Hong Kong",
    detail: "Stay 1 · 3 nights",
    quote: "Where it began.",
    active: false,
  },
  {
    date: "SEPT 23",
    name: "Rosewood Miramar Beach",
    detail: "Stay 2 · 2 nights",
    quote: "Watched the Pacific.",
    active: false,
  },
  {
    date: "FEB 24",
    name: "Rosewood Calistoga",
    detail: "Stay 3 · 2 nights",
    quote: "The thermal pools.",
    active: false,
  },
  {
    date: "MAY 26",
    name: "Rosewood Sand Hill",
    detail: "Stay 4 · Current",
    quote: "The ceramics. The creek.",
    active: true,
  },
];

function JourneyMap() {
  const miramar = { x: 60, y: 138 };
  const calistoga = { x: 115, y: 68 };
  const sandHill = { x: 170, y: 110 };
  const hongKong = { x: 430, y: 72 };

  return (
    <svg
      viewBox="0 0 504 180"
      className="w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Journey map showing 4 Rosewood properties visited"
    >
      <rect width="504" height="180" fill="#F5EDD6" rx="2" />

      {[36, 72, 108, 144].map((y) => (
        <line key={y} x1="0" y1={y} x2="504" y2={y} stroke="#E0D4B8" strokeWidth="0.5" strokeDasharray="2 6" />
      ))}
      {[84, 168, 252, 336, 420].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="180" stroke="#E0D4B8" strokeWidth="0.5" strokeDasharray="2 6" />
      ))}

      <path
        d={`M ${hongKong.x} ${hongKong.y} C 340 15, 180 10, ${miramar.x} ${miramar.y}`}
        stroke="#B8963E"
        strokeWidth="1.2"
        strokeDasharray="5 3"
        opacity="0.6"
      />
      <path
        d={`M ${miramar.x} ${miramar.y} Q ${(miramar.x + calistoga.x) / 2 - 15} ${(miramar.y + calistoga.y) / 2} ${calistoga.x} ${calistoga.y}`}
        stroke="#B8963E"
        strokeWidth="1.2"
        strokeDasharray="5 3"
        opacity="0.6"
      />
      <path
        d={`M ${calistoga.x} ${calistoga.y} Q ${(calistoga.x + sandHill.x) / 2 + 10} ${(calistoga.y + sandHill.y) / 2 - 10} ${sandHill.x} ${sandHill.y}`}
        stroke="#B8963E"
        strokeWidth="1.2"
        strokeDasharray="5 3"
        opacity="0.6"
      />

      <g transform={`translate(${hongKong.x}, ${hongKong.y})`}>
        <circle r="14" fill="#F5EDD6" stroke="#D4C9AD" strokeWidth="0.5" />
        <rect x="-8" y="-4" width="3" height="10" rx="0.5" fill="#1C1917" />
        <rect x="-4" y="-8" width="3" height="14" rx="0.5" fill="#1C1917" />
        <rect x="0" y="-2" width="3" height="8" rx="0.5" fill="#1C1917" />
        <rect x="4" y="-6" width="3" height="12" rx="0.5" fill="#1C1917" />
        <line x1="-10" y1="6" x2="9" y2="6" stroke="#1C1917" strokeWidth="0.8" />
      </g>
      <text x={hongKong.x} y={hongKong.y + 24} textAnchor="middle" fill="#5C5048" fontSize="8" fontFamily="var(--font-sans)">
        Hong Kong
      </text>

      <g transform={`translate(${miramar.x}, ${miramar.y})`}>
        <circle r="14" fill="#F5EDD6" stroke="#D4C9AD" strokeWidth="0.5" />
        <path d="M-7 -3 Q-4 -6 0 -3 Q4 0 7 -3" stroke="#1C1917" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M-7 1 Q-4 -2 0 1 Q4 4 7 1" stroke="#1C1917" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M-7 5 Q-4 2 0 5 Q4 8 7 5" stroke="#1C1917" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>
      <text x={miramar.x} y={miramar.y + 24} textAnchor="middle" fill="#7A5C1E" fontSize="8" fontFamily="var(--font-sans)">
        Miramar
      </text>

      <g transform={`translate(${calistoga.x}, ${calistoga.y})`}>
        <circle r="14" fill="#F5EDD6" stroke="#D4C9AD" strokeWidth="0.5" />
        <path d="M-7 3 Q-7 7 0 7 Q7 7 7 3" stroke="#1C1917" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <line x1="-7" y1="3" x2="7" y2="3" stroke="#1C1917" strokeWidth="0.8" />
        <path d="M-3 0 Q-4 -3 -3 -6" stroke="#1C1917" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M1 -1 Q0 -4 1 -7" stroke="#1C1917" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M5 0 Q4 -3 5 -6" stroke="#1C1917" strokeWidth="1" fill="none" strokeLinecap="round" />
      </g>
      <text x={calistoga.x} y={calistoga.y - 22} textAnchor="middle" fill="#7A5C1E" fontSize="8" fontFamily="var(--font-sans)">
        Calistoga
      </text>

      <g transform={`translate(${sandHill.x}, ${sandHill.y})`}>
        <circle r="18" fill="#B8963E" opacity="0.08" />
        <circle r="14" fill="#FFFBF0" stroke="#B8963E" strokeWidth="1" />
        <line x1="0" y1="2" x2="0" y2="7" stroke="#B8963E" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M0 -8 L-6 2 L-3 1 L-4 4 L4 4 L3 1 L6 2 Z" fill="#B8963E" />
      </g>
      <text x={sandHill.x} y={sandHill.y + 26} textAnchor="middle" fill="#B8963E" fontSize="8" fontFamily="var(--font-sans)" fontWeight="500">
        Sand Hill
      </text>
      <text x={sandHill.x + 20} y={sandHill.y - 18} textAnchor="start" fill="#B8963E" fontSize="7" fontFamily="var(--font-sans)" fontStyle="italic">
        You are here
      </text>
    </svg>
  );
}

export function FlipCardBack() {
  return (
    <div className="flex flex-col h-full bg-cream border border-border-warm">
      <div className="flex items-center justify-between px-6 py-4 bg-charcoal">
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-500">
            Écho · Travel record
          </p>
          <h2 className="font-serif text-xl text-gold mt-0.5">Isabella Reyes</h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-neutral-400">Rosewood Collection</p>
          <p className="text-[10px] text-neutral-500 mt-0.5">4 properties · 2022–2026</p>
        </div>
      </div>

      <div className="px-4 py-4 border-b border-border-warm">
        <JourneyMap />
      </div>

      <div className="grid grid-cols-2 gap-px bg-border-warm flex-1">
        {properties.map((p) => (
          <div
            key={p.name}
            className={
              p.active
                ? "flex flex-col justify-center px-4 py-4 bg-charcoal"
                : "flex flex-col justify-center px-4 py-4 bg-cream"
            }
          >
            <span
              className={
                p.active
                  ? "text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-medium"
                  : "text-[9px] uppercase tracking-[0.2em] text-muted font-medium"
              }
            >
              {p.date}
            </span>
            <span
              className={
                p.active
                  ? "text-[12px] font-medium text-cream mt-1"
                  : "text-[12px] font-medium text-charcoal mt-1"
              }
            >
              {p.name}
            </span>
            <span
              className={
                p.active
                  ? "text-[10px] text-neutral-500 mt-0.5"
                  : "text-[10px] text-muted mt-0.5"
              }
            >
              {p.detail}
            </span>
            <span
              className={
                p.active
                  ? "font-serif italic text-[11px] text-gold mt-1.5"
                  : "font-serif italic text-[11px] text-charcoal/60 mt-1.5"
              }
            >
              {p.quote}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-6 py-3 border-t border-border-warm">
        <div className="flex items-center gap-4">
          {[
            { value: "4", label: "Properties" },
            { value: "3", label: "Countries" },
            { value: "9", label: "Nights" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-1">
              <span className="font-serif text-base text-gold">{stat.value}</span>
              <span className="text-[9px] uppercase tracking-wider text-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-medium">
          Écho · Passport
        </span>
      </div>

      <div className="py-2.5 text-center">
        <span className="text-[10px] text-muted">← Tap to go back</span>
      </div>
    </div>
  );
}
