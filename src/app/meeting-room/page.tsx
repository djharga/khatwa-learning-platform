'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Video,
  Calendar,
  Clock,
  Users,
  Plus,
  Play,
  Settings,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  PhoneOff,
  MessageSquare,
  Monitor,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Bell,
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  instructor: string;
  course: string;
  type: 'live' | 'recorded' | 'upcoming';
  attendees: number;
  maxAttendees: number;
  status: 'scheduled' | 'live' | 'ended';
  zoomLink?: string;
  recordingUrl?: string;
}

interface Participant {
  id: string;
  name: string;
  role: 'instructor' | 'student';
  isOnline: boolean;
  joinedAt?: string;
}

export default function MeetingRoomPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'live' | 'recordings'>('upcoming');
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // بيانات تجريبية للاجتماعات
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'جلسة مراجعة المراجعة الداخلية - المستوى الأساسي',
      description: 'مراجعة شاملة لأساسيات المراجعة الداخلية مع حل أمثلة عملية',
      date: '2024-02-20',
      time: '10:00',
      duration: '90 دقيقة',
      instructor: 'د. سارة أحمد',
      course: 'المراجعة الداخلية - المستوى الأساسي',
      type: 'upcoming',
      attendees: 0,
      maxAttendees: 50,
      status: 'scheduled',
      zoomLink: 'https://zoom.us/j/123456789',
    },
    {
      id: '2',
      title: 'ورشة عمل: تحليل المخاطر المتقدم',
      description: 'تطبيق عملي لطرق تحليل وتقييم المخاطر في المؤسسات',
      date: '2024-02-18',
      time: '14:00',
      duration: '120 دقيقة',
      instructor: 'د. محمد علي',
      course: 'إدارة المخاطر المتقدمة',
      type: 'live',
      attendees: 23,
      maxAttendees: 30,
      status: 'live',
      zoomLink: 'https://zoom.us/j/987654321',
    },
    {
      id: '3',
      title: 'جلسة أسئلة وأجوبة مفتوحة',
      description: 'إجابة على أسئلة الطلاب حول المراجعة الداخلية',
      date: '2024-02-15',
      time: '16:00',
      duration: '60 دقيقة',
      instructor: 'د. فاطمة خالد',
      course: 'المراجعة الداخلية - المستوى المتوسط',
      type: 'recorded',
      attendees: 45,
      maxAttendees: 50,
      status: 'ended',
      recordingUrl: 'https://zoom.us/recording/123',
    },
  ]);

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      name: 'د. سارة أحمد',
      role: 'instructor',
      isOnline: true,
      joinedAt: '10:00',
    },
    {
      id: '2',
      name: 'أحمد محمد',
      role: 'student',
      isOnline: true,
      joinedAt: '10:05',
    },
    {
      id: '3',
      name: 'فاطمة علي',
      role: 'student',
      isOnline: false,
    },
  ]);

  // محاكاة الانضمام للاجتماع
  const joinMeeting = (meetingId: string) => {
    setSelectedMeeting(meetingId);
    setIsInMeeting(true);

    // محاكاة إشعار الجلسة عبر واتساب
    setTimeout(() => {
      alert('سيتم إرسال رابط الاجتماع عبر واتساب');
    }, 1000);
  };

  // محاكاة مغادرة الاجتماع
  const leaveMeeting = () => {
    setIsInMeeting(false);
    setSelectedMeeting(null);
  };

  // نسخ رابط الاجتماع
  const copyMeetingLink = (link: string) => {
    navigator.clipboard.writeText(link);
    alert('تم نسخ رابط الاجتماع');
  };

  // إرسال الرابط عبر واتساب
  const shareViaWhatsApp = (link: string, title: string) => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`انضم لجلستنا: ${title}\n${link}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isInMeeting) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full h-[80vh] overflow-hidden">
          {/* رأس الاجتماع */}
          <div className="bg-gray-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-white">
                <h2 className="text-lg font-semibold">
                  {meetings.find(m => m.id === selectedMeeting)?.title}
                </h2>
                <p className="text-sm text-gray-300">
                  {meetings.find(m => m.id === selectedMeeting)?.instructor}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-gray-300">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                مباشر
              </div>
              <button
                onClick={leaveMeeting}
                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* منطقة الفيديو الرئيسية */}
          <div className="flex-1 bg-black relative flex items-center justify-center">
            <div className="text-white text-center">
              <Video className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400">شاشة المحاضر الرئيسية</p>
              <p className="text-sm text-gray-500 mt-2">
                سيظهر هنا فيديو المحاضر أثناء الجلسة المباشرة
              </p>
            </div>

            {/* مشاركو الاجتماع */}
            <div className="absolute bottom-4 right-4 grid grid-cols-3 gap-2">
              {participants.filter(p => p.isOnline).map((participant) => (
                <div key={participant.id} className="w-20 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold">
                      {participant.name.charAt(0)}
                    </div>
                    <div className="text-xs truncate">{participant.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* عناصر التحكم في الاجتماع */}
          <div className="bg-gray-700 p-4">
            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-4 rounded-full ${isMicOn ? 'bg-blue-600' : 'bg-red-600'} text-white`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </motion.button>

              <motion.button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`p-4 rounded-full ${isCameraOn ? 'bg-blue-600' : 'bg-red-600'} text-white`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isCameraOn ? <Camera className="w-6 h-6" /> : <CameraOff className="w-6 h-6" />}
              </motion.button>

              <motion.button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-4 rounded-full ${isScreenSharing ? 'bg-green-600' : 'bg-gray-600'} text-white`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Monitor className="w-6 h-6" />
              </motion.button>

              <motion.button
                className="p-4 rounded-full bg-purple-600 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MessageSquare className="w-6 h-6" />
              </motion.button>

              <motion.button
                className="p-4 rounded-full bg-gray-600 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MoreHorizontal className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">غرفة الاجتماعات</h1>
          <p className="text-gray-600">انضم للجلسات المباشرة وحضر الورش التفاعلية</p>
        </motion.div>

        {/* التبويبات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'upcoming', label: 'الجلسات القادمة', icon: <Calendar className="w-4 h-4" /> },
                { id: 'live', label: 'الجلسات المباشرة', icon: <Video className="w-4 h-4" /> },
                { id: 'recordings', label: 'التسجيلات', icon: <Play className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab.id as 'upcoming' | 'live' | 'recordings');
                  }}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* محتوى التبويبات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {activeTab === 'upcoming' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">الجلسات القادمة</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  جدولة جلسة جديدة
                </button>
              </div>

              <div className="grid gap-6">
                {meetings.filter(meeting => meeting.type === 'upcoming').map((meeting) => (
                  <div key={meeting.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                            <Video className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{meeting.title}</h3>
                            <p className="text-sm text-gray-600">{meeting.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{meeting.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{meeting.time} ({meeting.duration})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{meeting.instructor}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{meeting.course}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => copyMeetingLink(meeting.zoomLink!)}
                            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            <Copy className="w-4 h-4" />
                            نسخ الرابط
                          </button>
                          <button
                            onClick={() => shareViaWhatsApp(meeting.zoomLink!, meeting.title)}
                            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            <ExternalLink className="w-4 h-4" />
                            مشاركة
                          </button>
                        </div>

                        <motion.button
                          onClick={() => joinMeeting(meeting.id)}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Video className="w-5 h-5" />
                          الانضمام للجلسة
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'live' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">الجلسات المباشرة الآن</h2>

              <div className="grid gap-6">
                {meetings.filter(meeting => meeting.type === 'live').map((meeting) => (
                  <div key={meeting.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                            <Video className="w-6 h-6" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{meeting.title}</h3>
                          <p className="text-sm text-gray-600">{meeting.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-red-600 font-medium flex items-center gap-1">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              مباشر الآن
                            </span>
                            <span className="text-sm text-gray-600">
                              {meeting.attendees} مشارك
                            </span>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        onClick={() => joinMeeting(meeting.id)}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Video className="w-5 h-5" />
                        الانضمام الآن
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'recordings' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">التسجيلات المتاحة</h2>

              <div className="grid gap-6">
                {meetings.filter(meeting => meeting.type === 'recorded').map((meeting) => (
                  <div key={meeting.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6" />
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{meeting.title}</h3>
                          <p className="text-sm text-gray-600">{meeting.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-gray-600">
                              {meeting.date} - {meeting.time}
                            </span>
                            <span className="text-sm text-gray-600">
                              {meeting.duration}
                            </span>
                            <span className="text-sm text-gray-600">
                              {meeting.attendees} مشاهدة
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          <Play className="w-4 h-4" />
                          مشاهدة
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          <ExternalLink className="w-4 h-4" />
                          مشاركة
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* إشعارات الجلسات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">إشعارات الجلسات</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">سيتم إرسال تذكير قبل الجلسة بساعة</p>
                  <p className="text-sm text-gray-600">عبر واتساب وإشعار المتصفح</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">رابط الاجتماع متاح قبل 15 دقيقة</p>
                  <p className="text-sm text-gray-600">لضمان عدم تفويت أي جلسة مهمة</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
