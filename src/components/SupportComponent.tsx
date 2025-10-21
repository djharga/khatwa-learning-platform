'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Search,
  MessageSquare,
  FileText,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from 'lucide-react';
import { useNotifications } from './NotificationProvider';
import { supportFaqs, supportArticles, supportTickets, SupportFAQ, SupportArticle, SupportTicket } from './support-data';

/** FAQ item with question, answer, and category classification */
type FAQ = SupportFAQ;

/** Help article with title, summary, and link */
type Article = SupportArticle;

/** Support ticket with title, status, and creation date */
type Ticket = SupportTicket;

/** Support center component with three tabs: FAQs, help articles, and support tickets. Features search functionality, collapsible FAQ items, and ticket creation form. Integrates with notification system for ticket submission feedback. */
const SupportComponent = () => {
  // Search term for filtering FAQs
  const [searchTerm, setSearchTerm] = useState('');
  // Current active tab (faq, articles, or tickets)
  const [activeTab, setActiveTab] = useState<'faq' | 'articles' | 'tickets'>(
    'faq'
  );
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    issue: '',
  });
  // Set of FAQ IDs that are currently expanded
  const [openFaqItems, setOpenFaqItems] = useState<Set<string>>(new Set());
  const { addNotification } = useNotifications();

  const filteredFaqs = supportFaqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /** Toggles the expanded/collapsed state of an FAQ item. Multiple items can be open simultaneously. */
  const toggleFaqItem = (faqId: string) => {
    setOpenFaqItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(faqId)) {
        newSet.delete(faqId);
      } else {
        newSet.add(faqId);
      }
      return newSet;
    });
  };

  /** Handles support ticket form submission. Shows success notification and resets form. */
  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();

    // Show success notification
    addNotification({
      type: 'success',
      title: 'تم إرسال التذكرة!',
      message: 'تم إرسال تذكرتك بنجاح. سنتواصل معك خلال 24 ساعة.',
      duration: 5000,
    });

    setTicketForm({ name: '', email: '', issue: '' });
    setShowTicketForm(false);
  };

  /** Collapsible FAQ item with category badge and animated expand/collapse. Features question header with icon and expandable answer section. */
  const FAQItem = ({ faq, index, isOpen, onToggle }: { faq: FAQ; index: number; isOpen: boolean; onToggle: () => void }) => (
    <motion.div
      key={faq.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* FAQ Header */}
      <button
        onClick={onToggle}
        className="w-full px-8 py-5 text-right bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-between"
      >
        <div className="flex items-center space-x-4 space-x-reverse">
          <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 transition-all duration-300" />
          <h3 className="font-bold text-primary text-lg lg:text-xl leading-tight">
            {faq.question}
          </h3>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse ml-4">
          <span className="text-sm text-gray-500 bg-gray-200 dark:bg-gray-600 px-3 py-1.5 rounded-full font-medium">
            {faq.category}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </motion.div>
        </div>
      </button>

      {/* FAQ Content */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        className="overflow-hidden"
      >
        <div className="px-8 pb-6 pt-3">
          <div className="border-t border-gray-200 dark:border-gray-600 pt-5">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed tracking-normal text-base">
              {faq.answer}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  /** Help article card with title, summary, and read more link. Features hover effects and entrance animation. */
  const ArticleCard = ({ article, index }: { article: Article; index: number }) => (
    <motion.div
      key={article.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
    >
      <h4 className="font-bold text-slate-800 mb-3">
        {article.title}
      </h4>
      <p className="text-slate-600 mb-4">{article.summary}</p>
      <a
        href={article.link}
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        اقرأ المزيد
      </a>
    </motion.div>
  );

  /** Support ticket card displaying ticket title, status badge, and creation date. Features status-based icon and color coding. */
  const TicketCard = ({ ticket, index }: { ticket: Ticket; index: number }) => (
    <motion.div
      key={ticket.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex justify-between items-center hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
    >
      <div>
        <h4 className="font-bold text-primary text-lg leading-tight">
          {ticket.title}
        </h4>
        <p className="text-sm text-gray-500 mt-2">
          تم الإنشاء: {ticket.createdAt}
        </p>
      </div>
      <div className="flex items-center space-x-2 space-x-reverse">
        {ticket.status === 'closed' && (
          <CheckCircle className="w-5 h-5 text-green-500" />
        )}
        {ticket.status === 'in_progress' && (
          <Clock className="w-5 h-5 text-yellow-500" />
        )}
        {ticket.status === 'open' && (
          <AlertCircle className="w-5 h-5 text-red-500" />
        )}
        <span
          className={`text-sm px-2 py-1 rounded ${
            ticket.status === 'closed'
              ? 'bg-green-100 text-green-800'
              : ticket.status === 'in_progress'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}
        >
          {ticket.status === 'closed'
            ? 'مغلق'
            : ticket.status === 'in_progress'
              ? 'قيد التنفيذ'
              : 'مفتوح'}
        </span>
      </div>
    </motion.div>
  );

  /** Modal form for creating new support tickets. Includes fields for name, email, and issue description. */
  const TicketFormModal = ({ isOpen, onClose, onSubmit, form, setForm }: { isOpen: boolean; onClose: () => void; onSubmit: (form: { name: string; email: string; issue: string }) => void; form: { name: string; email: string; issue: string }; setForm: React.Dispatch<React.SetStateAction<{ name: string; email: string; issue: string }>> }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-xl lg:text-2xl font-bold text-primary mb-6 leading-tight">
          فتح تذكرة دعم جديدة
        </h3>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              الاسم
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              وصف المشكلة
            </label>
            <textarea
              required
              rows={4}
              value={form.issue}
              onChange={(e) =>
                setForm({ ...form, issue: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="flex space-x-4 space-x-reverse">
            <button
              type="submit"
              className="flex-1 bg-primary text-white py-3 px-6 rounded-xl hover:bg-primary-dark transition-all duration-300 font-semibold hover:shadow-lg"
            >
              <Send className="w-4 h-4 inline mr-2" />
              إرسال
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition-all duration-300 font-semibold"
            >
              إلغاء
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight">
          مركز المساعدة والدعم الفني
        </h1>
        <p className="text-lg md:text-xl text-neutral max-w-3xl mx-auto leading-relaxed tracking-normal">
          ابحث عن الإجابات السريعة أو تواصل معنا للحصول على المساعدة.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 transition-all duration-300"
      >
        <div className="relative">
          <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400 transition-all duration-300" />
          <input
            type="text"
            placeholder="ابحث عن سؤال أو موضوع..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-lg"
            aria-label="ابحث عن سؤال أو موضوع"
          />
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 transition-all duration-300"
      >
        <div className="flex space-x-2 space-x-reverse mb-8">
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'faq'
                ? 'bg-primary text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            aria-label="عرض الأسئلة الشائعة"
            role="tab"
          >
            <MessageSquare className="w-4 h-4 inline mr-2" />
            الأسئلة الشائعة
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'articles'
                ? 'bg-primary text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            aria-label="عرض المقالات الإرشادية"
            role="tab"
          >
            <FileText className="w-4 h-4 inline mr-2" />
            المقالات الإرشادية
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'tickets'
                ? 'bg-primary text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            aria-label="عرض التذاكر"
            role="tab"
          >
            <CheckCircle className="w-4 h-4 inline mr-2" />
            تذاكري
          </button>
        </div>

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  index={index}
                  isOpen={openFaqItems.has(faq.id)}
                  onToggle={() => toggleFaqItem(faq.id)}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl"
              >
                <HelpCircle className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
                  لم نجد إجابات متطابقة
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  جرب كلمات بحث مختلفة أو تواصل مع الدعم الفني
                </p>
              </motion.div>
            )}

            {/* Search Stats */}
            {searchTerm && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-gray-500 mt-4"
              >
                تم العثور على {filteredFaqs.length} إجابة من أصل {supportFaqs.length}
              </motion.div>
            )}
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {supportArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        )}

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl lg:text-2xl font-bold text-primary leading-tight">
                تذاكري السابقة
              </h3>
              <button
                onClick={() => setShowTicketForm(true)}
                className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-all duration-300 font-semibold hover:shadow-lg"
              >
                فتح تذكرة جديدة
              </button>
            </div>
            {supportTickets.map((ticket, index) => (
              <TicketCard key={ticket.id} ticket={ticket} index={index} />
            ))}
          </div>
        )}
      </motion.div>

      {/* Ticket Form Modal */}
      {showTicketForm && (
        <TicketFormModal
          isOpen={showTicketForm}
          onClose={() => setShowTicketForm(false)}
          onSubmit={handleSubmitTicket}
          form={ticketForm}
          setForm={setTicketForm}
        />
      )}
    </div>
  );
};

export default SupportComponent;
