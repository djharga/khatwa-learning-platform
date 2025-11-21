# برومبت لإنشاء Navigation Bar احترافي أكاديمي

## المتطلبات

أنشئ Navigation Bar (شريط تنقل) احترافي أكاديمي في Next.js 14+ مع React و TypeScript و Tailwind CSS، مناسب لمنصة تعليمية أكاديمية.

## المواصفات الفنية

### 1. البنية الأساسية

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Direction**: RTL (Right-to-Left) للدعم الكامل للعربية
- **Location**: `src/components/layout/AcademicNavbar.tsx`

### 2. Layout الشريط

#### أ. الهيكل الأساسي
- **Position**: Fixed top
- **Height**: 64px (Desktop), 56px (Mobile)
- **Background**: 
  - Light mode: `bg-white/95 backdrop-blur-lg`
  - Dark mode: `dark:bg-neutral-900/95 backdrop-blur-lg`
  - Transparent عند الـ scroll لأعلى
- **Border**: Bottom border عند الـ scroll
- **Shadow**: Elevation shadow عند الـ scroll
- **Z-index**: 50 (فوق المحتوى، تحت Modals)

#### ب. المحتوى
1. **Logo** (أقصى اليمين RTL):
   - النص "خطى" بخط عربي جميل
   - Icon اختياري
   - Link إلى الصفحة الرئيسية
   - Hover effect

2. **Navigation Menu** (الوسط):
   - عناصر القائمة:
     - الرئيسية
     - الكورسات
     - المراجعة الداخلية
     - CIA
     - المزيد (Dropdown)
   - Active state واضح
   - Hover effects
   - Dropdown menus للعناصر الفرعية

3. **Action Buttons** (أقصى اليسار RTL):
   - زر "دخول" (Secondary button)
   - زر "ابدأ الآن" (Primary button)
   - Icons: LogIn, UserPlus

4. **Mobile Menu Button** (Mobile only):
   - Hamburger icon
   - Toggle menu
   - Animation

### 3. المكونات المطلوبة

#### أ. Main Component: AcademicNavbar
```typescript
interface AcademicNavbarProps {
  className?: string;
}

export default function AcademicNavbar({ className }: AcademicNavbarProps)
```

#### ب. Navigation Items
```typescript
interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    label: 'الرئيسية',
    href: '/',
    icon: Home,
  },
  {
    label: 'الكورسات',
    href: '/courses',
    icon: BookOpen,
  },
  {
    label: 'المزيد',
    href: '#',
    icon: MoreHorizontal,
    children: [
      { label: 'المكتبة', href: '/resources' },
      { label: 'الموارد', href: '/resources' },
      { label: 'المجتمع', href: '/community' },
      { label: 'الأدوات', href: '/ai-tools' },
    ],
  },
];
```

### 4. المميزات الوظيفية

#### أ. Scroll Behavior
- **Scroll Detection**: 
  - تغيير الخلفية عند scroll > 20px
  - إضافة border و shadow
  - Smooth transition (300ms)

- **Hide on Scroll Down** (اختياري):
  - إخفاء الشريط عند scroll down
  - إظهاره عند scroll up
  - Smooth animation

#### ب. Dropdown Menus
- **Trigger**: Click أو Hover (Desktop)
- **Position**: Absolute positioning
- **Animation**: 
  - Fade in/out (200ms)
  - Slide down (10px)
  - Scale (0.95 → 1.0)
- **Auto Close**: عند النقر خارج القائمة
- **Keyboard Navigation**: Arrow keys, Enter, Escape

#### ج. Mobile Menu
- **Toggle**: Click على hamburger icon
- **Position**: Full screen overlay أو Slide from right
- **Animation**: Slide in/out (300ms)
- **Content**: نفس عناصر القائمة + Action buttons
- **Close**: عند اختيار عنصر أو النقر خارج القائمة

#### د. Active State
- **Detection**: استخدام `usePathname()` من `next/navigation`
- **Highlight**: 
  - Background color: `bg-primary-50 dark:bg-primary-900/10`
  - Text color: `text-primary-600 dark:text-primary-400`
  - Border (اختياري): `border-l-2 border-primary-500`

