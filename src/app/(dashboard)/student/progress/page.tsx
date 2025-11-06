'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Award,
  Target,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Calendar,
  Trophy,
  Zap,
  Star,
  ArrowUp,
  ArrowDown,
  Download,
  Activity,
  PieChart,
  Sparkles,
  Flame,
  Play,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import StyledButton from '@/components/ui/StyledButton';

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // بيانات التقدم
  const overallProgress = {
    totalCourses: 16,
    completedCourses: 12,
    inProgressCourses: 4,
    totalHours: 156,
    certificates: 8,
    averageScore: 92,
    currentStreak: 7,
    totalPoints: 2840,
  };

  // بيانات الدورات مع التقدم
  const coursesProgress = [
    {
      id: 1,
      title: 'أساسيات المراجعة الداخلية',
      category: 'مراجعة',
      progress: 100,
      completedLessons: 24,
      totalLessons: 24,
      score: 95,
      timeSpent: 32,
      lastAccessed: '2025-10-23',
      status: 'completed',
    },
    {
      id: 2,
      title: 'تحليل المخاطر في المحاسبة',
      category: 'محاسبة',
      progress: 75,
      completedLessons: 18,
      totalLessons: 24,
      score: 88,
      timeSpent: 28,
      lastAccessed: '2025-10-22',
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'الامتثال والحوكمة',
      category: 'حوكمة',
      progress: 45,
      completedLessons: 11,
      totalLessons: 24,
      score: 82,
      timeSpent: 15,
      lastAccessed: '2025-10-20',
      status: 'in-progress',
    },
  ];

  // نقاط القوة والتحسين
  const strengths = [
    { skill: 'معايير المراجعة', score: 95, trend: 'up' },
    { skill: 'تحليل المخاطر', score: 92, trend: 'up' },
    { skill: 'إعداد التقارير', score: 90, trend: 'stable' },
  ];

  const improvements = [
    { skill: 'المحاسبة الضريبية', score: 68, trend: 'down' },
    { skill: 'التدقيق الرقمي', score: 72, trend: 'up' },
    { skill: 'الامتثال التنظيمي', score: 75, trend: 'stable' },
  ];

  // التوصيات
  const recommendations = [
    {
      id: 1,
      type: 'course',
      title: 'دورة المحاسبة الضريبية المتقدمة',
      reason: 'لتحسين أدائك في المحاسبة الضريبية',
      priority: 'high',
    },
    {
      id: 2,
      type: 'practice',
      title: 'تمارين عملية في التدقيق الرقمي',
      reason: 'لتطوير مهارات التدقيق الرقمي',
      priority: 'medium',
    },
    {
      id: 3,
      type: 'resource',
      title: 'دليل معايير الامتثال الدولية',
      reason: 'لتعزيز معرفتك بالامتثال',
      priority: 'medium',
    },
  ];

  // الإنجازات الحديثة
  const recentAchievements = [
    {
      id: 1,
      title: 'متعلم سريع',
      description: 'أكملت 5 دورات في أقل من شهر',
      icon: Zap,
      date: '2025-10-15',
      points: 500,
    },
    {
      id: 2,
      title: 'خبير المراجعة',
      description: 'حصلت على شهادة CIA Part 1',
      icon: Award,
      date: '2025-10-10',
      points: 1000,
    },
  ];

  const completionPercentage = (overallProgress.completedCourses / overallProgress.totalCourses) * 100;

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
            className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-700 text-white p-8 lg:p-12"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2"
                >
                  تقدمك التعليمي
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl text-purple-100"
                >
                  تتبع تقدمك وحقق أهدافك التعليمية
                </motion.p>
              </div>
              <StyledButton
                variant="secondary"
                size="large"
                className="bg-white text-purple-600 hover:bg-purple-50 hidden md:flex"
              >
                <Download className="w-5 h-5 mr-2" />
                تصدير التقرير
              </StyledButton>
            </div>
          </motion.div>

          {/* نظرة سريعة على التقدم العام */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="shadow-xl border-0 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600"></div>
                <CardContent className="p-6 relative z-10 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-blue-100 text-sm font-medium mb-1">
                        الدورات المكتملة
                      </p>
                      <p className="text-4xl font-extrabold">
                        {overallProgress.completedCourses}/{overallProgress.totalCourses}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-xl"
                    >
                      <BookOpen className="w-8 h-8" />
                    </motion.div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-blue-100 mb-2">
                      <span>التقدم</span>
                      <span className="font-bold">{Math.round(completionPercentage)}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <motion.div
                        className="bg-white h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${completionPercentage}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
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
              <Card className="shadow-xl border-0 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-600 to-fuchsia-600"></div>
                <CardContent className="p-6 relative z-10 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-purple-100 text-sm font-medium mb-1">
                        ساعات التعلم
                      </p>
                      <p className="text-4xl font-extrabold">
                        {overallProgress.totalHours}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-xl"
                    >
                      <Clock className="w-8 h-8" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-purple-100 mt-2">ساعة مكتملة</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="shadow-xl border-0 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600"></div>
                <CardContent className="p-6 relative z-10 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-green-100 text-sm font-medium mb-1">
                        متوسط الدرجات
                      </p>
                      <p className="text-4xl font-extrabold">
                        {overallProgress.averageScore}%
                      </p>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-xl"
                    >
                      <TrendingUp className="w-8 h-8" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-green-100 mt-2">في جميع الاختبارات</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="shadow-xl border-0 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-600"></div>
                <CardContent className="p-6 relative z-10 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-orange-100 text-sm font-medium mb-1">
                        الشهادات
                      </p>
                      <p className="text-4xl font-extrabold">
                        {overallProgress.certificates}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, -360] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-xl"
                    >
                      <Award className="w-8 h-8" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-orange-100 mt-2">شهادات معتمدة</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* شريط إنجاز لكل دورة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="shadow-xl border-0 overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-2 bg-white/20 backdrop-blur-md rounded-xl"
                    >
                      <BarChart3 className="w-6 h-6" />
                    </motion.div>
                    تقدمك في الدورات
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    تفاصيل التقدم في كل دورة
                  </CardDescription>
                </CardHeader>
              </div>
              <CardContent className="p-6 space-y-4">
                {coursesProgress.map((course, idx) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="p-5 border-2 border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {course.title}
                        </h4>
                        <div className="flex gap-4 text-sm text-gray-600 mb-2">
                          <span className="font-semibold">{course.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.timeSpent} ساعة
                          </span>
                          <span>•</span>
                          <span>آخر دخول: {course.lastAccessed}</span>
                        </div>
                        {course.status === 'completed' && (
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            مكتملة
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-extrabold text-blue-600">
                          {course.progress}%
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-4 mb-3 shadow-inner">
                      <motion.div
                        className={`h-4 rounded-full shadow-lg ${
                          course.status === 'completed' ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, type: "spring", delay: idx * 0.2 }}
                      />
                    </div>

                    <div className="flex justify-between text-sm items-center">
                      <span className="text-gray-600 font-semibold">
                        {course.completedLessons} من {course.totalLessons} درس مكتمل
                      </span>
                      <span className="font-bold text-blue-600 text-lg">
                        الدرجة: {course.score}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* نقاط القوة */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="p-2 bg-white/20 backdrop-blur-md rounded-xl"
                      >
                        <CheckCircle2 className="w-6 h-6" />
                      </motion.div>
                      نقاط القوة
                    </CardTitle>
                    <CardDescription className="text-green-100">
                      المهارات التي تتقنها
                    </CardDescription>
                  </CardHeader>
                </div>
                <CardContent className="p-6 space-y-4">
                  {strengths.map((strength, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.03, x: 5 }}
                      className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-lg"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-lg text-gray-900">
                          {strength.skill}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-2xl text-green-600">{strength.score}%</span>
                          {strength.trend === 'up' && (
                            <motion.div
                              animate={{ y: [-3, 3, -3] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              <ArrowUp className="w-6 h-6 text-green-600" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-green-600 to-emerald-600 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${strength.score}%` }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* نقاط تحتاج تحسين */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="p-2 bg-white/20 backdrop-blur-md rounded-xl"
                      >
                        <AlertCircle className="w-6 h-6" />
                      </motion.div>
                      نقاط تحتاج تحسين
                    </CardTitle>
                    <CardDescription className="text-orange-100">
                      مجالات للتطوير
                    </CardDescription>
                  </CardHeader>
                </div>
                <CardContent className="p-6 space-y-4">
                  {improvements.map((improvement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.03, x: -5 }}
                      className="p-5 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl shadow-lg"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-lg text-gray-900">
                          {improvement.skill}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-2xl text-orange-600">{improvement.score}%</span>
                          {improvement.trend === 'down' && (
                            <motion.div
                              animate={{ y: [3, -3, 3] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              <ArrowDown className="w-6 h-6 text-red-600" />
                            </motion.div>
                          )}
                          {improvement.trend === 'up' && (
                            <motion.div
                              animate={{ y: [-3, 3, -3] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              <ArrowUp className="w-6 h-6 text-green-600" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-orange-200 rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-orange-600 to-red-600 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${improvement.score}%` }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* التوصيات القادمة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="shadow-2xl border-0 overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 15, -15, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-2 bg-white/20 backdrop-blur-md rounded-xl"
                    >
                      <Target className="w-6 h-6" />
                    </motion.div>
                    التوصيات المخصصة لك
                  </CardTitle>
                  <CardDescription className="text-indigo-100">
                    بناءً على تقدمك، ننصحك بالتالي
                  </CardDescription>
                </CardHeader>
              </div>
              <CardContent className="p-6 space-y-4">
                {recommendations.map((rec, idx) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 + idx * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      rec.priority === 'high'
                        ? 'border-red-300 bg-gradient-to-r from-red-50 to-orange-50 shadow-lg'
                        : 'border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 mb-2">
                          {rec.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {rec.reason}
                        </p>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-xl text-xs font-bold ${
                          rec.priority === 'high'
                            ? 'bg-red-600 text-white'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        {rec.priority === 'high' ? 'أولوية عالية 🔥' : 'مستحسن ⭐'}
                      </span>
                    </div>
                    <StyledButton variant="primary" size="small" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      <Play className="w-4 h-4 mr-2" />
                      ابدأ الآن
                    </StyledButton>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* الإنجازات الحديثة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <Card className="shadow-2xl border-0 overflow-hidden relative bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-300/30 to-orange-300/30 rounded-full blur-3xl"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-4 text-3xl">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 15, -15, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-4 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-2xl"
                  >
                    <Trophy className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="font-extrabold text-gray-900">الإنجازات الحديثة</div>
                </CardTitle>
                <CardDescription>أحدث إنجازاتك</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentAchievements.map((achievement, idx) => {
                    const Icon = achievement.icon;
                    return (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 20, rotate: -10 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        transition={{ delay: 1.2 + idx * 0.15, type: "spring", stiffness: 150 }}
                        whileHover={{ scale: 1.1, y: -10, rotate: 5 }}
                        className="p-6 border-2 border-yellow-300 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-3xl shadow-xl relative overflow-hidden group"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-6xl mb-4"
                        >
                          <Icon className="w-16 h-16 mx-auto text-yellow-600" />
                        </motion.div>
                        <h4 className="font-extrabold text-xl mb-2 text-gray-900">
                          {achievement.title}
                        </h4>
                        <p className="text-sm font-semibold mb-4 text-gray-700">
                          {achievement.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-gray-600">
                            <span>{achievement.date}</span>
                            <span>•</span>
                            <span className="font-bold text-yellow-600 text-lg">
                              +{achievement.points} نقطة
                            </span>
                          </div>
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
