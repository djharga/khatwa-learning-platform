'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  User,
  CheckCircle,
  Star,
  Users,
  BookOpen,
  Award,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaTwitter } from 'react-icons/fa';

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: '',
  });

  const steps = [
    {
      id: 1,
      title: 'المعلومات الأساسية',
      description: 'أدخل اسمك وبيانات الاتصال',
    },
    { id: 2, title: 'إعداد كلمة المرور', description: 'اختر كلمة مرور قوية' },
    { id: 3, title: 'تأكيد الحساب', description: 'أكمل إنشاء حسابك' },
  ];

  const validateStep = (step: number) => {
    const newErrors = { ...errors };
    let isValid = true;

    if (step === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'الاسم الأول مطلوب';
        isValid = false;
      } else {
        newErrors.firstName = '';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'الاسم الأخير مطلوب';
        isValid = false;
      } else {
        newErrors.lastName = '';
      }
      if (!formData.email) {
        newErrors.email = 'البريد الإلكتروني مطلوب';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'البريد الإلكتروني غير صحيح';
        isValid = false;
      } else {
        newErrors.email = '';
      }
    } else if (step === 2) {
      if (!formData.password) {
        newErrors.password = 'كلمة المرور مطلوبة';
        isValid = false;
      } else if (formData.password.length < 8) {
        newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
        isValid = false;
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم';
        isValid = false;
      } else {
        newErrors.password = '';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
        isValid = false;
      } else {
        newErrors.confirmPassword = '';
      }
    } else if (step === 3) {
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'يجب الموافقة على الشروط والأحكام';
        isValid = false;
      } else {
        newErrors.agreeToTerms = '';
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('تم إنشاء الحساب بنجاح!');
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '' };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const labels = ['', 'ضعيف', 'متوسط', 'قوي', 'ممتاز'];
    return { strength, label: labels[strength] };
  };

  const handleSocialRegister = (provider: string) => {
    alert(`التسجيل عبر ${provider} قيد التطوير`);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const stepVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50/50 to-indigo-50/30 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse-glow"></div>
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
                انضم إلى مجتمع خطى التعليمية
              </motion.h1>
              <motion.p
                className="text-xl text-text-secondary leading-relaxed mb-8"
                variants={itemVariants}
              >
                ابدأ رحلتك التعليمية مع آلاف الطلاب والمعلمين في منصة تفاعلية
                متطورة
              </motion.p>
            </div>

            {/* Benefits */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-gradient-primary-smooth rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">تعلم بلا حدود</h3>
                  <p className="text-text-muted">
                    وصول إلى آلاف الكورسات في جميع المجالات
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-gradient-accent-smooth rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">مجتمع داعم</h3>
                  <p className="text-text-muted">
                    تواصل مع الطلاب والمعلمين في جميع أنحاء العالم
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-gradient-rainbow rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">شهادات معترف بها</h3>
                  <p className="text-text-muted">
                    احصل على شهادات تثبت إنجازاتك التعليمية
                  </p>
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
                "منصة خطى غيرت حياتي المهنية تماماً. تعلمت مهارات جديدة
                واكتسبت ثقة في نفسي"
              </p>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-gradient-primary-smooth rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">ف.أ</span>
                </div>
                <div>
                  <p className="font-semibold">فاطمة أحمد</p>
                  <p className="text-text-muted text-sm">مطورة برمجيات</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Registration Form */}
          <motion.div variants={itemVariants}>
            <div className="glass-card p-8 lg:p-10 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
              {/* Subtle gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 rounded-3xl p-0.5">
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl h-full w-full"></div>
              </div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    إنشاء حساب جديد
                  </h2>
                  <p className="text-text-secondary">
                    لديك حساب بالفعل؟{' '}
                    <a
                      href="/login"
                      className="font-medium text-accent hover:text-accent-dark transition-colors hover:underline"
                    >
                      تسجيل الدخول
                    </a>
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                            step.id <= currentStep
                              ? 'bg-gradient-primary-smooth text-white shadow-lg'
                              : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {step.id < currentStep ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            step.id
                          )}
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={`w-16 h-1 mx-2 rounded transition-all duration-300 ${
                              step.id < currentStep
                                ? 'bg-gradient-primary-smooth'
                                : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg text-primary mb-1">
                      {steps[currentStep - 1].title}
                    </h3>
                    <p className="text-text-muted text-sm">
                      {steps[currentStep - 1].description}
                    </p>
                  </div>
                </div>

                {/* Social Registration */}
                {currentStep === 1 && (
                  <div className="space-y-3 mb-6">
                    <button
                      onClick={() => handleSocialRegister('Google')}
                      className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-300 hover:scale-105"
                    >
                      <FcGoogle className="h-5 w-5 ml-2" />
                      التسجيل عبر Google
                    </button>
                    <button
                      onClick={() => handleSocialRegister('Facebook')}
                      className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-300 hover:scale-105"
                    >
                      <FaFacebook className="h-5 w-5 ml-2 text-blue-600" />
                      التسجيل عبر Facebook
                    </button>
                    <button
                      onClick={() => handleSocialRegister('Twitter')}
                      className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-300 hover:scale-105"
                    >
                      <FaTwitter className="h-5 w-5 ml-2 text-blue-400" />
                      التسجيل عبر Twitter
                    </button>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">أو</span>
                    </div>
                  </div>
                )}

                {/* Multi-Step Form */}
                <AnimatePresence mode="wait">
                  <motion.form
                    key={currentStep}
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {currentStep === 1 && (
                      <>
                        {/* First Name */}
                        <div className="relative">
                          <label
                            htmlFor="firstName"
                            className={`absolute right-3 top-3 text-sm font-medium transition-all duration-300 ${
                              formData.firstName
                                ? 'text-accent -top-2 text-xs bg-white px-1'
                                : 'text-text-muted'
                            }`}
                          >
                            الاسم الأول
                          </label>
                          <input
                            id="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) =>
                              handleInputChange('firstName', e.target.value)
                            }
                            className={`w-full pr-10 pl-4 py-3 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-accent/20 focus:border-accent ${
                              errors.firstName
                                ? 'border-error'
                                : 'border-gray-300'
                            }`}
                            placeholder="أدخل اسمك الأول"
                          />
                          <User className="absolute right-3 top-3.5 w-5 h-5 text-text-muted" />
                          {errors.firstName && (
                            <div className="flex items-center mt-1 text-error text-sm">
                              <AlertCircle className="w-4 h-4 ml-1" />
                              {errors.firstName}
                            </div>
                          )}
                        </div>

                        {/* Last Name */}
                        <div className="relative">
                          <label
                            htmlFor="lastName"
                            className={`absolute right-3 top-3 text-sm font-medium transition-all duration-300 ${
                              formData.lastName
                                ? 'text-accent -top-2 text-xs bg-white px-1'
                                : 'text-text-muted'
                            }`}
                          >
                            الاسم الأخير
                          </label>
                          <input
                            id="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) =>
                              handleInputChange('lastName', e.target.value)
                            }
                            className={`w-full pr-10 pl-4 py-3 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-accent/20 focus:border-accent ${
                              errors.lastName
                                ? 'border-error'
                                : 'border-gray-300'
                            }`}
                            placeholder="أدخل اسمك الأخير"
                          />
                          <User className="absolute right-3 top-3.5 w-5 h-5 text-text-muted" />
                          {errors.lastName && (
                            <div className="flex items-center mt-1 text-error text-sm">
                              <AlertCircle className="w-4 h-4 ml-1" />
                              {errors.lastName}
                            </div>
                          )}
                        </div>

                        {/* Email */}
                        <div className="relative">
                          <label
                            htmlFor="email"
                            className={`absolute right-3 top-3 text-sm font-medium transition-all duration-300 ${
                              formData.email
                                ? 'text-accent -top-2 text-xs bg-white px-1'
                                : 'text-text-muted'
                            }`}
                          >
                            البريد الإلكتروني
                          </label>
                          <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange('email', e.target.value)
                            }
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
                      </>
                    )}

                    {currentStep === 2 && (
                      <>
                        {/* Password */}
                        <div className="relative">
                          <label
                            htmlFor="password"
                            className={`absolute right-3 top-3 text-sm font-medium transition-all duration-300 ${
                              formData.password
                                ? 'text-accent -top-2 text-xs bg-white px-1'
                                : 'text-text-muted'
                            }`}
                          >
                            كلمة المرور
                          </label>
                          <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) =>
                              handleInputChange('password', e.target.value)
                            }
                            className={`w-full pr-10 pl-10 py-3 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-accent/20 focus:border-accent ${
                              errors.password
                                ? 'border-error'
                                : 'border-gray-300'
                            }`}
                            placeholder="أدخل كلمة مرور قوية"
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
                          {formData.password && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-text-muted">
                                  قوة كلمة المرور
                                </span>
                                <span
                                  className={`text-sm font-medium ${
                                    getPasswordStrength(formData.password)
                                      .strength <= 1
                                      ? 'text-error'
                                      : getPasswordStrength(formData.password)
                                            .strength <= 2
                                        ? 'text-warning'
                                        : 'text-success'
                                  }`}
                                >
                                  {getPasswordStrength(formData.password).label}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all duration-300 ${
                                    getPasswordStrength(formData.password)
                                      .strength <= 1
                                      ? 'bg-error'
                                      : getPasswordStrength(formData.password)
                                            .strength <= 2
                                        ? 'bg-warning'
                                        : getPasswordStrength(formData.password)
                                              .strength <= 3
                                          ? 'bg-accent'
                                          : 'bg-success'
                                  }`}
                                  style={{
                                    width: `${(getPasswordStrength(formData.password).strength / 5) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          )}
                          {errors.password && (
                            <div className="flex items-center mt-1 text-error text-sm">
                              <AlertCircle className="w-4 h-4 ml-1" />
                              {errors.password}
                            </div>
                          )}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                          <label
                            htmlFor="confirmPassword"
                            className={`absolute right-3 top-3 text-sm font-medium transition-all duration-300 ${
                              formData.confirmPassword
                                ? 'text-accent -top-2 text-xs bg-white px-1'
                                : 'text-text-muted'
                            }`}
                          >
                            تأكيد كلمة المرور
                          </label>
                          <input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              handleInputChange(
                                'confirmPassword',
                                e.target.value
                              )
                            }
                            className={`w-full pr-10 pl-10 py-3 border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-accent/20 focus:border-accent ${
                              errors.confirmPassword
                                ? 'border-error'
                                : 'border-gray-300'
                            }`}
                            placeholder="أعد إدخال كلمة المرور"
                          />
                          <Lock className="absolute right-3 top-3.5 w-5 h-5 text-text-muted" />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute left-3 top-3.5 text-text-muted hover:text-accent transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                          {errors.confirmPassword && (
                            <div className="flex items-center mt-1 text-error text-sm">
                              <AlertCircle className="w-4 h-4 ml-1" />
                              {errors.confirmPassword}
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {currentStep === 3 && (
                      <>
                        {/* Terms and Conditions */}
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <input
                              id="agreeToTerms"
                              type="checkbox"
                              checked={formData.agreeToTerms}
                              onChange={(e) =>
                                handleInputChange(
                                  'agreeToTerms',
                                  e.target.checked
                                )
                              }
                              className="w-4 h-4 mt-1 text-accent border-gray-300 rounded focus:ring-accent"
                            />
                            <label
                              htmlFor="agreeToTerms"
                              className="mr-2 text-sm text-text-secondary leading-relaxed"
                            >
                              أوافق على{' '}
                              <a
                                href="/terms"
                                className="text-accent hover:text-accent-dark hover:underline"
                              >
                                الشروط والأحكام
                              </a>{' '}
                              و{' '}
                              <a
                                href="/privacy"
                                className="text-accent hover:text-accent-dark hover:underline"
                              >
                                سياسة الخصوصية
                              </a>
                            </label>
                          </div>
                          {errors.agreeToTerms && (
                            <div className="flex items-center text-error text-sm">
                              <AlertCircle className="w-4 h-4 ml-1" />
                              {errors.agreeToTerms}
                            </div>
                          )}
                        </div>

                        {/* Account Summary */}
                        <div className="glass-card p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50">
                          <h4 className="font-semibold text-primary mb-3">
                            ملخص الحساب
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-text-muted">الاسم:</span>
                              <span className="font-medium">
                                {formData.firstName} {formData.lastName}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-muted">
                                البريد الإلكتروني:
                              </span>
                              <span className="font-medium">
                                {formData.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-4">
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={handlePrevious}
                          className="flex items-center px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow-md transition-all duration-300 hover:scale-105"
                        >
                          <ChevronRight className="w-4 h-4 ml-2" />
                          السابق
                        </button>
                      )}
                      {currentStep < 3 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ml-auto"
                        >
                          التالي
                          <ChevronLeft className="w-4 h-4 mr-2" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ml-auto disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        >
                          <span
                            className={isLoading ? 'opacity-0' : 'opacity-100'}
                          >
                            إنشاء الحساب
                          </span>
                          {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          )}
                        </button>
                      )}
                    </div>
                  </motion.form>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
