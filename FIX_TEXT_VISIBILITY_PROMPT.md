# برومبت شامل لإصلاح مشكلة ظهور النص في الأزرار والقوائم عند hover

## المشكلة الأساسية

في مشروع Next.js + React + Tailwind CSS + Tailwind CSS Modules، هناك مشكلة في ظهور النص عند تمرير الماوس (hover) على الأزرار والقوائم في جميع أنحاء الموقع. النص يختفي أو لا يظهر بوضوح عند hover.

### المشاكل المحتملة:

1. **Overlay Elements تغطي النص**: عناصر `absolute inset-0` تستخدم كـ overlay effects قد تغطي النص
2. **مشاكل z-index**: العناصر النصية لا تحتوي على z-index صحيح
3. **مشاكل opacity/visibility**: النص قد يكون شفافاً أو مخفياً
4. **Tailwind Classes**: قد تكون هناك classes في Tailwind تتعارض مع ظهور النص
5. **CSS Modules**: قد تكون هناك قواعد CSS في modules تتعارض

## المتطلبات

1. **تحليل شامل للمشكلة:**
   - ابحث عن جميع الأزرار والقوائم في المشروع
   - ابحث عن أي overlay elements أو pseudo-elements (::before, ::after) قد تغطي النص
   - ابحث عن مشاكل z-index
   - ابحث عن مشاكل opacity أو visibility في hover states
   - ابحث عن CSS modules و Tailwind classes

2. **إصلاحات مطلوبة:**

   ### أ. إصلاح CSS العام (globals.css)
   - تأكد من أن جميع الأزرار (`button`, `[role="button"]`, `.btn`, `[class*="button"]`) لها:
     - `position: relative`
     - `z-index` مناسب
   - تأكد من أن جميع العناصر النصية داخل الأزرار (`button > *`, `button span`, `button div`) لها:
     - `position: relative`
     - `z-index: 10` (أعلى من overlay)
     - `opacity: 1 !important`
     - `visibility: visible !important`
   - تأكد من أن hover states تحافظ على هذه القيم:
     ```css
     button:hover > *,
     button:hover span,
     button:hover div {
       position: relative;
       z-index: 10;
       opacity: 1 !important;
       visibility: visible !important;
       color: inherit !important;
     }
     ```
   - تأكد من أن أي `::before` أو `::after` pseudo-elements لها:
     - `z-index: 1` (أقل من النص)
     - `pointer-events: none`

   ### ب. إصلاح CSS Modules
   - في `lessons-page.module.css`:
     - أصلح `.navButton` و `.btn` و `.moduleHeader`
     - أضف نفس القواعد المذكورة أعلاه

   ### ج. إصلاح المكونات React
   - تأكد من عدم وجود inline styles تتعارض مع CSS
   - تأكد من عدم وجود overlay elements تغطي النص
   - أزل أي `style={{ zIndex, opacity, visibility }}` غير ضرورية من المكونات

   ### د. إصلاح Tailwind Classes
   - في جميع الأزرار التي تستخدم Tailwind، تأكد من:
     - إضافة `relative` class للزر
     - إضافة `z-10` للأطفال (children) التي تحتوي على النص
     - إضافة hover states واضحة

3. **ملفات يجب مراجعتها:**

   - `src/styles/globals.css` - CSS العام
   - `src/components/layout/EnhancedNavbar.tsx` - شريط التنقل
   - `src/components/ui/SmartHeader.tsx` - هيدر ذكي
   - `src/components/SubscriptionComponent.tsx` - مكون الاشتراك
   - `src/app/(dashboard)/student/courses/[courseId]/lesson/lessons-page.module.css` - CSS الخاص بصفحات الدروس
   - `src/app/(dashboard)/student/courses/[courseId]/lesson/page.tsx` - صفحة الدروس
   - `src/components/ui/Button.tsx` - مكون الزر
   - `src/components/ui/UnifiedHeroSection.tsx` - مكون Hero
   - جميع الأزرار والقوائم في المشروع

4. **إرشادات محددة:**

   - استخدم `!important` فقط عند الضرورة القصوى
   - تأكد من أن الترتيب في CSS صحيح (لا تتعارض القواعد)
   - اختبر على جميع الصفحات:
     - صفحة الرئيسية
     - صفحة الكورسات
     - صفحة الدروس
     - صفحة الاشتراك
     - جميع القوائم والأزرار
   - تأكد من عمل الحل على:
     - Dark mode
     - Light mode
     - Mobile view
     - Desktop view

5. **الحل المطلوب:**

   أنشئ حل شامل يضمن:
   - النص يظهر دائماً في الأزرار والقوائم
   - النص يحتفظ بلونه عند hover
   - لا توجد overlay elements تغطي النص
   - z-index صحيح لجميع العناصر
   - الحل يعمل على جميع الصفحات والمكونات

## الخطوات المطلوبة

1. ابحث عن جميع الأماكن التي تحتوي على أزرار وقوائم
2. حلل CSS الموجود وحدد المشاكل
3. أصلح CSS العام أولاً
4. أصلح CSS Modules
5. أصلح المكونات React
6. اختبر الحل على جميع الصفحات
7. تأكد من عدم كسر أي تصميمات موجودة

## النتيجة المتوقعة

بعد التطبيق، يجب أن:
- النص يظهر بوضوح في جميع الأزرار عند hover
- النص يظهر بوضوح في جميع القوائم عند hover
- لا توجد مشاكل في z-index أو overlay
- التصميمات الموجودة تعمل بشكل صحيح

---

**ملاحظة:** استخدم أدوات البحث (`codebase_search`, `grep`) للعثور على جميع الأزرار والقوائم قبل البدء في الإصلاحات.

