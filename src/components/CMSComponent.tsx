'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Save,
  X,
  Eye,
  FileText,
  Image,
  Video,
  Calendar,
  User,
} from 'lucide-react';

interface Content {
  id: string;
  title: string;
  type: 'article' | 'video' | 'image' | 'document';
  category: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  tags: string[];
}

const CMSComponent = () => {
  const [contents, setContents] = useState<Content[]>([
    {
      id: '1',
      title: 'أساسيات المراجعة الداخلية',
      type: 'article',
      category: 'المراجعة الداخلية',
      status: 'published',
      author: 'د. أحمد محمد',
      createdAt: '2023-10-01',
      updatedAt: '2023-10-05',
      content: 'مقدمة في مبادئ المراجعة الداخلية وأهميتها في المؤسسات...',
      tags: ['مراجعة', 'تدقيق', 'ضوابط داخلية'],
    },
    {
      id: '2',
      title: 'المعايير الدولية للمحاسبة',
      type: 'document',
      category: 'المحاسبة',
      status: 'published',
      author: 'د. فاطمة علي',
      createdAt: '2023-10-03',
      updatedAt: '2023-10-03',
      content: 'شرح للمعايير الدولية للمحاسبة IFRS وأهم التغييرات...',
      tags: ['معايير', 'IFRS', 'تقارير مالية'],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedType, setSelectedType] = useState('الكل');
  const [selectedStatus, setSelectedStatus] = useState('الكل');
  const [showForm, setShowForm] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'article' as Content['type'],
    category: '',
    content: '',
    tags: '',
  });

  const categories = [
    'الكل',
    'المراجعة الداخلية',
    'المحاسبة',
    'الضرائب',
    'التحليل المالي',
    'إدارة المخاطر',
  ];
  const types = ['الكل', 'article', 'video', 'image', 'document'];
  const statuses = ['الكل', 'draft', 'published', 'archived'];

  const filteredContents = useMemo(() => {
    return contents.filter((content) => {
      const matchesSearch =
        content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === 'الكل' || content.category === selectedCategory;
      const matchesType =
        selectedType === 'الكل' || content.type === selectedType;
      const matchesStatus =
        selectedStatus === 'الكل' || content.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesType && matchesStatus;
    });
  }, [contents, searchTerm, selectedCategory, selectedType, selectedStatus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newContent: Content = {
      id: editingContent ? editingContent.id : Date.now().toString(),
      title: formData.title,
      type: formData.type,
      category: formData.category,
      status: 'draft',
      author: 'المستخدم الحالي', // في التطبيق الحقيقي، من الـ auth
      createdAt: editingContent
        ? editingContent.createdAt
        : new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      content: formData.content,
      tags: formData.tags.split(',').map((tag) => tag.trim()),
    };

    if (editingContent) {
      setContents((prev) =>
        prev.map((c) => (c.id === editingContent.id ? newContent : c))
      );
    } else {
      setContents((prev) => [...prev, newContent]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'article',
      category: '',
      content: '',
      tags: '',
    });
    setEditingContent(null);
    setShowForm(false);
  };

  const handleEdit = (content: Content) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      type: content.type,
      category: content.category,
      content: content.content,
      tags: content.tags.join(', '),
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المحتوى؟')) {
      setContents((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const getTypeIcon = (type: Content['type']) => {
    switch (type) {
      case 'article':
        return <FileText className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'image':
        return <Image className="w-5 h-5" />;
      case 'document':
        return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: Content['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          نظام إدارة المحتوى المحاسبي
        </h1>
        <p className="text-lg text-neutral max-w-3xl mx-auto">
          إدارة المحتوى التعليمي المتخصص في المحاسبة والمراجعة الداخلية
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في المحتوى..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Add Content Button */}
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            إضافة محتوى
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="الكل">جميع الفئات</option>
            {categories.slice(1).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type === 'الكل' ? 'جميع الأنواع' : type}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === 'الكل' ? 'جميع الحالات' : status}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Content List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 gap-6"
      >
        {filteredContents.map((content, index) => (
          <motion.div
            key={content.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
                  {getTypeIcon(content.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {content.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {content.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {content.createdAt}
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(content.status)}`}
                    >
                      {content.status === 'published'
                        ? 'منشور'
                        : content.status === 'draft'
                          ? 'مسودة'
                          : 'مؤرشف'}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-2 mb-3">
                    {content.content.substring(0, 200)}...
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {content.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={() => handleEdit(content)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                  title="تحرير"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(content.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                  title="حذف"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-colors"
                  title="معاينة"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary">
                  {editingContent ? 'تحرير المحتوى' : 'إضافة محتوى جديد'}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      العنوان *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="مثال: معايير المراجعة الداخلية"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الفئة *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">اختر فئة</option>
                      {categories.slice(1).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    النوع *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as Content['type'],
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="article">مقالة</option>
                    <option value="video">فيديو</option>
                    <option value="image">صورة</option>
                    <option value="document">مستند</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    المحتوى *
                  </label>
                  <textarea
                    required
                    rows={8}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="محتوى المادة..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الكلمات المفتاحية (مفصولة بفواصل)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="برمجة, تعليم, مبتدئين"
                  />
                </div>

                <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingContent ? 'تحديث' : 'حفظ'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CMSComponent;
