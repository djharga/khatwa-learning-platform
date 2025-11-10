'use client';

/**
 * صفحة اختبارات CIA - منصة خطى التعليمية
 * صفحة خاصة باختبارات معهد المراجعين الداخليين (CIA)
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle,
  FileText,
  Play,
  BarChart3,
  Users,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';

export default function CIAExamsPage() {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  const exams = [
    {
      id: '1',
      title: 'اختبار CIA الجزء الأول',
      description: 'أساسيات المراجعة الداخلية',
      duration: '180 دقيقة',
      questions: 125,
      passingScore: 75,
      attempts: 3,
    },
    {
      id: '2',
      title: 'اختبار CIA الجزء الثاني',
      description: 'ممارسة المراجعة الداخلية',
      duration: '180 دقيقة',
      questions: 100,
      passingScore: 75,
      attempts: 3,
    },
    {
      id: '3',
      title: 'اختبار CIA الجزء الثالث',
      description: 'معرفة الأعمال للمراجعين الداخليين',
      duration: '180 دقيقة',
      questions: 100,
      passingScore: 75,
      attempts: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-blue-100 px-6 py-3 rounded-full mb-6">
            <Award className="w-6 h-6 text-blue-600" />
            <span className="text-blue-700 font-bold">اختبارات CIA</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            اختبارات معهد المراجعين الداخليين
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            استعد لامتحانات CIA مع مجموعة شاملة من الاختبارات التدريبية والموارد
          </p>
        </motion.div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {exams.map((exam, index) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  متاح
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{exam.title}</h3>
              <p className="text-gray-600 mb-4">{exam.description}</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>المدة: {exam.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>عدد الأسئلة: {exam.questions}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>درجة النجاح: {exam.passingScore}%</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BarChart3 className="w-4 h-4" />
                  <span>المحاولات المتاحة: {exam.attempts}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedExam(exam.id)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                ابدأ الاختبار
              </button>
            </motion.div>
          ))}
        </div>

        {/* Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات مهمة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                مواعيد الاختبارات
              </h3>
              <p className="text-gray-600">
                يمكنك أداء الاختبارات في أي وقت خلال فترات الاختبار المفتوحة. 
                يرجى التحقق من الجدول الزمني للاختبارات المتاحة.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                الشهادات
              </h3>
              <p className="text-gray-600">
                عند اجتياز جميع أجزاء الاختبار، ستحصل على شهادة معتمدة من معهد 
                المراجعين الداخليين (IIA).
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-4">ابدأ رحلتك مع CIA اليوم</h2>
          <p className="text-blue-100 mb-6">
            انضم إلى آلاف المراجعين الداخليين الذين حصلوا على شهادة CIA
          </p>
          <Link
            href="/cia"
            className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            تعرف على المزيد
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

