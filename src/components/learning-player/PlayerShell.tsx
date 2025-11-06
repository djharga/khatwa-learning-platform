'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Menu, ChevronLeft, ChevronRight, Clock, CheckCircle } from 'lucide-react';
import LessonSidebar from './LessonSidebar';
import VideoPlayer from './VideoPlayer';
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
      // Compare as strings to handle type mismatches
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
      
      // Check previous lesson in same module
      if (foundIndex > 0) {
        prev = currentModule.lessons[foundIndex - 1];
      } else if (foundModuleIndex > 0) {
        // Go to last lesson of previous module
        const prevModule = modules[foundModuleIndex - 1];
        if (prevModule.lessons.length > 0) {
          prev = prevModule.lessons[prevModule.lessons.length - 1];
        }
      }
    }

    // Find next lesson
    if (foundIndex !== -1 && foundModuleIndex !== -1) {
      const currentModule = modules[foundModuleIndex];
      
      // Check next lesson in same module
      if (foundIndex < currentModule.lessons.length - 1) {
        next = currentModule.lessons[foundIndex + 1];
      } else if (foundModuleIndex < modules.length - 1) {
        // Go to first lesson of next module
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
    <div className="flex h-screen w-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white overflow-hidden fixed inset-0 z-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-80' : 'w-0'
        } transition-all duration-300 overflow-hidden bg-gradient-to-b from-slate-900/95 via-gray-900/95 to-slate-950/95 border-l border-indigo-500/20 shadow-2xl flex-shrink-0 backdrop-blur-sm`}
      >
        <LessonSidebar
          modules={modules}
          currentLessonId={currentLessonId}
          overallProgress={overallProgress}
          onLessonClick={onLessonChange}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
        {/* Enhanced Top Bar */}
        <div className="h-16 bg-gradient-to-r from-slate-900/98 via-gray-900/98 to-slate-950/98 backdrop-blur-xl border-b border-indigo-500/30 shadow-xl flex items-center justify-between px-6 flex-shrink-0 relative">
          {/* Decorative gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/60 via-violet-500/60 to-transparent"></div>
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {!sidebarOpen && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSidebarOpen(true);
                }}
                className="p-2.5 hover:bg-gradient-to-br hover:from-indigo-600/25 hover:to-violet-600/25 rounded-xl transition-all hover:scale-110 flex-shrink-0 border border-slate-700/50 hover:border-indigo-500/60 shadow-lg hover:shadow-indigo-500/25"
                aria-label="فتح القائمة"
                title="فتح قائمة الدروس"
              >
                <Menu className="w-5 h-5 text-indigo-400" />
              </button>
            )}
            <div className="flex-1 min-w-0 mr-4">
              <h1 className="text-lg font-bold truncate bg-gradient-to-r from-white via-indigo-100 to-violet-100 bg-clip-text text-transparent">{courseTitle}</h1>
              {currentLesson && (
                <p className="text-sm text-slate-300 truncate mt-0.5 font-medium">{currentLesson.title}</p>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 mx-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (prevLesson) {
                  onLessonChange(prevLesson.id);
                }
              }}
              disabled={!prevLesson}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                prevLesson
                  ? 'bg-gradient-to-br from-indigo-600/25 to-violet-600/25 hover:from-indigo-500/35 hover:to-violet-500/35 text-indigo-400 hover:text-indigo-300 hover:scale-110 border border-indigo-500/40 hover:border-indigo-400/60 shadow-lg hover:shadow-indigo-500/35'
                  : 'text-slate-500 cursor-not-allowed opacity-40 bg-slate-800/50'
              }`}
              aria-label="الدرس السابق"
              title={prevLesson ? `الدرس السابق: ${prevLesson.title}` : 'لا يوجد درس سابق'}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (nextLesson && !nextLesson.locked) {
                  onLessonChange(nextLesson.id);
                }
              }}
              disabled={!nextLesson || nextLesson?.locked}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                nextLesson && !nextLesson.locked
                  ? 'bg-gradient-to-br from-indigo-600/25 to-violet-600/25 hover:from-indigo-500/35 hover:to-violet-500/35 text-indigo-400 hover:text-indigo-300 hover:scale-110 border border-indigo-500/40 hover:border-indigo-400/60 shadow-lg hover:shadow-indigo-500/35'
                  : 'text-slate-500 cursor-not-allowed opacity-40 bg-slate-800/50'
              }`}
              aria-label="الدرس التالي"
              title={nextLesson && !nextLesson.locked ? `الدرس التالي: ${nextLesson.title}` : nextLesson?.locked ? 'الدرس التالي مقفل' : 'لا يوجد درس تالي'}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Overall Progress */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-sm font-semibold text-slate-200 hidden md:block bg-slate-800/60 px-3 py-1.5 rounded-lg border border-indigo-500/20 backdrop-blur-sm">
              {completedLessons}/{totalLessons}
            </div>
            <div className="w-28 md:w-36 h-2.5 bg-slate-800/90 rounded-full overflow-hidden shadow-inner border border-indigo-500/20">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-500 ease-out shadow-lg relative overflow-hidden"
                style={{ width: `${overallProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer"></div>
              </div>
            </div>
            <div className="text-xs font-bold text-indigo-400 md:hidden bg-indigo-500/15 px-2 py-1 rounded-lg border border-indigo-500/30 backdrop-blur-sm">{Math.round(overallProgress)}%</div>
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressBar progress={overallProgress} />

        {/* Lesson Content */}
        {currentLesson ? (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Video Player - only for video lessons */}
            {currentLesson.type === 'video' && currentLesson.videoUrl ? (
              <div className="flex-1 bg-black relative">
                <VideoPlayer
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  onComplete={() => {
                    onComplete?.(currentLesson.id);
                    // Auto-advance to next lesson if available
                    if (nextLesson && !nextLesson.locked) {
                      setTimeout(() => {
                        onLessonChange(nextLesson.id);
                      }, 2000);
                    }
                  }}
                  lessonId={currentLesson.id}
                  courseId={courseId}
                />
              </div>
            ) : (
              // Non-video lesson content
              <div className="flex-1 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 overflow-y-auto">
                <div className="max-w-4xl mx-auto p-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-slate-900/95 via-gray-900/90 to-slate-950/95 rounded-3xl p-8 shadow-2xl border border-indigo-500/20 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-3xl shadow-xl shadow-violet-500/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent"></div>
                        <span className="relative z-10">{currentLesson.type === 'reading' ? '📖' : 
                         currentLesson.type === 'quiz' ? '📝' :
                         currentLesson.type === 'assignment' ? '📋' : '📄'}</span>
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white via-indigo-100 to-violet-100 bg-clip-text text-transparent">{currentLesson.title}</h2>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-2 text-slate-200 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-indigo-500/20 backdrop-blur-sm">
                            <Clock className="w-4 h-4 text-indigo-400" />
                            <span className="font-medium">{currentLesson.duration}</span>
                          </span>
                          {currentLesson.completed && (
                            <span className="flex items-center gap-2 text-emerald-400 bg-emerald-500/15 px-3 py-1.5 rounded-lg border border-emerald-500/30 backdrop-blur-sm">
                              <CheckCircle className="w-4 h-4" />
                              <span className="font-medium">مكتمل</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {currentLesson.description && (
                      <div className="mb-8">
                        <div className="bg-slate-800/40 border border-indigo-500/20 rounded-2xl p-6 backdrop-blur-sm">
                          <h3 className="text-lg font-semibold text-indigo-300 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-full"></span>
                            وصف الدرس
                          </h3>
                          <div className="prose prose-invert max-w-none leading-relaxed">
                            <p className="whitespace-pre-line text-slate-200 text-base leading-7 font-medium">
                              {currentLesson.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentLesson.type === 'quiz' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-6 bg-gradient-to-br from-indigo-900/35 via-indigo-800/25 to-violet-900/35 border border-indigo-500/40 rounded-2xl shadow-xl shadow-indigo-500/20 backdrop-blur-sm"
                      >
                        <p className="text-indigo-200 mb-4 font-medium">هذا اختبار تفاعلي. انقر على زر "ابدأ الاختبار" للبدء.</p>
                        <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/50 hover:scale-105 flex items-center gap-2">
                          <span>ابدأ الاختبار</span>
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}

                    {currentLesson.type === 'assignment' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-6 bg-gradient-to-br from-violet-900/35 via-violet-800/25 to-fuchsia-900/35 border border-violet-500/40 rounded-2xl shadow-xl shadow-violet-500/20 backdrop-blur-sm"
                      >
                        <p className="text-violet-200 mb-4 font-medium">هذه وظيفة نهائية. اقرأ المتطلبات وقدم عملك.</p>
                        <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-violet-500/40 hover:shadow-xl hover:shadow-violet-500/50 hover:scale-105 flex items-center gap-2">
                          <span>عرض الوظيفة</span>
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}

                    <div className="mt-8 pt-6 border-t border-indigo-500/20">
                      <div className="flex items-center gap-4 flex-wrap">
                        <button
                          onClick={() => onComplete?.(currentLesson.id)}
                          className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-teal-500 text-white rounded-xl font-bold text-base transition-all duration-300 shadow-lg shadow-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 border border-emerald-400/40 min-w-[180px]"
                        >
                          <CheckCircle className="w-5 h-5 flex-shrink-0" />
                          <span>تمييز كمكتمل</span>
                        </button>
                        {nextLesson && !nextLesson.locked && (
                          <button
                            onClick={() => onLessonChange(nextLesson.id)}
                            className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 hover:from-indigo-500 hover:via-violet-500 hover:to-fuchsia-500 text-white rounded-xl font-bold text-base transition-all duration-300 shadow-lg shadow-violet-500/40 hover:shadow-xl hover:shadow-violet-500/50 hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 border border-violet-400/40 min-w-[180px]"
                          >
                            <span>الدرس التالي</span>
                            <ChevronLeft className="w-5 h-5 flex-shrink-0" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="h-96 flex-shrink-0 border-t border-indigo-500/20 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 shadow-2xl">
              <PlayerTabs lesson={currentLesson} />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-md mx-auto px-4"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-amber-500/25 via-orange-500/25 to-red-500/25 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-amber-500/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent"></div>
                <svg className="w-12 h-12 text-amber-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white via-amber-100 to-orange-100 bg-clip-text text-transparent">الدرس غير موجود</h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                لم يتم العثور على الدرس المطلوب. يرجى التحقق من الرابط أو العودة إلى قائمة الدروس.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const firstLesson = modules[0]?.lessons?.[0];
                    if (firstLesson) {
                      onLessonChange(firstLesson.id);
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/50 hover:scale-105 border border-indigo-400/30"
                >
                  العودة إلى أول درس
                </button>
                {modules.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setSidebarOpen(true);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-slate-500/20 hover:shadow-xl hover:scale-105 border border-slate-600/30"
                  >
                    عرض قائمة الدروس
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

