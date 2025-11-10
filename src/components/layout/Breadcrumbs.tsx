'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { getBreadcrumbs } from '@/lib/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface BreadcrumbsProps {
  className?: string;
  showHome?: boolean;
  maxItems?: number;
}

export default function Breadcrumbs({
  className = '',
  showHome = true,
  maxItems = 5,
}: BreadcrumbsProps) {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const router = useRouter();
  const breadcrumbs = getBreadcrumbs(pathname);
  const display = breadcrumbs.slice(0, maxItems);

  if (breadcrumbs.length <= 1) return null;

  const truncate = (label: string, maxLength = 18) =>
    label.length <= maxLength ? label : `${label.slice(0, maxLength)}...`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: display.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: `https://yourdomain.com${c.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <motion.div
        className={`relative ${className}`}
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25 }}
      >
        <div className="relative flex flex-wrap items-center gap-2 rounded-2xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-700/60 shadow-md px-4 py-2.5 hover:shadow-lg transition-all duration-300">
          {/* زر الرجوع */}
          <motion.button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100/70 dark:bg-neutral-800/60 hover:bg-neutral-200/80 dark:hover:bg-neutral-700/60 text-xs font-medium text-neutral-700 dark:text-neutral-300 border border-transparent hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-200"
            title="رجوع"
            aria-label="العودة إلى الصفحة السابقة"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05, x: -2 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            type="button"
          >
            <ChevronLeft className="w-4 h-4 text-primary-600 dark:text-primary-400" aria-hidden="true" />
            <span className="hidden sm:inline">رجوع</span>
          </motion.button>

          {/* روابط المسار */}
          <nav className="flex items-center flex-wrap gap-1" aria-label="breadcrumbs">
            {showHome && (
              <Link
                href="/"
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-semibold text-primary-600 dark:text-primary-400 hover:bg-primary-50/60 dark:hover:bg-primary-900/30 border border-transparent hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-200"
                aria-label="الصفحة الرئيسية"
              >
                <Home className="w-4 h-4" aria-hidden="true" />
                <span>الرئيسية</span>
              </Link>
            )}

            {display.map((crumb, index) => {
              const isLast = index === display.length - 1;
              return (
                <motion.div
                  key={crumb.href}
                  className="flex items-center gap-1"
                  initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.05, duration: 0.25 }}
                >
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-500" aria-hidden="true" />
                  {isLast ? (
                    <span className="relative px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 text-white text-xs font-medium shadow-md" aria-current="page">
                      {!prefersReducedMotion && (
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/15"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      )}
                      <span className="relative z-10">{truncate(crumb.label)}</span>
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 border border-transparent hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-200"
                      aria-label={`الانتقال إلى ${crumb.label}`}
                    >
                      {truncate(crumb.label)}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </nav>
        </div>
      </motion.div>
    </>
  );
}
