'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  children: string | ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  splitBy?: 'word' | 'char' | 'none';
  variant?: 'fade' | 'slide' | 'scale' | 'typewriter';
  gradient?: boolean;
  gradientColors?: string[];
}

/**
 * AnimatedText Component
 * مكون للنصوص المتحركة مع تأثيرات كشف تدريجي
 */
export const AnimatedText = ({
  children,
  className,
  delay = 0,
  duration = 0.5,
  splitBy = 'word',
  variant = 'fade',
  gradient = false,
  gradientColors = ['from-indigo-400', 'via-indigo-300', 'to-indigo-400'],
}: AnimatedTextProps) => {
  // If children is ReactNode, render directly
  if (typeof children !== 'string') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const text = children as string;

  // Split text based on splitBy prop
  const getSplitText = () => {
    if (splitBy === 'char') {
      return text.split('').filter(char => char !== ' ');
    } else if (splitBy === 'word') {
      return text.split(' ');
    }
    return [text];
  };

  const splitText = getSplitText();
  const isChar = splitBy === 'char';

  // Animation variants
  const getAnimationVariants = () => {
    switch (variant) {
      case 'slide':
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.5 },
          animate: { opacity: 1, scale: 1 },
        };
      case 'typewriter':
        return {
          initial: { opacity: 0, width: 0 },
          animate: { opacity: 1, width: 'auto' },
        };
      default: // fade
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        };
    }
  };

  const baseVariants = getAnimationVariants();

  // Render with gradient
  if (gradient && splitBy === 'none') {
    return (
      <motion.span
        initial={baseVariants.initial}
        animate={baseVariants.animate}
        transition={{ duration, delay }}
        className={cn(
          'bg-gradient-to-r',
          gradientColors[0],
          gradientColors[1],
          gradientColors[2],
          'bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient',
          className
        )}
      >
        {text}
      </motion.span>
    );
  }

  // Render split text
  if (splitBy !== 'none') {
    return (
      <span className={cn('inline-block', className)}>
        {splitText.map((item, index) => (
          <motion.span
            key={index}
            initial={baseVariants.initial}
            animate={baseVariants.animate}
            transition={{
              duration: duration / splitText.length,
              delay: delay + (index * duration) / splitText.length,
            }}
            className={cn(
              'inline-block',
              gradient && [
                'bg-gradient-to-r',
                gradientColors[0],
                gradientColors[1],
                gradientColors[2],
                'bg-clip-text text-transparent',
              ],
              isChar && 'mx-0.5'
            )}
          >
            {item}
            {splitBy === 'word' && index < splitText.length - 1 && ' '}
          </motion.span>
        ))}
      </span>
    );
  }

  // Default render
  return (
    <motion.span
      initial={baseVariants.initial}
      animate={baseVariants.animate}
      transition={{ duration, delay }}
      className={className}
    >
      {text}
    </motion.span>
  );
};

