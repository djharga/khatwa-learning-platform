'use client';

import { motion } from 'framer-motion';
import {
  Filter,
  Video,
  Music,
  FileText,
  FileSpreadsheet,
  File,
  Search,
  X,
} from 'lucide-react';
import { useState } from 'react';

/**
 * Content Filters Component - فلاتر البحث حسب نوع المحتوى
 * يدعم: فيديو، صوت، PDF، Word، Excel
 */

export type ContentType = 'all' | 'video' | 'audio' | 'pdf' | 'word' | 'excel' | 'other';

interface ContentFiltersProps {
  onFilterChange?: (type: ContentType) => void;
  onSearchChange?: (search: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
}

const ContentFilters = ({
  onFilterChange,
  onSearchChange,
  searchPlaceholder = 'ابحث في المحتوى...',
  showSearch = true,
}: ContentFiltersProps) => {
  const [activeFilter, setActiveFilter] = useState<ContentType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filterOptions = [
    { type: 'all' as ContentType, label: 'الكل', icon: File, count: null },
    { type: 'video' as ContentType, label: 'فيديو', icon: Video, count: null },
    { type: 'audio' as ContentType, label: 'صوت', icon: Music, count: null },
    { type: 'pdf' as ContentType, label: 'PDF', icon: FileText, count: null },
    { type: 'word' as ContentType, label: 'Word', icon: FileText, count: null },
    { type: 'excel' as ContentType, label: 'Excel', icon: FileSpreadsheet, count: null },
    { type: 'other' as ContentType, label: 'أخرى', icon: File, count: null },
  ];

  const handleFilterClick = (type: ContentType) => {
    setActiveFilter(type);
    onFilterChange?.(type);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearchChange?.('');
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6 mb-6">
      {/* Search Bar */}
      {showSearch && (
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pr-10 pl-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Filter Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          <Filter className="w-4 h-4" />
          <span>فلترة:</span>
        </div>
        
        {filterOptions.map((filter, index) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.type;
          
          return (
            <motion.button
              key={filter.type}
              onClick={() => handleFilterClick(filter.type)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{filter.label}</span>
              {filter.count !== null && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-neutral-200 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-300'
                }`}>
                  {filter.count}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ContentFilters;

