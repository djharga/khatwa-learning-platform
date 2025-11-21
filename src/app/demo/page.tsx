'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ScrollAnimation,
  GlassCard,
  Button
} from '@/components/ui';
import {
  Skeleton,
  ShimmerSkeletonScreen,
  SkeletonDemo,
  CourseCardSkeleton,
  CardSkeleton,
  StatCardSkeleton,
  TableSkeleton
} from '@/components/ui/Skeleton';
import { TypingHeading, TypingText } from '@/components/ui/TypingText';
import CourseCard from '@/components/CourseCard';
import { adaptCourse } from '@/lib/courseAdapter';
import { getAllCourses } from '@/data/courses/all-courses';

export default function DemoPage() {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [skeletonType, setSkeletonType] = useState<'pulse' | 'wave' | 'shimmer'>('shimmer');
  const [screenType, setScreenType] = useState<'cards' | 'list' | 'table'>('cards');

  // Get a sample course for demonstration
  const sampleCourse = getAllCourses().find(course => course.id === 1);

  const toggleSkeleton = () => {
    setShowSkeleton(!showSkeleton);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="text-center mb-12">
            <TypingHeading
              text="🎭 عرض التأثيرات البصرية"
              speed={100}
              delay={200}
              className="text-4xl font-bold text-neutral-900 dark:text-white mb-4"
            />
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              عرض لجميع تأثيرات التحميل والانتقالات المطورة
            </p>
          </div>
        </ScrollAnimation>

        {/* Controls */}
        <ScrollAnimation direction="up" delay={0.2}>
          <GlassCard className="mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">🎛️ التحكم في التأثيرات</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Skeleton Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">نوع Skeleton</label>
                  <select
                    value={skeletonType}
                    onChange={(e) => setSkeletonType(e.target.value as 'pulse' | 'wave' | 'shimmer')}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="pulse">Pulse (نبض)</option>
                    <option value="wave">Wave (موجة)</option>
                    <option value="shimmer">Shimmer (متلألئ) ✨</option>
                  </select>
                </div>

                {/* Screen Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">نوع الشاشة</label>
                  <select
                    value={screenType}
                    onChange={(e) => setScreenType(e.target.value as 'cards' | 'list' | 'table')}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="cards">Cards (كروت)</option>
                    <option value="list">List (قائمة)</option>
                    <option value="table">Table (جدول)</option>
                  </select>
                </div>

                {/* Toggle Button */}
                <div className="flex items-end">
                  <Button onClick={toggleSkeleton} variant="default" className="w-full">
                    {showSkeleton ? 'إخفاء التأثيرات' : 'عرض التأثيرات'}
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollAnimation>

        {/* Skeleton Demo Section */}
        {showSkeleton && (
          <ScrollAnimation direction="up" delay={0.3}>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">🎨 تأثيرات Skeleton المختلفة</h2>
              <SkeletonDemo />
            </div>
          </ScrollAnimation>
        )}

        {/* Individual Skeletons */}
        <ScrollAnimation direction="up" delay={0.4}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">🔄 تأثيرات فردية</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pulse Animation</h3>
                <Skeleton animation="pulse" height="20px" width="100%" />
                <Skeleton animation="pulse" height="20px" width="80%" />
                <Skeleton animation="pulse" height="20px" width="60%" />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Wave Animation</h3>
                <Skeleton animation="wave" height="20px" width="100%" />
                <Skeleton animation="wave" height="20px" width="80%" />
                <Skeleton animation="wave" height="20px" width="60%" />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Shimmer Animation ✨</h3>
                <Skeleton animation="shimmer" height="20px" width="100%" />
                <Skeleton animation="shimmer" height="20px" width="80%" />
                <Skeleton animation="shimmer" height="20px" width="60%" />
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Card Skeletons */}
        <ScrollAnimation direction="up" delay={0.5}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">📄 كروت Skeleton</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CardSkeleton />
              <StatCardSkeleton />
              <CourseCardSkeleton />
            </div>
          </div>
        </ScrollAnimation>

        {/* Full Screen Skeletons */}
        <ScrollAnimation direction="up" delay={0.6}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">🖥️ شاشات Skeleton كاملة</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Cards Layout</h3>
                <ShimmerSkeletonScreen variant="cards" count={4} />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">List Layout</h3>
                <ShimmerSkeletonScreen variant="list" count={5} />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Table Layout</h3>
                <ShimmerSkeletonScreen variant="table" count={6} />
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Typing Effect Examples */}
        <ScrollAnimation direction="up" delay={0.7}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">⌨️ تأثيرات الكتابة التدريجي</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">عنوان تدريجي سريع</h3>
                  <TypingHeading
                    text="مرحباً بك في منصة خطى!"
                    speed={50}
                    delay={300}
                    className="text-2xl"
                  />
                </div>
              </GlassCard>

              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">نص تدريجي متوسط</h3>
                  <TypingText
                    text="تعلم المهارات المهنية بخطوات واضحة وممنهجة"
                    speed={80}
                    delay={500}
                    showCursor={true}
                    className="text-base"
                  />
                </div>
              </GlassCard>

              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">نص طويل بطيء</h3>
                  <TypingText
                    text="منصة تعليمية متخصصة تقدم دورات مهنية معتمدة في المحاسبة والمالية والإدارة"
                    speed={120}
                    delay={700}
                    showCursor={true}
                    className="text-sm leading-relaxed"
                  />
                </div>
              </GlassCard>

              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">عنوان متكرر</h3>
                  <TypingHeading
                    text="ابدأ رحلتك المهنية الآن!"
                    speed={100}
                    delay={300}
                    loop={true}
                    loopDelay={2000}
                    className="text-xl"
                  />
                </div>
              </GlassCard>
            </div>
          </div>
        </ScrollAnimation>

        {/* Interactive Elements */}
        <ScrollAnimation direction="up" delay={0.8}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">🎯 عناصر تفاعلية محسنة</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Enhanced Button */}
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">أزرار محسنة</h3>
                  <div className="space-y-3">
                    <Button>زر أساسي</Button>
                    <Button variant="secondary">زر ثانوي</Button>
                    <Button variant="ghost">زر شبحي</Button>
                  </div>
                </div>
              </GlassCard>

              {/* Course Card Example */}
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">كارت كورس محسن</h3>
                  {sampleCourse ? (
                    <CourseCard
                      course={adaptCourse(sampleCourse)}
                      variant="compact"
                      isLoading={false}
                    />
                  ) : (
                    <p className="text-neutral-500">لا توجد دورة عينة</p>
                  )}
                </div>
              </GlassCard>
            </div>
          </div>
        </ScrollAnimation>

        {/* Animations Showcase */}
        <ScrollAnimation direction="up" delay={0.8}>
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">🎬 عرض الحركات</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { direction: 'up', label: 'من الأسفل' },
                { direction: 'down', label: 'من الأعلى' },
                { direction: 'left', label: 'من اليسار' },
                { direction: 'right', label: 'من اليمين' },
                { direction: 'fade', label: 'تلاشي' },
                { direction: 'scale', label: 'تكبير' },
              ].map((anim, index) => (
                <ScrollAnimation key={index} direction={anim.direction as any} delay={index * 0.1}>
                  <motion.div
                    className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-4 text-white text-center shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h4 className="font-semibold">{anim.label}</h4>
                  </motion.div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Footer */}
        <ScrollAnimation direction="up" delay={0.9}>
          <div className="text-center py-8">
            <GlassCard variant="elevated">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">✨ تم تطوير جميع التأثيرات</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  جميع التأثيرات تدعم الوضع المظلم وتقليل الحركة لإمكانية الوصول الأفضل
                </p>
              </div>
            </GlassCard>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
