'use client';

import React, { useState } from 'react';

const AuditorsFellowshipPage = () => {
  const [activePart, setActivePart] = useState<1 | 2 | 3>(1);

  // بيانات بسيطة للاختبار
  const fellowshipParts = [
    {
      id: 1,
      title: 'الجزء الأول: الأساسيات',
      description: 'مقدمة شاملة في أساسيات المراجعة الداخلية',
      files: [],
      podcasts: []
    },
    {
      id: 2,
      title: 'الجزء الثاني: المهارات العملية',
      description: 'تطوير المهارات العملية في المراجعة الداخلية',
      files: [],
      podcasts: []
    },
    {
      id: 3,
      title: 'الجزء الثالث: التطوير المهني',
      description: 'استراتيجيات التطوير المهني المستمر',
      files: [],
      podcasts: []
    }
  ];

  const currentPart = fellowshipParts.find(part => part.id === activePart);

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">المراجعين الداخليين</h1>

        {currentPart && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-4">{currentPart.title}</h2>
            <p className="text-gray-600 mb-6">{currentPart.description}</p>

            {/* أزرار الأجزاء */}
            <div className="flex justify-center gap-4 mb-8">
              {[1, 2, 3].map((part) => (
                <button
                  key={part}
                  onClick={() => setActivePart(part as 1 | 2 | 3)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    activePart === part
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  الجزء {part}
                </button>
              ))}
            </div>

            <div className="text-center text-gray-500">
              <p>المحتوى قيد التطوير...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditorsFellowshipPage;