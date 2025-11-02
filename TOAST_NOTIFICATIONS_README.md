# نظام الإشعارات (Toast Notifications)

تم إنشاء نظام إشعارات متطور للتطبيق باستخدام مكتبة `react-hot-toast` لعرض رسائل قصيرة بعد الإجراءات.

## المميزات

- إشعارات نجاح ✅
- إشعارات خطأ ❌
- إشعارات معلومات ℹ️
- إشعارات تحميل (مع إمكانية الإلغاء)
- رسائل جاهزة للاستخدام الشائع
- تصميم متجاوب مع الثيم المظلم/الفاتح

## كيفية الاستخدام

### الاستيراد
```typescript
import { showToast, toastMessages } from '../utils/toast';
```

### أنواع الإشعارات

#### إشعار نجاح
```typescript
showToast.success('تم الحفظ بنجاح!');
```

#### إشعار خطأ
```typescript
showToast.error('حدث خطأ غير متوقع!');
```

#### إشعار معلومات
```typescript
showToast.info('هذه رسالة معلومات');
```

#### إشعار تحميل
```typescript
const loadingToast = showToast.loading('جاري التحميل...');
// ... بعد الانتهاء
showToast.dismiss(loadingToast);
showToast.success('تم التحميل!');
```

### الرسائل الجاهزة

استخدم الرسائل المعدة مسبقاً للإجراءات الشائعة:

```typescript
showToast.success(toastMessages.formSubmitted);
showToast.success(toastMessages.settingsSaved);
showToast.success(toastMessages.loginSuccessful);
showToast.success(toastMessages.courseEnrolled);
```

## الأمثلة في الكود

### نموذج الاتصال (ContactComponent)
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const loadingToast = showToast.loading('جاري إرسال الرسالة...');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    showToast.dismiss(loadingToast);
    showToast.success(toastMessages.formSubmitted);
    setFormData({ name: '', email: '', subject: '', message: '' });
  } catch (error) {
    showToast.error('حدث خطأ أثناء الإرسال. حاول مرة أخرى.');
  } finally {
    setIsSubmitting(false);
  }
};
```

### نموذج تسجيل الدخول (LoginComponent)
```typescript
const handleSubmit = (values) => {
  showToast.success(toastMessages.loginSuccessful);
};

const handleSocialLogin = (provider: string) => {
  showToast.info(`تسجيل الدخول عبر ${provider} قيد التطوير.`);
};
```

## التخصيص

يمكن تخصيص مظهر الإشعارات من خلال ملف `layout.tsx`:

```typescript
<Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: 'var(--color-background)',
      color: 'var(--color-text-primary)',
      border: '1px solid var(--color-accent)',
      zIndex: 9999,
    },
  }}
/>
```

## المزايا

- **UX محسّن**: لا يقاطع تدفق المستخدم
- **متجاوب**: يعمل على جميع الأجهزة
- **متعدد اللغات**: يدعم النصوص العربية
- **سهل الاستخدام**: API بسيط ومباشر
- **مخصص**: يمكن تخصيص الألوان والموقع حسب الحاجة
