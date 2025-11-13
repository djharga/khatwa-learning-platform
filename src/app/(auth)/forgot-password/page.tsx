'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import {
  Mail,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate password reset request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-elevation-2 p-8 border border-neutral-200 dark:border-neutral-700 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              تم إرسال رابط إعادة تعيين كلمة المرور
            </h1>

            <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
              تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني{' '}
              <span className="font-semibold text-primary-600 dark:text-primary-400">{email}</span>
            </p>

            <div className="space-y-4">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                لم تستلم البريد الإلكتروني؟ تحقق من مجلد البريد المزعج (Spam)
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/auth"
                  className="flex-1 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 ease-out shadow-elevation-2 hover:shadow-elevation-4 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  العودة لتسجيل الدخول
                </Link>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="flex-1 min-h-[44px] bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  إرسال مرة أخرى
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <span className="text-3xl">🔐</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">إعادة تعيين كلمة المرور</h1>
          <p className="text-neutral-600 dark:text-neutral-400">أدخل بريدك الإلكتروني لتلقي رابط إعادة التعيين</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-800 rounded-2xl shadow-elevation-2 p-8 border border-neutral-200 dark:border-neutral-700"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pr-10 pl-4 py-3 min-h-[44px] border rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:border-primary-500 dark:focus-visible:border-primary-400 ${
                    errors.email ? 'border-danger-500 dark:border-danger-400' : 'border-neutral-300 dark:border-neutral-600'
                  }`}
                  placeholder="example@email.com"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 dark:text-neutral-500" />
              </div>
              {errors.email && (
                <p className="text-danger-600 dark:text-danger-400 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 ease-out shadow-elevation-2 hover:shadow-elevation-4 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري الإرسال...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <ArrowRight className="w-5 h-5" />
                  إرسال رابط إعادة التعيين
                </div>
              )}
            </motion.button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 min-h-[44px] text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              <ArrowLeft className="w-4 h-4" />
              العودة لتسجيل الدخول
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="flex items-center gap-4 justify-center text-sm text-neutral-500 dark:text-neutral-400">
            <Link href="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 ease-out">الخصوصية</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 ease-out">الشروط</Link>
            <span>•</span>
            <Link href="/support" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 ease-out">الدعم</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
