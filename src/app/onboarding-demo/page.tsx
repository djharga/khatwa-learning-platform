'use client';

import React, { useState } from 'react';
import OnboardingChallenge from '../../components/OnboardingChallenge';

/**
 * Demo page to showcase the onboarding challenge
 * Allows testing the challenge without affecting the main app
 */
const OnboardingDemo = () => {
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  const handleComplete = () => {
    setChallengeCompleted(true);
    setShowChallenge(false);
  };

  const resetDemo = () => {
    setChallengeCompleted(false);
    setShowChallenge(false);
  };

  return (
    <div className="min-h-screen bg-brutalist-concrete flex items-center justify-center">
      {/* Test Button - Only for demo */}
      <div className="fixed top-4 left-4">
        <button
          onClick={() => {
            localStorage.removeItem('onboarding-completed');
            window.location.reload();
          }}
          className="bg-red-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-red-700 transition-colors"
        >
          إعادة تشغيل
        </button>
      </div>

      <div className="text-center space-y-8">
        <h1 className="text-4xl font-black text-brutalist-steel mb-8">
          عرض توضيحي لتحدي الدخول
        </h1>
        
        {!challengeCompleted ? (
          <div className="space-y-4">
            <p className="text-brutalist-steel text-lg">
              اضغط على الزر أدناه لتجربة تحدي الدخول.
            </p>
            <button
              onClick={() => setShowChallenge(true)}
              className="px-8 py-4 bg-brutalist-power text-brutalist-pure font-black border-4 border-brutalist-steel shadow-brutalist-lg hover:shadow-brutalist-xl transition-all"
            >
              بدء التحدي
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-2xl font-bold text-brutalist-power">
              ✓ تم إكمال التحدي
            </div>
            <p className="text-brutalist-steel">
              لقد أثبتت أنك جدير بالثقة.
            </p>
            <button
              onClick={resetDemo}
              className="px-6 py-3 bg-brutalist-steel text-brutalist-pure font-bold border-2 border-brutalist-power hover:bg-brutalist-power hover:text-brutalist-steel transition-all"
            >
              إعادة التشغيل
            </button>
          </div>
        )}
      </div>

      {/* Onboarding Challenge Modal */}
      <OnboardingChallenge
        isOpen={showChallenge}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default OnboardingDemo;
