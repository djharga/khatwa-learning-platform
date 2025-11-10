'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * FAQ Section - الأسئلة الشائعة
 * تصميم محسّن وجميل للأسئلة الشائعة
 */

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'ما هي منصة خطى، وما الذي تقدمه لي؟',
      answer: 'منصتنا هي بيئة تعليمية رقمية متخصصة في المراجعة الداخلية والإدارة المالية والتشغيل. نوفر تدريب عملي من خلال حالات عملية حصرية لمنصة خطى، تجمع بين المحتوى الأكاديمي والتطبيق العملي الواقعي.',
    },
    {
      question: 'ما الفرق بين هذه المنصة والمنصات التقليدية في مجال التدريب؟',
      answer: 'نحن نركز على التدريب العملي والحالات الحقيقية وليس المحتوى النظري فقط، ونقدم استشارات فردية ومؤسسية لرفع الأداء بشكل ملموس. جميع البرامج مصممة لتناسب السوق المحلي والخليجي مع مراعاة المعايير الدولية.',
    },
    {
      question: 'هل المنصة تركز على الجانب النظري أم العملي في التدريب؟',
      answer: 'نركز على الدمج بين النظري والعملي مع تقديم أدوات تطبيقية يمكن تنفيذها داخل بيئة العمل مباشرة. تم إنشاء المنصة لسد الفجوة بين الجانب النظري والتطبيق العملي، وتزويد الأفراد والشركات بمهارات واقعية.',
    },
    {
      question: 'هل تقدم المنصة محتوى مخصص لسوق العمل السعودي والخليجي؟',
      answer: 'نعم، برامجنا مصممة لتناسب السوق المحلي والخليجي مع مراعاة المعايير الدولية، مما يجعلها صالحة للتطبيق عالميًا أيضًا. نحن نقدم حالات عملية حقيقية من شركات كبرى لربط المحتوى بالواقع العملي.',
    },
    {
      question: 'هل شهادات المنصة معترف بها دولياً؟',
      answer: 'نعم، جميع الشهادات معتمدة من جهات معترف بها دولياً وتتماشى مع المعايير المهنية. يمكنك استخدامها في سيرتك الذاتية والترقيات المهنية. بعد اجتياز كل برنامج تدريبي بنجاح تحصل على شهادة حضور أو اجتياز معتمدة.',
    },
    {
      question: 'كيف يتم حماية بياناتي وملفاتي؟',
      answer: 'نستخدم تشفير AES-256 مع مراكز بيانات معتمدة ISO 27001، بالإضافة إلى مراقبة أمنية على مدار الساعة ومراجعات دورية من طرف ثالث. جميع المعاملات مشفرة وآمنة لحماية معلوماتك الشخصية.',
    },
    {
      question: 'ما نوع الدعم الذي تقدمه المنصة؟',
      answer: 'نوفر دعم فني لمشاكل تسجيل الدخول أو مشاهدة المحتوى على مدار الساعة طوال أيام الأسبوع. بالإضافة إلى دعم أكاديمي من خلال إجابات على استفساراتك داخل الكورس أو جلسات مباشرة مع الخبراء. يمكنك التواصل معنا عبر البريد الإلكتروني، المحادثة المباشرة، أو الهاتف.',
    },
    {
      question: 'هل يمكنني استرداد المبلغ إذا لم أستفد من الدورة؟',
      answer: 'نعم، لدينا سياسة استرداد واضحة. نوفر ضمان استرداد كامل خلال 30 يوماً، بالإضافة إلى دعم مدرب شخصي لإعادة تصميم خطة التعلم بما يناسبك. يتم توضيح جميع التفاصيل عند الاشتراك.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden">
      <Container size="xl" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Header Card */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg"
            >
              <HelpCircle className="w-8 h-8 text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4"
            >
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                الأسئلة الشائعة
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
            >
              أجوبة على الأسئلة الأكثر شيوعاً حول المنصة والخدمات
            </motion.p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/10 dark:from-neutral-800 dark:via-emerald-900/10 dark:to-teal-900/10 border transition-all duration-300 ${
                    openIndex === index
                      ? 'border-emerald-300 dark:border-emerald-700 shadow-xl'
                      : 'border-emerald-200/50 dark:border-emerald-800/30 shadow-md hover:shadow-lg'
                  }`}
                >
                  {/* Decorative Gradient Overlay */}
                  {openIndex === index && (
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none" />
                  )}

                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 lg:p-8 flex items-center justify-between gap-4 text-right group"
                    aria-expanded={openIndex === index}
                  >
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 mt-1 transition-colors duration-200 ${
                          openIndex === index
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-emerald-500 dark:text-emerald-500'
                        }`}>
                          <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6" />
                        </div>
                        <h3 className="text-lg lg:text-xl font-semibold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                        openIndex === index
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                          : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  {/* Answer Content */}
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-0">
                          <div className="border-t border-emerald-200/50 dark:border-emerald-800/30 pt-6">
                            <p className="text-base lg:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Subtle Corner Accents */}
                  {openIndex === index && (
                    <>
                      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-br-full pointer-events-none" />
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-teal-500/10 to-transparent rounded-tl-full pointer-events-none" />
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-full border border-emerald-200/50 dark:border-emerald-700/50">
              <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                لم تجد إجابة؟{' '}
                <a
                  href="/contact"
                  className="underline hover:text-emerald-800 dark:hover:text-emerald-200 transition-colors"
                >
                  تواصل معنا
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default FAQSection;

