# أمثلة كود محسنة - Khatwa Learning Platform
## Component Improvement Examples - Ready to Apply

هذا الملف يحتوي على أمثلة كود محسنة جاهزة للتطبيق مباشرة على المكونات الموجودة.

---

## 📦 1. SidebarToggleButton - نسخة محسنة

```tsx
'use client';

import { motion } from 'framer-motion';
import { PanelLeft, X } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SidebarToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  variant?: 'default' | 'floating' | 'inline';
}

export default function SidebarToggleButton({
  isOpen,
  onClick,
  className = '',
  variant = 'floating',
}: SidebarToggleButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  if (variant === 'floating') {
    return (
      <motion.button
        onClick={onClick}
        className={`fixed left-6 top-1/2 -translate-y-1/2 z-50 ${className}`}
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8, y: -20 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        transition={prefersReducedMotion ? { duration: 0 } : { 
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
        aria-label={isOpen ? 'إغلاق القائمة الجانبية' : 'فتح القائمة الجانبية'}
      >
        <div className="relative group">
          {/* خلفية متوهجة محسنة - طبقة واحدة فقط */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 via-primary-600/20 to-primary-700/30 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />
          
          {/* الزر الرئيسي */}
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 shadow-lg shadow-primary-500/30 flex items-center justify-center group-hover:shadow-xl group-hover:shadow-primary-500/50 transition-all duration-300 backdrop-blur-sm border border-white/10 group-hover:border-white/20 overflow-hidden">
            {/* خلفية داخلية */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 rounded-xl pointer-events-none" />
            
            {/* تأثير لامع متحرك */}
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              animate={prefersReducedMotion ? {} : {
                background: [
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                  'linear-gradient(270deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                ],
                backgroundPosition: ['0% 50%', '100% 50%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: 'linear',
              }}
            />

            {/* أيقونة */}
            <motion.div
              animate={isOpen ? { 
                rotate: 180,
                scale: [1, 1.1, 1]
              } : { 
                rotate: 0,
                scale: 1
              }}
              transition={prefersReducedMotion ? { duration: 0 } : { 
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="relative z-10"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-white" strokeWidth={2.5} />
              ) : (
                <PanelLeft className="w-5 h-5 text-white" strokeWidth={2.5} />
              )}
            </motion.div>
          </div>

          {/* Tooltip محسّن لـ RTL */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-4 px-3 py-1.5 bg-neutral-900/95 dark:bg-neutral-100/95 text-white dark:text-neutral-900 text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none backdrop-blur-sm border border-white/10 shadow-xl"
            dir="rtl"
          >
            {isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-l-4 border-l-neutral-900/95 dark:border-l-neutral-100/95 border-b-4 border-b-transparent" />
          </motion.div>
        </div>
      </motion.button>
    );
  }

  // باقي الـ variants...
  return null;
}
```

---

## 📦 2. UnifiedHeroSection - تحسينات Stats و Actions

