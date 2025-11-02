'use client';

import { useState } from 'react';
import CourseSlider from './CourseSlider';

const SliderDemo = () => {
  const [autoplay, setAutoplay] = useState(true);
  const [showControls, setShowControls] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg mb-8 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center text-primary-600 mb-2">
              تجربة سلايدر الدورات التفاعلي 🚀
            </h2>
            <p className="text-center text-neutral-600">
              سلايدر تفاعلي يعرض بطاقات الدورات مع تأثيرات حركية سلسة
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setAutoplay(!autoplay)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  autoplay
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
                }`}
              >
                {autoplay ? '⏸️ إيقاف التشغيل التلقائي' : '▶️ تشغيل تلقائي'}
              </button>
              <button
                onClick={() => setShowControls(!showControls)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  showControls
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
                }`}
              >
                {showControls ? '👁️ إخفاء التحكم' : '👁️ إظهار التحكم'}
              </button>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>🔄 استخدم الأزرار أو المؤشرات السفلية للتنقل</p>
              <p>🖱️ حرك الماوس فوق السلايدر لإيقاف التشغيل التلقائي</p>
            </div>
          </div>
        </div>

        <CourseSlider autoplay={autoplay} autoplayDelay={3000} />

        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg mt-8 p-6">
          <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
            ميزات السلايدر:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>انتقالات سلسة مع تأثيرات 3D</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>تشغيل تلقائي قابل للتخصيص</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>أزرار تنقل ومؤشرات تفاعلية</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>تصميم متجاوب للهواتف</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              <span>تأثيرات hover متقدمة</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span>استخدام بطاقات الدورة الحالية</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderDemo;
