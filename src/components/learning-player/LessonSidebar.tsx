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
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-900/95 via-gray-900/95 to-slate-950/95">
      {/* Header */}
      <div className="p-5 border-b border-indigo-500/20 bg-gradient-to-r from-slate-900/98 to-slate-950/98 backdrop-blur-xl flex items-center justify-between shadow-lg">
        <h2 className="font-bold text-xl bg-gradient-to-r from-white via-indigo-100 to-violet-100 bg-clip-text text-transparent">قائمة الدروس</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gradient-to-br hover:from-red-600/25 hover:to-rose-600/25 rounded-xl transition-all duration-300 border border-slate-700/50 hover:border-red-500/60 hover:scale-110"
            aria-label="إغلاق القائمة"
          >
            <X className="w-5 h-5 text-slate-400 hover:text-red-400" />
          </button>
        )}
      </div>

      {/* Progress */}
      <div className="p-5 border-b border-indigo-500/20 bg-gradient-to-br from-slate-900/90 to-slate-950/90">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-200">التقدم الإجمالي</span>
          <span className="text-sm font-bold text-indigo-400 bg-indigo-500/15 px-2.5 py-1 rounded-lg border border-indigo-500/30 backdrop-blur-sm">{Math.round(overallProgress)}%</span>
        </div>
        <div className="w-full h-3 bg-slate-800/90 rounded-full overflow-hidden shadow-inner border border-indigo-500/20">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-500 ease-out shadow-lg relative overflow-hidden"
            style={{ width: `${overallProgress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-5 border-b border-indigo-500/20">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 z-10" />
          <input
            type="text"
            placeholder="ابحث في الدروس..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-3 bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-indigo-500/30 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/60 focus:outline-none transition-all duration-300 shadow-lg focus:shadow-indigo-500/25 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Modules */}
      <div className="flex-1 overflow-y-auto">
        {filteredModules.map((module, moduleIndex) => {
          const isExpanded = expandedModules.has(module.id);
          const moduleProgress = getModuleProgress(module);

          return (
            <div key={module.id} className="border-b border-gray-700">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleModule(module.id);
                }}
                className="w-full flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-indigo-600/15 hover:to-violet-600/15 transition-all duration-300 border-b border-indigo-500/20 group"
              >
                <div className="flex items-center gap-4 flex-1 text-right">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-lg shadow-violet-500/30 group-hover:scale-110 transition-transform duration-300">
                    {moduleIndex + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">{module.title}</h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">{module.lessons.filter(l => l.completed).length}/{module.lessons.length}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-indigo-400 font-medium bg-indigo-500/15 px-2 py-0.5 rounded border border-indigo-500/30">{Math.round(moduleProgress)}%</span>
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
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
                    <div className="bg-gray-900/50">
                      {module.lessons.map((lesson) => {
                        const isActive = lesson.id === currentLessonId;

                        return (
                          <button
                            key={lesson.id}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (!lesson.locked) {
                                onLessonClick(lesson.id);
                              }
                            }}
                            disabled={lesson.locked}
                            className={`w-full flex items-center gap-3 p-4 text-right transition-all duration-300 rounded-lg mx-2 my-1 ${
                              isActive
                                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/40 border border-indigo-400/60 scale-[1.02]'
                                : lesson.locked
                                  ? 'bg-slate-800/40 text-slate-500 cursor-not-allowed opacity-60 border border-slate-700/40'
                                  : 'hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-900/60 text-slate-300 hover:text-white hover:scale-[1.01] border border-transparent hover:border-indigo-500/40'
                            }`}
                          >
                            <span className="text-lg">{getLessonIcon(lesson.type)}</span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-sm">{lesson.title}</h4>
                                {lesson.completed && (
                                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                                )}
                                {lesson.locked && (
                                  <Lock className="w-4 h-4 flex-shrink-0" />
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Clock className="w-3 h-3" />
                                <span>{lesson.duration}</span>
                                {lesson.progress !== undefined && lesson.progress > 0 && (
                                  <>
                                    <span>•</span>
                                    <span>{lesson.progress}%</span>
                                  </>
                                )}
                              </div>
                            </div>
                            {isActive && (
                              <Play className="w-4 h-4 flex-shrink-0" />
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

