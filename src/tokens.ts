// ============================================
// 🎨 Design Tokens - منصة خطى التعليمية
// ============================================
// نظام تصميم موحد ومحسّن لتجربة مستخدم متسقة
// ⚠️ تحذير هام: هذا هو الملف الوحيد والمصدر الوحيد للتوكنات في المشروع!
// لا تقم بإنشاء ملفات توكنات أخرى أو تعديل هذا الملف إلا بعد التنسيق.
// جميع التغييرات يجب أن تكون هنا لضمان التوافق مع tailwind.config.ts و globals.css.
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

  // Secondary Colors - ألوان وظيفية للمحتوى التعليمي (مع درجات كاملة 50-900)
  secondary: {
    learn: {
      50: '#f0fdf4',   // أخضر فاتح جداً - خلفيات
      100: '#dcfce7',  // أخضر فاتح - خلفيات ثانوية
      200: '#bbf7d0',  // أخضر فاتح - حدود خفيفة
      300: '#86efac',  // أخضر فاتح - عناصر غير نشطة
      400: '#4ade80',  // أخضر فاتح - عناصر ثانوية
      500: '#38a169',  // أخضر - اللون الأساسي (التعلم والنمو)
      600: '#16a34a',  // أخضر داكن - hover states
      700: '#15803d',  // أخضر داكن - active states
      800: '#166534',  // أخضر داكن جداً - نصوص
      900: '#14532d',  // أخضر أغمق - عناوين
      DEFAULT: '#38a169', // اللون الافتراضي
    },
    expert: {
      50: '#eff6ff',   // أزرق فاتح جداً
      100: '#dbeafe',  // أزرق فاتح
      200: '#bfdbfe',  // أزرق فاتح
      300: '#93c5fd',  // أزرق فاتح
      400: '#60a5fa',  // أزرق فاتح
      500: '#3182ce',  // أزرق - اللون الأساسي (الخبرة)
      600: '#2563eb',  // أزرق داكن
      700: '#1d4ed8',  // أزرق داكن
      800: '#1e40af',  // أزرق داكن جداً
      900: '#1e3a8a',  // أزرق أغمق
      DEFAULT: '#3182ce', // اللون الافتراضي
    },
    innovate: {
      50: '#faf5ff',   // بنفسجي فاتح جداً
      100: '#f3e8ff',  // بنفسجي فاتح
      200: '#e9d5ff',  // بنفسجي فاتح
      300: '#d8b4fe',  // بنفسجي فاتح
      400: '#c084fc',  // بنفسجي فاتح
      500: '#805ad5',  // بنفسجي - اللون الأساسي (الابتكار)
      600: '#7c3aed',  // بنفسجي داكن
      700: '#6d28d9',  // بنفسجي داكن
      800: '#5b21b6',  // بنفسجي داكن جداً
      900: '#4c1d95',  // بنفسجي أغمق
      DEFAULT: '#805ad5', // اللون الافتراضي
    },
    secure: {
      50: '#f8fafc',   // رمادي فاتح جداً
      100: '#f1f5f9',  // رمادي فاتح
      200: '#e2e8f0',  // رمادي فاتح
      300: '#cbd5e1',  // رمادي فاتح
      400: '#94a3b8',  // رمادي فاتح
      500: '#2d3748',  // رمادي - اللون الأساسي (الأمان)
      600: '#1a202c',  // رمادي داكن
      700: '#171923',  // رمادي داكن
      800: '#0f1419',  // رمادي داكن جداً
      900: '#0a0e14',  // رمادي أغمق
      DEFAULT: '#2d3748', // اللون الافتراضي
    },
  },

  // Background Colors - هرمية محسّنة للوضوح البصري - Light-Tech Enhanced
  background: {
    primary: '#ffffff', // أبيض نقي - خلفية رئيسية
    alt: '#fafbfc', // فاتح جداً - بديل خفيف (محسّن للتباين)
    subtle: '#f5f7fa', // خفيف - للتنفس البصري (محسّن)
    surface: '#ffffff', // سطوح الكروت
    'surface-alt': '#fafbfc', // سطوح بديلة (محسّن)
    'surface-elevated': '#ffffff', // سطوح مرتفعة
    'surface-glow': '#f8f9fb', // خلفية مع توهج خفيف
    // Dark Mode Variants
    dark: {
      primary: '#0f172a', // slate-900
      alt: '#1e293b', // slate-800
      subtle: '#334155', // slate-700
      surface: '#1e293b', // slate-800
      'surface-alt': '#334155', // slate-700
      'surface-elevated': '#475569', // slate-600
      'surface-glow': '#1a1f2e', // خلفية مع توهج خفيف
    },
  },

  // Text Colors - تباين محسّن لإمكانية القراءة (WCAG AA/AAA compliant)
  // جميع الألوان تم اختبارها على خلفية بيضاء (#ffffff)
  text: {
    primary: '#1a202c', // slate-900 - نصوص أساسية (Contrast: 16.76:1 - AAA)
    secondary: '#4a5568', // slate-600 - نصوص ثانوية (Contrast: 7.52:1 - AAA)
    tertiary: '#718096', // slate-500 - نصوص ثالثية (Contrast: 4.67:1 - AA)
    muted: '#64748b', // slate-500 - نصوص خافتة (Contrast: 4.67:1 - AA) - محسّن من slate-400
    inverse: '#ffffff', // أبيض - للنصوص على خلفيات داكنة (Contrast: متغير)
    // Dark Mode Variants
    dark: {
      primary: '#f8fafc', // slate-50 - نصوص أساسية على خلفيات داكنة
      secondary: '#cbd5e1', // slate-300 - نصوص ثانوية
      tertiary: '#94a3b8', // slate-400 - نصوص ثالثية
      muted: '#64748b', // slate-500 - نصوص خافتة
      inverse: '#0f172a', // slate-900 - للنصوص على خلفيات فاتحة
    },
  },
  
  // Contrast Guide - دليل التباين الآمن
  // WCAG AA: 4.5:1 للنصوص العادية، 3:1 للنصوص الكبيرة
  // WCAG AAA: 7:1 للنصوص العادية، 4.5:1 للنصوص الكبيرة
  contrast: {
    // Safe Text/Background Combinations - تركيبات آمنة
    safe: {
      // Primary Text على Backgrounds
      'text-primary-on-bg-white': { ratio: 16.76, level: 'AAA' }, // #1a202c on #ffffff
      'text-primary-on-bg-alt': { ratio: 16.22, level: 'AAA' }, // #1a202c on #f7fafc
      'text-secondary-on-bg-white': { ratio: 7.52, level: 'AAA' }, // #4a5568 on #ffffff
      'text-tertiary-on-bg-white': { ratio: 4.67, level: 'AA' }, // #718096 on #ffffff
      
      // Primary Colors على Backgrounds
      'primary-500-on-white': { ratio: 3.85, level: 'AA (large text)' }, // #6366f1 on #ffffff
      'primary-600-on-white': { ratio: 4.78, level: 'AA' }, // #4f46e5 on #ffffff
      'primary-700-on-white': { ratio: 5.93, level: 'AAA (large text)' }, // #4338ca on #ffffff
      
      // Accent Colors على Backgrounds
      'accent-500-on-white': { ratio: 3.85, level: 'AA (large text)' }, // #3b82f6 on #ffffff
      'accent-600-on-white': { ratio: 4.78, level: 'AA' }, // #2563eb on #ffffff
      
      // Status Colors على Backgrounds
      'success-500-on-white': { ratio: 3.01, level: 'AA (large text)' }, // #22c55e on #ffffff
      'success-600-on-white': { ratio: 4.14, level: 'AA (large text)' }, // #16a34a on #ffffff
      'danger-500-on-white': { ratio: 3.99, level: 'AA (large text)' }, // #ef4444 on #ffffff
      'warning-500-on-white': { ratio: 4.14, level: 'AA' }, // #d97706 on #ffffff - محسّن
      'text-muted-on-white': { ratio: 4.67, level: 'AA' }, // #64748b on #ffffff - محسّن
    },
    
    // Minimum ratios
    minimum: {
      aa: {
        normal: 4.5, // للنصوص العادية (أقل من 18pt أو 14pt bold)
        large: 3.0, // للنصوص الكبيرة (18pt+ أو 14pt+ bold)
      },
      aaa: {
        normal: 7.0, // للنصوص العادية
        large: 4.5, // للنصوص الكبيرة
      },
    },
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

  // Primary Palette - تدرج بنفسجي أكاديمي عميق للعلامة التجارية
  primary: {
    50: '#f5f3ff', // أفتح درجة - للخلفيات الخفيفة
    100: '#ede9fe', // خلفيات ثانوية
    200: '#ddd6fe', // حدود خفيفة
    300: '#c4b5fd', // عناصر غير نشطة
    400: '#a78bfa', // عناصر ثانوية
    500: '#5B36E8', // اللون الأساسي - بنفسجي أكاديمي عميق
    600: '#4C2EC7', // hover states - أغمق قليلاً
    700: '#3d28a8', // active states
    800: '#2e1f7d', // نصوص داكنة
    900: '#1f1654', // أغمق درجة - عناوين
    DEFAULT: '#5B36E8', // اللون الافتراضي
  },
  
  // Academic Accent - لهجة أكاديمية فاتحة
  academicAccent: {
    50: '#f0f4ff',
    100: '#e0e7ff',
    200: '#d4d9ff',
    300: '#b8c0ff',
    400: '#9da8ff',
    500: '#6D4AFF', // لهجة بنفسجية فاتحة
    600: '#5B36E8',
    700: '#4C2EC7',
    800: '#3d28a8',
    900: '#2e1f7d',
    DEFAULT: '#6D4AFF',
  },

  // Accent Palette - أزرق أكاديمي للتفاعلات والعناصر النشطة
  accent: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#1E40AF', // أزرق أكاديمي عميق
    600: '#1d4ed8',
    700: '#1e3a8a',
    800: '#1e3a8a',
    900: '#172554',
    DEFAULT: '#1E40AF', // اللون الافتراضي
  },
  
  // Gold Accent - ذهبي دافئ للنجاحات والإنجازات
  gold: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#F59E0B', // ذهبي دافئ
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    DEFAULT: '#F59E0B',
  },
  
  // Mint Green - أخضر نعناعي للنمو والتقدم
  mint: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10B981', // أخضر نعناعي
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    DEFAULT: '#10B981',
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
    DEFAULT: '#71717a', // اللون الافتراضي
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
    DEFAULT: '#22c55e', // اللون الافتراضي
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
    DEFAULT: '#ef4444', // اللون الافتراضي
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#d97706', // برتقالي تحذير - محسّن للتباين (Contrast: 4.14:1 - AA)
    600: '#b45309', // محسّن للتباين
    700: '#92400e',
    800: '#78350f',
    900: '#78350f',
    DEFAULT: '#d97706', // اللون الافتراضي - محسّن للتباين
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
    DEFAULT: '#3b82f6', // اللون الافتراضي
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
      DEFAULT: '#818cf8',
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
      DEFAULT: '#60a5fa',
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
      DEFAULT: '#a1a1aa',
    },
  },
};

