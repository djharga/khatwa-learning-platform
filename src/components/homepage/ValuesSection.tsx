'use client';

import { Heart, Target, Sparkles, Award, Users, Shield, Lightbulb } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { MotionWrapper } from '@/components/ui/motion/MotionWrapper';

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
    <section className="relative py-8 lg:py-10 overflow-hidden">
      <Container size="xl" className="relative z-10">
        {/* Header */}
        <div className="text-center mb-10" dir="rtl">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-full border border-primary-200/50 dark:border-primary-700/50">
            <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-primary-600 dark:text-primary-400 font-semibold text-xs">
              قيمنا (Values)
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent">
              قيمنا الأساسية
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            نؤمن بقيم واضحة توجه عملنا وتساهم في نجاحك المهني
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            // Unified gradients using primary/accent colors
            const gradients = [
              'from-primary-600 to-primary-700',
              'from-accent-600 to-accent-700',
              'from-emerald-600 to-emerald-700',
              'from-sky-600 to-sky-700',
              'from-emerald-600 to-emerald-700',
              'from-purple-600 to-purple-700',
            ];
            return (
              <MotionWrapper
                key={index}
                animation="slideDown"
                delay={index * 0.1}
                duration={0.4}
                className="p-5 lg:p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300"
                dir="rtl"
              >
                {/* Icon */}
                <div className="mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${gradients[index]} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-base lg:text-lg font-bold text-neutral-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {value.description}
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

export default ValuesSection;

