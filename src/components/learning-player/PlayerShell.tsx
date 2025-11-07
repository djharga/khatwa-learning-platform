'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { X, Menu, ChevronLeft, ChevronRight, Clock, CheckCircle, BookOpen, ArrowRight } from 'lucide-react';
import LessonSidebar from './LessonSidebar';
import { ResponsiveVideoPlayer } from '@/components/ui/ResponsiveVideoPlayer';
import PlayerTabs from './PlayerTabs';
import ProgressBar from './ProgressBar';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  videoUrl?: string;
  description?: string;
  transcript?: string;
  completed?: boolean;
  locked?: boolean;
  progress?: number;
  resources?: Array<{
    id: string;
    title: string;
    url: string;
    type: string;
  }>;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface PlayerShellProps {
  courseId: string;
  courseTitle: string;
  modules: Module[];
  currentLessonId: string;
  onLessonChange: (lessonId: string) => void;
  onComplete?: (lessonId: string) => void;
}

export default function PlayerShell({
  courseId,
  courseTitle,
  modules,
  currentLessonId,
  onLessonChange,
  onComplete,
}: PlayerShellProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  // Find current lesson and navigation
  const { currentLesson: foundLesson, prevLesson, nextLesson } = useMemo(() => {
    let found: Lesson | null = null;
    let prev: Lesson | null = null;
    let next: Lesson | null = null;
    let foundIndex = -1;
    let foundModuleIndex = -1;

    // Find current lesson
    for (let mIdx = 0; mIdx < modules.length; mIdx++) {
      const module = modules[mIdx];
      const lessonIndex = module.lessons.findIndex(l => String(l.id) === String(currentLessonId));
      if (lessonIndex !== -1) {
        found = module.lessons[lessonIndex];
        foundIndex = lessonIndex;
        foundModuleIndex = mIdx;
        break;
      }
    }

    // Find previous lesson
    if (foundIndex !== -1 && foundModuleIndex !== -1) {
      const currentModule = modules[foundModuleIndex];
      
      if (foundIndex > 0) {
        prev = currentModule.lessons[foundIndex - 1];
      } else if (foundModuleIndex > 0) {
        const prevModule = modules[foundModuleIndex - 1];
        if (prevModule.lessons.length > 0) {
          prev = prevModule.lessons[prevModule.lessons.length - 1];
        }
      }
    }

    // Find next lesson
    if (foundIndex !== -1 && foundModuleIndex !== -1) {
      const currentModule = modules[foundModuleIndex];
      
      if (foundIndex < currentModule.lessons.length - 1) {
        next = currentModule.lessons[foundIndex + 1];
      } else if (foundModuleIndex < modules.length - 1) {
        const nextModule = modules[foundModuleIndex + 1];
        if (nextModule.lessons.length > 0 && !nextModule.lessons[0].locked) {
          next = nextModule.lessons[0];
        }
      }
    }

    return { currentLesson: found, prevLesson: prev, nextLesson: next };
  }, [currentLessonId, modules]);

  useEffect(() => {
    setCurrentLesson(foundLesson);
  }, [foundLesson]);

  // Calculate overall progress
  const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = modules.reduce(
    (acc, module) => acc + module.lessons.filter(l => l.completed).length,
    0
  );
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="flex h-screen w-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white overflow-hidden fixed inset-0 z-50">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 240 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 shadow-xl flex-shrink-0"
      >
        {sidebarOpen && (
          <LessonSidebar
            modules={modules}
            currentLessonId={currentLessonId}
            overallProgress={overallProgress}
            onLessonClick={onLessonChange}
            onClose={() => setSidebarOpen(false)}
          />
        )}
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-950">
        {/* Top Bar - Premium Design */}
        <div className="h-14 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-sm flex items-center justify-between px-4 flex-shrink-0">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Back to Course Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/student/courses/${courseId}`)}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
              aria-label="العودة إلى الكورس"
            >
              <ArrowRight className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </motion.button>
            {!sidebarOpen && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
                aria-label="فتح القائمة"
              >
                <Menu className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </motion.button>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-xs font-bold truncate text-gray-900 dark:text-white">{courseTitle}</h1>
              {currentLesson && (
                <p className="text-[10px] text-gray-600 dark:text-gray-400 truncate mt-0.5">{currentLesson.title}</p>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-1.5 mx-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => prevLesson && onLessonChange(prevLesson.id)}
              disabled={!prevLesson}
              className={`p-1.5 rounded-lg transition-all ${
                prevLesson
                  ? 'hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300'
                  : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              }`}
              aria-label="الدرس السابق"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => nextLesson && !nextLesson.locked && onLessonChange(nextLesson.id)}
              disabled={!nextLesson || nextLesson?.locked}
              className={`p-1.5 rounded-lg transition-all ${
                nextLesson && !nextLesson.locked
                  ? 'hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300'
                  : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              }`}
              aria-label="الدرس التالي"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 hidden md:block bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
              {completedLessons}/{totalLessons}
            </div>
            <div className="w-24 h-1.5 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 md:hidden bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded">
              {Math.round(overallProgress)}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressBar progress={overallProgress} />

        {/* Lesson Content */}
        {currentLesson ? (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Video Player */}
            {currentLesson.type === 'video' && currentLesson.videoUrl ? (
              <div className="flex-shrink-0 p-4 bg-gray-50 dark:bg-slate-900">
                <ResponsiveVideoPlayer
                  url={currentLesson.videoUrl}
                  title={currentLesson.title}
                  autoplay={false}
                  lessonId={currentLesson.id}
                  courseId={courseId}
                  onEnded={() => {
                    onComplete?.(currentLesson.id);
                    if (nextLesson && !nextLesson.locked) {
                      setTimeout(() => {
                        onLessonChange(nextLesson.id);
                      }, 2000);
                    }
                  }}
                />
              </div>
            ) : (
              // Non-video lesson header
              <div className="flex-shrink-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 p-5 border-b border-gray-200 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                    {currentLesson.type === 'reading' ? '📖' : 
                     currentLesson.type === 'quiz' ? '📝' :
                     currentLesson.type === 'assignment' ? '📋' : '📄'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{currentLesson.title}</h2>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                        <Clock className="w-3 h-3" />
                        <span className="font-medium text-xs">{currentLesson.duration}</span>
                      </span>
                      {currentLesson.completed && (
                        <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-lg">
                          <CheckCircle className="w-3 h-3" />
                          <span className="font-medium text-xs">مكتمل</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
                    
            {/* Content Area */}
            <div className="flex-1 flex flex-col lg:flex-row min-h-0">
              {/* Main Content */}
              <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-950">
                <div className="max-w-4xl mx-auto p-5">
                  {currentLesson.description && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-5"
                    >
                      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          نظرة عامة على الدرس
                        </h3>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <p className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed text-xs">
                            {currentLesson.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Quick Actions */}
                  {currentLesson.type === 'quiz' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-5 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                          📝
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">اختبار تفاعلي</h4>
                          <p className="text-xs text-gray-700 dark:text-gray-300 mb-3">اختبر معلوماتك من خلال هذا الاختبار التفاعلي.</p>
                          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5">
                            <span>ابدأ الاختبار</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentLesson.type === 'assignment' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-5 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                          📋
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">وظيفة نهائية</h4>
                          <p className="text-xs text-gray-700 dark:text-gray-300 mb-3">اقرأ المتطلبات بعناية وقدم عملك.</p>
                          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5">
                            <span>عرض الوظيفة</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="sticky bottom-0 bg-white dark:bg-slate-950 py-4 mt-5 border-t border-gray-200 dark:border-slate-800"
                  >
                    <div className="flex items-center justify-start gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onComplete?.(currentLesson.id)}
                        disabled={currentLesson.completed}
                        className={`px-5 py-2.5 rounded-lg font-semibold text-xs transition-all flex items-center gap-2 ${
                          currentLesson.completed
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl'
                        }`}
                      >
                        <CheckCircle className="w-3 h-3" />
                        <span>{currentLesson.completed ? 'مكتمل' : 'إكمال الدرس'}</span>
                      </motion.button>
                      {nextLesson && !nextLesson.locked && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onLessonChange(nextLesson.id)}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
                        >
                          <span>الدرس التالي</span>
                          <ChevronRight className="w-3 h-3" />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Tabs Section */}
              <div className="w-full lg:w-72 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <PlayerTabs lesson={currentLesson} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-md mx-auto px-4"
            >
              <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <X className="w-7 h-7 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">الدرس غير موجود</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-5">
                لم يتم العثور على الدرس المطلوب. يرجى التحقق من الرابط أو العودة إلى قائمة الدروس.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={() => {
                    const firstLesson = modules[0]?.lessons?.[0];
                    if (firstLesson) {
                      onLessonChange(firstLesson.id);
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-colors"
                >
                  العودة إلى أول درس
                </button>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="px-4 py-2 bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-800 dark:text-white rounded-lg font-semibold text-xs transition-colors"
                >
                  عرض قائمة الدروس
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
