// ============================================
// 🎨 Design Tokens - منصة خطى التعليمية
// ============================================
// نظام تصميم موحد ومحسّن لتجربة مستخدم متسقة
// هذا هو الملف الوحيد لـ design tokens
// مرجع لـ CSS Variables في globals.css
// Arabic RTL Educational Platform (Accounting/Audit)

export const colors = {
  // ============================================
  // 🎨 نظام الألوان المحسّن (موحد مع globals.css)
  // ============================================
  // جميع الألوان هنا متزامنة مع CSS Variables في globals.css
  // للحصول على أفضل الأداء والتوافق

  // Primary Brand Colors - أزرق احترافي (slate)
  primaryBrand: {
    50: '#f7fafc', // slate-50 - خلفيات فاتحة
    100: '#f1f5f9', // slate-100
    200: '#e2e8f0', // slate-200
    300: '#cbd5e1', // slate-300
    400: '#94a3b8', // slate-400
    500: '#64748b', // slate-500
    600: '#475569', // slate-600 - أساسي
    700: '#334155', // slate-700 - ثانوي
    800: '#1e293b', // slate-800
    900: '#0f172a', // slate-900 - أغمق
  },

  // Secondary Colors - ألوان وظيفية للمحتوى التعليمي
  secondary: {
    learn: '#38a169', // green-500 - التعلم والنمو
    expert: '#3182ce', // blue-500 - الخبرة
    innovate: '#805ad5', // purple-500 - الابتكار
    secure: '#2d3748', // slate-700 - الأمان
  },

  // Background Colors - هرمية محسّنة للوضوح البصري
  background: {
    primary: '#ffffff', // أبيض نقي
    alt: '#f7fafc', // slate-50 - بديل خفيف
    subtle: '#edf2f7', // slate-100 - خفيف جداً
    surface: '#ffffff', // سطوح الكروت
    'surface-alt': '#f7fafc', // سطوح بديلة
    'surface-elevated': '#ffffff', // سطوح مرتفعة
  },

  // Text Colors - تباين محسّن لإمكانية القراءة
  text: {
    primary: '#1a202c', // slate-900 - نصوص أساسية
    secondary: '#4a5568', // slate-600 - نصوص ثانوية
    tertiary: '#718096', // slate-500 - نصوص ثالثية
    muted: '#a0aec0', // slate-400 - نصوص خافتة
  },

  // Status Colors - دلالية محسّنة للحالات المختلفة
  status: {
    success: '#38a169', // green-500
    'success-light': '#68d391', // green-400
    warning: '#d69e2e', // amber-500
    'warning-light': '#fbbf24', // amber-400
    error: '#e53e3e', // red-500
    'error-light': '#fc8181', // red-400
    info: '#3182ce', // blue-500
    'info-light': '#63b3ed', // blue-400
  },

  // Primary Palette - تدرج أزرق احترافي محسّن للعلامة التجارية
  primary: {
    50: '#f0f4ff', // أفتح درجة - للخلفيات الخفيفة
    100: '#e0e7ff', // خلفيات ثانوية
    200: '#c7d2fe', // حدود خفيفة
    300: '#a5b4fc', // عناصر غير نشطة
    400: '#818cf8', // عناصر ثانوية
    500: '#6366f1', // اللون الأساسي - الأزرار والروابط
    600: '#4f46e5', // hover states
    700: '#4338ca', // active states
    800: '#3730a3', // نصوص داكنة
    900: '#312e81', // أغمق درجة - عناوين
  },

  // Accent Palette - أزرق فاتح للتفاعلات والعناصر النشطة
  accent: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // اللون الرئيسي للتفاعلات
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Neutral Palette - رمادي متوازن للعناصر المحايدة
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a', // نصوص ثانوية
    600: '#52525b', // نصوص عادية
    700: '#3f3f46', // نصوص داكنة
    800: '#27272a',
    900: '#18181b', // أغمق درجة
  },

  // Semantic Colors - ألوان دلالية محسّنة للحالات الوظيفية
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // أخضر نجاح
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // أحمر خطر
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // برتقالي تحذير
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // أزرق معلومات
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Dark Mode Variants - ألوان الوضع المظلم المحسّنة
  dark: {
    primary: {
      50: '#312e81',
      100: '#3730a3',
      200: '#4338ca',
      300: '#4f46e5',
      400: '#6366f1',
      500: '#818cf8',
      600: '#a5b4fc',
      700: '#c7d2fe',
      800: '#e0e7ff',
      900: '#f0f4ff',
    },
    accent: {
      50: '#1e3a8a',
      100: '#1e40af',
      200: '#1d4ed8',
      300: '#2563eb',
      400: '#3b82f6',
      500: '#60a5fa',
      600: '#93c5fd',
      700: '#bfdbfe',
      800: '#dbeafe',
      900: '#eff6ff',
    },
    neutral: {
      50: '#18181b',
      100: '#27272a',
      200: '#3f3f46',
      300: '#52525b',
      400: '#71717a',
      500: '#a1a1aa',
      600: '#d4d4d8',
      700: '#e4e4e7',
      800: '#f4f4f5',
      900: '#fafafa',
    },
  },
};

