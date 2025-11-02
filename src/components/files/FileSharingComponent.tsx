'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Share2,
  Link,
  Eye,
  Download,
  MessageSquare,
  Calendar,
  Lock,
  Copy,
  Trash2,
  Edit,
  X,
  Check,
  Users,
  Clock,
} from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Represents a shared link with permissions and metadata
 */
interface SharedLink {
  /** Unique identifier for the shared link */
  id: string;
  /** ID of the file being shared */
  fileId: string;
  /** Generated sharing URL */
  url: string;
  /** Permissions granted (read, comment, download) */
  permissions: {
    read: boolean;
    comment: boolean;
    download: boolean;
  };
  /** Expiration date as ISO string */
  expiresAt: string;
  /** Optional password for access */
  password?: string;
  /** Creation timestamp */
  createdAt: string;
  /** View statistics */
  stats: {
    views: number;
    uniqueViewers: number;
    lastViewed?: string;
  };
}

/**
 * Props for the file sharing component
 */
interface FileSharingComponentProps {
  /** The file to be shared */
  file: {
    id: string;
    name: string;
    type: string;
    size: string;
  };
  /** Optional callback when sharing is complete */
  onClose?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Mock data for shared links - in real app this would come from API
 */
const mockSharedLinks: SharedLink[] = [
  {
    id: '1',
    fileId: 'file-1',
    url: 'https://share.example.com/abc123',
    permissions: { read: true, comment: true, download: false },
    expiresAt: '2024-12-31T23:59:59Z',
    createdAt: '2024-01-15T10:00:00Z',
    stats: { views: 25, uniqueViewers: 12, lastViewed: '2024-01-20T14:30:00Z' },
  },
  {
    id: '2',
    fileId: 'file-1',
    url: 'https://share.example.com/def456',
    permissions: { read: true, comment: false, download: true },
    expiresAt: '2024-02-15T23:59:59Z',
    password: 'secure123',
    createdAt: '2024-01-10T09:15:00Z',
    stats: { views: 8, uniqueViewers: 5, lastViewed: '2024-01-18T16:45:00Z' },
  },
];

/**
 * File sharing component for creating and managing shared links
 */
const FileSharingComponent = ({
  file,
  onClose,
  className = ''
}: FileSharingComponentProps) => {
  const [sharedLinks, setSharedLinks] = useState<SharedLink[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingLink, setEditingLink] = useState<SharedLink | null>(null);
  
  // Form state for creating/editing links
  const [permissions, setPermissions] = useState({
    read: true,
    comment: false,
    download: false,
  });
  const [expiresAt, setExpiresAt] = useState('');
  const [password, setPassword] = useState('');
  const [usePassword, setUsePassword] = useState(false);

  // Load shared links for this file
  useEffect(() => {
    const fileLinks = mockSharedLinks.filter(link => link.fileId === file.id);
    setSharedLinks(fileLinks);
  }, [file.id]);

  /**
   * Generates a mock sharing link
   */
  const generateShareLink = (): string => {
    const randomId = Math.random().toString(36).substring(2, 8);
    return `https://share.example.com/${randomId}`;
  };

  /**
   * Creates a new shared link
   */
  const handleCreateLink = () => {
    if (!permissions.read && !permissions.comment && !permissions.download) {
      toast.error('يجب اختيار صلاحية واحدة على الأقل');
      return;
    }

    const newLink: SharedLink = {
      id: Date.now().toString(),
      fileId: file.id,
      url: generateShareLink(),
      permissions,
      expiresAt: expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days default
      password: usePassword ? password : undefined,
      createdAt: new Date().toISOString(),
      stats: { views: 0, uniqueViewers: 0 },
    };

    setSharedLinks(prev => [...prev, newLink]);
    setShowCreateForm(false);
    resetForm();
    toast.success('تم إنشاء رابط المشاركة بنجاح');
  };

  /**
   * Updates an existing shared link
   */
  const handleUpdateLink = () => {
    if (!editingLink) return;

    if (!permissions.read && !permissions.comment && !permissions.download) {
      toast.error('يجب اختيار صلاحية واحدة على الأقل');
      return;
    }

    const updatedLink: SharedLink = {
      ...editingLink,
      permissions,
      expiresAt: expiresAt || editingLink.expiresAt,
      password: usePassword ? password : undefined,
    };

    setSharedLinks(prev => prev.map(link => 
      link.id === editingLink.id ? updatedLink : link
    ));
    setEditingLink(null);
    resetForm();
    toast.success('تم تحديث رابط المشاركة بنجاح');
  };

  /**
   * Deletes a shared link
   */
  const handleDeleteLink = (linkId: string) => {
    setSharedLinks(prev => prev.filter(link => link.id !== linkId));
    toast.success('تم حذف رابط المشاركة');
  };

  /**
   * Copies link to clipboard
   */
  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('تم نسخ الرابط إلى الحافظة');
    } catch (error) {
      toast.error('فشل في نسخ الرابط');
    }
  };

  /**
   * Resets the form to default values
   */
  const resetForm = () => {
    setPermissions({ read: true, comment: false, download: false });
    setExpiresAt('');
    setPassword('');
    setUsePassword(false);
  };

  /**
   * Starts editing a link
   */
  const startEditing = (link: SharedLink) => {
    setEditingLink(link);
    setPermissions(link.permissions);
    setExpiresAt(link.expiresAt.split('T')[0]); // Date only for input
    setPassword(link.password || '');
    setUsePassword(Boolean(link.password));
  };

  /**
   * Cancels editing
   */
  const cancelEditing = () => {
    setEditingLink(null);
    resetForm();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-white/10">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">مشاركة الملف</h3>
              <p className="text-blue-100 text-sm">
                {file.name} • {file.type.toUpperCase()} • {file.size}
              </p>
            </div>
          </div>

          {onClose && (
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Create New Link Button */}
        <div className="mb-6">
          <motion.button
            onClick={() => setShowCreateForm(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link className="w-5 h-5" />
            إنشاء رابط مشاركة جديد
          </motion.button>
        </div>

        {/* Create/Edit Form */}
        {(showCreateForm || editingLink) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-gray-50 rounded-lg border"
          >
            <h4 className="font-semibold text-gray-900 mb-4">
              {editingLink ? 'تعديل رابط المشاركة' : 'إنشاء رابط مشاركة جديد'}
            </h4>

            {/* Permissions */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الصلاحيات
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissions.read}
                    onChange={(e) => setPermissions(prev => ({ ...prev, read: e.target.checked }))}
                    className="rounded"
                  />
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span>قراءة</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissions.comment}
                    onChange={(e) => setPermissions(prev => ({ ...prev, comment: e.target.checked }))}
                    className="rounded"
                  />
                  <MessageSquare className="w-4 h-4 text-green-600" />
                  <span>تعليق</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissions.download}
                    onChange={(e) => setPermissions(prev => ({ ...prev, download: e.target.checked }))}
                    className="rounded"
                  />
                  <Download className="w-4 h-4 text-purple-600" />
                  <span>تحميل</span>
                </label>
              </div>
            </div>

            {/* Expiration Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاريخ الانتهاء
              </label>
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Password Protection */}
            <div className="mb-4">
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={usePassword}
                  onChange={(e) => setUsePassword(e.target.checked)}
                  className="rounded"
                />
                <Lock className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">حماية بكلمة مرور</span>
              </label>
              {usePassword && (
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <motion.button
                onClick={editingLink ? handleUpdateLink : handleCreateLink}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Check className="w-4 h-4" />
                {editingLink ? 'تحديث' : 'إنشاء'}
              </motion.button>
              <motion.button
                onClick={editingLink ? cancelEditing : () => setShowCreateForm(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                إلغاء
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Shared Links List */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">الروابط المشتركة</h4>
          
          {sharedLinks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Share2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>لا توجد روابط مشاركة حالياً</p>
            </div>
          ) : (
            sharedLinks.map((link) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-4 bg-white"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Link className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-900 truncate">{link.url}</span>
                      <motion.button
                        onClick={() => handleCopyLink(link.url)}
                        className="p-1 hover:bg-gray-100 rounded"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Copy className="w-4 h-4 text-gray-600" />
                      </motion.button>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>ينتهي: {new Date(link.expiresAt).toLocaleDateString('ar-SA')}</span>
                      </div>
                      {link.password && (
                        <div className="flex items-center gap-1">
                          <Lock className="w-4 h-4" />
                          <span>محمي</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      {link.permissions.read && <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">قراءة</span>}
                      {link.permissions.comment && <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">تعليق</span>}
                      {link.permissions.download && <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">تحميل</span>}
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <motion.button
                      onClick={() => startEditing(link)}
                      className="p-2 hover:bg-gray-100 rounded"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteLink(link.id)}
                      className="p-2 hover:bg-red-100 rounded"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </motion.button>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span>{link.stats.views} مشاهدة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>{link.stats.uniqueViewers} مستخدم</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{link.stats.lastViewed ? new Date(link.stats.lastViewed).toLocaleDateString('ar-SA') : 'لم يُشاهد'}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FileSharingComponent;