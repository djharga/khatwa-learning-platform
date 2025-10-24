'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Award,
  Target,
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Calendar,
  Trophy,
  Zap,
  Star,
  ArrowUp,
  ArrowDown,
  Download,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                تقدمك التعليمي
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                تتبع تقدمك وحقق أهدافك التعليمية
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => {}}>
                <Download className="w-4 h-4 ml-2" />
                تصدير التقرير
              </Button>
            </div>
          </div>

          {/* نظرة سريعة على التقدم العام */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        الدورات المكتملة
                      </p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {overallProgress.completedCourses}/{overallProgress.totalCourses}
                      </p>
                    </div>
                    <BookOpen className="w-12 h-12 text-blue-500" />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${completionPercentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        ساعات التعلم
                      </p>
                      <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        {overallProgress.totalHours}
                      </p>
                    </div>
                    <Clock className="w-12 h-12 text-purple-500" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">ساعة مكتملة</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        متوسط الدرجات
                      </p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {overallProgress.averageScore}%
                      </p>
                    </div>
                    <TrendingUp className="w-12 h-12 text-green-500" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">في جميع الاختبارات</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        الشهادات
                      </p>
                      <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                        {overallProgress.certificates}
                      </p>
                    </div>
                    <Award className="w-12 h-12 text-orange-500" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">شهادات معتمدة</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* شريط إنجاز لكل دورة */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                تقدمك في الدورات
              </CardTitle>
              <CardDescription>تفاصيل التقدم في كل دورة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {coursesProgress.map((course) => (
                <motion.div
                  key={course.id}
                  className="p-4 border border-gray-200 rounded-lg dark:border-gray-700"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {course.title}
                      </h4>
                      <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span>{course.category}</span>
                        <span>•</span>
                        <span>{course.timeSpent} ساعة</span>
                        <span>•</span>
                        <span>آخر دخول: {course.lastAccessed}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {course.progress}%
                      </div>
                      {course.status === 'completed' && (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                      )}
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3 dark:bg-gray-700">
                    <motion.div
                      className={`h-3 rounded-full ${
                        course.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {course.completedLessons} من {course.totalLessons} درس
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      الدرجة: {course.score}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* نقاط القوة */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  نقاط القوة
                </CardTitle>
                <CardDescription>المهارات التي تتقنها</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {strengths.map((strength, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {strength.skill}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-green-600">{strength.score}%</span>
                        {strength.trend === 'up' && (
                          <ArrowUp className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2 dark:bg-green-800">
                      <motion.div
                        className="bg-green-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${strength.score}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* نقاط تحتاج تحسين */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <AlertCircle className="w-5 h-5" />
                  نقاط تحتاج تحسين
                </CardTitle>
                <CardDescription>مجالات للتطوير</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {improvements.map((improvement, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-orange-50 border border-orange-200 rounded-lg dark:bg-orange-900/20 dark:border-orange-800"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {improvement.skill}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-orange-600">{improvement.score}%</span>
                        {improvement.trend === 'down' && (
                          <ArrowDown className="w-4 h-4 text-red-600" />
                        )}
                        {improvement.trend === 'up' && (
                          <ArrowUp className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-orange-200 rounded-full h-2 dark:bg-orange-800">
                      <motion.div
                        className="bg-orange-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${improvement.score}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* التوصيات القادمة */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                التوصيات المخصصة لك
              </CardTitle>
              <CardDescription>
                بناءً على تقدمك، ننصحك بالتالي
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec) => (
                <motion.div
                  key={rec.id}
                  className={`p-4 border rounded-lg ${
                    rec.priority === 'high'
                      ? 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800'
                      : 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {rec.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {rec.reason}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        rec.priority === 'high'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-blue-200 text-blue-800'
                      }`}
                    >
                      {rec.priority === 'high' ? 'أولوية عالية' : 'مستحسن'}
                    </span>
                  </div>
                  <Button size="sm" className="mt-3">
                    ابدأ الآن
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* الإنجازات الحديثة */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                الإنجازات الحديثة
              </CardTitle>
              <CardDescription>أحدث إنجازاتك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentAchievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={achievement.id}
                      className="p-4 border-2 border-yellow-200 bg-yellow-50 rounded-lg dark:border-yellow-800 dark:bg-yellow-900/20"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-yellow-500 text-white">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {achievement.description}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                            <span>{achievement.date}</span>
                            <span>•</span>
                            <span className="font-medium text-yellow-600">
                              +{achievement.points} نقطة
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
