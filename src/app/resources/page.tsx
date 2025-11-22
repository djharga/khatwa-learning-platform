'use client';

import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MotionWrapper } from '@/components/ui/motion/MotionWrapper';
import {
  FileText,
  DollarSign,
  Calculator,
  TrendingUp,
  BookOpen,
  Users,
  Download,
  ExternalLink,
  Search,
  Filter,
  Grid,
  List,
  Star,
  Clock,
  Eye,
  Award,
  Sparkles,
  ChevronRight,
  Library,
  FileSpreadsheet,
  Video,
  Music,
  File,
  Tag,
  Calendar,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import PageBackground from '@/components/ui/PageBackground';
import { ScrollAnimation } from '@/components/ui';
import { ShimmerSkeletonScreen } from '@/components/ui/Skeleton';

// Lazy load heavy components
const UnifiedFileCard = dynamic(() => import('@/components/ui/UnifiedFileCard').then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 shadow-sm">
      <div className="animate-pulse space-y-3">
        <div className="bg-neutral-200 dark:bg-neutral-700 h-4 w-3/4 rounded" />
        <div className="bg-neutral-200 dark:bg-neutral-700 h-4 w-1/2 rounded" />
        <div className="bg-neutral-200 dark:bg-neutral-700 h-32 w-full rounded-lg" />
      </div>
    </div>
  ),
});

const ContentFilters = dynamic(() => import('@/components/ui/ContentFilters').then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => (
    <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
      <div className="animate-pulse space-y-2">
        <div className="bg-neutral-200 dark:bg-neutral-700 h-4 w-24 rounded" />
        <div className="flex gap-2">
          <div className="bg-neutral-200 dark:bg-neutral-700 h-8 w-16 rounded" />
          <div className="bg-neutral-200 dark:bg-neutral-700 h-8 w-20 rounded" />
          <div className="bg-neutral-200 dark:bg-neutral-700 h-8 w-18 rounded" />
        </div>
      </div>
    </div>
  ),
});

import type { UnifiedFile, FileType } from '@/components/ui/UnifiedFileCard';
import type { CourseContent } from '@/types/course-management';
import type { ContentType } from '@/components/ui/ContentFilters';

interface LocalResource {
  id: string;
  title: string;
  description: string;
  category: string;
  fileSize: string;
  downloadUrl: string;
  icon: any;
  tags: string[];
  downloads?: number;
  views?: number;
  rating?: number;
  uploadedAt?: string;
  featured?: boolean;
}

interface ExternalLink {
  id: string;
  title: string;
  url: string;
  description: string;
  category?: string;
}

