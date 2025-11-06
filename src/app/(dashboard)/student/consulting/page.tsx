'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Video,
  MessageSquare,
  FileText,
  CheckCircle,
  User,
  Star,
  DollarSign,
  Upload,
  Download,
  Plus,
  X,
  Send,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import StyledButton from '@/components/ui/StyledButton';

interface Consultant {
  id: string;
  name: string;
  title: string;
  specialty: string[];
  rating: number;
  reviews: number;
  hourlyRate: number;
  avatar: string;
  availability: string[];
}

interface Session {
  id: string;
  consultant: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  files?: string[];
}

export default function ConsultingPage() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // المستشارون المتاحون
  const consultants: Consultant[] = [
    {
      id: '1',
      name: 'د. أحمد محمود',
      title: 'خبير مراجعة داخلية',
      specialty: ['المراجعة الداخلية', 'إدارة المخاطر', 'الامتثال'],
      rating: 4.9,
      reviews: 156,
      hourlyRate: 150,
      avatar: '/avatars/consultant1.jpg',
      availability: ['السبت', 'الأحد', 'الاثنين'],
    },
    {
      id: '2',
      name: 'د. فاطمة علي',
      title: 'خبيرة محاسبة مالية',
      specialty: ['المحاسبة المالية', 'التحليل المالي', 'IFRS'],
      rating: 4.8,
      reviews: 132,
      hourlyRate: 140,
      avatar: '/avatars/consultant2.jpg',
      availability: ['الثلاثاء', 'الأربعاء', 'الخميس'],
    },
    {
      id: '3',
      name: 'د. محمد حسن',
      title: 'خبير حوكمة وامتثال',
      specialty: ['الحوكمة', 'الامتثال التنظيمي', 'SOX'],
      rating: 4.7,
      reviews: 98,
      hourlyRate: 130,
      avatar: '/avatars/consultant3.jpg',
      availability: ['السبت', 'الثلاثاء', 'الخميس'],
    },
  ];

  // الجلسات السابقة والقادمة
  const sessions: Session[] = [
    {
      id: '1',
      consultant: 'د. أحمد محمود',
      date: '2025-10-30',
      time: '10:00',
      duration: 60,
      status: 'scheduled',
    },
    {
      id: '2',
      consultant: 'د. فاطمة علي',
      date: '2025-10-20',
      time: '14:00',
      duration: 90,
      status: 'completed',
      notes: 'تمت مناقشة تحليل النسب المالية وتطبيقها العملي',
      files: ['تقرير_التحليل_المالي.pdf', 'نماذج_النسب.xlsx'],
    },
  ];

  const handleBooking = () => {
    // معالجة الحجز
    alert(`تم حجز جلسة مع ${selectedConsultant?.name} في ${selectedDate} الساعة ${selectedTime}`);
    setShowBookingModal(false);
    setSelectedConsultant(null);
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
              <Video className="w-8 h-8 text-indigo-600" />
              الاستشارات الفردية
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              احجز جلسة استشارية مباشرة مع خبرائنا المعتمدين
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* قائمة المستشارين */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                المستشارون المتاحون
              </h2>

              {consultants.map((consultant) => (
                <motion.div
                  key={consultant.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* صورة المستشار */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {consultant.name.charAt(0)}
                          </div>
                        </div>

                        {/* معلومات المستشار */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {consultant.name}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400">
                                {consultant.title}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-yellow-500 mb-1">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="font-bold">{consultant.rating}</span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                ({consultant.reviews} تقييم)
                              </p>
                            </div>
                          </div>

                          {/* التخصصات */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {consultant.specialty.map((spec, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full dark:bg-indigo-900/20 dark:text-indigo-400"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>

                          {/* السعر والأيام المتاحة */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-green-600 font-bold">
                              <DollarSign className="w-5 h-5" />
                              <span>${consultant.hourlyRate}/ساعة</span>
                            </div>
                            <StyledButton
                              variant="primary"
                              onClick={() => {
                                setSelectedConsultant(consultant);
                                setShowBookingModal(true);
                              }}
                            >
                              <Calendar className="w-4 h-4 ml-2" />
                              احجز جلسة
                            </StyledButton>
                          </div>

                          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                            متاح: {consultant.availability.join(', ')}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* الجلسات القادمة والسابقة */}
            <div className="space-y-6">
              {/* الجلسات القادمة */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    الجلسات القادمة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sessions
                    .filter((s) => s.status === 'scheduled')
                    .map((session) => (
                      <div
                        key={session.id}
                        className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {session.consultant}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {session.date} - {session.time}
                            </p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full dark:bg-green-900/20 dark:text-green-400">
                            مؤكد
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          {session.duration} دقيقة
                        </div>
                        <div className="mt-3 flex gap-2">
                          <StyledButton size="small" variant="secondary" className="flex-1">
                            <Video className="w-4 h-4 ml-1" />
                            انضم
                          </StyledButton>
                          <StyledButton size="small" variant="secondary">
                            <X className="w-4 h-4" />
                          </StyledButton>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>

              {/* الجلسات السابقة */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    الجلسات السابقة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sessions
                    .filter((s) => s.status === 'completed')
                    .map((session) => (
                      <div
                        key={session.id}
                        className="p-4 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
                      >
                        <div className="mb-3">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {session.consultant}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {session.date}
                          </p>
                        </div>
                        {session.notes && (
                          <div className="mb-3 p-3 bg-white rounded-lg dark:bg-gray-900">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              ملاحظات الجلسة:
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {session.notes}
                            </p>
                          </div>
                        )}
                        {session.files && session.files.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              الملفات:
                            </p>
                            {session.files.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 bg-white rounded mb-1 dark:bg-gray-900"
                              >
                                <div className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-gray-600" />
                                  <span className="text-sm text-gray-700 dark:text-gray-300">
                                    {file}
                                  </span>
                                </div>
                                <button className="text-indigo-600 hover:text-indigo-700">
                                  <Download className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </CardContent>
              </Card>

              {/* خدمات إضافية */}
              <Card className="border-2 border-indigo-200 dark:border-indigo-800">
                <CardHeader>
                  <CardTitle className="text-indigo-600">خدمات إضافية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>تسجيل الجلسات</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>ملخص كتابي بعد الجلسة</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>دعم عبر البريد لمدة أسبوع</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>

      {/* نافذة الحجز */}
      {showBookingModal && selectedConsultant && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                حجز جلسة مع {selectedConsultant.name}
              </h2>
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  setSelectedConsultant(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* اختيار التاريخ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  التاريخ
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              {/* اختيار الوقت */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الوقت
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">اختر الوقت</option>
                  <option value="09:00">09:00 صباحاً</option>
                  <option value="10:00">10:00 صباحاً</option>
                  <option value="11:00">11:00 صباحاً</option>
                  <option value="14:00">02:00 مساءً</option>
                  <option value="15:00">03:00 مساءً</option>
                  <option value="16:00">04:00 مساءً</option>
                </select>
              </div>

              {/* مدة الجلسة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  مدة الجلسة
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[30, 60, 90].map((duration) => (
                    <button
                      key={duration}
                      className="p-3 border border-gray-300 rounded-lg hover:bg-indigo-50 dark:border-gray-600 dark:hover:bg-indigo-900/20"
                    >
                      {duration} دقيقة
                    </button>
                  ))}
                </div>
              </div>

              {/* ملاحظات */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ملاحظات (اختياري)
                </label>
                <textarea
                  rows={3}
                  placeholder="أخبرنا عن الموضوع الذي تريد مناقشته..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              {/* الملفات */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  رفع ملفات (اختياري)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center dark:border-gray-600">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    اسحب الملفات أو انقر للتحميل
                  </p>
                </div>
              </div>

              {/* التكلفة */}
              <div className="p-4 bg-indigo-50 rounded-lg dark:bg-indigo-900/20">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">التكلفة الإجمالية:</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    ${selectedConsultant.hourlyRate}
                  </span>
                </div>
              </div>

              {/* أزرار الإجراءات */}
              <div className="flex gap-3 pt-4">
                <StyledButton
                  variant="primary"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600"
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime}
                >
                  تأكيد الحجز
                </StyledButton>
                <StyledButton
                  variant="secondary"
                  onClick={() => {
                    setShowBookingModal(false);
                    setSelectedConsultant(null);
                  }}
                >
                  إلغاء
                </StyledButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