### 5. التصميم (Design Requirements)

#### أ. الألوان (Academic Design System)
- **Primary**: `#5B36E8` (Academic Purple)
- **Background**: 
  - Light: `white/95`
  - Dark: `neutral-900/95`
- **Text**: 
  - Light: `neutral-700`
  - Dark: `neutral-300`
- **Hover**: 
  - Background: `primary-50 dark:neutral-800`
  - Text: `primary-600 dark:primary-400`
- **Active**: 
  - Background: `primary-50 dark:primary-900/10`
  - Text: `primary-600 dark:primary-400`

#### ب. Typography
- **Font**: `var(--font-heading)` للعناوين
- **Size**: 
  - Menu items: `text-sm font-semibold`
  - Logo: `text-2xl font-extrabold`
- **Letter Spacing**: Normal
- **Line Height**: Tight

#### ج. Spacing
- **Container Padding**: `px-5 sm:px-6 lg:px-8`
- **Item Padding**: `px-4 py-2`
- **Gap**: `gap-7` (Desktop menu), `gap-3` (Mobile menu)
- **Dropdown Padding**: `px-5 py-3.5`

#### د. Borders & Shadows
- **Border**: `border-b border-neutral-200/50 dark:border-neutral-800/50`
- **Shadow**: `shadow-elevation-3` عند scroll
- **Dropdown Shadow**: `shadow-elevation-5`
- **Border Radius**: `rounded-xl` للـ dropdown

### 6. الأزرار (Buttons)

#### أ. Secondary Button (دخول)
```tsx
className="inline-flex items-center justify-center gap-1.5 h-[44px] px-[16px] rounded-[10px] 
text-sm font-semibold leading-none bg-transparent border-[1.5px] border-[#5B36E8] 
text-[#5B36E8] hover:bg-[#EDE9FE] active:bg-[#EDE9FE] 
transition-all duration-200 focus-visible:outline-none 
focus-visible:ring-[3px] focus-visible:ring-[rgba(91,54,232,0.2)] 
no-underline whitespace-nowrap"
```

#### ب. Primary Button (ابدأ الآن)
```tsx
className="inline-flex items-center justify-center gap-1.5 h-[44px] px-[16px] rounded-[10px] 
text-sm font-semibold leading-none text-white bg-[#5B36E8] 
border-[1.5px] border-transparent hover:bg-[#4C2EC7] 
active:bg-[#4C2EC7] active:shadow-[0_1px_4px_rgba(91,54,232,0.2)] 
transition-all duration-200 focus-visible:outline-none 
focus-visible:ring-[3px] focus-visible:ring-[rgba(91,54,232,0.3)] 
no-underline whitespace-nowrap shadow-md hover:shadow-lg"
```

### 7. Responsive Design

#### Desktop (> 1024px)
- Horizontal menu
- All items visible
- Dropdown on hover/click
- Full logo
- Both action buttons visible

#### Tablet (768px - 1024px)
- Horizontal menu
- Some items may collapse
- Dropdown on click only
- Full logo
- Both action buttons visible

#### Mobile (< 768px)
- Hamburger menu
- Logo + Menu button
- Full screen menu overlay
- Stacked menu items
- Action buttons في الـ menu
- Touch-friendly (min 44px height)

### 8. Animations & Transitions

#### أ. Scroll Transitions
- Background: `transition-all duration-300 ease-out`
- Border/Shadow: `transition-all duration-300 ease-out`

#### ب. Dropdown Animations
- Fade: `opacity: 0 → 1` (200ms)
- Slide: `translateY(-10px) → translateY(0)` (200ms)
- Scale: `scale(0.95) → scale(1)` (200ms)

#### ج. Mobile Menu Animations
- Slide: `translateX(100%) → translateX(0)` (300ms)
- Backdrop: `opacity: 0 → 1` (300ms)

#### د. Hover Effects
- Background: `transition-colors duration-200`
- Transform: `transition-transform duration-200`
- Shadow: `transition-shadow duration-200`

