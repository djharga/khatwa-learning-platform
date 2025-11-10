'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { faqs } from './faq-data';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const FAQComponent = () => {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) => setOpenIndex(openIndex === index ? null : index);

  const FAQItem = ({
    faq,
    index,
    isOpen,
    onToggle,
  }: {
    faq: { question: string; answer: string };
    index: number;
    isOpen: boolean;
    onToggle: () => void;
  }) => (
    <motion.div
      key={index}
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      whileInView={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: index * 0.06 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-start px-6 py-5"
        aria-expanded={isOpen}
        aria-label={faq.question}
      >
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-relaxed">
          {faq.question}
        </span>
        <motion.div
          animate={prefersReducedMotion ? {} : { rotate: isOpen ? 180 : 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25 }}
          className="text-blue-600 dark:text-blue-400"
        >
          <ChevronDown className="w-5 h-5" aria-hidden="true" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={prefersReducedMotion ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-5 text-gray-700 dark:text-gray-300 text-base leading-relaxed border-t border-gray-100 dark:border-neutral-800">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <section
      id="faq"
      className="relative py-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(99,102,241,0.07),transparent_60%)] pointer-events-none" />
      <div className={`absolute -top-10 -left-10 w-72 h-72 bg-blue-200/10 dark:bg-blue-400/10 rounded-full blur-3xl ${prefersReducedMotion ? '' : 'animate-pulse'}`} />
      <div className={`absolute bottom-10 right-10 w-64 h-64 bg-purple-200/10 dark:bg-purple-400/10 rounded-full blur-3xl ${prefersReducedMotion ? '' : 'animate-pulse delay-1000'}`} />

      <div className="relative max-w-5xl mx-auto z-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-5 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            الأسئلة الشائعة
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-500 max-w-2xl mx-auto leading-relaxed">
            جميع الإجابات التي تحتاجها حول المنصة، التسجيل، الأسعار، وخدمات الدعم الفني.
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-5">
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

        {/* CTA */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.7, delay: 0.3 }}
          className="mt-16 text-center rounded-3xl border border-blue-100 dark:border-blue-900 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-10 shadow-inner"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
            لم تجد إجابتك؟
          </h3>
          <p className="text-gray-600 dark:text-gray-500 mb-6">
            فريق الدعم جاهز للرد على جميع استفساراتك التقنية أو الإدارية في أي وقت.
          </p>
          <motion.button
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            onClick={() => (window.location.href = '/contact')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition"
            aria-label="التواصل معنا"
          >
            <span className="flex items-center justify-center gap-2">
              تواصل معنا <HelpCircle className="w-5 h-5" aria-hidden="true" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQComponent;
