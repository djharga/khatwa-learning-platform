/**
 * صفحة ملفات الطالب في لوحة التحكم - Placeholder مؤقت لحين اكتمال التكامل.
 */
import React from 'react';
import Link from 'next/link';

const resources: ReadonlyArray<{ readonly title: string; readonly description: string; readonly href: string }> = [
  {
    title: 'ملفاتي الحالية',
    description: 'إدارة الملفات التي تم رفعها أو مشاركتها عبر المنصة.',
    href: '/resources/course-files',
  },
  {
    title: 'مكتبة المنصة',
    description: 'الوصول إلى جميع الملفات التعليمية المتاحة للتحميل.',
    href: '/resources',
  },
];

/**
 * تُظهر عناصر Placeholder إلى حين اكتمال صفحة إدارة الملفات داخل لوحة الطالب.
 */
const CourseFilesDashboardPage = (): React.ReactElement => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">ملفات الطالب</h1>
          <p className="text-slate-600">
            يتم حالياً تجهيز تجربة إدارة الملفات داخل لوحة الطالب. يمكنك مؤقتاً الوصول إلى الموارد الأساسية عبر الروابط التالية.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {resources.map((resource) => (
            <Link
              key={resource.title}
              href={resource.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600">
                {resource.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600">
                الانتقال الآن
                <svg
                  className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          ))}
        </section>

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-6 text-sm text-slate-500">
          سيتم قريباً إضافة أدوات رفع الملفات، تقسيمها بحسب الدورات، وتتبع التنزيلات مباشرة داخل هذه الصفحة.
        </div>
      </div>
    </div>
  );
};

export default CourseFilesDashboardPage;
