'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, Home } from 'lucide-react';
import { getBreadcrumbs } from '@/lib/navigation';
import { cn } from '@/lib/utils';

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
  const pathname = usePathname();
  const router = useRouter();
  const breadcrumbs = getBreadcrumbs(pathname);
  const display = breadcrumbs.slice(0, maxItems);

  if (breadcrumbs.length <= 1) return null;

  const truncate = (label: string, maxLength = 18) =>
    label.length <= maxLength ? label : `${label.slice(0, maxLength)}...`;

  const canGoBack = typeof window !== 'undefined' && window.history.length > 1;

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

      <div className={cn('relative w-full', className)}>
        <div className="relative flex flex-wrap items-center gap-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-2.5">
          {canGoBack && (
            <>
              <button
                onClick={() => router.back()}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 text-sm font-medium"
                aria-label="العودة للصفحة السابقة"
                type="button"
              >
                <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden />
                <span className="hidden sm:inline">رجوع</span>
              </button>
              <div className="w-px h-4 bg-neutral-200 dark:bg-neutral-700 mx-1" aria-hidden />
            </>
          )}

          <nav className="flex items-center flex-wrap gap-1" aria-label="breadcrumbs">
            {showHome && (
              <Link
                href="/"
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm font-medium text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                aria-label="الصفحة الرئيسية"
              >
                <Home className="w-3.5 h-3.5" aria-hidden />
                <span className="sr-only md:not-sr-only">الرئيسية</span>
              </Link>
            )}

            {display.map((crumb, i) => {
              if (!crumb.href || crumb.href === '#') return null;
              const isLast = i === display.length - 1;
              return (
                <div key={crumb.href} className="flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 text-neutral-400 rtl:rotate-180" aria-hidden />
                  {isLast ? (
                    <span className="px-2.5 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-semibold" aria-current="page">
                      {truncate(crumb.label)}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="px-2.5 py-1.5 rounded-lg text-sm font-medium text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                      aria-label={`الانتقال إلى ${crumb.label}`}
                    >
                      {truncate(crumb.label)}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}