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
      <div className="text-center">
        <div className="inline-flex items-center gap-3 bg-green-100 px-6 py-3 rounded-full mb-6">
          <Gift className="w-6 h-6 text-green-600" />
          <span className="text-green-700 font-bold">الأسئلة المجانية</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          اختبر معرفتك مجاناً 🎁
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          احصل على 50 سؤال متنوع مجاناً لاختبار مستواك في المراجعة الداخلية
        </p>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">{stats.total}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">إجمالي الأسئلة</h3>
          <p className="text-sm text-gray-600">متاح مجاناً</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">{Math.round(stats.avgSuccessRate)}%</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">متوسط النجاح</h3>
          <p className="text-sm text-gray-600">معدل الأداء العام</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-purple-600">{stats.categories.length}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">الفئات المتنوعة</h3>
          <p className="text-sm text-gray-600">مواضيع مختلفة</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Infinity className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-orange-600">∞</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">محاولات غير محدودة</h3>
          <p className="text-sm text-gray-600">تدرب بدون قيود</p>
        </motion.div>
      </div>

      {/* توزيع المستويات */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">توزيع مستويات الصعوبة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="text-center p-6 bg-green-50 rounded-xl border border-green-200"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-lg font-bold text-green-800 mb-2">سهل</h4>
            <p className="text-3xl font-bold text-green-600 mb-2">{stats.easy}</p>
            <p className="text-sm text-green-700 mb-4">سؤال</p>
            <motion.button
              onClick={() => startDifficultyQuiz('سهل')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
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
        whileHover={{ scale: 1.05 }}
      >
        <motion.button
          onClick={startRandomQuiz}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Star className="w-8 h-8" />
          ابدأ اختبار عشوائي (20 سؤال)
          <Play className="w-8 h-8" />
        </motion.button>
        <p className="text-gray-600 mt-4">اختبار متنوع من جميع المستويات والفئات</p>
      </motion.div>

      {/* ميزات القسم المجاني */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
        <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">ميزات القسم المجاني</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-green-700 font-medium">نتائج فورية</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Infinity className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-green-700 font-medium">محاولات غير محدودة</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-green-700 font-medium">بدون توقيت</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-green-700 font-medium">تفسيرات مفصلة</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-green-700 font-medium">تصنيف حسب المستوى</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-green-700 font-medium">فئات متنوعة</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FreeSection;
