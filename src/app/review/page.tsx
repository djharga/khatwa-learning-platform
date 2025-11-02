'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, FileText, BarChart3, TrendingUp, Target, Brain, Settings, Crown, Gift, Sparkles, CheckCircle, XCircle, AlertCircle, Calendar, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import QuestionManager from '@/components/question-bank/QuestionManager';
import FreeSection from '@/components/question-bank/FreeSection';
import PremiumSection from '@/components/question-bank/PremiumSection';
import AnalyticsSection from '@/components/question-bank/AnalyticsSection';
import AISection from '@/components/question-bank/AISection';

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

interface Course {
  id: string;
  name: string;
  axes: { id: string; name: string }[];
}

export default function ReviewHubPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'tools' | 'results' | 'analytics'>('tools');
  const [questionBankTab, setQuestionBankTab] = useState<'free' | 'premium' | 'questions' | 'analytics' | 'ai-tools'>('free');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // بيانات تجريبية
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

  const [questions] = useState<Question[]>([]);
  const [quizResults] = useState<QuizResult[]>([]);

  const handleQuizComplete = (result: any) => {
    console.log('Quiz completed:', result);
  };

  const handleSaveQuestion = (question: Question) => {
    console.log('Save question:', question);
  };

  const handleDeleteQuestion = (questionId: string) => {
    console.log('Delete question:', questionId);
  };

  const handleBulkImport = (importedQuestions: Question[]) => {
    console.log('Import questions:', importedQuestions);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-2"
          >
            مركز المراجعة الموحد
          </motion.h1>
          <p className="text-xl text-gray-600">
            كل ما يخص المراجعة في شاشة واحدة - الأدوات، النتائج، والتحليلات
          </p>
        </div>

        {/* Main Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 inline-flex gap-2">
            {[
              { id: 'tools', label: 'الأدوات', icon: Settings },
              { id: 'results', label: 'النتائج', icon: FileText },
              { id: 'analytics', label: 'التحليلات', icon: BarChart3 },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === t.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            {activeTab === 'tools' && (
              <div className="p-6">
                {/* Question Bank Sub-tabs */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 bg-gray-50 rounded-xl p-2">
                    {[
                      { id: 'free', label: 'بنك الأسئلة المجاني', icon: BookOpen },
                      { id: 'premium', label: 'بنك الأسئلة المميز', icon: Crown },
                      { id: 'questions', label: 'إدارة الأسئلة', icon: Settings },
                      { id: 'analytics', label: 'تحليلات الأسئلة', icon: BarChart3 },
                      { id: 'ai-tools', label: 'أدوات الذكاء الاصطناعي', icon: Brain },
                    ].map((t) => {
                      const Icon = t.icon;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setQuestionBankTab(t.id as any)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            questionBankTab === t.id
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question Bank Content */}
                <AnimatePresence mode="wait">
                  {questionBankTab === 'free' && (
                    <motion.div
                      key="free"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <FreeSection
                        questions={questions}
                        onQuizComplete={handleQuizComplete}
                      />
                    </motion.div>
                  )}
                  {questionBankTab === 'premium' && (
                    <motion.div
                      key="premium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <PremiumSection
                        questions={questions}
                        onQuizComplete={handleQuizComplete}
                        isSubscribed={isSubscribed}
                      />
                    </motion.div>
                  )}
                  {questionBankTab === 'questions' && (
                    <motion.div
                      key="questions"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <QuestionManager
                        questions={questions}
                        courses={courses}
                        onSave={handleSaveQuestion}
                        onDelete={handleDeleteQuestion}
                        onBulkImport={handleBulkImport}
                        onBulkExport={handleBulkExport}
                      />
                    </motion.div>
                  )}
                  {questionBankTab === 'analytics' && (
                    <motion.div
                      key="analytics"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <AnalyticsSection
                        questions={questions}
                        quizResults={quizResults}
                        isSubscribed={isSubscribed}
                      />
                    </motion.div>
                  )}
                  {questionBankTab === 'ai-tools' && (
                    <motion.div
                      key="ai-tools"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <AISection />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {activeTab === 'results' && (
              <div className="p-6">
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">النتائج والتقييمات</h3>
                  <p className="text-gray-600 mb-6">
                    عرض نتائج الاختبارات والتقييمات الخاصة بك
                  </p>
                  <button
                    onClick={() => router.push('/student/exam')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    عرض نتائج الاختبارات
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="p-6">
                <AnalyticsSection
                  questions={questions}
                  quizResults={quizResults}
                  isSubscribed={isSubscribed}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
