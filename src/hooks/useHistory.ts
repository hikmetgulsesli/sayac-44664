import { useState, useEffect, useCallback } from 'react'
import type { HistoryItem } from '../types'
import { getStoredHistory, setStoredHistory } from '../utils/storage'

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    setHistory(getStoredHistory())
  }, [])

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

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  return {
    history,
    addToHistory,
    clearHistory,
  }
}
