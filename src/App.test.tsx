import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { describe, it, expect, beforeEach } from 'vitest'

describe('Counter App', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('renders the counter with initial value of 0', () => {
    render(<App />)
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('Mevcut Değer')).toBeInTheDocument()
  })

  it('increments the counter when Artır button is clicked', async () => {
    render(<App />)
    const incrementButton = screen.getByRole('button', { name: /artır/i })
    
    await userEvent.click(incrementButton)
    expect(screen.getByText('1')).toBeInTheDocument()
    
    await userEvent.click(incrementButton)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('decrements the counter when Azalt button is clicked', async () => {
    render(<App />)
    const incrementButton = screen.getByRole('button', { name: /artır/i })
    const decrementButton = screen.getByRole('button', { name: /azalt/i })
    
    await userEvent.click(incrementButton)
    await userEvent.click(incrementButton)
    expect(screen.getByText('2')).toBeInTheDocument()
    
    await userEvent.click(decrementButton)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('resets the counter when Sıfırla button is clicked', async () => {
    render(<App />)
    const incrementButton = screen.getByRole('button', { name: /artır/i })
    const resetButton = screen.getByRole('button', { name: /sıfırla/i })
    
    await userEvent.click(incrementButton)
    await userEvent.click(incrementButton)
    await userEvent.click(incrementButton)
    expect(screen.getByText('3')).toBeInTheDocument()
    
    await userEvent.click(resetButton)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('persists counter value to localStorage', async () => {
    render(<App />)
    const incrementButton = screen.getByRole('button', { name: /artır/i })
    
    await userEvent.click(incrementButton)
    await userEvent.click(incrementButton)
    
    expect(localStorage.getItem('sayac-counter')).toBe('2')
  })

  it('loads counter value from localStorage on mount', () => {
    localStorage.setItem('sayac-counter', '42')
    render(<App />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('toggles theme when theme button is clicked', async () => {
    render(<App />)
    const themeButton = screen.getByRole('button', { name: /koyu temaya geç/i })
    
    await userEvent.click(themeButton)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('sayac-theme')).toBe('dark')
  })

  it('switches to history tab when Geçmiş is clicked', async () => {
    render(<App />)
    const historyTab = screen.getByRole('button', { name: /geçmiş/i })
    
    await userEvent.click(historyTab)
    expect(screen.getByText('Son İşlemler')).toBeInTheDocument()
    expect(screen.getByText('Henüz işlem yapılmadı.')).toBeInTheDocument()
  })

  it('shows history items after operations', async () => {
    render(<App />)
    const incrementButton = screen.getByRole('button', { name: /artır/i })
    
    await userEvent.click(incrementButton)
    await userEvent.click(incrementButton)
    
    const historyTab = screen.getByRole('button', { name: /geçmiş/i })
    await userEvent.click(historyTab)
    
    expect(screen.getAllByText('Artırıldı').length).toBeGreaterThanOrEqual(1)
  })

  it('clears history when Geçmişi Temizle is clicked', async () => {
    render(<App />)
    const incrementButton = screen.getByRole('button', { name: /artır/i })
    
    await userEvent.click(incrementButton)
    
    const historyTab = screen.getByRole('button', { name: /geçmiş/i })
    await userEvent.click(historyTab)
    
    const clearButton = screen.getByText('Geçmişi Temizle')
    await userEvent.click(clearButton)
    
    expect(screen.getByText('Henüz işlem yapılmadı.')).toBeInTheDocument()
  })

  it('limits history to last 5 items', async () => {
    render(<App />)
    const incrementButton = screen.getByRole('button', { name: /artır/i })
    
    for (let i = 0; i < 7; i++) {
      await userEvent.click(incrementButton)
    }
    
    const historyTab = screen.getByRole('button', { name: /geçmiş/i })
    await userEvent.click(historyTab)
    
    const historyItems = screen.getAllByText(/Artırıldı/)
    expect(historyItems.length).toBe(5)
  })

  it('has proper accessibility attributes', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /artır/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /azalt/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sıfırla/i })).toBeInTheDocument()
  })
})
