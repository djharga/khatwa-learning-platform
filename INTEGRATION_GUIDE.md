# دليل التكامل - نظام النسخ الشخصية (5GB per User)

## ✅ ما تم تنفيذه

تم إنشاء نظام كامل للنسخ الشخصية والتخزين يشمل:

### 1. أنواع البيانات (`src/types/storage.ts`)
- `StorageQuota`: حصة التخزين للمستخدم
- `PersonalFile`: معلومات الملف الشخصي
- `FileFolder`: معلومات المجلد
- `StorageUsage`: إحصائيات الاستخدام
- `FileCopyRequest`: طلب نسخ ملف

### 2. Storage Service (`src/lib/storage/storage-service.ts`)
خدمة كاملة لإدارة التخزين مع:
- ✅ حساب حصة التخزين (5GB لكل مستخدم)
- ✅ رفع الملفات
- ✅ إنشاء نسخ شخصية من ملفات الدورات
- ✅ حذف الملفات
- ✅ إدارة المجلدات
- ✅ الحصول على روابط التحميل المؤقتة

### 3. واجهات API (`src/app/api/storage/`)
- ✅ `GET /api/storage/quota/[userId]` - حصة التخزين
- ✅ `GET /api/storage/files` - قائمة الملفات
- ✅ `POST /api/storage/files` - رفع ملف
- ✅ `POST /api/storage/files/copy` - نسخ ملف
- ✅ `DELETE /api/storage/files/[fileId]` - حذف ملف
- ✅ `GET /api/storage/files/[fileId]/download` - رابط التحميل
- ✅ `GET /api/storage/usage/[userId]` - إحصائيات الاستخدام

### 4. Custom Hook (`src/hooks/useStorage.ts`)
Hook React مخصص يوفر:
- تتبع حصة التخزين في الوقت الفعلي
- إحصائيات الاستخدام
- وظائف رفع/حذف/نسخ الملفات
- تحديث تلقائي للبيانات

### 5. المكونات (`src/components/storage/`)
- ✅ `PersonalCopyManager.tsx` - مكون إدارة النسخ الشخصية
- ✅ `StorageUsageDisplay.tsx` - عرض استخدام التخزين

## 📝 كيفية الاستخدام

### استخدام في FileManagerComponent

```tsx
'use client';

import { useStorage } from '@/hooks/useStorage';
import StorageUsageDisplay from '@/components/storage/StorageUsageDisplay';
import PersonalCopyManager from '@/components/storage/PersonalCopyManager';

export default function FileManagerComponent() {
  // الحصول على userId من سياق المستخدم أو Auth
  const userId = 'user-123'; // TODO: من نظام المصادقة
  
  const { 
    quota, 
    files, 
    uploadFile, 
    deleteFile,
    createPersonalCopy,
    loading 
  } = useStorage({ 
    userId,
    autoRefresh: true 
  });

  const handleFileUpload = async (file: File) => {
    try {
      await uploadFile(file);
      alert('تم رفع الملف بنجاح!');
    } catch (error) {
      alert('فشل رفع الملف: ' + error.message);
    }
  };

  return (
    <div>
      {/* عرض استخدام التخزين */}
      <StorageUsageDisplay userId={userId} />
      
      {/* مكون النسخ الشخصية */}
      <PersonalCopyManager 
        userId={userId}
        sourceFileId="course-file-123"
        onCopyComplete={(file) => {
          console.log('تم نسخ الملف:', file);
        }}
      />
      
      {/* باقي المكون */}
    </div>
  );
}
```

### استخدام في صفحات الدورات

```tsx
import PersonalCopyManager from '@/components/storage/PersonalCopyManager';

export default function CourseFileView({ fileId, userId }) {
  return (
    <div>
      <h2>ملف الدورة</h2>
      {/* محتوى الملف */}
      
      {/* زر نسخ شخصي */}
      <PersonalCopyManager
        userId={userId}
        sourceFileId={fileId}
        onCopyComplete={(copiedFile) => {
          // إعادة توجيه إلى مدير الملفات الشخصية
          router.push(`/student/file-manager?fileId=${copiedFile.id}`);
        }}
      />
    </div>
  );
}
```

## 🔧 الإعداد والتهيئة

### 1. إضافة متغيرات البيئة

في ملف `.env.local`:

```env
# نوع التخزين (s3 | azure | local)
STORAGE_PROVIDER=s3

# إعدادات AWS S3
AWS_S3_BUCKET=khatwa-user-files
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# أو إعدادات Azure Blob
AZURE_STORAGE_ACCOUNT=your-account
AZURE_STORAGE_KEY=your-key
AZURE_STORAGE_CONTAINER=user-files
```

### 2. إعداد قاعدة البيانات

يجب إضافة الجداول التالية:

```sql
-- جدول حصة التخزين
CREATE TABLE user_storage_quota (
  user_id VARCHAR(255) PRIMARY KEY,
  total_quota BIGINT NOT NULL DEFAULT 5368709120, -- 5GB
  used_storage BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول الملفات الشخصية
CREATE TABLE personal_files (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  original_file_id VARCHAR(255), -- إذا كان نسخة من ملف دورة
  name VARCHAR(500) NOT NULL,
  type VARCHAR(50) NOT NULL,
  size BIGINT NOT NULL,
  mime_type VARCHAR(100),
  storage_provider VARCHAR(20) NOT NULL, -- 's3', 'azure', 'local'
  storage_key VARCHAR(500) NOT NULL,
  folder_id VARCHAR(255),
  metadata JSON,
  permissions JSON,
  version INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_accessed TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_folder_id (folder_id),
  INDEX idx_original_file_id (original_file_id)
);

-- جدول المجلدات
CREATE TABLE file_folders (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  parent_id VARCHAR(255),
  path VARCHAR(500),
  files_count INT DEFAULT 0,
  total_size BIGINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_parent_id (parent_id)
);
```

### 3. تحديث StorageService للاتصال بقاعدة البيانات

في `src/lib/storage/storage-service.ts`، استبدل المحاكاة بـ:

```typescript
// مثال مع Prisma
import { prisma } from '@/lib/prisma';

async getUserQuota(userId: string): Promise<StorageQuota> {
  const quota = await prisma.userStorageQuota.findUnique({
    where: { userId }
  });
  
  if (!quota) {
    // إنشاء حصة جديدة
    return await prisma.userStorageQuota.create({
      data: {
        userId,
        totalQuota: STORAGE_QUOTA_PER_USER,
        usedStorage: 0
      }
    });
  }
  
  return quota;
}
```

### 4. إضافة تكامل AWS S3

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// رفع ملف
async uploadToS3(file: File, key: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    ContentType: file.type,
  });
  
  // الحصول على رابط الرفع المباشر
  const uploadUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });
  
  // رفع الملف
  await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: { 'Content-Type': file.type },
  });
}
```

## 🚀 الخطوات التالية

1. ✅ **تم:** إنشاء النظام الكامل والواجهات
2. ⏳ **قيد التنفيذ:** ربط قاعدة البيانات
3. ⏳ **قيد التنفيذ:** تكامل AWS S3
4. ⏳ **قادم:** إضافة نظام المصادقة والصلاحيات
5. ⏳ **قادم:** اختبارات شاملة
6. ⏳ **قادم:** تحسين الأداء والتحسينات

## 📚 المراجع

- [Storage Service README](./src/lib/storage/README.md)
- [API Documentation](./src/app/api/storage/README.md)

