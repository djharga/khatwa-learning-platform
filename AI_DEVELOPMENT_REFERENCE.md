# 🔮 AI Development Reference Prompt

## مرجع شامل لأدوات الذكاء الاصطناعي في تنفيذ التطويرات

**الإصدار:** 2.0
**التاريخ:** 15 أكتوبر 2025
**المشروع:** منصة الخطوة التعليمية (Khatwa Platform)

---

## 🎯 الغرض من هذا المرجع

هذا الملف يُعد مرجعاً شاملاً لأدوات الذكاء الاصطناعي لضمان تنفيذ التطويرات البصرية والجملية والتحسينات بدون أخطاء. يهدف إلى توحيد النهج والمعايير عبر جميع التطويرات.

---

## 📋 المحتويات

### 1. [وصف المشروع](#-وصف-المشروع)

### 2. [القواعد الأساسية](#-القواعد-الأساسية)

### 3. [التطوير البصري](#-التطوير-البصري)

### 4. [التطوير الجملي](#-التطوير-الجملي)

### 5. [التحسينات والأداء](#-التحسينات-والأداء)

### 6. [معالجة الأخطاء](#-معالجة-الأخطاء)

### 7. [أمثلة عملية](#-أمثلة-عملية)

---

## 🏗️ وصف المشروع

### **منصة الخطوة التعليمية**

منصة تعليمية شاملة باللغة العربية تلبي احتياجات الطلاب والمعلمين في الوطن العربي.

### **التقنيات المستخدمة:**

- **Frontend:** Next.js 14+, React 18+, TypeScript
- **Styling:** Tailwind CSS, Custom CSS Variables
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Language:** العربية (RTL Support)

### **الهيكل التقني:**

```
src/
├── app/                 # Next.js App Router
├── components/          # مكونات React
│   ├── ui/             # مكونات واجهة المستخدم الأساسية
│   ├── common/         # المكونات المشتركة
│   └── [feature]/      # مكونات خاصة بكل ميزة
├── styles/             # ملفات التصميم
├── lib/                # المكتبات والأدوات المساعدة
└── data/               # البيانات والمحتوى
```

---

## ⚖️ القواعد الأساسية

### **القاعدة الأولى: اللغة العربية أولاً**

```typescript
// ✅ صحيح
const message = 'مرحباً بك في منصة الخطوة';

// ❌ خطأ
const message = 'Welcome to Khatwa Platform';
```

### **القاعدة الثانية: الاتساق في التصميم**

- استخدم Design Tokens الموحدة
- اتبع نظام الألوان والخطوط المحدد
- حافظ على التباعد والأحجام المتسقة

### **القاعدة الثالثة: الأداء أولوية**

- تجنب re-renders غير الضرورية
- استخدم React.memo للمكونات الثقيلة
- قم بتحسين الصور وتحميلها

### **القاعدة الرابعة: إمكانية الوصول**

- دعم قارئات الشاشة
- لوحة المفاتيح قابلة للاستخدام
- تباين الألوان مناسب

---

## 🎨 التطوير البصري

### **نظام الألوان**

#### **الألوان الأساسية:**

```css
/* الأزرق الرئيسي */
--primary: #3b82f6;
--primary-dark: #2563eb;
--primary-light: #60a5fa;

/* الأخضر للنجاح */
--success: #10b981;
--success-dark: #059669;
--success-light: #34d399;

/* الأحمر للأخطاء */
--error: #ef4444;
--error-dark: #dc2626;
--error-light: #f87171;

/* الأصفر للتحذيرات */
--warning: #f59e0b;
--warning-dark: #d97706;
--warning-light: #fbbf24;
```

#### **نظام التباين:**

```css
/* التباين العالي للنصوص */
--text-primary: #111827; /* على الخلفيات الفاتحة */
--text-secondary: #6b7280; /* للنصوص الثانوية */
--text-on-dark: #f9fafb; /* على الخلفيات الداكنة */
```

### **الخطوط والنصوص**

#### **خطوط Google Fonts المعتمدة:**

