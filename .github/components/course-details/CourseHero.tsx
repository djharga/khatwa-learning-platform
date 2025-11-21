'use client';

import { motion } from 'framer-motion';
import { Play, Star, Clock, BookOpen, Users, Award, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { safeFormatNumber } from '@/lib/numberUtils';
import { ROUTES } from '@/lib/routes';

interface CourseHeroProps {
  title: string;
  description: string;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  level: string;
  category: string;
  image: string;
  videoPreviewUrl?: string;
  instructor?: {
    name: string;
    avatar: string;
  };
  onPlayPreview?: () => void;
  onTryFreeLesson?: () => void;
}

export default function CourseHero({
  title,
  description,
  rating,
  students,
  duration,
  lessons,
  level,
  category,
  image,
  videoPreviewUrl,
  instructor,
  onPlayPreview,
  onTryFreeLesson,
}: CourseHeroProps) {
  const [showVideo, setShowVideo] = useState(false);

  const handlePlayPreview = () => {
    if (videoPreviewUrl) {
      setShowVideo(true);
      onPlayPreview?.();
    }
  };

  // Use course-hero.jpg as fallback if image is not provided or invalid
  const heroImage = image || '/assets/course-hero.jpg';

  return (
    <div className="relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[50vh] lg:min-h-[60vh] xl:min-h-[65vh] flex items-center justify-center overflow-hidden mx-4 my-4 rounded-2xl">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          className="object-cover rounded-2xl"
          quality={90}
          sizes="100vw"
          loading="eager"
        />
        
        {/* 60% Dark Overlay - Primary overlay for contrast */}
        <div 
          className="absolute inset-0 rounded-2xl bg-black/60"
          style={{
            transform: 'translateZ(0)',
          }}
        />
      </div>

      {/* Background Pattern - Reduced opacity to 0.15 */}
      <div className="absolute inset-0 opacity-[0.15] z-[1]">
        <div className="absolute inset-0 rounded-2xl" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Decorative Light Effects - Reduced opacity to 0.15 */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/8 rounded-full blur-2xl opacity-[0.15] pointer-events-none z-[1]" style={{ transform: 'translateZ(0)', willChange: 'auto' }} />
      <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-purple-500/8 rounded-full blur-2xl opacity-[0.15] pointer-events-none z-[1]" style={{ transform: 'translateZ(0)', willChange: 'auto' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-6 lg:px-8 xl:px-8 py-8 sm:py-8 md:py-10 lg:py-12 xl:py-12 w-full">
        {/* Back Button */}
        <Link
          href={ROUTES.COURSES}
          className="inline-flex items-center gap-2 text-white hover:text-white mb-4 transition-colors group drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">العودة إلى الدورات</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-8 md:gap-8 lg:gap-8 xl:gap-8 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative z-10 space-y-8">
            {/* Badges - WCAG AA compliant contrast, responsive at all breakpoints */}
            <div className="flex flex-wrap gap-2 sm:gap-2 md:gap-3 lg:gap-2 xl:gap-3">
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-3 md:py-1.5 lg:px-4 lg:py-2 bg-white/30 backdrop-blur-md rounded-full text-xs sm:text-sm md:text-xs lg:text-sm font-medium text-white hover:bg-white/40 transition-all duration-300 border border-white/40 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                {level}
              </span>
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-3 md:py-1.5 lg:px-4 lg:py-2 bg-white/30 backdrop-blur-md rounded-full text-xs sm:text-sm md:text-xs lg:text-sm font-medium text-white flex items-center gap-1.5 sm:gap-2 hover:bg-white/40 transition-all duration-300 border border-white/40 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {category}
              </span>
            </div>

            {/* Title - 3.5rem (56px), weight 800, fully responsive with 32px spacing */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] xl:text-[3.5rem] font-extrabold leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]" style={{ fontWeight: 800 }} dir="rtl">
              {title}
            </h1>

            {/* Description - WCAG AA compliant (4.5:1 contrast), responsive, 32px spacing */}
            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-white leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-medium" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
              {description}
            </p>

            {/* Stats - WCAG AA compliant, responsive, 32px spacing */}
            <div className="flex flex-wrap gap-4 sm:gap-4 md:gap-6 lg:gap-4 xl:gap-6">
              <div className="flex items-center gap-1.5 sm:gap-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 fill-current text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
                <span className="text-sm sm:text-base md:text-sm lg:text-base font-semibold text-white" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>{rating}</span>
                <span className="text-sm sm:text-base md:text-sm lg:text-base text-white" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>({safeFormatNumber(students)} طالب)</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                <span className="text-sm sm:text-base md:text-sm lg:text-base text-white" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>{duration}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                <span className="text-sm sm:text-base md:text-sm lg:text-base text-white" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>{lessons} درس</span>
              </div>
            </div>

            {/* Instructor - WCAG AA compliant, responsive, 32px spacing */}
            {instructor && (
              <div className="flex items-center gap-4 sm:gap-4 md:gap-6 lg:gap-4 xl:gap-6 p-4 sm:p-4 md:p-5 lg:p-4 xl:p-5 bg-white/20 backdrop-blur-md rounded-[14px] border border-white/30 shadow-elevation-2" dir="rtl">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden ring-2 ring-white/50 shadow-elevation-1">
                  <Image
                    src={instructor.avatar || '/api/placeholder/48/48'}
                    alt={instructor.name}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm sm:text-base md:text-sm lg:text-base text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>المدرّس</div>
                  <div className="text-base sm:text-lg md:text-base lg:text-lg font-normal text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>{instructor.name}</div>
                </div>
              </div>
            )}

            {/* CTAs - WCAG AA compliant, responsive, 32px spacing */}
            <div className="flex flex-wrap gap-3 sm:gap-3 md:gap-4 lg:gap-3 xl:gap-4">
              {videoPreviewUrl && (
                <button
                  onClick={handlePlayPreview}
                  className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 bg-white text-blue-700 rounded-lg text-sm sm:text-base md:text-sm lg:text-base font-semibold hover:bg-white/90 transition-all hover:scale-105 shadow-md hover:shadow-lg"
                  style={{ color: '#1e40af' }}
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 fill-current" />
                  <span>شاهد معاينة</span>
                </button>
              )}
              {onTryFreeLesson && (
                <button
                  onClick={onTryFreeLesson}
                  className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 bg-white/25 backdrop-blur-sm text-white rounded-lg text-sm sm:text-base md:text-sm lg:text-base font-semibold hover:bg-white/35 transition-all border border-white/40"
                  style={{ color: 'rgba(255, 255, 255, 0.95)' }}
                >
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                  <span>جرّب درسًا مجانًا</span>
                </button>
              )}
            </div>
            </div>
          </motion.div>

          {/* Video Preview Section - Optional, only shown if video exists */}
          {videoPreviewUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="relative"
            >
              {showVideo ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-elevation-5 border-glow-primary">
                  <video
                    src={videoPreviewUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setShowVideo(false)}
                    className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors hover-glow-primary-xs"
                    aria-label="إغلاق الفيديو"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-elevation-5 border-glow-primary group card-tech hover:shadow-elevation-6 hover-glow-primary-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/20" />
                  <button
                    onClick={handlePlayPreview}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors"
                    aria-label="تشغيل معاينة الفيديو"
                  >
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-primary-lg group-hover:scale-110 transition-transform hover-glow-primary-md">
                      <Play className="w-10 h-10 text-blue-600 fill-current translate-x-1" />
                    </div>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