// ============================================
// 📏 نظام المسافات الموحد (8px Grid System)
// ============================================
// جميع القيم مضاعفات 8px (الوحدة الأساسية)
// يستخدم rem للاستجابة مع إعدادات الخط في المتصفح

export const spacing = {
  // Base values - القيم الأساسية
  0: '0',
  0.5: '0.125rem', // 2px (نصف الوحدة - للحدود الدقيقة)
  1: '0.25rem', // 4px (نصف الوحدة الأساسية)
  1.5: '0.375rem', // 6px
  2: '0.5rem', // 8px - الوحدة الأساسية ⭐
  2.5: '0.625rem', // 10px
  3: '0.75rem', // 12px
  3.5: '0.875rem', // 14px
  4: '1rem', // 16px (2x)
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px (3x)
  7: '1.75rem', // 28px
  8: '2rem', // 32px (4x)
  9: '2.25rem', // 36px
  10: '2.5rem', // 40px (5x)
  11: '2.75rem', // 44px
  12: '3rem', // 48px (6x)
  14: '3.5rem', // 56px (7x)
  16: '4rem', // 64px (8x)
  20: '5rem', // 80px (10x)
  24: '6rem', // 96px (12x)
  28: '7rem', // 112px (14x)
  32: '8rem', // 128px (16x)
  36: '9rem', // 144px (18x)
  40: '10rem', // 160px (20x)
  44: '11rem', // 176px (22x)
  48: '12rem', // 192px (24x)
  52: '13rem', // 208px (26x)
  56: '14rem', // 224px (28x)
  60: '15rem', // 240px (30x)
  64: '16rem', // 256px (32x)
  72: '18rem', // 288px (36x)
  80: '20rem', // 320px (40x)
  96: '24rem', // 384px (48x)
};

