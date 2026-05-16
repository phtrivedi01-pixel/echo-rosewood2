import { cn } from "@/lib/utils";
import { EchoScore } from "./echo-score";

interface GuestCardProps {
  name: string;
  profession: string;
  stayNumber: number;
  echoScore: number;
  monogram: string;
  status: "arriving" | "active";
  note?: string;
}

export function GuestCard({
  name,
  profession,
  stayNumber,
  echoScore,
  monogram,
  status,
  note,
}: GuestCardProps) {
  const isArriving = status === "arriving";
  const scoreVariant = echoScore >= 70 ? "gold" : "amber";

  return (
    <article className="flex flex-col bg-card p-8 border border-border min-h-[320px]">
      {/* Header row: monogram + status badge */}
      <div className="flex items-start justify-between mb-6">
        {/* Monogram */}
        <div
          className={cn(
            "flex items-center justify-center w-14 h-14 rounded-full text-sm font-medium tracking-wide",
            isArriving
              ? "bg-gold/10 text-gold border border-gold/30"
              : "bg-muted/10 text-muted border border-muted/30"
          )}
        >
          {monogram}
        </div>

        {/* Status badge */}
        <span
          className={cn(
            "px-3 py-1 text-xs uppercase tracking-widest font-medium",
            isArriving
              ? "bg-gold/10 text-gold"
              : "bg-muted/10 text-muted"
          )}
        >
          {isArriving ? "Arriving Today" : "Active Guest"}
        </span>
      </div>

      {/* Guest info row */}
      <div className="flex items-center justify-between flex-1">
        <div className="flex flex-col gap-1">
          <h2 className="font-serif text-2xl font-light text-foreground">
            {name}
          </h2>
          <p className="text-sm text-muted">{profession}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Stay {stayNumber}
          </p>
        </div>

        {/* Echo Score */}
        <div className="flex flex-col items-center gap-1">
          <EchoScore score={echoScore} variant={scoreVariant} />
          <span className="text-[10px] uppercase tracking-widest text-muted">
            Echo Score
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-border">
        {note && (
          <p className="text-sm italic text-muted mb-3">{note}</p>
        )}
        <a
          href="#"
          className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold-light transition-colors"
        >
          View Whisper Brief
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
