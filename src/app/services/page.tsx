'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Packages from '@/components/services/Packages';
import ConsultingComponent from '@/components/ConsultingComponent';
import PageBackground from '@/components/ui/PageBackground';

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
    <PageBackground variant="home">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">الخدمات</h1>
          <p className="text-gray-600">دمج الاستشارات والباقات في مكان واحد</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl p-1.5 shadow-xl border border-gray-200/50 dark:border-neutral-700/50 inline-flex gap-2">
            {[
              { id: 'consulting', label: 'الاستشارات' },
              { id: 'packages', label: 'الباقات' },
            ].map((t) => (
              <motion.button
                key={t.id}
                onClick={(e) => {
                  e.preventDefault();
                  changeTab(t.id as 'consulting' | 'packages');
                }}
                className={`relative px-8 py-3.5 rounded-xl font-bold text-base transition-all duration-300 ${
                  tab === t.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{t.label}</span>
                {tab === t.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 dark:border-neutral-700/50 overflow-hidden"
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
    </PageBackground>
  );
}

export default function ServicesHubPage() {
  return (
    <Suspense fallback={
      <PageBackground variant="home">
        <div className="py-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">جاري التحميل...</p>
          </div>
        </div>
      </PageBackground>
    }>
      <ServicesContent />
    </Suspense>
  );
}
