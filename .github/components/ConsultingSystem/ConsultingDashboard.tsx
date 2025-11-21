'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Video,
  MessageSquare,
  FileText,
  User,
  Star,
  DollarSign,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  Upload,
  Download,
  Phone,
  Mail,
  MapPin,
  Users,
  Award,
  TrendingUp,
  BookOpen,
  Zap,
  Lock,
  Crown,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import MetricCard from '@/components/ui/MetricCard';
// Dialog components are imported but may not be used yet - keeping for future use
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog';

export type ConsultationStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
export type ConsultationType = 'video' | 'audio' | 'chat' | 'in_person';
export type ConsultationCategory = 'financial' | 'audit' | 'compliance' | 'risk' | 'general';

export interface Consultant {
  id: string;
  name: string;
  title: string;
  specialty: string[];
  rating: number;
  reviews: number;
  hourlyRate: number;
  avatar?: string;
  bio: string;
  experience: string;
  certifications: string[];
  languages: string[];
  availability: {
    day: string;
    timeSlots: string[];
  }[];
  responseTime: string;
  successRate: number;
}

export interface ConsultationSession {
  id: string;
  consultantId: string;
  consultant: Consultant;
  title: string;
  description: string;
  category: ConsultationCategory;
  type: ConsultationType;
  status: ConsultationStatus;
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // بالدقائق
  price: number;
  meetingLink?: string;
  notes?: string;
  files: ConsultationFile[];
  messages: ConsultationMessage[];
  rating?: number;
  review?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConsultationFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: 'user' | 'consultant';
  uploadedAt: string;
}

export interface ConsultationMessage {
  id: string;
  sender: 'user' | 'consultant';
  senderName: string;
  content: string;
  timestamp: string;
  attachments?: string[];
  read: boolean;
}

interface ConsultingDashboardProps {
  userId?: string;
  hasSubscription?: boolean;
}

/**
 * نظام استشارات شامل ومتكامل
 */
