interface HeaderProps {
  isDark: boolean
  onToggleTheme: () => void
}

export function Header({ isDark, onToggleTheme }: HeaderProps) {
  return (
    <header className="flex justify-between items-center px-6 py-4 w-full fixed top-0 z-50 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-lg">
      <div className="text-lg font-bold tracking-tighter text-slate-900 dark:text-slate-100 font-headline">
        SAYAÇ-44664
      </div>
      <button
        onClick={onToggleTheme}
        className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors text-slate-500 dark:text-slate-400"
        aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
          {isDark ? 'light_mode' : 'dark_mode'}
        </span>
      </button>
      <div className="absolute bottom-0 left-0 bg-slate-200/30 dark:bg-slate-800/30 h-[1px] w-full"></div>
    </header>
  )
}
