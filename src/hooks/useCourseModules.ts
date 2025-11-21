/**
 * Hook لجلب محاور الدورة (Modules)
 */

import { useQuery } from '@tanstack/react-query';
import type { Module } from '@/types/course-management';
import { courseManagementService } from '@/lib/course-management/course-service';
import { getCourseById } from '@/data/courses/all-courses';

/**
 * تحويل Course modules إلى Module format
 */
function convertCourseModulesToModule(courseModules: any[]): Module[] {
  return courseModules.map((module, index) => ({
    id: module.id?.toString() || `module-${index + 1}`,
    courseId: module.courseId || '',
    title: module.title || '',
    description: module.description,
    lessons: Array.isArray(module.lessons)
      ? module.lessons.map((lesson: any, lessonIndex: number) => ({
          id: lesson.id?.toString() || `lesson-${lessonIndex + 1}`,
          courseId: lesson.courseId || '',
          moduleId: module.id?.toString() || `module-${index + 1}`,
          title: typeof lesson === 'string' ? lesson : lesson.title || '',
          description: typeof lesson === 'object' ? lesson.description : undefined,
          content: typeof lesson === 'object' && lesson.content ? lesson.content : [],
          order: lessonIndex,
          status: 'published' as const,
          estimatedDuration: typeof lesson === 'object' && lesson.duration 
            ? parseInt(lesson.duration) || 15 
            : 15,
          isPreview: false,
          completedBy: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: '',
        }))
      : [],
    order: index,
    status: 'published' as const,
    estimatedDuration: module.lessons?.length ? module.lessons.length * 15 : 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: '',
  }));
}

/**
 * Hook لجلب محاور دورة معينة
 */
export function useCourseModules(courseId: string | undefined) {
  return useQuery({
    queryKey: ['course-modules', courseId],
    queryFn: async () => {
      if (!courseId) throw new Error('Course ID is required');
      
      try {
        // محاولة جلب البيانات من API
        const course = await courseManagementService.getCourse(courseId);
        if (course && course.modules && course.modules.length > 0) {
          return course.modules;
        }
      } catch (apiError) {
        console.warn('API fetch failed, trying local data:', apiError);
      }
      
      // Fallback: استخدام البيانات المحلية
      try {
        const courseIdNum = parseInt(courseId, 10);
        if (!isNaN(courseIdNum)) {
          const localCourse = getCourseById(courseIdNum);
          if (localCourse && localCourse.modules) {
            return convertCourseModulesToModule(localCourse.modules);
          }
        }
      } catch (localError) {
        console.warn('Local data fetch failed:', localError);
      }
      
      // إذا فشل كل شيء، نعيد مصفوفة فارغة
      return [];
    },
    enabled: !!courseId,
    staleTime: 300000, // 5 دقائق
    retry: 1,
  });
}

/**
 * Hook لجلب وحدات (Lessons) محور معين
 */
export function useModuleUnits(courseId: string | undefined, moduleId: string | undefined) {
  return useQuery({
    queryKey: ['module-units', courseId, moduleId],
    queryFn: async () => {
      if (!courseId || !moduleId) throw new Error('Course ID and Module ID are required');
      
      try {
        // محاولة جلب البيانات من API
        const course = await courseManagementService.getCourse(courseId);
        if (course && course.modules) {
          const courseModule = course.modules.find(m => m.id === moduleId);
          if (courseModule && courseModule.lessons) {
            return courseModule.lessons;
          }
        }
      } catch (apiError) {
        console.warn('API fetch failed, trying local data:', apiError);
      }
      
      // Fallback: استخدام البيانات المحلية
      try {
        const courseIdNum = parseInt(courseId, 10);
        if (!isNaN(courseIdNum)) {
          const localCourse = getCourseById(courseIdNum);
          if (localCourse && localCourse.modules) {
            const courseModule = localCourse.modules.find((m: any, index: number) => {
              const mId = m.id?.toString() || `module-${index + 1}`;
              return mId === moduleId || m.id === moduleId;
            });
            if (courseModule) {
              const lessons = Array.isArray(courseModule.lessons) ? courseModule.lessons : [];
              return lessons.map((lesson: any, lessonIndex: number) => ({
                id: lesson.id?.toString() || `${moduleId}-lesson-${lessonIndex + 1}`,
                courseId: courseId,
                moduleId: moduleId,
                title: typeof lesson === 'string' ? lesson : lesson.title || '',
                description: typeof lesson === 'object' ? lesson.description : undefined,
                content: typeof lesson === 'object' && lesson.content ? lesson.content : [],
                order: lessonIndex,
                status: 'published' as const,
                estimatedDuration: typeof lesson === 'object' && lesson.duration 
                  ? parseInt(lesson.duration) || 15 
                  : 15,
                isPreview: false,
                completedBy: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: '',
              }));
            }
          }
        }
      } catch (localError) {
        console.warn('Local data fetch failed:', localError);
      }
      
      return [];
    },
    enabled: !!courseId && !!moduleId,
    staleTime: 300000,
    retry: 1,
  });
}

/**
 * Hook لجلب ملفات (Content) وحدة معينة
 */
export function useUnitFiles(
  courseId: string | undefined,
  moduleId: string | undefined,
  lessonId: string | undefined
) {
  return useQuery({
    queryKey: ['unit-files', courseId, moduleId, lessonId],
    queryFn: async () => {
      if (!courseId || !moduleId || !lessonId) {
        throw new Error('Course ID, Module ID, and Lesson ID are required');
      }
      
      try {
        // محاولة جلب البيانات من API
        const course = await courseManagementService.getCourse(courseId);
        if (course && course.modules) {
          const courseModule = course.modules.find(m => m.id === moduleId);
          if (courseModule && courseModule.lessons) {
            const lesson = courseModule.lessons.find(l => l.id === lessonId);
            if (lesson && lesson.content) {
              return lesson.content;
            }
          }
        }
      } catch (apiError) {
        console.warn('API fetch failed, trying local data:', apiError);
      }
      
      // Fallback: استخدام البيانات المحلية
      try {
        const courseIdNum = parseInt(courseId, 10);
        if (!isNaN(courseIdNum)) {
          const localCourse = getCourseById(courseIdNum);
          if (localCourse && localCourse.modules) {
            const courseModule = localCourse.modules.find((m: any, index: number) => {
              const mId = m.id?.toString() || `module-${index + 1}`;
              return mId === moduleId || m.id === moduleId;
            });
            if (courseModule && courseModule.lessons) {
              const lessons = Array.isArray(courseModule.lessons) ? courseModule.lessons : [];
              const lessonIndex = lessons.findIndex((l: any, idx: number) => {
                const lId = typeof l === 'object' && l.id 
                  ? l.id.toString() 
                  : `${moduleId}-lesson-${idx + 1}`;
                return lId === lessonId;
              });
              
              // في البيانات المحلية، قد لا يكون هناك content مباشر
              // نعيد مصفوفة فارغة أو يمكن إضافة content افتراضي هنا
              return [];
            }
          }
        }
      } catch (localError) {
        console.warn('Local data fetch failed:', localError);
      }
      
      return [];
    },
    enabled: !!courseId && !!moduleId && !!lessonId,
    staleTime: 300000,
    retry: 1,
  });
}
