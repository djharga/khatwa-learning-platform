import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { CourseFilters } from '@/types/course';

/**
 * Props for the ActiveFiltersChips component.
 */
export interface ActiveFiltersChipsProps {
  /** Current filter state from useCourseFilters */
  filters: CourseFilters;
  /** Handler to update filters */
  onUpdateFilters: (updates: Partial<CourseFilters>) => void;
  /** Handler to reset all filters */
  onResetFilters: () => void;
  /** Whether any filters are active */
  hasActiveFilters: boolean;
}

/**
 * Active filter badges display showing currently applied filters. Each badge includes a remove button for individual filter removal. Includes a 'clear all' button to reset all filters at once. Animates in/out based on filter state.
 *
 * Component automatically hides when no filters are active.
 *
 * @example
 * ```tsx
 * <ActiveFiltersChips
 *   filters={filters}
 *   onUpdateFilters={updateFilters}
 *   onResetFilters={resetFilters}
 *   hasActiveFilters={hasActiveFilters}
 * />
 * ```
 */
const ActiveFiltersChips: React.FC<ActiveFiltersChipsProps> = ({
  filters,
  onUpdateFilters,
  onResetFilters,
  hasActiveFilters,
}) => {
  if (!hasActiveFilters) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-6 flex flex-wrap gap-2"
    >
      {filters.search && (
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          بحث: {filters.search}
          <button
            onClick={() => onUpdateFilters({ search: '' })}
            className="hover:text-blue-600"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      {filters.category && filters.category !== 'الكل' && (
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
          فئة: {filters.category}
          <button
            onClick={() => onUpdateFilters({ category: 'الكل' })}
            className="hover:text-green-600"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      {filters.level && filters.level !== 'الكل' && (
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
          مستوى: {filters.level}
          <button
            onClick={() => onUpdateFilters({ level: 'الكل' })}
            className="hover:text-purple-600"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      <button
        onClick={onResetFilters}
        className="text-gray-500 hover:text-gray-700 text-sm underline"
      >
        مسح الكل
      </button>
    </motion.div>
  );
};

export default ActiveFiltersChips;