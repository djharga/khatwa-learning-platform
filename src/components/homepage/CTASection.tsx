'use client';

import Link from 'next/link';
import { Rocket, CheckCircle, ArrowLeft, Play, Sparkles, GraduationCap, Infinity, Award } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import StyledButton from '@/components/ui/StyledButton';

/**
 * CTA Section - دعوة للعمل النهائية
 * تصميم احترافي بسيط بدون تأثيرات معقدة
 */

const CTASection = () => {
  const features = [
    {
      icon: Infinity,
      text: 'وصول غير محدود',
    },
    {
      icon: GraduationCap,
      text: 'شهادة معتمدة',
    },
    {
      icon: Award,
      text: 'دعم فني 24/7',
    },
  ];

  const stats = [
    {
      icon: GraduationCap,
      value: '15,420+',
      label: 'طالب نشط',
    },
    {
      icon: Award,
      value: '15+',
      label: 'دورة متخصصة',
    },
    {
      icon: Sparkles,
      value: '95%',
      label: 'معدل الرضا',
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <Container size="xl" className="relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-50 dark:bg-indigo-950/50 rounded-full border border-indigo-200 dark:border-indigo-800">
              <Rocket className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                انضم إلى آلاف المتعلمين الناجحين
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-10">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
              جاهز لبدء رحلتك التعليمية؟
            </h2>
            
            {/* Description */}
            <div className="space-y-3 mb-8">
              <p className="text-xl lg:text-2xl text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
                ابدأ الآن وتمتع بوصول غير محدود لجميع الدورات والموارد التعليمية
              </p>
              <p className="text-lg lg:text-xl text-neutral-600 dark:text-neutral-400">
                واحصل على شهادة معتمدة
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-base font-semibold text-neutral-900 dark:text-white">
                    {feature.text}
                  </span>
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/register" className="w-full sm:w-auto">
              <StyledButton
                variant="primary"
                size="large"
                className="w-full sm:min-w-[220px]"
              >
                <span>ابدأ الآن مجاناً</span>
                <ArrowLeft className="w-5 h-5 inline-block mr-2" />
              </StyledButton>
            </Link>

            <Link href="/courses" className="w-full sm:w-auto">
              <StyledButton
                variant="secondary"
                size="large"
                className="w-full sm:min-w-[220px]"
              >
                <Play className="w-5 h-5 inline-block mr-2" />
                <span>تصفح الدورات</span>
              </StyledButton>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 border-t border-neutral-200 dark:border-neutral-700">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl mb-4 border border-indigo-200 dark:border-indigo-800">
                      <Icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-base text-neutral-600 dark:text-neutral-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;

