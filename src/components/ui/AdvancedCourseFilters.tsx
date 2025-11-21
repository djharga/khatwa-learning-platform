'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, X, Search, SlidersHorizontal, 
  ChevronDown, Check, Sparkles 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from './GlassCard';

interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
}

interface AdvancedCourseFiltersProps {
  categories: FilterOption[];
  levels: FilterOption[];
  prices: FilterOption[];
  durations: FilterOption[];
  selectedCategory: string;
  selectedLevel: string;
  selectedPrice: string;
  selectedDuration: string;
  onCategoryChange: (category: string) => void;
  onLevelChange: (level: string) => void;
  onPriceChange: (price: string) => void;
  onDurationChange: (duration: string) => void;
  onReset: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function AdvancedCourseFilters({
  categories,
  levels,
  prices,
  durations,
  selectedCategory,
  selectedLevel,
  selectedPrice,
  selectedDuration,
  onCategoryChange,
  onLevelChange,
  onPriceChange,
  onDurationChange,
  onReset,
  searchQuery,
  onSearchChange,
}: AdvancedCourseFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedLevel !== 'all' || 
    selectedPrice !== 'all' || 
    selectedDuration !== 'all';

  const activeFilterCount = [
    selectedCategory !== 'all',
    selectedLevel !== 'all',
    selectedPrice !== 'all',
    selectedDuration !== 'all',
  ].filter(Boolean).length;

  const toggleFilter = (filterId: string) => {
    setOpenFilter(openFilter === filterId ? null : filterId);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <GlassCard variant="elevated" size="sm" className="p-0">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ابحث عن دورة..."
            className="w-full pr-12 pl-4 py-3 bg-transparent border-0 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-0"
          />
        </div>
      </GlassCard>

      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between gap-3 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200',
          'bg-white/90 dark:bg-neutral-800/90 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-700/50',
          'hover:shadow-elevation-3 hover:border-primary-300/50 dark:hover:border-primary-600/50',
          hasActiveFilters && 'border-primary-400 dark:border-primary-600 bg-primary-50/50 dark:bg-primary-900/20'
        )}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary-600" />
          <span>التصفية المتقدمة</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-primary-600 text-white text-xs font-bold rounded-full min-w-[24px] text-center">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
              aria-label="إعادة تعيين التصفية"
            >
              <X className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            </button>
          )}
          <ChevronDown
            className={cn(
              'w-5 h-5 text-neutral-400 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </div>
      </button>

      {/* Filters Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <GlassCard variant="elevated" size="md" className="space-y-6">
              {/* Category Filter */}
              <div>
                <button
                  onClick={() => toggleFilter('category')}
                  className="w-full flex items-center justify-between gap-3 mb-3 text-left"
                >
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Filter className="w-4 h-4 text-primary-600" />
                    التصنيف
                  </h3>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-neutral-400 transition-transform duration-200',
                      openFilter === 'category' && 'rotate-180'
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openFilter === 'category' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-2 md:grid-cols-3 gap-2"
                    >
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => onCategoryChange(category.value)}
                          className={cn(
                            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-left',
                            'border-2',
                            selectedCategory === category.value
                              ? 'bg-gradient-to-r from-primary-500 to-academic-accent-500 text-white border-transparent shadow-lg'
                              : 'bg-white/50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-primary-300 dark:hover:border-primary-600'
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span>{category.label}</span>
                            {selectedCategory === category.value && (
                              <Check className="w-4 h-4" />
                            )}
                          </div>
                          {category.count !== undefined && (
                            <span className="text-xs opacity-75 mt-1 block">
                              ({category.count})
                            </span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Level Filter */}
              <div>
                <button
                  onClick={() => toggleFilter('level')}
                  className="w-full flex items-center justify-between gap-3 mb-3 text-left"
                >
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-600" />
                    المستوى
                  </h3>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-neutral-400 transition-transform duration-200',
                      openFilter === 'level' && 'rotate-180'
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openFilter === 'level' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-wrap gap-2"
                    >
                      {levels.map((level) => (
                        <button
                          key={level.id}
                          onClick={() => onLevelChange(level.value)}
                          className={cn(
                            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                            'border-2',
                            selectedLevel === level.value
                              ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white border-transparent shadow-lg'
                              : 'bg-white/50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-gold-300 dark:hover:border-gold-600'
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span>{level.label}</span>
                            {selectedLevel === level.value && (
                              <Check className="w-4 h-4" />
                            )}
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Price Filter */}
              <div>
                <button
                  onClick={() => toggleFilter('price')}
                  className="w-full flex items-center justify-between gap-3 mb-3 text-left"
                >
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <span className="text-mint-600">💰</span>
                    السعر
                  </h3>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-neutral-400 transition-transform duration-200',
                      openFilter === 'price' && 'rotate-180'
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openFilter === 'price' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      {prices.map((price) => (
                        <button
                          key={price.id}
                          onClick={() => onPriceChange(price.value)}
                          className={cn(
                            'w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-right flex items-center justify-between',
                            'border-2',
                            selectedPrice === price.value
                              ? 'bg-gradient-to-r from-mint-500 to-mint-600 text-white border-transparent shadow-lg'
                              : 'bg-white/50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-mint-300 dark:hover:border-mint-600'
                          )}
                        >
                          <span>{price.label}</span>
                          {selectedPrice === price.value && (
                            <Check className="w-4 h-4" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Duration Filter */}
              <div>
                <button
                  onClick={() => toggleFilter('duration')}
                  className="w-full flex items-center justify-between gap-3 mb-3 text-left"
                >
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <span className="text-accent-600">⏱️</span>
                    المدة
                  </h3>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-neutral-400 transition-transform duration-200',
                      openFilter === 'duration' && 'rotate-180'
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openFilter === 'duration' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      {durations.map((duration) => (
                        <button
                          key={duration.id}
                          onClick={() => onDurationChange(duration.value)}
                          className={cn(
                            'w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-right flex items-center justify-between',
                            'border-2',
                            selectedDuration === duration.value
                              ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white border-transparent shadow-lg'
                              : 'bg-white/50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-accent-300 dark:hover:border-accent-600'
                          )}
                        >
                          <span>{duration.label}</span>
                          {selectedDuration === duration.value && (
                            <Check className="w-4 h-4" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

