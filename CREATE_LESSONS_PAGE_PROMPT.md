# برومبت لإنشاء صفحة دروس احترافية أكاديمية

## المتطلبات

أنشئ صفحة دروس احترافية أكاديمية في Next.js 14+ مع React و TypeScript و Tailwind CSS، مشابهة لصفحة الدروس الموجودة في `/student/courses/[courseId]/lesson`.

## المواصفات الفنية

### 1. البنية الأساسية

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Direction**: RTL (Right-to-Left) للدعم الكامل للعربية
- **Location**: `src/app/[route]/lesson/page.tsx`

### 2. Layout الصفحة

الصفحة يجب أن تحتوي على 3 أعمدة:

#### أ. العمود الأيمن (RTL): قائمة المحاور والدروس
- **Width**: 280px (ثابت)
- **Position**: Fixed right
- **Content**: 
  - قائمة المحاور (Modules) مع إمكانية التوسيع/الطي (Accordion)
  - قائمة الدروس (Lessons) لكل محور
  - إظهار حالة الدرس (Active/Completed/In Progress)
- **Styling**:
  - خلفية بيضاء/فاتحة
  - Scrollable عند الحاجة
  - Hover effects واضحة
  - Active state مميز

#### ب. العمود الأوسط: محتوى الدرس
- **Width**: Flexible (flex: 1)
- **Content**:
  - عنوان الدرس
  - وصف الدرس
  - مشغل الفيديو (Video Player)
  - أهداف التعلم (Learning Objectives)
  - شريط التقدم (Progress Bar)
  - قسم الملاحظات (Notes)
  - أزرار التنقل (Previous/Next Lesson)
- **Styling**:
  - Max width: 1200px
  - Padding: 24px
  - Responsive design

#### ج. العمود الأيسر (RTL): قائمة الملفات
- **Width**: 320px (ثابت)
- **Position**: Fixed left
- **Content**:
  - قائمة ملفات الدرس
  - نوع الملف (Video/PDF/Audio)
  - حجم الملف
  - أزرار فتح/تحميل الملف
- **Styling**:
  - خلفية بيضاء/فاتحة
  - Scrollable عند الحاجة
  - File icons مميزة

### 3. المكونات المطلوبة

#### أ. LessonHero Component
- **Location**: `src/app/[route]/lesson/LessonHero.tsx`
- **Features**:
  - عنوان الكورس
  - عدد الدروس الكلي
  - عدد المحاور
  - Background gradient احترافي
  - Stats cards (عدد الدروس، عدد المحاور، التقدم)

#### ب. LessonContent Component
- **Location**: `src/app/[route]/lesson/LessonContent.tsx`
- **Features**:
  - Video Player (Responsive)
  - Lesson Title & Description
  - Learning Objectives (قائمة مع checkmarks)
  - Progress Indicator
  - Lesson Notes Section
  - Navigation Buttons (Previous/Next)

#### ج. ModuleSidebar Component (اختياري إذا تم استخدامه في أماكن أخرى)
- **Location**: `src/app/[route]/lesson/ModuleSidebar.tsx`
- **Features**:
  - Accordion للمحاور
  - List للدروس
  - Active state
  - Keyboard navigation

### 4. البيانات (Data Structure)

#### Module Interface
```typescript
interface Module {
  id: number;
  title: string;
  order: number;
  lessons: Lesson[];
  isLevel?: boolean; // للمراجعة الداخلية
  levelId?: 1 | 2 | 3; // للمراجعة الداخلية
}
```

#### Lesson Interface
```typescript
interface Lesson {
  id: number;
  title: string;
  order: number;
  description?: string;
  objectives?: string[];
  videoUrl?: string;
  files?: File[];
}
```

#### File Interface
```typescript
interface File {
  id: number;
  title: string;
  type: 'video' | 'pdf' | 'audio';
  size: string;
  duration?: string;
  url?: string;
  videoUrl?: string;
}
```

### 5. المميزات الوظيفية

#### أ. إدارة الحالة
- استخدام `useState` لإدارة:
  - المحاور المفتوحة (Expanded Modules)
  - الدرس المحدد (Selected Lesson)
  - حالة التقدم (Progress)
- استخدام `useEffect` لـ:
  - تحميل البيانات
  - حفظ التقدم في localStorage
  - فتح المحور الأول تلقائياً

