/**
 * صفحة دورات المدرس - منصة خطى التعليمية
 * تعرض دورات المدرس وتتيح له إدارتها
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'دوراتي - لوحة المدرس | منصة خطى التعليمية',
  description: 'إدارة دوراتك التعليمية ومتابعة تقدم الطلاب',
};

export default function InstructorCoursesPage() {
  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          دوراتي التعليمية
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          إدارة وتطوير دوراتك التعليمية في منصة خطى
        </p>
      </div>

      {/* محتوى الصفحة */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* قسم الدورات النشطة */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            الدورات النشطة
          </h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  دورة المراجعة الداخلية المستوى الأول
                </h3>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  نشط
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                دورة شاملة في أساسيات المراجعة الداخلية
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-600 dark:text-blue-400">
                  25 طالب مسجل
                </span>
                <span className="text-gray-500">
                  آخر تحديث: منذ يومين
                </span>
              </div>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  دورة المراجعة الداخلية المستوى الثاني
                </h3>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  نشط
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                دورة متقدمة في تقنيات المراجعة الداخلية
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-600 dark:text-blue-400">
                  18 طالب مسجل
                </span>
                <span className="text-gray-500">
                  آخر تحديث: منذ أسبوع
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* قسم الدورات قيد التطوير */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            قيد التطوير
          </h2>
          <div className="space-y-4">
            <div className="p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  دورة المراجعة الداخلية المستوى الثالث
                </h3>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  قيد التطوير
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                دورة متخصصة في المراجعة الداخلية المتقدمة
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                60% مكتملة
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* أزرار الإجراءات */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
          إنشاء دورة جديدة
        </button>
        <button className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
          إدارة المحتوى
        </button>
      </div>
    </div>
  );
}
