'use client';

import { motion } from 'framer-motion';
import Icon from '@/components/ui/icons/IconSystem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function RefundPolicyPage() {
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
              className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Icon name="refresh" size="lg" className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              سياسة الاسترجاع
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              كيفية طلب استرداد المبلغ وشروط الاسترجاع في منصة خطى
            </p>
            <p className="text-sm text-gray-500 mt-2">
              آخر تحديث: 24 أكتوبر 2025
            </p>
          </div>

          <div className="space-y-6">
            {/* مقدمة */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="info" size="sm" />
                  مقدمة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  نحن في منصة خطى ملتزمون برضا عملائنا وتقديم تجربة تعليمية ممتازة. سياسة الاسترجاع هذه توضح الشروط والإجراءات المتعلقة بطلب استرداد المبالغ المدفوعة للدورات والخدمات. نسعى لضمان عدالة وشفافية في جميع عمليات الاسترداد.
                </p>
              </CardContent>
            </Card>

            {/* شروط الاسترجاع */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="clock" size="sm" />
                  شروط الاسترجاع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  يمكن طلب استرداد المبلغ خلال فترة 7 أيام من تاريخ الشراء، شريطة الالتزام بالشروط التالية:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>لم يتم الوصول إلى المحتوى بالكامل (أقل من 20% من الدورة)</li>
                  <li>تقديم سبب واضح وصحيح للاسترداد</li>
                  <li>عدم انتهاك شروط الاستخدام أثناء الفترة المحدودة</li>
                  <li>تقديم إثبات الشراء الأصلي</li>
                </ul>
              </CardContent>
            </Card>

            {/* الحالات المؤهلة للاسترجاع */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="checkCircle" size="sm" />
                  الحالات المؤهلة للاسترجاع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  يمكن طلب الاسترداد في الحالات التالية:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>مشاكل تقنية تمنع الوصول إلى المحتوى</li>
                  <li>المحتوى لا يتطابق مع الوصف المقدم</li>
                  <li>شراء مكرر أو عن طريق الخطأ</li>
                  <li>مشاكل في معالجة الدفع أو الاشتراك</li>
                </ul>
              </CardContent>
            </Card>

            {/* الحالات غير المؤهلة */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="x" size="sm" />
                  الحالات غير المؤهلة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  لا يمكن طلب الاسترداد في الحالات التالية:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>بعد إكمال الدورة أو الوصول إلى أكثر من 20% من المحتوى</li>
                  <li>بعد مرور 7 أيام من تاريخ الشراء</li>
                  <li>للحزم المجمعة بعد استخدام جزء منها</li>
                  <li>في حالة انتهاك شروط الاستخدام</li>
                </ul>
              </CardContent>
            </Card>

            {/* كيفية طلب الاسترجاع */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="mail" size="sm" />
                  كيفية طلب الاسترجاع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  لتقديم طلب استرداد، اتبع الخطوات التالية:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>تواصل مع فريق الدعم عبر البريد الإلكتروني أو الهاتف</li>
                  <li>قدم تفاصيل الطلب الأصلي (رقم الطلب، تاريخ الشراء، السبب)</li>
                  <li>انتظر مراجعة الطلب من قبل فريقنا (عادة خلال 24-48 ساعة)</li>
                  <li>ستتلقى تأكيد الاسترداد وموعد إعادة المبلغ</li>
                </ol>
              </CardContent>
            </Card>

            {/* مدة معالجة الطلبات */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="clock" size="sm" />
                  مدة معالجة الطلبات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  تستغرق معالجة طلبات الاسترداد عادة 5-10 أيام عمل من تاريخ الموافقة. سيتم إعادة المبلغ إلى طريقة الدفع الأصلية المستخدمة في الشراء. قد تختلف المدة حسب البنك أو شركة البطاقة الائتمانية.
                </p>
              </CardContent>
            </Card>

            {/* الاسترجاع الجزئي */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="dollarSign" size="sm" />
                  الاسترجاع الجزئي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  بالنسبة للاشتراكات أو الحزم الشهرية، قد يتم تقديم استرداد جزئي محسوب بناءً على الفترة المستخدمة. على سبيل المثال، إذا تم استخدام الخدمة لمدة أسبوعين من اشتراك شهري، سيتم استرداد النسبة المتبقية فقط.
                </p>
              </CardContent>
            </Card>

            {/* التواصل */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="phone" size="sm" />
                  التواصل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  لأي استفسارات حول سياسة الاسترداد أو لطلب استرداد، يمكنك التواصل معنا:
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