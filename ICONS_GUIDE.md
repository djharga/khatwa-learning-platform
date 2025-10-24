# 🎨 دليل الأيقونات الموحد - منصة خطى

## 📋 نظرة عامة

تم إنشاء نظام موحد للأيقونات في المنصة لضمان:
- ✅ **الاتساق**: جميع الأيقونات بنفس الأحجام والألوان
- ✅ **الوضوح**: strokeWidth موحد (2px) لجميع الأيقونات
- ✅ **إمكانية الوصول**: ألوان متوافقة مع WCAG
- ✅ **الأداء**: مكون خفيف وسريع
- ✅ **سهولة الاستخدام**: API بسيط وواضح

---

## 🚀 الاستخدام السريع

### 1. أيقونة بسيطة
```tsx
import { Icon } from '@/components/ui/Icon';
import { CheckCircle } from 'lucide-react';

<Icon icon={CheckCircle} size="md" variant="success" />
```

### 2. أيقونة مع خلفية
```tsx
import { IconWrapper } from '@/components/ui/Icon';
import { Shield } from 'lucide-react';

<IconWrapper 
  icon={Shield} 
  size="lg" 
  variant="primary" 
  background="light"
  rounded="xl"
/>
```

---

## 📐 الأحجام المتاحة

| الحجم | الأبعاد | الاستخدام |
|-------|---------|-----------|
| `xs` | 12×12px | أيقونات صغيرة جداً في النصوص |
| `sm` | 16×16px | أيقونات في الأزرار والروابط |
| `md` | 20×20px | **الحجم الافتراضي** - الاستخدام العام |
| `lg` | 24×24px | أيقونات بارزة في القوائم |
| `xl` | 32×32px | أيقونات رئيسية في البطاقات |
| `2xl` | 40×40px | أيقونات كبيرة في العناوين |

---

## 🎨 الألوان المتاحة (Variants)

| Variant | اللون | الاستخدام |
|---------|-------|-----------|
| `default` | slate-700 | الاستخدام العام |
| `primary` | blue-600 | الإجراءات الأساسية |
| `success` | green-600 | النجاح والإكمال ✓ |
| `warning` | amber-600 | التحذيرات ⚠️ |
| `error` | red-600 | الأخطاء ✗ |
| `info` | blue-500 | المعلومات ℹ️ |
| `muted` | slate-400 | أيقونات ثانوية |

---

## 📦 أمثلة عملية

### مؤشرات الثقة (Trust Indicators)
```tsx
<div className="flex items-center gap-3">
  <Icon icon={CheckCircle} size="md" variant="success" />
  <span className="text-slate-700 font-medium">معتمد من IIA</span>
</div>

<div className="flex items-center gap-3">
  <Icon icon={Award} size="md" variant="warning" />
  <span className="text-slate-700 font-medium">شهادات عالمية</span>
</div>

<div className="flex items-center gap-3">
  <Icon icon={Shield} size="md" variant="primary" />
  <span className="text-slate-700 font-medium">أمان متقدم</span>
</div>
```

### بطاقات الميزات (Feature Cards)
```tsx
<div className="space-y-4">
  <IconWrapper 
    icon={BookOpen} 
    size="xl" 
    variant="primary" 
    background="light"
    rounded="xl"
  />
  <h3 className="text-xl font-bold">دورات تدريبية</h3>
  <p className="text-slate-600">محتوى تعليمي عالي الجودة</p>
</div>
```

### أيقونات التنقل (Navigation)
```tsx
<Link href="/" className="flex items-center gap-2">
  <Icon icon={Home} size="sm" className="text-current" />
  <span>الرئيسية</span>
</Link>
```

### أزرار الإجراءات (Action Buttons)
```tsx
<button className="btn-primary flex items-center gap-2">
  <Icon icon={Download} size="sm" className="text-white" />
  <span>تحميل الشهادة</span>
</button>
```

### أيقونات وسائل التواصل (Social Media)
```tsx
<a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
  <Icon icon={Facebook} size="md" className="text-white" />
</a>
```

---

## 🔄 دليل الترحيل (Migration Guide)

### ❌ الطريقة القديمة
```tsx
// React Icons
import { AiOutlineHome } from 'react-icons/ai';
<AiOutlineHome className="w-5 h-5 text-blue-600" />

// Lucide مباشرة
import { CheckCircle } from 'lucide-react';
<CheckCircle className="w-5 h-5 text-green-600" />
```

### ✅ الطريقة الجديدة
```tsx
import { Icon } from '@/components/ui/Icon';
import { Home, CheckCircle } from 'lucide-react';

<Icon icon={Home} size="md" variant="primary" />
<Icon icon={CheckCircle} size="md" variant="success" />
```

---

## 📚 حالات الاستخدام الشائعة

