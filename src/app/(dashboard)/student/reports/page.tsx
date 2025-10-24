/**
 * صفحة التقارير - منصة خطى التعليمية
 * تعرض تقارير مفصلة عن تقدم الطالب وأنشطته التعليمية
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumReportsComponent from '@/components/reports/PremiumReportsComponent';
import ReportHubComponent from '@/components/reports/ReportHubComponent';
import ExecutiveSummaryComponent from '@/components/reports/ExecutiveSummaryComponent';
import PeriodicReporterComponent from '@/components/reports/PeriodicReporterComponent';
import {
  FileText,
  Crown,
  Share,
  FileBarChart,
  Calendar,
  Download,
  FileSpreadsheet,
  Presentation,
  Mail,
  Filter,
  BarChart3,
  TrendingUp,
  Clock,
  Trophy,
  Award,
  CheckCircle,
} from 'lucide-react';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [filters, setFilters] = useState({
    type: 'جميع التقارير',
    period: 'آخر 30 يوم',
    course: 'جميع الدورات',
    instructor: 'جميع المدرسين',
  });
  const [comparisonPeriod, setComparisonPeriod] = useState('آخر أسبوع');

  const tabs = [
    { id: 'general', label: 'التقارير العامة', icon: FileText },
    { id: 'premium', label: 'Premium Reports', icon: Crown },
    { id: 'hub', label: 'Report Hub', icon: Share },
    { id: 'executive', label: 'Executive Summary', icon: FileBarChart },
    { id: 'periodic', label: 'Periodic Reports', icon: Calendar },
  ];

  const handleExport = (format: string) => {
    // Mock export functionality
    alert(`تم تصدير التقرير كـ ${format} بنجاح!`);
  };

  const handleScheduleReport = () => {
    // Mock scheduling functionality
    alert('تم جدولة التقرير للإرسال عبر البريد الإلكتروني!');
  };

  const renderGeneralReports = () => (
    <div className="space-y-6">
      {/* فلاتر التقارير المحسنة */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          فلترة التقارير المتقدمة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              نوع التقرير
            </label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option>جميع التقارير</option>
              <option>تقدم الدورات</option>
              <option>الإنجازات</option>
              <option>النشاط اليومي</option>
              <option>المقارنة بالآخرين</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الفترة الزمنية
            </label>
            <select
              value={filters.period}
              onChange={(e) => setFilters({ ...filters, period: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option>آخر 30 يوم</option>
              <option>آخر أسبوع</option>
              <option>آخر 3 أشهر</option>
              <option>آخر 6 أشهر</option>
              <option>آخر سنة</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الدورة
            </label>
            <select
              value={filters.course}
              onChange={(e) => setFilters({ ...filters, course: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option>جميع الدورات</option>
              <option>المراجعة الداخلية - المستوى الأول</option>
              <option>المراجعة الداخلية - المستوى الثاني</option>
              <option>المراجعة الداخلية - المستوى الثالث</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              المدرس
            </label>
            <select
              value={filters.instructor}
              onChange={(e) => setFilters({ ...filters, instructor: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option>جميع المدرسين</option>
              <option>د. أحمد محمد</option>
              <option>د. فاطمة علي</option>
              <option>د. محمد حسن</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
              تطبيق الفلاتر
            </button>
          </div>
        </div>
      </div>

      {/* إحصائيات عامة محسنة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي الساعات الدراسية</p>
              <p className="text-2xl font-bold text-blue-600">156 ساعة</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% من الشهر الماضي
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">الدورات المكتملة</p>
              <p className="text-2xl font-bold text-green-600">12 دورة</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <CheckCircle className="w-3 h-3 mr-1" />
                2 دورات هذا الشهر
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">معدل التقدم</p>
              <p className="text-2xl font-bold text-purple-600">87%</p>
              <p className="text-xs text-purple-600 flex items-center mt-1">
                <BarChart3 className="w-3 h-3 mr-1" />
                أعلى من المتوسط
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">الترتيب العام</p>
              <p className="text-2xl font-bold text-orange-600">#23</p>
              <p className="text-xs text-orange-600 flex items-center mt-1">
                <Award className="w-3 h-3 mr-1" />
                تحسن من #28
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* مقارنة بين الفترات الزمنية */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            مقارنة الأداء بين الفترات
          </h3>
          <select
            value={comparisonPeriod}
            onChange={(e) => setComparisonPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option>آخر أسبوع</option>
            <option>آخر شهر</option>
            <option>آخر 3 أشهر</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">الفترة الحالية</p>
            <p className="text-2xl font-bold text-blue-600">87%</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">الفترة السابقة</p>
            <p className="text-2xl font-bold text-gray-600">82%</p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">التحسن</p>
            <p className="text-2xl font-bold text-green-600">+5%</p>
          </div>
        </div>
      </div>

      {/* التقارير التفصيلية مع رسوم بيانية تفاعلية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* تقدم الدورات مع رسم بياني تفاعلي */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            تقدم الدورات
          </h3>

          <div className="space-y-4">
            {[
              { name: 'المراجعة الداخلية المستوى الأول', progress: 95, color: 'bg-green-500', lastUpdate: 'منذ يومين' },
              { name: 'المراجعة الداخلية المستوى الثاني', progress: 78, color: 'bg-blue-500', lastUpdate: 'منذ أسبوع' },
              { name: 'المراجعة الداخلية المستوى الثالث', progress: 65, color: 'bg-purple-500', lastUpdate: 'منذ 3 أيام' },
            ].map((course, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    م{index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {course.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      آخر تحديث: {course.lastUpdate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{course.progress}%</div>
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`${course.color} h-2 rounded-full`}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* النشاط اليومي مع رسم بياني تفاعلي */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            النشاط اليومي (آخر 7 أيام)
          </h3>

          <div className="space-y-3">
            {[
              { day: 'اليوم', hours: 4.5, color: 'bg-green-500' },
              { day: 'أمس', hours: 3.2, color: 'bg-blue-500' },
              { day: 'قبل يومين', hours: 5.1, color: 'bg-purple-500' },
              { day: 'قبل 3 أيام', hours: 2.8, color: 'bg-yellow-500' },
              { day: 'قبل 4 أيام', hours: 4.0, color: 'bg-pink-500' },
              { day: 'قبل 5 أيام', hours: 3.5, color: 'bg-indigo-500' },
              { day: 'قبل 6 أيام', hours: 4.2, color: 'bg-red-500' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-gray-600 dark:text-gray-400">{activity.day}</span>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(activity.hours / 6) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`${activity.color} h-2 rounded-full`}
                    ></motion.div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white w-12 text-right">
                    {activity.hours}س
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* الإنجازات والشهادات */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          الإنجازات والشهادات الأخيرة
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🏆', title: 'إكمال 100 ساعة دراسية', date: '15 أكتوبر 2024', color: 'bg-yellow-100 dark:bg-yellow-900/20' },
            { icon: '📜', title: 'شهادة المراجعة الداخلية المستوى الأول', date: '10 أكتوبر 2024', color: 'bg-blue-100 dark:bg-blue-900/20' },
            { icon: '⭐', title: 'أفضل طالب في الدورة', date: '5 أكتوبر 2024', color: 'bg-green-100 dark:bg-green-900/20' },
          ].map((achievement, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center space-x-3 rtl:space-x-reverse p-4 border border-gray-200 dark:border-gray-600 rounded-lg ${achievement.color}`}
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl">
                {achievement.icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {achievement.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  تم {achievement.date.includes('إكمال') ? 'إنجازه' : 'الحصول عليها'} في {achievement.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* أزرار التصدير والجدولة المحسنة */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          تصدير وجدولة التقارير
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleExport('PDF')}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
          >
            <Download className="w-5 h-5 mr-2" />
            تصدير PDF
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleExport('Excel')}
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
          >
            <FileSpreadsheet className="w-5 h-5 mr-2" />
            تصدير Excel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleExport('PowerPoint')}
            className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
          >
            <Presentation className="w-5 h-5 mr-2" />
            تصدير PowerPoint
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScheduleReport}
            className="flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
          >
            <Mail className="w-5 h-5 mr-2" />
            جدولة وإرسال
          </motion.button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          التقارير والإحصائيات
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          متابعة تقدمك التعليمي وتحليل أدائك في الدورات المختلفة
        </p>
      </div>

      {/* تبويبات التقارير */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* محتوى التبويب النشط */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'general' && renderGeneralReports()}
            {activeTab === 'premium' && <PremiumReportsComponent />}
            {activeTab === 'hub' && <ReportHubComponent />}
            {activeTab === 'executive' && <ExecutiveSummaryComponent />}
            {activeTab === 'periodic' && <PeriodicReporterComponent />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}