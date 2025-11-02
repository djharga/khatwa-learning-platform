'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  Circle,
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Brain,
  FileText,
  TrendingUp,
  BarChart3,
  Target,
  Play,
  Download,
  Upload,
  Calculator,
  Shield,
  Zap,
  Sparkles,
  Eye,
  Edit,
  Save,
  Settings,
  Filter,
  Search,
  Grid,
  List,
  Star,
  Clock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MessageSquare,
  Lightbulb,
  Trophy,
  Medal,
  Crown,
  Gem,
  Rocket,
  GraduationCap,
  Briefcase,
  Building,
  DollarSign,
  PieChart,
  Activity,
  AlertTriangle,
  CheckSquare,
  FileCheck,
  Database,
  Server,
  Lock,
  Unlock,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  FastForward,
  Rewind,
  Pause,
  PlayCircle,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Heart,
  Share,
  Link,
  Copy,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Camera,
  Video,
  Mic,
  MicOff,
  Speaker,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Globe,
  Home,
  Folder,
  FolderOpen,
  File,
  Image,
  Music,
  Archive,
  Code,
  Terminal,
  Cpu,
  HardDrive,
  MemoryStick,
  Battery,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Wind,
  Snowflake,
  Thermometer,
  EyeOff,
  Trash2,
  Plus,
  Minus,
  X,
  MoreHorizontal,
  MoreVertical,
  ChevronLeft,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  CornerDownLeft,
  CornerDownRight,
  Move,
  RefreshCw,
  Loader,
  AlertCircle,
  Info,
  HelpCircle,
  Bell,
  BellOff,
  Volume,
  Volume1,
  Bluetooth,
  BluetoothConnected,
  Package,
  ShoppingCart,
  GitCompare,
  Presentation,
} from 'lucide-react';
import LiquidGlass from '@/components/common/LiquidGlass';