```tsx
// في ملف UnifiedHeroSection.tsx - استبدال قسم Stats

{stats.length > 0 && (
  <div className="flex flex-wrap gap-4 lg:gap-6 justify-start lg:justify-start text-right" dir="rtl">
    {stats.map((stat, index) => (
      <motion.div
        key={stat.label + index}
        initial={shouldAnimate ? { opacity: 0, scale: 0.9 } : {}}
        animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
        transition={shouldAnimate ? { delay: index * 0.1, duration: 0.4 } : {}}
        className={cn(
          'min-w-[160px] rounded-2xl border px-5 py-4 backdrop-blur-sm transition-all duration-300',
          backgroundMode === 'light'
            ? 'border-neutral-200 bg-white/80 shadow-sm hover:shadow-md hover:border-neutral-300'
            : 'border-white/20 bg-white/10 hover:bg-white/15 shadow-lg hover:shadow-xl hover:border-white/30'
        )}
      >
        <div className={cn('text-3xl font-extrabold mb-1', statValueColor)} dir="ltr">
          {stat.value}
        </div>
        <p className={cn('text-sm font-medium', statLabelColor)} dir="rtl">
          {stat.label}
        </p>
        {stat.helper && (
          <p className={cn('text-xs mt-1', statHelperColor)} dir="rtl">
            {stat.helper}
          </p>
        )}
      </motion.div>
    ))}
  </div>
)}

// تحسين قسم Actions
{mergedActions.length > 0 && (
  <div
    className={cn(
      'mt-8 flex flex-wrap items-center gap-4',
      layout === 'centered' ? 'justify-center' : 'justify-start'
    )}
  >
    {mergedActions.map((action, index) => {
      const ActionComponent = action.href ? motion.a : motion.button;
      const buttonClass = cn(
        buttonVariants({
          variant: actionVariantMap[action.variant ?? 'primary'],
          size: 'lg',
        }),
        'min-w-[180px] shadow-lg hover:shadow-xl transition-shadow duration-300',
        action.variant === 'ghost' && 'bg-white/10 text-white border-white/30 hover:bg-white/15'
      );
      const baseProps = action.href ? { href: action.href } : { type: 'button' as const };

      return (
        <ActionComponent
          key={`${action.label}-${index}`}
          {...baseProps}
          onClick={action.onClick}
          className={buttonClass}
          aria-label={action.label}
          whileHover={shouldAnimate ? { y: -2 } : undefined}
          whileTap={shouldAnimate ? { scale: 0.98 } : undefined}
          dir="rtl"
        >
          {action.icon && <span className="pl-1">{action.icon}</span>}
          <span>{action.label}</span>
        </ActionComponent>
      );
    })}
  </div>
)}
```

---

## 📦 3. AppSidebar - NavigationItem محسّن

```tsx
// استبدال دالة NavigationItem في AppSidebar.tsx

const NavigationItem = ({ item, active, idx }: any) => {
  const IconComp = iconMap[item.icon as keyof typeof iconMap] || Home;
  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, x: -5 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { delay: idx * 0.03, duration: 0.2 }}
    >
      <motion.div
        whileHover={!active ? { x: 4, scale: 1.01 } : {}}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <Link
          href={item.href}
          className={`group flex items-center gap-4 p-4 rounded-xl text-sm transition-all duration-200 ease-out min-h-[48px] ${
            active
              ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/25 border border-primary-500/40'
              : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 border border-transparent hover:border-neutral-200 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2'
          }`}
          aria-current={active ? 'page' : undefined}
          aria-label={item.name}
          dir="rtl"
        >
          <div
            className={`p-2.5 rounded-lg transition-all duration-200 ease-out ${
              active
                ? 'bg-white/20'
                : 'bg-neutral-100 group-hover:bg-primary-50'
            }`}
          >
            <IconComp
              className={`w-5 h-5 transition-colors duration-200 ease-out ${
                active ? 'text-white' : 'text-neutral-600 group-hover:text-primary-600'
              }`}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>
          <span className="flex-1 font-semibold">{item.name}</span>
          {active && (
            <motion.div 
              className="w-2 h-2 rounded-full bg-white shadow-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          )}
        </Link>
      </motion.div>
    </motion.div>
  );
};
```

---

## 📦 4. FeaturedCoursesSection - بطاقة محسنة

```tsx
// استبدال قسم GlassCard في FeaturedCoursesSection.tsx

<GlassCard variant="elevated" size="lg" className="grid lg:grid-cols-2 gap-10 items-center justify-center p-8 lg:p-16">
  {/* Image Section */}
  <div className="relative group">
    <div className="relative h-[320px] lg:h-[420px] rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 shadow-xl">
      <img
        src={featuredCourses[currentIndex].image}
        alt={featuredCourses[currentIndex].title}
        className="w-full h-full object-cover brightness-105 contrast-110 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      
      {/* Play Icon Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl"
        >
          <Play className="w-10 h-10 text-primary-600 fill-primary-600" />
        </motion.div>
      </div>
    </div>
  </div>

  {/* Content Section */}
  <div className="space-y-6 text-center lg:text-right" dir="rtl">
    {/* Title */}
    <div>
      <h3 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
        {featuredCourses[currentIndex].title}
      </h3>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {featuredCourses[currentIndex].description}
      </p>
    </div>

    {/* Category Badge */}
    <div className="flex items-center justify-center lg:justify-start gap-3">
      <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-semibold border border-primary-200 dark:border-primary-800">
        {featuredCourses[currentIndex].category}
      </span>
      <span className="px-4 py-2 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-lg text-sm font-semibold border border-accent-200 dark:border-accent-800">
        {featuredCourses[currentIndex].duration}
      </span>
    </div>

    {/* Price and CTA */}
    <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 flex-col lg:flex-row">
      <div>
        <div className="text-sm text-neutral-500 mb-1">السعر</div>
        <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
          {featuredCourses[currentIndex].price}
        </div>
      </div>
      <Button
        onClick={() => router.push(`/courses/${featuredCourses[currentIndex].slug}`)}
        size="lg"
        className="min-w-[200px] shadow-lg hover:shadow-xl"
      >
        <span>ابدأ التعلم الآن</span>
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  </div>
</GlassCard>
```

