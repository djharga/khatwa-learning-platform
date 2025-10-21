'use client';

import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { faqs } from './faq-data';

/**
 * FAQ section component with collapsible question-answer items. Features animated expand/collapse, gradient backgrounds, and call-to-action for unanswered questions. Displays 40 comprehensive FAQs about platform features, pricing, and services.
 */
const FAQComponent = () => {
  // Tracks which FAQ item is currently expanded (null if all closed)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /**
   * Toggles the expanded/collapsed state of an FAQ item. Only one item can be open at a time.
   */
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  /**
   * Individual FAQ item with collapsible answer. Features animated chevron icon and smooth height transition.
   */
  const FAQItem = ({ faq, index, isOpen, onToggle }: { faq: { question: string; answer: string }; index: number; isOpen: boolean; onToggle: () => void }) => (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-slate-200/50 hover:border-slate-300/70 hover:scale-[1.01] transition-all duration-300"
      style={{ padding: '0' }}
    >
      <button
        onClick={onToggle}
        className="w-full text-right flex items-center justify-between transition-all duration-300"
        style={{ padding: '1.5rem 2rem', minHeight: '4rem' }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
          className="flex-shrink-0 mr-4"
        >
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-200 p-2 rounded-xl">
            <ChevronDown className="w-6 h-6 text-blue-600" />
          </div>
        </motion.div>
        <span className="text-xl font-semibold text-slate-800 group-hover:text-slate-900 transition-colors duration-200 flex-1 text-right leading-tight">
          {faq.question}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div style={{ padding: '0 2rem 1.5rem' }}>
          <div className="w-full bg-gradient-to-r from-blue-200 to-purple-200 h-0.5 mb-4 opacity-60"></div>
          <p className="text-slate-800 leading-relaxed text-base sm:text-lg">
            {faq.answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section
      className="relative py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 overflow-hidden"
      id="faq"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.05),transparent_50%)] pointer-events-none"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-purple-200/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative content-wide mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-element-xl"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            الأسئلة الشائعة
          </h2>
          <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed mb-12">
            ثقة كاملة مبنية على معايير أمنية واعتمادات مهنية وضمانات استرداد واضحة.
          </p>
        </motion.div>

        {/* Collapsible FAQ items with animated expand/collapse */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {/* Contact prompt for questions not covered in FAQ list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200"
        >
          <div className="text-lg text-gray-700 mb-4">
            <span className="font-semibold text-blue-600">إن لم تجد سؤالك</span> في قائمة الأسئلة الشائعة أعلاه،
          </div>
          <p className="text-gray-600 mb-6">
            لا تتردد في التواصل معنا مباشرة. فريق الدعم متاح لمساعدتك في أي استفسار أو مشكلة تواجهها
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary-modern relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl focus:ring-4 focus:ring-blue-300/50 group px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
            onClick={() => (window.location.href = '/contact')}
          >
            <span className="relative z-10 flex items-center gap-3">
              تواصل معنا الآن
              <HelpCircle className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQComponent;
