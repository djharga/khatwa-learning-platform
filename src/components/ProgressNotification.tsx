'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, TrendingUp, Zap, Target, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  type: 'achievement' | 'progress' | 'milestone' | 'improvement';
  title: string;
  message: string;
  icon: React.ReactNode;
  color: string;
  duration?: number; // in milliseconds
}

interface ProgressNotificationProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const ProgressNotification: React.FC<ProgressNotificationProps> = ({
  notifications,
  onDismiss,
}) => {
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 space-y-3">
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
              delay: index * 0.1,
            }}
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-l-4 p-4 max-w-md ${
              notification.color === 'green'
                ? 'border-l-green-500'
                : notification.color === 'blue'
                  ? 'border-l-blue-500'
                  : notification.color === 'yellow'
                    ? 'border-l-yellow-500'
                    : notification.color === 'purple'
                      ? 'border-l-purple-500'
                      : 'border-l-primary'
            }`}
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  notification.color === 'green'
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : notification.color === 'blue'
                      ? 'bg-blue-100 dark:bg-blue-900/30'
                      : notification.color === 'yellow'
                        ? 'bg-yellow-100 dark:bg-yellow-900/30'
                        : notification.color === 'purple'
                          ? 'bg-purple-100 dark:bg-purple-900/30'
                          : 'bg-primary/10'
                }`}
              >
                <div
                  className={
                    notification.color === 'green'
                      ? 'text-green-600 dark:text-green-400'
                      : notification.color === 'blue'
                        ? 'text-blue-600 dark:text-blue-400'
                        : notification.color === 'yellow'
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : notification.color === 'purple'
                            ? 'text-purple-600 dark:text-purple-400'
                            : 'text-primary'
                  }
                >
                  {notification.icon}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {notification.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => onDismiss(notification.id)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>

            {/* Progress bar for timed notifications */}
            {notification.duration && (
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{
                  duration: notification.duration / 1000,
                  ease: 'linear',
                }}
                className={`h-1 mt-3 rounded-full ${
                  notification.color === 'green'
                    ? 'bg-green-200 dark:bg-green-900/50'
                    : notification.color === 'blue'
                      ? 'bg-blue-200 dark:bg-blue-900/50'
                      : notification.color === 'yellow'
                        ? 'bg-yellow-200 dark:bg-yellow-900/50'
                        : notification.color === 'purple'
                          ? 'bg-purple-200 dark:bg-purple-900/50'
                          : 'bg-primary/20'
                }`}
              >
                <div
                  className={`h-full rounded-full ${
                    notification.color === 'green'
                      ? 'bg-green-500'
                      : notification.color === 'blue'
                        ? 'bg-blue-500'
                        : notification.color === 'yellow'
                          ? 'bg-yellow-500'
                          : notification.color === 'purple'
                            ? 'bg-purple-500'
                            : 'bg-primary'
                  }`}
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Hook for managing notifications
export const useProgressNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    const newNotification: Notification = { ...notification, id };

    setNotifications((prev) => [...prev, newNotification]);

    // Auto dismiss after duration
    if (newNotification.duration) {
      setTimeout(() => {
        dismissNotification(id);
      }, newNotification.duration);
    }
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAllNotifications,
  };
};

// Predefined notification templates
export const notificationTemplates = {
  examCompleted: (score: number): Omit<Notification, 'id'> => ({
    type: 'achievement',
    title: 'اختبار مكتمل!',
    message: `لقد أكملت الاختبار بدرجة ${score.toFixed(1)}%`,
    icon: <CheckCircle className="w-5 h-5" />,
    color: score >= 90 ? 'green' : score >= 70 ? 'blue' : 'yellow',
    duration: 5000,
  }),

  progressMilestone: (
    completed: number,
    total: number
  ): Omit<Notification, 'id'> => ({
    type: 'milestone',
    title: 'معلم تقدم',
    message: `أكملت ${completed} من ${total} اختبار`,
    icon: <Target className="w-5 h-5" />,
    color: 'blue',
    duration: 4000,
  }),

  improvement: (improvement: number): Omit<Notification, 'id'> => ({
    type: 'improvement',
    title: 'تحسن ملحوظ!',
    message: `زيادة في الأداء بنسبة ${improvement.toFixed(1)}%`,
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'green',
    duration: 4500,
  }),

  speedAchievement: (): Omit<Notification, 'id'> => ({
    type: 'achievement',
    title: 'سرعة فائقة',
    message: 'أكملت الاختبار في وقت قياسي!',
    icon: <Zap className="w-5 h-5" />,
    color: 'yellow',
    duration: 4000,
  }),

  badgeEarned: (badgeName: string): Omit<Notification, 'id'> => ({
    type: 'achievement',
    title: 'شارة جديدة!',
    message: `مبروك! حصلت على شارة "${badgeName}"`,
    icon: <Award className="w-5 h-5" />,
    color: 'purple',
    duration: 6000,
  }),
};

export default ProgressNotification;
