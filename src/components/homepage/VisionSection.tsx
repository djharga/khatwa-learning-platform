'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye } from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * Vision Section - قسم الرؤية
 * يعرض رؤية منصة خطى
 */

const VisionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">

      <Container size="xl" className="relative z-10">
        <motion.div
          ref={ref}
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              {/* Icon */}
              <motion.div
                className="flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="relative">
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-3xl blur-2xl opacity-40"
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <div className="relative w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <Target className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 text-center space-y-6">
                <motion.div
                  className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200/50 dark:border-blue-700/50"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                    الرؤية (Vision)
                  </span>
                </motion.div>

                <motion.h2
                  className="text-2xl lg:text-4xl font-bold text-neutral-900 dark:text-white leading-tight text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  أن نصبح المنصة العربية الرائدة في تعليم وتطوير مهارات الشباب لمواكبة سوق العمل
                </motion.h2>

                <motion.p
                  className="text-base md:text-lg lg:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  وأن نكون الشريك الاستراتيجي الأول للشركات والمؤسسات في بناء جيل قادة للشركات ويلبي احتياجات السوق السعودي
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default VisionSection;

