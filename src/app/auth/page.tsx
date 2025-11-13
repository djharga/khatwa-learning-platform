'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'البريد الإلكتروني مطلوب';
    if (!formData.password) newErrors.password = 'كلمة المرور مطلوبة';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      // Handle login logic here
      console.log('Login attempt:', formData);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-neutral-800 rounded-2xl shadow-elevation-2 p-8 border border-neutral-200 dark:border-neutral-700"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            البريد الإلكتروني
          </label>
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            كلمة المرور
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full pr-10 pl-4 py-3 min-h-[44px] border rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:border-primary-500 dark:focus-visible:border-primary-400 ${
                errors.password ? 'border-danger-500 dark:border-danger-400' : 'border-neutral-300 dark:border-neutral-600'
              }`}
              placeholder="كلمة المرور"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 min-h-[44px] min-w-[44px] text-neutral-400 dark:text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-danger-600 dark:text-danger-400 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.password}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              className="rounded border-neutral-300 dark:border-neutral-600 text-primary-600 dark:text-primary-400 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            />
            <span className="text-sm text-neutral-600 dark:text-neutral-400 mr-2">تذكرني</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 transition-colors duration-200 ease-out"
          >
            نسيت كلمة المرور؟
          </Link>
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
              جاري تسجيل الدخول...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <ArrowRight className="w-5 h-5" />
              تسجيل الدخول
            </div>
          )}
        </motion.button>
      </form>

      <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
        <div className="text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">أو الدخول كضيف</p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 min-h-[44px] bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 px-6 py-2 rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            تصفح الدورات
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student' as 'student' | 'company',
    companyName: '',
    phone: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'الاسم مطلوب';
    if (!formData.email) newErrors.email = 'البريد الإلكتروني مطلوب';
    if (!formData.password) newErrors.password = 'كلمة المرور مطلوبة';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
    if (formData.password.length < 8) newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'يجب الموافقة على الشروط والأحكام';

    if (formData.userType === 'company' && !formData.companyName) {
      newErrors.companyName = 'اسم الشركة مطلوب';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      // Handle registration logic here
      console.log('Registration attempt:', formData);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-neutral-800 rounded-2xl shadow-elevation-2 p-8 border border-neutral-200 dark:border-neutral-700"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            نوع الحساب
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, userType: 'student' })}
              className={`flex items-center gap-3 p-4 min-h-[44px] border-2 rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                formData.userType === 'student'
                  ? 'border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-600'
              }`}
            >
              <User className="w-5 h-5" />
              <span>متدرب فردي</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, userType: 'company' })}
              className={`flex items-center gap-3 p-4 min-h-[44px] border-2 rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-innovate-500 focus-visible:ring-offset-2 ${
                formData.userType === 'company'
                  ? 'border-secondary-innovate-500 dark:border-secondary-innovate-400 bg-secondary-innovate-50 dark:bg-secondary-innovate-900/30 text-secondary-innovate-700 dark:text-secondary-innovate-300'
                  : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-600'
              }`}
            >
              <Building className="w-5 h-5" />
              <span>شركة/مؤسسة</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الاسم الكامل
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full pr-10 pl-4 py-3 min-h-[44px] border rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:border-primary-500 dark:focus-visible:border-primary-400 ${
                errors.name ? 'border-danger-500 dark:border-danger-400' : 'border-neutral-300 dark:border-neutral-600'
              }`}
              placeholder="أدخل اسمك الكامل"
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 dark:text-neutral-500" />
          </div>
          {errors.name && (
            <p className="text-danger-600 dark:text-danger-400 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.name}
            </p>
          )}
        </div>

        {formData.userType === 'company' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم الشركة
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className={`w-full pr-10 pl-4 py-3 min-h-[44px] border rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:border-primary-500 dark:focus-visible:border-primary-400 ${
                errors.companyName ? 'border-danger-500 dark:border-danger-400' : 'border-neutral-300 dark:border-neutral-600'
              }`}
                placeholder="اسم الشركة أو المؤسسة"
              />
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 dark:text-neutral-500" />
            </div>
            {errors.companyName && (
            <p className="text-danger-600 dark:text-danger-400 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.companyName}
            </p>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رقم الهاتف (اختياري)
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 min-h-[44px] border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:border-primary-500 dark:focus-visible:border-primary-400"
            placeholder="+966 50 000 0000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            البريد الإلكتروني
          </label>
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            كلمة المرور
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full pr-10 pl-4 py-3 min-h-[44px] border rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:border-primary-500 dark:focus-visible:border-primary-400 ${
                errors.password ? 'border-danger-500 dark:border-danger-400' : 'border-neutral-300 dark:border-neutral-600'
              }`}
              placeholder="كلمة مرور قوية"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 min-h-[44px] min-w-[44px] text-neutral-400 dark:text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-danger-600 dark:text-danger-400 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تأكيد كلمة المرور
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={`w-full pr-10 pl-4 py-3 min-h-[44px] border rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:border-primary-500 dark:focus-visible:border-primary-400 ${
                errors.confirmPassword ? 'border-danger-500 dark:border-danger-400' : 'border-neutral-300 dark:border-neutral-600'
              }`}
              placeholder="أعد كتابة كلمة المرور"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-danger-600 dark:text-danger-400 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
              className="rounded border-neutral-300 dark:border-neutral-600 text-primary-600 dark:text-primary-400 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            />
            <span className="text-sm text-neutral-600 dark:text-neutral-400 mr-2">
              أوافق على{' '}
              <Link href="/terms" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 transition-colors duration-200 ease-out">
                الشروط والأحكام
              </Link>
              {' '}و{' '}
              <Link href="/privacy" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 transition-colors duration-200 ease-out">
                سياسة الخصوصية
              </Link>
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-danger-600 dark:text-danger-400 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.acceptTerms}
            </p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full min-h-[44px] bg-gradient-to-r from-success-600 to-success-700 hover:from-success-700 hover:to-success-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 ease-out shadow-elevation-2 hover:shadow-elevation-4 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              جاري إنشاء الحساب...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              إنشاء الحساب
            </div>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const tabs = [
    { id: 'login', label: 'تسجيل الدخول', active: isLogin },
    { id: 'register', label: 'إنشاء حساب', active: !isLogin },
  ];

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
            <span className="text-3xl">🎓</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">منصة خطى التعليمية</h1>
          <p className="text-neutral-600 dark:text-neutral-400">بيئة تعليمية متكاملة للمراجعة الداخلية والمحاسبة</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-neutral-800 rounded-t-2xl shadow-elevation-2 border border-neutral-200 dark:border-neutral-700 border-b-0">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setIsLogin(tab.id === 'login')}
                className={`flex-1 py-4 px-6 min-h-[44px] text-center font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  tab.active
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/30'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <LoginForm key="login" />
          ) : (
            <RegisterForm key="register" />
          )}
        </AnimatePresence>

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

export default AuthPage;
