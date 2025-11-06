'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Play, Lock, BookOpen } from 'lucide-react';
import Link from 'next/link';

/**
 * Represents a single lesson in the course with completion status, lock state, and progress tracking
 */
interface Lesson {
  /** Unique identifier for the lesson */
  id: string;
  /** Lesson title in Arabic */
  title: string;
  /** Estimated duration in minutes */
  duration: string;
  /** Whether the lesson has been completed */
  completed: boolean;
  /** Whether the lesson is locked and requires prerequisites */
  locked: boolean;
  /** Completion progress percentage (0-100) */
  progress: number; // 0-100
}

/**
 * Props for the course sidebar component
 */
interface SidebarComponentProps {
  /** ID of the current course */
  courseId: string;
  /** ID of the currently active lesson (optional) */
  currentLessonId?: string;
}

/**
 * Returns the appropriate icon component based on lesson status. Shows lock icon for locked lessons, checkmark for completed, play for in-progress, and book for not started.
 * @param lesson - The lesson object to get icon for
 * @returns JSX.Element - The icon component with appropriate styling
 */
const getLessonIcon = (lesson: Lesson) => {
  if (lesson.locked) return <Lock className="w-5 h-5 text-neutral-400" />;
  if (lesson.completed)
    return <CheckCircle className="w-5 h-5 text-success-500" />;
  if (lesson.progress > 0)
    return <Play className="w-5 h-5 text-primary-500" />;
  return <BookOpen className="w-5 h-5 text-neutral-500" />;
};

/**
 * Determines the status category of a lesson based on its completion and lock state.
 * @param lesson - The lesson object to check status for
 * @returns 'locked' | 'completed' | 'in-progress' | 'not-started'
 */
const getLessonStatus = (lesson: Lesson) => {
  if (lesson.locked) return 'locked';
  if (lesson.completed) return 'completed';
  if (lesson.progress > 0) return 'in-progress';
  return 'not-started';
};

interface LessonCardProps {
  lesson: Lesson;
  courseId: string;
  currentLessonId?: string;
  index: number;
}

/**
 * Individual lesson card component with status indicator, progress bar, and navigation link. Displays lesson title, duration, completion status, and visual feedback for current lesson. Locked lessons are non-interactive.
 */
