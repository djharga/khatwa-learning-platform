import {
  Course,
  CourseFile,
  CourseLevel,
  FileType,
  CourseFilters,
  CourseSortOptions,
} from '@/types/course';

// Course Utility Functions

/**
 * Get difficulty color class based on level
 */
export const getDifficultyColor = (level: CourseLevel): string => {
  const colorMap: Record<CourseLevel, string> = {
    مبتدئ:
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
    متوسط:
      'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
    متقدم: 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400',
  };
  return (
    colorMap[level] ||
    'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  );
};

/**
 * Get progress color class based on percentage
 */
export const getProgressColor = (progress: number): string => {
  if (progress < 30) return 'text-rose-500 dark:text-rose-400';
  if (progress < 70) return 'text-amber-500 dark:text-amber-400';
  return 'text-emerald-500 dark:text-emerald-400';
};

/**
 * Get file icon based on file type
 */
export const getFileIcon = (type: FileType): string => {
  const iconMap: Record<FileType, string> = {
    folder: 'Folder',
    video: 'Video',
    document: 'FileText',
    image: 'Image',
    presentation: 'Presentation',
    word: 'FileType',
    excel: 'FileSpreadsheet',
    pdf: 'FileText',
    audio: 'FileAudio',
    powerpoint: 'Presentation',
  };
  return iconMap[type] || 'File';
};

/**
 * Get file type color
 */
export const getFileTypeColor = (type: FileType): string => {
  const colorMap: Record<FileType, string> = {
    folder: 'text-blue-500',
    video: 'text-red-500',
    document: 'text-gray-600',
    image: 'text-purple-500',
    presentation: 'text-orange-500',
    word: 'text-blue-600',
    excel: 'text-green-600',
    pdf: 'text-red-600',
    audio: 'text-purple-500',
    powerpoint: 'text-orange-500',
  };
  return colorMap[type] || 'text-gray-500';
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format duration
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Calculate course progress percentage
 */
export const calculateProgress = (
  completedFiles: number,
  totalFiles: number
): number => {
  if (totalFiles === 0) return 0;
  return Math.round((completedFiles / totalFiles) * 100);
};

/**
 * Filter courses based on criteria
 */
export const filterCourses = (
  courses: Course[],
  filters: CourseFilters
): Course[] => {
  return courses.filter((course) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.instructor.name.toLowerCase().includes(searchTerm) ||
        course.category.toLowerCase().includes(searchTerm) ||
        course.tags?.some((tag) => tag.toLowerCase().includes(searchTerm));

      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters.category && filters.category !== 'الكل') {
      if (course.category !== filters.category) return false;
    }

    // Level filter
    if (filters.level && filters.level !== 'الكل') {
      if (course.level !== filters.level) return false;
    }

    // Price range filter
    if (filters.priceRange) {
      if (
        course.price < filters.priceRange.min ||
        course.price > filters.priceRange.max
      ) {
        return false;
      }
    }

    // Rating filter
    if (filters.rating) {
      if (course.rating < filters.rating) return false;
    }

    // Duration filter
    if (filters.duration) {
      // This would need to be implemented based on your duration format
      // For now, we'll skip this filter
    }

    // Instructor filter
    if (filters.instructor) {
      if (
        !course.instructor.name
          .toLowerCase()
          .includes(filters.instructor.toLowerCase())
      ) {
        return false;
      }
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const courseTags = course.tags || [];
      const hasMatchingTag = filters.tags.some((tag) =>
        courseTags.some((courseTag) =>
          courseTag.toLowerCase().includes(tag.toLowerCase())
        )
      );
      if (!hasMatchingTag) return false;
    }

    return true;
  });
};

/**
 * Sort courses based on criteria
 */
export const sortCourses = (
  courses: Course[],
  sort: CourseSortOptions
): Course[] => {
  return [...courses].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sort.field) {
      case 'rating':
        aValue = a.rating;
        bValue = b.rating;
        break;
      case 'students':
        aValue = a.students;
        bValue = b.students;
        break;
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'title':
        aValue = a.title;
        bValue = b.title;
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt || 0);
        bValue = new Date(b.createdAt || 0);
        break;
      case 'updatedAt':
        aValue = new Date(a.updatedAt || 0);
        bValue = new Date(b.updatedAt || 0);
        break;
      default:
        return 0;
    }

    if (aValue < bValue) {
      return sort.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sort.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

/**
 * Paginate courses
 */
export const paginateCourses = (
  courses: Course[],
  page: number,
  limit: number
): Course[] => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return courses.slice(startIndex, endIndex);
};

