/**
 * أنواع البيانات لنظام إدارة الدورات والمحتوى (CMS)
 */

import type { CourseInstructor, CourseLevel, CourseCategory } from '@/types/course';

// ==================== أنواع الحالة ====================
export type CourseStatus = 'draft' | 'published' | 'scheduled' | 'archived' | 'suspended';
export type ModuleStatus = 'draft' | 'published' | 'locked';
export type LessonStatus = 'draft' | 'published' | 'locked';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type CourseType = 'short' | 'long'; // قصيرة (2-3 أيام) أو طويلة المدى
export type CourseLockStatus = 'open' | 'closed' | 'auto-locked' | 'auto-open';

// ==================== المحتوى ====================
export interface CourseContent {
  id: string;
  courseId: string;
  moduleId?: string;
  lessonId?: string;
  type: 'video' | 'document' | 'image' | 'audio' | 'link' | 'assignment' | 'quiz';
  title: string;
  description?: string;
  content: string | null; // HTML content أو URL
  fileUrl?: string;
  fileSize?: number;
  duration?: number; // بالثواني (للفيديوهات)
  thumbnailUrl?: string;
  order: number;
  status: ContentStatus;
  isRequired: boolean;
  isPreview: boolean; // هل يمكن معاينته قبل التسجيل
  metadata?: {
    transcript?: string;
    subtitles?: Array<{ language: string; url: string }>;
    quality?: '360p' | '480p' | '720p' | '1080p';
    format?: string;
    pages?: number; // للمستندات
  };
  createdAt: string;
  updatedAt: string;
  uploadedBy: string;
  viewCount?: number;
  downloadCount?: number;
}

// ==================== الدرس ====================
export interface Lesson {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  description?: string;
  objectives?: string[]; // أهداف التعلم
  content: CourseContent[];
  order: number;
  status: LessonStatus;
  estimatedDuration: number; // بالدقائق
  isPreview: boolean; // هل يمكن معاينته قبل التسجيل
  prerequisites?: string[]; // دروس مطلوبة قبل هذا الدرس
  completedBy: number; // عدد من أكملوا الدرس
  averageTimeSpent?: number; // متوسط الوقت المستغرق
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// ==================== المحور/الوحدة ====================
export interface Module {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  order: number;
  status: ModuleStatus;
  estimatedDuration: number; // بالدقائق
  progress?: {
    completed: number;
    total: number;
    percentage: number;
  };
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// ==================== الدورة ====================
// ==================== شجرة ملفات الدورة ====================
export interface CourseFileTree {
  courseId: string;
  rootNodes: CourseFileNode[];
  totalFiles: number;
  totalSize: number; // بالبايت
  lastUpdated: string;
}

export interface CourseFileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  fileType?: 'word' | 'excel' | 'pdf' | 'powerpoint' | 'video' | 'audio' | 'image' | 'other';
  size?: number; // بالبايت
  path: string; // المسار الكامل
  parentId?: string;
  children?: CourseFileNode[];
  canEdit?: boolean; // يمكن تعديل الاسم على النسخة الشخصية
  explanationVideo?: {
    id: string;
    url: string;
    title: string;
    duration: number; // بالثواني
  };
  createdAt: string;
  updatedAt: string;
}

export interface CourseManagement {
  id: string;
  title: string;
  slug: string; // URL slug
  description: string;
  shortDescription?: string; // وصف قصير للعرض
  instructor: CourseInstructor;
  category: CourseCategory;
  level: CourseLevel;
  language: string;
  subtitles?: string[];
  
  // نوع الدورة والمدة
  courseType: CourseType; // قصيرة أو طويلة المدى
  durationDays?: number; // عدد الأيام (2-3 للقصيرة)
  
  // المحتوى
  modules: Module[];
  totalLessons: number;
  totalContent: number;
  
  // الملفات والوسائط
  image: string;
  thumbnail?: string;
  promoVideoUrl?: string; // فيديو دعائي
  
  // شجرة الملفات - فريدة لكل دورة
  fileTree?: CourseFileTree;
  
  // حالة القفل/الفتح
  lockStatus?: CourseLockStatus;
  isLocked?: boolean; // حالة القفل اليدوية
  
  // التواريخ والجدولة
  startDate?: string; // تاريخ بدء الدورة
  endDate?: string; // تاريخ انتهاء الدورة
  enrollmentStartDate?: string; // تاريخ بدء التسجيل
  enrollmentEndDate?: string; // تاريخ انتهاء التسجيل
  autoOpen: boolean; // فتح تلقائي عند تاريخ البدء
  autoClose: boolean; // إغلاق تلقائي عند تاريخ الانتهاء
  
  // الإحصائيات
  students: number;
  enrolledStudents: number;
  completedStudents: number;
  rating: number;
  reviewCount: number;
  
  // التسعير
  price: number;
  originalPrice?: number;
  currency: string;
  isFree: boolean;
  
  // الحالة والإعدادات
  status: CourseStatus;
  isFeatured: boolean;
  isPopular: boolean;
  isPublished: boolean;
  publishDate?: string;
  
  // المرفقات والموارد
  requirements?: string[];
  learningObjectives?: string[];
  tags?: string[];
  resources?: Array<{
    id: string;
    title: string;
    url: string;
    type: string;
  }>;
  
