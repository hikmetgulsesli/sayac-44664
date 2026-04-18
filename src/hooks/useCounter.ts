import { useState, useEffect, useCallback } from 'react';
import type { CounterState } from '../types';
import {
  loadState,
  saveState,
  createHistoryItem,
  addToHistory,
} from '../utils/storage';

const initialState: CounterState = {
  value: 0,
  history: [],
};

export function useCounter() {
  const [state, setState] = useState<CounterState>(() => {
    const saved = loadState();
    return saved || initialState;
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  const increment = useCallback(() => {
    setState((prev) => {
      const newValue = prev.value + 1;
      const historyItem = createHistoryItem('increment', newValue);
      return {
        value: newValue,
        history: addToHistory(prev.history, historyItem),
      };
    });
  }, []);

  const decrement = useCallback(() => {
    setState((prev) => {
      const newValue = prev.value - 1;
      const historyItem = createHistoryItem('decrement', newValue);
      return {
        value: newValue,
        history: addToHistory(prev.history, historyItem),
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState((prev) => {
      const newValue = 0;
      const historyItem = createHistoryItem('reset', newValue);
      return {
        value: newValue,
        history: addToHistory(prev.history, historyItem),
      };
    });
  }, []);

  return {
    value: state.value,
    history: state.history,
    increment,
    decrement,
    reset,
  };
}
