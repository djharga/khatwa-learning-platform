'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Shield,
  BarChart3,
  Search,
  Zap,
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Upload,
  Play,
  Pause,
  RotateCcw,
  Download,
  Share2,
  Eye,
  Settings,
  Activity,
  Target,
  Users,
  Calendar,
  Award,
  Lightbulb,
  MessageSquare,
  FileBarChart,
  GitCompare,
  Presentation,
  PenTool,
  History,
  PieChart,
  BarChart,
  Star,
} from 'lucide-react';

import SmartComparatorComponent from './ai-tools/SmartComparatorComponent';
import PresentationBuilderComponent from './ai-tools/PresentationBuilderComponent';
import ContentGeneratorComponent from './ai-tools/ContentGeneratorComponent';

interface AITool {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  gradient: string;
}

interface AnalysisResult {
  id: string;
  title: string;
  type: 'success' | 'warning' | 'info' | 'error';
  message: string;
  score?: number;
  details?: string[];
  recommendations?: string[];
  chartData?: any;
}

interface AnalysisHistory {
  id: string;
  toolId: string;
  timestamp: Date;
  results: AnalysisResult[];
  fileName: string;
}

interface Recommendation {
  id: string;
  type: 'action' | 'improvement' | 'next_step';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

const StudentAIToolsComponent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisHistory[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showCharts, setShowCharts] = useState(true);
  const [performanceRating, setPerformanceRating] = useState(0);

  const aiTools: AITool[] = [
    {
      id: 'dashboard',
      name: 'لوحة التحكم',
      icon: BarChart3,
      description: 'نظرة عامة على أدائك وتقدمك',
      color: 'text-blue-600',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      id: 'co-auditor',
      name: 'المدقق المساعد',
      icon: Shield,
      description: 'تحليل ومراجعة المحتوى التعليمي',
      color: 'text-green-600',
      gradient: 'from-green-500 to-teal-600',
    },
    {
      id: 'risk-analyzer',
      name: 'محلل المخاطر',
      icon: AlertTriangle,
      description: 'تقييم المخاطر والتحديات في التعلم',
      color: 'text-orange-600',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      id: 'content-optimizer',
      name: 'محسن المحتوى',
      icon: Zap,
      description: 'تحسين وتطوير المحتوى التعليمي',
      color: 'text-purple-600',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      id: 'learning-insights',
      name: 'رؤى التعلم',
      icon: Brain,
      description: 'تحليل أنماط التعلم وتقديم توصيات',
      color: 'text-indigo-600',
      gradient: 'from-indigo-500 to-blue-600',
    },
    {
      id: 'progress-tracker',
      name: 'متتبع التقدم',
      icon: TrendingUp,
      description: 'تتبع وتحليل التقدم في الدورات',
      color: 'text-cyan-600',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'personal-assistant',
      name: 'المساعد الشخصي',
      icon: MessageSquare,
      description: 'مساعد ذكي للإجابة على أسئلتك التعليمية',
      color: 'text-teal-600',
      gradient: 'from-teal-500 to-cyan-600',
    },
    {
      id: 'executive-summary',
      name: 'الملخص التنفيذي',
      icon: FileBarChart,
      description: 'تلخيص التقارير الطويلة في ملخصات موجزة',
      color: 'text-emerald-600',
      gradient: 'from-emerald-500 to-green-600',
    },
    {
      id: 'smart-comparator',
      name: 'المقارن الذكي',
      icon: GitCompare,
      description: 'مقارنة الملفات واستخراج الفروقات',
      color: 'text-rose-600',
      gradient: 'from-rose-500 to-pink-600',
    },
    {
      id: 'presentation-builder',
      name: 'منشئ العروض',
      icon: Presentation,
      description: 'تحويل التقارير إلى عروض تقديمية احترافية',
      color: 'text-violet-600',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      id: 'content-generator',
      name: 'مولد المحتوى',
      icon: PenTool,
      description: 'توليد محتوى تسويقي وتعليمي ذكي',
      color: 'text-amber-600',
      gradient: 'from-amber-500 to-orange-600',
    },
  ];

