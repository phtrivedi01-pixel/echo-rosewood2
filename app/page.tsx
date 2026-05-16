import Link from "next/link";
import { GuestCard } from "@/components/guest-card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-8 pt-16 pb-12 text-center">
        <h1 className="font-serif text-[52px] font-light tracking-[0.08em] text-[#1C1917]">
          Écho
        </h1>
        <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-muted">
          Rosewood Sand Hill · Staff Intelligence Platform
        </p>
        {/* Gold divider line */}
        <div className="mt-10 h-px w-full bg-gold" />
      </header>

      {/* Main content */}
      <main className="flex-1 px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GuestCard
              name="Isabella Reyes"
              profession="Interior Designer"
              stayNumber={4}
              echoScore={94}
              monogram="IR"
              status="arriving"
              warmBackground
            />
            <GuestCard
              name="Daniel Park"
              profession="Technology Professional"
              stayNumber={1}
              echoScore={41}
              monogram="DP"
              status="active"
              note="We're still learning Daniel."
            />
          </div>
        </div>
        {/* Afterglow Preview */}
        <div className="mt-10 text-center">
          <Link
            href="/afterglow"
            className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold-light transition-colors"
          >
            View Afterglow Memory Card
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-8">
        <div className="max-w-5xl mx-auto border-t border-gold pt-6">
          <p className="text-center text-xs text-muted tracking-wide">
            Écho · Rosewood Sand Hill · 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
