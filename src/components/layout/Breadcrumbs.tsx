'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { getBreadcrumbs } from '@/lib/navigation';
import Icon from '@/components/ui/icons/IconSystem';

/**
 * Props for the Breadcrumbs navigation component
 */
interface BreadcrumbsProps {
  /**
   * Additional CSS classes to apply to the breadcrumb container (optional)
   */
  className?: string;
  /**
   * Whether to display the home breadcrumb (default: true)
   */
  showHome?: boolean;
  /**
   * Maximum number of breadcrumb items to display before truncating (default: 5)
   */
  maxItems?: number;
}

/**
 * Breadcrumb navigation component that displays the current page hierarchy. Automatically generates breadcrumbs from the current pathname using the navigation system. Features responsive design with text truncation on mobile, animated transitions, and SEO-optimized structured data. Includes icon support for common page types.
 */
const Breadcrumbs = ({
  className = '',
  showHome = true,
  maxItems = 5
}: BreadcrumbsProps) => {
  const pathname = usePathname();

  // Fetch breadcrumb trail from navigation system based on current pathname
  const breadcrumbs = getBreadcrumbs(pathname);

  // Limit displayed breadcrumbs to maxItems to prevent overflow
  const displayBreadcrumbs = breadcrumbs.slice(0, maxItems);

  // Hide breadcrumbs if only showing home page (single item)
  if (breadcrumbs.length <= 1) {
    return null;
  }

  // Helper Functions
  /**
   * Determines the appropriate icon identifier for a breadcrumb item based on its label and href. Returns null if no specific icon matches.
   * @param label - The breadcrumb label text in Arabic
   * @param href - The breadcrumb URL path
   * @returns string | null - Icon identifier or null if no match
   */
  const getBreadcrumbIcon = (label: string, href: string) => {
    if (href === '/') return 'home';
    if (label.includes('كورسات') || label.includes('الكورسات')) return 'courses';
    if (label.includes('مسارات')) return 'paths';
    if (label.includes('شجرة')) return 'folder';
    if (label.includes('لوحة')) return 'dashboard';
    if (label.includes('المدونة')) return 'book';
    if (label.includes('المكتبة')) return 'library';
    return null;
  };

  /**
   * Truncates long breadcrumb labels for mobile display. Adds ellipsis if text exceeds maximum length.
   * @param label - The full breadcrumb label text
   * @param maxLength - Maximum character length before truncation (default: 20)
   * @returns string - Truncated label with ellipsis or original label
   */
  const truncateLabel = (label: string, maxLength: number = 20) => {
    if (label.length <= maxLength) return label;
    return `${label.substring(0, maxLength)}...`;
  };

  // SEO Structured Data
  // Generate JSON-LD structured data for SEO and search engine rich results
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": displayBreadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": `https://yourdomain.com${crumb.href}`
    }))
  };

  // Component Render
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <motion.nav
        className={`flex items-center space-x-2 rtl:space-x-reverse text-sm ${className}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        aria-label="breadcrumb"
      >
        {/* Render breadcrumb items with animated transitions and responsive text */}
        {displayBreadcrumbs.map((crumb, index) => {
          const isLast = index === displayBreadcrumbs.length - 1;
          const isFirst = index === 0;
          const iconName = getBreadcrumbIcon(crumb.label, crumb.href);

          return (
            <motion.div
              key={crumb.href}
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
            >
              {/* Chevron separator between breadcrumb items */}
              {!isFirst && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2 transition-colors duration-200" />
              )}

              {/* Current page breadcrumb (non-clickable, highlighted) */}
              {isLast ? (
                <span
                  className="font-medium text-gray-900 dark:text-white px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 dark:from-blue-900/20 dark:to-indigo-900/20 dark:text-blue-300 shadow-sm border border-blue-100 dark:border-blue-800/30 flex items-center gap-2"
                  aria-current="page"
                >
                  {iconName && <Icon name={iconName} size="sm" color="primary" />}
                  <span className="hidden sm:inline">{crumb.label}</span>
                  <span className="sm:hidden">{truncateLabel(crumb.label, 15)}</span>
                </span>
              ) : (
                // Previous breadcrumbs (clickable links with hover effects)
                <Link
                  href={crumb.href}
                  className="text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-2 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 group shadow-sm hover:shadow-md border border-transparent hover:border-blue-200 dark:hover:border-blue-800/30"
                >
                  {iconName && <Icon name={iconName} size="sm" className="group-hover:scale-110 transition-transform duration-200" />}
                  <span className="hidden sm:inline">{crumb.label}</span>
                  <span className="sm:hidden">{truncateLabel(crumb.label, 15)}</span>
                </Link>
              )}
            </motion.div>
          );
        })}

        {/* Show ellipsis indicator when breadcrumbs are truncated */}
        {breadcrumbs.length > maxItems && (
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          >
            <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
            <span className="text-gray-500 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">...</span>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
};

export default Breadcrumbs;
