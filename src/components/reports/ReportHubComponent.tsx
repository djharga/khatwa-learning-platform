'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Eye,
  MessageSquare,
  Share,
  Download,
  Calendar,
  Clock,
  User,
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  X,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Highlighter,
  Paperclip,
  Bell,
  Link,
  BarChart3,
} from 'lucide-react';

/**
 * Report section with content and comments
 */
interface ReportSection {
  id: string;
  title: string;
  content: string;
  comments: Comment[];
  isCollapsed: boolean;
}

/**
 * Comment on a report section
 */
interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  sectionId: string;
}

/**
 * Viewer analytics data
 */
interface Viewer {
  id: string;
  name: string;
  viewedAt: string;
  duration: string;
}

/**
 * Attachment for the report
 */
interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
}

/**
 * Notification for new comments
 */
interface Notification {
  id: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

/**
 * Mock data for reports
 */
const mockReports = [
  {
    id: '1',
    title: 'تقرير الأداء الربع سنوي',
    description: 'تحليل شامل للأداء المالي والتشغيلي',
    author: 'أحمد محمد',
    createdAt: '2024-01-15',
    sections: [
      {
        id: 'sec1',
        title: 'المقدمة',
        content: 'هذا التقرير يغطي الأداء خلال الربع الأخير من العام. تم تحليل البيانات من مصادر متعددة لضمان الدقة.',
        comments: [
          {
            id: 'c1',
            author: 'سارة أحمد',
            content: 'هل يمكن إضافة المزيد من التفاصيل عن المصادر؟',
            timestamp: '2024-01-16T10:30:00',
            sectionId: 'sec1',
          },
        ],
        isCollapsed: false,
      },
      {
        id: 'sec2',
        title: 'تحليل المبيعات',
        content: 'شهدت المبيعات نمواً بنسبة 15% مقارنة بالربع السابق. المنتجات الجديدة ساهمت بنسبة 40% من هذا النمو.',
        comments: [],
        isCollapsed: false,
      },
      {
        id: 'sec3',
        title: 'التوصيات',
        content: 'يُنصح بزيادة الاستثمار في التسويق الرقمي وتطوير المنتجات الجديدة.',
        comments: [
          {
            id: 'c2',
            author: 'محمد علي',
            content: 'أوافق على التوصية الأولى، لكن هل لدينا ميزانية كافية؟',
            timestamp: '2024-01-17T14:20:00',
            sectionId: 'sec3',
          },
        ],
        isCollapsed: false,
      },
    ] as ReportSection[],
    viewers: [
      { id: 'v1', name: 'فاطمة خالد', viewedAt: '2024-01-16T09:00:00', duration: '25 دقيقة' },
      { id: 'v2', name: 'علي حسن', viewedAt: '2024-01-17T11:30:00', duration: '15 دقيقة' },
    ] as Viewer[],
    attachments: [
      { id: 'a1', name: 'بيانات_المبيعات.xlsx', size: '2.5 MB', type: 'Excel' },
      { id: 'a2', name: 'رسم_بياني_الأداء.pdf', size: '1.2 MB', type: 'PDF' },
    ] as Attachment[],
  },
];

/**
 * Interactive Report Hub component that displays reports with collapsible sections, comments, annotations, sharing, and analytics.
 */
const ReportHubComponent = () => {
  const [selectedReport, setSelectedReport] = useState(mockReports[0]);
  const [newComment, setNewComment] = useState('');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 'n1', message: 'تعليق جديد على قسم المقدمة', timestamp: '2024-01-16T10:30:00', isRead: false },
  ]);
  const [highlightedText, setHighlightedText] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Toggles the collapse state of a report section
   */
  const toggleSection = (sectionId: string) => {
    setSelectedReport(prev => ({
      ...prev,
      sections: prev.sections.map(sec =>
        sec.id === sectionId ? { ...sec, isCollapsed: !sec.isCollapsed } : sec
      ),
    }));
  };

  /**
   * Adds a comment to a specific section
   */
  const addComment = (sectionId: string) => {
    if (newComment.trim()) {
      // Compute sectionTitle by finding the section in selectedReport.sections that matches sectionId
      const sectionTitle = selectedReport.sections.find(s => s.id === sectionId)?.title;

      const comment: Comment = {
        id: `c${Date.now()}`,
        author: 'المستخدم الحالي',
        content: newComment,
        timestamp: new Date().toISOString(),
        sectionId,
      };

      // Call setSelectedReport() to add the comment
      setSelectedReport(prev => ({
        ...prev,
        sections: prev.sections.map(sec =>
          sec.id === sectionId ? { ...sec, comments: [...sec.comments, comment] } : sec
        ),
      }));

      setNewComment('');
      setSelectedSection(null);

      // Call setNotifications() with the correct message using the sectionTitle variable
      setNotifications(prev => [...prev, {
        id: `n${Date.now()}`,
        message: `تعليق جديد على قسم ${sectionTitle}`,
        timestamp: new Date().toISOString(),
        isRead: false,
      }]);
    }
  };

  /**
   * Handles text highlighting
   */
  const handleHighlight = () => {
    const selection = window.getSelection();
    if (selection?.toString()) {
      setHighlightedText(selection.toString());
    }
  };

  /**
   * Generates a mock share link
   */
  const generateShareLink = () => {
    return `https://example.com/reports/${selectedReport.id}`;
  };

  /**
   * Handles file attachment upload (mock)
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newAttachments: Attachment[] = files.map(file => ({
      id: `a${Date.now()}-${Math.random()}`,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      type: file.type.split('/')[1].toUpperCase(),
    }));
    setSelectedReport(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }));
    setShowAttachments(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 pt-20 transition-all duration-300">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
              Report Hub - {selectedReport.title}
            </h1>
            <p className="text-gray-600 mt-2 text-lg leading-relaxed">
              {selectedReport.description}
            </p>
          </div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowShareModal(true)}
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold flex items-center"
            >
              <Share className="w-4 h-4 mr-2" />
              مشاركة
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAnalytics(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold flex items-center"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              التحليلات
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAttachments(true)}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold flex items-center"
            >
              <Paperclip className="w-4 h-4 mr-2" />
              المرفقات
            </motion.button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHighlight}
            className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-all duration-300 font-semibold flex items-center"
          >
            <Highlighter className="w-4 h-4 mr-2" />
            تمييز النص
          </motion.button>
          {highlightedText && (
            <div className="bg-yellow-50 border border-yellow-200 p-2 rounded-lg">
              <p className="text-sm text-yellow-800">النص المميز: {highlightedText}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Report Content */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {selectedReport.sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 border-b border-gray-200 pb-6 last:border-b-0"
            >
              <div
                className="flex items-center justify-between cursor-pointer mb-4"
                onClick={() => toggleSection(section.id)}
              >
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  {section.isCollapsed ? (
                    <ChevronRight className="w-5 h-5 mr-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 mr-2" />
                  )}
                  {section.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {section.comments.length}
                </div>
              </div>
              <AnimatePresence>
                {!section.isCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-4"
                  >
                    <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSection(section.id)}
                      className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 transition-all duration-300 font-semibold flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      إضافة تعليق
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            الإشعارات ({notifications.filter(n => !n.isRead).length})
          </h3>
          <div className="space-y-4 mb-8">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-lg ${notif.isRead ? 'bg-gray-50' : 'bg-blue-50 border-r-4 border-blue-500'}`}
              >
                <p className="text-sm text-gray-800">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(notif.timestamp).toLocaleString('ar')}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-4">التعليقات</h3>
          <div className="space-y-4">
            {selectedReport.sections.flatMap(sec => sec.comments).map((comment) => (
              <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-xs">{comment.author.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{comment.author}</span>
                  <span className="text-xs text-gray-500 mr-2">{new Date(comment.timestamp).toLocaleString('ar')}</span>
                </div>
                <p className="text-sm text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
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
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">مشاركة التقرير</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رابط المشاركة</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={generateShareLink()}
                      readOnly
                      className="flex-1 p-3 border border-gray-300 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(generateShareLink())}
                      className="bg-blue-500 text-white px-4 py-3 rounded-r-xl hover:bg-blue-600 transition-all"
                    >
                      نسخ
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analytics Modal */}
      <AnimatePresence>
        {showAnalytics && (
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
              className="bg-white rounded-2xl p-6 w-full max-w-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">تحليلات المشاهدة</h3>
                <button
                  onClick={() => setShowAnalytics(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                {selectedReport.viewers.map((viewer) => (
                  <div key={viewer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">{viewer.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{viewer.name}</p>
                        <p className="text-xs text-gray-500">{viewer.duration}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{new Date(viewer.viewedAt).toLocaleString('ar')}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Attachments Modal */}
      <AnimatePresence>
        {showAttachments && (
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
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">المرفقات</h3>
                <button
                  onClick={() => setShowAttachments(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                {selectedReport.attachments.map((att) => (
                  <div key={att.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{att.name}</p>
                        <p className="text-xs text-gray-500">{att.size} - {att.type}</p>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>
                ))}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-blue-100 text-blue-800 py-3 rounded-xl hover:bg-blue-200 transition-all font-semibold flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة مرفق
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comment Modal */}
      <AnimatePresence>
        {selectedSection && (
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
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">إضافة تعليق</h3>
                <button
                  onClick={() => setSelectedSection(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="اكتب تعليقك هنا..."
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => addComment(selectedSection)}
                    disabled={!newComment.trim()}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    إضافة التعليق
                  </button>
                  <button
                    onClick={() => setSelectedSection(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportHubComponent;
