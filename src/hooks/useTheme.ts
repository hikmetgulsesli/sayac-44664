import { useCallback } from 'react'

const THEME_KEY = 'sayac-theme'

export function useTheme() {
  const getStoredTheme = useCallback((): 'light' | 'dark' => {
    return (localStorage.getItem(THEME_KEY) as 'light' | 'dark') || 'light'
  }, [])

  const setStoredTheme = useCallback((theme: 'light' | 'dark'): void => {
    localStorage.setItem(THEME_KEY, theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = useCallback((): 'light' | 'dark' => {
    const currentTheme = getStoredTheme()
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setStoredTheme(newTheme)
    return newTheme
  }, [getStoredTheme, setStoredTheme])

  return {
    getStoredTheme,
    setStoredTheme,
    toggleTheme,
  }
}
