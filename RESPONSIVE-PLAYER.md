# ResponsivePlayer Component

## نظرة عامة

مكون فيديو متجاوب ومحسّن يحافظ على نسبة 16:9 دائماً، متوافق مع RTL و LTR، ومركزي في الصفحة.

## الميزات

✅ **نسبة 16:9 ثابتة** - باستخدام `aspect-video` من Tailwind  
✅ **لا يتمدد أو يتشوه** - يستخدم `object-contain` للحفاظ على النسبة  
✅ **مركزي في الصفحة** - `max-w-4xl mx-auto`  
✅ **ظل خفيف وحواف دائرية** - `shadow-lg rounded-xl`  
✅ **دعم RTL و LTR** - يرث direction من العنصر الأب  
✅ **منع التحميل** - `controlsList="nodownload"`  
✅ **استخدام Tailwind classes** - `aspect-video` و `relative`  

## الاستخدام

### مثال أساسي

```tsx
import { ResponsivePlayer } from '@/components/ui/ResponsivePlayer';

function MyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ResponsivePlayer
        src="https://example.com/video.mp4"
        title="عنوان الفيديو"
        poster="/poster.jpg"
        autoplay={false}
        controls={true}
      />
    </div>
  );
}
```

### مثال مع حفظ التقدم

```tsx
<ResponsivePlayer
  src="https://example.com/video.mp4"
  title="عنوان الفيديو"
  lessonId="lesson-123"
  courseId="course-456"
  onProgress={(progress) => {
    console.log(`التقدم: ${progress}%`);
  }}
  onEnded={() => {
    console.log('اكتمل الفيديو');
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | رابط الفيديو |
| `title` | `string` | `undefined` | عنوان الفيديو |
| `poster` | `string` | `undefined` | صورة البوستر |
| `autoplay` | `boolean` | `false` | تشغيل تلقائي |
| `controls` | `boolean` | `true` | إظهار عناصر التحكم |
| `className` | `string` | `undefined` | CSS classes إضافية |
| `onPlay` | `() => void` | `undefined` | Callback عند التشغيل |
| `onPause` | `() => void` | `undefined` | Callback عند الإيقاف |
| `onEnded` | `() => void` | `undefined` | Callback عند اكتمال الفيديو |
| `lessonId` | `string` | `undefined` | ID الدرس (لحفظ التقدم) |
| `courseId` | `string` | `undefined` | ID الكورس (لحفظ التقدم) |
| `onProgress` | `(progress: number) => void` | `undefined` | Callback عند تغيير التقدم |

## التصميم

### نسبة 16:9

المكون يستخدم `aspect-video` من Tailwind الذي يضمن نسبة 16:9 دائماً:

```tsx
<div className="relative w-full aspect-video">
  {/* الفيديو */}
</div>
```

### المراكزة

المكون مركزي باستخدام:

```tsx
<div className="w-full max-w-4xl mx-auto">
  {/* المحتوى */}
</div>
```

### الظل والحواف

```tsx
<div className="rounded-xl shadow-lg">
  {/* المحتوى */}
</div>
```

## دعم RTL و LTR

المكون يرث `direction` و `text-align` من العنصر الأب:

```tsx
// RTL
<div dir="rtl">
  <ResponsivePlayer src="..." />
</div>

// LTR
<div dir="ltr">
  <ResponsivePlayer src="..." />
</div>
```

## منع التحميل

المكون يمنع تحميل الفيديو باستخدام:

```tsx
<video controlsList="nodownload" disablePictureInPicture>
  {/* الفيديو */}
</video>
```

## حفظ التقدم

إذا تم تمرير `lessonId`، سيتم حفظ التقدم تلقائياً في `localStorage`:

```tsx
// حفظ التقدم
localStorage.setItem(`lesson-progress-${lessonId}`, progress);

// تحميل التقدم
const savedProgress = localStorage.getItem(`lesson-progress-${lessonId}`);
```

## أمثلة متقدمة

### مع Container

```tsx
<div className="max-w-7xl mx-auto px-4 py-8">
  <ResponsivePlayer
    src="..."
    title="فيديو تعليمي"
  />
</div>
```

### مع Grid Layout

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <ResponsivePlayer
    src="..."
    title="الفيديو الأول"
  />
  <ResponsivePlayer
    src="..."
    title="الفيديو الثاني"
  />
</div>
```

### مع Callbacks

```tsx
<ResponsivePlayer
  src="..."
  onPlay={() => {
    analytics.track('video_played');
  }}
  onPause={() => {
    saveProgress();
  }}
  onEnded={() => {
    markLessonComplete();
  }}
  onProgress={(progress) => {
    updateProgressBar(progress);
  }}
/>
```

## ملاحظات مهمة

1. **نسبة 16:9**: المكون يحافظ على النسبة دائماً باستخدام `aspect-video`
2. **object-contain**: الفيديو يستخدم `object-contain` لمنع التشوه
3. **مركزي**: `max-w-4xl mx-auto` يضمن المراكزة
4. **RTL/LTR**: يرث direction من العنصر الأب
5. **منع التحميل**: `controlsList="nodownload"` يمنع التحميل
6. **حفظ التقدم**: تلقائي عند تمرير `lessonId`

## الدعم

إذا واجهت مشاكل:
1. تأكد من أن رابط الفيديو صحيح
2. تحقق من CORS إذا كان الفيديو من domain آخر
3. تأكد من أن `aspect-video` متاح في Tailwind config
4. تحقق من أن `dir` موجود على العنصر الأب للـ RTL/LTR