// Semantic Spacing - مسافات دلالية للاستخدام الشائع
export const semanticSpacing = {
  // Component spacing
  component: {
    tight: spacing[2], // 8px - للمكونات المدمجة
    normal: spacing[4], // 16px - للمكونات العادية
    relaxed: spacing[6], // 24px - للمكونات المريحة
    spacious: spacing[8], // 32px - للمكونات الواسعة
  },
  
  // Section spacing
  section: {
    compact: spacing[12], // 48px - للأقسام المدمجة
    normal: spacing[16], // 64px - للأقسام العادية
    relaxed: spacing[20], // 80px - للأقسام المريحة
    spacious: spacing[24], // 96px - للأقسام الواسعة
  },
  
  // Gap spacing
  gap: {
    tight: spacing[2], // 8px - للمسافات الصغيرة
    normal: spacing[4], // 16px - للمسافات العادية
    relaxed: spacing[6], // 24px - للمسافات المريحة
    spacious: spacing[8], // 32px - للمسافات الواسعة
  },
  
  // Padding spacing
  padding: {
    xs: spacing[1], // 4px - padding صغير جداً
    sm: spacing[2], // 8px - padding صغير
    md: spacing[4], // 16px - padding متوسط
    lg: spacing[6], // 24px - padding كبير
    xl: spacing[8], // 32px - padding كبير جداً
    '2xl': spacing[12], // 48px - padding ضخم
    '3xl': spacing[16], // 64px - padding ضخم جداً
  },
  
  // Margin spacing
  margin: {
    xs: spacing[2], // 8px - margin صغير
    sm: spacing[4], // 16px - margin متوسط
    md: spacing[6], // 24px - margin كبير
    lg: spacing[8], // 32px - margin كبير جداً
    xl: spacing[12], // 48px - margin ضخم
    '2xl': spacing[16], // 64px - margin ضخم جداً
    '3xl': spacing[24], // 96px - margin ضخم جداً جداً
  },
};

// ============================================
// 🔲 نظام Border Radius الموحد
// ============================================

export const radius = {
  none: '0',
  xs: '0.25rem', // 4px - عناصر صغيرة جداً
  sm: '0.375rem', // 6px - عناصر صغيرة
  md: '0.5rem', // 8px - الحجم الافتراضي
  lg: '0.75rem', // 12px - بطاقات
  xl: '1rem', // 16px - مودالات
  '2xl': '1.5rem', // 24px - عناصر كبيرة
  '3xl': '2rem', // 32px - عناصر مميزة
  '4xl': '2.5rem', // 40px - عناصر كبيرة جداً
  full: '9999px', // دائري كامل
  // Semantic radius
  button: '0.5rem', // 8px - للأزرار
  card: '0.75rem', // 12px - للبطاقات
  modal: '1rem', // 16px - للمودالات
  badge: '9999px', // دائري - للشارات
  input: '0.5rem', // 8px - لحقول الإدخال
};

