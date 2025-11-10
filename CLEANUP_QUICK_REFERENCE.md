# 📌 مرجع سريع لتنظيف المكونات والأنماط

## 🎯 الإحصائيات السريعة

- **38 مكون غير مستخدم** (16.2% من إجمالي المكونات)
- **3 مجموعات مكررة** (بما في ذلك CourseSlider)
- **4 تعارضات أسماء**
- **72 كلاس CSS يتيم**

## ✅ مكونات مؤكدة غير مستخدمة (آمنة للحذف بعد النسخ الاحتياطي)

```
src/components/exam/ExamHeader.tsx
src/components/exam/ExamTimer.tsx
src/components/exam/QuestionContent.tsx
src/components/exam/QuestionList.tsx
src/components/exam/ReviewPanel.tsx
src/components/SearchBar.tsx
src/components/CourseSlider.tsx (أو src/courses/components/CourseSlider.tsx - احذف أحد النسختين)
```

## 🔴 أولويات عالية

1. **حل تكرار CourseSlider** - يوجد في مكانين، احذف أحد النسختين
2. **حل تعارض Card** - `ui/Card.tsx` و `ui/primitives/Card.tsx`
3. **حل تعارض types** - إعادة تسمية إلى `LearningPathTypes.ts` و `ProgressTypes.ts`

## 📋 خطوات سريعة

### 1. نسخة احتياطية
```bash
git checkout -b cleanup/components-styles
git add .
git commit -m "Backup before cleanup"
```

### 2. تشغيل التحليل
```bash
node scripts/analyze-components-styles.js
```

### 3. مراجعة التقرير
- افتح `COMPONENTS_STYLES_CLEANUP_REPORT.md`
- راجع `COMPONENTS_STYLES_ANALYSIS.json`

### 4. التنفيذ التدريجي
اتبع المراحل الخمس في التقرير الكامل

## 📚 الملفات المرجعية

- **التقرير الكامل:** `COMPONENTS_STYLES_CLEANUP_REPORT.md`
- **التحليل JSON:** `COMPONENTS_STYLES_ANALYSIS.json`
- **سكريبت التحليل:** `scripts/analyze-components-styles.js`

---

**⚠️ مهم:** لا تحذف أي ملف قبل التأكد من عدم استخدامه ديناميكياً أو داخل مكونات أخرى!

