'use client';

import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { MotionWrapper } from '@/components/ui/motion/MotionWrapper';
import { Button } from '@/components/ui/Button';

/**
 * CTA Section - دعوة للعمل النهائية
 * تصميم احترافي مدمج وحديث
 */

const CTASection = () => {
  return (
    <section className="relative py-10 lg:py-14 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-50/70 via-white to-primary-50/40 dark:from-primary-950/30 dark:via-neutral-950 dark:to-primary-900/20" aria-hidden="true" />
      <Container size="xl" className="relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Compact Card - Lightened background, clearer border */}
          <MotionWrapper
            animation="slideDown"
            duration={0.5}
            className="relative bg-white dark:bg-neutral-900 rounded-3xl p-8 lg:p-12 border border-neutral-200/70 dark:border-neutral-800 shadow-[0_25px_60px_rgba(15,23,42,0.08)]"
            dir="rtl"
          >
            <div className="absolute inset-x-10 top-4 h-px bg-gradient-to-r from-transparent via-primary-200/70 to-transparent dark:via-primary-800/40" aria-hidden="true" />
            {/* Content */}
            <div className="text-center space-y-5 lg:space-y-7" aria-labelledby="cta-title" aria-describedby="cta-description">
              {/* Title */}
              <h2 id="cta-title" className="text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white leading-tight">
                <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                  جاهز لبدء رحلتك التعليمية؟
                </span>
              </h2>

              {/* Description */}
              <p
                id="cta-description"
                className="text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto"
              >
                انضم إلينا اليوم وابدأ رحلتك نحو التميز المهني بخطوات واضحة، دعم مستمر، وتجربة تعلم عملية.
              </p>

              {/* CTA Button */}
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 pt-2">
                <Link href={ROUTES.REGISTER} className="w-full sm:w-auto" aria-label="ابدأ التسجيل في منصة خطى">
                  <Button className="w-full sm:w-auto min-w-[220px] shadow-[0_12px_35px_rgba(79,70,229,0.25)]">
                    <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                    ابدأ الآن
                  </Button>
                </Link>
                <Link href={ROUTES.CONTACT} className="w-full sm:w-auto" aria-label="تواصل مع فريق الدعم">
                  <Button
                    variant="secondary"
                    className="w-full sm:w-auto min-w-[220px] border-primary-200/80 text-primary-800 hover:border-primary-300 dark:text-primary-100"
                  >
                    تواصل معنا
                  </Button>
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

