'use client';

import { Heart, Target, Sparkles, Award, Users, Shield, Lightbulb } from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * Values Section - قسم القيم والهدف
 * يعرض قيم وهدف منصة خطى بشكل موسع
 */

const ValuesSection = () => {
  const values = [
    {
      icon: Heart,
      title: 'التدريب العملي',
      description: 'نمنحك تدريباً عملياً على حالات واقعية وأدوات عملية لتطبيق ما تتعلمه مباشرة',
      gradient: 'from-pink-500 via-rose-500 to-pink-600',
      color: 'pink',
    },
    {
      icon: Target,
      title: 'التميز المهني',
      description: 'نعدك لتكون قيمة مضافة منذ اليوم الأول في عملك من خلال محتوى احترافي متكامل',
      gradient: 'from-indigo-500 via-purple-500 to-indigo-600',
      color: 'indigo',
    },
    {
      icon: Award,
      title: 'الجودة والاعتماد',
      description: 'نلتزم بأعلى معايير الجودة في المحتوى والشهادات المعتمدة دولياً',
      gradient: 'from-amber-500 via-orange-500 to-amber-600',
      color: 'amber',
    },
    {
      icon: Users,
      title: 'المجتمع والدعم',
      description: 'نوفر مجتمعاً تعليمياً نشطاً ودعماً مستمراً لمساعدتك في رحلتك التعليمية',
      gradient: 'from-blue-500 via-cyan-500 to-blue-600',
      color: 'blue',
    },
    {
      icon: Shield,
      title: 'الأمان والخصوصية',
      description: 'نحمي بياناتك ونضمن خصوصية معلوماتك بأعلى معايير الأمان',
      gradient: 'from-emerald-500 via-green-500 to-emerald-600',
      color: 'emerald',
    },
    {
      icon: Lightbulb,
      title: 'الابتكار والتطوير',
      description: 'نستخدم أحدث التقنيات والذكاء الاصطناعي لتحسين تجربة التعلم بشكل مستمر',
      gradient: 'from-purple-500 via-pink-500 to-purple-600',
      color: 'purple',
    },
  ];

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden">
      <Container size="xl" className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full border border-indigo-200/50 dark:border-indigo-700/50">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
              قيمنا (Values)
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
            قيمنا الأساسية
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mt-3">
              ما يميزنا
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            نؤمن بقيم واضحة توجه عملنا وتساهم في نجاحك المهني
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="p-6 lg:p-8 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-shadow duration-200"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${value.gradient} rounded-2xl blur-xl opacity-30`} />
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {value.description}
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

export default ValuesSection;

