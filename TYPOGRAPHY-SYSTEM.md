# 🎨 نظام الطباعة المتطور - Advanced Typography System

## نظرة عامة | Overview

نظام طباعة عصري ومتجاوب مصمم خصيصًا للغة العربية مع دعم كامل للتجاوب عبر جميع الأجهزة. يستخدم تقنية **Fluid Typography** مع دالة `clamp()` للحصول على أحجام خطوط متجاوبة بسلاسة.

A modern and responsive typography system designed specifically for Arabic with full responsive support across all devices. Uses **Fluid Typography** with `clamp()` function for smooth responsive font sizes.

---

## 🔤 عائلات الخطوط | Font Families

### الخطوط الأساسية | Primary Fonts

| الخط | الاستخدام | CSS Class | Variable |
|------|-----------|-----------|----------|
| **Cairo** | العناوين الرئيسية والكبيرة | `.font-display`, `.font-heading` | `--font-cairo` |
| **Tajawal** | النصوص الأساسية والفقرات | `.font-body` | `--font-tajawal` |
| **IBM Plex Sans Arabic** | النصوص التقنية والأكاديمية | `.font-technical` | `--font-ibm-plex` |
| **Almarai** | الأزرار والعناصر التفاعلية | `.font-button` | `--font-almarai` |

### أمثلة الاستخدام | Usage Examples

```tsx
// العناوين الضخمة
<h1 className="font-display text-5xl">منصة خطى التعليمية</h1>

// النصوص الأساسية
<p className="font-body text-base">هذا نص تجريبي بخط Tajawal</p>

// النصوص التقنية
<p className="font-technical">محتوى تقني أو أكاديمي</p>

// نص الأزرار
<button className="font-button">ابدأ الآن</button>
```

---

## 📏 أحجام الخطوط | Font Sizes

### نظام Fluid Typography

جميع أحجام الخطوط تستخدم `clamp()` للتكيف التلقائي مع حجم الشاشة:

| Class | CSS Variable | Range | Usage |
|-------|--------------|-------|-------|
| `text-xs` | `--text-xs` | 12px → 14px | نصوص صغيرة جدًا |
| `text-sm` | `--text-sm` | 14px → 16px | نصوص صغيرة |
| `text-base` | `--text-base` | 16px → 18px | النصوص الأساسية |
| `text-lg` | `--text-lg` | 18px → 22px | نصوص كبيرة |
| `text-xl` | `--text-xl` | 20px → 26px | عناوين صغيرة |
| `text-2xl` | `--text-2xl` | 24px → 32px | عناوين متوسطة |
| `text-3xl` | `--text-3xl` | 30px → 42px | عناوين كبيرة |
| `text-4xl` | `--text-4xl` | 36px → 54px | عناوين كبيرة جدًا |
| `text-5xl` | `--text-5xl` | 48px → 72px | عناوين ضخمة |
| `text-6xl` | `--text-6xl` | 60px → 96px | عناوين ضخمة جدًا |
| `text-7xl` | `--text-7xl` | 72px → 120px | أكبر حجم |

### أحجام Display - للصفحات الرئيسية

| Class | Range | Usage |
|-------|-------|-------|
| `text-display-sm` | 48px → 72px | عناوين رئيسية صغيرة |
| `text-display-md` | 64px → 104px | عناوين رئيسية متوسطة |
| `text-display-lg` | 80px → 144px | عناوين رئيسية ضخمة |

---

## 📐 Classes الطباعة الجاهزة | Typography Utility Classes

### 1. العناوين الضخمة | Display Headings

```tsx
<h1 className="display-xl">عنوان ضخم جدًا</h1>
<h2 className="display-lg">عنوان ضخم كبير</h2>
<h3 className="display-md">عنوان ضخم متوسط</h3>
```

**الخصائص:**
- خط: Cairo (Display)
- الوزن: 800-900 (Extrabold/Black)
- Line Height: 1.15
- Letter Spacing: Tighter

