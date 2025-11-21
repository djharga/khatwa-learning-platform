'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/primitives';

/**
 * What Makes Us Section - قسم ما يميزنا
 * عبارة بسيطة وواضحة
 */

const WhatMakesUsSection = () => {
  return (
    <section className="relative py-8 lg:py-10 overflow-hidden">
      <Container size="xl" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 lg:p-8 border border-neutral-200 dark:border-neutral-700 shadow-xl" dir="rtl">
            <div className="text-center space-y-5">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                  ما يميزنا
                </span>
              </h2>
              
              <div className="space-y-4 text-lg lg:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <p>
                  نمنحك الأدوات والمعرفة والدعم لتتطور... خطوة بخطوة نحو نجاحك المهني
                </p>
                <p className="font-semibold text-primary-600 dark:text-primary-400">
                  نحن لا نعلّمك فقط المعلومة...
                </p>
                <p>
                  نمنحك الخبرة التي يتم بناؤها خطوة بخطوة، حتى تصبح جاهزاً للعمل في الواقع
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default WhatMakesUsSection;

