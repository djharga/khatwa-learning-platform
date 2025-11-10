'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X, AlertTriangle } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
  timestamp: number;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: Date.now(),
      duration: notification.duration || 5000,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => setNotifications([]);

  useEffect(() => {
    const timers = notifications.map((n) =>
      n.duration
        ? setTimeout(() => removeNotification(n.id), n.duration)
        : null
    );
    return () => timers.forEach((t) => t && clearTimeout(t));
  }, [notifications]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAllNotifications }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  const icons = {
    success: <CheckCircle className="w-6 h-6 text-green-500" />,
    error: <XCircle className="w-6 h-6 text-red-500" />,
    info: <Info className="w-6 h-6 text-blue-500" />,
    warning: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
  };

  const colors = {
    success: 'from-green-100/70 via-green-50/50 to-transparent dark:from-green-900/20',
    error: 'from-red-100/70 via-red-50/50 to-transparent dark:from-red-900/20',
    info: 'from-blue-100/70 via-blue-50/50 to-transparent dark:from-blue-900/20',
    warning: 'from-yellow-100/70 via-yellow-50/50 to-transparent dark:from-yellow-900/20',
  };

  return (
    <div className="fixed top-6 right-6 z-50 space-y-4 w-[22rem] max-w-full">
      <AnimatePresence initial={false}>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="relative rounded-2xl overflow-hidden border border-white/20 bg-white/60 dark:bg-neutral-900/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${colors[n.type]} pointer-events-none`} />
            <div className="relative flex items-start p-4 gap-3">
              <div className="relative flex-shrink-0">
                <div
                  className={`absolute inset-0 blur-md opacity-40 ${
                    n.type === 'success'
                      ? 'bg-green-400'
                      : n.type === 'error'
                      ? 'bg-red-400'
                      : n.type === 'info'
                      ? 'bg-blue-400'
                      : 'bg-yellow-400'
                  }`}
                />
                <div className="relative z-10">{icons[n.type]}</div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1 truncate">
                  {n.title}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {n.message}
                </p>
              </div>

              <button
                onClick={() => removeNotification(n.id)}
                className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition"
                aria-label="إغلاق"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100" />
              </button>
            </div>

            {/* Progress Bar */}
            {n.duration && (
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: 0 }}
                transition={{ duration: n.duration / 1000, ease: 'linear' }}
                className={`absolute bottom-0 left-0 h-[3px] ${
                  n.type === 'success'
                    ? 'bg-green-500'
                    : n.type === 'error'
                    ? 'bg-red-500'
                    : n.type === 'info'
                    ? 'bg-blue-500'
                    : 'bg-yellow-500'
                }`}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationProvider;
