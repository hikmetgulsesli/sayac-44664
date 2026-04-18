import type { HistoryItem } from '../types'

interface HistoryPanelProps {
  history: HistoryItem[]
  onClearHistory: () => void
}

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getOperationLabel = (type: HistoryItem['type']): string => {
  switch (type) {
    case 'increment':
      return 'Artırıldı'
    case 'decrement':
      return 'Azaltıldı'
    case 'reset':
      return 'Sıfırlandı'
    default:
      return 'İşlem'
  }
}

const getOperationIcon = (type: HistoryItem['type']): string => {
  switch (type) {
    case 'increment':
      return 'add'
    case 'decrement':
      return 'remove'
    case 'reset':
      return 'refresh'
    default:
      return 'history'
  }
}

const getOperationColorClass = (type: HistoryItem['type']): string => {
  switch (type) {
    case 'increment':
      return 'bg-primary-container/10 text-primary-container'
    case 'decrement':
      return 'bg-surface-variant text-on-surface-variant'
    case 'reset':
      return 'bg-[#DC2626]/10 text-[#DC2626]'
    default:
      return 'bg-surface-variant text-on-surface-variant'
  }
}

export function HistoryPanel({ history, onClearHistory }: HistoryPanelProps) {
  const isEmpty = history.length === 0

  return (
    <section className="w-full flex flex-col gap-6">
      <h2 className="font-headline text-2xl font-bold text-on-surface">Son İşlemler</h2>

      <div className="flex flex-col gap-4">
        {isEmpty ? (
          <div className="bg-surface-container-lowest rounded-[16px] p-10 flex flex-col items-center justify-center gap-4 outline outline-1 outline-variant/15 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
            <div className="w-16 h-16 rounded-full bg-surface-variant/30 flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-secondary text-3xl opacity-80">history</span>
            </div>
            <p className="font-label text-secondary italic text-[14px] tracking-[0.05em] text-center">
              Henüz işlem yapılmadı.
            </p>
          </div>
        ) : (
          <>
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-5 bg-surface-container-lowest rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getOperationColorClass(item.type)}`}>
                    <span className="material-symbols-outlined text-[18px]">{getOperationIcon(item.type)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label text-sm font-bold text-on-surface">{getOperationLabel(item.type)}</span>
                    <span className="font-label text-xs text-secondary tracking-wide uppercase">
                      {formatDate(item.timestamp)} {formatTime(item.timestamp)}
                    </span>
                  </div>
                </div>
                <div className="font-display text-xl font-bold text-on-surface">{item.value}</div>
              </div>
            ))}

            <div className="mt-6 flex justify-center">
              <button
                onClick={onClearHistory}
                className="text-xs font-label uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors py-2 px-4 rounded-lg hover:bg-red-900/20"
                aria-label="Geçmişi Temizle"
              >
                Geçmişi Temizle
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
