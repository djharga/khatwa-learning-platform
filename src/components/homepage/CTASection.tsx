'use client';

import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { MotionWrapper } from '@/components/ui/motion/MotionWrapper';

/**
 * CTA Section - دعوة للعمل النهائية
 * تصميم احترافي مدمج وحديث
 */

const CTASection = () => {
  return (
    <section className="relative py-10 lg:py-16 overflow-hidden" aria-labelledby="cta-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-primary-950/50" aria-hidden />
      <Container size="xl" className="relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Compact Card - lighter surface + subtle grid overlay */}
          <MotionWrapper
            animation="slideDown"
            duration={0.5}
            className="relative overflow-hidden bg-white/80 dark:bg-neutral-900/80 rounded-3xl p-8 lg:p-14 border border-neutral-200/80 dark:border-neutral-700/80 shadow-2xl backdrop-blur-xl"
            dir="rtl"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(92,67,235,0.12),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_40%)]" aria-hidden />
            <div className="relative flex flex-col gap-6 lg:gap-8 text-center">
              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-primary-700 dark:text-primary-200">
                <span className="h-2 w-2 rounded-full bg-primary-500" aria-hidden />
                برامج معتمدة وشهادات رقمية
              </div>
              <h2 id="cta-heading" className="text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white leading-tight">
                <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent">
                  جاهز لبدء رحلتك التعليمية؟
                </span>
              </h2>
              <p className="text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto">
                انضم اليوم واستفد من محتوى تفاعلي، جلسات مباشرة، ودعم مخصص لمساعدتك على تحقيق أهدافك المهنية بسرعة وثقة.
              </p>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 pt-2" aria-label="خيارات التسجيل">
                <Link
                  href={ROUTES.REGISTER}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 text-white rounded-xl font-bold text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  <span>ابدأ الآن</span>
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  href={ROUTES.CONSULTING}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 font-semibold bg-white/70 dark:bg-neutral-900/60 hover:border-primary-300 dark:hover:border-primary-500 hover:text-primary-700 dark:hover:text-primary-200 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  اكتشف باقات الاستشارات
                </Link>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;

