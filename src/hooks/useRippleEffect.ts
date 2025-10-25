import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Return value from useRippleEffect hook
 */
interface RippleEffectReturn {
  /** Whether ripple animation is currently active */
  showRipple: boolean;
  /** Function to trigger the ripple effect */
  triggerRipple: () => void;
}

/**
 * Custom hook for managing ripple animation effect. Provides a trigger function and state for rendering the ripple animation. Automatically resets after the specified duration.
 * @param duration - Duration of ripple animation in milliseconds (default: 600)
 * @returns Object containing ripple state and trigger function
 * @example
 * ```tsx
 * const { showRipple, triggerRipple } = useRippleEffect();
 * 
 * return (
 *   <button onClick={triggerRipple}>
 *     Click me
 *     <AnimatePresence>
 *       {showRipple && <motion.div className="ripple" />}
 *     </AnimatePresence>
 *   </button>
 * );
 * ```
 */
export function useRippleEffect(duration = 600): RippleEffectReturn {
  const [showRipple, setShowRipple] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  const triggerRipple = useCallback(() => {
    setShowRipple(true);
    timeoutRef.current = window.setTimeout(() => {
      setShowRipple(false);
    }, duration);
  }, [duration]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { showRipple, triggerRipple };
}