# نظام النسخ الشخصية والتخزين (Personal Storage System)

## نظرة عامة

نظام كامل لإدارة التخزين الشخصي للمتدربين مع دعم النسخ الشخصية من ملفات الدورات.

## الميزات

- ✅ **حصة تخزين 5GB لكل متدرب**
- ✅ **تتبع استخدام المساحة في الوقت الفعلي**
- ✅ **إنشاء نسخ شخصية من ملفات الدورات**
- ✅ **دعم التخزين السحابي (AWS S3, Azure Blob)**
- ✅ **إدارة المجلدات والملفات**
- ✅ **رابط تحميل مؤقت (Signed URLs)**

## البنية

```
src/
├── types/
│   └── storage.ts              # أنواع البيانات
├── lib/
│   └── storage/
│       ├── storage-service.ts  # خدمة إدارة التخزين
│       └── README.md            # هذا الملف
├── hooks/
│   └── useStorage.ts           # Hook مخصص للاستخدام
├── components/
│   └── storage/
│       └── PersonalCopyManager.tsx  # مكون النسخ الشخصية
└── app/
    └── api/
        └── storage/
            ├── quota/[userId]/route.ts      # إدارة الحصة
            ├── files/route.ts               # إدارة الملفات
            ├── files/copy/route.ts          # نسخ الملفات
            ├── files/[fileId]/route.ts      # عمليات ملف معين
            ├── files/[fileId]/download/route.ts  # رابط التحميل
            └── usage/[userId]/route.ts      # إحصائيات الاستخدام
```

## الاستخدام

### استخدام Hook

```tsx
import { useStorage } from '@/hooks/useStorage';

function MyComponent() {
  const { 
    quota,        // حصة التخزين
    usage,         // إحصائيات الاستخدام
    files,         // قائمة الملفات
    loading,       // حالة التحميل
    error,          // الأخطاء
    uploadFile,    // رفع ملف
    deleteFile,     // حذف ملف
    createPersonalCopy, // إنشاء نسخة شخصية
    refresh        // تحديث البيانات
  } = useStorage({ 
    userId: 'user-123',
    autoRefresh: true,
    refreshInterval: 30000 
  });

  // استخدام الوظائف
  const handleUpload = async (file: File) => {
    try {
      await uploadFile(file, { folderId: 'folder-123' });
      console.log('تم الرفع بنجاح!');
    } catch (error) {
      console.error('فشل الرفع:', error);
    }
  };
}
```

### استخدام StorageService مباشرة

```typescript
import { storageService } from '@/lib/storage/storage-service';

// الحصول على حصة التخزين
const quota = await storageService.getUserQuota('user-123');

// رفع ملف
const result = await storageService.uploadFile('user-123', file, {
  folderId: 'folder-123',
  metadata: { description: 'ملف مهم' }
});

// إنشاء نسخة شخصية
const copy = await storageService.createPersonalCopy('user-123', {
  sourceFileId: 'file-456',
  targetFolderId: 'folder-123',
  newName: 'نسخة شخصية'
});
```

## API Endpoints

### GET /api/storage/quota/[userId]
الحصول على حصة التخزين للمستخدم

**Response:**
```json
{
  "quota": {
    "userId": "user-123",
    "totalQuota": 5368709120,
    "usedStorage": 2469608448,
    "availableStorage": 2899100672,
    "percentageUsed": 46.0,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### GET /api/storage/files?userId=[userId]
الحصول على ملفات المستخدم

**Query Parameters:**
- `userId` (required): معرف المستخدم
- `folderId` (optional): معرف المجلد
- `type` (optional): نوع الملف
- `search` (optional): البحث
- `limit` (optional): عدد النتائج
- `offset` (optional): الإزاحة

### POST /api/storage/files
رفع ملف جديد

**FormData:**
- `file`: الملف
- `userId`: معرف المستخدم
- `folderId` (optional): معرف المجلد
- `metadata` (optional): البيانات الوصفية (JSON)

### POST /api/storage/files/copy
إنشاء نسخة شخصية

**Body:**
```json
{
  "userId": "user-123",
  "sourceFileId": "file-456",
  "targetFolderId": "folder-789",
  "newName": "نسخة شخصية",
  "createPersonalCopy": true
}
```

## الإعداد

### متغيرات البيئة

```env
# نوع التخزين (s3 | azure | local)
STORAGE_PROVIDER=s3

# إعدادات AWS S3
AWS_S3_BUCKET=khatwa-user-files
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# إعدادات Azure Blob (إذا كان المستخدم Azure)
AZURE_STORAGE_ACCOUNT=your-account
AZURE_STORAGE_KEY=your-key
AZURE_STORAGE_CONTAINER=user-files
```

## ملاحظات التنفيذ

⚠️ **ملاحظة مهمة:** النظام الحالي يحتوي على:
- ✅ واجهات API جاهزة
- ✅ Service layer كامل
- ✅ Hook للاستخدام
- ⚠️ يحتاج إلى ربط فعلي بـ:
  - قاعدة البيانات (لتخزين بيانات الملفات)
  - AWS S3 أو Azure Blob (للتخزين الفعلي)
  - نظام المصادقة (للتحقق من الصلاحيات)

## الخطوات التالية

1. **ربط قاعدة البيانات:** إضافة جداول `user_storage`, `personal_files`, `file_folders`
2. **تكامل AWS S3:** استخدام AWS SDK لرفع وتحميل الملفات
3. **نظام المصادقة:** التحقق من صلاحيات المستخدمين
4. **معالجة الأخطاء:** إضافة معالجة شاملة للأخطاء
5. **اختبارات:** إضافة اختبارات للوظائف

