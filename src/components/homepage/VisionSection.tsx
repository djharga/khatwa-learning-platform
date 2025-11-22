'use client';

import { Eye, Target, Building2, TrendingUp } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { MotionWrapper } from '@/components/ui/motion/MotionWrapper';

/**
 * Vision Section - قسم الرؤية
 * يعرض رؤية منصة خطى بتصميم محسّن وجميل
 */

const VisionSection = () => {
  return (
    <section className="relative py-8 lg:py-10 overflow-hidden">
      <Container size="xl" className="relative z-10">
        <MotionWrapper
          animation="slideDown"
          duration={0.5}
          className="relative max-w-4xl mx-auto"
        >
          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-xl" dir="rtl">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-200/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent-200/20 to-transparent rounded-full blur-3xl"></div>
            
            {/* Content */}
            <div className="relative z-10 p-6 lg:p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <MotionWrapper animation="scale" delay={0.1} duration={0.4} className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 rounded-full border border-primary-200/50 dark:border-primary-700/50 mb-4">
                  <Target className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <span className="text-primary-600 dark:text-primary-400 font-semibold text-xs">
                    الرؤية (Vision)
                  </span>
                </MotionWrapper>
                <MotionWrapper animation="scale" delay={0.2} duration={0.4} className="inline-flex items-center justify-center w-14 h-14 mb-3 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl shadow-lg">
                  <Eye className="w-7 h-7 text-white" />
                </MotionWrapper>
              </div>

              {/* Vision Content */}
              <div className="space-y-4">
                <MotionWrapper animation="slideDown" delay={0.3} duration={0.5} className="bg-primary-50/50 dark:bg-primary-900/10 rounded-xl p-5 border border-primary-200/50 dark:border-primary-800/50">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <p className="text-base lg:text-lg font-semibold text-neutral-900 dark:text-white leading-relaxed text-right flex-1">
                      أن نصبح <span className="text-primary-600 dark:text-primary-400 font-bold">المنصة العربية الرائدة</span> في تعليم وتطوير مهارات الشباب لمواكبة <span className="text-accent-600 dark:text-accent-400">سوق العمل</span>
                    </p>
                  </div>
                </MotionWrapper>

                <MotionWrapper animation="slideDown" delay={0.4} duration={0.5} className="bg-accent-50/50 dark:bg-accent-900/10 rounded-xl p-5 border border-accent-200/50 dark:border-accent-800/50">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-accent-600 dark:text-accent-400 flex-shrink-0 mt-0.5" />
                    <p className="text-base lg:text-lg font-semibold text-neutral-900 dark:text-white leading-relaxed text-right flex-1">
                      وأن نكون <span className="text-primary-600 dark:text-primary-400 font-bold">الشريك الاستراتيجي الأول</span> للشركات والمؤسسات في بناء <span className="text-accent-600 dark:text-accent-400">جيل قادة للشركات</span> ويلبي احتياجات <span className="text-primary-700 dark:text-primary-300">السوق</span>
                    </p>
                  </div>
                </MotionWrapper>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </Container>
    </section>
  );
};

export default VisionSection;

