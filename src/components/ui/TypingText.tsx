'use client';

import React from 'react';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { cn } from '@/lib/utils';

interface TypingTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** النص الكامل المراد كتابته */
  text: string;
  /** سرعة الكتابة بالمللي ثانية */
  speed?: number;
  /** تأخير البدء بالمللي ثانية */
  delay?: number;
  /** ما إذا كان التأثير يتكرر */
  loop?: boolean;
  /** فاصل التكرار بالمللي ثانية */
  loopDelay?: number;
  /** عرض مؤشر الكتابة */
  showCursor?: boolean;
  /** لون مؤشر الكتابة */
  cursorColor?: string;
  /** حجم مؤشر الكتابة */
  cursorSize?: string;
  /** callback عند انتهاء الكتابة */
  onComplete?: () => void;
  /** callback لكل حرف مكتوب */
  onType?: (text: string, index: number) => void;
}

/**
 * مكون نص بتأثير كتابة تدريجي
 * يدعم جميع خيارات التخصيص والإمكانية الوصول
 */
export function TypingText({
  text,
  speed = 100,
  delay = 0,
  loop = false,
  loopDelay = 2000,
  showCursor = true,
  cursorColor = 'text-primary-500',
  cursorSize = 'text-lg',
  onComplete,
  onType,
  className,
  ...props
}: TypingTextProps) {
  const { displayText, isComplete, restart, stop, resume } = useTypingEffect({
    text,
    speed,
    delay,
    loop,
    loopDelay,
    onComplete,
    onType,
  });

  return (
    <span
      className={cn(
        'inline-block',
        className
      )}
      role="text"
      aria-live="polite"
      aria-label={isComplete ? text : `يكتب: ${displayText}`}
      {...props}
    >
      {displayText}
      {showCursor && !isComplete && (
        <span
          className={cn(
            'inline-block animate-pulse ml-1',
            cursorColor,
            cursorSize
          )}
          aria-hidden="true"
        >
          |
        </span>
      )}
    </span>
  );
}

/**
 * مكون عنوان رئيسي بتأثير كتابة تدريجي
 * مثال على الاستخدام الشائع
 */
export function TypingHeading({
  text,
  speed = 80,
  delay = 500,
  loop = false,
  className,
  ...props
}: Omit<TypingTextProps, 'showCursor' | 'cursorColor' | 'cursorSize'>) {
  return (
    <TypingText
      text={text}
      speed={speed}
      delay={delay}
      loop={loop}
      showCursor={true}
      cursorColor="text-primary-500"
      cursorSize="text-2xl"
      className={cn(
        'text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white',
        className
      )}
      {...props}
    />
  );
}

// تصدير الـ hook أيضاً للاستخدام المباشر
export { useTypingEffect };
