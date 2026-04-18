export interface CounterState {
  value: number;
  history: HistoryItem[];
}

export interface HistoryItem {
  id: string;
  action: 'increment' | 'decrement' | 'reset';
  value: number;
  timestamp: number;
}

export type Theme = 'light' | 'dark';