/**
 * Get unique categories from courses
 */
export const getUniqueCategories = (courses: Course[]): string[] => {
  const categories = courses.map((course) => course.category);
  return Array.from(new Set(categories));
};

/**
 * Get unique instructors from courses
 */
export const getUniqueInstructors = (courses: Course[]): string[] => {
  const instructors = courses.map((course) => course.instructor.name);
  return Array.from(new Set(instructors));
};

/**
 * Get course statistics
 */
export const getCourseStats = (courses: Course[]) => {
  const totalCourses = courses.length;
  const totalStudents = courses.reduce(
    (sum, course) => sum + course.students,
    0
  );
  const averageRating =
    courses.reduce((sum, course) => sum + course.rating, 0) / totalCourses;
  const totalRevenue = courses.reduce(
    (sum, course) => sum + course.price * course.students,
    0
  );

  const levelDistribution = courses.reduce(
    (acc, course) => {
      acc[course.level] = (acc[course.level] || 0) + 1;
      return acc;
    },
    {} as Record<CourseLevel, number>
  );

  const categoryDistribution = courses.reduce(
    (acc, course) => {
      acc[course.category] = (acc[course.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    totalCourses,
    totalStudents,
    averageRating: Math.round(averageRating * 10) / 10,
    totalRevenue,
    levelDistribution,
    categoryDistribution,
  };
};

/**
 * Search courses with fuzzy matching
 */
export const fuzzySearchCourses = (
  courses: Course[],
  query: string
): Course[] => {
  if (!query.trim()) return courses;

  const searchTerm = query.toLowerCase();
  const results: { course: Course; score: number }[] = [];

  courses.forEach((course) => {
    let score = 0;
    const searchableText = [
      course.title,
      course.description,
      course.instructor.name,
      course.category,
      ...(course.tags || []),
    ]
      .join(' ')
      .toLowerCase();

    // Exact match gets highest score
    if (searchableText.includes(searchTerm)) {
      score += 100;
    }

    // Word boundary matches
    const words = searchTerm.split(' ');
    words.forEach((word) => {
      if (searchableText.includes(word)) {
        score += 50;
      }
    });

    // Character sequence matches
    if (searchableText.includes(searchTerm)) {
      score += 25;
    }

    if (score > 0) {
      results.push({ course, score });
    }
  });

  return results
    .sort((a, b) => b.score - a.score)
    .map((result) => result.course);
};

/**
 * Generate course slug
 */
export const generateCourseSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

/**
 * Validate course data
 */
export const validateCourse = (
  course: Partial<Course>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!course.title?.trim()) {
    errors.push('Course title is required');
  }

  if (!course.description?.trim()) {
    errors.push('Course description is required');
  }

  if (!course.instructor?.name?.trim()) {
    errors.push('Course instructor is required');
  }

  if (!course.category?.trim()) {
    errors.push('Course category is required');
  }

  if (!course.level) {
    errors.push('Course level is required');
  }

  if (course.price === undefined || course.price < 0) {
    errors.push('Course price must be a positive number');
  }

  if (course.rating !== undefined && (course.rating < 0 || course.rating > 5)) {
    errors.push('Course rating must be between 0 and 5');
  }

  if (course.students !== undefined && course.students < 0) {
    errors.push('Number of students cannot be negative');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Format course price
 */
export const formatCoursePrice = (
  price: number,
  currency: string = 'ريال'
): string => {
  return `${price.toLocaleString()} ${currency}`;
};

/**
 * Get course difficulty emoji
 */
export const getDifficultyEmoji = (level: CourseLevel): string => {
  const emojiMap: Record<CourseLevel, string> = {
    مبتدئ: '🟢',
    متوسط: '🟡',
    متقدم: '🔴',
  };
  return emojiMap[level] || '⚪';
};

/**
 * Check if course is new (created within last 30 days)
 */
export const isNewCourse = (course: Course): boolean => {
  if (!course.createdAt) return false;
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return new Date(course.createdAt) > thirtyDaysAgo;
};

/**
 * Check if course is popular (high rating and student count)
 */
export const isPopularCourse = (course: Course): boolean => {
  return course.rating >= 4.5 && course.students >= 100;
};

/**
 * Get course completion status
 */
export const getCourseCompletionStatus = (
  course: Course
): 'not_started' | 'in_progress' | 'completed' => {
  if (!course.progress) return 'not_started';
  if (course.progress >= 100) return 'completed';
  return 'in_progress';
};
