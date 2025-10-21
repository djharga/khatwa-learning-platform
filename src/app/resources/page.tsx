'use client';

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
import { SearchIcon, ArrowLeft } from 'lucide-react';

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
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Header - العنوان الرئيسي والوصف */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            المكتبة والمصادر
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            مجموعة شاملة من الموارد التعليمية والمراجع المهنية للمراجعين
            الداخليين
          </p>
        </motion.div>

        {/* 2. Search Bar - شريط البحث (أداة مهمة للمستخدم) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث في الموارد..."
              className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* 3. Resources Grid - شبكة الموارد (المحتوى الرئيسي) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-blue-600 mr-4">
                      <resource.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {resource.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">{resource.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={resource.downloadUrl}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                  >
                    <span>عرض المورد</span>
                    <ArrowLeft className="w-4 h-4 mr-2 transform rotate-180" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 4. Categories - أزرار الفئات (أدوات التصفية) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {category}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ResourcesPage;