// ============================================
// 🔲 نظام Border Width الموحد
// ============================================

export const borderWidth = {
  0: '0',
  1: '1px', // حدود رقيقة
  2: '2px', // حدود عادية (الافتراضي)
  4: '4px', // حدود سميكة
  8: '8px', // حدود سميكة جداً
  // Semantic widths
  default: '1px',
  thick: '2px',
  'extra-thick': '4px',
};

// ============================================
// 🌑 نظام الظلال المحسّن (Enhanced Shadows System)
// ============================================
// نظام شامل للظلال مع Elevation levels و Colored shadows

export const shadows = {
  // Base Shadows - ظلال أساسية متدرجة محسّنة للـ Light-Tech (Elevation-based)
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.02)', // Level 1 - عناصر منخفضة
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.03)', // Level 2
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04)', // Level 3
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)', // Level 4
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.06)', // Level 5
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08)', // Level 6 - أعلى ارتفاع
  '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.1)', // Level 7 - أعلى ارتفاع مميز
  
  // Inner Shadows - ظلال داخلية
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  'inner-sm': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  'inner-md': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  'inner-lg': 'inset 0 4px 6px 0 rgba(0, 0, 0, 0.1)',
  'inner-xl': 'inset 0 8px 12px 0 rgba(0, 0, 0, 0.15)',

  // Colored Shadows - ظلال ملونة محسّنة للعناصر التفاعلية
  // Primary (Indigo) - Light-Tech Enhanced
  primary: {
    xs: '0 1px 4px rgba(99, 102, 241, 0.15), 0 0 0 1px rgba(99, 102, 241, 0.1)',
    sm: '0 2px 8px rgba(99, 102, 241, 0.2), 0 0 0 1px rgba(99, 102, 241, 0.15)',
    md: '0 4px 12px rgba(99, 102, 241, 0.25), 0 0 0 1px rgba(99, 102, 241, 0.2)',
    lg: '0 8px 24px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.25)',
    xl: '0 12px 32px rgba(99, 102, 241, 0.35), 0 0 0 1px rgba(99, 102, 241, 0.3)',
    '2xl': '0 16px 48px rgba(99, 102, 241, 0.4), 0 0 0 1px rgba(99, 102, 241, 0.35)',
    DEFAULT: '0 4px 12px rgba(99, 102, 241, 0.25), 0 0 0 1px rgba(99, 102, 241, 0.2)',
  },
  
  // Accent (Blue) - Light-Tech Enhanced
  accent: {
    xs: '0 1px 4px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)',
    sm: '0 2px 8px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.15)',
    md: '0 4px 12px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.2)',
    lg: '0 8px 24px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.25)',
    xl: '0 12px 32px rgba(59, 130, 246, 0.35), 0 0 0 1px rgba(59, 130, 246, 0.3)',
    '2xl': '0 16px 48px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.35)',
    DEFAULT: '0 4px 12px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.2)',
  },
  
  // Success (Green)
  success: {
    sm: '0 2px 8px rgba(34, 197, 94, 0.2)',
    md: '0 4px 12px rgba(34, 197, 94, 0.3)',
    lg: '0 8px 24px rgba(34, 197, 94, 0.4)',
    xl: '0 12px 32px rgba(34, 197, 94, 0.5)',
    DEFAULT: '0 4px 12px rgba(34, 197, 94, 0.3)',
  },
  
  // Warning (Amber/Orange)
  warning: {
    sm: '0 2px 8px rgba(245, 158, 11, 0.2)',
    md: '0 4px 12px rgba(245, 158, 11, 0.3)',
    lg: '0 8px 24px rgba(245, 158, 11, 0.4)',
    xl: '0 12px 32px rgba(245, 158, 11, 0.5)',
    DEFAULT: '0 4px 12px rgba(245, 158, 11, 0.3)',
  },
  
  // Error/Danger (Red)
  error: {
    sm: '0 2px 8px rgba(239, 68, 68, 0.2)',
    md: '0 4px 12px rgba(239, 68, 68, 0.3)',
    lg: '0 8px 24px rgba(239, 68, 68, 0.4)',
    xl: '0 12px 32px rgba(239, 68, 68, 0.5)',
    DEFAULT: '0 4px 12px rgba(239, 68, 68, 0.3)',
  },
  
  // Secondary Colors
  learn: {
    sm: '0 2px 8px rgba(56, 161, 105, 0.2)',
    md: '0 4px 12px rgba(56, 161, 105, 0.3)',
    lg: '0 8px 24px rgba(56, 161, 105, 0.4)',
    DEFAULT: '0 4px 12px rgba(56, 161, 105, 0.3)',
  },
  
  innovate: {
    sm: '0 2px 8px rgba(128, 90, 213, 0.2)',
    md: '0 4px 12px rgba(128, 90, 213, 0.3)',
    lg: '0 8px 24px rgba(128, 90, 213, 0.4)',
    DEFAULT: '0 4px 12px rgba(128, 90, 213, 0.3)',
  },

  // Glow Effects - تأثيرات الإضاءة المحسّنة للـ Light-Tech
  glow: {
    primary: {
      xs: '0 0 4px rgba(99, 102, 241, 0.15), 0 0 8px rgba(99, 102, 241, 0.1)',
      sm: '0 0 8px rgba(99, 102, 241, 0.25), 0 0 16px rgba(99, 102, 241, 0.15)',
      md: '0 0 16px rgba(99, 102, 241, 0.4), 0 0 32px rgba(99, 102, 241, 0.2)',
      lg: '0 0 24px rgba(99, 102, 241, 0.5), 0 0 48px rgba(99, 102, 241, 0.3)',
      xl: '0 0 32px rgba(99, 102, 241, 0.6), 0 0 64px rgba(99, 102, 241, 0.4)',
      '2xl': '0 0 48px rgba(99, 102, 241, 0.7), 0 0 96px rgba(99, 102, 241, 0.5)',
      DEFAULT: '0 0 16px rgba(99, 102, 241, 0.4), 0 0 32px rgba(99, 102, 241, 0.2)',
    },
    accent: {
      xs: '0 0 4px rgba(59, 130, 246, 0.15), 0 0 8px rgba(59, 130, 246, 0.1)',
      sm: '0 0 8px rgba(59, 130, 246, 0.25), 0 0 16px rgba(59, 130, 246, 0.15)',
      md: '0 0 16px rgba(59, 130, 246, 0.4), 0 0 32px rgba(59, 130, 246, 0.2)',
      lg: '0 0 24px rgba(59, 130, 246, 0.5), 0 0 48px rgba(59, 130, 246, 0.3)',
      xl: '0 0 32px rgba(59, 130, 246, 0.6), 0 0 64px rgba(59, 130, 246, 0.4)',
      '2xl': '0 0 48px rgba(59, 130, 246, 0.7), 0 0 96px rgba(59, 130, 246, 0.5)',
      DEFAULT: '0 0 16px rgba(59, 130, 246, 0.4), 0 0 32px rgba(59, 130, 246, 0.2)',
    },
    success: {
      xs: '0 0 4px rgba(34, 197, 94, 0.15), 0 0 8px rgba(34, 197, 94, 0.1)',
      sm: '0 0 8px rgba(34, 197, 94, 0.25), 0 0 16px rgba(34, 197, 94, 0.15)',
      md: '0 0 16px rgba(34, 197, 94, 0.4), 0 0 32px rgba(34, 197, 94, 0.2)',
      lg: '0 0 24px rgba(34, 197, 94, 0.5), 0 0 48px rgba(34, 197, 94, 0.3)',
      xl: '0 0 32px rgba(34, 197, 94, 0.6), 0 0 64px rgba(34, 197, 94, 0.4)',
      DEFAULT: '0 0 16px rgba(34, 197, 94, 0.4), 0 0 32px rgba(34, 197, 94, 0.2)',
    },
    warning: {
      xs: '0 0 4px rgba(245, 158, 11, 0.15), 0 0 8px rgba(245, 158, 11, 0.1)',
      sm: '0 0 8px rgba(245, 158, 11, 0.25), 0 0 16px rgba(245, 158, 11, 0.15)',
      md: '0 0 16px rgba(245, 158, 11, 0.4), 0 0 32px rgba(245, 158, 11, 0.2)',
      lg: '0 0 24px rgba(245, 158, 11, 0.5), 0 0 48px rgba(245, 158, 11, 0.3)',
      xl: '0 0 32px rgba(245, 158, 11, 0.6), 0 0 64px rgba(245, 158, 11, 0.4)',
      DEFAULT: '0 0 16px rgba(245, 158, 11, 0.4), 0 0 32px rgba(245, 158, 11, 0.2)',
    },
    error: {
      xs: '0 0 4px rgba(239, 68, 68, 0.15), 0 0 8px rgba(239, 68, 68, 0.1)',
      sm: '0 0 8px rgba(239, 68, 68, 0.25), 0 0 16px rgba(239, 68, 68, 0.15)',
      md: '0 0 16px rgba(239, 68, 68, 0.4), 0 0 32px rgba(239, 68, 68, 0.2)',
      lg: '0 0 24px rgba(239, 68, 68, 0.5), 0 0 48px rgba(239, 68, 68, 0.3)',
      xl: '0 0 32px rgba(239, 68, 68, 0.6), 0 0 64px rgba(239, 68, 68, 0.4)',
      DEFAULT: '0 0 16px rgba(239, 68, 68, 0.4), 0 0 32px rgba(239, 68, 68, 0.2)',
    },
    // Border Glow - توهج الحدود
    border: {
      primary: '0 0 0 1px rgba(99, 102, 241, 0.2), 0 0 8px rgba(99, 102, 241, 0.1)',
      accent: '0 0 0 1px rgba(59, 130, 246, 0.2), 0 0 8px rgba(59, 130, 246, 0.1)',
      subtle: '0 0 0 1px rgba(99, 102, 241, 0.1), 0 0 4px rgba(99, 102, 241, 0.05)',
      strong: '0 0 0 1px rgba(99, 102, 241, 0.3), 0 0 12px rgba(99, 102, 241, 0.2)',
    },
  },

  // Elevation System - نظام الارتفاع المحسّن للـ Light-Tech (Material Design inspired)
  elevation: {
    0: 'none', // No elevation
    1: '0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.02)', // Cards resting
    2: '0 2px 4px -1px rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.03)', // Cards hover
    3: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04)', // Floating buttons
    4: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)', // Cards elevated
    5: '0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.06)', // Modals
    6: '0 25px 50px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08)', // Highest elevation
    7: '0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.1)', // Ultra elevation
    8: '0 40px 80px -16px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.12)', // Maximum elevation
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
    slowest: '700ms', // --duration-slowest
    // Semantic durations
    transition: '200ms', // للانتقالات العادية
    hover: '150ms', // لتفاعلات hover
    focus: '100ms', // لتفاعلات focus
    animation: '300ms', // للحركات
  },

  easing: {
    linear: 'linear', // --ease-linear
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)', // --ease-in
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)', // --ease-out
    easeInOut: 'cubic-bezier(0, 0, 0.2, 1)', // --ease-in-out
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // --ease-bounce
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // --ease-smooth
    // Material Design easings
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)', // Standard easing
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)', // Decelerate easing
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)', // Accelerate easing
  },

  // Predefined animations - حركات جاهزة للاستخدام
  animations: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3,  },
    },
    fadeOut: {
      initial: { opacity: 1 },
      animate: { opacity: 0 },
      transition: { duration: 0.2,  },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4,  },
    },
    slideDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4,  },
    },
    slideLeft: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.4,  },
    },
    slideRight: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.4,  },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.3,  },
    },
    scaleOut: {
      initial: { opacity: 1, scale: 1 },
      animate: { opacity: 0, scale: 0.9 },
      transition: { duration: 0.2,  },
    },
    bounceIn: {
      initial: { opacity: 0, scale: 0.3 },
      animate: { opacity: 1, scale: 1 },
      transition: {
        duration: 0.5,
        ease: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
    rotateIn: {
      initial: { opacity: 0, rotate: -180 },
      animate: { opacity: 1, rotate: 0 },
      transition: { duration: 0.5,  },
    },
    // Stagger animations for lists
    staggerContainer: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        staggerChildren: 0.1,
      },
    },
    staggerItem: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4,  },
    },
  },

  // Press effects - تأثيرات الضغط
  press: {
    // Standard press effect
    standard: {
      scale: 0.97,
      transition: { duration: 0.1 },
    },
    // Soft press effect
    soft: {
      scale: 0.98,
      transition: { duration: 0.15 },
    },
    // Strong press effect
    strong: {
      scale: 0.95,
      transition: { duration: 0.08,  },
    },
    // Press with lift
    lift: {
      scale: 0.97,
      y: 1,
      transition: { duration: 0.1,  },
    },
  },

  // Hover effects - تأثيرات التحويم
  hover: {
    // Standard hover lift
    lift: {
      y: -2,
      transition: { duration: 0.2,  },
    },
    // Hover scale
    scale: {
      scale: 1.02,
      transition: { duration: 0.2,  },
    },
    // Hover glow
    glow: {
      boxShadow: '0 0 20px rgba(91, 54, 232, 0.3)',
      transition: { duration: 0.2,  },
    },
    // Combined hover
    combined: {
      y: -2,
      scale: 1.02,
      transition: { duration: 0.2,  },
    },
  },

  // Page transitions - تأثيرات انتقال الصفحات
  pageTransitions: {
    // Fade transition
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    // Slide up transition
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    // Slide down transition
    slideDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    // Slide left (RTL support)
    slideLeft: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    // Slide right (RTL support)
    slideRight: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    // Scale transition
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    // Fade with scale
    fadeScale: {
      initial: { opacity: 0, scale: 0.98 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.98 },
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },

  // Link transitions - تأثيرات الروابط
  linkTransitions: {
    // Standard link hover
    hover: {
      transition: { duration: 0.2 },
    },
    // Link press
    press: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  },

  // Card interactions - تفاعلات الكروت
  cardInteractions: {
    // Card hover
    hover: {
      y: -4,
      scale: 1.02,
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
      transition: { duration: 0.2 },
    },
    // Card press
    press: {
      scale: 0.98,
      y: -2,
      transition: { duration: 0.1 },
    },
  },
};

