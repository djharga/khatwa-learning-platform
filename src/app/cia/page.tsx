'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  Video,
  Headphones,
  FileSpreadsheet,
  BarChart3,
  TrendingUp,
  Target,
  CheckCircle2,
  Clock,
  Download,
  Play,
  Lock,
  Sparkles,
  GraduationCap,
  Trophy,
  Users,
  PieChart,
  Activity,
  ArrowRight,
  XCircle,
  AlertCircle,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Info,
  MousePointerClick,
  Crown,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import FreeSection from '@/components/question-bank/FreeSection';
import PremiumSection from '@/components/question-bank/PremiumSection';
import AnalyticsSection from '@/components/question-bank/AnalyticsSection';
import AISection from '@/components/question-bank/AISection';
import QuestionBank from '@/components/fellowship/QuestionBank';

// أنواع الملفات
type FileType = 'video' | 'podcast' | 'excel' | 'word' | 'pdf';

interface File {
  id: string;
  name: string;
  type: FileType;
  size: string;
  duration?: string;
  description?: string;
  isProtected: boolean;
  url: string;
  progress?: number; // نسبة الإنجاز
}

interface SubAxis {
  id: string;
  title: string;
  description?: string;
  files: File[];
}

interface MainAxis {
  id: string;
  title: string;
  description?: string;
  subAxes: SubAxis[];
  progress?: number;
}

interface Level {
  id: 1 | 2 | 3;
  title: string;
  description: string;
  mainAxes: MainAxis[];
  progress: number; // نسبة الإنجاز الإجمالية
  questionBankCount: number;
  avgScore?: number;
}

interface ProgressStats {
  overallProgress: number;
  levelsCompleted: number;
  totalQuestionsAnswered: number;
  avgScore: number;
  currentStreak: number;
  hoursStudied: number;
}

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

