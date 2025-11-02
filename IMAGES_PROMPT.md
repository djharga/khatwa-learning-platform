# 📸 Prompt لإنشاء صور الكورسات والبنر

## 🎯 استخدام الـ Prompts مع AI Image Generators

استخدم هذه الـ Prompts مع:
- **Midjourney**
- **DALL-E**
- **Stable Diffusion**
- **Adobe Firefly**

---

## 🖼️ **صور الكورسات (Course Images)**

### 1️⃣ **دورة التأسيس المالي**
```
A professional financial accounting course cover image, 
modern minimalist design, showing financial documents, 
calculator, and charts in soft blue and white colors, 
clean and professional, 16:9 aspect ratio, 
high quality, business education theme
```

### 2️⃣ **دورة التحليل المالي وإعداد الميزانيات**
```
Financial analysis and budgeting course cover, 
modern design with spreadsheets, graphs, and financial charts, 
blue and teal color scheme, professional business style, 
clean layout, 16:9 aspect ratio, high resolution
```

### 3️⃣ **دورة التقارير المالية والمحاسبية**
```
Financial reporting course cover image, 
professional design with documents, reports, and analysis charts, 
corporate blue theme, modern minimalist style, 
clean and organized layout, 16:9 aspect ratio
```

### 4️⃣ **دورة التسويات البنكية**
```
Bank reconciliation course cover, 
showing bank statements, calculator, and financial data, 
professional blue and white design, modern business style, 
clean and clear layout, 16:9 aspect ratio
```

### 5️⃣ **دورة التسويات الجردية**
```
Inventory reconciliation course cover, 
showing warehouse, inventory items, and checklist, 
professional design with blue and green colors, 
modern business theme, 16:9 aspect ratio
```

### 6️⃣ **دورة المشتريات**
```
Procurement and purchasing course cover, 
showing purchase orders, supplier relationships, and logistics, 
professional design with blue and orange colors, 
modern business style, 16:9 aspect ratio
```

### 7️⃣ **دورة إدارة المخازن**
```
Warehouse management course cover, 
showing organized warehouse, inventory management, and logistics, 
professional design with blue and yellow colors, 
modern business theme, 16:9 aspect ratio
```

### 8️⃣ **دورة إدارة وتشغيل المطاعم**
```
Restaurant management course cover, 
showing professional kitchen, dining area, and management tools, 
warm colors with orange and brown tones, 
professional hospitality theme, 16:9 aspect ratio
```

### 9️⃣ **أساسيات المالية والمحاسبة**
```
Finance and accounting basics course cover, 
educational design with fundamental concepts, 
showing books, calculator, and financial symbols, 
professional blue theme, clean and clear layout, 16:9 aspect ratio
```

### 🔟 **إدارة المشتريات والتوريدات**
```
Procurement and supply management course cover, 
showing global supply chain, logistics network, and partnerships, 
professional design with blue and teal colors, 
modern business style, 16:9 aspect ratio
```

### 1️⃣1️⃣ **إدارة المخازن والمستودعات**
```
Advanced warehouse and storage management course cover, 
showing modern warehouse technology, automation, and efficiency, 
professional design with blue and green colors, 
contemporary business theme, 16:9 aspect ratio
```

### 1️⃣2️⃣ **التقارير المالية والمحاسبية**
```
Advanced financial reporting course cover, 
showing complex financial analysis, international standards, 
professional design with dark blue and white, 
corporate theme, 16:9 aspect ratio
```

### 1️⃣3️⃣ **التسويات الجردية والرقابة**
```
Inventory adjustments and internal control course cover, 
showing audit process, compliance, and quality control, 
professional design with blue and green colors, 
corporate compliance theme, 16:9 aspect ratio
```

---

## 🎨 **صور البنر الرئيسي (Hero Banner)**

