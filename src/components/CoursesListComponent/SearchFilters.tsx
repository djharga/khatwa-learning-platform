import React from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, List, Grid } from 'lucide-react';

/**
 * Props for the SearchFilters component.
 */
export interface SearchFiltersProps {
  /** Current search query */
  searchValue: string;
  /** Search input handler */
  onSearchChange: (value: string) => void;
  /** Whether any filters are active */
  hasActiveFilters: boolean;
  /** Filter panel toggle handler */
  onToggleFilters: () => void;
  /** Current view mode */
  viewMode: 'grid' | 'list';
  /** View mode toggle handler */
  onToggleViewMode: () => void;
  /** Number of filtered results */
  resultsCount: number;
  /** Optional ref for search input */
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

/**
 * Search and filter controls for the courses list. Includes search input with icon, filter toggle button, view mode switcher, and results count display. Features animated interactions and responsive layout.
 *
 * @example
 * ```tsx
 * <SearchFilters
 *   searchValue={search}
 *   onSearchChange={setSearch}
 *   hasActiveFilters={hasFilters}
 *   onToggleFilters={toggleFilters}
 *   viewMode="grid"
 *   onToggleViewMode={toggleView}
 *   resultsCount={10}
 * />
 * ```
 */
const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchValue,
  onSearchChange,
  hasActiveFilters,
  onToggleFilters,
  viewMode,
  onToggleViewMode,
  resultsCount,
  searchInputRef,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-10 mb-20 transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ابحث عن دورة بالاسم، المدرس، أو الوصف..."
            className="w-full pr-12 pl-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-all duration-300"
          />
        </div>
        <div className="flex gap-3">
          <motion.button
            onClick={onToggleFilters}
            className={`p-3 rounded-xl transition-all duration-200 ${
              hasActiveFilters
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={onToggleViewMode}
            className="p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>
      <div className="mt-6 text-sm text-gray-700 bg-gray-50 px-6 py-4 rounded-xl font-medium">
        تم العثور على <span className="text-blue-600 font-semibold">{resultsCount}</span> دورة
      </div>
    </motion.div>
  );
};

export default SearchFilters;