  const simulateAnalysis = (toolId: string) => {
    setIsAnalyzing(true);
    setAnalysisResults([]);

    // Simulate API call delay
    setTimeout(() => {
      let results: AnalysisResult[] = [];

      switch (toolId) {
        case 'dashboard':
          results = [
            {
              id: '1',
              title: 'الأداء العام',
              type: 'success',
              message: 'أداؤك ممتاز في معظم الدورات',
              score: 85,
              details: [
                'إكمال 8 من 10 دورات',
                'متوسط الدرجات: 92%',
                'نشاط يومي منتظم',
              ],
            },
            {
              id: '2',
              title: 'الدورات الموصى بها',
              type: 'info',
              message: '3 دورات جديدة تتناسب مع اهتماماتك',
              details: [
                'تطوير الويب المتقدم',
                'ذكاء اصطناعي للمبتدئين',
                'إدارة المشاريع',
              ],
            },
          ];
          break;

        case 'co-auditor':
          results = [
            {
              id: '1',
              title: 'مراجعة المحتوى',
              type: 'success',
              message: 'المحتوى المرفوع يتوافق مع المعايير التعليمية',
              score: 95,
              details: [
                'جودة المحتوى: ممتازة',
                'الدقة: 98%',
                'الشمولية: كاملة',
              ],
            },
            {
              id: '2',
              title: 'اقتراحات التحسين',
              type: 'warning',
              message: 'يمكن إضافة المزيد من الأمثلة التفاعلية',
              details: [
                'إضافة تمارين عملية',
                'تحسين الصور التوضيحية',
                'إضافة روابط إضافية',
              ],
            },
          ];
          break;

        case 'risk-analyzer':
          results = [
            {
              id: '1',
              title: 'تحليل المخاطر',
              type: 'warning',
              message: 'خطر متوسط في الدورة المتقدمة للبرمجة',
              score: 65,
              details: [
                'مستوى الصعوبة: مرتفع',
                'وقت الدراسة المطلوب: 15 ساعة أسبوعياً',
                'معدل الإكمال: 70%',
              ],
            },
            {
              id: '2',
              title: 'التوصيات الأمنة',
              type: 'info',
              message: 'ابدأ بالدورات الأساسية أولاً',
              details: [
                'تعزيز المعرفة الأساسية',
                'زيادة الوقت المخصص للدراسة',
                'المشاركة في مجموعات الدراسة',
              ],
            },
          ];
          break;

        case 'content-optimizer':
          results = [
            {
              id: '1',
              title: 'تحسين المحتوى',
              type: 'success',
              message: 'تم تحسين المحتوى بنجاح بنسبة 40%',
              score: 88,
              details: [
                'تحسين قابلية القراءة',
                'إضافة عناصر تفاعلية',
                'تحسين التنسيق البصري',
              ],
            },
          ];
          break;

        case 'learning-insights':
          results = [
            {
              id: '1',
              title: 'أنماط التعلم',
              type: 'info',
              message: 'أسلوب التعلم المرئي هو الأمثل لك',
              score: 90,
              details: [
                'أفضل وقت للدراسة: المساء',
                'المدة المثالية للجلسة: 45 دقيقة',
                'نوع المحتوى المفضل: الفيديوهات',
              ],
            },
          ];
          break;

        case 'progress-tracker':
          results = [
            {
              id: '1',
              title: 'تقدم الأسبوع الحالي',
              type: 'success',
              message: 'تقدم ممتاز بنسبة 75%',
              score: 75,
              details: [
                'إكمال 6 من 8 مهام',
                'درجة الاختبار: 88%',
                'النشاط اليومي: ممتاز',
              ],
            },
          ];
          break;
      }

      setAnalysisResults(results);

      // Add to history
      const historyEntry: AnalysisHistory = {
        id: Date.now().toString(),
        toolId,
        timestamp: new Date(),
        results,
        fileName: selectedFile || 'ملف غير محدد',
      };
      setAnalysisHistory(prev => [historyEntry, ...prev]);

      // Generate recommendations
      const newRecommendations = generateRecommendations(results, toolId);
      setRecommendations(newRecommendations);

      // Calculate performance rating
      const avgScore = results.reduce((acc, result) => acc + (result.score || 0), 0) / results.length;
      setPerformanceRating(Math.round(avgScore));

      setIsAnalyzing(false);
    }, 2000);
  };

  const generateRecommendations = (results: AnalysisResult[], toolId: string): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    results.forEach(result => {
      if (result.type === 'warning' || result.type === 'error') {
        recommendations.push({
          id: Date.now().toString() + Math.random(),
          type: 'improvement',
          title: `تحسين: ${result.title}`,
          description: result.message,
          priority: result.type === 'error' ? 'high' : 'medium',
        });
      }
    });

    // Add general recommendations based on tool
    switch (toolId) {
      case 'dashboard':
        recommendations.push({
          id: 'general-1',
          type: 'next_step',
          title: 'استكشف دورات جديدة',
          description: 'بناءً على أدائك، جرب دورات في مجالات جديدة',
          priority: 'low',
        });
        break;
      case 'learning-insights':
        recommendations.push({
          id: 'general-2',
          type: 'action',
          title: 'ضبط جدول الدراسة',
          description: 'حاول الدراسة في الأوقات الموصى بها لتحقيق أفضل النتائج',
          priority: 'medium',
        });
        break;
    }