// المسارات التعليمية المتدرجة
const learningPaths = [
  {
    id: 1,
    title: 'مسار المراجعة الداخلية',
    description: 'من أساسيات المراجعة إلى الخبرة المتقدمة',
    level: 'مبتدئ إلى خبير',
    duration: '12 شهر',
    icon: Shield,
    color: 'from-blue-500 to-indigo-600',
    steps: [
      {
        id: 1,
        title: 'أساسيات المراجعة الداخلية',
        completed: true,
        courses: 3,
        level: 'مبتدئ',
        skills: ['مفاهيم أساسية', 'إطار COSO', 'معايير IIA']
      },
      {
        id: 2,
        title: 'تقنيات المراجعة العملية',
        completed: true,
        courses: 4,
        level: 'مبتدئ',
        skills: ['أدوات المراجعة', 'جمع الأدلة', 'تقييم المخاطر']
      },
      {
        id: 3,
        title: 'المراجعة في البيئة الرقمية',
        completed: false,
        courses: 2,
        level: 'متوسط',
        skills: ['التكنولوجيا المالية', 'البيانات الرقمية', 'الأمن السيبراني']
      },
      {
        id: 4,
        title: 'إدارة مخاطر المراجعة',
        completed: false,
        courses: 3,
        level: 'متوسط',
        skills: ['تحليل المخاطر', 'إدارة المخاطر', 'الرقابة الداخلية']
      },
      {
        id: 5,
        title: 'المراجعة المتقدمة والامتثال',
        completed: false,
        courses: 5,
        level: 'خبير',
        skills: ['الامتثال التنظيمي', 'المراجعة الاستراتيجية', 'إدارة الجودة']
      },
    ],
  },
  {
    id: 2,
    title: 'مسار المحاسبة المالية',
    description: 'رحلة شاملة في عالم المحاسبة',
    level: 'مبتدئ إلى خبير',
    duration: '15 شهر',
    icon: Calculator,
    color: 'from-green-500 to-emerald-600',
    steps: [
      { id: 1, title: 'مبادئ المحاسبة الأساسية', completed: true, courses: 4, level: 'مبتدئ' },
      { id: 2, title: 'التقارير المالية', completed: false, courses: 3, level: 'مبتدئ' },
      { id: 3, title: 'المحاسبة الإدارية', completed: false, courses: 3, level: 'متوسط' },
      { id: 4, title: 'المحاسبة الضريبية', completed: false, courses: 2, level: 'متوسط' },
      { id: 5, title: 'التدقيق المالي المتقدم', completed: false, courses: 4, level: 'خبير' },
    ],
  },
  {
    id: 3,
    title: 'مسار الضرائب والامتثال',
    description: 'فهم شامل للضرائب واللوائح المالية',
    level: 'مبتدئ إلى خبير',
    duration: '10 أشهر',
    icon: FileCheck,
    color: 'from-purple-500 to-pink-600',
    steps: [
      { id: 1, title: 'أساسيات الضرائب', completed: false, courses: 3, level: 'مبتدئ' },
      { id: 2, title: 'الامتثال الضريبي', completed: false, courses: 4, level: 'مبتدئ' },
      { id: 3, title: 'التخطيط الضريبي المتقدم', completed: false, courses: 3, level: 'متوسط' },
      { id: 4, title: 'الضرائب الدولية', completed: false, courses: 2, level: 'متوسط' },
      { id: 5, title: 'التحقيقات الضريبية', completed: false, courses: 4, level: 'خبير' },
    ],
  },
  {
    id: 4,
    title: 'مسار الإدارة المالية',
    description: 'بناء مهارات الإدارة المالية الفعالة',
    level: 'مبتدئ إلى خبير',
    duration: '14 شهر',
    icon: TrendingUp,
    color: 'from-orange-500 to-red-600',
    steps: [
      { id: 1, title: 'أساسيات الإدارة المالية', completed: false, courses: 4, level: 'مبتدئ' },
      { id: 2, title: 'التحليل المالي', completed: false, courses: 3, level: 'مبتدئ' },
      { id: 3, title: 'إدارة التدفق النقدي', completed: false, courses: 3, level: 'متوسط' },
      { id: 4, title: 'الاستثمار والتمويل', completed: false, courses: 2, level: 'متوسط' },
      { id: 5, title: 'التخطيط المالي الاستراتيجي', completed: false, courses: 4, level: 'خبير' },
    ],
  },
  {
    id: 5,
    title: 'مسار التدقيق الخارجي',
    description: 'تطوير مهارات التدقيق المستقل',
    level: 'مبتدئ إلى خبير',
    duration: '16 شهر',
    icon: Search,
    color: 'from-cyan-500 to-blue-600',
    steps: [
      { id: 1, title: 'مبادئ التدقيق', completed: false, courses: 3, level: 'مبتدئ' },
      { id: 2, title: 'التدقيق المالي', completed: false, courses: 4, level: 'مبتدئ' },
      { id: 3, title: 'التدقيق التشغيلي', completed: false, courses: 3, level: 'متوسط' },
      { id: 4, title: 'التدقيق البيئي', completed: false, courses: 2, level: 'متوسط' },
      { id: 5, title: 'التدقيق المتقدم والتقارير', completed: false, courses: 5, level: 'خبير' },
    ],
  },
  {
    id: 6,
    title: 'مسار التحليل المالي',
    description: 'مهارات التحليل والتوقعات المالية',
    level: 'مبتدئ إلى خبير',
    duration: '13 شهر',
    icon: BarChart3,
    color: 'from-teal-500 to-green-600',
    steps: [
      { id: 1, title: 'أدوات التحليل الأساسية', completed: false, courses: 3, level: 'مبتدئ' },
      { id: 2, title: 'تحليل النسب المالية', completed: false, courses: 4, level: 'مبتدئ' },
      { id: 3, title: 'التحليل الإحصائي', completed: false, courses: 3, level: 'متوسط' },
      { id: 4, title: 'التوقعات المالية', completed: false, courses: 2, level: 'متوسط' },
      { id: 5, title: 'تحليل المخاطر والعائد', completed: false, courses: 4, level: 'خبير' },
    ],
  },
];

// بوابة التعلم المستمر
const learningPortal = {
  courses: [
    { id: 1, title: 'إدارة المخاطر في المؤسسات', category: 'إدارة المخاطر', rating: 4.8, students: 1250, duration: '6 ساعات', level: 'متوسط' },
    { id: 2, title: 'تحليل البيانات المالية', category: 'التحليل المالي', rating: 4.7, students: 890, duration: '8 ساعات', level: 'متقدم' },
    { id: 3, title: 'الامتثال والرقابة الداخلية', category: 'الامتثال', rating: 4.9, students: 650, duration: '10 ساعات', level: 'متقدم' },
  ],
  tests: [
    { id: 1, title: 'اختبار أساسيات المراجعة', questions: 20, duration: '30 دقيقة', passingScore: 70 },
    { id: 2, title: 'اختبار التحليل المالي', questions: 25, duration: '45 دقيقة', passingScore: 75 },
  ],
  certificates: [
    { id: 1, title: 'شهادة المراجع المعتمد', issuer: 'IIA', validity: '3 سنوات' },
    { id: 2, title: 'شهادة المحاسب المالي', issuer: 'SOA', validity: '5 سنوات' },
  ]
};

