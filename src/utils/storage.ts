import type { HistoryItem } from '../types'

const STORAGE_KEY = 'sayac-counter'
const HISTORY_KEY = 'sayac-history'
const THEME_KEY = 'sayac-theme'

export function getStoredCount(): number {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? parseInt(saved, 10) : 0
}

export function setStoredCount(count: number): void {
  localStorage.setItem(STORAGE_KEY, count.toString())
}

export function getStoredHistory(): HistoryItem[] {
  const saved = localStorage.getItem(HISTORY_KEY)
  if (!saved) return []
  try {
    return JSON.parse(saved)
  } catch {
    return []
  }
}

export function setStoredHistory(history: HistoryItem[]): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export function getStoredTheme(): 'light' | 'dark' {
  return (localStorage.getItem(THEME_KEY) as 'light' | 'dark') || 'light'
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  localStorage.setItem(THEME_KEY, theme)
}
