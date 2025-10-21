'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Clock,
  Users,
  Star,
  Award,
  X,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Share2,
  Download,
  Eye,
  AlertCircle,
  RefreshCw,
  Maximize,
  User,
  BarChart,
  Share,
  PlayCircle,
  ThumbsUp,
  File,
  MessageCircle,
  BookOpen,
  Send,
} from 'lucide-react';
import { Button } from './ui';
import { CoursePreviewProps, Course } from '@/types/course';
import {
  formatCoursePrice,
  getDifficultyColor,
  getDifficultyEmoji,
} from '@/utils/courseUtils';
import toast from 'react-hot-toast';

interface CoursePreviewState {
  loading: boolean;
  error: string | null;
  isBookmarked: boolean;
  currentVideoIndex: number;
}

const CoursePreview: React.FC<CoursePreviewProps> = ({
  course,
  isOpen,
  onClose,
  onEnroll,
  onBookmark,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'curriculum' | 'reviews' | 'instructor'
  >('overview');
  const [state, setState] = useState<CoursePreviewState>({
    loading: false,
    error: null,
    isBookmarked: false,
    currentVideoIndex: 0,
  });

  // Event handlers
  const handleBookmark = useCallback(async () => {
    try {
      await onBookmark?.(course.id);
      setState((prev) => ({ ...prev, isBookmarked: !prev.isBookmarked }));
      toast.success(
        state.isBookmarked
          ? 'تم إزالة الدورة من المفضلة'
          : 'تم إضافة الدورة إلى المفضلة'
      );
    } catch (error) {
      toast.error('فشل في تحديث المفضلة');
    }
  }, [course.id, onBookmark, state.isBookmarked]);

  const handleEnroll = useCallback(async () => {
    try {
      await onEnroll?.(course.id);
      toast.success('تم التسجيل في الدورة بنجاح');
      onClose();
    } catch (error) {
      toast.error('فشل في التسجيل في الدورة');
    }
  }, [course.id, onEnroll, onClose]);

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: course.title,
          text: course.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('تم نسخ رابط الدورة');
      }
    } catch (error) {
      toast.error('فشل في مشاركة الدورة');
    }
  }, [course.title, course.description]);

  const nextVideo = useCallback(() => {
    const videos =
      course.curriculum?.flatMap((section) => section.lessons) || [];
    setState((prev) => ({
      ...prev,
      currentVideoIndex: Math.min(
        prev.currentVideoIndex + 1,
        videos.length - 1
      ),
    }));
  }, [course.curriculum]);

  const prevVideo = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentVideoIndex: Math.max(prev.currentVideoIndex - 1, 0),
    }));
  }, []);

  const toggleFullscreen = useCallback(() => {
    // تنفيذ وظيفة ملء الشاشة
  }, []);

  // Memoized data
  const videos = useMemo(() => {
    return course.curriculum?.flatMap((section) => section.lessons) || [];
  }, [course.curriculum]);

  const currentVideo = videos[state.currentVideoIndex];

  // Memoized tabs
  const tabs = useMemo(
    () => [
      { id: 'overview' as const, label: 'نظرة عامة', icon: Play },
      { id: 'curriculum' as const, label: 'المنهج', icon: Clock },
      { id: 'reviews' as const, label: 'التقييمات', icon: Star },
      { id: 'instructor' as const, label: 'المدرب', icon: Users },
    ],
    []
  );

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setState((prev) => ({ ...prev, currentVideoIndex: 0 }));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content */}
          <motion.div
            className="xl:col-span-8 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Course Header */}
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Video Player */}
              <motion.div
                className="relative pt-[56.25%] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.2),transparent_50%)] pointer-events-none"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 sm:p-12 lg:p-16 text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Play className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-white mx-auto mb-4 opacity-80" />
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                      معاينة الدورة
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base lg:text-lg">
                      شاهد مقتطفات من المحتوى التعليمي
                    </p>
                  </motion.div>
                </div>

                {/* Fullscreen Button */}
                <motion.button
                  onClick={toggleFullscreen}
                  className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-3 rounded-2xl transition-all duration-300 hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="ملء الشاشة"
                >
                  <Maximize className="w-5 h-5" />
                </motion.button>

                {/* Video Navigation */}
                {videos.length > 1 && (
                  <>
                    <motion.button
                      onClick={prevVideo}
                      disabled={state.currentVideoIndex === 0}
                      className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 disabled:bg-black/30 text-white p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={nextVideo}
                      disabled={state.currentVideoIndex === videos.length - 1}
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 disabled:bg-black/30 text-white p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </>
                )}
              </motion.div>

              {/* Course Info */}
              <motion.div
                className="p-6 sm:p-8 lg:p-10 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <motion.h1
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {course.title}
                    </motion.h1>
                    <motion.p
                      className="text-gray-600 text-base sm:text-lg leading-relaxed"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      {course.description}
                    </motion.p>
                  </div>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.button
                      onClick={handleShare}
                      className="p-3 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="مشاركة الدورة"
                    >
                      <Share className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={handleBookmark}
                      className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                        state.isBookmarked
                          ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300 hover:bg-yellow-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="إضافة للمفضلة"
                    >
                      <Bookmark
                        className={`w-5 h-5 transition-colors duration-300 ${state.isBookmarked ? 'fill-current' : ''}`}
                      />
                    </motion.button>
                  </motion.div>
                </div>

                {/* Course Stats */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <motion.div
                    className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <User className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        المدرب
                      </p>
                      <p className="font-semibold text-gray-900">
                        {course.instructor.name}
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Clock className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600 font-medium">المدة</p>
                      <p className="font-semibold text-gray-900">
                        {course.duration} ساعات
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-3 p-4 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Award className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        المستوى
                      </p>
                      <p className="font-semibold text-gray-900">
                        {course.level}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <motion.button
                    onClick={handleEnroll}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:ring-4 focus:ring-blue-500/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Play className="w-5 h-5" />
                      التسجيل في الدورة
                    </div>
                  </motion.button>
                  <motion.button
                    className="flex-1 bg-white hover:bg-gray-50 border-2 border-blue-600 text-blue-600 hover:border-blue-700 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:ring-4 focus:ring-blue-500/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Eye className="w-5 h-5" />
                      تجربة مجانية
                    </div>
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
            {/* Curriculum */}
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="flex items-center gap-4 mb-6 sm:mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <BookOpen className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    منهج الكورس
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base mt-1">
                    اكتشف المحتوى التعليمي الشامل
                  </p>
                </div>
              </motion.div>

              <div className="space-y-4 sm:space-y-6">
                {course.curriculum?.map((section, sectionIndex) => (
                  <motion.div
                    key={sectionIndex}
                    className="border-2 border-gray-100 hover:border-blue-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-gray-50/50 to-blue-50/30"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className="p-4 sm:p-6 bg-gradient-to-r from-white to-blue-50/50 border-b border-gray-100 hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                      whileHover={{
                        backgroundColor: 'rgba(239, 246, 255, 0.8)',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <motion.h3
                          className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          {typeof section === 'string'
                            ? section
                            : section.title}
                        </motion.h3>
                        <motion.div
                          className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Play className="w-4 h-4" />
                          <span>{section.lessons.length} درس</span>
                        </motion.div>
                      </div>
                    </motion.div>

                    <div className="divide-y divide-gray-100">
                      {section.lessons.map((lesson, lessonIndex) => {
                        const lessonTitle =
                          typeof lesson === 'string' ? lesson : lesson.title;
                        const lessonDuration =
                          typeof lesson === 'string' ? '' : lesson.duration;

                        return (
                          <motion.div
                            key={lessonIndex}
                            className="p-4 sm:p-6 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer group"
                            whileHover={{ x: 8 }}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: sectionIndex * 0.1 + lessonIndex * 0.05,
                            }}
                            viewport={{ once: true }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 flex-1">
                                <motion.div
                                  className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300"
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                  <PlayCircle className="w-5 h-5 text-blue-600" />
                                </motion.div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 text-sm sm:text-base">
                                    {lessonTitle}
                                  </h4>
                                  <div className="flex items-center gap-4 mt-1">
                                    <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                                      <Clock className="w-4 h-4" />
                                      <span>{lessonDuration}</span>
                                    </div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-gray-500">
                                      متاح للمشاهدة
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <motion.div
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                whileHover={{ scale: 1.1 }}
                              >
                                <Play className="w-5 h-5 text-blue-600" />
                              </motion.div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Discussions */}
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="flex items-center gap-4 mb-6 sm:mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    المناقشات والتفاعل
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base mt-1">
                    شارك أفكارك مع المجتمع التعليمي
                  </p>
                </div>
              </motion.div>

              <div className="space-y-6">
                {/* New Comment Form */}
                <motion.div
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100 hover:border-blue-200 transition-all duration-300"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex gap-4">
                    <motion.div
                      className="flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>
                    <div className="flex-1 space-y-4">
                      <textarea
                        placeholder="شارك استفسارك أو ملاحظتك مع المتعلمين الآخرين..."
                        className="w-full p-4 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-2xl focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-sm sm:text-base resize-none"
                        rows={4}
                      />
                      <motion.div
                        className="flex justify-end"
                        whileHover={{ scale: 1.02 }}
                      >
                        <motion.button
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 focus:ring-4 focus:ring-blue-500/50"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            نشر التعليق
                          </div>
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Comments */}
                {course.reviews?.map((review, reviewIndex) => (
                  <motion.div
                    key={review.id}
                    className="border-2 border-gray-100 hover:border-blue-200 rounded-2xl p-6 bg-white hover:bg-blue-50/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: reviewIndex * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex gap-4">
                      <motion.div
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <User className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <motion.h4
                            className="font-bold text-gray-900 text-base sm:text-lg hover:text-blue-700 transition-colors duration-300"
                            whileHover={{ scale: 1.02 }}
                          >
                            {review.user.name}
                          </motion.h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{review.date}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                          {review.comment}
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                          <motion.button
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              const newReviews = course.reviews
                                ? [...course.reviews]
                                : [];
                              const reviewIndex = newReviews.findIndex(
                                (r) => r.id === review.id
                              );
                              if (reviewIndex !== -1) {
                                newReviews[reviewIndex] = {
                                  ...newReviews[reviewIndex],
                                  helpful:
                                    (newReviews[reviewIndex].helpful || 0) + 1,
                                };
                              }
                            }}
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>مفيد ({review.helpful || 0})</span>
                          </motion.button>
                          <motion.button
                            className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            رد
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="xl:col-span-4 space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Resources */}
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Download className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    الموارد المساعدة
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    ملفات ومراجع إضافية
                  </p>
                </div>
              </motion.div>

              <div className="space-y-3">
                {course.resources?.map((resource, index) => (
                  <motion.a
                    key={resource.id}
                    href={resource.url}
                    className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50/50 hover:from-blue-50 hover:to-purple-50/50 rounded-2xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg hover:translate-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <File className="w-5 h-5 text-blue-600" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 text-sm sm:text-base">
                        {resource.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        تحميل مجاني
                      </p>
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Download className="w-5 h-5 text-blue-600" />
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Notes */}
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <File className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    ملاحظاتك الشخصية
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    سجل أفكارك وملاحظاتك
                  </p>
                </div>
              </motion.div>

              <div className="space-y-4">
                <textarea
                  placeholder="اكتب ملاحظاتك هنا أثناء مشاهدة الدورة..."
                  className="w-full p-4 border-2 border-gray-200 hover:border-purple-300 focus:border-purple-500 rounded-2xl focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-sm sm:text-base resize-none"
                  rows={6}
                />
                <motion.div
                  className="flex justify-end"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 focus:ring-4 focus:ring-purple-500/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" />
                      حفظ الملاحظات
                    </div>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            {/* Related Courses */}
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <BookOpen className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    دورات ذات صلة
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    استمر في رحلتك التعليمية
                  </p>
                </div>
              </motion.div>

              <div className="space-y-4">
                {course.relatedCourses?.map((relatedCourse, index) => (
                  <motion.a
                    key={relatedCourse.id}
                    href={`/courses/${relatedCourse.id}`}
                    className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-green-50/50 hover:from-green-50 hover:to-teal-50/50 rounded-2xl border-2 border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg hover:translate-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                      <BookOpen className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300 text-sm sm:text-base leading-tight">
                        {relatedCourse.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {relatedCourse.instructor.name}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600">4.8</span>
                      </div>
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ChevronLeft className="w-5 h-5 text-green-600" />
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

CoursePreview.displayName = 'CoursePreview';

export default CoursePreview;
