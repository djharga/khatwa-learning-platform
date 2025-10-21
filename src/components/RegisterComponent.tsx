'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Facebook,
  Twitter,
  Chrome,
} from 'lucide-react';
import { Input, Button, Checkbox, FormField } from './ui';
import { useFormValidation } from '../lib/formHelpers';
import {
  validateEmail,
  validateRequired,
  validatePassword,
  validateMatch,
} from '../lib/validation';

const RegisterComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useFormValidation(
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
    {
      name: [validateRequired],
      email: [validateRequired, validateEmail],
      password: [validateRequired, (v: string): string | null => validatePassword(v, 8)],
      confirmPassword: [
        validateRequired,
        (v: string): string | null => validateMatch(values.password, v),
      ],
      agreeToTerms: [(v: string): string | null => (v ? null : 'يجب الموافقة على الشروط')],
    },
    (values) => {
      alert('تم التسجيل بنجاح! سيتم توجيهك إلى صفحة تسجيل الدخول.');
      // Here you would typically send the data to your backend
    }
  );

  const handleSocialLogin = (provider: string) => {
    alert(`تسجيل الدخول عبر ${provider} قيد التطوير. سيتم إضافته قريبًا.`);
    // Here you would integrate with OAuth providers
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50/50 to-indigo-50/30 py-12 px-6 transition-all duration-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(139,92,246,0.05),transparent_50%)] pointer-events-none"></div>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative max-w-lg w-full space-y-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 lg:p-12 border border-white/50"
        role="region"
        aria-labelledby="register-heading"
      >
        <div>
          <h1
            id="register-heading"
            className="mt-6 text-center text-3xl lg:text-4xl font-extrabold text-primary leading-tight"
          >
            إنشاء حساب جديد
          </h1>
          <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            أو{' '}
            <a
              href="/login"
              className="font-medium text-primary hover:text-primary-dark transition-all duration-300"
            >
              تسجيل الدخول إذا كان لديك حساب
            </a>
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => handleSocialLogin('Google')}
            variant="outline"
            fullWidth
            aria-label="التسجيل عبر Google"
          >
            التسجيل عبر Google
          </Button>

          <Button
            onClick={() => handleSocialLogin('Facebook')}
            variant="outline"
            fullWidth
            aria-label="التسجيل عبر Facebook"
          >
            التسجيل عبر Facebook
          </Button>

          <Button
            onClick={() => handleSocialLogin('Twitter')}
            variant="outline"
            fullWidth
            aria-label="التسجيل عبر Twitter"
          >
            التسجيل عبر Twitter
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
              أو
            </span>
          </div>
        </div>

        {/* Registration Form */}
        <form
          className="space-y-6 lg:space-y-8"
          onSubmit={handleSubmit}
          aria-label="نموذج إنشاء حساب جديد"
        >
          <div>
            <FormField
              label="الاسم الكامل"
              required
              error={errors.name}
              htmlFor="name"
            >
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={values.name}
                onChange={(e) => handleChange('name', e.target.value)}
                leftIcon={User}
                variant="modern"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                placeholder="أدخل اسمك الكامل"
              />
            </FormField>
          </div>

          <div>
            <FormField
              label="البريد الإلكتروني"
              required
              error={errors.email}
              htmlFor="email"
            >
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                leftIcon={Mail}
                variant="modern"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                placeholder="أدخل بريدك الإلكتروني"
              />
            </FormField>
          </div>

          <div>
            <FormField
              label="كلمة المرور"
              required
              error={errors.password}
              description="يجب أن تكون كلمة المرور 8 أحرف على الأقل"
              htmlFor="password"
            >
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={values.password}
                onChange={(e) => handleChange('password', e.target.value)}
                rightIcon={showPassword ? EyeOff : Eye}
                variant="modern"
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password
                    ? 'password-error password-hint'
                    : 'password-hint'
                }
                placeholder="أدخل كلمة مرور قوية"
              />
            </FormField>
          </div>

          <div>
            <FormField
              label="تأكيد كلمة المرور"
              required
              error={errors.confirmPassword}
              htmlFor="confirmPassword"
            >
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={values.confirmPassword}
                onChange={(e) =>
                  handleChange('confirmPassword', e.target.value)
                }
                rightIcon={showConfirmPassword ? EyeOff : Eye}
                variant="modern"
                aria-required="true"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword ? 'confirm-password-error' : undefined
                }
                placeholder="أعد إدخال كلمة المرور"
              />
            </FormField>
          </div>

          <Checkbox
            id="agreeToTerms"
            name="agreeToTerms"
            checked={values.agreeToTerms}
            onChange={(e) => handleChange('agreeToTerms', e.target.checked ? 'true' : 'false')}
            label={
              <>
                أوافق على{' '}
                <a
                  href="/terms"
                  className="text-primary hover:text-primary-dark transition-colors focus:ring-2 focus:ring-primary rounded"
                  aria-label="الشروط والأحكام"
                >
                  الشروط والأحكام
                </a>{' '}
                و{' '}
                <a
                  href="/privacy"
                  className="text-primary hover:text-primary-dark transition-colors focus:ring-2 focus:ring-primary rounded"
                  aria-label="سياسة الخصوصية"
                >
                  سياسة الخصوصية
                </a>{' '}
                <span className="text-red-500" aria-label="حقل مطلوب">
                  *
                </span>
              </>
            }
            aria-required="true"
            aria-invalid={!!errors.agreeToTerms}
            aria-describedby={errors.agreeToTerms ? 'terms-error' : undefined}
          />
          {errors.agreeToTerms && (
            <p
              id="terms-error"
              className="text-red-500 text-sm mt-1 flex items-center"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 mr-1" aria-hidden="true" />
              {errors.agreeToTerms}
            </p>
          )}

          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              aria-label="إنشاء حساب جديد"
            >
              إنشاء الحساب
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterComponent;
