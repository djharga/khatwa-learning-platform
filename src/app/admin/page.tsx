'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Users,
  BookOpen,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Search,
  Download,
  Upload,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  AlertCircle,
  Info,
} from 'lucide-react';

interface Program {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  duration: string;
  enrolledStudents: number;
  maxStudents: number;
  status: 'active' | 'completed' | 'upcoming' | 'cancelled';
  instructor: string;
  price: number;
  description: string;
}

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('programs');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // بيانات تجريبية للبرامج التدريبية
  const programs: Program[] = useMemo(
    () => [
      {
        id: '1',
        title: 'دورة التحليل المالى واعداد الميزانيات',
        category: 'المراجعة والإدارة المالية والتشغيل',
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        duration: '8 أسابيع',
        enrolledStudents: 45,
        maxStudents: 50,
        status: 'active',
        instructor: 'د. أحمد السيد',
        price: 599,
        description: 'دورة شاملة في التحليل المالي وإعداد الميزانيات للمؤسسات المختلفة'
      },
      {
        id: '2',
        title: 'كورس ادارة تشغيل المطاعم',
        category: 'إدارة العمليات',
        startDate: '2024-02-01',
        endDate: '2024-03-30',
        duration: '6 أسابيع',
        enrolledStudents: 28,
        maxStudents: 30,
        status: 'active',
        instructor: 'د. فاطمة محمد',
        price: 449,
        description: 'دورة متخصصة في إدارة العمليات التشغيلية للمطاعم والمقاهي'
      },
      {
        id: '3',
        title: 'كورس التسويات البنكية',
        category: 'التسويات المصرفية',
        startDate: '2024-03-01',
        endDate: '2024-04-01',
        duration: '4 أسابيع',
        enrolledStudents: 0,
        maxStudents: 25,
        status: 'upcoming',
        instructor: 'د. محمد علي',
        price: 349,
        description: 'دورة عملية في التسويات البنكية ومطابقة الحسابات'
      },
      {
        id: '4',
        title: 'زمالة المراجعين الداخليين - الجزء الأول',
        category: 'المراجعة الداخلية',
        startDate: '2023-12-01',
        endDate: '2024-02-01',
        duration: '8 أسابيع',
        enrolledStudents: 35,
        maxStudents: 40,
        status: 'completed',
        instructor: 'د. سارة أحمد',
        price: 799,
        description: 'الجزء الأول من برنامج زمالة المراجعين الداخليين'
      },
      {
        id: '5',
        title: 'برنامج الإدارة المالية الاستراتيجية',
        category: 'الإدارة المالية',
        startDate: '2024-04-01',
        endDate: '2024-06-01',
        duration: '8 أسابيع',
        enrolledStudents: 0,
        maxStudents: 20,
        status: 'upcoming',
        instructor: 'د. خالد عبدالله',
        price: 899,
        description: 'برنامج شامل في الإدارة المالية الاستراتيجية'
      }
    ],
    []
  );

  // فلترة البرامج حسب البحث والحالة
  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           program.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           program.instructor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || program.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [programs, searchTerm, statusFilter]);

  // إحصائيات البرامج
  const stats = useMemo(() => {
    const total = programs.length;
    const active = programs.filter(p => p.status === 'active').length;
    const completed = programs.filter(p => p.status === 'completed').length;
    const upcoming = programs.filter(p => p.status === 'upcoming').length;
    const totalStudents = programs.reduce((sum, p) => sum + p.enrolledStudents, 0);
    const totalRevenue = programs.reduce((sum, p) => sum + (p.price * p.enrolledStudents), 0);

    return { total, active, completed, upcoming, totalStudents, totalRevenue };
  }, [programs]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'upcoming': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              لوحة إدارة البرامج التدريبية
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            إدارة شاملة للبرامج التدريبية مع تتبع الجداول الزمنية والمشاركين
          </p>
        </motion.div>

        {/* الإحصائيات العامة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي البرامج</p>
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
                <p className="text-gray-600 text-sm">البرامج النشطة</p>
                <p className="text-3xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي المشاركين</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalStudents}</p>
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
                <p className="text-3xl font-bold text-orange-600">{stats.totalRevenue.toLocaleString()} ريال</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* شريط التحكم */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* شريط البحث */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="ابحث في البرامج..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* فلتر الحالة */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="upcoming">قادم</option>
                <option value="completed">مكتمل</option>
                <option value="cancelled">ملغي</option>
              </select>
            </div>

            {/* أزرار التحكم */}
            <div className="flex items-center gap-3">
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(true)}
              >
                <Plus className="w-5 h-5" />
                إضافة برنامج جديد
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* جدول البرامج */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">اسم البرنامج</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">المجال</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">تاريخ البداية</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">تاريخ النهاية</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">المدة</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">المشاركين</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الحالة</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPrograms.map((program, index) => (
                  <motion.tr
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">{program.title}</div>
                        <div className="text-sm text-gray-600">{program.instructor}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{program.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(program.startDate)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(program.endDate)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{program.duration}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <span className="font-semibold text-gray-900">{program.enrolledStudents}</span>
                        <span className="text-gray-600"> / {program.maxStudents}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(program.enrolledStudents / program.maxStudents) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(program.status)}`}>
                        {getStatusIcon(program.status)}
                        {program.status === 'active' ? 'نشط' :
                         program.status === 'completed' ? 'مكتمل' :
                         program.status === 'upcoming' ? 'قادم' : 'ملغي'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <motion.button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد برامج متاحة</h3>
            <p className="text-gray-600">لم نتمكن من العثور على أي برامج تطابق معايير البحث الخاصة بك</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
