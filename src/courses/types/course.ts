// Course Types and Interfaces
export type CourseLevel = 'مبتدئ' | 'متوسط' | 'متقدم';
export type CourseStatus = 'نشط' | 'مكتمل' | 'قيد المراجعة' | 'معتمد' | 'مرفوض';
export type FileType =
  | 'folder'
  | 'video'
  | 'document'
  | 'image'
  | 'presentation'
  | 'word'
  | 'excel'
  | 'pdf'
  | 'audio'
  | 'powerpoint';

export type CertificateType = 'مشاركة' | 'إتمام' | 'امتياز';

export type CourseCategory =
  | 'المراجعة الداخلية'
  | 'المعايير المحاسبية'
  | 'الضرائب والتقارير المالية'
  | 'التحليل المالي'
  | 'إدارة المخاطر'
  | 'الامتثال والرقابة'
  | 'برمجة'
  | 'تطوير الويب'
  | 'قواعد البيانات'
  | 'ذكاء اصطناعي'
  | 'أمان المعلومات'
  | 'تصميم'
  | 'إدارة العمليات'
  | 'التسويات المصرفية'
  | 'إدارة المخزون'
  | 'التقارير المالية'
  | 'إدارة المشتريات'
  | 'التأسيس المالي';

export interface CourseFile {
  id: string;
  name: string;
  type: FileType;
  size?: string;
  duration?: string;
  isLocked?: boolean;
  isCompleted?: boolean;
  isNew?: boolean;
  isModified?: boolean;
  lastModified?: string;
  uploadCost?: number;
  canEdit?: boolean;
  children?: CourseFile[];
  thumbnail?: string;
  downloadUrl?: string;
  previewUrl?: string;
}

export interface CourseInstructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  students: number;
  courses: number;
  bio: string;
  email?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface CourseCertificate {
  earned: boolean;
  earnedDate?: string;
  type: CertificateType;
  title?: string;
  description?: string;
  validity?: string;
  downloadUrl?: string;
}

export interface CourseReview {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  comment: string;
  helpful?: number;
  verified?: boolean;
}

export interface Lesson {
  title: string;
  duration: string;
}

export interface CourseCurriculum {
  title: string;
  lessons: (string | Lesson)[];
  duration?: string;
  isCompleted?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: CourseInstructor;
  level: CourseLevel;
  category: CourseCategory;
  duration: string;
  students: number;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  image: string;
  thumbnail?: string;
  filesCount: number;
  isOngoing: boolean;
  status?: CourseStatus;
  progress?: number;
  lastActivity?: string;
  files?: CourseFile[];
  totalFiles?: number;
  completedFiles?: number;
  certificate?: CourseCertificate;
  reviews?: CourseReview[];
  curriculum?: CourseCurriculum[];
  requirements?: string[];
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  difficulty?: CourseLevel;
  language?: string;
  subtitles?: string[];
  relatedCourses?: Course[];
  resources?: {
    id: string;
    title: string;
    url: string;
    type?: string;
  }[];
}

export interface CourseFilters {
  search?: string;
  category?: CourseCategory | 'الكل';
  level?: CourseLevel | 'الكل';
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  duration?: string;
  instructor?: string;
  tags?: string[];
}

export interface CourseSortOptions {
  field: 'rating' | 'students' | 'price' | 'title' | 'createdAt' | 'updatedAt';
  direction: 'asc' | 'desc';
}

export interface CoursePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CourseApiResponse {
  courses: Course[];
  pagination: CoursePagination;
  filters: CourseFilters;
  sort: CourseSortOptions;
}

// Component Props Types
export interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'compact' | 'featured';
  showProgress?: boolean;
  showActions?: boolean;
  onBookmark?: (courseId: string) => void;
  onShare?: (courseId: string) => void;
  onEnroll?: (courseId: string) => void;
  className?: string;
  isLoading?: boolean;
}

export interface CourseSliderProps {
  courses?: Course[];
  autoplay?: boolean;
  autoplayDelay?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
  variant?: 'default' | 'compact';
  onCourseClick?: (course: Course) => void;
}

export interface CourseListProps {
  courses: Course[];
  filters: CourseFilters;
  sort: CourseSortOptions;
  pagination: CoursePagination;
  loading?: boolean;
  onFiltersChange: (filters: CourseFilters) => void;
  onSortChange: (sort: CourseSortOptions) => void;
  onPageChange: (page: number) => void;
  onCourseClick?: (course: Course) => void;
}

export interface CourseDetailProps {
  courseId: string;
  course?: Course;
  loading?: boolean;
  error?: string;
  onEnroll?: (courseId: string) => void;
  onBookmark?: (courseId: string) => void;
  onShare?: (courseId: string) => void;
}

