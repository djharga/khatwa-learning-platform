# HeroSection Component

مكون Hero Section قابل لإعادة الاستخدام مع معايير Design System الكاملة.

## المميزات

✅ **WCAG AA Compliant** - نسبة تباين ≥ 4.5:1  
✅ **Responsive** - يعمل على جميع الأجهزة (640, 768, 1024, 1280)  
✅ **Typography Scale** - نسبة 1.25 (Minor Third)  
✅ **Spacing System** - نظام مسافات موحد (8px base unit)  
✅ **Performance Optimized** - تحسين الأداء (LCP < 2.5s, CLS = 0)  
✅ **Accessibility** - دعم كامل للوصولية (ARIA labels, semantic HTML)  
✅ **Theme Variants** - متغيرات متعددة (primary, secondary, dark, light, gradient)  
✅ **Animation Support** - دعم الأنيميشن مع احترام prefers-reduced-motion  

## الاستخدام الأساسي

```tsx
import { HeroSection } from '@/components/ui/HeroSection';

<HeroSection
  title="عنوان رئيسي"
  description="وصف تفصيلي للصفحة"
  variant="primary"
  size="md"
/>
```

## مع خلفية صورة

```tsx
<HeroSection
  title="منصة التعلم المهني"
  description="احترف المراجعة الداخلية والمحاسبة"
  backgroundImage="/assets/hero-main-banner.jpg"
  variant="primary"
  size="lg"
  badges={[
    { label: 'معتمد دولياً', icon: <Award /> },
    { label: 'شهادات معتمدة', icon: <BookOpen /> },
  ]}
  cta={{
    label: 'ابدأ الآن',
    href: '/courses',
    variant: 'primary',
  }}
/>
```

## مع إحصائيات

```tsx
<HeroSection
  title="إحصائيات منصة خطى"
  description="انضم إلى آلاف المحترفين"
  backgroundImage="/assets/hero-main-banner.jpg"
  variant="primary"
  stats={[
    { value: '5,000+', label: 'متخصص معتمد', icon: <Users /> },
    { value: '50+', label: 'دورة تدريبية', icon: <BookOpen /> },
    { value: '95%', label: 'رضا المتدربين', icon: <Star /> },
  ]}
  cta={{
    label: 'استكشف الدورات',
    href: '/courses',
  }}
/>
```

## Props

### Content Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | العنوان الرئيسي |
| `description` | `string` | - | الوصف التفصيلي |
| `subtitle` | `string` | - | العنوان الفرعي |

### Visual Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'dark' \| 'light' \| 'gradient'` | `'primary'` | نوع التصميم |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | حجم القسم |
| `backgroundImage` | `string` | - | رابط صورة الخلفية |
| `backgroundVideo` | `string` | - | رابط فيديو الخلفية |
| `backgroundGradient` | `string` | - | Gradient CSS class للخلفية |
| `overlayOpacity` | `number` | `60` | شفافية الـ overlay (0-100) |

### Element Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `badges` | `HeroBadge[]` | `[]` | قائمة الشارات |
| `stats` | `HeroStat[]` | `[]` | قائمة الإحصائيات |
| `cta` | `HeroCTA \| HeroCTA[]` | - | أزرار الدعوة للإجراء |
| `children` | `ReactNode` | - | محتوى مخصص |

### Customization Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | CSS classes إضافية للقسم |
| `contentClassName` | `string` | `''` | CSS classes للمحتوى |
| `titleClassName` | `string` | `''` | CSS classes للعنوان |
| `descriptionClassName` | `string` | `''` | CSS classes للوصف |

### Animation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableAnimation` | `boolean` | `true` | تفعيل الأنيميشن |
| `animationDelay` | `number` | `0` | تأخير الأنيميشن (بالثواني) |

### Accessibility Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | - | ARIA label للقسم |
| `role` | `string` | `'banner'` | HTML role |

### Performance Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imagePriority` | `boolean` | `true` | أولوية تحميل الصورة |
| `imageQuality` | `number` | `85` | جودة الصورة (0-100) |
| `lazyLoad` | `boolean` | `false` | تحميل كسول للصورة |

## Types

### HeroBadge

```tsx
interface HeroBadge {
  label: string;
  icon?: ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning';
}
```

