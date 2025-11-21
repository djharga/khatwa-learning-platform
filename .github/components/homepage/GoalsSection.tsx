'use client';

import { Target, BookOpen, Globe, CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * Goals Section - قسم الأهداف
 * يعرض أهداف منصة خطى الثلاثة
 */

const GoalsSection = () => {
  const goals = [
    {
      icon: BookOpen,
      title: 'محتوى تدريبي احترافي',
      description: 'توفير محتوى تدريبي احترافي يدمج بين الجانب النظري والتطبيق العملي.',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    },
    {
      icon: Globe,
      title: 'منصة تعليمية مرنة',
      description: 'تسهيل الوصول إلى المعرفة من خلال منصة تعليمية مرنة ومتطورة تدعم التعلم الذاتي والتفاعلي.',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
    },
    {
      icon: CheckCircle,
      title: 'حالات عملية واقعية',
      description: 'تقديم حالات عملية واقعية من بيئات العمل السعودية والعربية لتعزيز فهم المفاهيم التطبيقية.',
      gradient: 'from-emerald-500 via-green-500 to-lime-500',
    },
  ];

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden bg-[#FAFAFA] dark:bg-neutral-900">
      <Container size="xl" className="relative z-10">
        {/* Header - Enlarged title with increased spacing */}
        <div className="text-center mb-10 lg:mb-12 pt-4">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-full border border-indigo-200/50 dark:border-indigo-700/50">
            <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-xs">
              الأهداف (Goals)
            </span>
          </div>

          <h2 className="text-[36px] leading-[44px] font-bold text-[#5B36E8] dark:text-[#6D4AFF] mb-4" dir="rtl">
            أهدافنا الاستراتيجية
          </h2>
          <p className="text-base leading-6 text-[#111827] dark:text-neutral-300 max-w-2xl mx-auto font-normal" dir="rtl">
            نسعى لتحقيق أهداف واضحة تساهم في تطوير مهاراتك المهنية
          </p>
        </div>

        {/* Goals Grid - Enhanced with increased padding, gap, no blur, solid colors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            // Unified simple gradients without glow
            const simpleGradients = [
              'from-blue-600 to-blue-700',
              'from-indigo-600 to-indigo-700',
              'from-emerald-600 to-emerald-700'
            ];

            return (
              <div
                key={index}
                className="flex flex-col p-6 lg:p-8 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-shadow duration-200"
              >
                {/* Icon - Simple without glow/blur */}
                <div className="mb-5">
                  <div className={`w-16 h-16 bg-gradient-to-br ${simpleGradients[index]} rounded-xl flex items-center justify-center shadow-md`}>
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Content - Improved text size and width */}
                <div className="space-y-3 text-center">
                  <h3 className="text-base lg:text-lg font-bold text-neutral-900 dark:text-white">
                    {goal.title}
                  </h3>
                  <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm mx-auto">
                    {goal.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default GoalsSection;

