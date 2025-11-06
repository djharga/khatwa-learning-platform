'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxElementProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  offset?: ['start' | 'end' | number, 'start' | 'end' | number];
}

/**
 * ParallaxElement Component
 * عنصر مع تأثير parallax يتحرك عند التمرير
 */
export const ParallaxElement = ({
  children,
  className,
  speed = 0.5,
  direction = 'up',
  offset = ['start', 'end'],
}: ParallaxElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset,
  });

  // Calculate transform based on direction
  const getTransform = () => {
    const baseTransform = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

    switch (direction) {
      case 'up':
        return {
          y: useTransform(scrollYProgress, [0, 1], [0, -speed * 100]),
        };
      case 'down':
        return {
          y: useTransform(scrollYProgress, [0, 1], [0, speed * 100]),
        };
      case 'left':
        return {
          x: useTransform(scrollYProgress, [0, 1], [0, -speed * 100]),
        };
      case 'right':
        return {
          x: useTransform(scrollYProgress, [0, 1], [0, speed * 100]),
        };
      default:
        return {
          y: useTransform(scrollYProgress, [0, 1], [0, -speed * 100]),
        };
    }
  };

  const transforms = getTransform();
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{
        ...transforms,
        opacity,
      }}
    >
      {children}
    </motion.div>
  );
};

