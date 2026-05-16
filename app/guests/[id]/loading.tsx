export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <div className="px-8 pt-8">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8a8680]">
          ← Dashboard
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#B8963E] border-t-transparent animate-spin" />
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#8a8680]">
            Loading Echo Profile
          </p>
        </div>
      </div>
    </div>
  );
}
