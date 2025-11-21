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
          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-xl" dir="rtl">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-200/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent-200/20 to-transparent rounded-full blur-3xl"></div>
            
            {/* Content */}
            <div className="relative z-10 p-6 lg:p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 rounded-full border border-primary-200/50 dark:border-primary-700/50 mb-4"
                >
                  <Compass className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <span className="text-primary-600 dark:text-primary-400 font-semibold text-xs">
                    الرسالة (Mission)
                  </span>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="inline-flex items-center justify-center w-14 h-14 mb-3 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl shadow-lg"
                >
                  <Rocket className="w-7 h-7 text-white" strokeWidth={2.5} />
                </motion.div>
              </div>

              {/* Mission Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-primary-50/50 dark:bg-primary-900/10 rounded-xl p-5 border border-primary-200/50 dark:border-primary-800/50 mb-4"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                  <p className="text-base lg:text-lg font-semibold text-neutral-900 dark:text-white leading-relaxed text-right flex-1">
                    نسعى لتمكين <span className="text-primary-600 dark:text-primary-400 font-bold">الخريجيين ورواد الأعمال</span> من امتلاك المهارات والأدوات اللازمة لرفع جودة أعمال الشركات
                  </p>
                </div>
              </motion.div>

              {/* Mission Methods - Enhanced with unified height, larger icons, and subtle borders */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white dark:bg-neutral-800 rounded-xl p-5 border border-primary-200/50 dark:border-primary-800/50 text-center min-h-[130px] flex flex-col justify-center items-center hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    برامج تدريبية متكاملة
                  </h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white dark:bg-neutral-800 rounded-xl p-5 border border-accent-200/50 dark:border-accent-800/50 text-center min-h-[130px] flex flex-col justify-center items-center hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-600 to-accent-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Briefcase className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    دروس تطبيقية
                  </h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-white dark:bg-neutral-800 rounded-xl p-5 border border-emerald-200/50 dark:border-emerald-800/50 text-center min-h-[130px] flex flex-col justify-center items-center hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Users className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
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

