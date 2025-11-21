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

  // Academic Design Icons - 24px as per agent.md
  const icons = {
    success: <CheckCircle className="w-6 h-6 text-[#10B981]" />,
    error: <XCircle className="w-6 h-6 text-[#EF4444]" />,
    info: <Info className="w-6 h-6 text-[#3B82F6]" />,
    warning: <AlertTriangle className="w-6 h-6 text-[#F59E0B]" />,
  };

  // Academic Design Colors from agent.md
  const toastStyles = {
    success: {
      background: '#F0FDF4',
      borderLeft: '4px solid #10B981',
      iconColor: '#10B981',
      titleColor: '#065F46',
      messageColor: '#047857',
      progressColor: '#10B981',
    },
    error: {
      background: '#FEF2F2',
      borderLeft: '4px solid #EF4444',
      iconColor: '#EF4444',
      titleColor: '#991B1B',
      messageColor: '#DC2626',
      progressColor: '#EF4444',
    },
    warning: {
      background: '#FEF3C7',
      borderLeft: '4px solid #F59E0B',
      iconColor: '#F59E0B',
      titleColor: '#92400E',
      messageColor: '#B45309',
      progressColor: '#F59E0B',
    },
    info: {
      background: '#EFF6FF',
      borderLeft: '4px solid #3B82F6',
      iconColor: '#3B82F6',
      titleColor: '#1E40AF',
      messageColor: '#2563EB',
      progressColor: '#3B82F6',
    },
  };

  return (
    <div className="fixed top-6 left-6 z-[10000] space-y-4 w-[360px] max-w-full" dir="rtl">
      <AnimatePresence initial={false}>
        {notifications.map((n) => {
          const styles = toastStyles[n.type];
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="relative rounded-[14px] overflow-hidden bg-white shadow-elevation-4 border-[1px] border-neutral-200"
              style={{
                backgroundColor: styles.background,
                borderLeft: styles.borderLeft,
              }}
            >
              <div className="relative flex items-start p-4 gap-3">
                <div className="relative flex-shrink-0">
                  {icons[n.type]}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 
                    className="text-base font-semibold mb-1 truncate"
                    style={{ color: styles.titleColor }}
                  >
                    {n.title}
                  </h4>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: styles.messageColor }}
                  >
                    {n.message}
                  </p>
                </div>

                <button
                  onClick={() => removeNotification(n.id)}
                  className="p-1 rounded-[10px] hover:bg-black/10 transition-all duration-200 min-w-[24px] min-h-[24px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[rgba(0,0,0,0.1)]"
                  aria-label="إغلاق"
                >
                  <X className="w-5 h-5 text-neutral-500 hover:text-neutral-700" />
                </button>
              </div>

              {/* Progress Bar - Academic Design */}
              {n.duration && (
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: 0 }}
                  transition={{ duration: n.duration / 1000, ease: 'linear' }}
                  className="absolute bottom-0 left-0 h-[2px]"
                  style={{ backgroundColor: styles.progressColor }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default NotificationProvider;
