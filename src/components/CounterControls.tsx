interface CounterControlsProps {
  onIncrement: () => void
  onDecrement: () => void
  onReset: () => void
}

export function CounterControls({ onIncrement, onDecrement, onReset }: CounterControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 w-full mt-4">
      <button
        onClick={onIncrement}
        className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-gradient-to-b from-primary to-primary-container text-on-primary py-4 px-6 rounded-xl font-label text-sm font-semibold hover:from-primary-fixed-variant hover:to-primary transition-all duration-300 shadow-[0_8px_16px_rgba(79,70,229,0.2)]"
        aria-label="Artır"
      >
        <span className="material-symbols-outlined text-[20px]">add</span>
        <span>Artır</span>
      </button>

      <button
        onClick={onDecrement}
        className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-surface-container-high text-on-surface py-4 px-6 rounded-xl font-label text-sm font-semibold hover:bg-surface-dim transition-all duration-300"
        aria-label="Azalt"
      >
        <span className="material-symbols-outlined text-[20px]">remove</span>
        <span>Azalt</span>
      </button>

      <button
        onClick={onReset}
        className="flex-none flex items-center justify-center gap-2 bg-[#DC2626]/10 text-[#DC2626] py-4 px-6 rounded-xl font-label text-sm font-semibold hover:bg-[#DC2626]/20 transition-all duration-300"
        aria-label="Sıfırla"
      >
        <span className="material-symbols-outlined text-[20px]">refresh</span>
        <span className="hidden sm:inline">Sıfırla</span>
      </button>
    </div>
  )
}
