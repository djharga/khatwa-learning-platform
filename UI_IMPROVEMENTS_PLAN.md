# خطة تحسينات واجهة المستخدم - موجزة

## الأولوية 1: Core Web Vitals (أعلى أثر)

### 1.1 تحسين LCP (Largest Contentful Paint)
```typescript
// src/app/layout.tsx - إضافة font-display: swap للخطوط
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap', // ✅ موجود
  preload: true, // ✅ موجود
  // إضافة دعم fallback محسّن
  fallback: ['Arial', 'Tahoma', 'system-ui'],
});
```

**الأمر:**
```bash
# فحص LCP
npm run build && npm run start
# فتح Chrome DevTools > Lighthouse > Run audit
```

### 1.2 منع CLS (Cumulative Layout Shift)
```typescript
// src/components/ui/Image.tsx - إضافة aspect-ratio
export function OptimizedImage({ ... }) {
  return (
    <div 
      className="relative overflow-hidden"
      style={{ 
        aspectRatio: width && height ? `${width}/${height}` : 'auto'
      }}
    >
      <Image {...imageProps} />
    </div>
  );
}
```

### 1.3 تحسين FID (First Input Delay)
```typescript
// src/app/layout.tsx - إضافة dynamic import للـ providers
import dynamic from 'next/dynamic';

const MSWProvider = dynamic(() => import('@/components/providers/MSWProvider'), {
  ssr: false,
});
```

---

## الأولوية 2: Accessibility (أ11y)

### 2.1 إضافة ARIA labels للعناصر التفاعلية
```typescript
// src/components/ui/Button.tsx - مثال
<button
  aria-label="إرسال النموذج"
  aria-busy={isLoading}
  aria-disabled={disabled}
>
  {children}
</button>
```

### 2.2 إضافة Skip Navigation
```typescript
// ✅ موجود في src/components/ui/accessibility
// التأكد من استخدامه في layout.tsx
import { SkipLink } from '@/components/ui/accessibility';
```

### 2.3 تحسين Keyboard Navigation
```typescript
// src/components/ui/Dialog.tsx - إضافة focus trap
import { FocusScope } from '@radix-ui/react-focus-scope';
```

---

## الأولوية 3: Mobile Responsiveness

### 3.1 تحسين Touch Targets
```typescript
// tailwind.config.ts - إضافة touch targets
extend: {
  touchAction: {
    'pan-x': 'pan-x',
    'pan-y': 'pan-y',
  },
  minTouchTarget: {
    DEFAULT: '44px',
  },
}
```

### 3.2 تحسين Viewport Meta
```typescript
// src/app/layout.tsx - التحقق من viewport
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};
```

---

## الأولوية 4: UX Enhancements

### 4.1 إضافة Skeleton Loading محسّن
```typescript
// src/components/ui/LoadingStates.tsx - تحسين SkeletonLoader
export const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2" />
    <div className="h-4 bg-neutral-200 rounded w-1/2" />
  </div>
);
```

### 4.2 إضافة Error Boundaries
```typescript
// src/components/ui/ErrorBoundary.tsx
'use client';
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>حدث خطأ</div>;
    }
    return this.props.children;
  }
}
```

### 4.3 تحسين Animations مع respect reduced motion
```typescript
// ✅ موجود في PageTransition.tsx
// التأكد من استخدام prefers-reduced-motion في جميع animations
const prefersReducedMotion = useReducedMotion();
```

---

## الأوامر السريعة

```bash
# 1. فحص Core Web Vitals
npm run build && npm run start
# Chrome DevTools > Lighthouse

# 2. فحص Accessibility
npm install -D @axe-core/react
# إضافة في src/app/layout.tsx (development only)

# 3. تحسين Bundle Size
ANALYZE=true npm run build
# فتح .next/analyze/client.html

# 4. فحص Mobile
# Chrome DevTools > Toggle device toolbar > Test different devices
```

---

## المكتبات الموصى بها

```bash
# تحسين الصور
npm install sharp

# Accessibility
npm install @axe-core/react @radix-ui/react-focus-scope

# Performance monitoring
npm install web-vitals @next/bundle-analyzer
```

---

## أولويات التنفيذ

1. **اليوم 1:** Core Web Vitals (LCP, CLS, FID)
2. **اليوم 2:** Accessibility (ARIA, keyboard navigation)
3. **اليوم 3:** Mobile responsiveness
4. **اليوم 4:** UX enhancements (error boundaries, loading states)

---

**النتيجة المتوقعة:** 
- LCP < 2.5s
- CLS < 0.1
- FID < 100ms
- Accessibility score > 90
- Mobile-friendly score > 95

