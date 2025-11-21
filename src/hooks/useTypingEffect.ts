'use client';

import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface UseTypingEffectOptions {
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
  /** callback عند انتهاء الكتابة */
  onComplete?: () => void;
  /** callback لكل حرف مكتوب */
  onType?: (text: string, index: number) => void;
}

interface UseTypingEffectReturn {
  /** النص المعروض حالياً */
  displayText: string;
  /** ما إذا كان التأثير مكتملاً */
  isComplete: boolean;
  /** إعادة تشغيل التأثير */
  restart: () => void;
  /** إيقاف التأثير */
  stop: () => void;
  /** استئناف التأثير */
  resume: () => void;
}

/**
 * Hook لإنشاء تأثير كتابة تدريجي (typing effect)
 * يدعم التحكم الكامل والإمكانية الوصول
 */
export function useTypingEffect({
  text,
  speed = 100,
  delay = 0,
  loop = false,
  loopDelay = 2000,
  onComplete,
  onType,
}: UseTypingEffectOptions): UseTypingEffectReturn {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const prefersReducedMotion = useReducedMotion();

  // تنظيف الـ timeout
  const clearCurrentTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  };

  // دالة الكتابة
  const typeNextChar = () => {
    if (currentIndex < text.length) {
      const nextChar = text[currentIndex];
      const newText = displayText + nextChar;

      setDisplayText(newText);
      setCurrentIndex(currentIndex + 1);
      onType?.(newText, currentIndex);

      // جدولة الحرف التالي
      timeoutRef.current = setTimeout(typeNextChar, speed);
    } else {
      // انتهاء الكتابة
      setIsComplete(true);
      onComplete?.();

      // التحقق من التكرار
      if (loop && isActive) {
        timeoutRef.current = setTimeout(() => {
          restart();
        }, loopDelay);
      }
    }
  };

  // بدء التأثير
  const startTyping = () => {
    if (prefersReducedMotion) {
      // إذا كان المستخدم يفضل تقليل الحركة، عرض النص كاملاً فوراً
      setDisplayText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    setIsActive(true);
    setCurrentIndex(0);
    setDisplayText('');
    setIsComplete(false);

    if (delay > 0) {
      timeoutRef.current = setTimeout(typeNextChar, delay);
    } else {
      typeNextChar();
    }
  };

  // إعادة التشغيل
  const restart = () => {
    clearCurrentTimeout();
    startTyping();
  };

  // الإيقاف
  const stop = () => {
    setIsActive(false);
    clearCurrentTimeout();
  };

  // الاستئناف
  const resume = () => {
    if (!isActive && !isComplete && currentIndex < text.length) {
      setIsActive(true);
      typeNextChar();
    }
  };

  // بدء التأثير عند تغيير النص أو الخيارات
  useEffect(() => {
    startTyping();

    return () => {
      clearCurrentTimeout();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, delay, loop, loopDelay, prefersReducedMotion]);

  // تنظيف عند إلغاء الـ component
  useEffect(() => {
    return () => {
      clearCurrentTimeout();
    };
  }, []);

  return {
    displayText: prefersReducedMotion ? text : displayText,
    isComplete: prefersReducedMotion ? true : isComplete,
    restart,
    stop,
    resume,
  };
}