### 2. العناوين القياسية | Standard Headings

```tsx
<h1 className="h1">عنوان H1</h1>
<h2 className="h2">عنوان H2</h2>
<h3 className="h3">عنوان H3</h3>
<h4 className="h4">عنوان H4</h4>
<h5 className="h5">عنوان H5</h5>
<h6 className="h6">عنوان H6</h6>
```

**أو:**
```tsx
<h1 className="heading-1">عنوان H1</h1>
<h2 className="heading-2">عنوان H2</h2>
// ... إلخ
```

### 3. النصوص الأساسية | Body Text

```tsx
<p className="body-text-xl">نص كبير جدًا</p>
<p className="body-text-lg">نص كبير (الافتراضي)</p>
<p className="body-text-base">نص أساسي</p>
<p className="body-text-sm">نص صغير</p>
<p className="body-text-xs">نص صغير جدًا</p>
```

**الخصائص:**
- خط: Tajawal (Body)
- الوزن: 400 (Normal)
- Line Height: 1.7 (Relaxed)

### 4. نصوص متخصصة | Specialized Text

```tsx
// نص تمهيدي
<p className="lead-text">نص تمهيدي مميز</p>

// نص تقني
<p className="technical-text">محتوى تقني أو أكاديمي</p>

// نص الأزرار
<button className="button-text">نص الزر</button>

// تسمية
<span className="label-text">تصنيف</span>

// اقتباس
<blockquote className="quote-text">"اقتباس مميز"</blockquote>

// Caption
<span className="caption-text">نص توضيحي</span>
```

---

## 🎯 أوزان الخطوط | Font Weights

```tsx
<p className="font-light">خفيف (300)</p>
<p className="font-normal">عادي (400)</p>
<p className="font-medium">متوسط (500)</p>
<p className="font-semibold">نصف عريض (600)</p>
<p className="font-bold">عريض (700)</p>
<p className="font-extrabold">عريض جدًا (800)</p>
<p className="font-black">أسود (900)</p>
```

---

## 📏 ارتفاعات الأسطر | Line Heights

محسّنة خصيصًا للنصوص العربية:

```tsx
<p className="leading-tight">1.25 - للعناوين الكبيرة</p>
<p className="leading-snug">1.4 - للعناوين الصغيرة</p>
<p className="leading-normal">1.5 - للنصوص القصيرة</p>
<p className="leading-relaxed">1.7 - للنصوص الطويلة (موصى به)</p>
<p className="leading-loose">1.85 - للقراءة المريحة</p>
<p className="leading-extra-loose">2 - للنصوص الكبيرة جدًا</p>
```

---

## 🔤 تباعد الأحرف | Letter Spacing

```tsx
<p className="tracking-tighter">-0.04em - للعناوين الضخمة</p>
<p className="tracking-tight">-0.02em - للعناوين</p>
<p className="tracking-normal">0 - عادي</p>
<p className="tracking-wide">0.015em - للنصوص الصغيرة</p>
<p className="tracking-wider">0.03em - للأزرار</p>
<p className="tracking-widest">0.05em - للنصوص الكبيرة</p>
<p className="tracking-super-wide">0.1em - للتأثيرات الخاصة</p>
```

---

## ⚙️ تحسينات عرض النصوص | Text Rendering Optimization

```tsx
// تحسين القراءة (موصى به للنصوص الطويلة)
<p className="text-optimize-legibility">
  نص محسّن للقراءة مع تفعيل الـ ligatures و kerning
</p>

// تحسين السرعة (للعناصر الكثيرة)
<p className="text-optimize-speed">نص محسّن للأداء</p>

// نص حاد (بدون تنعيم)
<p className="text-sharp">نص حاد</p>
```

---

## 📱 أمثلة عملية | Practical Examples

### بطاقة دورة تدريبية

