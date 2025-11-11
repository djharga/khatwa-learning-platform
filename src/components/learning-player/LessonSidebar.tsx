'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronDown, ChevronUp, CheckCircle2,
  Lock, Clock, Play, Search, FileText, FileSpreadsheet, 
  File, BookOpen
} from 'lucide-react';
import { WordIcon, PDFIcon, VideoIcon, AudioIcon } from '@/components/ui/icons/FileTypeIcons';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment' | 'word' | 'excel' | 'pdf' | 'audio' | 'podcast';
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

  const getLessonIcon = (type: Lesson['type']) => {
    const iconClass = "w-4 h-4 flex-shrink-0";
    switch (type) {
      case 'video':
        return <VideoIcon className={iconClass} size={16} />;
      case 'audio':
      case 'podcast':
        return <AudioIcon className={iconClass} size={16} />;
      case 'pdf':
        return <PDFIcon className={iconClass} size={16} />;
      case 'word':
        return <WordIcon className={iconClass} size={16} />;
      case 'excel':
        return <FileSpreadsheet className={`${iconClass} text-green-600`} />;
      case 'reading':
        return <FileText className={`${iconClass} text-indigo-600`} />;
      case 'quiz':
        return <FileText className={`${iconClass} text-orange-600`} />;
      case 'assignment':
        return <File className={`${iconClass} text-gray-600`} />;
      default:
        return <FileText className={`${iconClass} text-gray-500`} />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950/50 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-700/50 shadow-2xl overflow-hidden transition-all" dir="rtl">
      {/* Header */}
      <div className="p-5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-gray-800/50 dark:to-gray-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white">قائمة الدروس</h2>
        </div>
        {onClose && (
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="إغلاق القائمة"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </motion.button>
        )}
      </div>

      {/* Progress */}
      <div className="p-5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/40 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-purple-950/20">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">التقدم الإجمالي</span>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            {Math.round(overallProgress)}%
          </span>
        </div>
        <div className="relative h-3 bg-gray-200/70 dark:bg-gray-700/70 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
          <span>{modules.reduce((acc, m) => acc + m.lessons.filter(l => l.completed).length, 0)} درس مكتمل من {modules.reduce((acc, m) => acc + m.lessons.length, 0)}</span>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/30">
        <div className="relative group">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="ابحث في الدروس..."
            className="w-full pl-9 pr-10 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 outline-none transition-all shadow-sm hover:shadow-md"
          />
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-3.5 h-3.5 text-gray-400" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Modules */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600">
        {filteredModules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">لا توجد نتائج للبحث</p>
          </div>
        ) : (
          filteredModules.map((module, index) => {
            const open = expandedModules.has(module.id);
            const progress = getModuleProgress(module);
            const completedCount = module.lessons.filter(l => l.completed).length;
            const totalCount = module.lessons.length;

            return (
              <div key={module.id} className="border-b border-gray-200/50 dark:border-gray-800/50 last:border-b-0">
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-all"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <motion.div
                      animate={{ rotate: open ? 0 : 180 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    </motion.div>
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-bold rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      {index + 1}
                    </div>
                    <div className="flex-1 text-right min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 truncate">
                        {module.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs justify-end">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-md">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          <span className="text-gray-600 dark:text-gray-400 font-medium">
                            {completedCount}/{totalCount}
                          </span>
                        </div>
                        <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <span className="text-blue-600 dark:text-blue-400 font-bold min-w-[35px] text-left">
                          {Math.round(progress)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="bg-gray-50/50 dark:bg-gray-900/30 overflow-hidden"
                    >
                      <div className="px-2 py-2 space-y-1">
                        {module.lessons.map((lesson, lessonIndex) => {
                          const active = lesson.id === currentLessonId;

                          return (
                            <motion.button
                              key={lesson.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: lessonIndex * 0.05 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!lesson.locked) onLessonClick(lesson.id);
                              }}
                              disabled={lesson.locked}
                              whileHover={!lesson.locked ? { x: -2, scale: 1.02 } : {}}
                              whileTap={!lesson.locked ? { scale: 0.98 } : {}}
                              className={`w-full flex items-center gap-3 p-3 mx-1 rounded-xl text-sm transition-all relative overflow-hidden ${
                                active
                                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                                  : lesson.locked
                                    ? 'bg-gray-100/50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60'
                                    : 'bg-white dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800/70 hover:shadow-md border border-transparent hover:border-blue-200 dark:hover:border-gray-700'
                              }`}
                            >
                              {active && (
                                <motion.div
                                  layoutId="activeLesson"
                                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl"
                                  initial={false}
                                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                              )}
                              <div className={`flex-shrink-0 relative z-10 ${active ? 'text-white' : ''}`}>
                                {getLessonIcon(lesson.type)}
                              </div>
                              <div className="flex-1 text-right min-w-0 relative z-10">
                                <div className="flex items-center gap-2 mb-1 justify-end">
                                  <h4 className={`font-semibold truncate ${active ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                    {lesson.title}
                                  </h4>
                                  {lesson.completed && (
                                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${active ? 'text-white' : 'text-green-500'}`} />
                                  )}
                                  {lesson.locked && (
                                    <Lock className={`w-4 h-4 flex-shrink-0 ${active ? 'text-white/70' : 'text-gray-400'}`} />
                                  )}
                                </div>
                                <div className={`flex items-center gap-1.5 text-xs justify-end ${active ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                                  <Clock className="w-3 h-3" />
                                  <span>{lesson.duration}</span>
                                  {lesson.progress && lesson.progress > 0 && lesson.progress < 100 && (
                                    <>
                                      <span>•</span>
                                      <span>{Math.round(lesson.progress)}%</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              {active && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="relative z-10"
                                >
                                  <Play className="w-4 h-4 text-white" fill="white" />
                                </motion.div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
