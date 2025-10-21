import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'صفحة غير موجودة - منصة خطى',
  description:
    'الصفحة التي تبحث عنها غير موجودة. عُد إلى الصفحة الرئيسية لمنصة خطى.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e1b4b',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
          الصفحة غير موجودة
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          عذراً، الصفحة التي تبحث عنها غير متوفرة.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          العودة إلى الصفحة الرئيسية
        </a>
      </div>
    </div>
  );
}
