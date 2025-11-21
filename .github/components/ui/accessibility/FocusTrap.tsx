'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface FocusTrapProps {
  children: ReactNode;
  isActive: boolean;
  restoreFocus?: boolean;
  className?: string;
}

/**
 * FocusTrap: يحصر التنقل داخل المكون (مثل المودال أو القائمة)
 * بدون كسر أو تأثير على تجربة المستخدم.
 */
export default function FocusTrap({
  children,
  isActive,
  restoreFocus = true,
  className = ''
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    // حفظ آخر عنصر كان عليه التركيز
    lastFocused.current = document.activeElement as HTMLElement;

    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute('disabled'));

    if (focusable.length) focusable[0].focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => {
      document.removeEventListener('keydown', handleTab);
      if (restoreFocus && lastFocused.current) lastFocused.current.focus();
    };
  }, [isActive, restoreFocus]);

  return (
    <div
      ref={containerRef}
      className={className}
      role="dialog"
      aria-modal={isActive || undefined}
    >
      {children}
    </div>
  );
}