```css
--font-primary: 'Inter', sans-serif;
--font-heading: 'Poppins', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

#### **أحجام الخطوط:**

```css
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */
```

### **التخطيط والتباعد**

#### **نظام الشبكة:**

```css
--container-max: 1200px;
--gutter: 1rem; /* 16px */
--gutter-lg: 2rem; /* 32px */
--gutter-xl: 3rem; /* 48px */
```

#### **نظام التباعد (Spacing Scale):**

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
```

### **المكونات البصرية**

#### **البطاقات (Cards):**

```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  children: React.ReactNode;
}
```

#### **الأزرار (Buttons):**

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}
```

#### **النماذج (Forms):**

```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  disabled?: boolean;
}
```

---

## 📝 التطوير الجملي

### **إرشادات كتابة النصوص**

#### **اللغة والأسلوب:**

- استخدم اللغة العربية الفصحى مع مراعاة البساطة
- تجنب المصطلحات المعقدة والمصطلحات الأجنبية
- استخدم علامات الترقيم الصحيحة (؟،،.)

#### **أمثلة على النصوص:**

**✅ صحيح:**

```typescript
const welcomeMessage =
  'مرحباً بك في منصة الخطوة! نحن هنا لمساعدتك في رحلتك التعليمية.';
const errorMessage =
  'عذراً، حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.';
const successMessage = 'تم حفظ التغييرات بنجاح!';
```

**❌ خطأ:**

```typescript
const welcomeMessage = 'Welcome to Khatwa Platform!';
const errorMessage = 'Error loading data. Please try again.';
const successMessage = 'Changes saved successfully!';
```

### **رسائل النجاح والخطأ**

#### **رسائل النجاح:**

- "تم بنجاح"
- "تم الحفظ بنجاح"
- "تم الإرسال بنجاح"
- "تم التسجيل بنجاح"

#### **رسائل الخطأ:**

- "عذراً، حدث خطأ"
- "يرجى المحاولة مرة أخرى"
- "تحقق من البيانات المدخلة"
- "هذا الحقل مطلوب"

#### **رسائل التحذير:**

- "هل أنت متأكد؟"
- "سيتم حذف هذا العنصر"
- "هذا الإجراء لا يمكن التراجع عنه"

### **تسمية العناصر**

#### **أزرار وروابط:**

```typescript
// ✅ صحيح
const saveButton = 'حفظ التغييرات';
const cancelButton = 'إلغاء';
const deleteButton = 'حذف';

// ❌ خطأ
const saveButton = 'Save';
const cancelButton = 'Cancel';
const deleteButton = 'Delete';
```

#### **تسمية الحقول:**

```typescript
// ✅ صحيح
const nameLabel = 'الاسم الكامل';
const emailLabel = 'البريد الإلكتروني';
const passwordLabel = 'كلمة المرور';

// ❌ خطأ
const nameLabel = 'Full Name';
const emailLabel = 'Email';
const passwordLabel = 'Password';
```

---

## ⚡ التحسينات والأداء

### **تحسين الصور**

#### **تنسيقات الصور المعتمدة:**

```typescript
// استخدم WebP مع fallback
<picture>
  <source srcSet="/image.webp" type="image/webp" />
  <img src="/image.jpg" alt="وصف الصورة" />
</picture>
```

#### **أحجام الصور المقترحة:**

- **الأفاتار:** 40x40, 80x80, 120x120px
- **البطاقات:** 300x200, 600x400px
- **البنرات:** 1200x400, 1920x640px

### **التحميل الكسول (Lazy Loading)**

```typescript
// ✅ استخدم React.lazy للمكونات
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// ✅ استخدم loading للصور
<img
  loading="lazy"
  src="/image.jpg"
  alt="وصف الصورة"
/>
```

### **تحسين الـ Bundle**

```typescript
// ✅ استخدم dynamic imports
const ChartComponent = dynamic(() => import('./ChartComponent'), {
  loading: () => <div>جاري التحميل...</div>
});
```

### **إدارة الحالة**

```typescript
// ✅ استخدم useMemo للحسابات المعقدة
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(dependencies);
}, [dependencies]);

