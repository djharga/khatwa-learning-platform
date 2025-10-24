import { motion } from 'framer-motion';
import { User, Clock, FileText, FileEdit, Sheet, Video, Music } from 'lucide-react';

/**
 * Props for the CourseMeta component
 */
export interface CourseMetaProps {
  /** Number of enrolled students */
  students: number;
  /** Course duration */
  duration: string;
  /** Total number of files */
  filesCount: number;
  /** Whether to show file types breakdown (default: true) */
  showFileTypes?: boolean;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Course metadata section displaying student count, duration, file count, and optional file types breakdown. Features animated entrance and hover effects.
 * 
 * @param props - The props for the component
 * @returns The CourseMeta component
 * 
 * @example
 * ```tsx
 * <CourseMeta
 *   students={1500}
 *   duration="10 ساعات"
 *   filesCount={50}
 *   showFileTypes={true}
 * />
 * ```
 */
const CourseMeta = ({
  students,
  duration,
  filesCount,
  showFileTypes = true,
  className = ''
}: CourseMetaProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Stats grid section */}
      <motion.div
        className="grid grid-cols-3 gap-4 py-4 bg-gray-50 rounded-xl border border-gray-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <motion.div
          className="text-center group/stat"
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-center gap-1 text-gray-600 mb-1 group-hover/stat:text-blue-600 transition-colors duration-300">
            <User className="w-4 h-4" />
            <span className="text-xs font-medium">
              {students.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-gray-600">طالب</p>
        </motion.div>
        <motion.div
          className="text-center group/stat"
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-center gap-1 text-gray-600 mb-1 group-hover/stat:text-green-600 transition-colors duration-300">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium">{duration}</span>
          </div>
          <p className="text-xs text-gray-600">مدة</p>
        </motion.div>
        <motion.div
          className="text-center group/stat"
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-center gap-1 text-gray-600 mb-1 group-hover/stat:text-purple-600 transition-colors duration-300">
            <FileText className="w-4 h-4" />
            <span className="text-xs font-medium">{filesCount}</span>
          </div>
          <p className="text-xs text-gray-600">درس</p>
        </motion.div>
      </motion.div>

      {/* File types section */}
      {showFileTypes && (
        <motion.div
          className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.4 }}
        >
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            أنواع الملفات والمحتوى
          </h4>
          <div className="grid grid-cols-5 gap-2">
            {[
              { type: 'pdf', icon: <FileText className="w-5 h-5" />, label: 'PDF', count: Math.floor(filesCount * 0.4) },
              { type: 'docx', icon: <FileEdit className="w-5 h-5" />, label: 'Word', count: Math.floor(filesCount * 0.3) },
              { type: 'xlsx', icon: <Sheet className="w-5 h-5" />, label: 'Excel', count: Math.floor(filesCount * 0.2) },
              { type: 'video', icon: <Video className="w-5 h-5" />, label: 'فيديو', count: Math.floor(filesCount * 0.05) },
              { type: 'audio', icon: <Music className="w-5 h-5" />, label: 'صوتي', count: Math.floor(filesCount * 0.05) }
            ].map((fileType, index) => (
              <motion.div
                key={fileType.type}
                className="text-center p-2 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="text-lg mb-1">{fileType.icon}</div>
                <div className="text-xs font-bold text-gray-900">{fileType.count}</div>
                <div className="text-xs text-gray-600">{fileType.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-3 pt-3 border-t border-gray-200">
            <span className="text-xs text-gray-600">
              إجمالي الملفات: {filesCount} ملف
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CourseMeta;