// وحدات المحاكاة الواقعية
const simulationModules = [
  {
    id: 1,
    title: 'محاكاة عمليات المشتريات',
    description: 'تجربة واقعية لعمليات الشراء والتوريد',
    icon: ShoppingCart,
    scenarios: ['طلب شراء', 'عرض أسعار', 'عقد توريد', 'استلام البضائع'],
    difficulty: 'متوسط',
    duration: '2 ساعات'
  },
  {
    id: 2,
    title: 'محاكاة إدارة المخزون',
    description: 'إدارة المخزون والتسويات الجردية',
    icon: Package,
    scenarios: ['الجرد الدوري', 'تسوية الفروقات', 'إدارة الطلبات'],
    difficulty: 'متقدم',
    duration: '3 ساعات'
  },
  {
    id: 3,
    title: 'محاكاة نظام الرواتب',
    description: 'معالجة الرواتب والمزايا الوظيفية',
    icon: DollarSign,
    scenarios: ['حساب الرواتب', 'الخصومات', 'المزايا الإضافية'],
    difficulty: 'متقدم',
    duration: '2.5 ساعات'
  },
  {
    id: 4,
    title: 'محاكاة الأمن السيبراني',
    description: 'حماية البيانات والأنظمة من التهديدات',
    icon: Shield,
    scenarios: ['كشف الاختراقات', 'الاستجابة للحوادث', 'تعزيز الأمان'],
    difficulty: 'خبير',
    duration: '4 ساعات'
  }
];

// المكتبة التفاعلية
const interactiveLibrary = {
  templates: [
    {
      id: 1,
      title: 'قالب تقرير المراجعة الداخلية',
      type: 'Word',
      editable: true,
      downloadable: true,
      preview: true,
      tags: ['تقارير', 'مراجعة داخلية']
    },
    {
      id: 2,
      title: 'نموذج تحليل المخاطر',
      type: 'Excel',
      editable: true,
      downloadable: true,
      preview: true,
      tags: ['تحليل', 'مخاطر']
    }
  ],
  checklists: [
    {
      id: 1,
      title: 'قائمة تدقيق الامتثال',
      items: 25,
      editable: true,
      category: 'امتثال'
    },
    {
      id: 2,
      title: 'قائمة تدقيق المخاطر',
      items: 30,
      editable: true,
      category: 'مخاطر'
    }
  ],
  dashboards: [
    {
      id: 1,
      title: 'لوحة المؤشرات المالية',
      widgets: ['الإيرادات', 'المصروفات', 'الربحية'],
      editable: true,
      realTime: true
    },
    {
      id: 2,
      title: 'لوحة مراقبة المخاطر',
      widgets: ['مخاطر تشغيلية', 'مخاطر مالية', 'مخاطر امتثال'],
      editable: true,
      realTime: true
    }
  ]
};

