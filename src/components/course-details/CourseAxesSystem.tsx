'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, FileText, Headphones, FileSpreadsheet, Download, Play, Lock, ArrowLeft, BookOpen } from 'lucide-react';
import { WordIcon, PDFIcon, VideoIcon, AudioIcon } from '@/components/ui/icons/FileTypeIcons';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CourseFile {
  id: string;
  name: string;
  type: 'video' | 'podcast' | 'excel' | 'word' | 'pdf';
  size?: string;
  duration?: string;
  description?: string;
  isProtected?: boolean;
  url?: string;
}

interface SubAxis {
  id: string;
  title: string;
  description?: string;
  files: CourseFile[];
}

interface MainAxis {
  id: string;
  title: string;
  description?: string;
  subAxes: SubAxis[];
}

interface CourseAxesSystemProps {
  mainAxes: MainAxis[];
  hasAccess?: boolean;
  courseId?: string;
  courseSlug?: string; // إضافة slug للكورس
  onFileClick?: (file: CourseFile) => void;
}

export default function CourseAxesSystem({
  mainAxes,
  hasAccess = false,
  courseId,
  courseSlug,
  onFileClick
}: CourseAxesSystemProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [expandedMainAxis, setExpandedMainAxis] = useState<string | null>(null);
  const [expandedSubAxis, setExpandedSubAxis] = useState<string | null>(null);
  const [selectedSubAxis, setSelectedSubAxis] = useState<SubAxis | null>(null);

  // فتح أول محور تلقائياً عند التحميل
  useEffect(() => {
    if (mainAxes.length > 0 && expandedMainAxis === null) {
      const firstAxis = mainAxes[0];
      if (firstAxis) {
        setExpandedMainAxis(firstAxis.id);
        // فتح أول محور فرعي أيضاً
        if (firstAxis.subAxes.length > 0) {
          const firstSubAxis = firstAxis.subAxes[0];
          setExpandedSubAxis(firstSubAxis.id);
          setSelectedSubAxis(firstSubAxis);
        }
      }
    }
  }, [mainAxes, expandedMainAxis]);

  const toggleMainAxis = (axisId: string) => {
    if (expandedMainAxis === axisId) {
      setExpandedMainAxis(null);
      setExpandedSubAxis(null);
      setSelectedSubAxis(null);
    } else {
      setExpandedMainAxis(axisId);
      setExpandedSubAxis(null);
      setSelectedSubAxis(null);
    }
  };

  const toggleSubAxis = (subAxisId: string, subAxis: SubAxis) => {
    if (expandedSubAxis === subAxisId) {
      setExpandedSubAxis(null);
      setSelectedSubAxis(null);
    } else {
      setExpandedSubAxis(subAxisId);
      setSelectedSubAxis(subAxis);
    }
  };

  const getFileIcon = (type: CourseFile['type']) => {
    const iconClass = "w-5 h-5 flex-shrink-0";
    switch (type) {
      case 'video':
        return <VideoIcon className={iconClass} size={20} />;
      case 'podcast':
        return <AudioIcon className={iconClass} size={20} />;
      case 'excel':
        return <FileSpreadsheet className={`${iconClass} text-green-600`} />;
      case 'word':
        return <WordIcon className={iconClass} size={20} />;
      case 'pdf':
        return <PDFIcon className={iconClass} size={20} />;
      default:
        return <FileText className={`${iconClass} text-gray-600`} />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" dir="rtl">
      {/* المحاور التعليمية - على اليمين (RTL) */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-6">
          المحاور التعليمية
        </h3>

        <div className="space-y-4">
          {mainAxes.map((mainAxis, mainIndex) => {
            const isMainExpanded = expandedMainAxis === mainAxis.id;

            return (
              <motion.div
                key={mainAxis.id}
                className="relative"
              >
                {/* Learning Card */}
                <motion.div
                  className={`
                    relative overflow-hidden rounded-2xl
                    bg-white dark:bg-neutral-800
                    shadow-xl shadow-black/20 dark:shadow-black/40
                    border-2 ${isMainExpanded ? 'border-primary-500 dark:border-primary-400' : 'border-neutral-300 dark:border-neutral-600'}
                    transition-all duration-300 ease-out
                    ${isMainExpanded ? 'ring-2 ring-primary-500/30 dark:ring-primary-400/30' : ''}
                  `}
                  whileHover={prefersReducedMotion ? {} : {
                    y: -2,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    transition: { duration: 0.2, ease: 'easeOut' }
                  }}
                  style={{
                    willChange: prefersReducedMotion ? 'auto' : 'transform',
                  }}
                >
                  {/* المحور الرئيسي */}
                  <motion.button
                    onClick={() => toggleMainAxis(mainAxis.id)}
                    className="w-full flex items-center justify-between p-6 text-right cursor-pointer group bg-white dark:bg-neutral-800"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.99 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {/* Module Number Badge */}
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary-500/40">
                        {mainIndex + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xl text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {mainAxis.title}
                        </h4>
                        {mainAxis.description && (
                          <p className="text-base text-neutral-700 dark:text-neutral-300 line-clamp-2 font-medium">
                            {mainAxis.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isMainExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
                    </motion.div>
                  </motion.button>

                  {/* المحاور الفرعية */}
                  <AnimatePresence>
                    {isMainExpanded && (
                      <motion.div
                        key="content"
                        initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                        animate={prefersReducedMotion ? {} : { height: 'auto', opacity: 1 }}
                        exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 space-y-3 bg-white dark:bg-neutral-900 border-t-2 border-neutral-200 dark:border-neutral-700">
                          {mainAxis.subAxes.map((subAxis, subIndex) => {
                            const isSubExpanded = expandedSubAxis === subAxis.id;
                            const isActive = selectedSubAxis?.id === subAxis.id;

                            return (
                              <motion.div
                                key={subAxis.id}
                                initial={prefersReducedMotion ? {} : { x: -10 }}
                                animate={prefersReducedMotion ? {} : { x: 0 }}
                                transition={prefersReducedMotion ? {} : {
                                  duration: 0.2,
                                  delay: subIndex * 0.05
                                }}
                                className={`
                                  relative rounded-xl overflow-hidden
                                  ${isActive
                                    ? 'bg-primary-100 dark:bg-primary-900 border-2 border-primary-500 dark:border-primary-400 shadow-lg shadow-primary-500/30'
                                    : 'bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900'
                                  }
                                  transition-all duration-200
                                `}
                              >
                                {/* Active State Indicator */}
                                {isActive && (
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: 4 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute right-0 top-0 bottom-0 bg-gradient-to-b from-primary-500 to-primary-600 rounded-l-lg"
                                  />
                                )}

                                <div className="flex items-center gap-3 p-4">
                                  <button
                                    onClick={() => toggleSubAxis(subAxis.id, subAxis)}
                                    className="flex-1 flex items-center justify-between text-right cursor-pointer group min-h-[44px]"
                                  >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                      <motion.div
                                        animate={{ rotate: isSubExpanded ? 90 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex-shrink-0"
                                      >
                                        <ChevronRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                                      </motion.div>

                                      <div className="flex-1 min-w-0">
                                        <h5 className={`
                                          font-bold text-base mb-1 transition-colors
                                          ${isActive
                                            ? 'text-primary-700 dark:text-primary-400'
                                            : 'text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400'
                                          }
                                        `}>
                                          {subAxis.title}
                                        </h5>
                                        {subAxis.description && (
                                          <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-1 font-medium">
                                            {subAxis.description}
                                          </p>
                                        )}
                                        <div className="flex items-center gap-2 mt-2">
                                          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                                            {subAxis.files.length} ملف
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </button>

                                  {/* زر ابدأ التعلم - Full Width Pill */}
                                  {(courseSlug || courseId) && isActive && (
                                    <motion.button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (courseSlug) {
                                          router.push(`/courses/${courseSlug}/lesson`);
                                        } else if (courseId) {
                                          router.push(`/student/courses/${courseId}/lesson`);
                                        }
                                      }}
                                      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                                      animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.2, delay: 0.1 }}
                                      whileHover={prefersReducedMotion ? {} : {
                                        scale: 1.05,
                                        boxShadow: '0px 5px 10px rgba(0,0,0,0.1)',
                                        transition: { duration: 0.2, ease: 'easeOut' }
                                      }}
                                      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                                      className="flex-shrink-0 flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 hover:from-primary-700 hover:via-primary-600 hover:to-primary-700 text-white rounded-full text-base font-bold shadow-xl shadow-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-200 min-h-[48px] transform hover:scale-105"
                                      title="ابدأ التعلم - عرض جميع المحاور والدروس"
                                    >
                                      <BookOpen className="w-4 h-4" />
                                      <span>ابدأ التعلم</span>
                                    </motion.button>
                                  )}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* الملفات - على اليسار (Sticky) */}
      <div className="lg:col-span-1">
        <div className="sticky top-4">
          <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-6">
            الملفات
          </h3>

          <AnimatePresence mode="wait">
            {selectedSubAxis ? (
              <motion.div
                key={selectedSubAxis.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="
                  bg-white dark:bg-neutral-800
                  border-2 border-primary-200 dark:border-primary-800
                  rounded-2xl p-6
                  shadow-xl shadow-primary-500/10 dark:shadow-primary-500/20
                "
              >
                <h4 className="font-bold text-lg text-primary-700 dark:text-primary-400 mb-4 pb-3 border-b-2 border-primary-200 dark:border-primary-800">
                  {selectedSubAxis.title}
                </h4>

                <div className="space-y-2">
                  {selectedSubAxis.files.map((file, fileIndex) => (
                    <motion.div
                      key={file.id}
                      initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                      animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                      transition={prefersReducedMotion ? {} : {
                        duration: 0.2,
                        delay: fileIndex * 0.05
                      }}
                      whileHover={prefersReducedMotion ? {} : {
                        x: 4,
                        transition: { duration: 0.2, ease: 'easeOut' }
                      }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                      className="
                        flex items-center gap-3 p-4 rounded-xl
                        bg-white dark:bg-neutral-800
                        hover:bg-primary-50 dark:hover:bg-primary-950
                        border-2 border-neutral-200 dark:border-neutral-700
                        hover:border-primary-300 dark:hover:border-primary-700
                        cursor-pointer transition-all duration-200
                        group shadow-sm hover:shadow-md
                      "
                      onClick={() => {
                        if (hasAccess || !file.isProtected) {
                          if (courseSlug && file.id && (hasAccess || !file.isProtected)) {
                            // استخدام slug من صفحات الدورات العامة
                            router.push(`/courses/${courseSlug}/lesson/${file.id}`);
                          } else if (courseId && file.id && (hasAccess || !file.isProtected)) {
                            // استخدام courseId من صفحات الداشبورد
                            router.push(`/student/courses/${courseId}/lesson/${file.id}`);
                          } else {
                            onFileClick?.(file);
                          }
                        }
                      }}
                    >
                      <div className="flex-shrink-0">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-bold text-neutral-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {file.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          {file.size && (
                            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                              {file.size}
                            </span>
                          )}
                          {file.duration && (
                            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                              • {file.duration}
                            </span>
                          )}
                        </div>
                      </div>
                      {file.isProtected && !hasAccess && (
                        <Lock className="w-4 h-4 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                      )}
                      {(hasAccess || !file.isProtected) && (
                        <Download className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 flex-shrink-0 transition-colors" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={prefersReducedMotion ? {} : { opacity: 1 }}
                exit={prefersReducedMotion ? {} : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="
                  bg-white dark:bg-neutral-800
                  border-2 border-dashed border-neutral-300 dark:border-neutral-700
                  rounded-2xl p-12 text-center
                  shadow-lg
                "
              >
                <motion.div
                  animate={prefersReducedMotion ? {} : {
                    scale: [1, 1.1, 1],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse' as const,
                      ease: 'easeInOut'
                    }
                  }}
                  className="mb-4"
                >
                  <FileText className="w-16 h-16 text-neutral-400 dark:text-neutral-500 mx-auto" />
                </motion.div>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  اختر محور فرعي لعرض الملفات
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

