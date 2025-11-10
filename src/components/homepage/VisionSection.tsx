'use client';

import { motion } from 'framer-motion';
import { Eye, Target, Building2, TrendingUp } from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * Vision Section - قسم الرؤية
 * يعرض رؤية منصة خطى بتصميم محسّن وجميل
 */

const VisionSection = () => {
  return (
    <section className="relative py-12 lg:py-16 overflow-hidden">
      <Container size="xl" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Main Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 dark:from-neutral-900 dark:via-blue-900/20 dark:to-indigo-900/10 border border-blue-200/50 dark:border-blue-800/30 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            {/* Decorative Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 pointer-events-none" />
            
            {/* Content */}
            <div className="relative z-10 p-8 lg:p-12">
              {/* Header Section */}
              <div className="text-center mb-8">
                {/* Icon Badge */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg"
                >
                  <Eye className="w-8 h-8 text-white" />
                </motion.div>

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200/50 dark:border-blue-700/50 mb-6"
                >
                  <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                    الرؤية (Vision)
                  </span>
                </motion.div>
              </div>

              {/* Vision Content */}
              <div className="space-y-6">
                {/* First Vision Point */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-blue-200/30 dark:border-blue-800/30 shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <TrendingUp className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                    </div>
                    <p className="text-lg lg:text-xl font-semibold text-neutral-900 dark:text-white leading-relaxed text-right flex-1">
                      أن نصبح <span className="text-blue-600 dark:text-blue-400 font-bold">المنصة العربية الرائدة</span> في تعليم وتطوير مهارات الشباب لمواكبة <span className="text-indigo-600 dark:text-indigo-400">سوق العمل</span>
                    </p>
                  </div>
                </motion.div>

                {/* Second Vision Point */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-blue-200/30 dark:border-blue-800/30 shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <Building2 className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <p className="text-lg lg:text-xl font-semibold text-neutral-900 dark:text-white leading-relaxed text-right flex-1">
                      وأن نكون <span className="text-blue-600 dark:text-blue-400 font-bold">الشريك الاستراتيجي الأول</span> للشركات والمؤسسات في بناء <span className="text-indigo-600 dark:text-indigo-400">جيل قادة للشركات</span> ويلبي احتياجات <span className="text-blue-700 dark:text-blue-300">السوق السعودي</span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Subtle Corner Accents */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-br-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-tl-full pointer-events-none" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default VisionSection;

