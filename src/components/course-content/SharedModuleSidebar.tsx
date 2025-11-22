'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle2, Clock, ChevronDown } from 'lucide-react';
import { MotionWrapper } from '@/components/ui/motion/MotionWrapper';
import type { Module, Lesson } from '@/types/course-management';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Unified ModuleSidebar Component
 * 
 * Supports two usage patterns:
 * 1. Content Page Pattern: Uses selectedModuleId/selectedUnitId with onModuleSelect/onUnitSelect
 * 2. Lesson Page Pattern: Uses expandedModuleId/activeUnitId with onModuleToggle/onUnitSelect
 * 
 * Features:
 * - Expandable/collapsible modules
 * - Unit list under each expanded module
 * - Keyboard navigation support
 * - Smooth animations
 * - Progress indicators
 */

// Content Page Pattern Props
interface ContentPageProps {
  selectedModuleId: string | null;
  selectedUnitId: string | null;
  onModuleSelect: (moduleId: string) => void;
  onUnitSelect: (unitId: string) => void;
  expandedModuleId?: never;
  activeUnitId?: never;
  onModuleToggle?: never;
  units?: never;
  unitsLoading?: never;
}

// Lesson Page Pattern Props
interface LessonPageProps {
  expandedModuleId: string | null;
  activeUnitId: string | null;
  onModuleToggle: (moduleId: string) => void;
  onUnitSelect: (unitId: string) => void;
  units?: Lesson[];
  unitsLoading?: boolean;
  selectedModuleId?: never;
  selectedUnitId?: never;
  onModuleSelect?: never;
}

// Common Props
interface CommonProps {
  modules: Module[];
  isLoading?: boolean;
  variant?: 'content' | 'lesson';
  showProgress?: boolean;
}

type SharedModuleSidebarProps = CommonProps & (ContentPageProps | LessonPageProps);

