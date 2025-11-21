// ═══════════════════════════════════════════════════
// محول بيانات الكورسات إلى هيكل Modules و Lessons
// ═══════════════════════════════════════════════════

import { Course, CourseModule } from './all-courses';
import { getCourseById, getCourseBySlug } from './all-courses';

// ═══════════════════════════════════════════════════
// Interfaces
// ═══════════════════════════════════════════════════

export interface File {
  id: number;
  title: string;
  type: 'video' | 'pdf' | 'audio';
  size: string;
  duration?: string;
  url?: string;
  videoUrl?: string;
}

export interface Lesson {
  id: number;
  title: string;
  order: number;
  files: File[];
  description?: string;
  objectives?: string[];
  videoUrl?: string;
}

export interface Module {
  id: number;
  title: string;
  order: number;
  lessons: Lesson[];
  isLevel?: boolean; // للتمييز بين المستوى والمحور (للمراجعة الداخلية فقط)
  levelId?: number; // معرف المستوى التابع له (للمراجعة الداخلية فقط)
}

/**
 * تحويل بيانات كورس عادي إلى هيكل Modules و Lessons
 * @param course - بيانات الكورس من courses.json
 * @returns مصفوفة من Modules
 */
export function convertCourseToModules(course: Course): Module[] {
  if (!course || !course.modules) {
    return [];
  }

  const modules: Module[] = [];
  let globalLessonId = 1;

  course.modules.forEach((module: CourseModule, moduleIndex: number) => {
    // تحويل lessons (strings) إلى Lessons objects
    const moduleLessons: Lesson[] = module.lessons.map((lessonTitle: string, lessonIndex: number) => ({
      id: globalLessonId++,
      title: lessonTitle,
      order: lessonIndex + 1,
      files: [], // سيتم ملؤها لاحقاً إذا كانت متاحة
      description: undefined,
      objectives: undefined,
    }));

    // إضافة Module
    const moduleData: Module = {
      id: module.id || moduleIndex + 1,
      title: module.title,
      order: moduleIndex + 1,
      lessons: moduleLessons,
      isLevel: false,
      levelId: undefined,
    };

    modules.push(moduleData);
  });

  return modules;
}

/**
 * الحصول على بيانات Modules و Lessons لكورس معين
 * @param courseId - معرف الكورس
 * @returns مصفوفة من Modules أو null إذا لم يتم العثور على الكورس
 */
export function getCourseModules(courseId: string | number): Module[] | null {
  const course = getCourseById(typeof courseId === 'string' ? parseInt(courseId) : courseId);
  
  if (!course) {
    return null;
  }

  return convertCourseToModules(course);
}

/**
 * الحصول على عنوان الكورس
 * @param courseId - معرف الكورس
 * @returns عنوان الكورس أو null
 */
export function getCourseTitle(courseId: string | number): string | null {
  const course = getCourseById(typeof courseId === 'string' ? parseInt(courseId) : courseId);
  return course?.title || null;
}

/**
 * الحصول على بيانات Modules و Lessons لكورس حسب slug
 * @param slug - slug الكورس
 * @returns مصفوفة من Modules أو null إذا لم يتم العثور على الكورس
 */
export function getCourseModulesBySlug(slug: string): Module[] | null {
  const course = getCourseBySlug(slug);
  
  if (!course) {
    return null;
  }

  return convertCourseToModules(course);
}

/**
 * الحصول على عنوان الكورس حسب slug
 * @param slug - slug الكورس
 * @returns عنوان الكورس أو null
 */
export function getCourseTitleBySlug(slug: string): string | null {
  const course = getCourseBySlug(slug);
  return course?.title || null;
}

