'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * SkipLink — عنصر وصول سريع لتخطي التنقل إلى المحتوى الرئيسي.
 * محسّن لأداء عالي، ودعم كامل لـ RTL والـ Focus Management.
 */
export default function SkipLink({ href, children, className = '' }: SkipLinkProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') setActive(true);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <motion.a
      href={href}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={() => setActive(false)}
      role="link"
      aria-label="تخطي إلى المحتوى الرئيسي"
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: active ? 0 : -100,
        opacity: active ? 1 : 0,
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`
        fixed top-4 start-4 z-[9999]
        px-4 py-2.5 rounded-lg font-semibold text-sm
        bg-blue-600 text-white shadow-md
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        focus-visible:ring-offset-2 focus-visible:ring-offset-white
        dark:focus-visible:ring-offset-gray-900
        transition-all duration-200 ease-out
        ${className}
      `}
    >
      {children}
    </motion.a>
  );
}
