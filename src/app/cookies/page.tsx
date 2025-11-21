'use client';

import { motion } from 'framer-motion';
import Icon from '@/components/ui/icons/IconSystem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function CookiesPage() {
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
              className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Icon name="cookie" size="lg" className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              سياسة ملفات تعريف الارتباط
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              شرح ملفات تعريف الارتباط، كيفية عملها، ولماذا نستخدمها لتحسين تجربتك على منصة خطى
            </p>
            <p className="text-sm text-gray-500 mt-2">
              آخر تحديث: 24 أكتوبر 2025
            </p>
          </div>

          <div className="space-y-6">
            {/* What are Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="info" size="sm" />
                  ما هي ملفات تعريف الارتباط؟
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة يتم حفظها على جهازك عند زيارة موقعنا. تساعد هذه الملفات في تحسين تجربتك على المنصة من خلال تذكر تفضيلاتك، تحليل استخدام الموقع، وتقديم محتوى مخصص. لا تحتوي ملفات تعريف الارتباط على برمجيات ضارة ولا يمكنها الوصول إلى ملفات جهازك.
                </p>
              </CardContent>
            </Card>

            {/* Types of Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="settings" size="sm" />
                  أنواع الملفات المستخدمة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">ملفات تعريف الارتباط الأساسية</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    ضرورية لعمل المنصة بشكل صحيح، تشمل المصادقة، الأمان، والوظائف الأساسية مثل تسجيل الدخول والحفاظ على جلسة العمل.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">ملفات تعريف الارتباط الأداء</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    تساعدنا في فهم كيفية استخدام المنصة من خلال جمع معلومات إحصائية مثل أوقات تحميل الصفحات، تتبع الأخطاء، وتحليل حركة المستخدمين.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">ملفات تعريف الارتباط الوظيفية</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    تحفظ تفضيلاتك الشخصية مثل اللغة، إعدادات السمة (فاتح/داكن)، وخيارات العرض لتحسين تجربتك.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">ملفات تعريف الارتباط التسويقية</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    تستخدم لعرض محتوى مخصص وتوصيات دورات بناءً على اهتماماتك، وتتطلب موافقتك الصريحة قبل التنشيط.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* First-party vs Third-party */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="globe" size="sm" />
                  ملفات الطرف الأول والثالث
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <strong>ملفات الطرف الأول:</strong> يتم تعيينها مباشرة من قبل منصة خطى وتُستخدم لتحسين تجربتك على موقعنا.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>ملفات الطرف الثالث:</strong> يتم تعيينها من قبل خدمات خارجية موثوقة تساعدنا في تشغيل المنصة، مثل خدمات التحليلات، معالجي الدفع، ومشغلات الفيديو. هذه الملفات تخضع لسياسات الخصوصية الخاصة بهذه الخدمات.
                </p>
              </CardContent>
            </Card>

            {/* Cookie Duration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="clock" size="sm" />
                  مدة الاحتفاظ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li><strong>ملفات الجلسة:</strong> تُحذف تلقائياً عند إغلاق المتصفح ولا تُحفظ على جهازك لفترات طويلة.</li>
                  <li><strong>ملفات مستمرة:</strong> تُحفظ على جهازك لفترات محددة (من أيام إلى سنوات) لتذكر تفضيلاتك وتحسين الخدمة.</li>
                  <li><strong>ملفات طويلة الأمد:</strong> تستخدم لوظائف مثل &ldquo;تذكرني&rdquo; في تسجيل الدخول، وتظل محفوظة حتى تقوم بحذفها يدوياً أو تنتهي صلاحيتها.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Managing Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="userCheck" size="sm" />
                  إدارة ملفات تعريف الارتباط
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  يمكنك التحكم في ملفات تعريف الارتباط من خلال:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li><strong>إعدادات المتصفح:</strong> معظم المتصفحات تسمح بحظر أو حذف ملفات تعريف الارتباط. تحقق من قسم المساعدة في متصفحك.</li>
                  <li><strong>مركز التفضيلات في المنصة:</strong> يمكنك إدارة تفضيلات ملفات تعريف الارتباط من إعدادات حسابك.</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  <strong>تأثير تعطيل ملفات تعريف الارتباط:</strong> قد يؤدي تعطيل بعض أنواع ملفات تعريف الارتباط إلى تدهور تجربة الاستخدام، مثل فقدان تفضيلاتك أو عدم القدرة على الوصول إلى بعض الميزات.
                </p>
              </CardContent>
            </Card>

            {/* Third-party Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="share" size="sm" />
                  الخدمات الخارجية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  قد نستخدم خدمات خارجية قد تقوم بتعيين ملفات تعريف ارتباط خاصة بها:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li><strong>Google Analytics:</strong> لتحليل استخدام الموقع - <a href="https://policies.google.com/privacy" className="text-blue-600 hover:text-blue-800 underline">سياسة الخصوصية</a></li>
                  <li><strong>معالجي الدفع:</strong> مثل Stripe أو PayPal لمعالجة المدفوعات الآمنة - تحقق من سياساتهم الخاصة</li>
                  <li><strong>مشغلات الفيديو:</strong> مثل YouTube أو Vimeo لعرض المحتوى التعليمي - <a href="https://policies.google.com/privacy" className="text-blue-600 hover:text-blue-800 underline">سياسة الخصوصية</a></li>
                </ul>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="refresh" size="sm" />
                  التحديثات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  قد نقوم بتحديث سياسة ملفات تعريف الارتباط هذه من وقت لآخر لتعكس التغييرات في خدماتنا أو القوانين المعمول بها. سنقوم بإخطارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار بارز على المنصة قبل تطبيقها.
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
                  إذا كان لديك أي أسئلة حول ملفات تعريف الارتباط أو كيفية إدارتها، يمكنك التواصل معنا:
                </p>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><strong>مسؤول حماية البيانات:</strong> privacy@khatwa.com</p>
                  <p><strong>الدعم الفني:</strong> support@khatwa.com</p>
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