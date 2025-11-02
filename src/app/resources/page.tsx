'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ResourcesComponent, {
  Resource,
  ExternalLink,
} from '../../components/ResourcesComponent';
import {
  FileText,
  DollarSign,
  Calculator,
  TrendingUp,
  BookOpen,
  Users,
} from 'lucide-react';
import UnifiedFileCard, { UnifiedFile, FileType } from '@/components/ui/UnifiedFileCard';
import ContentFilters, { ContentType } from '@/components/ui/ContentFilters';

interface LocalResource {
  id: string;
  title: string;
  description: string;
  category: string;
  fileSize: string;
  downloadUrl: string;
  icon: any;
  tags: string[];
}

const sampleResources: LocalResource[] = [
  {
    id: '1',
    title: 'قالب تقرير المراجعة الداخلية',
    description: 'قالب شامل لإعداد تقارير المراجعة الداخلية المهنية',
    category: 'templates',
    fileSize: '2.5 MB',
    downloadUrl: '/resources/audit-report-template.docx',
    icon: FileText,
    tags: ['مراجعة داخلية', 'تقارير'],
  },
  {
    id: '2',
    title: 'أداة تقييم المخاطر',
    description: 'جدول بيانات تفاعلي لتقييم وتحليل المخاطر',
    category: 'tools',
    fileSize: '1.8 MB',
    downloadUrl: '/resources/risk-assessment-tool.xlsx',
    icon: Calculator,
    tags: ['مخاطر', 'تحليل'],
  },
  {
    id: '3',
    title: 'دليل المحاسبة المالية',
    description: 'مرجع شامل لمعايير المحاسبة المالية الدولية',
    category: 'documents',
    fileSize: '15 MB',
    downloadUrl: '/resources/financial-accounting-guide.pdf',
    icon: BookOpen,
    tags: ['محاسبة مالية', 'معايير'],
  },
  {
    id: '4',
    title: 'قالب ميزانية عمومية',
    description: 'قالب جاهز لإعداد الميزانيات العمومية',
    category: 'templates',
    fileSize: '850 KB',
    downloadUrl: '/resources/balance-sheet-template.xlsx',
    icon: TrendingUp,
    tags: ['ميزانية', 'عمومية'],
  },
  {
    id: '5',
    title: 'أداة تحليل التدفق النقدي',
    description: 'أداة متقدمة لتحليل وتوقع التدفقات النقدية',
    category: 'tools',
    fileSize: '3.2 MB',
    downloadUrl: '/resources/cashflow-analysis-tool.xlsx',
    icon: DollarSign,
    tags: ['تدفق نقدي', 'تحليل'],
  },
  {
    id: '6',
    title: 'قائمة تدقيق الامتثال',
    description: 'قائمة شاملة لتدقيق الامتثال التنظيمي',
    category: 'documents',
    fileSize: '1.2 MB',
    downloadUrl: '/resources/compliance-checklist.pdf',
    icon: Users,
    tags: ['امتثال', 'تدقيق'],
  },
];

const sampleExternalLinks: ExternalLink[] = [
  {
    id: '1',
    title: 'معهد المدققين الداخليين',
    url: 'https://www.theiia.org',
    description: 'الموقع الرسمي لمعهد المدققين الداخليين العالمي',
  },
  {
    id: '2',
    title: 'مجلس معايير المحاسبة المالية',
    url: 'https://www.fasb.org',
    description: 'مصدر رسمي لمعايير المحاسبة المالية الأمريكية',
  },
  {
    id: '3',
    title: 'المنظمة الدولية للمعايير المحاسبية',
    url: 'https://www.ifrs.org',
    description: 'المعايير الدولية للتقارير المالية',
  },
  {
    id: '4',
    title: 'اتحاد المحاسبين القانونيين',
    url: 'https://www.accaglobal.com',
    description: 'مصادر تعليمية وشهادات مهنية في المحاسبة',
  },
];

const categories = ['templates', 'tools', 'documents'];

const ResourcesPage = () => {
  const [selectedContentType, setSelectedContentType] = useState<ContentType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Convert resources to unified files format
  const unifiedResources = useMemo<UnifiedFile[]>(() => {
    return sampleResources.map(resource => {
      let type: FileType = 'other';
      
      // Determine file type from URL
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
      } as UnifiedFile;
    });
  }, []);

  // Filter resources
  const filteredResources = useMemo(() => {
    let filtered = unifiedResources;
    
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
    
    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filtered;
  }, [unifiedResources, selectedContentType, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            المكتبة والمصادر
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            مجموعة شاملة من الموارد التعليمية والمراجع المهنية للمراجعين الداخليين
          </p>
        </motion.div>

        {/* 2. Content Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <ContentFilters
            onFilterChange={setSelectedContentType}
            onSearchChange={setSearchTerm}
            searchPlaceholder="ابحث في الموارد..."
          />
        </motion.div>

        {/* 3. Resources Grid - Using Unified Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredResources.map((file, index) => (
                <UnifiedFileCard
                  key={file.id}
                  file={file}
                  index={index}
                  onOpen={(f) => {
                    if (f.url) window.open(f.url, '_blank');
                  }}
                  onDownload={(f) => {
                    if (f.url) {
                      const link = document.createElement('a');
                      link.href = f.url;
                      link.download = f.name;
                      link.click();
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                لم يتم العثور على موارد تطابق البحث
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResourcesPage;
