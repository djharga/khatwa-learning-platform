import { motion } from 'framer-motion';
import { BarChart3, PieChart, Activity } from 'lucide-react';

export interface AnalyticsTabProps {
  deviceInfo: any;
  totalCourses: number;
  completedCourses: number;
  totalHours: number;
  averageProgress: number;
}

export const AnalyticsTab = ({
  deviceInfo,
  totalCourses,
  completedCourses,
  totalHours,
  averageProgress,
}: AnalyticsTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <h3 className="text-xl font-bold mb-4">التحليلات</h3>
        
        {/* محتوى تبويب التحليلات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h4>إحصائيات التعلم</h4>
            <p>عدد الدورات: {totalCourses}</p>
            <p>الدورات المكتملة: {completedCourses}</p>
            <p>متوسط التقدم: {averageProgress}%</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4>معلومات الجهاز</h4>
            <p>نظام التشغيل: {deviceInfo.os}</p>
            <p>المتصفح: {deviceInfo.browser}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
