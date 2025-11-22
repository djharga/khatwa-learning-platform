'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, Lock, Play, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  isPreview?: boolean;
  isLocked?: boolean;
}

interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  duration?: string;
}

interface CurriculumProps {
  modules: Module[];
  courseId: string;
  courseSlug?: string; // إضافة slug للكورس
  hasAccess?: boolean;
  onPreviewLesson?: (lessonId: string) => void;
}

export default function Curriculum({ modules, courseId, courseSlug, hasAccess = false, onPreviewLesson }: CurriculumProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const filteredModules = modules.map(module => ({
    ...module,
    lessons: module.lessons.filter(lesson =>
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(module => module.lessons.length > 0 || searchQuery === '');

  const getLessonIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'video':
        return '🎥';
      case 'reading':
        return '📖';
      case 'quiz':
        return '📝';
      case 'assignment':
        return '📋';
      default:
        return '📄';
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="bg-white dark:bg-neutral-800 rounded-[14px] shadow-elevation-2 p-6 lg:p-8 border border-neutral-200 dark:border-neutral-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">المنهج الدراسي</h2>
        <div className="relative w-64">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث في الدروس..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 min-h-[44px] border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredModules.map((module, moduleIndex) => {
          const isExpanded = expandedModules.has(module.id);
          const totalDuration = module.lessons.reduce((acc, lesson) => {
            const minutes = parseInt(lesson.duration) || 0;
            return acc + minutes;
          }, 0);

          return (
            <div
              key={module.id}
              className="border border-neutral-200 dark:border-neutral-600 rounded-[10px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <motion.button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-4 min-h-[44px] bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-4 flex-1 text-right">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg flex items-center justify-center font-bold transition-colors duration-200 ease-out">
                    {moduleIndex + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {module.title}
                    </h3>
                    {module.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {module.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <span>{module.lessons.length} دروس</span>
                      {totalDuration > 0 && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {totalDuration} دقيقة
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 transition-colors duration-200 ease-out" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 transition-colors duration-200 ease-out" />
                  )}
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-2 bg-white dark:bg-neutral-800">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const canAccess = hasAccess || lesson.isPreview;
                        const LessonComponent = canAccess ? Link : 'div';

                        return (
                          <motion.div
                            key={lesson.id}
                            whileHover={canAccess && !lesson.isLocked ? { x: 4, scale: 1.01 } : {}}
                            whileTap={canAccess && !lesson.isLocked ? { scale: 0.98 } : {}}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                          >
                            <LessonComponent
                              href={canAccess && !lesson.isLocked 
                                ? (courseSlug 
                                    ? `/courses/${courseSlug}/lesson/${lesson.id}` 
                                    : `/student/courses/${courseId}/lesson/${lesson.id}`)
                                : '#'}
                              className={`flex items-center justify-between p-3 min-h-[44px] rounded-lg transition-all duration-200 ease-out ${
                                lesson.isLocked || !canAccess
                                  ? 'bg-neutral-50 dark:bg-neutral-700/30 opacity-60 cursor-not-allowed'
                                  : 'bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
                              }`}
                              onClick={(e) => {
                                if (lesson.isPreview && !hasAccess) {
                                  e.preventDefault();
                                  onPreviewLesson?.(lesson.id);
                                }
                              }}
                            >
                            <div className="flex items-center gap-3 flex-1">
                              <span className="text-xl">{getLessonIcon(lesson.type)}</span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium text-gray-900 dark:text-white">
                                    {lesson.title}
                                  </h4>
                                  {lesson.isPreview && (
                                    <span className="px-2 py-0.5 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400 rounded-full text-xs font-medium transition-colors duration-200 ease-out">
                                      معاينة مجانية
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-xs text-gray-600 dark:text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {lesson.duration}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {lesson.isLocked && !hasAccess ? (
                                <Lock className="w-4 h-4 text-neutral-400" />
                              ) : lesson.isPreview ? (
                                <Play className="w-4 h-4 text-success-600 dark:text-success-400" />
                              ) : null}
                            </div>
                            </LessonComponent>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

