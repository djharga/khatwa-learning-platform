'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

/**
 * Props for the content protection component with configurable security levels
 */
interface ContentProtectionProps {
  /**
   * Content to be protected from copying, downloading, and unauthorized access
   */
  children: React.ReactNode;
  /**
   * Protection level - basic (minimal), strict (recommended), or maximum (aggressive)
   */
  level?: 'basic' | 'strict' | 'maximum';
  /**
   * Whether to display toast warnings when protection is triggered
   */
  showWarning?: boolean;
  /**
   * Development flag to disable all protection mechanisms
   */
  bypassProtection?: boolean;
}

/**
 * Content protection component that prevents unauthorized copying, downloading, and access to protected content. Implements multiple security layers including right-click prevention, keyboard shortcut blocking, drag-drop prevention, and DevTools detection. Supports three protection levels: basic (minimal restrictions), strict (recommended for most content), and maximum (aggressive protection with DevTools blocking).
 */
const ContentProtection = ({
  children,
  level = 'strict',
  showWarning = true,
  bypassProtection = false
}: ContentProtectionProps) => {
  const [isProtected, setIsProtected] = useState(false);

  useEffect(() => {
    /**
     * Protection strategy: Apply different levels of content protection based on the specified level.
     * Basic: Minimal restrictions (right-click and drag-drop disabled)
     * Strict: Right-click, drag-drop, and selection disabled
     * Maximum: All protections plus DevTools blocking and screenshot detection
     * TODO: DevTools detection is not foolproof and can be bypassed
     */
    // Development mode bypass - skip all protection when flag is set
    if (bypassProtection) {
      setIsProtected(true);
      return;
    }

    let warningShown = false;

    // Right-click protection
    /**
     * Prevents right-click context menu on protected content. Shows warning toast on first attempt.
     */
    const disableRightClick = (e: MouseEvent) => {
      if (level !== 'basic') {
        e.preventDefault();
        if (showWarning && !warningShown) {
          toast.error('النقر اليميني محظور لهذا المحتوى');
          warningShown = true;
        }
        return false;
      }
    };

    // Keyboard shortcuts protection
    /**
     * Blocks keyboard shortcuts for DevTools (F12), view source (Ctrl+U), save (Ctrl+S), print (Ctrl+P), and select all (Ctrl+A). Only active in maximum protection mode.
     */
    const disableShortcuts = (e: KeyboardEvent) => {
      if (level === 'maximum') {
        // تعطيل F12 (DevTools)
        if (e.key === 'F12') {
          e.preventDefault();
          if (showWarning) toast.error('أدوات التطوير محظورة');
          return false;
        }

        // تعطيل Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
          e.preventDefault();
          if (showWarning) toast.error('عرض المصدر محظور');
          return false;
        }

        // تعطيل Ctrl+S (Save)
        if (e.ctrlKey && e.key === 's') {
          e.preventDefault();
          if (showWarning) toast.error('الحفظ محظور');
          return false;
        }

        // تعطيل Ctrl+P (Print)
        if (e.ctrlKey && e.key === 'p') {
          e.preventDefault();
          if (showWarning) toast.error('الطباعة محظورة');
          return false;
        }

        // تعطيل Ctrl+A (Select All)
        if (e.ctrlKey && e.key === 'a') {
          e.preventDefault();
          return false;
        }
      }
    };

    // Drag and drop protection
    /**
     * Prevents drag-and-drop operations on protected content
     */
    const disableDragDrop = (e: DragEvent) => {
      if (level !== 'basic') {
        e.preventDefault();
        return false;
      }
    };

    // Selection protection
    /**
     * Prevents text selection and copying in maximum protection mode
     */
    const disableSelection = (e: Event) => {
      if (level === 'maximum') {
        e.preventDefault();
        return false;
      }
    };

    // Screenshot detection
    /**
     * Detects PrintScreen key press and displays warning. Note: Cannot actually prevent screenshots at OS level.
     */
    const detectScreenshot = () => {
      if (level === 'maximum') {
        if (showWarning) {
          toast.error('لقطات الشاشة محظورة لهذا المحتوى');
        }
        return false;
      }
    };

    // DevTools detection
    /**
     * Detects when browser DevTools are opened by monitoring window size changes. Closes the window if DevTools are detected in maximum protection mode.
     */
    const detectDevTools = () => {
      if (level === 'maximum') {
        const threshold = 160;
        if (window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold) {
          if (showWarning) {
            toast.error('أدوات التطوير محظورة');
          }
          window.close();
        }
      }
    };

    // Register all protection event listeners
    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('keydown', disableShortcuts);
    document.addEventListener('dragstart', disableDragDrop);
    document.addEventListener('selectstart', disableSelection);

    // متغير لحفظ معرف الفاصل الزمني
    let devToolsInterval: NodeJS.Timeout | null = null;

    // اكتشاف محاولات التقاط الشاشة
    if (level === 'maximum') {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'PrintScreen') {
          detectScreenshot();
        }
      });

      // Periodic check for DevTools in maximum protection mode
      devToolsInterval = setInterval(detectDevTools, 1000);
    }

    setIsProtected(true);

    // Clean up all event listeners on component unmount
    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('keydown', disableShortcuts);
      document.removeEventListener('dragstart', disableDragDrop);
      document.removeEventListener('selectstart', disableSelection);
      if (level === 'maximum' && devToolsInterval) {
        clearInterval(devToolsInterval);
      }
    };
  }, [level, showWarning]);

  if (!isProtected) {
    // Show loading spinner while protection is being initialized
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="content-protection" data-protection-level={level}>
      {/* Visual warning banner for users about content protection */}
      {showWarning && level !== 'basic' && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2 text-amber-800 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>
              هذا المحتوى محمي بحقوق الطبع والنشر ولا يمكن نسخه أو مشاركته
            </span>
          </div>
        </div>
      )}

      {/* المحتوى المحمي */}
      <div className={`protected-content ${level === 'maximum' ? 'max-protection' : ''}`}>
        {children}
      </div>

      {/* Hidden watermark for content tracking and identification */}
      <div className="absolute -top-96 -left-96 opacity-0 pointer-events-none select-none">
        Protected Content - خطى التعليمية - {new Date().toISOString()}
      </div>
    </div>
  );
};

export default ContentProtection;