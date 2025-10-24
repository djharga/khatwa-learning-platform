'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Sparkles,
  Wand2,
  Lightbulb,
  Target,
  BookOpen,
  Zap,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Settings,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Upload,
  MessageSquare,
  TrendingUp,
  Award,
  Star,
} from 'lucide-react';
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

interface AISectionProps {
  questions: Question[];
  onGenerateQuestions: (params: GenerateParams) => Promise<Question[]>;
  onAnalyzePerformance: (userId: string) => Promise<AnalysisResult>;
  onGetRecommendations: (userId: string) => Promise<Recommendation[]>;
  isSubscribed?: boolean;
}

interface GenerateParams {
  topic: string;
  difficulty: 'سهل' | 'متوسط' | 'صعب';
  count: number;
  category: string;
  includeExplanations: boolean;
}

interface AnalysisResult {
  strengths: string[];
  weaknesses: string[];
  recommendedTopics: string[];
  improvementScore: number;
}

interface Recommendation {
  type: 'topic' | 'difficulty' | 'practice';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

const AISection = ({
  questions,
  onGenerateQuestions,
  onAnalyzePerformance,
  onGetRecommendations,
  isSubscribed = false
}: AISectionProps) => {
  const [activeTab, setActiveTab] = useState<'generate' | 'analyze' | 'recommend' | 'settings'>('generate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  // إعدادات توليد الأسئلة
  const [generateParams, setGenerateParams] = useState<GenerateParams>({
    topic: '',
    difficulty: 'متوسط',
    count: 5,
    category: '',
    includeExplanations: true,
  });

  // إحصائيات الذكاء الاصطناعي
  const aiStats = useMemo(() => {
    const aiQuestions = questions.filter(q => q.aiGenerated);
    const totalAI = aiQuestions.length;
    const avgSuccessRate = aiQuestions.reduce((sum, q) => sum + q.successRate, 0) / totalAI || 0;
    const categories = [...new Set(aiQuestions.map(q => q.category))];

    return {
      totalAI,
      avgSuccessRate: Math.round(avgSuccessRate),
      categories,
      usageRate: totalAI > 0 ? Math.round((totalAI / questions.length) * 100) : 0,
    };
  }, [questions]);

  // توليد أسئلة ذكية
  const handleGenerateQuestions = async () => {
    if (!generateParams.topic.trim()) {
      toast.error('يجب إدخال موضوع الأسئلة');
      return;
    }

    if (!isSubscribed) {
      toast.error('يجب الاشتراك في الباقة المميزة لاستخدام الذكاء الاصطناعي');
      return;
    }

    setIsGenerating(true);
    try {
      const newQuestions = await onGenerateQuestions(generateParams);
      setGeneratedQuestions(newQuestions);
      toast.success(`تم توليد ${newQuestions.length} سؤال بنجاح!`);
    } catch (error) {
      toast.error('حدث خطأ في توليد الأسئلة');
    } finally {
      setIsGenerating(false);
    }
  };

  // تحليل الأداء
  const handleAnalyzePerformance = async () => {
    if (!isSubscribed) {
      toast.error('يجب الاشتراك في الباقة المميزة لتحليل الأداء');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await onAnalyzePerformance('current-user-id'); // يجب استبداله بمعرف المستخدم الحالي
      setAnalysisResult(result);
      toast.success('تم تحليل الأداء بنجاح!');
    } catch (error) {
      toast.error('حدث خطأ في تحليل الأداء');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // الحصول على التوصيات
  const handleGetRecommendations = async () => {
    if (!isSubscribed) {
      toast.error('يجب الاشتراك في الباقة المميزة للحصول على التوصيات');
      return;
    }

    try {
      const recs = await onGetRecommendations('current-user-id'); // يجب استبداله بمعرف المستخدم الحالي
      setRecommendations(recs);
      toast.success('تم الحصول على التوصيات!');
    } catch (error) {
      toast.error('حدث خطأ في الحصول على التوصيات');
    }
  };

  // حفظ الأسئلة المولدة
  const saveGeneratedQuestions = () => {
    // هنا يمكن إضافة منطق حفظ الأسئلة في قاعدة البيانات
    toast.success('تم حفظ الأسئلة بنجاح!');
    setGeneratedQuestions([]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'سهل': return 'bg-green-100 text-green-800';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800';
      case 'صعب': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">أدوات الذكاء الاصطناعي</h3>
        <p className="text-gray-600 mb-6">
          احصل على أسئلة مخصصة وتحليلات ذكية مع الباقة المميزة
        </p>
        <motion.button
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          اشترك للحصول على الذكاء الاصطناعي
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
      {/* رأس قسم الذكاء الاصطناعي */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-indigo-100 px-6 py-3 rounded-full mb-6">
          <Brain className="w-6 h-6 text-purple-600" />
          <span className="text-purple-700 font-bold">الذكاء الاصطناعي المتقدم</span>
          <Sparkles className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          قوة الذكاء الاصطناعي في خدمة التعلم 🤖
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          أسئلة مخصصة، تحليلات ذكية، وتوصيات شخصية لتحسين الأداء
        </p>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-purple-600">{aiStats.totalAI}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">أسئلة مولدة</h3>
          <p className="text-sm text-gray-600">بالذكاء الاصطناعي</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">{aiStats.avgSuccessRate}%</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">معدل النجاح</h3>
          <p className="text-sm text-gray-600">للأسئلة المولدة</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">{aiStats.categories.length}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">الفئات المتاحة</h3>
          <p className="text-sm text-gray-600">للتوليد الذكي</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-orange-600">{aiStats.usageRate}%</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">معدل الاستخدام</h3>
          <p className="text-sm text-gray-600">للذكاء الاصطناعي</p>
        </motion.div>
      </div>

      {/* التبويبات */}
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
          {[
            { id: 'generate', label: 'توليد أسئلة', icon: Wand2 },
            { id: 'analyze', label: 'تحليل الأداء', icon: TrendingUp },
            { id: 'recommend', label: 'التوصيات', icon: Lightbulb },
            { id: 'settings', label: 'الإعدادات', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
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
      </div>

      {/* محتوى التبويب النشط */}
      {activeTab === 'generate' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* نموذج توليد الأسئلة */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Wand2 className="w-8 h-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900">توليد أسئلة ذكية</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الموضوع *
                </label>
                <input
                  type="text"
                  value={generateParams.topic}
                  onChange={(e) => setGenerateParams({...generateParams, topic: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="مثال: المراجعة الداخلية، إدارة المخاطر..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الفئة
                </label>
                <input
                  type="text"
                  value={generateParams.category}
                  onChange={(e) => setGenerateParams({...generateParams, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="مثال: الأساسيات، المتقدمة..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مستوى الصعوبة
                </label>
                <select
                  value={generateParams.difficulty}
                  onChange={(e) => setGenerateParams({...generateParams, difficulty: e.target.value as any})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="سهل">سهل</option>
                  <option value="متوسط">متوسط</option>
                  <option value="صعب">صعب</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عدد الأسئلة
                </label>
                <select
                  value={generateParams.count}
                  onChange={(e) => setGenerateParams({...generateParams, count: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value={5}>5 أسئلة</option>
                  <option value={10}>10 أسئلة</option>
                  <option value={15}>15 أسئلة</option>
                  <option value={20}>20 سؤال</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={generateParams.includeExplanations}
                  onChange={(e) => setGenerateParams({...generateParams, includeExplanations: e.target.checked})}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">تضمين تفسيرات للإجابات</span>
              </label>
            </div>

            <motion.button
              onClick={handleGenerateQuestions}
              disabled={isGenerating}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                isGenerating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
              }`}
              whileHover={!isGenerating ? { scale: 1.02 } : undefined}
              whileTap={!isGenerating ? { scale: 0.98 } : undefined}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center gap-3">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  جاري التوليد...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Wand2 className="w-6 h-6" />
                  توليد الأسئلة الذكية
                </div>
              )}
            </motion.button>
          </div>

          {/* الأسئلة المولدة */}
          {generatedQuestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">الأسئلة المولدة ({generatedQuestions.length})</h3>
                <motion.button
                  onClick={saveGeneratedQuestions}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" />
                  حفظ الأسئلة
                </motion.button>
              </div>

              <div className="space-y-6">
                {generatedQuestions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                            سؤال {index + 1}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                          <span className="flex items-center gap-1 text-purple-600">
                            <Brain className="w-4 h-4" />
                            مولد بالذكاء الاصطناعي
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-3">{question.question}</h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-lg border ${
                            optIndex === question.correctAnswer
                              ? 'bg-green-50 border-green-200 text-green-800'
                              : 'bg-white border-gray-200 text-gray-700'
                          }`}
                        >
                          {optIndex === question.correctAnswer && <CheckCircle className="w-4 h-4 inline ml-2" />}
                          {option}
                        </div>
                      ))}
                    </div>

                    {question.explanation && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h5 className="font-semibold text-blue-900 mb-2">التفسير:</h5>
                        <p className="text-blue-800">{question.explanation}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {activeTab === 'analyze' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* أداة تحليل الأداء */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
            <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">تحليل الأداء الذكي</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              احصل على تحليل شامل لأدائك مع توصيات مخصصة للتحسين
            </p>
            <motion.button
              onClick={handleAnalyzePerformance}
              disabled={isAnalyzing}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                isAnalyzing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
              }`}
              whileHover={!isAnalyzing ? { scale: 1.05 } : undefined}
              whileTap={!isAnalyzing ? { scale: 0.95 } : undefined}
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  جاري التحليل...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6" />
                  تحليل الأداء
                </div>
              )}
            </motion.button>
          </div>

          {/* نتائج التحليل */}
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* نقاط القوة */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <h3 className="text-2xl font-bold text-gray-900">نقاط القوة</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisResult.strengths.map((strength, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-green-50 border border-green-200 rounded-lg p-4"
                    >
                      <p className="text-green-800 font-medium">{strength}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* نقاط الضعف */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-bold text-gray-900">نقاط التحسين</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisResult.weaknesses.map((weakness, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-4"
                    >
                      <p className="text-red-800 font-medium">{weakness}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* المواضيع الموصى بها */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">المواضيع الموصى بها</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {analysisResult.recommendedTopics.map((topic, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium"
                    >
                      {topic}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* مؤشر التحسن */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200 text-center">
                <Award className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">مؤشر التحسن</h3>
                <div className="text-6xl font-bold text-purple-600 mb-2">
                  {analysisResult.improvementScore}%
                </div>
                <p className="text-purple-700">إمكانية التحسن في الأداء</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {activeTab === 'recommend' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* أداة التوصيات */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
            <Lightbulb className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">التوصيات الذكية</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              احصل على توصيات مخصصة لتحسين أدائك وتطوير مهاراتك
            </p>
            <motion.button
              onClick={handleGetRecommendations}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-3">
                <Lightbulb className="w-6 h-6" />
                احصل على التوصيات
              </div>
            </motion.button>
          </div>

          {/* التوصيات */}
          {recommendations.length > 0 && (
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${
                      rec.type === 'topic' ? 'bg-blue-100' :
                      rec.type === 'difficulty' ? 'bg-green-100' :
                      'bg-purple-100'
                    }`}>
                      {rec.type === 'topic' && <BookOpen className="w-6 h-6 text-blue-600" />}
                      {rec.type === 'difficulty' && <Target className="w-6 h-6 text-green-600" />}
                      {rec.type === 'practice' && <Zap className="w-6 h-6 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-gray-900">{rec.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(rec.priority)}`}>
                          {rec.priority === 'high' ? 'عالية' : rec.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                        </span>
                      </div>
                      <p className="text-gray-600">{rec.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'settings' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-8 h-8 text-gray-600" />
            <h3 className="text-2xl font-bold text-gray-900">إعدادات الذكاء الاصطناعي</h3>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">إعدادات التوليد</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">تضمين التفسيرات تلقائياً</span>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">تحسين الأسئلة بالذكاء الاصطناعي</span>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">إشعارات التحديثات</span>
                  <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">إعدادات التحليل</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    تردد التحليل التلقائي
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                    <option value="daily">يومي</option>
                    <option value="weekly">أسبوعي</option>
                    <option value="monthly">شهري</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">التحليل المفصل</span>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                </div>
              </div>
            </div>

            <motion.button
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              حفظ الإعدادات
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AISection;
