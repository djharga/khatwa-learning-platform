'use client';

import { motion } from 'framer-motion';
import Icon from '@/components/ui/icons/IconSystem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function UsagePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Icon name="checkCircle" size="lg" className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              سياسة الاستخدام المقبول
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              الإرشادات الخاصة بالاستخدام المقبول لمنصة خطى التعليمية
            </p>
            <p className="text-sm text-gray-500 mt-2">
              آخر تحديث: 24 أكتوبر 2025
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
                  تهدف سياسة الاستخدام المقبول هذه إلى ضمان بيئة آمنة ومحترمة لجميع مستخدمي منصة خطى. نحن ملتزمون بتوفير منصة تعليمية عالية الجودة، ونطلب من جميع المستخدمين الالتزام بهذه الإرشادات للحفاظ على تجربة إيجابية للجميع. يرجى قراءة هذه السياسة بعناية قبل استخدام خدماتنا.
                </p>
              </CardContent>
            </Card>

            {/* Acceptable Use */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="check" size="sm" />
                  الاستخدام المقبول
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  يُسمح باستخدام منصة خطى للأغراض التالية:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>الأغراض التعليمية الشخصية والمهنية</li>
                  <li>التعلم الذاتي والتطوير المهاري</li>
                  <li>التفاعل المحترم مع المجتمع التعليمي</li>
                  <li>طلب الاستشارات المشروعة والمناسبة</li>
                  <li>مشاركة الخبرات والمعرفة بطريقة بناءة</li>
                </ul>
              </CardContent>
            </Card>

            {/* Prohibited Use */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="x" size="sm" />
                  الاستخدام المحظور
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  يُمنع استخدام المنصة للأغراض التالية، ويُعتبر انتهاكاً لهذه السياسة:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>مشاركة بيانات تسجيل الدخول أو الوصول غير المصرح به</li>
                  <li>تحميل أو توزيع المحتوى بشكل غير قانوني</li>
                  <li>التنمر أو السلوك المسيء أو التحرش</li>
                  <li>إرسال الرسائل المزعجة أو الإعلانات غير المرغوب فيها</li>
                  <li>محاولة اختراق النظام أو تعطيل الخدمات</li>
                  <li>التظاهر بهوية شخص آخر أو انتحال الشخصية</li>
                  <li>الاستخدام التجاري دون إذن مسبق</li>
                </ul>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="shield" size="sm" />
                  حقوق الملكية الفكرية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  نحترم حقوق الملكية الفكرية لجميع الأطراف، ونتوقع من مستخدمينا الالتزام بذلك:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>احترام حقوق الطبع والنشر لجميع المحتويات</li>
                  <li>عدم نسخ أو إعادة توزيع مواد الدورات دون إذن</li>
                  <li>إعطاء الإسناد المناسب عند مشاركة المحتوى المسموح به</li>
                  <li>عدم استخدام العلامات التجارية أو الشعارات دون موافقة</li>
                </ul>
              </CardContent>
            </Card>

            {/* Community Conduct */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="users" size="sm" />
                  السلوك في المجتمع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  نسعى لبناء مجتمع تعليمي إيجابي وداعم:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>الحفاظ على نقاشات محترمة وبناءة</li>
                  <li>عدم استخدام الكلام المسيء أو الكراهية</li>
                  <li>تقديم تعليقات بناءة ومهنية</li>
                  <li>التواصل بطريقة احترافية في جميع التفاعلات</li>
                </ul>
              </CardContent>
            </Card>

            {/* Consequences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="warning" size="sm" />
                  العواقب
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  سنتعامل مع انتهاكات سياسة الاستخدام المقبول بجدية:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>تحذير للانتهاك الأول</li>
                  <li>تعليق مؤقت للحساب في حالات الانتهاك المتكرر</li>
                  <li>إنهاء دائم للحساب في الحالات الخطيرة</li>
                  <li>اتخاذ إجراءات قانونية للانتهاكات الجسيمة</li>
                </ul>
              </CardContent>
            </Card>

            {/* Reporting Violations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="flag" size="sm" />
                  الإبلاغ عن الانتهاكات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  إذا لاحظت سلوكاً غير مناسب أو محتوى مخالف، يرجى الإبلاغ عنه فوراً. يمكنك استخدام زر &ldquo;الإبلاغ&rdquo; المتاح في المنصة أو التواصل مع فريق الدعم. سنقوم بالتحقيق في جميع التقارير بسرعة واتخاذ الإجراءات المناسبة لحماية المجتمع.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="mail" size="sm" />
                  التواصل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  إذا كان لديك أي أسئلة حول سياسة الاستخدام المقبول، يمكنك التواصل معنا:
                </p>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><strong>البريد الإلكتروني:</strong> support@khatwa.com</p>
                  <p><strong>الهاتف:</strong> +20 123 456 789</p>
                  <p><strong>العنوان:</strong> القاهرة، مصر</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}