'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  EyeOff,
  AlertCircle,
  CheckCircle,
  Star,
  Users,
  BookOpen,
  Award,
  Mail,
  Lock,
  Eye,
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    if (!email) newErrors.email = 'البريد الإلكتروني مطلوب';
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    if (!password) newErrors.password = 'كلمة المرور مطلوبة';
    else if (password.length < 6)
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('تم تسجيل الدخول بنجاح!');
    }, 2000);
  };

  const handleSocialLogin = (provider: string) => {
    alert(`تسجيل الدخول عبر ${provider} قيد التطوير`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-400/10 to-primary-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-primary-500/10 to-primary-700/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center py-12 px-6 lg:px-8">
        <motion.div
          className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Side - Information Section */}
          <motion.div
            className="hidden lg:block space-y-8"
            variants={itemVariants}
          >
            <div className="text-center lg:text-right">
              <motion.h1
                className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600 bg-clip-text text-transparent mb-6 font-heading"
                variants={itemVariants}
              >
                مرحباً بك في منصة خطى التعليمية
              </motion.h1>
              <motion.p
                className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8"
                variants={itemVariants}
              >
                تعلم، تطور، وانطلق في رحلتك التعليمية مع أفضل الكورسات والمحتوى
                التفاعلي
              </motion.p>
            </div>

            {/* Features */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-primary-600 dark:bg-primary-500 rounded-xl flex items-center justify-center shadow-md">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-neutral-900 dark:text-white">كورسات متنوعة</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    أكثر من 500 كورس في مختلف المجالات
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-primary-600 dark:bg-primary-500 rounded-xl flex items-center justify-center shadow-md">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-neutral-900 dark:text-white">مجتمع تعليمي</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    تواصل مع آلاف الطلاب والمعلمين
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-primary-600 dark:bg-primary-500 rounded-xl flex items-center justify-center shadow-md">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-neutral-900 dark:text-white">شهادات معتمدة</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">احصل على شهادات تثبت مهارتك</p>
                </div>
              </div>
            </motion.div>

            {/* Mini Testimonials */}
            <motion.div
              className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-md"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-1 rtl:space-x-reverse mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-warning-500 fill-current"
                  />
                ))}
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 italic mb-4">
                "منصة رائعة ساعدتني في تطوير مهاراتي وتحقيق أهدافي المهنية"
              </p>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">أ.م</span>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">أحمد محمد</p>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">طالب برمجة</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white dark:bg-neutral-800 p-8 lg:p-10 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-2 font-heading">
                    تسجيل الدخول
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    أو{' '}
                    <a
                      href="/register"
                      className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors hover:underline"
                    >
                      إنشاء حساب جديد
                    </a>
                  </p>
                </div>

                {/* Social Login */}
                <div className="space-y-3 mb-6">
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin('Google')}
                    className="w-full"
                  >
                    <FcGoogle className="h-5 w-5 ml-2" />
                    تسجيل الدخول عبر Google
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin('Facebook')}
                    className="w-full"
                  >
                    <FaFacebook className="h-5 w-5 ml-2 text-blue-600" />
                    تسجيل الدخول عبر Facebook
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin('Twitter')}
                    className="w-full"
                  >
                    <FaTwitter className="h-5 w-5 ml-2 text-blue-400" />
                    تسجيل الدخول عبر Twitter
                  </Button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-300 dark:border-neutral-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">أو</span>
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      البريد الإلكتروني
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="أدخل بريدك الإلكتروني"
                      leftIcon={Mail}
                      error={!!errors.email}
                    />
                    {errors.email && (
                      <div className="flex items-center mt-1 text-danger-600 dark:text-danger-400 text-sm">
                        <AlertCircle className="w-4 h-4 ml-1" />
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      كلمة المرور
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="أدخل كلمة المرور"
                        leftIcon={Lock}
                        error={!!errors.password}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors p-1"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <div className="flex items-center mt-1 text-danger-600 dark:text-danger-400 text-sm">
                        <AlertCircle className="w-4 h-4 ml-1" />
                        {errors.password}
                      </div>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-primary-600 border-neutral-300 dark:border-neutral-600 rounded focus:ring-primary-500 focus:ring-2"
                      />
                      <span className="mr-2 text-sm text-neutral-700 dark:text-neutral-300">
                        تذكرني
                      </span>
                    </label>
                    <a
                      href="/forgot-password"
                      className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline transition-colors"
                    >
                      نسيت كلمة المرور؟
                    </a>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    loading={isLoading}
                    className="w-full"
                    size="lg"
                  >
                    تسجيل الدخول
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
