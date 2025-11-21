'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, Play, CheckCircle2, FileText, PlayCircle } from 'lucide-react';
import type { Lesson } from '@/types/course-management';

interface UnitSidebarProps {
  units: Lesson[];
  selectedUnitId: string | null;
  onUnitSelect: (unitId: string) => void;
  selectedModuleTitle?: string;
  isLoading?: boolean;
}

export default function UnitSidebar({
  units,
  selectedUnitId,
  onUnitSelect,
  selectedModuleTitle = 'المحاور الفرعية',
  isLoading = false,
}: UnitSidebarProps) {
  const getUnitIcon = (unit: Lesson) => {
    // تحديد أيقونة حسب نوع المحتوى
    const hasVideo = unit.content?.some((c) => c.type === 'video');
    const hasDocument = unit.content?.some((c) => c.type === 'document');
    const hasAudio = unit.content?.some((c) => c.type === 'audio');

    if (hasVideo) return <PlayCircle className="w-5 h-5" strokeWidth={2} />;
    if (hasAudio) return <PlayCircle className="w-5 h-5" strokeWidth={2} />;
    if (hasDocument) return <FileText className="w-5 h-5" strokeWidth={2} />;
    return <BookOpen className="w-5 h-5" strokeWidth={2} />;
  };

  const getUnitTypeLabel = (unit: Lesson) => {
    const hasVideo = unit.content?.some((c) => c.type === 'video');
    const hasDocument = unit.content?.some((c) => c.type === 'document');
    const hasAudio = unit.content?.some((c) => c.type === 'audio');

    if (hasVideo) return 'فيديو';
    if (hasAudio) return 'صوتي';
    if (hasDocument) return 'مستندات';
    return 'تعليمي';
  };

  const getFileCount = (unit: Lesson) => {
    return unit.content?.length || 0;
  };

  if (isLoading) {
    return (
      <div className="flex-1 h-full bg-white dark:bg-neutral-800 border-inline-start border-[#E6E8EF] dark:border-neutral-700 flex flex-col flex-shrink-0 min-w-0 overflow-hidden">
        {/* Sticky Header - Responsive */}
        <div className="sticky top-0 z-10 p-4 md:p-5 border-b border-[#E6E8EF] dark:border-neutral-700 bg-white dark:bg-neutral-800 backdrop-blur-sm shadow-sm">
          <div className="h-6 bg-[#F5F6FA] dark:bg-neutral-700/50 rounded-md animate-pulse mb-2 max-w-[200px]" />
          <div className="h-4 bg-[#F5F6FA] dark:bg-neutral-700/50 rounded-md w-2/3 animate-pulse max-w-[150px]" />
        </div>
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 md:h-28 bg-[#F5F6FA] dark:bg-neutral-700/50 rounded-xl animate-pulse border border-[#E6E8EF] dark:border-neutral-700" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex-1 bg-white dark:bg-neutral-800 border-inline-start border-[#E6E8EF] dark:border-neutral-700 flex flex-col flex-shrink-0 min-w-0 overflow-hidden shadow-sm h-full" 
      dir="rtl"
    >
      {/* Sticky Header - Modern academic design - Responsive */}
      {/* FIX: Clean header with proper spacing and academic styling */}
      <div className="sticky top-0 z-10 p-4 md:p-5 border-b border-[#E6E8EF] dark:border-neutral-700 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-2 md:gap-3 mb-2">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-[#5B36E8]/10 dark:bg-[#5B36E8]/20 rounded-xl flex items-center justify-center">
            <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-[#5B36E8] dark:text-[#6B4DFF]" strokeWidth={2.5} />
          </div>
          <h2 className="text-sm md:text-base font-bold text-neutral-900 dark:text-white truncate">
            {selectedModuleTitle}
          </h2>
        </div>
        <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
          {units.length} وحدة متاحة
        </p>
      </div>

      {/* Units List - Enhanced design with smooth animations and strong active state - Responsive */}
      {/* IMPROVED: Professional cards with enhanced hover effects and smooth transitions */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-5 relative scrollbar-thin scrollbar-thumb-[#E6E8EF] dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent hover:scrollbar-thumb-[#5B36E8] dark:hover:scrollbar-thumb-[#6B4DFF]">
        <div className="space-y-3 relative">
          {units.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-16 px-4"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#F5F6FA] to-[#E6E8EF] dark:from-neutral-700/50 dark:to-neutral-700 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                <BookOpen className="w-10 h-10 text-neutral-300 dark:text-neutral-600" />
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center font-medium">
                لا توجد وحدات متاحة
              </p>
            </motion.div>
          ) : (
            units.map((unit, index) => {
              const isActive = selectedUnitId === unit.id;
              const isCompleted = unit.completedBy > 0;
              const fileCount = getFileCount(unit);
              const unitType = getUnitTypeLabel(unit);

              return (
                <motion.div
                  key={unit.id}
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ 
                    delay: index * 0.04,
                    duration: 0.3,
                    ease: [0.21, 1.11, 0.81, 0.99]
                  }}
                  className="relative"
                >
                  {/* Unit Card - Enhanced with smooth hover and active states */}
                  <motion.button
                    onClick={() => onUnitSelect(unit.id)}
                    className={`w-full text-right p-4 md:p-5 rounded-xl border-2 transition-all duration-300 ease-[cubic-bezier(0.21,1.11,0.81,0.99)] relative overflow-hidden group ${
                      isActive
                        ? 'bg-gradient-to-br from-[#5B36E8]/18 via-[#6B4DFF]/12 to-[#5B36E8]/8 dark:from-[#5B36E8]/28 dark:via-[#6B4DFF]/18 dark:to-[#5B36E8]/25 border-[#5B36E8] dark:border-[#6B4DFF] shadow-xl shadow-[#5B36E8]/20 ring-2 ring-[#5B36E8]/15 dark:ring-[#6B4DFF]/25'
                        : 'bg-white dark:bg-neutral-800 border-[#E6E8EF] dark:border-neutral-700 hover:border-[#5B36E8]/50 dark:hover:border-[#5B36E8]/70 hover:shadow-lg hover:shadow-[#5B36E8]/15 active:scale-95 lg:hover:-translate-y-1'
                    }`}
                    whileHover={{ 
                      y: isActive ? 0 : -4,
                      scale: isActive ? 1 : 1.02,
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    {/* Active Indicator - Enhanced with pulse and glow effects */}
                    {isActive && (
                      <>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#5B36E8]/10 via-[#6B4DFF]/6 to-transparent"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-r from-[#5B36E8]/25 to-[#6B4DFF]/25 rounded-xl blur-md opacity-60"
                          animate={{
                            opacity: [0.6, 0.9, 0.6],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                        />
                      </>
                    )}

                    {/* Hover shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.7, ease: 'easeInOut' }}
                    />

                    <div className="relative z-10">
                      {/* Icon and Title - Enhanced layout */}
                      <div className="flex items-center gap-3 mb-3">
                        <motion.div
                          className={`flex-shrink-0 rounded-xl p-2.5 transition-all duration-300 ${
                            isActive
                              ? 'bg-[#5B36E8] text-white shadow-lg shadow-[#5B36E8]/50'
                              : 'bg-[#F5F6FA] dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 group-hover:bg-[#5B36E8]/10 dark:group-hover:bg-[#5B36E8]/20'
                          }`}
                          animate={{ 
                            scale: isActive ? 1.15 : 1,
                            rotate: isActive ? [0, -8, 8, 0] : 0,
                          }}
                          transition={{ 
                            scale: { duration: 0.3 },
                            rotate: { duration: 0.6, delay: isActive ? 0.2 : 0 }
                          }}
                        >
                          {getUnitIcon(unit)}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <motion.h3
                              className={`text-sm font-semibold truncate transition-colors duration-300 ${
                                isActive
                                  ? 'text-[#5B36E8] dark:text-[#6B4DFF]'
                                  : 'text-neutral-900 dark:text-white group-hover:text-[#5B36E8] dark:group-hover:text-[#6B4DFF]'
                              }`}
                            >
                              {unit.title}
                            </motion.h3>
                            {isCompleted && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                              >
                                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" strokeWidth={2.5} />
                              </motion.div>
                            )}
                            {isActive && (
                              <motion.div
                                animate={{ 
                                  scale: [1, 1.2, 1],
                                  rotate: [0, 10, -10, 0]
                                }}
                                transition={{ 
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: 'easeInOut'
                                }}
                              >
                                <Play className="w-4 h-4 text-[#5B36E8] dark:text-[#6B4DFF] flex-shrink-0" strokeWidth={2.5} />
                              </motion.div>
                            )}
                          </div>
                          {unit.description && (
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                              {unit.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Meta Info - Enhanced badges with smooth animations */}
                      <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 flex-wrap">
                        <motion.div 
                          className="flex items-center gap-1.5"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span className="font-medium">{unit.estimatedDuration} دقيقة</span>
                        </motion.div>
                        <span className="text-neutral-300 dark:text-neutral-600">•</span>
                        <motion.div 
                          className="flex items-center gap-1.5"
                          whileHover={{ scale: 1.05 }}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span className="font-medium">{fileCount} ملف</span>
                        </motion.div>
                        <span className="text-neutral-300 dark:text-neutral-600">•</span>
                        <motion.span 
                          className={`px-3 py-1.5 rounded-lg font-semibold transition-all duration-300 ${
                            isActive
                              ? 'bg-[#5B36E8]/15 text-[#5B36E8] dark:bg-[#6B4DFF]/25 dark:text-[#6B4DFF] shadow-sm shadow-[#5B36E8]/10'
                              : 'bg-[#F5F6FA] dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 group-hover:bg-[#5B36E8]/10 dark:group-hover:bg-[#5B36E8]/20 group-hover:text-[#5B36E8] dark:group-hover:text-[#6B4DFF]'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {unitType}
                        </motion.span>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