```tsx
<div className="card-modern p-6">
  <h3 className="h3 mb-4">دورة المحاسبة المالية</h3>
  <p className="lead-text mb-4">
    تعلم أساسيات المحاسبة المالية من الصفر
  </p>
  <p className="body-text-base mb-6">
    دورة شاملة تغطي جميع جوانب المحاسبة المالية مع أمثلة عملية 
    وتطبيقات واقعية لمساعدتك على فهم المفاهيم بشكل عميق.
  </p>
  <div className="flex gap-4">
    <button className="button-text bg-primary-600 text-white px-6 py-3 rounded-lg">
      سجل الآن
    </button>
    <button className="button-text-sm border-2 border-primary-600 text-primary-600 px-4 py-2 rounded-lg">
      معاينة
    </button>
  </div>
</div>
```

### صفحة هبوط (Landing Page)

```tsx
<section className="hero-section">
  <h1 className="display-xl text-center mb-6 text-optimize-legibility">
    منصة خطى التعليمية
  </h1>
  <p className="lead-text text-center max-w-3xl mx-auto mb-8">
    بيئة تعليمية متكاملة للمحاسبة والمراجعة الداخلية
  </p>
  <p className="body-text-lg text-center max-w-2xl mx-auto mb-12">
    انضم إلى آلاف المتعلمين واحصل على شهادات معتمدة في المحاسبة 
    والمراجعة الداخلية من أفضل المدربين
  </p>
  <div className="flex justify-center gap-4">
    <button className="button-text-lg bg-primary-600 text-white px-8 py-4 rounded-xl">
      ابدأ التعلم مجانًا
    </button>
    <button className="button-text bg-white text-primary-600 px-6 py-3 rounded-lg border-2 border-primary-600">
      تصفح الدورات
    </button>
  </div>
</section>
```

### مقال أو محتوى طويل

```tsx
<article className="prose max-w-3xl mx-auto">
  <h1 className="h1 mb-4">عنوان المقال الرئيسي</h1>
  
  <p className="lead-text mb-6 text-optimize-legibility">
    مقدمة المقال تكون بخط أكبر لجذب الانتباه وتقديم نظرة عامة
  </p>
  
  <h2 className="h2 mt-8 mb-4">عنوان فرعي</h2>
  
  <p className="body-text-base leading-loose mb-4 text-optimize-legibility">
    محتوى المقال الأساسي بخط واضح ومريح للقراءة الطويلة. 
    نستخدم leading-loose لراحة أكبر في القراءة.
  </p>
  
  <blockquote className="quote-text my-8 border-r-4 border-primary-500 pr-6">
    "اقتباس مهم من المقال"
  </blockquote>
  
  <h3 className="h3 mt-6 mb-3">عنوان فرعي أصغر</h3>
  
  <p className="body-text-base leading-loose mb-4">
    المزيد من المحتوى...
  </p>
  
  <p className="caption-text mt-8">
    نُشر بتاريخ: 4 نوفمبر 2025
  </p>
</article>
```

---

## 🎨 أفضل الممارسات | Best Practices

### ✅ افعل | Do

1. **استخدم الخطوط المناسبة:**
   - Cairo للعناوين الرئيسية
   - Tajawal للنصوص الطويلة
   - IBM Plex للمحتوى التقني
   - Almarai للأزرار

2. **استخدم Line Heights المناسبة:**
   - `leading-tight` للعناوين الكبيرة
   - `leading-relaxed` أو `leading-loose` للفقرات الطويلة

3. **فعّل تحسينات النص:**
   ```tsx
   <article className="text-optimize-legibility">
     {/* محتوى المقال */}
   </article>
   ```

4. **استخدم Fluid Typography:**
   - الأحجام المحددة تتكيف تلقائيًا مع الشاشة
   - لا حاجة لـ media queries إضافية

### ❌ تجنب | Don't

1. **لا تخلط الخطوط بشكل عشوائي:**
   ```tsx
   {/* ❌ سيء */}
   <h1 className="font-body">عنوان</h1>
   <p className="font-heading">نص</p>
   
   {/* ✅ جيد */}
   <h1 className="font-heading">عنوان</h1>
   <p className="font-body">نص</p>
   ```