### 9. Accessibility (a11y)

#### أ. ARIA Labels
- `aria-label` لجميع الأزرار
- `aria-expanded` للـ dropdowns
- `aria-current="page"` للعنصر النشط
- `aria-haspopup="true"` للعناصر مع dropdowns

#### ب. Keyboard Navigation
- Tab navigation بين العناصر
- Enter/Space لتفعيل الأزرار
- Arrow keys للتنقل في dropdowns
- Escape لإغلاق dropdowns
- Focus visible واضح

#### ج. Screen Reader Support
- Semantic HTML
- Proper heading hierarchy
- Alt text للـ icons
- Descriptive labels

### 10. State Management

#### أ. useState Hooks
```typescript
const [isScrolled, setIsScrolled] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);
const [openDropdown, setOpenDropdown] = useState<string | null>(null);
```

#### ب. useEffect Hooks
```typescript
// Scroll detection
useEffect(() => {
  const onScroll = () => setIsScrolled(window.scrollY > 20);
  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll);
}, []);

// Close dropdown on route change
useEffect(() => {
  setOpenDropdown(null);
  setMobileOpen(false);
}, [pathname]);
```

### 11. مثال على الكود

```tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ChevronDown, Home, BookOpen, LogIn, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export default function AcademicNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Navigation items
  const navItems = [
    { label: 'الرئيسية', href: ROUTES.HOME, icon: Home },
    { label: 'الكورسات', href: ROUTES.COURSES, icon: BookOpen },
    // ... more items
  ];

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
      'border-b backdrop-blur-lg',
      isScrolled
        ? 'bg-white/95 dark:bg-neutral-900/95 shadow-lg border-neutral-200/50 dark:border-neutral-800/50'
        : 'bg-white/90 dark:bg-neutral-900/90 border-transparent'
    )}>
      {/* Content */}
    </nav>
  );
}
```

### 12. الملفات المطلوبة

1. `src/components/layout/AcademicNavbar.tsx` - المكون الرئيسي
2. `src/lib/routes.ts` (إذا لم يكن موجوداً) - Route constants
3. `src/components/ui/Dropdown.tsx` (اختياري) - مكون Dropdown منفصل

### 13. Integrations

#### أ. Next.js Navigation
- استخدام `Link` من `next/link`
- استخدام `usePathname()` من `next/navigation`
- استخدام `useRouter()` للـ navigation programmatic

#### ب. Icons
- استخدام `lucide-react` للـ icons
- Icons المطلوبة:
  - Home, BookOpen, Award, MoreHorizontal
  - LogIn, UserPlus
  - Menu, X, ChevronDown

#### ج. Utils
- استخدام `cn()` من `@/lib/utils` للـ className merging
- استخدام `ROUTES` constants للـ routes

### 14. النتيجة المتوقعة

Navigation Bar احترافي أكاديمي يحتوي على:
- ✅ Layout منظم وواضح
- ✅ Responsive design كامل
- ✅ Dropdown menus سلسة
- ✅ Mobile menu محسّن
- ✅ Scroll behavior احترافي
- ✅ Active state واضح
- ✅ Hover effects جميلة
- ✅ Dark mode support
- ✅ Accessibility كاملة
- ✅ RTL support كامل
- ✅ Text visibility صحيح (راجع FIX_TEXT_VISIBILITY_PROMPT.md)
- ✅ Performance optimized

### 15. ملاحظات إضافية

- استخدم Design System الموجود في `src/tokens.ts`
- اتبع نفس الأنماط المستخدمة في `src/components/layout/EnhancedNavbar.tsx`
- تأكد من عمل Text visibility بشكل صحيح (راجع FIX_TEXT_VISIBILITY_PROMPT.md)
- استخدم CSS Variables من `globals.css`
- تأكد من أن جميع الأزرار والقوائم تعمل بشكل صحيح عند hover
- استخدم `backdrop-blur` للحصول على glassmorphism effect
- أضف smooth transitions لجميع التفاعلات

