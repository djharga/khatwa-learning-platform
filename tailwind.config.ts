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
  // RTL Support - دعم كامل للاتجاه من اليمين لليسار
  // Tailwind سيستخدم logical properties تلقائياً عند وجود dir="rtl"
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

        // Primary Colors - من tokens.ts مع درجات كاملة
        primary: {
          ...tokens.colors.primary,
          DEFAULT: tokens.colors.primary[500],
        },

        // Accent Colors - من tokens.ts
        accent: {
          ...tokens.colors.accent,
          DEFAULT: tokens.colors.accent[500],
        },

        // Neutral Colors - من tokens.ts
        neutral: {
          ...tokens.colors.neutral,
        },

        // Status Colors - من tokens.ts
        success: tokens.colors.success,
        danger: tokens.colors.danger,
        warning: tokens.colors.warning,
        info: tokens.colors.info,

        // Background Colors - من tokens.ts
        background: {
          primary: tokens.colors.background.primary,
          alt: tokens.colors.background.alt,
          subtle: tokens.colors.background.subtle,
          DEFAULT: tokens.colors.background.primary,
        },

        // Text Colors - من tokens.ts
        text: tokens.colors.text,

        // Secondary Colors - من tokens.ts (مع جميع الألوان الوظيفية)
        secondary: {
          // Secondary functional colors from tokens.ts
          learn: tokens.colors.secondary.learn,
          expert: tokens.colors.secondary.expert,
          innovate: tokens.colors.secondary.innovate,
          secure: tokens.colors.secondary.secure,
          // Legacy compatibility - للتوافق مع الكود القديم
          ...secondaryPalette,
        },

        // Legacy compatibility - للتوافق مع الكود القديم
        gray: grayPalette,

        // Shadcn/ui compatibility
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

      // Typography System - نظام خطوط متطور ومتعدد الطبقات
      fontFamily: {
        // Primary Fonts - الخطوط الأساسية
        sans: ['var(--font-nunito-sans)', 'Nunito Sans', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['var(--font-nunito-sans)', 'Nunito Sans', 'system-ui', '-apple-system', 'sans-serif'],
        
        // Specialized Fonts - خطوط متخصصة
        display: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        technical: ['var(--font-ibm-plex)', 'IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
        button: ['var(--font-almarai)', 'Almarai', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        
        // Generic Fonts - خطوط عامة
        arabic: ['var(--font-inter)', 'Inter', 'Nunito Sans', 'system-ui', 'sans-serif'],
        english: ['var(--font-inter)', 'Inter', 'Roboto', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        
        // Inter and Nunito Sans for specific use
        inter: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        'nunito-sans': ['var(--font-nunito-sans)', 'Nunito Sans', 'system-ui', 'sans-serif'],
        
        // BRUTALIST TYPOGRAPHY: Legacy compatibility
        'brutalist-heading': ['Mabry Pro', 'Neue Haas Grotesk', 'Arial Black', 'sans-serif'],
        'brutalist-body': ['Helvetica Now', 'Inter', 'system-ui', 'sans-serif'],
      },

      // BRUTALIST BORDERS: Thick and uncompromising
      borderWidth: {
        'brutalist': '2px',
        'brutalist-thick': '4px',
      },

      // Shadow System - من tokens.ts
      boxShadow: {
        // Base Shadows
        none: tokens.shadows.none,
        xs: tokens.shadows.xs,
        sm: tokens.shadows.sm,
        md: tokens.shadows.md,
        lg: tokens.shadows.lg,
        xl: tokens.shadows.xl,
        '2xl': tokens.shadows['2xl'],
        
        // Inner Shadows
        inner: tokens.shadows.inner,
        'inner-sm': tokens.shadows['inner-sm'],
        'inner-md': tokens.shadows['inner-md'],
        'inner-lg': tokens.shadows['inner-lg'],
        
        // Colored Shadows - Primary
        'primary-sm': tokens.shadows.primary.sm,
        'primary-md': tokens.shadows.primary.md,
        'primary-lg': tokens.shadows.primary.lg,
        'primary-xl': tokens.shadows.primary.xl,
        primary: tokens.shadows.primary.DEFAULT,
        
        // Colored Shadows - Accent
        'accent-sm': tokens.shadows.accent.sm,
        'accent-md': tokens.shadows.accent.md,
        'accent-lg': tokens.shadows.accent.lg,
        'accent-xl': tokens.shadows.accent.xl,
        accent: tokens.shadows.accent.DEFAULT,
        
        // Colored Shadows - Success
        'success-sm': tokens.shadows.success.sm,
        'success-md': tokens.shadows.success.md,
        'success-lg': tokens.shadows.success.lg,
        'success-xl': tokens.shadows.success.xl,
        success: tokens.shadows.success.DEFAULT,
        
        // Colored Shadows - Warning
        'warning-sm': tokens.shadows.warning.sm,
        'warning-md': tokens.shadows.warning.md,
        'warning-lg': tokens.shadows.warning.lg,
        'warning-xl': tokens.shadows.warning.xl,
        warning: tokens.shadows.warning.DEFAULT,
        
        // Colored Shadows - Error
        'error-sm': tokens.shadows.error.sm,
        'error-md': tokens.shadows.error.md,
        'error-lg': tokens.shadows.error.lg,
        'error-xl': tokens.shadows.error.xl,
        error: tokens.shadows.error.DEFAULT,
        
        // Glow Effects
        'glow-primary': tokens.shadows.glow.primary.DEFAULT,
        'glow-primary-sm': tokens.shadows.glow.primary.sm,
        'glow-primary-lg': tokens.shadows.glow.primary.lg,
        'glow-accent': tokens.shadows.glow.accent.DEFAULT,
        'glow-accent-sm': tokens.shadows.glow.accent.sm,
        'glow-accent-lg': tokens.shadows.glow.accent.lg,
        'glow-success': tokens.shadows.glow.success.DEFAULT,
        'glow-warning': tokens.shadows.glow.warning.DEFAULT,
        'glow-error': tokens.shadows.glow.error.DEFAULT,
        
        // Elevation System
        'elevation-0': tokens.shadows.elevation[0],
        'elevation-1': tokens.shadows.elevation[1],
        'elevation-2': tokens.shadows.elevation[2],
        'elevation-3': tokens.shadows.elevation[3],
        'elevation-4': tokens.shadows.elevation[4],
        'elevation-5': tokens.shadows.elevation[5],
        'elevation-6': tokens.shadows.elevation[6],
        
        // BRUTALIST SHADOWS: Legacy compatibility
        'brutalist': '8px 8px 0px #000000',
        'brutalist-sm': '4px 4px 0px #000000',
        'brutalist-lg': '12px 12px 0px #000000',
        'brutalist-xl': '16px 16px 0px #000000',
        'brutalist-pressed': 'none',
        'brutalist-inset': 'inset 4px 4px 0px #000000',
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'brutalist': '0px', // Sharp corners only
      },

      fontSize: {
        // Responsive Typography - Fluid Typography with clamp() - Reduced by 15%
        xs: 'clamp(0.531rem, 0.51rem + 0.17vw, 0.638rem)',
        sm: 'clamp(0.638rem, 0.595rem + 0.21vw, 0.744rem)',
        base: 'clamp(0.744rem, 0.68rem + 0.21vw, 0.85rem)',
        lg: 'clamp(0.85rem, 0.765rem + 0.26vw, 0.956rem)',
        xl: 'clamp(0.956rem, 0.85rem + 0.34vw, 1.169rem)',
        '2xl': 'clamp(1.063rem, 0.978rem + 0.51vw, 1.381rem)',
        '3xl': 'clamp(1.275rem, 1.19rem + 0.77vw, 1.7rem)',
        '4xl': 'clamp(1.594rem, 1.403rem + 1.02vw, 2.231rem)',
        '5xl': 'clamp(1.913rem, 1.7rem + 1.7vw, 2.869rem)',
        '6xl': 'clamp(2.338rem, 2.125rem + 2.55vw, 3.825rem)',
        '7xl': 'clamp(2.763rem, 2.55rem + 3.4vw, 4.675rem)',
        
        // Display Sizes - للعناوين الضخمة - Reduced by 15%
        'display-sm': 'clamp(1.913rem, 1.7rem + 1.7vw, 2.869rem)',
        'display-md': 'clamp(2.55rem, 2.125rem + 3.4vw, 4.144rem)',
        'display-lg': 'clamp(3.188rem, 2.55rem + 5.1vw, 5.738rem)',
        
        // Fixed sizes for specific use cases - من tokens.ts
        'xs-fixed': tokens.typography.fontSizeFixed.xs,
        'sm-fixed': tokens.typography.fontSizeFixed.sm,
        'base-fixed': tokens.typography.fontSizeFixed.base,
      },
      lineHeight: {
        ...tokens.typography.lineHeight,
        // Enhanced line heights for Arabic text
        tight: '1.25',
        snug: '1.4',
        normal: '1.5',
        relaxed: '1.7',
        loose: '1.85',
        'extra-loose': '2',
        display: '1.15',
      },
      fontWeight: tokens.typography.fontWeight,
      letterSpacing: tokens.typography.letterSpacing,

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
      // RTL-Safe Animations - حركات آمنة مع RTL
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        'slide-in': 'slide-in 0.5s ease-out forwards',
        'slide-in-rtl': 'slide-in-rtl 0.5s ease-out forwards',
        'brutalist-press': 'brutalist-press 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'scale-in': 'scale-in 0.2s ease-out forwards',
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
        'slide-in-rtl': {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'brutalist-press': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(4px, 4px)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    // Custom RTL plugin for logical properties
    function({ addUtilities, addBase, theme }: any) {
      addBase({
        // Ensure RTL is set on html element
        'html[dir="rtl"]': {
          direction: 'rtl',
        },
        // Prevent layout shift during loading
        'html, body': {
          overflowX: 'hidden',
        },
        // Isolate Framer Motion animations
        '[data-framer-motion]': {
          isolation: 'isolate',
        },
      });
      
      // RTL-safe utilities using logical properties
      addUtilities({
        // Logical margin utilities
        '.ms-auto': {
          'margin-inline-start': 'auto',
        },
        '.me-auto': {
          'margin-inline-end': 'auto',
        },
        // Logical padding utilities
        '.ps-0': {
          'padding-inline-start': '0',
        },
        '.pe-0': {
          'padding-inline-end': '0',
        },
        // Prevent overflow issues
        '.overflow-x-safe': {
          'overflow-x': 'hidden',
          'overscroll-behavior-x': 'contain',
        },
        // Isolate animations
        '.motion-isolate': {
          isolation: 'isolate',
          'contain': 'layout style paint',
        },
        // Text balance for better readability
        '.text-balance': {
          'text-wrap': 'balance',
        },
      });
    },
  ],
};