---

## 📦 5. Card Component - تحسينات Variants

```tsx
// في ملف Card.tsx - تحديث cardVariants

const cardVariants = cva(
  'bg-white border rounded-[14px] transition-all duration-300 dark:bg-neutral-800 dark:border-neutral-700',
  {
    variants: {
      variant: {
        default: 'border-neutral-200 bg-white dark:bg-neutral-800 dark:border-neutral-700',
        elevated: 'border-neutral-200 bg-white dark:bg-neutral-800 dark:border-neutral-700 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)]',
        outline: 'border-neutral-300 bg-transparent dark:border-neutral-600',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      elevation: {
        0: 'shadow-none',
        1: 'shadow-[0_1px_3px_rgba(0,0,0,0.05)]',
        2: 'shadow-[0_2px_8px_rgba(0,0,0,0.08)]',
        3: 'shadow-[0_4px_16px_rgba(0,0,0,0.12)]',
        4: 'shadow-[0_8px_24px_rgba(0,0,0,0.16)]',
        5: 'shadow-[0_16px_32px_rgba(0,0,0,0.20)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      elevation: 2,
    },
  }
);

// تحديث CardTitle و CardDescription
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white',
      className
    )}
    dir="rtl"
    {...props}
  />
));

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed',
      className
    )}
    dir="rtl"
    {...props}
  />
));
```

---

## 📦 6. Button Component - تحسينات Variants

```tsx
// في ملف Button.tsx - تحديث buttonVariants

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold select-none rounded-[10px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900 disabled:pointer-events-none disabled:cursor-not-allowed motion-reduce:transition-none will-change-transform no-underline hover:no-underline direction-rtl',
  {
    variants: {
      variant: {
        default:
          'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-md hover:shadow-lg active:shadow-xl focus-visible:ring-primary-500 disabled:bg-neutral-200 disabled:text-neutral-500',
        secondary:
          'bg-transparent text-primary-600 border-2 border-primary-600 hover:bg-primary-50 active:bg-primary-100 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-neutral-800',
        ghost:
          'bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white',
        destructive:
          'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-md hover:shadow-lg',
        success:
          'bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700 shadow-md hover:shadow-lg',
        warning:
          'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 shadow-md hover:shadow-lg',
        info:
          'bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700 shadow-md hover:shadow-lg',
        icon:
          'bg-transparent text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 w-10 h-10 p-0 min-w-[40px] min-h-[40px] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white',
      },
      size: {
        sm: 'h-[36px] px-4 py-2 text-sm min-h-[36px]',
        default: 'h-[48px] px-6 py-3 text-base min-h-[48px]',
        lg: 'h-[56px] px-8 py-4 text-lg min-h-[56px]',
        icon: 'h-10 w-10 p-0 min-h-[40px] min-w-[40px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

---

## 📦 7. FAQSection - تحسينات Header و Items

```tsx
// في ملف FAQSection.tsx - تحديث Header

<div className="text-center mb-10">
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.2 }}
    className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg"
  >
    <HelpCircle className="w-8 h-8 text-white" />
  </motion.div>

  <motion.h2
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4"
    dir="rtl"
  >
    <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent">
      الأسئلة الشائعة
    </span>
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
    dir="rtl"
  >
    أجوبة على الأسئلة الأكثر شيوعاً حول المنصة والخدمات
  </motion.p>
