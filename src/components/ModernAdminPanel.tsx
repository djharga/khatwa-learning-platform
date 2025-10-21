'use client';

import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Sun,
  Moon,
  History,
  TrendingUp,
  ChevronDown,
  MoreHorizontal,
  Star,
  Settings,
  User,
  LogOut,
  Shield,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Eye,
  Download,
  Filter,
  RefreshCw,
} from 'lucide-react';
import OverviewIcon from './ui/icons/OverviewIcon';
import ShoppingBagIcon from './ui/icons/ShoppingBagIcon';
import FolderIcon from './ui/icons/FolderIcon';
import IDBadgeIcon from './ui/icons/IDBadgeIcon';
import IDCardIcon from './ui/icons/IDCardIcon';
import UsersThreeIcon from './ui/icons/UsersThreeIcon';
import NotebookIcon from './ui/icons/NotebookIcon';
import ChatTeardropIcon from './ui/icons/ChatTeardropIcon';
import LineGraphIcon from './ui/icons/LineGraphIcon';
import DeviceTrafficIcon from './ui/icons/DeviceTrafficIcon';
import LocationTrafficIcon from './ui/icons/LocationTrafficIcon';
import Image from 'next/image'; // تحديث مسار استيراد الصورة

interface Course {
  id: string;
  instructor: string;
  avatar: string;
  date: string;
  students: string;
  status: 'نشط' | 'مكتمل' | 'قيد المراجعة' | 'معتمد' | 'مرفوض';
}

// نقل تعريف المصفوفة خارج المكون
const initialCourses: Course[] = [
  {
    id: '1',
    instructor: 'د. أحمد محمد',
    avatar: '/avatars/ahmed-mohamed.png',
    date: '15 أكتوبر 2025',
    students: '125',
    status: 'نشط',
  },
  {
    id: '2',
    instructor: 'د. فاطمة علي',
    avatar: '/avatars/fatma-ali.png',
    date: '12 أكتوبر 2025',
    students: '89',
    status: 'مكتمل',
  },
  {
    id: '3',
    instructor: 'د. محمد حسن',
    avatar: '/avatars/mohamed-hassan.png',
    date: '10 أكتوبر 2025',
    students: '67',
    status: 'قيد المراجعة',
  },
  {
    id: '4',
    instructor: 'د. سارة أحمد',
    avatar: '/avatars/sara-ahmed.png',
    date: '8 أكتوبر 2025',
    students: '98',
    status: 'معتمد',
  },
  {
    id: '5',
    instructor: 'د. علي محمود',
    avatar: '/avatars/ali-mahmoud.png',
    date: '5 أكتوبر 2025',
    students: '45',
    status: 'مرفوض',
  },
];

const ModernAdminPanel = memo(() => {
  const [activeTab, setActiveTab] = useState<
    'المستخدمين' | 'الدورات' | 'حالة النظام'
  >('المستخدمين');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  const filteredCourses = useMemo(() => {
    if (!searchQuery) return courses;
    return courses.filter(
      (course) =>
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, courses]);

  // Dark mode effect only
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const sidebarItems = [
    { id: 'overview', label: 'نظرة عامة', icon: OverviewIcon },
    { id: 'courses', label: 'الدورات', icon: ShoppingBagIcon },
    { id: 'projects', label: 'المشاريع', icon: FolderIcon },
    { id: 'students', label: 'الطلاب', icon: IDBadgeIcon },
    { id: 'instructors', label: 'المدربين', icon: IDCardIcon },
    { id: 'corporate', label: 'الشركات', icon: UsersThreeIcon },
    { id: 'blog', label: 'المدونة', icon: NotebookIcon },
    { id: 'support', label: 'الدعم', icon: ChatTeardropIcon },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط':
        return 'text-purple-600';
      case 'مكتمل':
        return 'text-green-600';
      case 'قيد المراجعة':
        return 'text-blue-600';
      case 'معتمد':
        return 'text-yellow-600';
      case 'مرفوض':
        return 'text-gray-400';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar مبسطة */}
      <aside className="w-64 bg-white border-r border-neutral-200 p-4">
        <div className="mb-8">
          <Image
            src="/logo-khatwa.svg"
            alt="Khatwa Logo"
            width={119}
            height={32}
          />
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
              >
                <Icon width={20} height={20} />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="mt-auto p-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
            <Image
              src="/avatars/byewind.png"
              alt="المدير الإداري"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm font-medium">المدير الإداري</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header مبسط */}
        <header className="bg-white border-b border-neutral-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="3"
                    width="7"
                    height="7"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="3"
                    y="14"
                    width="7"
                    height="7"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="14"
                    y="3"
                    width="7"
                    height="7"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="14"
                    y="14"
                    width="7"
                    height="7"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <div>
                <span className="text-gray-500">لوحة التحكم</span>
                <span className="mx-2 text-gray-300">/</span>
                <span className="font-medium">نظرة عامة</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="البحث في المنصة"
                  className="bg-transparent border-none outline-none"
                />
              </div>

              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={handleRefresh}
                className={`p-2 hover:bg-gray-100 rounded-lg ${isLoading ? 'animate-spin' : ''}`}
              >
                <RefreshCw className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 rounded-lg relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* إحصائيات مبسطة */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'المشاهدات',
                  value: '12,361',
                  icon: <Eye className="w-5 h-5" />,
                  color: 'bg-blue-500',
                },
                {
                  title: 'الزيارات',
                  value: '3,671',
                  icon: <Activity className="w-5 h-5" />,
                  color: 'bg-gray-800',
                },
                {
                  title: 'المستخدمين الجدد',
                  value: '256',
                  icon: <Users className="w-5 h-5" />,
                  color: 'bg-blue-500',
                },
                {
                  title: 'المستخدمين النشطين',
                  value: '1,234',
                  icon: <Users className="w-5 h-5" />,
                  color: 'bg-gray-800',
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl text-white ${stat.color}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg">{stat.title}</p>
                      <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* جدول الدورات */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">الدورات</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 text-right">المدرب</th>
                      <th className="py-3 px-4 text-right">تاريخ البدء</th>
                      <th className="py-3 px-4 text-right">عدد الطلاب</th>
                      <th className="py-3 px-4 text-right">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map((course) => (
                      <tr key={course.id} className="border-b">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <Image
                            src={course.avatar}
                            alt={course.instructor}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <span>{course.instructor}</span>
                        </td>
                        <td className="py-3 px-4">{course.date}</td>
                        <td className="py-3 px-4">{course.students}</td>
                        <td className="py-3 px-4">
                          <span className={`${getStatusColor(course.status)}`}>
                            {course.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});

ModernAdminPanel.displayName = 'ModernAdminPanel';

export default ModernAdminPanel;
