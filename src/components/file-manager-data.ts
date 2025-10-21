/**
 * File manager data including initial files and file type filter options.
 * Used for demonstration purposes - replace with API integration in production.
 */

interface FileItem {
  id: string;
  name: string;
  type:
    | 'document'
    | 'image'
    | 'video'
    | 'pdf'
    | 'word'
    | 'excel'
    | 'powerpoint'
    | 'other';
  size: string;
  modified: string;
  owner: string;
  starred: boolean;
  shared: boolean;
  thumbnail?: string;
}

interface FileTypeOption {
  value: string;
  label: string;
}

export const initialFiles: FileItem[] = [
  {
    id: '1',
    name: 'تقرير المشروع النهائي.pdf',
    type: 'pdf',
    size: '2.3 MB',
    modified: '2023-10-10',
    owner: 'أنت',
    starred: true,
    shared: false,
  },
  {
    id: '2',
    name: 'عرض تقديمي.pptx',
    type: 'powerpoint',
    size: '15.7 MB',
    modified: '2023-10-09',
    owner: 'أنت',
    starred: false,
    shared: true,
  },
  {
    id: '3',
    name: 'جدول البيانات.xlsx',
    type: 'excel',
    size: '1.2 MB',
    modified: '2023-10-08',
    owner: 'أنت',
    starred: false,
    shared: false,
  },
  {
    id: '4',
    name: 'وثيقة Word.docx',
    type: 'word',
    size: '856 KB',
    modified: '2023-10-07',
    owner: 'أنت',
    starred: true,
    shared: true,
  },
  {
    id: '5',
    name: 'صورة تعليمية.jpg',
    type: 'image',
    size: '4.1 MB',
    modified: '2023-10-06',
    owner: 'أنت',
    starred: false,
    shared: false,
    thumbnail: '/api/placeholder/150/150',
  },
  {
    id: '6',
    name: 'فيديو تعليمي.mp4',
    type: 'video',
    size: '45.2 MB',
    modified: '2023-10-05',
    owner: 'أنت',
    starred: false,
    shared: true,
  },
];

export const fileTypes: FileTypeOption[] = [
  { value: 'الكل', label: 'جميع الملفات' },
  { value: 'document', label: 'وثائق' },
  { value: 'pdf', label: 'PDF' },
  { value: 'word', label: 'Word' },
  { value: 'excel', label: 'Excel' },
  { value: 'powerpoint', label: 'PowerPoint' },
  { value: 'image', label: 'صور' },
  { value: 'video', label: 'فيديوهات' },
];