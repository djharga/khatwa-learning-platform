'use client';

import { Rocket, ArrowLeft, Sparkles, CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import StyledButton from '@/components/ui/StyledButton';
import Link from 'next/link';

/**
 * CTA Join Section - قسم دعوة للانضمام
 * دعوة المستخدمين للانضمام إلى المنصة
 */

const CTAJoinSection = () => {

  const benefits = [
    'بدون قيود على الخلفية الأكاديمية',
    'خبرة عملية منذ اليوم الأول',
    'دعم شخصي ومتابعة مستمرة',
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Enhanced Multi-Layer Gradient Background - Very Subtle */}
      <div className="absolute inset-0">
        {/* Primary Gradient - Base - Very Light */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/85 via-purple-50/80 to-pink-50/85 dark:from-indigo-950/55 dark:via-purple-950/45 dark:to-pink-950/55" />
        
        {/* Secondary Gradient - Overlay - Very Subtle */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-50/25 via-transparent to-indigo-50/25 dark:from-blue-950/15 dark:to-indigo-950/15" />

        {/* Tertiary Gradient - Accent - Very Subtle */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/15 via-pink-50/12 to-orange-50/15 dark:from-purple-950/8 dark:via-pink-950/6 dark:to-orange-950/8" />
      </div>

      {/* Animated Gradient Orbs - Very Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[700px] h-[700px] bg-gradient-to-br from-indigo-100/12 via-purple-100/10 to-pink-100/12 dark:from-indigo-900/8 dark:via-purple-900/6 dark:to-pink-900/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[800px] h-[800px] bg-gradient-to-tr from-pink-100/10 via-purple-100/8 to-indigo-100/10 dark:from-pink-900/6 dark:via-purple-900/5 dark:to-indigo-900/6 rounded-full blur-3xl" />
      </div>

      <Container size="xl" className="relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          {/* Badge - محسّن */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl rounded-full border border-indigo-300/50 dark:border-indigo-600/50 shadow-lg">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-700 dark:text-indigo-300 font-bold text-base">
              ابدأ رحلتك الآن
            </span>
          </div>

          {/* Main Content - محسّن */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-neutral-900 dark:text-white leading-tight tracking-tight">
              ابدأ رحلتك نحو{' '}
              <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                الاحتراف والتميز
              </span>
            </h2>

            <p className="text-lg md:text-xl lg:text-2xl text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-4xl mx-auto font-semibold">
              الفرصة متاحة للجميع. اكتشف قدراتك واصنع مستقبلك المهني مع منصة خطى
            </p>

            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-2xl border border-indigo-200/50 dark:border-indigo-700/50">
              <span className="text-lg md:text-xl text-indigo-700 dark:text-indigo-300 font-bold italic">
                القيمة الحقيقية في التطبيق العملي
              </span>
            </div>
          </div>

          {/* Benefits List - محسّن */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => {
              const cardStyles = [
                {
                  bg: 'from-blue-500/10 to-indigo-500/10',
                  border: 'border-blue-300/50 dark:border-blue-600/50',
                  iconBg: 'from-blue-500/20 to-indigo-500/20',
                  iconColor: 'text-blue-600 dark:text-blue-400',
                },
                {
                  bg: 'from-purple-500/10 to-pink-500/10',
                  border: 'border-purple-300/50 dark:border-purple-600/50',
                  iconBg: 'from-purple-500/20 to-pink-500/20',
                  iconColor: 'text-purple-600 dark:text-purple-400',
                },
                {
                  bg: 'from-pink-500/10 to-rose-500/10',
                  border: 'border-pink-300/50 dark:border-pink-600/50',
                  iconBg: 'from-pink-500/20 to-rose-500/20',
                  iconColor: 'text-pink-600 dark:text-pink-400',
                },
              ];
              const style = cardStyles[index];
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center gap-4 p-6 bg-gradient-to-br ${style.bg} backdrop-blur-xl rounded-2xl border ${style.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.iconBg} flex items-center justify-center`}>
                    <CheckCircle className={`w-7 h-7 ${style.iconColor}`} />
                  </div>
                  <span className="text-neutral-900 dark:text-white font-bold text-base text-center leading-relaxed">
                    {benefit}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons - محسّن */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link href="/courses" className="w-full sm:w-auto">
              <StyledButton
                variant="primary"
                size="large"
                className="w-full sm:w-auto"
              >
                <Rocket className="w-6 h-6 inline-block mr-2" />
                <span>استكشف الدورات</span>
              </StyledButton>
            </Link>
            <Link href="/student" className="w-full sm:w-auto">
              <StyledButton
                variant="secondary"
                size="large"
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="w-6 h-6 inline-block mr-2" />
                <span>ابدأ الآن</span>
              </StyledButton>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTAJoinSection;

