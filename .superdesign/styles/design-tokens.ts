// الألوان الأساسية
export const colors = {
  // الألوان الأساسية
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // اللون الأساسي
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // ألوان النجاح
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981', // لون النجاح الأساسي
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22', // إضافة درجة إضافية
  },
  
  // ألوان التحذير
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // لون التحذير الأساسي
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03', // إضافة درجة إضافية
  },
  
  // ألوان الخطأ
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // لون الخطأ الأساسي
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a', // إضافة درجة إضافية
  },
  
  // درجات الرمادي
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // ألوان الحالات التفاعلية
  interactive: {
    hover: '#60a5fa', // أزرق فاتح للتمرير
    active: '#2563eb', // أزرق داكن للنقر
    focus: '#3b82f6', // أزرق أساسي للتركيز
    disabled: '#9ca3af', // رمادي للعناصر المعطلة
  },
};

// ألوان وتأثيرات شجرة العرض
export const treeView = {
  // ألوان النصوص
  text: {
    primary: colors.gray[800],
    secondary: colors.gray[600],
    active: colors.primary[600],
    hover: colors.primary[500],
  },
  
  // ألوان الخلفيات
  background: {
    default: colors.gray[50],
    hover: colors.gray[100],
    active: colors.primary[50],
  },
  
  // حدود وأقسام
  border: colors.gray[200],
  branch: colors.gray[300],
  
  // تأثيرات
  shadow: {
    branch: '0 2px 4px rgba(0, 0, 0, 0.05)',
    node: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
  
  // أحجام
  spacing: {
    level: '1.5rem', // مسافة لكل مستوى
    node: '0.5rem', // تباعد داخلي للعقد
  },
};

// ألوان شجرة العرض
export const treeViewColors = {
  text: colors.gray[800],          // نص غامق للوضوح
  textHover: colors.primary[600],  // لون عند المرور
  branch: colors.gray[300],        // لون الفروع
  branchHover: colors.primary[500],// لون الفروع عند المرور
  icon: colors.gray[500],          // لون الأيقونات
  iconHover: colors.primary[500],  // لون الأيقونات عند المرور
  background: colors.gray[100],    // خلفية الشجرة
  backgroundHover: colors.gray[200],// خلفية العنصر عند المرور
};

// الطباعة
export const typography = {
  fontFamily: {
    arabic: '"Tajawal", "Cairo", sans-serif',
    english: '"Inter", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  
  // أحجام الخطوط
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  
  // أوزان الخطوط
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  
  // ارتفاعات الأسطر
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

// المسافات
const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
};

// الظلال
export const shadows = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 #0000',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  glow: '0 0 20px rgba(59, 130, 246, 0.4)', // ظلال متوهجة
  colored: '0 4px 14px 0 rgba(59, 130, 246, 0.39)', // ظلال ملونة
  none: 'none',
};

// الزوايا
const borderRadius = {
  none: '0',
  sm: '0.125rem',  // 2px
  DEFAULT: '0.25rem',  // 4px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
};

// التباين
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
};

// التدرجات اللونية
export const gradients = {
  primary: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[700]} 100%)`,
  success: `linear-gradient(135deg, ${colors.success[500]} 0%, ${colors.success[700]} 100%)`,
  warning: `linear-gradient(135deg, ${colors.warning[500]} 0%, ${colors.warning[700]} 100%)`,
  error: `linear-gradient(135deg, ${colors.error[500]} 0%, ${colors.error[700]} 100%)`,
  modernPrimary: `linear-gradient(135deg, ${colors.primary[400]} 0%, ${colors.primary[600]} 50%, ${colors.primary[800]} 100%)`, // تدرج أساسي عصري
  sunset: `linear-gradient(135deg, #ff7e5f 0%, #feb47b 50%, #ff6b6b 100%)`, // تدرج غروب الشمس
  ocean: `linear-gradient(135deg, #2193b0 0%, #6dd5ed 50%, #2193b0 100%)`, // تدرج المحيط
  forest: `linear-gradient(135deg, #134e5e 0%, #71b280 50%, #134e5e 100%)`, // تدرج الغابة
};

// تأثيرات الحركة
export const transitions = {
  duration: {
    fastest: '100ms',
    faster: '150ms',
    fast: '200ms',
    normal: '300ms',
    slow: '400ms',
    slower: '500ms',
    slowest: '700ms',
  },
  timing: {
    ease: 'ease',
    in: 'ease-in',
    out: 'ease-out',
    inOut: 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  },
};

// الرسوم المتحركة
export const animations = {
  microInteraction: '200ms ease-in-out', // للتفاعلات الصغيرة
  pageTransition: '500ms ease-in-out', // لانتقالات الصفحات
  loading: '1000ms ease-in-out infinite', // لحالات التحميل
};

// نقاط التوقف للتصميم المتجاوب
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// تصدير كل الثوابت
export const theme = {
  colors: {
    ...colors,
    treeView, // إضافة ألوان شجرة العرض
  },
  typography,
  spacing,
  shadows,
  borderRadius,
  opacity,
  gradients,
  transitions,
  animations, // إضافة الرسوم المتحركة
  breakpoints,
};

export default theme;
