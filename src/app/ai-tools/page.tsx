'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  BarChart3,
  FileText,
  Shield,
  TrendingUp,
  AlertTriangle,
  FileSpreadsheet,
  Presentation,
  GitCompare,
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowRight,
  Users,
  Activity,
  Award,
  ArrowLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import dynamic from 'next/dynamic';

// Loading component
const LoadingComponent = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
      <p className="text-gray-600 dark:text-gray-400">جاري التحميل...</p>
    </div>
  </div>
);

// Dynamic imports - must be object literals for Next.js
const FinancialDataAnalyzer = dynamic(
  () => import('@/components/ai-tools/FinancialDataAnalyzer'),
  { ssr: false }
);

const FinancialStatementsComparator = dynamic(
  () => import('@/components/ai-tools/FinancialStatementsComparator'),
  { ssr: false }
);

const RiskAnalyzer = dynamic(
  () => import('@/components/ai-tools/RiskAnalyzer'),
  { ssr: false }
);

const FinancialReportGenerator = dynamic(
  () => import('@/components/ai-tools/FinancialReportGenerator'),
  { ssr: false }
);

const AICoAuditor = dynamic(
  () => import('@/components/ai-tools/AICoAuditor'),
  { ssr: false }
);

const ComplianceAnalyzer = dynamic(
  () => import('@/components/ai-tools/ComplianceAnalyzer'),
  { ssr: false }
);

const SmartComparatorComponent = dynamic(
  () => import('@/components/ai-tools/SmartComparatorComponent'),
  { ssr: false }
);

const PresentationBuilderComponent = dynamic(
  () => import('@/components/ai-tools/PresentationBuilderComponent'),
  { ssr: false }
);

const ContentGeneratorComponent = dynamic(
  () => import('@/components/ai-tools/ContentGeneratorComponent'),
  { ssr: false }
);

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'analysis' | 'audit' | 'reports' | 'content';
  gradient: string;
  status: 'available' | 'coming-soon';
}

const aiTools: AITool[] = [
  {
    id: 'financial-analyzer',
    name: 'محلل البيانات المالية',
    description: 'تحليل تلقائي للقوائم المالية والنسب المالية مع رسوم بيانية تفاعلية',
    icon: BarChart3,
    category: 'analysis',
    gradient: 'from-blue-500 to-cyan-500',
    status: 'available',
  },
  {
    id: 'statements-comparator',
    name: 'مقارن القوائم المالية',
    description: 'مقارنة بين فترات مالية مختلفة وتحليل التغيرات واكتشاف التقلبات',
    icon: GitCompare,
    category: 'analysis',
    gradient: 'from-purple-500 to-pink-500',
    status: 'available',
  },
  {
    id: 'risk-analyzer',
    name: 'محلل المخاطر',
    description: 'تحليل المخاطر المالية والتشغيلية حسب COSO Framework مع توصيات',
    icon: AlertTriangle,
    category: 'audit',
    gradient: 'from-orange-500 to-red-500',
    status: 'available',
  },
  {
    id: 'co-auditor',
    name: 'المدقق المساعد',
    description: 'تحليل ملفات المراجعة واكتشاف الأخطاء والتناقضات تلقائياً',
    icon: Shield,
    category: 'audit',
    gradient: 'from-green-500 to-teal-500',
    status: 'available',
  },
  {
    id: 'compliance-analyzer',
    name: 'محلل الامتثال',
    description: 'فحص الامتثال لمعايير IFRS, GAAP, IIA مع تقارير تفصيلية',
    icon: CheckCircle2,
    category: 'audit',
    gradient: 'from-indigo-500 to-blue-500',
    status: 'available',
  },
  {
    id: 'report-generator',
    name: 'مولد التقارير المالية',
    description: 'توليد تقارير مالية احترافية مع قوالب جاهزة ودعم IFRS و GAAP',
    icon: FileText,
    category: 'reports',
    gradient: 'from-emerald-500 to-green-500',
    status: 'available',
  },
  {
    id: 'smart-comparator',
    name: 'المقارن الذكي',
    description: 'مقارنة ذكية بين الملفات مع إبراز الفروقات والتغيرات المهمة',
    icon: GitCompare,
    category: 'analysis',
    gradient: 'from-violet-500 to-purple-500',
    status: 'available',
  },
  {
    id: 'presentation-builder',
    name: 'منشئ العروض التقديمية',
    description: 'إنشاء عروض تقديمية احترافية للتقارير المالية والتحليلات',
    icon: Presentation,
    category: 'reports',
    gradient: 'from-rose-500 to-pink-500',
    status: 'available',
  },
  {
    id: 'content-generator',
    name: 'مولد المحتوى',
    description: 'توليد محتوى متخصص في المحاسبة والمراجعة الداخلية',
    icon: Sparkles,
    category: 'content',
    gradient: 'from-amber-500 to-yellow-500',
    status: 'available',
  },
];

