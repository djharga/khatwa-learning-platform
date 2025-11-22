'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft,
  Globe,
  Sparkles
} from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { ROUTES } from '@/lib/routes';
import { MotionWrapper } from '@/components/ui/motion/MotionWrapper';

/**
 * Enhanced Fellowship Section - قسم الزمالة المحسّن
 * تصميم احترافي مدمج وحديث
 */
const FellowshipSection = () => {
  return (
    <section className="relative py-8 lg:py-10 overflow-hidden">
      <Container size="xl" className="relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Compact Card */}
          <MotionWrapper
            animation="slideDown"
            duration={0.5}
            className="relative bg-white dark:bg-neutral-900 rounded-2xl p-6 lg:p-8 border border-neutral-200 dark:border-neutral-700 shadow-xl overflow-hidden"
            dir="rtl"
          >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-200/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent-200/20 to-transparent rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                {/* CIA Logo Section - Better alignment and balance */}
                <MotionWrapper
                  animation="scale"
                  delay={0.1}
                  duration={0.4}
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  <div className="relative">
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden bg-white dark:bg-neutral-800 shadow-lg border-2 border-primary-200 dark:border-primary-800 p-2">
                      <Image
                        src="/cia-logo.jpg"
                        alt="CIA Certified Internal Auditor Logo"
                        fill
                        className="object-contain rounded-full"
                        quality={90}
                        sizes="(max-width: 768px) 80px, 96px"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                    </div>
                  </div>
                </MotionWrapper>

                {/* Content Section - Enhanced text distribution and vertical spacing */}
                <div className="flex-1 text-center lg:text-right space-y-6">
                  {/* Title - Enhanced clarity and size */}
                  <div>
                    <MotionWrapper animation="slide" delay={0.2} duration={0.5}>
                      <h2 className="text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white mb-3">
                        <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                          المدقق الداخلي المعتمد
                        </span>
                      </h2>
                    </MotionWrapper>
                    <MotionWrapper animation="slide" delay={0.3} duration={0.5}>
                      <p className="text-base lg:text-lg text-primary-600 dark:text-primary-400 font-semibold mb-3">
                        Certified Internal Auditor (CIA)
                      </p>
                    </MotionWrapper>
                    <MotionWrapper animation="slide" delay={0.4} duration={0.5}>
                      <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <Globe className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        <span>معتمدة من معهد المراجعين الداخليين العالمي (IIA)</span>
                      </div>
                    </MotionWrapper>
                  </div>

                  {/* Description */}
                  <MotionWrapper animation="slideDown" delay={0.5} duration={0.5}>
                    <p className="text-base lg:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                      البرنامج الأكثر طلباً في مجال المراجعة الداخلية - شهادة معترف بها عالمياً تفتح أبواب الفرص المهنية. اكتشف التفاصيل الكاملة والفوائد والموارد التعليمية المتاحة.
                    </p>
                  </MotionWrapper>

                  {/* CTA Button */}
                  <MotionWrapper animation="slideDown" delay={0.6} duration={0.5} className="pt-2">
                    <Link href={ROUTES.CIA}>
                      <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 text-white rounded-xl font-bold text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-[0.98]">
                        <span>اكتشف البرامج والفعاليات الكاملة</span>
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                      </button>
                    </Link>
                  </MotionWrapper>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </Container>
    </section>
  );
};

export default FellowshipSection;
