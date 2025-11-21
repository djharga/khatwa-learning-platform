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
          <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/30 dark:via-neutral-900 dark:to-purple-950/30 rounded-2xl p-6 lg:p-8 border border-indigo-200/50 dark:border-indigo-800/50 shadow-xl">
            <div className="text-center space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  ما يميزنا
                </span>
              </h2>
              
              <div className="space-y-4 text-base lg:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <p>
                  نمنحك الأدوات والمعرفة والدعم لتتطور... خطوة بخطوة نحو نجاحك المهني
                </p>
                <p className="font-medium">
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

