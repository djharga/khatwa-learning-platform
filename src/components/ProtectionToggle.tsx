'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  ShieldOff,
  Eye,
  EyeOff,
  Key,
  Lock,
  Unlock,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ProtectionToggleProps {
  isProtected?: boolean;
  onToggleProtection?: (enabled: boolean) => void;
  className?: string;
}

const ProtectionToggle = ({
  isProtected: initialIsProtected = true,
  onToggleProtection,
  className = ""
}: ProtectionToggleProps) => {
  const [isProtected, setIsProtected] = useState(initialIsProtected);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'enable' | 'disable' | null>(null);

  // محاكاة حفظ محلي للحالة
  useEffect(() => {
    const saved = localStorage.getItem('content-protection-bypass');
    if (saved === 'true') {
      setIsProtected(false);
    }
  }, []);

  const toggleProtection = (enableProtection: boolean) => {
    setConfirmAction(enableProtection ? 'enable' : 'disable');
    setShowConfirm(true);
  };

  const confirmToggle = () => {
    const newState = confirmAction === 'enable';

    setIsProtected(newState);

    // حفظ في localStorage
    localStorage.setItem('content-protection-bypass', newState ? 'false' : 'true');

    // إشعار المستخدم
    if (newState) {
      toast.success('تم تفعيل حماية المحتوى');
    } else {
      toast.error('تم تعطيل حماية المحتوى مؤقتاً');
    }

    // استدعاء callback
    if (onToggleProtection) {
      onToggleProtection(newState);
    }

    setShowConfirm(false);
    setConfirmAction(null);
  };

  const cancelToggle = () => {
    setShowConfirm(false);
    setConfirmAction(null);
  };

  return (
    <>
      <motion.button
        onClick={() => toggleProtection(!isProtected)}
        className={`fixed bottom-6 left-6 z-40 p-3 rounded-full shadow-lg transition-all duration-300 ${
          isProtected
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-red-600 hover:bg-red-700 text-white'
        } ${className}`}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: isProtected ? 0 : 180,
        }}
        transition={{ duration: 0.3 }}
      >
        {isProtected ? <Shield className="w-5 h-5" /> : <ShieldOff className="w-5 h-5" />}
      </motion.button>

      {/* نافذة التأكيد */}
      {showConfirm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  confirmAction === 'enable'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {confirmAction === 'enable' ? (
                  <Shield className="w-8 h-8" />
                ) : (
                  <ShieldOff className="w-8 h-8" />
                )}
              </motion.div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {confirmAction === 'enable'
                  ? 'تفعيل حماية المحتوى'
                  : 'تعطيل حماية المحتوى'
                }
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {confirmAction === 'enable'
                  ? 'سيتم تفعيل جميع إجراءات حماية المحتوى (النقر اليمين، السحب والإفلات، نسخ الصور، أدوات التطوير، لقطات الشاشة). هل أنت متأكد؟'
                  : 'سيتم تعطيل حماية المحتوى مؤقتاً مما يسمح بالنسخ والطباعة والتقاط شاشة. هذا الإعداد محلي ولا يؤثر على الآخرين. هل أنت متأكد؟'
                }
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    {confirmAction === 'enable' ? (
                      <>
                        <Lock className="w-4 h-4 text-green-600" />
                        <span className="text-green-700">سيتم تفعيل:</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4 text-red-600" />
                        <span className="text-red-700">سيتم تعطيل:</span>
                      </>
                    )}
                  </div>
                  {confirmAction === 'enable' ? (
                    <ul className="text-xs text-green-600 mt-2 space-y-1">
                      <li>• النقر اليميني</li>
                      <li>• السحب والإفلات</li>
                      <li>• تسخ الصور</li>
                      <li>• أدوات التطوير</li>
                      <li>• لقطات الشاشة</li>
                    </ul>
                  ) : (
                    <ul className="text-xs text-red-600 mt-2 space-y-1">
                      <li>• إمكانية النسخ</li>
                      <li>• الطباعة الحرة</li>
                      <li>• التقاط الشاشة</li>
                      <li>• التحديد الكامل</li>
                      <li>• عرض مصدر الصفحة</li>
                    </ul>
                  )}
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Key className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-700">ملاحظة:</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">
                    {confirmAction === 'enable'
                      ? 'هذا الإعداد ينطبق بشكل عام على الموقع'
                      : 'التعطيل محلي فقط ويتأثر بإعادة التحميل'
                    }
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  onClick={cancelToggle}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  إلغاء
                </motion.button>

                <motion.button
                  onClick={confirmToggle}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                    confirmAction === 'enable'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {confirmAction === 'enable' ? 'تفعيل' : 'تعطيل'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ProtectionToggle;
