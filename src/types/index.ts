export interface HistoryItem {
  id: string
  type: 'increment' | 'decrement' | 'reset'
  value: number
  previousValue: number
  timestamp: number
}
