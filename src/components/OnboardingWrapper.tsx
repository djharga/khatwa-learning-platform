'use client';

import React from 'react';
import { useOnboarding } from '../hooks/useOnboarding';
import OnboardingChallenge from './OnboardingChallenge';

/**
 * Wrapper component that handles onboarding challenge
 * Only renders children after challenge is completed
 */
interface OnboardingWrapperProps {
  children: React.ReactNode;
}

const OnboardingWrapper: React.FC<OnboardingWrapperProps> = ({ children }) => {
  const { showChallenge, completeChallenge } = useOnboarding();

  const handleComplete = () => {
    completeChallenge();
  };

  return (
    <>
      {/* Onboarding Challenge Modal */}
      <OnboardingChallenge
        isOpen={showChallenge}
        onComplete={handleComplete}
      />
      
      {/* Main App Content - Only shown after challenge completion */}
      {!showChallenge && children}
    </>
  );
};

export default OnboardingWrapper;
