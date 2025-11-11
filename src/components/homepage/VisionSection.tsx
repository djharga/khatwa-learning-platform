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
    <section className="relative py-8 lg:py-10 overflow-hidden">
      <Container size="xl" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Compact Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950/30 dark:via-neutral-900 dark:to-indigo-950/30 border border-blue-200/50 dark:border-blue-800/50 shadow-xl">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-full blur-3xl"></div>
            
            {/* Content */}
            <div className="relative z-10 p-6 lg:p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200/50 dark:border-blue-700/50 mb-4"
                >
                  <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs">
                    الرؤية (Vision)
                  </span>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="inline-flex items-center justify-center w-10 h-10 mb-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg"
                >
                  <Eye className="w-5 h-5 text-white" />
                </motion.div>
              </div>

              {/* Vision Content */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl p-4 border border-blue-200/30 dark:border-blue-800/30"
                >
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm lg:text-base font-medium text-neutral-900 dark:text-white leading-relaxed text-right flex-1">
                      أن نصبح <span className="text-blue-600 dark:text-blue-400 font-bold">المنصة العربية الرائدة</span> في تعليم وتطوير مهارات الشباب لمواكبة <span className="text-indigo-600 dark:text-indigo-400">سوق العمل</span>
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl p-4 border border-blue-200/30 dark:border-blue-800/30"
                >
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm lg:text-base font-medium text-neutral-900 dark:text-white leading-relaxed text-right flex-1">
                      وأن نكون <span className="text-blue-600 dark:text-blue-400 font-bold">الشريك الاستراتيجي الأول</span> للشركات والمؤسسات في بناء <span className="text-indigo-600 dark:text-indigo-400">جيل قادة للشركات</span> ويلبي احتياجات <span className="text-blue-700 dark:text-blue-300">السوق</span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default VisionSection;

