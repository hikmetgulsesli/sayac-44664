import type { CounterState, HistoryItem } from '../types';

const STORAGE_KEY = 'sayac-44664-state';
const MAX_HISTORY_ITEMS = 5;

export function loadState(): CounterState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
  }
  return null;
}

export function saveState(state: CounterState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
}

export function createHistoryItem(
  action: HistoryItem['action'],
  value: number
): HistoryItem {
  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    action,
    value,
    timestamp: Date.now(),
  };
}

export function addToHistory(
  history: HistoryItem[],
  item: HistoryItem
): HistoryItem[] {
  const newHistory = [item, ...history];
  return newHistory.slice(0, MAX_HISTORY_ITEMS);
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getActionLabel(action: HistoryItem['action']): string {
  switch (action) {
    case 'increment':
      return 'Artırıldı';
    case 'decrement':
      return 'Azaltıldı';
    case 'reset':
      return 'Sıfırlandı';
    default:
      return 'İşlem';
  }
}
