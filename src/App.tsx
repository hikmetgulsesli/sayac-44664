import { useState, useEffect, useCallback } from 'react'
import type { HistoryItem } from './types'
import { getStoredCount, setStoredCount, getStoredHistory, setStoredHistory, getStoredTheme, setStoredTheme } from './utils/storage'
import { Header } from './components/Header'
import { CounterSection } from './components/CounterSection'
import { HistorySection } from './components/HistorySection'
import { BottomNav } from './components/BottomNav'

function App() {
  const [count, setCount] = useState<number>(0)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isDark, setIsDark] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'counter' | 'history'>('counter')

  // Load from localStorage on mount
  useEffect(() => {
    setCount(getStoredCount())
    setHistory(getStoredHistory())
    
    const savedTheme = getStoredTheme()
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Save to localStorage when count or history changes
  useEffect(() => {
    setStoredCount(count)
  }, [count])

  useEffect(() => {
    setStoredHistory(history)
  }, [history])

  const addToHistory = useCallback((type: HistoryItem['type'], value: number, previousValue: number) => {
    const newItem: HistoryItem = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      value,
      previousValue,
      timestamp: Date.now(),
    }
    setHistory(prev => [newItem, ...prev].slice(0, 5))
  }, [])

  const increment = useCallback(() => {
    const previousValue = count
    const newValue = count + 1
    setCount(newValue)
    addToHistory('increment', newValue, previousValue)
  }, [count, addToHistory])

  const decrement = useCallback(() => {
    const previousValue = count
    const newValue = count - 1
    setCount(newValue)
    addToHistory('decrement', newValue, previousValue)
  }, [count, addToHistory])

  const reset = useCallback(() => {
    const previousValue = count
    setCount(0)
    addToHistory('reset', 0, previousValue)
  }, [count, addToHistory])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newValue = !prev
      if (newValue) {
        document.documentElement.classList.add('dark')
        setStoredTheme('dark')
      } else {
        document.documentElement.classList.remove('dark')
        setStoredTheme('light')
      }
      return newValue
    })
  }, [])

  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container pt-20 pb-28 md:pb-0">
      <Header isDark={isDark} onToggleTheme={toggleTheme} />
      
      <main className="flex-grow flex flex-col items-center justify-start px-6 pt-12 md:pt-24 max-w-4xl mx-auto w-full gap-12">
        {activeTab === 'counter' ? (
          <CounterSection 
            count={count}
            onIncrement={increment}
            onDecrement={decrement}
            onReset={reset}
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
