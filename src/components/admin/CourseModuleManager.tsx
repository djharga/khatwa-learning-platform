'use client';

import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronRight,
  FileText,
  Video,
  Settings,
  Save,
  X,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import type { Module, CreateModuleRequest, UpdateModuleRequest } from '@/types/course-management';
import toast from 'react-hot-toast';

interface CourseModuleManagerProps {
  courseId: string;
  modules: Module[];
  onModulesChange: (modules: Module[]) => void;
  className?: string;
}

const CourseModuleManager: FC<CourseModuleManagerProps> = ({
  courseId,
  modules,
  onModulesChange,
  className = '',
}) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<CreateModuleRequest>({
    courseId,
    title: '',
    description: '',
    order: modules.length + 1,
  });

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const handleAddModule = async () => {
    if (!formData.title.trim()) {
      toast.error('عنوان المحور مطلوب');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/courses/${courseId}/modules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('فشل إضافة المحور');
      }

      const data = await response.json();
      const newModules = [...modules, data.module];
      onModulesChange(newModules);
      setShowAddModal(false);
      setFormData({
        courseId,
        title: '',
        description: '',
        order: modules.length + 2,
      });
      toast.success('تم إضافة المحور بنجاح');
    } catch (error: any) {
      console.error('Error adding module:', error);
      toast.error(error.message || 'فشل إضافة المحور');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateModule = async (moduleId: string, updates: UpdateModuleRequest) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/courses/${courseId}/modules/${moduleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('فشل تحديث المحور');
      }

      const data = await response.json();
      const updatedModules = modules.map((m) =>
        m.id === moduleId ? { ...m, ...data.module } : m
      );
      onModulesChange(updatedModules);
      setEditingModuleId(null);
      toast.success('تم تحديث المحور بنجاح');
    } catch (error: any) {
      console.error('Error updating module:', error);
      toast.error(error.message || 'فشل تحديث المحور');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المحور؟ سيتم حذف جميع الدروس والملفات المرتبطة به.')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/courses/${courseId}/modules/${moduleId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('فشل حذف المحور');
      }

      const updatedModules = modules.filter((m) => m.id !== moduleId);
      onModulesChange(updatedModules);
      toast.success('تم حذف المحور بنجاح');
    } catch (error: any) {
      console.error('Error deleting module:', error);
      toast.error(error.message || 'فشل حذف المحور');
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (moduleId: string, newOrder: number) => {
    try {
      await handleUpdateModule(moduleId, { order: newOrder });
    } catch (error) {
      console.error('Error reordering module:', error);
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              إدارة المحاور
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {modules.length} محور
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            إضافة محور
          </button>
        </div>
      </div>

      {/* Modules List */}
      <div className="p-4">
        {modules.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>لا توجد محاور</p>
            <p className="text-sm mt-2">ابدأ بإضافة محور جديد</p>
          </div>
        ) : (
          <div className="space-y-2">
            {modules
              .sort((a, b) => a.order - b.order)
              .map((module) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="p-4 flex items-center gap-3">
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="flex-shrink-0"
                    >
                      {expandedModules.has(module.id) ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {editingModuleId === module.id ? (
                      <ModuleEditForm
                        module={module}
                        onSave={(updates) => handleUpdateModule(module.id, updates)}
                        onCancel={() => setEditingModuleId(null)}
                      />
                    ) : (
                      <>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {module.title}
                          </h4>
                          {module.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {module.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>{module.lessons.length} درس</span>
                            <span>{module.estimatedDuration} دقيقة</span>
                            <span>ترتيب: {module.order}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingModuleId(module.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="تعديل"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteModule(module.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {expandedModules.has(module.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="mt-4 space-y-2">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium">الحالة:</span>{' '}
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              module.status === 'published'
                                ? 'bg-green-100 text-green-800'
                                : module.status === 'locked'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {module.status === 'published' ? 'منشور' : module.status === 'locked' ? 'مقفل' : 'مسودة'}
                          </span>
                        </div>
                        {module.lessons.length > 0 && (
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">الدروس:</span>
                            <ul className="mt-2 space-y-1">
                              {module.lessons.map((lesson) => (
                                <li key={lesson.id} className="flex items-center gap-2">
                                  <FileText className="w-4 h-4" />
                                  <span>{lesson.title}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
          </div>
        )}
      </div>

      {/* Add Module Modal */}
      <AnimatePresence>
        {showAddModal && (
          <ModuleAddModal
            formData={formData}
            onFormDataChange={setFormData}
            onSave={handleAddModule}
            onCancel={() => {
              setShowAddModal(false);
              setFormData({
                courseId,
                title: '',
                description: '',
                order: modules.length + 1,
              });
            }}
            loading={loading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Module Edit Form Component
const ModuleEditForm: FC<{
  module: Module;
  onSave: (updates: UpdateModuleRequest) => void;
  onCancel: () => void;
}> = ({ module, onSave, onCancel }) => {
  const [title, setTitle] = useState(module.title);
  const [description, setDescription] = useState(module.description || '');

  const handleSave = () => {
    onSave({ title, description });
  };

  return (
    <div className="flex-1 flex items-center gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder="عنوان المحور"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder="وصف المحور (اختياري)"
      />
      <button
        onClick={handleSave}
        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
      >
        <CheckCircle className="w-5 h-5" />
      </button>
      <button
        onClick={onCancel}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

// Module Add Modal Component
const ModuleAddModal: FC<{
  formData: CreateModuleRequest;
  onFormDataChange: (data: CreateModuleRequest) => void;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
}> = ({ formData, onFormDataChange, onSave, onCancel, loading }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          إضافة محور جديد
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              عنوان المحور *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                onFormDataChange({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="عنوان المحور"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              وصف المحور
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) =>
                onFormDataChange({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="وصف المحور (اختياري)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الترتيب
            </label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) =>
                onFormDataChange({ ...formData, order: parseInt(e.target.value) || 1 })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              min={1}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={onSave}
            disabled={loading || !formData.title.trim()}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'جاري الحفظ...' : 'حفظ'}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            إلغاء
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CourseModuleManager;

