'use client';

import { motion } from 'framer-motion';
import { Play, Star, Clock, BookOpen, Users, Award, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { safeFormatNumber } from '@/lib/numberUtils';

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
  instructor: {
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
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden mx-4 my-6 rounded-[3rem]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 rounded-[3rem] overflow-hidden">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          className="object-cover rounded-[3rem]"
          quality={90}
          sizes="100vw"
          loading="eager"
        />
        
        {/* Enhanced Overlay Layer with blue tint for better text contrast */}
        <div 
          className="absolute inset-0 rounded-[3rem]"
          style={{
            background: `linear-gradient(135deg, rgba(30, 58, 138, 0.75) 0%, rgba(37, 99, 235, 0.65) 50%, rgba(29, 78, 216, 0.7) 100%)`,
            transform: 'translateZ(0)',
          }}
        />
        {/* Additional blue gradient from bottom for text area */}
        <div 
          className="absolute inset-0 rounded-[3rem]"
          style={{
            background: `linear-gradient(to top, rgba(30, 58, 138, 0.85) 0%, rgba(37, 99, 235, 0.65) 40%, transparent 100%)`,
            transform: 'translateZ(0)',
          }}
        />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-[1]">
        <div className="absolute inset-0 rounded-[3rem]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Minimal Light Effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-2xl opacity-40 pointer-events-none z-[1]" style={{ transform: 'translateZ(0)', willChange: 'auto' }} />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-2xl opacity-40 pointer-events-none z-[1]" style={{ transform: 'translateZ(0)', willChange: 'auto' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 w-full">
        {/* Back Button */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-white hover:text-white mb-6 transition-colors group hover-glow-primary-xs drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">العودة إلى الدورات</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 relative"
          >
            {/* Text backdrop with blue tint for extra contrast */}
            <div className="absolute inset-0 -mx-6 -my-6 bg-gradient-to-br from-blue-900/25 via-blue-800/15 to-transparent rounded-2xl backdrop-blur-[2px] pointer-events-none" />
            <div className="relative z-10">
            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white/25 backdrop-blur-md rounded-full text-sm font-medium text-white hover:bg-white/35 transition-all duration-300 hover-glow-primary-xs border border-white/30 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                {level}
              </span>
              <span className="px-4 py-2 bg-white/25 backdrop-blur-md rounded-full text-sm font-medium text-white flex items-center gap-2 hover:bg-white/35 transition-all duration-300 hover-glow-primary-xs border border-white/30 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                <Award className="w-4 h-4" />
                {category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight heading-tech display-tech text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {title}
            </h1>

            {/* Description */}
            <p className="text-xl text-white leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] font-medium">
              {description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                <Star className="w-5 h-5 fill-current text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                <span className="font-semibold text-white">{rating}</span>
                <span className="text-white/95">({safeFormatNumber(students)} طالب)</span>
              </div>
              <div className="flex items-center gap-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                <Clock className="w-5 h-5 text-white" />
                <span className="text-white/95">{duration}</span>
              </div>
              <div className="flex items-center gap-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                <BookOpen className="w-5 h-5 text-white" />
                <span className="text-white/95">{lessons} درس</span>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-4 p-4 bg-white/15 backdrop-blur-md rounded-xl border border-white/20 shadow-elevation-2">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/40 shadow-elevation-1">
                <Image
                  src={instructor.avatar}
                  alt={instructor.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">المدرّس</div>
                <div className="font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">{instructor.name}</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              {videoPreviewUrl && (
                <button
                  onClick={handlePlayPreview}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-white/90 transition-all hover:scale-105 shadow-primary-md hover:shadow-primary-lg hover-glow-primary-md focus-glow-primary"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>شاهد معاينة</span>
                </button>
              )}
              {onTryFreeLesson && (
                <button
                  onClick={onTryFreeLesson}
                  className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all border border-white/30 hover-glow-primary-xs focus-glow-primary"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>جرّب درسًا مجانًا</span>
                </button>
              )}
            </div>
            </div>
          </motion.div>

          {/* Video Preview Section - Optional, only shown if video exists */}
          {videoPreviewUrl && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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

