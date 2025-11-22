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
    <section className="relative py-8 lg:py-10 overflow-hidden">
      <Container size="xl" className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Compact Card - Lightened background, clearer border */}
          <MotionWrapper
            animation="slideDown"
            duration={0.5}
            className="relative bg-white dark:bg-neutral-900 rounded-2xl p-8 lg:p-12 border border-neutral-200 dark:border-neutral-700 shadow-xl"
            dir="rtl"
          >
            {/* Content */}
            <div className="text-center space-y-6">
              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white">
                <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                  جاهز لبدء رحلتك التعليمية؟
                </span>
              </h2>
              
              {/* Description */}
              <p className="text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto">
                انضم إلينا اليوم وابدأ رحلتك نحو التميز المهني
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <Link href={ROUTES.REGISTER}>
                  <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 text-white rounded-xl font-bold text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-[0.98]">
                    <span>ابدأ الآن</span>
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  </button>
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

