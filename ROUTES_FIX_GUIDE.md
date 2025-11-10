# دليل إصلاح الروابط والمسارات

## 📋 نظرة عامة

هذا الدليل يوضح كيفية إصلاح الروابط والمسارات المعطلة في المشروع بناءً على تقرير الفحص الشامل.

## 🔍 التقرير الشامل

راجع التقرير الكامل في: `ROUTES_ANALYSIS_REPORT.md`

## 🛠️ السكريبتات المتاحة

### 1. سكريبت التحليل

```bash
node scripts/analyze-routes-improved.js
```

**الوظيفة:** فحص شامل لجميع الروابط والمسارات في المشروع
**المخرجات:**
- `ROUTES_ANALYSIS.json` - تقرير JSON كامل
- تقرير في Terminal

### 2. سكريبت الإصلاح التلقائي

```bash
node scripts/fix-broken-routes.js
```

**الوظيفة:** إصلاح تلقائي للروابط المعطلة الشائعة
**الإصلاحات المتضمنة:**
- تحديث `/subscription` إلى `/subscribe`
- تحديث `/sitemap` إلى `/sitemap.xml`
- إنشاء صفحة `/unauthorized`

**⚠️ تحذير:** قم بعمل backup قبل تشغيل السكريبت

## 📝 الإصلاحات اليدوية المطلوبة

### 1. إصلاح روابط الاشتراك (أولوية عالية)

**المشكلة:** 6 ملفات تستخدم `/subscription` بدلاً من `/subscribe`

**الحل:**

#### الطريقة 1: استخدام السكريبت التلقائي
```bash
node scripts/fix-broken-routes.js
```

#### الطريقة 2: الإصلاح اليدوي
ابحث واستبدل في الملفات التالية:
- `src/app/courses/ai-audit/page.tsx`
- `src/app/courses/cia-preparation/page.tsx`
- `src/app/courses/compliance/page.tsx`
- `src/app/courses/digital-audit/page.tsx`
- `src/app/courses/financial-projects/page.tsx`
- `src/app/courses/risk-analysis/page.tsx`

استبدل:
```tsx
href="/subscription"
```

بـ:
```tsx
href="/subscribe"
```

### 2. إنشاء صفحة `/unauthorized` (أولوية عالية)

**المشكلة:** يتم التوجيه إلى `/unauthorized` لكن الصفحة غير موجودة

**الحل:**

#### الطريقة 1: استخدام السكريبت التلقائي
```bash
node scripts/fix-broken-routes.js
```

#### الطريقة 2: الإنشاء اليدوي
1. إنشاء المجلد: `src/app/unauthorized/`
2. إنشاء الملف: `src/app/unauthorized/page.tsx`
3. استخدام الكود من السكريبت أو تصميم صفحة مخصصة

### 3. إصلاح صفحات الإدارة المفقودة (أولوية عالية)

**المشكلة:** عدة صفحات إدارة مذكورة في `ModernAdminPanel.tsx` لكنها غير موجودة

**الحلول:**

#### الخيار 1: إنشاء الصفحات المفقودة

1. `/admin/navigation/edit`
   ```bash
   mkdir -p src/app/admin/navigation/edit
   touch src/app/admin/navigation/edit/page.tsx
   ```

2. `/admin/courses/new`
   ```bash
   mkdir -p src/app/admin/courses/new
   touch src/app/admin/courses/new/page.tsx
   ```

3. `/admin/roles`
   ```bash
   mkdir -p src/app/admin/roles
   touch src/app/admin/roles/page.tsx
   ```

4. `/admin/reports/performance`
   ```bash
   mkdir -p src/app/admin/reports/performance
   touch src/app/admin/reports/performance/page.tsx
   ```

5. `/admin/reports/revenue`
   ```bash
   mkdir -p src/app/admin/reports/revenue
   touch src/app/admin/reports/revenue/page.tsx
   ```

#### الخيار 2: إزالة الروابط من `ModernAdminPanel.tsx`