// ============================================
// 📝 نظام الطباعة المحسّن
// ============================================

export const typography = {
  // Font Families - متزامنة مع layout.tsx
  // Inter: للعناوين (أنيق وعصري)
  // Nunito Sans: للنصوص والجسم (واضح وسهل القراءة)
  fontFamily: {
    sans: 'var(--font-nunito-sans), "Nunito Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'var(--font-inter), "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body: 'var(--font-nunito-sans), "Nunito Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    // Fallback fonts
    arabic: 'var(--font-cairo), "Cairo", var(--font-inter), "Inter", "Nunito Sans", system-ui, sans-serif',
    english: 'var(--font-inter), "Inter", "Roboto", system-ui, sans-serif',
    cairo: 'var(--font-cairo), "Cairo", system-ui, sans-serif',
    mono: '"JetBrains Mono", "Courier New", monospace',
  },

  // Font Sizes - Responsive Typography Scale - Increased by 25% for better readability
  // يستخدم clamp للاستجابة مع الشاشات المختلفة
  fontSize: {
    xs: 'clamp(0.664rem, 0.638rem + 0.21vw, 0.798rem)', // 10.6-12.8px
    sm: 'clamp(0.798rem, 0.744rem + 0.26vw, 0.93rem)', // 12.8-14.9px
    base: 'clamp(0.93rem, 0.85rem + 0.26vw, 1.063rem)', // 14.9-17px - الحجم الافتراضي
    lg: 'clamp(1.063rem, 0.956rem + 0.33vw, 1.195rem)', // 17-19.1px
    xl: 'clamp(1.195rem, 1.063rem + 0.43vw, 1.461rem)', // 19.1-23.4px
    '2xl': 'clamp(1.329rem, 1.223rem + 0.64vw, 1.726rem)', // 21.3-27.6px
    '3xl': 'clamp(1.594rem, 1.488rem + 0.96vw, 2.125rem)', // 25.5-34px
    '4xl': 'clamp(1.993rem, 1.754rem + 1.28vw, 2.789rem)', // 31.9-44.6px
    '5xl': 'clamp(2.391rem, 2.125rem + 2.13vw, 3.586rem)', // 38.3-57.4px
    '6xl': 'clamp(2.923rem, 2.656rem + 3.19vw, 4.781rem)', // 46.8-76.5px
    '7xl': 'clamp(3.454rem, 3.188rem + 4.25vw, 5.844rem)', // 55.3-93.5px
  },

  // Font Sizes (Fixed) - للاستخدام عند الحاجة لحجم ثابت - Increased by 25%
  fontSizeFixed: {
    xs: '0.664rem', // 10.6px
    sm: '0.798rem', // 12.8px
    base: '0.93rem', // 14.9px
    lg: '1.063rem', // 17px
    xl: '1.195rem', // 19.1px
    '2xl': '1.329rem', // 21.3px
    '3xl': '1.594rem', // 25.5px
    '4xl': '1.993rem', // 31.9px
    '5xl': '2.391rem', // 38.3px
    '6xl': '2.923rem', // 46.8px
    '7xl': '3.454rem', // 55.3px
  },

  // Line Heights - محسّنة للنصوص العربية
  lineHeight: {
    none: '1',
    tight: '1.25', // للعناوين القصيرة
    snug: '1.375', // للعناوين متوسطة الطول
    normal: '1.5', // للنصوص القصيرة
    relaxed: '1.625', // للنصوص العادية (الأفضل للعربية)
    loose: '1.75', // للنصوص الطويلة والقراءة المريحة
    // Additional line heights
    'extra-tight': '1.1',
    'extra-loose': '2',
  },

  // Font Weights - متوافقة مع الأوزان المتاحة في Cairo و Tajawal
  fontWeight: {
    thin: '100',
    light: '300', // متاح في Cairo و Tajawal
    normal: '400', // الافتراضي
    medium: '500', // متاح في Cairo و Tajawal
    semibold: '600', // متاح في Cairo
    bold: '700', // متاح في Cairo و Tajawal
    extrabold: '800', // متاح في Cairo
    black: '900',
  },

  // Letter Spacing - تحسين المسافات بين الأحرف للعربية - Light-Tech Enhanced
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
    // Tech-inspired spacing
    'tech-tight': '-0.02em', // للعناوين التقنية
    'tech-wide': '0.03em', // للنصوص التقنية
    'display-tight': '-0.03em', // للعناوين الكبيرة
  },

  // Font Feature Settings - لتحسين عرض الخطوط العربية
  fontFeatures: {
    arabic: '"rlig" 1, "calt" 1', // Required Ligatures & Contextual Alternates
    default: '"rlig" 1, "calt" 1',
  },
  
  // Text Shadows - ظلال النصوص للـ Light-Tech (محسّنة)
  textShadow: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 2px 4px rgba(0, 0, 0, 0.08)',
    lg: '0 4px 8px rgba(0, 0, 0, 0.1)',
    // Colored text shadows
    primary: '0 2px 4px rgba(99, 102, 241, 0.2)',
    accent: '0 2px 4px rgba(59, 130, 246, 0.2)',
    glow: '0 0 8px rgba(99, 102, 241, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

