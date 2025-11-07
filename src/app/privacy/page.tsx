import Icon from '@/components/ui/icons/IconSystem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="lock" size="lg" className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              سياسة الخصوصية
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              كيف نحمي ونستخدم بياناتك الشخصية في منصة خطى
            </p>
            <p className="text-sm text-gray-500 mt-2">
              آخر تحديث: 23 أكتوبر 2025
            </p>
          </div>

          <div className="space-y-6">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="info" size="sm" />
                  مقدمة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  نحن في منصة خطى للتعليم والتدريب والاستشارات نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات التي تقدمها لنا عند استخدام منصتنا التعليمية.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="database" size="sm" />
                  المعلومات التي نجمعها
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">المعلومات التي تقدمها</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>الاسم الكامل والبريد الإلكتروني عند إنشاء الحساب</li>
                    <li>معلومات الملف الشخصي (الصورة، النبذة الشخصية، الخبرات)</li>
                    <li>بيانات الدفع عند شراء الدورات (تتم معالجتها بشكل آمن)</li>
                    <li>المحتوى الذي تقوم بإنشائه أو مشاركته على المنصة</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">المعلومات التي نجمعها تلقائياً</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>عنوان IP والموقع الجغرافي التقريبي</li>
                    <li>نوع المتصفح والجهاز المستخدم</li>
                    <li>صفحات المنصة التي تزورها ومدة البقاء فيها</li>
                    <li>أنماط التعلم والتقدم في الدورات</li>
                    <li>ملفات تعريف الارتباط (Cookies) لتحسين التجربة</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="target" size="sm" />
                  كيف نستخدم معلوماتك
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">تقديم الخدمات</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>إنشاء وإدارة حسابك على المنصة</li>
                    <li>تقديم المحتوى التعليمي والدورات</li>
                    <li>معالجة المدفوعات وإصدار الفواتير</li>
                    <li>إرسال الشهادات والإنجازات</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">تحسين الخدمات</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>تحليل أنماط التعلم لتحسين المحتوى</li>
                    <li>تخصيص التجربة التعليمية حسب احتياجاتك</li>
                    <li>إجراء الدراسات والبحوث التعليمية</li>
                    <li>تطوير ميزات وخدمات جديدة</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">التواصل</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>إرسال تحديثات مهمة حول حسابك</li>
                    <li>إشعارات حول الدورات والمحتوى الجديد</li>
                    <li>الرد على استفساراتك وطلبات الدعم</li>
                    <li>إرسال استطلاعات رأي لتحسين الخدمات</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="share" size="sm" />
                  مشاركة المعلومات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  نحن لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية. قد نشارك معلوماتك فقط في الحالات التالية:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li><strong>مع مقدمي الخدمات:</strong> مع شركاء موثوقين يساعدوننا في تشغيل المنصة (مثل معالجي الدفع)</li>
                  <li><strong>للامتثال القانوني:</strong> عندما يتطلب القانون أو أمر قضائي الكشف عن المعلومات</li>
                  <li><strong>لحماية الحقوق:</strong> للدفاع عن حقوقنا أو سلامة المستخدمين</li>
                  <li><strong>بموافقتك:</strong> عندما توافق صراحة على مشاركة معلوماتك</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="shield" size="sm" />
                  أمان البيانات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  نتخذ تدابير أمنية متقدمة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>تشفير البيانات أثناء النقل والتخزين</li>
                  <li>استخدام خوادم آمنة محمية بجدران الحماية</li>
                  <li>مراقبة مستمرة للكشف عن التهديدات الأمنية</li>
                  <li>نسخ احتياطي منتظم للبيانات</li>
                  <li>تدريب الموظفين على ممارسات الأمان</li>
                </ul>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="cookie" size="sm" />
                  ملفات تعريف الارتباط (Cookies)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  نستخدم ملفات تعريف الارتباط لتحسين تجربتك على المنصة:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li><strong>Cookies أساسية:</strong> ضرورية لعمل المنصة ولا يمكن إلغاؤها</li>
                  <li><strong>Cookies الأداء:</strong> تساعدنا في فهم كيفية استخدام المنصة</li>
                  <li><strong>Cookies الوظائف:</strong> تحفظ تفضيلاتك وإعداداتك</li>
                  <li><strong>Cookies التسويق:</strong> تساعد في عرض محتوى مخصص (بموافقتك)</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  يمكنك إدارة إعدادات ملفات تعريف الارتباط من خلال متصفحك أو إعدادات حسابك.
                </p>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="userCheck" size="sm" />
                  حقوقك في خصوصية البيانات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  لديك الحق في:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li><strong>الوصول:</strong> طلب نسخة من البيانات الشخصية التي نحتفظ بها عنك</li>
                  <li><strong>التصحيح:</strong> طلب تصحيح أي بيانات غير دقيقة</li>
                  <li><strong>الحذف:</strong> طلب حذف بياناتك الشخصية (حق النسيان)</li>
                  <li><strong>تقييد المعالجة:</strong> طلب تحديد استخدام بياناتك</li>
                  <li><strong>الاعتراض:</strong> الرفض على معالجة بياناتك لأغراض معينة</li>
                  <li><strong>النقل:</strong> الحصول على بياناتك بتنسيق قابل للاستخدام</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  لممارسة هذه الحقوق، يرجى التواصل معنا عبر البريد الإلكتروني privacy@khatwa.com
                </p>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="users" size="sm" />
                  خصوصية الأطفال
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  منصتنا غير موجهة للأطفال دون سن 13 عاماً. نحن لا نجمع عمداً معلومات شخصية من الأطفال دون سن 13 عاماً. إذا علمنا أننا جمعنا معلومات من طفل دون هذا السن، سنقوم بحذفها فوراً. إذا كنت والداً أو ولي أمر وتشك في أن طفلك قد قدم لنا معلومات شخصية، يرجى التواصل معنا.
                </p>
              </CardContent>
            </Card>

            {/* International Data Transfers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="globe" size="sm" />
                  نقل البيانات الدولي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  قد يتم نقل بياناتك وتخزينها في دول أخرى غير بلد إقامتك. نتخذ تدابير مناسبة لضمان أن نقل البيانات يتم بطريقة آمنة ويتوافق مع القوانين المعمول بها. عند نقل البيانات خارج المنطقة الاقتصادية الأوروبية، نتأكد من وجود ضمانات كافية لحماية بياناتك.
                </p>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="clock" size="sm" />
                  مدة الاحتفاظ بالبيانات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  نحتفظ ببياناتك الشخصية للمدة اللازمة لتحقيق الأغراض المذكورة في هذه السياسة:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>بيانات الحساب: طوال فترة نشاط حسابك</li>
                  <li>بيانات الدفع: لمدة 7 سنوات لأغراض المحاسبة والضرائب</li>
                  <li>بيانات التعلم: إلى أن تحذف حسابك أو تطلب حذفها</li>
                  <li>البيانات المجهولة: قد نحتفظ بها لأغراض البحث والتحسين</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="mail" size="sm" />
                  التواصل والشكاوى
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  إذا كان لديك أي أسئلة أو مخاوف حول سياسة الخصوصية أو كيفية تعاملنا مع بياناتك، يمكنك التواصل معنا:
                </p>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><strong>مسؤول حماية البيانات:</strong> privacy@khatwa.com</p>
                  <p><strong>الدعم الفني:</strong> support@khatwa.com</p>
                  <p><strong>الهاتف:</strong> +20 123 456 789</p>
                  <p><strong>العنوان:</strong> القاهرة، مصر</p>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  يمكنك أيضاً تقديم شكوى للهيئة المختصة بحماية البيانات في بلدك إذا كنت تعتقد أن حقوقك قد انتهكت.
                </p>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Icon name="refresh" size="sm" className="text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                      تحديثات السياسة
                    </h4>
                    <p className="text-green-800 dark:text-green-200 text-sm">
                      قد نقوم بتحديث سياسة الخصوصية من وقت لآخر لتعكس التغييرات في ممارساتنا أو القوانين المعمول بها. سنقوم بإخطارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار بارز على المنصة قبل 30 يوماً من تطبيق التغييرات.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
