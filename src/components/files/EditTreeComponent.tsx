'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  User,
  Search,
  Filter,
  Download,
  RotateCcw,
  Eye,
  Calendar,
  ChevronDown,
  ChevronUp,
  X,
  FileText,
  BarChart3,
} from 'lucide-react';

// Mock data for edit history
const mockEdits = [
  {
    id: '1',
    user: 'أحمد محمد',
    timestamp: '2024-01-15T10:30:00Z',
    action: 'تعديل',
    details: 'تم تعديل فقرة الملخص التنفيذي',
    version: 3,
    changes: {
      before: 'التقرير يظهر أداء جيد في الربع الأول',
      after: 'التقرير يظهر أداء ممتاز في الربع الأول مع زيادة 15%',
    },
  },
  {
    id: '2',
    user: 'فاطمة علي',
    timestamp: '2024-01-14T14:20:00Z',
    action: 'إضافة',
    details: 'تم إضافة قسم التحليل المالي',
    version: 2,
    changes: {
      before: '',
      after: 'قسم التحليل المالي الجديد يتضمن الرسوم البيانية والإحصائيات',
    },
  },
  {
    id: '3',
    user: 'أحمد محمد',
    timestamp: '2024-01-13T09:15:00Z',
    action: 'إنشاء',
    details: 'تم إنشاء الملف الأولي',
    version: 1,
    changes: {
      before: '',
      after: 'الملف الأساسي مع الهيكل العام',
    },
  },
  {
    id: '4',
    user: 'سارة خالد',
    timestamp: '2024-01-12T16:45:00Z',
    action: 'حذف',
    details: 'تم حذف الفقرة غير الضرورية',
    version: 0,
    changes: {
      before: 'فقرة تحتوي على معلومات قديمة',
      after: '',
    },
  },
  {
    id: '5',
    user: 'فاطمة علي',
    timestamp: '2024-01-11T11:00:00Z',
    action: 'تعديل',
    details: 'تم تصحيح الأخطاء النحوية',
    version: 2,
    changes: {
      before: 'التقرير يحتوي على أخطاء',
      after: 'التقرير مصحح ومراجع',
    },
  },
];

interface Edit {
  id: string;
  user: string;
  timestamp: string;
  action: string;
  details: string;
  version?: number;
  changes: {
    before: string;
    after: string;
  };
}

const EditTreeComponent = () => {
  const [edits] = useState<Edit[]>(mockEdits);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState('الكل');
  const [dateFilter, setDateFilter] = useState('');
  const [showDiff, setShowDiff] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const users = useMemo(() => {
    const uniqueUsers = Array.from(new Set(edits.map(edit => edit.user)));
    return ['الكل', ...uniqueUsers];
  }, [edits]);

  const filteredEdits = useMemo(() => {
    return edits.filter(edit => {
      const matchesSearch = edit.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           edit.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           edit.user.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUser = selectedUser === 'الكل' || edit.user === selectedUser;
      const matchesDate = !dateFilter || edit.timestamp.startsWith(dateFilter);
      return matchesSearch && matchesUser && matchesDate;
    });
  }, [edits, searchTerm, selectedUser, dateFilter]);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleRestore = (version: number) => {
    // Simulate restore
    alert(`تم استعادة النسخة ${version} بنجاح (محاكاة)`);
  };

  const handleExport = () => {
    // Simulate PDF export
    alert('تم تصدير سجل التعديلات كـ PDF (محاكاة)');
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'إنشاء': return 'bg-green-100 text-green-800';
      case 'تعديل': return 'bg-blue-100 text-blue-800';
      case 'إضافة': return 'bg-purple-100 text-purple-800';
      case 'حذف': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Simple activity chart data
  const activityData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => ({
      date,
      count: edits.filter(edit => edit.timestamp.startsWith(date)).length,
    }));
  }, [edits]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 pt-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
              شجرة التعديلات
            </h1>
            <p className="text-gray-600 mt-2 text-lg leading-relaxed">
              تتبع جميع التعديلات على الملفات مع التفاصيل الكاملة
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center"
          >
            <Download className="w-5 h-5 mr-2" />
            تصدير PDF
          </motion.button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في التعديلات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-300 text-lg"
            />
          </div>

          <div className="flex gap-6">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white font-medium transition-all duration-300"
            >
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white font-medium transition-all duration-300"
            />
          </div>
        </div>
      </motion.div>

      {/* Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
          نشاط التعديلات (آخر 7 أيام)
        </h3>
        <div className="flex items-end justify-between h-32 gap-2">
          {activityData.map((day, index) => (
            <div key={day.date} className="flex-1 flex flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(day.count / Math.max(...activityData.map(d => d.count))) * 100}%` }}
                transition={{ delay: index * 0.1 }}
                className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg mb-2"
                style={{ minHeight: day.count > 0 ? '8px' : '0px' }}
              />
              <span className="text-xs text-gray-500 transform -rotate-45 origin-top">
                {new Date(day.date).toLocaleDateString('ar-SA', { weekday: 'short' })}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {filteredEdits.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg"
          >
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              لا توجد تعديلات متاحة
            </h3>
            <p className="text-gray-700 text-lg max-w-md mx-auto">
              غيّر معايير البحث للعثور على التعديلات المطلوبة
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredEdits.map((edit, index) => (
              <motion.div
                key={edit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start"
              >
                {/* Timeline line */}
                <div className="absolute right-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 opacity-30"></div>

                {/* Timeline dot */}
                <div className="relative z-10 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg mr-6">
                  <Clock className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg">
                            {edit.user}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {formatDate(edit.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getActionColor(edit.action)}`}>
                          {edit.action}
                        </span>
                        {edit.version && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            النسخة {edit.version}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{edit.details}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2 space-x-reverse">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleExpanded(edit.id)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center"
                        >
                          {expandedItems.has(edit.id) ? (
                            <ChevronUp className="w-4 h-4 mr-1" />
                          ) : (
                            <ChevronDown className="w-4 h-4 mr-1" />
                          )}
                          التفاصيل
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowDiff(edit.id)}
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          مقارنة
                        </motion.button>
                        {edit.version && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRestore(edit.version!)}
                            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all flex items-center"
                          >
                            <RotateCcw className="w-4 h-4 mr-1" />
                            استعادة
                          </motion.button>
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedItems.has(edit.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 pt-4 border-t border-gray-200"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">قبل التعديل:</h4>
                              <div className="bg-red-50 p-3 rounded-lg text-sm text-gray-700 border border-red-200">
                                {edit.changes.before || 'لا يوجد محتوى'}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">بعد التعديل:</h4>
                              <div className="bg-green-50 p-3 rounded-lg text-sm text-gray-700 border border-green-200">
                                {edit.changes.after || 'لا يوجد محتوى'}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Diff Modal */}
      <AnimatePresence>
        {showDiff && (
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
              className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  مقارنة التعديلات
                </h3>
                <button
                  onClick={() => setShowDiff(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {(() => {
                const edit = edits.find(e => e.id === showDiff);
                if (!edit) return null;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        النسخة السابقة
                      </h4>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200 min-h-[200px]">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                          {edit.changes.before || 'لا يوجد محتوى'}
                        </pre>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        النسخة الحالية
                      </h4>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200 min-h-[200px]">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                          {edit.changes.after || 'لا يوجد محتوى'}
                        </pre>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditTreeComponent;