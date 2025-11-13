'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronDown,
  BookOpen,
  CheckCircle2,
  Lock,
  Clock,
  Play,
  Search,
  FileText,
  FileSpreadsheet,
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
  level?: number; // المستوى الذي ينتمي إليه المحور
}

interface Level {
  id: number;
  title: string;
  description?: string;
  color: string;
  modules: Module[];
}

interface LevelsSidebarProps {
  modules: Module[];
  currentLessonId: string;
  onLessonClick: (lessonId: string) => void;
  onModuleSelect?: (moduleId: string) => void; // New prop for module selection
  onLevelSelect?: (levelId: number) => void; // New prop for level selection
  onClose?: () => void;
}

export default function LevelsSidebar({
  modules,
  currentLessonId,
  onLessonClick,
  onModuleSelect,
  onLevelSelect,
  onClose,
}: LevelsSidebarProps) {
  const [expandedLevels, setExpandedLevels] = useState<Set<number>>(new Set([1]));
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const initializedLevels = useRef<Set<number>>(new Set());

  // تجميع المحاور حسب المستويات
  const levels = useMemo(() => {
    const levelsMap = new Map<number, Level>();
    
    modules.forEach((module) => {
      const levelId = module.level || 1; // افتراضي المستوى 1
      
      if (!levelsMap.has(levelId)) {
        const levelTitles: { [key: number]: string } = {
          1: 'كورسات المراجعة الداخلية - المستوى الأول',
          2: 'كورسات المراجعة الداخلية - المستوى الثاني',
          3: 'كورسات المراجعة الداخلية - المستوى الثالث',
        };
        
        levelsMap.set(levelId, {
          id: levelId,
          title: levelTitles[levelId] || `كورسات المراجعة - المستوى ${levelId}`,
          color: levelId === 1 ? 'from-blue-500 to-blue-600' : 
                 levelId === 2 ? 'from-purple-500 to-purple-600' : 
                 'from-green-500 to-green-600',
          modules: [],
        });
      }
      
      levelsMap.get(levelId)!.modules.push(module);
    });
    
    return Array.from(levelsMap.values()).sort((a, b) => a.id - b.id);
  }, [modules]);

  const toggleLevel = (id: number) => {
    setExpandedLevels(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const toggleModule = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setExpandedModules(prev => {
      const s = new Set(prev);
      if (s.has(id)) {
        s.delete(id);
      } else {
        s.add(id);
      }
      return s;
    });
  };

  const filteredLevels = useMemo(() => {
    if (!searchQuery) return levels;
    
    const query = searchQuery.toLowerCase();
    return levels.map(level => ({
      ...level,
      modules: level.modules.filter(m => 
        m.title.toLowerCase().includes(query) ||
        m.lessons.some(l => l.title.toLowerCase().includes(query))
      ),
    })).filter(level => level.modules.length > 0);
  }, [levels, searchQuery]);

  // فتح المحاور تلقائياً عند فتح المستوى لأول مرة
  useEffect(() => {
    setExpandedModules(prev => {
      const modulesToExpand = new Set(prev);
      
      filteredLevels.forEach(level => {
        if (expandedLevels.has(level.id)) {
          // إذا فُتح المستوى لأول مرة، افتح جميع محاوره
          if (!initializedLevels.current.has(level.id)) {
            level.modules.forEach(module => {
              modulesToExpand.add(module.id);
            });
            initializedLevels.current.add(level.id);
          }
        }
      });
      
      return modulesToExpand;
    });
  }, [expandedLevels, filteredLevels]);

  const getLevelProgress = (level: Level) => {
    const totalLessons = level.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedLessons = level.modules.reduce(
      (acc, m) => acc + m.lessons.filter(l => l.completed).length,
      0
    );
    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  };

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
      default:
        return <FileText className={`${iconClass} text-gray-500`} />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden" dir="rtl">
      {/* Header - Enhanced: larger padding, better contrast */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 bg-gradient-to-r from-primary-600 to-primary-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/25 rounded-xl flex items-center justify-center shadow-md transition-all duration-200 ease-out">
            <BookOpen className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-base font-extrabold text-white">كورسات المراجعة</h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 min-h-[44px] min-w-[44px] hover:bg-white/20 rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            aria-label="إغلاق القائمة"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      {/* Search - Enhanced: larger padding, better contrast */}
      <div className="p-3 border-b border-gray-200/80">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="ابحث..."
            className="w-full pr-10 pl-10 py-2.5 min-h-[44px] text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="w-3 h-3 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Levels - Enhanced: larger padding, better spacing, soft elevation */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {filteredLevels.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">لا توجد نتائج للبحث</p>
          </div>
        ) : (
          filteredLevels.map((level) => {
            const isExpanded = expandedLevels.has(level.id);
            const levelProgress = getLevelProgress(level);
            const completedCount = level.modules.reduce((acc, m) => acc + m.lessons.filter(l => l.completed).length, 0);
            const totalCount = level.modules.reduce((acc, m) => acc + m.lessons.length, 0);

            return (
              <motion.div 
                key={level.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: level.id * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-elevation-2 hover:shadow-elevation-3 transition-shadow duration-200 ease-out"
              >
                {/* Level Header - Enhanced: larger padding, better contrast */}
                <button
                  onClick={() => toggleLevel(level.id)}
                  className={`w-full flex items-center justify-between p-3.5 min-h-[44px] bg-gradient-to-r ${level.color} hover:opacity-95 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-9 h-9 bg-white/30 text-white text-base font-extrabold rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                      {level.id}
                    </div>
                    <div className="flex-1 text-right min-w-0">
                      <h3 className="text-sm font-extrabold text-white truncate" style={{ lineHeight: '1.3' }}>
                        {level.title}
                      </h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-white flex-shrink-0 transition-transform duration-200 ease-out ${isExpanded ? 'rotate-180' : ''}`} strokeWidth={2.5} />
                  </div>
                </button>

                {/* Modules - Enhanced: larger padding, better hover, active state */}
                {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="bg-white dark:bg-neutral-800"
                    >
                      {level.modules.map((module, moduleIndex) => {
                        const moduleExpanded = expandedModules.has(module.id);
                        const progress = getModuleProgress(module);
                        const completedCount = module.lessons.filter(l => l.completed).length;
                        const totalCount = module.lessons.length;
                        const isCurrentModule = module.lessons.some(l => l.id === currentLessonId);

                        return (
                          <motion.div 
                            key={module.id} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: moduleIndex * 0.05 }}
                            className={`border-b border-gray-200/50 last:border-b-0 ${
                              isCurrentModule ? 'bg-indigo-50/50' : ''
                            }`}
                          >
                          <motion.button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // عند الضغط على المحور، افتح المواد في السايدبار الأيسر
                              if (onModuleSelect) {
                                onModuleSelect(module.id);
                              }
                              // أيضاً افتح/أغلق المحور لعرض الدروس
                              toggleModule(module.id, e);
                            }}
                            className={`w-full flex items-center justify-between p-3.5 hover:bg-gray-50/80 transition-all cursor-pointer group ${
                              isCurrentModule ? 'bg-indigo-50/30' : ''
                            }`}
                            whileHover={{ x: 1 }}
                            whileTap={{ scale: 0.98 }}
                          >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <motion.div
                                  animate={{ rotate: moduleExpanded ? 0 : 180 }}
                                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                  <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" strokeWidth={2} />
                                </motion.div>
                                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-extrabold rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                                  {moduleIndex + 1}
                                </div>
                                <div className="flex-1 text-right min-w-0">
                                  <h4 className={`text-sm font-extrabold mb-2 truncate ${
                                    isCurrentModule 
                                      ? 'text-indigo-700 dark:text-indigo-300' 
                                      : 'text-gray-900 dark:text-white'
                                  }`} style={{ lineHeight: '1.3' }}>
                                    {module.title}
                                  </h4>
                                  <div className="flex items-center gap-2.5 text-xs justify-end">
                                    <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                      <CheckCircle2 className="w-3 h-3 text-green-500" strokeWidth={2.5} />
                                      <span className="text-gray-700 dark:text-gray-300 font-bold">
                                        {completedCount}/{totalCount}
                                      </span>
                                    </div>
                                    <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                      <motion.div
                                        className={`h-full bg-gradient-to-r ${level.color}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.5, ease: 'easeOut' }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* أيقونة المواد - Enhanced: larger icon */}
                              {onModuleSelect && (
                                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mr-2 group-hover:scale-110 transition-transform" strokeWidth={2} />
                              )}
                            </motion.button>

                            {/* Lessons - Enhanced: larger icons, better spacing, fade in animation */}
                            <AnimatePresence>
                              {moduleExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="bg-gray-50/50 dark:bg-gray-800/20 overflow-hidden"
                                >
                                  <div className="px-3 py-3 space-y-2">
                                    {module.lessons.map((lesson, lessonIndex) => {
                                      const active = lesson.id === currentLessonId;

                                      return (
                                      <motion.button
                                        key={lesson.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: lessonIndex * 0.05, duration: 0.3 }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (!lesson.locked) {
                                            onLessonClick(lesson.id);
                                            // عند الضغط على الدرس، اعرض ملفات المستوى كاملاً
                                            if (onLevelSelect) {
                                              onLevelSelect(level.id);
                                            }
                                          }
                                        }}
                                        disabled={lesson.locked}
                                        className={`w-full flex items-center gap-2.5 p-2.5 pl-3 rounded-xl text-xs transition-all relative ${
                                          active
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                                            : lesson.locked
                                              ? 'text-gray-400 cursor-not-allowed opacity-50 bg-gray-50'
                                              : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                                        }`}
                                        whileHover={!lesson.locked && !active ? { x: 1, scale: 1.01 } : {}}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                          {active && (
                                            <motion.div
                                              layoutId="activeLesson"
                                              className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl"
                                              initial={false}
                                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                          )}
                                          <div className={`flex-shrink-0 relative z-10 ${active ? 'text-white' : ''}`}>
                                            {getLessonIcon(lesson.type)}
                                          </div>
                                          <div className="flex-1 text-right min-w-0 relative z-10">
                                            <div className="flex items-center gap-2 mb-1 justify-end">
                                              <h5 className={`font-bold truncate text-xs ${active ? 'text-white' : 'text-gray-900 dark:text-white'}`} style={{ lineHeight: '1.4' }}>
                                                {lesson.title}
                                              </h5>
                                              {lesson.completed && (
                                                <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${active ? 'text-white' : 'text-green-500'}`} strokeWidth={2.5} />
                                              )}
                                              {lesson.locked && (
                                                <Lock className={`w-3.5 h-3.5 flex-shrink-0 ${active ? 'text-white/70' : 'text-gray-400'}`} strokeWidth={2} />
                                              )}
                                            </div>
                                            <div className={`flex items-center gap-1.5 text-[10px] justify-end ${active ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}`}>
                                              <Clock className="w-3 h-3" strokeWidth={2} />
                                              <span>{lesson.duration}</span>
                                            </div>
                                          </div>
                                          {active && (
                                            <motion.div
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              transition={{ type: "spring", bounce: 0.3 }}
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
                          </motion.div>
                        );
                      })}
                    </motion.div>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}