export default function ConsultingDashboard({
  userId,
  hasSubscription = false,
}: ConsultingDashboardProps) {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [sessions, setSessions] = useState<ConsultationSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ConsultationSession | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showConsultantModal, setShowConsultantModal] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ConsultationCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus | 'all'>('all');
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'consultants' | 'sessions' | 'history'>('consultants');

  // بيانات الحجز
  const [bookingData, setBookingData] = useState({
    consultantId: '',
    title: '',
    description: '',
    category: 'general' as ConsultationCategory,
    type: 'video' as ConsultationType,
    date: '',
    time: '',
    duration: 60,
  });

  // تحميل البيانات
  useEffect(() => {
    // بيانات المستشارين
    const mockConsultants: Consultant[] = [
      {
        id: '1',
        name: 'د. أحمد محمود',
        title: 'خبير مراجعة داخلية معتمد',
        specialty: ['المراجعة الداخلية', 'إدارة المخاطر', 'الامتثال'],
        rating: 4.9,
        reviews: 156,
        hourlyRate: 150,
        bio: 'خبير في المراجعة الداخلية مع أكثر من 15 عاماً من الخبرة في الشركات الكبرى',
        experience: '15+ سنة',
        certifications: ['CIA', 'CISA', 'CRMA'],
        languages: ['العربية', 'الإنجليزية'],
        availability: [
          { day: 'السبت', timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
          { day: 'الأحد', timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
          { day: 'الاثنين', timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
        ],
        responseTime: 'أقل من ساعتين',
        successRate: 98,
      },
      {
        id: '2',
        name: 'د. فاطمة علي',
        title: 'خبيرة محاسبة مالية',
        specialty: ['المحاسبة المالية', 'التحليل المالي', 'IFRS'],
        rating: 4.8,
        reviews: 132,
        hourlyRate: 140,
        bio: 'خبيرة في المحاسبة المالية والمعايير الدولية مع خبرة واسعة في القطاع المصرفي',
        experience: '12+ سنة',
        certifications: ['CPA', 'CMA', 'IFRS'],
        languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
        availability: [
          { day: 'الثلاثاء', timeSlots: ['10:00', '11:00', '14:00', '15:00', '16:00'] },
          { day: 'الأربعاء', timeSlots: ['10:00', '11:00', '14:00', '15:00', '16:00'] },
          { day: 'الخميس', timeSlots: ['10:00', '11:00', '14:00', '15:00', '16:00'] },
        ],
        responseTime: 'أقل من 3 ساعات',
        successRate: 96,
      },
      {
        id: '3',
        name: 'د. محمد حسن',
        title: 'خبير حوكمة وامتثال',
        specialty: ['الحوكمة', 'الامتثال التنظيمي', 'SOX'],
        rating: 4.7,
        reviews: 98,
        hourlyRate: 130,
        bio: 'خبير في الحوكمة والامتثال مع خبرة في تطبيق معايير SOX والامتثال التنظيمي',
        experience: '10+ سنة',
        certifications: ['CIA', 'CGEIT'],
        languages: ['العربية', 'الإنجليزية'],
        availability: [
          { day: 'السبت', timeSlots: ['09:00', '10:00', '14:00', '15:00'] },
          { day: 'الثلاثاء', timeSlots: ['09:00', '10:00', '14:00', '15:00'] },
          { day: 'الخميس', timeSlots: ['09:00', '10:00', '14:00', '15:00'] },
        ],
        responseTime: 'أقل من 4 ساعات',
        successRate: 94,
      },
    ];

    setConsultants(mockConsultants);

    // بيانات الجلسات
    const mockSessions: ConsultationSession[] = [
      {
        id: '1',
        consultantId: '1',
        consultant: mockConsultants[0],
        title: 'استشارة في المراجعة الداخلية',
        description: 'أحتاج استشارة حول تطبيق معايير المراجعة الداخلية في شركتي',
        category: 'audit',
        type: 'video',
        status: 'scheduled',
        scheduledDate: '2025-01-20',
        scheduledTime: '10:00',
        duration: 60,
        price: 150,
        meetingLink: 'https://zoom.us/j/123456789',
        files: [],
        messages: [
          {
            id: 'm1',
            sender: 'user',
            senderName: 'المستخدم',
            content: 'مرحباً، أريد مناقشة تطبيق معايير المراجعة الداخلية',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            read: true,
          },
          {
            id: 'm2',
            sender: 'consultant',
            senderName: 'د. أحمد محمود',
            content: 'أهلاً بك، سأكون جاهزاً لمناقشة الموضوع في الجلسة المقررة',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            read: true,
          },
        ],
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        consultantId: '2',
        consultant: mockConsultants[1],
        title: 'تحليل القوائم المالية',
        description: 'أحتاج مساعدة في تحليل القوائم المالية لشركتي',
        category: 'financial',
        type: 'video',
        status: 'completed',
        scheduledDate: '2025-01-15',
        scheduledTime: '14:00',
        duration: 90,
        price: 210,
        notes: 'تمت مناقشة تحليل النسب المالية وتطبيقها العملي',
        files: [
          {
            id: 'f1',
            name: 'تقرير_التحليل_المالي.pdf',
            type: 'application/pdf',
            size: 2048000,
            url: '/files/report.pdf',
            uploadedBy: 'consultant',
            uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
        messages: [],
        rating: 5,
        review: 'جلسة ممتازة ومفيدة جداً',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    setSessions(mockSessions);
  }, []);

  // فلترة المستشارين
  const filteredConsultants = consultants.filter((consultant) => {
    const matchesSearch =
      consultant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultant.specialty.some((spec) =>
        spec.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesSearch;
  });

  // فلترة الجلسات
  const filteredSessions = sessions.filter((session) => {
    const matchesCategory = categoryFilter === 'all' || session.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  // حجز جلسة جديدة
  const handleBookSession = () => {
    if (!bookingData.consultantId || !bookingData.date || !bookingData.time) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const consultant = consultants.find((c) => c.id === bookingData.consultantId);
    if (!consultant) return;

    const session: ConsultationSession = {
      id: `session-${Date.now()}`,
      consultantId: bookingData.consultantId,
      consultant: consultant,
      title: bookingData.title || 'جلسة استشارية',
      description: bookingData.description,
      category: bookingData.category,
      type: bookingData.type,
      status: 'scheduled',
      scheduledDate: bookingData.date,
      scheduledTime: bookingData.time,
      duration: bookingData.duration,
      price: (consultant.hourlyRate * bookingData.duration) / 60,
      files: [],
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'user',
          senderName: 'المستخدم',
          content: bookingData.description || 'تم حجز الجلسة',
          timestamp: new Date().toISOString(),
          read: false,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSessions([session, ...sessions]);
    setShowBookingModal(false);
    setSelectedSession(session);
    setActiveTab('sessions');
    setBookingData({
      consultantId: '',
      title: '',
      description: '',
      category: 'general',
      type: 'video',
      date: '',
      time: '',
      duration: 60,
    });
  };

  // إرسال رسالة
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedSession) return;

    const message: ConsultationMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: 'المستخدم',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setSessions((prev) =>
      prev.map((session) =>
        session.id === selectedSession.id
          ? {
              ...session,
              messages: [...session.messages, message],
              updatedAt: new Date().toISOString(),
            }
          : session
      )
    );

    setSelectedSession((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, message],
            updatedAt: new Date().toISOString(),
          }
        : null
    );

    setNewMessage('');
  };

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // الحصول على لون الحالة
  const getStatusColor = (status: ConsultationStatus) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    }
  };

  // إحصائيات
  const stats = {
    total: sessions.length,
    scheduled: sessions.filter((s) => s.status === 'scheduled').length,
    completed: sessions.filter((s) => s.status === 'completed').length,
    totalSpent: sessions.reduce((sum, s) => sum + s.price, 0),
  };

  // إذا لم يكن مشتركاً، عرض رسالة
  if (!hasSubscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              الاستشارات متاحة للمشتركين فقط
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              احصل على استشارات متخصصة من خبرائنا المعتمدين. اشترك الآن للوصول إلى نظام الاستشارات الكامل.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="default"
                size="lg"
                onClick={() => window.location.href = '/packages-and-consulting'}
                className="h-[48px] px-6"
              >
                <Crown className="w-5 h-5 ml-2" />
                عرض الباقات
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => window.location.href = '/register'}
                className="h-[48px] px-6"
              >
                <User className="w-5 h-5 ml-2" />
                إنشاء حساب
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header - Academic Design from agent.md */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6" dir="rtl">
        <div>
          <h1 className="text-[36px] font-bold text-[#111827] dark:text-white mb-2 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-[#5B36E8]" />
            نظام الاستشارات
          </h1>
          <p className="text-base text-[#6B7280] dark:text-neutral-400">
            احجز جلسات استشارية مع خبرائنا المعتمدين
          </p>
        </div>
        <Button
          variant="default"
          size="lg"
          onClick={() => {
            setShowBookingModal(true);
            setActiveTab('consultants');
          }}
          className="h-[48px] px-6"
        >
          <Plus className="w-5 h-5 ml-2" />
          حجز جلسة جديدة
        </Button>
      </div>

      {/* إحصائيات - Academic Design: MetricCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          icon={<Calendar className="w-12 h-12" />}
          label="إجمالي الجلسات"
          value={stats.total.toString()}
          secondary="جميع الجلسات"
          iconColor="text-[#5B36E8]"
          iconBgColor="bg-[#EDE9FE]"
        />
        <MetricCard
          icon={<Clock className="w-12 h-12" />}
          label="مجدولة"
          value={stats.scheduled.toString()}
          secondary="في الانتظار"
          iconColor="text-[#F59E0B]"
          iconBgColor="bg-[#FEF3C7]"
        />
        <MetricCard
          icon={<CheckCircle className="w-12 h-12" />}
          label="مكتملة"
          value={stats.completed.toString()}
          secondary="تمت بنجاح"
          iconColor="text-[#10B981]"
          iconBgColor="bg-[#D1FAE5]"
        />
        <MetricCard
          icon={<DollarSign className="w-12 h-12" />}
          label="إجمالي الإنفاق"
          value={`$${stats.totalSpent.toFixed(0)}`}
          secondary="الاستثمار في الاستشارات"
          iconColor="text-[#EF4444]"
          iconBgColor="bg-[#FEE2E2]"
        />
      </div>

      {/* Tabs - Academic Design: Sticky below header, Background #FFFFFF, Border-bottom 2px #E5E7EB */}
      <div className="sticky top-0 z-10 bg-white dark:bg-neutral-800 border-b-2 border-[#E5E7EB] dark:border-neutral-700 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-6" dir="rtl">
        <div className="flex gap-4">
          {[
            { id: 'consultants', label: 'المستشارون', icon: Users },
            { id: 'sessions', label: 'جلساتي', icon: Calendar },
            { id: 'history', label: 'السجل', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 font-semibold border-b-2 transition-colors flex items-center gap-2 min-h-[48px] ${
                  isActive
                    ? 'border-[#5B36E8] text-[#5B36E8]'
                    : 'border-transparent text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'consultants' && (
          <motion.div
            key="consultants"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* البحث - Academic Design: Input component */}
            <Card className="shadow-elevation-2 border border-neutral-200 dark:border-neutral-700">
              <CardContent className="p-4">
                <div className="relative" dir="rtl">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-5 h-5 pointer-events-none" />
                  <Input
                    type="text"
                    placeholder="ابحث عن مستشار..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 pl-4 h-[48px] text-base"
                  />
                </div>
              </CardContent>
            </Card>

            {/* قائمة المستشارين */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConsultants.map((consultant) => (
                <motion.div
                  key={consultant.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                          {consultant.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {consultant.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {consultant.title}
                          </p>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="font-bold text-sm">{consultant.rating}</span>
                            <span className="text-xs text-gray-500">
                              ({consultant.reviews})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* التخصصات */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {consultant.specialty.slice(0, 3).map((spec, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full dark:bg-indigo-900/20 dark:text-indigo-400"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      {/* المعلومات */}
                      <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          <span>{consultant.experience} خبرة</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>رد: {consultant.responseTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          <span>معدل النجاح: {consultant.successRate}%</span>
                        </div>
                      </div>

                      {/* السعر */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-green-600 font-bold">
                          <DollarSign className="w-5 h-5" />
                          <span>${consultant.hourlyRate}/ساعة</span>
                        </div>
                      </div>

                      {/* الأزرار */}
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="default"
                          onClick={() => {
                            setSelectedConsultant(consultant);
                            setShowConsultantModal(true);
                          }}
                          className="flex-1 h-[44px]"
                        >
                          <User className="w-4 h-4 ml-1" />
                          الملف الشخصي
                        </Button>
                        <Button
                          variant="default"
                          size="default"
                          onClick={() => {
                            setBookingData({
                              ...bookingData,
                              consultantId: consultant.id,
                            });
                            setShowBookingModal(true);
                          }}
                          className="flex-1 h-[44px]"
                        >
                          <Calendar className="w-4 h-4 ml-1" />
                          احجز
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'sessions' && (
          <motion.div
            key="sessions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* قائمة الجلسات */}
            <div className="lg:col-span-1 space-y-4">
              {/* الفلترة - Academic Design */}
              <Card className="shadow-elevation-2 border border-neutral-200 dark:border-neutral-700">
                <CardContent className="p-6 space-y-4" dir="rtl">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-[#111827] dark:text-white">الفئة</label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value as ConsultationCategory | 'all')}
                      className="w-full h-[48px] px-4 py-2 border border-[#E5E7EB] rounded-[10px] bg-white text-[#111827] text-base focus:outline-none focus:ring-[3px] focus:ring-[rgba(91,54,232,0.1)] focus:border-[#5B36E8] transition-all duration-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                      dir="rtl"
                    >
                      <option value="all">الكل</option>
                      <option value="financial">مالي</option>
                      <option value="audit">مراجعة</option>
                      <option value="compliance">امتثال</option>
                      <option value="risk">مخاطر</option>
                      <option value="general">عام</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-[#111827] dark:text-white">الحالة</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as ConsultationStatus | 'all')}
                      className="w-full h-[48px] px-4 py-2 border border-[#E5E7EB] rounded-[10px] bg-white text-[#111827] text-base focus:outline-none focus:ring-[3px] focus:ring-[rgba(91,54,232,0.1)] focus:border-[#5B36E8] transition-all duration-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                      dir="rtl"
                    >
                      <option value="all">الكل</option>
                      <option value="scheduled">مجدولة</option>
                      <option value="in_progress">قيد التنفيذ</option>
                      <option value="completed">مكتملة</option>
                      <option value="cancelled">ملغاة</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* قائمة الجلسات */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredSessions.map((session) => (
                  <motion.div
                    key={session.id}
                    onClick={() => setSelectedSession(session)}
                    className={`
                      p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${
                        selectedSession?.id === session.id
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                          : 'border-gray-200 hover:border-gray-300 bg-white dark:bg-gray-800'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {session.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(session.status)}`}>
                        {session.status === 'scheduled' ? 'مجدولة' :
                         session.status === 'in_progress' ? 'قيد التنفيذ' :
                         session.status === 'completed' ? 'مكتملة' : 'ملغاة'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {session.consultant.name}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatDate(session.scheduledDate)}</span>
                      <span>{session.scheduledTime}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* تفاصيل الجلسة */}
            <div className="lg:col-span-2">
              {selectedSession ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="mb-2">{selectedSession.title}</CardTitle>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedSession.status)}`}>
                            {selectedSession.status === 'scheduled' ? 'مجدولة' :
                             selectedSession.status === 'in_progress' ? 'قيد التنفيذ' :
                             selectedSession.status === 'completed' ? 'مكتملة' : 'ملغاة'}
                          </span>
                          <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                            {selectedSession.category === 'financial' ? 'مالي' :
                             selectedSession.category === 'audit' ? 'مراجعة' :
                             selectedSession.category === 'compliance' ? 'امتثال' :
                             selectedSession.category === 'risk' ? 'مخاطر' : 'عام'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* معلومات الجلسة */}
                      <div>
                        <h4 className="font-semibold mb-3">معلومات الجلسة</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">المستشار:</span>
                            <p className="font-medium">{selectedSession.consultant.name}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">التاريخ:</span>
                            <p className="font-medium">{formatDate(selectedSession.scheduledDate)}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">الوقت:</span>
                            <p className="font-medium">{selectedSession.scheduledTime}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">المدة:</span>
                            <p className="font-medium">{selectedSession.duration} دقيقة</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">السعر:</span>
                            <p className="font-medium text-green-600">${selectedSession.price}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">النوع:</span>
                            <p className="font-medium">
                              {selectedSession.type === 'video' ? 'فيديو' :
                               selectedSession.type === 'audio' ? 'صوتي' :
                               selectedSession.type === 'chat' ? 'محادثة' : 'حضوري'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* رابط الاجتماع */}
                      {selectedSession.meetingLink && selectedSession.status === 'scheduled' && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                                رابط الاجتماع
                              </p>
                              <a
                                href={selectedSession.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                {selectedSession.meetingLink}
                              </a>
                            </div>
                            <Button
                              variant="default"
                              size="default"
                              onClick={() => window.open(selectedSession.meetingLink, '_blank')}
                              className="h-[44px] px-4"
                            >
                              <Video className="w-4 h-4 ml-1" />
                              انضم
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* الوصف */}
                      <div>
                        <h4 className="font-semibold mb-2">الوصف</h4>
                        <p className="text-gray-700 dark:text-gray-300">{selectedSession.description}</p>
                      </div>

                      {/* المحادثة */}
                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                          <MessageSquare className="w-5 h-5" />
                          المحادثة
                        </h4>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4">
                          {selectedSession.messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex gap-3 ${
                                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                              }`}
                            >
                              <div
                                className={`flex-1 rounded-lg p-3 ${
                                  message.sender === 'user'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-semibold text-sm">{message.senderName}</span>
                                  <span className="text-xs opacity-75">
                                    {new Date(message.timestamp).toLocaleTimeString('ar-EG', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </span>
                                </div>
                                <p className="text-sm">{message.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                            placeholder="اكتب رسالتك..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                          />
                          <Button
                            variant="default"
                            size="default"
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                            className="h-[44px] px-4"
                          >
                            <Send className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>

                      {/* الملفات */}
                      {selectedSession.files.length > 0 && (
                        <div className="border-t pt-4">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            الملفات
                          </h4>
                          <div className="space-y-2">
                            {selectedSession.files.map((file) => (
                              <div
                                key={file.id}
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <FileText className="w-5 h-5 text-gray-600" />
                                  <div>
                                    <p className="font-medium text-sm">{file.name}</p>
                                    <p className="text-xs text-gray-500">
                                      {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </div>
                                </div>
                                <Button variant="secondary" size="default" className="h-[44px] px-4">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* التقييم */}
                      {selectedSession.status === 'completed' && selectedSession.rating && (
                        <div className="border-t pt-4">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            التقييم
                          </h4>
                          <div className="flex items-center gap-2 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < selectedSession.rating!
                                    ? 'text-yellow-500 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          {selectedSession.review && (
                            <p className="text-gray-700 dark:text-gray-300">{selectedSession.review}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      اختر جلسة لعرض التفاصيل
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      اختر جلسة من القائمة أو احجز جلسة جديدة
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {sessions
              .filter((s) => s.status === 'completed')
              .map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{session.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{session.consultant.name}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{formatDate(session.scheduledDate)}</span>
                          <span>${session.price}</span>
                          {session.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span>{session.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="default"
                        onClick={() => {
                          setSelectedSession(session);
                          setActiveTab('sessions');
                        }}
                        className="h-[44px] px-4"
                      >
                        عرض التفاصيل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* نافذة حجز الجلسة */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold mb-6">حجز جلسة استشارية</h3>
              <div className="space-y-4">
                {/* اختيار المستشار */}
                {!bookingData.consultantId && (
                  <div>
                    <label className="block text-sm font-medium mb-2">اختر المستشار</label>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {consultants.map((consultant) => (
                        <div
                          key={consultant.id}
                          onClick={() => setBookingData({ ...bookingData, consultantId: consultant.id })}
                          className="p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">{consultant.name}</p>
                              <p className="text-sm text-gray-600">{consultant.title}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600">${consultant.hourlyRate}/ساعة</p>
                              <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-sm">{consultant.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {bookingData.consultantId && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">العنوان</label>
                      <input
                        type="text"
                        value={bookingData.title}
                        onChange={(e) => setBookingData({ ...bookingData, title: e.target.value })}
                        placeholder="عنوان الجلسة"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">الوصف</label>
                      <textarea
                        value={bookingData.description}
                        onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}
                        placeholder="وصف الموضوع الذي تريد مناقشته..."
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">الفئة</label>
                        <select
                          value={bookingData.category}
                          onChange={(e) => setBookingData({ ...bookingData, category: e.target.value as ConsultationCategory })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                        >
                          <option value="general">عام</option>
                          <option value="financial">مالي</option>
                          <option value="audit">مراجعة</option>
                          <option value="compliance">امتثال</option>
                          <option value="risk">مخاطر</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">نوع الجلسة</label>
                        <select
                          value={bookingData.type}
                          onChange={(e) => setBookingData({ ...bookingData, type: e.target.value as ConsultationType })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                        >
                          <option value="video">فيديو</option>
                          <option value="audio">صوتي</option>
                          <option value="chat">محادثة</option>
                          <option value="in_person">حضوري</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">التاريخ</label>
                        <input
                          type="date"
                          value={bookingData.date}
                          onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">الوقت</label>
                        <input
                          type="time"
                          value={bookingData.time}
                          onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">المدة (بالدقائق)</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[30, 60, 90, 120].map((duration) => (
                          <button
                            key={duration}
                            onClick={() => setBookingData({ ...bookingData, duration })}
                            className={`p-3 border rounded-lg ${
                              bookingData.duration === duration
                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                : 'border-gray-300'
                            }`}
                          >
                            {duration} دقيقة
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">التكلفة الإجمالية:</span>
                        <span className="text-2xl font-bold text-indigo-600">
                          $
                          {(
                            (consultants.find((c) => c.id === bookingData.consultantId)?.hourlyRate || 0) *
                            bookingData.duration
                          ) / 60}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleBookSession}
                    disabled={!bookingData.consultantId || !bookingData.date || !bookingData.time}
                    className="flex-1 h-[48px]"
                  >
                    تأكيد الحجز
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => {
                      setShowBookingModal(false);
                      setBookingData({
                        consultantId: '',
                        title: '',
                        description: '',
                        category: 'general',
                        type: 'video',
                        date: '',
                        time: '',
                        duration: 60,
                      });
                    }}
                    className="h-[48px] px-6"
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* نافذة ملف المستشار */}
      <AnimatePresence>
        {showConsultantModal && selectedConsultant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowConsultantModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {selectedConsultant.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{selectedConsultant.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedConsultant.title}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="font-bold">{selectedConsultant.rating}</span>
                      <span className="text-sm text-gray-500">({selectedConsultant.reviews} تقييم)</span>
                    </div>
                    <div className="text-green-600 font-bold">
                      ${selectedConsultant.hourlyRate}/ساعة
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">نبذة</h4>
                  <p className="text-gray-700 dark:text-gray-300">{selectedConsultant.bio}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">التخصصات</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedConsultant.specialty.map((spec, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm dark:bg-indigo-900/20 dark:text-indigo-400"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">الشهادات</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedConsultant.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm dark:bg-green-900/20 dark:text-green-400"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">الأوقات المتاحة</h4>
                  <div className="space-y-2">
                    {selectedConsultant.availability.map((avail, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <span className="font-medium w-20">{avail.day}</span>
                        <div className="flex flex-wrap gap-2">
                          {avail.timeSlots.map((time, timeIndex) => (
                            <span
                              key={timeIndex}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm dark:bg-blue-900/20 dark:text-blue-400"
                            >
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => {
                      setBookingData({
                        ...bookingData,
                        consultantId: selectedConsultant.id,
                      });
                      setShowConsultantModal(false);
                      setShowBookingModal(true);
                    }}
                    className="flex-1 h-[48px]"
                  >
                    <Calendar className="w-5 h-5 ml-2" />
                    احجز جلسة
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setShowConsultantModal(false)}
                    className="h-[48px] px-6"
                  >
                    إغلاق
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

