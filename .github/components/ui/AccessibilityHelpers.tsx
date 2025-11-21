'use client';

import { useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Accessibility Helpers - مساعدات إمكانية الوصول
 * 
 * This component provides various accessibility enhancements:
 * - Keyboard navigation focus management
 * - Screen reader announcements
 * - Focus trap for modals
 * - Skip links
 */

// Skip to main content link
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      الانتقال إلى المحتوى الرئيسي
    </a>
  );
}

// Focus trap for modals
export function useFocusTrap(isActive: boolean) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isActive) return;

    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);
}

// Screen reader announcements
export function useAnnounce(message: string, priority: 'polite' | 'assertive' = 'polite') {
  useEffect(() => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    const timeout = setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
    
    return () => {
      clearTimeout(timeout);
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    };
  }, [message, priority]);
}

// Keyboard navigation handler
export function useKeyboardNavigation<T extends HTMLElement = HTMLDivElement>(
  items: Array<{ id: string }>,
  onSelect: (id: string) => void
) {
  const handleKeyDown = (e: React.KeyboardEvent<T>, currentIndex: number) => {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % items.length;
        onSelect(items[nextIndex].id);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        onSelect(items[prevIndex].id);
        break;
      case 'Home':
        e.preventDefault();
        onSelect(items[0].id);
        break;
      case 'End':
        e.preventDefault();
        onSelect(items[items.length - 1].id);
        break;
    }
  };

  return handleKeyDown;
}

