'use client';

import React from 'react';

/**
 * صفحة عرض توضيحي لنظام الطباعة المتطور
 * Typography Demo Page - Showcasing the advanced typography system
 */
export default function TypographyDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <header className="text-center space-y-4 pb-8 border-b-2 border-primary-200 dark:border-primary-800">
          <h1 className="display-lg text-gradient-primary text-optimize-legibility">
            نظام الطباعة المتطور
          </h1>
          <p className="lead-text text-text-secondary max-w-3xl mx-auto">
            نظام طباعة عصري ومتجاوب مصمم خصيصًا للغة العربية مع دعم كامل للتجاوب عبر جميع الأجهزة
          </p>
        </header>

        {/* Display Headings Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="h2 text-primary-600 dark:text-primary-400">العناوين الضخمة</h2>
            <span className="caption-text">Display Headings</span>
          </div>
          
          <div className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-elevation-2">
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <h3 className="display-xl text-optimize-legibility">
                  منصة خطى التعليمية
                </h3>
                <code className="caption-text font-mono">.display-xl</code>
              </div>
              <p className="caption-text">للعناوين الرئيسية الضخمة في الصفحات الرئيسية</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <h3 className="display-lg text-optimize-legibility">
                  التعلم بلا حدود
                </h3>
                <code className="caption-text font-mono">.display-lg</code>
              </div>
              <p className="caption-text">للعناوين الثانوية الكبيرة</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <h3 className="display-md text-optimize-legibility">
                  ابدأ رحلتك التعليمية اليوم
                </h3>
                <code className="caption-text font-mono">.display-md</code>
              </div>
              <p className="caption-text">للعناوين البارزة</p>
            </div>
          </div>
        </section>

        {/* Standard Headings Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="h2 text-primary-600 dark:text-primary-400">العناوين القياسية</h2>
            <span className="caption-text">Standard Headings (H1-H6)</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-4">
              <div className="flex justify-between items-baseline">
                <h1 className="h1">عنوان H1</h1>
                <code className="caption-text font-mono">.h1</code>
              </div>
              <div className="flex justify-between items-baseline">
                <h2 className="h2">عنوان H2</h2>
                <code className="caption-text font-mono">.h2</code>
              </div>
              <div className="flex justify-between items-baseline">
                <h3 className="h3">عنوان H3</h3>
                <code className="caption-text font-mono">.h3</code>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-4">
              <div className="flex justify-between items-baseline">
                <h4 className="h4">عنوان H4</h4>
                <code className="caption-text font-mono">.h4</code>
              </div>
              <div className="flex justify-between items-baseline">
                <h5 className="h5">عنوان H5</h5>
                <code className="caption-text font-mono">.h5</code>
              </div>
              <div className="flex justify-between items-baseline">
                <h6 className="h6">عنوان H6</h6>
                <code className="caption-text font-mono">.h6</code>
              </div>
            </div>
          </div>
        </section>

        {/* Body Text Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="h2 text-primary-600 dark:text-primary-400">النصوص الأساسية</h2>
            <span className="caption-text">Body Text</span>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-4">
              <div className="flex justify-between items-start">
                <p className="body-text-xl max-w-3xl">
                  هذا نص تجريبي بحجم XL. منصة خطى التعليمية تقدم لك أفضل تجربة تعليمية عبر الإنترنت مع دورات احترافية ومحتوى تعليمي متميز.
                </p>
                <code className="caption-text font-mono whitespace-nowrap">.body-text-xl</code>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-4">
              <div className="flex justify-between items-start">
                <p className="body-text-lg max-w-3xl">
                  هذا نص تجريبي بحجم Large. نوفر لك مجموعة واسعة من الدورات التدريبية في مختلف المجالات مع مدربين محترفين وشهادات معتمدة.
                </p>
                <code className="caption-text font-mono whitespace-nowrap">.body-text-lg</code>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-4">
              <div className="flex justify-between items-start">
                <p className="body-text-base max-w-3xl">
                  هذا نص تجريبي بالحجم الأساسي. نظام تعليمي متكامل يجمع بين الجودة والاحترافية لتحقيق أهدافك التعليمية والمهنية.
                </p>
                <code className="caption-text font-mono whitespace-nowrap">.body-text-base</code>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-4">
              <div className="flex justify-between items-start">
                <p className="body-text-sm max-w-3xl">
                  هذا نص تجريبي بحجم Small. محتوى تعليمي متنوع ومصمم بعناية لتلبية احتياجاتك التعليمية.
                </p>
                <code className="caption-text font-mono whitespace-nowrap">.body-text-sm</code>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Text Styles */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="h2 text-primary-600 dark:text-primary-400">أنماط نصوص متخصصة</h2>
            <span className="caption-text">Specialized Text Styles</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-3">
              <code className="caption-text font-mono">.lead-text</code>
              <p className="lead-text">
                نص تمهيدي يستخدم في بداية المقالات لجذب انتباه القارئ وتقديم نظرة عامة على المحتوى.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-3">
              <code className="caption-text font-mono">.technical-text</code>
              <p className="technical-text">
                نص تقني مصمم للمحتوى الأكاديمي والتقني مع تباعد محسّن للقراءة الطويلة.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-3">
              <code className="caption-text font-mono">.quote-text</code>
              <blockquote className="quote-text border-r-4 border-primary-500 pr-6">
                "التعليم هو المفتاح الذي يفتح الأبواب الذهبية للحرية"
              </blockquote>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-3">
              <code className="caption-text font-mono">.label-text</code>
              <div className="space-y-2">
                <span className="label-text">تصنيف</span>
                <span className="label-text">جديد</span>
                <span className="label-text">مميز</span>
              </div>
            </div>
          </div>
        </section>

        {/* Button Text Styles */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="h2 text-primary-600 dark:text-primary-400">نصوص الأزرار</h2>
            <span className="caption-text">Button Text</span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button className="button-text-lg bg-primary-600 text-white px-8 py-4 rounded-xl shadow-primary-md hover:shadow-primary-lg transition-all">
              ابدأ الآن
            </button>
            <button className="button-text bg-accent-600 text-white px-6 py-3 rounded-lg shadow-accent-md hover:shadow-accent-lg transition-all">
              تعلم المزيد
            </button>
            <button className="button-text-sm border-2 border-primary-600 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all">
              تفاصيل إضافية
            </button>
          </div>
        </section>

        {/* Font Families */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="h2 text-primary-600 dark:text-primary-400">عائلات الخطوط</h2>
            <span className="caption-text">Font Families</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-3">
              <code className="caption-text font-mono">.font-display (Cairo)</code>
              <p className="font-display text-2xl">
                خط Cairo - للعناوين الكبيرة والمميزة
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-3">
              <code className="caption-text font-mono">.font-body (Tajawal)</code>
              <p className="font-body text-2xl">
                خط Tajawal - للنصوص الأساسية الواضحة
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-3">
              <code className="caption-text font-mono">.font-technical (IBM Plex)</code>
              <p className="font-technical text-2xl">
                خط IBM Plex - للنصوص التقنية الاحترافية
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-3">
              <code className="caption-text font-mono">.font-button (Almarai)</code>
              <p className="font-button text-2xl">
                خط Almarai - للأزرار والعناصر التفاعلية
              </p>
            </div>
          </div>
        </section>

        {/* Font Weights */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="h2 text-primary-600 dark:text-primary-400">أوزان الخطوط</h2>
            <span className="caption-text">Font Weights</span>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-elevation-2 space-y-3">
            <p className="font-light text-xl">خفيف (Light 300) - مثالي للنصوص الثانوية</p>
            <p className="font-normal text-xl">عادي (Normal 400) - الخط الأساسي</p>
            <p className="font-medium text-xl">متوسط (Medium 500) - للتأكيد البسيط</p>
            <p className="font-semibold text-xl">نصف عريض (Semibold 600) - للعناوين الفرعية</p>
            <p className="font-bold text-xl">عريض (Bold 700) - للعناوين الرئيسية</p>
            <p className="font-extrabold text-xl">عريض جداً (Extrabold 800) - للتأكيد القوي</p>
            <p className="font-black text-xl">أسود (Black 900) - للعناوين الضخمة</p>
          </div>
        </section>

        {/* Line Heights */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="h2 text-primary-600 dark:text-primary-400">ارتفاعات الأسطر</h2>
            <span className="caption-text">Line Heights</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-2">
              <code className="caption-text font-mono">.leading-tight (1.25)</code>
              <p className="leading-tight">
                هذا نص بارتفاع سطر ضيق. مناسب للعناوين الكبيرة حيث لا نحتاج مسافة كبيرة بين الأسطر.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-2">
              <code className="caption-text font-mono">.leading-snug (1.4)</code>
              <p className="leading-snug">
                هذا نص بارتفاع سطر مريح. مناسب للعناوين الصغيرة والنصوص القصيرة.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-2">
              <code className="caption-text font-mono">.leading-relaxed (1.7)</code>
              <p className="leading-relaxed">
                هذا نص بارتفاع سطر مريح. مثالي للفقرات الطويلة والقراءة المريحة. النص العربي يستفيد من المسافة الإضافية.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-elevation-2 space-y-2">
              <code className="caption-text font-mono">.leading-loose (1.85)</code>
              <p className="leading-loose">
                هذا نص بارتفاع سطر واسع. يوفر أقصى راحة للقراءة ومناسب للمقالات الطويلة والمحتوى التعليمي.
              </p>
            </div>
          </div>
        </section>

        {/* Responsive Typography Demo */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="h2 text-primary-600 dark:text-primary-400">الطباعة المتجاوبة</h2>
            <span className="caption-text">Responsive Typography</span>
          </div>
          
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900 dark:to-accent-900 p-8 rounded-2xl shadow-elevation-4">
            <h3 className="display-md text-center mb-6 text-optimize-legibility">
              جرّب تغيير حجم المتصفح
            </h3>
            <p className="lead-text text-center max-w-3xl mx-auto">
              جميع الخطوط تستخدم نظام Fluid Typography مع دالة clamp() للتكيف السلس مع جميع أحجام الشاشات من الموبايل إلى الشاشات الكبيرة
            </p>
          </div>
        </section>

        {/* Usage Guide */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="h2 text-primary-600 dark:text-primary-400">دليل الاستخدام</h2>
            <span className="caption-text">Usage Guide</span>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-elevation-2 space-y-6">
            <div>
              <h3 className="h4 mb-3 text-primary-600">متى تستخدم خط Cairo؟</h3>
              <p className="body-text-base">
                استخدم خط Cairo للعناوين الرئيسية والعناوين الكبيرة. إنه خط أنيق وعصري يعطي انطباعاً احترافياً.
              </p>
            </div>

            <div>
              <h3 className="h4 mb-3 text-primary-600">متى تستخدم خط Tajawal؟</h3>
              <p className="body-text-base">
                استخدم خط Tajawal للنصوص الأساسية والفقرات الطويلة. إنه واضح وسهل القراءة ومناسب للمحتوى الطويل.
              </p>
            </div>

            <div>
              <h3 className="h4 mb-3 text-primary-600">متى تستخدم خط IBM Plex؟</h3>
              <p className="body-text-base">
                استخدم خط IBM Plex للنصوص التقنية والأكاديمية. إنه احترافي ومناسب للمحتوى العلمي والتقني.
              </p>
            </div>

            <div>
              <h3 className="h4 mb-3 text-primary-600">متى تستخدم خط Almarai؟</h3>
              <p className="body-text-base">
                استخدم خط Almarai للأزرار والعناصر التفاعلية. إنه عصري وجريء ويعطي انطباعاً قوياً.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-12 border-t-2 border-primary-200 dark:border-primary-800">
          <p className="caption-text">
            نظام طباعة متطور ومتجاوب - مصمم بعناية للغة العربية 🎨
          </p>
          <p className="caption-text mt-2">
            تم التطوير بواسطة منصة خطى التعليمية
          </p>
        </footer>
      </div>
    </div>
  );
}

