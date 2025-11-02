'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones,
  MessageSquare,
  FileText,
  HelpCircle,
  Search,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Video,
  Sparkles,
  Zap,
  LifeBuoy,
  BookOpen,
  Award,
  CreditCard,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Ticket {
  id: string;
  title: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  lastUpdate: string;
  messages: number;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // التذاكر
  const tickets: Ticket[] = [
    {
      id: '1',
      title: 'مشكلة في تحميل الفيديو',
      category: 'technical',
      status: 'in-progress',
      priority: 'high',
      createdAt: '2025-10-22',
      lastUpdate: '2025-10-23',
      messages: 3,
    },
    {
      id: '2',
      title: 'استفسار عن الشهادة',
      category: 'account',
      status: 'resolved',
      priority: 'medium',
      createdAt: '2025-10-20',
      lastUpdate: '2025-10-21',
      messages: 5,
    },
  ];

  // الأسئلة الشائعة
  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'كيف أحصل على الشهادة بعد إتمام الدورة؟',
      answer: 'بعد إكمال جميع دروس الدورة واجتياز الاختبار النهائي بنسبة 70% أو أكثر، سيتم إصدار الشهادة تلقائياً وإرسالها إلى بريدك الإلكتروني. يمكنك أيضاً تحميلها من قسم "شهاداتي" في لوحة التحكم.',
      category: 'certificates',
      helpful: 156,
    },
    {
      id: '2',
      question: 'ماذا أفعل إذا نسيت كلمة المرور؟',
      answer: 'انقر على "نسيت كلمة المرور" في صفحة تسجيل الدخول، أدخل بريدك الإلكتروني، وسنرسل لك رابط إعادة تعيين كلمة المرور. تأكد من التحقق من مجلد الرسائل غير المرغوب فيها إذا لم تستلم الرسالة.',
      category: 'account',
      helpful: 243,
    },
    {
      id: '3',
      question: 'كيف يمكنني تحميل المواد الدراسية؟',
      answer: 'انتقل إلى صفحة الدورة، ثم اضغط على "الملفات" أو "الموارد". ستجد جميع الملفات المتاحة للتحميل. تأكد من أن لديك مساحة تخزين كافية على جهازك.',
      category: 'courses',
      helpful: 198,
    },
    {
      id: '4',
      question: 'هل يمكنني الوصول للدورة بعد انتهاء الاشتراك؟',
      answer: 'نعم! بمجرد شرائك للدورة، يمكنك الوصول إليها مدى الحياة حتى بعد انتهاء اشتراكك. ومع ذلك، قد تحتاج إلى اشتراك نشط للوصول إلى بعض الميزات الإضافية مثل الدعم المباشر.',
      category: 'subscription',
      helpful: 321,
    },
  ];

  const categories = [
    { id: 'all', name: 'الكل', count: faqs.length, icon: Sparkles },
    { id: 'account', name: 'الحساب', count: faqs.filter(f => f.category === 'account').length, icon: FileText },
    { id: 'courses', name: 'الدورات', count: faqs.filter(f => f.category === 'courses').length, icon: BookOpen },
    { id: 'certificates', name: 'الشهادات', count: faqs.filter(f => f.category === 'certificates').length, icon: Award },
    { id: 'subscription', name: 'الاشتراكات', count: faqs.filter(f => f.category === 'subscription').length, icon: CreditCard },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-600 text-white';
      case 'in-progress':
        return 'bg-yellow-600 text-white';
      case 'resolved':
        return 'bg-green-600 text-white';
      case 'closed':
        return 'bg-gray-400 text-white';
      default:
        return '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 text-white p-8 lg:p-12"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="p-4 bg-white/20 backdrop-blur-md rounded-2xl"
                    >
                      <LifeBuoy className="w-12 h-12" />
                    </motion.div>
                    مركز الدعم والمساعدة
                  </h1>
                  <p className="text-lg md:text-xl text-cyan-100">
                    نحن هنا لمساعدتك في أي وقت
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="hidden md:flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-2xl p-4 border-2 border-white/30"
                >
                  <Zap className="w-8 h-8 text-yellow-300" />
                  <div>
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-cyan-100">دعم متاح</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="shadow-xl border-0 overflow-hidden cursor-pointer h-full relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600"></div>
                <CardContent className="p-8 relative z-10 text-white">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-4 bg-white/20 backdrop-blur-md rounded-2xl w-fit mb-4"
                  >
                    <MessageSquare className="w-10 h-10" />
                  </motion.div>
                  <h3 className="font-extrabold text-xl mb-2">محادثة مباشرة</h3>
                  <p className="text-blue-100 mb-6 text-sm">
                    دردش مع فريق الدعم الآن
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden w-full px-6 py-3 bg-white text-cyan-600 font-bold rounded-xl shadow-md hover:shadow-xl hover:bg-cyan-50 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      ابدأ المحادثة
                    </span>
                    <div className="absolute inset-0 bg-cyan-100/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
                  </motion.button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-xl border-0 overflow-hidden cursor-pointer h-full relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600"></div>
                <CardContent className="p-8 relative z-10 text-white">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="p-4 bg-white/20 backdrop-blur-md rounded-2xl w-fit mb-4"
                  >
                    <Mail className="w-10 h-10" />
                  </motion.div>
                  <h3 className="font-extrabold text-xl mb-2">البريد الإلكتروني</h3>
                  <p className="text-green-100 mb-6 text-sm">
                    support@khatwa.com
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden w-full px-6 py-3 bg-white text-green-600 font-bold rounded-xl shadow-md hover:shadow-xl hover:bg-green-50 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      إرسال بريد
                    </span>
                    <div className="absolute inset-0 bg-green-100/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
                  </motion.button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="shadow-xl border-0 overflow-hidden cursor-pointer h-full relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-600 to-fuchsia-600"></div>
                <CardContent className="p-8 relative z-10 text-white">
                  <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="p-4 bg-white/20 backdrop-blur-md rounded-2xl w-fit mb-4"
                  >
                    <Phone className="w-10 h-10" />
                  </motion.div>
                  <h3 className="font-extrabold text-xl mb-2">اتصل بنا</h3>
                  <p className="text-purple-100 mb-6 text-sm">
                    +966 xx xxx xxxx
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden w-full px-6 py-3 bg-white text-purple-600 font-bold rounded-xl shadow-md hover:shadow-xl hover:bg-purple-50 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      اتصل الآن
                    </span>
                    <div className="absolute inset-0 bg-purple-100/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
                  </motion.button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* FAQ Section */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl"
                    >
                      <HelpCircle className="w-8 h-8 text-white" />
                    </motion.div>
                    الأسئلة الشائعة
                  </h2>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                    <input
                      type="text"
                      placeholder="ابحث عن سؤال..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pr-12 pl-4 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-lg"
                    />
                  </motion.div>
                </div>

                {/* Categories */}
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <motion.button
                        key={cat.id}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-5 py-3 rounded-xl whitespace-nowrap transition-all flex items-center gap-2 font-bold ${
                          selectedCategory === cat.id
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xl'
                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-cyan-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {cat.name} ({cat.count})
                      </motion.button>
                    );
                  })}
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                  {filteredFaqs.map((faq, idx) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <Card className="shadow-lg border-2 hover:shadow-xl transition-all">
                        <CardContent className="p-0">
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                            className="w-full p-6 text-right hover:bg-gradient-to-l hover:from-cyan-50 hover:to-blue-50 transition-all"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="font-bold text-lg text-gray-900 mb-2">
                                  {faq.question}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="font-semibold">{faq.helpful} وجدوها مفيدة</span>
                                </div>
                              </div>
                              {expandedFaq === faq.id ? (
                                <motion.div
                                  animate={{ rotate: 180 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <ChevronUp className="w-6 h-6 text-cyan-600 flex-shrink-0" />
                                </motion.div>
                              ) : (
                                <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                              )}
                            </div>
                          </button>
                          <AnimatePresence>
                            {expandedFaq === faq.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-6">
                                  <div className="p-5 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-200">
                                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                  </div>
                                  <div className="mt-4 flex items-center gap-3">
                                    <p className="text-sm font-semibold text-gray-700">
                                      هل كانت هذه الإجابة مفيدة؟
                                    </p>
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                      نعم
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      لا
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Tickets Sidebar */}
            <div className="space-y-6">
              {/* Create New Ticket */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="shadow-xl border-0 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="p-2 bg-white/20 backdrop-blur-md rounded-xl"
                        >
                          <FileText className="w-6 h-6" />
                        </motion.div>
                        افتح تذكرة دعم
                      </CardTitle>
                      <CardDescription className="text-indigo-100">
                        لم تجد إجابة؟ دعنا نساعدك
                      </CardDescription>
                    </CardHeader>
                  </div>
                  <CardContent className="p-6">
                    <Button
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-bold h-12 text-lg"
                      onClick={() => setShowNewTicketModal(true)}
                    >
                      <Send className="w-5 h-5 ml-2" />
                      تذكرة جديدة
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Current Tickets */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="shadow-xl border-0 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="p-2 bg-white/20 backdrop-blur-md rounded-xl"
                        >
                          <MessageSquare className="w-6 h-6" />
                        </motion.div>
                        تذاكر الدعم
                      </CardTitle>
                    </CardHeader>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    {tickets.map((ticket, idx) => (
                      <motion.div
                        key={ticket.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + idx * 0.1 }}
                        whileHover={{ scale: 1.02, y: -3 }}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-bold text-gray-900 flex-1">
                            {ticket.title}
                          </h4>
                          <span className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap ${getStatusColor(ticket.status)}`}>
                            {ticket.status === 'open' && 'مفتوحة'}
                            {ticket.status === 'in-progress' && 'قيد المعالجة'}
                            {ticket.status === 'resolved' && 'تم الحل'}
                            {ticket.status === 'closed' && 'مغلقة'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-gray-600">
                            <Clock className="w-4 h-4" />
                            {ticket.lastUpdate}
                          </span>
                          <span className="flex items-center gap-1 text-gray-600">
                            <MessageSquare className="w-4 h-4" />
                            {ticket.messages}
                          </span>
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority === 'high' && '🔥 عالية'}
                            {ticket.priority === 'medium' && '⚡ متوسطة'}
                            {ticket.priority === 'low' && '✅ منخفضة'}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Working Hours */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="shadow-xl border-0 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="p-2 bg-white/20 backdrop-blur-md rounded-xl"
                        >
                          <Clock className="w-6 h-6" />
                        </motion.div>
                        ساعات العمل
                      </CardTitle>
                    </CardHeader>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between p-3 bg-green-50 rounded-xl">
                      <span className="text-gray-700 font-semibold">السبت - الخميس</span>
                      <span className="font-bold text-green-600">9:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-700 font-semibold">الجمعة</span>
                      <span className="font-bold text-gray-600">مغلق</span>
                    </div>
                    <div className="mt-4 p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-yellow-300" />
                        <span className="font-bold">متاح الآن</span>
                      </div>
                      <p className="text-sm text-green-100">
                        فريق الدعم جاهز لمساعدتك!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* New Ticket Modal */}
      <AnimatePresence>
        {showNewTicketModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900">
                  تذكرة دعم جديدة
                </h2>
                <button
                  onClick={() => setShowNewTicketModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    الموضوع
                  </label>
                  <input
                    type="text"
                    placeholder="اكتب موضوع المشكلة..."
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    التصنيف
                  </label>
                  <select className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-lg">
                    <option value="">اختر التصنيف</option>
                    <option value="technical">مشكلة تقنية</option>
                    <option value="account">حساب المستخدم</option>
                    <option value="course">الدورات</option>
                    <option value="payment">الدفع والفوترة</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    الأولوية
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'low', label: '✅ منخفضة', color: 'border-green-300 bg-green-50' },
                      { value: 'medium', label: '⚡ متوسطة', color: 'border-orange-300 bg-orange-50' },
                      { value: 'high', label: '🔥 عالية', color: 'border-red-300 bg-red-50' },
                    ].map((priority) => (
                      <button
                        key={priority.value}
                        className={`p-4 border-2 rounded-xl font-bold transition-all hover:scale-105 ${priority.color}`}
                      >
                        {priority.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    الوصف
                  </label>
                  <textarea
                    rows={5}
                    placeholder="اشرح المشكلة بالتفصيل..."
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-lg resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 h-12 text-lg font-bold">
                    <Send className="w-5 h-5 ml-2" />
                    إرسال التذكرة
                  </Button>
                  <Button variant="outline" onClick={() => setShowNewTicketModal(false)} className="h-12 text-lg">
                    إلغاء
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
