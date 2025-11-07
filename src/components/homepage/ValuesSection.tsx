'use client';

import { Heart, Target, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * Values Section - قسم القيم والهدف
 * يعرض قيم وهدف منصة خطى
 */

const ValuesSection = () => {

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden">

      <Container size="xl" className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Compact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {/* Values Card - Compact */}
            <div className="bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm rounded-2xl border border-pink-200/50 dark:border-pink-700/30 shadow-lg p-5 lg:p-6">
              <div className="flex items-center justify-center gap-4">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                      <Heart className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center space-y-2 min-w-0">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200/50 dark:border-pink-700/50">
                    <Sparkles className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                    <span className="text-pink-600 dark:text-pink-400 font-semibold text-xs">
                      قيمتنا الحقيقية
                    </span>
                  </div>
                  <p className="text-base lg:text-lg text-neutral-900 dark:text-white leading-relaxed font-bold">
                    نمنحك{' '}
                    <span className="text-pink-600 dark:text-pink-400">التدريب العملي</span> على{' '}
                    <span className="text-rose-600 dark:text-rose-400">حالات واقعية</span> و{' '}
                    <span className="text-purple-600 dark:text-purple-400">أدوات عملية</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Goal Card - Compact */}
            <div className="bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm rounded-2xl border border-indigo-200/50 dark:border-indigo-700/30 shadow-lg p-5 lg:p-6">
              <div className="flex items-center justify-center gap-4">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                      <Target className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center space-y-2 min-w-0">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200/50 dark:border-indigo-700/50">
                    <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-xs">
                      هدفنا
                    </span>
                  </div>
                  <p className="text-base lg:text-lg text-neutral-900 dark:text-white leading-relaxed font-bold">
                    تجهيزك لتكون{' '}
                    <span className="text-indigo-600 dark:text-indigo-400">قيمة مضافة</span>{' '}
                    <span className="text-purple-600 dark:text-purple-400">منذ اليوم الأول</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ValuesSection;

