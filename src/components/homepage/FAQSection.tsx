'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Container, Card } from '@/components/ui/primitives';
import { cn } from '@/lib/utils';

/**
 * FAQ Section - الأسئلة الشائعة
 * نسخة محسّنة للصفحة الرئيسية
 */

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'كيف أبدأ في المنصة؟',
      answer: 'يمكنك التسجيل مجاناً من خلال الضغط على زر "سجّل مجاناً الآن" في الصفحة الرئيسية. بعد التسجيل، ستحصل على حساب مجاني يتيح لك الوصول لدورات محددة والبدء فوراً.',
    },
    {
      question: 'هل الشهادات معتمدة؟',
      answer: 'نعم، جميع الشهادات معتمدة من جهات معترف بها دولياً وتتماشى مع المعايير المهنية. يمكنك استخدامها في سيرتك الذاتية والترقيات المهنية.',
    },
    {
      question: 'ما هي طرق الدفع المتاحة؟',
      answer: 'نوفر طرق دفع آمنة ومتعددة تشمل الدفع بالبطاقات الائتمانية، التحويل البنكي، والدفع عند الاستلام. جميع المعاملات مشفرة وآمنة.',
    },
    {
      question: 'هل يمكن الوصول للمحتوى على الموبايل؟',
      answer: 'نعم، المنصة متوافقة بالكامل مع جميع الأجهزة. يمكنك التعلم من الهاتف، التابلت، أو الكمبيوتر في أي وقت ومن أي مكان.',
    },
    {
      question: 'ما الفرق بين الباقات المختلفة؟',
      answer: 'الباقة الأساسية تتيح وصول محدود للدورات، بينما باقة برو توفر وصول كامل لجميع الدورات وشهادات معتمدة. باقة الشركات مخصصة للفرق والشركات مع ميزات إضافية.',
    },
    {
      question: 'هل يمكن إلغاء الاشتراك في أي وقت؟',
      answer: 'نعم، يمكنك إلغاء اشتراكك في أي وقت دون التزام. لن يتم خصم أي رسوم بعد الإلغاء وسيحتفظ حسابك بالمحتوى الذي حصلت عليه حتى نهاية فترة الاشتراك.',
    },
    {
      question: 'هل يتوفر دعم فني؟',
      answer: 'نعم، نوفر دعم فني على مدار الساعة طوال أيام الأسبوع. يمكنك التواصل معنا عبر البريد الإلكتروني، المحادثة المباشرة، أو الهاتف.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-800/50">
      <Container size="xl">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            الأسئلة الشائعة
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            أجوبة على الأسئلة الأكثر شيوعاً حول المنصة والخدمات
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <Card
                variant={openIndex === index ? 'elevated' : 'default'}
                size="md"
                className={cn(
                  'transition-all duration-200',
                  openIndex === index && 'border-primary-300 dark:border-primary-700'
                )}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-4 text-right"
                  aria-expanded={openIndex === index}
                >
                  <div
                    className="flex-shrink-0 transition-transform duration-200"
                    style={{ transform: `rotate(${openIndex === index ? 180 : 0}deg)` }}
                  >
                    <ChevronDown className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white flex-1">
                    {faq.question}
                  </h3>
                </button>

                {openIndex === index && (
                  <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;

