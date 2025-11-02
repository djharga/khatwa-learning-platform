'use client';

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Send,

  
} from 'lucide-react';
import { contactInfo, ContactInfo } from './contact-data';
import { showToast, toastMessages } from '../utils/toast';

/**
 * Contact information card with icon, title, and content. Supports clickable links for phone and email.
 */
const ContactInfoCard = React.memo(({ info }: { info: ContactInfo }) => (
  <div
    className={`group bg-gradient-to-r ${info.bgGradient} p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300`}
  >
    <div className="flex items-start gap-4">
      <div className={`p-4 bg-gradient-to-br ${info.gradient} rounded-xl`}>
        <info.icon className="w-6 h-6 text-gray-700" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900">{info.title}</h3>
        {info.href ? (
          <a href={info.href} className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
            {info.content}
          </a>
        ) : (
          <p className="text-gray-700 font-medium">{info.content}</p>
        )}
      </div>
    </div>
  </div>
));

ContactInfoCard.displayName = 'ContactInfoCard';

/**
 * Contact form component with submission handling and contact information display. Features form validation, loading states, success/error feedback, and animated contact info cards with gradient styling.
 */
const ContactComponent = () => {
  // Form data state for name, email, subject, and message fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  // Loading state for form submission feedback
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Updates form data state when input values change
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission with simulated API call. Shows success/error toast notifications and resets form on success.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Show loading toast
      const loadingToast = showToast.loading('جاري إرسال الرسالة...');

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // TODO: Integrate with actual contact API endpoint - POST to /api/contact

      // Dismiss loading toast and show success
      showToast.dismiss(loadingToast);
      showToast.success(toastMessages.formSubmitted);

      // Reset form on success
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      // Show error toast
      showToast.error('حدث خطأ أثناء الإرسال. حاول مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(147,197,253,0.05),transparent_60%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        {/* العنوان */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-blue-100 rounded-full text-blue-800 font-semibold text-sm mb-6">
            <MessageSquare className="w-4 h-4" />
            تواصل معنا
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
            نحن هنا <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">لمساعدتك</span>
          </h2>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            لديك أسئلة حول المنصة؟ تحتاج لدعم فني؟ أو تريد التعاون معنا؟ نحن هنا لنساعدك في كل خطوة من رحلتك التعليمية.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Form */}
          <motion.div
            className="xl:col-span-7 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">أرسل رسالة</h3>
                <p className="text-gray-600 text-sm">سنرد عليك في أقرب وقت ممكن</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">الاسم الكامل *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                    placeholder="أدخل اسمك الكامل"
                    aria-label="الاسم الكامل"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                    placeholder="example@email.com"
                    aria-label="البريد الإلكتروني"
                    aria-required="true"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">موضوع الرسالة *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                  aria-label="موضوع الرسالة"
                  aria-required="true"
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
                <label className="block text-sm font-semibold text-gray-800 mb-2">الرسالة *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition resize-none"
                  placeholder="اكتب رسالتك هنا..."
                  aria-label="الرسالة"
                  aria-required="true"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition"
                aria-label={isSubmitting ? "جاري إرسال الرسالة" : "إرسال الرسالة"}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
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
