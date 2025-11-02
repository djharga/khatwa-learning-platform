'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Bell,
  Shield,
  Wifi,
  RefreshCw,
} from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Props for the mobile linking dialog component
 */
interface MobileLinkingProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Callback to close the dialog */
  onClose: () => void;
  /** Optional callback when linking succeeds */
  onLinkSuccess?: (phoneNumber: string) => void;
}

/**
 * Current mobile linking status including phone number and enabled features
 */
interface LinkingStatus {
  /** Whether the phone is linked */
  isLinked: boolean;
  /** The linked phone number */
  phoneNumber: string;
  /** Last activity timestamp */
  lastActivity: Date | null;
  /** Whether notifications are enabled */
  notificationsEnabled: boolean;
  /** Whether security alerts are enabled */
  securityAlerts: boolean;
}

/**
 * First step: Phone number input with country code and benefits explanation
 */
interface PhoneInputStepProps {
  phoneNumber: string;
  isLoading: boolean;
  onPhoneChange: (phone: string) => void;
  onSubmit: () => void;
}

const PhoneInputStep = ({ phoneNumber, isLoading, onPhoneChange, onSubmit }: PhoneInputStepProps) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="space-y-6"
  >
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Smartphone className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        أدخل رقم هاتفك
      </h3>
      <p className="text-gray-600 text-sm">
        سنرسل لك رمز تحقق للتأكد من صحة الرقم
      </p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        رقم الهاتف
      </label>
      <div className="relative">
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="01xxxxxxxxx"
          className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
          dir="ltr"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          🇪🇬 +20
        </div>
      </div>
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-start gap-2">
        <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">ما هي فوائد ربط الهاتف؟</p>
          <ul className="space-y-1 text-blue-700">
            <li>• إشعارات الجلسات الجديدة</li>
            <li>• تنبيهات الأمان والحماية</li>
            <li>• تحديثات الدورات والمحتوى</li>
            <li>• تأكيد العمليات الهامة</li>
          </ul>
        </div>
      </div>
    </div>

    <motion.button
      onClick={onSubmit}
      disabled={isLoading || phoneNumber.length < 10}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
      whileHover={!isLoading && phoneNumber.length >= 10 ? { scale: 1.02 } : undefined}
      whileTap={!isLoading && phoneNumber.length >= 10 ? { scale: 0.98 } : undefined}
    >
      {isLoading ? (
        <>
          <RefreshCw className="w-5 h-5 animate-spin" />
          جاري الإرسال...
        </>
      ) : (
        <>
          <MessageSquare className="w-5 h-5" />
          إرسال رمز التحقق
        </>
      )}
    </motion.button>
  </motion.div>
);

/**
 * Second step: SMS verification code input with resend option
 */
interface VerificationStepProps {
  phoneNumber: string;
  verificationCode: string;
  isLoading: boolean;
  onCodeChange: (code: string) => void;
  onVerify: () => void;
  onResend: () => void;
}

const VerificationStep = ({ phoneNumber, verificationCode, isLoading, onCodeChange, onVerify, onResend }: VerificationStepProps) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="space-y-6"
  >
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <MessageSquare className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        أدخل رمز التحقق
      </h3>
      <p className="text-gray-600 text-sm">
        تم إرسال رمز مكون من 6 أرقام إلى رقم {phoneNumber}
      </p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        رمز التحقق
      </label>
      <input
        type="text"
        value={verificationCode}
        onChange={(e) => onCodeChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
        placeholder="000000"
        className="w-full text-center text-2xl font-bold tracking-widest py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        maxLength={6}
      />
    </div>

    <div className="text-center">
      <button
        onClick={onResend}
        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        إعادة إرسال الرمز
      </button>
    </div>

    <motion.button
      onClick={onVerify}
      disabled={isLoading || verificationCode.length !== 6}
      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
      whileHover={!isLoading && verificationCode.length === 6 ? { scale: 1.02 } : undefined}
      whileTap={!isLoading && verificationCode.length === 6 ? { scale: 0.98 } : undefined}
    >
      {isLoading ? (
        <>
          <RefreshCw className="w-5 h-5 animate-spin" />
          جاري التحقق...
        </>
      ) : (
        <>
          <CheckCircle className="w-5 h-5" />
          التحقق من الرمز
        </>
      )}
    </motion.button>
  </motion.div>
);

