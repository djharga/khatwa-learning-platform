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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 dark:from-neutral-900 dark:via-purple-900/20 dark:to-pink-900/10 border border-purple-200/50 dark:border-purple-800/30 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            {/* Decorative Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
            
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
                  className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg"
                >
                  <Rocket className="w-8 h-8 text-white" />
                </motion.div>

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/30 rounded-full border border-purple-200/50 dark:border-purple-700/50 mb-6"
                >
                  <Compass className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">
                    الرسالة (Mission)
                  </span>
                </motion.div>
              </div>

              {/* Mission Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-purple-200/30 dark:border-purple-800/30 shadow-md mb-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Sparkles className="w-6 h-6 text-purple-500 dark:text-purple-400" />
                  </div>
                  <p className="text-lg lg:text-xl font-semibold text-neutral-900 dark:text-white leading-relaxed text-right flex-1">
                    نسعى لتمكين <span className="text-purple-600 dark:text-purple-400 font-bold">الخريجيين ورواد الأعمال</span> من امتلاك المهارات والأدوات اللازمة لرفع جودة أعمال الشركات
                  </p>
                </div>
              </motion.div>

              {/* Mission Methods */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Method 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl p-5 border border-purple-200/30 dark:border-purple-800/30 shadow-md text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                    برامج تدريبية متكاملة
                  </h3>
                </motion.div>

                {/* Method 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl p-5 border border-pink-200/30 dark:border-pink-800/30 shadow-md text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                    دروس تطبيقية
                  </h3>
                </motion.div>

                {/* Method 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl p-5 border border-rose-200/30 dark:border-rose-800/30 shadow-md text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                    حالات عملية مستمدة من الواقع
                  </h3>
                </motion.div>
              </div>
            </div>

            {/* Subtle Corner Accents */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-br-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pink-500/10 to-transparent rounded-tl-full pointer-events-none" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default MissionSection;

