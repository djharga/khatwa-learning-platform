'use client';

import { JSX, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Star, Crown, Building, Check, CreditCard, Smartphone, ArrowRight, X, Award, Calendar, Clock, DollarSign
} from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  desc: string;
  price: number;
  yearly: number;
  features: string[];
  color: string;
  icon: JSX.Element;
  highlight?: boolean;
}

export default function Packages() {
  const [cycle, setCycle] = useState<'m' | 'y'>('m');
  const [showPay, setShowPay] = useState(false);
  const [selected, setSelected] = useState<Plan | null>(null);

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'مجانية',
      desc: 'ابدأ مجاناً وتعرّف على المنصة',
      price: 0,
      yearly: 0,
      color: 'green',
      icon: <User className="w-6 h-6" />,
      features: ['وصول محدود', 'محتوى تعريفي', 'بدون شهادة', 'دعم بسيط'],
    },
    {
      id: 'basic',
      name: 'أساسية',
      desc: 'مناسبة للبداية في المحاسبة والمراجعة',
      price: 50,
      yearly: 425,
      color: 'blue',
      icon: <Star className="w-6 h-6" />,
      features: ['دورتان شهرياً', 'شهادة حضور', 'دعم عبر البريد', '2 جيجا تخزين'],
    },
    {
      id: 'pro',
      name: 'احترافية',
      desc: 'للمهنيين والخبراء في المجال',
      price: 100,
      yearly: 850,
      color: 'purple',
      icon: <Crown className="w-6 h-6" />,
      features: ['كل الدورات', 'شهادات معتمدة', 'خصومات استشارات', 'دعم مباشر', '5 جيجا تخزين'],
      highlight: true,
    },
    {
      id: 'corp',
      name: 'شركات',
      desc: 'للمؤسسات والشركات متعددة المستخدمين',
      price: 300,
      yearly: 2550,
      color: 'orange',
      icon: <Building className="w-6 h-6" />,
      features: ['حتى 15 موظف', 'ورش عمل شهرية', 'تقارير تحليلية', 'استشارات ربع سنوية'],
    },
  ];

  const handlePay = (plan: Plan) => {
    setSelected(plan);
    setShowPay(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8"
        >
          اختر الباقة المناسبة لك
        </motion.h1>

        {/* Cycle Switch */}
        <div className="flex justify-center mb-10">
          <div className="bg-white dark:bg-gray-900 border rounded-full shadow-sm flex p-1">
            {['m', 'y'].map((c) => (
              <button
                key={c}
                onClick={() => setCycle(c as 'm' | 'y')}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                  cycle === c
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                {c === 'm' ? 'شهري' : 'سنوي'}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl border shadow-sm bg-white dark:bg-gray-900 p-6 relative transition-all ${
                p.highlight
                  ? 'border-purple-500 ring-1 ring-purple-400 shadow-lg scale-[1.03]'
                  : 'border-gray-200 dark:border-gray-700 hover:shadow-md'
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs">
                  الأكثر اختيارًا
                </div>
              )}
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${
                  p.color === 'blue'
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                    : p.color === 'purple'
                    ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30'
                    : p.color === 'green'
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/30'
                    : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30'
                }`}
              >
                {p.icon}
              </div>
              <h3 className="text-xl font-semibold mb-1">{p.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{p.desc}</p>
              <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                {p.price === 0 ? 'مجاني' : `$${cycle === 'm' ? p.price : p.yearly}`}
              </div>
              <p className="text-sm text-gray-500 mb-4">
                {p.price === 0 ? 'مدى الحياة' : cycle === 'm' ? 'شهرياً' : 'سنوياً'}
              </p>

              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handlePay(p)}
                className={`w-full py-2.5 rounded-lg font-semibold text-sm ${
                  p.highlight
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : p.id === 'free'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-800 text-white hover:bg-gray-900'
                }`}
              >
                {p.price === 0 ? 'ابدأ مجاناً' : 'اشترك الآن'}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Certificates Section */}
        <div className="mt-20 bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border">
          <div className="text-center">
            <Award className="w-12 h-12 mx-auto text-yellow-500 mb-3" />
            <h2 className="text-2xl font-bold mb-2">ساعات معتمدة وشهادات</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              احصل على شهادات معتمدة وساعات تعليم مهني رسمية
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold">
              احصل على الشهادة بـ 5 دولار
            </button>
          </div>
        </div>

        {/* Consulting Section */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Clock className="w-6 h-6" />,
              title: 'استشارة فردية',
              price: '50$/ساعة',
              color: 'blue',
            },
            {
              icon: <Calendar className="w-6 h-6" />,
              title: 'استشارة شهرية',
              price: '500$/5س',
              color: 'green',
            },
            {
              icon: <Building className="w-6 h-6" />,
              title: 'استشارات الشركات',
              price: '1000$/10س',
              color: 'purple',
            },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 border rounded-xl p-6 shadow-sm hover:shadow-md text-center transition-all"
            >
              <div
                className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  s.color === 'blue'
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                    : s.color === 'green'
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/30'
                    : 'bg-purple-100 text-purple-600 dark:bg-purple-900/30'
                }`}
              >
                {s.icon}
              </div>
              <h3 className="font-bold mb-1">{s.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{s.price}</p>
              <button
                className={`px-4 py-2 text-sm rounded-lg font-medium text-white ${
                  s.color === 'blue'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : s.color === 'green'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                احجز الآن
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPay && selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">الدفع</h3>
                <button onClick={() => setShowPay(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <p className="text-sm mb-2 text-gray-600 dark:text-gray-400">
                الباقة: <span className="font-semibold">{selected.name}</span>
              </p>
              <p className="font-bold text-lg mb-4">
                المبلغ: ${cycle === 'm' ? selected.price : selected.yearly}
              </p>

              <div className="space-y-4">
                <div className="border p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-4 h-4" /> بطاقة ائتمانية
                  </div>
                  <input placeholder="رقم البطاقة" className="w-full p-2 border rounded mb-2" />
                  <div className="grid grid-cols-2 gap-2">
                    <input placeholder="MM/YY" className="p-2 border rounded" />
                    <input placeholder="CVV" className="p-2 border rounded" />
                  </div>
                </div>

                <button
                  onClick={() => alert('تم الدفع بنجاح')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
                >
                  إتمام الدفع
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
