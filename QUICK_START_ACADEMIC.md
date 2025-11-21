# 🚀 دليل البدء السريع - الهوية الأكاديمية

## 📦 التثبيت

```bash
# تثبيت التبعيات
npm install

# تشغيل المشروع
npm run dev
```

## 🎨 استخدام المكونات الجديدة

### 1. SmartHeader (الهيدر الذكي)

```tsx
import SmartHeader from '@/components/ui/SmartHeader';

function App() {
  return <SmartHeader />;
}
```

**الميزات**:
- يختفي عند التمرير للأسفل
- يظهر عند التمرير للأعلى
- شريط تقدم ملون
- قوائم منسدلة أنيقة

---

### 2. GlassCard (البطاقة الزجاجية)

```tsx
import { GlassCard } from '@/components/ui';

<GlassCard variant="elevated" hover glow="primary">
  <h3>عنوان البطاقة</h3>
  <p>محتوى البطاقة</p>
</GlassCard>
```

**الأنواع**:
- `default`: بطاقة عادية
- `elevated`: بطاقة مرتفعة مع ظل
- `outline`: بطاقة بحدود فقط
- `gradient`: بطاقة بتدرج لوني

---

### 3. ProgressRing (دائرة التقدم)

```tsx
import { ProgressRing } from '@/components/ui';

<ProgressRing 
  progress={75} 
  size="lg" 
  color="primary"
  showLabel
/>
```

**الأحجام**: `sm`, `md`, `lg`, `xl`
**الألوان**: `primary`, `accent`, `gold`, `mint`, `success`, `warning`, `error`

---

### 4. AcademicBadge (الشارة الأكاديمية)

```tsx
import { AcademicBadge } from '@/components/ui';
import { Award } from 'lucide-react';

<AcademicBadge variant="gold" size="lg" icon={Award}>
  أكملت 5 دورات
</AcademicBadge>
```

**الأنواع**: `primary`, `accent`, `gold`, `mint`, `success`, `warning`, `error`, `neutral`

---

### 5. AnimatedSection (القسم المتحرك)

```tsx
import { AnimatedSection } from '@/components/ui';

<AnimatedSection direction="up" stagger staggerDelay={0.1}>
  <div>عنصر 1</div>
  <div>عنصر 2</div>
  <div>عنصر 3</div>
</AnimatedSection>
```

**الاتجاهات**: `up`, `down`, `left`, `right`, `none`

---

## 🎨 استخدام الألوان

### في Tailwind Classes

```tsx
// الألوان الأساسية
<div className="bg-primary-500 text-white">
<div className="bg-academic-accent-500">
<div className="bg-accent-500">
<div className="bg-gold-500">
<div className="bg-mint-500">

// التدرجات
<div className="bg-gradient-to-r from-primary-600 to-academic-accent-600">
```

### في CSS Variables

```css
.my-element {
  background: var(--color-primary-500);
  color: var(--color-academic-accent-500);
  border: 1px solid var(--color-accent-500);
}
```

---

## 📝 استخدام الخطوط

### Noto Kufi Arabic (للعناوين)

```tsx
<h1 style={{
  fontFamily: "var(--font-noto-kufi-arabic), 'Noto Kufi Arabic', 'Cairo', sans-serif"
}}>
  عنوان أكاديمي
</h1>

// أو
<h1 className="font-heading">عنوان أكاديمي</h1>
```

### Cairo (للنصوص)

```tsx
<p className="font-body">نص عادي</p>
```

### Almarai (للأزرار)

```tsx
<button className="font-button">زر</button>
```

---

## 🎯 فئات CSS المساعدة

```tsx
// عناوين أكاديمية
<h1 className="heading-academic">عنوان متدرج</h1>

// تأثير زجاجي
<div className="glass-effect">محتوى شفاف</div>

// خلفية متدرجة
<div className="bg-academic-gradient">خلفية أكاديمية</div>

// توهج
<div className="glow-primary">عنصر متوهج</div>

// رفع عند الحوم
<div className="hover-lift">بطاقة ترتفع</div>

// بطاقة أكاديمية
<div className="card-academic">بطاقة جاهزة</div>

// زر أكاديمي
<button className="btn-academic">زر جاهز</button>
```

---

## 📱 مثال كامل

```tsx
import { 
  GlassCard, 
  ProgressRing, 
  AcademicBadge, 
  AnimatedSection 
} from '@/components/ui';
import { Award, BookOpen } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8">
      {/* العنوان */}
      <h1 className="heading-academic text-4xl">
        لوحة التحكم
      </h1>

      {/* الإحصائيات */}
      <AnimatedSection stagger staggerDelay={0.1}>
        <div className="grid grid-cols-3 gap-6">
          <GlassCard variant="elevated" hover glow="primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">الدورات</p>
                <p className="text-3xl font-bold text-primary-600">5</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary-600" />
            </div>
          </GlassCard>

          {/* المزيد من البطاقات... */}
        </div>
      </AnimatedSection>

      {/* التقدم */}
      <GlassCard variant="gradient" size="lg">
        <h2 className="text-2xl font-bold mb-6">التقدم الإجمالي</h2>
        <div className="flex justify-center">
          <ProgressRing 
            progress={75} 
            size="xl" 
            color="primary"
          />
        </div>
      </GlassCard>

      {/* الإنجازات */}
      <div className="flex gap-3">
        <AcademicBadge variant="gold" icon={Award}>
          5 دورات مكتملة
        </AcademicBadge>
        {/* المزيد من الشارات... */}
      </div>
    </div>
  );
}
```

---

## 🎨 نصائح التصميم

### 1. استخدم التدرجات اللونية
```tsx
<div className="bg-gradient-to-r from-primary-600 to-academic-accent-600">
```

### 2. أضف تأثيرات الحركة
```tsx
<div className="transition-all duration-300 hover:-translate-y-2">
```

### 3. استخدم الظلال الملونة
```tsx
<div className="shadow-elevation-3 hover:shadow-[0_10px_30px_rgba(91,54,232,0.2)]">
```

### 4. طبق Glassmorphism
```tsx
<div className="bg-white/90 backdrop-blur-xl border border-white/20">
```

---

## 📚 موارد إضافية

- [التوثيق الكامل](./ACADEMIC_MODERNIZATION.md)
- [سجل التحديثات](./CHANGELOG_ACADEMIC.md)
- [دليل المساهمة](./CONTRIBUTING.md)

---

**آخر تحديث**: ديسمبر 2024