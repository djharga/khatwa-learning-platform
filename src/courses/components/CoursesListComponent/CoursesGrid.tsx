import { motion } from 'framer-motion';
import { Course } from '@/types/course';
import CourseCard from '@/components/CourseCard';

/**
 * Courses grid component that handles loading states and course card rendering. Supports both grid and list view modes with staggered entrance animations. Displays skeleton loaders during data fetching.
 * @param courses - Array of courses to display
 * @param viewMode - Display mode
 * @param isLoading - Loading state
 * @param onBookmark - Bookmark handler
 * @param onShare - Share handler
 * @param onEnroll - Enroll handler
 * @returns Memoized courses grid component
 */
export interface CoursesGridProps {
  courses: Course[];
  viewMode: 'grid' | 'list';
  isLoading: boolean;
  onBookmark: (courseId: string) => void;
  onShare: (courseId: string) => void;
  onEnroll: (courseId: string) => void;
}

const CoursesGrid: React.FC<CoursesGridProps> = ({ courses, viewMode, isLoading, onBookmark, onShare, onEnroll }) => {
  const gridClasses = viewMode === 'grid' ? 'grid gap-8 lg:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid gap-8 lg:gap-10 grid-cols-1';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className={gridClasses}
    >
      {isLoading ? (
        // Loading skeletons
        Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse"
          >
            <div className="h-56 bg-gray-300"></div>
            <div className="p-8">
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-6"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          </motion.div>
        ))
      ) : courses.length > 0 ? (
        courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -10, scale: 1.03 }}
          >
            <CourseCard
              course={course}
              variant={viewMode === 'list' ? 'compact' : 'default'}
              onBookmark={onBookmark}
              onShare={onShare}
              onEnroll={onEnroll}
              isLoading={false}
            />
          </motion.div>
        ))
      ) : (
        // Empty state is handled by parent component
        null
      )}
    </motion.div>
  );
};

export default CoursesGrid;