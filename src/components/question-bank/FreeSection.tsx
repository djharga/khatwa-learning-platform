'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  Target,
  Award,
  TrendingUp,
  Users,
  BookOpen,
  Play,
  Star,
  Gift,
  Infinity,
} from 'lucide-react';
import QuestionBank from '@/components/fellowship/QuestionBank';
import toast from 'react-hot-toast';

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

interface FreeSectionProps {
  questions: Question[];
  onQuizComplete?: (results: any) => void;
}

const FreeSection = ({ questions, onQuizComplete }: FreeSectionProps) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  // أسئلة مجانية محدودة (50 سؤال)
  const freeQuestions = useMemo(() => {
    return questions.slice(0, 50);
  }, [questions]);

  // إحصائيات الأسئلة المجانية
  const stats = useMemo(() => {
    const total = freeQuestions.length;
    const easy = freeQuestions.filter(q => q.difficulty === 'سهل').length;
    const medium = freeQuestions.filter(q => q.difficulty === 'متوسط').length;
    const hard = freeQuestions.filter(q => q.difficulty === 'صعب').length;
    const avgSuccessRate = freeQuestions.reduce((sum, q) => sum + q.successRate, 0) / total || 0;
    const categories = [...new Set(freeQuestions.map(q => q.category))];

    return { total, easy, medium, hard, avgSuccessRate, categories };
  }, [freeQuestions]);

  // بدء اختبار عشوائي
  const startRandomQuiz = () => {
    const shuffled = [...freeQuestions].sort(() => Math.random() - 0.5);
    const quizQuestions = shuffled.slice(0, 20); // 20 سؤال عشوائي
    setSelectedQuestions(quizQuestions);
    setShowQuiz(true);
  };

  // بدء اختبار حسب المستوى
  const startDifficultyQuiz = (difficulty: 'سهل' | 'متوسط' | 'صعب') => {
    const filteredQuestions = freeQuestions.filter(q => q.difficulty === difficulty);
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    const quizQuestions = shuffled.slice(0, 15); // 15 سؤال من المستوى المحدد
    setSelectedQuestions(quizQuestions);
    setShowQuiz(true);
  };

  // بدء اختبار حسب الفئة
  const startCategoryQuiz = (category: string) => {
    const filteredQuestions = freeQuestions.filter(q => q.category === category);
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    const quizQuestions = shuffled.slice(0, 10); // 10 أسئلة من الفئة المحددة
    setSelectedQuestions(quizQuestions);
    setShowQuiz(true);
  };

  const handleQuizComplete = (results: any) => {
    if (onQuizComplete) {
      onQuizComplete(results);
    }
    setShowQuiz(false);
    setSelectedQuestions([]);
    toast.success('تم إنهاء الاختبار بنجاح! 🎉');
  };

  if (showQuiz && selectedQuestions.length > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">الاختبار المجاني</h2>
              <p className="text-gray-600 mt-1">{selectedQuestions.length} سؤال • بدون توقيت</p>
            </div>
            <motion.button
              onClick={() => {
                setShowQuiz(false);
                setSelectedQuestions([]);
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              العودة
            </motion.button>
          </div>
        </div>

        <QuestionBank
          questions={selectedQuestions}
          timeLimit={0} // بدون توقيت
          showResults
          onComplete={handleQuizComplete}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* رأس القسم المجاني */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 px-6 py-3 rounded-full mb-6 shadow-md"
        >
          <Gift className="w-6 h-6 text-green-600 dark:text-green-400" />
          <span className="text-green-700 dark:text-green-300 font-bold text-lg">الأسئلة المجانية</span>
        </motion.div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          اختبر معرفتك مجاناً 🎁
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          احصل على 50 سؤال متنوع مجاناً لاختبار مستواك في المراجعة الداخلية
        </p>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.total}</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">إجمالي الأسئلة</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">متاح مجاناً</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{Math.round(stats.avgSuccessRate)}%</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">متوسط النجاح</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">معدل الأداء العام</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.categories.length}</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">الفئات المتنوعة</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">مواضيع مختلفة</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800 shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
              <Infinity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">∞</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">محاولات غير محدودة</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">تدرب بدون قيود</p>
        </motion.div>
      </div>

      {/* توزيع المستويات */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100 dark:border-neutral-700 mb-8">
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">توزيع مستويات الصعوبة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">سهل</h4>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{stats.easy}</p>
            <p className="text-sm text-green-700 dark:text-green-400 mb-4">سؤال</p>
            <motion.button
              onClick={() => startDifficultyQuiz('سهل')}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ابدأ اختبار سهل
            </motion.button>
          </motion.div>

          <motion.div
            className="text-center p-6 bg-yellow-50 rounded-xl border border-yellow-200"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-yellow-600" />
            </div>
            <h4 className="text-lg font-bold text-yellow-800 mb-2">متوسط</h4>
            <p className="text-3xl font-bold text-yellow-600 mb-2">{stats.medium}</p>
            <p className="text-sm text-yellow-700 mb-4">سؤال</p>
            <motion.button
              onClick={() => startDifficultyQuiz('متوسط')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ابدأ اختبار متوسط
            </motion.button>
          </motion.div>

          <motion.div
            className="text-center p-6 bg-red-50 rounded-xl border border-red-200"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-red-600" />
            </div>
            <h4 className="text-lg font-bold text-red-800 mb-2">صعب</h4>
            <p className="text-3xl font-bold text-red-600 mb-2">{stats.hard}</p>
            <p className="text-sm text-red-700 mb-4">سؤال</p>
            <motion.button
              onClick={() => startDifficultyQuiz('صعب')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ابدأ اختبار صعب
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* الفئات المتاحة */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">الفئات التدريبية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.categories.map((category, index) => {
            const categoryQuestions = freeQuestions.filter(q => q.category === category);
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{category}</h4>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {categoryQuestions.length} سؤال
                  </span>
                </div>
                <motion.button
                  onClick={() => startCategoryQuiz(category)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ابدأ اختبار {category}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* زر الاختبار العشوائي */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={startRandomQuiz}
          className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 text-white px-8 lg:px-12 py-5 lg:py-6 rounded-2xl font-bold text-lg lg:text-xl transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3 mx-auto"
          whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
          whileTap={{ scale: 0.95 }}
        >
          <Star className="w-6 h-6 lg:w-8 lg:h-8" />
          <span className="hidden sm:inline">ابدأ اختبار عشوائي (20 سؤال)</span>
          <span className="sm:hidden">اختبار عشوائي</span>
          <Play className="w-6 h-6 lg:w-8 lg:h-8" />
        </motion.button>
        <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm lg:text-base">اختبار متنوع من جميع المستويات والفئات</p>
      </motion.div>

      {/* ميزات القسم المجاني */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 lg:p-8 border border-green-200 dark:border-green-800 shadow-lg">
        <h3 className="text-xl lg:text-2xl font-bold text-green-800 dark:text-green-300 mb-6 text-center">ميزات القسم المجاني</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shadow-sm">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-green-700 dark:text-green-300 font-medium">نتائج فورية</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shadow-sm">
              <Infinity className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-green-700 dark:text-green-300 font-medium">محاولات غير محدودة</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shadow-sm">
              <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-green-700 dark:text-green-300 font-medium">بدون توقيت</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shadow-sm">
              <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-green-700 dark:text-green-300 font-medium">تفسيرات مفصلة</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shadow-sm">
              <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-green-700 dark:text-green-300 font-medium">تصنيف حسب المستوى</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shadow-sm">
              <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-green-700 dark:text-green-300 font-medium">فئات متنوعة</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FreeSection;