// ============================================
// 📏 نظام المسافات الموحد (8px Grid System)
// ============================================

export const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px - الوحدة الأساسية
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  32: '8rem', // 128px
};

// ============================================
// 🔲 نظام Border Radius الموحد
// ============================================

export const radius = {
  none: '0',
  sm: '0.375rem', // 6px - عناصر صغيرة
  md: '0.5rem', // 8px - الحجم الافتراضي
  lg: '0.75rem', // 12px - بطاقات
  xl: '1rem', // 16px - مودالات
  '2xl': '1.5rem', // 24px - عناصر كبيرة
  '3xl': '2rem', // 32px - عناصر مميزة
  full: '9999px', // دائري كامل
};

// ============================================
// 🌑 نظام الظلال المحسّن (Enhanced Shadows)
// ============================================

export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',

  // Colored shadows for interactive elements
  primary: '0 4px 12px rgba(99, 102, 241, 0.3)',
  accent: '0 4px 12px rgba(59, 130, 246, 0.3)',
  success: '0 4px 12px rgba(34, 197, 94, 0.3)',
  warning: '0 4px 12px rgba(245, 158, 11, 0.3)',
  error: '0 4px 12px rgba(239, 68, 68, 0.3)',

  // Glow effects
  glow: {
    primary: '0 0 20px rgba(99, 102, 241, 0.5)',
    accent: '0 0 20px rgba(59, 130, 246, 0.5)',
    success: '0 0 20px rgba(34, 197, 94, 0.5)',
    warning: '0 0 20px rgba(245, 158, 11, 0.5)',
    error: '0 0 20px rgba(239, 68, 68, 0.5)',
  },
};

// ============================================
// ⚡ نظام الحركة والانتقالات المحسّن
// ============================================

export const motion = {
  // ⚡ نظام الحركة والانتقالات المحسّن - موحد مع globals.css
  // ملاحظة: هذه القيم متزامنة مع CSS Variables في globals.css:
  // --duration-instant, --duration-fast, --duration-normal, --duration-slow, --duration-slower
  // --ease-linear, --ease-in, --ease-out, --ease-in-out, --ease-bounce, --ease-smooth

  duration: {
    instant: '75ms', // --duration-instant
    fast: '150ms', // --duration-fast
    normal: '200ms', // --duration-normal
    slow: '300ms', // --duration-slow
    slower: '500ms', // --duration-slower
  },

  easing: {
    linear: 'linear', // --ease-linear
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)', // --ease-in
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)', // --ease-out
    easeInOut: 'cubic-bezier(0, 0, 0.2, 1)', // --ease-in-out
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // --ease-bounce
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // --ease-smooth
  },

  // Predefined animations
  animations: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    slideDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    bounceIn: {
      initial: { opacity: 0, scale: 0.3 },
      animate: { opacity: 1, scale: 1 },
      transition: {
        duration: 0.5,
        ease: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
};

// ============================================
// 📝 نظام الطباعة المحسّن
// ============================================

export const typography = {
  // Font Sizes
  xs: '0.75rem', // 12px
  sm: '0.875rem', // 14px
  base: '1rem', // 16px - الحجم الافتراضي
  lg: '1.125rem', // 18px
  xl: '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem', // 48px
  '6xl': '3.75rem', // 60px
  '7xl': '4.5rem', // 72px

  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '1.75', // محسّن للعربية
  },

  // Font Weights
  fontWeight: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
};

// ============================================
// 🎯 أحجام الأيقونات الموحدة
// ============================================

export const iconSizes = {
  xs: '1rem', // 16px
  sm: '1.25rem', // 20px
  md: '1.5rem', // 24px - الحجم الافتراضي
  lg: '2rem', // 32px
  xl: '2.5rem', // 40px
};

// ============================================
// 🖱️ أحجام مناطق النقر (Touch Targets)
// ============================================

export const touchTargets = {
  min: '44px', // الحد الأدنى حسب WCAG 2.1
  comfortable: '48px',
  spacious: '56px',
};

// ============================================
// 📦 Default Export - جميع التوكنات
// ============================================

export default {
  colors,
  spacing,
  radius,
  shadows,
  motion,
  typography,
  iconSizes,
  touchTargets,
};
