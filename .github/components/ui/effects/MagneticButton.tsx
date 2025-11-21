'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { ReactNode, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  as?: 'button' | 'div' | 'a';
  href?: string;
}

/**
 * MagneticButton Component
 * زر مغناطيسي يتبع حركة الماوس
 */
export const MagneticButton = ({
  children,
  className,
  strength = 0.3,
  onClick,
  disabled = false,
  type = 'button',
  as = 'button',
  href,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement | HTMLDivElement | HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, {
    stiffness: 500,
    damping: 100,
  });
  const mouseYSpring = useSpring(y, {
    stiffness: 500,
    damping: 100,
  });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['-5deg', '5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['5deg', '-5deg']);

  const translateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [-strength * 100, strength * 100]
  );
  const translateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [-strength * 100, strength * 100]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current || disabled) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const motionProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    style: {
      rotateX: disabled ? 0 : rotateX,
      rotateY: disabled ? 0 : rotateY,
      translateX: disabled ? 0 : translateX,
      translateY: disabled ? 0 : translateY,
      transformStyle: 'preserve-3d' as const,
    },
    whileHover: disabled ? {} : { scale: 1.05 },
    whileTap: disabled ? {} : { scale: 0.95 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  };

  const content = (
    <motion.span
      className="relative z-10 inline-block"
      style={{
        transform: isHovered && !disabled ? 'translateZ(20px)' : 'translateZ(0)',
      }}
    >
      {children}
    </motion.span>
  );

  if (as === 'a' && href) {
    return (
      <motion.a
        href={href}
        className={cn('inline-block', className)}
        {...motionProps}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {content}
      </motion.a>
    );
  }

  if (as === 'div') {
    return (
      <motion.div
        className={cn('inline-block cursor-pointer', className)}
        onClick={onClick}
        {...motionProps}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn('inline-block', className)}
      {...motionProps}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {content}
    </motion.button>
  );
};

