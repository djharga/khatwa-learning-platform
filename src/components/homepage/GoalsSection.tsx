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
    <section className="relative py-8 lg:py-10 overflow-hidden">
      <Container size="xl" className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-full border border-indigo-200/50 dark:border-indigo-700/50">
            <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-xs">
              الأهداف (Goals)
            </span>
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white mb-3">
            أهدافنا <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">الاستراتيجية</span>
          </h2>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            نسعى لتحقيق أهداف واضحة تساهم في تطوير مهاراتك المهنية
          </p>
        </div>

        {/* Goals Grid - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {goals.map((goal, index) => {
            const Icon = goal.icon;

            return (
              <div
                key={index}
                className="flex flex-col p-4 lg:p-5 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-shadow duration-200"
              >
                {/* Icon */}
                <div className="mb-4">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${goal.gradient} rounded-xl blur-lg opacity-30`} />
                    <div className={`relative w-14 h-14 bg-gradient-to-br ${goal.gradient} rounded-xl flex items-center justify-center shadow-md`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2 text-center">
                  <h3 className="text-sm lg:text-base font-bold text-neutral-900 dark:text-white">
                    {goal.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
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

