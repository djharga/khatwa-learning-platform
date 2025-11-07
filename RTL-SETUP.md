# إعدادات RTL الكاملة - Complete RTL Setup

## نظرة عامة

تم إعداد النظام بالكامل لدعم الاتجاه من اليمين لليسار (RTL) بشكل تلقائي دون الحاجة لإضافة `dir="rtl"` يدوياً في كل مكون.

## الملفات المحدثة

### 1. `tailwind.config.ts`
- ✅ إضافة دعم RTL مع logical properties
- ✅ إضافة animations آمنة مع RTL
- ✅ إضافة utilities للـ logical properties (ms-auto, me-auto, ps-0, pe-0)
- ✅ منع overflow مع `.overflow-x-safe`
- ✅ عزل الحركات مع `.motion-isolate`

### 2. `src/styles/core.css`
- ✅ إضافة دعم RTL كامل على مستوى HTML و body
- ✅ استخدام logical properties (margin-inline-start, padding-inline-end, etc.)
- ✅ عزل تأثيرات Framer Motion لتجنب كسر flex/grid
- ✅ منع overflow الذي يسبب انزياحاً
- ✅ دعم Radix UI components مع RTL

### 3. `src/app/layout.tsx`
- ✅ تطبيق `dir="rtl"` تلقائياً على HTML و body
- ✅ إضافة `overflow-x-hidden` لمنع الانزياح الأفقي

### 4. `src/components/ui/Dialog.tsx`
- ✅ تحديث Dialog component لدعم RTL
- ✅ استخدام logical properties للـ positioning
- ✅ تعديل موضع زر الإغلاق للـ RTL

## المكونات الجديدة

### `RTLCard` Component
بطاقة متوافقة مع RTL تستخدم logical properties.

```tsx
import { RTLCard } from '@/components/ui/RTLCard';

<RTLCard
  title="عنوان البطاقة"
  description="وصف البطاقة"
  variant="default" // أو "elevated" أو "outlined"
>
  محتوى البطاقة
</RTLCard>
```

### `RTLNavbar` Component
شريط تنقل متوافق مع RTL.

```tsx
import { RTLNavbar } from '@/components/ui/RTLNavbar';

<RTLNavbar
  logo={<span>خطى</span>}
  items={[
    { label: 'الرئيسية', href: '/' },
    { label: 'الدورات', href: '/courses' },
  ]}
  rightContent={<button>الملف الشخصي</button>}
/>
```

## الميزات الرئيسية

### 1. دعم RTL تلقائي
- لا حاجة لإضافة `dir="rtl"` يدوياً
- يتم تطبيقه تلقائياً على جميع العناصر

### 2. Logical Properties
استخدام الخصائص المنطقية بدلاً من left/right:
- `margin-inline-start` بدلاً من `margin-left`
- `padding-inline-end` بدلاً من `padding-right`
- `inset-inline-start` بدلاً من `left`

### 3. عزل Framer Motion
- استخدام `isolation: isolate` و `contain: layout style paint`
- منع كسر flex/grid أثناء الحركة
- استخدام `data-framer-component` للعناصر المتحركة

### 4. منع Overflow
- `overflow-x: hidden` على html و body
- `overscroll-behavior-x: contain`
- `max-width: 100vw` لمنع الانزياح

### 5. دعم Radix UI
- Dialog, Tabs, وغيرها تعمل بشكل صحيح مع RTL
- تعديل positioning تلقائياً

## أمثلة الاستخدام

### في صفحة Lesson
تم إضافة أمثلة على المكونات في:
`src/app/(dashboard)/student/courses/[id]/lesson/[lessonId]/page.tsx`

يمكنك رؤية:
- RTLNavbar في الأعلى
- 3 بطاقات RTLCard كمثال

## Utilities المتاحة

### Tailwind Classes
- `.ms-auto` - margin-inline-start: auto
- `.me-auto` - margin-inline-end: auto
- `.ps-0` - padding-inline-start: 0
- `.pe-0` - padding-inline-end: 0
- `.overflow-x-safe` - منع overflow آمن
- `.motion-isolate` - عزل الحركات

### CSS Classes
- `.motion-safe` - للعناصر الآمنة مع الحركة
- `[data-framer-component]` - للعناصر المتحركة

## ملاحظات مهمة

1. **Framer Motion**: استخدم `data-framer-component` على العناصر المتحركة
2. **Overflow**: استخدم `.overflow-x-safe` على الحاويات الكبيرة
3. **Logical Properties**: استخدم `margin-inline-start` بدلاً من `margin-left`
4. **Radix UI**: جميع المكونات تعمل تلقائياً مع RTL

## الاختبار

للتحقق من أن كل شيء يعمل:
1. افتح صفحة lesson
2. تحقق من أن Navbar و Cards تظهر بشكل صحيح
3. تحقق من عدم وجود overflow أفقي
4. تحقق من أن الحركات لا تكسر التخطيط

## الدعم

إذا واجهت مشاكل:
1. تأكد من أن `dir="rtl"` موجود على HTML element
2. استخدم logical properties بدلاً من left/right
3. أضف `motion-isolate` على العناصر المتحركة
4. استخدم `overflow-x-safe` على الحاويات

