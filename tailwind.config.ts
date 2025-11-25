import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import tailwindcssAnimate from 'tailwindcss-animate';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import tokens from './src/tokens';

const rtlSupport = plugin(({ addUtilities, addBase }) => {
  addBase({
    'html[dir="rtl"]': { direction: 'rtl' },
    'html[dir="ltr"]': { direction: 'ltr' },
  });
  addUtilities({
    '.rtl-flip': { transform: 'scaleX(-1)' },
    '.text-start': { textAlign: 'start' },
    '.text-end': { textAlign: 'end' },
  });
});

const arabicTypography = plugin(({ addBase }) => {
  addBase({
    'body, html': {
      fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',
      WebkitFontSmoothing: 'antialiased',
    },
    '[dir="rtl"] body': {
      fontFamily: 'var(--font-tajawal), Tajawal, system-ui, sans-serif',
      lineHeight: '1.7',
    },
  });
});

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './src/styles/core.css'],
  darkMode: 'class',
  important: false,
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      spacing: {
        ...tokens.spacing,
      },
      colors: {
        primary: {
          ...tokens.colors.primary,
          DEFAULT: tokens.colors.primary[500],
        },
        'academic-accent': {
          ...tokens.colors.academicAccent,
          DEFAULT: tokens.colors.academicAccent[500],
        },
        accent: {
          ...tokens.colors.accent,
          DEFAULT: tokens.colors.accent[500],
        },
        neutral: {
          ...tokens.colors.neutral,
        },
        success: tokens.colors.success,
        danger: tokens.colors.danger,
        warning: tokens.colors.warning,
        info: tokens.colors.info,
        background: {
          primary: tokens.colors.background.primary,
          alt: tokens.colors.background.alt,
          subtle: tokens.colors.background.subtle,
          DEFAULT: tokens.colors.background.primary,
        },
        text: tokens.colors.text,
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))',
      },
      fontFamily: {
        sans: ['var(--font-rubik)', 'Rubik', 'var(--font-tajawal)', 'Tajawal', 'system-ui', 'sans-serif'],
        heading: [
          'var(--font-noto-kufi-arabic)',
          'Noto Kufi Arabic',
          'var(--font-tajawal)',
          'Tajawal',
          'system-ui',
          'sans-serif',
        ],
        body: ['var(--font-tajawal)', 'Tajawal', 'var(--font-rubik)', 'Rubik', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-tajawal)', 'Tajawal', 'var(--font-cairo)', 'Cairo', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        none: '1',
        tight: '1.3',
        snug: '1.5',
        normal: '1.7',
        relaxed: '1.9',
        loose: '2.1',
      },
      borderRadius: {
        ...tokens.radius,
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        fadeInDown: 'fadeInDown 0.6s ease-out forwards',
        scaleIn: 'scaleIn 0.4s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
        'primary-sm': '0 2px 8px rgba(91, 54, 232, 0.15)',
        'primary-md': '0 4px 14px rgba(91, 54, 232, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        glass: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))',
        'glass-dark': 'linear-gradient(to bottom, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.6))',
      },
    },
  },
  plugins: [tailwindcssAnimate, forms, typography, rtlSupport, arabicTypography],
};

export default config;
