'use client';

import { motion } from 'framer-motion';
import { HardDrive, AlertTriangle, TrendingUp } from 'lucide-react';
import { useStorage } from '@/hooks/useStorage';

interface StorageUsageDisplayProps {
  userId: string;
}

/**
 * مكون عرض استخدام التخزين مع معلومات الحصة (5GB)
 * يستخدم النظام الجديد للنسخ الشخصية
 */
export default function StorageUsageDisplay({ userId }: StorageUsageDisplayProps) {
  const { quota, usage, loading, error } = useStorage({ userId });

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4" />
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
          <AlertTriangle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      </div>
    );
  }

  if (!quota) return null;

  const usedGB = quota.usedStorage / (1024 * 1024 * 1024);
  const totalGB = quota.totalQuota / (1024 * 1024 * 1024);
  const availableGB = quota.availableStorage / (1024 * 1024 * 1024);
  const isNearLimit = quota.percentageUsed > 80;
  const isWarning = quota.percentageUsed > 90;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-blue-500" />
          استخدام التخزين الشخصي
        </h3>
        {(isNearLimit || isWarning) && (
          <AlertTriangle
            className={`w-5 h-5 ${
              isWarning ? 'text-red-500' : 'text-yellow-500'
            }`}
          />
        )}
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">
            مستخدم: <span className="font-semibold text-gray-900 dark:text-white">{usedGB.toFixed(2)} GB</span>
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            إجمالي: <span className="font-semibold text-gray-900 dark:text-white">{totalGB.toFixed(2)} GB</span>
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${quota.percentageUsed}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-3 rounded-full transition-colors ${
              isWarning
                ? 'bg-red-500'
                : isNearLimit
                ? 'bg-yellow-500'
                : 'bg-blue-500'
            }`}
          />
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          متاح: <span className="font-semibold">{availableGB.toFixed(2)} GB</span> (
          {(100 - quota.percentageUsed).toFixed(1)}%)
        </div>
      </div>

      {/* تحذيرات */}
      {isWarning && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">
              المساحة تقترب من الحد الأقصى! يرجى حذف بعض الملفات.
            </span>
          </div>
        </motion.div>
      )}

      {/* إحصائيات إضافية */}
      {usage && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span>إحصائيات الاستخدام</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">عدد الملفات:</span>
              <span className="font-semibold text-gray-900 dark:text-white mr-2">
                {usage.totalFiles}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">الحجم الإجمالي:</span>
              <span className="font-semibold text-gray-900 dark:text-white mr-2">
                {(usage.totalSize / (1024 * 1024 * 1024)).toFixed(2)} GB
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