2. **لا تستخدم أحجام ثابتة:**
   ```tsx
   {/* ❌ سيء */}
   <h1 style={{ fontSize: '48px' }}>عنوان</h1>
   
   {/* ✅ جيد */}
   <h1 className="text-5xl">عنوان</h1>
   ```

3. **لا تتجاهل Line Height للنصوص العربية:**
   ```tsx
   {/* ❌ سيء */}
   <p className="leading-tight">فقرة طويلة...</p>
   
   {/* ✅ جيد */}
   <p className="leading-relaxed">فقرة طويلة...</p>
   ```

---

## 🔍 صفحة العرض التوضيحي | Demo Page

لمشاهدة جميع أنماط الطباعة في صفحة واحدة:

```
/typography-demo
```

أو قم بزيارة: `http://localhost:3000/typography-demo`

---

## 🛠️ التخصيص | Customization

### تخصيص الخطوط في `layout.tsx`:

```tsx
import { Cairo, Tajawal, IBM_Plex_Sans_Arabic, Almarai } from 'next/font/google';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

// ... باقي الخطوط
```

### تخصيص المتغيرات في `core.css`:

```css
:root {
  /* Fonts */
  --font-display: var(--font-cairo), 'Cairo', system-ui, sans-serif;
  --font-body: var(--font-tajawal), 'Tajawal', system-ui, sans-serif;
  
  /* Sizes */
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  
  /* Line Heights */
  --line-height-relaxed: 1.7;
}
```

---

## 📊 جدول مقارنة سريع | Quick Reference

| Use Case | Class | Font | Size | Weight |
|----------|-------|------|------|--------|
| Hero Title | `display-xl` | Cairo | 80-144px | 900 |
| Page Title | `h1` | Cairo | 48-72px | 700 |
| Section Title | `h2` | Cairo | 36-54px | 700 |
| Card Title | `h3` | Cairo | 30-42px | 600 |
| Paragraph | `body-text-base` | Tajawal | 16-18px | 400 |
| Button | `button-text` | Almarai | 16-18px | 600 |
| Caption | `caption-text` | Tajawal | 14-16px | 400 |
| Technical | `technical-text` | IBM Plex | 16-18px | 400 |

---

## 🌐 التوافق | Compatibility

- ✅ جميع المتصفحات الحديثة
- ✅ Safari, Chrome, Firefox, Edge
- ✅ iOS Safari 13.4+
- ✅ Android Chrome
- ✅ يدعم Dark Mode
- ✅ متجاوب بالكامل (Mobile, Tablet, Desktop)
- ✅ يدعم RTL و LTR

---

## 📝 ملاحظات إضافية | Additional Notes

1. **تحميل الخطوط:**
   - Cairo و Tajawal يتم تحميلهما مع `preload: true` للأداء الأفضل
   - IBM Plex و Almarai يتم تحميلهما عند الطلب

2. **Font Feature Settings:**
   - تم تفعيل `rlig`, `calt`, `liga`, `kern` لأفضل عرض للنصوص العربية

3. **Text Rendering:**
   - `optimizeLegibility` للنصوص الطويلة
   - `antialiased` و `grayscale` للتنعيم

4. **الأداء:**
   - استخدام `font-display: swap` لتجنب FOIT
   - استخدام `adjustFontFallback: true` للحد من Layout Shift

---

## 🎓 موارد إضافية | Additional Resources

- [Google Fonts - Cairo](https://fonts.google.com/specimen/Cairo)
- [Google Fonts - Tajawal](https://fonts.google.com/specimen/Tajawal)
- [MDN - clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
- [Fluid Typography Calculator](https://www.fluid-type-scale.com/)

---

**تم التطوير بواسطة منصة خطى التعليمية 🎨**

Last Updated: نوفمبر 2025

