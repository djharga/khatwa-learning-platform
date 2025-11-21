'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle2, Clock, ChevronDown } from 'lucide-react';
import type { Module, Lesson } from '@/types/course-management';

interface ModuleSidebarProps {
  modules: Module[];
  selectedModuleId: string | null;
  selectedUnitId: string | null;
  onModuleSelect: (moduleId: string) => void;
  onUnitSelect: (unitId: string) => void;
  isLoading?: boolean;
}

export default function ModuleSidebar({
  modules,
  selectedModuleId,
  selectedUnitId,
  onModuleSelect,
  onUnitSelect,
  isLoading = false,
}: ModuleSidebarProps) {
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(selectedModuleId);

  // Expand module when selected
  if (selectedModuleId && expandedModuleId !== selectedModuleId) {
    setExpandedModuleId(selectedModuleId);
  }

  const handleModuleClick = (moduleId: string) => {
    if (expandedModuleId === moduleId) {
      // Collapse if already expanded
      setExpandedModuleId(null);
      onModuleSelect('');
    } else {
      // Expand new module (single expansion mode)
      setExpandedModuleId(moduleId);
      onModuleSelect(moduleId);
    }
  };

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

  return (
    <div 
      className="w-full lg:w-[280px] bg-white dark:bg-neutral-800 border-inline-end border-[#E5E7EB] dark:border-neutral-700 flex flex-col flex-shrink-0 overflow-hidden h-full" 
      dir="rtl"
    >
      {/* Header - Academic design */}
      <div className="p-6 border-b border-[#E5E7EB] dark:border-neutral-700 bg-white dark:bg-neutral-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F7F8FC] dark:bg-[#5B36E8]/20 rounded-[6px] flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-[#5B36E8] dark:text-[#6D4AFF]" strokeWidth={2.5} />
          </div>
          <h2 className="text-base font-semibold text-[#111827] dark:text-white">
            المحاور والوحدات
          </h2>
        </div>
      </div>

      {/* Modules & Units Accordion List */}
      <div className="flex-1 overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-[#E5E7EB] dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent hover:scrollbar-thumb-[#D1D5DB] dark:hover:scrollbar-thumb-neutral-600">
        {modules.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
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
          </motion.div>
        ) : (
          <div className="space-y-0">
            {modules.map((module, moduleIndex) => {
              const isExpanded = expandedModuleId === module.id;
              const isActive = selectedModuleId === module.id;
              const lessons = module.lessons || [];
              const progress = module.progress?.percentage || 0;
              const completedLessons = module.progress?.completed || 0;
              const totalLessons = module.progress?.total || lessons.length;

              return (
                <div key={module.id} className="border-b border-[#F3F4F6] dark:border-neutral-700">
                  {/* Module Header */}
                  <motion.button
                    onClick={() => handleModuleClick(module.id)}
                    className={`w-full text-right px-4 py-3 flex items-center gap-3 transition-all duration-200 relative group ${
                      isActive
                        ? 'bg-[#F5F6FA] dark:bg-[#5B36E8]/10'
                        : 'bg-white dark:bg-neutral-800 hover:bg-[#F7F8FC] dark:hover:bg-neutral-700/50'
                    }`}
                    whileHover={{ backgroundColor: isActive ? undefined : '#F7F8FC' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Chevron Icon - Rotates when expanded */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 300, ease: [0.4, 0, 0.2, 1] }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-[#6B7280] dark:text-neutral-400" />
                    </motion.div>

                    {/* Module Number/Icon */}
                    <div
                      className={`w-6 h-6 rounded-[6px] flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
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
                        className={`text-base font-semibold truncate transition-colors duration-200 ${
                          isActive
                            ? 'text-[#5B36E8] dark:text-[#6D4AFF]'
                            : 'text-[#111827] dark:text-white group-hover:text-[#5B36E8] dark:group-hover:text-[#6D4AFF]'
                        }`}
                      >
                        {module.title}
                      </h3>
                    </div>
                  </motion.button>

                  {/* Units List - Nested under Module */}
                  <AnimatePresence>
                    {isExpanded && lessons.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 400, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden bg-[#FFFFFF] dark:bg-neutral-800"
                      >
                        <div className="pt-0 pb-2">
                          {lessons.map((lesson: Lesson, lessonIndex: number) => {
                            const isUnitActive = selectedUnitId === lesson.id;
                            const isUnitCompleted = lesson.completedBy > 0;

                            return (
                              <motion.button
                                key={lesson.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onUnitSelect(lesson.id);
                                }}
                                className={`w-full text-right px-4 py-2 pr-[40px] flex items-center gap-3 transition-all duration-200 relative group ${
                                  isUnitActive
                                    ? 'bg-[#EDE9FE] dark:bg-[#5B36E8]/20 border-inline-start-[3px] border-[#5B36E8]'
                                    : 'bg-transparent hover:bg-[#F7F8FC] dark:hover:bg-neutral-700/30 border-inline-start-[3px] border-transparent'
                                }`}
                                whileHover={{
                                  backgroundColor: isUnitActive ? undefined : '#F7F8FC',
                                  borderInlineStartColor: isUnitActive ? undefined : '#5B36E8',
                                }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {/* Unit Icon */}
                                {isUnitCompleted && (
                                  <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" strokeWidth={2.5} />
                                )}

                                {/* Unit Title */}
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={`text-sm truncate transition-colors duration-200 ${
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
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Progress Bar - Shows when expanded */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
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
                          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: moduleIndex * 0.05 }}
                        />
                      </div>
                    </motion.div>
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