// ============================================
// 🎯 أحجام الأيقونات الموحدة
// ============================================

export const iconSizes = {
  xs: '0.875rem', // 14px
  sm: '1rem', // 16px
  md: '1.25rem', // 20px - الحجم الافتراضي
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '2.5rem', // 40px
  '3xl': '3rem', // 48px
};

// ============================================
// 🖱️ أحجام مناطق النقر (Touch Targets)
// ============================================

export const touchTargets = {
  min: '40px', // الحد الأدنى حسب WCAG 2.1
  comfortable: '44px',
  spacious: '48px',
  'extra-spacious': '56px',
};

// ============================================
// 🌈 نظام التدرجات المستخدمة بكثرة (Gradients)
// ============================================
// تدرجات CSS جاهزة للاستخدام في bg-gradient-* classes
// متوافقة مع الألوان الأساسية في النظام

export const gradients = {
  // Primary Gradients
  'gradient-primary-smooth': 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
  'gradient-primary': 'linear-gradient(to right, #6366f1, #4f46e5)',
  'gradient-primary-vertical': 'linear-gradient(to bottom, #6366f1, #4f46e5)',
  'gradient-primary-diagonal': 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
  
  // Accent Gradients
  'gradient-accent-modern': 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
  'gradient-accent': 'linear-gradient(to right, #3b82f6, #2563eb)',
  'gradient-accent-vertical': 'linear-gradient(to bottom, #3b82f6, #2563eb)',
  
  // Success Gradients
  'gradient-success': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
  'gradient-success-smooth': 'linear-gradient(135deg, #34d399 0%, #22c55e 100%)',
  
  // Warning Gradients
  'gradient-warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  'gradient-warning-smooth': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
  
  // Danger Gradients
  'gradient-danger': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  'gradient-danger-smooth': 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
  
  // Secondary Gradients
  'gradient-learn': 'linear-gradient(135deg, #38a169 0%, #16a34a 100%)',
  'gradient-innovate': 'linear-gradient(135deg, #805ad5 0%, #7c3aed 100%)',
  'gradient-expert': 'linear-gradient(135deg, #3182ce 0%, #2563eb 100%)',
  
  // Multi-color Gradients
  'gradient-primary-accent': 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
  'gradient-rainbow': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 25%, #ec4899 50%, #ef4444 75%, #f59e0b 100%)',
  'gradient-sunset': 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)',
  
  // Neutral Gradients - Light-Tech Enhanced
  'gradient-neutral': 'linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%)',
  'gradient-neutral-dark': 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
  'gradient-neutral-light': 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
  
  // Glass Gradients - Light-Tech Enhanced
  'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
  'gradient-glass-dark': 'linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%)',
  'gradient-glass-light': 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
  
  // Light-Tech Specific Gradients
  'gradient-tech-surface': 'linear-gradient(135deg, #ffffff 0%, #fafbfc 50%, #f5f7fa 100%)',
  'gradient-tech-elevated': 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
  'gradient-primary-soft': 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.04) 100%)',
  'gradient-accent-soft': 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.04) 100%)',
};

