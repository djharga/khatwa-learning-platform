/** @type {import('tailwindcss').Config} */
import tokens from './src/tokens';

// BRUTALIST ELEGANCE DESIGN SYSTEM - "CONCRETE & STEEL"
// Master architect Kain's design philosophy: Brutal, honest structure with impeccable execution

// BRUTALIST COLOR PALETTE: RAW POWER
const brutalistColors = {
  // Dominant: Premium uncoated paper texture
  concrete: '#F4F4F4',
  // Structure/Text: Deep charcoal for maximum contrast
  steel: '#1A1A1A',
  // Primary Action: Confident, powerful blue
  power: '#0052CC',
  // Pure contrast
  void: '#000000',
  pure: '#FFFFFF',
};

// Legacy palettes maintained for backward compatibility
const primaryPalette = {
  DEFAULT: brutalistColors.power,
  foreground: brutalistColors.pure,
  50: '#e6f2ff',
  100: '#cce5ff',
  200: '#99ccff',
  300: '#66b2ff',
  400: '#3399ff',
  500: brutalistColors.power,
  600: '#0047b3',
  700: '#003d99',
  800: '#003380',
  900: '#002966',
};

const grayPalette = {
  50: brutalistColors.concrete,
  100: '#e8e8e8',
  200: '#d1d1d1',
  300: '#b4b4b4',
  400: '#888888',
  500: '#6d6d6d',
  600: '#5d5d5d',
  700: '#4f4f4f',
  800: '#454545',
  900: brutalistColors.steel,
};

const secondaryPalette = {
  DEFAULT: '#f97316',
  foreground: '#ffffff',
  50: '#fff7ed',
  100: '#ffedd5',
  200: '#fed7aa',
  300: '#fdba74',
  400: '#fb923c',
  500: '#f97316',
  600: '#ea580c',
  700: '#c2410c',
  800: '#9a3412',
  900: '#7c2d12',
};

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/globals.css',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // BRUTALIST GRID SYSTEM: 4-pixel foundation
      spacing: {
        ...tokens.spacing,
        'brutalist-1': '4px',   // Base grid unit
        'brutalist-2': '8px',   // 2x grid
        'brutalist-3': '12px',  // 3x grid
        'brutalist-4': '16px',  // 4x grid
        'brutalist-6': '24px',  // 6x grid
        'brutalist-8': '32px',  // 8x grid
        'brutalist-12': '48px', // 12x grid
        'brutalist-16': '64px', // 16x grid
      },
      screens: {
        'motion-safe': { 'prefers-reduced-motion': 'no-preference' },
        'motion-reduce': { 'prefers-reduced-motion': 'reduce' },
      },
      colors: {
        // BRUTALIST CORE COLORS
        brutalist: brutalistColors,

        // Legacy compatibility
        primary: primaryPalette,
        secondary: secondaryPalette,
        gray: grayPalette,
        accent: secondaryPalette,
        neutral: grayPalette,
        success: tokens.colors.success,
        danger: tokens.colors.danger,
        warning: tokens.colors.warning,
        info: tokens.colors.info,

        // Shadcn/ui compatibility
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },

      // BRUTALIST TYPOGRAPHY: Industrial strength
      fontFamily: {
        'brutalist-heading': ['Mabry Pro', 'Neue Haas Grotesk', 'Arial Black', 'sans-serif'],
        'brutalist-body': ['Helvetica Now', 'Inter', 'system-ui', 'sans-serif'],
      },

      // BRUTALIST BORDERS: Thick and uncompromising
      borderWidth: {
        'brutalist': '2px',
        'brutalist-thick': '4px',
      },

      // BRUTALIST SHADOWS: Hard-edged, no blur
      boxShadow: {
        ...tokens.shadows,
        'brutalist': '8px 8px 0px #000000',
        'brutalist-sm': '4px 4px 0px #000000',
        'brutalist-lg': '12px 12px 0px #000000',
        'brutalist-xl': '16px 16px 0px #000000',
        'brutalist-pressed': 'none', // No shadow when pressed
        'brutalist-inset': 'inset 4px 4px 0px #000000', // For input fields
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'brutalist': '0px', // Sharp corners only
      },

      fontSize: {
        xs: tokens.typography.xs,
        sm: tokens.typography.sm,
        base: tokens.typography.base,
        lg: tokens.typography.lg,
        xl: tokens.typography.xl,
        '2xl': tokens.typography['2xl'],
        '3xl': tokens.typography['3xl'],
        '4xl': tokens.typography['4xl'],
        '5xl': tokens.typography['5xl'],
        '6xl': tokens.typography['6xl'],
        '7xl': tokens.typography['7xl'],
      },
      lineHeight: tokens.typography.lineHeight,
      fontWeight: tokens.typography.fontWeight,

      // BRUTALIST MOTION: Sharp and decisive
      transitionDuration: {
        ...tokens.motion.duration,
        'brutalist': '150ms', // Quick, decisive transitions
      },
      transitionTimingFunction: {
        ...tokens.motion.easing,
        'brutalist': 'cubic-bezier(0.4, 0, 0.2, 1)', // Sharp easing
      },

      width: {
        ...tokens.iconSizes,
      },
      height: {
        ...tokens.iconSizes,
      },
      minWidth: tokens.touchTargets,
      minHeight: tokens.touchTargets,

      // BRUTALIST ANIMATIONS: Structural movements
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        'slide-in': 'slide-in 0.5s ease-out forwards',
        'brutalist-press': 'brutalist-press 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: '-1000px 0' },
          to: { backgroundPosition: '1000px 0' },
        },
        'slide-in': {
          from: { transform: 'translateX(-100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'brutalist-press': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(4px, 4px)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};