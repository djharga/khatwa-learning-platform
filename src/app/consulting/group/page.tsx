'use client';

/**
 * صفحة الجلسات الجماعية - منصة خطى التعليمية
 * صفحة خاصة بالاستشارات والجلسات الجماعية
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle,
  Star,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function GroupConsultingPage() {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const sessions = [
    {
      id: '1',
      title: 'جلسة استشارية جماعية - المحاسبة',
      description: 'مناقشة أفضل الممارسات في المحاسبة والإدارة المالية',
      date: '2025-11-15',
      time: '18:00 - 20:00',
      duration: '2 ساعة',
      participants: 12,
      maxParticipants: 20,
      price: 299,
      instructor: 'أ. محمد أحمد',
      type: 'online',
    },
    {
      id: '2',
      title: 'جلسة استشارية جماعية - المراجعة',
      description: 'ورشة عمل عن المراجعة الداخلية وضبط الجودة',
      date: '2025-11-20',
      time: '19:00 - 21:00',
      duration: '2 ساعة',
      participants: 8,
      maxParticipants: 15,
      price: 349,
      instructor: 'د. سارة علي',
      type: 'online',
    },
    {
      id: '3',
      title: 'جلسة استشارية جماعية - التحليل المالي',
      description: 'تعلم كيفية تحليل القوائم المالية واتخاذ القرارات',
      date: '2025-11-25',
      time: '17:00 - 19:00',
      duration: '2 ساعة',
      participants: 15,
      maxParticipants: 25,
      price: 399,
      instructor: 'أ. خالد عمر',
      type: 'online',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-purple-100 px-6 py-3 rounded-full mb-6">
            <Users className="w-6 h-6 text-purple-600" />
            <span className="text-purple-700 font-bold">الجلسات الجماعية</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            الجلسات الاستشارية الجماعية
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            انضم إلى جلسات استشارية جماعية مع خبراء في المجال وشارك الخبرات مع زملائك
          </p>
        </motion.div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Video className="w-6 h-6 text-purple-600" />
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  متاح
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{session.title}</h3>
              <p className="text-gray-600 mb-4">{session.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{session.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{session.participants}/{session.maxParticipants} مشارك</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4" />
                  <span>{session.instructor}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">{session.price} ر.س</span>
                <span className="text-sm text-gray-500">{session.duration}</span>
              </div>

              <button
                onClick={() => setSelectedSession(session.id)}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                التسجيل الآن
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">مميزات الجلسات الجماعية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">تفاعل وتواصل</h3>
                <p className="text-gray-600">
                  تفاعل مع المشاركين الآخرين وشارك الخبرات والمعرفة في بيئة تعليمية تفاعلية
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">خبراء متخصصون</h3>
                <p className="text-gray-600">
                  احصل على استشارة من خبراء متخصصين في المجال مع سنوات من الخبرة
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">أسعار معقولة</h3>
                <p className="text-gray-600">
                  استفد من الأسعار المعقولة للجلسات الجماعية مقارنة بالجلسات الفردية
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">مرونة في الحضور</h3>
                <p className="text-gray-600">
                  جميع الجلسات متاحة أونلاين يمكنك الحضور من أي مكان وفي أي وقت
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-4">ابدأ رحلتك مع الاستشارات الجماعية</h2>
          <p className="text-purple-100 mb-6">
            انضم إلى مجتمع من المحترفين وتعلم من أفضل الخبراء في المجال
          </p>
          <Link
            href="/consulting"
            className="inline-block px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
          >
            تعرف على المزيد
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

