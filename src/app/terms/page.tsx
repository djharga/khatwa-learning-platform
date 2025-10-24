'use client';

import { motion } from 'framer-motion';
import Icon from '@/components/ui/icons/IconSystem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function TermsPage() {
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
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Icon name="fileText" size="lg" className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              شروط الاستخدام
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              الشروط والأحكام الخاصة باستخدام منصة خطى التعليمية
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
                  مرحباً بك في منصة خطى للتعليم والتدريب والاستشارات. هذه الشروط والأحكام تحدد القواعد واللوائح لاستخدام موقع وخدمات منصة خطى. باستخدام هذه المنصة، فإنك توافق على الالتزام بهذه الشروط. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام المنصة.
                </p>
              </CardContent>
            </Card>

            {/* Definitions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="book" size="sm" />
                  المصطلحات والتعريفات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">المنصة</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    تشير إلى منصة خطى للتعليم والتدريب والاستشارات وجميع الخدمات المقدمة من خلالها.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">المستخدم</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    أي شخص يقوم بالوصول إلى المنصة أو استخدام خدماتها.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">المحتوى</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    جميع المواد التعليمية، الدورات، الفيديوهات، النصوص، والمحتويات الأخرى المتاحة على المنصة.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* User Accounts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="user" size="sm" />
                  حسابات المستخدمين
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">إنشاء الحساب</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>يجب تقديم معلومات دقيقة وحديثة عند إنشاء الحساب</li>
                    <li>أنت مسؤول عن الحفاظ على سرية كلمة المرور الخاصة بك</li>
                    <li>يجب إخطارنا فوراً بأي استخدام غير مصرح به لحسابك</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">مسؤوليات المستخدم</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>استخدام المنصة للأغراض التعليمية المشروعة فقط</li>
                    <li>عدم نسخ أو توزيع المحتوى دون إذن مكتوب</li>
                    <li>عدم محاولة اختراق أو إلحاق الضرر بالمنصة</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Content Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="play" size="sm" />
                  استخدام المحتوى
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">حقوق الملكية الفكرية</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    جميع المحتويات على المنصة محمية بحقوق الطبع والنشر والملكية الفكرية. لا يحق لك إعادة إنتاج أو توزيع أو بيع هذا المحتوى دون إذن مكتوب من إدارة المنصة.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">الاستخدام الشخصي</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    يُسمح لك باستخدام المحتوى للأغراض التعليمية الشخصية فقط. أي استخدام تجاري يتطلب موافقة كتابية مسبقة.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payments and Refunds */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="creditCard" size="sm" />
                  المدفوعات والاسترداد
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">سياسة الدفع</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>جميع المدفوعات تتم بطرق آمنة ومشفرة</li>
                    <li>الأسعار محددة بوضوح قبل إتمام الشراء</li>
                    <li>يتم إصدار فاتورة لكل عملية دفع</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">سياسة الاسترداد</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>يمكن طلب استرداد المبلغ خلال 7 أيام من الشراء</li>
                    <li>الاسترداد مشروط بألا يكون المحتوى تم الوصول إليه بالكامل</li>
                    <li>معالجة طلبات الاسترداد تستغرق 5-10 أيام عمل</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="lock" size="sm" />
                  الخصوصية وحماية البيانات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. للمزيد من التفاصيل، يرجى مراجعة{' '}
                  <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                    سياسة الخصوصية
                  </a>
                  {' '}الخاصة بنا.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>نستخدم بياناتك فقط لتحسين خدماتنا وتجربة التعلم</li>
                  <li>لا نشارك معلوماتك الشخصية مع أطراف ثالثة دون موافقتك</li>
                  <li>نتخذ تدابير أمنية متقدمة لحماية بياناتك</li>
                </ul>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="x" size="sm" />
                  إنهاء الخدمة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  نحتفظ بالحق في تعليق أو إنهاء حسابك في أي وقت إذا انتهكت هذه الشروط أو قمت بأنشطة غير قانونية. في حالة الإنهاء، ستفقد الوصول إلى حسابك وجميع المحتويات المرتبطة به.
                </p>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="shield" size="sm" />
                  تحديد المسؤولية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  المنصة تقدم المحتوى "كما هو" دون ضمانات صريحة أو ضمنية. لن نكون مسؤولين عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام المنصة أو عدم القدرة على استخدامها.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="mail" size="sm" />
                  التواصل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يمكنك التواصل معنا:
                </p>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><strong>البريد الإلكتروني:</strong> support@khatwa.com</p>
                  <p><strong>الهاتف:</strong> +20 123 456 789</p>
                  <p><strong>العنوان:</strong> القاهرة، مصر</p>
                </div>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Icon name="refresh" size="sm" className="text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      تحديث الشروط
                    </h4>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      قد نقوم بتحديث هذه الشروط والأحكام من وقت لآخر. سنقوم بإخطارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار على المنصة. استمرار استخدامك للمنصة بعد التحديثات يعني موافقتك على الشروط الجديدة.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
