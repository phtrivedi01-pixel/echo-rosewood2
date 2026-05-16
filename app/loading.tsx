export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <div className="px-8 pt-16 text-center">
        <h1 className="font-serif text-[56px] font-light tracking-[0.06em] text-[#1C1917]">
          Écho
        </h1>
        <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-[#8a8680]">
          Rosewood Sand Hill
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#B8963E] border-t-transparent animate-spin" />
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#8a8680]">
            Loading Today&apos;s Arrivals
          </p>
        </div>
      </div>
    </div>
  );
}
