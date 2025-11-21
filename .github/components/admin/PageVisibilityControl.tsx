'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Settings,
  Save,
  RefreshCw,
  Search,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import type { PageVisibility, PageVisibilityUpdate } from '@/types/admin';
import toast from 'react-hot-toast';

interface PageVisibilityControlProps {
  className?: string;
}

const PageVisibilityControl: FC<PageVisibilityControlProps> = ({ className = '' }) => {
  const [pages, setPages] = useState<PageVisibility[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/settings/visibility');
      if (response.ok) {
        const data = await response.json();
        setPages(data.pages || []);
      }
    } catch (error) {
      console.error('Error loading pages:', error);
      toast.error('فشل تحميل الصفحات');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = async (pageId: string, isVisible: boolean) => {
    try {
      const response = await fetch(`/api/admin/settings/visibility/${pageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible }),
      });

      if (!response.ok) {
        throw new Error('فشل تحديث الرؤية');
      }

      setPages((prev) =>
        prev.map((page) =>
          page.id === pageId ? { ...page, isVisible } : page
        )
      );
      toast.success('تم تحديث الرؤية بنجاح');
    } catch (error: any) {
      console.error('Error updating visibility:', error);
      toast.error(error.message || 'فشل تحديث الرؤية');
    }
  };

  const handleUpdatePage = async (pageId: string, updates: PageVisibilityUpdate) => {
    try {
      const response = await fetch(`/api/admin/settings/visibility/${pageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('فشل تحديث الصفحة');
      }

      const data = await response.json();
      setPages((prev) =>
        prev.map((page) =>
          page.id === pageId ? { ...page, ...data.page } : page
        )
      );
      setEditingPageId(null);
      toast.success('تم تحديث الصفحة بنجاح');
    } catch (error: any) {
      console.error('Error updating page:', error);
      toast.error(error.message || 'فشل تحديث الصفحة');
    }
  };

  const filteredPages = pages.filter((page) =>
    page.pageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.pagePath.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                التحكم في رؤية الصفحات
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                فتح/قفل صفحات وشاشات محددة
              </p>
            </div>
          </div>
          <button
            onClick={loadPages}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="تحديث"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="البحث في الصفحات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Pages List */}
      <div className="p-4">
        {filteredPages.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>لا توجد صفحات</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPages.map((page) => (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {page.pageName}
                    </h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        page.isVisible
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}
                    >
                      {page.isVisible ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          مرئي
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          مخفي
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {page.pagePath}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>الأدوار: {page.visibleToRoles.join(', ')}</span>
                    {page.visibleToUsers && page.visibleToUsers.length > 0 && (
                      <span>مستخدمون: {page.visibleToUsers.length}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleToggleVisibility(page.id, !page.isVisible)}
                  className={`p-3 rounded-lg transition-colors ${
                    page.isVisible
                      ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
                  }`}
                  title={page.isVisible ? 'إخفاء الصفحة' : 'إظهار الصفحة'}
                >
                  {page.isVisible ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageVisibilityControl;

