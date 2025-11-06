'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, Compass } from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * Mission Section - قسم الرسالة
 * يعرض رسالة منصة خطى
 */

const MissionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-purple-50/95 via-pink-50/90 to-rose-50/95 dark:from-purple-950/25 dark:via-pink-950/20 dark:to-rose-950/25">
      {/* Background Effects - Very Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/8 to-transparent dark:from-purple-900/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-pink-100/8 to-transparent dark:from-pink-900/5 rounded-full blur-3xl" />
      </div>

      <Container size="xl" className="relative z-10">
        <motion.div
          ref={ref}
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-3xl border border-purple-200/50 dark:border-purple-700/50 shadow-2xl p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-start gap-8">
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
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-3xl blur-2xl opacity-40"
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
                  <div className="relative w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 rounded-3xl flex items-center justify-center shadow-xl">
                    <Rocket className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 text-right space-y-6">
                <motion.div
                  className="inline-flex items-center gap-3 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-full border border-purple-200/50 dark:border-purple-700/50"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Compass className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">
                    الرسالة (Mission)
                  </span>
                </motion.div>

                <motion.p
                  className="text-lg md:text-xl lg:text-2xl text-neutral-900 dark:text-white leading-relaxed font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  نسعى لتمكين الخريجيين ورواد الأعمال من امتلاك المهارات والأدوات اللازمة لرفع جودة أعمال الشركات عبر{' '}
                  <span className="text-purple-600 dark:text-purple-400">برامج تدريبية متكاملة</span>،{' '}
                  <span className="text-pink-600 dark:text-pink-400">دروس تطبيقية</span>، و{' '}
                  <span className="text-rose-600 dark:text-rose-400">حالات عملية مستمدة من الواقع</span>
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default MissionSection;

