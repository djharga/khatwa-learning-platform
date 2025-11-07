'use client';

// Force dynamic rendering - requires authentication
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
import StyledButton from '@/components/ui/StyledButton';

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
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'midterm':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'quiz':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              منصة التقييم والامتحانات
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              اختبر معرفتك وتابع تقدمك في رحلتك التعليمية
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 bg-white dark:bg-neutral-800 rounded-xl p-2 shadow-lg border border-gray-200 dark:border-neutral-700">
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
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
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
                className="space-y-6"
              >
                {/* Search and Filter */}
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="البحث في الاختبارات..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Upcoming Exams List */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredUpcomingExams.map((exam, index) => (
                    <motion.div
                      key={exam.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-xl transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getExamTypeColor(exam.type)}`}>
                              {getExamTypeLabel(exam.type)}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              exam.status === 'available'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : exam.status === 'upcoming'
                                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                              {exam.status === 'available' ? 'متاح' : exam.status === 'upcoming' ? 'قادم' : 'مغلق'}
                            </span>
                          </div>
                          <CardTitle className="text-xl mb-2">{exam.title}</CardTitle>
                          <CardDescription>{exam.course}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="w-4 h-4" />
                              <span>{exam.date}</span>
                              <span className="mx-2">•</span>
                              <Clock className="w-4 h-4" />
                              <span>{exam.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Clock className="w-4 h-4" />
                              <span>المدة: {exam.duration} دقيقة</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Target className="w-4 h-4" />
                              <span>المحاولات: {exam.attemptsUsed}/{exam.attemptsAllowed}</span>
                            </div>
                          </div>
                          {exam.status === 'available' && (
                            <StyledButton
                              variant="primary"
                              onClick={() => {
                                setActiveTab('take-exam');
                                setSelectedExam(exam.id);
                              }}
                              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            >
                              <BookOpen className="w-4 h-4 ml-2" />
                              ابدأ الاختبار
                            </StyledButton>
                          )}
                          {exam.status === 'upcoming' && (
                            <StyledButton variant="secondary" className="w-full" disabled>
                              <Clock className="w-4 h-4 ml-2" />
                              غير متاح بعد
                            </StyledButton>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {filteredUpcomingExams.length === 0 && (
                  <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl shadow-lg">
                    <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      لا توجد اختبارات متاحة
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
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
                className="space-y-6"
              >
                {/* Search */}
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="البحث في النتائج..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-900 dark:text-white"
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
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row gap-6">
                            {/* Main Info */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                    {result.examTitle}
                                  </h3>
                                  <p className="text-gray-600 dark:text-gray-400">{result.course}</p>
                                </div>
                                <div className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                                  {result.score}%
                                </div>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">الإجابات الصحيحة</div>
                                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {result.correctAnswers}
                                  </div>
                                </div>
                                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">الإجابات الخاطئة</div>
                                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                    {result.wrongAnswers}
                                  </div>
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">الوقت المستغرق</div>
                                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {result.timeSpent}
                                  </div>
                                  <div className="text-xs text-gray-500">دقيقة</div>
                                </div>
                                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">التقدير</div>
                                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                    {result.grade}
                                  </div>
                                </div>
                              </div>

                              {/* Strengths and Weaknesses */}
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                    <span className="font-semibold text-gray-900 dark:text-white">نقاط القوة</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {result.strengths.map((strength, idx) => (
                                      <span
                                        key={idx}
                                        className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm"
                                      >
                                        {strength}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <TrendingDown className="w-5 h-5 text-red-600" />
                                    <span className="font-semibold text-gray-900 dark:text-white">نقاط التحسين</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {result.weaknesses.map((weakness, idx) => (
                                      <span
                                        key={idx}
                                        className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm"
                                      >
                                        {weakness}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                              <StyledButton variant="secondary" className="w-full">
                                <Eye className="w-4 h-4 ml-2" />
                                عرض التفاصيل
                              </StyledButton>
                              <StyledButton variant="secondary" className="w-full">
                                <Download className="w-4 h-4 ml-2" />
                                تحميل التقرير
                              </StyledButton>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {filteredResults.length === 0 && (
                  <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl shadow-lg">
                    <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      لا توجد نتائج
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
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
                className="space-y-6"
              >
                {/* Overall Performance */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        متوسط الدرجات
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {performanceAnalysis.averageScore}%
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>تحسن بنسبة {performanceAnalysis.improvement}%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-600" />
                        الاختبارات الناجحة
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold text-yellow-600 mb-2">
                        {performanceAnalysis.passedExams}/{performanceAnalysis.totalExams}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        نسبة النجاح: {Math.round((performanceAnalysis.passedExams / performanceAnalysis.totalExams) * 100)}%
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-purple-600" />
                        سلسلة الدراسة
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold text-purple-600 mb-2">
                        {performanceAnalysis.studyStreak}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">أيام متتالية</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Best and Worst Subjects */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                        <Trophy className="w-5 h-5" />
                        أفضل مادة
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
                        {performanceAnalysis.bestSubject}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        أداؤك ممتاز في هذه المادة! استمر في التميز.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                        <AlertTriangle className="w-5 h-5" />
                        يحتاج تحسين
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-2">
                        {performanceAnalysis.needsImprovement}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        ركز على هذه المادة للتحسين من أدائك الإجمالي.
                      </p>
                      <StyledButton variant="primary" className="mt-4 w-full bg-orange-600 hover:bg-orange-700">
                        <Lightbulb className="w-4 h-4 ml-2" />
                        عرض مواد التعلم المقترحة
                      </StyledButton>
                    </CardContent>
                  </Card>
                </div>

                {/* Score Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle>اتجاه الدرجات</CardTitle>
                    <CardDescription>تتبع تطور أدائك مع مرور الوقت</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-between gap-2">
                      {examResults.slice().reverse().map((result, index) => (
                        <div key={result.id} className="flex-1 flex flex-col items-center">
                          <motion.div
                            className="w-full bg-gradient-to-t from-blue-600 to-indigo-600 rounded-t-lg mb-2"
                            initial={{ height: 0 }}
                            animate={{ height: `${result.score}%` }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            style={{ minHeight: '4px' }}
                          />
                          <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
                            {result.score}%
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(result.date).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-600" />
                      توصيات مخصصة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-800 rounded-lg">
                        <BookMarked className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white mb-1">
                            راجع دروس المحاسبة الإدارية
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            أداؤك في هذا الموضوع يحتاج تحسين. راجع الدروس المتعلقة بتحليل التباينات والميزانيات.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-800 rounded-lg">
                        <Target className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white mb-1">
                            استمر في التركيز على أساسيات المحاسبة
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            أداؤك ممتاز في هذا المجال! استمر في الحفاظ على هذا المستوى.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-800 rounded-lg">
                        <Zap className="w-5 h-5 text-purple-600 mt-1" />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white mb-1">
                            جرب اختبارات تدريبية إضافية
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            الممارسة المستمرة ستساعدك على تحسين أدائك بشكل كبير.
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === 'take-exam' && (
              <motion.div
                key="take-exam"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    واجهة الامتحان
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
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
