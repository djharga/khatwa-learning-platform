# Performance Optimization Components

هذا المجلد يحتوي على مكونات تحسين الأداء للمشروع.

## المكونات المتاحة

### 1. ErrorBoundary

مكون لمعالجة الأخطاء في React:

```tsx
import { ErrorBoundary } from './performance';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>;
```

### 2. LazyWrapper

مكون للتحميل المؤجل مع تأثيرات بصرية:

```tsx
import { LazyWrapper, withLazyLoading } from './performance';

// استخدام مباشر
<LazyWrapper delay={200} fallback={<LoadingSpinner />}>
  <HeavyComponent />
</LazyWrapper>;

// HOC
const LazyComponent = withLazyLoading(HeavyComponent, <LoadingSpinner />, 200);
```

### 3. PerformanceMonitor

مراقب الأداء في الوقت الفعلي:

```tsx
import { PerformanceMonitor } from './performance';

<PerformanceMonitor enabled={true} position="top-right" compact={false} />;
```

### 4. MemoizedComponents

مكونات محسنة للأداء:

```tsx
import {
  MemoizedButton,
  MemoizedInput,
  MemoizedCard,
  MemoizedList,
  MemoizedModal,
  MemoizedTooltip,
} from './performance';

<MemoizedButton variant="primary" size="lg" loading={false}>
  حفظ
</MemoizedButton>;
```

## Hooks المتاحة

### usePerformanceMonitor

```tsx
import { usePerformanceMonitor } from './performance';

const MyComponent = () => {
  usePerformanceMonitor('MyComponent');
  // ...
};
```

### useIntersectionObserver

```tsx
import { useIntersectionObserver } from './performance';

const MyComponent = () => {
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref);

  return <div ref={ref}>Content</div>;
};
```

### useVirtualScrolling

```tsx
import { useVirtualScrolling } from './performance';

const MyComponent = () => {
  const { visibleItems, totalHeight, offsetY } = useVirtualScrolling(
    1000, // itemCount
    50, // itemHeight
    400 // containerHeight
  );

  return (
    <div style={{ height: 400, overflow: 'auto' }}>
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((index) => (
            <div key={index} style={{ height: 50 }}>
              Item {index}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

## Utilities

### performanceUtils

```tsx
import { performanceUtils } from './performance';

// Debounce
const debouncedSearch = performanceUtils.debounce(searchFunction, 300);

// Throttle
const throttledScroll = performanceUtils.throttle(scrollFunction, 100);

// Measure execution time
const measuredFunction = performanceUtils.measureTime(myFunction, 'MyFunction');

// Get memory usage
const memoryUsage = performanceUtils.getMemoryUsage();

// Get performance metrics
const metrics = performanceUtils.getPerformanceMetrics();
```

### useDebounce & useThrottle

```tsx
import { useDebounce, useThrottle } from './performance';

const MyComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const throttledValue = useThrottle(someValue, 100);

  // ...
};
```

## أفضل الممارسات

### 1. استخدام Memoization

```tsx
import { memo, useMemo, useCallback } from 'react';

const MyComponent = memo(() => {
  const expensiveValue = useMemo(() => {
    return heavyCalculation();
  }, [dependency]);

  const handleClick = useCallback(() => {
    // handle click
  }, [dependency]);

  return <div onClick={handleClick}>{expensiveValue}</div>;
});
```

### 2. Lazy Loading للمكونات الثقيلة

```tsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

const App = () => (
  <Suspense fallback={<Loading />}>
    <HeavyComponent />
  </Suspense>
);
```

### 3. Virtual Scrolling للقوائم الطويلة

```tsx
import { useVirtualScrolling } from './performance';

const LongList = ({ items }) => {
  const { visibleItems, totalHeight, offsetY } = useVirtualScrolling(
    items.length,
    50,
    400
  );

  return (
    <div style={{ height: 400, overflow: 'auto' }}>
      {/* Render only visible items */}
    </div>
  );
};
```

### 4. Error Boundaries

```tsx
import { ErrorBoundary } from './performance';

const App = () => (
  <ErrorBoundary>
    <MyApp />
  </ErrorBoundary>
);
```

## مراقبة الأداء

### في التطوير

```tsx
import { PerformanceMonitor } from './performance';

const App = () => (
  <>
    <PerformanceMonitor
      enabled={process.env.NODE_ENV === 'development'}
      position="top-right"
    />
    <MyApp />
  </>
);
```

### في الإنتاج

```tsx
// إخفاء مراقب الأداء في الإنتاج
<PerformanceMonitor enabled={false} showInProduction={false} />
```

## نصائح إضافية

1. **استخدم React.memo** للمكونات التي لا تتغير كثيراً
2. **استخدم useMemo** للحسابات المكلفة
3. **استخدم useCallback** للدوال الممررة كـ props
4. **استخدم Lazy Loading** للمكونات الثقيلة
5. **استخدم Virtual Scrolling** للقوائم الطويلة
6. **راقب الأداء** باستخدام PerformanceMonitor
7. **استخدم Error Boundaries** لمعالجة الأخطاء
8. **استخدم Debounce/Throttle** للأحداث المتكررة