export interface CoursePreviewProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  onEnroll?: (courseId: string) => void;
  onBookmark?: (courseId: string) => void;
}

// Hook Types
export interface UseCourseFiltersReturn {
  filters: CourseFilters;
  updateFilters: (newFilters: Partial<CourseFilters>) => void;
  resetFilters: () => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export interface UseCourseSortReturn {
  sort: CourseSortOptions;
  updateSort: (
    field: CourseSortOptions['field'],
    direction?: CourseSortOptions['direction']
  ) => void;
  toggleSort: (field: CourseSortOptions['field']) => void;
  resetSort: () => void;
}

export interface UseCoursePaginationReturn {
  pagination: CoursePagination;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setLimit: (limit: number) => void;
  resetPagination: () => void;
}

// Error Types
export interface CourseError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Loading States
export interface CourseLoadingState {
  courses: boolean;
  course: boolean;
  enrollment: boolean;
  bookmark: boolean;
  share: boolean;
}

// Analytics Events
export interface CourseAnalyticsEvent {
  event:
    | 'course_view'
    | 'course_enroll'
    | 'course_bookmark'
    | 'course_share'
    | 'course_search'
    | 'course_filter';
  courseId?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

// مثال على محتوى متخصص في واجهة الكورسات
export const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'أساسيات المراجعة الداخلية وفق المعايير الدولية',
    description: 'دورة شاملة تغطي مبادئ المراجعة الداخلية وأفضل الممارسات',
    instructor: {
      id: '1',
      name: 'د. أحمد محمد',
      title: 'خبير مراجعة داخلية معتمد',
      avatar: '/avatars/instructor1.jpg',
      rating: 4.8,
      students: 1250,
      courses: 5,
      bio: 'خبير في مجال المراجعة الداخلية مع أكثر من 15 عاماً من الخبرة العملية',
    },
    level: 'متوسط',
    category: 'المراجعة الداخلية',
    duration: '6 أسابيع',
    students: 1250,
    rating: 4.8,
    reviewCount: 89,
    price: 499,
    originalPrice: 799,
    image: '/banar-cours.png',
    filesCount: 25,
    isOngoing: true,
    progress: 75,
    lastActivity: 'منذ يومين',
    createdAt: '2023-10-01',
    isFeatured: true,
    tags: ['مراجعة داخلية', 'معايير دولية', 'ضوابط رقابية'],
  },
  {
    id: '2',
    title: 'تطبيق معايير IFRS في القوائم المالية',
    description: 'شرح عملي لتطبيق المعايير الدولية لإعداد التقارير المالية',
    instructor: {
      id: '2',
      name: 'د. فاطمة علي',
      title: 'خبيرة معايير محاسبية',
      avatar: '/avatars/instructor2.jpg',
      rating: 4.9,
      students: 890,
      courses: 3,
      bio: 'خبيرة في المعايير المحاسبية الدولية مع خبرة في القطاع المصرفي',
    },
    level: 'متقدم',
    category: 'المعايير المحاسبية',
    duration: '8 أسابيع',
    students: 890,
    rating: 4.9,
    reviewCount: 67,
    price: 599,
    image: '/banar-cours.png',
    filesCount: 30,
    isOngoing: false,
    progress: 45,
    lastActivity: 'منذ أسبوع',
    createdAt: '2023-09-15',
    isPopular: true,
    tags: ['IFRS', 'تقارير مالية', 'معايير محاسبية'],
  },
  {
    id: '3',
    title: '🚀 مقدمة في البرمجة',
    description:
      'تعلم أساسيات البرمجة من الصفر مع أمثلة عملية ومشاريع تفاعلية. ستتعلم كيفية التفكير المنطقي وكتابة الكود بطريقة احترافية، وستبني تطبيقات صغيرة تساعدك على فهم المفاهيم الأساسية.',
    instructor: {
      id: '3',
      name: 'أحمد محمد',
      title: 'مطور برمجيات',
      avatar: '/avatars/instructor1.jpg',
      rating: 4.8,
      students: 1250,
      courses: 5,
      bio: 'خبير في البرمجة مع أكثر من 10 سنوات من الخبرة',
    },
    level: 'مبتدئ',
    category: 'برمجة',
    duration: '4 أسابيع',
    students: 1250,
    rating: 4.8,
    reviewCount: 89,
    price: 299,
    image: '/banar-cours.webp',
    filesCount: 15,
    isOngoing: true,
    progress: 53,
    lastActivity: 'منذ يومين',
    createdAt: '2023-10-01',
    isFeatured: true,
    tags: ['برمجة', 'Python', 'أساسيات'],
  },
];
