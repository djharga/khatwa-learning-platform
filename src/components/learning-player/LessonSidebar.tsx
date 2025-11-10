'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronDown, ChevronUp, CheckCircle2,
  Lock, Clock, Play, Search
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  completed?: boolean;
  locked?: boolean;
  progress?: number;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface LessonSidebarProps {
  modules: Module[];
  currentLessonId: string;
  overallProgress: number;
  onLessonClick: (lessonId: string) => void;
  onClose?: () => void;
}

export default function LessonSidebar({
  modules,
  currentLessonId,
  overallProgress,
  onLessonClick,
  onClose,
}: LessonSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(modules.map(m => m.id)));
  const [searchQuery, setSearchQuery] = useState('');

  const toggleModule = (id: string) => {
    setExpandedModules(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const filteredModules = modules
    .map(m => ({
      ...m,
      lessons: m.lessons.filter(l => l.title.toLowerCase().includes(searchQuery.toLowerCase())),
    }))
    .filter(m => m.lessons.length > 0 || searchQuery === '');

  const getModuleProgress = (m: Module) => {
    const done = m.lessons.filter(l => l.completed).length;
    return m.lessons.length ? (done / m.lessons.length) * 100 : 0;
  };

  const getLessonIcon = (type: Lesson['type']) =>
    ({ video: '🎥', reading: '📖', quiz: '📝', assignment: '📋' }[type] || '📄');

  return (
    <div className="h-full flex flex-col bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-lg overflow-hidden transition-all">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
        <h2 className="text-sm font-bold text-neutral-900 dark:text-white">قائمة الدروس</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition"
            aria-label="إغلاق القائمة"
          >
            <X className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
          </button>
        )}
      </div>

      {/* Progress */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-primary-950/20 dark:to-primary-900/10">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-neutral-700 dark:text-neutral-300 font-medium">التقدم الإجمالي</span>
          <span className="text-primary-700 dark:text-primary-400 font-bold">
            {Math.round(overallProgress)}%
          </span>
        </div>
        <div className="h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-600 to-accent-600"
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-neutral-200 dark:border-neutral-700">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="ابحث في الدروس..."
            className="w-full pl-8 pr-10 py-2 bg-white/80 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      {/* Modules */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent">
        {filteredModules.map((module, index) => {
          const open = expandedModules.has(module.id);
          const progress = getModuleProgress(module);

          return (
            <div key={module.id} className="border-b border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition"
              >
                <div className="flex items-center gap-3 text-right flex-1">
                  <div className="w-6 h-6 bg-primary-600 text-white text-[10px] font-bold rounded-md flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-semibold text-neutral-900 dark:text-white mb-0.5">
                      {module.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 dark:text-neutral-400">
                      <span>{module.lessons.filter(l => l.completed).length}/{module.lessons.length}</span>
                      <span>•</span>
                      <span className="text-primary-600 dark:text-primary-400 font-semibold">
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </div>
                </div>
                {open ? (
                  <ChevronUp className="w-4 h-4 text-neutral-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                )}
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-neutral-50/70 dark:bg-neutral-800/40"
                  >
                    {module.lessons.map((lesson) => {
                      const active = lesson.id === currentLessonId;

                      return (
                        <motion.button
                          key={lesson.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!lesson.locked) onLessonClick(lesson.id);
                          }}
                          disabled={lesson.locked}
                          whileHover={!lesson.locked ? { scale: 1.01 } : {}}
                          className={`w-full flex items-center gap-2 p-2 mx-2 my-1 rounded-lg text-xs transition-all ${
                            active
                              ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md'
                              : lesson.locked
                                ? 'bg-neutral-100 dark:bg-neutral-700/50 text-neutral-400 cursor-not-allowed'
                                : 'hover:bg-white dark:hover:bg-neutral-700/40 text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          <span>{getLessonIcon(lesson.type)}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <h4 className="font-medium">{lesson.title}</h4>
                              {lesson.completed && (
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                              )}
                              {lesson.locked && <Lock className="w-3 h-3" />}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-neutral-500 dark:text-neutral-400">
                              <Clock className="w-2.5 h-2.5" />
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                          {active && <Play className="w-3 h-3" />}
                        </motion.button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
