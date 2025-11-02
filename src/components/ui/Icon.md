# Icon Component Documentation

## Overview
مكون موحد للأيقونات في المنصة يضمن الاتساق في الأحجام والألوان والاستخدام.

## Features
- ✅ أحجام موحدة (xs, sm, md, lg, xl, 2xl)
- ✅ ألوان متسقة مع نظام التصميم
- ✅ دعم الخلفيات (light, solid, none)
- ✅ strokeWidth موحد (2px)
- ✅ flex-shrink-0 لمنع التشوه
- ✅ TypeScript support كامل

## Usage

### Basic Icon
```tsx
import { Icon } from '@/components/ui/Icon';
import { CheckCircle } from 'lucide-react';

<Icon icon={CheckCircle} size="md" variant="success" />
```

### Icon with Background
```tsx
import { IconWrapper } from '@/components/ui/Icon';
import { Shield } from 'lucide-react';

<IconWrapper 
  icon={Shield} 
  size="lg" 
  variant="primary" 
  background="light"
  rounded="lg"
/>
```

## Props

### Icon Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | LucideIcon | required | الأيقونة من lucide-react |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' | 'md' | حجم الأيقونة |
| variant | 'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'muted' | 'default' | لون الأيقونة |
| className | string | - | CSS classes إضافية |

### IconWrapper Props
Includes all Icon props plus:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| background | 'none' \| 'light' \| 'solid' | 'light' | نوع الخلفية |
| rounded | 'sm' \| 'md' \| 'lg' \| 'full' | 'lg' | درجة الاستدارة |

## Size Reference
| Size | Dimensions | Use Case |
|------|------------|----------|
| xs | 12px × 12px | أيقونات صغيرة جداً في النصوص |
| sm | 16px × 16px | أيقونات في الأزرار والروابط |
| md | 20px × 20px | الحجم الافتراضي للأيقونات |
| lg | 24px × 24px | أيقونات بارزة في القوائم |
| xl | 32px × 32px | أيقونات رئيسية في البطاقات |
| 2xl | 40px × 40px | أيقونات كبيرة في العناوين |

## Variant Colors
| Variant | Color | Use Case |
|---------|-------|----------|
| default | slate-700 | الاستخدام العام |
| primary | blue-600 | الإجراءات الأساسية |
| success | green-600 | النجاح والإكمال |
| warning | amber-600 | التحذيرات |
| error | red-600 | الأخطاء |
| info | blue-500 | المعلومات |
| muted | slate-400 | أيقونات ثانوية |

## Examples

### Trust Indicators
```tsx
<div className="flex items-center gap-3">
  <Icon icon={CheckCircle} size="md" variant="success" />
  <span>معتمد من IIA</span>
</div>
```

### Feature Cards
```tsx
<IconWrapper 
  icon={Shield} 
  size="lg" 
  variant="primary" 
  background="light"
  rounded="xl"
/>
```

### Navigation Icons
```tsx
<Icon icon={Home} size="sm" className="text-current" />
```

### Social Media Icons
```tsx
<IconWrapper 
  icon={Facebook} 
  size="md" 
  variant="primary"
  background="solid"
  rounded="full"
/>
```

## Best Practices

### ✅ DO
- استخدم `Icon` للأيقونات البسيطة
- استخدم `IconWrapper` للأيقونات مع خلفيات
- استخدم `size="md"` كحجم افتراضي
- استخدم `variant` المناسب للسياق
- استخدم `className="text-current"` للأيقونات التي تتبع لون النص

### ❌ DON'T
- لا تستخدم أحجام مخصصة (w-5, h-5)
- لا تستخدم ألوان مباشرة (text-blue-600)
- لا تنسى `flex-shrink-0` (مدمج في المكون)
- لا تستخدم strokeWidth مختلف (موحد على 2)

## Migration Guide

### Before (Old Way)
```tsx
<CheckCircle className="w-5 h-5 text-green-600" />
```

### After (New Way)
```tsx
<Icon icon={CheckCircle} size="md" variant="success" />
```

## Accessibility
- جميع الأيقونات تحتوي على `flex-shrink-0` لمنع التشوه
- strokeWidth موحد على 2 للوضوح
- الألوان تتبع معايير WCAG للتباين
- يمكن إضافة `aria-label` عند الحاجة

## Performance
- المكون خفيف جداً (< 1KB)
- لا يوجد re-renders غير ضرورية
- Tree-shaking friendly
- TypeScript optimized