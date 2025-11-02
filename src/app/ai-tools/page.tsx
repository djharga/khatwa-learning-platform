'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AIToolsHubPage() {
  const [tab, setTab] = useState<'advanced' | 'recommendations'>('advanced');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">أدوات الذكاء الاصطناعي</h1>
          <p className="text-gray-600">الأدوات الأساسية في شاشة واحدة مع الوصول للأدوات المتقدمة</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-2xl p-2 shadow-md border border-gray-100 inline-flex gap-2">
            {[
              { id: 'advanced', label: 'الميزات المتقدمة' },
              { id: 'recommendations', label: 'توصيات ذكية' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                className={`px-5 py-3 rounded-xl font-semibold transition-all ${
                  tab === t.id
                    ? 'bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {tab === 'advanced' && (
            <div className="flex flex-col">
              <div className="p-4 text-sm text-gray-600">
                للوصول المباشر: <Link href="/advanced-features" className="text-blue-600 hover:underline">/advanced-features</Link>
              </div>
              <iframe
                src="/advanced-features"
                className="w-full min-h-[80vh] border-t"
                loading="eager"
              />
            </div>
          )}

          {tab === 'recommendations' && (
            <div className="p-8">
              <p className="text-gray-700 mb-4">هذه مساحة للأدوات الأساسية داخل الصفحة الرئيسية أو توصيات التعلم الذكية.</p>
              <p className="text-gray-600">يمكن لاحقاً تضمين المكونات الأساسية مباشرة هنا إذا رغبت.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