  // الشهادات
  certificate?: {
    enabled: boolean;
    type: 'completion' | 'participation' | 'excellence';
    requirements?: {
      minProgress?: number; // نسبة الإكمال المطلوبة
      minScore?: number; // الحد الأدنى للدرجات
      allLessons?: boolean; // إكمال جميع الدروس
    };
  };
  
  // الإعدادات المتقدمة
  settings: {
    allowPreview: boolean; // السماح بالمعاينة
    allowDownloads: boolean; // السماح بالتحميل
    enableDiscussions: boolean; // تفعيل المناقشات
    enableNotes: boolean; // تفعيل الملاحظات
    enableBookmarks: boolean; // تفعيل الإشارات المرجعية
    maxStudents?: number; // حد أقصى للطلاب
    waitlistEnabled?: boolean; // تفعيل قائمة الانتظار
  };
  
  // التخزين
  storageUsed: number; // بالبايت
  totalFiles: number;
  
  // المتابعة
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  createdBy: string;
  lastModifiedBy: string;
}

// ==================== طلبات الإدارة ====================
export interface CreateCourseRequest {
  title: string;
  description: string;
  instructorId: string;
  category: CourseCategory;
  level: CourseLevel;
  courseType: CourseType; // قصيرة أو طويلة
  durationDays?: number; // عدد الأيام
  price: number;
  image?: File;
  startDate?: string;
  endDate?: string;
  autoOpen?: boolean;
  autoClose?: boolean;
}

export interface UpdateCourseRequest {
  title?: string;
  description?: string;
  category?: CourseCategory;
  level?: CourseLevel;
  courseType?: CourseType;
  durationDays?: number;
  price?: number;
  image?: File;
  status?: CourseStatus;
  startDate?: string;
  endDate?: string;
  autoOpen?: boolean;
  autoClose?: boolean;
  isLocked?: boolean;
  lockStatus?: CourseLockStatus;
  settings?: Partial<CourseManagement['settings']>;
}

export interface CreateModuleRequest {
  courseId: string;
  title: string;
  description?: string;
  order?: number;
}

export interface UpdateModuleRequest {
  title?: string;
  description?: string;
  order?: number;
  status?: ModuleStatus;
}

export interface CreateLessonRequest {
  courseId: string;
  moduleId: string;
  title: string;
  description?: string;
  objectives?: string[];
  order?: number;
  isPreview?: boolean;
}

export interface UpdateLessonRequest {
  title?: string;
  description?: string;
  objectives?: string[];
  order?: number;
  status?: LessonStatus;
  isPreview?: boolean;
}

export interface UploadContentRequest {
  courseId: string;
  moduleId?: string;
  lessonId?: string;
  type: CourseContent['type'];
  file?: File;
  title: string;
  description?: string;
  isRequired?: boolean;
  isPreview?: boolean;
  order?: number;
}

// ==================== فيديو الشرح ====================
export interface ExplanationVideo {
  id: string;
  courseId: string;
  moduleId?: string;
  fileId?: string; // معرف الملف المرتبط (Word/Excel)
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number; // بالثواني
  type: 'module' | 'word' | 'excel'; // نوع فيديو الشرح
  order?: number;
  viewCount: number;
  uploadedAt: string;
  uploadedBy: string;
}

export interface UploadExplanationVideoRequest {
  courseId: string;
  moduleId?: string;
  fileId?: string;
  type: 'module' | 'word' | 'excel';
  video: File;
  title: string;
  description?: string;
}

// ==================== الاستجابات ====================
export interface CourseListResponse {
  courses: CourseManagement[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CourseDetailResponse {
  course: CourseManagement;
  enrollmentCount: number;
  completionRate: number;
  averageRating: number;
}

// ==================== الفلاتر والبحث ====================
export interface CourseManagementFilters {
  search?: string;
  category?: CourseCategory;
  level?: CourseLevel;
  status?: CourseStatus;
  instructorId?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  isPublished?: boolean;
  startDateFrom?: string;
  startDateTo?: string;
  tags?: string[];
}

export interface CourseManagementSort {
  field: 'title' | 'createdAt' | 'updatedAt' | 'price' | 'students' | 'rating';
  direction: 'asc' | 'desc';
}

// ==================== الجدولة التلقائية ====================
export interface CourseSchedule {
  courseId: string;
  action: 'open' | 'close';
  scheduledDate: string;
  executed: boolean;
  executedAt?: string;
  error?: string;
  createdAt?: string;
}

// ==================== نسخ الملفات ====================
export interface CopyFileRequest {
  sourceFileId: string;
  targetCourseId?: string;
  targetModuleId?: string;
  targetTraineeId?: string;
  newName?: string;
  createPersonalCopy?: boolean;
}

export interface MoveFileRequest {
  fileId: string;
  targetCourseId?: string;
  targetModuleId?: string;
  newPath?: string;
}

// ==================== الإحصائيات ====================
export interface CourseAnalytics {
  courseId: string;
  views: number;
  enrollments: number;
  completions: number;
  averageProgress: number;
  averageTimeSpent: number;
  dropOffRate: number;
  mostViewedLessons: Array<{
    lessonId: string;
    title: string;
    views: number;
  }>;
  completionByModule: Array<{
    moduleId: string;
    title: string;
    completed: number;
    total: number;
  }>;
}

