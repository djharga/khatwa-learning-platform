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
  Folder,
} from 'lucide-react';
import LessonSidebar from './LessonSidebar';
import LevelsSidebar from './LevelsSidebar';
import CourseMaterialsSidebar from './CourseMaterialsSidebar';
import ModuleMaterialsPanel from './ModuleMaterialsPanel';
import LevelMaterialsPanel from './LevelMaterialsPanel';
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
  level?: number; // المستوى الذي ينتمي إليه المحور
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
  currentLessonId: initialLessonId,
  onLessonChange,
  onComplete,
}: PlayerShellProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [materialsSidebarOpen, setMaterialsSidebarOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [currentLessonId, setCurrentLessonId] = useState(initialLessonId);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  // تحديث الدرس الحالي عند تغيير initialLessonId
  useEffect(() => {
    setCurrentLessonId(initialLessonId);
  }, [initialLessonId]);

  // التحقق من وجود مستويات
  const hasLevels = useMemo(() => {
    return modules.some(module => module.level !== undefined);
  }, [modules]);

  // دالة داخلية لتغيير الدرس بدون refresh
  const handleInternalLessonChange = (newLessonId: string) => {
    setCurrentLessonId(newLessonId);
    // تحديث URL بدون refresh باستخدام shallow routing
    window.history.replaceState(null, '', `/student/courses/${courseId}/lesson/${newLessonId}`);
  };

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
    if (foundLesson) {
      setCurrentLesson(foundLesson);
    }
  }, [foundLesson]);

  // فتح السايدبار الأيسر تلقائياً عند تحميل الدرس في صفحات المستويات
  useEffect(() => {
    if (hasLevels && currentLessonId && modules.length > 0) {
      // البحث عن المستوى الحالي بناءً على الدرس الحالي
      for (const module of modules) {
        const hasCurrentLesson = module.lessons.some(lesson => lesson.id === currentLessonId);
        if (hasCurrentLesson && module.level) {
          setSelectedLevelId(module.level);
          setMaterialsSidebarOpen(true);
          break;
        }
      }
    }
  }, [currentLessonId, modules, hasLevels]);

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/20 text-gray-900 overflow-hidden" dir="rtl">
      {/* Materials Sidebar - Left Side (Level Materials Panel) - Enhanced: better spacing, contrast */}
      <motion.div
        initial={false}
        animate={{ width: materialsSidebarOpen && selectedLevelId !== null ? 320 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden bg-white border-r border-gray-200/80 shadow-lg"
        style={{
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.05)'
        }}
        dir="rtl"
      >
        {materialsSidebarOpen && selectedLevelId !== null && (
          <LevelMaterialsPanel
            levelId={selectedLevelId}
            levelTitle={
              selectedLevelId === 1 ? 'كورسات المراجعة الداخلية - المستوى الأول' :
              selectedLevelId === 2 ? 'كورسات المراجعة الداخلية - المستوى الثاني' :
              'كورسات المراجعة الداخلية - المستوى الثالث'
            }
            modules={modules.filter(m => m.level === selectedLevelId)}
            currentLessonId={currentLessonId}
            onClose={undefined}
          />
        )}
      </motion.div>

      {/* Main - Enhanced: better spacing, contrast, white space */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header - Enhanced: increased height, better contrast */}
        <div className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200/80 shadow-sm">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <motion.button
              whileHover={{ scale: 1.08, x: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/student/courses/${courseId}`)}
              className="p-2.5 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all group shadow-sm hover:shadow"
              aria-label="العودة للكورس"
            >
              <ArrowRight className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
            </motion.button>
            {!sidebarOpen && (
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(true)}
                className="p-2.5 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all group shadow-sm hover:shadow"
                aria-label="فتح قائمة المحاور"
              >
                <BookOpen className="w-5 h-5 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
              </motion.button>
            )}
            <div className="flex-1 min-w-0 mr-3">
              <h1 className="text-base font-bold text-gray-900 truncate" style={{ lineHeight: '1.4' }}>
                {courseTitle}
              </h1>
              {currentLesson && (
                <p className="text-sm text-gray-600 truncate mt-1" style={{ lineHeight: '1.3' }}>
                  {currentLesson.title}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Player - Enhanced: better spacing, cleaner background, navigation buttons */}
        {currentLesson ? (
          <div className="flex-1 flex flex-col min-h-0">
            {currentLesson.type === 'video' && currentLesson.videoUrl ? (
              <div className="p-6 bg-white border-b border-gray-200/60">
                <ResponsiveVideoPlayer
                  url={currentLesson.videoUrl}
                  title={currentLesson.title}
                  autoplay={false}
                  lessonId={currentLesson.id}
                  courseId={courseId}
                  onEnded={() => {
                    onComplete?.(currentLesson.id);
                    if (nextLesson && !nextLesson.locked)
                      setTimeout(() => handleInternalLessonChange(nextLesson.id), 1500);
                  }}
                />
              </div>
            ) : (
              <div className="p-8 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-white border-b border-gray-200/60">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                    {currentLesson.type === 'reading'
                      ? '📖'
                      : currentLesson.type === 'quiz'
                      ? '📝'
                      : '📋'}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-900 mb-2" style={{ lineHeight: '1.4' }}>
                      {currentLesson.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" /> {currentLesson.duration}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="px-6 py-4 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between gap-4">
              <motion.button
                whileHover={{ scale: 1.02, x: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => prevLesson && !prevLesson.locked && handleInternalLessonChange(prevLesson.id)}
                disabled={!prevLesson || prevLesson.locked}
                className={`flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-xl font-semibold text-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  prevLesson && !prevLesson.locked
                    ? 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300'
                    : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
                السابق
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => nextLesson && !nextLesson.locked && handleInternalLessonChange(nextLesson.id)}
                disabled={!nextLesson || nextLesson.locked}
                className={`flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-xl font-semibold text-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  nextLesson && !nextLesson.locked
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-elevation-2 hover:shadow-elevation-4'
                    : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
                }`}
              >
                التالي
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {currentLesson.description && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-elevation-2 max-w-4xl mx-auto">
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" strokeWidth={2.5} /> نظرة عامة
                    </h3>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed" style={{ lineHeight: '1.7' }}>
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

      {/* Sidebar - Right Side - Enhanced: better spacing, contrast */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 340 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden bg-white border-l border-gray-200/80 shadow-lg"
        style={{
          boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.05)'
        }}
        dir="rtl"
      >
        {sidebarOpen && (
          hasLevels ? (
            <LevelsSidebar
              modules={modules}
              currentLessonId={currentLessonId}
              onLessonClick={handleInternalLessonChange}
              onModuleSelect={(moduleId) => {
                setSelectedModuleId(moduleId);
                setMaterialsSidebarOpen(true);
              }}
              onLevelSelect={(levelId) => {
                // فتح السايدبار فقط إذا كان مغلقاً أو إذا تم تغيير المستوى
                if (!materialsSidebarOpen || selectedLevelId !== levelId) {
                  setSelectedLevelId(levelId);
                  setMaterialsSidebarOpen(true);
                }
              }}
              onClose={undefined}
            />
          ) : (
            <LessonSidebar
              modules={modules}
              currentLessonId={currentLessonId}
              onLessonClick={handleInternalLessonChange}
              onClose={() => setSidebarOpen(false)}
            />
          )
        )}
      </motion.div>
    </div>
  );
}
