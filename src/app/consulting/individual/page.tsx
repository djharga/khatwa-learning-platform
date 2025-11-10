'use client';

/**
 * صفحة الجلسات الفردية - منصة خطى التعليمية
 * صفحة خاصة بالاستشارات والجلسات الفردية
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Calendar,
  Clock,
  Video,
  CheckCircle,
  Star,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function IndividualConsultingPage() {
  const [selectedConsultant, setSelectedConsultant] = useState<string | null>(null);

  const consultants = [
    {
      id: '1',
      name: 'أ. محمد أحمد',
      specialty: 'المحاسبة والإدارة المالية',
      experience: '15 سنة',
      rating: 4.9,
      sessions: 250,
      price: 500,
      availability: 'متاح',
      image: '/avatars/user.jpg',
    },
    {
      id: '2',
      name: 'د. سارة علي',
      specialty: 'المراجعة وضبط الجودة',
      experience: '12 سنة',
      rating: 4.8,
      sessions: 180,
      price: 600,
      availability: 'متاح',
      image: '/avatars/user.jpg',
    },
    {
      id: '3',
      name: 'أ. خالد عمر',
      specialty: 'التحليل المالي والميزانيات',
      experience: '10 سنة',
      rating: 4.7,
      sessions: 150,
      price: 550,
      availability: 'متاح',
      image: '/avatars/user.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-indigo-100 px-6 py-3 rounded-full mb-6">
            <User className="w-6 h-6 text-indigo-600" />
            <span className="text-indigo-700 font-bold">الجلسات الفردية</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            الجلسات الاستشارية الفردية
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            احصل على استشارة فردية مخصصة من خبراء متخصصين في المجال
          </p>
        </motion.div>

        {/* Consultants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {consultants.map((consultant, index) => (
            <motion.div
              key={consultant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-indigo-600" />
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {consultant.availability}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-1">{consultant.name}</h3>
              <p className="text-gray-600 mb-4">{consultant.specialty}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{consultant.rating} ({consultant.sessions} جلسة)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>خبرة: {consultant.experience}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">{consultant.price} ر.س</span>
                <span className="text-sm text-gray-500">للجلسة</span>
              </div>

              <button
                onClick={() => setSelectedConsultant(consultant.id)}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                حجز جلسة
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">مميزات الجلسات الفردية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">اهتمام مخصص</h3>
                <p className="text-gray-600">
                  احصل على اهتمام كامل من المستشار المختص بحل مشاكلك المحددة
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">مرونة في المواعيد</h3>
                <p className="text-gray-600">
                  اختر الموعد الذي يناسبك من المواعيد المتاحة للمستشار
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">خصوصية كاملة</h3>
                <p className="text-gray-600">
                  جلسات فردية خاصة تضمن خصوصية كاملة لمناقشة مشاكلك
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">حلول مخصصة</h3>
                <p className="text-gray-600">
                  احصل على حلول مخصصة لمشاكلك المحددة من خبراء متخصصين
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
          className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-lg p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-4">ابدأ رحلتك مع الاستشارات الفردية</h2>
          <p className="text-indigo-100 mb-6">
            احصل على استشارة مخصصة من أفضل الخبراء في المجال
          </p>
          <Link
            href="/consulting"
            className="inline-block px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
          >
            تعرف على المزيد
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

