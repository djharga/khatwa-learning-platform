'use client';

import { GraduationCap, Sparkles, Target } from 'lucide-react';
import { MotionWrapper } from '@/components/ui/motion/MotionWrapper';

/**
 * Khatwa Info Card - بطاقة معلومات خطى
 * تصميم احترافي مدمج وحديث
 */

const KhatwaInfoCard = () => {
  return (
    <MotionWrapper
      animation="slideDown"
      duration={0.5}
      className="relative max-w-4xl mx-auto"
    >
      {/* Compact Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/30 dark:via-neutral-900 dark:to-purple-950/30 border border-indigo-200/50 dark:border-indigo-800/50 shadow-xl">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-full blur-3xl"></div>
        
        {/* Content */}
        <div className="relative z-10 p-6 lg:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <MotionWrapper animation="scale" delay={0.1} duration={0.4} className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </MotionWrapper>
            <MotionWrapper animation="slideDown" delay={0.2} duration={0.5}>
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  ما يميزنا
                </span>
              </h2>
            </MotionWrapper>
          </div>

          {/* Description */}
          <MotionWrapper
            animation="slideDown"
            delay={0.3}
            duration={0.5}
            className="space-y-3 mb-6"
          >
            <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed text-center">
              نمنحك الأدوات والمعرفة والدعم لتتطور مهنيًا خطوة بخطوة نحو النجاح.
            </p>
            <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed text-center">
              نحن لا نعلّمك فقط المعلومة، بل نمنحك الخبرة التي تبني مسارك المهني واقعيًا.
            </p>
          </MotionWrapper>

          {/* Footer Icons - Compact */}
          <MotionWrapper
            animation="fade"
            delay={0.4}
            duration={0.5}
            className="flex items-center justify-center gap-6 pt-4 border-t border-indigo-200/30 dark:border-indigo-800/30"
          >
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <Target className="w-4 h-4 text-indigo-500" />
              <span className="text-xs lg:text-sm font-medium">تعليم</span>
            </div>
            <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-700" />
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <GraduationCap className="w-4 h-4 text-purple-500" />
              <span className="text-xs lg:text-sm font-medium">تدريب</span>
            </div>
            <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-700" />
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-xs lg:text-sm font-medium">استشارات</span>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </MotionWrapper>
  );
};

export default KhatwaInfoCard;

