import Link from "next/link";
import guests from "@/data/guests.json";
import { EchoProfile } from "@/components/echo-profile";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  "arriving-today": "Arriving Today",
  "checked-in": "Active Guest",
};

const statusStyle: Record<string, string> = {
  "arriving-today": "bg-[#EFE3C8] text-[#7A5C1E]",
  "checked-in": "bg-[#F0EDEA] text-[#6a6660]",
};

export default async function Home() {
  await new Promise((r) => setTimeout(r, 500));
  const [isabella, daniel] = guests;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">

      {/* Header */}
      <header className="px-8 pt-16 pb-10 text-center">
        <h1 className="font-serif text-[56px] font-light tracking-[0.06em] text-[#1C1917]">
          Écho
        </h1>
        <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-[#8a8680]">
          Rosewood Sand Hill — May 16, 2026
        </p>
        <div className="mt-10 h-px w-full max-w-5xl mx-auto bg-[#B8963E] opacity-40" />
      </header>

      {/* Subheading */}
      <div className="px-8 mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-[#8a8680]">
          Today's Arrivals & Active Guests
        </p>
      </div>

      {/* Guest cards */}
      <main className="flex-1 px-8 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Isabella */}
          <GuestCard guest={isabella} warm note="Returning guest. 4th stay." />

          {/* Daniel */}
          <GuestCard guest={daniel} note="We're still learning Daniel." />

        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-8">
        <div className="max-w-5xl mx-auto border-t border-[#B8963E] border-opacity-30 pt-6">
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[#8a8680]">
            Écho · Rosewood Sand Hill · Staff Intelligence Platform · 2026
          </p>
        </div>
      </footer>

    </div>
  );
}

function GuestCard({
  guest,
  warm = false,
  note,
}: {
  guest: (typeof guests)[0];
  warm?: boolean;
  note?: string;
}) {
  const initials = guest.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Link href={`/guests/${guest.id}`} className="group block active:opacity-95">
    <article
      className={cn(
        "flex flex-col p-8 border border-[#e8e4dc] min-h-[340px] transition-colors group-hover:border-[#B8963E]",
        warm ? "bg-[#FFFDF8]" : "bg-white"
      )}
    >
      {/* Top row: monogram + status */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center justify-center w-14 h-14 rounded-full text-sm font-medium tracking-wide bg-[#EFE3C8] text-[#7A5C1E]">
          {initials}
        </div>
        <span
          className={cn(
            "px-3 py-1 text-[10px] uppercase tracking-widest font-medium",
            statusStyle[guest.arrivalStatus] ?? "bg-[#F0EDEA] text-[#6a6660]"
          )}
        >
          {statusLabel[guest.arrivalStatus] ?? guest.arrivalStatus}
        </span>
      </div>

      {/* Guest info + score */}
      <div className="flex items-center justify-between flex-1">
        <div className="flex flex-col gap-1">
          <h2 className="font-serif text-2xl font-light text-[#1C1917]">
            {guest.name}
          </h2>
          <p className="text-sm text-[#8a8680]">{guest.occupation}</p>
          <p className="text-xs text-[#6a6660] mt-2">
            {guest.stayHistory.length === 1
              ? "First Rosewood Stay"
              : `Stay ${guest.stayHistory.length}`}
          </p>
          {note && (
            <p className="text-sm italic text-[#8a8680] mt-3 max-w-[200px]">
              {note}
            </p>
          )}
        </div>

        <EchoProfile score={guest.echoScore} />
      </div>

      {/* Footer: View Brief affordance */}
      <div className="mt-6 pt-6 border-t border-[#e8e4dc]">
        <span className="inline-flex items-center gap-1.5 text-sm text-[#B8963E] group-hover:text-[#C9A84F] transition-colors">
          View Whisper Brief
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </article>
    </Link>
  );
}