### **البنر الرئيسي للصفحة**
```
Professional educational platform hero banner, 
showing diverse professionals learning and working with financial data, 
modern office environment with computers and charts, 
gradient background from light blue to white, 
professional business education theme, 
high quality, 1920x600 aspect ratio, 
modern minimalist design, inspiring and professional atmosphere
```

### **بنر بديل (Alternative)**
```
Modern learning platform banner, 
showing students and professionals in collaborative learning environment, 
financial education theme with charts and data visualization, 
clean modern design with blue and white colors, 
professional and inspiring atmosphere, 
1920x600 aspect ratio, high resolution
```

---

## 📋 **تعليمات الاستخدام:**

### **الخطوة 1: اختر أداة AI**
- Midjourney (الأفضل للجودة العالية)
- DALL-E (سهل الاستخدام)
- Stable Diffusion (مجاني)

### **الخطوة 2: انسخ الـ Prompt**
انسخ النص الخاص بالصورة التي تريدها

### **الخطوة 3: أضف التعديلات**
يمكنك إضافة:
```
- "Arabic text: [النص العربي]"
- "Include course title"
- "Add logo in corner"
- "Professional photography style"
```

### **الخطوة 4: أنشئ الصورة**
اتبع تعليمات الأداة لإنشاء الصورة

### **الخطوة 5: حفظ الصورة**
احفظ الصورة بصيغة PNG أو JPG

---

## 💾 **مسارات الحفظ:**

```
/public/courses/
├── financial-foundation.jpg
├── financial-analysis.jpg
├── financial-reports.jpg
├── bank-reconciliation.jpg
├── inventory-reconciliation.jpg
├── procurement.jpg
├── warehouse.jpg
├── restaurant.jpg
├── finance-basics.jpg
├── procurement-management.jpg
├── warehouse-management.jpg
├── financial-reporting.jpg
└── inventory-reconciliations.jpg

/public/
└── hero-banner.jpg
```

---

## 🎯 **نصائح لأفضل النتائج:**

### **للصور:**
1. ✅ استخدم "professional photography" للجودة
2. ✅ حدد الألوان المطلوبة (blue, white, etc)
3. ✅ اطلب "high resolution" و "4K"
4. ✅ حدد نسبة العرض 16:9
5. ✅ اطلب "clean and modern design"

### **للبنر:**
1. ✅ استخدم "hero banner" في الـ prompt
2. ✅ حدد الحجم 1920x600
3. ✅ اطلب "inspiring and professional"
4. ✅ استخدم "gradient background"
5. ✅ اطلب "high quality photography"

---

## 🔄 **تحديث الصور في الكود:**

بعد حفظ الصور، تأكد من تحديث المسارات في `page.tsx`:

```typescript
const courses = [
  {
    id: 1,
    title: "دورة التأسيس المالي",
    image: "/courses/financial-foundation.jpg", // ✅ تأكد من المسار
    // ...
  }
]
```

---

## 📊 **جودة الصور المطلوبة:**

| المعيار | القيمة |
|--------|--------|
| الدقة | 1920x1080 أو أعلى |
| الصيغة | JPG أو PNG |
| الحجم | أقل من 500KB |
| النسبة | 16:9 |
| الألوان | RGB |

---

## 🌐 **روابط مفيدة:**

- **Midjourney**: https://www.midjourney.com
- **DALL-E**: https://openai.com/dall-e
- **Stable Diffusion**: https://stablediffusionweb.com
- **Adobe Firefly**: https://firefly.adobe.com

---

## ✅ **قائمة التحقق:**

- [ ] تم إنشاء 13 صورة للكورسات
- [ ] تم إنشاء صورة البنر الرئيسي
- [ ] تم حفظ الصور في `/public/courses/`
- [ ] تم حفظ البنر في `/public/`
- [ ] تم التحقق من جودة الصور
- [ ] تم تحديث المسارات في الكود
- [ ] تم اختبار الصور على الموقع

---

**ملاحظة:** يمكنك أيضاً استخدام مواقع تصميم مثل Canva أو Figma لإنشاء الصور بشكل احترافي.
