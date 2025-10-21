/**
 * صفحة الشهادات - منصة خطى التعليمية
 * تعرض شهادات الطالب وإنجازاته المعتمدة
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'شهاداتي - منصة خطى التعليمية',
  description: 'عرض شهاداتك وإنجازاتك المعتمدة في منصة خطى التعليمية',
};

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-100 dark:border-yellow-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          شهاداتي وإنجازاتي
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          عرض جميع شهاداتك وإنجازاتك المعتمدة في منصة خطى التعليمية
        </p>
      </div>

      {/* إحصائيات الشهادات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي الشهادات</p>
              <p className="text-2xl font-bold text-yellow-600">8 شهادات</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">شهادات نشطة</p>
              <p className="text-2xl font-bold text-green-600">8 شهادات</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">النقاط المكتسبة</p>
              <p className="text-2xl font-bold text-blue-600">2,450 نقطة</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">الترتيب العام</p>
              <p className="text-2xl font-bold text-purple-600">#23</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏅</span>
            </div>
          </div>
        </div>
      </div>

      {/* قائمة الشهادات */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            شهاداتي المعتمدة
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* شهادة 1 */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      شهادة المراجعة الداخلية المستوى الأول
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      أساسيات المراجعة والمحاسبة
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  نشطة
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">تاريخ الإصدار:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">15 أكتوبر 2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">تاريخ الانتهاء:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">15 أكتوبر 2026</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">رقم الشهادة:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">CERT-2024-001</span>
                </div>
              </div>

              <div className="flex space-x-2 rtl:space-x-reverse">
                <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
                  عرض الشهادة
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
                  تحميل PDF
                </button>
              </div>
            </div>

            {/* شهادة 2 */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">📜</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      شهادة المراجعة الداخلية المستوى الثاني
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      تقنيات المراجعة المتقدمة
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  نشطة
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">تاريخ الإصدار:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">10 أكتوبر 2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">تاريخ الانتهاء:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">10 أكتوبر 2026</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">رقم الشهادة:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">CERT-2024-002</span>
                </div>
              </div>

              <div className="flex space-x-2 rtl:space-x-reverse">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
                  عرض الشهادة
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
                  تحميل PDF
                </button>
              </div>
            </div>

            {/* شهادة 3 */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      شهادة التميز الأكاديمي
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      أفضل طالب في الدورة
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  نشطة
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">تاريخ الإصدار:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">5 أكتوبر 2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">تاريخ الانتهاء:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">دائمة</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">رقم الشهادة:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">EXC-2024-001</span>
                </div>
              </div>

              <div className="flex space-x-2 rtl:space-x-reverse">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
                  عرض الشهادة
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
                  تحميل PDF
                </button>
              </div>
            </div>

            {/* شهادة 4 */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">💎</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      شهادة إتمام 100 ساعة دراسية
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      إنجاز تعليمي متميز
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  نشطة
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">تاريخ الإصدار:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">1 أكتوبر 2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">تاريخ الانتهاء:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">دائمة</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">رقم الشهادة:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">ACH-2024-001</span>
                </div>
              </div>

              <div className="flex space-x-2 rtl:space-x-reverse">
                <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
                  عرض الشهادة
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
                  تحميل PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* الإنجازات الأخرى */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          الإنجازات والشارات
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'أول دورة مكتملة', icon: '🎓', color: 'bg-blue-100 text-blue-800' },
            { name: 'سرعة التعلم', icon: '⚡', color: 'bg-yellow-100 text-yellow-800' },
            { name: 'المشاركة النشطة', icon: '💬', color: 'bg-green-100 text-green-800' },
            { name: 'مساعد الزملاء', icon: '🤝', color: 'bg-purple-100 text-purple-800' },
            { name: 'الإجابة الصحيحة', icon: '✅', color: 'bg-emerald-100 text-emerald-800' },
            { name: 'الملتزم بالمواعيد', icon: '⏰', color: 'bg-orange-100 text-orange-800' },
          ].map((achievement, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-2 rounded-full ${achievement.color} flex items-center justify-center text-2xl`}>
                {achievement.icon}
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {achievement.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* أزرار الإجراءات */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
          مشاركة الإنجازات
        </button>
        <button className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
          تصدير جميع الشهادات
        </button>
      </div>
    </div>
  );
}
