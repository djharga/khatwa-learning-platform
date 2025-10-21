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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/50 to-indigo-50/30 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse-glow"></div>
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
                className="text-5xl lg:text-6xl font-bold text-gradient-primary mb-6"
                variants={itemVariants}
              >
                مرحباً بك في منصة خطى التعليمية
              </motion.h1>
              <motion.p
                className="text-xl text-text-secondary leading-relaxed mb-8"
                variants={itemVariants}
              >
                تعلم، تطور، وانطلق في رحلتك التعليمية مع أفضل الكورسات والمحتوى
                التفاعلي
              </motion.p>
            </div>

            {/* Features */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-gradient-primary-smooth rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">كورسات متنوعة</h3>
                  <p className="text-text-muted">
                    أكثر من 500 كورس في مختلف المجالات
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-gradient-accent-smooth rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">مجتمع تعليمي</h3>
                  <p className="text-text-muted">
                    تواصل مع آلاف الطلاب والمعلمين
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-gradient-rainbow rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">شهادات معتمدة</h3>
                  <p className="text-text-muted">احصل على شهادات تثبت مهارتك</p>
                </div>
              </div>
            </motion.div>

            {/* Mini Testimonials */}
            <motion.div
              className="glass-card p-6 rounded-2xl"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-1 rtl:space-x-reverse mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-text-secondary italic mb-4">
                "منصة رائعة ساعدتني في تطوير مهاراتي وتحقيق أهدافي المهنية"
              </p>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-gradient-primary-smooth rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">أ.م</span>
                </div>
                <div>
                  <p className="font-semibold">أحمد محمد</p>
                  <p className="text-text-muted text-sm">طالب برمجة</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div variants={itemVariants}>
            <div className="glass-card p-8 lg:p-10 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
              {/* Subtle gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl p-0.5">
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl h-full w-full"></div>
              </div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    تسجيل الدخول
                  </h2>
                  <p className="text-text-secondary">
                    أو{' '}
                    <a
                      href="/register"
                      className="font-medium text-accent hover:text-accent-dark transition-colors hover:underline"
                    >
                      إنشاء حساب جديد
                    </a>
                  </p>
                </div>

                {/* Social Login */}
                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => handleSocialLogin('Google')}
                    className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-300 hover:scale-105"
                  >
                    <FcGoogle className="h-5 w-5 ml-2" />
                    تسجيل الدخول عبر Google
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Facebook')}
                    className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-300 hover:scale-105"
                  >
                    <FaFacebook className="h-5 w-5 ml-2 text-blue-600" />
                    تسجيل الدخول عبر Facebook
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Twitter')}
                    className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-300 hover:scale-105"
                  >
                    <FaTwitter className="h-5 w-5 ml-2 text-blue-400" />
                    تسجيل الدخول عبر Twitter
                  </button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">أو</span>
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className={`absolute right-3 top-3 text-sm font-medium transition-all duration-300 ${
                        email
                          ? 'text-accent -top-2 text-xs bg-white px-1'
                          : 'text-text-muted'
                      }`}
                    >
                      البريد الإلكتروني
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pr-10 pl-4 py-3 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-accent/20 focus:border-accent ${
                        errors.email ? 'border-error' : 'border-gray-300'
                      }`}
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                    <Mail className="absolute right-3 top-3.5 w-5 h-5 text-text-muted" />
                    {errors.email && (
                      <div className="flex items-center mt-1 text-error text-sm">
                        <AlertCircle className="w-4 h-4 ml-1" />
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <label
                      htmlFor="password"
                      className={`absolute right-3 top-3 text-sm font-medium transition-all duration-300 ${
                        password
                          ? 'text-accent -top-2 text-xs bg-white px-1'
                          : 'text-text-muted'
                      }`}
                    >
                      كلمة المرور
                    </label>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pr-10 pl-10 py-3 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-accent/20 focus:border-accent ${
                        errors.password ? 'border-error' : 'border-gray-300'
                      }`}
                      placeholder="أدخل كلمة المرور"
                    />
                    <Lock className="absolute right-3 top-3.5 w-5 h-5 text-text-muted" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-3.5 text-text-muted hover:text-accent transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                    {errors.password && (
                      <div className="flex items-center mt-1 text-error text-sm">
                        <AlertCircle className="w-4 h-4 ml-1" />
                        {errors.password}
                      </div>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                      />
                      <span className="mr-2 text-sm text-text-secondary">
                        تذكرني
                      </span>
                    </label>
                    <a
                      href="/forgot-password"
                      className="text-sm text-accent hover:text-accent-dark hover:underline transition-colors"
                    >
                      نسيت كلمة المرور؟
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
                      تسجيل الدخول
                    </span>
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </button>
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
