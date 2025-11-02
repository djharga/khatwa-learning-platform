# دليل سريع للمطورين - مركز الكورسات

## 🚀 البدء السريع

### 1. تشغيل المشروع
```bash
npm install
npm run dev
```

### 2. الوصول للصفحة
```
http://localhost:3000/courses
```

## 📂 هيكل الملفات

```
src/app/
├── courses/
│   ├── page.tsx          ← الملف الرئيسي (مركز الكورسات)
│   └── [slug]/
│       └── page.tsx      ← صفحة الكورس الفردي
├── finance-basics/       ← (قديم - يمكن حذفه)
├── financial-management/ ← (قديم - يمكن حذفه)
└── ...
```

## 🔍 فهم الكود

### البيانات (Data)
```typescript
const courses = [
  {
    id: number,
    title: string,
    slug: string,
    description: string,
    category: string,
    level: "مبتدئ" | "متوسط" | "متقدم",
    duration: string,
    lessons: number,
    price: string,
    rating: number,
    students: number,
    image: string,
    files: number,
    videos: number,
    audios: number,
    modules: Array<{
      id: number,
      title: string,
      lessons: string[]
    }>
  }
]
```

### الحالات (States)
```typescript
const [searchQuery, setSearchQuery] = useState('');
const [selectedCategory, setSelectedCategory] = useState('all');
const [selectedLevel, setSelectedLevel] = useState('all');
const [expandedCourses, setExpandedCourses] = useState<Set<number>>(new Set());
```

### الفلترة (Filtering)
```typescript
const filteredCourses = courses.filter(course => {
  const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
  const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
  return matchesSearch && matchesCategory && matchesLevel;
});
```

## 🎨 التخصيص

### إضافة كورس جديد
```typescript
const courses = [
  // ... الكورسات الموجودة
  {
    id: 14,
    title: "دورة جديدة",
    slug: "new-course",
    description: "وصف الدورة",
    category: "المحاسبة المالية",
    level: "متوسط",
    duration: "8 أسابيع",
    lessons: 10,
    price: "$1,200",
    rating: 4.8,
    students: 100,
    image: "/courses/new-course.jpg",
    files: 15,
    videos: 24,
    audios: 8,
    modules: [
      {
        id: 1,
        title: "المحور الأول",
        lessons: ["درس 1", "درس 2", "درس 3"]
      }
    ]
  }
];
```

### تغيير الألوان
```typescript
// في Tailwind CSS classes
// الأساسي
from-primary to-secondary

// المستويات
مبتدئ: bg-green-500
متوسط: bg-blue-500
متقدم: bg-purple-500
```

### تعديل عدد الأعمدة
```typescript
// الحالي
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

// للتعديل:
// grid-cols-1 = عمود واحد على الهاتف
// sm:grid-cols-2 = عمودين على الشاشات الصغيرة
// lg:grid-cols-3 = ثلاثة أعمدة على الشاشات الكبيرة
// xl:grid-cols-4 = أربعة أعمدة على الشاشات الكبيرة جداً
```

## 🐛 استكشاف الأخطاء

### المشكلة: الفلاتر لا تعمل
**الحل**: تحقق من أن `selectedLevel` و `selectedCategory` يتم تحديثهما بشكل صحيح

### المشكلة: المحاور لا تظهر
**الحل**: تأكد من أن كل كورس له `modules` array مع بيانات صحيحة

### المشكلة: الصور لا تظهر
**الحل**: تحقق من أن مسارات الصور صحيحة في `/public/courses/`

### المشكلة: الرسوم المتحركة بطيئة
**الحل**: قلل مدة الرسوم المتحركة في Framer Motion

## 📊 الإحصائيات المهمة

```typescript
// عدد الكورسات المعروضة
filteredCourses.length

// إجمالي الطلاب
filteredCourses.reduce((sum, course) => sum + course.students, 0)

// متوسط التقييم
filteredCourses.reduce((sum, course) => sum + course.rating, 0) / filteredCourses.length

// إجمالي الساعات
filteredCourses.reduce((sum, course) => {
  const weeks = parseInt(course.duration);
  return sum + (weeks * 5);
}, 0)
```

## 🔗 الروابط المهمة

- **صفحة الكورسات**: `/courses`
- **صفحة كورس فردي**: `/courses/[slug]`
- **الصور**: `/public/courses/`
- **المكونات**: `/src/components/ui/`

## 📚 الموارد

- [Tailwind CSS Docs](https://tailwindcss.com)
- [Framer Motion Docs](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)
- [React Docs](https://react.dev)

## ✅ قائمة التحقق قبل النشر

- [ ] اختبار جميع الفلاتر
- [ ] اختبار البحث
- [ ] اختبار المحاور القابلة للتوسع
- [ ] اختبار على الهاتف
- [ ] اختبار على الجهاز اللوحي
- [ ] اختبار على الشاشة الكبيرة
- [ ] التحقق من الأداء
- [ ] التحقق من الأمان
- [ ] التحقق من الصور
- [ ] التحقق من الروابط

## 🚀 نصائح الأداء

1. **استخدم React.memo** للمكونات الثقيلة
2. **استخدم useCallback** للدوال المكررة
3. **استخدم useMemo** للحسابات المعقدة
4. **قلل عدد الـ re-renders** باستخدام الحالات بحكمة
5. **استخدم الصور المضغوطة** (WebP)

## 📞 الدعم

للمساعدة أو الأسئلة:
- تحقق من الملفات التوثيقية
- اطلع على الكود المعلق
- اختبر في وضع التطوير

---

**آخر تحديث**: 2024
**الإصدار**: 1.0