### 1. قائمة الميزات
```tsx
const features = [
  { icon: CheckCircle, text: 'محاكاة واقعية', variant: 'success' },
  { icon: Users, text: 'خبراء معتمدون', variant: 'primary' },
  { icon: Award, text: 'شهادات عالمية', variant: 'warning' },
];

{features.map((feature) => (
  <div key={feature.text} className="flex items-center gap-3">
    <Icon icon={feature.icon} size="md" variant={feature.variant} />
    <span>{feature.text}</span>
  </div>
))}
```

### 2. بطاقات الإحصائيات
```tsx
<div className="card p-6">
  <IconWrapper 
    icon={TrendingUp} 
    size="lg" 
    variant="success" 
    background="light"
    rounded="lg"
  />
  <div className="mt-4">
    <div className="text-3xl font-bold">5000+</div>
    <div className="text-slate-600">متخصص معتمد</div>
  </div>
</div>
```

### 3. حالات التنبيه
```tsx
// Success
<div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
  <Icon icon={CheckCircle} size="md" variant="success" />
  <span className="text-green-800">تم الحفظ بنجاح</span>
</div>

// Error
<div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
  <Icon icon={AlertCircle} size="md" variant="error" />
  <span className="text-red-800">حدث خطأ</span>
</div>

// Warning
<div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
  <Icon icon={AlertTriangle} size="md" variant="warning" />
  <span className="text-amber-800">تحذير هام</span>
</div>
```

---

## ✅ أفضل الممارسات

### DO ✓
- استخدم `Icon` للأيقونات البسيطة
- استخدم `IconWrapper` للأيقونات مع خلفيات
- استخدم `size="md"` كحجم افتراضي
- استخدم `variant` المناسب للسياق
- استخدم `className="text-current"` للأيقونات التي تتبع لون النص
- استخدم `className="text-white"` للأيقونات على خلفيات داكنة

### DON'T ✗
- ❌ لا تستخدم أحجام مخصصة (`w-5 h-5`)
- ❌ لا تستخدم ألوان مباشرة (`text-blue-600`)
- ❌ لا تستخدم `strokeWidth` مختلف
- ❌ لا تستخدم `react-icons` للأيقونات الجديدة
- ❌ لا تنسى إضافة `flex-shrink-0` (مدمج في المكون)

---

## 🎯 الأيقونات الشائعة في المنصة

### التنقل والواجهة
- `Home` - الرئيسية
- `BookOpen` - الدورات
- `Users` - المجتمع
- `Settings` - الإعدادات
- `Menu` / `X` - القائمة

### الإجراءات
- `Download` - تحميل
- `Upload` - رفع
- `Edit` - تعديل
- `Trash` - حذف
- `Save` - حفظ

### الحالات
- `CheckCircle` - نجاح
- `XCircle` - خطأ
- `AlertTriangle` - تحذير
- `Info` - معلومات
- `Clock` - وقت

### التعليم
- `GraduationCap` - تخرج
- `Award` - جائزة
- `Certificate` - شهادة
- `BookOpen` - كتاب
- `Brain` - ذكاء

### الأمان
- `Shield` - حماية
- `Lock` - قفل
- `Eye` / `EyeOff` - إظهار/إخفاء
- `Key` - مفتاح

---

## 🔧 Props Reference

### Icon Component
```tsx
interface IconProps {
  icon: LucideIcon;           // required
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'muted';
  className?: string;
}
```

### IconWrapper Component
```tsx
interface IconWrapperProps extends IconProps {
  background?: 'none' | 'light' | 'solid';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}
```

---

## 🎨 أمثلة متقدمة

### أيقونة مع تأثير hover
```tsx
<button className="group">
  <Icon 
    icon={Heart} 
    size="md" 
    variant="error"
    className="group-hover:scale-110 transition-transform"
  />
</button>
```

### أيقونة متحركة
```tsx
<Icon 
  icon={Loader} 
  size="md" 
  variant="primary"
  className="animate-spin"
/>
```

### أيقونة مع badge
```tsx
<div className="relative">
  <Icon icon={Bell} size="lg" variant="default" />
  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
    3
  </span>
</div>
```

---

## 📱 الاستجابة (Responsive)

```tsx
// حجم مختلف حسب الشاشة
<Icon 
  icon={Star} 
  size="md"
  className="lg:w-8 lg:h-8"  // أكبر على الشاشات الكبيرة
/>
```

---

## ♿ إمكانية الوصول

```tsx
// إضافة aria-label للأيقونات التفاعلية
<button aria-label="إغلاق">
  <Icon icon={X} size="md" variant="default" />
</button>

// إخفاء الأيقونات الزخرفية عن قارئات الشاشة
<Icon icon={Star} size="sm" variant="warning" aria-hidden="true" />
```

---

## 🚀 الأداء

- حجم المكون: < 1KB
- Tree-shaking friendly
- لا re-renders غير ضرورية
- TypeScript optimized
- Zero runtime overhead

---

## 📞 الدعم

للأسئلة أو المشاكل:
1. راجع هذا الدليل أولاً
2. تحقق من `src/components/ui/Icon.md`
3. تواصل مع فريق التطوير

---

**آخر تحديث:** 2025
**الإصدار:** 1.0.0