/**
 * Third step: Success confirmation with enabled features list
 */
interface SuccessStepProps {
  phoneNumber: string;
  onClose: () => void;
}

const SuccessStep = ({ phoneNumber, onClose }: SuccessStepProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center space-y-6"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto"
    >
      <CheckCircle className="w-8 h-8 text-green-600" />
    </motion.div>

    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        تم ربط الهاتف بنجاح!
      </h3>
      <p className="text-gray-600">
        رقم هاتفك {phoneNumber} مربوط الآن بالموقع
      </p>
    </div>

    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center gap-2 text-green-800 mb-2">
        <Wifi className="w-5 h-5" />
        <span className="font-medium">الخدمات المفعلة:</span>
      </div>
      <div className="space-y-1 text-sm text-green-700">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          إشعارات الجلسات الجديدة
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          تنبيهات الأمان والحماية
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          تحديثات الدورات والمحتوى
        </div>
      </div>
    </div>

    <motion.button
      onClick={onClose}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      متابعة استخدام الموقع
    </motion.button>
  </motion.div>
);

/**
 * Display for already-linked phone with status, features, and unlink option
 */
interface LinkedPhoneStatusProps {
  linkingStatus: LinkingStatus;
  isLoading: boolean;
  onClose: () => void;
  onUnlink: () => void;
}

const LinkedPhoneStatus = ({ linkingStatus, isLoading, onClose, onUnlink }: LinkedPhoneStatusProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  >
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-8 h-8 text-green-600" />
        </motion.div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          الهاتف مربوط بنجاح
        </h3>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-2 text-green-800 mb-2">
            <Smartphone className="w-5 h-5" />
            <span className="font-medium">{linkingStatus.phoneNumber}</span>
          </div>
          <div className="text-sm text-green-700">
            آخر نشاط: {linkingStatus.lastActivity?.toLocaleString('ar-EG')}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">الإشعارات</span>
            </div>
            <div className={`w-10 h-6 rounded-full transition-colors ${
              linkingStatus.notificationsEnabled ? 'bg-green-500' : 'bg-gray-300'
            }`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform mt-1 ml-1 ${
                linkingStatus.notificationsEnabled ? 'translate-x-4' : ''
              }`} />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">تنبيهات الأمان</span>
            </div>
            <div className={`w-10 h-6 rounded-full transition-colors ${
              linkingStatus.securityAlerts ? 'bg-green-500' : 'bg-gray-300'
            }`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform mt-1 ml-1 ${
                linkingStatus.securityAlerts ? 'translate-x-4' : ''
              }`} />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <motion.button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            إغلاق
          </motion.button>

          <motion.button
            onClick={onUnlink}
            disabled={isLoading}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
            whileHover={!isLoading ? { scale: 1.02 } : undefined}
            whileTap={!isLoading ? { scale: 0.98 } : undefined}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                جاري الإلغاء...
              </>
            ) : (
              'إلغاء الربط'
            )}
          </motion.button>
        </div>
      </div>
    </div>
  </motion.div>
);

/**
 * Mobile phone linking component for account security and notifications. Implements a three-step process: phone number entry, SMS verification, and success confirmation. Includes features for notifications, security alerts, and device management. Currently bypassed for development - auto-links with test number.
 */
