'use client';

import React, { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ChevronUp,
  ChevronDown,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
} from 'lucide-react';
import { CourseStatus } from '@/types/course';

interface Course {
  id: string;
  title: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  date: string;
  students: number;
  status: CourseStatus;
  progress?: number;
  rating?: number;
  price?: number;
  category?: string;
  level?: string;
}

interface CourseTableRowProps {
  course: Course;
  index: number;
  onClick?: (course: Course) => void;
  onEdit?: (course: Course) => void;
  onDelete?: (course: Course) => void;
  onView?: (course: Course) => void;
  onDownload?: (course: Course) => void;
  isSelected?: boolean;
  showActions?: boolean;
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: (field: string) => void;
}

const CourseTableRow: React.FC<CourseTableRowProps> = memo(
  ({
    course,
    index,
    onClick,
    onEdit,
    onDelete,
    onView,
    onDownload,
    isSelected = false,
    showActions = true,
    sortable = false,
    sortDirection = null,
    onSort,
  }) => {
    const [showMenu, setShowMenu] = useState(false);

    const getStatusColor = useCallback((status: CourseStatus) => {
      switch (status) {
        case 'نشط':
          return 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20';
        case 'مكتمل':
          return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
        case 'قيد المراجعة':
          return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20';
        case 'معتمد':
          return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20';
        case 'مرفوض':
          return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20';
        default:
          return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20';
      }
    }, []);

    const handleSort = useCallback(
      (field: string) => {
        if (sortable && onSort) {
          onSort(field);
        }
      },
      [sortable, onSort]
    );

    const handleMenuToggle = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      setShowMenu((prev) => !prev);
    }, []);

    const handleAction = useCallback(
      (action: () => void, e: React.MouseEvent) => {
        e.stopPropagation();
        setShowMenu(false);
        action();
      },
      []
    );

    return (
      <motion.tr
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.005,
          backgroundColor: 'rgba(59, 130, 246, 0.05)',
        }}
        transition={{ duration: 0.2, delay: index * 0.05 }}
        className={`border-b border-gray-100 dark:border-gray-700 transition-all duration-300 cursor-pointer relative ${
          isSelected
            ? 'bg-blue-50 dark:bg-blue-900/20'
            : 'bg-white dark:bg-gray-800'
        } ${index % 2 === 0 ? '' : 'bg-gray-25 dark:bg-gray-800/50'}`}
        onClick={() => onClick?.(course)}
        role="button"
        tabIndex={0}
        aria-label={`دورة ${course.title} بواسطة ${course.instructor.name}`}
      >
        {/* Course Title and Instructor */}
        <td className="py-4 px-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                width={40}
                height={40}
                className="rounded-full transition-transform duration-200 hover:scale-110"
              />
              {course.progress && course.progress > 0 && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold drop-shadow-sm">
                    {Math.round(course.progress)}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {course.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {course.instructor.name}
              </div>
            </div>
          </div>
        </td>

        {/* Date */}
        <td className="py-4 px-4">
          <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
            {course.date}
          </span>
        </td>

        {/* Students */}
        <td className="py-4 px-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-normal text-gray-900 dark:text-gray-100">
              {course.students.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              طالب
            </span>
          </div>
        </td>

        {/* Status */}
        <td className="py-4 px-4">
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(course.status)}`}
          >
            {course.status}
          </span>
        </td>

        {/* Actions */}
        {showActions && (
          <td className="py-4 px-4">
            <div className="relative">
              <motion.button
                onClick={handleMenuToggle}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="المزيد من الخيارات"
              >
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </motion.button>

              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                >
                  <div className="py-2">
                    {onView && (
                      <button
                        onClick={(e) => handleAction(() => onView(course), e)}
                        className="w-full px-4 py-2 text-right text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        عرض
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={(e) => handleAction(() => onEdit(course), e)}
                        className="w-full px-4 py-2 text-right text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        تعديل
                      </button>
                    )}
                    {onDownload && (
                      <button
                        onClick={(e) =>
                          handleAction(() => onDownload(course), e)
                        }
                        className="w-full px-4 py-2 text-right text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        تحميل
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={(e) => handleAction(() => onDelete(course), e)}
                        className="w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        حذف
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </td>
        )}
      </motion.tr>
    );
  }
);

CourseTableRow.displayName = 'CourseTableRow';

export default CourseTableRow;
