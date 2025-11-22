'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  BookOpen,
  Award,
  TrendingUp,
  TrendingDown,
  Target,
  AlertCircle,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  LineChart,
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  ArrowRight,
  Trophy,
  Zap,
  AlertTriangle,
  Lightbulb,
  BookMarked,
} from 'lucide-react';
import ExamInterface from '@/components/exam/ExamInterface';
import AuthGuard from '@/components/auth/AuthGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface UpcomingExam {
  id: string;
  title: string;
  course: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'quiz' | 'midterm' | 'final' | 'assignment';
  status: 'available' | 'upcoming' | 'locked';
  attemptsAllowed: number;
  attemptsUsed: number;
}

interface ExamResult {
  id: string;
  examTitle: string;
  course: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeSpent: number; // in minutes
  passed: boolean;
  grade: string;
  strengths: string[];
  weaknesses: string[];
}

interface PerformanceAnalysis {
  averageScore: number;
  improvement: number;
  totalExams: number;
  passedExams: number;
  failedExams: number;
  bestSubject: string;
  needsImprovement: string;
  studyStreak: number;
}

export default function ExamPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'results' | 'analysis' | 'take-exam'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  // Mock data - في التطبيق الحقيقي، سيتم جلبها من API
  const upcomingExams: UpcomingExam[] = [
    {
      id: '1',
      title: 'اختبار المحاسبة المالية المتقدمة',
      course: 'المحاسبة المالية المتقدمة',
      date: '2024-02-20',
      time: '10:00 ص',
      duration: 120,
      type: 'final',
      status: 'available',
      attemptsAllowed: 2,
      attemptsUsed: 0,
    },
    {
      id: '2',
      title: 'اختبار قصير - المراجعة الداخلية',
      course: 'المراجعة الداخلية - المستوى المتقدم',
      date: '2024-02-18',
      time: '2:00 م',
      duration: 30,
      type: 'quiz',
      status: 'upcoming',
      attemptsAllowed: 1,
      attemptsUsed: 0,
    },
    {
      id: '3',
      title: 'امتحان منتصف الفصل - التحليل المالي',
      course: 'التحليل المالي',
      date: '2024-02-25',
      time: '9:00 ص',
      duration: 90,
      type: 'midterm',
      status: 'upcoming',
      attemptsAllowed: 1,
      attemptsUsed: 0,
    },
  ];

  const examResults: ExamResult[] = [
    {
      id: '1',
      examTitle: 'اختبار أساسيات المحاسبة',
      course: 'أساسيات المحاسبة',
      date: '2024-02-10',
      score: 92,
      totalQuestions: 50,
      correctAnswers: 46,
      wrongAnswers: 4,
      timeSpent: 85,
      passed: true,
      grade: 'ممتاز (A)',
      strengths: ['القوائم المالية', 'المعايير المحاسبية', 'التسويات'],
      weaknesses: ['تحليل التدفقات النقدية', 'المحاسبة المتقدمة'],
    },
    {
      id: '2',
      examTitle: 'اختبار المراجعة الداخلية',
      course: 'المراجعة الداخلية - المستوى الأساسي',
      date: '2024-02-05',
      score: 78,
      totalQuestions: 40,
      correctAnswers: 31,
      wrongAnswers: 9,
      timeSpent: 95,
      passed: true,
      grade: 'جيد جداً (B)',
      strengths: ['أساسيات المراجعة', 'الامتثال'],
      weaknesses: ['تحليل المخاطر', 'التقارير التفصيلية'],
    },
    {
      id: '3',
      examTitle: 'اختبار قصير - المحاسبة الإدارية',
      course: 'المحاسبة الإدارية',
      date: '2024-01-28',
      score: 65,
      totalQuestions: 30,
      correctAnswers: 20,
      wrongAnswers: 10,
      timeSpent: 45,
      passed: true,
      grade: 'مقبول (C)',
      strengths: ['التكاليف'],
      weaknesses: ['الميزانيات', 'تحليل التباينات', 'التخطيط المالي'],
    },
  ];

  const performanceAnalysis: PerformanceAnalysis = {
    averageScore: 78.3,
    improvement: 8.5,
    totalExams: 12,
    passedExams: 10,
    failedExams: 2,
    bestSubject: 'أساسيات المحاسبة',
    needsImprovement: 'المحاسبة الإدارية',
    studyStreak: 7,
  };

  const filteredUpcomingExams = upcomingExams.filter(exam =>
    exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredResults = examResults.filter(result =>
    result.examTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getExamTypeColor = (type: string) => {
    switch (type) {
      case 'final':
        return 'bg-danger-100 text-danger-700 dark:bg-danger-900/30 dark:text-danger-400';
      case 'midterm':
        return 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400';
      case 'quiz':
        return 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400';
      default:
        return 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400';
    }
  };

  const getExamTypeLabel = (type: string) => {
    switch (type) {
      case 'final':
        return 'نهائي';
      case 'midterm':
        return 'منتصف الفصل';
      case 'quiz':
        return 'اختبار قصير';
      case 'assignment':
        return 'وظيفة';
      default:
        return type;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-blue-600 dark:text-blue-400';
    if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <AuthGuard allowedRoles={['student', 'admin', 'instructor']}>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="text-center mb-6 sm:mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-2 sm:mb-4">
              منصة التقييم والامتحانات
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400">
              اختبر معرفتك وتابع تقدمك في رحلتك التعليمية
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-wrap gap-2 bg-white dark:bg-neutral-800 rounded-xl p-2 shadow-md border border-neutral-200 dark:border-neutral-700">
              {[
                { id: 'upcoming', label: 'الاختبارات القادمة', icon: Calendar },
                { id: 'results', label: 'النتائج السابقة', icon: FileText },
                { id: 'analysis', label: 'تحليل الأداء', icon: BarChart3 },
                { id: 'take-exam', label: 'بدء اختبار', icon: BookOpen },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(tab.id as 'upcoming' | 'results' | 'analysis' | 'take-exam');
                    }}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 min-h-[44px] rounded-lg font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    }`}
                    aria-label={tab.label}
                    aria-selected={activeTab === tab.id}
                    role="tab"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    <span className="text-sm sm:text-base">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'upcoming' && (
              <motion.div
                key="upcoming"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Search and Filter */}
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-md border border-neutral-200 dark:border-neutral-700">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5 pointer-events-none" aria-hidden="true" />
                      <input
                        type="text"
                        placeholder="البحث في الاختبارات..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full ps-10 pe-4 py-2.5 sm:py-3 min-h-[44px] border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-900 dark:text-white text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all duration-200 ease-out"
                        aria-label="البحث في الاختبارات"
                      />
                    </div>
                  </div>
                </div>

                {/* Upcoming Exams List */}
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredUpcomingExams.map((exam, index) => (
                    <motion.div
                      key={exam.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2, ease: 'easeOut' }}
                      whileHover={{ y: -2, scale: 1.01 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-200 ease-out shadow-md border border-neutral-200 dark:border-neutral-700">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2 gap-2">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getExamTypeColor(exam.type)}`}>
                              {getExamTypeLabel(exam.type)}
                            </span>
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                              exam.status === 'available'
                                ? 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400'
                                : exam.status === 'upcoming'
                                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                                  : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'
                            }`}>
                              {exam.status === 'available' ? 'متاح' : exam.status === 'upcoming' ? 'قادم' : 'مغلق'}
                            </span>
                          </div>
                          <CardTitle className="text-lg sm:text-xl mb-2 text-neutral-900 dark:text-white">{exam.title}</CardTitle>
                          <CardDescription className="text-neutral-600 dark:text-neutral-400">{exam.course}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 sm:space-y-3 mb-4">
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                              <Calendar className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                              <span>{exam.date}</span>
                              <span className="mx-2">•</span>
                              <Clock className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                              <span>{exam.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                              <Clock className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                              <span>المدة: {exam.duration} دقيقة</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                              <Target className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                              <span>المحاولات: {exam.attemptsUsed}/{exam.attemptsAllowed}</span>
                            </div>
                          </div>
                          {exam.status === 'available' && (
                            <button
                              onClick={() => {
                                setActiveTab('take-exam');
                                setSelectedExam(exam.id);
                              }}
                              className="w-full px-4 py-2.5 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                              aria-label={`بدء اختبار ${exam.title}`}
                              type="button"
                            >
                              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                              <span className="text-sm sm:text-base">ابدأ الاختبار</span>
                            </button>
                          )}
                          {exam.status === 'upcoming' && (
                            <button
                              disabled
                              className="w-full px-4 py-2.5 min-h-[44px] bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 rounded-lg font-medium cursor-not-allowed flex items-center justify-center gap-2"
                              aria-label="الاختبار غير متاح بعد"
                              type="button"
                            >
                              <Clock className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                              <span className="text-sm sm:text-base">غير متاح بعد</span>
                            </button>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {filteredUpcomingExams.length === 0 && (
                  <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700">
                    <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-lg sm:text-xl font-medium text-neutral-900 dark:text-white mb-2">
                      لا توجد اختبارات متاحة
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                      {searchQuery ? 'جرب مصطلحات بحث مختلفة' : 'لا توجد اختبارات مجدولة في الوقت الحالي'}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Search */}
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-md border border-neutral-200 dark:border-neutral-700">
                  <div className="relative">
                    <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5 pointer-events-none" aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="البحث في النتائج..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full ps-10 pe-4 py-2.5 sm:py-3 min-h-[44px] border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-900 dark:text-white text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all duration-200 ease-out"
                      aria-label="البحث في النتائج"
                    />
                  </div>
                </div>

                {/* Results List */}
                <div className="space-y-4">
                  {filteredResults.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2, ease: 'easeOut' }}
                      whileHover={{ y: -2, scale: 1.01 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-200 ease-out shadow-md border border-neutral-200 dark:border-neutral-700">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                            {/* Main Info */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-4 gap-4">
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-1">
                                    {result.examTitle}
                                  </h3>
                                  <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">{result.course}</p>
                                </div>
                                <div className={`text-2xl sm:text-3xl font-bold ${getScoreColor(result.score)} flex-shrink-0`}>
                                  {result.score}%
                                </div>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                                <div className="bg-success-50 dark:bg-success-900/20 rounded-lg p-2 sm:p-3">
                                  <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-1">الإجابات الصحيحة</div>
                                  <div className="text-xl sm:text-2xl font-bold text-success-600 dark:text-success-400">
                                    {result.correctAnswers}
                                  </div>
                                </div>
                                <div className="bg-danger-50 dark:bg-danger-900/20 rounded-lg p-2 sm:p-3">
                                  <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-1">الإجابات الخاطئة</div>
                                  <div className="text-xl sm:text-2xl font-bold text-danger-600 dark:text-danger-400">
                                    {result.wrongAnswers}
                                  </div>
                                </div>
                                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-2 sm:p-3">
                                  <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-1">الوقت المستغرق</div>
                                  <div className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                                    {result.timeSpent}
                                  </div>
                                  <div className="text-xs text-neutral-500 dark:text-neutral-500">دقيقة</div>
                                </div>
                                <div className="bg-secondary-innovate-50 dark:bg-secondary-innovate-900/20 rounded-lg p-2 sm:p-3">
                                  <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-1">التقدير</div>
                                  <div className="text-base sm:text-lg font-bold text-secondary-innovate-600 dark:text-secondary-innovate-400">
                                    {result.grade}
                                  </div>
                                </div>
                              </div>

                              {/* Strengths and Weaknesses */}
                              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-success-600 dark:text-success-400" aria-hidden="true" />
                                    <span className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white">نقاط القوة</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {result.strengths.map((strength, idx) => (
                                      <span
                                        key={idx}
                                        className="px-2 sm:px-3 py-1 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400 rounded-full text-xs sm:text-sm font-medium"
                                      >
                                        {strength}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-danger-600 dark:text-danger-400" aria-hidden="true" />
                                    <span className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white">نقاط التحسين</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {result.weaknesses.map((weakness, idx) => (
                                      <span
                                        key={idx}
                                        className="px-2 sm:px-3 py-1 bg-danger-100 dark:bg-danger-900/30 text-danger-700 dark:text-danger-400 rounded-full text-xs sm:text-sm font-medium"
                                      >
                                        {weakness}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 lg:min-w-[140px]">
                              <button className="w-full px-4 py-2.5 min-h-[44px] bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label={`عرض تفاصيل ${result.examTitle}`} type="button">
                                <Eye className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                                <span className="text-sm sm:text-base">عرض التفاصيل</span>
                              </button>
                              <button className="w-full px-4 py-2.5 min-h-[44px] bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label={`تحميل تقرير ${result.examTitle}`} type="button">
                                <Download className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                                <span className="text-sm sm:text-base">تحميل التقرير</span>
                              </button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {filteredResults.length === 0 && (
                  <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700">
                    <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-lg sm:text-xl font-medium text-neutral-900 dark:text-white mb-2">
                      لا توجد نتائج
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                      {searchQuery ? 'جرب مصطلحات بحث مختلفة' : 'ابدأ بأخذ اختباراتك الأولى لرؤية النتائج هنا'}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'analysis' && (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Overall Performance */}
                <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                    <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-white">
                          <BarChart3 className="w-5 h-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                          متوسط الدرجات
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                          {performanceAnalysis.averageScore}%
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-success-600 dark:text-success-400">
                          <TrendingUp className="w-4 h-4" aria-hidden="true" />
                          <span>تحسن بنسبة {performanceAnalysis.improvement}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                    <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-white">
                          <Trophy className="w-5 h-5 text-warning-600 dark:text-warning-400" aria-hidden="true" />
                          الاختبارات الناجحة
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl sm:text-4xl font-bold text-warning-600 dark:text-warning-400 mb-2">
                          {performanceAnalysis.passedExams}/{performanceAnalysis.totalExams}
                        </div>
                        <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                          نسبة النجاح: {Math.round((performanceAnalysis.passedExams / performanceAnalysis.totalExams) * 100)}%
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.2, ease: 'easeOut' }}
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                    <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-white">
                          <Zap className="w-5 h-5 text-secondary-innovate-600 dark:text-secondary-innovate-400" aria-hidden="true" />
                          سلسلة الدراسة
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl sm:text-4xl font-bold text-secondary-innovate-600 dark:text-secondary-innovate-400 mb-2">
                          {performanceAnalysis.studyStreak}
                        </div>
                        <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">أيام متتالية</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Best and Worst Subjects */}
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.2, ease: 'easeOut' }}
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                    <Card className="bg-gradient-to-br from-success-50 to-success-100/50 dark:from-success-900/20 dark:to-success-800/20 border-2 border-success-200 dark:border-success-800 shadow-md">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-success-700 dark:text-success-400">
                          <Trophy className="w-5 h-5" aria-hidden="true" />
                          أفضل مادة
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl sm:text-2xl font-bold text-success-700 dark:text-success-400 mb-2">
                          {performanceAnalysis.bestSubject}
                        </div>
                        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                          أداؤك ممتاز في هذه المادة! استمر في التميز.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.2, ease: 'easeOut' }}
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                    <Card className="bg-gradient-to-br from-warning-50 to-warning-100/50 dark:from-warning-900/20 dark:to-warning-800/20 border-2 border-warning-200 dark:border-warning-800 shadow-md">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-warning-700 dark:text-warning-400">
                          <AlertTriangle className="w-5 h-5" aria-hidden="true" />
                          يحتاج تحسين
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl sm:text-2xl font-bold text-warning-700 dark:text-warning-400 mb-2">
                          {performanceAnalysis.needsImprovement}
                        </div>
                        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-4">
                          ركز على هذه المادة للتحسين من أدائك الإجمالي.
                        </p>
                        <button className="w-full px-4 py-2.5 min-h-[44px] bg-gradient-to-r from-warning-600 to-warning-700 hover:from-warning-700 hover:to-warning-800 text-white rounded-lg font-medium shadow-md shadow-warning-500/20 hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning-500 focus-visible:ring-offset-2" aria-label="عرض مواد التعلم المقترحة" type="button">
                          <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                          <span className="text-sm sm:text-base">عرض مواد التعلم المقترحة</span>
                        </button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Score Trends */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.2, ease: 'easeOut' }}
                >
                  <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
                    <CardHeader>
                      <CardTitle className="text-neutral-900 dark:text-white">اتجاه الدرجات</CardTitle>
                      <CardDescription className="text-neutral-600 dark:text-neutral-400">تتبع تطور أدائك مع مرور الوقت</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48 sm:h-64 flex items-end justify-between gap-1 sm:gap-2">
                        {examResults.slice().reverse().map((result, index) => (
                          <div key={result.id} className="flex-1 flex flex-col items-center min-w-0">
                            <motion.div
                              className="w-full bg-gradient-to-t from-primary-600 to-primary-700 rounded-t-lg mb-2 transition-all duration-200 ease-out hover:opacity-80"
                              initial={{ height: 0 }}
                              animate={{ height: `${result.score}%` }}
                              transition={{ delay: index * 0.05, duration: 0.5, ease: 'easeOut' }}
                              style={{ minHeight: '4px' }}
                              role="presentation"
                              aria-label={`درجة ${result.score}% في ${new Date(result.date).toLocaleDateString('ar-EG')}`}
                            />
                            <div className="text-xs text-neutral-600 dark:text-neutral-400 text-center truncate w-full">
                              {result.score}%
                            </div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-500 mt-1 truncate w-full text-center">
                              {new Date(result.date).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Recommendations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.2, ease: 'easeOut' }}
                >
                  <Card className="bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/20 border-2 border-primary-200 dark:border-primary-800 shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-white">
                        <Lightbulb className="w-5 h-5 text-warning-600 dark:text-warning-400" aria-hidden="true" />
                        توصيات مخصصة
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-800 rounded-lg hover:shadow-sm transition-all duration-200 ease-out">
                          <BookMarked className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" aria-hidden="true" />
                          <div>
                            <div className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white mb-1">
                              راجع دروس المحاسبة الإدارية
                            </div>
                            <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                              أداؤك في هذا الموضوع يحتاج تحسين. راجع الدروس المتعلقة بتحليل التباينات والميزانيات.
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-800 rounded-lg hover:shadow-sm transition-all duration-200 ease-out">
                          <Target className="w-5 h-5 text-success-600 dark:text-success-400 mt-1 flex-shrink-0" aria-hidden="true" />
                          <div>
                            <div className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white mb-1">
                              استمر في التركيز على أساسيات المحاسبة
                            </div>
                            <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                              أداؤك ممتاز في هذا المجال! استمر في الحفاظ على هذا المستوى.
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-800 rounded-lg hover:shadow-sm transition-all duration-200 ease-out">
                          <Zap className="w-5 h-5 text-secondary-innovate-600 dark:text-secondary-innovate-400 mt-1 flex-shrink-0" aria-hidden="true" />
                          <div>
                            <div className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white mb-1">
                              جرب اختبارات تدريبية إضافية
                            </div>
                            <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                              الممارسة المستمرة ستساعدك على تحسين أدائك بشكل كبير.
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'take-exam' && (
              <motion.div
                key="take-exam"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6 mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2 sm:mb-4">
                    واجهة الامتحان
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-6">
                    ابدأ اختبارك الآن. تأكد من قراءة التعليمات بعناية قبل البدء.
                  </p>
                </div>
                <ExamInterface isAuthenticated />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AuthGuard>
  );
}
