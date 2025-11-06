'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, Home, ChevronLeft } from 'lucide-react';
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
  const router = useRouter();

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
  const truncateLabel = (label: string, maxLength = 20) => {
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

      <motion.div
        className={`relative ${className}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Modern Background Container */}
        <div className="relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800/90 backdrop-blur-xl border border-neutral-200/60 dark:border-neutral-700/60 shadow-sm hover:shadow-md transition-shadow duration-300 px-4 py-2.5">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/40 via-transparent to-purple-50/40 dark:from-indigo-950/20 dark:to-purple-950/20 opacity-60 pointer-events-none"></div>
          
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <nav
            className="relative z-10 flex items-center gap-1.5 flex-wrap"
            aria-label="breadcrumb"
          >
            {/* Modern Back Button */}
            {breadcrumbs.length > 1 && (
              <motion.button
                onClick={() => router.back()}
                className="group relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200/60 dark:border-neutral-600/60 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
                title="العودة للخلف"
                whileHover={{ scale: 1.03, x: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/10 group-hover:via-indigo-500/5 group-hover:to-indigo-500/0 transition-all duration-500"></div>
                
                <motion.div
                  animate={{ x: [0, -2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <ChevronLeft className="w-4 h-4 text-neutral-600 dark:text-neutral-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300" />
                </motion.div>
                <span className="relative z-10 hidden sm:inline-block text-xs font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                  رجوع
                </span>
              </motion.button>
            )}

            {/* Breadcrumb Items */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {displayBreadcrumbs.map((crumb, index) => {
                const isLast = index === displayBreadcrumbs.length - 1;
                const isFirst = index === 0;
                const iconName = getBreadcrumbIcon(crumb.label, crumb.href);

                return (
                  <motion.div
                    key={crumb.href}
                    className="flex items-center gap-1.5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    {/* Modern Chevron Separator */}
                    {!isFirst && (
                      <motion.div
                        className="flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.08 + 0.1 }}
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 mx-1" />
                      </motion.div>
                    )}

                    {/* Current Page - Modern Active State */}
                    {isLast ? (
                      <motion.span
                        className="group relative flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-xs shadow-md overflow-hidden"
                        aria-current="page"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.08 + 0.15 }}
                      >
                        {/* Animated gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-500 dark:via-purple-500 dark:to-indigo-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
                        
                        {/* Shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ['-100%', '200%'],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut"
                          }}
                        />
                        
                        {/* Content */}
                        <div className="relative z-10 flex items-center gap-1.5">
                          {iconName && (
                            <div className="p-0.5 bg-white/25 rounded-md backdrop-blur-sm">
                              <Icon name={iconName} size="sm" className="text-white" />
                            </div>
                          )}
                          <span className="text-white hidden sm:inline-block drop-shadow-sm text-xs font-medium">
                            {crumb.label}
                          </span>
                          <span className="text-white sm:hidden drop-shadow-sm text-xs font-medium">
                            {truncateLabel(crumb.label, 12)}
                          </span>
                        </div>
                      </motion.span>
                    ) : (
                      // Previous Breadcrumbs - Modern Link Style
                      <Link
                        href={crumb.href}
                        className="group relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 overflow-hidden"
                      >
                        {/* Hover background */}
                        <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-700/30 border border-neutral-200/60 dark:border-neutral-600/60 rounded-lg group-hover:border-indigo-300 dark:group-hover:border-indigo-600 group-hover:shadow-sm transition-all duration-300"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:via-indigo-500/10 group-hover:to-indigo-500/5 transition-all duration-500"></div>
                        
                        {/* Content */}
                        <div className="relative z-10 flex items-center gap-1.5">
                          {iconName && (
                            <div className="p-0.5 bg-white/80 dark:bg-neutral-600/50 rounded-md group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-colors duration-300">
                              <Icon 
                                name={iconName} 
                                size="sm" 
                                className="text-neutral-600 dark:text-neutral-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 group-hover:scale-110 transform" 
                              />
                            </div>
                          )}
                          {isFirst && (
                            <Home className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300" />
                          )}
                          <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 hidden sm:inline-block text-xs font-medium">
                            {crumb.label}
                          </span>
                          <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 sm:hidden text-xs font-medium">
                            {truncateLabel(crumb.label, 12)}
                          </span>
                        </div>
                      </Link>
                    )}
                  </motion.div>
                );
              })}

              {/* Ellipsis for truncated items */}
              {breadcrumbs.length > maxItems && (
                <motion.div
                  className="flex items-center gap-1.5"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                >
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                  <span className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-700/50 text-neutral-500 dark:text-neutral-400 text-xs font-medium border border-neutral-200 dark:border-neutral-600">
                    ...
                  </span>
                </motion.div>
              )}
            </div>
          </nav>
        </div>
      </motion.div>
    </>
  );
};

export default Breadcrumbs;