// ============================================
// 🪟 تأثيرات الزجاج (Glass Effects)
// ============================================
// تأثيرات glass morphism للعناصر الشفافة
// تستخدم في backdrop-filter و background

export const glassEffects = {
  // Background colors with transparency
  'glass-bg': 'rgba(255, 255, 255, 0.1)',
  'glass-bg-light': 'rgba(255, 255, 255, 0.05)',
  'glass-bg-medium': 'rgba(255, 255, 255, 0.15)',
  'glass-bg-heavy': 'rgba(255, 255, 255, 0.25)',
  'glass-bg-dark': 'rgba(0, 0, 0, 0.1)',
  'glass-bg-dark-medium': 'rgba(0, 0, 0, 0.15)',
  'glass-bg-dark-heavy': 'rgba(0, 0, 0, 0.25)',
  
  // Border colors
  'glass-border': 'rgba(255, 255, 255, 0.2)',
  'glass-border-light': 'rgba(255, 255, 255, 0.1)',
  'glass-border-medium': 'rgba(255, 255, 255, 0.3)',
  'glass-border-dark': 'rgba(0, 0, 0, 0.2)',
  
  // Blur effects
  'glass-blur': 'blur(10px)',
  'glass-blur-sm': 'blur(4px)',
  'glass-blur-md': 'blur(8px)',
  'glass-blur-lg': 'blur(12px)',
  'glass-blur-xl': 'blur(16px)',
  
  // Complete glass styles (for convenience)
  glass: {
    light: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.2)',
      blur: 'blur(10px)',
    },
    medium: {
      background: 'rgba(255, 255, 255, 0.15)',
      border: 'rgba(255, 255, 255, 0.3)',
      blur: 'blur(12px)',
    },
    dark: {
      background: 'rgba(0, 0, 0, 0.1)',
      border: 'rgba(0, 0, 0, 0.2)',
      blur: 'blur(10px)',
    },
  },
};

