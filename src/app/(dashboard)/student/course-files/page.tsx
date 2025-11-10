/**
 * صفحة ملفات الطالب في لوحة التحكم - Placeholder مؤقت لحين اكتمال التكامل.
 */
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, FileText, BookOpen } from 'lucide-react';

const resources: ReadonlyArray<{ readonly title: string; readonly description: string; readonly href: string; readonly icon: React.ReactNode }> = [
  {
    title: 'ملفاتي الحالية',
    description: 'إدارة الملفات التي تم رفعها أو مشاركتها عبر المنصة.',
    href: '/resources/course-files',
    icon: <FileText className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />,
  },
  {
    title: 'مكتبة المنصة',
    description: 'الوصول إلى جميع الملفات التعليمية المتاحة للتحميل.',
    href: '/resources',
    icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />,
  },
];

/**
 * تُظهر عناصر Placeholder إلى حين اكتمال صفحة إدارة الملفات داخل لوحة الطالب.
 */
const CourseFilesDashboardPage = (): React.ReactElement => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-6 sm:py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="space-y-2 sm:space-y-3"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">ملفات الطالب</h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            يتم حالياً تجهيز تجربة إدارة الملفات داخل لوحة الطالب. يمكنك مؤقتاً الوصول إلى الموارد الأساسية عبر الروابط التالية.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
          className="grid gap-4 sm:gap-6 md:grid-cols-2"
        >
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.2, ease: 'easeOut' }}
              whileHover={{ y: -2, scale: 1.01 }}
            >
              <Link
                href={resource.href}
                className="group block rounded-xl sm:rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                aria-label={`الانتقال إلى ${resource.title}`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg group-hover:scale-110 transition-transform duration-200 ease-out text-primary-600 dark:text-primary-400">
                    {resource.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 ease-out mb-2">
                      {resource.title}
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-3 sm:mb-4">{resource.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-primary-600 dark:text-primary-400 group-hover:gap-3 transition-all duration-200 ease-out">
                      الانتقال الآن
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.2, ease: 'easeOut' }}
          className="rounded-xl sm:rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-neutral-800/60 p-4 sm:p-6 text-sm sm:text-base text-neutral-600 dark:text-neutral-400"
        >
          سيتم قريباً إضافة أدوات رفع الملفات، تقسيمها بحسب الدورات، وتتبع التنزيلات مباشرة داخل هذه الصفحة.
        </motion.div>
      </div>
    </div>
  );
};

export default CourseFilesDashboardPage;
