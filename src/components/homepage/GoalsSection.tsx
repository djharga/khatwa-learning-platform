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
    <section className="relative py-12 lg:py-16 overflow-hidden">
      <Container size="xl" className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full border border-indigo-200/50 dark:border-indigo-700/50">
            <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
              الأهداف (Goals)
            </span>
          </div>

          <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
            أهدافنا
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">
              الاستراتيجية
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            نسعى لتحقيق أهداف واضحة تساهم في تطوير مهاراتك المهنية
          </p>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {goals.map((goal, index) => {
            const Icon = goal.icon;

            return (
              <div
                key={index}
                className="flex flex-col p-6 lg:p-8 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-shadow duration-200"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="relative">
                    {/* Static Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${goal.gradient} rounded-2xl blur-xl opacity-30`} />

                    {/* Icon Container */}
                    <div className={`relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${goal.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 text-center">
                  <h3 className="text-lg lg:text-xl font-bold text-neutral-900 dark:text-white">
                    {goal.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
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

