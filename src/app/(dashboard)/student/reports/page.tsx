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
import { Button } from '@/components/ui/Button';
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
      <Card className="shadow-2xl border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                <Filter className="w-6 h-6" />
              </div>
              فلترة التقارير المتقدمة
            </CardTitle>
          </CardHeader>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                نوع التقرير
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option>جميع التقارير</option>
                <option>تقدم الدورات</option>
                <option>الإنجازات</option>
                <option>النشاط اليومي</option>
                <option>المقارنة بالآخرين</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                الفترة الزمنية
              </label>
              <select
                value={filters.period}
                onChange={(e) => setFilters({ ...filters, period: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option>آخر 30 يوم</option>
                <option>آخر أسبوع</option>
                <option>آخر 3 أشهر</option>
                <option>آخر 6 أشهر</option>
                <option>آخر سنة</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                الدورة
              </label>
              <select
                value={filters.course}
                onChange={(e) => setFilters({ ...filters, course: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option>جميع الدورات</option>
                <option>المراجعة الداخلية - المستوى الأول</option>
                <option>المراجعة الداخلية - المستوى الثاني</option>
                <option>المراجعة الداخلية - المستوى الثالث</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                المدرس
              </label>
              <select
                value={filters.instructor}
                onChange={(e) => setFilters({ ...filters, instructor: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option>جميع المدرسين</option>
                <option>د. أحمد محمد</option>
                <option>د. فاطمة علي</option>
                <option>د. محمد حسن</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                تطبيق الفلاتر
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.05, y: -8 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-xl border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600"></div>
            <CardContent className="p-6 relative z-10 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">
                    إجمالي الساعات الدراسية
                  </p>
                  <p className="text-4xl font-extrabold">156</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="p-3 bg-white/20 backdrop-blur-md rounded-xl"
                >
                  <Clock className="w-8 h-8" />
                </motion.div>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-bold">+12% من الشهر الماضي</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -8 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-xl border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600"></div>
            <CardContent className="p-6 relative z-10 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-green-100 text-sm font-medium mb-1">
                    الدورات المكتملة
                  </p>
                  <p className="text-4xl font-extrabold">12</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-3 bg-white/20 backdrop-blur-md rounded-xl"
                >
                  <Trophy className="w-8 h-8" />
                </motion.div>
              </div>
              <div className="flex items-center gap-2 text-green-100">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-bold">2 دورات هذا الشهر</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -8 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-xl border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-600 to-fuchsia-600"></div>
            <CardContent className="p-6 relative z-10 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-purple-100 text-sm font-medium mb-1">
                    معدل التقدم
                  </p>
                  <p className="text-4xl font-extrabold">87%</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="p-3 bg-white/20 backdrop-blur-md rounded-xl"
                >
                  <TrendingUp className="w-8 h-8" />
                </motion.div>
              </div>
              <div className="flex items-center gap-2 text-purple-100">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-bold">أعلى من المتوسط</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -8 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-xl border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-600"></div>
            <CardContent className="p-6 relative z-10 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-orange-100 text-sm font-medium mb-1">
                    الترتيب العام
                  </p>
                  <p className="text-4xl font-extrabold">#23</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="p-3 bg-white/20 backdrop-blur-md rounded-xl"
                >
                  <Award className="w-8 h-8" />
                </motion.div>
              </div>
              <div className="flex items-center gap-2 text-orange-100">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-bold">تحسن من #28</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Export Buttons */}
      <Card className="shadow-xl border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Download className="w-6 h-6 text-white" />
            </div>
            تصدير وجدولة التقارير
          </CardTitle>
          <CardDescription>
            تصدير تقاريرك بصيغ مختلفة
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleExport('PDF')}
              className="group relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white px-6 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
              <FileText className="w-10 h-10 mb-2 relative z-10 group-hover:scale-110 transition-transform" />
              <span className="relative z-10">PDF</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleExport('Excel')}
              className="group relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 text-white px-6 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
              <FileSpreadsheet className="w-10 h-10 mb-2 relative z-10 group-hover:scale-110 transition-transform" />
              <span className="relative z-10">Excel</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleExport('PowerPoint')}
              className="group relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 text-white px-6 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
              <Presentation className="w-10 h-10 mb-2 relative z-10 group-hover:scale-110 transition-transform" />
              <span className="relative z-10">PPT</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScheduleReport}
              className="group relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 hover:from-orange-700 hover:via-amber-700 hover:to-orange-800 text-white px-6 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
              <Mail className="w-10 h-10 mb-2 relative z-10 group-hover:scale-110 transition-transform" />
              <span className="relative z-10">جدولة</span>
            </motion.button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
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
            className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 lg:p-12"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="p-4 bg-white/20 backdrop-blur-md rounded-2xl"
                >
                  <FileBarChart className="w-12 h-12" />
                </motion.div>
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2">
                    التقارير والإحصائيات
                  </h1>
                  <p className="text-lg md:text-xl text-indigo-100">
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
