'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/icons/IconSystem';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function StudentDashboardPage() {
  const [stats] = useState({
    completedCourses: 12,
    totalCourses: 16,
    certificates: 8,
    hoursLearned: 156,
    averageScore: 92,
    currentStreak: 7,
    totalPoints: 2840,
  });

  const [recentCourses] = useState([
    {
      id: '1',
      title: 'أساسيات المراجعة الداخلية',
      progress: 85,
      lastAccessed: '2025-10-23',
      nextLesson: 'مخاطر الرقابة',
      instructor: 'د. أحمد محمد',
    },
    {
      id: '2',
      title: 'تحليل المخاطر في المحاسبة',
      progress: 60,
      lastAccessed: '2025-10-22',
      nextLesson: 'تقييم المخاطر الكمي',
      instructor: 'د. فاطمة علي',
    },
    {
      id: '3',
      title: 'الامتثال والحوكمة',
      progress: 30,
      lastAccessed: '2025-10-21',
      nextLesson: 'معايير SOX',
      instructor: 'د. محمد حسن',
    },
  ]);

  const [upcomingExams] = useState([
    {
      id: '1',
      title: 'امتحان أساسيات المراجعة',
      course: 'أساسيات المراجعة الداخلية',
      date: '2025-10-28',
      time: '10:00',
      duration: '90 دقيقة',
    },
    {
      id: '2',
      title: 'امتحان تحليل المخاطر',
      course: 'تحليل المخاطر في المحاسبة',
      date: '2025-11-05',
      time: '14:00',
      duration: '120 دقيقة',
    },
  ]);

  const [achievements] = useState([
    {
      id: '1',
      title: 'متعلم سريع',
      description: 'أكملت 5 دورات في أقل من شهر',
      icon: 'zap',
      unlocked: true,
      date: '2025-10-15',
    },
    {
      id: '2',
      title: 'خبير المراجعة',
      description: 'حصلت على شهادة CIA Part 1',
      icon: 'award',
      unlocked: true,
      date: '2025-10-10',
    },
    {
      id: '3',
      title: 'طالب مستمر',
      description: 'حافظ على تسجيل الدخول لمدة 30 يوم متتالي',
      icon: 'calendar',
      unlocked: false,
      progress: 70,
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              مرحباً بك، أحمد! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              استمر في رحلتك التعليمية - لديك {stats.currentStreak} أيام متتالية من التعلم!
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        الدورات المكتملة
                      </p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {stats.completedCourses}/{stats.totalCourses}
                      </p>
                    </div>
                    <Icon name="book" size="lg" className="text-blue-500" />
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>التقدم</span>
                      <span>{Math.round((stats.completedCourses / stats.totalCourses) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <motion.div
                        className="bg-blue-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.completedCourses / stats.totalCourses) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        الشهادات
                      </p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {stats.certificates}
                      </p>
                    </div>
                    <Icon name="award" size="lg" className="text-green-500" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    شهادات معتمدة
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        ساعات التعلم
                      </p>
                      <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        {stats.hoursLearned}
                      </p>
                    </div>
                    <Icon name="clock" size="lg" className="text-purple-500" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    ساعة مكتملة
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        متوسط الدرجات
                      </p>
                      <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                        {stats.averageScore}%
                      </p>
                    </div>
                    <Icon name="trendingUp" size="lg" className="text-orange-500" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    في جميع الامتحانات
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Continue Learning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="play" size="sm" />
                  استمر في التعلم
                </CardTitle>
                <CardDescription>
                  دوراتك الجارية والدروس التالية
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 dark:border-gray-700"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {course.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          المدرس: {course.instructor}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {course.progress}%
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-2 mt-1 dark:bg-gray-700">
                          <motion.div
                            className="bg-blue-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        الدرس التالي: {course.nextLesson}
                      </p>
                      <Button size="sm">
                        متابعة التعلم
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Exams */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="calendar" size="sm" />
                  الامتحانات القادمة
                </CardTitle>
                <CardDescription>
                  امتحاناتك المجدولة في الأسابيع القادمة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingExams.map((exam) => (
                  <motion.div
                    key={exam.id}
                    className="p-4 border border-orange-200 bg-orange-50 rounded-lg dark:border-orange-800 dark:bg-orange-900/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {exam.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {exam.course}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-orange-600 dark:text-orange-400">
                          {exam.date}
                        </div>
                        <div className="text-sm text-gray-500">
                          {exam.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        المدة: {exam.duration}
                      </p>
                      <Button size="sm" variant="outline">
                        مراجعة المحتوى
                      </Button>
                    </div>
                  </motion.div>
                ))}
                {upcomingExams.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Icon name="calendar" size="lg" className="mx-auto mb-2 opacity-50" />
                    <p>لا توجد امتحانات مجدولة</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="trophy" size="sm" />
                الإنجازات
              </CardTitle>
              <CardDescription>
                إنجازاتك وشارات التقدير
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      achievement.unlocked
                        ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
                        : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        achievement.unlocked
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-300 text-gray-500'
                      }`}>
                        <Icon name={achievement.icon as any} size="sm" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {achievement.description}
                        </p>
                        {achievement.unlocked ? (
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                            مفتوح في {achievement.date}
                          </p>
                        ) : (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>التقدم</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                              <div
                                className="bg-blue-500 h-1 rounded-full"
                                style={{ width: `${achievement.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
