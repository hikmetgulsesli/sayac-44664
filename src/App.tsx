import { useCallback } from 'react'
import { useCounter } from './hooks/useCounter'
import { useHistory } from './hooks/useHistory'
import { useTheme } from './hooks/useTheme'
import { Header } from './components/Header'
import { CounterSection } from './components/CounterSection'
import { HistorySection } from './components/HistorySection'
import { BottomNav } from './components/BottomNav'
import { useState } from 'react'

function App() {
  const { count, increment, decrement, reset } = useCounter()
  const { history, addToHistory, clearHistory } = useHistory()
  const { isDark, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<'counter' | 'history'>('counter')

  const handleIncrement = useCallback(() => {
    const previousValue = count
    increment()
    addToHistory('increment', count + 1, previousValue)
  }, [count, increment, addToHistory])

  const handleDecrement = useCallback(() => {
    const previousValue = count
    decrement()
    addToHistory('decrement', count - 1, previousValue)
  }, [count, decrement, addToHistory])

  const handleReset = useCallback(() => {
    const previousValue = count
    reset()
    addToHistory('reset', 0, previousValue)
  }, [count, reset, addToHistory])

  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container pt-20 pb-28 md:pb-0">
      <Header isDark={isDark} onToggleTheme={toggleTheme} />

      <main className="flex-grow flex flex-col items-center justify-start px-6 pt-12 md:pt-24 max-w-4xl mx-auto w-full gap-12">
        {activeTab === 'counter' ? (
          <CounterSection
            count={count}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onReset={handleReset}
          />
        ) : (
          <HistorySection
            history={history}
            onClearHistory={clearHistory}
          />
        )}
      </main>

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  )
}

export default App