// الأدوات الذكية بالذكاء الاصطناعي
const aiTools = [
  {
    id: 'ai-auditor',
    title: 'المراجع الآلي (AI Co-Auditor)',
    description: 'مساعد ذكي يصحح الأخطاء ويقترح تحسينات فورية',
    icon: Brain,
    features: ['تصحيح أخطاء المحاسبة', 'اقتراحات تحسين', 'تحليل المخاطر'],
    demo: 'جرب المراجع الآلي'
  },
  {
    id: 'risk-analyzer',
    title: 'محلل المخاطر الذكي (AI Risk Analyzer)',
    description: 'تحليل الملفات وتقديم توصيات للحد من المخاطر',
    icon: TrendingUp,
    features: ['تحليل البيانات المالية', 'تحديد المخاطر', 'توصيات وقائية'],
    demo: 'ابدأ التحليل'
  },
  {
    id: 'predictive-dashboard',
    title: 'لوحة القيادة التنبؤية (Predictive Dashboard)',
    description: 'توقع المخاطر والفرص المستقبلية',
    icon: BarChart3,
    features: ['تنبؤات مالية', 'تحليل اتجاهات', 'تنبيهات مبكرة'],
    demo: 'استكشف اللوحة'
  },
  {
    id: 'smart-assistant',
    title: 'مساعد أعمال ذكي شخصي',
    description: 'يجيب عن الأسئلة المتعلقة بملفات العميل',
    icon: MessageSquare,
    features: ['إجابات فورية', 'فهم السياق', 'اقتراحات مخصصة'],
    demo: 'تحدث مع المساعد'
  },
  {
    id: 'executive-summary',
    title: 'الملخص التنفيذي الفوري',
    description: 'تحويل التقارير الطويلة إلى ملخص مركز',
    icon: FileText,
    features: ['تلخيص ذكي', 'استخراج النقاط الرئيسية', 'تنسيق احترافي'],
    demo: 'جرب التلخيص'
  },
  {
    id: 'smart-comparator',
    title: 'المقارن الذكي (Smart Comparator)',
    description: 'مقارنة الملفات واستخراج الفروقات',
    icon: GitCompare,
    features: ['مقارنة البيانات', 'تحديد التغييرات', 'تقارير تفصيلية'],
    demo: 'ابدأ المقارنة'
  },
  {
    id: 'ai-presentations',
    title: 'منشئ العروض التقديمية الذكي',
    description: 'توليد عروض PowerPoint احترافية',
    icon: Presentation,
    features: ['تصميم احترافي', 'رسوم بيانية', 'تخصيص كامل'],
    demo: 'أنشئ عرضاً'
  },
  {
    id: 'content-generator',
    title: 'توليد المحتوى التسويقي',
    description: 'إنشاء محتوى تسويقي جاهز للاستخدام',
    icon: Sparkles,
    features: ['منشورات وسوشيال', 'إيميلات', 'محتوى ترويجي'],
    demo: 'ابدأ التوليد'
  }
];

const LearningPathsPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - el.offsetLeft);
      setScrollLeftStart(el.scrollLeft);
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 3; // سرعة التمرير
      el.scrollLeft = scrollLeftStart - walk;
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mousemove', handleMouseMove);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, startX, scrollLeftStart]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-20 relative">
      <LiquidGlass />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="heading-1 text-primary mb-4">خريطة المسارات التعليمية</h1>
          <p className="body-text text-text-secondary max-w-3xl mx-auto text-lg">
            استكشف خريطة المسارات التعليمية الشاملة لمنصة الخطوة. اسحب بالماوس للتنقل بين المسارات المختلفة وابدأ رحلتك التعليمية
          </p>
        </motion.div>

        {/* Learning Paths */}
        <div
          ref={scrollRef}
          className="relative overflow-x-auto scrollbar-hide"
          style={{
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
          }}
        >
          <div className="flex space-x-8 pb-8" style={{ width: 'max-content' }}>
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </div>
            {learningPaths.map((path, pathIndex) => {
              const completedSteps = path.steps.filter(step => step.completed).length;
              const progressPercentage = (completedSteps / path.steps.length) * 100;
              return (
                <div key={path.id}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: pathIndex * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 min-w-[400px] flex-shrink-0"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="heading-2 text-primary">{path.title}</h2>
                      <span className="text-sm text-text-secondary">{progressPercentage.toFixed(0)}% مكتمل</span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mb-2">
                      <motion.div
                        className="bg-success h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <p className="text-text-secondary">{path.description}</p>
                  </div>

                  {/* Path Visualization */}
                  <div className="relative overflow-x-auto scrollbar-hide" style={{ scrollBehavior: 'smooth', scrollSnapType: 'x mandatory' }}>
                    <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
                      {path.steps.map((step, index) => (
                        <motion.div
                          key={step.id}
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: index * 0.1 + 0.3,
                            type: 'spring',
                            stiffness: 200,
                          }}
                          viewport={{ once: true }}
                          className="flex flex-col items-center min-w-[200px] flex-shrink-0"
                          style={{ scrollSnapAlign: 'start' }}
                        >
                          {/* Step Circle */}
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                              step.completed
                                ? 'bg-success text-white'
                                : 'bg-neutral-200 dark:bg-neutral-700 text-text-secondary'
                            }`}
                          >
                            {step.completed ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <Circle className="w-6 h-6" />
                            )}
                          </div>

                          {/* Step Content */}
                          <div className="text-center max-w-xs">
                            <h3
                              className={`text-base font-semibold mb-1 ${
                                step.completed
                                  ? 'text-primary'
                                  : 'text-text-secondary'
                              }`}
                            >
                              {step.title}
                            </h3>
                            <p className="text-xs text-text-secondary">
                              {step.courses} دورات
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                {pathIndex < learningPaths.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="flex-shrink-0 self-center mx-4"
                  >
                    <ArrowRight className="w-8 h-8 text-primary" />
                  </motion.div>
                )}
                </div>
              );
            })}
          </div>
        </div>

        {/* بوابة التعلم المستمر */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="heading-2 text-primary mb-8 text-center">
            بوابة التعلم المستمر
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPortal.courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary mr-2" />
                  <span className="text-sm text-text-secondary">
                    {course.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">
                  {course.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-1" />
                    {course.students}
                  </div>
                  <div>{course.duration}</div>
                </div>
                <div className="flex items-center mb-4">
                  <Award className="w-5 h-5 text-warning mr-1" />
                  <span className="text-sm text-text-secondary">
                    {course.rating} ★
                  </span>
                </div>
                <button className="group relative w-full inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 min-h-11">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative">سجل الآن</span>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* وحدات المحاكاة الواقعية */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="heading-2 text-primary mb-8 text-center">
            وحدات المحاكاة الواقعية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {simulationModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {module.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-4">
                      {module.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
                      <span>الصعوبة: {module.difficulty}</span>
                      <span>{module.duration}</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {module.scenarios.map((scenario, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>{scenario}</span>
                        </div>
                      ))}
                    </div>
                    <button className="group relative w-full inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative">ابدأ المحاكاة</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* المكتبة التفاعلية */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="heading-2 text-primary mb-8 text-center">
            المكتبة التفاعلية
          </h2>

          {/* القوالب */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-primary mb-6">القوالب</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interactiveLibrary.templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div>
                        <h4 className="font-bold text-primary">{template.title}</h4>
                        <p className="text-sm text-text-secondary">{template.type}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {template.editable && <Edit className="w-5 h-5 text-green-600" />}
                      {template.downloadable && <Download className="w-5 h-5 text-blue-600" />}
                      {template.preview && <Eye className="w-5 h-5 text-purple-600" />}
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary mb-4">قالب جاهز للاستخدام في {template.type}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="group relative flex-1 inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative">تحميل</span>
                    </button>
                    <button className="group relative flex-1 inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                      <span className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left"></span>
                      <span className="relative group-hover:text-white transition-colors duration-300">معاينة</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* قوائم المراجعة */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-primary mb-6">قوائم المراجعة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interactiveLibrary.checklists.map((checklist, index) => (
                <motion.div
                  key={checklist.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <CheckSquare className="w-8 h-8 text-green-600" />
                      <div>
                        <h4 className="font-bold text-primary">{checklist.title}</h4>
                        <p className="text-sm text-text-secondary">{checklist.category}</p>
                      </div>
                    </div>
                    <span className="text-sm text-text-secondary">{checklist.items} عنصر</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                      فتح القائمة
                    </button>
                    {checklist.editable && (
                      <button className="flex-1 border border-primary text-primary py-2 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                        تعديل
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* لوحات البيانات */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-6">لوحات البيانات</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interactiveLibrary.dashboards.map((dashboard, index) => (
                <motion.div
                  key={dashboard.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-8 h-8 text-orange-600" />
                      <div>
                        <h4 className="font-bold text-primary">{dashboard.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {dashboard.realTime && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              مباشر
                            </span>
                          )}
                          {dashboard.editable && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              قابل للتعديل
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h5 className="font-semibold text-primary mb-2">المؤشرات:</h5>
                    <div className="flex flex-wrap gap-2">
                      {dashboard.widgets.map((widget, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          {widget}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="group relative w-full inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-xl font-semibold overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative">فتح لوحة البيانات</span>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* الأدوات الذكية بالذكاء الاصطناعي */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="heading-2 text-primary mb-8 text-center">
            الأدوات الذكية بالذكاء الاصطناعي
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-4">
                      {tool.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      {tool.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button className="group relative w-full inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative">{tool.demo}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LearningPathsPage;
