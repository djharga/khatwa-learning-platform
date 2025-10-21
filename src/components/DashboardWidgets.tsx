'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Calendar,
  Award,
  BookOpen,
  Settings,
  GripVertical,
} from 'lucide-react';
import { Button } from './ui';
import useLocalStorage from '../hooks/useLocalStorage';

interface Widget {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  size: 'small' | 'medium' | 'large';
  visible: boolean;
}

const DashboardWidgets: React.FC = () => {
  const [widgets, setWidgets] = useLocalStorage<Widget[]>('dashboardWidgets', [
    {
      id: 'progress',
      title: 'التقدم الدراسي',
      icon: <TrendingUp className="w-5 h-5" />,
      size: 'medium',
      visible: true,
      component: (
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">التقدم الدراسي</h3>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>الإكمال العام</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: '75%' }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600">دورة مكتملة</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-sm text-gray-600">دورة نشطة</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'calendar',
      title: 'الجدول الزمني',
      icon: <Calendar className="w-5 h-5" />,
      size: 'medium',
      visible: true,
      component: (
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">الجدول الزمني</h3>
            <Calendar className="w-6 h-6 text-blue-500" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 space-x-reverse p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <div className="font-medium">امتحان المحاسبة المالية</div>
                <div className="text-sm text-gray-600">غداً - 10:00 ص</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <div className="font-medium">ورشة عمل التدقيق</div>
                <div className="text-sm text-gray-600">الأربعاء - 2:00 م</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'achievements',
      title: 'الإنجازات',
      icon: <Award className="w-5 h-5" />,
      size: 'small',
      visible: true,
      component: (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">الإنجازات</h3>
            <Award className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-1">5</div>
            <div className="text-xs text-gray-600">شارات تم الحصول عليها</div>
          </div>
        </div>
      ),
    },
    {
      id: 'courses',
      title: 'الدورات الموصى بها',
      icon: <BookOpen className="w-5 h-5" />,
      size: 'large',
      visible: true,
      component: (
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">موصى لك</h3>
            <BookOpen className="w-6 h-6 text-purple-500" />
          </div>
          <div className="space-y-3">
            <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium">إدارة المخاطر المالية</div>
              <div className="text-sm text-gray-600">
                بناءً على تقدمك في المحاسبة
              </div>
            </div>
            <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium">التحليل المالي المتقدم</div>
              <div className="text-sm text-gray-600">
                شائع بين الطلاب المتميزين
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]);

  const [isEditMode, setIsEditMode] = useState(false);

  const toggleWidgetVisibility = (id: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, visible: !w.visible } : w))
    );
  };

  const visibleWidgets = widgets.filter((w) => w.visible);

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'col-span-1 row-span-1';
      case 'medium':
        return 'col-span-2 row-span-1';
      case 'large':
        return 'col-span-3 row-span-2';
      default:
        return 'col-span-2 row-span-1';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          لوحة التحكم
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setIsEditMode(!isEditMode)}
            variant={isEditMode ? 'primary' : 'outline'}
            size="sm"
          >
            {isEditMode ? 'تم' : 'تخصيص'}
          </Button>
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-6 gap-6 auto-rows-min">
        {visibleWidgets.map((widget, index) => (
          <motion.div
            key={widget.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${getSizeClasses(widget.size)} bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden`}
          >
            {isEditMode && (
              <div className="p-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium">{widget.title}</span>
                </div>
                <button
                  onClick={() => toggleWidgetVisibility(widget.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label={`إخفاء ${widget.title}`}
                >
                  ×
                </button>
              </div>
            )}
            {widget.component}
          </motion.div>
        ))}
      </div>

      {/* Hidden Widgets */}
      {isEditMode && widgets.filter((w) => !w.visible).length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">الويدجيتات المخفية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {widgets
              .filter((w) => !w.visible)
              .map((widget) => (
                <button
                  key={widget.id}
                  onClick={() => toggleWidgetVisibility(widget.id)}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    {widget.icon}
                    <span className="font-medium">{widget.title}</span>
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardWidgets;