    return recommendations;
  };

  const rerunAnalysis = (historyEntry: AnalysisHistory) => {
    setActiveTab(historyEntry.toolId);
    setSelectedFile(historyEntry.fileName);
    simulateAnalysis(historyEntry.toolId);
  };

  const shareResults = (results: AnalysisResult[]) => {
    // Simulate sharing
    alert('تم مشاركة النتائج بنجاح!');
  };

  const getResultIcon = (type: AnalysisResult['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <Lightbulb className="w-5 h-5 text-blue-500" />;
    }
  };

  const getResultColor = (type: AnalysisResult['type']) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50 dark:bg-green-900/20';
      case 'warning':
        return 'border-orange-200 bg-orange-50 dark:bg-orange-900/20';
      case 'error':
        return 'border-red-200 bg-red-50 dark:bg-red-900/20';
      case 'info':
        return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          أدوات الذكاء الاصطناعي
        </h1>
        <p className="text-lg text-neutral max-w-3xl mx-auto">
          مجموعة من الأدوات الذكية لمساعدتك في رحلتك التعليمية
        </p>
      </motion.div>

      {/* AI Tools Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        {/* Tab Headers */}
        <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
          {aiTools.map((tool, index) => {
            const IconComponent = tool.icon;
            const isActive = activeTab === tool.id;

            return (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTab(tool.id);
                  setAnalysisResults([]);
                  setIsAnalyzing(false);
                }}
                className={`flex-1 min-w-0 p-4 text-center transition-all duration-200 ${
                  isActive
                    ? `bg-gradient-to-r ${tool.gradient} text-white`
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center space-y-2"
                >
                  <IconComponent
                    className={`w-6 h-6 ${isActive ? 'text-white' : tool.color}`}
                  />
                  <span className="text-sm font-medium">{tool.name}</span>
                  <p
                    className={`text-xs ${isActive ? 'text-white opacity-90' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {tool.description}
                  </p>
                </motion.div>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Render component-based tools */}
              {activeTab === 'smart-comparator' && <SmartComparatorComponent />}
              {activeTab === 'presentation-builder' && <PresentationBuilderComponent />}
              {activeTab === 'content-generator' && <ContentGeneratorComponent />}

              {/* Render analysis-based tools */}
              {['dashboard', 'co-auditor', 'risk-analyzer', 'content-optimizer', 'learning-insights', 'progress-tracker', 'personal-assistant', 'executive-summary'].includes(activeTab) && (
                <>
              {/* Tool Actions */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="اختر ملف للتحليل..."
                    value={selectedFile || ''}
                    onChange={(e) => setSelectedFile(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => simulateAnalysis(activeTab)}
                    disabled={!selectedFile || isAnalyzing}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                      !selectedFile || isAnalyzing
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transform hover:scale-105'
                    }`}
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        جاري التحليل...
                      </>
                    ) : (
                      <>
                        <Activity className="w-4 h-4 mr-2" />
                        تحليل الملف
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowCharts(!showCharts)}
                    className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <BarChart className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Loading Animation */}
              <AnimatePresence>
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                      <div
                        className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin mx-auto"
                        style={{
                          animationDirection: 'reverse',
                          animationDuration: '0.8s',
                        }}
                      ></div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-4">
                      جاري تحليل الملف باستخدام الذكاء الاصطناعي...
                    </p>
                    <div className="mt-4 w-full max-w-xs mx-auto">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2, ease: 'easeInOut' }}
                        ></motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Analysis Results */}
              {!isAnalyzing && analysisResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    نتائج التحليل
                  </h3>

                  {/* Charts Section */}
                  {showCharts && analysisResults.some(r => r.score) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6"
                    >
                      <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        تحليل بصري للنتائج
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                          <h5 className="font-medium mb-3 text-gray-900 dark:text-white">توزيع النتائج</h5>
                          <div className="space-y-2">
                            {analysisResults.filter(r => r.score).map(result => (
                              <div key={result.id} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">{result.title}</span>
                                <div className="flex items-center space-x-2 space-x-reverse">
                                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                      className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full"
                                      style={{ width: `${result.score}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium">{result.score}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                          <h5 className="font-medium mb-3 text-gray-900 dark:text-white">مقارنة مع المتوسط</h5>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600 mb-2">
                              {performanceRating}%
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              أعلى من المتوسط العام بنسبة {Math.max(0, performanceRating - 75)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Recommendations */}
                  {recommendations.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6"
                    >
                      <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        توصيات مخصصة
                      </h4>
                      <div className="space-y-3">
                        {recommendations.map(rec => (
                          <div
                            key={rec.id}
                            className={`p-4 rounded-lg border-2 ${
                              rec.priority === 'high'
                                ? 'border-red-200 bg-red-50 dark:bg-red-900/20'
                                : rec.priority === 'medium'
                                ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20'
                                : 'border-green-200 bg-green-50 dark:bg-green-900/20'
                            }`}
                          >
                            <div className="flex items-start space-x-3 space-x-reverse">
                              <div className={`p-1 rounded-full ${
                                rec.priority === 'high'
                                  ? 'bg-red-500'
                                  : rec.priority === 'medium'
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                              }`}>
                                <Star className="w-3 h-3 text-white" />
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-white">{rec.title}</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{rec.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {analysisResults.map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border-2 rounded-lg p-6 ${getResultColor(result.type)}`}
                      >
                        <div className="flex items-start space-x-3 space-x-reverse mb-4">
                          {getResultIcon(result.type)}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                              {result.title}
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                              {result.message}
                            </p>

                            {result.score && (
                              <div className="mb-3">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>النتيجة</span>
                                  <span>{result.score}%</span>
                                </div>
                                <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${result.score}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}

                            {result.details && (
                              <ul className="space-y-1">
                                {result.details.map((detail, idx) => (
                                  <li
                                    key={idx}
                                    className="text-sm text-gray-600 dark:text-gray-400 flex items-center"
                                  >
                                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 flex-shrink-0"></div>
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 space-x-reverse">
                          <button className="px-3 py-1 text-sm bg-white bg-opacity-50 hover:bg-opacity-75 rounded-md transition-colors">
                            <Eye className="w-3 h-3 inline mr-1" />
                            عرض التفاصيل
                          </button>
                          <button className="px-3 py-1 text-sm bg-white bg-opacity-50 hover:bg-opacity-75 rounded-md transition-colors">
                            <Download className="w-3 h-3 inline mr-1" />
                            تحميل التقرير
                          </button>
                          <button
                            onClick={() => shareResults([result])}
                            className="px-3 py-1 text-sm bg-white bg-opacity-50 hover:bg-opacity-75 rounded-md transition-colors"
                          >
                            <Share2 className="w-3 h-3 inline mr-1" />
                            مشاركة
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Empty State */}
              {!isAnalyzing && analysisResults.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    اختر ملف للتحليل
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    حدد ملف من قائمتك أو ارفعه للحصول على تحليل مفصل من الذكاء
                    الاصطناعي
                  </p>
                  <div className="flex justify-center space-x-3 space-x-reverse">
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all">
                      <Upload className="w-4 h-4 inline mr-2" />
                      رفع ملف
                    </button>
                    <button className="px-4 py-2 border border-purple-500 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                      تصفح الملفات
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Analysis History */}
              {analysisHistory.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <History className="w-5 h-5 mr-2" />
                    سجل التحليلات
                  </h3>
                  <div className="space-y-3">
                    {analysisHistory.slice(0, 5).map(entry => (
                      <div
                        key={entry.id}
                        className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {aiTools.find(t => t.id === entry.toolId)?.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {entry.fileName} • {entry.timestamp.toLocaleDateString('ar-SA')}
                            </p>
                          </div>
                          <div className="flex space-x-2 space-x-reverse">
                            <button
                              onClick={() => rerunAnalysis(entry)}
                              className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                            >
                              <RotateCcw className="w-3 h-3 inline mr-1" />
                              إعادة
                            </button>
                            <button
                              onClick={() => shareResults(entry.results)}
                              className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                            >
                              <Share2 className="w-3 h-3 inline mr-1" />
                              مشاركة
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {entry.results.length} نتيجة • متوسط الدرجة: {
                            Math.round(entry.results.reduce((acc, r) => acc + (r.score || 0), 0) / entry.results.length)
                          }%
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Enhanced Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-6"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-6 text-white"
        >
          <FileText className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-2xl font-bold">{analysisHistory.length}</div>
          <div className="text-sm opacity-80">تحليل إجمالي</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white"
        >
          <CheckCircle className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-2xl font-bold">
            {analysisHistory.filter(h => h.results.some(r => r.type === 'success')).length}
          </div>
          <div className="text-sm opacity-80">تحليل ناجح</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white"
        >
          <TrendingUp className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-2xl font-bold">{performanceRating}%</div>
          <div className="text-sm opacity-80">معدل الأداء</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-6 text-white"
        >
          <Clock className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-2xl font-bold">2.3s</div>
          <div className="text-sm opacity-80">متوسط الوقت</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-6 text-white"
        >
          <Star className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-2xl font-bold">
            {recommendations.filter(r => r.priority === 'high').length}
          </div>
          <div className="text-sm opacity-80">توصيات عالية الأولوية</div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentAIToolsComponent;
