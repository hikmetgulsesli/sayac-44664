interface BottomNavProps {
  activeTab: 'counter' | 'history'
  onTabChange: (tab: 'counter' | 'history') => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-lg docked full-width bottom-0 rounded-t-3xl shadow-[0_-12px_32px_rgba(0,0,0,0.04)] md:hidden">
      <button
        onClick={() => onTabChange('counter')}
        className={`flex flex-col items-center justify-center rounded-2xl px-6 py-2 transition-all duration-300 ${
          activeTab === 'counter'
            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 scale-95'
            : 'text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-300'
        }`}
      >
        <span 
          className="material-symbols-outlined mb-1"
          style={{ fontVariationSettings: activeTab === 'counter' ? "'FILL' 1" : "'FILL' 0" }}
        >
          exposure
        </span>
        <span className="font-body font-medium uppercase tracking-widest text-[9px]">Sayaç</span>
      </button>
      
      <button
        onClick={() => onTabChange('history')}
        className={`flex flex-col items-center justify-center rounded-2xl px-6 py-2 transition-all duration-300 ${
          activeTab === 'history'
            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 scale-95'
            : 'text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-300'
        }`}
      >
        <span 
          className="material-symbols-outlined mb-1"
          style={{ fontVariationSettings: activeTab === 'history' ? "'FILL' 1" : "'FILL' 0" }}
        >
          history
        </span>
        <span className="font-body font-medium uppercase tracking-widest text-[9px]">Geçmiş</span>
      </button>
    </nav>
  )
}