// ✅ استخدم useCallback للدوال
const handleClick = useCallback(() => {
  // logic here
}, [dependencies]);
```

---

## 🚨 معالجة الأخطاء

### **أنواع الأخطاء الشائعة**

#### **1. أخطاء التصدير المكرر:**

```typescript
// ❌ خطأ
export const Component = () => {};
export { Component }; // في نهاية الملف

// ✅ صحيح
const Component = () => {};
export { Component };
```

#### **2. أخطاء Hydration:**

```typescript
// ❌ خطأ - أرقام مختلفة بين الخادم والعميل
const count = '٠'; // في الخادم
const count = '0'; // في العميل

// ✅ صحيح - تنسيق متسق
const count = toEnglishDigits(number);
```

#### **3. أخطاء اللغة:**

```typescript
// ❌ خطأ
const text = 'Hello World';

// ✅ صحيح
const text = 'مرحباً بالعالم';
```

#### **4. أخطاء الأداء:**

```typescript
// ❌ خطأ - إعادة render غير ضرورية
const Component = () => {
  const data = expensiveOperation(); // في كل render
  return <div>{data}</div>;
};

// ✅ صحيح
const Component = () => {
  const data = useMemo(() => expensiveOperation(), []);
  return <div>{data}</div>;
};
```

### **أدوات التحقق**

#### **ESLint Rules المطلوبة:**

```json
{
  "rules": {
    "react-hooks/exhaustive-deps": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": "warn"
  }
}
```

#### **أدوات الاختبار:**

- **Unit Tests:** Jest + React Testing Library
- **E2E Tests:** Playwright
- **Performance:** Lighthouse

---

## 💡 أمثلة عملية

### **مثال 1: مكون بطاقة**

```typescript
// ✅ مكون بطاقة محسن
import React from 'react';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  progress: number;
  onClick?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  image,
  progress,
  onClick
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md hover:shadow-lg",
        "transition-all duration-200 cursor-pointer",
        "border border-gray-200 hover:border-blue-300"
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
        loading="lazy"
      />

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            التقدم: {progress}%
          </span>

          <div className="w-20 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
```

### **مثال 2: نموذج تسجيل**

```typescript
// ✅ نموذج تسجيل محسن
import React, { useState } from 'react';
import { toEnglishDigits } from '@/lib/numberUtils';

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => void;
  loading?: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  loading = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // تنسيق رقم الهاتف للأرقام الإنجليزية
    const formattedData = {
      ...formData,
      phone: toEnglishDigits(formData.phone)
    };

    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الاسم الكامل
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          البريد الإلكتروني
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          رقم الهاتف
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="05xxxxxxxx"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          كلمة المرور
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={cn(
          "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200",
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        )}
      >
        {loading ? "جاري التسجيل..." : "إنشاء حساب"}
      </button>
    </form>
  );
};
```

---

## 🎯 قائمة المراجعة النهائية

### **قبل التسليم:**

- [ ] جميع النصوص باللغة العربية
- [ ] لا توجد أخطاء TypeScript
- [ ] الأداء محسّن (Lazy loading, Memoization)
- [ ] إمكانية الوصول متوفرة
- [ ] التصميم متجاوب على جميع الأجهزة
- [ ] تم اختبار hydration
- [ ] الألوان تتبع نظام التصميم
- [ ] الصور محسّنة ومضغوطة

### **أدوات التحقق:**

```bash
# فحص TypeScript
npm run type-check

# فحص ESLint
npm run lint

# فحص الأداء
npm run build
npx lighthouse http://localhost:3000

# اختبار hydration
npm run dev
# تحقق يدوي من console لأخطاء hydration
```

---

## 📞 الدعم والمساعدة

### **في حالة وجود مشاكل:**

1. **تحقق من ملف `DESIGN_IMPROVEMENTS.md`** للتحسينات المعتمدة
2. **راجع `AGENTS.md`** لقواعد الذكاء الاصطناعي
3. **تحقق من `tokens.ts`** للتصميم tokens

### **للمساعدة الفورية:**

- استخدم تعليقات واضحة في الكود
- اتبع أنماط المشروع الموجودة
- اختبر التغييرات على أجهزة مختلفة

---

**✨ تذكر: الهدف هو تقديم تجربة مستخدم ممتازة باللغة العربية مع أعلى معايير الجودة والأداء.**