export default function CIAFellowshipPage() {
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);
  const [expandedAxis, setExpandedAxis] = useState<string | null>(null);
  const [expandedSubAxis, setExpandedSubAxis] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'content' | 'progress' | 'questionBank'>('content');
  const [allAxesExpanded, setAllAxesExpanded] = useState(false);
  const [showHelpTooltip, setShowHelpTooltip] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [questionBankTab, setQuestionBankTab] = useState<'free' | 'premium' | 'analytics' | 'ai'>('free');
  const [loading, setLoading] = useState(false);

  // بيانات المحاكاة للمستويات الثلاثة
  const levels: Level[] = [
    {
      id: 1,
      title: 'المستوى الأول',
      description: 'الأساسيات والمفاهيم الأولية للمراجعة الداخلية',
      progress: 65,
      questionBankCount: 450,
      avgScore: 72,
      mainAxes: [
        {
          id: 'axis1-1',
          title: 'المحور الأول: أساسيات المراجعة الداخلية',
          description: 'مقدمة شاملة لفهم المراجعة الداخلية ومبادئها',
          progress: 70,
          subAxes: [
            {
              id: 'sub1-1',
              title: 'مفهوم المراجعة الداخلية',
              description: 'تعريف وأهداف المراجعة الداخلية',
              files: [
                {
                  id: 'f1',
                  name: 'مقدمة في المراجعة الداخلية.mp4',
                  type: 'video',
                  size: '125 MB',
                  duration: '45 دقيقة',
                  description: 'شرح مفصل لمفهوم المراجعة الداخلية',
                  isProtected: false,
                  url: '/videos/intro.mp4',
                  progress: 100,
                },
                {
                  id: 'f2',
                  name: 'دليل المراجعة الأساسي.docx',
                  type: 'word',
                  size: '2.5 MB',
                  description: 'دليل شامل للمراجعة الداخلية',
                  isProtected: false,
                  url: '/files/guide.docx',
                  progress: 80,
                },
                {
                  id: 'f3',
                  name: 'حوار مع خبير المراجعة.mp3',
                  type: 'podcast',
                  size: '48 MB',
                  duration: '62 دقيقة',
                  description: 'حوار مع أحد خبراء المراجعة الداخلية',
                  isProtected: false,
                  url: '/podcasts/expert.mp3',
                  progress: 60,
                },
              ],
            },
            {
              id: 'sub1-2',
              title: 'الإطار التنظيمي والأنظمة',
              description: 'الأنظمة واللوائح المنظمة للمراجعة الداخلية',
              files: [
                {
                  id: 'f4',
                  name: 'الأنظمة والقوانين.xlsx',
                  type: 'excel',
                  size: '1.8 MB',
                  description: 'جداول الأنظمة والقوانين المتعلقة',
                  isProtected: true,
                  url: '/files/regulations.xlsx',
                  progress: 0,
                },
                {
                  id: 'f5',
                  name: 'الإطار التنظيمي.mp4',
                  type: 'video',
                  size: '98 MB',
                  duration: '38 دقيقة',
                  description: 'شرح الإطار التنظيمي للمراجعة',
                  isProtected: true,
                  url: '/videos/framework.mp4',
                  progress: 0,
                },
              ],
            },
          ],
        },
        {
          id: 'axis1-2',
          title: 'المحور الثاني: إدارة المخاطر',
          description: 'فهم وتقييم وإدارة المخاطر',
          progress: 60,
          subAxes: [
            {
              id: 'sub2-1',
              title: 'تحديد المخاطر',
              description: 'طرق تحديد وتصنيف المخاطر',
      files: [
                {
                  id: 'f6',
                  name: 'تحديد المخاطر.mp4',
                  type: 'video',
                  size: '112 MB',
                  duration: '52 دقيقة',
                  description: 'شرح شامل لطرق تحديد المخاطر',
                  isProtected: false,
                  url: '/videos/risks.mp4',
                  progress: 50,
                },
                {
                  id: 'f7',
                  name: 'نموذج تقييم المخاطر.xlsx',
                  type: 'excel',
                  size: '2.1 MB',
                  description: 'نموذج جاهز لتقييم المخاطر',
                  isProtected: false,
                  url: '/files/risk-assessment.xlsx',
                  progress: 100,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'المستوى الثاني',
      description: 'التطبيق العملي والأدوات المتقدمة',
      progress: 40,
      questionBankCount: 380,
      avgScore: 68,
      mainAxes: [
        {
          id: 'axis2-1',
          title: 'المحور الأول: أدوات المراجعة المتقدمة',
          description: 'استخدام التقنيات والأدوات الحديثة في المراجعة',
          progress: 45,
          subAxes: [
            {
              id: 'sub3-1',
              title: 'تحليل البيانات',
              description: 'استخدام التحليلات في عمليات المراجعة',
      files: [
                {
                  id: 'f8',
                  name: 'تحليل البيانات في المراجعة.mp4',
                  type: 'video',
                  size: '145 MB',
                  duration: '58 دقيقة',
                  description: 'كيفية استخدام تحليل البيانات',
                  isProtected: true,
                  url: '/videos/data-analysis.mp4',
                  progress: 0,
                },
                {
                  id: 'f9',
                  name: 'أدوات التحليل.xlsx',
                  type: 'excel',
                  size: '3.2 MB',
                  description: 'مجموعة أدوات تحليل البيانات',
                  isProtected: true,
                  url: '/files/analysis-tools.xlsx',
                  progress: 0,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: 'المستوى الثالث',
      description: 'المعايير الدولية والقيادة الإستراتيجية',
      progress: 15,
      questionBankCount: 320,
      avgScore: 0,
      mainAxes: [
        {
          id: 'axis3-1',
          title: 'المحور الأول: المعايير الدولية',
          description: 'المعايير الدولية للمراجعة الداخلية',
          progress: 20,
          subAxes: [
            {
              id: 'sub4-1',
              title: 'معايير IIA',
              description: 'المعايير الدولية للمراجعين الداخليين',
      files: [
                {
                  id: 'f10',
                  name: 'المعايير الدولية.pdf',
                  type: 'pdf',
                  size: '4.1 MB',
                  description: 'دليل شامل للمعايير الدولية',
                  isProtected: true,
                  url: '/files/standards.pdf',
                  progress: 0,
                },
                {
                  id: 'f11',
                  name: 'تطبيق المعايير الدولية.mp4',
                  type: 'video',
                  size: '132 MB',
                  duration: '48 دقيقة',
                  description: 'كيفية تطبيق المعايير في الواقع',
                  isProtected: true,
                  url: '/videos/standards-application.mp4',
                  progress: 0,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const progressStats: ProgressStats = {
    overallProgress: 40,
    levelsCompleted: 0,
    totalQuestionsAnswered: 856,
    avgScore: 70,
    currentStreak: 12,
    hoursStudied: 48,
  };

  const currentLevel = levels.find(l => l.id === selectedLevel)!;

  // جلب بيانات الأسئلة من API
  useEffect(() => {
    let mounted = true;
    async function loadQuestions() {
      setLoading(true);
      try {
        const [qRes, rRes] = await Promise.all([
          fetch('/api/cia/questions'),
          fetch('/api/cia/quiz-results'),
        ]);
        const qJson = await qRes.json();
        const rJson = await rRes.json();
        if (!mounted) return;
        setQuestions(qJson.questions || []);
        setQuizResults(rJson.quizResults || []);
        // TODO: ربط الاشتراك بنظام المستخدم الفعلي
        setIsSubscribed(false);
      } catch (e: any) {
        console.error('Error loading questions:', e);
        if (!mounted) return;
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadQuestions();
    return () => { mounted = false; };
  }, []);

  const toggleAxis = (axisId: string) => {
    const wasExpanded = expandedAxis === axisId;
    setExpandedAxis(wasExpanded ? null : axisId);
    // إغلاق المحاور الفرعية عند إغلاق المحور الرئيسي
    if (wasExpanded) {
      setExpandedSubAxis(null);
    }
  };

  const toggleSubAxis = (subAxisId: string) => {
    setExpandedSubAxis(expandedSubAxis === subAxisId ? null : subAxisId);
  };

  const expandAllAxes = () => {
    const level = levels.find(l => l.id === selectedLevel);
    if (level && level.mainAxes.length > 0) {
      setAllAxesExpanded(true);
      setExpandedAxis(level.mainAxes[0].id);
      if (level.mainAxes[0].subAxes.length > 0) {
        setExpandedSubAxis(level.mainAxes[0].subAxes[0].id);
      }
    }
  };

  const collapseAllAxes = () => {
    setAllAxesExpanded(false);
    setExpandedAxis(null);
    setExpandedSubAxis(null);
  };

  const getFileIcon = (type: FileType) => {
    switch (type) {
      case 'video':
        return Video;
      case 'podcast':
        return Headphones;
      case 'excel':
        return FileSpreadsheet;
      case 'word':
        return FileText;
      case 'pdf':
        return FileText;
      default:
        return FileText;
    }
  };

  const getFileTypeLabel = (type: FileType) => {
    switch (type) {
      case 'video':
        return 'فيديو';
      case 'podcast':
        return 'بودكاست';
      case 'excel':
        return 'Excel';
      case 'word':
        return 'Word';
      case 'pdf':
        return 'PDF';
      default:
        return 'ملف';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-white/30 to-white/20 backdrop-blur-md rounded-full px-8 py-3 mb-6 border border-white/30 shadow-xl"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg"
              >
                <Award className="w-6 h-6 text-white" />
              </motion.div>
              <span className="font-bold text-lg tracking-wide">Certified Internal Auditor</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              زمالة المدقق الداخلي (CIA)
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              برنامج متكامل لإعدادك للحصول على شهادة CIA الدولية مع محتوى تفاعلي وتحليلات متقدمة
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              {[
                { label: 'المستويات', value: '3', icon: GraduationCap, gradient: 'from-blue-400 to-cyan-400', bgGradient: 'from-blue-500/20 to-cyan-500/20' },
                { label: 'بنك الأسئلة', value: '1,150+', icon: BookOpen, gradient: 'from-green-400 to-emerald-400', bgGradient: 'from-green-500/20 to-emerald-500/20' },
                { label: 'ساعات المحتوى', value: '120+', icon: Clock, gradient: 'from-purple-400 to-pink-400', bgGradient: 'from-purple-500/20 to-pink-500/20' },
                { label: 'المتدربون النشطون', value: '2,450+', icon: Users, gradient: 'from-orange-400 to-red-400', bgGradient: 'from-orange-500/20 to-red-500/20' },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1, type: "spring", stiffness: 100 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`bg-gradient-to-br ${stat.bgGradient} backdrop-blur-md rounded-2xl p-6 border-2 border-white/30 shadow-2xl hover:shadow-white/20 transition-all duration-300`}
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, delay: idx * 0.3 }}
                      className={`inline-flex p-3 bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg mb-3`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="text-3xl font-extrabold mb-1 text-white drop-shadow-lg">{stat.value}</div>
                    <div className="text-sm font-semibold text-white/90">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-2 border-2 border-gray-100">
            <div className="flex flex-wrap gap-3">
              {[
                { id: 'content', label: 'المحتوى التعليمي', icon: BookOpen, gradient: 'from-blue-600 via-blue-500 to-indigo-600', hoverGradient: 'from-blue-700 via-blue-600 to-indigo-700' },
                { id: 'progress', label: 'تقدمي والإنجازات', icon: Activity, gradient: 'from-green-600 via-emerald-500 to-teal-600', hoverGradient: 'from-green-700 via-emerald-600 to-teal-700' },
                { id: 'questionBank', label: 'بنك الأسئلة', icon: Target, gradient: 'from-purple-600 via-purple-500 to-pink-600', hoverGradient: 'from-purple-700 via-purple-600 to-pink-700' },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveView(tab.id as any)}
                    className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all relative overflow-hidden ${
                      activeView === tab.id
                        ? `bg-gradient-to-r ${tab.gradient} text-white shadow-2xl shadow-${tab.gradient.split('-')[1]}-500/50`
                        : 'text-gray-700 bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 border-2 border-gray-200'
                    }`}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      boxShadow: activeView === tab.id ? `0 20px 40px -12px rgba(0,0,0,0.3)` : '0 10px 25px -5px rgba(0,0,0,0.1)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {activeView === tab.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    )}
                    <Icon className={`w-6 h-6 relative z-10 ${activeView === tab.id ? 'drop-shadow-lg' : ''}`} />
                    <span className="relative z-10">{tab.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content View */}
        <AnimatePresence mode="wait">
          {activeView === 'content' && (
        <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Level Selection */}
              <Card className="shadow-xl border-0">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {levels.map((level) => (
                      <motion.button
                        key={level.id}
                        onClick={() => {
                          setSelectedLevel(level.id);
                          setExpandedAxis(null);
                          setExpandedSubAxis(null);
                        }}
                        className={`flex-1 p-6 rounded-3xl border-2 transition-all relative overflow-hidden ${
                          selectedLevel === level.id
                            ? 'border-blue-500 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 shadow-2xl shadow-blue-500/20 scale-[1.03]'
                            : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-xl'
                        }`}
                        whileHover={{ scale: selectedLevel === level.id ? 1.03 : 1.05, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {selectedLevel === level.id && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                        )}
                        <div className="flex items-center justify-between mb-3 relative z-10">
                          <div className="flex items-center gap-4">
                            <motion.div
                              animate={{ 
                                scale: selectedLevel === level.id ? 1.15 : 1,
                                rotate: selectedLevel === level.id ? [0, 360] : 0
                              }}
                              transition={{ duration: 0.5 }}
                              className={`w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-xl ${
                                selectedLevel === level.id
                                  ? 'bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white'
                                  : 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700'
                              } before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:rounded-2xl relative`}
                            >
                              <span className="relative z-10 drop-shadow-md">{level.id}</span>
                            </motion.div>
                            <div className="text-right">
                              <h3 className="text-2xl font-extrabold text-gray-900 mb-1">{level.title}</h3>
                              <p className="text-sm text-gray-600 font-medium">{level.description}</p>
                  </div>
                  </div>
                          {selectedLevel === level.id && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl"
                            >
                              <CheckCircle2 className="w-6 h-6 text-white" />
                            </motion.div>
                          )}
                  </div>
                        <div className="space-y-3 relative z-10">
                          <div className="flex items-center justify-between text-sm font-semibold">
                            <span className="text-gray-600">التقدم</span>
                            <span className="font-extrabold text-blue-600 text-lg">{level.progress}%</span>
                </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                            <motion.div
                              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 h-3 rounded-full shadow-lg"
                              initial={{ width: 0 }}
                              animate={{ width: `${level.progress}%` }}
                              transition={{ duration: 0.8, type: "spring" }}
                            />
                </div>
              </div>
                      </motion.button>
                    ))}
            </div>
                </CardContent>
              </Card>

              {/* Help Tooltip */}
              {showHelpTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 border-r-4 border-blue-500 rounded-lg p-4 mb-6"
                >
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 mb-1 flex items-center gap-2">
                        <MousePointerClick className="w-4 h-4" />
                        نصيحة: كيفية استخدام الصفحة
                      </h4>
                      <p className="text-sm text-blue-800 mb-3">
                        انقر على <span className="font-bold">المحاور الرئيسية</span> و <span className="font-bold">المحاور الفرعية</span> لفتحها وعرض المحتوى. يمكنك أيضاً استخدام الأزرار أدناه لفتح أو إغلاق جميع المحاور دفعة واحدة.
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <motion.button
                          onClick={expandAllAxes}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2 shadow-lg"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Maximize2 className="w-4 h-4" />
                          فتح الكل
                        </motion.button>
                        <motion.button
                          onClick={collapseAllAxes}
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-200 transition-all flex items-center gap-2 border-2 border-blue-200"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Minimize2 className="w-4 h-4" />
                          إغلاق الكل
                        </motion.button>
                        <motion.button
                          onClick={() => setShowHelpTooltip(false)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all border-2 border-gray-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          إخفاء
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Expand/Collapse All Buttons */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  المحاور التعليمية - {currentLevel.title}
                </h3>
                <div className="flex gap-2">
                  <motion.button
                    onClick={expandAllAxes}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-500/30 relative overflow-hidden group"
                    style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #9333ea 100%)' }}
                    whileHover={{ scale: 1.08, y: -2, boxShadow: '0 20px 40px -10px rgba(37, 99, 235, 0.5)' }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <Maximize2 className="w-5 h-5 relative z-10 group-hover:rotate-180 transition-transform duration-300" />
                    <span className="relative z-10">فتح الكل</span>
                  </motion.button>
                  <motion.button
                    onClick={collapseAllAxes}
                    className="px-6 py-3 bg-white text-gray-700 rounded-xl font-bold hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all flex items-center gap-2 border-2 border-gray-300 hover:border-gray-400 shadow-lg"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Minimize2 className="w-5 h-5" />
                    إغلاق الكل
                  </motion.button>
                </div>
              </div>

              {/* Level Content */}
              <motion.div
                key={selectedLevel}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {currentLevel.mainAxes.map((axis) => (
                  <Card 
                    key={axis.id} 
                    className={`shadow-lg border-2 overflow-hidden transition-all cursor-pointer ${
                      expandedAxis === axis.id 
                        ? 'border-blue-500 shadow-xl scale-[1.01]' 
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
                    }`}
                    onClick={() => toggleAxis(axis.id)}
                  >
                    <CardHeader className={`bg-gradient-to-r transition-all ${
                      expandedAxis === axis.id 
                        ? 'from-blue-100 to-purple-100' 
                        : 'from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100'
                    }`}>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl flex items-center gap-3">
                          <motion.div
                            animate={{ 
                              rotate: expandedAxis === axis.id ? 360 : 0,
                              scale: expandedAxis === axis.id ? 1.15 : 1,
                              boxShadow: expandedAxis === axis.id ? '0 10px 30px -5px rgba(37, 99, 235, 0.5)' : '0 4px 15px -3px rgba(0,0,0,0.1)'
                            }}
                            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                            className="relative w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center font-extrabold text-lg shadow-xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:rounded-xl"
                          >
                            <span className="relative z-10 drop-shadow-md">{axis.id.split('-')[1]}</span>
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span>{axis.title}</span>
                              {expandedAxis === axis.id && (
                                <motion.span
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-bold"
                                >
                                  مفتوح
                                </motion.span>
                              )}
                            </div>
                            {axis.description && (
                              <p className="text-sm font-normal text-gray-600 mt-1">{axis.description}</p>
                            )}
                          </div>
                        </CardTitle>
                        <motion.div
                          className="flex flex-col items-center gap-2"
                        >
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAxis(axis.id);
                            }}
                            className={`p-4 rounded-2xl transition-all relative overflow-hidden ${
                              expandedAxis === axis.id
                                ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl shadow-blue-500/50'
                                : 'bg-white text-blue-600 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 border-2 border-blue-200'
                            }`}
                            whileHover={{ scale: 1.15, rotate: expandedAxis === axis.id ? 0 : 5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {expandedAxis === axis.id && (
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                            )}
                            <motion.div
                              animate={{ rotate: expandedAxis === axis.id ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="relative z-10"
                            >
                              {expandedAxis === axis.id ? (
                                <ChevronDown className="w-7 h-7" />
                              ) : (
                                <ChevronRight className="w-7 h-7" />
                              )}
                            </motion.div>
                          </motion.button>
                          <span className={`text-xs font-medium ${
                            expandedAxis === axis.id ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                            {expandedAxis === axis.id ? 'إغلاق' : 'فتح'}
                          </span>
                        </motion.div>
                      </div>
                      {axis.progress !== undefined && (
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">إنجاز المحور</span>
                            <span className="font-bold text-blue-600">{axis.progress}%</span>
                          </div>
                          <div className="w-full bg-white/50 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                              style={{ width: `${axis.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </CardHeader>

                    <AnimatePresence>
                      {expandedAxis === axis.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <CardContent className="p-6 space-y-4">
                            <div className="mb-4 pb-4 border-b-2 border-blue-200 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl p-4">
                              <h4 className="font-bold text-gray-800 flex items-center gap-3 mb-2">
                                <motion.div
                                  animate={{ rotate: [0, 360] }}
                                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                  className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg"
                                >
                                  <BookOpen className="w-6 h-6 text-white" />
                                </motion.div>
                                <span>المحاور الفرعية ({axis.subAxes.length})</span>
                              </h4>
                              <p className="text-sm text-gray-600 mr-12 font-medium">
                                انقر على أي محور فرعي أدناه لعرض الملفات والمحتوى
                              </p>
                            </div>
                            {axis.subAxes.map((subAxis, idx) => (
                              <motion.div
                                key={subAxis.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`border-2 rounded-xl overflow-hidden transition-all cursor-pointer ${
                                  expandedSubAxis === subAxis.id
                                    ? 'border-indigo-400 bg-indigo-50 shadow-lg'
                                    : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md'
                                }`}
                                onClick={() => toggleSubAxis(subAxis.id)}
                              >
                                <button
                                  className="w-full p-4 transition-colors flex items-center justify-between"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSubAxis(subAxis.id);
                                  }}
                                >
                                  <div className="flex items-center gap-3 text-right flex-1">
                                    <motion.div
                                      animate={{ 
                                        rotate: expandedSubAxis === subAxis.id ? 90 : 0 
                                      }}
                                      className="flex-shrink-0"
                                    >
                                      {expandedSubAxis === subAxis.id ? (
                                        <ChevronDown className="w-6 h-6 text-indigo-600" />
                                      ) : (
                                        <ChevronRight className="w-6 h-6 text-gray-600" />
                                      )}
                                    </motion.div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-gray-900">{subAxis.title}</h4>
                                        {expandedSubAxis === subAxis.id && (
                                          <motion.span
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full font-bold"
                                          >
                                            مفتوح
                                          </motion.span>
                                        )}
                      </div>
                                      {subAxis.description && (
                                        <p className="text-sm text-gray-600">{subAxis.description}</p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3 mr-4">
                                    <div className="text-left">
                                      <div className={`text-sm font-bold ${
                                        expandedSubAxis === subAxis.id ? 'text-indigo-600' : 'text-gray-600'
                                      }`}>
                                        {subAxis.files.length}
                                      </div>
                                      <div className="text-xs text-gray-500">ملف</div>
                                    </div>
                                    <motion.div
                                      animate={{ 
                                        scale: expandedSubAxis === subAxis.id ? 1.2 : 1,
                                        rotate: expandedSubAxis === subAxis.id ? 180 : 0
                                      }}
                                      className={`p-2 rounded-lg ${
                                        expandedSubAxis === subAxis.id
                                          ? 'bg-indigo-600 text-white'
                                          : 'bg-gray-100 text-gray-600'
                                      }`}
                                    >
                                      {expandedSubAxis === subAxis.id ? (
                                        <Eye className="w-5 h-5" />
                                      ) : (
                                        <EyeOff className="w-5 h-5" />
                                      )}
                                    </motion.div>
                                  </div>
                                </button>

                                <AnimatePresence>
                                  {expandedSubAxis === subAxis.id && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="bg-gradient-to-br from-white to-gray-50 border-t-2 border-indigo-200"
                                    >
                                      <div className="p-4">
                                        <div className="mb-4 pb-4 border-b-2 border-indigo-200 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl p-4">
                                          <h5 className="font-bold text-gray-800 flex items-center gap-3 mb-2">
                                            <motion.div
                                              animate={{ scale: [1, 1.1, 1] }}
                                              transition={{ duration: 2, repeat: Infinity }}
                                              className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg"
                                            >
                                              <FileText className="w-5 h-5 text-white" />
                                            </motion.div>
                                            <span>الملفات والمحتوى ({subAxis.files.length})</span>
                                          </h5>
                                        </div>
                                        <div className="space-y-3">
                                          {subAxis.files.map((file, fileIdx) => {
                                          const FileIcon = getFileIcon(file.type);
                                          const fileProgress = file.progress || 0;
                                          return (
                                            <motion.div
                                              key={file.id}
                                              initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                              animate={{ opacity: 1, x: 0, scale: 1 }}
                                              transition={{ delay: fileIdx * 0.05 }}
                                              className="flex items-center gap-4 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all group"
                                            >
                                              <motion.div
                                                whileHover={{ scale: 1.15, rotate: 8, y: -3 }}
                                                className={`relative p-5 rounded-2xl shadow-xl transition-all duration-300 ${
                                                  file.type === 'video' 
                                                    ? 'bg-gradient-to-br from-red-400 to-red-600 group-hover:from-red-500 group-hover:to-red-700' :
                                                  file.type === 'podcast' 
                                                    ? 'bg-gradient-to-br from-purple-400 to-purple-600 group-hover:from-purple-500 group-hover:to-purple-700' :
                                                  file.type === 'excel' 
                                                    ? 'bg-gradient-to-br from-green-400 to-green-600 group-hover:from-green-500 group-hover:to-green-700' :
                                                  file.type === 'word' 
                                                    ? 'bg-gradient-to-br from-blue-400 to-blue-600 group-hover:from-blue-500 group-hover:to-blue-700' :
                                                    'bg-gradient-to-br from-gray-400 to-gray-600 group-hover:from-gray-500 group-hover:to-gray-700'
                                                } before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:rounded-2xl`}
                                              >
                                                <FileIcon className={`w-8 h-8 text-white relative z-10 drop-shadow-lg`} />
                                                <motion.div
                                                  className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100"
                                                  animate={{ scale: [0, 1.2, 1] }}
                                                  transition={{ duration: 0.3 }}
                                                />
                                              </motion.div>
                                              <div className="flex-1 text-right">
                                                <div className="flex items-center justify-between mb-1">
                                                  <h5 className="font-semibold text-gray-900">{file.name}</h5>
                                                  {file.isProtected && (
                                                    <Lock className="w-4 h-4 text-amber-600" />
                                                  )}
                      </div>
                                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                                  <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                                                    {getFileTypeLabel(file.type)}
                                                  </span>
                                                  <span>{file.size}</span>
                                                  {file.duration && <span>• {file.duration}</span>}
                                                </div>
                                                {file.description && (
                                                  <p className="text-sm text-gray-600 mt-1">{file.description}</p>
                                                )}
                                                {fileProgress > 0 && (
                                                  <div className="mt-2 space-y-1">
                                                    <div className="flex items-center justify-between text-xs">
                                                      <span className="text-gray-600">التقدم</span>
                                                      <span className="font-bold text-blue-600">{fileProgress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                      <div
                                                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-1.5 rounded-full"
                                                        style={{ width: `${fileProgress}%` }}
                                                      />
                                                    </div>
                </div>
              )}
            </div>
                                              <motion.div 
                                                className="flex items-center gap-2"
                                                whileHover={{ scale: 1.08 }}
                                              >
                                                {file.type === 'video' ? (
                                                  <motion.button
                                                    whileHover={{ scale: 1.1, y: -2 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="px-5 py-2.5 bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white rounded-xl font-bold shadow-xl shadow-red-500/30 hover:from-red-700 hover:via-red-600 hover:to-red-800 transition-all flex items-center gap-2 relative overflow-hidden group/btn"
                                                  >
                                                    <motion.div
                                                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                                                      animate={{ x: ['-100%', '100%'] }}
                                                      transition={{ duration: 2, repeat: Infinity }}
                                                    />
                                                    <motion.div
                                                      animate={{ scale: [1, 1.2, 1] }}
                                                      transition={{ duration: 1.5, repeat: Infinity }}
                                                    >
                                                      <Play className="w-5 h-5 ml-2 relative z-10 fill-white" />
                                                    </motion.div>
                                                    <span className="relative z-10">تشغيل</span>
                                                  </motion.button>
                                                ) : (
                                                  <motion.button
                                                    whileHover={{ scale: 1.1, y: -2 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="px-5 py-2.5 bg-white text-blue-600 rounded-xl font-bold border-2 border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-500 transition-all flex items-center gap-2 shadow-lg"
                                                  >
                                                    <Download className="w-5 h-5 ml-2" />
                                                    تحميل
                                                  </motion.button>
                                                )}
                                              </motion.div>
                                            </motion.div>
                                          );
                                        })}
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            ))}
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                ))}

                {/* Question Bank Section for Current Level */}
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="flex items-center gap-4 text-2xl">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-16 h-16 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/30"
                      >
                        <Target className="w-8 h-8" />
                      </motion.div>
                      <div>
                        <div className="font-extrabold text-gray-900">بنك الأسئلة - {currentLevel.title}</div>
                        <p className="text-base font-semibold text-gray-600 mt-1">
                          {currentLevel.questionBankCount} سؤال متاح للتدريب والاختبار
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 relative z-10">
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg"
                          >
                            <BarChart3 className="w-6 h-6 text-white" />
                          </motion.div>
                          <span className="text-3xl font-extrabold text-blue-600 drop-shadow-sm">
                            {currentLevel.avgScore || 0}%
                          </span>
                        </div>
                        <p className="text-sm font-bold text-gray-700">متوسط النتيجة</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg"
                          >
                            <BookOpen className="w-6 h-6 text-white" />
                          </motion.div>
                          <span className="text-3xl font-extrabold text-green-600 drop-shadow-sm">
                            {currentLevel.questionBankCount}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-gray-700">إجمالي الأسئلة</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <motion.div
                            animate={{ rotate: [0, -360] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg"
                          >
                            <Activity className="w-6 h-6 text-white" />
                          </motion.div>
                          <span className="text-3xl font-extrabold text-purple-600 drop-shadow-sm">
                            {currentLevel.progress}%
                          </span>
                        </div>
                        <p className="text-sm font-bold text-gray-700">معدل الإنجاز</p>
                      </motion.div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link 
                        href="/question-bank?level=cia&tab=free"
                        className="flex-1"
                      >
                    <motion.button
                          whileHover={{ scale: 1.05, y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-6 py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-2xl font-bold shadow-2xl shadow-green-500/30 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <BookOpen className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" />
                          <span className="relative z-10">ابدأ التدريب المجاني</span>
                    </motion.button>
                      </Link>
                      <Link 
                        href="/question-bank?level=cia&tab=premium"
                        className="flex-1"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05, y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-6 py-4 bg-white text-blue-600 rounded-2xl font-bold border-2 border-blue-500 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl"
                        >
                          <Target className="w-6 h-6" />
                          الأسئلة المميزة
                        </motion.button>
                      </Link>
                      <Link 
                        href="/question-bank?level=cia&tab=analytics"
                        className="flex-1"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05, y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-6 py-4 bg-white text-purple-600 rounded-2xl font-bold border-2 border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-600 transition-all flex items-center justify-center gap-3 shadow-xl"
                        >
                          <BarChart3 className="w-6 h-6" />
                          عرض التحليلات
                        </motion.button>
                      </Link>
                </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Link 
                        href="/question-bank"
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-2 justify-center"
                      >
                        <ArrowRight className="w-4 h-4" />
                        الانتقال إلى بنك الأسئلة الكامل
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {/* Progress View */}
          {activeView === 'progress' && (
                <motion.div
              key="progress"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Overall Progress Card */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h2 className="text-4xl md:text-5xl font-extrabold mb-3 flex items-center justify-center gap-3">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <Activity className="w-10 h-10" />
                        </motion.div>
                        تقدمك في الزمالة
                      </h2>
                      <p className="text-blue-100 text-xl">راقب إنجازاتك ومستوى تقدمك</p>
                    </motion.div>
                  </div>
                  <div className="max-w-md mx-auto">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="relative w-full aspect-square mb-6"
                    >
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="45%"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="12"
                          fill="none"
                        />
                        <motion.circle
                          cx="50%"
                          cy="50%"
                          r="45%"
                          stroke="url(#progressGradient)"
                          strokeWidth="12"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 45}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - progressStats.overallProgress / 100) }}
                          transition={{ duration: 1.5, type: "spring" }}
                        />
                        <defs>
                          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                            <stop offset="50%" stopColor="#8b5cf6" stopOpacity={1} />
                            <stop offset="100%" stopColor="#ec4899" stopOpacity={1} />
                          </linearGradient>
                        </defs>
                      </svg>
                      <motion.div 
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="text-center">
                          <div className="text-6xl font-extrabold drop-shadow-2xl">{progressStats.overallProgress}%</div>
                          <div className="text-blue-100 mt-2 font-bold text-lg">إجمالي التقدم</div>
                        </div>
                      </motion.div>
                      {/* Floating particles effect */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full"
                          style={{
                            top: `${30 + (i * 8)}%`,
                            left: `${50 + Math.sin(i * 60 * Math.PI / 180) * 35}%`,
                          }}
                          animate={{
                            y: [-10, 10, -10],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.5, 1]
                          }}
                          transition={{
                            duration: 2 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                    {[
                      { label: 'المستويات المكتملة', value: progressStats.levelsCompleted, icon: GraduationCap, gradient: 'from-blue-400 to-cyan-500', delay: 0.1 },
                      { label: 'الأسئلة المجابة', value: progressStats.totalQuestionsAnswered, icon: BookOpen, gradient: 'from-green-400 to-emerald-500', delay: 0.2 },
                      { label: 'متوسط النتيجة', value: `${progressStats.avgScore}%`, icon: TrendingUp, gradient: 'from-yellow-400 to-orange-500', delay: 0.3 },
                      { label: 'سلسلة النجاح', value: `${progressStats.currentStreak} يوم`, icon: Sparkles, gradient: 'from-purple-400 to-pink-500', delay: 0.4 },
                      { label: 'ساعات الدراسة', value: `${progressStats.hoursStudied}`, icon: Clock, gradient: 'from-red-400 to-rose-500', delay: 0.5 },
                      { label: 'الإنجازات', value: '8', icon: Trophy, gradient: 'from-indigo-400 to-purple-500', delay: 0.6 },
                    ].map((stat, idx) => {
                      const Icon = stat.icon;
                      return (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: stat.delay || 0, type: "spring", stiffness: 150 }}
                          whileHover={{ scale: 1.1, y: -8 }}
                          className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-5 backdrop-blur-sm shadow-xl relative overflow-hidden group`}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <motion.div
                            animate={{ 
                              rotate: [0, 360],
                              scale: [1, 1.2, 1]
                            }}
                            transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                          >
                            <Icon className="w-8 h-8 mb-3 text-white relative z-10" />
                          </motion.div>
                          <div className="text-3xl font-extrabold mb-2 text-white relative z-10">{stat.value}</div>
                          <div className="text-sm font-bold text-white/90 relative z-10">{stat.label}</div>
                          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Levels Progress */}
              <div className="grid md:grid-cols-3 gap-6">
                {levels.map((level, idx) => (
                  <motion.div
                    key={level.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 }}
                  >
                    <Card className="shadow-2xl border-0 overflow-hidden relative group">
                      <div className={`absolute top-0 left-0 w-full h-2 transition-all ${
                        level.progress === 100 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                        level.progress >= 50 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                        'bg-gradient-to-r from-gray-300 to-gray-400'
                      }`}></div>
                      <CardHeader className={`bg-gradient-to-br ${
                        level.progress === 100 ? 'from-green-50 to-emerald-50' :
                        level.progress >= 50 ? 'from-blue-50 to-indigo-50' :
                        'from-gray-50 to-gray-100'
                      } pb-4`}>
                        <CardTitle className="flex items-center gap-4">
                          <motion.div
                            animate={{ 
                              rotate: level.progress === 100 ? 360 : 0,
                              scale: level.progress >= 50 ? [1, 1.1, 1] : 1
                            }}
                            transition={{ duration: 2, repeat: level.progress === 100 ? Infinity : 0 }}
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-xl ${
                              level.progress === 100 ? 'bg-gradient-to-br from-green-600 to-emerald-600' :
                              level.progress >= 50 ? 'bg-gradient-to-br from-blue-600 to-indigo-600' :
                              'bg-gradient-to-br from-gray-400 to-gray-500'
                            } text-white relative overflow-hidden`}
                          >
                            {level.progress === 100 && (
                              <motion.div
                                className="absolute inset-0 bg-white/20"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              />
                            )}
                            {level.progress === 100 ? <CheckCircle2 className="w-8 h-8 relative z-10" /> : <span className="relative z-10">{level.id}</span>}
                          </motion.div>
                          <div className="flex-1">
                            <div className="text-xl font-extrabold text-gray-900">{level.title}</div>
                            <p className="text-sm font-semibold text-gray-600 mt-1">{level.progress}% مكتمل</p>
                            </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <div className="w-full bg-gray-200 rounded-full h-4 mb-3 shadow-inner">
                              <motion.div
                                className={`h-4 rounded-full shadow-lg ${
                                  level.progress === 100 ? 'bg-gradient-to-r from-green-600 to-emerald-600' :
                                  level.progress >= 50 ? 'bg-gradient-to-r from-blue-600 to-indigo-600' :
                                  'bg-gradient-to-r from-gray-400 to-gray-500'
                                }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${level.progress}%` }}
                                transition={{ duration: 1, type: "spring" }}
                              />
                                  </div>
                            <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4" />
                                {level.mainAxes.length} محور
                              </span>
                              <span className="flex items-center gap-1">
                                <Target className="w-4 h-4" />
                                {level.questionBankCount} سؤال
                              </span>
                              </div>
                            </div>
                          {level.avgScore !== undefined && level.avgScore > 0 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 shadow-md"
                            >
                              <span className="text-sm font-bold text-gray-700">متوسط النتيجة</span>
                              <span className="text-2xl font-extrabold text-blue-600">{level.avgScore}%</span>
                            </motion.div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                      ))}
                    </div>

              {/* Achievements Section */}
              <Card className="shadow-2xl border-0 overflow-hidden relative bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-300/30 to-orange-300/30 rounded-full blur-3xl"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-4 text-3xl">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 15, -15, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-4 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-2xl"
                    >
                      <Trophy className="w-10 h-10 text-white" />
                    </motion.div>
                    <div className="font-extrabold text-gray-900">الإنجازات</div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="grid md:grid-cols-4 gap-6">
                    {[
                      { title: 'المبتدئ', description: 'أكمل أول محور', earned: true, icon: '🎯', gradient: 'from-green-500 to-emerald-600' },
                      { title: 'المثابر', description: 'أجب على 100 سؤال', earned: true, icon: '🔥', gradient: 'from-orange-500 to-red-600' },
                      { title: 'الخبير', description: 'أكمل المستوى الأول', earned: false, icon: '⭐', gradient: 'from-blue-500 to-indigo-600' },
                      { title: 'المحترف', description: 'أكمل جميع المستويات', earned: false, icon: '🏆', gradient: 'from-purple-500 to-pink-600' },
                    ].map((achievement, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20, rotate: -10 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        transition={{ delay: idx * 0.15, type: "spring", stiffness: 150 }}
                        whileHover={{ scale: 1.1, y: -10, rotate: 5 }}
                        className={`p-6 rounded-3xl border-3 text-center relative overflow-hidden shadow-xl transition-all ${
                          achievement.earned
                            ? `border-green-500 bg-gradient-to-br ${achievement.gradient} shadow-2xl shadow-green-500/30`
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {achievement.earned && (
                          <>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                              animate={{ x: ['-100%', '100%'] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            {/* Confetti effect */}
                            {[...Array(8)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white rounded-full"
                                style={{
                                  top: `${20 + (i * 10)}%`,
                                  left: `${10 + (i * 10)}%`,
                                }}
                                animate={{
                                  y: [0, -30, 0],
                                  opacity: [1, 0, 1],
                                  x: [0, Math.sin(i) * 20]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }}
                              />
                            ))}
                          </>
                        )}
                        <motion.div
                          animate={{ scale: achievement.earned ? [1, 1.2, 1] : 1 }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-6xl mb-4 relative z-10"
                        >
                          {achievement.icon}
                        </motion.div>
                        <h4 className={`font-extrabold text-xl mb-2 relative z-10 ${achievement.earned ? 'text-white' : 'text-gray-900'}`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm font-semibold mb-4 relative z-10 ${achievement.earned ? 'text-white/90' : 'text-gray-600'}`}>
                          {achievement.description}
                        </p>
                        {achievement.earned ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center justify-center gap-2 text-white relative z-10"
                          >
                            <CheckCircle2 className="w-6 h-6" />
                            <span className="text-sm font-bold">محقق</span>
                          </motion.div>
                        ) : (
                          <div className="flex items-center justify-center gap-2 text-gray-400 relative z-10">
                            <Lock className="w-6 h-6" />
                            <span className="text-sm font-semibold">غير محقق</span>
                  </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Question Bank View */}
          {activeView === 'questionBank' && (
            <motion.div
              key="questionBank"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Question Bank Overview */}
              <Card className="shadow-2xl border-0 overflow-hidden relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-300/30 to-purple-300/30 rounded-full blur-3xl"></div>
                <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white relative z-10">
                  <CardTitle className="text-3xl flex items-center gap-4">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-2xl"
                    >
                      <Target className="w-10 h-10" />
                    </motion.div>
                    <div>
                      <div className="font-extrabold">بنك الأسئلة الشامل</div>
                      <p className="text-base font-normal text-white/90 mt-1">تدريب شامل وتحليلات متقدمة</p>
                                </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 relative z-10">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {[
                      { label: 'إجمالي الأسئلة', value: '1,150+', icon: BookOpen, color: 'from-blue-500 via-cyan-500 to-blue-600', bgGradient: 'from-blue-500/20 via-cyan-500/20 to-blue-600/20' },
                      { label: 'متوسط النتيجة', value: `${progressStats.avgScore}%`, icon: BarChart3, color: 'from-green-500 via-emerald-500 to-green-600', bgGradient: 'from-green-500/20 via-emerald-500/20 to-green-600/20' },
                      { label: 'الأسئلة المجابة', value: progressStats.totalQuestionsAnswered + '+', icon: CheckCircle2, color: 'from-purple-500 via-pink-500 to-purple-600', bgGradient: 'from-purple-500/20 via-pink-500/20 to-purple-600/20' },
                    ].map((stat, idx) => {
                      const Icon = stat.icon;
                      return (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: idx * 0.15, type: "spring", stiffness: 150 }}
                          whileHover={{ scale: 1.08, y: -8 }}
                          className={`bg-gradient-to-br ${stat.color} text-white rounded-3xl p-7 shadow-2xl relative overflow-hidden group`}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <div className="relative z-10">
                            <motion.div
                              animate={{ 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                              className="inline-flex p-4 bg-white/20 backdrop-blur-md rounded-2xl mb-4 shadow-xl"
                            >
                              <Icon className="w-10 h-10" />
                            </motion.div>
                            <div className="text-4xl font-extrabold mb-3 drop-shadow-lg">{stat.value}</div>
                            <div className="text-base font-bold text-white/90">{stat.label}</div>
                          </div>
                          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Levels Question Banks */}
                  <div className="space-y-6">
                    {levels.map((level, idx) => (
                      <motion.div
                        key={level.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Card className="border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all overflow-hidden relative group">
                          <div className={`absolute top-0 left-0 w-1 h-full transition-all ${
                            level.id === 1 ? 'bg-gradient-to-b from-blue-500 to-cyan-500' :
                            level.id === 2 ? 'bg-gradient-to-b from-purple-500 to-pink-500' :
                            'bg-gradient-to-b from-green-500 to-emerald-500'
                          }`}></div>
                          <CardHeader className="bg-gradient-to-br from-gray-50 to-white">
                            <div className="flex items-center justify-between">
                              <CardTitle className="flex items-center gap-4">
                                <motion.div
                                  animate={{ 
                                    rotate: level.progress === 100 ? 360 : 0,
                                    scale: level.progress >= 50 ? [1, 1.05, 1] : 1
                                  }}
                                  transition={{ duration: 2, repeat: level.progress === 100 ? Infinity : 0 }}
                                  className={`w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-xl ${
                                    level.id === 1 ? 'bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600' :
                                    level.id === 2 ? 'bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600' :
                                    'bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600'
                                  } text-white`}
                                >
                                  {level.progress === 100 ? <CheckCircle2 className="w-8 h-8" /> : level.id}
                                </motion.div>
                                <div>
                                  <div className="text-2xl font-extrabold text-gray-900">{level.title} - بنك الأسئلة</div>
                                  <p className="text-sm font-semibold text-gray-600 mt-1 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" />
                                    {level.questionBankCount} سؤال متاح للتدريب
                                  </p>
                                  </div>
                              </CardTitle>
                              <Link href={`/question-bank?level=cia&levelId=${level.id}`}>
                                <motion.button
                                  whileHover={{ scale: 1.1, x: -5 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-xl shadow-purple-500/30 hover:shadow-2xl transition-all flex items-center gap-2 group/btn relative overflow-hidden"
                                >
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  />
                                  <span className="relative z-10">ابدأ التدريب</span>
                                  <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                </motion.button>
                              </Link>
                                </div>
                          </CardHeader>
                          <CardContent className="p-6">
                            <div className="grid md:grid-cols-3 gap-4">
                              <motion.div
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-200 shadow-lg"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                    className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg"
                                  >
                                    <BarChart3 className="w-6 h-6 text-white" />
                                  </motion.div>
                                  <span className="text-3xl font-extrabold text-blue-600">
                                    {level.avgScore || 0}%
                                  </span>
                              </div>
                                <p className="text-sm font-bold text-gray-700">النتيجة المتوسطة</p>
                              </motion.div>
                              <motion.div
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border-2 border-green-200 shadow-lg"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg"
                                  >
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                  </motion.div>
                                  <span className="text-3xl font-extrabold text-green-600">
                                    {Math.floor((level.questionBankCount * (level.progress || 0)) / 100)}
                                  </span>
                              </div>
                                <p className="text-sm font-bold text-gray-700">الأسئلة المجابة</p>
                              </motion.div>
                              <motion.div
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-200 shadow-lg"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <motion.div
                                    animate={{ rotate: [0, -360] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                    className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg"
                                  >
                                    <Activity className="w-6 h-6 text-white" />
                                  </motion.div>
                                  <span className="text-3xl font-extrabold text-purple-600">
                                    {level.progress}%
                                  </span>
                            </div>
                                <p className="text-sm font-bold text-gray-700">التقدم</p>
                              </motion.div>
                          </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                          </div>

                  {/* Tabs for Question Bank Sections */}
                  <div className="mt-8 mb-6">
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-2 shadow-2xl border-2 border-gray-200 inline-flex gap-3">
                      {[
                        { id: 'free', label: 'مجاني', icon: BookOpen, gradient: 'from-green-600 via-emerald-600 to-teal-600', borderColor: 'green-500' },
                        { id: 'premium', label: 'مميز', icon: Target, gradient: 'from-purple-600 via-pink-600 to-fuchsia-600', borderColor: 'purple-500' },
                        { id: 'analytics', label: 'تحليلات', icon: BarChart3, gradient: 'from-blue-600 via-indigo-600 to-purple-600', borderColor: 'blue-500' },
                        { id: 'ai', label: 'ذكاء اصطناعي', icon: Sparkles, gradient: 'from-orange-600 via-amber-600 to-yellow-600', borderColor: 'orange-500' },
                      ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <motion.button
                            key={tab.id}
                            onClick={() => setQuestionBankTab(tab.id as any)}
                            className={`px-6 md:px-8 py-3 md:py-4 rounded-2xl text-base font-bold transition-all duration-300 flex items-center gap-3 relative overflow-hidden ${
                              questionBankTab === tab.id
                                ? `bg-gradient-to-r ${tab.gradient} text-white shadow-2xl border-2 border-${tab.borderColor}`
                                : 'text-gray-700 bg-white border-2 border-gray-300 hover:border-gray-400 hover:shadow-lg'
                            }`}
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {questionBankTab === tab.id && (
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                            <Icon className={`w-6 h-6 relative z-10 ${questionBankTab === tab.id ? 'drop-shadow-lg' : ''}`} />
                            <span className="relative z-10">{tab.label}</span>
                          </motion.button>
                        );
                      })}
                      </div>
                    </div>

                  {/* Question Bank Content */}
                  {loading ? (
                    <div className="text-center py-16">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"
                      ></motion.div>
                      <motion.p 
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="mt-6 text-gray-600 font-semibold text-lg"
                      >
                        جاري تحميل بنك الأسئلة...
                      </motion.p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {questionBankTab === 'free' && (
                        <FreeSection questions={questions} />
                      )}

                      {questionBankTab === 'premium' && (
                        <PremiumSection 
                          questions={questions} 
                          isSubscribed={isSubscribed} 
                        />
                      )}

                      {questionBankTab === 'analytics' && (
                        isSubscribed ? (
                          <AnalyticsSection 
                            questions={questions} 
                            quizResults={quizResults} 
                            isSubscribed={isSubscribed} 
                          />
                        ) : (
                          <Card className="border-2 border-amber-200 bg-amber-50">
                            <CardContent className="p-8 text-center">
                              <Lock className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                              <h3 className="text-xl font-bold text-amber-900 mb-2">قسم التحليلات المتقدم</h3>
                              <p className="text-amber-800 mb-4">
                                هذا القسم متاح للمشتركين فقط. اشترك الآن للوصول إلى تحليلات مفصلة لأدائك.
                              </p>
                              <Link href="/question-bank?tab=premium">
                                <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                                  <Crown className="w-5 h-5 ml-2" />
                                  الاشتراك الآن
                                </Button>
                              </Link>
                            </CardContent>
                          </Card>
                        )
                      )}

                      {questionBankTab === 'ai' && (
                        isSubscribed ? (
                          <AISection
                            questions={questions}
                            isSubscribed={isSubscribed}
                            onGenerateQuestions={async () => []}
                            onAnalyzePerformance={async () => ({ strengths: [], weaknesses: [], recommendedTopics: [], improvementScore: 0 })}
                            onGetRecommendations={async () => []}
                          />
                        ) : (
                          <Card className="border-2 border-purple-200 bg-purple-50">
                            <CardContent className="p-8 text-center">
                              <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                              <h3 className="text-xl font-bold text-purple-900 mb-2">أدوات الذكاء الاصطناعي</h3>
                              <p className="text-purple-800 mb-4">
                                استخدم الذكاء الاصطناعي لتوليد أسئلة جديدة وتحليل أدائك. متاح للمشتركين فقط.
                              </p>
                              <Link href="/question-bank?tab=premium">
                                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                                  <Crown className="w-5 h-5 ml-2" />
                                  الاشتراك الآن
                                </Button>
                              </Link>
                            </CardContent>
                          </Card>
                        )
                      )}
                    </div>
                  )}

                  {/* Link to Full Question Bank */}
                  <div className="mt-8 pt-6 border-t-2 border-gray-200 text-center">
                    <Link 
                      href="/question-bank"
                      className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-700 hover:underline font-bold text-lg group"
                    >
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="group-hover:bg-blue-100 p-2 rounded-lg transition-colors"
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                      الانتقال إلى بنك الأسئلة الكامل مع جميع الميزات
                    </Link>
                  </div>

                  {/* Analytics Section */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <PieChart className="w-6 h-6 text-indigo-600" />
                      تحليل الأداء
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600"></div>
                        <CardContent className="p-6">
                          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                              className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg"
                            >
                              <BarChart3 className="w-5 h-5 text-white" />
                            </motion.div>
                            الأداء حسب المستوى
                          </h4>
                          <div className="space-y-4">
                            {levels.map((level) => (
                              <motion.div
                                key={level.id}
                                whileHover={{ x: 5 }}
                                className="space-y-2"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-bold text-gray-700">المستوى {level.id}</span>
                                  <span className="text-lg font-extrabold text-blue-600">
                                    {level.avgScore || 0}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                                  <motion.div
                                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 h-3 rounded-full shadow-lg"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${level.avgScore || 0}%` }}
                                    transition={{ duration: 1, type: "spring" }}
                                  />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-500 to-emerald-600"></div>
                        <CardContent className="p-6">
                          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg"
                            >
                              <Activity className="w-5 h-5 text-white" />
                            </motion.div>
                            إحصائيات التدريب
                          </h4>
                          <div className="space-y-4">
                            <motion.div
                              whileHover={{ scale: 1.03, x: -5 }}
                              className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200"
                            >
                              <span className="text-sm font-bold text-gray-700">إجمالي الاختبارات</span>
                              <span className="text-2xl font-extrabold text-blue-600">24</span>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.03, x: -5 }}
                              className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200"
                            >
                              <span className="text-sm font-bold text-gray-700">أفضل نتيجة</span>
                              <span className="text-2xl font-extrabold text-green-600">85%</span>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.03, x: -5 }}
                              className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200"
                            >
                              <span className="text-sm font-bold text-gray-700">متوسط الوقت</span>
                              <span className="text-2xl font-extrabold text-purple-600">45 دقيقة</span>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.03, x: -5 }}
                              className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200"
                            >
                              <span className="text-sm font-bold text-gray-700">معدل النجاح</span>
                              <span className="text-2xl font-extrabold text-orange-600">72%</span>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
                </motion.div>
              )}
        </AnimatePresence>
      </div>
    </div>
  );
}
