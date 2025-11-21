'use client';

/**
 * ModuleSidebar Component - Accordion for Modules and Units
 * 
 * Features:
 * - Expandable/collapsible modules
 * - Unit list under each expanded module
 * - Keyboard navigation support
 * - Smooth height animations
 * 
 * File location: app/(dashboard)/student/courses/[courseId]/lesson/ModuleSidebar.tsx
 */

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, BookOpen, Clock } from 'lucide-react';
import type { Module, Lesson } from '@/types/course-management';

interface ModuleSidebarProps {
  modules: Module[];
  expandedModuleId: string | null;
  activeUnitId: string | null;
  units: Lesson[];
  onModuleToggle: (moduleId: string) => void;
  onUnitSelect: (unitId: string) => void;
  isLoading?: boolean;
  unitsLoading?: boolean;
}

export default function ModuleSidebar({
  modules,
  expandedModuleId,
  activeUnitId,
  units,
  onModuleToggle,
  onUnitSelect,
  isLoading = false,
  unitsLoading = false,
}: ModuleSidebarProps) {
  const [heights, setHeights] = useState<Record<string, number>>({});
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Measure heights for smooth animations
  useEffect(() => {
    const newHeights: Record<string, number> = {};
    Object.keys(contentRefs.current).forEach((moduleId) => {
      const ref = contentRefs.current[moduleId];
      if (ref) {
        newHeights[moduleId] = ref.scrollHeight;
      }
    });
    setHeights(newHeights);
  }, [units, expandedModuleId]);

  // Keyboard navigation for modules
  const handleModuleKeyDown = (e: React.KeyboardEvent, moduleId: string, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onModuleToggle(moduleId);
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
  const handleUnitKeyDown = (e: React.KeyboardEvent, unitId: string, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onUnitSelect(unitId);
    } else if (e.key === 'ArrowDown' && index < units.length - 1) {
      e.preventDefault();
      const nextUnit = units[index + 1];
      if (nextUnit) {
        const nextButton = document.querySelector(`[data-unit-id="${nextUnit.id}"]`) as HTMLElement;
        nextButton?.focus();
      }
    } else if (e.key === 'ArrowUp' && index > 0) {
      e.preventDefault();
      const prevUnit = units[index - 1];
      if (prevUnit) {
        const prevButton = document.querySelector(`[data-unit-id="${prevUnit.id}"]`) as HTMLElement;
        prevButton?.focus();
      }
    }
  };

  // Skeleton loader
  if (isLoading) {
    return (
      <div className="w-full min-h-full bg-white dark:bg-neutral-800 flex flex-col">
        <div className="p-4 border-b border-[#E5E7EB] dark:border-neutral-700">
          <div className="h-5 bg-[#F3F4F6] dark:bg-neutral-700/50 rounded-md animate-pulse mb-2 max-w-[100px]" />
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-[#F7F8FC] dark:bg-neutral-700/50 rounded-lg animate-pulse border border-[#E5E7EB] dark:border-neutral-700" />
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (modules.length === 0) {
    return (
      <div className="w-full min-h-full bg-white dark:bg-neutral-800 flex flex-col">
        <div className="p-4 border-b border-[#E5E7EB] dark:border-neutral-700">
          <h2 className="text-sm font-semibold text-[#111827] dark:text-white">
            المحاور والوحدات
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <BookOpen className="w-10 h-10 text-[#D1D5DB] dark:text-neutral-600 mx-auto mb-2" />
            <p className="text-xs text-[#6B7280] dark:text-neutral-400">
              لا توجد محاور متاحة
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full min-h-full bg-white dark:bg-neutral-800 flex flex-col" 
      dir="rtl"
      role="listbox"
      aria-label="قائمة المحاور والوحدات"
    >
      {/* Header - Minimal */}
      <div className="p-3 border-b border-[#E5E7EB] dark:border-neutral-700 flex-shrink-0">
        <h2 className="text-sm font-semibold text-[#111827] dark:text-white">
          المحاور والوحدات
        </h2>
      </div>

      {/* Modules List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#E5E7EB] dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent">
        <div className="space-y-0">
          {modules.map((module, moduleIndex) => {
            const isExpanded = expandedModuleId === module.id;
            const moduleUnits = isExpanded ? units : [];
            const height = heights[module.id] || 0;

            return (
              <div key={module.id} className="border-b border-[#F3F4F6] dark:border-neutral-700">
                {/* Module Header Button */}
                <button
                  data-module-id={module.id}
                  onClick={() => onModuleToggle(module.id)}
                  onKeyDown={(e) => handleModuleKeyDown(e, module.id, moduleIndex)}
                  className={`w-full text-right px-3 py-2.5 flex items-center gap-2.5 transition-all duration-200 ease-out relative group ${
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
                      className={`w-4 h-4 text-[#6B7280] dark:text-neutral-400 transition-transform duration-200 ease-out ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {/* Module Number */}
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
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
                      className={`text-sm font-semibold truncate transition-colors duration-200 ${
                        isExpanded
                          ? 'text-[#5B36E8] dark:text-[#6D4AFF]'
                          : 'text-[#111827] dark:text-white group-hover:text-[#5B36E8] dark:group-hover:text-[#6D4AFF]'
                      }`}
                    >
                      {module.title}
                    </h3>
                  </div>
                </button>

                {/* Units List - Collapsible */}
                <div
                  id={`module-content-${module.id}`}
                  className="overflow-hidden transition-all duration-400 ease-out"
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
                    ) : moduleUnits.length > 0 ? (
                      <div className="pt-0 pb-2">
                        {moduleUnits.map((unit: Lesson, unitIndex: number) => {
                          const isActive = activeUnitId === unit.id;

                          return (
                            <button
                              key={unit.id}
                              data-unit-id={unit.id}
                              onClick={() => onUnitSelect(unit.id)}
                              onKeyDown={(e) => handleUnitKeyDown(e, unit.id, unitIndex)}
                              className={`w-full text-right px-3 py-2 pr-8 flex items-center gap-2.5 transition-all duration-200 ease-out relative group ${
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
                                  className={`text-xs truncate transition-colors duration-200 ${
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

