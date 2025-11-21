'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  RefreshCw,
  AlertCircle,
  Play,
  Pause,
} from 'lucide-react';
import type { CourseSchedule } from '@/types/course-management';
import { courseSchedulerService } from '@/services/courseSchedulerService';
import toast from 'react-hot-toast';

interface CourseSchedulerProps {
  courseId: string;
  className?: string;
}

const CourseScheduler: FC<CourseSchedulerProps> = ({ courseId, className = '' }) => {
  const [schedules, setSchedules] = useState<CourseSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    action: 'open' as 'open' | 'close',
    scheduledDate: '',
  });

  useEffect(() => {
    loadSchedules();
  }, [courseId]);

  const loadSchedules = async () => {
    try {
      setLoading(true);
      const data = await courseSchedulerService.getScheduledCourses();
      setSchedules(data.filter((s) => s.courseId === courseId));
    } catch (error) {
      console.error('Error loading schedules:', error);
      toast.error('فشل تحميل الجداول');
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = async () => {
    if (!newSchedule.scheduledDate) {
      toast.error('تاريخ الجدولة مطلوب');
      return;
    }

    try {
      await courseSchedulerService.scheduleCourse(
        courseId,
        newSchedule.action,
        newSchedule.scheduledDate
      );
      toast.success('تم جدولة الدورة بنجاح');
      setShowScheduleModal(false);
      setNewSchedule({ action: 'open', scheduledDate: '' });
      await loadSchedules();
    } catch (error: any) {
      console.error('Error scheduling course:', error);
      toast.error(error.message || 'فشل جدولة الدورة');
    }
  };

  const handleCancelSchedule = async (scheduleId: string) => {
    if (!confirm('هل أنت متأكد من إلغاء هذه الجدولة؟')) return;

    try {
      await courseSchedulerService.cancelSchedule(scheduleId);
      toast.success('تم إلغاء الجدولة بنجاح');
      await loadSchedules();
    } catch (error: any) {
      console.error('Error canceling schedule:', error);
      toast.error(error.message || 'فشل إلغاء الجدولة');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                الجدولة التلقائية
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                فتح/إغلاق الدورة تلقائياً حسب التاريخ
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            جدولة جديدة
          </button>
        </div>
      </div>

      <div className="p-4">
        {schedules.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>لا توجد جداول</p>
          </div>
        ) : (
          <div className="space-y-3">
            {schedules.map((schedule) => (
              <motion.div
                key={schedule.courseId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-4">
                  {schedule.action === 'open' ? (
                    <Play className="w-5 h-5 text-green-600" />
                  ) : (
                    <Pause className="w-5 h-5 text-red-600" />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {schedule.action === 'open' ? 'فتح الدورة' : 'إغلاق الدورة'}
                      </span>
                      {schedule.executed ? (
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          منفذ
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          في الانتظار
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(schedule.scheduledDate)}</span>
                    </div>
                    {schedule.executedAt && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        تم التنفيذ: {formatDate(schedule.executedAt)}
                      </div>
                    )}
                  </div>
                </div>
                {!schedule.executed && (
                  <button
                    onClick={() => handleCancelSchedule(schedule.courseId)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="إلغاء الجدولة"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              جدولة جديدة
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الإجراء
                </label>
                <select
                  value={newSchedule.action}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, action: e.target.value as 'open' | 'close' })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="open">فتح الدورة</option>
                  <option value="close">إغلاق الدورة</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  تاريخ ووقت الجدولة *
                </label>
                <input
                  type="datetime-local"
                  value={newSchedule.scheduledDate}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, scheduledDate: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleSchedule}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                حفظ
              </button>
              <button
                onClick={() => {
                  setShowScheduleModal(false);
                  setNewSchedule({ action: 'open', scheduledDate: '' });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CourseScheduler;