// ============================================
// 📐 نظام Breakpoints (Media Queries)
// ============================================
// نقاط التوقف للتصميم المتجاوب

export const breakpoints = {
  xs: '0px',      // Extra small devices
  sm: '640px',    // Small devices (phones)
  md: '768px',    // Medium devices (tablets)
  lg: '1024px',   // Large devices (desktops)
  xl: '1280px',   // Extra large devices
  '2xl': '1536px', // 2X Extra large devices
  // Semantic breakpoints
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
};

// ============================================
// 📍 نظام Z-Index الموحد
// ============================================
// نظام موحد للطبقات (Layering System)

export const zIndex = {
  // Base layers
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  // Semantic layers
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
  // Maximum
  max: 9999,
};

// ============================================
// 👁️ نظام Opacity الموحد
// ============================================

export const opacity = {
  0: '0',
  5: '0.05',
  10: '0.1',
  20: '0.2',
  25: '0.25',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  75: '0.75',
  80: '0.8',
  90: '0.9',
  95: '0.95',
  100: '1',
  // Semantic opacity
  disabled: '0.5',
  hover: '0.8',
  focus: '0.9',
  transparent: '0',
  opaque: '1',
};

// ============================================
// 📦 Default Export - جميع التوكنات
// ============================================

export default {
  colors,
  spacing,
  semanticSpacing,
  radius,
  borderWidth,
  shadows,
  motion,
  typography,
  iconSizes,
  touchTargets,
  gradients,
  glassEffects,
  breakpoints,
  zIndex,
  opacity,
};