'use client';

import { Target, BookOpen, Globe, CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { MotionWrapper } from '@/components/ui/motion/MotionWrapper';

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
    <section className="relative py-12 lg:py-16 overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <Container size="xl" className="relative z-10">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12 pt-4" dir="rtl">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-full border border-primary-200/50 dark:border-primary-700/50">
            <Target className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-primary-600 dark:text-primary-400 font-semibold text-xs">
              الأهداف (Goals)
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent">
              أهدافنا الاستراتيجية
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            نسعى لتحقيق أهداف واضحة تساهم في تطوير مهاراتك المهنية
          </p>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            // Unified gradients using primary/accent colors
            const gradients = [
              'from-primary-600 to-primary-700',
              'from-accent-600 to-accent-700',
              'from-emerald-600 to-emerald-700'
            ];

            return (
              <MotionWrapper
                key={index}
                animation="slideDown"
                delay={index * 0.1}
                duration={0.4}
                className="flex flex-col p-6 lg:p-8 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300"
                dir="rtl"
              >
                {/* Icon */}
                <div className="mb-5">
                  <div className={`w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 text-center">
                  <h3 className="text-lg lg:text-xl font-bold text-neutral-900 dark:text-white">
                    {goal.title}
                  </h3>
                  <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {goal.description}
                  </p>
                </div>
              </MotionWrapper>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default GoalsSection;
