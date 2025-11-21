'use client';

import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { motion } from 'framer-motion';

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-white dark:bg-neutral-900 rounded-2xl p-8 lg:p-12 border-2 border-neutral-200 dark:border-neutral-700 shadow-xl"
          >
            {/* Content - Enhanced internal spacing */}
            <div className="text-center space-y-8">
              {/* Title */}
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white">
                جاهز لبدء رحلتك التعليمية؟
              </h2>
              
              {/* Simple Description - Enhanced spacing */}
              <p className="text-base lg:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto py-2">
                انضم إلينا اليوم وابدأ رحلتك نحو التميز المهني
              </p>

              {/* CTA Button - Consistent with other sections, no glow, smooth transition */}
              <div className="pt-4">
                <Link href={ROUTES.REGISTER}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center gap-2 px-7 py-[14px] bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white rounded-xl font-bold text-sm lg:text-base shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <span>ابدأ الآن</span>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;

