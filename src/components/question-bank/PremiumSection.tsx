'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  Star,
  Award,
  TrendingUp,
  BarChart3,
  Brain,
  Target,
  Clock,
  CheckCircle,
  Zap,
  Shield,
  Users,
  BookOpen,
  Play,
  CreditCard,
  Gift,
  Sparkles,
  Trophy,
  Medal,
  Gem,
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

interface PremiumSectionProps {
  questions: Question[];
  onQuizComplete?: (results: any) => void;
  isSubscribed?: boolean;
}

const PremiumSection = ({ questions, onQuizComplete, isSubscribed = false }: PremiumSectionProps) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [quizType, setQuizType] = useState<'certification' | 'practice' | 'challenge'>('practice');

  // أسئلة مميزة (باقي الأسئلة بعد المجانية)
  const premiumQuestions = useMemo(() => {
    return questions.slice(50); // باقي الأسئلة بعد الـ 50 المجانية
  }, [questions]);

  // إحصائيات الأسئلة المميزة
  const stats = useMemo(() => {
    const total = premiumQuestions.length;
    const easy = premiumQuestions.filter(q => q.difficulty === 'سهل').length;
    const medium = premiumQuestions.filter(q => q.difficulty === 'متوسط').length;
    const hard = premiumQuestions.filter(q => q.difficulty === 'صعب').length;
    const avgSuccessRate = premiumQuestions.reduce((sum, q) => sum + q.successRate, 0) / total || 0;
    const categories = [...new Set(premiumQuestions.map(q => q.category))];
    const aiGenerated = premiumQuestions.filter(q => q.aiGenerated).length;

    return { total, easy, medium, hard, avgSuccessRate, categories, aiGenerated };
  }, [premiumQuestions]);

  // بدء اختبار الشهادة
  const startCertificationQuiz = () => {
    if (!isSubscribed) {
      toast.error('يجب الاشتراك في الباقة المميزة للوصول لاختبارات الشهادة');
      return;
    }
    const shuffled = [...premiumQuestions].sort(() => Math.random() - 0.5);
    const quizQuestions = shuffled.slice(0, 15); // 15 سؤال للشهادة
    setSelectedQuestions(quizQuestions);
    setQuizType('certification');
    setShowQuiz(true);
  };

  // بدء اختبار تدريبي
  const startPracticeQuiz = () => {
    if (!isSubscribed) {
      toast.error('يجب الاشتراك في الباقة المميزة للوصول للاختبارات التدريبية');
      return;
    }
    const shuffled = [...premiumQuestions].sort(() => Math.random() - 0.5);
    const quizQuestions = shuffled.slice(0, 25); // 25 سؤال تدريبي
    setSelectedQuestions(quizQuestions);
    setQuizType('practice');
    setShowQuiz(true);
  };

  // بدء تحدي
  const startChallengeQuiz = () => {
    if (!isSubscribed) {
      toast.error('يجب الاشتراك في الباقة المميزة للوصول للتحديات');
      return;
    }
    const hardQuestions = premiumQuestions.filter(q => q.difficulty === 'صعب');
    const shuffled = [...hardQuestions].sort(() => Math.random() - 0.5);
    const quizQuestions = shuffled.slice(0, 10); // 10 أسئلة صعبة
    setSelectedQuestions(quizQuestions);
    setQuizType('challenge');
    setShowQuiz(true);
  };

  // بدء تجربة مجانية
  const startFreeTrial = () => {
    const shuffled = [...premiumQuestions].sort(() => Math.random() - 0.5);
    const quizQuestions = shuffled.slice(0, 5); // 5 أسئلة تجريبية
    setSelectedQuestions(quizQuestions);
    setQuizType('practice');
    setShowQuiz(true);
    toast.success('جرب الباقة المميزة مجاناً لمدة 7 أيام!');
  };

  const handleQuizComplete = (results: any) => {
    if (onQuizComplete) {
      onQuizComplete(results);
    }
    setShowQuiz(false);
    setSelectedQuestions([]);

    if (quizType === 'certification' && results.score >= 80) {
      toast.success('🎉 تهانينا! حصلت على شهادة معتمدة في المراجعة الداخلية');
    } else if (quizType === 'challenge' && results.score >= 90) {
      toast.success('🏆 أداء ممتاز! أكملت التحدي بنجاح');
    } else {
      toast.success('تم إنهاء الاختبار بنجاح!');
    }
  };

  if (showQuiz && selectedQuestions.length > 0) {
    const quizConfig = {
      certification: { title: 'اختبار الشهادة المعتمدة', timeLimit: 30, description: '15 سؤال • 30 دقيقة • شهادة معتمدة' },
      practice: { title: 'اختبار تدريبي مميز', timeLimit: 45, description: '25 سؤال • 45 دقيقة • تحليل مفصل' },
      challenge: { title: 'تحدي الأسئلة الصعبة', timeLimit: 20, description: '10 أسئلة صعبة • 20 دقيقة • تحدي' }
    };

    const config = quizConfig[quizType];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl shadow-lg p-6 mb-6 border border-purple-200">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">{config.title}</h2>
              </div>
              <p className="text-purple-700">{config.description}</p>
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
          timeLimit={config.timeLimit}
          showResults={true}
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
      {/* رأس القسم المميز */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-indigo-100 px-6 py-3 rounded-full mb-6">
          <Crown className="w-6 h-6 text-purple-600" />
          <span className="text-purple-700 font-bold">الأسئلة المميزة</span>
          <Sparkles className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ارتقِ بمهاراتك مع الباقة المميزة 💎
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          احصل على مئات الأسئلة المتخصصة والشهادات المعتمدة والتحليلات المتقدمة
        </p>
      </div>

      {/* حالة الاشتراك */}
      {!isSubscribed && (
        <motion.div
          className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200 text-center"
          whileHover={{ scale: 1.02 }}
        >
          <Crown className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-purple-800 mb-4">اشترك في الباقة المميزة</h3>
          <p className="text-purple-700 mb-6">
            احصل على جميع الميزات المميزة والشهادات المعتمدة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={startFreeTrial}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Gift className="w-6 h-6 inline ml-2" />
              جرب مجاناً لمدة 7 أيام
            </motion.button>
            <motion.button
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CreditCard className="w-6 h-6 inline ml-2" />
              اشترك الآن - 49 ريال
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* الإحصائيات المميزة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-purple-600">{stats.total}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">أسئلة متخصصة</h3>
          <p className="text-sm text-gray-600">محتوى متميز وحصري</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">{stats.aiGenerated}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">ذكاء اصطناعي</h3>
          <p className="text-sm text-gray-600">أسئلة مولدة بالذكاء الاصطناعي</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">{Math.round(stats.avgSuccessRate)}%</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">معدل النجاح</h3>
          <p className="text-sm text-gray-600">أداء متقدم</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-orange-600">{stats.categories.length}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">فئات متخصصة</h3>
          <p className="text-sm text-gray-600">مواضيع متقدمة</p>
        </motion.div>
      </div>

      {/* أنواع الاختبارات المميزة */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* اختبار الشهادة */}
        <motion.div
          className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">اختبار الشهادة المعتمدة</h3>
            <p className="text-gray-600 text-sm">احصل على شهادة معتمدة من IIA</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">15 سؤال متخصص</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-700">30 دقيقة</span>
            </div>
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-700">شهادة معتمدة</span>
            </div>
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <span className="text-sm text-gray-700">تقرير مفصل</span>
            </div>
          </div>

          <motion.button
            onClick={startCertificationQuiz}
            disabled={!isSubscribed}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              isSubscribed
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={isSubscribed ? { scale: 1.05 } : undefined}
            whileTap={isSubscribed ? { scale: 0.95 } : undefined}
          >
            {isSubscribed ? 'ابدأ اختبار الشهادة' : 'متاح للمشتركين فقط'}
          </motion.button>
        </motion.div>

        {/* اختبار تدريبي */}
        <motion.div
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">اختبار تدريبي شامل</h3>
            <p className="text-gray-600 text-sm">تدريب متقدم مع تحليلات مفصلة</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">25 سؤال متنوع</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-700">45 دقيقة</span>
            </div>
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-700">تحليلات متقدمة</span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span className="text-sm text-gray-700">تتبع التقدم</span>
            </div>
          </div>

          <motion.button
            onClick={startPracticeQuiz}
            disabled={!isSubscribed}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              isSubscribed
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={isSubscribed ? { scale: 1.05 } : undefined}
            whileTap={isSubscribed ? { scale: 0.95 } : undefined}
          >
            {isSubscribed ? 'ابدأ الاختبار التدريبي' : 'متاح للمشتركين فقط'}
          </motion.button>
        </motion.div>

        {/* تحدي الأسئلة الصعبة */}
        <motion.div
          className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border border-red-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">تحدي الأسئلة الصعبة</h3>
            <p className="text-gray-600 text-sm">اختبر نفسك مع أصعب الأسئلة</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">10 أسئلة صعبة</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-700">20 دقيقة</span>
            </div>
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-700">شارات وإنجازات</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-indigo-600" />
              <span className="text-sm text-gray-700">لوحة الصدارة</span>
            </div>
          </div>

          <motion.button
            onClick={startChallengeQuiz}
            disabled={!isSubscribed}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              isSubscribed
                ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={isSubscribed ? { scale: 1.05 } : undefined}
            whileTap={isSubscribed ? { scale: 0.95 } : undefined}
          >
            {isSubscribed ? 'ابدأ التحدي' : 'متاح للمشتركين فقط'}
          </motion.button>
        </motion.div>
      </div>

      {/* ميزات الباقة المميزة */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200">
        <h3 className="text-2xl font-bold text-purple-800 mb-8 text-center">ميزات الباقة المميزة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <span className="text-purple-700 font-medium">شهادات معتمدة</span>
              <p className="text-sm text-gray-600">شهادات معترف بها دولياً</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <span className="text-purple-700 font-medium">تحليلات متقدمة</span>
              <p className="text-sm text-gray-600">تقارير مفصلة للأداء</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <span className="text-purple-700 font-medium">ذكاء اصطناعي</span>
              <p className="text-sm text-gray-600">أسئلة مخصصة وذكية</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <span className="text-purple-700 font-medium">شارات وإنجازات</span>
              <p className="text-sm text-gray-600">نظام تحفيزي متكامل</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <span className="text-purple-700 font-medium">منافسة مع الآخرين</span>
              <p className="text-sm text-gray-600">لوحات الصدارة والتحديات</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <span className="text-purple-700 font-medium">دعم فني</span>
              <p className="text-sm text-gray-600">مساعدة على مدار 24 ساعة</p>
            </div>
          </div>
        </div>
      </div>

      {/* عرض خاص */}
      {!isSubscribed && (
        <motion.div
          className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-8 text-white text-center"
          whileHover={{ scale: 1.02 }}
        >
          <Gem className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">عرض خاص محدود الوقت!</h3>
          <p className="text-lg mb-6 opacity-90">
            اشترك الآن واحصل على شهر مجاني إضافي + شهادة مجانية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              اشترك بالعرض الخاص - 39 ريال
            </motion.button>
            <motion.button
              onClick={startFreeTrial}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              جرب مجاناً أولاً
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PremiumSection;
