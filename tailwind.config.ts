/** @type {import('tailwindcss').Config} */
import tokens from './src/tokens';

// MODERN FLAT DESIGN SYSTEM - 2025
// Clean, elegant, and professional design system for Khatwa Learning Platform
// Focus on accessibility, smooth animations, and modern UI patterns

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/core.css',
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
        
        // Glow Effects - Light-Tech Enhanced
        'glow-primary-xs': tokens.shadows.glow.primary.xs,
        'glow-primary-sm': tokens.shadows.glow.primary.sm,
        'glow-primary': tokens.shadows.glow.primary.DEFAULT,
        'glow-primary-md': tokens.shadows.glow.primary.md,
        'glow-primary-lg': tokens.shadows.glow.primary.lg,
        'glow-primary-xl': tokens.shadows.glow.primary.xl,
        'glow-primary-2xl': tokens.shadows.glow.primary['2xl'],
        
        'glow-accent-xs': tokens.shadows.glow.accent.xs,
        'glow-accent-sm': tokens.shadows.glow.accent.sm,
        'glow-accent': tokens.shadows.glow.accent.DEFAULT,
        'glow-accent-md': tokens.shadows.glow.accent.md,
        'glow-accent-lg': tokens.shadows.glow.accent.lg,
        'glow-accent-xl': tokens.shadows.glow.accent.xl,
        'glow-accent-2xl': tokens.shadows.glow.accent['2xl'],
        
        'glow-success-sm': tokens.shadows.glow.success.sm,
        'glow-success': tokens.shadows.glow.success.DEFAULT,
        'glow-success-md': tokens.shadows.glow.success.md,
        'glow-success-lg': tokens.shadows.glow.success.lg,
        
        'glow-warning-sm': tokens.shadows.glow.warning.sm,
        'glow-warning': tokens.shadows.glow.warning.DEFAULT,
        'glow-warning-md': tokens.shadows.glow.warning.md,
        'glow-warning-lg': tokens.shadows.glow.warning.lg,
        
        'glow-error-sm': tokens.shadows.glow.error.sm,
        'glow-error': tokens.shadows.glow.error.DEFAULT,
        'glow-error-md': tokens.shadows.glow.error.md,
        'glow-error-lg': tokens.shadows.glow.error.lg,
        
        // Border Glow
        'glow-border-primary': tokens.shadows.glow.border.primary,
        'glow-border-accent': tokens.shadows.glow.border.accent,
        'glow-border-subtle': tokens.shadows.glow.border.subtle,
        'glow-border-strong': tokens.shadows.glow.border.strong,
        
        // Elevation System - Light-Tech Enhanced
        'elevation-0': tokens.shadows.elevation[0],
        'elevation-1': tokens.shadows.elevation[1],
        'elevation-2': tokens.shadows.elevation[2],
        'elevation-3': tokens.shadows.elevation[3],
        'elevation-4': tokens.shadows.elevation[4],
        'elevation-5': tokens.shadows.elevation[5],
        'elevation-6': tokens.shadows.elevation[6],
        'elevation-7': tokens.shadows.elevation[7],
        'elevation-8': tokens.shadows.elevation[8],
        
        // Blending Layer Shadows
        'blend-legacy': 'var(--card-legacy-shadow)',
        'blend-modern': 'var(--card-legacy-hover-shadow), var(--card-legacy-glow)',
        'blend-legacy-hover': 'var(--card-legacy-hover-shadow), var(--card-legacy-glow)',
        'blend-button-hover': 'var(--btn-legacy-primary-hover), var(--btn-legacy-primary-glow)',
        'blend-nav-dropdown': 'var(--nav-legacy-dropdown-shadow)',
        'blend-nav-dropdown-hover': 'var(--nav-legacy-dropdown-hover-shadow)',
      },

      borderRadius: {
        ...tokens.radius,
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      fontSize: {
        // Responsive Typography - Fluid Typography with clamp() - Increased by 25% for better readability
        xs: 'clamp(0.664rem, 0.638rem + 0.21vw, 0.798rem)',
        sm: 'clamp(0.798rem, 0.744rem + 0.26vw, 0.93rem)',
        base: 'clamp(0.93rem, 0.85rem + 0.26vw, 1.063rem)',
        lg: 'clamp(1.063rem, 0.956rem + 0.33vw, 1.195rem)',
        xl: 'clamp(1.195rem, 1.063rem + 0.43vw, 1.461rem)',
        '2xl': 'clamp(1.329rem, 1.223rem + 0.64vw, 1.726rem)',
        '3xl': 'clamp(1.594rem, 1.488rem + 0.96vw, 2.125rem)',
        '4xl': 'clamp(1.993rem, 1.754rem + 1.28vw, 2.789rem)',
        '5xl': 'clamp(2.391rem, 2.125rem + 2.13vw, 3.586rem)',
        '6xl': 'clamp(2.923rem, 2.656rem + 3.19vw, 4.781rem)',
        '7xl': 'clamp(3.454rem, 3.188rem + 4.25vw, 5.844rem)',
        
        // Display Sizes - للعناوين الضخمة - Increased by 25%
        'display-sm': 'clamp(2.391rem, 2.125rem + 2.13vw, 3.586rem)',
        'display-md': 'clamp(3.188rem, 2.656rem + 4.25vw, 5.18rem)',
        'display-lg': 'clamp(3.985rem, 3.188rem + 6.38vw, 7.173rem)',
        
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
      letterSpacing: {
        ...tokens.typography.letterSpacing,
      },
      
      // Text Shadow - Light-Tech Enhanced
      textShadow: {
        none: tokens.typography.textShadow.none,
        sm: tokens.typography.textShadow.sm,
        md: tokens.typography.textShadow.md,
        lg: tokens.typography.textShadow.lg,
        primary: tokens.typography.textShadow.primary,
        accent: tokens.typography.textShadow.accent,
        glow: tokens.typography.textShadow.glow,
      },

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
        'float': 'float 20s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(-20px) translateX(10px)' },
          '66%': { transform: 'translateY(10px) translateX(-10px)' },
        },
      },

      // Background Image Utilities - Light-Tech Enhanced
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-light': 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15), transparent 50%), radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.15), transparent 50%), radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1), transparent 70%)',
        'mesh-dark': 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1), transparent 50%), radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.1), transparent 50%), radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.05), transparent 70%)',
        'grid-pattern': 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
        'dot-pattern': 'radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
        'diagonal-pattern': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0, 0, 0, 0.05) 10px, rgba(0, 0, 0, 0.05) 20px)',
        // Light-Tech Gradients
        'gradient-tech-surface': tokens.gradients['gradient-tech-surface'],
        'gradient-tech-elevated': tokens.gradients['gradient-tech-elevated'],
        'gradient-primary-soft': tokens.gradients['gradient-primary-soft'],
        'gradient-accent-soft': tokens.gradients['gradient-accent-soft'],
        'gradient-neutral-light': tokens.gradients['gradient-neutral-light'],
        'gradient-glass-light': tokens.gradients['gradient-glass-light'],
        // Blending Layer Gradients
        'blend-gradient': 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%)',
      },
      backgroundSize: {
        'pattern-grid': '50px 50px',
        'pattern-dots': '30px 30px',
        'pattern-diagonal': '20px 20px',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    // Custom plugin for Text Shadow utilities
    function({ addUtilities, theme }: any) {
      const textShadows = theme('textShadow') || {};
      const utilities: Record<string, any> = {};
      
      Object.keys(textShadows).forEach((key) => {
        utilities[`.text-shadow-${key}`] = {
          textShadow: textShadows[key],
        };
      });
      
      addUtilities(utilities);
    },
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
    // Blending Layer plugin for legacy component modernization
    function({ addComponents, addUtilities, theme }: any) {
      // Components - مكونات جاهزة للاستخدام
      addComponents({
        // Legacy Button Modernization
        '.btn-legacy-modern': {
          '@apply btn-primary': {},
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '0',
            background: 'var(--btn-legacy-shimmer)',
            transform: 'translateX(-100%)',
            transition: 'transform var(--duration-slow) var(--ease-out)',
            pointerEvents: 'none',
            zIndex: '1',
          },
          '&:hover::before': {
            transform: 'translateX(100%)',
          },
          '&:hover': {
            boxShadow: 'var(--btn-legacy-primary-hover), var(--btn-legacy-primary-glow)',
          },
        },
        // Legacy Card Modernization  
        '.card-legacy-modern': {
          '@apply card-base': {},
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '2px',
            background: 'var(--card-legacy-top-border)',
            opacity: '0',
            transition: 'opacity var(--duration-normal) var(--ease-out)',
            pointerEvents: 'none',
            zIndex: '1',
          },
          '&:hover::after': {
            opacity: '1',
          },
          '&:hover': {
            boxShadow: 'var(--card-legacy-hover-shadow), var(--card-legacy-glow)',
            borderColor: 'var(--card-legacy-hover-border)',
          },
        },
      });

      // Utilities - فئات مساعدة للاستخدام السريع
      addUtilities({
        // Blend Legacy Modern - تطبيق التحسينات الحديثة على المكونات القديمة
        '.blend-legacy-modern': {
          transition: 'var(--btn-legacy-transition)',
          willChange: 'box-shadow, border-color, transform',
          contain: 'layout style paint',
          '&:hover': {
            boxShadow: 'var(--card-legacy-hover-shadow), var(--card-legacy-glow)',
          },
        },
        // Blend Hover Glow - إضافة glow effect على hover
        '.blend-hover-glow': {
          transition: 'box-shadow var(--duration-normal) var(--ease-out)',
          willChange: 'box-shadow',
          '&:hover': {
            boxShadow: 'var(--shadow-elevation-3), var(--shadow-glow-primary-sm)',
          },
        },
        // Blend Smooth Transition - transitions سلسة للمكونات القديمة
        '.blend-smooth-transition': {
          transition: 'all var(--duration-normal) var(--ease-out)',
          willChange: 'auto',
        },
        // Blend Button Hover - تأثير hover محسّن للأزرار
        '.blend-button-hover': {
          '&:hover': {
            boxShadow: 'var(--btn-legacy-primary-hover), var(--btn-legacy-primary-glow)',
          },
        },
        // Blend Card Hover - تأثير hover محسّن للبطاقات
        '.blend-card-hover': {
          '&:hover': {
            boxShadow: 'var(--card-legacy-hover-shadow), var(--card-legacy-glow)',
            borderColor: 'var(--card-legacy-hover-border)',
          },
        },
        // Blend Nav Dropdown - تأثير محسّن للقوائم المنسدلة
        '.blend-nav-dropdown': {
          boxShadow: 'var(--nav-legacy-dropdown-shadow)',
          '&:hover': {
            boxShadow: 'var(--nav-legacy-dropdown-hover-shadow)',
            borderColor: 'var(--card-legacy-hover-border)',
          },
        },
      });
    },
  ],
};