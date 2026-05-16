"use client";

const properties = [
  {
    date: "MARCH 22",
    name: "Rosewood Hong Kong",
    detail: "Stay 1 \u00B7 3 nights",
    quote: "Where it began.",
    active: false,
    x: 400,
    y: 85,
  },
  {
    date: "SEPT 23",
    name: "Rosewood Miramar Beach",
    detail: "Stay 2 \u00B7 2 nights",
    quote: "Watched the Pacific.",
    active: false,
    x: 80,
    y: 120,
  },
  {
    date: "FEB 24",
    name: "Rosewood Calistoga",
    detail: "Stay 3 \u00B7 2 nights",
    quote: "The thermal pools.",
    active: false,
    x: 95,
    y: 100,
  },
  {
    date: "MAY 26",
    name: "Rosewood Sand Hill",
    detail: "Stay 4 \u00B7 Current",
    quote: "The ceramics. The creek.",
    active: true,
    x: 110,
    y: 110,
  },
];

function JourneyMap() {
  // Exact positions in 504x180 viewBox
  const miramar = { x: 75, y: 130 };
  const calistoga = { x: 90, y: 108 };
  const sandHill = { x: 105, y: 118 };
  const hongKong = { x: 420, y: 75 };

  return (
    <svg
      viewBox="0 0 504 180"
      className="w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Journey map showing 4 Rosewood properties visited"
    >
      {/* Cream background */}
      <rect width="504" height="180" fill="#F5EDD6" rx="2" />

      {/* Subtle latitude grid lines */}
      {[36, 72, 108, 144].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="504"
          y2={y}
          stroke="#E0D4B8"
          strokeWidth="0.5"
          strokeDasharray="2 6"
        />
      ))}
      {/* Subtle longitude grid lines */}
      {[84, 168, 252, 336, 420].map((x) => (
        <line
          key={x}
          x1={x}
          y1="0"
          x2={x}
          y2="180"
          stroke="#E0D4B8"
          strokeWidth="0.5"
          strokeDasharray="2 6"
        />
      ))}

      {/* Journey line — bezier arc across the ocean like a flight path */}
      {/* Hong Kong → Miramar Beach (first leg, arriving in California) */}
      <path
        d={`M ${hongKong.x} ${hongKong.y} C 330 20, 200 15, ${miramar.x} ${miramar.y}`}
        stroke="#B8963E"
        strokeWidth="1.5"
        strokeDasharray="5 3"
        opacity="0.7"
      />
      {/* Miramar Beach → Calistoga (short California hop) */}
      <path
        d={`M ${miramar.x} ${miramar.y} L ${calistoga.x} ${calistoga.y}`}
        stroke="#B8963E"
        strokeWidth="1.5"
        strokeDasharray="5 3"
        opacity="0.7"
      />
      {/* Calistoga → Sand Hill (short California hop) */}
      <path
        d={`M ${calistoga.x} ${calistoga.y} L ${sandHill.x} ${sandHill.y}`}
        stroke="#B8963E"
        strokeWidth="1.5"
        strokeDasharray="5 3"
        opacity="0.7"
      />

      {/* Hong Kong — completed, dark dot */}
      <circle cx={hongKong.x} cy={hongKong.y} r="5" fill="#1C1917" />
      <text
        x={hongKong.x}
        y={hongKong.y + 19}
        textAnchor="middle"
        fill="#5C5048"
        fontSize="8"
        fontFamily="var(--font-sans)"
      >
        Hong Kong
      </text>

      {/* Miramar Beach — completed, dark dot */}
      <circle cx={miramar.x} cy={miramar.y} r="5" fill="#1C1917" />
      <text
        x={miramar.x}
        y={miramar.y + 18}
        textAnchor="middle"
        fill="#7A5C1E"
        fontSize="8"
        fontFamily="var(--font-sans)"
      >
        Miramar
      </text>

      {/* Calistoga — completed, dark dot */}
      <circle cx={calistoga.x} cy={calistoga.y} r="5" fill="#1C1917" />
      <text
        x={calistoga.x}
        y={calistoga.y - 12}
        textAnchor="middle"
        fill="#7A5C1E"
        fontSize="8"
        fontFamily="var(--font-sans)"
      >
        Calistoga
      </text>

      {/* Sand Hill — current, gold with ring */}
      <circle cx={sandHill.x} cy={sandHill.y} r="11" stroke="#B8963E" strokeWidth="1" fill="none" />
      <circle cx={sandHill.x} cy={sandHill.y} r="7" fill="#B8963E" />
      <text
        x={sandHill.x}
        y={sandHill.y + 24}
        textAnchor="middle"
        fill="#B8963E"
        fontSize="8"
        fontFamily="var(--font-sans)"
        fontWeight="500"
      >
        Sand Hill
      </text>
      <text
        x={sandHill.x + 16}
        y={sandHill.y - 16}
        textAnchor="start"
        fill="#B8963E"
        fontSize="7"
        fontFamily="var(--font-sans)"
        fontStyle="italic"
      >
        You are here
      </text>
    </svg>
  );
}

export function FlipCardBack() {
  return (
    <div className="flex flex-col h-full bg-cream border border-border-warm">
      {/* Dark header bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-charcoal">
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-500">
            {"\u00C9cho \u00B7 Travel record"}
          </p>
          <h2 className="font-serif text-xl text-gold mt-0.5">
            Isabella Reyes
          </h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-neutral-400">Rosewood Collection</p>
          <p className="text-[10px] text-neutral-500 mt-0.5">{"4 properties \u00B7 2022\u20132026"}</p>
        </div>
      </div>

      {/* Map */}
      <div className="px-4 py-4 border-b border-border-warm">
        <JourneyMap />
      </div>

      {/* 2x2 Stamp grid */}
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

      {/* Footer stats */}
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
          {"\u00C9cho \u00B7 Passport"}
        </span>
      </div>

      {/* Tap hint */}
      <div className="py-2.5 text-center">
        <span className="text-[10px] text-muted">
          {"\u2190 Tap to go back"}
        </span>
      </div>
    </div>
  );
}
