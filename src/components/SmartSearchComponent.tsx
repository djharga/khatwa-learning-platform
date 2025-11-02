'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  FileText,
  Image,
  Video,
  File,
  Eye,
  Download,
  Clock,
  Hash,
  Save,
  X,
  ChevronDown,
  Calendar,
  BookOpen,
  Target,
  BarChart3,
  FileDown,
  FileSpreadsheet,
} from 'lucide-react';

/**
 * Search result item with metadata and highlighted content
 */
interface SearchResult {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'word' | 'excel' | 'powerpoint' | 'image' | 'video' | 'other';
  course: string;
  axis: string;
  date: string;
  size: string;
  snippet: string;
  highlightedSnippet: string;
  relevance: number;
}

/**
 * Filter options for advanced search
 */
interface SearchFilters {
  fileType: string;
  course: string;
  axis: string;
  dateRange: {
    start: string;
    end: string;
  };
}

/**
 * Recent search item
 */
interface RecentSearch {
  id: string;
  query: string;
  timestamp: string;
  resultCount: number;
}

/**
 * Mock search results data
 */
const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    fileName: 'تقرير المشروع النهائي.pdf',
    fileType: 'pdf',
    course: 'محاسبة متقدمة',
    axis: 'المراجعة المالية',
    date: '2023-10-10',
    size: '2.3 MB',
    snippet: 'يحتوي هذا التقرير على تحليل شامل للمشروع...',
    highlightedSnippet: 'يحتوي هذا التقرير على <mark>تحليل</mark> شامل للمشروع...',
    relevance: 95,
  },
  {
    id: '2',
    fileName: 'عرض تقديمي.pptx',
    fileType: 'powerpoint',
    course: 'إدارة المشاريع',
    axis: 'التخطيط الاستراتيجي',
    date: '2023-10-09',
    size: '15.7 MB',
    snippet: 'العرض يغطي مراحل التخطيط والتنفيذ...',
    highlightedSnippet: 'العرض يغطي مراحل <mark>التخطيط</mark> والتنفيذ...',
    relevance: 88,
  },
  {
    id: '3',
    fileName: 'جدول البيانات.xlsx',
    fileType: 'excel',
    course: 'الإحصاء التطبيقي',
    axis: 'تحليل البيانات',
    date: '2023-10-08',
    size: '1.2 MB',
    snippet: 'البيانات المالية للربع الأخير...',
    highlightedSnippet: 'البيانات المالية للربع الأخير...',
    relevance: 82,
  },
  {
    id: '4',
    fileName: 'وثيقة Word.docx',
    fileType: 'word',
    course: 'القانون التجاري',
    axis: 'العقود والالتزامات',
    date: '2023-10-07',
    size: '856 KB',
    snippet: 'يشرح هذا المستند أنواع العقود المختلفة...',
    highlightedSnippet: 'يشرح هذا المستند أنواع <mark>العقود</mark> المختلفة...',
    relevance: 78,
  },
  {
    id: '5',
    fileName: 'صورة تعليمية.jpg',
    fileType: 'image',
    course: 'التصميم الجرافيكي',
    axis: 'الألوان والتكوين',
    date: '2023-10-06',
    size: '4.1 MB',
    snippet: 'صورة توضيحية لمفهوم التوازن البصري...',
    highlightedSnippet: 'صورة توضيحية لمفهوم التوازن البصري...',
    relevance: 65,
  },
];

/**
 * Mock recent searches data
 */
const mockRecentSearches: RecentSearch[] = [
  {
    id: '1',
    query: 'تحليل مالي',
    timestamp: '2023-10-10T14:30:00',
    resultCount: 12,
  },
  {
    id: '2',
    query: 'عقود تجارية',
    timestamp: '2023-10-09T11:15:00',
    resultCount: 8,
  },
  {
    id: '3',
    query: 'إدارة مشاريع',
    timestamp: '2023-10-08T16:45:00',
    resultCount: 15,
  },
];

/**
 * Mock autocomplete suggestions
 */
const mockSuggestions = [
  'تحليل مالي',
  'عقود تجارية',
  'إدارة مشاريع',
  'مراجعة داخلية',
  'تقارير سنوية',
  'محاسبة',
  'قانون',
  'إحصاء',
];

/**
 * File preview modal component
 */
const FilePreviewModal = ({
  isOpen,
  onClose,
  result,
}: {
  isOpen: boolean;
  onClose: () => void;
  result: SearchResult | null;
}) => (
  <AnimatePresence>
    {isOpen && result && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              معاينة: {result.fileName}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  النوع:
                </span>{' '}
                {result.fileType}
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  الحجم:
                </span>{' '}
                {result.size}
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  الدورة:
                </span>{' '}
                {result.course}
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  المحور:
                </span>{' '}
                {result.axis}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                المحتوى:
              </h4>
              <div
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-gray-800 dark:text-gray-200"
                dangerouslySetInnerHTML={{ __html: result.highlightedSnippet }}
              />
            </div>

            <div className="flex justify-end space-x-2 space-x-reverse">
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                تحميل
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/**
 * Smart search component for files and reports with advanced filtering and highlighting
 */
const SmartSearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    fileType: 'الكل',
    course: 'الكل',
    axis: 'الكل',
    dateRange: { start: '', end: '' },
  });
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(mockRecentSearches);
  const [previewResult, setPreviewResult] = useState<SearchResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const fileTypes = [
    { value: 'الكل', label: 'جميع الأنواع' },
    { value: 'pdf', label: 'PDF' },
    { value: 'word', label: 'Word' },
    { value: 'excel', label: 'Excel' },
    { value: 'powerpoint', label: 'PowerPoint' },
    { value: 'image', label: 'صور' },
    { value: 'video', label: 'فيديوهات' },
  ];

  const courses = [
    { value: 'الكل', label: 'جميع الدورات' },
    { value: 'محاسبة متقدمة', label: 'محاسبة متقدمة' },
    { value: 'إدارة المشاريع', label: 'إدارة المشاريع' },
    { value: 'الإحصاء التطبيقي', label: 'الإحصاء التطبيقي' },
    { value: 'القانون التجاري', label: 'القانون التجاري' },
    { value: 'التصميم الجرافيكي', label: 'التصميم الجرافيكي' },
  ];

  const axes = [
    { value: 'الكل', label: 'جميع المحاور' },
    { value: 'المراجعة المالية', label: 'المراجعة المالية' },
    { value: 'التخطيط الاستراتيجي', label: 'التخطيط الاستراتيجي' },
    { value: 'تحليل البيانات', label: 'تحليل البيانات' },
    { value: 'العقود والالتزامات', label: 'العقود والالتزامات' },
    { value: 'الألوان والتكوين', label: 'الألوان والتكوين' },
  ];

  /**
   * Returns appropriate Lucide icon component based on file type
   */
  const getFileIcon = (type: SearchResult['fileType']) => {
    const iconProps = { className: 'w-5 h-5' };

    switch (type) {
      case 'pdf':
        return <FileText {...iconProps} className="text-red-500" />;
      case 'word':
        return <FileText {...iconProps} className="text-blue-600" />;
      case 'excel':
        return <FileText {...iconProps} className="text-green-600" />;
      case 'powerpoint':
        return <FileText {...iconProps} className="text-orange-500" />;
      case 'image':
        return <Image {...iconProps} className="text-purple-500" />;
      case 'video':
        return <Video {...iconProps} className="text-red-600" />;
      default:
        return <File {...iconProps} className="text-gray-500" />;
    }
  };

  /**
   * Performs search with filters and updates results
   */
  const performSearch = async (query: string) => {
    setIsSearching(true);
    const startTime = Date.now();

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredResults = mockSearchResults.filter(result => {
      const matchesQuery = query === '' || 
        result.fileName.toLowerCase().includes(query.toLowerCase()) ||
        result.snippet.toLowerCase().includes(query.toLowerCase());
      
      const matchesType = filters.fileType === 'الكل' || result.fileType === filters.fileType;
      const matchesCourse = filters.course === 'الكل' || result.course === filters.course;
      const matchesAxis = filters.axis === 'الكل' || result.axis === filters.axis;
      
      const matchesDate = (!filters.dateRange.start || result.date >= filters.dateRange.start) &&
                         (!filters.dateRange.end || result.date <= filters.dateRange.end);

      return matchesQuery && matchesType && matchesCourse && matchesAxis && matchesDate;
    });

    // Sort by relevance
    filteredResults.sort((a, b) => b.relevance - a.relevance);

    // Highlight search terms
    if (query) {
      filteredResults = filteredResults.map(result => ({
        ...result,
        highlightedSnippet: result.snippet.replace(
          new RegExp(`(${query})`, 'gi'),
          '<mark>$1</mark>'
        ),
      }));
    }

    setResults(filteredResults);
    setSearchTime(Date.now() - startTime);
    setIsSearching(false);

    // Save to recent searches
    if (query && filteredResults.length > 0) {
      const newRecent: RecentSearch = {
        id: Date.now().toString(),
        query,
        timestamp: new Date().toISOString(),
        resultCount: filteredResults.length,
      };
      setRecentSearches(prev => [newRecent, ...prev.slice(0, 4)]);
    }
  };

  /**
   * Handles search input changes and shows suggestions
   */
  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    
    if (value.length > 0) {
      const filteredSuggestions = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  /**
   * Handles search submission
   */
  const handleSearch = () => {
    performSearch(searchQuery);
    setShowSuggestions(false);
  };

  /**
   * Handles suggestion selection
   */
  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    performSearch(suggestion);
  };

  /**
   * Exports search results to CSV
   */
  const exportToCSV = () => {
    const csvContent = [
      ['اسم الملف', 'النوع', 'الدورة', 'المحور', 'التاريخ', 'الحجم', 'المحتوى'],
      ...results.map(result => [
        result.fileName,
        result.fileType,
        result.course,
        result.axis,
        result.date,
        result.size,
        result.snippet,
      ]),
    ]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'search_results.csv';
    link.click();
  };

  /**
   * Exports search results to PDF (mock implementation)
   */
  const exportToPDF = () => {
    alert('تصدير إلى PDF - هذه ميزة محاكاة');
  };

  /**
   * Opens file preview
   */
  const openPreview = (result: SearchResult) => {
    setPreviewResult(result);
    setShowPreview(true);
  };

  useEffect(() => {
    // Initial search on component mount
    performSearch('');
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              البحث الذكي
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              ابحث داخل الملفات والتقارير بكفاءة عالية
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث في الملفات والتقارير..."
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-3 bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition-colors text-sm"
            >
              بحث
            </button>
          </div>

          {/* Autocomplete Suggestions */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 mt-1"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => selectSuggestion(suggestion)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filters Toggle */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Filter className="w-4 h-4 mr-2" />
            فلاتر متقدمة
            <ChevronDown className={`w-4 h-4 mr-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={exportToCSV}
              disabled={results.length === 0}
              className="flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <FileSpreadsheet className="w-4 h-4 mr-1" />
              CSV
            </button>
            <button
              onClick={exportToPDF}
              disabled={results.length === 0}
              className="flex items-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <FileDown className="w-4 h-4 mr-1" />
              PDF
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    نوع الملف
                  </label>
                  <select
                    value={filters.fileType}
                    onChange={(e) => setFilters(prev => ({ ...prev, fileType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {fileTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    الدورة
                  </label>
                  <select
                    value={filters.course}
                    onChange={(e) => setFilters(prev => ({ ...prev, course: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {courses.map((course) => (
                      <option key={course.value} value={course.value}>
                        {course.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    المحور
                  </label>
                  <select
                    value={filters.axis}
                    onChange={(e) => setFilters(prev => ({ ...prev, axis: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {axes.map((axis) => (
                      <option key={axis.value} value={axis.value}>
                        {axis.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    نطاق التاريخ
                  </label>
                  <div className="flex space-x-2 space-x-reverse">
                    <input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) => setFilters(prev => ({ ...prev, dateRange: { ...prev.dateRange, start: e.target.value } }))}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) => setFilters(prev => ({ ...prev, dateRange: { ...prev.dateRange, end: e.target.value } }))}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Search Statistics */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 space-x-reverse">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Hash className="w-4 h-4 mr-2" />
              {results.length} نتيجة
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4 mr-2" />
              {searchTime}ms
            </div>
          </div>

          {recentSearches.length > 0 && (
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-sm text-gray-600 dark:text-gray-300">عمليات البحث الأخيرة:</span>
              {recentSearches.slice(0, 3).map((search) => (
                <button
                  key={search.id}
                  onClick={() => selectSuggestion(search.query)}
                  className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {search.query}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="p-6">
        {isSearching ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">جاري البحث...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => openPreview(result)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 space-x-reverse flex-1">
                    {getFileIcon(result.fileType)}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {result.fileName}
                      </h3>
                      <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span>{result.course}</span>
                        <span>{result.axis}</span>
                        <span>{result.date}</span>
                        <span>{result.size}</span>
                      </div>
                      <div
                        className="text-gray-700 dark:text-gray-300"
                        dangerouslySetInnerHTML={{ __html: result.highlightedSnippet }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              لا توجد نتائج
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              جرب تعديل كلمات البحث أو الفلاتر
            </p>
          </div>
        )}
      </div>

      <FilePreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        result={previewResult}
      />
    </div>
  );
};

export default SmartSearchComponent;