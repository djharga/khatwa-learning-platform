/**
 * Sample report data for ReportsComponent including initial reports, file categories, and status options.
 * Used for demonstration purposes - replace with API integration in production.
 */

export interface Report {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
  isNew?: boolean;
  category: string;
  fileSize?: string;
  comments: number;
  views: number;
}

export const initialReports: Report[] = [
  {
    id: '1',
    title: 'تقرير الأداء الربع سنوي',
    description: 'تحليل شامل للأداء المالي والتشغيلي للربع الثالث',
    author: 'أحمد محمد',
    createdAt: '2023-10-01',
    updatedAt: '2023-10-05',
    status: 'published',
    isNew: true,
    category: 'مالية',
    fileSize: '2.3 MB',
    comments: 5,
    views: 24,
  },
  {
    id: '2',
    title: 'تقرير التسويق الرقمي',
    description: 'تحليل حملات التسويق الرقمي ومعدلات التحويل',
    author: 'فاطمة علي',
    createdAt: '2023-09-28',
    updatedAt: '2023-09-30',
    status: 'published',
    category: 'تسويق',
    fileSize: '1.8 MB',
    comments: 3,
    views: 18,
  },
  {
    id: '3',
    title: 'تقرير الموارد البشرية',
    description: 'تحليل رضا الموظفين ومعدلات الاحتفاظ',
    author: 'محمد حسن',
    createdAt: '2023-09-25',
    updatedAt: '2023-09-27',
    status: 'draft',
    category: 'موارد بشرية',
    fileSize: '956 KB',
    comments: 1,
    views: 7,
  },
  {
    id: '4',
    title: 'تقرير البحث والتطوير',
    description: 'نظرة على المشاريع البحثية الجديدة والابتكارات',
    author: 'سارة أحمد',
    createdAt: '2023-09-20',
    updatedAt: '2023-09-22',
    status: 'published',
    category: 'بحث وتطوير',
    fileSize: '3.1 MB',
    comments: 7,
    views: 31,
  },
];

export const fileCategories = ['الكل', 'مالية', 'تسويق', 'موارد بشرية', 'بحث وتطوير', 'عام'];

export const fileStatuses = ['الكل', 'draft', 'published', 'archived'];