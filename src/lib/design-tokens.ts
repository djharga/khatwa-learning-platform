/**
 * Design Tokens - منصة خطى التعليمية
 * Khatwa Learning Platform - Unified Design System
 * 
 * هذا الملف يحتوي على جميع Design Tokens الموحدة للمنصة
 * يجب استخدام هذه القيم بدلاً من الألوان والمسافات المباشرة
 */

export const designTokens = {
  // الألوان الأساسية
  colors: {
    primary: {
      50: '#f0f4ff',
      100: '#e0e9ff',
      200: '#c7d7fe',
      300: '#a5b8fc',
      400: '#818cf8',
      500: '#6366f1', // primary-600 في Tailwind
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
    accent: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },
    success: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
  },

  // المسافات (Spacing Scale)
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
  },

  // Border Radius
  borderRadius: {
    sm: '0.5rem',    // 8px
    md: '0.875rem',  // 14px - للبطاقات
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    '2xl': '2rem',   // 32px
    '3xl': '3rem',   // 48px
    full: '9999px',
  },

  // الظلال (Elevation System)
  shadows: {
    none: 'none',
    sm: '0 1px 3px rgba(0, 0, 0, 0.05)',
    md: '0 2px 8px rgba(0, 0, 0, 0.08)',
    lg: '0 4px 16px rgba(0, 0, 0, 0.12)',
    xl: '0 8px 24px rgba(0, 0, 0, 0.16)',
    '2xl': '0 16px 32px rgba(0, 0, 0, 0.20)',
    // Primary colored shadows
    primary: {
      sm: '0 2px 8px rgba(79, 70, 229, 0.15)',
      md: '0 4px 16px rgba(79, 70, 229, 0.20)',
      lg: '0 8px 24px rgba(79, 70, 229, 0.25)',
    },
  },

  // Typography Scale
  typography: {
    fontFamily: {
      arabic: ['var(--font-noto-kufi-arabic)', 'Noto Kufi Arabic', 'Cairo', 'sans-serif'],
      sans: ['var(--font-arabic)', 'IBM Plex Sans Arabic', 'Noto Sans Arabic', 'sans-serif'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
      sm: ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
      base: ['1rem', { lineHeight: '1.75', letterSpacing: '0em' }],
      lg: ['1.125rem', { lineHeight: '1.75', letterSpacing: '0em' }],
      xl: ['1.25rem', { lineHeight: '1.75', letterSpacing: '-0.025em' }],
      '2xl': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.025em' }],
      '3xl': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.05em' }],
      '4xl': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.05em' }],
      '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.05em' }],
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },

  // Animation Durations
  animation: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
    slowest: '600ms',
  },

  // Z-Index Scale
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
} as const;

// Helper functions للوصول السهل للـ tokens
export const getColor = <T extends keyof typeof designTokens.colors>(
  color: T,
  shade: keyof typeof designTokens.colors[T]
) => {
  return designTokens.colors[color][shade];
};

export const getSpacing = (size: keyof typeof designTokens.spacing) => {
  return designTokens.spacing[size];
};

export const getShadow = (size: keyof typeof designTokens.shadows) => {
  return designTokens.shadows[size];
};

export const getBorderRadius = (size: keyof typeof designTokens.borderRadius) => {
  return designTokens.borderRadius[size];
};