const LessonCard = ({
  lesson,
  courseId,
  currentLessonId,
  index,
}: LessonCardProps) => (
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: index * 0.02,
        duration: 0.15,
        ease: 'easeOut',
      }}
      className="group"
    >
    <Link
      href={
        lesson.locked ? '#' : `/courses/${courseId}/lesson/${lesson.id}`
      }
      className={`block p-4 rounded-2xl border-2 transition-all duration-300 group-hover:shadow-lg hover:shadow-blue-500/25 ${
        lesson.locked
          ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 cursor-not-allowed opacity-60'
          : lesson.id === currentLessonId
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
      }`}
      onClick={(e) => lesson.locked && e.preventDefault()}
    >
      <div className="flex items-start gap-4">
        {/* Lesson Icon & Status */}
        <motion.div
          className={`flex-shrink-0 mt-1 p-2 rounded-xl transition-all duration-300 ${
            lesson.locked
              ? 'bg-gray-100 dark:bg-gray-700'
              : lesson.completed
                ? 'bg-green-100 dark:bg-green-900/30'
                : lesson.progress > 0
                  ? 'bg-blue-100 dark:bg-blue-900/30'
                  : 'bg-gray-100 dark:bg-gray-700'
          }`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`transition-colors duration-300 ${
              lesson.locked
                ? 'text-gray-400'
                : lesson.completed
                  ? 'text-green-600 dark:text-green-400'
                  : lesson.progress > 0
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500'
            }`}
          >
            {getLessonIcon(lesson)}
          </div>
        </motion.div>

        {/* Lesson Content */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`text-sm font-semibold leading-tight transition-colors duration-300 ${
                lesson.locked
                  ? 'text-gray-500'
                  : 'text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300'
              }`}
            >
              {lesson.title}
            </h3>
            {lesson.locked && (
              <Lock className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            )}
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400 font-medium">
              {lesson.duration}
            </span>
            {!lesson.locked &&
              lesson.progress > 0 &&
              lesson.progress < 100 && (
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  {lesson.progress}%
                </span>
              )}
          </div>

          {/* Progress Bar for In-Progress Lessons */}
          {!lesson.locked &&
            lesson.progress > 0 &&
            lesson.progress < 100 && (
              <div className="space-y-1">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${lesson.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Active Lesson Indicator */}
      {lesson.id === currentLessonId && !lesson.locked && (
        <motion.div
          className="absolute inset-0 border-2 border-blue-500 rounded-2xl pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  </motion.div>
);

interface ProgressHeaderProps {
  lessonCount: number;
  overallProgress: number;
}

/**
 * Sidebar header displaying course progress overview with animated progress bar. Shows total lesson count and completion percentage.
 */
const ProgressHeader = ({
  lessonCount,
  overallProgress,
}: ProgressHeaderProps) => (
  <motion.div
    className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.6 }}
  >
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <motion.div
          className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <BookOpen className="w-6 h-6 text-white" />
        </motion.div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight drop-shadow-sm">
            محتوى الدورة
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {lessonCount} درس • {Math.round(overallProgress)}% مكتمل
          </p>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            التقدم العام
          </span>
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {overallProgress}%
          </span>
        </div>
        <div className="relative">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

interface FooterActionsProps {
  courseId: string;
}

/**
 * Sidebar footer with action buttons for final quiz and certificate. Provides quick access to course completion features.
 */
const FooterActions = ({ courseId }: FooterActionsProps) => (
  <motion.div
    className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.6 }}
    viewport={{ once: true }}
  >
    <div className="space-y-3">
      <motion.div className="text-center" whileHover={{ scale: 1.02 }}>
        <Link
          href={`/courses/${courseId}/quiz`}
          className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 focus:ring-4 focus:ring-blue-500/50"
        >
          <Play className="w-5 h-5" />
          اختبار الدورة النهائي
        </Link>
      </motion.div>

      <motion.div className="text-center" whileHover={{ scale: 1.02 }}>
        <Link
          href={`/courses/${courseId}/certificate`}
          className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 hover:scale-105 focus:ring-4 focus:ring-green-500/50"
        >
          <CheckCircle className="w-5 h-5" />
          الحصول على الشهادة
        </Link>
      </motion.div>
    </div>
  </motion.div>
);

/**
 * Course sidebar component displaying lesson list with progress tracking. Features animated lesson cards, overall progress indicator, and quick access to quiz and certificate. Includes sticky positioning and smooth animations for lesson navigation.
 */
const SidebarComponent = ({
  courseId,
  currentLessonId,
}: SidebarComponentProps) => {
  // Mock lesson data for demonstration - replace with actual course data from API
  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'مقدمة في المراجعة الداخلية',
      duration: '15 دقيقة',
      completed: true,
      locked: false,
      progress: 100,
    },
    {
      id: '2',
      title: 'أنواع المخاطر في الشركات',
      duration: '20 دقيقة',
      completed: true,
      locked: false,
      progress: 100,
    },
    {
      id: '3',
      title: 'تحليل العمليات المالية',
      duration: '25 دقيقة',
      completed: false,
      locked: false,
      progress: 75,
    },
    {
      id: '4',
      title: 'إعداد تقارير المراجعة',
      duration: '30 دقيقة',
      completed: false,
      locked: false,
      progress: 0,
    },
    {
      id: '5',
      title: 'دراسة حالة عملية',
      duration: '35 دقيقة',
      completed: false,
      locked: true,
      progress: 0,
    },
    {
      id: '6',
      title: 'الخاتمة والاختبار النهائي',
      duration: '40 دقيقة',
      completed: false,
      locked: true,
      progress: 0,
    },
  ];

  const overallProgress = Math.round(
    lessons.reduce((acc, lesson) => acc + lesson.progress, 0) / lessons.length
  );

  return (
    <motion.aside
      className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 h-screen sticky top-0 overflow-hidden flex flex-col shadow-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <ProgressHeader lessonCount={lessons.length} overallProgress={overallProgress} />

      {/* Lessons List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Render lesson cards with staggered animation delays */}
        {lessons.map((lesson, index) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            courseId={courseId}
            currentLessonId={currentLessonId}
            index={index}
          />
        ))}
      </div>

      <FooterActions courseId={courseId} />
    </motion.aside>
  );
};

export default SidebarComponent;
