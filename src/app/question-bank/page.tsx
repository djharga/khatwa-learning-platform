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
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab && ['free', 'premium', 'questions', 'analytics', 'ai-tools', 'settings'].includes(tab)) {
      setActiveTab(tab);
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

  // المتغيرات المفقودة من الكود القديم
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  // إضافة الاستيرادات المفقودة
  const {
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    Download,
    Upload,
    CheckCircle,
    XCircle,
    AlertCircle,
    Clock,
    Target,
    TrendingUp,
    Users,
    Award,
    BookOpen,
    FileText,
    HelpCircle,
  } = require('lucide-react');

  const categories = useMemo(() => {
    const uniqueCategories = questions.map(q => q.category);
    return ['all', ...new Set(uniqueCategories)];
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           question.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDifficulty = difficultyFilter === 'all' || question.difficulty === difficultyFilter;
      const matchesCategory = categoryFilter === 'all' || question.category === categoryFilter;

      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [questions, searchTerm, difficultyFilter, categoryFilter]);

  const stats = useMemo(() => {
    const total = questions.length;
    const easy = questions.filter(q => q.difficulty === 'سهل').length;
    const medium = questions.filter(q => q.difficulty === 'متوسط').length;
    const hard = questions.filter(q => q.difficulty === 'صعب').length;
    const avgSuccessRate = questions.reduce((sum, q) => sum + q.successRate, 0) / total;
    const aiGenerated = questions.filter(q => q.aiGenerated).length;

    return { total, easy, medium, hard, avgSuccessRate, aiGenerated };
  }, [questions]);

  const handleCreateQuiz = () => {
    if (selectedQuestions.length < 5) {
      alert('يجب اختيار 5 أسئلة على الأقل لإنشاء اختبار');
      return;
    }
    setShowQuizModal(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'سهل': return 'bg-green-100 text-green-800';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800';
      case 'صعب': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 70) return 'text-green-600';
    if (rate >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              بنك الأسئلة التفاعلي المتطور
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نظام شامل لإدارة الأسئلة والاختبارات مع دعم الذكاء الاصطناعي والتحليلات المتقدمة
          </p>
        </motion.div>

        {/* التبويبات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            {[
              { id: 'free', label: 'الأسئلة المجانية', icon: Gift },
              { id: 'premium', label: 'الأسئلة المميزة', icon: Crown },
              { id: 'questions', label: 'إدارة الأسئلة', icon: BookOpen },
              { id: 'analytics', label: 'التحليلات', icon: BarChart3 },
              { id: 'ai-tools', label: 'الذكاء الاصطناعي', icon: Brain },
              { id: 'settings', label: 'الإعدادات', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي الأسئلة</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">أسئلة سهلة</p>
                <p className="text-3xl font-bold text-green-600">{stats.easy}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">أسئلة متوسطة</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.medium}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">أسئلة صعبة</p>
                <p className="text-3xl font-bold text-red-600">{stats.hard}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">متوسط النجاح</p>
                <p className="text-3xl font-bold text-purple-600">{Math.round(stats.avgSuccessRate)}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">مولدة بالذكاء الاصطناعي</p>
                <p className="text-3xl font-bold text-indigo-600">{stats.aiGenerated}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
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

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">تحليلات الأداء</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* رسوم بيانية وإحصائيات */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-blue-900 mb-4">توزيع المستويات</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-800">سهل</span>
                    <span className="font-bold text-blue-900">{stats.easy}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-800">متوسط</span>
                    <span className="font-bold text-blue-900">{stats.medium}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-800">صعب</span>
                    <span className="font-bold text-blue-900">{stats.hard}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-green-900 mb-4">معدلات النجاح</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">{Math.round(stats.avgSuccessRate)}%</div>
                  <p className="text-sm text-green-800">متوسط معدل النجاح العام</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-purple-900 mb-4">الأسئلة المولدة بالذكاء الاصطناعي</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">{stats.aiGenerated}</div>
                  <p className="text-sm text-purple-800">سؤال مولد تلقائياً</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'ai-tools' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <div className="text-center mb-8">
              <Brain className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">أدوات الذكاء الاصطناعي</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                استخدم قوة الذكاء الاصطناعي لإنشاء أسئلة ذكية وتحليلات متقدمة
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.button
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-6 rounded-2xl text-right transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-between">
                  <Brain className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">توليد أسئلة ذكية</h3>
                    <p className="text-purple-100">أنشئ أسئلة مخصصة بناءً على المحتوى والمستوى</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white p-6 rounded-2xl text-right transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-between">
                  <Target className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">اختبارات مخصصة</h3>
                    <p className="text-blue-100">أنشئ اختبارات تتناسب مع مستوى المتعلم</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white p-6 rounded-2xl text-right transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-between">
                  <BarChart3 className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">تحليلات ذكية</h3>
                    <p className="text-green-100">احصل على رؤى متقدمة حول أداء المتعلمين</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white p-6 rounded-2xl text-right transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-between">
                  <HelpCircle className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">مساعد تعليمي</h3>
                    <p className="text-orange-100">احصل على اقتراحات لتحسين المحتوى التعليمي</p>
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">إعدادات بنك الأسئلة</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">إعدادات عامة</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">تفعيل الذكاء الاصطناعي</span>
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">إشعارات التحديثات</span>
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">نسخ احتياطي تلقائي</span>
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">إعدادات الاختبارات</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">الوقت الافتراضي للاختبار (بالدقائق)</label>
                      <input
                        type="number"
                        defaultValue={30}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">عدد الأسئلة الافتراضي</label>
                      <input
                        type="number"
                        defaultValue={20}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">إدارة البيانات</h3>
                  <div className="space-y-4">
                    <motion.button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Upload className="w-5 h-5" />
                        استيراد أسئلة من ملف
                      </div>
                    </motion.button>

                    <motion.button
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Download className="w-5 h-5" />
                        تصدير جميع الأسئلة
                      </div>
                    </motion.button>

                    <motion.button
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Trash2 className="w-5 h-5" />
                        حذف جميع البيانات
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* نافذة إنشاء اختبار */}
        {showQuizModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8"
            >
              <div className="text-center mb-6">
                <Target className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">إنشاء اختبار جديد</h3>
                <p className="text-gray-600 mt-2">تم اختيار {selectedQuestions.length} سؤال للاختبار</p>
              </div>

              <QuestionBank
                questions={selectedQuestions}
                timeLimit={30}
                showResults
                onComplete={(results) => {
                  console.log('Quiz completed:', results);
                  setShowQuizModal(false);
                }}
              />

              <div className="flex justify-center mt-6">
                <motion.button
                  onClick={() => setShowQuizModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  إغلاق
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuestionBankPage;
