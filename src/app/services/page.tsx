'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Packages from '@/components/services/Packages';
import ConsultingComponent from '@/components/ConsultingComponent';

function ServicesContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'consulting' | 'packages') || 'consulting';
  const [tab, setTab] = useState<'consulting' | 'packages'>(initialTab);

  useEffect(() => {
    const current = (searchParams.get('tab') as 'consulting' | 'packages') || 'consulting';
    setTab(current);
  }, [searchParams]);

  function changeTab(next: 'consulting' | 'packages') {
    setTab(next);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', next);
    window.history.replaceState({}, '', url.toString());
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">الخدمات</h1>
          <p className="text-gray-600">دمج الاستشارات والباقات في مكان واحد</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-2xl p-2 shadow-md border border-gray-100 inline-flex gap-2">
            {[
              { id: 'consulting', label: 'الاستشارات' },
              { id: 'packages', label: 'الباقات' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => changeTab(t.id as any)}
                className={`px-5 py-3 rounded-xl font-semibold transition-all ${
                  tab === t.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow'
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
          {tab === 'consulting' && (
            <div className="flex flex-col">
              <div className="p-4 text-sm text-gray-600">محتوى الاستشارات مدمج مباشرة هنا.</div>
              <div className="border-t">
                <ConsultingComponent />
              </div>
            </div>
          )}
          {tab === 'packages' && (
            <div className="flex flex-col">
              <div className="p-4 text-sm text-gray-600">
                هذا المحتوى تم نقله من صفحة الباقات السابقة.
              </div>
              <Packages />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function ServicesHubPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 py-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}
