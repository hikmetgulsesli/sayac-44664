import { useState, useEffect, useCallback } from 'react'
import { getStoredCount, setStoredCount } from '../utils/storage'

export function useCounter() {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    setCount(getStoredCount())
  }, [])

  useEffect(() => {
    setStoredCount(count)
  }, [count])

  const increment = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  const decrement = useCallback(() => {
    setCount(prev => prev - 1)
  }, [])

  const reset = useCallback(() => {
    setCount(0)
  }, [])

  const setValue = useCallback((value: number) => {
    setCount(value)
  }, [])

  return {
    count,
    increment,
    decrement,
    reset,
    setValue,
  }
}