const MobileLinking = ({ isOpen, onClose, onLinkSuccess }: MobileLinkingProps) => {
  // Current step in the linking process: phone entry, verification, or success
  const [step, setStep] = useState<'phone' | 'verify' | 'success'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Tracks whether phone is linked and what features are enabled
  const [linkingStatus, setLinkingStatus] = useState<LinkingStatus>({
    isLinked: false,
    phoneNumber: '',
    lastActivity: null,
    notificationsEnabled: false,
    securityAlerts: false,
  });

  // Development mode: Auto-link with test number and close dialog immediately
  useEffect(() => {
    if (isOpen) {
      // تم تعطيل الحماية مؤقتاً بالكامل - السماح بالوصول المباشر
      setStep('success');
      setLinkingStatus({
        isLinked: true,
        phoneNumber: '01234567890', // رقم تجريبي
        lastActivity: new Date(),
        notificationsEnabled: true,
        securityAlerts: true,
      });

      // إغلاق النافذة تلقائياً بعد ثانية واحدة للسماح بالوصول المباشر
      setTimeout(() => {
        if (onLinkSuccess) {
          onLinkSuccess('01234567890');
        }
        onClose();
      }, 100);
    }
  }, [isOpen, onLinkSuccess, onClose]);

  /**
   * Sends SMS verification code to the provided phone number. Currently simulated with 2-second delay.
   */
  const sendVerificationCode = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('يرجى إدخال رقم هاتف صحيح');
      return;
    }

    setIsLoading(true);
    try {
      // محاكاة إرسال رمز التحقق
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('تم إرسال رمز التحقق إلى هاتفك');
      setStep('verify');
    } catch (error) {
      toast.error('فشل في إرسال رمز التحقق');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Verifies the 6-digit SMS code and completes the linking process
   */
  const verifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('يرجى إدخال رمز التحقق الصحيح');
      return;
    }

    setIsLoading(true);
    try {
      // محاكاة التحقق من الرمز
      await new Promise(resolve => setTimeout(resolve, 1500));

      // تحديث حالة الربط
      const newStatus: LinkingStatus = {
        isLinked: true,
        phoneNumber,
        lastActivity: new Date(),
        notificationsEnabled: true,
        securityAlerts: true,
      };

      setLinkingStatus(newStatus);
      setStep('success');

      if (onLinkSuccess) {
        onLinkSuccess(phoneNumber);
      }

      toast.success('تم ربط الهاتف بنجاح!');
    } catch (error) {
      toast.error('رمز التحقق غير صحيح');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Removes the phone number link and disables all mobile features
   */
  const unlinkPhone = async () => {
    setIsLoading(true);
    try {
      // محاكاة إلغاء الربط
      await new Promise(resolve => setTimeout(resolve, 1000));

      setLinkingStatus({
        isLinked: false,
        phoneNumber: '',
        lastActivity: null,
        notificationsEnabled: false,
        securityAlerts: false,
      });

      toast.success('تم إلغاء ربط الهاتف');
    } catch (error) {
      toast.error('فشل في إلغاء الربط');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Resends the verification code to the same phone number
   */
  const resendCode = async () => {
    await sendVerificationCode();
  };

  // إذا كان الهاتف مربوط بالفعل
  if (linkingStatus.isLinked) {
    return <LinkedPhoneStatus linkingStatus={linkingStatus} isLoading={isLoading} onClose={onClose} onUnlink={unlinkPhone} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        {/* رأس النافذة */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            ربط الهاتف بالموقع
          </h2>
          <motion.button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AlertCircle className="w-5 h-5 text-gray-500" />
          </motion.button>
        </div>

        {step === 'phone' && <PhoneInputStep phoneNumber={phoneNumber} isLoading={isLoading} onPhoneChange={setPhoneNumber} onSubmit={sendVerificationCode} />}

        {step === 'verify' && <VerificationStep phoneNumber={phoneNumber} verificationCode={verificationCode} isLoading={isLoading} onCodeChange={setVerificationCode} onVerify={verifyCode} onResend={resendCode} />}

        {step === 'success' && <SuccessStep phoneNumber={phoneNumber} onClose={onClose} />}
      </div>
    </motion.div>
  );
};

export default MobileLinking;