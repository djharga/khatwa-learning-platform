'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import LessonSidebar from './LessonSidebar';
import { ResponsiveVideoPlayer } from '@/components/ui/ResponsiveVideoPlayer';
import ProgressBar from './ProgressBar';
import SidebarToggleButton from '@/components/ui/SidebarToggleButton';

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

  const { currentLesson: foundLesson, prevLesson, nextLesson } = useMemo(() => {
    let found: Lesson | null = null;
    let prev: Lesson | null = null;
    let next: Lesson | null = null;
    let foundIndex = -1;
    let foundModuleIndex = -1;

    for (let mIdx = 0; mIdx < modules.length; mIdx++) {
      const module = modules[mIdx];
      const lessonIndex = module.lessons.findIndex(
        (l) => String(l.id) === String(currentLessonId)
      );
      if (lessonIndex !== -1) {
        found = module.lessons[lessonIndex];
        foundIndex = lessonIndex;
        foundModuleIndex = mIdx;
        break;
      }
    }

    if (foundIndex !== -1 && foundModuleIndex !== -1) {
      const currentModule = modules[foundModuleIndex];
      if (foundIndex > 0) prev = currentModule.lessons[foundIndex - 1];
      else if (foundModuleIndex > 0) {
        const prevModule = modules[foundModuleIndex - 1];
        if (prevModule.lessons.length > 0)
          prev = prevModule.lessons[prevModule.lessons.length - 1];
      }
      if (foundIndex < currentModule.lessons.length - 1)
        next = currentModule.lessons[foundIndex + 1];
      else if (foundModuleIndex < modules.length - 1) {
        const nextModule = modules[foundModuleIndex + 1];
        if (nextModule.lessons.length > 0 && !nextModule.lessons[0].locked)
          next = nextModule.lessons[0];
      }
    }

    return { currentLesson: found, prevLesson: prev, nextLesson: next };
  }, [currentLessonId, modules]);

  useEffect(() => {
    setCurrentLesson(foundLesson);
  }, [foundLesson]);

  const totalLessons = modules.reduce(
    (acc: number, m: Module) => acc + m.lessons.length,
    0
  );

  const completedLessons = modules.reduce(
    (acc: number, m: Module) =>
      acc + m.lessons.filter((l: Lesson) => l.completed).length,
    0
  );

  const overallProgress =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="flex h-screen w-screen fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900 overflow-hidden z-50" dir="rtl">
      {/* Main */}
      <div className="flex-1 flex flex-col backdrop-blur-xl bg-white/60 shadow-inner">
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/student/courses/${courseId}`)}
              className="p-2 hover:bg-blue-100 rounded-lg transition-all"
            >
              <ArrowRight className="w-4 h-4 text-blue-700" />
            </motion.button>
            {!sidebarOpen && (
              <SidebarToggleButton
                isOpen={sidebarOpen}
                onClick={() => setSidebarOpen(true)}
                variant="inline"
                className="!p-2"
              />
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-xs font-bold text-gray-800 truncate">
                {courseTitle}
              </h1>
              {currentLesson && (
                <p className="text-[10px] text-gray-500 truncate mt-0.5">
                  {currentLesson.title}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <span className="text-[10px] font-semibold text-blue-700">
              {Math.round(overallProgress)}%
            </span>
          </div>
        </div>

        <ProgressBar progress={overallProgress} />

        {/* Player */}
        {currentLesson ? (
          <div className="flex-1 flex flex-col min-h-0">
            {currentLesson.type === 'video' && currentLesson.videoUrl ? (
              <div className="p-4 bg-white/70 backdrop-blur-sm">
                <ResponsiveVideoPlayer
                  url={currentLesson.videoUrl}
                  title={currentLesson.title}
                  autoplay={false}
                  lessonId={currentLesson.id}
                  courseId={courseId}
                  onEnded={() => {
                    onComplete?.(currentLesson.id);
                    if (nextLesson && !nextLesson.locked)
                      setTimeout(() => onLessonChange(nextLesson.id), 2000);
                  }}
                />
              </div>
            ) : (
              <div className="p-6 bg-white/70 backdrop-blur-sm border-b border-white/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg flex items-center justify-center shadow-md">
                    {currentLesson.type === 'reading'
                      ? '📖'
                      : currentLesson.type === 'quiz'
                      ? '📝'
                      : '📋'}
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-gray-800">
                      {currentLesson.title}
                    </h2>
                    <div className="flex items-center gap-2 text-[10px] text-gray-600">
                      <Clock className="w-3 h-3" /> {currentLesson.duration}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6">
              {currentLesson.description && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-xl p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" /> نظرة
                      عامة
                    </h3>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {currentLesson.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <X className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-sm font-bold text-gray-800">الدرس غير موجود</h2>
              <button
                onClick={() => setSidebarOpen(true)}
                className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-colors"
              >
                عرض قائمة الدروس
              </button>
            </motion.div>
          </div>
        )}
      </div>

      {/* Sidebar - Right Side */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 320 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden backdrop-blur-xl bg-white/70 border-l border-white/40 shadow-lg"
        dir="rtl"
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
    </div>
  );
}
