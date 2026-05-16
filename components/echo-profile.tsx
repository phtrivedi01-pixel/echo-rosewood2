export function echoTier(score: number): string {
  if (score >= 85) return "Deeply Known";
  if (score >= 60) return "Familiar";
  if (score >= 30) return "Forming";
  return "Newly Met";
}

export function EchoProfile({ score }: { score: number }) {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <p className="font-serif text-2xl font-light text-[#1C1917] leading-none whitespace-nowrap">
        {echoTier(score)}
      </p>
      <div className="w-10 h-px bg-[#B8963E] opacity-60" />
      <p className="text-[10px] uppercase tracking-widest text-[#8a8680]">
        Echo Profile
      </p>
    </div>
  );
}
