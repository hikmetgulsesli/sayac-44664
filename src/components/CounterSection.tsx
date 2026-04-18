interface CounterSectionProps {
  count: number
  onIncrement: () => void
  onDecrement: () => void
  onReset: () => void
}

export function CounterSection({ count, onIncrement, onDecrement, onReset }: CounterSectionProps) {
  return (
    <section className="w-full flex flex-col items-start gap-8 bg-surface-container-low rounded-[2rem] p-8 md:p-16 relative overflow-hidden">
      {/* Subtle gradient background element for depth without borders */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="flex flex-col gap-2 w-full">
        <span className="font-label text-xs font-semibold tracking-[0.05em] text-secondary uppercase">
          Mevcut Değer
        </span>
        <div className="flex items-end gap-6 w-full justify-between flex-wrap">
          <h1 className="font-display text-8xl md:text-[9rem] font-extrabold text-on-surface leading-none tracking-tighter tabular-nums">
            {count}
          </h1>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-4 w-full mt-4">
        <button
          onClick={onIncrement}
          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-gradient-to-b from-primary to-primary-container text-on-primary py-4 px-6 rounded-xl font-label text-sm font-semibold hover:from-primary-fixed-variant hover:to-primary transition-all duration-300 shadow-[0_8px_16px_rgba(79,70,229,0.2)]"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Artır</span>
        </button>
        
        <button
          onClick={onDecrement}
          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-surface-container-high text-on-surface py-4 px-6 rounded-xl font-label text-sm font-semibold hover:bg-surface-dim transition-all duration-300"
        >
          <span className="material-symbols-outlined text-[20px]">remove</span>
          <span>Azalt</span>
        </button>
        
        <button
          onClick={onReset}
          className="flex-none flex items-center justify-center gap-2 bg-[#DC2626]/10 text-[#DC2626] py-4 px-6 rounded-xl font-label text-sm font-semibold hover:bg-[#DC2626]/20 transition-all duration-300"
        >
          <span className="material-symbols-outlined text-[20px]">refresh</span>
          <span className="hidden sm:inline">Sıfırla</span>
        </button>
      </div>
    </section>
  )
}
