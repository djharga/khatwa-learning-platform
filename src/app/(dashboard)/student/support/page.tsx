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
    { id: 'all', name: 'الكل', count: faqs.length },
    { id: 'account', name: 'الحساب', count: faqs.filter(f => f.category === 'account').length },
    { id: 'courses', name: 'الدورات', count: faqs.filter(f => f.category === 'courses').length },
    { id: 'certificates', name: 'الشهادات', count: faqs.filter(f => f.category === 'certificates').length },
    { id: 'subscription', name: 'الاشتراكات', count: faqs.filter(f => f.category === 'subscription').length },
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
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-orange-600';
      case 'low':
        return 'text-green-600';
      default:
        return '';
    }
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
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
              <Headphones className="w-8 h-8 text-cyan-600" />
              مركز الدعم والمساعدة
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              نحن هنا لمساعدتك في أي وقت
            </p>
          </div>

          {/* خيارات الاتصال السريع */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">محادثة مباشرة</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    دردش مع فريق الدعم الآن
                  </p>
                  <Button className="w-full">ابدأ المحادثة</Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">البريد الإلكتروني</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    support@khatwa.com
                  </p>
                  <Button variant="outline" className="w-full">إرسال بريد</Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">اتصل بنا</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    +966 xx xxx xxxx
                  </p>
                  <Button variant="outline" className="w-full">اتصل الآن</Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* التذاكر والأسئلة الشائعة */}
            <div className="lg:col-span-2 space-y-8">
              {/* قسم الأسئلة الشائعة */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-cyan-600" />
                    الأسئلة الشائعة
                  </h2>
                </div>

                {/* البحث */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="ابحث عن سؤال..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                </div>

                {/* التصنيفات */}
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-cyan-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                      }`}
                    >
                      {cat.name} ({cat.count})
                    </button>
                  ))}
                </div>

                {/* قائمة الأسئلة */}
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <Card key={faq.id}>
                      <CardContent className="p-0">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                          className="w-full p-6 text-right hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                {faq.question}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <span>{faq.helpful} وجدوها مفيدة</span>
                              </div>
                            </div>
                            {expandedFaq === faq.id ? (
                              <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
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
                                <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                                  <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                                </div>
                                <div className="mt-4 flex items-center gap-3">
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    هل كانت هذه الإجابة مفيدة؟
                                  </p>
                                  <Button size="sm" variant="outline">
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
                  ))}
                </div>
              </div>
            </div>

            {/* التذاكر وإنشاء تذكرة جديدة */}
            <div className="space-y-6">
              {/* إنشاء تذكرة جديدة */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    افتح تذكرة دعم
                  </CardTitle>
                  <CardDescription>لم تجد إجابة؟ دعنا نساعدك</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    onClick={() => setShowNewTicketModal(true)}
                  >
                    <Send className="w-4 h-4 ml-2" />
                    تذكرة جديدة
                  </Button>
                </CardContent>
              </Card>

              {/* التذاكر الحالية */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-cyan-600" />
                    تذاكر الدعم
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer dark:border-gray-700"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {ticket.title}
                        </h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                          {ticket.status === 'open' && 'مفتوحة'}
                          {ticket.status === 'in-progress' && 'قيد المعالجة'}
                          {ticket.status === 'resolved' && 'تم الحل'}
                          {ticket.status === 'closed' && 'مغلقة'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {ticket.lastUpdate}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {ticket.messages}
                        </span>
                        <span className={`font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority === 'high' && 'عالية'}
                          {ticket.priority === 'medium' && 'متوسطة'}
                          {ticket.priority === 'low' && 'منخفضة'}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* ساعات العمل */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    ساعات العمل
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">السبت - الخميس</span>
                    <span className="font-medium">9:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">الجمعة</span>
                    <span className="font-medium">مغلق</span>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">متاح الآن</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>

      {/* نافذة إنشاء تذكرة جديدة */}
      <AnimatePresence>
        {showNewTicketModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  تذكرة دعم جديدة
                </h2>
                <button
                  onClick={() => setShowNewTicketModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الموضوع
                  </label>
                  <input
                    type="text"
                    placeholder="اكتب موضوع المشكلة..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    التصنيف
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600">
                    <option value="">اختر التصنيف</option>
                    <option value="technical">مشكلة تقنية</option>
                    <option value="account">حساب المستخدم</option>
                    <option value="course">الدورات</option>
                    <option value="payment">الدفع والفوترة</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الأولوية
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['low', 'medium', 'high'].map((priority) => (
                      <button
                        key={priority}
                        className="p-3 border border-gray-300 rounded-lg hover:bg-cyan-50 dark:border-gray-600 dark:hover:bg-cyan-900/20"
                      >
                        {priority === 'low' && 'منخفضة'}
                        {priority === 'medium' && 'متوسطة'}
                        {priority === 'high' && 'عالية'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الوصف
                  </label>
                  <textarea
                    rows={5}
                    placeholder="اشرح المشكلة بالتفصيل..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600">
                    <Send className="w-4 h-4 ml-2" />
                    إرسال التذكرة
                  </Button>
                  <Button variant="outline" onClick={() => setShowNewTicketModal(false)}>
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