إذا لم تكن الصفحات مطلوبة، قم بإزالة الروابط من:
- `src/components/admin/ModernAdminPanel.tsx`

### 4. إصلاح المسارات الفرعية (أولوية متوسطة)

**المشكلة:** مسارات فرعية مذكورة في `navigation.ts` لكنها غير موجودة

**المسارات:**
- `/cia/exams`
- `/consulting/group`
- `/consulting/individual`
- `/resources/books`
- `/resources/tools`

**الحلول:**

#### الخيار 1: إنشاء الصفحات
```bash
mkdir -p src/app/cia/exams
touch src/app/cia/exams/page.tsx

mkdir -p src/app/consulting/group
touch src/app/consulting/group/page.tsx

mkdir -p src/app/consulting/individual
touch src/app/consulting/individual/page.tsx

mkdir -p src/app/resources/books
touch src/app/resources/books/page.tsx

mkdir -p src/app/resources/tools
touch src/app/resources/tools/page.tsx
```

#### الخيار 2: تحديث `navigation.ts`
قم بإزالة أو تحديث هذه المسارات في:
- `src/lib/navigation.ts`

### 5. إصلاح رابط Sitemap (أولوية متوسطة)

**المشكلة:** رابط `/sitemap` في `FooterComponent.tsx` لكن الصفحة غير موجودة

**الحل:**

#### الطريقة 1: استخدام السكريبت التلقائي
```bash
node scripts/fix-broken-routes.js
```

#### الطريقة 2: الإصلاح اليدوي
في `src/components/layout/FooterComponent.tsx`، استبدل:
```tsx
href: '/sitemap'
```

بـ:
```tsx
href: '/sitemap.xml'
```

أو أزل الرابط إذا لم يكن مطلوباً.

## ✅ قائمة التحقق

### أولوية عالية
- [ ] إصلاح روابط الاشتراك (`/subscription` → `/subscribe`)
- [ ] إنشاء صفحة `/unauthorized`
- [ ] إصلاح صفحات الإدارة المفقودة (5 صفحات)

### أولوية متوسطة
- [ ] إصلاح المسارات الفرعية (5 مسارات)
- [ ] إصلاح رابط Sitemap

### أولوية منخفضة
- [ ] التحقق من الملفات الثابتة في `public/`
- [ ] إضافة روابط للصفحات غير المستخدمة (إذا لزم الأمر)

## 🧪 الاختبار

بعد تطبيق الإصلاحات:

1. **اختبار الروابط:**
   ```bash
   npm run dev
   # اختبر جميع الروابط المصلحة في المتصفح
   ```

2. **إعادة تشغيل التحليل:**
   ```bash
   node scripts/analyze-routes-improved.js
   # تأكد من انخفاض عدد الروابط المعطلة
   ```

3. **اختبار التوجيه البرمجي:**
   - اختبر `router.push('/unauthorized')`
   - اختبر `router.push('/subscribe')`
   - اختبر جميع الروابط الجديدة

## 📊 متابعة التقدم

1. راجع `ROUTES_ANALYSIS.json` بعد كل إصلاح
2. قارن النتائج قبل وبعد الإصلاح
3. وثّق أي تغييرات إضافية مطلوبة

## 🔗 روابط مفيدة

- [Next.js Routing Documentation](https://nextjs.org/docs/app/building-your-application/routing)
- [Next.js Link Component](https://nextjs.org/docs/app/api-reference/components/link)
- [Next.js useRouter Hook](https://nextjs.org/docs/app/api-reference/functions/use-router)

## 📞 الدعم

للمساعدة أو الاستفسارات:
1. راجع التقرير الكامل: `ROUTES_ANALYSIS_REPORT.md`
2. راجع البيانات الخام: `ROUTES_ANALYSIS.json`
3. راجع كود السكريبتات في `scripts/`

---

**آخر تحديث:** 2025-11-10  
**الإصدار:** 1.0.0

