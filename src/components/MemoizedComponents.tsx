'use client';

import React, {
  memo,
  useMemo,
  useCallback,
  forwardRef,
  useRef,
  useEffect,
} from 'react';
import { motion } from 'framer-motion';

// Memoized Button Component
interface MemoizedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ComponentType<{ className?: string }>;
  rightIcon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

export const MemoizedButton = memo(
  forwardRef<HTMLButtonElement, MemoizedButtonProps>(
    (
      {
        variant = 'primary',
        size = 'md',
        loading = false,
        leftIcon: LeftIcon,
        rightIcon: RightIcon,
        children,
        className = '',
        disabled,
        ...props
      },
      ref
    ) => {
      const buttonClasses = useMemo(() => {
        const baseClasses =
          'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

        const variantClasses = {
          primary:
            'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
          secondary:
            'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
          outline:
            'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
          ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-blue-500',
        };

        const sizeClasses = {
          sm: 'px-3 py-1.5 text-sm',
          md: 'px-4 py-2 text-sm',
          lg: 'px-6 py-3 text-base',
        };

        return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
      }, [variant, size, className]);

      return (
        // @ts-ignore - motion.button types conflict with HTMLButtonElement
        <motion.button
          ref={ref}
          className={buttonClasses}
          disabled={disabled || loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          {...props}
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 mr-2"
            >
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            </motion.div>
          ) : (
            LeftIcon && <LeftIcon className="w-4 h-4 mr-2" />
          )}
          {children}
          {RightIcon && !loading && <RightIcon className="w-4 h-4 ml-2" />}
        </motion.button>
      );
    }
  )
);

MemoizedButton.displayName = 'MemoizedButton';

// Memoized Input Component
interface MemoizedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ComponentType<{ className?: string }>;
  rightIcon?: React.ComponentType<{ className?: string }>;
}

export const MemoizedInput = memo(
  forwardRef<HTMLInputElement, MemoizedInputProps>(
    (
      {
        label,
        error,
        leftIcon: LeftIcon,
        rightIcon: RightIcon,
        className = '',
        ...props
      },
      ref
    ) => {
      const inputClasses = useMemo(() => {
        const baseClasses =
          'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors';
        const errorClasses = error
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300';
        return `${baseClasses} ${errorClasses} ${className}`;
      }, [error, className]);

      return (
        <div className="space-y-1">
          {label && (
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </label>
          )}
          <div className="relative">
            {LeftIcon && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <LeftIcon className="w-4 h-4" />
              </div>
            )}
            <input
              ref={ref}
              className={`${inputClasses} ${LeftIcon ? 'pl-10' : ''} ${RightIcon ? 'pr-10' : ''}`}
              {...props}
            />
            {RightIcon && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <RightIcon className="w-4 h-4" />
              </div>
            )}
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600"
            >
              {error}
            </motion.p>
          )}
        </div>
      );
    }
  )
);

MemoizedInput.displayName = 'MemoizedInput';

// Memoized Card Component
interface MemoizedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export const MemoizedCard = memo<MemoizedCardProps>(
  ({ children, className = '', hover = false, padding = 'md' }) => {
    const cardClasses = useMemo(() => {
      const baseClasses =
        'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700';
      const paddingClasses = {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      };
      const hoverClasses = hover
        ? 'hover:shadow-md transition-shadow duration-200'
        : '';

      return `${baseClasses} ${paddingClasses[padding]} ${hoverClasses} ${className}`;
    }, [hover, padding, className]);

    const MotionCard = hover ? motion.div : 'div';
    const motionProps = hover
      ? {
          whileHover: { scale: 1.02, y: -2 },
          transition: { duration: 0.2 },
        }
      : {};

    return (
      <MotionCard className={cardClasses} {...motionProps}>
        {children}
      </MotionCard>
    );
  }
);

MemoizedCard.displayName = 'MemoizedCard';

// Memoized List Component
interface MemoizedListItem {
  id: string;
  content: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

interface MemoizedListProps {
  items: MemoizedListItem[];
  className?: string;
  emptyMessage?: string;
}

export const MemoizedList = memo<MemoizedListProps>(
  ({ items, className = '', emptyMessage = 'لا توجد عناصر' }) => {
    const handleItemClick = useCallback((item: MemoizedListItem) => {
      item.onClick?.();
    }, []);

    if (items.length === 0) {
      return (
        <div className={`text-center py-8 text-gray-500 ${className}`}>
          {emptyMessage}
        </div>
      );
    }

    return (
      <div className={`space-y-2 ${className}`}>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`
            p-3 rounded-lg cursor-pointer transition-colors duration-200
            ${
              item.selected
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            }
          `}
            onClick={() => handleItemClick(item)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {item.content}
          </motion.div>
        ))}
      </div>
    );
  }
);

MemoizedList.displayName = 'MemoizedList';

// Memoized Modal Component
interface MemoizedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
}

export const MemoizedModal = memo<MemoizedModalProps>(
  ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    closeOnOverlayClick = true,
  }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const sizeClasses = useMemo(() => {
      const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
      };
      return sizes[size];
    }, [size]);

    const handleOverlayClick = useCallback(
      (e: React.MouseEvent) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
          onClose();
        }
      },
      [closeOnOverlayClick, onClose]
    );

    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        onClick={handleOverlayClick}
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
          className={`w-full ${sizeClasses} bg-white dark:bg-gray-800 rounded-lg shadow-xl`}
        >
          {title && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
          <div className="p-4">{children}</div>
        </motion.div>
      </motion.div>
    );
  }
);

MemoizedModal.displayName = 'MemoizedModal';

// Memoized Tooltip Component
interface MemoizedTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const MemoizedTooltip = memo<MemoizedTooltipProps>(
  ({ content, children, position = 'top', delay = 500 }) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showTooltip = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    }, [delay]);

    const hideTooltip = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    }, []);

    const positionClasses = useMemo(() => {
      const positions = {
        top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
      };
      return positions[position];
    }, [position]);

    const arrowClasses = useMemo(() => {
      const arrows = {
        top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900',
        bottom:
          'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900',
        left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900',
        right:
          'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900',
      };
      return arrows[position];
    }, [position]);

    return (
      <div
        className="relative inline-block"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg whitespace-nowrap ${positionClasses}`}
          >
            {content}
            <div className={`absolute w-0 h-0 border-4 ${arrowClasses}`} />
          </motion.div>
        )}
      </div>
    );
  }
);

MemoizedTooltip.displayName = 'MemoizedTooltip';

// Performance optimization hook
export const usePerformanceOptimization = () => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current++;
    const now = performance.now();
    const timeSinceLastRender = now - lastRenderTime.current;
    lastRenderTime.current = now;

    if (timeSinceLastRender > 16) {
      // More than one frame
      console.warn(`Slow render detected: ${timeSinceLastRender.toFixed(2)}ms`);
    }
  });

  return {
    renderCount: renderCount.current,
    lastRenderTime: lastRenderTime.current,
  };
};
