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
    <section className="relative py-16 lg:py-20 overflow-hidden">

      <Container size="xl" className="relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          {/* Badge - محسّن */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 backdrop-blur-xl rounded-full border border-indigo-300/50 dark:border-indigo-600/50 shadow-lg">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-700 dark:text-indigo-300 font-bold text-base">
              انضم إلينا
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

        </div>
      </Container>
    </section>
  );
};

export default CTAJoinSection;

