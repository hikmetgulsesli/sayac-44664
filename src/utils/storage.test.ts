import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  loadState,
  saveState,
  createHistoryItem,
  addToHistory,
  formatTimestamp,
  getActionLabel,
} from './storage';
import type { CounterState, HistoryItem } from '../types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('storage utilities', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('loadState', () => {
    it('returns null when no state is saved', () => {
      expect(loadState()).toBeNull();
    });

    it('returns saved state when available', () => {
      const state: CounterState = {
        value: 42,
        history: [],
      };
      localStorageMock.setItem('sayac-44664-state', JSON.stringify(state));
      expect(loadState()).toEqual(state);
    });
  });

  describe('saveState', () => {
    it('saves state to localStorage', () => {
      const state: CounterState = {
        value: 10,
        history: [],
      };
      saveState(state);
      expect(localStorageMock.getItem('sayac-44664-state')).toBe(JSON.stringify(state));
    });
  });

  describe('createHistoryItem', () => {
    it('creates a history item with correct properties', () => {
      const item = createHistoryItem('increment', 5);
      expect(item.action).toBe('increment');
      expect(item.value).toBe(5);
      expect(item.id).toBeDefined();
      expect(item.timestamp).toBeDefined();
    });
  });

  describe('addToHistory', () => {
    it('adds item to the beginning of history', () => {
      const existingHistory: HistoryItem[] = [
        { id: '1', action: 'increment', value: 1, timestamp: 1000 },
      ];
      const newItem: HistoryItem = { id: '2', action: 'increment', value: 2, timestamp: 2000 };
      const result = addToHistory(existingHistory, newItem);
      expect(result[0]).toEqual(newItem);
    });

    it('limits history to 5 items', () => {
      const existingHistory: HistoryItem[] = [
        { id: '1', action: 'increment', value: 1, timestamp: 1000 },
        { id: '2', action: 'increment', value: 2, timestamp: 2000 },
        { id: '3', action: 'increment', value: 3, timestamp: 3000 },
        { id: '4', action: 'increment', value: 4, timestamp: 4000 },
        { id: '5', action: 'increment', value: 5, timestamp: 5000 },
      ];
      const newItem: HistoryItem = { id: '6', action: 'increment', value: 6, timestamp: 6000 };
      const result = addToHistory(existingHistory, newItem);
      expect(result).toHaveLength(5);
      expect(result[0]).toEqual(newItem);
      expect(result[4].id).toBe('2');
    });
  });

  describe('formatTimestamp', () => {
    it('formats timestamp correctly', () => {
      const timestamp = new Date('2024-05-12T14:30:00').getTime();
      const formatted = formatTimestamp(timestamp);
      expect(formatted).toContain('12.05.2024');
      expect(formatted).toContain('14:30');
    });
  });

  describe('getActionLabel', () => {
    it('returns correct label for increment', () => {
      expect(getActionLabel('increment')).toBe('Artırıldı');
    });

    it('returns correct label for decrement', () => {
      expect(getActionLabel('decrement')).toBe('Azaltıldı');
    });

    it('returns correct label for reset', () => {
      expect(getActionLabel('reset')).toBe('Sıfırlandı');
    });
  });
});
