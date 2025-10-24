import { useState, useEffect } from 'react';

/**
 * Hook to manage onboarding challenge state
 * Determines if user needs to complete the challenge
 */
export const useOnboarding = () => {
  const [showChallenge, setShowChallenge] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Check if user has completed the challenge
    const hasCompletedChallenge = localStorage.getItem('onboarding-completed');
    
    if (!hasCompletedChallenge) {
      setShowChallenge(true);
      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        completeChallenge();
      }, 3000);
      
      return () => clearTimeout(timer);
    } else {
      setIsCompleted(true);
    }
  }, []);

  const completeChallenge = () => {
    localStorage.setItem('onboarding-completed', 'true');
    setShowChallenge(false);
    setIsCompleted(true);
  };

  const resetChallenge = () => {
    localStorage.removeItem('onboarding-completed');
    setShowChallenge(true);
    setIsCompleted(false);
  };

  return {
    showChallenge,
    isCompleted,
    completeChallenge,
    resetChallenge,
  };
};