const sampleResources: LocalResource[] = [
  {
    id: '1',
    title: 'قالب تقرير المراجعة الداخلية',
    description: 'قالب شامل ومهني لإعداد تقارير المراجعة الداخلية وفق المعايير الدولية',
    category: 'templates',
    fileSize: '2.5 MB',
    downloadUrl: '/resources/audit-report-template.docx',
    icon: FileText,
    tags: ['مراجعة داخلية', 'تقارير', 'معايير دولية'],
    downloads: 1250,
    views: 3200,
    rating: 4.8,
    uploadedAt: '2024-01-15',
    featured: true,
  },
  {
    id: '2',
    title: 'أداة تقييم المخاطر المتقدمة',
    description: 'جدول بيانات تفاعلي شامل لتقييم وتحليل المخاطر المالية والتشغيلية',
    category: 'tools',
    fileSize: '1.8 MB',
    downloadUrl: '/resources/risk-assessment-tool.xlsx',
    icon: Calculator,
    tags: ['مخاطر', 'تحليل', 'تقييم'],
    downloads: 890,
    views: 2100,
    rating: 4.6,
    uploadedAt: '2024-02-01',
    featured: true,
  },
  {
    id: '3',
    title: 'دليل المحاسبة المالية الشامل',
    description: 'مرجع شامل ومفصل لمعايير المحاسبة المالية الدولية IFRS',
    category: 'documents',
    fileSize: '15 MB',
    downloadUrl: '/resources/financial-accounting-guide.pdf',
    icon: BookOpen,
    tags: ['محاسبة مالية', 'IFRS', 'معايير'],
    downloads: 2100,
    views: 5600,
    rating: 4.9,
    uploadedAt: '2023-12-10',
    featured: true,
  },
  {
    id: '4',
    title: 'قالب ميزانية عمومية احترافية',
    description: 'قالب جاهز ومحترف لإعداد الميزانيات العمومية وفق المعايير المحاسبية',
    category: 'templates',
    fileSize: '850 KB',
    downloadUrl: '/resources/balance-sheet-template.xlsx',
    icon: TrendingUp,
    tags: ['ميزانية', 'عمومية', 'قوالب'],
    downloads: 750,
    views: 1800,
    rating: 4.5,
    uploadedAt: '2024-01-20',
  },
  {
    id: '5',
    title: 'أداة تحليل التدفق النقدي',
    description: 'أداة متقدمة لتحليل وتوقع التدفقات النقدية مع نماذج توقعات ذكية',
    category: 'tools',
    fileSize: '3.2 MB',
    downloadUrl: '/resources/cashflow-analysis-tool.xlsx',
    icon: DollarSign,
    tags: ['تدفق نقدي', 'تحليل', 'توقعات'],
    downloads: 1100,
    views: 2800,
    rating: 4.7,
    uploadedAt: '2024-02-15',
  },
  {
    id: '6',
    title: 'قائمة تدقيق الامتثال الشاملة',
    description: 'قائمة شاملة ومنظمة لتدقيق الامتثال التنظيمي والمعايير الدولية',
    category: 'documents',
    fileSize: '1.2 MB',
    downloadUrl: '/resources/compliance-checklist.pdf',
    icon: Users,
    tags: ['امتثال', 'تدقيق', 'معايير'],
    downloads: 650,
    views: 1500,
    rating: 4.4,
    uploadedAt: '2024-01-05',
  },
  {
    id: '7',
    title: 'دليل إعداد التقارير المالية',
    description: 'دليل شامل لإعداد التقارير المالية وفق معايير IFRS و GAAP',
    category: 'documents',
    fileSize: '8.5 MB',
    downloadUrl: '/resources/financial-reporting-guide.pdf',
    icon: FileText,
    tags: ['تقارير مالية', 'IFRS', 'GAAP'],
    downloads: 980,
    views: 2400,
    rating: 4.8,
    uploadedAt: '2024-02-10',
  },
  {
    id: '8',
    title: 'قالب خطة المراجعة السنوية',
    description: 'قالب احترافي لإعداد خطة المراجعة الداخلية السنوية',
    category: 'templates',
    fileSize: '1.5 MB',
    downloadUrl: '/resources/annual-audit-plan-template.docx',
    icon: Calendar,
    tags: ['مراجعة', 'تخطيط', 'سنوي'],
    downloads: 720,
    views: 1900,
    rating: 4.6,
    uploadedAt: '2024-01-25',
  },
];

const sampleExternalLinks: ExternalLink[] = [
  {
    id: '1',
    title: 'معهد المدققين الداخليين',
    url: 'https://www.theiia.org',
    description: 'الموقع الرسمي لمعهد المدققين الداخليين العالمي - IIA',
    category: 'منظمات',
  },
  {
    id: '2',
    title: 'مجلس معايير المحاسبة المالية',
    url: 'https://www.fasb.org',
    description: 'مصدر رسمي لمعايير المحاسبة المالية الأمريكية FASB',
    category: 'معايير',
  },
  {
    id: '3',
    title: 'المنظمة الدولية للمعايير المحاسبية',
    url: 'https://www.ifrs.org',
    description: 'المعايير الدولية للتقارير المالية IFRS',
    category: 'معايير',
  },
  {
    id: '4',
    title: 'اتحاد المحاسبين القانونيين',
    url: 'https://www.accaglobal.com',
    description: 'مصادر تعليمية وشهادات مهنية في المحاسبة',
    category: 'تعليم',
  },
  {
    id: '5',
    title: 'معهد المحاسبين الإداريين',
    url: 'https://www.imanet.org',
    description: 'موارد في المحاسبة الإدارية والتحليل المالي',
    category: 'تعليم',
  },
];

const categories = {
  templates: { label: 'قوالب العمل', icon: FileText, color: 'blue', count: 3 },
  tools: { label: 'أدوات المراجعة', icon: Calculator, color: 'green', count: 2 },
  documents: { label: 'مستندات مرجعية', icon: BookOpen, color: 'purple', count: 3 },
};

const ResourcesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContentType, setSelectedContentType] = useState<ContentType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'rating' | 'name'>('recent');

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Convert resources to unified files format
  const unifiedResources = useMemo<UnifiedFile[]>(() => {
    return sampleResources.map(resource => {
      let type: FileType = 'other';
      
      if (resource.downloadUrl.includes('.pdf')) type = 'pdf';
      else if (resource.downloadUrl.includes('.docx') || resource.downloadUrl.includes('.doc')) type = 'word';
      else if (resource.downloadUrl.includes('.xlsx') || resource.downloadUrl.includes('.xls')) type = 'excel';
      else if (resource.downloadUrl.includes('.mp4') || resource.downloadUrl.includes('.mp3') || resource.downloadUrl.includes('.avi')) {
        type = resource.downloadUrl.includes('.mp3') ? 'audio' : 'video';
      }
      
      return {
        id: resource.id,
        name: resource.title,
        type,
        size: resource.fileSize,
        description: resource.description,
        url: resource.downloadUrl,
        tags: resource.tags,
        downloads: resource.downloads,
        views: resource.views,
        uploadedAt: resource.uploadedAt,
      } as UnifiedFile;
    });
  }, []);

  // Filter and sort resources
  const filteredAndSortedResources = useMemo(() => {
    let filtered = unifiedResources;
    
    // Filter by content type
    if (selectedContentType !== 'all') {
      filtered = filtered.filter(r => {
        if (selectedContentType === 'pdf') return r.type === 'pdf';
        if (selectedContentType === 'word') return r.type === 'word';
        if (selectedContentType === 'excel') return r.type === 'excel';
        if (selectedContentType === 'video') return r.type === 'video';
        if (selectedContentType === 'audio') return r.type === 'audio';
        return r.type === 'other';
      });
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      const resource = sampleResources.find(r => r.id === filtered[0]?.id);
      filtered = filtered.filter((r, index) => {
        const originalResource = sampleResources.find(orig => orig.id === r.id);
        return originalResource?.category === selectedCategory;
      });
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.tags && r.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.downloads || 0) - (a.downloads || 0);
        case 'rating': {
          const aRating = sampleResources.find(r => r.id === a.id)?.rating || 0;
          const bRating = sampleResources.find(r => r.id === b.id)?.rating || 0;
          return bRating - aRating;
        }
        case 'name':
          return a.name.localeCompare(b.name, 'ar');
        case 'recent':
        default: {
          const aDate = new Date(a.uploadedAt || 0).getTime();
          const bDate = new Date(b.uploadedAt || 0).getTime();
          return bDate - aDate;
        }
      }
    });
    
    return filtered;
  }, [unifiedResources, selectedContentType, selectedCategory, searchTerm, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      total: unifiedResources.length,
      totalDownloads: unifiedResources.reduce((sum, r) => sum + (r.downloads || 0), 0),
      totalViews: unifiedResources.reduce((sum, r) => sum + (r.views || 0), 0),
      featured: sampleResources.filter(r => r.featured).length,
    };
  }, [unifiedResources]);

  // Loading state
  if (isLoading) {
    return (
      <PageBackground variant="resources">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <ScrollAnimation direction="up" delay={0.1}>
            <div className="text-center mb-8">
              <div className="animate-pulse bg-neutral-200 dark:bg-neutral-700 h-8 w-48 rounded-lg mx-auto mb-2" />
              <div className="animate-pulse bg-neutral-200 dark:bg-neutral-700 h-4 w-64 rounded-lg mx-auto" />
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={0.2}>
            <ShimmerSkeletonScreen variant="cards" count={6} />
          </ScrollAnimation>
        </div>
      </PageBackground>
    );
  }

  return (
    <PageBackground variant="resources">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <MotionWrapper
          animation="slideDown"
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
            <Library className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            المكتبة والمصادر
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            مجموعة شاملة من الموارد التعليمية والمراجع المهنية للمراجعين الداخليين والمحاسبين
          </p>

          {/* Statistics Cards */}
          <MotionWrapper stagger staggerDelay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-neutral-700">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">إجمالي الموارد</div>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-neutral-700">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.totalDownloads.toLocaleString()}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">تحميل</div>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-neutral-700">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.totalViews.toLocaleString()}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">مشاهدة</div>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-neutral-700">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.featured}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">مميز</div>
            </div>
          </MotionWrapper>
        </MotionWrapper>

        {/* Filters and Controls */}
        <MotionWrapper
          animation="fade"
          delay={0.2}
          className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-neutral-700/50 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث في الموارد..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 bg-gray-50 dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-out"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ease-out ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600'
                }`}
              >
                الكل
              </button>
              {Object.entries(categories).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ease-out flex items-center gap-2 ${
                    selectedCategory === key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>

            {/* Sort and View */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-gray-50 dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">الأحدث</option>
                <option value="popular">الأكثر تحميلاً</option>
                <option value="rating">الأعلى تقييماً</option>
                <option value="name">حسب الاسم</option>
              </select>

              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ease-out ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>

              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ease-out ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Type Filters */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
            <ContentFilters
              onFilterChange={setSelectedContentType}
              onSearchChange={() => {}}
              searchPlaceholder=""
              showSearch={false}
            />
          </div>
        </MotionWrapper>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Resources Grid */}
          <div className="lg:col-span-3">
            {filteredAndSortedResources.length > 0 ? (
              <MotionWrapper
                animation="fade"
                stagger
                staggerDelay={0.05}
                className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch'
                  : 'space-y-4'
                }
              >
                {filteredAndSortedResources.map((file, index) => {
                    const resource = sampleResources.find(r => r.id === file.id);
                    return (
                      <div
                        key={file.id}
                        className={viewMode === 'list' ? 'flex gap-4' : viewMode === 'grid' ? 'h-full' : ''}
                      >
                        <div className={viewMode === 'list' ? 'flex-1' : viewMode === 'grid' ? 'h-full flex flex-col' : ''}>
                          <UnifiedFileCard
                            file={file}
                            index={index}
                            onOpen={(f) => {
                              const url = 'url' in f ? f.url : (f as CourseContent).fileUrl;
                              if (url) window.open(url, '_blank');
                            }}
                            onDownload={(f) => {
                              const url = 'url' in f ? f.url : (f as CourseContent).fileUrl;
                              const name = 'name' in f ? f.name : (f as CourseContent).title;
                              if (url) {
                                const link = document.createElement('a');
                                link.href = url;
                                link.download = name;
                                link.click();
                              }
                            }}
                          />
                        </div>
                        {viewMode === 'list' && resource && (
                          <div className="flex flex-col gap-2 min-w-[200px]">
                            {resource.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm font-medium">{resource.rating}</span>
                              </div>
                            )}
                            {resource.downloads && (
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Download className="w-4 h-4" />
                                <span>{resource.downloads.toLocaleString()}</span>
                              </div>
                            )}
                            {resource.views && (
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Eye className="w-4 h-4" />
                                <span>{resource.views.toLocaleString()}</span>
                              </div>
                            )}
                            {resource.featured && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded text-xs font-medium">
                                <Sparkles className="w-3 h-3" />
                                مميز
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </MotionWrapper>
            ) : (
              <MotionWrapper
                animation="fade"
                className="text-center py-16 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-gray-200 dark:border-neutral-700"
              >
                <File className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  لم يتم العثور على موارد
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  جرب تغيير معايير البحث أو الفلاتر
                </p>
              </MotionWrapper>
            )}
          </div>

          {/* Sidebar - External Links */}
          <MotionWrapper
            animation="fade"
            delay={0.3}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-neutral-700/50 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <ExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  مصادر إضافية موصى بها
                </h3>
              </div>
              <MotionWrapper stagger staggerDelay={0.1} className="space-y-4">
                {sampleExternalLinks.map((link, index) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-gray-200 dark:border-neutral-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg hover:-translate-x-1 transition-all duration-300 ease-out bg-gradient-to-r from-white to-gray-50 dark:from-neutral-800 dark:to-neutral-700"
                  >
                    <div className="flex items-start gap-3">
                      <ExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                          {link.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                          {link.description}
                        </p>
                        {link.category && (
                          <span className="inline-block mt-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs">
                            {link.category}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    </div>
                  </a>
                ))}
              </MotionWrapper>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </PageBackground>
  );
};

export default ResourcesPage;
