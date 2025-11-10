'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Sparkles, Target } from 'lucide-react';

/**
 * Khatwa Info Card - بطاقة معلومات خطى
 * بطاقة جميلة بتحريكات بسيطة لعرض معلومات منصة خطى
 */

const KhatwaInfoCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative max-w-5xl mx-auto"
    >
      {/* Main Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-primary-50/30 to-purple-50/20 dark:from-neutral-900 dark:via-primary-900/20 dark:to-purple-900/10 border border-primary-200/50 dark:border-primary-800/30 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        {/* Decorative Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 p-8 lg:p-12">
          {/* Header Section */}
          <div className="text-center mb-8">
            {/* Icon Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl shadow-lg"
            >
              <GraduationCap className="w-8 h-8 text-white" />
            </motion.div>

            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight"
            >
              <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-primary-600 bg-clip-text text-transparent">
                تعليم وتدريب بلا حدود
              </span>
            </motion.h2>
          </div>

          {/* Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 mb-8"
          >
            <p className="text-lg lg:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed text-center">
              خطى هي منصة عربية رائدة في تعليم وتطوير مهارات الأعمال، تجمع بين المحتوى الأكاديمي والتطبيق العملي الواقعي، وتقدّم تجربة تعليمية ذكية تعتمد على الأدوات التقنية الحديثة والذكاء الاصطناعي.
            </p>
          </motion.div>

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            {/* Decorative Quote Mark */}
            <div className="absolute -top-4 -right-4 w-16 h-16 opacity-10">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-primary-600 dark:text-primary-400">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Quote Content */}
            <div className="relative bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-primary-200/30 dark:border-primary-800/30 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Sparkles className="w-6 h-6 text-primary-500 dark:text-primary-400" />
                </div>
                <p className="text-lg lg:text-xl font-semibold text-neutral-900 dark:text-white leading-relaxed text-right flex-1">
                  <span className="text-primary-600 dark:text-primary-400 font-bold">"خطى"</span> ليست مجرد منصة تعليمية، بل حل متكامل لتحويل أي متعلم إلى محترف في تخصصه من خلال{' '}
                  <span className="text-primary-600 dark:text-primary-400">محتوى واقعي</span>،{' '}
                  <span className="text-purple-600 dark:text-purple-400">أدوات ذكية</span>، و{' '}
                  <span className="text-pink-600 dark:text-pink-400">دعم شخصي</span>.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Footer Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-primary-200/30 dark:border-primary-800/30"
          >
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <Target className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-medium">تعليم</span>
            </div>
            <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700" />
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <GraduationCap className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium">تدريب</span>
            </div>
            <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700" />
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <Sparkles className="w-5 h-5 text-pink-500" />
              <span className="text-sm font-medium">استشارات</span>
            </div>
          </motion.div>
        </div>

        {/* Subtle Corner Accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary-500/10 to-transparent rounded-br-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-tl-full pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default KhatwaInfoCard;