### HeroStat

```tsx
interface HeroStat {
  value: string | number;
  label: string;
  icon?: ReactNode;
}
```

### HeroCTA

```tsx
interface HeroCTA {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: ReactNode;
}
```

## Variants

### Primary (افتراضي)
- Overlay: `bg-black/60`
- Text: أبيض
- مناسب للخلفيات الداكنة

### Secondary
- Overlay: `bg-primary-900/60`
- Text: أبيض
- مناسب للعلامة التجارية

### Dark
- Overlay: `bg-black/70`
- Text: أبيض
- مناسب للخلفيات الداكنة جداً

### Light
- Overlay: `bg-white/40`
- Text: رمادي داكن
- مناسب للخلفيات الفاتحة

### Gradient
- Overlay: `bg-black/60`
- Text: أبيض
- مناسب للخلفيات المتدرجة

## Sizes

### sm
- Min Height: `40vh - 45vh`
- Title: `2xl - 5xl`
- Padding: `py-12 - py-16`

### md (افتراضي)
- Min Height: `50vh - 60vh`
- Title: `3xl - 3.5rem`
- Padding: `py-16 - py-24`

### lg
- Min Height: `60vh - 75vh`
- Title: `4xl - 4.5rem`
- Padding: `py-20 - py-32`

### xl
- Min Height: `70vh - 85vh`
- Title: `5xl - 6rem`
- Padding: `py-24 - py-40`

## Design System Standards

### Typography Scale (1.25 ratio - Minor Third)
- Base: 16px
- Scale: 1.25
- Sizes: 16px, 20px, 25px, 31.25px, 39px, 48.8px, 61px

### Spacing System (8px base unit)
- 8px = 0.5rem (gap-2)
- 16px = 1rem (gap-4)
- 24px = 1.5rem (gap-6)
- 32px = 2rem (gap-8) - **Standard spacing between elements**

### Contrast Ratio
- جميع النصوص: ≥ 4.5:1 (WCAG AA)
- الأزرار: ≥ 4.5:1
- الشارات: ≥ 4.5:1

## Responsive Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

## Accessibility

- ✅ Semantic HTML (`<section>` with `role="banner"`)
- ✅ ARIA labels على جميع العناصر التفاعلية
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Respects `prefers-reduced-motion`

## Performance

- ✅ Optimized images (quality 85, proper sizing)
- ✅ Lazy loading support
- ✅ GPU acceleration for animations
- ✅ Minimal re-renders
- ✅ LCP optimization

## Examples

### مثال كامل - Course Hero

```tsx
<HeroSection
  title="دورة المراجعة الداخلية المتقدمة"
  description="تعلم أساسيات المراجعة الداخلية والمحاسبة مع أفضل الخبراء"
  backgroundImage="/assets/course-hero.jpg"
  variant="primary"
  size="lg"
  badges={[
    { label: 'متقدم', variant: 'warning' },
    { label: '40 ساعة', icon: <BookOpen className="w-3.5 h-3.5" /> },
  ]}
  stats={[
    { value: '4.8', label: 'تقييم', icon: <Star className="w-5 h-5" /> },
    { value: '1,250', label: 'طالب', icon: <Users className="w-5 h-5" /> },
  ]}
  cta={[
    {
      label: 'شاهد معاينة',
      onClick: () => handlePlayPreview(),
      variant: 'primary',
      icon: <Play className="w-4 h-4" />,
    },
    {
      label: 'جرّب درسًا مجانًا',
      href: '/trial',
      variant: 'secondary',
    },
  ]}
/>
```

## Testing

```bash
# Run Storybook
npm run storybook

# Run tests
npm test HeroSection
```

## Migration Guide

للمهاجرة من Hero sections القديمة:

1. استبدل المكون القديم بـ `HeroSection`
2. حوّل الـ props إلى التنسيق الجديد
3. اختبر على جميع الأجهزة
4. تحقق من WCAG AA compliance

## Support

للدعم والمساعدة، راجع:
- [Design System Documentation](./DESIGN_SYSTEM.md)
- [Storybook Stories](./HeroSection.stories.tsx)
- [Unit Tests](./HeroSection.test.tsx)

