'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageSquare, Send } from 'lucide-react';
import { contactInfo, ContactInfo } from './contact-data';
import { showToast, toastMessages } from '../utils/toast';

const ContactInfoCard = React.memo(({ info }: { info: ContactInfo }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className={`group bg-gradient-to-r ${info.bgGradient} p-6 rounded-2xl border border-gray-200 dark:border-neutral-700/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
  >
    <div className="flex items-start gap-4">
      <div className={`p-4 bg-gradient-to-br ${info.gradient} rounded-xl shadow-inner`}>
        <info.icon className="w-6 h-6 text-gray-700 dark:text-gray-100" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">{info.title}</h3>
        {info.href ? (
          <a
            href={info.href}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-medium"
          >
            {info.content}
          </a>
        ) : (
          <p className="text-gray-700 dark:text-gray-300 font-medium">{info.content}</p>
        )}
      </div>
    </div>
  </motion.div>
));
ContactInfoCard.displayName = 'ContactInfoCard';

const ContactComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const toastId = showToast.loading('جاري إرسال الرسالة...');
      await new Promise((res) => setTimeout(res, 2000));
      showToast.dismiss(toastId);
      showToast.success(toastMessages.formSubmitted);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      showToast.error('حدث خطأ أثناء الإرسال. حاول مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/contact-hero-image.jpg"
          alt="صورة التواصل"
          fill
          className="object-cover"
          quality={80}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/95 via-blue-50/90 to-indigo-100/95 dark:from-neutral-900/95 dark:via-neutral-800/90 dark:to-neutral-900/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-800 dark:text-blue-300 font-semibold text-sm mb-6">
            <MessageSquare className="w-4 h-4" />
            تواصل معنا
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
            نحن هنا{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              لمساعدتك
            </span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
            لديك أسئلة حول المنصة؟ تحتاج دعم فني؟ أو ترغب بالتعاون؟ نحن هنا لدعمك في كل خطوة.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Form */}
          <motion.div
            className="xl:col-span-7 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-10"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-800/40 rounded-2xl">
                <Send className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  أرسل رسالة
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  سنرد عليك في أقرب وقت ممكن
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" aria-live="polite">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition shadow-sm"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition shadow-sm"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  موضوع الرسالة *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition shadow-sm"
                >
                  <option value="">اختر موضوع الرسالة</option>
                  <option value="support">دعم فني</option>
                  <option value="partnership">شراكة</option>
                  <option value="feedback">ملاحظات واقتراحات</option>
                  <option value="billing">الفواتير والدفع</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  الرسالة *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition resize-none shadow-sm"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.04 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.96 }}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-lg transition disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    جاري الإرسال...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Send className="w-5 h-5" />
                    إرسال الرسالة
                  </div>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="xl:col-span-5 space-y-6"
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {contactInfo.map((info) => (
              <ContactInfoCard key={info.title} info={info} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactComponent;
