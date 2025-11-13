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
 * يتم استثناء كورسات CIA من النتائج
 */
export function getCoursesByCategory(category: string): Course[] {
  const validCourses = filterValidCourses(allCourses);
  if (category === 'all') {
    return validCourses;
  }
  return validCourses.filter(course => course.category === category);
}

/**
 * فلترة الكورسات (حذف كورسات CIA وكورسات المراجعة الداخلية)
 * كورسات المراجعة الداخلية متاحة فقط في صفحة المراجعة الداخلية (/internal-audit)
 */
export function filterValidCourses(courses: Course[]): Course[] {
  return courses.filter(course => 
    // حذف كورسات CIA
    !course.slug.includes('cia') && 
    !course.title.includes('زمالة') &&
    !course.title.includes('CIA') &&
    course.pageUrl !== '/cia' &&
    // حذف كورسات المراجعة الداخلية
    course.category !== 'المراجعة الداخلية' &&
    !course.title.includes('المراجعة الداخلية') &&
    !course.title.includes('مراجعة داخلية') &&
    !course.slug.includes('internal-audit') &&
    !course.slug.includes('audit')
  );
}

/**
 * الحصول على كورسات المراجعة الداخلية فقط
 * تستخدم في صفحة المراجعة الداخلية لعرض البطاقة الدعائية
 */
export function getInternalAuditCourses(): Course[] {
  return allCourses.filter(course => course.category === 'المراجعة الداخلية');
}

/**
 * الحصول على جميع التصنيفات مع عدد الكورسات في كل تصنيف
 * يتم استثناء كورسات CIA وكورسات المراجعة الداخلية من الحساب
 * كورسات المراجعة الداخلية متاحة فقط في صفحة المراجعة الداخلية (/internal-audit)
 */
export function getCategoriesWithCount(): Array<{ id: string; label: string; count: number }> {
  // فلترة الكورسات (حذف كورسات CIA وكورسات المراجعة الداخلية)
  const validCourses = filterValidCourses(allCourses);
  
  const categoryMap = new Map<string, number>();
  
  validCourses.forEach(course => {
    const count = categoryMap.get(course.category) || 0;
    categoryMap.set(course.category, count + 1);
  });
  
  const categories = Array.from(categoryMap.entries()).map(([category, count]) => ({
    id: category,
    label: category,
    count
  }));
  
  return [
    { id: 'all', label: 'جميع الدورات', count: validCourses.length },
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
