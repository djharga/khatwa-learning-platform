/**
 * Hook مخصص لتتبع استخدام المساحة والتخزين
 */

import { useState, useEffect, useCallback } from 'react';
import type { StorageQuota, StorageUsage, PersonalFile } from '@/types/storage';
import { storageService } from '@/lib/storage/storage-service';

const API_PREFIX = '/api';

interface UseStorageOptions {
  userId: string;
  autoRefresh?: boolean;
  refreshInterval?: number; // بالمللي ثانية
}

interface UseStorageReturn {
  quota: StorageQuota | null;
  usage: StorageUsage | null;
  files: PersonalFile[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  uploadFile: (file: File, options?: { folderId?: string }) => Promise<void>;
  deleteFile: (fileId: string) => Promise<void>;
  createPersonalCopy: (sourceFileId: string, options?: { folderId?: string; newName?: string }) => Promise<PersonalFile>;
}

export function useStorage(options: UseStorageOptions): UseStorageReturn {
  const { userId, autoRefresh = true, refreshInterval = 30000 } = options;
  const [quota, setQuota] = useState<StorageQuota | null>(null);
  const [usage, setUsage] = useState<StorageUsage | null>(null);
  const [files, setFiles] = useState<PersonalFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * تحديث البيانات من الـ API
   */
  const refresh = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      // جلب حصة التخزين
      const quotaResponse = await fetch(`${API_PREFIX}/storage/quota/${userId}`);
      if (!quotaResponse.ok) throw new Error('فشل جلب حصة التخزين');
      const quotaData = await quotaResponse.json();
      setQuota(quotaData.quota);

      // جلب إحصائيات الاستخدام
      const usageResponse = await fetch(`${API_PREFIX}/storage/usage/${userId}`);
      if (usageResponse.ok) {
        const usageData = await usageResponse.json();
        setUsage(usageData.usage);
      }

      // جلب الملفات
      const filesResponse = await fetch(`${API_PREFIX}/storage/files?userId=${userId}`);
      if (filesResponse.ok) {
        const filesData = await filesResponse.json();
        setFiles(filesData.files || []);
      }
    } catch (err: any) {
      console.error('Error refreshing storage data:', err);
      setError(err.message || 'حدث خطأ في جلب البيانات');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * رفع ملف جديد
   */
  const uploadFile = useCallback(
    async (file: File, uploadOptions?: { folderId?: string }) => {
      try {
        setError(null);

        // إنشاء FormData
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);
        if (uploadOptions?.folderId) {
          formData.append('folderId', uploadOptions.folderId);
        }

        const response = await fetch(`${API_PREFIX}/storage/files`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'فشل رفع الملف');
        }

        // إذا كان هناك رابط رفع مباشر (S3 presigned URL)، استخدمه
        const result = await response.json();
        if (result.uploadUrl) {
          // رفع الملف مباشرة إلى S3
          await fetch(result.uploadUrl, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type,
            },
          });
        }

        // تحديث البيانات
        await refresh();
      } catch (err: any) {
        console.error('Error uploading file:', err);
        setError(err.message || 'فشل رفع الملف');
        throw err;
      }
    },
    [userId, refresh]
  );

  /**
   * حذف ملف
   */
  const deleteFile = useCallback(
    async (fileId: string) => {
      try {
        setError(null);

        const response = await fetch(`${API_PREFIX}/storage/files/${fileId}?userId=${userId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'فشل حذف الملف');
        }

        // تحديث البيانات
        await refresh();
      } catch (err: any) {
        console.error('Error deleting file:', err);
        setError(err.message || 'فشل حذف الملف');
        throw err;
      }
    },
    [userId, refresh]
  );

  /**
   * إنشاء نسخة شخصية من ملف دورة
   */
  const createPersonalCopy = useCallback(
    async (
      sourceFileId: string,
      copyOptions?: { folderId?: string; newName?: string }
    ) => {
      try {
        setError(null);

        const response = await fetch(`${API_PREFIX}/storage/files/copy`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            sourceFileId,
            targetFolderId: copyOptions?.folderId,
            newName: copyOptions?.newName,
            createPersonalCopy: true,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'فشل نسخ الملف');
        }

        const data = await response.json();
        const personalFile: PersonalFile = data.file || {
          id: `copy-${Date.now()}`,
          userId,
          originalFileId: sourceFileId,
          name: copyOptions?.newName || `copy-${sourceFileId}`,
          type: 'document',
          size: 0,
          mimeType: 'application/pdf',
          storageProvider: 's3',
          storageKey: `users/${userId}/copies/${Date.now()}`,
          folderId: copyOptions?.folderId,
          permissions: {
            canRead: true,
            canWrite: true,
            canDelete: true,
            canShare: false,
          },
          version: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // تحديث البيانات
        await refresh();
        
        return personalFile;
      } catch (err: any) {
        console.error('Error creating personal copy:', err);
        setError(err.message || 'فشل نسخ الملف');
        throw err;
      }
    },
    [userId, refresh]
  );

  // التحميل الأولي
  useEffect(() => {
    refresh();
  }, [refresh]);

  // التحديث التلقائي
  useEffect(() => {
    if (!autoRefresh || !userId) return;

    const interval = setInterval(() => {
      refresh();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, userId, refresh]);

  return {
    quota,
    usage,
    files,
    loading,
    error,
    refresh,
    uploadFile,
    deleteFile,
    createPersonalCopy,
  };
}

