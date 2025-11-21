'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, TrendingUp, Zap, Target, Award } from 'lucide-react';
import { useState } from 'react';

type NotificationType = 'achievement' | 'progress' | 'milestone' | 'improvement';
interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  icon: React.ReactNode;
  color: 'green' | 'blue' | 'yellow' | 'purple' | string;
  duration?: number;
}

export const ProgressNotification = ({
  notifications,
  onDismiss,
}: {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}) => {
  const colorClasses = (color: string) => ({
    border: `border-l-${color}-500`,
    bg: `bg-${color}-100 dark:bg-${color}-900/30`,
    text: `text-${color}-600 dark:text-${color}-400`,
    bar: `bg-${color}-500`,
    barBg: `bg-${color}-200 dark:bg-${color}-900/50`,
  });

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 space-y-3">
      <AnimatePresence>
        {notifications.map((n, i) => {
          const c = colorClasses(n.color);
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25, delay: i * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-l-4 p-4 max-w-md ${c.border}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${c.bg}`}>
                  <div className={c.text}>{n.icon}</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{n.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{n.message}</p>
                </div>
                <button
                  onClick={() => onDismiss(n.id)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
              </div>
              {n.duration && (
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: n.duration / 1000, ease: 'linear' }}
                  className={`h-1 mt-3 rounded-full ${c.barBg}`}
                >
                  <div className={`h-full rounded-full ${c.bar}`} />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export const useProgressNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const add = (n: Omit<Notification, 'id'>) => {
    const id = crypto.randomUUID();
    const item = { ...n, id };
    setNotifications((p) => [...p, item]);
    if (item.duration) setTimeout(() => dismiss(id), item.duration);
  };

  const dismiss = (id: string) => setNotifications((p) => p.filter((n) => n.id !== id));
  const clear = () => setNotifications([]);

  return { notifications, add, dismiss, clear };
};

export const notificationTemplates = {
  examCompleted: (score: number): Omit<Notification, 'id'> => ({
    type: 'achievement' as NotificationType,
    title: 'اختبار مكتمل!',
    message: `حصلت على ${score.toFixed(1)}%`,
    icon: <CheckCircle className="w-5 h-5" />,
    color: score >= 90 ? 'green' : score >= 70 ? 'blue' : 'yellow',
    duration: 5000,
  }),
  progressMilestone: (done: number, total: number): Omit<Notification, 'id'> => ({
    type: 'milestone' as NotificationType,
    title: 'تقدم رائع!',
    message: `أنجزت ${done} من ${total} اختبارات`,
    icon: <Target className="w-5 h-5" />,
    color: 'blue',
    duration: 4000,
  }),
  improvement: (value: number): Omit<Notification, 'id'> => ({
    type: 'improvement' as NotificationType,
    title: 'تحسّن ملحوظ!',
    message: `زادت نتائجك بنسبة ${value.toFixed(1)}%`,
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'green',
    duration: 4500,
  }),
  speedAchievement: (): Omit<Notification, 'id'> => ({
    type: 'achievement' as NotificationType,
    title: 'سرعة فائقة!',
    message: 'أنجزت الاختبار في وقت قياسي!',
    icon: <Zap className="w-5 h-5" />,
    color: 'yellow',
    duration: 4000,
  }),
  badgeEarned: (name: string): Omit<Notification, 'id'> => ({
    type: 'achievement' as NotificationType,
    title: 'شارة جديدة!',
    message: `حصلت على شارة "${name}"`,
    icon: <Award className="w-5 h-5" />,
    color: 'purple',
    duration: 6000,
  }),
};
