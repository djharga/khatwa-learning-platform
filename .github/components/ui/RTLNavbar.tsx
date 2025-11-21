'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface RTLNavbarProps {
  logo?: ReactNode;
  items?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
  className?: string;
  rightContent?: ReactNode;
}

/**
 * RTLNavbar Component
 * شريط تنقل متوافق مع RTL يستخدم logical properties
 * 
 * @example
 * ```tsx
 * <RTLNavbar
 *   logo={<span>خطى</span>}
 *   items={[
 *     { label: 'الرئيسية', href: '/' },
 *     { label: 'الدورات', href: '/courses' },
 *   ]}
 * />
 * ```
 */
export function RTLNavbar({
  logo,
  items = [],
  className,
  rightContent,
}: RTLNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className={cn(
        'w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800',
        'overflow-x-hidden', // منع overflow
        className
      )}
      style={{
        direction: 'rtl',
        textAlign: 'right',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - على اليمين في RTL */}
          <div className="flex-shrink-0">
            {logo || (
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                خطى
              </span>
            )}
          </div>

          {/* Desktop Menu - في الوسط */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {items.map((item, index) => (
              <motion.a
                key={index}
                data-framer-component
                href={item.href}
                onClick={item.onClick}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  marginInlineStart: index > 0 ? '1.5rem' : '0',
                }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Right Content - على اليسار في RTL */}
          <div className="flex items-center gap-4">
            {rightContent}
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="قائمة التنقل"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            data-framer-component
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200 dark:border-slate-800"
          >
            <div className="flex flex-col gap-2">
              {items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => {
                    item.onClick?.();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  style={{
                    textAlign: 'right',
                    paddingInlineStart: '1rem',
                    paddingInlineEnd: '1rem',
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

