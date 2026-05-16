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
  const stops = properties.map((p) => ({ x: p.x, y: p.y }));

  const pathD = stops
    .map((s, i) => `${i === 0 ? "M" : "L"} ${s.x} ${s.y}`)
    .join(" ");

  return (
    <svg
      viewBox="0 0 504 180"
      className="w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Journey map showing 4 Rosewood properties visited"
    >
      {/* Simplified world continents outline */}
      {/* North America */}
      <path
        d="M40 35 Q55 20 90 25 Q110 28 115 40 Q120 55 105 70 Q95 80 80 90 Q70 95 55 85 Q40 75 35 60 Q30 45 40 35Z"
        fill="none"
        stroke="#E8D9B0"
        strokeWidth="0.8"
        opacity="0.5"
      />
      {/* South America */}
      <path
        d="M95 100 Q100 95 110 100 Q115 110 118 130 Q115 150 105 160 Q95 165 90 155 Q85 140 88 120 Q90 110 95 100Z"
        fill="none"
        stroke="#E8D9B0"
        strokeWidth="0.8"
        opacity="0.5"
      />
      {/* Europe */}
      <path
        d="M220 30 Q235 22 255 25 Q270 28 275 38 Q278 48 268 52 Q258 55 245 50 Q235 48 225 42 Q218 38 220 30Z"
        fill="none"
        stroke="#E8D9B0"
        strokeWidth="0.8"
        opacity="0.5"
      />
      {/* Africa */}
      <path
        d="M235 60 Q250 55 265 62 Q275 70 278 90 Q275 115 265 130 Q255 140 245 135 Q235 125 232 105 Q230 85 232 70 Q233 65 235 60Z"
        fill="none"
        stroke="#E8D9B0"
        strokeWidth="0.8"
        opacity="0.5"
      />
      {/* Asia */}
      <path
        d="M290 25 Q320 18 360 22 Q400 28 430 35 Q450 42 440 55 Q425 65 400 60 Q380 58 360 55 Q340 52 320 48 Q300 44 290 38 Q285 32 290 25Z"
        fill="none"
        stroke="#E8D9B0"
        strokeWidth="0.8"
        opacity="0.5"
      />
      {/* Southeast Asia & Oceania */}
      <path
        d="M380 70 Q400 65 420 72 Q435 78 430 88 Q420 95 400 90 Q385 85 380 78 Q378 74 380 70Z"
        fill="none"
        stroke="#E8D9B0"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <path
        d="M390 120 Q410 112 435 118 Q450 125 445 140 Q435 150 415 148 Q395 145 390 135 Q387 128 390 120Z"
        fill="none"
        stroke="#E8D9B0"
        strokeWidth="0.8"
        opacity="0.5"
      />

      {/* Journey line */}
      <path
        d={pathD}
        stroke="#B8963E"
        strokeWidth="1.2"
        strokeDasharray="4 3"
        opacity="0.7"
      />

      {/* Stops */}
      {properties.map((p, i) => {
        const cx = stops[i].x;
        const cy = stops[i].y;
        const labelName = p.name.replace("Rosewood ", "");

        // Offset labels for the tightly-clustered California properties
        let labelX = cx;
        let labelY = cy + 14;
        let labelAnchor: "middle" | "start" | "end" = "middle";

        if (p.name === "Rosewood Miramar Beach") {
          labelX = cx - 6;
          labelY = cy + 14;
          labelAnchor = "end";
        } else if (p.name === "Rosewood Calistoga") {
          labelX = cx - 6;
          labelY = cy - 8;
          labelAnchor = "end";
        } else if (p.name === "Rosewood Sand Hill") {
          labelX = cx + 6;
          labelY = cy + 4;
          labelAnchor = "start";
        } else if (p.name === "Rosewood Hong Kong") {
          labelY = cy + 14;
        }

        return (
          <g key={p.name}>
            {p.active ? (
              <>
                <circle cx={cx} cy={cy} r="8" fill="#B8963E" opacity="0.15" />
                <circle cx={cx} cy={cy} r="5" fill="#B8963E" opacity="0.3" />
                <circle cx={cx} cy={cy} r="3" fill="#B8963E" />
              </>
            ) : (
              <circle cx={cx} cy={cy} r="3" fill="#1C1917" />
            )}
            <text
              x={labelX}
              y={labelY}
              textAnchor={labelAnchor}
              className="text-[7px] fill-muted"
              fontFamily="var(--font-sans)"
            >
              {labelName}
            </text>
            {p.active && (
              <text
                x={cx + 6}
                y={cy - 8}
                textAnchor="start"
                className="text-[7px] fill-gold"
                fontFamily="var(--font-sans)"
              >
                You are here
              </text>
            )}
          </g>
        );
      })}
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
