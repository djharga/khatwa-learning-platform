/**
 * صفحة الملف الشخصي - منصة خطى التعليمية
 * تتيح للمستخدم عرض وتعديل معلوماته الشخصية
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'الملف الشخصي - منصة خطى التعليمية',
  description: 'عرض وتعديل معلوماتك الشخصية في منصة خطى التعليمية',
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          الملف الشخصي
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          إدارة معلوماتك الشخصية وتفضيلاتك في منصة خطى التعليمية
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* معلومات الحساب */}
        <div className="lg:col-span-2 space-y-6">
          {/* بطاقة الملف الشخصي */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              معلومات الحساب
            </h2>

            <div className="flex items-center space-x-6 rtl:space-x-reverse mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                أح
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  أحمد محمد علي
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  طالب في المراجعة الداخلية
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  ahmed@example.com
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  defaultValue="أحمد محمد علي"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  defaultValue="ahmed@example.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  defaultValue="+966501234567"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  تاريخ الميلاد
                </label>
                <input
                  type="date"
                  defaultValue="1990-01-01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                نبذة عني
              </label>
              <textarea
                rows={3}
                placeholder="اكتب نبذة مختصرة عن نفسك..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="flex justify-end mt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200">
                حفظ التغييرات
              </button>
            </div>
          </div>

          {/* إعدادات الخصوصية */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              إعدادات الخصوصية
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    إظهار الملف الشخصي للعامة
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    السماح للمستخدمين الآخرين برؤية ملفك الشخصي
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    إشعارات البريد الإلكتروني
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    تلقي إشعارات حول الدورات والأنشطة الجديدة
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    إشعارات الهاتف المحمول
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    تلقي إشعارات فورية على هاتفك المحمول
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* الشريط الجانبي */}
        <div className="space-y-6">
          {/* إحصائيات الحساب */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              إحصائيات الحساب
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">الدورات المكتملة</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">12 دورة</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">الساعات الدراسية</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">156 ساعة</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">الشهادات المكتسبة</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">8 شهادات</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">معدل التقدم</span>
                <span className="text-sm font-semibold text-green-600">87%</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">تاريخ الانضمام</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">يناير 2024</span>
              </div>
            </div>
          </div>

          {/* الإنجازات الأخيرة */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              الإنجازات الأخيرة
            </h3>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600">🏆</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    إكمال دورة المراجعة الداخلية
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    منذ يومين
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-600">📊</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    الحصول على شهادة جديدة
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    منذ أسبوع
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <span className="text-green-600">✅</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    إنجاز 100 ساعة دراسية
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    منذ أسبوعين
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* الإجراءات السريعة */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              الإجراءات السريعة
            </h3>

            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
                تحديث كلمة المرور
              </button>

              <button className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
                تحميل البيانات
              </button>

              <button className="w-full bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
                حذف الحساب
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
