'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ReviewHubPage() {
  const [tab, setTab] = useState<'questions' | 'exams' | 'progress'>('questions');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">مركز المراجعة الموحد</h1>
          <p className="text-gray-600">كل ما يخص المراجعة في شاشة واحدة</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-2xl p-2 shadow-md border border-gray-100 inline-flex gap-2">
            {[
              { id: 'questions', label: 'بنك الأسئلة' },
              { id: 'exams', label: 'الامتحانات' },
              { id: 'progress', label: 'التقدم والشهادات' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                className={`px-5 py-3 rounded-xl font-semibold transition-all ${
                  tab === t.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow'
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
          {tab === 'questions' && (
            <div className="flex flex-col">
              <div className="p-4 text-sm text-gray-600">
                للوصول المباشر: <Link href="/question-bank" className="text-blue-600 hover:underline">/question-bank</Link>
              </div>
              <iframe
                src="/question-bank"
                className="w-full min-h-[80vh] border-t"
                loading="eager"
              />
            </div>
          )}
          {tab === 'exams' && (
            <div className="flex flex-col">
              <div className="p-4 text-sm text-gray-600">
                للوصول المباشر: <Link href="/student/exam" className="text-blue-600 hover:underline">/student/exam</Link>
              </div>
              <iframe
                src="/student/exam"
                className="w-full min-h-[80vh] border-t"
                loading="eager"
              />
            </div>
          )}
          {tab === 'progress' && (
            <div className="flex flex-col">
              <div className="p-4 text-sm text-gray-600">
                للوصول المباشر: <Link href="/student/progress" className="text-blue-600 hover:underline">/student/progress</Link>
              </div>
              <iframe
                src="/student/progress"
                className="w-full min-h-[80vh] border-t"
                loading="eager"
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
