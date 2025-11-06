'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, CreditCard, Play, Lock, Clock, BookOpen, Users, Shield, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface StickyCheckoutProps {
  price: number;
  originalPrice?: number;
  discount?: {
    percentage: number;
    expiresAt?: string;
  };
  hasAccess: boolean;
  onEnroll?: () => void;
  onPurchase?: () => void;
  onStartLearning?: () => void;
  duration?: string;
  lessons?: number;
  students?: number;
  courseId: string;
}

export default function StickyCheckout({
  price,
  originalPrice,
  discount,
  hasAccess,
  onEnroll,
  onPurchase,
  onStartLearning,
  duration,
  lessons,
  students,
  courseId,
}: StickyCheckoutProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (discount?.expiresAt) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const expiry = new Date(discount.expiresAt!).getTime();
        const diff = expiry - now;

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeRemaining(`${hours}س ${minutes}د`);
        } else {
          setTimeRemaining('');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [discount]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden lg:block"
      >
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 sticky top-8 border border-gray-200 dark:border-neutral-700">
          {/* Price */}
          <div className="text-center mb-6 pb-6 border-b border-gray-200 dark:border-neutral-700">
            {originalPrice && originalPrice > price && (
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-lg text-gray-500 line-through">{formatPrice(originalPrice)}</span>
                {discount && (
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-semibold">
                    خصم {discount.percentage}%
                  </span>
                )}
              </div>
            )}
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {price === 0 ? 'مجاني' : formatPrice(price)}
            </div>
            {discount?.expiresAt && timeRemaining && (
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                ⏰ ينتهي العرض خلال: {timeRemaining}
              </div>
            )}
          </div>

          {/* CTAs */}
          {hasAccess ? (
            <button
              onClick={onStartLearning}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all hover:shadow-lg mb-4"
            >
              <Play className="w-5 h-5" />
              <span>ابدأ التعلم الآن</span>
            </button>
          ) : (
            <>
              <Link
                href="/packages-and-consulting?tab=packages"
                className="block w-full mb-4"
              >
                <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all hover:shadow-lg">
                  <CreditCard className="w-5 h-5" />
                  <span>اشترك للوصول لكل الدورات</span>
                </button>
              </Link>
              {price > 0 && (
                <button
                  onClick={onPurchase}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all hover:shadow-lg mb-4"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>شراء هذا الكورس</span>
                </button>
              )}
            </>
          )}

          {/* Course Info */}
          <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-neutral-700">
            {duration && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  المدة
                </span>
                <span className="font-semibold">{duration}</span>
              </div>
            )}
            {lessons && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  الدروس
                </span>
                <span className="font-semibold">{lessons}</span>
              </div>
            )}
            {students && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  الطلاب
                </span>
                <span className="font-semibold">{students.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Trust Badges */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-neutral-700 space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Shield className="w-4 h-4 text-green-600" />
              <span>ضمان استرجاع الأموال خلال 30 يوم</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>دفع آمن ومشفّر</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              <span>وصول مدى الحياة</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Sticky Bottom Bar */}
      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-neutral-800 border-t border-gray-200 dark:border-neutral-700 shadow-2xl"
          >
            <div className="px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  {originalPrice && originalPrice > price && (
                    <div className="text-xs text-gray-500 line-through mb-1">
                      {formatPrice(originalPrice)}
                    </div>
                  )}
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {price === 0 ? 'مجاني' : formatPrice(price)}
                  </div>
                </div>
                {hasAccess ? (
                  <button
                    onClick={onStartLearning}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold"
                  >
                    <Play className="w-5 h-5" />
                    <span>ابدأ التعلم</span>
                  </button>
                ) : (
                  <button
                    onClick={onPurchase}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>شراء الآن</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

