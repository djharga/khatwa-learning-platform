'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Shield,
  AlertTriangle,
  Zap,
  Brain,
  TrendingUp,
  MessageSquare,
  FileBarChart,
  GitCompare,
  Presentation,
  PenTool,
  BarChart3,
} from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * AI Tools Section - قسم أدوات الذكاء الاصطناعي
 * عرض أدوات الذكاء الاصطناعي مع شرح مختصر لكل أداة
 */

interface AITool {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  gradient: string;
}

const AIToolsSection = () => {
  const aiTools: AITool[] = [
    {
      id: 'co-auditor',
      name: 'المدقق المساعد',
      icon: Shield,
      description: 'تحليل ومراجعة المحتوى التعليمي تلقائياً',
      gradient: 'from-green-500 to-teal-600',
    },
    {
      id: 'risk-analyzer',
      name: 'محلل المخاطر',
      icon: AlertTriangle,
      description: 'تقييم المخاطر والتحديات في التعلم',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      id: 'content-optimizer',
      name: 'محسن المحتوى',
      icon: Zap,
      description: 'تحسين وتطوير المحتوى التعليمي',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      id: 'learning-insights',
      name: 'رؤى التعلم',
      icon: Brain,
      description: 'تحليل أنماط التعلم وتقديم توصيات',
      gradient: 'from-indigo-500 to-blue-600',
    },
    {
      id: 'progress-tracker',
      name: 'متتبع التقدم',
      icon: TrendingUp,
      description: 'تتبع وتحليل التقدم في الدورات',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'personal-assistant',
      name: 'المساعد الشخصي',
      icon: MessageSquare,
      description: 'مساعد ذكي للإجابة على أسئلتك التعليمية',
      gradient: 'from-teal-500 to-cyan-600',
    },
    {
      id: 'executive-summary',
      name: 'الملخص التنفيذي',
      icon: FileBarChart,
      description: 'تلخيص التقارير الطويلة في ملخصات موجزة',
      gradient: 'from-emerald-500 to-green-600',
    },
    {
      id: 'smart-comparator',
      name: 'المقارن الذكي',
      icon: GitCompare,
      description: 'مقارنة الملفات واستخراج الفروقات',
      gradient: 'from-rose-500 to-pink-600',
    },
    {
      id: 'presentation-builder',
      name: 'منشئ العروض',
      icon: Presentation,
      description: 'تحويل التقارير إلى عروض تقديمية احترافية',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      id: 'content-generator',
      name: 'مولد المحتوى',
      icon: PenTool,
      description: 'توليد محتوى تسويقي وتعليمي ذكي',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      id: 'dashboard',
      name: 'لوحة التحكم',
      icon: BarChart3,
      description: 'نظرة عامة على أدائك وتقدمك',
      gradient: 'from-blue-500 to-purple-600',
    },
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-200/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-accent-200/20 to-transparent rounded-full blur-3xl" />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Brain className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <span className="text-primary-600 dark:text-primary-400 font-semibold">
              أدوات الذكاء الاصطناعي
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            قوة الذكاء الاصطناعي في
            <br />
            <span className="bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent">
              خدمة تعلمك
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            اكتشف مجموعة من أدوات الذكاء الاصطناعي المتقدمة المصممة لتعزيز تجربة التعلم الخاصة بك
          </p>
        </motion.div>

        {/* AI Tools Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
          {aiTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="group"
              >
                <Link
                  href="/ai-tools"
                  className="block h-full"
                >
                  <div className="relative h-full p-4 lg:p-6 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-300 shadow-sm hover:shadow-lg">
                    {/* Gradient Glow Effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                    />

                    {/* Icon */}
                    <div className="relative mb-4">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${tool.gradient} shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-sm lg:text-base font-bold text-neutral-900 dark:text-white mb-2 line-clamp-1">
                        {tool.name}
                      </h3>
                      <p className="text-xs lg:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Link */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            href="/ai-tools"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all"
          >
            <span>استكشف جميع الأدوات</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default AIToolsSection;


