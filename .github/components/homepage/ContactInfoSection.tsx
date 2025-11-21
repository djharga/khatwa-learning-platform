'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import Link from 'next/link';

/**
 * Contact Info Section - قسم قنوات الاتصال
 * يعرض معلومات الاتصال الرسمية لمنصة خطى
 */

const ContactInfoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const contactInfo = [
    {
      icon: Phone,
      label: 'رقم الهاتف الرسمي',
      value: '+966 50 123 4567',
      href: 'tel:+966501234567',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      delay: 0,
    },
    {
      icon: Mail,
      label: 'البريد الإلكتروني الرسمي',
      value: 'support@khatwa.com',
      href: 'mailto:support@khatwa.com',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      delay: 0.2,
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Background Effects - Very Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/12 to-transparent dark:from-indigo-900/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-100/12 to-transparent dark:from-purple-900/8 rounded-full blur-3xl" />
      </div>

      <Container size="xl" className="relative z-10">
        <div ref={ref} className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full border border-indigo-200/50 dark:border-indigo-700/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <MessageCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                قنوات الاتصال
              </span>
            </motion.div>

            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
              تواصل معنا
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              نحن هنا للإجابة على جميع استفساراتك ومساعدتك في رحلتك التعليمية
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: contact.delay, duration: 0.8 }}
                  whileHover={{ y: -5 }}
                >
                  <Link
                    href={contact.href}
                    className="block p-6 lg:p-8 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-6">
                      {/* Icon */}
                      <motion.div
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="relative">
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-r ${contact.gradient} rounded-2xl blur-xl opacity-40`}
                            animate={{
                              opacity: [0.3, 0.5, 0.3],
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: contact.delay,
                            }}
                          />
                          <div className={`relative w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${contact.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                            <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                          </div>
                        </div>
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 text-right space-y-2">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                          {contact.label}
                        </p>
                        <p className="text-xl lg:text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {contact.value}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactInfoSection;

