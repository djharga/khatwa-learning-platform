/**
 * صفحة التقارير - منصة خطى التعليمية
 * تعرض تقارير مفصلة عن تقدم الطالب وأنشطته التعليمية
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'التقارير - منصة خطى التعليمية',
  description: 'تقارير مفصلة عن تقدمك التعليمي وأنشطتك في المنصة',
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          التقارير والإحصائيات
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          متابعة تقدمك التعليمي وتحليل أدائك في الدورات المختلفة
        </p>
      </div>

      {/* فلاتر التقارير */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          فلترة التقارير
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              نوع التقرير
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
              <option>جميع التقارير</option>
              <option>تقدم الدورات</option>
              <option>الإنجازات</option>
              <option>النشاط اليومي</option>
              <option>المقارنة بالآخرين</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الفترة الزمنية
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
              <option>آخر 30 يوم</option>
              <option>آخر أسبوع</option>
              <option>آخر 3 أشهر</option>
              <option>آخر 6 أشهر</option>
              <option>آخر سنة</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الدورة
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
              <option>جميع الدورات</option>
              <option>المراجعة الداخلية - المستوى الأول</option>
              <option>المراجعة الداخلية - المستوى الثاني</option>
              <option>المراجعة الداخلية - المستوى الثالث</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
              تطبيق الفلاتر
            </button>
          </div>
        </div>
      </div>

      {/* إحصائيات عامة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي الساعات الدراسية</p>
              <p className="text-2xl font-bold text-blue-600">156 ساعة</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏰</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">الدورات المكتملة</p>
              <p className="text-2xl font-bold text-green-600">12 دورة</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">معدل التقدم</p>
              <p className="text-2xl font-bold text-purple-600">87%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">الترتيب العام</p>
              <p className="text-2xl font-bold text-orange-600">#23</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
          </div>
        </div>
      </div>

      {/* التقارير التفصيلية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* تقدم الدورات */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            تقدم الدورات
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  م1
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    المراجعة الداخلية المستوى الأول
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    آخر تحديث: منذ يومين
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">95%</div>
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  م2
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    المراجعة الداخلية المستوى الثاني
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    آخر تحديث: منذ أسبوع
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">78%</div>
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                  م3
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    المراجعة الداخلية المستوى الثالث
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    آخر تحديث: منذ 3 أيام
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-purple-600">65%</div>
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* النشاط اليومي */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            النشاط اليومي (آخر 7 أيام)
          </h3>

          <div className="space-y-3">
            {[
              { day: 'اليوم', hours: 4.5, color: 'bg-green-500' },
              { day: 'أمس', hours: 3.2, color: 'bg-blue-500' },
              { day: 'قبل يومين', hours: 5.1, color: 'bg-purple-500' },
              { day: 'قبل 3 أيام', hours: 2.8, color: 'bg-yellow-500' },
              { day: 'قبل 4 أيام', hours: 4.0, color: 'bg-pink-500' },
              { day: 'قبل 5 أيام', hours: 3.5, color: 'bg-indigo-500' },
              { day: 'قبل 6 أيام', hours: 4.2, color: 'bg-red-500' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{activity.day}</span>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${activity.color} h-2 rounded-full`}
                      style={{ width: `${(activity.hours / 6) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white w-12 text-right">
                    {activity.hours}س
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* الإنجازات والشهادات */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          الإنجازات والشهادات الأخيرة
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                إكمال 100 ساعة دراسية
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                تم إنجازه في 15 أكتوبر 2024
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📜</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                شهادة المراجعة الداخلية المستوى الأول
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                تم الحصول عليها في 10 أكتوبر 2024
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                أفضل طالب في الدورة
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                تم الحصول عليها في 5 أكتوبر 2024
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* أزرار التصدير */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
          تصدير التقرير PDF
        </button>
        <button className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
          تصدير Excel
        </button>
        <button className="flex-1 bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
          مشاركة التقرير
        </button>
      </div>
    </div>
  );
}
