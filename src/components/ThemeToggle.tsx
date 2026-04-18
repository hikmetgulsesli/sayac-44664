interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors text-slate-500 dark:text-slate-400"
      aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
    >
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  )
}
