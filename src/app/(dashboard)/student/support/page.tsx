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
        return 'bg-primary-600 text-white';
      case 'in-progress':
        return 'bg-warning-600 text-white';
      case 'resolved':
        return 'bg-success-600 text-white';
      case 'closed':
        return 'bg-neutral-400 text-white';
      default:
        return '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-danger-600 bg-danger-50 dark:bg-danger-900/20 border-danger-200 dark:border-danger-800';
      case 'medium':
        return 'text-warning-600 bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800';
      case 'low':
        return 'text-success-600 bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="max-w-7xl mx-auto"
        >
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-6 sm:mb-8 relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white p-6 sm:p-8 lg:p-12 shadow-lg"
          >
            <div className="absolute top-0 end-0 w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 mb-4 sm:mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl">
                    <LifeBuoy className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" aria-hidden="true" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
                      مركز الدعم والمساعدة
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100">
                      نحن هنا لمساعدتك في أي وقت
                    </p>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
                  className="flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-white/30"
                >
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" aria-hidden="true" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold">24/7</div>
                    <div className="text-xs sm:text-sm text-blue-100">دعم متاح</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <motion.div
              whileHover={{ y: -2, scale: 1.01 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
            >
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden cursor-pointer h-full relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-600"></div>
                <CardContent className="p-6 sm:p-8 relative z-10 text-white">
                  <div className="p-3 sm:p-4 bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl w-fit mb-4">
                    <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2">محادثة مباشرة</h3>
                  <p className="text-blue-100 mb-4 sm:mb-6 text-xs sm:text-sm">
                    دردش مع فريق الدعم الآن
                  </p>
                  <button
                    className="w-full px-4 sm:px-6 py-2.5 sm:py-3 min-h-[44px] bg-white text-primary-600 font-bold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg hover:bg-primary-50 transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
                    aria-label="ابدأ المحادثة"
                    type="button"
                  >
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    <span className="text-sm sm:text-base">ابدأ المحادثة</span>
                  </button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.01 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
            >
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden cursor-pointer h-full relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-success-600 via-success-700 to-success-600"></div>
                <CardContent className="p-6 sm:p-8 relative z-10 text-white">
                  <div className="p-3 sm:p-4 bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl w-fit mb-4">
                    <Mail className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2">البريد الإلكتروني</h3>
                  <p className="text-green-100 mb-4 sm:mb-6 text-xs sm:text-sm">
                    support@khatwa.com
                  </p>
                  <button
                    className="w-full px-4 sm:px-6 py-2.5 sm:py-3 min-h-[44px] bg-white text-success-600 font-bold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg hover:bg-success-50 transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-success-600"
                    aria-label="إرسال بريد"
                    type="button"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    <span className="text-sm sm:text-base">إرسال بريد</span>
                  </button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.01 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.2, ease: 'easeOut' }}
            >
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden cursor-pointer h-full relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-innovate-600 via-secondary-innovate-700 to-secondary-innovate-600"></div>
                <CardContent className="p-6 sm:p-8 relative z-10 text-white">
                  <div className="p-3 sm:p-4 bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl w-fit mb-4">
                    <Phone className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2">اتصل بنا</h3>
                  <p className="text-purple-100 mb-4 sm:mb-6 text-xs sm:text-sm">
                    +966 xx xxx xxxx
                  </p>
                  <button
                    className="w-full px-4 sm:px-6 py-2.5 sm:py-3 min-h-[44px] bg-white text-secondary-innovate-600 font-bold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg hover:bg-secondary-innovate-50 transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-innovate-600"
                    aria-label="اتصل الآن"
                    type="button"
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    <span className="text-sm sm:text-base">اتصل الآن</span>
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* FAQ Section */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.2, ease: 'easeOut' }}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2 sm:gap-3">
                    <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg sm:rounded-xl">
                      <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" aria-hidden="true" />
                    </div>
                    الأسئلة الشائعة
                  </h2>
                </div>

                {/* Search */}
                <div className="mb-4 sm:mb-6">
                  <div className="relative">
                    <Search className="absolute start-3 sm:start-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5 sm:w-6 sm:h-6 pointer-events-none" aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="ابحث عن سؤال..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full ps-10 sm:ps-12 pe-4 py-3 sm:py-4 min-h-[44px] border-2 border-neutral-300 dark:border-neutral-600 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-900 dark:text-white text-base sm:text-lg placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all duration-200 ease-out"
                      aria-label="البحث في الأسئلة الشائعة"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 sm:px-5 py-2 sm:py-3 min-h-[44px] rounded-lg sm:rounded-xl whitespace-nowrap transition-all duration-200 ease-out flex items-center gap-2 font-medium text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                          selectedCategory === cat.id
                            ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                            : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-2 border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600'
                        }`}
                        aria-label={`تصفية حسب ${cat.name}`}
                        aria-pressed={selectedCategory === cat.id}
                        type="button"
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                        {cat.name} ({cat.count})
                      </button>
                    );
                  })}
                </div>

                {/* FAQ List */}
                <div className="space-y-3 sm:space-y-4">
                  {filteredFaqs.map((faq, idx) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.05, duration: 0.2, ease: 'easeOut' }}
                    >
                      <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200 ease-out">
                        <CardContent className="p-0">
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                            className="w-full p-4 sm:p-6 text-right hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                            aria-label={`${expandedFaq === faq.id ? 'إخفاء' : 'عرض'} الإجابة`}
                            aria-expanded={expandedFaq === faq.id}
                            type="button"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 text-start">
                                <h3 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-white mb-2">
                                  {faq.question}
                                </h3>
                                <div className="flex items-center gap-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                                  <span className="font-medium">{faq.helpful} وجدوها مفيدة</span>
                                </div>
                              </div>
                              {expandedFaq === faq.id ? (
                                <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400 flex-shrink-0" aria-hidden="true" />
                              ) : (
                                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-400 dark:text-neutral-500 flex-shrink-0" aria-hidden="true" />
                              )}
                            </div>
                          </button>
                          <AnimatePresence>
                            {expandedFaq === faq.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                                  <div className="p-4 sm:p-5 bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl border-2 border-primary-200 dark:border-primary-800">
                                    <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">{faq.answer}</p>
                                  </div>
                                  <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
                                    <p className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                      هل كانت هذه الإجابة مفيدة؟
                                    </p>
                                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 min-h-[36px] bg-success-600 hover:bg-success-700 text-white rounded-lg font-medium text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2" aria-label="نعم، كانت مفيدة" type="button">
                                      نعم
                                    </button>
                                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 min-h-[36px] bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="لا، لم تكن مفيدة" type="button">
                                      لا
                                    </button>
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
            <div className="space-y-4 sm:space-y-6">
              {/* Create New Ticket */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.2, ease: 'easeOut' }}
              >
                <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
                        <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg sm:rounded-xl">
                          <FileText className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                        </div>
                        افتح تذكرة دعم
                      </CardTitle>
                      <CardDescription className="text-blue-100 text-xs sm:text-sm">
                        لم تجد إجابة؟ دعنا نساعدك
                      </CardDescription>
                    </CardHeader>
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <button
                      onClick={() => setShowNewTicketModal(true)}
                      className="w-full px-4 py-2.5 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-bold text-sm sm:text-base shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                      aria-label="فتح تذكرة دعم جديدة"
                      type="button"
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                      تذكرة جديدة
                    </button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Current Tickets */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.2, ease: 'easeOut' }}
              >
                <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
                        <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg sm:rounded-xl">
                          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                        </div>
                        تذاكر الدعم
                      </CardTitle>
                    </CardHeader>
                  </div>
                  <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    {tickets.map((ticket, idx) => (
                      <motion.div
                        key={ticket.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + idx * 0.05, duration: 0.2, ease: 'easeOut' }}
                        whileHover={{ y: -2, scale: 1.01 }}
                        className="p-3 sm:p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg sm:rounded-xl hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all duration-200 ease-out cursor-pointer bg-white dark:bg-neutral-800"
                      >
                        <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                          <h4 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white flex-1">
                            {ticket.title}
                          </h4>
                          <span className={`px-2 sm:px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap flex-shrink-0 ${getStatusColor(ticket.status)}`}>
                            {ticket.status === 'open' && 'مفتوحة'}
                            {ticket.status === 'in-progress' && 'قيد المعالجة'}
                            {ticket.status === 'resolved' && 'تم الحل'}
                            {ticket.status === 'closed' && 'مغلقة'}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                          <span className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                            {ticket.lastUpdate}
                          </span>
                          <span className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
                            <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                            {ticket.messages}
                          </span>
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${getPriorityColor(ticket.priority)}`}>
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
                transition={{ delay: 0.8, duration: 0.2, ease: 'easeOut' }}
              >
                <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-success-600 via-success-700 to-success-600 text-white">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
                        <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg sm:rounded-xl">
                          <Clock className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                        </div>
                        ساعات العمل
                      </CardTitle>
                    </CardHeader>
                  </div>
                  <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="flex justify-between p-3 bg-success-50 dark:bg-success-900/20 rounded-lg sm:rounded-xl">
                      <span className="text-neutral-700 dark:text-neutral-300 font-medium text-sm sm:text-base">السبت - الخميس</span>
                      <span className="font-bold text-success-600 dark:text-success-400 text-sm sm:text-base">9:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg sm:rounded-xl">
                      <span className="text-neutral-700 dark:text-neutral-300 font-medium text-sm sm:text-base">الجمعة</span>
                      <span className="font-bold text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">مغلق</span>
                    </div>
                    <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-success-500 to-success-600 rounded-lg sm:rounded-xl text-white">
                      <div className="flex items-center gap-2 mb-1 sm:mb-2">
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" aria-hidden="true" />
                        <span className="font-bold text-sm sm:text-base">متاح الآن</span>
                      </div>
                      <p className="text-xs sm:text-sm text-green-100">
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
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewTicketModal(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl max-w-2xl w-full p-4 sm:p-6 lg:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                  تذكرة دعم جديدة
                </h2>
                <button
                  onClick={() => setShowNewTicketModal(false)}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg sm:rounded-xl transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  aria-label="إغلاق"
                  type="button"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600 dark:text-neutral-400" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label htmlFor="ticket-subject" className="block text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    الموضوع
                  </label>
                  <input
                    id="ticket-subject"
                    type="text"
                    placeholder="اكتب موضوع المشكلة..."
                    className="w-full px-4 py-2.5 sm:py-3 min-h-[44px] border-2 border-neutral-300 dark:border-neutral-600 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-900 dark:text-white text-sm sm:text-base placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all duration-200 ease-out"
                    aria-label="موضوع التذكرة"
                  />
                </div>

                <div>
                  <label htmlFor="ticket-category" className="block text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    التصنيف
                  </label>
                  <select
                    id="ticket-category"
                    className="w-full px-4 py-2.5 sm:py-3 min-h-[44px] border-2 border-neutral-300 dark:border-neutral-600 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-900 dark:text-white text-sm sm:text-base transition-all duration-200 ease-out"
                    aria-label="تصنيف التذكرة"
                  >
                    <option value="">اختر التصنيف</option>
                    <option value="technical">مشكلة تقنية</option>
                    <option value="account">حساب المستخدم</option>
                    <option value="course">الدورات</option>
                    <option value="payment">الدفع والفوترة</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 sm:mb-3">
                    الأولوية
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { value: 'low', label: '✅ منخفضة', color: 'border-success-300 bg-success-50 dark:bg-success-900/20 dark:border-success-800' },
                      { value: 'medium', label: '⚡ متوسطة', color: 'border-warning-300 bg-warning-50 dark:bg-warning-900/20 dark:border-warning-800' },
                      { value: 'high', label: '🔥 عالية', color: 'border-danger-300 bg-danger-50 dark:bg-danger-900/20 dark:border-danger-800' },
                    ].map((priority) => (
                      <button
                        key={priority.value}
                        className={`p-3 sm:p-4 min-h-[60px] border-2 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 ease-out hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${priority.color}`}
                        aria-label={`أولوية ${priority.label}`}
                        type="button"
                      >
                        {priority.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="ticket-description" className="block text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    الوصف
                  </label>
                  <textarea
                    id="ticket-description"
                    rows={5}
                    placeholder="اشرح المشكلة بالتفصيل..."
                    className="w-full px-4 py-2.5 sm:py-3 border-2 border-neutral-300 dark:border-neutral-600 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-900 dark:text-white text-sm sm:text-base resize-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all duration-200 ease-out"
                    aria-label="وصف المشكلة"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                  <button className="flex-1 px-4 py-2.5 sm:py-3 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-bold text-sm sm:text-base shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="إرسال التذكرة" type="button">
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    إرسال التذكرة
                  </button>
                  <button onClick={() => setShowNewTicketModal(false)} className="px-4 py-2.5 sm:py-3 min-h-[44px] bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="إلغاء" type="button">
                    إلغاء
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
