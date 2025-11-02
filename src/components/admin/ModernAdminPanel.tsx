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
  Navigation,
} from 'lucide-react';
import NavigationStatus from './NavigationStatus';
import Image from 'next/image';
import Link from 'next/link';
import OverviewIcon from '@/components/ui/icons/OverviewIcon';
import ShoppingBagIcon from '@/components/ui/icons/ShoppingBagIcon';
import FolderIcon from '@/components/ui/icons/FolderIcon';
import IDBadgeIcon from '@/components/ui/icons/IDBadgeIcon';
import IDCardIcon from '@/components/ui/icons/IDCardIcon';
import UsersThreeIcon from '@/components/ui/icons/UsersThreeIcon';
import NotebookIcon from '@/components/ui/icons/NotebookIcon';
import ChatTeardropIcon from '@/components/ui/icons/ChatTeardropIcon';
import LineGraphIcon from '@/components/ui/icons/LineGraphIcon';
import DeviceTrafficIcon from '@/components/ui/icons/DeviceTrafficIcon';
import LocationTrafficIcon from '@/components/ui/icons/LocationTrafficIcon';

type Stat = { title: string; value: string; change: string; trend: 'up' | 'down' };

/**
 * Admin statistics card displaying metric value with trend indicator and change percentage.
 */
const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <h3 className="text-sm text-gray-500 mb-2">{stat.title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">{stat.value}</span>
        <span
          className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
        >
          {stat.change}
        </span>
      </div>
    </motion.div>
  );
};

/**
 * Management section card with title and quick access links. Supports highlighted primary actions.
 */
const ManagementSection = ({ title, links, delay }: { title: string; links: Array<{ href: string; label: string; highlight?: boolean }>; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-3">
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className={`block p-3 rounded-lg transition-colors ${link.highlight ? 'bg-blue-50 hover:bg-blue-100' : 'bg-gray-50 hover:bg-gray-100'}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

/**
 * Modern admin dashboard panel displaying platform statistics, quick access to management sections, recent activities, and navigation system status. Features animated stat cards and navigation status checker integration.
 */
const ModernAdminPanel = () => {
  const [showNavigationStatus, setShowNavigationStatus] = useState(false);

  // Platform statistics with trend indicators
  const stats: Stat[] = [
    { title: 'إجمالي الطلاب', value: '2,547', change: '+15%', trend: 'up' },
    { title: 'الدورات النشطة', value: '45', change: '+5', trend: 'up' },
    { title: 'معدل إكمال الدورات', value: '78%', change: '+3%', trend: 'up' },
    { title: 'متوسط التقييمات', value: '4.8', change: '+0.2', trend: 'up' },
  ];

  // Recent user activities for quick monitoring
  const recentActivities = [
    { type: 'تسجيل جديد', user: 'أحمد محمد', time: 'قبل 5 دقائق' },
    { type: 'إكمال دورة', user: 'سارة أحمد', time: 'قبل 15 دقيقة' },
    { type: 'تقييم جديد', user: 'خالد عمر', time: 'قبل ساعة' },
  ];

  return (
    <div className="space-y-6">
      {/* الإحصائيات */}
      {/* Animated statistics cards with trend indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} index={index} />
        ))}
      </div>

      {/* الأقسام الرئيسية */}
      {/* Quick access cards for course, user, and report management */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* إدارة الدورات */}
        <ManagementSection
          title="إدارة الدورات"
          links={[
            { href: "/admin/courses/new", label: "إضافة دورة جديدة", highlight: true },
            { href: "/admin/courses", label: "عرض كل الدورات" }
          ]}
          delay={0}
        />

        {/* إدارة المستخدمين */}
        <ManagementSection
          title="إدارة المستخدمين"
          links={[
            { href: "/admin/users", label: "عرض المستخدمين" },
            { href: "/admin/roles", label: "إدارة الصلاحيات" }
          ]}
          delay={0.1}
        />

        {/* التقارير والتحليلات */}
        <ManagementSection
          title="التقارير والتحليلات"
          links={[
            { href: "/admin/reports/performance", label: "تقارير الأداء" },
            { href: "/admin/reports/revenue", label: "التقارير المالية" }
          ]}
          delay={0.2}
        />

        {/* إدارة نظام الملاحة */}
        {/* Navigation system health check and management tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-blue-600" />
            إدارة نظام الملاحة
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => setShowNavigationStatus(true)}
              className="block w-full text-right p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-blue-900">فحص حالة الروابط</div>
                  <div className="text-sm text-blue-700">التحقق من صحة جميع الروابط والصفحات</div>
                </div>
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
            </button>

            <Link
              href="/admin/navigation/edit"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">تعديل الروابط</div>
                  <div className="text-sm text-gray-600">إضافة أو تعديل الروابط والأقسام</div>
                </div>
                <Settings className="w-5 h-5 text-gray-600" />
              </div>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* النشاطات الأخيرة */}
      {/* Recent platform activities display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-sm"
      >
        <h2 className="text-lg font-semibold mb-4">النشاطات الأخيرة</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <span className="text-sm text-gray-500">{activity.type}</span>
                <p className="font-medium">{activity.user}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* أداة مراقبة حالة الملاحة */}
      <NavigationStatus
        isOpen={showNavigationStatus}
        onClose={() => setShowNavigationStatus(false)}
      />
    </div>
  );
};

export default ModernAdminPanel;