'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp, CheckCircle2, Lock, Clock, Play, Search } from 'lucide-react';

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

  const getModuleProgress = (module: Module) => {
    const completed = module.lessons.filter(l => l.completed).length;
    return module.lessons.length > 0 ? (completed / module.lessons.length) * 100 : 0;
  };

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
    <div className="h-full flex flex-col bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
        <h2 className="font-bold text-xs text-gray-900 dark:text-white">قائمة الدروس</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="إغلاق القائمة"
          >
            <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        )}
      </div>

      {/* Progress */}
      <div className="p-3 border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">التقدم الإجمالي</span>
          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-lg">
            {Math.round(overallProgress)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200 dark:border-slate-800">
        <div className="relative">
          <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث في الدروس..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-1.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* Modules */}
      <div className="flex-1 overflow-y-auto">
        {filteredModules.map((module, moduleIndex) => {
          const isExpanded = expandedModules.has(module.id);
          const moduleProgress = getModuleProgress(module);

          return (
            <div key={module.id} className="border-b border-gray-200 dark:border-slate-800">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors group"
              >
                <div className="flex items-center gap-2 flex-1 text-right">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-[10px]">
                    {moduleIndex + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xs text-gray-900 dark:text-white mb-0.5">{module.title}</h3>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="text-gray-600 dark:text-gray-400">
                        {module.lessons.filter(l => l.completed).length}/{module.lessons.length}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        {Math.round(moduleProgress)}%
                      </span>
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-gray-50 dark:bg-slate-800/30">
                      {module.lessons.map((lesson) => {
                        const isActive = lesson.id === currentLessonId;

                        return (
                          <button
                            key={lesson.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!lesson.locked) {
                                onLessonClick(lesson.id);
                              }
                            }}
                            disabled={lesson.locked}
                            className={`w-full flex items-center gap-2 p-2 mx-1.5 my-0.5 rounded-lg transition-all text-right ${
                              isActive
                                ? 'bg-blue-600 text-white shadow-md'
                                : lesson.locked
                                  ? 'bg-gray-100 dark:bg-slate-700/50 text-gray-400 cursor-not-allowed'
                                  : 'hover:bg-white dark:hover:bg-slate-700/50 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <span className="text-sm">{getLessonIcon(lesson.type)}</span>
                            <div className="flex-1">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <h4 className="font-medium text-xs">{lesson.title}</h4>
                                {lesson.completed && (
                                  <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                                )}
                                {lesson.locked && (
                                  <Lock className="w-3 h-3 flex-shrink-0" />
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400">
                                <Clock className="w-2.5 h-2.5" />
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                            {isActive && (
                              <Play className="w-3 h-3 flex-shrink-0" />
                            )}
                          </button>
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
    </div>
  );
}
