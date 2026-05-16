"use client";

import { useEffect, useState } from "react";

type DecisionRow = {
  opportunity: string;
  aiDecision: string;
  category: string;
  why: string;
};

type Guest = {
  id: string;
  name: string;
  decisionTable: DecisionRow[];
};

type SignalKind = "landed" | "missed" | "observation";

type LogEntry = {
  id: number;
  kind: SignalKind;
  text: string;
  time: string;
  interaction?: string;
  interactionOutcome?: "yes" | "no";
  tags: string[];
};

const TAGS = ["Dining", "Spa", "Family", "Room", "Activity", "Emotional"];

const DOT_COLOR: Record<SignalKind, string> = {
  landed: "#16A34A",
  missed: "#D97706",
  observation: "#4A6FA5",
};

const KIND_LABEL: Record<SignalKind, string> = {
  landed: "Moment landed",
  missed: "Moment missed",
  observation: "New observation",
};

const REC_CATEGORY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  "act-invisibly":  { label: "Act Invisibly",  color: "#6B7C6B", bg: "#6B7C6B18" },
  "offer-gently":   { label: "Offer Gently",   color: "#D97706", bg: "#D9770618" },
  "ask-permission": { label: "Ask Permission", color: "#4A6FA5", bg: "#4A6FA518" },
  "stay-silent":    { label: "Stay Silent",    color: "#9CA3AF", bg: "#9CA3AF18" },
};

type Recommendation = {
  action: string;
  category: string;
  reasoning: string;
};

