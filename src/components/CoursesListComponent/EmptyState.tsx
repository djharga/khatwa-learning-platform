import React from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen } from 'lucide-react';

/**
 * Props for the EmptyState component.
 */
export interface EmptyStateProps {
  /** Handler to clear all filters */
  onResetFilters: () => void;
  /** Handler for course suggestion action */
  onSuggestCourse: () => void;
}

/**
 * Empty state display shown when no courses match the current filters. Features an illustrated icon, helpful message, and action buttons to clear filters or suggest a course. Includes smooth entrance animation.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   onResetFilters={() => resetFilters()}
 *   onSuggestCourse={() => updateFilters({ search: 'مقدمة في البرمجة' })}
 * />
 * ```
 *
 * @note SVG illustration uses relative positioning with decorative accent icons
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  onResetFilters,
  onSuggestCourse,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full text-center py-16"
    >
      <div className="relative mb-8">
        <svg
          className="w-32 h-32 mx-auto text-gray-300"
          fill="none"
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="60"
            cy="60"
            r="45"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            opacity="0.2"
          />
          <circle
            cx="60"
            cy="40"
            r="8"
            fill="currentColor"
            opacity="0.4"
          />
          <rect
            x="45"
            y="55"
            width="30"
            height="3"
            rx="1.5"
            fill="currentColor"
            opacity="0.4"
          />
          <rect
            x="50"
            y="65"
            width="20"
            height="3"
            rx="1.5"
            fill="currentColor"
            opacity="0.3"
          />
          <rect
            x="55"
            y="75"
            width="10"
            height="3"
            rx="1.5"
            fill="currentColor"
            opacity="0.2"
          />
          <circle
            cx="85"
            cy="35"
            r="12"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
          <circle
            cx="85"
            cy="35"
            r="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.8"
          />
          <rect
            x="90"
            y="38"
            width="6"
            height="2"
            rx="1"
            fill="currentColor"
            opacity="0.8"
            transform="rotate(45 93 39)"
          />
        </svg>
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Search className="w-4 h-4 text-blue-600 opacity-60" />
        </div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
          <BookOpen className="w-3 h-3 text-purple-600 opacity-60" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-900 mb-3">
        لم نجد دورات مطابقة لبحثك
      </h3>
      <p className="text-gray-700 text-lg max-w-md mx-auto mb-8 leading-relaxed">
        جرب كلمات بحث مختلفة أو غيّر معايير الفلترة للعثور على الدورات
        المناسبة لك
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onResetFilters}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center hover:scale-105"
        >
          <Search className="w-5 h-5 mr-2" />
          مسح المرشحات
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSuggestCourse}
          className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center justify-center hover:scale-105"
        >
          <BookOpen className="w-5 h-5 mr-2" />
          اقتراح دورة
        </motion.button>
      </div>
    </motion.div>
  );
};

EmptyState.displayName = 'EmptyState';

export default EmptyState;