// Component mapping
const componentMap: Record<string, React.ComponentType> = {
  'financial-analyzer': FinancialDataAnalyzer,
  'statements-comparator': FinancialStatementsComparator,
  'risk-analyzer': RiskAnalyzer,
  'co-auditor': AICoAuditor,
  'compliance-analyzer': ComplianceAnalyzer,
  'report-generator': FinancialReportGenerator,
  'smart-comparator': SmartComparatorComponent,
  'presentation-builder': PresentationBuilderComponent,
  'content-generator': ContentGeneratorComponent,
};

const categories = [
  { id: 'all', name: 'جميع الأدوات', icon: Brain },
  { id: 'analysis', name: 'التحليل المالي', icon: BarChart3 },
  { id: 'audit', name: 'المراجعة', icon: Shield },
  { id: 'reports', name: 'التقارير', icon: FileText },
  { id: 'content', name: 'المحتوى', icon: Sparkles },
];

export default function AIToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [loadedComponent, setLoadedComponent] = useState<React.ComponentType | null>(null);

  const filteredTools = selectedCategory === 'all'
    ? aiTools
    : aiTools.filter(tool => tool.category === selectedCategory);

  // Load component when tool is selected
  useEffect(() => {
    if (!selectedTool) {
      setLoadedComponent(null);
      return;
    }

    const Component = componentMap[selectedTool];
    if (Component) {
      setLoadedComponent(() => Component);
    } else {
      setLoadedComponent(null);
    }
  }, [selectedTool]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        
        <Container size="xl" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/30 rounded-full">
              <Brain className="w-5 h-5 text-white" />
              <span className="text-white font-semibold text-sm">
                أدوات ذكاء اصطناعي متخصصة
              </span>
        </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              <span className="block mb-2">أدوات الذكاء الاصطناعي</span>
              <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-white/90">
                للمحاسبة والمراجعة الداخلية
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              استخدم أحدث تقنيات الذكاء الاصطناعي لتحليل البيانات المالية، إجراء المراجعات، 
              وتوليد التقارير الاحترافية بسرعة ودقة عالية
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
              {[
                { icon: Users, value: '5,000+', label: 'مستخدم نشط' },
                { icon: Activity, value: '50,000+', label: 'تحليل منجز' },
                { icon: Award, value: '98%', label: 'معدل الرضا' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-white/80 mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Main Content */}
      <Container size="xl" className="py-12 lg:py-16">
        {!selectedTool ? (
          <>
            {/* Enhanced Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base md:text-lg transition-all duration-300 overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl shadow-indigo-500/30'
                        : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 border-2 border-gray-200 dark:border-neutral-700 hover:border-indigo-300 dark:hover:border-indigo-600'
                    }`}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Hover effect */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500" />
                    )}
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center gap-3">
                      <Icon className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'text-white' : 'text-indigo-600 dark:text-indigo-400 group-hover:scale-110'}`} />
                      <span className={`font-bold ${isActive ? 'text-white' : 'text-gray-700 dark:text-gray-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300'}`}>
                        {category.name}
                      </span>
                    </div>
                    
                    {/* Decorative element for active tab */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-0 right-0 w-2 h-2 bg-white/30 rounded-bl-full"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {filteredTools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
        <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedTool(tool.id)}
                      className="group relative bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-neutral-700 hover:border-indigo-300 dark:hover:border-indigo-600"
                    >
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${tool.gradient} mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {tool.name}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                        {tool.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          tool.status === 'available'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                        }`}>
                          {tool.status === 'available' ? 'متاح' : 'قريباً'}
                        </span>
                        
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
              </div>

                      {/* Hover Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            {/* Enhanced Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between gap-4 mb-6">
                {/* Back Button with Enhanced Design */}
                <motion.button
                  onClick={() => setSelectedTool(null)}
                  className="group relative flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200/60 dark:border-indigo-700/60 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden"
                  whileHover={{ scale: 1.02, x: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/10 group-hover:via-indigo-500/5 group-hover:to-indigo-500/0 transition-all duration-500"></div>
                  
                  {/* Icon with animation */}
                  <motion.div
                    animate={{ x: [0, -3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <ArrowLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300" />
                  </motion.div>
                  
                  {/* Text */}
                  <span className="relative z-10 text-base font-semibold text-indigo-700 dark:text-indigo-300 group-hover:text-indigo-800 dark:group-hover:text-indigo-200 transition-colors duration-300">
                    العودة إلى الأدوات
                  </span>
                  
                  {/* Decorative element */}
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>

                {/* Current Tool Info */}
                {selectedTool && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm border border-gray-200 dark:border-neutral-700"
                  >
                    <div className="flex items-center gap-2">
                      {(() => {
                        const tool = aiTools.find(t => t.id === selectedTool);
                        const Icon = tool?.icon || Brain;
                        return (
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${tool?.gradient || 'from-indigo-500 to-purple-500'}`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                        );
                      })()}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {aiTools.find(t => t.id === selectedTool)?.name || 'أداة'}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Tool Component */}
            {selectedTool && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 lg:p-8"
              >
                {loadedComponent ? (
                  <Suspense fallback={<LoadingComponent />}>
                    {React.createElement(loadedComponent)}
                  </Suspense>
                ) : (
                  <LoadingComponent />
                )}
              </motion.div>
            )}
            </div>
          )}
      </Container>
    </div>
  );
}
