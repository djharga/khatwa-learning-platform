'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Target,
  BarChart3,
  Brain,
  Settings,
  Crown,
  Gift,
  Sparkles,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  FileText,
} from 'lucide-react';

// استيراد المكونات الجديدة
import QuestionManager from '@/components/question-bank/QuestionManager';
import FreeSection from '@/components/question-bank/FreeSection';
import PremiumSection from '@/components/question-bank/PremiumSection';
import AnalyticsSection from '@/components/question-bank/AnalyticsSection';
import AISection from '@/components/question-bank/AISection';
import QuestionBank from '@/components/fellowship/QuestionBank';

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
  courseId?: string;
  axisId?: string;
  images?: string[];
  charts?: string[];
  createdAt: string;
  updatedAt: string;
  usageCount: number;
  successRate: number;
  aiGenerated?: boolean;
  isActive: boolean;
}

interface Course {
  id: string;
  name: string;
  axes: { id: string; name: string }[];
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

const QuestionBankPage = () => {
  const [activeTab, setActiveTab] = useState('free');
  const [isSubscribed, setIsSubscribed] = useState(false); // يجب ربطه بنظام الاشتراك الحقيقي

  // قراءة معلمة التبويب من URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tab = urlParams.get('tab');
      if (tab && ['free', 'premium', 'questions', 'analytics', 'ai-tools'].includes(tab)) {
        setActiveTab(tab);
      }
    }
  }, []);

  // بيانات تجريبية للدورات
  const courses: Course[] = [
    {
      id: 'basics',
      name: 'أساسيات المراجعة الداخلية',
      axes: [
        { id: 'axis1', name: 'مفهوم المراجعة الداخلية' },
        { id: 'axis2', name: 'إطار عمل المراجعة' },
        { id: 'axis3', name: 'عمليات المراجعة' }
      ]
    },
    {
      id: 'advanced',
      name: 'المراجعة المتقدمة',
      axes: [
        { id: 'axis4', name: 'تحليل البيانات' },
        { id: 'axis5', name: 'إدارة المخاطر المتقدمة' }
      ]
    }
  ];

  // بيانات تجريبية للأسئلة (موسعة)
  const [questions, setQuestions] = useState<Question[]>([
    // أسئلة مجانية (أول 50)
    {
      id: '1',
      question: 'ما هو الدور الرئيسي للمراجع الداخلي في المنظمة؟',
      options: [
        'تحسين العمليات والرقابة الداخلية',
        'إعداد القوائم المالية',
        'التسويق للمنظمة',
        'إدارة الموارد البشرية'
      ],
      correctAnswer: 0,
      explanation: 'المراجع الداخلي يهدف إلى تحسين العمليات وتعزيز فعالية الرقابة الداخلية في المنظمة.',
      difficulty: 'سهل',
      category: 'الأساسيات',
      points: 10,
      tags: ['مراجعة داخلية', 'دور المراجع'],
      courseId: 'basics',
      axisId: 'axis1',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      usageCount: 245,
      successRate: 78,
      aiGenerated: false,
      isActive: true
    },
    {
      id: '2',
      question: 'ما هي المعايير الدولية الرئيسية للمراجعة الداخلية؟',
      options: [
        'معايير الأخلاقيات والكفاءة',
        'معايير الجودة فقط',
        'معايير الكمية فقط',
        'معايير السرعة فقط'
      ],
      correctAnswer: 0,
      explanation: 'تشمل المعايير الدولية للمراجعة الداخلية معايير الأخلاقيات، الكفاءة، الأداء والجودة.',
      difficulty: 'متوسط',
      category: 'المعايير الدولية',
      points: 15,
      tags: ['معايير دولية', 'IIA'],
      courseId: 'basics',
      axisId: 'axis2',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
      usageCount: 189,
      successRate: 65,
      aiGenerated: true,
      isActive: true
    },
    // إضافة المزيد من الأسئلة للوصول إلى 50 سؤال مجاني
    ...Array.from({ length: 48 }, (_, i) => ({
      id: `${i + 3}`,
      question: `سؤال تجريبي مجاني رقم ${i + 3}`,
      options: ['الإجابة الصحيحة', 'إجابة خاطئة 1', 'إجابة خاطئة 2', 'إجابة خاطئة 3'],
      correctAnswer: 0,
      explanation: 'تفسير تجريبي للسؤال',
      difficulty: (['سهل', 'متوسط', 'صعب'] as const)[i % 3],
      category: ['الأساسيات', 'المعايير الدولية', 'إدارة المخاطر'][i % 3],
      points: 10 + (i % 3) * 5,
      tags: ['تجريبي'],
      courseId: ['basics', 'advanced'][i % 2],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      usageCount: Math.floor(Math.random() * 200) + 50,
      successRate: Math.floor(Math.random() * 40) + 50,
      aiGenerated: Math.random() > 0.5,
      isActive: true
    })),
    // أسئلة مميزة (باقي الأسئلة)
    ...Array.from({ length: 150 }, (_, i) => ({
      id: `premium_${i + 1}`,
      question: `سؤال مميز متقدم رقم ${i + 1}`,
      options: ['الإجابة الصحيحة', 'إجابة خاطئة 1', 'إجابة خاطئة 2', 'إجابة خاطئة 3'],
      correctAnswer: 0,
      explanation: 'تفسير مفصل للسؤال المتقدم',
      difficulty: (['سهل', 'متوسط', 'صعب'] as const)[i % 3],
      category: ['تحليل البيانات', 'إدارة المخاطر المتقدمة', 'المعايير الدولية', 'الرقابة المالية'][i % 4],
      points: 15 + (i % 3) * 5,
      tags: ['مميز', 'متقدم'],
      courseId: ['advanced', 'basics'][i % 2],
      images: i % 10 === 0 ? ['https://example.com/image.jpg'] : undefined,
      charts: i % 15 === 0 ? ['https://example.com/chart.jpg'] : undefined,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      usageCount: Math.floor(Math.random() * 100) + 10,
      successRate: Math.floor(Math.random() * 30) + 60,
      aiGenerated: Math.random() > 0.3,
      isActive: true
    }))
  ]);

  // بيانات تجريبية لنتائج الاختبارات
  const quizResults: QuizResult[] = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: `result_${i + 1}`,
      userId: `user_${(i % 10) + 1}`,
      userName: `المتدرب ${(i % 10) + 1}`,
      score: Math.floor(Math.random() * 40) + 60,
      totalQuestions: 20,
      correctAnswers: Math.floor(Math.random() * 15) + 5,
      timeSpent: Math.floor(Math.random() * 1800) + 600,
      completedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      quizType: (['free', 'premium', 'certification'] as const)[i % 3],
      difficulty: (['سهل', 'متوسط', 'صعب'] as const)[i % 3]
    }));
  }, []);

  // دوال إدارة الأسئلة
  const handleSaveQuestion = (question: Question) => {
    setQuestions(prev => {
      const existingIndex = prev.findIndex(q => q.id === question.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = question;
        return updated;
      } else {
        return [...prev, question];
      }
    });
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const handleBulkImport = (importedQuestions: Question[]) => {
    setQuestions(prev => [...prev, ...importedQuestions]);
  };

  const handleBulkExport = (questionsToExport: Question[]) => {
    const dataStr = JSON.stringify(questionsToExport, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'questions_export.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // دوال الذكاء الاصطناعي (محاكاة)
  const handleGenerateQuestions = async (params: any) => {
    // محاكاة توليد الأسئلة
    const generatedQuestions: Question[] = Array.from({ length: params.count }, (_, i) => ({
      id: `ai_${Date.now()}_${i}`,
      question: `سؤال مولد بالذكاء الاصطناعي حول ${params.topic} - ${i + 1}`,
      options: ['الإجابة الصحيحة', 'إجابة خاطئة 1', 'إجابة خاطئة 2', 'إجابة خاطئة 3'],
      correctAnswer: 0,
      explanation: params.includeExplanations ? 'تفسير مفصل مولد بالذكاء الاصطناعي' : '',
      difficulty: params.difficulty,
      category: params.category || 'مولد بالذكاء الاصطناعي',
      points: 10,
      tags: ['ذكاء اصطناعي', params.topic],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usageCount: 0,
      successRate: 0,
      aiGenerated: true,
      isActive: true
    }));

    // إضافة الأسئلة المولدة للقائمة
    setQuestions(prev => [...prev, ...generatedQuestions]);

    return generatedQuestions;
  };

  const handleAnalyzePerformance = async (userId: string) => {
    // محاكاة تحليل الأداء
    return {
      strengths: ['فهم جيد للأساسيات', 'سرعة في الإجابة', 'دقة عالية في الأسئلة السهلة'],
      weaknesses: ['صعوبة في الأسئلة المتقدمة', 'حاجة للمزيد من التدريب في إدارة المخاطر'],
      recommendedTopics: ['إدارة المخاطر المتقدمة', 'تحليل البيانات', 'المعايير الدولية'],
      improvementScore: 75
    };
  };

  const handleGetRecommendations = async (userId: string) => {
    // محاكاة التوصيات
    return [
      {
        type: 'topic' as const,
        title: 'ركز على إدارة المخاطر',
        description: 'تحتاج لتحسين مهاراتك في هذا المجال',
        priority: 'high' as const
      },
      {
        type: 'difficulty' as const,
        title: 'زيادة مستوى الصعوبة تدريجياً',
        description: 'جرب الأسئلة الأصعب لتحسين أدائك',
        priority: 'medium' as const
      },
      {
        type: 'practice' as const,
        title: 'تدريب يومي منتظم',
        description: 'مارس يومياً لتحقيق أفضل النتائج',
        priority: 'medium' as const
      }
    ];
  };

  const handleQuizComplete = (results: any) => {
    console.log('تم إنهاء الاختبار:', results);
    // يمكن إضافة منطق حفظ النتائج هنا
  };

  // الإحصائيات
  const stats = useMemo(() => {
    const total = questions.length;
    const easy = questions.filter(q => q.difficulty === 'سهل').length;
    const medium = questions.filter(q => q.difficulty === 'متوسط').length;
    const hard = questions.filter(q => q.difficulty === 'صعب').length;
    const avgSuccessRate = questions.reduce((sum, q) => sum + q.successRate, 0) / total;
    const aiGenerated = questions.filter(q => q.aiGenerated).length;

    return { total, easy, medium, hard, avgSuccessRate, aiGenerated };
  }, [questions]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-full mb-6">
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">بنك الأسئلة المتطور</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              بنك الأسئلة التفاعلي المتطور
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            نظام شامل لإدارة الأسئلة والاختبارات مع دعم الذكاء الاصطناعي والتحليلات المتقدمة
          </p>
        </motion.div>

        {/* التبويبات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8 overflow-x-auto"
        >
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-2 shadow-lg border border-gray-100 dark:border-neutral-700 inline-flex gap-2">
            {[
              { id: 'free', label: 'الأسئلة المجانية', icon: Gift, color: 'from-green-500 to-emerald-500' },
              { id: 'premium', label: 'الأسئلة المميزة', icon: Crown, color: 'from-yellow-500 to-orange-500' },
              { id: 'questions', label: 'إدارة الأسئلة', icon: BookOpen, color: 'from-blue-500 to-indigo-500' },
              { id: 'analytics', label: 'التحليلات', icon: BarChart3, color: 'from-purple-500 to-pink-500' },
              { id: 'ai-tools', label: 'الذكاء الاصطناعي', icon: Brain, color: 'from-indigo-500 to-purple-500' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab.id as 'free' | 'premium' | 'questions' | 'analytics' | 'ai-tools');
                  }}
                  className={`px-4 lg:px-6 py-3 lg:py-4 rounded-xl font-bold text-sm lg:text-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-neutral-700'
                  }`}
                  whileHover={{ scale: isActive ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* الإحصائيات */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-4 lg:p-6 border border-gray-100 dark:border-neutral-700 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm mb-1">إجمالي الأسئلة</p>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-4 lg:p-6 border border-gray-100 dark:border-neutral-700 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm mb-1">أسئلة سهلة</p>
                <p className="text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400">{stats.easy}</p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-4 lg:p-6 border border-gray-100 dark:border-neutral-700 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm mb-1">أسئلة متوسطة</p>
                <p className="text-2xl lg:text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.medium}</p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-4 lg:p-6 border border-gray-100 dark:border-neutral-700 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm mb-1">أسئلة صعبة</p>
                <p className="text-2xl lg:text-3xl font-bold text-red-600 dark:text-red-400">{stats.hard}</p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <XCircle className="w-5 h-5 lg:w-6 lg:h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-4 lg:p-6 border border-gray-100 dark:border-neutral-700 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm mb-1">متوسط النجاح</p>
                <p className="text-2xl lg:text-3xl font-bold text-purple-600 dark:text-purple-400">{Math.round(stats.avgSuccessRate)}%</p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-4 lg:p-6 border border-gray-100 dark:border-neutral-700 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm mb-1">مولدة بالذكاء الاصطناعي</p>
                <p className="text-2xl lg:text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.aiGenerated}</p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* محتوى التبويب النشط */}
        {activeTab === 'free' && (
          <FreeSection
            questions={questions}
            onQuizComplete={handleQuizComplete}
          />
        )}

        {activeTab === 'premium' && (
          <PremiumSection
            questions={questions}
            onQuizComplete={handleQuizComplete}
            isSubscribed={isSubscribed}
          />
        )}

        {activeTab === 'questions' && (
          <QuestionManager
            questions={questions}
            courses={courses}
            onSave={handleSaveQuestion}
            onDelete={handleDeleteQuestion}
            onBulkImport={handleBulkImport}
            onBulkExport={handleBulkExport}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsSection
            questions={questions}
            quizResults={quizResults}
            isSubscribed={isSubscribed}
          />
        )}

        {activeTab === 'ai-tools' && (
          <AISection
            questions={questions}
            onGenerateQuestions={handleGenerateQuestions}
            onAnalyzePerformance={handleAnalyzePerformance}
            onGetRecommendations={handleGetRecommendations}
            isSubscribed={isSubscribed}
          />
        )}


      </div>
    </div>
  );
};

export default QuestionBankPage;
