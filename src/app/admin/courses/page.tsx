'use client';

/**
 * صفحة إدارة الدورات - لوحة الإدارة | منصة خطى التعليمية
 * تتيح للمدير إدارة جميع الدورات في المنصة
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Upload,
  Download,
  FileText,
  Video,
  Image,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Pause,
  Lock,
  Unlock,
  Copy,
  Move,
  Settings,
  BookOpen,
  FolderOpen,
  FileVideo,
  FileSpreadsheet,
  MoreVertical,
  Save,
  X,
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  type: 'short' | 'long'; // قصيرة أو طويلة المدى
  status: 'active' | 'inactive' | 'review' | 'suspended';
  enrolledStudents: number;
  completedStudents: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  lastModified: string;
  modules: Module[];
  storageUsed: number;
  totalFiles: number;
  isLocked: boolean;
  tags: string[];
}

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  files: CourseFile[];
  videos: VideoContent[];
  isLocked: boolean;
}

interface CourseFile {
  id: string;
  name: string;
  type: 'word' | 'excel' | 'pdf' | 'powerpoint' | 'other';
  size: number;
  uploadedAt: string;
  version: number;
  explanationVideo?: string;
  downloads: number;
  lastModified: string;
}

interface VideoContent {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: number; // بالدقائق
  uploadedAt: string;
  views: number;
}

const AdminCoursesPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [showFileManager, setShowFileManager] = useState(false);
  const [loading, setLoading] = useState(true);

  // بيانات الدورات - يتم تحميلها من API
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'دورة المراجعة الداخلية المستوى الأول',
      description: 'أساسيات المراجعة الداخلية والمحاسبة',
      image: '/courses/auditing-1.jpg',
      instructor: 'د. أحمد محمد',
      type: 'short',
      status: 'active',
      enrolledStudents: 127,
      completedStudents: 89,
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      createdAt: '2024-01-15',
      lastModified: '2024-01-20',
      storageUsed: 2048, // 2GB
      totalFiles: 45,
      isLocked: false,
      tags: ['مراجعة داخلية', 'أساسيات', 'محاسبة'],
      modules: [
        {
          id: 'm1',
          title: 'مقدمة في المراجعة الداخلية',
          description: 'فهم أساسيات المراجعة الداخلية',
          order: 1,
          isLocked: false,
          files: [
            {
              id: 'f1',
              name: 'مقدمة_المراجعة_الداخلية.docx',
              type: 'word',
              size: 2048,
              uploadedAt: '2024-01-15',
              version: 1,
              downloads: 89,
              lastModified: '2024-01-15'
            },
            {
              id: 'f2',
              name: 'جدول_المراجعة.xlsx',
              type: 'excel',
              size: 512,
              uploadedAt: '2024-01-15',
              version: 2,
              downloads: 67,
              lastModified: '2024-01-18'
            }
          ],
          videos: [
            {
              id: 'v1',
              title: 'شرح المقدمة',
              description: 'شرح مفصل لأساسيات المراجعة',
              url: '/videos/module1-intro.mp4',
              duration: 25,
              uploadedAt: '2024-01-16',
              views: 156
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'برنامج زمالة المراجعين الداخليين',
      description: 'برنامج شامل للحصول على شهادة الزمالة',
      image: '/courses/fellowship.jpg',
      instructor: 'د. فاطمة علي',
      type: 'long',
      status: 'active',
      enrolledStudents: 89,
      completedStudents: 23,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      createdAt: '2023-12-01',
      lastModified: '2024-01-20',
      storageUsed: 15360, // 15GB
      totalFiles: 234,
      isLocked: false,
      tags: ['زمالة', 'متقدم', 'شهادة'],
      modules: []
    },
    {
      id: '3',
      title: 'دورة الإدارة المالية المتقدمة',
      description: 'تقنيات إدارة المالية والميزانيات',
      image: '/courses/finance.jpg',
      instructor: 'د. محمد حسن',
      type: 'short',
      status: 'review',
      enrolledStudents: 45,
      completedStudents: 0,
      startDate: '2024-02-15',
      endDate: '2024-03-01',
      createdAt: '2024-01-20',
      lastModified: '2024-01-20',
      storageUsed: 1024, // 1GB
      totalFiles: 23,
      isLocked: true,
      tags: ['مالية', 'ميزانيات', 'إدارة'],
      modules: []
    }
  ]);

  // تحميل الدورات من API
  useEffect(() => {
    loadCourses();
  }, [statusFilter, typeFilter, searchTerm]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (typeFilter !== 'all') params.append('type', typeFilter);

      const response = await fetch(`/api/admin/courses?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setCourses(result.courses || []);
      } else {
        console.error('Error loading courses:', result.error);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
      const matchesType = typeFilter === 'all' || course.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [courses, searchTerm, statusFilter, typeFilter]);

  const stats = useMemo(() => {
    const total = courses.length;
    const active = courses.filter(c => c.status === 'active').length;
    const review = courses.filter(c => c.status === 'review').length;
    const suspended = courses.filter(c => c.status === 'suspended').length;
    const shortCourses = courses.filter(c => c.type === 'short').length;
    const longCourses = courses.filter(c => c.type === 'long').length;
    const totalStudents = courses.reduce((sum, c) => sum + c.enrolledStudents, 0);
    const totalStorage = courses.reduce((sum, c) => sum + c.storageUsed, 0);

    return { total, active, review, suspended, shortCourses, longCourses, totalStudents, totalStorage };
  }, [courses]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشطة';
      case 'inactive': return 'غير نشطة';
      case 'review': return 'قيد المراجعة';
      case 'suspended': return 'معلقة';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    return type === 'short' ? 'قصيرة' : 'طويلة المدى';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'word': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'excel': return <FileSpreadsheet className="w-4 h-4 text-green-500" />;
      case 'pdf': return <FileText className="w-4 h-4 text-red-500" />;
      case 'powerpoint': return <FileText className="w-4 h-4 text-orange-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleLockCourse = async (courseId: string, lock: boolean) => {
    try {
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isLocked: lock }),
      });

      const result = await response.json();
      if (result.success) {
        setCourses(courses.map(c => c.id === courseId ? { ...c, isLocked: lock } : c));
        alert(lock ? 'تم قفل الدورة بنجاح' : 'تم فتح الدورة بنجاح');
      } else {
        alert(result.error || 'فشل تحديث حالة الدورة');
      }
    } catch (error) {
      console.error('Error updating course lock:', error);
      alert('حدث خطأ أثناء تحديث حالة الدورة');
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الدورة؟ سيتم حذف جميع الملفات والمحتوى المرتبط بها.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        setCourses(courses.filter(c => c.id !== courseId));
        if (selectedCourse?.id === courseId) {
          setSelectedCourse(null);
          setShowCourseDetails(false);
        }
        alert('تم حذف الدورة بنجاح');
      } else {
        alert(result.error || 'فشل حذف الدورة');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('حدث خطأ أثناء حذف الدورة');
    }
  };

  const handleAddCourse = async (courseData: Partial<Course> & { imageFile?: File }) => {
    try {
      const formData = new FormData();
      formData.append('title', courseData.title || '');
      formData.append('description', courseData.description || '');
      formData.append('instructor', courseData.instructor || '');
      formData.append('type', courseData.type || 'short');
      if (courseData.startDate) formData.append('startDate', courseData.startDate);
      if (courseData.endDate) formData.append('endDate', courseData.endDate);
      if (courseData.imageFile) {
        formData.append('image', courseData.imageFile);
      } else if (courseData.image) {
        formData.append('imageUrl', courseData.image);
      }

      const response = await fetch('/api/admin/courses', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setCourses([result.course, ...courses]);
        setShowAddCourseModal(false);
        alert('تم إضافة الدورة بنجاح');
        loadCourses(); // إعادة تحميل الدورات
      } else {
        alert(result.error || 'فشل إضافة الدورة');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      alert('حدث خطأ أثناء إضافة الدورة');
    }
  };

  const handleEditCourse = async (courseId: string, courseData: Partial<Course> & { imageFile?: File }) => {
    try {
      const formData = new FormData();
      if (courseData.title) formData.append('title', courseData.title);
      if (courseData.description) formData.append('description', courseData.description);
      if (courseData.instructor) formData.append('instructor', courseData.instructor);
      if (courseData.type) formData.append('type', courseData.type);
      if (courseData.startDate) formData.append('startDate', courseData.startDate);
      if (courseData.endDate) formData.append('endDate', courseData.endDate);
      if (courseData.imageFile) {
        formData.append('image', courseData.imageFile);
      } else if (courseData.image) {
        formData.append('imageUrl', courseData.image);
      }

      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: 'PUT',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setCourses(courses.map(c => c.id === courseId ? { ...c, ...courseData } : c));
        if (selectedCourse?.id === courseId) {
          setSelectedCourse({ ...selectedCourse, ...courseData });
        }
        alert('تم تحديث الدورة بنجاح');
        loadCourses(); // إعادة تحميل الدورات
      } else {
        alert(result.error || 'فشل تحديث الدورة');
      }
    } catch (error) {
      console.error('Error updating course:', error);
      alert('حدث خطأ أثناء تحديث الدورة');
    }
  };

  const handleDuplicateCourse = async (course: Course) => {
    const courseData = {
      title: `${course.title} (نسخة)`,
      description: course.description,
      instructor: course.instructor,
      type: course.type,
      image: course.image,
      startDate: course.startDate,
      endDate: course.endDate,
    };
    await handleAddCourse(courseData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 px-6 py-3 rounded-full mb-6 shadow-lg border border-purple-200/50 dark:border-purple-700/50"
          >
            <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-300 font-bold">إدارة الدورات والمحتوى</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 dark:from-white dark:via-purple-100 dark:to-indigo-100 bg-clip-text text-transparent mb-4"
          >
            نظام إدارة الدورات الشامل
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            إدارة شاملة للدورات والمحتوى والملفات مع جميع أدوات التحكم
          </motion.p>
        </motion.div>

        {/* الإحصائيات */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي الدورات</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">دورات نشطة</p>
                <p className="text-3xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">قيد المراجعة</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.review}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">معلقة</p>
                <p className="text-3xl font-bold text-red-600">{stats.suspended}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">دورات قصيرة</p>
                <p className="text-3xl font-bold text-purple-600">{stats.shortCourses}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">دورات طويلة</p>
                <p className="text-3xl font-bold text-indigo-600">{stats.longCourses}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي الطلاب</p>
                <p className="text-3xl font-bold text-teal-600">{stats.totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي التخزين</p>
                <p className="text-3xl font-bold text-orange-600">{(stats.totalStorage / 1024).toFixed(1)} GB</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* التبويبات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            {[
              { id: 'all', label: 'جميع الدورات', count: courses.length },
              { id: 'active', label: 'الدورات النشطة', count: stats.active },
              { id: 'review', label: 'قيد المراجعة', count: stats.review },
              { id: 'short', label: 'دورات قصيرة', count: stats.shortCourses },
              { id: 'long', label: 'دورات طويلة', count: stats.longCourses }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {tab.count}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* شريط التحكم */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* شريط البحث */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="البحث في الدورات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* الفلاتر */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشطة</option>
                <option value="inactive">غير نشطة</option>
                <option value="review">قيد المراجعة</option>
                <option value="suspended">معلقة</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              >
                <option value="all">جميع الأنواع</option>
                <option value="short">قصيرة</option>
                <option value="long">طويلة المدى</option>
              </select>
            </div>

            {/* أزرار التحكم */}
            <div className="flex items-center gap-3">
              <motion.button
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddCourseModal(true)}
              >
                <Plus className="w-5 h-5" />
                دورة جديدة
              </motion.button>

              <motion.button
                className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                تصدير البيانات
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* قائمة الدورات - عرض بطاقات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* صورة الدورة */}
              <div className="relative h-48 bg-gradient-to-br from-purple-500 to-blue-600">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                    {course.status === 'active' ? <CheckCircle className="w-3 h-3" /> :
                     course.status === 'review' ? <Clock className="w-3 h-3" /> :
                     course.status === 'suspended' ? <XCircle className="w-3 h-3" /> :
                     <XCircle className="w-3 h-3" />}
                    {getStatusLabel(course.status)}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    course.type === 'short' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {getTypeLabel(course.type)}
                  </span>
                </div>
                {course.isLocked && (
                  <div className="absolute top-4 left-4">
                    <Lock className="w-6 h-6 text-red-500 bg-white/90 rounded-full p-1" />
                  </div>
                )}
              </div>

              {/* محتوى البطاقة */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* معلومات الدورة */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">المدرس:</span>
                    <span className="font-medium text-gray-900">{course.instructor}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">المشاركون:</span>
                    <span className="font-medium text-gray-900">
                      {course.completedStudents}/{course.enrolledStudents}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">التخزين:</span>
                    <span className="font-medium text-gray-900">
                      {(course.storageUsed / 1024).toFixed(1)} GB
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">المدة:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(course.startDate).toLocaleDateString('ar-SA')} - {new Date(course.endDate).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                </div>

                {/* العلامات */}
                {course.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                    {course.tags.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        +{course.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* أزرار التحكم */}
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedCourse(course);
                      setShowCourseDetails(true);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    عرض
                  </motion.button>

                  <motion.button
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFileManager(true)}
                  >
                    <FolderOpen className="w-4 h-4" />
                    ملفات
                  </motion.button>

                  <motion.button
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDuplicateCourse(course)}
                  >
                    <Copy className="w-4 h-4" />
                    نسخ
                  </motion.button>

                                      <motion.button
                      className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedCourse(course);
                        setShowEditCourseModal(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                      تعديل
                    </motion.button>
                </div>

                {/* أزرار إضافية */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <motion.button
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLockCourse(course.id, !course.isLocked)}
                  >
                    {course.isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    {course.isLocked ? 'فتح' : 'قفل'}
                  </motion.button>

                  <motion.button
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    حذف
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* رسالة عدم وجود نتائج */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100 mt-8"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد دورات</h3>
            <p className="text-gray-600 max-w-md mx-auto">لم نتمكن من العثور على أي دورات تطابق معايير البحث الخاصة بك. جرب تغيير الفلاتر أو البحث عن مصطلح مختلف.</p>
            <motion.button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchTerm('')}
            >
              مسح البحث
            </motion.button>
          </motion.div>
        )}

        {/* نافذة تفاصيل الدورة */}
        <AnimatePresence>
          {showCourseDetails && selectedCourse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">تفاصيل الدورة</h3>
                    <button
                      onClick={() => setShowCourseDetails(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <img src={selectedCourse.image} alt={selectedCourse.title} className="w-full h-48 object-cover rounded-lg" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">{selectedCourse.title}</h4>
                      <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
                      <div className="space-y-2">
                        <p><strong>المدرس:</strong> {selectedCourse.instructor}</p>
                        <p><strong>النوع:</strong> {getTypeLabel(selectedCourse.type)}</p>
                        <p><strong>التاريخ:</strong> {selectedCourse.startDate} - {selectedCourse.endDate}</p>
                        <p><strong>الحالة:</strong> {getStatusLabel(selectedCourse.status)}</p>
                      </div>
                    </div>
                  </div>

                  {/* المحاور */}
                  <div className="mb-6">
                    <h5 className="text-lg font-semibold text-gray-900 mb-4">المحاور ({selectedCourse.modules.length})</h5>
                    <div className="space-y-4">
                      {selectedCourse.modules.map((module, index) => (
                        <div key={module.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h6 className="font-semibold">{module.title}</h6>
                            {module.isLocked && <Lock className="w-4 h-4 text-red-500" />}
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{module.description}</p>

                          {/* الملفات */}
                          <div className="space-y-2">
                            <h6 className="text-sm font-medium text-gray-700">الملفات ({module.files.length})</h6>
                            {module.files.map((file) => (
                              <div key={file.id} className="flex items-center gap-3 bg-white p-2 rounded border">
                                {getFileIcon(file.type)}
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{file.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {(file.size / 1024).toFixed(1)} KB • التحميلات: {file.downloads}
                                  </p>
                                </div>
                                <div className="flex gap-1">
                                  {file.explanationVideo && <Video className="w-4 h-4 text-blue-500" />}
                                  <Download className="w-4 h-4 text-green-500" />
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* الفيديوهات */}
                          {module.videos.length > 0 && (
                            <div className="space-y-2 mt-3">
                              <h6 className="text-sm font-medium text-gray-700">الفيديوهات ({module.videos.length})</h6>
                              {module.videos.map((video) => (
                                <div key={video.id} className="flex items-center gap-3 bg-white p-2 rounded border">
                                  <Play className="w-4 h-4 text-red-500" />
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">{video.title}</p>
                                    <p className="text-xs text-gray-500">
                                      {video.duration} دقيقة • المشاهدات: {video.views}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setShowEditCourseModal(true);
                        }}
                      >
                        تعديل الدورة
                      </motion.button>
                    <motion.button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowFileManager(true)}
                    >
                      إدارة الملفات
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowCourseDetails(false)}
                    >
                      إغلاق
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* نافذة إضافة/تعديل دورة */}
          <AnimatePresence>
            {showAddCourseModal && (
              <AddCourseModal
                onClose={() => setShowAddCourseModal(false)}
                onSave={handleAddCourse}
              />
            )}
            {showEditCourseModal && selectedCourse && (
              <EditCourseModal
                course={selectedCourse}
                onClose={() => {
                  setShowEditCourseModal(false);
                  setSelectedCourse(null);
                }}
                onSave={handleEditCourse}
              />
            )}
          </AnimatePresence>
        </AnimatePresence>
      </div>
    </div>
  );
};

// نموذج إضافة دورة جديدة
function AddCourseModal({ 
  onClose, 
  onSave 
}: { 
  onClose: () => void; 
  onSave: (data: Partial<Course> & { imageFile?: File }) => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    type: 'short' as 'short' | 'long',
    startDate: '',
    endDate: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'عنوان الدورة مطلوب';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'وصف الدورة مطلوب';
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'الوصف يجب أن يكون 50 حرفاً على الأقل';
    }
    
    if (!formData.instructor.trim()) {
      newErrors.instructor = 'اسم المعلم مطلوب';
    }
    
    if (formData.type === 'long' && !formData.endDate) {
      newErrors.endDate = 'تاريخ الانتهاء مطلوب للدورات الطويلة';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setErrors({ ...errors, image: 'حجم الصورة يجب أن يكون أقل من 5MB' });
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, image: 'يجب أن يكون الملف صورة' });
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (errors.image) setErrors({ ...errors, image: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      await onSave({
        ...formData,
        imageFile: imageFile || undefined,
        image: imagePreview || formData.image,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">إضافة دورة جديدة</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الدورة *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (errors.title) setErrors({ ...errors, title: '' });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="مثال: دورة المراجعة الداخلية المستوى الأول"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">وصف الدورة *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: '' });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="وصف شامل للدورة..."
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم المعلم *</label>
              <input
                type="text"
                required
                value={formData.instructor}
                onChange={(e) => {
                  setFormData({ ...formData, instructor: e.target.value });
                  if (errors.instructor) setErrors({ ...errors, instructor: '' });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.instructor ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="مثال: د. أحمد محمد"
              />
              {errors.instructor && <p className="text-red-500 text-sm mt-1">{errors.instructor}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع الدورة *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'short' | 'long' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="short">قصيرة المدى</option>
                <option value="long">طويلة المدى</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ البداية</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الانتهاء {formData.type === 'long' && '*'}</label>
              <input
                type="date"
                required={formData.type === 'long'}
                value={formData.endDate}
                onChange={(e) => {
                  setFormData({ ...formData, endDate: e.target.value });
                  if (errors.endDate) setErrors({ ...errors, endDate: '' });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.endDate ? 'border-red-500' : 'border-gray-300'
                }`}
                min={formData.startDate}
              />
              {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">صورة الدورة</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="course-image-upload"
              />
              <label
                htmlFor="course-image-upload"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-center"
              >
                {imageFile ? 'تغيير الصورة' : 'اختر صورة'}
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
            </div>
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'جاري الإضافة...' : 'إضافة الدورة'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// نموذج تعديل دورة
function EditCourseModal({ 
  course, 
  onClose, 
  onSave 
}: { 
  course: Course; 
  onClose: () => void; 
  onSave: (courseId: string, data: Partial<Course> & { imageFile?: File }) => void;
}) {
  const [formData, setFormData] = useState({
    title: course.title,
    description: course.description,
    instructor: course.instructor,
    type: course.type,
    startDate: course.startDate,
    endDate: course.endDate,
    image: course.image,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(course.image);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'عنوان الدورة مطلوب';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'وصف الدورة مطلوب';
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'الوصف يجب أن يكون 50 حرفاً على الأقل';
    }
    
    if (!formData.instructor.trim()) {
      newErrors.instructor = 'اسم المعلم مطلوب';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: 'حجم الصورة يجب أن يكون أقل من 5MB' });
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, image: 'يجب أن يكون الملف صورة' });
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (errors.image) setErrors({ ...errors, image: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      await onSave(course.id, {
        ...formData,
        imageFile: imageFile || undefined,
        image: imagePreview,
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">تعديل دورة</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الدورة *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (errors.title) setErrors({ ...errors, title: '' });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">وصف الدورة *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: '' });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم المعلم *</label>
              <input
                type="text"
                required
                value={formData.instructor}
                onChange={(e) => {
                  setFormData({ ...formData, instructor: e.target.value });
                  if (errors.instructor) setErrors({ ...errors, instructor: '' });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.instructor ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.instructor && <p className="text-red-500 text-sm mt-1">{errors.instructor}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع الدورة *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'short' | 'long' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="short">قصيرة المدى</option>
                <option value="long">طويلة المدى</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ البداية</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الانتهاء</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={formData.startDate}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">صورة الدورة</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="edit-course-image-upload"
              />
              <label
                htmlFor="edit-course-image-upload"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-center"
              >
                {imageFile ? 'تغيير الصورة' : 'اختر صورة جديدة'}
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
            </div>
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default AdminCoursesPage;
