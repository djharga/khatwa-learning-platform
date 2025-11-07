// ═══════════════════════════════════════════════════
// ملف بيانات موحد لجميع الكورسات
// جميع الكورسات والمحتويات التعليمية في مكان واحد
// ═══════════════════════════════════════════════════

export interface CourseModule {
  id: number;
  title: string;
  lessons: string[];
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  pageUrl: string;
  description: string;
  category: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  duration: string;
  lessons: number;
  price: string;
  rating: number;
  students: number;
  image: string;
  files: number;
  videos: number;
  audios: number;
  modules: CourseModule[];
}

// ═══════════════════════════════════════════════════
// استيراد البيانات من ملف JSON
// ═══════════════════════════════════════════════════

import coursesData from '../json/courses.json';

export const allCourses: Course[] = coursesData as Course[];

// ═══════════════════════════════════════════════════
// وظائف مساعدة للحصول على الكورسات
// ═══════════════════════════════════════════════════

/**
 * الحصول على جميع الكورسات
 */
export function getAllCourses(): Course[] {
  return allCourses;
}

/**
 * الحصول على كورس حسب المعرف
 */
export function getCourseById(id: number): Course | undefined {
  return allCourses.find(course => course.id === id);
}

/**
 * الحصول على كورس حسب الـ slug
 */
export function getCourseBySlug(slug: string): Course | undefined {
  return allCourses.find(course => course.slug === slug);
}

/**
 * الحصول على الكورسات حسب التصنيف
 */
export function getCoursesByCategory(category: string): Course[] {
  if (category === 'all') {
    return allCourses;
  }
  return allCourses.filter(course => course.category === category);
}

/**
 * الحصول على جميع التصنيفات مع عدد الكورسات في كل تصنيف
 */
export function getCategoriesWithCount(): Array<{ id: string; label: string; count: number }> {
  const categoryMap = new Map<string, number>();
  
  allCourses.forEach(course => {
    const count = categoryMap.get(course.category) || 0;
    categoryMap.set(course.category, count + 1);
  });
  
  const categories = Array.from(categoryMap.entries()).map(([category, count]) => ({
    id: category,
    label: category,
    count
  }));
  
  return [
    { id: 'all', label: 'جميع الدورات', count: allCourses.length },
    ...categories
  ];
}

/**
 * البحث في الكورسات
 */
export function searchCourses(query: string): Course[] {
  const lowerQuery = query.toLowerCase();
  return allCourses.filter(course =>
    course.title.toLowerCase().includes(lowerQuery) ||
    course.description.toLowerCase().includes(lowerQuery) ||
    course.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * ترتيب الكورسات
 */
export function sortCourses(
  courses: Course[],
  sortBy: 'popular' | 'rating' | 'newest' | 'price-low' | 'price-high'
): Course[] {
  const sorted = [...courses];
  
  switch (sortBy) {
    case 'popular':
      return sorted.sort((a, b) => b.students - a.students);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id);
    case 'price-low':
      return sorted.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceA - priceB;
      });
    case 'price-high':
      return sorted.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceB - priceA;
      });
    default:
      return sorted;
  }
}
