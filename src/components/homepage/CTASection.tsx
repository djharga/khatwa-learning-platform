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
          {/* Compact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/30 dark:via-neutral-900 dark:to-purple-950/30 rounded-2xl p-6 lg:p-8 border border-indigo-200/50 dark:border-indigo-800/50 shadow-xl"
          >
            {/* Content */}
            <div className="text-center space-y-6">
              {/* Title */}
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white">
                جاهز لبدء رحلتك التعليمية؟
              </h2>
              
              {/* Simple Description */}
              <p className="text-base lg:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto">
                انضم إلينا اليوم وابدأ رحلتك نحو التميز المهني
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <Link href={ROUTES.REGISTER}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white rounded-xl font-semibold text-sm lg:text-base shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="relative z-10">ابدأ الآن</span>
                    <ArrowLeft className="w-4 h-4 relative z-10 group-hover:-translate-x-1 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

