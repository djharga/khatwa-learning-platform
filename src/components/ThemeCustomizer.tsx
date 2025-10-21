'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, Layout, Sun, Moon, Monitor } from 'lucide-react';
import { Button } from './ui';
import useLocalStorage from '../hooks/useLocalStorage';

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  isOpen,
  onClose,
}) => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark' | 'system'>(
    'theme',
    'system'
  );
  const [primaryColor, setPrimaryColor] = useLocalStorage(
    'primaryColor',
    '#6366f1'
  );
  const [fontSize, setFontSize] = useLocalStorage<'small' | 'medium' | 'large'>(
    'fontSize',
    'medium'
  );
  const [cardStyle, setCardStyle] = useLocalStorage<
    'compact' | 'comfortable' | 'spacious'
  >('cardStyle', 'comfortable');

  const [tempTheme, setTempTheme] = useState(theme);
  const [tempPrimaryColor, setTempPrimaryColor] = useState(primaryColor);
  const [tempFontSize, setTempFontSize] = useState(fontSize);
  const [tempCardStyle, setTempCardStyle] = useState(cardStyle);

  // ESC key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.getElementById('theme-customizer-modal');
    const focusableContent = modal?.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent?.[0] as HTMLElement;
    const lastFocusableElement = focusableContent?.[
      focusableContent.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement?.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstFocusableElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);

  const applyTheme = () => {
    setTheme(tempTheme);
    setPrimaryColor(tempPrimaryColor);
    setFontSize(tempFontSize);
    setCardStyle(tempCardStyle);

    // Apply theme changes
    const root = document.documentElement;
    root.style.setProperty('--color-primary', tempPrimaryColor);

    // Apply font size
    const fontSizes = { small: '14px', medium: '16px', large: '18px' };
    root.style.setProperty('--font-size-base', fontSizes[tempFontSize]);

    // Apply theme class
    const html = document.documentElement;
    if (tempTheme === 'dark') {
      html.classList.add('dark');
    } else if (tempTheme === 'light') {
      html.classList.remove('dark');
    } else {
      // system
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      if (systemTheme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }

    onClose();
  };

  const resetToDefaults = () => {
    setTempTheme('system');
    setTempPrimaryColor('#6366f1');
    setTempFontSize('medium');
    setTempCardStyle('comfortable');
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="theme-customizer-title"
        aria-describedby="theme-customizer-description"
        id="theme-customizer-modal"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              تخصيص المظهر
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="إغلاق"
            >
              ×
            </button>
          </div>

          {/* Theme Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Sun className="w-4 h-4 mr-2" />
              السمة
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'light' as const, label: 'فاتح', icon: Sun },
                { value: 'dark' as const, label: 'داكن', icon: Moon },
                { value: 'system' as const, label: 'النظام', icon: Monitor },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setTempTheme(value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    tempTheme === value
                      ? 'border-primary bg-primary bg-opacity-10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Primary Color */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Palette className="w-4 h-4 mr-2" />
              اللون الأساسي
            </h3>
            <div className="flex items-center space-x-3 space-x-reverse">
              <input
                type="color"
                value={tempPrimaryColor}
                onChange={(e) => setTempPrimaryColor(e.target.value)}
                className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                اختر لونك المفضل
              </span>
            </div>
          </div>

          {/* Font Size */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Type className="w-4 h-4 mr-2" />
              حجم الخط
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'small' as const, label: 'صغير' },
                { value: 'medium' as const, label: 'متوسط' },
                { value: 'large' as const, label: 'كبير' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setTempFontSize(value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    tempFontSize === value
                      ? 'border-primary bg-primary bg-opacity-10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Card Style */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Layout className="w-4 h-4 mr-2" />
              نمط البطاقات
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'compact' as const, label: 'مضغوط' },
                { value: 'comfortable' as const, label: 'مريح' },
                { value: 'spacious' as const, label: 'واسع' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setTempCardStyle(value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    tempCardStyle === value
                      ? 'border-primary bg-primary bg-opacity-10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 space-x-reverse">
            <Button
              onClick={resetToDefaults}
              variant="outline"
              className="flex-1"
            >
              إعادة تعيين
            </Button>
            <Button onClick={applyTheme} className="flex-1">
              تطبيق
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ThemeCustomizer;
