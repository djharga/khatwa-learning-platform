'use client';

import React, { useState } from 'react';

const AuditorsFellowshipPage = () => {
  const [activePart, setActivePart] = useState<1 | 2 | 3>(1);

  // بيانات بسيطة للاختبار
  const fellowshipParts = [
    { id: 1, title: 'الجزء الأول' },
    { id: 2, title: 'الجزء الثاني' },
    { id: 3, title: 'الجزء الثالث' }
  ];

  const currentPart = fellowshipParts.find(part => part.id === activePart);

  return (
    <div className="relative">
      <h1>اختبار بسيط</h1>
      {currentPart && <h2>{currentPart.title}</h2>}
    </div>
  );
};

export default AuditorsFellowshipPage;
