/**
 * Course Adapter - Converts courses from all-courses.ts format to Course type from types/course.ts
 */

import { Course as CourseFromAllCourses } from '@/data/courses/all-courses';
import { Course as CourseFromTypes, CourseInstructor } from '@/types/course';

/**
 * Default instructor data for courses without instructor information
 */
const defaultInstructor: CourseInstructor = {
  id: 'default',
  name: 'مدرب المنصة',
  title: 'خبير تعليمي',
  avatar: '/avatars/default-instructor.jpg',
  rating: 4.5,
  students: 0,
  courses: 0,
  bio: 'مدرب متخصص في المحتوى التعليمي',
};

/**
 * Convert price string to number
 */
function parsePrice(priceString: string): number {
  // Remove all non-numeric characters except decimal point
  const numericString = priceString.replace(/[^\d.]/g, '');
  const price = parseFloat(numericString) || 0;
  return price;
}

/**
 * Convert Course from all-courses.ts format to Course from types/course.ts
 */
export function adaptCourse(course: CourseFromAllCourses): CourseFromTypes {
  // Extract numeric ID and convert to string
  const courseId = String(course.id);
  
  // Parse price
  const price = parsePrice(course.price);
  
  // Build instructor object (use default since all-courses.ts doesn't have instructor data)
  const instructor: CourseInstructor = {
    ...defaultInstructor,
    id: `instructor-${courseId}`,
    name: defaultInstructor.name,
    title: defaultInstructor.title,
    avatar: defaultInstructor.avatar,
    rating: course.rating || defaultInstructor.rating,
    students: course.students || defaultInstructor.students,
    courses: defaultInstructor.courses,
    bio: defaultInstructor.bio,
  };

  // Build the adapted course
  const adaptedCourse: CourseFromTypes = {
    id: courseId,
    title: course.title,
    slug: course.slug,
    description: course.description,
    instructor,
    level: course.level,
    category: course.category as any, // Type assertion for category
    duration: course.duration,
    students: course.students,
    rating: course.rating,
    reviewCount: Math.floor(course.students * 0.1), // Estimate review count
    price,
    image: course.image,
    filesCount: course.files || 0,
    isOngoing: true, // Default to ongoing
    // Additional fields from all-courses format
    totalFiles: course.files || 0,
    // Optional fields
    tags: [],
    createdAt: undefined,
    updatedAt: undefined,
  };

  return adaptedCourse;
}

/**
 * Convert array of courses from all-courses.ts format to Course array from types/course.ts
 */
export function adaptCourses(courses: CourseFromAllCourses[]): CourseFromTypes[] {
  return courses.map(adaptCourse);
}