#### ب. التنقل بين الدروس
- أزرار Previous/Next Lesson
- Keyboard shortcuts (Arrow Keys)
- Auto-expand module عند اختيار درس

#### ج. حفظ التقدم
- حفظ progress الفيديو في localStorage
- Auto-save عند التغيير
- Load progress عند تحميل الدرس

#### د. Video Player
- Responsive design
- Progress tracking
- Keyboard controls
- Fullscreen support

### 6. التصميم (Design Requirements)

#### أ. الألوان
- Primary: `#5B36E8` (Academic Purple)
- Background: `var(--color-background-primary)`
- Text: `var(--color-text-primary)`
- Borders: `var(--color-neutral-200)`
- Support Dark Mode

#### ب. Typography
- Headings: `var(--font-heading)` (Arabic font)
- Body: `var(--font-body)` (Arabic font)
- Font sizes: استخدام CSS variables من design system

#### ج. Spacing & Layout
- استخدام 8px grid system
- Padding: `var(--spacing-*)`
- Border radius: `var(--radius-*)`
- Shadows: `var(--shadow-elevation-*)`

#### د. Animations
- Smooth transitions (200ms)
- Hover effects
- Active states
- Accordion animations
- Reduced motion support

### 7. CSS Modules Structure

#### أ. CSS File
- **Location**: `src/app/[route]/lesson/lessons-page.module.css`
- **Classes المطلوبة**:
  - `.lessonsPageContainer`
  - `.header`
  - `.modulesColumn`
  - `.moduleItem`
  - `.moduleHeader`
  - `.lessonItem`
  - `.contentColumn`
  - `.filesColumn`
  - `.fileCard`
  - `.btn`, `.btnPrimary`, `.btnSecondary`
  - `.navButton`, `.navButtonPrevious`, `.navButtonNext`
  - `.emptyState`
  - `.modal`

### 8. Responsive Design

#### Desktop (> 1024px)
- 3 columns layout (Modules | Content | Files)
- Fixed sidebars
- Full feature set

#### Tablet (768px - 1024px)
- 2 columns (Modules | Content)
- Files في modal أو dropdown
- Smaller padding

#### Mobile (< 768px)
- Single column
- Sidebars في drawer/modal
- Stacked navigation buttons
- Touch-friendly targets (min 44px)

### 9. Accessibility (a11y)

- ARIA labels للعناصر التفاعلية
- Keyboard navigation كامل
- Focus states واضحة
- Screen reader support
- High contrast mode support
- WCAG AA compliance

### 10. Performance

- Code splitting للمكونات الثقيلة
- Lazy loading للفيديو
- Optimized images
- Minimal re-renders
- Efficient state management

### 11. مثال على الاستخدام

```tsx
// src/app/[route]/lesson/page.tsx
'use client';

import { useState, useEffect } from 'react';
import LessonHero from './LessonHero';
import LessonContent from './LessonContent';
import styles from './lessons-page.module.css';

export default function LessonsPage() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({});
  
  // ... rest of implementation
}
```

## الملفات المطلوبة

1. `src/app/[route]/lesson/page.tsx` - الصفحة الرئيسية
2. `src/app/[route]/lesson/LessonHero.tsx` - Hero section
3. `src/app/[route]/lesson/LessonContent.tsx` - محتوى الدرس
4. `src/app/[route]/lesson/lessons-page.module.css` - CSS styles
5. `src/types/lesson.ts` (اختياري) - Type definitions

## النتيجة المتوقعة

صفحة دروس احترافية أكاديمية تحتوي على:
- ✅ Layout منظم بثلاثة أعمدة
- ✅ Navigation سلس بين الدروس
- ✅ Video player متجاوب
- ✅ Progress tracking
- ✅ Responsive design كامل
- ✅ Dark mode support
- ✅ Accessibility كاملة
- ✅ RTL support كامل
- ✅ Performance optimized

## ملاحظات إضافية

- استخدم Design System الموجود في `src/tokens.ts`
- اتبع نفس الأنماط المستخدمة في `src/app/(dashboard)/student/courses/[courseId]/lesson`
- تأكد من عمل Text visibility بشكل صحيح (راجع FIX_TEXT_VISIBILITY_PROMPT.md)
- استخدم CSS Variables من `globals.css`
- تأكد من أن جميع الأزرار والقوائم تعمل بشكل صحيح

