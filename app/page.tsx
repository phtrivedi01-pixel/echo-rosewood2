import { GuestCard } from "@/components/guest-card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-8 pt-16 pb-12 text-center">
        <h1 className="font-serif text-5xl font-light tracking-tight text-foreground">
          Écho
        </h1>
        <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-muted">
          Rosewood Sand Hill · Staff Intelligence Platform
        </p>
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
