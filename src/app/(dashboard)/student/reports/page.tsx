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
  PieChart,
  Activity,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import StyledButton from '@/components/ui/StyledButton';
import { ModernTabs, ModernTabContent } from '@/components/ui/ModernTabs';

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
    alert(`تم تصدير التقرير كـ ${format} بنجاح!`);
  };

  const handleScheduleReport = () => {
    alert('تم جدولة التقرير للإرسال عبر البريد الإلكتروني!');
  };

  const renderGeneralReports = () => (
    <div className="space-y-6">
      {/* Advanced Filters */}
      <Card className="shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 text-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                <Filter className="w-5 h-5" />
              </div>
              فلترة التقارير المتقدمة
            </CardTitle>
          </CardHeader>
        </div>
        <CardContent className="p-5 bg-white dark:bg-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                نوع التقرير
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option>جميع التقارير</option>
                <option>تقدم الدورات</option>
                <option>الإنجازات</option>
                <option>النشاط اليومي</option>
                <option>المقارنة بالآخرين</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                الفترة الزمنية
              </label>
              <select
                value={filters.period}
                onChange={(e) => setFilters({ ...filters, period: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option>آخر 30 يوم</option>
                <option>آخر أسبوع</option>
                <option>آخر 3 أشهر</option>
                <option>آخر 6 أشهر</option>
                <option>آخر سنة</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                الدورة
              </label>
              <select
                value={filters.course}
                onChange={(e) => setFilters({ ...filters, course: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option>جميع الدورات</option>
                <option>المراجعة الداخلية - المستوى الأول</option>
                <option>المراجعة الداخلية - المستوى الثاني</option>
                <option>المراجعة الداخلية - المستوى الثالث</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                المدرس
              </label>
              <select
                value={filters.instructor}
                onChange={(e) => setFilters({ ...filters, instructor: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option>جميع المدرسين</option>
                <option>د. أحمد محمد</option>
                <option>د. فاطمة علي</option>
                <option>د. محمد حسن</option>
              </select>
            </div>
            <div className="flex items-end">
              <StyledButton variant="primary" className="w-full text-sm">
                تطبيق الفلاتر
              </StyledButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative hover:shadow-lg transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-700 dark:via-blue-600 dark:to-indigo-700"></div>
            <CardContent className="p-5 relative z-10 text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-blue-100 dark:text-blue-200 text-xs font-medium mb-1">
                    إجمالي الساعات الدراسية
                  </p>
                  <p className="text-3xl font-bold">156</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="p-2.5 bg-white/20 backdrop-blur-md rounded-lg"
                >
                  <Clock className="w-6 h-6" />
                </motion.div>
              </div>
              <div className="flex items-center gap-2 text-blue-100 dark:text-blue-200">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">+12% من الشهر الماضي</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative hover:shadow-lg transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 dark:from-emerald-600 dark:via-green-700 dark:to-teal-700"></div>
            <CardContent className="p-5 relative z-10 text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-emerald-100 dark:text-emerald-200 text-xs font-medium mb-1">
                    الدورات المكتملة
                  </p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-2.5 bg-white/20 backdrop-blur-md rounded-lg"
                >
                  <Trophy className="w-6 h-6" />
                </motion.div>
              </div>
              <div className="flex items-center gap-2 text-emerald-100 dark:text-emerald-200">
                <CheckCircle className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">2 دورات هذا الشهر</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative hover:shadow-lg transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-600 to-fuchsia-600 dark:from-purple-600 dark:via-pink-700 dark:to-fuchsia-700"></div>
            <CardContent className="p-5 relative z-10 text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-purple-100 dark:text-purple-200 text-xs font-medium mb-1">
                    معدل التقدم
                  </p>
                  <p className="text-3xl font-bold">87%</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="p-2.5 bg-white/20 backdrop-blur-md rounded-lg"
                >
                  <TrendingUp className="w-6 h-6" />
                </motion.div>
              </div>
              <div className="flex items-center gap-2 text-purple-100 dark:text-purple-200">
                <BarChart3 className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">أعلى من المتوسط</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative hover:shadow-lg transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-600 to-yellow-600 dark:from-amber-600 dark:via-orange-700 dark:to-yellow-700"></div>
            <CardContent className="p-5 relative z-10 text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-amber-100 dark:text-amber-200 text-xs font-medium mb-1">
                    الترتيب العام
                  </p>
                  <p className="text-3xl font-bold">#23</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="p-2.5 bg-white/20 backdrop-blur-md rounded-lg"
                >
                  <Award className="w-6 h-6" />
                </motion.div>
              </div>
              <div className="flex items-center gap-2 text-amber-100 dark:text-amber-200">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">تحسن من #28</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Export Buttons */}
      <Card className="shadow-lg border border-neutral-200 dark:border-neutral-700">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <Download className="w-5 h-5 text-white" />
            </div>
            تصدير وجدولة التقارير
          </CardTitle>
          <CardDescription className="text-sm text-neutral-600 dark:text-neutral-400">
            تصدير تقاريرك بصيغ مختلفة
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 bg-white dark:bg-neutral-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleExport('PDF')}
              className="group relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-700 dark:via-indigo-700 dark:to-blue-800 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg" />
              <FileText className="w-8 h-8 mb-2 relative z-10 group-hover:scale-110 transition-transform" />
              <span className="relative z-10 text-sm">PDF</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleExport('Excel')}
              className="group relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 dark:from-emerald-700 dark:via-green-700 dark:to-emerald-800 hover:from-emerald-700 hover:via-green-700 hover:to-emerald-800 text-white px-4 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg" />
              <FileSpreadsheet className="w-8 h-8 mb-2 relative z-10 group-hover:scale-110 transition-transform" />
              <span className="relative z-10 text-sm">Excel</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleExport('PowerPoint')}
              className="group relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 dark:from-purple-700 dark:via-pink-700 dark:to-purple-800 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 text-white px-4 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg" />
              <Presentation className="w-8 h-8 mb-2 relative z-10 group-hover:scale-110 transition-transform" />
              <span className="relative z-10 text-sm">PPT</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleScheduleReport}
              className="group relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 dark:from-amber-700 dark:via-orange-700 dark:to-amber-800 hover:from-amber-700 hover:via-orange-700 hover:to-amber-800 text-white px-4 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg" />
              <Mail className="w-8 h-8 mb-2 relative z-10 group-hover:scale-110 transition-transform" />
              <span className="relative z-10 text-sm">جدولة</span>
            </motion.button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 text-white p-6 lg:p-10 shadow-xl"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="p-3 bg-white/20 backdrop-blur-md rounded-xl"
                >
                  <FileBarChart className="w-10 h-10" />
                </motion.div>
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                    التقارير والإحصائيات
                  </h1>
                  <p className="text-base md:text-lg text-indigo-100 dark:text-indigo-200">
                    متابعة تقدمك التعليمي وتحليل أدائك
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Modern Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <ModernTabs
              tabs={tabs.map((tab) => ({
                id: tab.id,
                label: tab.label,
                icon: tab.icon,
              }))}
              activeTab={activeTab}
              onChange={setActiveTab}
              variant="default"
              size="lg"
              fullWidth={false}
            />

            {/* Tab Content */}
            <div className="mt-6">
              <ModernTabContent value="general" activeValue={activeTab}>
                {renderGeneralReports()}
              </ModernTabContent>
              <ModernTabContent value="premium" activeValue={activeTab}>
                <PremiumReportsComponent />
              </ModernTabContent>
              <ModernTabContent value="hub" activeValue={activeTab}>
                <ReportHubComponent />
              </ModernTabContent>
              <ModernTabContent value="executive" activeValue={activeTab}>
                <ExecutiveSummaryComponent />
              </ModernTabContent>
              <ModernTabContent value="periodic" activeValue={activeTab}>
                <PeriodicReporterComponent />
              </ModernTabContent>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
