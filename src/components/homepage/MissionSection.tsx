'use client';

import { motion } from 'framer-motion';
import { Rocket, Compass, Users, Briefcase, BookOpen, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * Mission Section - قسم الرسالة
 * يعرض رسالة منصة خطى بتصميم محسّن وجميل
 */

const MissionSection = () => {
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
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950/30 dark:via-neutral-900 dark:to-pink-950/30 border border-purple-200/50 dark:border-purple-800/50 shadow-xl">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-200/30 to-transparent rounded-full blur-3xl"></div>
            
            {/* Content */}
            <div className="relative z-10 p-6 lg:p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 rounded-full border border-purple-200/50 dark:border-purple-700/50 mb-4"
                >
                  <Compass className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span className="text-purple-600 dark:text-purple-400 font-semibold text-xs">
                    الرسالة (Mission)
                  </span>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="inline-flex items-center justify-center w-10 h-10 mb-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg"
                >
                  <Rocket className="w-5 h-5 text-white" />
                </motion.div>
              </div>

              {/* Mission Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl p-4 border border-purple-200/30 dark:border-purple-800/30 mb-4"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-500 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm lg:text-base font-medium text-neutral-900 dark:text-white leading-relaxed text-right flex-1">
                    نسعى لتمكين <span className="text-purple-600 dark:text-purple-400 font-bold">الخريجيين ورواد الأعمال</span> من امتلاك المهارات والأدوات اللازمة لرفع جودة أعمال الشركات
                  </p>
                </div>
              </motion.div>

              {/* Mission Methods - Compact */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-lg p-3 border border-purple-200/30 dark:border-purple-800/30 text-center"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xs lg:text-sm font-bold text-neutral-900 dark:text-white">
                    برامج تدريبية متكاملة
                  </h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-lg p-3 border border-pink-200/30 dark:border-pink-800/30 text-center"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xs lg:text-sm font-bold text-neutral-900 dark:text-white">
                    دروس تطبيقية
                  </h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-lg p-3 border border-rose-200/30 dark:border-rose-800/30 text-center"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xs lg:text-sm font-bold text-neutral-900 dark:text-white">
                    حالات عملية مستمدة من الواقع
                  </h3>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default MissionSection;

