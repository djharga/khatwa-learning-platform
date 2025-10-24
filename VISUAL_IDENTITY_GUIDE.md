/* عنوان رئيسي */
.hero-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
}

/* نص المحتوى */
.content-text {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
}
```

## 3. نظام المسافات

### 8px Grid System
جميع المسافات مبنية على شبكة 8px للتناسق والتجاوب.

| المسافة | المتغير CSS | القيمة | الاستخدام |
|---------|-------------|--------|-----------|
| 0 | `--space-0` | 0 | لا مسافة |
| 1 | `--space-1` | 0.25rem (4px) | مسافات دقيقة |
| 2 | `--space-2` | 0.5rem (8px) | الوحدة الأساسية |
| 3 | `--space-3` | 0.75rem (12px) | مسافات صغيرة |
| 4 | `--space-4` | 1rem (16px) | مسافات متوسطة |
| 6 | `--space-6` | 1.5rem (24px) | مسافات كبيرة |
| 8 | `--space-8` | 2rem (32px) | مسافات الأقسام |
| 12 | `--space-12` | 3rem (48px) | مسافات واسعة |
| 16 | `--space-16` | 4rem (64px) | هوامش كبيرة |

### أمثلة على الاستخدام
```css
/* بطاقة قياسية */
.card {
  padding: var(--space-6);
  margin-bottom: var(--space-4);
}

/* قسم كامل */
.section {
  padding-top: var(--space-16);
  padding-bottom: var(--space-16);
}
```

## 4. نظام الظلال

### Shadows Scale
ظلال متدرجة لإضافة عمق بصري دون إفراط.

| الظل | المتغير CSS | القيمة |
|------|-------------|--------|
| xs | `--shadow-xs` | 0 1px 2px 0 rgba(0,0,0,0.05) |
| sm | `--shadow-sm` | 0 1px 3px 0 rgba(0,0,0,0.1) |
| md | `--shadow-md` | 0 4px 6px -1px rgba(0,0,0,0.1) |
| lg | `--shadow-lg` | 0 10px 15px -3px rgba(0,0,0,0.1) |
| xl | `--shadow-xl` | 0 20px 25px -5px rgba(0,0,0,0.1) |
| 2xl | `--shadow-2xl` | 0 25px 50px -12px rgba(0,0,0,0.25) |

### Colored Shadows للعناصر التفاعلية
| النوع | المتغير CSS | القيمة |
|-------|-------------|--------|
| Primary | `--shadow-primary` | 0 4px 12px rgba(99,102,241,0.3) |
| Accent | `--shadow-accent` | 0 4px 12px rgba(59,130,246,0.3) |
| Success | `--shadow-success` | 0 4px 12px rgba(34,197,94,0.3) |

### أمثلة على الاستخدام
```css
/* بطاقة تفاعلية */
.interactive-card {
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--duration-normal);
}

.interactive-card:hover {
  box-shadow: var(--shadow-xl);
}

/* زر أساسي */
.btn-primary {
  box-shadow: var(--shadow-primary);
}
```

## 5. نظام الحركات

### Durations
أوقات انتقال محدودة للحفاظ على الأداء.

| المدة | المتغير CSS | القيمة |
|-------|-------------|--------|
| Instant | `--duration-instant` | 75ms |
| Fast | `--duration-fast` | 150ms |
| Normal | `--duration-normal` | 200ms |
| Slow | `--duration-slow` | 300ms |
| Slower | `--duration-slower` | 500ms |

### Easing Functions
| النوع | المتغير CSS | القيمة |
|-------|-------------|--------|
| Linear | `--ease-linear` | linear |
| Ease In | `--ease-in` | cubic-bezier(0.4,0,1,1) |
| Ease Out | `--ease-out` | cubic-bezier(0,0,0.2,1) |
| Ease In Out | `--ease-in-out` | cubic-bezier(0.4,0,0.2,1) |
| Bounce | `--ease-bounce` | cubic-bezier(0.68,-0.55,0.265,1.55) |

### الحركات المسموحة فقط
- `fadeIn`: للظهور التدريجي
- `slideUp`: للانزلاق من الأسفل
- `scaleIn`: للتكبير التدريجي
- `shimmer`: لتأثير التحميل فقط
- `spin`: للـ loading spinners فقط

**ملاحظة:** جميع الحركات اللانهائية محظورة للحفاظ على الأداء.

## 6. مكونات موحدة

### Buttons
```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-xl);
  font-weight: var(--font-semibold);
}

/* Secondary Button */
.btn-secondary {
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  background: transparent;
}

/* Outline Button */
.btn-outline {
  border: 2px solid var(--color-accent);
  color: var(--color-accent);
}

/* Ghost Button */
.btn-ghost {
  color: var(--color-primary);
  background: transparent;
}
```

### Cards
```css
/* Base Card */
.card {
  background: var(--color-surface);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  padding: var(--space-6);
}

/* Compact Card */
.card-compact {
  padding: var(--space-4);
}

/* Spacious Card */
.card-spacious {
  padding: var(--space-8);
}
```

### Inputs
```css
/* Base Input */
.input-base {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: var(--radius-xl);
  background: var(--color-background);
}

/* Modern Input */
.input-modern {
  background: var(--color-background-alt);
  border: 1px solid rgba(0,0,0,0.1);
}
```

### Badges
```css
/* Icon Badge */
.badge-icon {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: rgba(99,102,241,0.1);
  border-radius: var(--radius-lg);
}

/* Text Badge */
.badge-text {
  padding: var(--space-1) var(--space-3);
  background: var(--color-accent);
  color: white;
  border-radius: var(--radius-full);
}
```

## 7. إرشادات RTL

### التعامل مع الاتجاه من اليمين لليسار
```css
/* RTL Support */
[dir="rtl"] {
  text-align: right;
}

[dir="rtl"] .icon {
  transform: scaleX(-1);
}
```

### الأيقونات التي تحتاج عكس
- أيقونات التنقل (السابق/التالي)
- أيقونات السهام
- أيقونات القوائم المنسدلة

### المحاذاة الصحيحة
- النصوص: `text-align: right`
- العناصر العائمة: استخدم `float: right` بدلاً من `left`
- المسافات: استخدم `margin-left` للمسافات الداخلية

## 8. Dark Mode

### كيفية دعم الوضع المظلم
```css
.dark {
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #cbd5e1;
}