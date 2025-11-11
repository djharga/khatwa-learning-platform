'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Brain,
  Shield,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  GitCompare,
  Presentation,
  PenTool,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { ROUTES } from '@/lib/routes';

/**
 * AI Tools Preview Section - قسم معاينة الأدوات الذكية
 * يعرض نظرة سريعة على الأدوات الذكية المتاحة مع روابط
 */

const AIToolsPreviewSection = () => {
  const aiTools = [
    {
      id: 'co-auditor',
      name: 'المدقق المساعد',
      icon: Shield,
      description: 'تحليل ومراجعة المحتوى التعليمي تلقائياً',
      gradient: 'from-green-500 to-teal-600',
      image: '/assets/audit-report-template-preview.jpg',
    },
    {
      id: 'risk-analyzer',
      name: 'محلل المخاطر',
      icon: AlertTriangle,
      description: 'تقييم المخاطر والتحديات في التعلم',
      gradient: 'from-orange-500 to-red-600',
      image: '/assets/risk-assessment-tool-preview.jpg',
    },
    {
      id: 'content-optimizer',
      name: 'محسن المحتوى',
      icon: Zap,
      description: 'تحسين وتطوير المحتوى التعليمي',
      gradient: 'from-purple-500 to-pink-600',
      image: null,
    },
    {
      id: 'learning-insights',
      name: 'رؤى التعلم',
      icon: Brain,
      description: 'تحليل أنماط التعلم وتقديم توصيات',
      gradient: 'from-indigo-500 to-blue-600',
      image: null,
    },
    {
      id: 'progress-tracker',
      name: 'متتبع التقدم',
      icon: TrendingUp,
      description: 'تتبع وتحليل التقدم في الدورات',
      gradient: 'from-cyan-500 to-blue-600',
      image: null,
    },
    {
      id: 'smart-comparator',
      name: 'المقارن الذكي',
      icon: GitCompare,
      description: 'مقارنة الملفات واستخراج الفروقات',
      gradient: 'from-rose-500 to-pink-600',
      image: null,
    },
    {
      id: 'presentation-builder',
      name: 'منشئ العروض',
      icon: Presentation,
      description: 'تحويل التقارير إلى عروض تقديمية احترافية',
      gradient: 'from-violet-500 to-purple-600',
      image: null,
    },
    {
      id: 'content-generator',
      name: 'مولد المحتوى',
      icon: PenTool,
      description: 'توليد محتوى تسويقي وتعليمي ذكي',
      gradient: 'from-amber-500 to-orange-600',
      image: null,
    },
  ];

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden">
      <Container size="xl" className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full border border-indigo-200/50 dark:border-indigo-700/50">
            <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
              أدوات الذكاء الاصطناعي
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
            أدوات ذكية
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mt-3">
              لتطوير مهاراتك
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            استخدم أحدث تقنيات الذكاء الاصطناعي لتحسين تعلمك وتحليل أدائك وإنشاء محتوى احترافي
          </p>
        </div>

        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {aiTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                href={ROUTES.AI_TOOLS}
                className="group relative overflow-hidden p-6 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl transition-all duration-200"
              >
                {/* Background Image for tools with images */}
                {tool.image && (
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-200">
                    <Image
                      src={tool.image}
                      alt={tool.name}
                      fill
                      className="object-cover"
                      quality={60}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                )}
                
                <div className="relative flex flex-col items-center text-center space-y-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href={ROUTES.AI_TOOLS}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-xl shadow-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/60 transition-shadow duration-200 text-lg"
          >
            <span>استكشف جميع الأدوات الذكية</span>
            <ChevronRight className="w-6 h-6" />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default AIToolsPreviewSection;

