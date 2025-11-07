/** @type {import('tailwindcss').Config} */
import tokens from './src/tokens';

// MODERN FLAT DESIGN SYSTEM - 2025
// Clean, elegant, and professional design system for Khatwa Learning Platform
// Focus on accessibility, smooth animations, and modern UI patterns

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
      },
      screens: {
        'motion-safe': { 'prefers-reduced-motion': 'no-preference' },
        'motion-reduce': { 'prefers-reduced-motion': 'reduce' },
      },
      colors: {
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
          // Orange secondary for legacy compatibility
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
        },

        // Neutral gray palette for compatibility
        gray: tokens.colors.neutral,

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
        cairo: ['var(--font-cairo)', 'Cairo', 'system-ui', 'sans-serif'],
        
        // Generic Fonts - خطوط عامة
        arabic: ['var(--font-cairo)', 'Cairo', 'var(--font-inter)', 'Inter', 'Nunito Sans', 'system-ui', 'sans-serif'],
        english: ['var(--font-inter)', 'Inter', 'Roboto', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        
        // Inter and Nunito Sans for specific use
        inter: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        'nunito-sans': ['var(--font-nunito-sans)', 'Nunito Sans', 'system-ui', 'sans-serif'],
      },

      // Modern Border Width - clean and minimal
      borderWidth: {
        ...tokens.borderWidth,
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
      },

      borderRadius: {
        ...tokens.radius,
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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

      // Modern Motion - Smooth and elegant transitions
      transitionDuration: {
        ...tokens.motion.duration,
      },
      transitionTimingFunction: {
        ...tokens.motion.easing,
      },

      width: {
        ...tokens.iconSizes,
      },
      height: {
        ...tokens.iconSizes,
      },
      minWidth: tokens.touchTargets,
      minHeight: tokens.touchTargets,

      // Modern Animations - Smooth and elegant movements
      // RTL-Safe Animations - حركات آمنة مع RTL
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        'slide-in': 'slide-in 0.4s ease-out forwards',
        'slide-in-rtl': 'slide-in-rtl 0.4s ease-out forwards',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'scale-in': 'scale-in 0.2s ease-out forwards',
        'slide-up': 'slide-up 0.4s ease-out forwards',
        'slide-down': 'slide-down 0.4s ease-out forwards',
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
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          from: { transform: 'translateY(-20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
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