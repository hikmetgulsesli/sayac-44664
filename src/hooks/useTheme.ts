import { useState, useEffect, useCallback } from 'react'
import { getStoredTheme, setStoredTheme } from '../utils/storage'

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(false)

  useEffect(() => {
    const savedTheme = getStoredTheme()
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
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

  return {
    isDark,
    toggleTheme,
  }
}
