import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from '../components/Counter';

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

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('Counter', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the counter with initial value of 0', () => {
    render(<Counter />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('increments the counter when Artır button is clicked', () => {
    render(<Counter />);
    const incrementButton = screen.getByLabelText('Sayacı artır');
    fireEvent.click(incrementButton);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('decrements the counter when Azalt button is clicked', () => {
    render(<Counter />);
    const decrementButton = screen.getByLabelText('Sayacı azalt');
    fireEvent.click(decrementButton);
    expect(screen.getByText('-1')).toBeInTheDocument();
  });

  it('resets the counter when Sıfırla button is clicked', () => {
    render(<Counter />);
    const incrementButton = screen.getByLabelText('Sayacı artır');
    const resetButton = screen.getByLabelText('Sayacı sıfırla');
    
    // Increment first
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    expect(screen.getByText('2')).toBeInTheDocument();
    
    // Then reset
    fireEvent.click(resetButton);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('displays the app title', () => {
    render(<Counter />);
    expect(screen.getByText('SAYAÇ-44664')).toBeInTheDocument();
  });

  it('displays the current value label', () => {
    render(<Counter />);
    expect(screen.getByText('Mevcut Değer')).toBeInTheDocument();
  });

  it('displays the history section title', () => {
    render(<Counter />);
    expect(screen.getByText('Son İşlemler')).toBeInTheDocument();
  });

  it('shows empty history message initially', () => {
    render(<Counter />);
    expect(screen.getByText('Henüz işlem yapılmadı')).toBeInTheDocument();
  });

  it('adds history item when incrementing', () => {
    render(<Counter />);
    const incrementButton = screen.getByLabelText('Sayacı artır');
    fireEvent.click(incrementButton);
    expect(screen.getByText('Artırıldı')).toBeInTheDocument();
  });

  it('adds history item when decrementing', () => {
    render(<Counter />);
    const decrementButton = screen.getByLabelText('Sayacı azalt');
    fireEvent.click(decrementButton);
    expect(screen.getByText('Azaltıldı')).toBeInTheDocument();
  });

  it('adds history item when resetting', () => {
    render(<Counter />);
    const incrementButton = screen.getByLabelText('Sayacı artır');
    const resetButton = screen.getByLabelText('Sayacı sıfırla');
    
    fireEvent.click(incrementButton);
    fireEvent.click(resetButton);
    
    expect(screen.getByText('Sıfırlandı')).toBeInTheDocument();
  });
});