</div>

// تحديث FAQ Items
<div
  className={`relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 border transition-all duration-300 ${
    openIndex === index
      ? 'border-primary-300 dark:border-primary-700 shadow-xl bg-primary-50/50 dark:bg-primary-900/10'
      : 'border-neutral-200 dark:border-neutral-700 shadow-md hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-800'
  }`}
>
  <button
    onClick={() => toggleFAQ(index)}
    className="w-full p-6 lg:p-8 flex items-center justify-between gap-4 text-right group"
    aria-expanded={openIndex === index}
    dir="rtl"
  >
    <div className="flex-1">
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 mt-1 transition-colors duration-200 ${
          openIndex === index
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-primary-500 dark:text-primary-500'
        }`}>
          <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6" />
        </div>
        <h3 className="text-lg lg:text-xl font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
          {faq.question}
        </h3>
      </div>
    </div>

    <motion.div
      animate={{ rotate: openIndex === index ? 180 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
        openIndex === index
          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
          : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
      }`}
    >
      <ChevronDown className="w-5 h-5" />
    </motion.div>
  </button>
  {/* ... rest of code */}
</div>
```

---

## 📦 8. EnhancedNavbar - تحسينات Container

```tsx
// في ملف EnhancedNavbar.tsx - تحديث Navbar Container

<nav
  className={cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
    'border-b',
    'backdrop-blur-md',
    isScrolled
      ? 'bg-white/95 dark:bg-neutral-900/95 shadow-lg border-neutral-200/50 dark:border-neutral-800/50'
      : 'bg-white/90 dark:bg-neutral-900/90 border-transparent'
  )}
>
  <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-18">
    {/* Logo */}
    <Link 
      href="/" 
      className="text-2xl font-extrabold text-primary-600 dark:text-primary-400 tracking-tight flex items-center no-underline hover:no-underline transition-colors duration-200 hover:text-primary-700 dark:hover:text-primary-300"
      style={{
        fontFamily: "var(--font-arabic), 'IBM Plex Sans Arabic', 'Noto Sans Arabic', sans-serif",
      }}
      dir="rtl"
    >
      خطى
    </Link>
    {/* ... rest of code */}
  </div>
</nav>
```

---

## 📦 9. PageBackground - تحسينات Gradients

```tsx
// في ملف PageBackground.tsx - تحديث backgroundStyles

const backgroundStyles: Record<BackgroundVariant, string> = {
  home: 'bg-gradient-to-br from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900',
  courses: 'bg-gradient-to-br from-white via-primary-50/30 to-white dark:from-neutral-900 dark:via-primary-950/20 dark:to-neutral-900',
  cia: 'bg-gradient-to-br from-white via-accent-50/30 to-white dark:from-neutral-900 dark:via-accent-950/20 dark:to-neutral-900',
  resources: 'bg-gradient-to-br from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900',
  auth: 'bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950',
  dashboard: 'bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950',
  admin: 'bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950',
  community: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
  support: 'bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950',
  reports: 'bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950',
  files: 'bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950',
  paths: 'bg-gradient-to-br from-white via-primary-50/30 to-white dark:from-neutral-900 dark:via-primary-950/20 dark:to-neutral-900',
  default: 'bg-white dark:bg-neutral-900',
};
```

---

## ✅ خطوات التطبيق

1. **ابدأ بالمكونات الأساسية**: Card, Button
2. **ثم المكونات المركبة**: AppSidebar, UnifiedHeroSection
3. **أخيراً المكونات المتخصصة**: FeaturedCoursesSection, FAQSection

## 📝 ملاحظات مهمة

- احفظ نسخة احتياطية من الملفات الأصلية قبل التعديل
- اختبر كل مكون بعد التعديل على شاشات مختلفة
- تأكد من عمل dark mode بشكل صحيح
- اختبر RTL support
- اختبر مع `prefers-reduced-motion`

---

**آخر تحديث**: 2024
**الإصدار**: 1.0.0

