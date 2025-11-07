# مكون الفيديو RTL - RTL Video Player Component

## نظرة عامة

تم إنشاء مكونين للفيديو متوافقين مع RTL:

1. **RTLVideoPlayer** - يستخدم ReactPlayer (يحتاج تثبيت `react-player`)
2. **RTLVideoPlayerSimple** - يستخدم HTML5 video element (لا يحتاج مكتبات إضافية)

## التثبيت

### إذا كنت تريد استخدام ReactPlayer:

```bash
npm install react-player
# أو
yarn add react-player
```

### إذا كنت تريد استخدام النسخة البسيطة:

لا حاجة لتثبيت أي شيء إضافي! ✅

## الميزات

✅ **نسبة 16:9 ثابتة** - باستخدام `aspect-ratio` CSS مع fallback للـ padding hack  
✅ **حاوية مركزية** - `max-width: 900px` (قابل للتخصيص)  
✅ **متجاوب بالكامل** - يعمل على جميع الشاشات  
✅ **دعم RTL كامل** - جميع العناصر متوافقة مع RTL  
✅ **منع Overflow** - لا يكسر التصميم  
✅ **عناصر تحكم مخصصة** - نظيفة وسهلة الاستخدام  
✅ **Fullscreen Support** - دعم ملء الشاشة  
✅ **Loading State** - مؤشر تحميل أثناء التحميل  
✅ **ظل خفيف وحواف ناعمة** - تصميم عصري  

## الاستخدام

### مثال 1: استخدام RTLVideoPlayerSimple (موصى به - لا يحتاج مكتبات)

```tsx
import { RTLVideoPlayerSimple } from '@/components/ui/RTLVideoPlayerSimple';

function MyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <RTLVideoPlayerSimple
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        title="عنوان الفيديو"
        poster="/poster-image.jpg"
        autoplay={false}
        controls={true}
        size="default"
        onPlay={() => console.log('تم التشغيل')}
        onPause={() => console.log('تم الإيقاف')}
        onEnded={() => console.log('اكتمل الفيديو')}
      />
    </div>
  );
}
```

### مثال 2: استخدام RTLVideoPlayer (مع ReactPlayer)

```tsx
import { RTLVideoPlayer } from '@/components/ui/RTLVideoPlayer';

function MyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <RTLVideoPlayer
        url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        title="عنوان الفيديو"
        poster="/poster-image.jpg"
        autoplay={false}
        controls={true}
        size="default"
        onPlay={() => console.log('تم التشغيل')}
        onPause={() => console.log('تم الإيقاف')}
        onEnded={() => console.log('اكتمل الفيديو')}
      />
    </div>
  );
}
```

## Props

### RTLVideoPlayerSimple

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | رابط الفيديو |
| `title` | `string` | `undefined` | عنوان الفيديو |
| `poster` | `string` | `undefined` | صورة البوستر |
| `autoplay` | `boolean` | `false` | تشغيل تلقائي |
| `controls` | `boolean` | `true` | إظهار عناصر التحكم |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | حجم الحاوية |
| `className` | `string` | `undefined` | CSS classes إضافية |
| `onPlay` | `() => void` | `undefined` | Callback عند التشغيل |
| `onPause` | `() => void` | `undefined` | Callback عند الإيقاف |
| `onEnded` | `() => void` | `undefined` | Callback عند اكتمال الفيديو |

### RTLVideoPlayer

نفس Props أعلاه، لكن:
- `src` → `url` (لأن ReactPlayer يستخدم `url`)

## أحجام الحاوية

- **small**: `max-width: 600px`
- **default**: `max-width: 900px` ⭐
- **large**: `max-width: 1200px`

## نسبة العرض إلى الارتفاع

المكون يستخدم نسبة 16:9 ثابتة باستخدام:

1. **CSS `aspect-ratio`** (للأجهزة الحديثة)
2. **Padding hack** (fallback للأجهزة القديمة): `padding-bottom: 56.25%`

```css
aspect-ratio: 16 / 9;
padding-bottom: 56.25%; /* 16:9 = 56.25% */
```

## دعم RTL

✅ جميع العناصر متوافقة مع RTL:  
- النصوص محاذاة لليمين
- الأزرار في المواضع الصحيحة
- Slider الصوت يبقى LTR (كما هو متوقع)
- Fullscreen يعمل بشكل صحيح

## منع Overflow

المكون يستخدم:
- `overflow-hidden` على الحاوية الخارجية
- `max-width` لتحديد العرض الأقصى
- `aspect-ratio` لمنع التمدد غير المرغوب

## التخصيص

### تغيير الحجم

```tsx
<RTLVideoPlayerSimple
  src="..."
  size="large" // أو "small" أو "default"
/>
```

### إضافة CSS classes

```tsx
<RTLVideoPlayerSimple
  src="..."
  className="my-custom-class"
/>
```

### إخفاء عناصر التحكم

```tsx
<RTLVideoPlayerSimple
  src="..."
  controls={false}
/>
```

## أمثلة متقدمة

### مع Tailwind Container

```tsx
<div className="max-w-7xl mx-auto px-4 py-8">
  <RTLVideoPlayerSimple
    src="..."
    title="فيديو تعليمي"
    size="default"
  />
</div>
```

### مع Grid Layout

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <RTLVideoPlayerSimple
    src="..."
    title="الفيديو الأول"
    size="default"
  />
  <RTLVideoPlayerSimple
    src="..."
    title="الفيديو الثاني"
    size="default"
  />
</div>
```

### مع Callbacks

```tsx
<RTLVideoPlayerSimple
  src="..."
  onPlay={() => {
    // تتبع التحليلات
    analytics.track('video_played');
  }}
  onPause={() => {
    // حفظ التقدم
    saveProgress();
  }}
  onEnded={() => {
    // إكمال الدرس
    markLessonComplete();
  }}
/>
```

## ملاحظات مهمة

1. **ReactPlayer**: إذا كنت تريد استخدام `RTLVideoPlayer`، تأكد من تثبيت `react-player` أولاً
2. **HTML5 Video**: `RTLVideoPlayerSimple` لا يحتاج أي مكتبات إضافية
3. **Poster Image**: استخدم صورة بوستر لتحسين تجربة المستخدم
4. **Autoplay**: بعض المتصفحات تمنع autoplay مع الصوت، استخدم `muted` إذا لزم الأمر
5. **Fullscreen**: يعمل على جميع المتصفحات الحديثة

## الدعم

إذا واجهت مشاكل:
1. تأكد من أن رابط الفيديو صحيح
2. تحقق من CORS إذا كان الفيديو من domain آخر
3. استخدم `RTLVideoPlayerSimple` إذا كان ReactPlayer يسبب مشاكل
4. تأكد من أن `dir="rtl"` موجود على HTML element

