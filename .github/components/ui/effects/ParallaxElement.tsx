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

  // Calculate transform based on direction - جميع useTransform يجب أن تكون في مستوى المكون
  const yUp = useTransform(scrollYProgress, [0, 1], [0, -speed * 100]);
  const yDown = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  const xLeft = useTransform(scrollYProgress, [0, 1], [0, -speed * 100]);
  const xRight = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.8]);

  // Get transform based on direction
  const getTransform = () => {
    switch (direction) {
      case 'up':
        return { y: yUp };
      case 'down':
        return { y: yDown };
      case 'left':
        return { x: xLeft };
      case 'right':
        return { x: xRight };
      default:
        return { y: yUp };
    }
  };

  const transforms = getTransform();

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

