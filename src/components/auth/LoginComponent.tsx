'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { Input, Button, Checkbox, FormField } from '../ui';
import { useFormValidation } from '../../lib/formHelpers';
import { validateEmail, validateRequired } from '../../lib/validation';
import { showToast, toastMessages } from '../../utils/toast';

/**
 * Props for the SocialLoginButtons component
 */
interface SocialLoginButtonsProps {
  onSocialLogin: (provider: string) => void;
}

/**
 * Renders social login buttons for Google, Facebook, and Twitter authentication
 */
const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ onSocialLogin }) => {
  return (
    <div className="space-y-4">
      <Button
        onClick={() => onSocialLogin('Google')}
        variant="outline"
        fullWidth
        aria-label="تسجيل الدخول عبر Google"
      >
        تسجيل الدخول عبر Google
      </Button>

      <Button
        onClick={() => onSocialLogin('Facebook')}
        variant="outline"
        fullWidth
        aria-label="تسجيل الدخول عبر Facebook"
      >
        تسجيل الدخول عبر Facebook
      </Button>

      <Button
        onClick={() => onSocialLogin('Twitter')}
        variant="outline"
        fullWidth
        aria-label="تسجيل الدخول عبر Twitter"
      >
        تسجيل الدخول عبر Twitter
      </Button>
    </div>
  );
};

/**
 * Login form component with email/password authentication and social login options. Includes form validation and accessibility features.
 */
const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useFormValidation(
    { email: '', password: '' },
    {
      email: [validateRequired, validateEmail],
      password: [validateRequired],
    },
    (values) => {
      // Show success toast instead of alert
      showToast.success(toastMessages.loginSuccessful);
      // Here you would typically send the data to your backend
    }
  );

  /**
   * Handles social authentication provider selection
   */
  const handleSocialLogin = (provider: string) => {
    showToast.info(`تسجيل الدخول عبر ${provider} قيد التطوير. سيتم إضافته قريبًا.`);
    // Here you would integrate with OAuth providers
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50/50 to-indigo-50/30 py-12 px-6 transition-all duration-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none"></div>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative max-w-lg w-full space-y-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 lg:p-12 border border-white/50"
        role="region"
        aria-labelledby="login-heading"
      >
        <div>
          <h1
            id="login-heading"
            className="mt-6 text-center text-3xl lg:text-4xl font-extrabold text-primary leading-tight"
          >
            تسجيل الدخول
          </h1>
          <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            أو{' '}
            <a
              href="/register"
              className="font-medium text-primary hover:text-primary-dark transition-all duration-300"
            >
              إنشاء حساب جديد
            </a>
          </p>
        </div>

        <SocialLoginButtons onSocialLogin={handleSocialLogin} />

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

        {/* Login Form */}
        <form
          className="space-y-6 lg:space-y-8"
          onSubmit={handleSubmit}
          aria-label="نموذج تسجيل الدخول"
        >
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
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
              htmlFor="password"
            >
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={values.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('password', e.target.value)}
                rightIcon={showPassword ? EyeOff : Eye}
                variant="modern"
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? 'password-error' : undefined
                }
                placeholder="أدخل كلمة المرور"
              />
            </FormField>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-8 h-5 w-5 text-gray-400 hover:text-gray-600 transition-base focus:ring-2 focus:ring-primary rounded"
              aria-label={
                showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'
              }
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Eye className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Checkbox
              id="remember-me"
              name="remember-me"
              label="تذكرني"
              aria-label="تذكرني"
            />

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary hover:text-primary-dark transition-colors focus:ring-2 focus:ring-primary rounded"
                aria-label="استعادة كلمة المرور"
              >
                نسيت كلمة المرور؟
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              aria-label="تسجيل الدخول إلى حسابك"
            >
              تسجيل الدخول
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginComponent;