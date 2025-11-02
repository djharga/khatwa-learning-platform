'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, BookOpen, FileText, GraduationCap, Library } from 'lucide-react';
import Link from 'next/link';

/**
 * Search Results Page
 * صفحة نتائج البحث
 */

interface SearchResult {
  id: string;
  title: string;
  type: 'course' | 'resource' | 'library' | 'question';
  url: string;
  description?: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      // TODO: Replace with actual search API call
      // Simulating search results
      setTimeout(() => {
        const mockResults: SearchResult[] = [
          {
            id: '1',
            title: 'أساسيات المراجعة الداخلية',
            type: 'course' as const,
            url: '/courses/internal-audit-basics',
            description: 'دورة شاملة في أساسيات المراجعة الداخلية',
          },
          {
            id: '2',
            title: 'دليل المراجعة الداخلية',
            type: 'resource' as const,
            url: '/resources/internal-audit-guide',
            description: 'مرجع شامل لمعايير المراجعة الداخلية',
          },
        ].filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
        );
        
        setResults(mockResults);
        setIsLoading(false);
      }, 500);
    } else {
      setResults([]);
    }
  }, [query]);

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'course':
        return <GraduationCap className="w-5 h-5" />;
      case 'resource':
        return <FileText className="w-5 h-5" />;
      case 'library':
        return <Library className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getResultTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'course':
        return 'كورس';
      case 'resource':
        return 'مورد';
      case 'library':
        return 'مكتبة';
      default:
        return 'عنصر';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              نتائج البحث
            </h1>
          </div>
          {query && (
            <p className="text-gray-600 dark:text-gray-400">
              البحث عن: <span className="font-semibold text-primary-600">{query}</span>
            </p>
          )}
        </motion.div>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">جاري البحث...</p>
          </div>
        ) : query && results.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400">
              لم يتم العثور على نتائج لـ "{query}"
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              جرب البحث بكلمات مختلفة أو استخدم مصطلحات أكثر عمومية
            </p>
          </div>
        ) : !query ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400">
              ابحث عن الكورسات، الموارد، والمواد التعليمية
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={result.url}
                  className="block bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
                      {getResultIcon(result.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {result.title}
                        </h3>
                        <span className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
                          {getResultTypeLabel(result.type)}
                        </span>
                      </div>
                      {result.description && (
                        <p className="text-gray-600 dark:text-gray-400">
                          {result.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
