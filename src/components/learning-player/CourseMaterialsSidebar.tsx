'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  BookOpen,
  ChevronRight,
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  lessons: Array<{
    id: string;
    title: string;
  }>;
}

interface CourseMaterialsSidebarProps {
  modules: Module[];
  currentLessonId: string;
  selectedModuleId?: string | null;
  onModuleSelect: (moduleId: string) => void;
  onClose?: () => void;
}

export default function CourseMaterialsSidebar({
  modules,
  currentLessonId,
  selectedModuleId,
  onModuleSelect,
  onClose,
}: CourseMaterialsSidebarProps) {
  // العثور على المحور الحالي
  const currentModule = modules.find(module =>
    module.lessons.some(lesson => lesson.id === currentLessonId)
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950/50 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 shadow-2xl overflow-hidden transition-all" dir="rtl">
      {/* Header */}
      <div className="p-5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white">المحاور</h2>
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

      {/* Stats */}
      <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-indigo-50/80 via-purple-50/60 to-pink-50/40 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">إجمالي المحاور</span>
          <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            {modules.length}
          </span>
        </div>
      </div>

      {/* Modules List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600">
        {modules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              لا توجد محاور متاحة
            </p>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {modules.map((module, index) => {
              const isCurrentModule = module.id === currentModule?.id;
              const isSelected = module.id === selectedModuleId;
              const lessonsCount = module.lessons.length;

              return (
                <motion.button
                  key={module.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onModuleSelect(module.id)}
                  className={`w-full group relative overflow-hidden rounded-xl border-2 transition-all text-right ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-indigo-300 dark:border-indigo-700 shadow-lg shadow-indigo-500/20'
                      : isCurrentModule
                        ? 'bg-white dark:bg-gray-800/50 border-indigo-200 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md'
                        : 'bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-md'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="selectedModule"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <div className="relative p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md font-bold text-sm transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                          : isCurrentModule
                            ? 'bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-700 dark:text-indigo-300'
                            : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-sm mb-1 truncate ${
                          isSelected
                            ? 'text-indigo-900 dark:text-indigo-100'
                            : isCurrentModule
                              ? 'text-indigo-800 dark:text-indigo-200'
                              : 'text-gray-900 dark:text-white'
                        }`}>
                          {module.title}
                        </h3>
                        <div className="flex items-center gap-2 justify-end mt-2">
                          <span className={`text-xs px-2 py-1 rounded-md ${
                            isSelected
                              ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                          }`}>
                            {lessonsCount} {lessonsCount === 1 ? 'درس' : 'دروس'}
                          </span>
                          {isCurrentModule && !isSelected && (
                            <span className="text-xs px-2 py-1 rounded-md bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-medium">
                              نشط
                            </span>
                          )}
                        </div>
                      </div>

                      <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-all ${
                        isSelected
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-400 dark:text-gray-500 group-hover:text-indigo-500'
                      }`} />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
