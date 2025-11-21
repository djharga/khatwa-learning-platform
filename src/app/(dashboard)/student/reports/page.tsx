'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { CardSkeleton } from '@/components/ui/Skeleton';

// Lazy load heavy report components
const PremiumReportsComponent = dynamic(() => import('@/components/reports/PremiumReportsComponent'), {
  ssr: false,
  loading: () => <CardSkeleton className="h-96" />,
});

const ReportHubComponent = dynamic(() => import('@/components/reports/ReportHubComponent'), {
  ssr: false,
  loading: () => <CardSkeleton className="h-96" />,
});

const ExecutiveSummaryComponent = dynamic(() => import('@/components/reports/ExecutiveSummaryComponent'), {
  ssr: false,
  loading: () => <CardSkeleton className="h-96" />,
});

const PeriodicReporterComponent = dynamic(() => import('@/components/reports/PeriodicReporterComponent'), {
  ssr: false,
  loading: () => <CardSkeleton className="h-96" />,
});
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
    <div className="space-y-4 sm:space-y-6">
      {/* Advanced Filters */}
      <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
              <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </div>
              فلترة التقارير المتقدمة
            </CardTitle>
          </CardHeader>
        </div>
        <CardContent className="p-4 sm:p-5 lg:p-6 bg-white dark:bg-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2" htmlFor="report-type">
                نوع التقرير
              </label>
              <select
                id="report-type"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-3 py-2 min-h-[44px] text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ease-out"
                aria-label="نوع التقرير"
              >
                <option>جميع التقارير</option>
                <option>تقدم الدورات</option>
                <option>الإنجازات</option>
                <option>النشاط اليومي</option>
                <option>المقارنة بالآخرين</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2" htmlFor="report-period">
                الفترة الزمنية
              </label>
              <select
                id="report-period"
                value={filters.period}
                onChange={(e) => setFilters({ ...filters, period: e.target.value })}
                className="w-full px-3 py-2 min-h-[44px] text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ease-out"
                aria-label="الفترة الزمنية"
              >
                <option>آخر 30 يوم</option>
                <option>آخر أسبوع</option>
                <option>آخر 3 أشهر</option>
                <option>آخر 6 أشهر</option>
                <option>آخر سنة</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2" htmlFor="report-course">
                الدورة
              </label>
              <select
                id="report-course"
                value={filters.course}
                onChange={(e) => setFilters({ ...filters, course: e.target.value })}
                className="w-full px-3 py-2 min-h-[44px] text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ease-out"
                aria-label="الدورة"
              >
                <option>جميع الدورات</option>
                <option>المراجعة الداخلية - المستوى الأول</option>
                <option>المراجعة الداخلية - المستوى الثاني</option>
                <option>المراجعة الداخلية - المستوى الثالث</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2" htmlFor="report-instructor">
                المدرس
              </label>
              <select
                id="report-instructor"
                value={filters.instructor}
                onChange={(e) => setFilters({ ...filters, instructor: e.target.value })}
                className="w-full px-3 py-2 min-h-[44px] text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ease-out"
                aria-label="المدرس"
              >
                <option>جميع المدرسين</option>
                <option>د. أحمد محمد</option>
                <option>د. فاطمة علي</option>
                <option>د. محمد حسن</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {}}
                className="w-full px-4 py-2.5 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium text-sm shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                aria-label="تطبيق الفلاتر"
                type="button"
              >
                تطبيق الفلاتر
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        <motion.div
          whileHover={{ y: -2, scale: 1.01 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
        >
          <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative hover:shadow-lg transition-all duration-200 ease-out">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-600"></div>
            <CardContent className="p-4 sm:p-5 relative z-10 text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-blue-100 text-xs font-medium mb-1">
                    إجمالي الساعات الدراسية
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold">156</p>
                </div>
                <div className="p-2 sm:p-2.5 bg-white/20 backdrop-blur-md rounded-lg">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-xs font-semibold">+12% من الشهر الماضي</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ y: -2, scale: 1.01 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
        >
          <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative hover:shadow-lg transition-all duration-200 ease-out">
            <div className="absolute inset-0 bg-gradient-to-br from-success-600 via-success-700 to-success-600"></div>
            <CardContent className="p-4 sm:p-5 relative z-10 text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-green-100 text-xs font-medium mb-1">
                    الدورات المكتملة
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold">12</p>
                </div>
                <div className="p-2 sm:p-2.5 bg-white/20 backdrop-blur-md rounded-lg">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-green-100">
                <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-xs font-semibold">2 دورات هذا الشهر</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ y: -2, scale: 1.01 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.2, ease: 'easeOut' }}
        >
          <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative hover:shadow-lg transition-all duration-200 ease-out">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-innovate-600 via-secondary-innovate-700 to-secondary-innovate-600"></div>
            <CardContent className="p-4 sm:p-5 relative z-10 text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-purple-100 text-xs font-medium mb-1">
                    معدل التقدم
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold">87%</p>
                </div>
                <div className="p-2 sm:p-2.5 bg-white/20 backdrop-blur-md rounded-lg">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-purple-100">
                <BarChart3 className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-xs font-semibold">أعلى من المتوسط</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ y: -2, scale: 1.01 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.2, ease: 'easeOut' }}
        >
          <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative hover:shadow-lg transition-all duration-200 ease-out">
            <div className="absolute inset-0 bg-gradient-to-br from-warning-600 via-warning-700 to-warning-600"></div>
            <CardContent className="p-4 sm:p-5 relative z-10 text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-yellow-100 text-xs font-medium mb-1">
                    الترتيب العام
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold">#23</p>
                </div>
                <div className="p-2 sm:p-2.5 bg-white/20 backdrop-blur-md rounded-lg">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-yellow-100">
                <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-xs font-semibold">تحسن من #28</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Export Buttons */}
      <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg text-neutral-900 dark:text-white">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-white" aria-hidden="true" />
            </div>
            تصدير وجدولة التقارير
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            تصدير تقاريرك بصيغ مختلفة
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-5 lg:p-6 bg-white dark:bg-neutral-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleExport('PDF')}
              className="group relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-3 sm:px-4 py-3 sm:py-4 min-h-[100px] rounded-lg font-medium shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              aria-label="تصدير كـ PDF"
              type="button"
            >
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 mb-2" aria-hidden="true" />
              <span className="text-xs sm:text-sm">PDF</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleExport('Excel')}
              className="group relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-success-600 to-success-700 hover:from-success-700 hover:to-success-800 text-white px-3 sm:px-4 py-3 sm:py-4 min-h-[100px] rounded-lg font-medium shadow-md shadow-success-500/20 hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              aria-label="تصدير كـ Excel"
              type="button"
            >
              <FileSpreadsheet className="w-6 h-6 sm:w-8 sm:h-8 mb-2" aria-hidden="true" />
              <span className="text-xs sm:text-sm">Excel</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleExport('PowerPoint')}
              className="group relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-secondary-innovate-600 to-secondary-innovate-700 hover:from-secondary-innovate-700 hover:to-secondary-innovate-800 text-white px-3 sm:px-4 py-3 sm:py-4 min-h-[100px] rounded-lg font-medium shadow-md shadow-secondary-innovate-500/20 hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              aria-label="تصدير كـ PowerPoint"
              type="button"
            >
              <Presentation className="w-6 h-6 sm:w-8 sm:h-8 mb-2" aria-hidden="true" />
              <span className="text-xs sm:text-sm">PPT</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleScheduleReport}
              className="group relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-warning-600 to-warning-700 hover:from-warning-700 hover:to-warning-800 text-white px-3 sm:px-4 py-3 sm:py-4 min-h-[100px] rounded-lg font-medium shadow-md shadow-warning-500/20 hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              aria-label="جدولة التقرير"
              type="button"
            >
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 mb-2" aria-hidden="true" />
              <span className="text-xs sm:text-sm">جدولة</span>
            </motion.button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="max-w-7xl mx-auto"
        >
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-6 sm:mb-8 relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white p-6 sm:p-8 lg:p-10 shadow-lg"
          >
            <div className="absolute top-0 end-0 w-80 h-80 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-xl">
                  <FileBarChart className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
                    التقارير والإحصائيات
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-blue-100">
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
            transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
            className="mb-4 sm:mb-6"
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
              size="md"
              fullWidth={false}
            />

            {/* Tab Content */}
            <div className="mt-4 sm:mt-6">
              <AnimatePresence mode="wait">
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
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
