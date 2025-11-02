'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Skip link component for accessibility - allows keyboard users to skip to main content
 * Follows WCAG guidelines for skip navigation
 */
const SkipLink: React.FC<SkipLinkProps> = ({ 
  href, 
  children, 
  className = "" 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.a
      href={href}
      className={`
        fixed top-4 right-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium
        transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
        ${isFocused ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        ${className}
      `}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isFocused ? 0 : -100, 
        opacity: isFocused ? 1 : 0 
      }}
      transition={{ duration: 0.2 }}
      aria-label="تخطي إلى المحتوى الرئيسي"
    >
      {children}
    </motion.a>
  );
};

export default SkipLink;