function RecBadge({ category }: { category: string }) {
  const cfg = REC_CATEGORY_CONFIG[category] ?? REC_CATEGORY_CONFIG["stay-silent"];
  return (
    <span
      className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest font-medium whitespace-nowrap shrink-0"
      style={{ color: cfg.color, backgroundColor: cfg.bg }}
    >
      {cfg.label}
    </span>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function EyeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function StaffSignalPanel({
  guest,
  defaultOpen = false,
  decisions,
  onAddDecision,
}: {
  guest: Guest;
  defaultOpen?: boolean;
  decisions: DecisionRow[];
  onAddDecision?: (rec: Recommendation) => void;
}) {
  const [open, setOpen] = useState(defaultOpen);
  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);
  const [kind, setKind] = useState<SignalKind | null>(null);
  const [interaction, setInteraction] = useState<
    { opportunity: string; outcome: "yes" | "no" } | null
  >(null);
  const [text, setText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [rec, setRec] = useState<Recommendation | null>(null);
  const [recLoading, setRecLoading] = useState(false);
  const [recError, setRecError] = useState<string | null>(null);

  const showInteractions = kind === "landed" || kind === "missed";
  const canSubmit =
    kind !== null && (text.trim().length > 0 || interaction !== null);

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function resetForm() {
    setKind(null);
    setInteraction(null);
    setText("");
    setSelectedTags([]);
  }

  function selectKind(k: SignalKind) {
    setKind(k);
    if (k === "observation") setInteraction(null);
  }

  async function fetchRecommendation(payload: {
    observation: string;
    kind: SignalKind;
    tags: string[];
    interaction: { opportunity: string; outcome: "yes" | "no" } | null;
  }) {
    setRecLoading(true);
    setRecError(null);
    setRec(null);
    try {
      const res = await fetch("/api/recommend-next", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest,
          observation: payload.observation,
          tags: payload.tags,
          signalKind: payload.kind,
          interaction: payload.interaction,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setRecError(data?.error ?? "Couldn't fetch recommendation.");
      } else {
        setRec(data.recommendation);
        onAddDecision?.(data.recommendation);
      }
    } catch {
      setRecError("Network error. Try again.");
    } finally {
      setRecLoading(false);
    }
  }

  function handleSubmit() {
    if (!kind) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    const submittedKind = kind;
    const submittedText = text.trim();
    const submittedInteraction = interaction;
    const submittedTags = selectedTags;

    const entry: LogEntry = {
      id: Date.now(),
      kind: submittedKind,
      text: submittedText,
      time,
      interaction: submittedInteraction?.opportunity,
      interactionOutcome: submittedInteraction?.outcome,
      tags: submittedTags,
    };
    setLog((prev) => [entry, ...prev]);
    resetForm();

    fetchRecommendation({
      observation: submittedText,
      kind: submittedKind,
      tags: submittedTags,
      interaction: submittedInteraction,
    });
  }

  if (!open) {
    return (
      <section className="pt-2">
        <button
          onClick={() => setOpen(true)}
          className="text-[11px] uppercase tracking-[0.28em] text-[#B8963E] hover:text-[#C9A84F] transition-colors"
        >
          + Log a Signal
        </button>
      </section>
    );
  }

  const cards: { key: SignalKind; title: string; sub: string; icon: React.ReactElement; iconColor: string }[] = [
    { key: "landed", title: "Moment landed", sub: "A suggestion worked", icon: <CheckIcon className="w-5 h-5" />, iconColor: "#16A34A" },
    { key: "missed", title: "Moment missed", sub: "Refine for next time", icon: <XIcon className="w-5 h-5" />, iconColor: "#B91C1C" },
    { key: "observation", title: "New observation", sub: "Something worth remembering", icon: <EyeIcon className="w-5 h-5" />, iconColor: "#4A6FA5" },
  ];

  return (
    <section
      className="border bg-[#FAF8F5] p-8 space-y-8"
      style={{ borderColor: "#E8D9B0" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#5a5450]">
          Staff Signal · {guest.name.split(" ")[0]}
        </p>
        <button
          onClick={() => {
            setOpen(false);
            resetForm();
          }}
          className="text-[10px] uppercase tracking-[0.25em] text-[#5a5450] hover:text-[#1C1917] transition-colors"
        >
          Close
        </button>
      </div>

      {/* Section 1 — Signal type */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#5a5450] mb-3">
          Signal type
        </p>
        <div className="grid grid-cols-3 gap-3">
          {cards.map((card) => {
            const selected = kind === card.key;
            return (
              <button
                key={card.key}
                onClick={() => selectKind(card.key)}
                className="flex flex-col items-start gap-3 p-4 bg-white text-left transition-all"
                style={{
                  border: selected ? "1.5px solid #B8963E" : "1px solid #e8e4dc",
                }}
              >
                <span
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ color: card.iconColor }}
                >
                  {card.icon}
                </span>
                <span className="block">
                  <p className="text-sm text-[#1C1917]">{card.title}</p>
                  <p className="text-xs text-[#5a5450] mt-0.5">{card.sub}</p>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2 — Interactions */}
      {showInteractions && (
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#5a5450] mb-3">
            Which interaction?
          </p>
          <div className="space-y-1.5">
            {decisions.map((row, i) => {
              const isSelected = interaction?.opportunity === row.opportunity;
              const accent = kind === "landed" ? "#16A34A" : "#B91C1C";
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() =>
                    setInteraction({
                      opportunity: row.opportunity,
                      outcome: kind === "landed" ? "yes" : "no",
                    })
                  }
                  className="w-full text-left px-4 py-3 transition-colors"
                  style={{
                    border: "1px solid",
                    borderColor: isSelected ? accent : "#e8e4dc",
                    backgroundColor: isSelected ? `${accent}10` : "#ffffff",
                  }}
                >
                  <p className="text-sm text-[#1C1917] leading-snug">
                    {row.opportunity}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Section 3 — Observation */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#5a5450] mb-3">
          Observation
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="e.g. She mentioned her daughter loves ceramics — or — She asked about the chef by name"
          className="w-full bg-white border border-[#e8e4dc] px-4 py-3 text-sm text-[#1C1917] placeholder:text-[#9a9590] font-sans focus:outline-none focus:border-[#B8963E] resize-none transition-colors"
        />
        <div className="flex flex-wrap gap-2 mt-3">
          {TAGS.map((tag) => {
            const selected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="px-3 py-1.5 text-xs transition-colors"
                style={{
                  backgroundColor: selected ? "#EFE3C8" : "transparent",
                  color: selected ? "#7A5C1E" : "#5a5450",
                  border: `1px solid ${selected ? "#EFE3C8" : "#e8e4dc"}`,
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full bg-[#1C1917] py-4 text-sm uppercase tracking-[0.25em] text-[#B8963E] hover:bg-[#2a2522] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Add to her Écho
      </button>

      {/* Écho Recommends */}
      {(rec || recLoading || recError) && (
        <div
          className="border-l-2 pl-6 py-4 bg-[#FFFDF8]"
          style={{ borderColor: "#B8963E" }}
        >
          <div className="flex items-center justify-between mb-3">
            <p
              className="text-[10px] uppercase tracking-[0.28em] font-medium"
              style={{ color: "#B8963E" }}
            >
              Écho Recommends
            </p>
            {!recLoading && (
              <button
                onClick={() => {
                  setRec(null);
                  setRecError(null);
                }}
                className="text-[10px] uppercase tracking-[0.22em] text-[#8a8680] hover:text-[#1C1917] transition-colors"
              >
                Dismiss
              </button>
            )}
          </div>
          {recLoading && (
            <div className="flex items-center gap-3 py-1">
              <div className="w-3 h-3 rounded-full border border-[#B8963E] border-t-transparent animate-spin" />
              <p className="text-sm text-[#8a8680] italic">
                Considering what to suggest…
              </p>
            </div>
          )}
          {recError && !recLoading && (
            <p className="text-sm text-[#B91C1C]">{recError}</p>
          )}
          {rec && !recLoading && (
            <>
              <p className="font-serif text-lg font-light text-[#1C1917] mb-3 leading-snug">
                {rec.action}
              </p>
              <div className="flex items-start gap-3">
                <RecBadge category={rec.category} />
                <p className="text-xs text-[#5a5450] italic flex-1 leading-relaxed">
                  {rec.reasoning}
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Log */}
      {log.length > 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#5a5450] mb-3">
            Signal Log · This Session
          </p>
          <div className="space-y-2">
            {log.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-3 px-4 py-3 bg-white border border-[#e8e4dc]"
              >
                <span
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: DOT_COLOR[entry.kind] }}
                  aria-label={KIND_LABEL[entry.kind]}
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#5a5450]">
                    {KIND_LABEL[entry.kind]}
                  </p>
                  {entry.interaction && (
                    <p className="text-xs text-[#5a5450] italic">
                      {entry.interaction} ·{" "}
                      <span
                        style={{
                          color:
                            entry.interactionOutcome === "yes"
                              ? "#16A34A"
                              : "#B91C1C",
                        }}
                      >
                        {entry.interactionOutcome === "yes"
                          ? "worked"
                          : "missed"}
                      </span>
                    </p>
                  )}
                  {entry.text && (
                    <p className="text-sm text-[#1C1917] leading-snug">
                      {entry.text}
                    </p>
                  )}
                  {entry.tags.length > 0 && (
                    <p className="text-[10px] text-[#7A5C1E]">
                      {entry.tags.map((t) => `#${t}`).join("  ")}
                    </p>
                  )}
                </div>
                <span className="text-[10px] text-[#9a9590] shrink-0 tabular-nums">
                  {entry.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
