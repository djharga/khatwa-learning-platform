/**
 * خدمة إدارة الدورات والمحتوى (CMS)
 * توفر وظائف CRUD كاملة لإدارة الدورات، المحاور، الدروس، والمحتوى
 */

import type {
  CourseManagement,
  Module,
  Lesson,
  CourseContent,
  CreateCourseRequest,
  UpdateCourseRequest,
  CreateModuleRequest,
  UpdateModuleRequest,
  CreateLessonRequest,
  UpdateLessonRequest,
  UploadContentRequest,
  CourseManagementFilters,
  CourseManagementSort,
  CourseSchedule,
} from '@/types/course-management';

const API_PREFIX = '/api';
const API_BASE = `${API_PREFIX}/courses`;

/**
 * Course Management Service
 */
export class CourseManagementService {
  /**
   * الحصول على قائمة الدورات مع الفلاتر والترتيب
   */
  async getCourses(
    filters?: CourseManagementFilters,
    sort?: CourseManagementSort,
    pagination?: { page: number; limit: number }
  ): Promise<{ courses: CourseManagement[]; total: number }> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }
    
    if (sort) {
      params.append('sortBy', sort.field);
      params.append('sortDir', sort.direction);
    }
    
    if (pagination) {
      params.append('page', pagination.page.toString());
      params.append('limit', pagination.limit.toString());
    }

    const response = await fetch(`${API_BASE}?${params.toString()}`);
    if (!response.ok) {
      throw new Error('فشل جلب الدورات');
    }
    
    return await response.json();
  }

  /**
   * الحصول على تفاصيل دورة معينة
   */
  async getCourse(courseId: string): Promise<CourseManagement> {
    const response = await fetch(`${API_BASE}/${courseId}`);
    if (!response.ok) {
      throw new Error('فشل جلب تفاصيل الدورة');
    }
    
    const data = await response.json();
    return data.course;
  }

  /**
   * إنشاء دورة جديدة
   */
  async createCourse(request: CreateCourseRequest): Promise<CourseManagement> {
    const formData = new FormData();
    
    Object.entries(request).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await fetch(API_BASE, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'فشل إنشاء الدورة');
    }

    const data = await response.json();
    return data.course;
  }

  /**
   * تحديث دورة موجودة
   */
  async updateCourse(
    courseId: string,
    request: UpdateCourseRequest
  ): Promise<CourseManagement> {
    const formData = new FormData();
    
    Object.entries(request).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await fetch(`${API_BASE}/${courseId}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'فشل تحديث الدورة');
    }

    const data = await response.json();
    return data.course;
  }

  /**
   * حذف دورة
   */
  async deleteCourse(courseId: string): Promise<void> {
    const response = await fetch(`${API_BASE}/${courseId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'فشل حذف الدورة');
    }
  }

  /**
   * نشر/إلغاء نشر دورة
   */
  async publishCourse(courseId: string, publish: boolean): Promise<CourseManagement> {
    const response = await fetch(`${API_BASE}/${courseId}/publish`, {
      method: publish ? 'POST' : 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'فشل تغيير حالة النشر');
    }

    const data = await response.json();
    return data.course;
  }

  /**
   * إنشاء محور/وحدة جديدة
   */
  async createModule(request: CreateModuleRequest): Promise<Module> {
    const response = await fetch(`${API_BASE}/${request.courseId}/modules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'فشل إنشاء المحور');
    }

    const data = await response.json();
    return data.module;
  }

  /**
   * تحديث محور
   */
  async updateModule(
    courseId: string,
    moduleId: string,
    request: UpdateModuleRequest
  ): Promise<Module> {
    const response = await fetch(`${API_BASE}/${courseId}/modules/${moduleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'فشل تحديث المحور');
    }

    const data = await response.json();
    return data.module;
  }

  /**
   * حذف محور
   */
  async deleteModule(courseId: string, moduleId: string): Promise<void> {
    const response = await fetch(`${API_BASE}/${courseId}/modules/${moduleId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'فشل حذف المحور');
    }
  }

  /**
   * إعادة ترتيب المحاور
   */
  async reorderModules(courseId: string, moduleIds: string[]): Promise<void> {
    const response = await fetch(`${API_BASE}/${courseId}/modules/reorder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ moduleIds }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'فشل إعادة ترتيب المحاور');
    }
  }

  /**
   * إنشاء درس جديد
   */
  async createLesson(request: CreateLessonRequest): Promise<Lesson> {
    const response = await fetch(
      `${API_BASE}/${request.courseId}/modules/${request.moduleId}/lessons`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'فشل إنشاء الدرس');
    }

    const data = await response.json();
    return data.lesson;
  }

  /**
   * تحديث درس
   */
  async updateLesson(
    courseId: string,
    moduleId: string,
    lessonId: string,
    request: UpdateLessonRequest
  ): Promise<Lesson> {
    const response = await fetch(
      `${API_BASE}/${courseId}/modules/${moduleId}/lessons/${lessonId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'فشل تحديث الدرس');
    }

    const data = await response.json();
    return data.lesson;
  }

  /**
   * حذف درس
   */
  async deleteLesson(
    courseId: string,
    moduleId: string,
    lessonId: string
  ): Promise<void> {
    const response = await fetch(
      `${API_BASE}/${courseId}/modules/${moduleId}/lessons/${lessonId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'فشل حذف الدرس');
    }
  }

  /**
   * رفع محتوى (ملف، فيديو، إلخ)
   */
  async uploadContent(request: UploadContentRequest): Promise<CourseContent> {
    const formData = new FormData();
    
    Object.entries(request).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append('file', value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await fetch(
      `${API_BASE}/${request.courseId}/content/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'فشل رفع المحتوى');
    }

    const data = await response.json();
    return data.content;
  }

  /**
   * حذف محتوى
   */
  async deleteContent(
    courseId: string,
    contentId: string
  ): Promise<void> {
    const response = await fetch(
      `${API_BASE}/${courseId}/content/${contentId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'فشل حذف المحتوى');
    }
  }

  /**
   * التحقق من الدورات المجدولة وفتح/إغلاقها تلقائياً
   */
  async checkScheduledCourses(): Promise<CourseSchedule[]> {
    const response = await fetch(`${API_BASE}/scheduled/check`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('فشل التحقق من الدورات المجدولة');
    }

    const data = await response.json();
    return data.schedules;
  }

  /**
   * الحصول على الدورات المجدولة
   */
  async getScheduledCourses(): Promise<CourseSchedule[]> {
    const response = await fetch(`${API_BASE}/scheduled`);
    
    if (!response.ok) {
      throw new Error('فشل جلب الدورات المجدولة');
    }

    const data = await response.json();
    return data.schedules;
  }
}

// Export singleton instance
export const courseManagementService = new CourseManagementService();

