# تحسينات UI/UX لمنصة خطى التعليمية
## Khatwa Learning Platform - UI/UX Enhancement Guide

---

## 📋 جدول المحتويات
1. [مبادئ التصميم العامة](#مبادئ-التصميم-العامة)
2. [تحليل المكونات والتحسينات](#تحليل-المكونات-والتحسينات)
3. [Design Tokens موحدة](#design-tokens-موحدة)
4. [Typographic Scale](#typographic-scale)

---

## 🎨 مبادئ التصميم العامة

### 1. **التناسق البصري (Visual Consistency)**
- استخدام نفس `border-radius` (14px للبطاقات، 10px للأزرار)
- توحيد نظام الظلال (elevation-1 إلى elevation-5)
- مسافات موحدة باستخدام Tailwind spacing scale

### 2. **التدرج الهرمي البصري (Visual Hierarchy)**
- العناوين الرئيسية: `text-3xl lg:text-4xl font-extrabold`
- العناوين الثانوية: `text-xl lg:text-2xl font-bold`
- النصوص العادية: `text-base lg:text-lg`
- النصوص الثانوية: `text-sm text-neutral-600`

### 3. **الألوان والتدرجات**
- استخدام Design Tokens بدلاً من الألوان المباشرة
- تدرجات ناعمة للخلفيات (من primary-50 إلى primary-100)
- تباين مناسب للنصوص (WCAG 2.1 AA minimum)

### 4. **الحركات والتأثيرات**
- مدة الحركات: 200-300ms للأزرار، 400-600ms للعناصر الكبيرة
- احترام `prefers-reduced-motion`
- حركات ناعمة باستخدام `ease-out` أو `ease-in-out`

### 5. **RTL Support**
- استخدام `dir="rtl"` للنصوص العربية
- محاذاة الأيقونات بشكل صحيح (أيقونة قبل النص في RTL)
- استخدام `start` و `end` بدلاً من `left` و `right`

---

## 🔍 تحليل المكونات والتحسينات

---

## 1. SidebarToggleButton

### 📊 التقييم الحالي:
- ✅ تصميم جيد مع تأثيرات glassmorphism
- ⚠️ تأثيرات متوهجة كثيرة قد تكون مبالغ فيها
- ⚠️ Tooltip يحتاج تحسين في RTL
- ⚠️ الحجم قد يكون كبيراً قليلاً

### 🎯 التحسينات المقترحة:

#### 1.1 تبسيط التأثيرات المتوهجة
```tsx
// تقليل عدد الطبقات المتوهجة من 3 إلى 2
<div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 via-primary-600/20 to-primary-700/30 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />
```

#### 1.2 تحسين Tooltip لـ RTL
```tsx
{/* Tooltip - محسّن لـ RTL */}
<motion.div
  initial={{ opacity: 0, x: -10 }} // تغيير الاتجاه لـ RTL
  whileHover={{ opacity: 1, x: 0 }}
  className="absolute right-full mr-4 px-3 py-1.5 bg-neutral-900/95 dark:bg-neutral-100/95 text-white dark:text-neutral-900 text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none backdrop-blur-sm border border-white/10 shadow-xl"
  dir="rtl"
>
  {isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
  <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-l-4 border-l-neutral-900/95 dark:border-l-neutral-100/95 border-b-4 border-b-transparent" />
</motion.div>
```

#### 1.3 تحسين الحجم والمسافات
```tsx
// تقليل الحجم قليلاً ليكون أقل بروزاً
<div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 shadow-lg shadow-primary-500/30 flex items-center justify-center group-hover:shadow-xl group-hover:shadow-primary-500/50 transition-all duration-300 backdrop-blur-sm border border-white/10 group-hover:border-white/20 overflow-hidden">
```

---

## 2. UnifiedHeroSection

### 📊 التقييم الحالي:
- ✅ تصميم قوي مع تدرجات جيدة
- ⚠️ المسافات بين العناصر قد تكون غير متسقة
- ⚠️ الإحصائيات (stats) تحتاج تحسين في التخطيط
- ⚠️ الأزرار تحتاج تحسين في المسافات والظلال

### 🎯 التحسينات المقترحة:

#### 2.1 تحسين المسافات الداخلية
```tsx
<MotionSection
  className={cn(
    'relative overflow-hidden rounded-[2rem] px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-28 shadow-2xl', // زيادة padding أفقياً
    backgroundMode === 'light' ? 'bg-white' : `bg-gradient-to-br ${tokens.gradient}`,
    className
  )}
>
```

#### 2.2 تحسين تخطيط الإحصائيات
```tsx
{stats.length > 0 && (
  <div className="flex flex-wrap gap-4 lg:gap-6 justify-start lg:justify-start text-right" dir="rtl">
    {stats.map((stat, index) => (
      <motion.div
        key={stat.label + index}
        initial={shouldAnimate ? { opacity: 0, scale: 0.9 } : {}}
        animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
        transition={shouldAnimate ? { delay: index * 0.1, duration: 0.4 } : {}}
        className={cn(
          'min-w-[160px] rounded-2xl border px-5 py-4 backdrop-blur-sm', // زيادة padding وتحسين الحدود
          backgroundMode === 'light'
            ? 'border-neutral-200 bg-white/80 shadow-sm hover:shadow-md'
            : 'border-white/20 bg-white/10 hover:bg-white/15 shadow-lg hover:shadow-xl'
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
```

#### 2.3 تحسين الأزرار
```tsx
{mergedActions.length > 0 && (
  <div
    className={cn(
      'mt-8 flex flex-wrap items-center gap-4', // زيادة المسافة العلوية والجوانبية
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
        'min-w-[180px] shadow-lg hover:shadow-xl transition-shadow duration-300', // تحسين الظلال
        action.variant === 'ghost' && 'bg-white/10 text-white border-white/30 hover:bg-white/15'
      );
      // ... rest of code
    })}
  </div>
)}
```

#### 2.4 تحسين Badge (Eyebrow)
```tsx
{eyebrow && (
  <motion.span
    initial={shouldAnimate ? { opacity: 0, y: -10 } : {}}
    animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
    transition={shouldAnimate ? { duration: 0.4 } : {}}
    className={cn(
      'inline-flex items-center justify-center rounded-full px-5 py-2 text-xs sm:text-sm font-bold tracking-wide backdrop-blur-sm border', // إضافة border
      backgroundMode === 'light'
        ? 'border-primary-200 bg-primary-50 text-primary-700'
        : tokens.badgeClass + ' border-white/20'
    )}
    dir="rtl"
  >
    {eyebrow}
  </motion.span>
)}
```

---

## 3. AppSidebar

### 📊 التقييم الحالي:
- ✅ تصميم نظيف ومنظم
- ⚠️ المسافات بين العناصر قد تكون غير متسقة
- ⚠️ العناصر النشطة تحتاج تحسين في التمييز البصري
- ⚠️ الأيقونات تحتاج تحسين في الحجم والمسافات

### 🎯 التحسينات المقترحة:

#### 3.1 تحسين NavigationItem
```tsx
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

#### 3.2 تحسين CategorySection
```tsx
const CategorySection = ({ section, expanded, toggle, idx }: any) => (
  <motion.div
    initial={prefersReducedMotion ? {} : { opacity: 0, y: 5 }}
    animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
    transition={prefersReducedMotion ? { duration: 0 } : { delay: idx * 0.05 }}
    className="space-y-3"
  >
    <motion.button
      onClick={toggle}
      className={`w-full flex items-center justify-between p-4 rounded-xl text-sm font-bold text-neutral-900 border transition-all duration-200 ease-out min-h-[48px] focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 ${
        expanded 
          ? 'bg-primary-50 border-primary-300 shadow-md' 
          : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300'
      }`}
      whileHover={prefersReducedMotion ? {} : { scale: 1.01, y: -1 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      aria-expanded={expanded}
      aria-controls={`sidebar-section-${section.title}`}
      aria-label={`${expanded ? 'إغلاق' : 'فتح'} قسم ${section.title}`}
      dir="rtl"
    >
      <span className="flex items-center gap-3">
        <ChevronRight
          className={`w-5 h-5 text-primary-600 transition-transform duration-200 ease-out ${
            expanded ? 'rotate-0' : '-rotate-90'
          }`}
          strokeWidth={2.5}
          aria-hidden="true"
        />
        {section.title}
      </span>
      <ChevronDown
        className={`w-5 h-5 text-neutral-500 transition-transform duration-200 ease-out ${
          expanded ? 'rotate-180' : 'rotate-0'
        }`}
        strokeWidth={2.5}
        aria-hidden="true"
      />
    </motion.button>
    {/* ... rest of code */}
  </motion.div>
);
```

#### 3.3 تحسين SidebarHeader
```tsx
const SidebarHeader = ({ onClose }: { onClose: () => void }) => (
  <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-gradient-to-r from-white to-neutral-50/50">
    <h2 className="text-xl font-extrabold text-primary-600 tracking-tight" dir="rtl">
      خطي التعليمية
    </h2>
    <motion.button
      onClick={onClose}
      className="p-2.5 rounded-xl hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 transition-all duration-200 ease-out min-h-[44px] min-w-[44px] flex items-center justify-center"
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
      transition={{ duration: 0.2 }}
      aria-label="إغلاق القائمة الجانبية"
    >
      <X className="w-5 h-5 text-neutral-600" strokeWidth={2.5} aria-hidden="true" />
    </motion.button>
  </div>
);
```

---

## 4. FeaturedCoursesSection

### 📊 التقييم الحالي:
- ✅ تصميم جيد مع سلايدر احترافي
- ⚠️ المسافات بين العناصر تحتاج توحيد
- ⚠️ الأزرار تحتاج تحسين في التصميم
- ⚠️ الألوان تحتاج استخدام Design Tokens

### 🎯 التحسينات المقترحة:

#### 4.1 تحسين Header
```tsx
<ScrollAnimation direction="up" delay={0.1}>
  <div className="text-center mb-12 mt-4" dir="rtl">
    <h2 
      className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent"
      style={{
        fontFamily: "var(--font-noto-kufi-arabic), 'Noto Kufi Arabic', 'Cairo', sans-serif",
      }}
    >
      الدورات الأكثر طلباً
    </h2>
    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
      اكتشف أحدث الدورات والخدمات التدريبية المميزة
    </p>
  </div>
</ScrollAnimation>
```

#### 4.2 تحسين بطاقة الدورة
```tsx
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

#### 4.3 تحسين أزرار التنقل
```tsx
<button
  onClick={prevSlide}
  className="absolute left-6 top-1/2 -translate-y-1/2 z-20 group"
  aria-label="السابق"
>
  <div className="relative">
    <div className="relative w-14 h-14 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-center group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:border-primary-300 dark:group-hover:border-primary-600 group-hover:shadow-xl transition-all duration-300">
      <ChevronRight className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300" strokeWidth={2.5} />
    </div>
  </div>
</button>
```

---

## 5. Card Component

### 📊 التقييم الحالي:
- ✅ تصميم جيد مع variants واضحة
- ⚠️ الظلال تحتاج تحسين في الشفافية
- ⚠️ الحدود تحتاج تحسين في الألوان

### 🎯 التحسينات المقترحة:

#### 5.1 تحسين cardVariants
```tsx
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
```

#### 5.2 تحسين CardTitle و CardDescription
```tsx
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

## 6. Button Component

### 📊 التقييم الحالي:
- ✅ تصميم جيد مع variants واضحة
- ⚠️ الظلال تحتاج تحسين
- ⚠️ الألوان تحتاج استخدام Design Tokens

### 🎯 التحسينات المقترحة:

#### 6.1 تحسين buttonVariants
```tsx
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
        // ... rest of variants
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

## 7. FAQSection

### 📊 التقييم الحالي:
- ✅ تصميم جيد مع حركات سلسة
- ⚠️ الألوان تحتاج استخدام Design Tokens
- ⚠️ المسافات تحتاج توحيد

### 🎯 التحسينات المقترحة:

#### 7.1 تحسين Header
```tsx
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
```

#### 7.2 تحسين FAQ Items
```tsx
<div
  className={`relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 border transition-all duration-300 ${
    openIndex === index
      ? 'border-primary-300 dark:border-primary-700 shadow-xl bg-primary-50/50 dark:bg-primary-900/10'
      : 'border-neutral-200 dark:border-neutral-700 shadow-md hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-800'
  }`}
>
  {/* Question Button */}
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

## 8. EnhancedNavbar

### 📊 التقييم الحالي:
- ✅ تصميم جيد مع backdrop blur
- ⚠️ الألوان تحتاج استخدام Design Tokens
- ⚠️ المسافات تحتاج توحيد

### 🎯 التحسينات المقترحة:

#### 8.1 تحسين Navbar Container
```tsx
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

## 9. PageBackground

### 📊 التقييم الحالي:
- ✅ تصميم بسيط وفعال
- ⚠️ التدرجات تحتاج تحسين
- ⚠️ الألوان تحتاج استخدام Design Tokens

### 🎯 التحسينات المقترحة:

#### 9.1 تحسين backgroundStyles
```tsx
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

## 🎨 Design Tokens موحدة

### الألوان الأساسية:
```tsx
// في ملف tailwind.config.js أو design-tokens.ts
export const designTokens = {
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
    },
  },
  spacing: {
    xs: '0.5rem', // 8px
    sm: '0.75rem', // 12px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
  },
  borderRadius: {
    sm: '0.5rem', // 8px
    md: '0.875rem', // 14px
    lg: '1rem', // 16px
    xl: '1.5rem', // 24px
    '2xl': '2rem', // 32px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.05)',
    md: '0 2px 8px rgba(0, 0, 0, 0.08)',
    lg: '0 4px 16px rgba(0, 0, 0, 0.12)',
    xl: '0 8px 24px rgba(0, 0, 0, 0.16)',
    '2xl': '0 16px 32px rgba(0, 0, 0, 0.20)',
  },
};
```

---

## 📐 Typographic Scale

### نظام الخطوط الموحد:
```tsx
// في ملف tailwind.config.js
export const typography = {
  fontFamily: {
    arabic: ['var(--font-noto-kufi-arabic)', 'Noto Kufi Arabic', 'Cairo', 'sans-serif'],
    sans: ['var(--font-arabic)', 'IBM Plex Sans Arabic', 'Noto Sans Arabic', 'sans-serif'],
  },
  fontSize: {
    'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
    'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
    'base': ['1rem', { lineHeight: '1.75', letterSpacing: '0em' }],
    'lg': ['1.125rem', { lineHeight: '1.75', letterSpacing: '0em' }],
    'xl': ['1.25rem', { lineHeight: '1.75', letterSpacing: '-0.025em' }],
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
};
```

---

## ✅ قائمة التحقق النهائية

### لكل مكون جديد أو محسّن:
- [ ] استخدام Design Tokens للألوان
- [ ] توحيد المسافات (spacing scale)
- [ ] توحيد border-radius
- [ ] توحيد الظلال (elevation system)
- [ ] دعم RTL كامل
- [ ] احترام prefers-reduced-motion
- [ ] تباين ألوان مناسب (WCAG 2.1 AA)
- [ ] حركات ناعمة (200-300ms)
- [ ] Typography scale موحد
- [ ] اختبار على شاشات مختلفة

---

## 📝 ملاحظات إضافية

1. **الأداء**: استخدام `will-change` بحذر فقط للعناصر المتحركة
2. **الوصولية**: إضافة `aria-label` و `aria-expanded` حيثما لزم
3. **الاستجابة**: اختبار على mobile, tablet, desktop
4. **الظلام**: دعم dark mode بشكل كامل
5. **الاختبار**: اختبار مع قارئات الشاشة

---

**آخر تحديث**: 2024
**الإصدار**: 1.0.0

