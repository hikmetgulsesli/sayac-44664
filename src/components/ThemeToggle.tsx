import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-full text-indigo-400 hover:bg-slate-800/50 transition-colors active:scale-95 duration-200"
      aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
    >
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  )
}
