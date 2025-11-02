import { Course, CourseFilters, CourseSortOptions } from '@/types/course';
import accountingCoursesData from '@/data/courses/accounting-courses.json';

/**
 * خدمة إدارة الكورسات المحاسبية
 * تدير البيانات وتوفر وظائف البحث والفلترة والفرز
 */

export class CourseService {
  private static instance: CourseService;
  private courses: Course[] = [];

  private constructor() {
    this.loadCourses();
  }

  public static getInstance(): CourseService {
    if (!CourseService.instance) {
      CourseService.instance = new CourseService();
    }
    return CourseService.instance;
  }

  /**
   * تحميل بيانات الكورسات من الملف
   */
  private loadCourses(): void {
    try {
      if (!accountingCoursesData || !accountingCoursesData.courses) {
        console.warn('لا توجد بيانات كورسات متاحة');
        this.courses = [];
        return;
      }

      // تحويل البيانات لتتوافق مع أنواع TypeScript
      this.courses = accountingCoursesData.courses as Course[];

      // التحقق من صحة البيانات
      if (this.courses.length === 0) {
        console.warn('تم تحميل ملف الكورسات لكن لا يحتوي على كورسات');
      } else {
        console.log(`تم تحميل ${this.courses.length} كورس بنجاح`);
      }
    } catch (error) {
      console.error('خطأ في تحميل بيانات الكورسات:', error);
      this.courses = [];
    }
  }

  /**
   * الحصول على جميع الكورسات
   */
  public getAllCourses(): Course[] {
    return [...this.courses];
  }

  /**
   * الحصول على كورس واحد حسب المعرف
   */
  public getCourseById(id: string): Course | undefined {
    return this.courses.find(course => course.id === id);
  }

  /**
   * البحث في الكورسات
   */
  public searchCourses(query: string): Course[] {
    if (!query.trim()) {
      return this.getAllCourses();
    }

    const searchTerm = query.toLowerCase();
    return this.courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm) ||
      course.instructor.name.toLowerCase().includes(searchTerm) ||
      course.category.toLowerCase().includes(searchTerm) ||
      course.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  /**
   * فلترة الكورسات
   */
  public filterCourses(courses: Course[], filters: CourseFilters): Course[] {
    let filteredCourses = [...courses];

    // فلترة حسب الفئة
    if (filters.category && filters.category !== 'الكل') {
      filteredCourses = filteredCourses.filter(course => course.category === filters.category);
    }

    // فلترة حسب المستوى
    if (filters.level && filters.level !== 'الكل') {
      filteredCourses = filteredCourses.filter(course => course.level === filters.level);
    }

    // فلترة حسب نطاق السعر
    if (filters.priceRange) {
      filteredCourses = filteredCourses.filter(course =>
        course.price >= filters.priceRange!.min &&
        course.price <= filters.priceRange!.max
      );
    }

    // فلترة حسب التقييم
    if (filters.rating) {
      filteredCourses = filteredCourses.filter(course => course.rating >= filters.rating!);
    }

    // فلترة حسب المدة
    if (filters.duration) {
      filteredCourses = filteredCourses.filter(course => course.duration === filters.duration);
    }

    // فلترة حسب المدرب
    if (filters.instructor) {
      filteredCourses = filteredCourses.filter(course =>
        course.instructor.name.toLowerCase().includes(filters.instructor!.toLowerCase())
      );
    }

    // فلترة حسب العلامات
    if (filters.tags && filters.tags.length > 0) {
      filteredCourses = filteredCourses.filter(course =>
        course.tags?.some(tag => filters.tags!.includes(tag))
      );
    }

    return filteredCourses;
  }

  /**
   * فرز الكورسات
   */
  public sortCourses(courses: Course[], sortOptions: CourseSortOptions): Course[] {
    const sortedCourses = [...courses];

    sortedCourses.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortOptions.field) {
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
        return sortOptions.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOptions.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortedCourses;
  }

  /**
   * تقسيم الكورسات للتصفح
   */
  public paginateCourses(courses: Course[], page: number, limit: number): Course[] {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return courses.slice(startIndex, endIndex);
  }

