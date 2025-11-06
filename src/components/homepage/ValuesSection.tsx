'use client';

import { Heart, Target, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * Values Section - قسم القيم والهدف
 * يعرض قيم وهدف منصة خطى
 */

const ValuesSection = () => {

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-indigo-50/90 via-purple-50/85 to-pink-50/90 dark:from-indigo-950/60 dark:via-purple-950/50 dark:to-pink-950/60">
      {/* Background Effects - Very Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-100/12 via-purple-100/8 to-pink-100/10 dark:from-indigo-900/8 dark:via-purple-900/6 dark:to-pink-900/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-pink-100/10 via-purple-100/8 to-indigo-100/10 dark:from-pink-900/6 dark:via-purple-900/5 dark:to-indigo-900/6 rounded-full blur-3xl" />
      </div>

      <Container size="xl" className="relative z-10">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Values Card */}
          <div className="bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl p-8 lg:p-12">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 rounded-3xl blur-2xl opacity-40" />
                  <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <Heart className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                  </div>
                </div>
              </div>
              <div className="flex-1 text-right space-y-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-pink-50 dark:bg-pink-900/20 rounded-full border border-pink-200/50 dark:border-pink-700/50">
                  <Sparkles className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  <span className="text-pink-600 dark:text-pink-400 font-semibold text-sm">
                    قيمتنا الحقيقية
                  </span>
                </div>
                <p className="text-lg md:text-xl lg:text-2xl text-neutral-900 dark:text-white leading-relaxed font-bold">
                  نمنحك{' '}
                  <span className="text-pink-600 dark:text-pink-400">التدريب العملي</span> على{' '}
                  <span className="text-rose-600 dark:text-rose-400">حالات واقعية</span> و{' '}
                  <span className="text-purple-600 dark:text-purple-400">أدوات عملية</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Goal Card */}
          <div className="bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl p-8 lg:p-12">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-3xl blur-2xl opacity-40" />
                  <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <Target className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                  </div>
                </div>
              </div>
              <div className="flex-1 text-right space-y-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full border border-indigo-200/50 dark:border-indigo-700/50">
                  <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                    هدفنا
                  </span>
                </div>
                <p className="text-lg md:text-xl lg:text-2xl text-neutral-900 dark:text-white leading-relaxed font-bold">
                  تجهيزك لتكون{' '}
                  <span className="text-indigo-600 dark:text-indigo-400">قيمة مضافة</span>{' '}
                  <span className="text-purple-600 dark:text-purple-400">منذ اليوم الأول</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ValuesSection;