export default function SharedModuleSidebar(props: SharedModuleSidebarProps) {
  const {
    modules,
    isLoading = false,
    variant = 'content',
    showProgress = true,
  } = props;

  // Determine which pattern is being used
  const isContentPattern = 'selectedModuleId' in props;
  const isLessonPattern = 'expandedModuleId' in props;

  // Extract props based on pattern
  const selectedModuleId = isContentPattern ? props.selectedModuleId : null;
  const selectedUnitId = isContentPattern ? props.selectedUnitId : null;
  const expandedModuleId = isLessonPattern ? props.expandedModuleId : null;
  const activeUnitId = isLessonPattern ? props.activeUnitId : null;
  const externalUnits = isLessonPattern ? props.units : undefined;
  const unitsLoading = isLessonPattern ? props.unitsLoading : false;

  // Callbacks
  const onModuleSelect = isContentPattern ? props.onModuleSelect : undefined;
  const onUnitSelect = isContentPattern ? props.onUnitSelect : props.onUnitSelect;
  const onModuleToggle = isLessonPattern ? props.onModuleToggle : undefined;

  // Internal state for content pattern
  const [internalExpandedModuleId, setInternalExpandedModuleId] = useState<string | null>(() => {
    return isContentPattern ? (selectedModuleId ?? null) : null;
  });

  // Heights for smooth animations (lesson pattern)
  const [heights, setHeights] = useState<Record<string, number>>({});
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const prefersReducedMotion = useReducedMotion();

  // Update internal expanded state when selectedModuleId changes (content pattern)
  useEffect(() => {
    if (isContentPattern && selectedModuleId && internalExpandedModuleId !== selectedModuleId) {
      setInternalExpandedModuleId(selectedModuleId);
    }
  }, [isContentPattern, selectedModuleId, internalExpandedModuleId]);

  // Measure heights for smooth animations (lesson pattern)
  useEffect(() => {
    if (isLessonPattern) {
      const newHeights: Record<string, number> = {};
      Object.keys(contentRefs.current).forEach((moduleId) => {
        const ref = contentRefs.current[moduleId];
        if (ref) {
          newHeights[moduleId] = ref.scrollHeight;
        }
      });
      setHeights(newHeights);
    }
  }, [isLessonPattern, externalUnits, expandedModuleId]);

  // Handle module click/toggle
  const handleModuleClick = (moduleId: string) => {
    if (isContentPattern && onModuleSelect) {
      const isExpanded = internalExpandedModuleId === moduleId;
      if (isExpanded) {
        setInternalExpandedModuleId(null);
        onModuleSelect('');
      } else {
        setInternalExpandedModuleId(moduleId);
        onModuleSelect(moduleId);
      }
    } else if (isLessonPattern && onModuleToggle) {
      onModuleToggle(moduleId);
    }
  };

  // Get current expanded module ID
  const getExpandedModuleId = () => {
    if (isContentPattern) {
      return internalExpandedModuleId;
    }
    return expandedModuleId;
  };

  // Get current active unit ID
  const getActiveUnitId = () => {
    if (isContentPattern) {
      return selectedUnitId;
    }
    return activeUnitId;
  };

  // Get lessons for a module
  const getModuleLessons = (module: Module): Lesson[] => {
    if (isLessonPattern && externalUnits) {
      const currentExpandedId = getExpandedModuleId();
      return currentExpandedId === module.id ? externalUnits : [];
    }
    return module.lessons || [];
  };

  // Keyboard navigation for modules
  const handleModuleKeyDown = (e: React.KeyboardEvent, moduleId: string, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleModuleClick(moduleId);
    } else if (e.key === 'ArrowDown' && index < modules.length - 1) {
      e.preventDefault();
      const nextModule = modules[index + 1];
      if (nextModule) {
        const nextButton = document.querySelector(`[data-module-id="${nextModule.id}"]`) as HTMLElement;
        nextButton?.focus();
      }
    } else if (e.key === 'ArrowUp' && index > 0) {
      e.preventDefault();
      const prevModule = modules[index - 1];
      if (prevModule) {
        const prevButton = document.querySelector(`[data-module-id="${prevModule.id}"]`) as HTMLElement;
        prevButton?.focus();
      }
    }
  };

  // Keyboard navigation for units
  const handleUnitKeyDown = (e: React.KeyboardEvent, unitId: string, index: number, allUnits: Lesson[]) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onUnitSelect(unitId);
    } else if (e.key === 'ArrowDown' && index < allUnits.length - 1) {
      e.preventDefault();
      const nextUnit = allUnits[index + 1];
      if (nextUnit) {
        const nextButton = document.querySelector(`[data-unit-id="${nextUnit.id}"]`) as HTMLElement;
        nextButton?.focus();
      }
    } else if (e.key === 'ArrowUp' && index > 0) {
      e.preventDefault();
      const prevUnit = allUnits[index - 1];
      if (prevUnit) {
        const prevButton = document.querySelector(`[data-unit-id="${prevUnit.id}"]`) as HTMLElement;
        prevButton?.focus();
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full lg:w-[280px] h-full bg-white dark:bg-neutral-800 border-inline-end border-[#E5E7EB] dark:border-neutral-700 flex flex-col flex-shrink-0 overflow-hidden">
        <div className="p-6 border-b border-[#E5E7EB] dark:border-neutral-700 bg-white dark:bg-neutral-800">
          <div className="h-6 bg-[#F3F4F6] dark:bg-neutral-700/50 rounded-md animate-pulse mb-2 max-w-[120px]" />
          <div className="h-4 bg-[#F3F4F6] dark:bg-neutral-700/50 rounded-md w-2/3 animate-pulse max-w-[100px]" />
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-[#F7F8FC] dark:bg-neutral-700/50 rounded-xl animate-pulse border border-[#E5E7EB] dark:border-neutral-700" />
          ))}
        </div>
      </div>
    );
  }

  const currentExpandedModuleId = getExpandedModuleId();
  const currentActiveUnitId = getActiveUnitId();

  return (
    <div 
      className="w-full lg:w-[280px] bg-white dark:bg-neutral-800 border-inline-end border-[#E5E7EB] dark:border-neutral-700 flex flex-col flex-shrink-0 overflow-hidden h-full" 
      dir="rtl"
      role="listbox"
      aria-label="قائمة المحاور والوحدات"
    >
      {/* Header */}
      <div className={`${variant === 'content' ? 'p-6' : 'p-3'} border-b border-[#E5E7EB] dark:border-neutral-700 bg-white dark:bg-neutral-800 flex-shrink-0`}>
        <div className={`flex items-center ${variant === 'content' ? 'gap-3' : 'gap-2'}`}>
          {variant === 'content' && (
            <div className="w-10 h-10 bg-[#F7F8FC] dark:bg-[#5B36E8]/20 rounded-[6px] flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#5B36E8] dark:text-[#6D4AFF]" strokeWidth={2.5} />
            </div>
          )}
          <h2 className={`${variant === 'content' ? 'text-base' : 'text-sm'} font-semibold text-[#111827] dark:text-white`}>
            المحاور والوحدات
          </h2>
        </div>
      </div>

      {/* Modules & Units List */}
      <div className="flex-1 overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-[#E5E7EB] dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent hover:scrollbar-thumb-[#D1D5DB] dark:hover:scrollbar-thumb-neutral-600">
        {modules.length === 0 ? (
          <MotionWrapper
            animation="scale"
            className="flex flex-col items-center justify-center py-16 px-8"
          >
            <div className="w-16 h-16 bg-[#F3F4F6] dark:bg-neutral-700/50 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-10 h-10 text-[#D1D5DB] dark:text-neutral-600" />
            </div>
            <p className="text-base text-[#6B7280] dark:text-neutral-400 text-center font-medium">
              لا توجد وحدات متاحة حالياً
            </p>
            <p className="text-sm text-[#9CA3AF] dark:text-neutral-500 text-center mt-1">
              سيتم إضافة المحتوى قريباً
            </p>
          </MotionWrapper>
        ) : (
          <div className="space-y-0">
            {modules.map((module, moduleIndex) => {
              const isExpanded = currentExpandedModuleId === module.id;
              const isActive = isContentPattern 
                ? selectedModuleId === module.id 
                : isExpanded;
              const lessons = getModuleLessons(module);
              const progress = module.progress?.percentage || 0;
              const completedLessons = module.progress?.completed || 0;
              const totalLessons = module.progress?.total || lessons.length;
              const height = isLessonPattern ? (heights[module.id] || 0) : undefined;

              return (
                <div key={module.id} className="border-b border-[#F3F4F6] dark:border-neutral-700">
                  {/* Module Header */}
                  {variant === 'content' ? (
                    <button
                      onClick={() => handleModuleClick(module.id)}
                      className={`w-full text-right px-4 py-3 flex items-center gap-3 transition-all duration-300 ease-out relative group ${
                        isActive
                          ? 'bg-[#F5F6FA] dark:bg-[#5B36E8]/10'
                          : 'bg-white dark:bg-neutral-800 hover:bg-[#F7F8FC] dark:hover:bg-neutral-700/50'
                      } active:scale-[0.98]`}
                    >
                      {/* Chevron Icon */}
                      <div className={`flex-shrink-0 transition-transform duration-300 ease-out ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                        <ChevronDown className="w-5 h-5 text-[#6B7280] dark:text-neutral-400" />
                      </div>

                      {/* Module Number */}
                      <div
                        className={`w-6 h-6 rounded-[6px] flex items-center justify-center text-sm font-semibold transition-all duration-300 ease-out ${
                          isActive
                            ? 'bg-[#5B36E8] text-white'
                            : 'bg-[#F7F8FC] dark:bg-neutral-700 text-[#6B7280] dark:text-neutral-300'
                        }`}
                      >
                        {moduleIndex + 1}
                      </div>

                      {/* Module Title */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-base font-semibold truncate transition-colors duration-300 ease-out ${
                            isActive
                              ? 'text-[#5B36E8] dark:text-[#6D4AFF]'
                              : 'text-[#111827] dark:text-white group-hover:text-[#5B36E8] dark:group-hover:text-[#6D4AFF]'
                          }`}
                        >
                          {module.title}
                        </h3>
                      </div>
                    </button>
                  ) : (
                    <button
                      data-module-id={module.id}
                      onClick={() => handleModuleClick(module.id)}
                      onKeyDown={(e) => handleModuleKeyDown(e, module.id, moduleIndex)}
                      className={`w-full text-right px-3 py-2.5 flex items-center gap-2.5 transition-all duration-300 ease-out relative group ${
                        isExpanded
                          ? 'bg-[#F5F6FA] dark:bg-[#5B36E8]/10'
                          : 'bg-white dark:bg-neutral-800 hover:bg-[#F7F8FC] dark:hover:bg-neutral-700/50'
                      } focus-visible:outline-2 focus-visible:outline-[#5B36E8] focus-visible:outline-offset-2`}
                      aria-expanded={isExpanded}
                      aria-controls={`module-content-${module.id}`}
                    >
                      {/* Chevron Icon */}
                      <div className="flex-shrink-0">
                        <ChevronDown 
                          className={`w-4 h-4 text-[#6B7280] dark:text-neutral-400 transition-transform duration-300 ease-out ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>

                      {/* Module Number */}
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-semibold transition-all duration-300 ease-out ${
                          isExpanded
                            ? 'bg-[#5B36E8] text-white'
                            : 'bg-[#F7F8FC] dark:bg-neutral-700 text-[#6B7280] dark:text-neutral-300'
                        }`}
                      >
                        {moduleIndex + 1}
                      </div>

                      {/* Module Title */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-sm font-semibold truncate transition-colors duration-300 ease-out ${
                            isExpanded
                              ? 'text-[#5B36E8] dark:text-[#6D4AFF]'
                              : 'text-[#111827] dark:text-white group-hover:text-[#5B36E8] dark:group-hover:text-[#6D4AFF]'
                          }`}
                        >
                          {module.title}
                        </h3>
                      </div>
                    </button>
                  )}

                  {/* Units List */}
                  {variant === 'content' ? (
                    <AnimatePresence>
                      {isExpanded && lessons.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden bg-[#FFFFFF] dark:bg-neutral-800"
                        >
                          <div className="pt-0 pb-2">
                            {lessons.map((lesson: Lesson, lessonIndex: number) => {
                              const isUnitActive = currentActiveUnitId === lesson.id;
                              const isUnitCompleted = lesson.completedBy > 0;

                              return (
                                <button
                                  key={lesson.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onUnitSelect(lesson.id);
                                  }}
                                  className={`w-full text-right px-4 py-2 pr-[40px] flex items-center gap-3 transition-all duration-300 ease-out relative group ${
                                    isUnitActive
                                      ? 'bg-[#EDE9FE] dark:bg-[#5B36E8]/20 border-inline-start-[3px] border-[#5B36E8]'
                                      : 'bg-transparent hover:bg-[#F7F8FC] dark:hover:bg-neutral-700/30 border-inline-start-[3px] border-transparent hover:border-[#5B36E8]'
                                  } active:scale-[0.98]`}
                                >
                                  {/* Unit Icon */}
                                  {isUnitCompleted && (
                                    <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" strokeWidth={2.5} />
                                  )}

                                  {/* Unit Title */}
                                  <div className="flex-1 min-w-0">
                                    <p
                                      className={`text-sm truncate transition-colors duration-300 ease-out ${
                                        isUnitActive
                                          ? 'text-[#5B36E8] dark:text-[#6D4AFF] font-semibold'
                                          : 'text-[#6B7280] dark:text-neutral-400 group-hover:text-[#5B36E8] dark:group-hover:text-[#6D4AFF]'
                                      }`}
                                    >
                                      {lesson.title}
                                    </p>
                                    {lesson.estimatedDuration && (
                                      <div className="flex items-center gap-1.5 mt-1">
                                        <Clock className="w-3 h-3 text-[#9CA3AF] dark:text-neutral-500" />
                                        <span className="text-xs text-[#9CA3AF] dark:text-neutral-500">
                                          {lesson.estimatedDuration} دقيقة
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ) : (
                    <div
                      id={`module-content-${module.id}`}
                      className="overflow-hidden transition-all duration-300 ease-out"
                      style={{
                        height: isExpanded ? `${height}px` : '0px',
                        opacity: isExpanded ? 1 : 0,
                      }}
                    >
                      <div
                        ref={(el) => {
                          contentRefs.current[module.id] = el;
                        }}
                        className="bg-white dark:bg-neutral-800"
                      >
                        {unitsLoading && isExpanded ? (
                          <div className="p-4 space-y-2">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="h-12 bg-[#F7F8FC] dark:bg-neutral-700/50 rounded-lg animate-pulse" />
                            ))}
                          </div>
                        ) : lessons.length > 0 ? (
                          <div className="pt-0 pb-2">
                            {lessons.map((unit: Lesson, unitIndex: number) => {
                              const isActive = currentActiveUnitId === unit.id;

                              return (
                                <button
                                  key={unit.id}
                                  data-unit-id={unit.id}
                                  onClick={() => onUnitSelect(unit.id)}
                                  onKeyDown={(e) => handleUnitKeyDown(e, unit.id, unitIndex, lessons)}
                                  className={`w-full text-right px-3 py-2 pr-8 flex items-center gap-2.5 transition-all duration-300 ease-out relative group ${
                                    isActive
                                      ? 'bg-[#EDE9FE] dark:bg-[#5B36E8]/20 border-inline-start-[3px] border-[#5B36E8]'
                                      : 'bg-transparent hover:bg-[#F7F8FC] dark:hover:bg-neutral-700/30 border-inline-start-[3px] border-transparent'
                                  } focus-visible:outline-2 focus-visible:outline-[#5B36E8] focus-visible:outline-offset-2`}
                                  role="option"
                                  aria-selected={isActive}
                                >
                                  {/* Unit Title */}
                                  <div className="flex-1 min-w-0">
                                    <p
                                      className={`text-xs truncate transition-colors duration-300 ease-out ${
                                        isActive
                                          ? 'text-[#5B36E8] dark:text-[#6D4AFF] font-semibold'
                                          : 'text-[#6B7280] dark:text-neutral-400 group-hover:text-[#5B36E8] dark:group-hover:text-[#6D4AFF]'
                                      }`}
                                    >
                                      {unit.title}
                                    </p>
                                    {unit.estimatedDuration && (
                                      <div className="flex items-center gap-1 mt-0.5">
                                        <Clock className="w-2.5 h-2.5 text-[#9CA3AF] dark:text-neutral-500" />
                                        <span className="text-[10px] text-[#9CA3AF] dark:text-neutral-500">
                                          {unit.estimatedDuration} د
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="p-4 text-center">
                            <p className="text-sm text-[#9CA3AF] dark:text-neutral-500">
                              لا توجد وحدات متاحة
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Progress Bar - Shows when expanded (content pattern only) */}
                  {showProgress && variant === 'content' && isExpanded && (
                    <MotionWrapper
                      animation="fade"
                      className="px-4 pb-3 bg-[#F5F6FA] dark:bg-neutral-800"
                    >
                      <div className="flex items-center justify-between text-xs mb-2">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" strokeWidth={2.5} />
                          <span className="text-[#6B7280] dark:text-neutral-400 font-medium">
                            {completedLessons}/{totalLessons}
                          </span>
                        </div>
                        <span className="text-[#6B7280] dark:text-neutral-400 font-semibold">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[#E5E7EB] dark:bg-neutral-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#5B36E8] via-[#6D4AFF] to-[#5B36E8] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: moduleIndex * 0.05 }}
                        />
                      </div>
                    </MotionWrapper>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