  /**
   * الحصول على إحصائيات الكورسات
   */
  public getCoursesStats() {
    const totalCourses = this.courses.length;
    const totalStudents = this.courses.reduce((sum, course) => sum + course.students, 0);
    const averageRating = this.courses.reduce((sum, course) => sum + course.rating, 0) / totalCourses;
    const categories = [...new Set(this.courses.map(course => course.category))];

    return {
      totalCourses,
      totalStudents,
      averageRating: Math.round(averageRating * 10) / 10,
      categories: categories.length,
      featuredCourses: this.courses.filter(course => course.isFeatured).length,
      popularCourses: this.courses.filter(course => course.isPopular).length
    };
  }

  /**
   * الحصول على الكورسات المميزة
   */
  public getFeaturedCourses(): Course[] {
    return this.courses.filter(course => course.isFeatured);
  }

  /**
   * الحصول على الكورسات الأكثر شعبية
   */
  public getPopularCourses(): Course[] {
    return this.courses.filter(course => course.isPopular);
  }

  /**
   * الحصول على الكورسات الجارية حالياً
   */
  public getOngoingCourses(): Course[] {
    return this.courses.filter(course => course.isOngoing);
  }

  /**
   * الحصول على الكورسات حسب الفئة
   */
  public getCoursesByCategory(category: string): Course[] {
    return this.courses.filter(course => course.category === category);
  }

  /**
   * الحصول على الكورسات حسب المستوى
   */
  public getCoursesByLevel(level: string): Course[] {
    return this.courses.filter(course => course.level === level);
  }

  /**
   * تحديث حالة ملف في كورس
   */
  public updateFileStatus(courseId: string, fileId: string, isCompleted: boolean): boolean {
    const course = this.courses.find(c => c.id === courseId);
    if (!course) return false;

    const updateFileStatus = (files: any[]): boolean => {
      for (const file of files) {
        if (file.id === fileId) {
          file.isCompleted = isCompleted;
          return true;
        }
        if (file.children && updateFileStatus(file.children)) {
          return true;
        }
      }
      return false;
    };

    if (course.files && updateFileStatus(course.files)) {
      // تحديث إحصائيات الكورس
      this.updateCourseProgress(course);
      return true;
    }

    return false;
  }

  /**
   * تحديث تقدم الكورس
   */
  private updateCourseProgress(course: Course): void {
    if (!course.files) return;

    const totalFiles = this.countTotalFiles(course.files);
    const completedFiles = this.countCompletedFiles(course.files);

    course.completedFiles = completedFiles;
    course.totalFiles = totalFiles;
    course.progress = totalFiles > 0 ? Math.round((completedFiles / totalFiles) * 100) : 0;
  }

  /**
   * عد ملفات الكورس
   */
  private countTotalFiles(files: any[]): number {
    let count = 0;
    for (const file of files) {
      if (file.type !== 'folder') {
        count+=1;
      }
      if (file.children) {
        count += this.countTotalFiles(file.children);
      }
    }
    return count;
  }

  /**
   * عد الملفات المكتملة
   */
  private countCompletedFiles(files: any[]): number {
    let count = 0;
    for (const file of files) {
      if (file.type !== 'folder' && file.isCompleted) {
        count+=1;
      }
      if (file.children) {
        count += this.countCompletedFiles(file.children);
      }
    }
    return count;
  }

  /**
   * الحصول على مسار الملف في شجرة الكورس
   */
  public getFilePath(courseId: string, fileId: string): string[] {
    const course = this.courses.find(c => c.id === courseId);
    if (!course || !course.files) return [];

    const path: string[] = [];

    const findFilePath = (files: any[], currentPath: string[]): boolean => {
      for (const file of files) {
        const newPath = [...currentPath, file.name];
        if (file.id === fileId) {
          path.push(...newPath);
          return true;
        }
        if (file.children && findFilePath(file.children, newPath)) {
          return true;
        }
      }
      return false;
    };

    findFilePath(course.files, []);
    return path;
  }

  /**
   * الحصول على جميع الفئات المتاحة
   */
  public getAvailableCategories(): string[] {
    const categories = [...new Set(this.courses.map(course => course.category))];
    return categories.sort();
  }

  /**
   * الحصول على جميع المستويات المتاحة
   */
  public getAvailableLevels(): string[] {
    const levels = [...new Set(this.courses.map(course => course.level))];
    return levels.sort();
  }

  /**
   * الحصول على جميع العلامات المتاحة
   */
  public getAvailableTags(): string[] {
    const tags = this.courses.flatMap(course => course.tags || []);
    return [...new Set(tags)].sort();
  }
}

// تصدير instance واحد من الخدمة
export const courseService = CourseService.getInstance();
