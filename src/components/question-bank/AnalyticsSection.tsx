'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Award,
  Clock,
  Brain,
  BookOpen,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Download,
  Share,
  Filter,
  PieChart,
  LineChart,
  Activity,
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'سهل' | 'متوسط' | 'صعب';
  category: string;
  points: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  usageCount: number;
  successRate: number;
  aiGenerated?: boolean;
}

interface QuizResult {
  id: string;
  userId: string;
  userName: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  completedAt: string;
  quizType: 'free' | 'premium' | 'certification';
  difficulty: 'سهل' | 'متوسط' | 'صعب';
}

interface AnalyticsSectionProps {
  questions: Question[];
  quizResults: QuizResult[];
  isSubscribed?: boolean;
}

const AnalyticsSection = ({ questions, quizResults, isSubscribed = false }: AnalyticsSectionProps) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'performance' | 'usage' | 'difficulty'>('performance');

  // إحصائيات عامة
  const generalStats = useMemo(() => {
    const totalQuestions = questions.length;
    const totalQuizzes = quizResults.length;
    const avgScore = quizResults.reduce((sum, result) => sum + result.score, 0) / totalQuizzes || 0;
    const totalUsers = new Set(quizResults.map(r => r.userId)).size;
    const avgTimeSpent = quizResults.reduce((sum, result) => sum + result.timeSpent, 0) / totalQuizzes || 0;

    return {
      totalQuestions,
      totalQuizzes,
      avgScore: Math.round(avgScore),
      totalUsers,
      avgTimeSpent: Math.round(avgTimeSpent / 60), // بالدقائق
    };
  }, [questions, quizResults]);

  // إحصائيات الأداء حسب المستوى
  const performanceByDifficulty = useMemo(() => {
    const difficulties = ['سهل', 'متوسط', 'صعب'] as const;

    return difficulties.map(difficulty => {
      const results = quizResults.filter(r => r.difficulty === difficulty);
      const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length || 0;
      const passRate = results.filter(r => r.score >= 60).length / results.length * 100 || 0;

      return {
        difficulty,
        avgScore: Math.round(avgScore),
        passRate: Math.round(passRate),
        totalAttempts: results.length,
      };
    });
  }, [quizResults]);

  // إحصائيات الاستخدام حسب الفئات
  const usageByCategory = useMemo(() => {
    const categories = [...new Set(questions.map(q => q.category))];

    return categories.map(category => {
      const categoryQuestions = questions.filter(q => q.category === category);
      const totalUsage = categoryQuestions.reduce((sum, q) => sum + q.usageCount, 0);
      const avgSuccessRate = categoryQuestions.reduce((sum, q) => sum + q.successRate, 0) / categoryQuestions.length || 0;

      return {
        category,
        totalUsage,
        avgSuccessRate: Math.round(avgSuccessRate),
        questionCount: categoryQuestions.length,
      };
    }).sort((a, b) => b.totalUsage - a.totalUsage);
  }, [questions]);

  // اتجاهات الأداء مع مرور الوقت
  const performanceTrends = useMemo(() => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    return last30Days.map(date => {
      const dayResults = quizResults.filter(r =>
        r.completedAt.startsWith(date)
      );
      const avgScore = dayResults.reduce((sum, r) => sum + r.score, 0) / dayResults.length || 0;

      return {
        date,
        avgScore: Math.round(avgScore),
        totalQuizzes: dayResults.length,
      };
    });
  }, [quizResults]);

  // أفضل المتدربين
  const topPerformers = useMemo(() => {
    const userStats = quizResults.reduce((acc, result) => {
      if (!acc[result.userId]) {
        acc[result.userId] = {
          userId: result.userId,
          userName: result.userName,
          totalQuizzes: 0,
          totalScore: 0,
          avgScore: 0,
          bestScore: 0,
        };
      }

      acc[result.userId].totalQuizzes += 1;
      acc[result.userId].totalScore += result.score;
      acc[result.userId].bestScore = Math.max(acc[result.userId].bestScore, result.score);

      return acc;
    }, {} as Record<string, any>);

    // حساب المعدل
    Object.values(userStats).forEach((stats: any) => {
      stats.avgScore = Math.round(stats.totalScore / stats.totalQuizzes);
    });

    return Object.values(userStats)
      .sort((a: any, b: any) => b.avgScore - a.avgScore)
      .slice(0, 10);
  }, [quizResults]);

  // أسئلة الأكثر صعوبة
  const hardestQuestions = useMemo(() => {
    return questions
      .filter(q => q.usageCount > 0)
      .sort((a, b) => a.successRate - b.successRate)
      .slice(0, 10);
  }, [questions]);

  // أسئلة الأكثر استخداماً
  const mostUsedQuestions = useMemo(() => {
    return questions
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 10);
  }, [questions]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'سهل': return 'text-green-600 bg-green-100';
      case 'متوسط': return 'text-yellow-600 bg-yellow-100';
      case 'صعب': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">التحليلات المتقدمة</h3>
        <p className="text-gray-600 mb-6">
          احصل على تحليلات مفصلة وتقارير متقدمة مع الباقة المميزة
        </p>
        <motion.button
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          اشترك للحصول على التحليلات
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* رأس التحليلات */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 px-6 py-3 rounded-full mb-6">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <span className="text-blue-700 font-bold">التحليلات المتقدمة</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          رؤى شاملة للأداء والتقدم 📊
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          تحليلات مفصلة تساعدك على فهم الأداء وتحسين النتائج
        </p>
      </div>

      {/* فلاتر التحليلات */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {[
            { id: 'performance', label: 'الأداء', icon: Target },
            { id: 'usage', label: 'الاستخدام', icon: Activity },
            { id: 'difficulty', label: 'المستويات', icon: TrendingUp },
          ].map((metric) => {
            const Icon = metric.icon;
            return (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id as any)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedMetric === metric.id
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {metric.label}
              </button>
            );
          })}
        </div>

        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
        >
          <option value="week">آخر أسبوع</option>
          <option value="month">آخر شهر</option>
          <option value="year">آخر سنة</option>
        </select>
      </div>

      {/* الإحصائيات العامة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <motion.div
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">{generalStats.totalQuestions}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">إجمالي الأسئلة</h3>
          <p className="text-sm text-gray-600">في بنك الأسئلة</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">{generalStats.avgScore}%</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">متوسط النتيجة</h3>
          <p className="text-sm text-gray-600">على جميع الاختبارات</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-purple-600">{generalStats.totalUsers}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">إجمالي المتدربين</h3>
          <p className="text-sm text-gray-600">المشاركين في الاختبارات</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-orange-600">{generalStats.avgTimeSpent}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">متوسط الوقت</h3>
          <p className="text-sm text-gray-600">بالدقائق للاختبار</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-cyan-600" />
            </div>
            <span className="text-2xl font-bold text-cyan-600">{generalStats.totalQuizzes}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">إجمالي الاختبارات</h3>
          <p className="text-sm text-gray-600">تم إجراؤها</p>
        </motion.div>
      </div>

      {/* تحليلات حسب المعيار المحدد */}
      {selectedMetric === 'performance' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* الأداء حسب المستوى */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">الأداء حسب مستوى الصعوبة</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {performanceByDifficulty.map((item) => (
                <motion.div
                  key={item.difficulty}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-center mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(item.difficulty)}`}>
                      {item.difficulty}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">متوسط النتيجة</span>
                      <span className={`font-bold ${getScoreColor(item.avgScore)}`}>
                        {item.avgScore}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">معدل النجاح</span>
                      <span className={`font-bold ${item.passRate >= 70 ? 'text-green-600' : item.passRate >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {item.passRate}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">إجمالي المحاولات</span>
                      <span className="font-bold text-gray-900">{item.totalAttempts}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* أفضل المتدربين */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">أفضل المتدربين</h3>
            <div className="space-y-4">
              {topPerformers.slice(0, 5).map((performer: any, index) => (
                <motion.div
                  key={performer.userId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{performer.userName}</h4>
                      <p className="text-sm text-gray-600">{performer.totalQuizzes} اختبار مكتمل</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-orange-600">{performer.avgScore}%</div>
                    <div className="text-sm text-gray-600">متوسط النتيجة</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {selectedMetric === 'usage' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* الاستخدام حسب الفئات */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">الاستخدام حسب الفئات</h3>
            <div className="space-y-4">
              {usageByCategory.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{category.category}</h4>
                      <p className="text-sm text-gray-600">{category.questionCount} سؤال</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-blue-600">{category.totalUsage}</div>
                    <div className="text-sm text-gray-600">إجمالي الاستخدام</div>
                    <div className="text-sm text-green-600">{category.avgSuccessRate}% نجاح</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* الأسئلة الأكثر استخداماً */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">الأسئلة الأكثر استخداماً</h3>
            <div className="space-y-4">
              {mostUsedQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2">{question.question}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className={`px-2 py-1 rounded ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      <span>{question.category}</span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        {question.successRate}%
                      </span>
                    </div>
                  </div>
                  <div className="text-left ml-4">
                    <div className="text-2xl font-bold text-blue-600">{question.usageCount}</div>
                    <div className="text-sm text-gray-600">مرة استخدام</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {selectedMetric === 'difficulty' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* الأسئلة الأكثر صعوبة */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">الأسئلة الأكثر صعوبة</h3>
            <div className="space-y-4">
              {hardestQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2">{question.question}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className={`px-2 py-1 rounded ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      <span>{question.category}</span>
                      <span>{question.usageCount} استخدام</span>
                    </div>
                  </div>
                  <div className="text-left ml-4">
                    <div className="text-2xl font-bold text-red-600">{question.successRate}%</div>
                    <div className="text-sm text-gray-600">معدل النجاح</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* اتجاهات الأداء */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">اتجاهات الأداء (آخر 30 يوم)</h3>
            <div className="h-64 flex items-end justify-between gap-1">
              {performanceTrends.map((day, index) => (
                <motion.div
                  key={day.date}
                  initial={{ height: 0 }}
                  animate={{ height: `${day.avgScore}%` }}
                  transition={{ delay: index * 0.02, duration: 0.5 }}
                  className="bg-gradient-to-t from-blue-500 to-blue-600 rounded-t flex-1 relative group"
                  style={{ minHeight: day.avgScore * 2 }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {day.avgScore}% ({day.totalQuizzes} اختبار)
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-4">
              <span>منذ 30 يوم</span>
              <span>اليوم</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* أزرار التصدير والمشاركة */}
      <div className="flex justify-center gap-4">
        <motion.button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-5 h-5" />
          تصدير التقرير
        </motion.button>
        <motion.button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share className="w-5 h-5" />
          مشاركة التقرير
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AnalyticsSection;
