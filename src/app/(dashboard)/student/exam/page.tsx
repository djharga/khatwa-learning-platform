'use client';

import { motion } from 'framer-motion';
import ExamInterface from '@/components/exam/ExamInterface';
import AuthGuard from '@/components/auth/AuthGuard';

export default function ExamPage() {
  return (
    <AuthGuard allowedRoles={['student', 'admin', 'instructor']}>
      <div className="min-h-screen bg-background parallax-medium">
        <div className="grid-container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="heading-1 text-gradient-modern text-center mb-4">
              <span className="bg-gradient-to-r from-accent via-secondary-expert to-secondary-secure bg-clip-text text-transparent">
                منصة التقييم والامتحانات
              </span>
            </h1>
            <p className="body-text text-text-secondary content-normal mx-auto">
              اختبر معرفتك وتابع تقدمك في رحلتك التعليمية
            </p>
          </motion.div>
          <ExamInterface isAuthenticated={true} />
        </div>

        {/* بنك الأسئلة */}
        <div className="max-w-4xl mx-auto mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                بنك الأسئلة
              </h2>
              <p className="text-gray-700 mb-6">
                تمتع بالوصول إلى آلاف الأسئلة المحفوظة في بنك الأسئلة الخاص بنا،
                والذي يتضمن أسئلة تغطي كافة مواضيع المراجعة الداخلية. استخدم هذا
                البنك للتحضير للامتحانات أو لإنشاء اختبارات تدريبية.
              </p>
              <a
                href="/question-bank"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                تصفح بنك الأسئلة
              </a>
            </div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-48 flex items-center justify-center text-gray-500">
              صورة توضيحية
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
