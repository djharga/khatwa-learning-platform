import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Play } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface Course {
  id: string;
  title: string;
  status: 'not_started' | 'in_progress' | 'completed';
}

export interface CoursesTabProps {
  courses: Course[];
  viewMode: "grid" | "list";
  setViewMode: Dispatch<SetStateAction<"grid" | "list">>;
  getStatusLabel: (status: 'not_started' | 'in_progress' | 'completed') => string;
  getStatusColor: (status: 'not_started' | 'in_progress' | 'completed') => string;
}

export const CoursesTab = ({
  courses,
  viewMode,
  setViewMode,
  getStatusLabel,
  getStatusColor,
}: CoursesTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <h3 className="text-xl font-bold mb-4">دوراتي</h3>
        
        {/* محتوى تبويب الدورات */}
        <div className="grid gap-4">
          {courses.map((course) => (
            <div key={course.id} className="border rounded-lg p-4">
              <h4>{course.title}</h4>
              <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor(course.status)}`}>
                {getStatusLabel(course.status)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
