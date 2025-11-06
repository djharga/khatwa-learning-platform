/**
 * صفحة إدارة البرامج التدريبية - لوحة الإدارة | منصة خطى التعليمية
 * تتيح للمدير إدارة البرامج التدريبية مع تتبع الجداول والمشاركين
 */

'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Pause,
  GraduationCap,
  BookOpen,
  UserCheck,
  TrendingUp,
  Award,
  Target,
  BarChart3,
  MoreVertical,
  Save,
  X,
} from 'lucide-react';

interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  type: 'fellowship' | 'diploma' | 'certificate' | 'workshop';
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  totalHours: number;
  maxParticipants: number;
  enrolledParticipants: number;
  completedParticipants: number;
  instructor: string;
  price: number;
  prerequisites: string[];
  objectives: string[];
  schedule: ProgramSchedule[];
  participants: ProgramParticipant[];
  createdAt: string;
  lastModified: string;
}

interface ProgramSchedule {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'lecture' | 'workshop' | 'exam' | 'project';
  instructor: string;
  location: string;
  isCompleted: boolean;
  attendance: number;
}

interface ProgramParticipant {
  id: string;
  userId: string;
  name: string;
  email: string;
  enrollmentDate: string;
  status: 'active' | 'completed' | 'dropped' | 'failed';
  attendanceRate: number;
  grade?: number;
  certificateIssued: boolean;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  notes?: string;
}

const AdminProgramsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [showProgramDetails, setShowProgramDetails] = useState(false);
  const [showAddProgramModal, setShowAddProgramModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // جلب البيانات من API
  useEffect(() => {
    loadPrograms();
  }, [statusFilter, typeFilter, searchTerm]);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (typeFilter !== 'all') params.append('type', typeFilter);
      if (searchTerm) params.append('search', searchTerm);
      
      const response = await fetch(`/api/admin/programs?${params.toString()}`);
      if (!response.ok) throw new Error('فشل جلب البرامج');
      
      const result = await response.json();
      if (result.success) {
        // تحويل البيانات من API إلى التنسيق المطلوب مع schedule و participants
        const programsWithDetails = result.data.map((program: any) => ({
          ...program,
          schedule: program.schedule || [],
          participants: program.participants || [],
        }));
        setPrograms(programsWithDetails);
      } else {
        throw new Error(result.error || 'فشل جلب البرامج');
      }
    } catch (err: any) {
      console.error('Error loading programs:', err);
      setError(err.message || 'حدث خطأ أثناء جلب البرامج');
      // في حالة الخطأ، استخدم البيانات الافتراضية (fallback)
      const fallbackData: TrainingProgram[] = [];
      setPrograms(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  // وظائف CRUD
  const handleDeleteProgram = async (programId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا البرنامج؟')) return;
    
    try {
      setSaving(true);
      const response = await fetch(`/api/admin/programs/${programId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('فشل حذف البرنامج');
      
      const result = await response.json();
      if (result.success) {
        await loadPrograms(); // إعادة جلب البيانات
        alert('تم حذف البرنامج بنجاح');
      } else {
        throw new Error(result.error || 'فشل حذف البرنامج');
      }
    } catch (err: any) {
      console.error('Error deleting program:', err);
      alert(err.message || 'حدث خطأ أثناء حذف البرنامج');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateProgram = async (programId: string, updates: Partial<TrainingProgram>) => {
    try {
      setSaving(true);
      const response = await fetch(`/api/admin/programs/${programId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) throw new Error('فشل تحديث البرنامج');
      
      const result = await response.json();
      if (result.success) {
        await loadPrograms(); // إعادة جلب البيانات
        alert('تم تحديث البرنامج بنجاح');
        setShowProgramDetails(false);
      } else {
        throw new Error(result.error || 'فشل تحديث البرنامج');
      }
    } catch (err: any) {
      console.error('Error updating program:', err);
      alert(err.message || 'حدث خطأ أثناء تحديث البرنامج');
    } finally {
      setSaving(false);
    }
  };

  const handleCreateProgram = async (programData: Partial<TrainingProgram>) => {
    try {
      setSaving(true);
      const response = await fetch('/api/admin/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(programData),
      });
      
      if (!response.ok) throw new Error('فشل إنشاء البرنامج');
      
      const result = await response.json();
      if (result.success) {
        await loadPrograms(); // إعادة جلب البيانات
        alert('تم إنشاء البرنامج بنجاح');
        setShowAddProgramModal(false);
      } else {
        throw new Error(result.error || 'فشل إنشاء البرنامج');
      }
    } catch (err: any) {
      console.error('Error creating program:', err);
      alert(err.message || 'حدث خطأ أثناء إنشاء البرنامج');
    } finally {
      setSaving(false);
    }
  };

  // بيانات تجريبية احتياطية (fallback data) - سيتم استبدالها بالبيانات من API
  const [programs, setPrograms] = useState<TrainingProgram[]>([
    {
      id: '1',
      title: 'زمالة المراجعين الداخليين',
      description: 'برنامج زمالة شامل للحصول على شهادة معتمدة في المراجعة الداخلية',
      type: 'fellowship',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      totalHours: 120,
      maxParticipants: 50,
      enrolledParticipants: 35,
      completedParticipants: 12,
      instructor: 'د. أحمد محمد',
      price: 15000,
      prerequisites: ['بكالوريوس في المحاسبة', 'خبرة 2 سنة في المجال'],
      objectives: [
        'فهم أساسيات المراجعة الداخلية',
        'تطبيق معايير المراجعة الدولية',
        'إعداد تقارير المراجعة المهنية'
      ],
      schedule: [
        {
          id: 's1',
          title: 'مقدمة في المراجعة الداخلية',
          date: '2024-01-15',
          startTime: '09:00',
          endTime: '17:00',
          type: 'lecture',
          instructor: 'د. أحمد محمد',
          location: 'قاعة المحاضرات الرئيسية',
          isCompleted: true,
          attendance: 35
        },
        {
          id: 's2',
          title: 'ورشة عمل تطبيقية',
          date: '2024-01-22',
          startTime: '09:00',
          endTime: '15:00',
          type: 'workshop',
          instructor: 'د. فاطمة علي',
          location: 'معمل الحاسوب',
          isCompleted: false,
          attendance: 0
        }
      ],
      participants: [
        {
          id: 'p1',
          userId: 'u1',
          name: 'سارة أحمد',
          email: 'sara@example.com',
          enrollmentDate: '2024-01-01',
          status: 'active',
          attendanceRate: 95,
          grade: 92,
          certificateIssued: false,
          paymentStatus: 'paid',
          notes: 'مشاركة ممتازة في المناقشات'
        },
        {
          id: 'p2',
          userId: 'u2',
          name: 'محمد علي',
          email: 'mohamed@example.com',
          enrollmentDate: '2024-01-05',
          status: 'completed',
          attendanceRate: 88,
          grade: 85,
          certificateIssued: true,
          paymentStatus: 'paid',
          notes: 'أنهى جميع المتطلبات بنجاح'
        }
      ],
      createdAt: '2023-12-01',
      lastModified: '2024-01-20'
    },
    {
      id: '2',
      title: 'دبلوم الإدارة المالية',
      description: 'دبلوم متخصص في الإدارة المالية والميزانيات',
      type: 'diploma',
      status: 'planning',
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      totalHours: 80,
      maxParticipants: 30,
      enrolledParticipants: 0,
      completedParticipants: 0,
      instructor: 'د. فاطمة علي',
      price: 8000,
      prerequisites: ['بكالوريوس في الإدارة أو المحاسبة'],
      objectives: [
        'إدارة الميزانيات والتخطيط المالي',
        'تحليل التكاليف والربحية',
        'إعداد التقارير المالية'
      ],
      schedule: [],
      participants: [],
      createdAt: '2024-01-15',
      lastModified: '2024-01-15'
    },
    {
      id: '3',
      title: 'ورشة عمل المخاطر المالية',
      description: 'ورشة عمل تفاعلية حول إدارة المخاطر المالية',
      type: 'workshop',
      status: 'completed',
      startDate: '2024-01-10',
      endDate: '2024-01-10',
      totalHours: 6,
      maxParticipants: 20,
      enrolledParticipants: 18,
      completedParticipants: 18,
      instructor: 'د. محمد حسن',
      price: 500,
      prerequisites: [],
      objectives: [
        'فهم أنواع المخاطر المالية',
        'تقنيات إدارة المخاطر',
        'أدوات التحليل المالي'
      ],
      schedule: [
        {
          id: 's3',
          title: 'ورشة المخاطر المالية',
          date: '2024-01-10',
          startTime: '09:00',
          endTime: '15:00',
          type: 'workshop',
          instructor: 'د. محمد حسن',
          location: 'قاعة التدريب',
          isCompleted: true,
          attendance: 18
        }
      ],
      participants: [
        {
          id: 'p3',
          userId: 'u3',
          name: 'فاطمة سالم',
          email: 'fatima@example.com',
          enrollmentDate: '2024-01-08',
          status: 'completed',
          attendanceRate: 100,
          grade: 95,
          certificateIssued: true,
          paymentStatus: 'paid',
          notes: 'مشاركة فعالة جداً'
        }
      ],
      createdAt: '2024-01-01',
      lastModified: '2024-01-10'
    }
  ]);

  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           program.instructor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || program.status === statusFilter;
      const matchesType = typeFilter === 'all' || program.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [programs, searchTerm, statusFilter, typeFilter]);

  const stats = useMemo(() => {
    const total = programs.length;
    const active = programs.filter(p => p.status === 'active').length;
    const completed = programs.filter(p => p.status === 'completed').length;
    const planning = programs.filter(p => p.status === 'planning').length;
    const totalParticipants = programs.reduce((sum, p) => sum + p.enrolledParticipants, 0);
    const totalRevenue = programs.reduce((sum, p) => sum + (p.enrolledParticipants * p.price), 0);
    const avgCompletion = programs.length > 0 ?
      programs.reduce((sum, p) => sum + (p.completedParticipants / p.enrolledParticipants * 100 || 0), 0) / programs.length : 0;

    return { total, active, completed, planning, totalParticipants, totalRevenue, avgCompletion };
  }, [programs]);

  const getProgramTypeLabel = (type: string) => {
    switch (type) {
      case 'fellowship': return 'زمالة';
      case 'diploma': return 'دبلوم';
      case 'certificate': return 'شهادة';
      case 'workshop': return 'ورشة عمل';
      default: return type;
    }
  };

  const getProgramTypeColor = (type: string) => {
    switch (type) {
      case 'fellowship': return 'bg-purple-100 text-purple-800';
      case 'diploma': return 'bg-blue-100 text-blue-800';
      case 'certificate': return 'bg-green-100 text-green-800';
      case 'workshop': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'planning': return 'تخطيط';
      case 'active': return 'نشط';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScheduleTypeLabel = (type: string) => {
    switch (type) {
      case 'lecture': return 'محاضرة';
      case 'workshop': return 'ورشة عمل';
      case 'exam': return 'امتحان';
      case 'project': return 'مشروع';
      default: return type;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0
    }).format(amount);
  };

    // حالة التحميل
  if (loading && programs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">جاري تحميل البرامج...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-12">                                                              
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رسالة الخطأ */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-2 border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl relative shadow-lg backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

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
            <GraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-300 font-bold">إدارة البرامج التدريبية</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 dark:from-white dark:via-purple-100 dark:to-indigo-100 bg-clip-text text-transparent mb-4"
          >
            نظام إدارة البرامج التدريبية الشامل
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            إدارة شاملة للبرامج التدريبية مع تتبع الجداول الزمنية والمشاركين
          </motion.p>
        </motion.div>

        {/* الإحصائيات */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 mb-8"
        >
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative bg-gradient-to-br from-white to-blue-50/50 dark:from-neutral-800 dark:to-blue-900/10 rounded-3xl shadow-lg hover:shadow-2xl p-6 border border-blue-100/50 dark:border-blue-800/30 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 group-hover:from-blue-500/5 group-hover:to-blue-500/10 transition-all duration-300"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">إجمالي البرامج</p>
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
            </div>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">برامج نشطة</p>
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
                <p className="text-gray-600 text-sm">برامج مكتملة</p>
                <p className="text-3xl font-bold text-blue-600">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">قيد التخطيط</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.planning}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي المشاركين</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalParticipants}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي الإيرادات</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">معدل الإنجاز</p>
                <p className="text-3xl font-bold text-indigo-600">{stats.avgCompletion.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-indigo-600" />
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
              { id: 'all', label: 'جميع البرامج', count: programs.length },
              { id: 'active', label: 'البرامج النشطة', count: stats.active },
              { id: 'completed', label: 'المكتملة', count: stats.completed },
              { id: 'fellowship', label: 'الزمالة', count: programs.filter(p => p.type === 'fellowship').length },
              { id: 'diploma', label: 'الدبلومات', count: programs.filter(p => p.type === 'diploma').length },
              { id: 'workshop', label: 'ورش العمل', count: programs.filter(p => p.type === 'workshop').length }
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
                placeholder="البحث في البرامج..."
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
                <option value="planning">تخطيط</option>
                <option value="active">نشط</option>
                <option value="completed">مكتمل</option>
                <option value="cancelled">ملغي</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              >
                <option value="all">جميع الأنواع</option>
                <option value="fellowship">زمالة</option>
                <option value="diploma">دبلوم</option>
                <option value="certificate">شهادة</option>
                <option value="workshop">ورشة عمل</option>
              </select>
            </div>

            {/* أزرار التحكم */}
            <div className="flex items-center gap-3">
              <motion.button
                className="bg-gradient-to-r from-green-600 via-green-600 to-emerald-600 hover:from-green-700 hover:via-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 border border-green-500/20"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddProgramModal(true)}
              >
                <Plus className="w-5 h-5" />
                برنامج جديد
              </motion.button>

              <motion.button
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 border border-blue-500/20"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <BarChart3 className="w-5 h-5" />
                التقارير
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* جدول البرامج */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">البرنامج</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">النوع</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الحالة</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">التواريخ</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">المشاركون</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">السعر</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPrograms.map((program, index) => (
                  <motion.tr
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                          🎓
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{program.title}</div>
                          <div className="text-sm text-gray-600">{program.instructor}</div>
                          <div className="text-xs text-gray-500 mt-1">{program.totalHours} ساعة</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProgramTypeColor(program.type)}`}>
                        {getProgramTypeLabel(program.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                        {program.status === 'active' ? <CheckCircle className="w-3 h-3" /> :
                         program.status === 'completed' ? <Award className="w-3 h-3" /> :
                         program.status === 'planning' ? <Clock className="w-3 h-3" /> :
                         <XCircle className="w-3 h-3" />}
                        {getStatusLabel(program.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div>{new Date(program.startDate).toLocaleDateString('ar-SA')}</div>
                        <div className="text-gray-600">إلى {new Date(program.endDate).toLocaleDateString('ar-SA')}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-semibold">{program.enrolledParticipants}/{program.maxParticipants}</div>
                        <div className="text-gray-600">مكتمل: {program.completedParticipants}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-green-600">
                        {formatCurrency(program.price)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <motion.button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setSelectedProgram(program);
                            setShowProgramDetails(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Calendar className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                                                <motion.button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"                                                
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteProgram(program.id)}
                          disabled={saving || loading}
                          title="حذف البرنامج"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* رسالة عدم وجود نتائج */}
        {filteredPrograms.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100 mt-8"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد برامج</h3>
            <p className="text-gray-600">لم نتمكن من العثور على أي برامج تدريبية تطابق معايير البحث الخاصة بك</p>
          </motion.div>
        )}

        {/* نافذة تفاصيل البرنامج */}
        <AnimatePresence>
          {showProgramDetails && selectedProgram && (
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
                className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">تفاصيل البرنامج التدريبي</h3>
                    <button
                      onClick={() => setShowProgramDetails(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* معلومات البرنامج الأساسية */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">{selectedProgram.title}</h4>
                      <p className="text-gray-600 mb-4">{selectedProgram.description}</p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">المدرس</div>
                          <div className="text-lg font-semibold text-blue-900">{selectedProgram.instructor}</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">السعر</div>
                          <div className="text-lg font-semibold text-green-900">{formatCurrency(selectedProgram.price)}</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="text-sm text-purple-600 font-medium">إجمالي الساعات</div>
                          <div className="text-lg font-semibold text-purple-900">{selectedProgram.totalHours}</div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <div className="text-sm text-orange-600 font-medium">الحد الأقصى</div>
                          <div className="text-lg font-semibold text-orange-900">{selectedProgram.maxParticipants}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">أهداف البرنامج</h5>
                      <ul className="space-y-2">
                        {selectedProgram.objectives.map((objective, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{objective}</span>
                          </li>
                        ))}
                      </ul>

                      <h5 className="font-semibold text-gray-900 mb-3 mt-6">المتطلبات الأساسية</h5>
                      <ul className="space-y-2">
                        {selectedProgram.prerequisites.map((prereq, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* الجدول الزمني */}
                  <div className="mb-8">
                    <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      الجدول الزمني ({selectedProgram.schedule.length} جلسة)
                    </h5>

                    <div className="space-y-4">
                      {selectedProgram.schedule.map((session, index) => (
                        <div key={session.id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                          <div className="flex items-center justify-between mb-2">
                            <h6 className="font-semibold text-gray-900">{session.title}</h6>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded text-xs ${
                                session.type === 'lecture' ? 'bg-blue-100 text-blue-700' :
                                session.type === 'workshop' ? 'bg-green-100 text-green-700' :
                                session.type === 'exam' ? 'bg-red-100 text-red-700' :
                                'bg-purple-100 text-purple-700'
                              }`}>
                                {getScheduleTypeLabel(session.type)}
                              </span>
                              {session.isCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <strong>التاريخ:</strong> {new Date(session.date).toLocaleDateString('ar-SA')}
                            </div>
                            <div>
                              <strong>الوقت:</strong> {session.startTime} - {session.endTime}
                            </div>
                            <div>
                              <strong>المدرس:</strong> {session.instructor}
                            </div>
                            <div>
                              <strong>الحضور:</strong> {session.attendance}
                            </div>
                          </div>

                          <div className="mt-2">
                            <strong className="text-sm text-gray-600">المكان:</strong> {session.location}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* المشاركون */}
                  <div className="mb-8">
                    <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-600" />
                      المشاركون ({selectedProgram.participants.length})
                    </h5>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-right text-sm font-semibold text-gray-900">الاسم</th>
                            <th className="px-4 py-2 text-right text-sm font-semibold text-gray-900">الحالة</th>
                            <th className="px-4 py-2 text-right text-sm font-semibold text-gray-900">الحضور</th>
                            <th className="px-4 py-2 text-right text-sm font-semibold text-gray-900">الدرجة</th>
                            <th className="px-4 py-2 text-right text-sm font-semibold text-gray-900">الدفع</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {selectedProgram.participants.map((participant) => (
                            <tr key={participant.id} className="hover:bg-gray-50">
                              <td className="px-4 py-2">
                                <div>
                                  <div className="font-medium text-gray-900">{participant.name}</div>
                                  <div className="text-sm text-gray-500">{participant.email}</div>
                                </div>
                              </td>
                              <td className="px-4 py-2">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  participant.status === 'completed' ? 'bg-green-100 text-green-700' :
                                  participant.status === 'active' ? 'bg-blue-100 text-blue-700' :
                                  participant.status === 'failed' ? 'bg-red-100 text-red-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {participant.status === 'completed' ? 'مكتمل' :
                                   participant.status === 'active' ? 'نشط' :
                                   participant.status === 'failed' ? 'رسب' : 'متروك'}
                                </span>
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-600">
                                {participant.attendanceRate}%
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-600">
                                {participant.grade ? `${participant.grade}%` : '-'}
                              </td>
                              <td className="px-4 py-2">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  participant.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                                  participant.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {participant.paymentStatus === 'paid' ? 'مدفوع' :
                                   participant.paymentStatus === 'pending' ? 'معلق' : 'متأخر'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      تعديل البرنامج
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      إدارة المشاركين
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      تقرير مفصل
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowProgramDetails(false)}
                    >
                      إغلاق
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminProgramsPage;
