interface CounterDisplayProps {
  count: number
  label?: string
}

export function CounterDisplay({ count, label = 'Mevcut Değer' }: CounterDisplayProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="font-label text-xs font-semibold tracking-[0.05em] text-secondary uppercase">
        {label}
      </span>
      <div className="flex items-end gap-6 w-full justify-between flex-wrap">
        <h1 className="font-display text-8xl md:text-[9rem] font-extrabold text-on-surface leading-none tracking-tighter tabular-nums">
          {count}
        </h1>
      </div>
    </div>
  )
}
