# مكونات عرض المحتوى (Course Content Components)

هذه المكونات توفر واجهة احترافية لعرض محتوى الدورات بنظام ثلاثي الأعمدة.

## المكونات

### ModuleSidebar
عرض قائمة المحاور (Modules) في العمود الأيسر بعرض ثابت 280px.

**الخصائص:**
- عرض محاور الدورة في بطاقات
- حالة نشطة (Active) مع تأثيرات بصرية
- شريط تقدم لكل محور
- Skeleton loading state

### UnitSidebar
عرض المحاور الفرعية (Units/Lessons) في العمود الأوسط.

**الخصائص:**
- عرض الوحدات في قائمة عمودية
- Timeline جانبي لتتبع التقدم
- Progress dots (نقاط التقدم): أخضر للمكتمل، أصفر للجاري، رمادي للغير مكتمل
- Sticky header
- Skeleton loading state

### FileCard
بطاقة عرض ملف فردي.

**الخصائص:**
- أيقونات موحدة حسب نوع الملف:
  - PDF: أحمر
  - Word: أزرق
  - Excel: أخضر
  - Video: بنفسجي
  - Audio: برتقالي
  - ZIP: رمادي/أسود
- عرض حجم الملف ومدة الفيديو
- أزرار فتح وتحميل
- Badges للحالة (مطلوب، معاينة)

### FileList
قائمة عرض الملفات في العمود الأيمن.

**الخصائص:**
- عرض جميع ملفات الوحدة المختارة
- Sticky header
- Skeleton loading state

## Hooks

### useCourseModules
```typescript
const { data: modules, isLoading, error } = useCourseModules(courseId);
```
يجلب محاور دورة معينة.

### useModuleUnits
```typescript
const { data: units, isLoading, error } = useModuleUnits(courseId, moduleId);
```
يجلب الوحدات (Lessons) لمحور معين.

### useUnitFiles
```typescript
const { data: files, isLoading, error } = useUnitFiles(courseId, moduleId, lessonId);
```
يجلب الملفات (Content) لوحدة معينة.

## الصفحة الرئيسية

`/student/courses/[courseId]/content`

تجمع جميع المكونات معًا وتوفر:
- إدارة الحالة (Module → Unit → Files)
- معالجة الأخطاء
- Empty states
- Auto-selection للأول

## التصميم

- **الألوان الأساسية:**
  - Primary: #6366f1 (primary-500)
  - Background: #F9F9FB
  - Border radius: 12px
  - Padding: 16px

- **التأثيرات:**
  - Hover: تحريك 2px للأعلى + shadow
  - Active: border 2px + background أفتح + icon scale 1.05
  - Animations: framer-motion للنعومة

- **Typography:**
  - Font weight: 600-700 للعناوين
  - Icon size: 24-48px حسب الاستخدام

## الاستخدام

```tsx
import CourseContentPage from '@/app/(dashboard)/student/courses/[courseId]/content/page';

// الصفحة جاهزة للاستخدام مباشرة
// المسار: /student/courses/:courseId/content
```
