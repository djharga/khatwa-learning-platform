'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, CheckCircle, AlertCircle, X, File, Folder } from 'lucide-react';
import { useStorage } from '@/hooks/useStorage';
import type { PersonalFile } from '@/types/storage';

interface PersonalCopyManagerProps {
  userId: string;
  sourceFileId?: string; // ملف دورة للنسخ
  onCopyComplete?: (file: PersonalFile) => void;
}

/**
 * مكون إدارة النسخ الشخصية للمتدربين
 * يسمح بإنشاء نسخة شخصية من ملفات الدورات
 */
export default function PersonalCopyManager({
  userId,
  sourceFileId,
  onCopyComplete,
}: PersonalCopyManagerProps) {
  const { quota, files, createPersonalCopy, loading, error } = useStorage({ userId });
  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>();
  const [copying, setCopying] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // استخراج المجلدات من الملفات
  const folders = Array.from(
    new Set(files.filter((f) => f.folderId).map((f) => f.folderId))
  );

  const handleCreateCopy = async () => {
    if (!sourceFileId) return;

    try {
      setCopying(true);
      setCopySuccess(false);

      const copiedFile = await createPersonalCopy(sourceFileId, {
        folderId: selectedFolderId,
      });

      setCopySuccess(true);
      if (onCopyComplete) {
        onCopyComplete(copiedFile);
      }

      // إخفاء رسالة النجاح بعد 3 ثوان
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error('Error creating copy:', err);
    } finally {
      setCopying(false);
    }
  };

  if (!sourceFileId) {
    return (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">لم يتم تحديد ملف للنسخ</span>
        </div>
      </div>
    );
  }

  // التحقق من المساحة المتاحة
  const hasSpace = quota && quota.availableStorage > 1024 * 1024; // على الأقل 1MB

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Copy className="w-5 h-5 text-primary-600" />
          إنشاء نسخة شخصية
        </h3>
        {onCopyComplete && (
          <button
            onClick={() => onCopyComplete && onCopyComplete(null as any)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* معلومات المساحة */}
      {quota && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              المساحة المتاحة
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {(quota.availableStorage / (1024 * 1024 * 1024)).toFixed(2)} GB
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                quota.percentageUsed > 80
                  ? 'bg-red-500'
                  : quota.percentageUsed > 50
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${quota.percentageUsed}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {quota.percentageUsed.toFixed(1)}% مستخدم من {quota.totalQuota / (1024 * 1024 * 1024)} GB
          </div>
        </div>
      )}

      {/* تحذير إذا لم تكن هناك مساحة كافية */}
      {!hasSpace && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">
              المساحة المتاحة غير كافية. يرجى حذف بعض الملفات أو ترقية المساحة.
            </span>
          </div>
        </div>
      )}

      {/* اختيار المجلد */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          اختر المجلد الوجهة (اختياري)
        </label>
        <select
          value={selectedFolderId || ''}
          onChange={(e) => setSelectedFolderId(e.target.value || undefined)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">الجذر (Root)</option>
          {folders.map((folderId) => (
            <option key={folderId} value={folderId}>
              {folderId}
            </option>
          ))}
        </select>
      </div>

      {/* رسالة الخطأ */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* رسالة النجاح */}
      <AnimatePresence>
        {copySuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
          >
            <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">تم إنشاء النسخة الشخصية بنجاح!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* زر الإنشاء */}
      <button
        onClick={handleCreateCopy}
        disabled={copying || !hasSpace || loading}
        className="w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {copying ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>جاري النسخ...</span>
          </>
        ) : (
          <>
            <Copy className="w-5 h-5" />
            <span>إنشاء نسخة شخصية</span>
          </>
        )}
      </button>

      {/* معلومات إضافية */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          💡 عند إنشاء نسخة شخصية، سيتم نسخ الملف إلى مساحتك الشخصية (5GB)،
          ويمكنك التعديل عليها دون التأثير على الملف الأصلي.
        </p>
      </div>
    </div>
  );
}

