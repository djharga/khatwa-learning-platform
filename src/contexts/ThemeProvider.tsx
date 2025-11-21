'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme from localStorage on client side
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'system';
    try {
      return (localStorage.getItem('theme') as Theme) || 'system';
    } catch {
      return 'system';
    }
  };

  // Initialize resolvedTheme based on saved theme
  const getInitialResolvedTheme = (savedTheme: Theme): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    if (savedTheme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return savedTheme === 'dark' ? 'dark' : 'light';
  };

  const initialTheme = getInitialTheme();
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => 
    getInitialResolvedTheme(initialTheme)
  );
  const [mounted, setMounted] = useState(false);

  // Get system theme preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Apply theme to document
  const applyTheme = (themeToApply: 'light' | 'dark') => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add smooth transition for theme change - محسّن للسرعة (200ms)
    root.style.transition = 'background-color 200ms ease-out, color 200ms ease-out, border-color 200ms ease-out';
    
    // Apply new theme
    if (themeToApply === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    setResolvedTheme(themeToApply);
  };

  // Set theme with smooth transition
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    
    // Store user preference in localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('theme', newTheme);
      } catch (e) {
        // localStorage might be disabled
      }
    }
    
    // Apply the resolved theme
    if (newTheme === 'system') {
      const systemTheme = getSystemTheme();
      applyTheme(systemTheme);
    } else {
      applyTheme(newTheme);
    }
  };

  // Toggle between light and dark
  const toggleTheme = () => {
    const currentResolved = resolvedTheme;
    const newTheme = currentResolved === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Initialize theme on mount and apply it
  useEffect(() => {
    setMounted(true);
    
    // Apply the initial theme that was read from localStorage
    // The second useEffect will handle setting up the system theme listener if needed
    if (theme === 'system') {
      const systemTheme = getSystemTheme();
      applyTheme(systemTheme);
    } else {
      applyTheme(theme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Handle system theme changes when theme is set to 'system'
  useEffect(() => {
    if (theme !== 'system' || !mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      applyTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  // Always provide context, even during SSR
  // Use default values during SSR to prevent errors
  const contextValue = mounted
    ? { theme, resolvedTheme, setTheme, toggleTheme }
    : {
        theme: 'system' as Theme,
        resolvedTheme: 'light' as 'light' | 'dark',
        setTheme: () => {},
        toggleTheme: () => {},
      };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

