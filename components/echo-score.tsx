import { cn } from "@/lib/utils";

interface EchoScoreProps {
  score: number;
  variant?: "gold" | "amber";
}

export function EchoScore({ score, variant = "gold" }: EchoScoreProps) {
  const ringColor = variant === "gold" ? "stroke-gold" : "stroke-amber";

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      {/* Circular ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="1"
          className="stroke-border"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="1.5"
          strokeDasharray={`${(score / 100) * 283} 283`}
          className={cn(ringColor)}
        />
      </svg>
      {/* Score number */}
      <span className="font-serif text-5xl font-light text-foreground">
        {score}
      </span>
    </div>
  );
}
