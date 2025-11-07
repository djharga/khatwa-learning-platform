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

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* Back Button */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>العودة إلى الدورات</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                {level}
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium flex items-center gap-2">
                <Award className="w-4 h-4" />
                {category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
              {description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-current text-yellow-300" />
                <span className="font-semibold">{rating}</span>
                <span className="text-white/80">({safeFormatNumber(students)} طالب)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>{lessons} درس</span>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/30">
                <Image
                  src={instructor.avatar}
                  alt={instructor.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm text-white/80">المدرّس</div>
                <div className="font-semibold">{instructor.name}</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              {videoPreviewUrl && (
                <button
                  onClick={handlePlayPreview}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>شاهد معاينة</span>
                </button>
              )}
              {onTryFreeLesson && (
                <button
                  onClick={onTryFreeLesson}
                  className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all border border-white/30"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>جرّب درسًا مجانًا</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Image/Video Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {showVideo && videoPreviewUrl ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <video
                  src={videoPreviewUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors"
                  aria-label="إغلاق الفيديو"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {videoPreviewUrl && (
                  <button
                    onClick={handlePlayPreview}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors"
                    aria-label="تشغيل معاينة الفيديو"
                  >
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-10 h-10 text-blue-600 fill-current translate-x-1" />
                    </div>
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

