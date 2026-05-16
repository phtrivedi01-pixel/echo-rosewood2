import { FlipCard } from "@/components/flip-card";

export default function AfterglowPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Header */}
      <header className="px-8 pt-12 pb-8 text-center">
        <p className="text-[9px] uppercase tracking-[0.3em] text-gold font-medium">
          {"\u00C9cho \u00B7 The Afterglow"}
        </p>
        <h1 className="font-serif text-3xl font-light text-charcoal mt-2">
          Isabella Reyes
        </h1>
        <p className="text-[11px] text-muted mt-1.5">
          {"Rosewood Sand Hill \u00B7 May 14\u201316, 2026"}
        </p>
      </header>

      {/* Flip Card */}
      <main className="flex-1 flex items-start justify-center px-4 pb-16">
        <FlipCard />
      </main>

      {/* Footer */}
      <footer className="px-8 py-6 text-center">
        <p className="text-[10px] text-muted tracking-wide">
          {"\u00C9cho \u00B7 Rosewood Hotels \u00B7 2026"}
        </p>
      </footer>
    </div>
  );
}
