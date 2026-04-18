import { useCounter } from '../hooks/useCounter';
import { useTheme } from '../hooks/useTheme';
import { HistoryList } from './HistoryList';

export function Counter() {
  const { value, history, increment, decrement, reset } = useCounter();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container pt-20 pb-28 md:pb-0">
      {/* TopAppBar */}
      <header className="flex justify-between items-center px-6 py-4 w-full fixed top-0 z-50 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-lg">
        <div className="text-lg font-bold tracking-tighter text-slate-900 dark:text-slate-100 font-headline">
          SAYAÇ-44664
        </div>
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors text-slate-500 dark:text-slate-400"
          aria-label={theme === 'light' ? 'Koyu temaya geç' : 'Açık temaya geç'}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>
        <div className="absolute bottom-0 left-0 bg-slate-200/30 dark:bg-slate-800/30 h-[1px] w-full"></div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-start px-6 pt-12 md:pt-24 max-w-4xl mx-auto w-full gap-12">
        {/* Main Counter Area */}
        <section className="w-full flex flex-col items-start gap-8 bg-surface-container-low rounded-[2rem] p-8 md:p-16 relative overflow-hidden">
          {/* Subtle gradient background element for depth without borders */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="flex flex-col gap-2 w-full">
            <span className="font-label text-xs font-semibold tracking-[0.05em] text-secondary uppercase">
              Mevcut Değer
            </span>
            <div className="flex items-end gap-6 w-full justify-between flex-wrap">
              <h1 className="font-display text-8xl md:text-[9rem] font-extrabold text-on-surface leading-none tracking-tighter tabular-nums">
                {value}
              </h1>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full mt-4">
            <button
              onClick={increment}
              className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-gradient-to-b from-primary to-primary-container text-on-primary py-4 px-6 rounded-xl font-label text-sm font-semibold hover:from-primary-fixed-variant hover:to-primary transition-all duration-300 shadow-[0_8px_16px_rgba(79,70,229,0.2)]"
              aria-label="Sayacı artır"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Artır</span>
            </button>
            
            <button
              onClick={decrement}
              className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-surface-container-high text-on-surface py-4 px-6 rounded-xl font-label text-sm font-semibold hover:bg-surface-dim transition-all duration-300"
              aria-label="Sayacı azalt"
            >
              <span className="material-symbols-outlined text-[20px]">remove</span>
              <span>Azalt</span>
            </button>
            
            <button
              onClick={reset}
              className="flex-none flex items-center justify-center gap-2 bg-[#DC2626]/10 text-[#DC2626] py-4 px-6 rounded-xl font-label text-sm font-semibold hover:bg-[#DC2626]/20 transition-all duration-300"
              aria-label="Sayacı sıfırla"
            >
              <span className="material-symbols-outlined text-[20px]">refresh</span>
              <span className="hidden sm:inline">Sıfırla</span>
            </button>
          </div>
        </section>

        {/* History Section */}
        <HistoryList history={history} />
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-lg rounded-t-3xl shadow-[0_-12px_32px_rgba(0,0,0,0.04)] md:hidden">
        <a
          href="#"
          className="flex flex-col items-center justify-center text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl px-6 py-2"
          aria-label="Sayaç"
        >
          <span className="material-symbols-outlined mb-1">exposure</span>
          <span className="font-body font-medium uppercase tracking-widest text-[9px]">Sayaç</span>
        </a>
        <a
          href="#history"
          className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-6 py-2 hover:text-indigo-500 dark:hover:text-indigo-300"
          aria-label="Geçmiş"
        >
          <span className="material-symbols-outlined mb-1">history</span>
          <span className="font-body font-medium uppercase tracking-widest text-[9px]">Geçmiş</span>
        </a>
      </nav>
    </div>
  );
}
