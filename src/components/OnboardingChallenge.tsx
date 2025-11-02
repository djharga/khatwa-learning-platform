'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Onboarding Challenge Modal - Brutalist Elegance
 * A single, full-screen modal that challenges users to prove themselves
 * No welcome mat, no tours, no excuses - just pure commitment
 */
interface OnboardingChallengeProps {
  isOpen: boolean;
  onComplete: () => void;
}

const OnboardingChallenge: React.FC<OnboardingChallengeProps> = ({ isOpen, onComplete }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsRevealed(false);
      setButtonPressed(false);
      setCountdown(3);
    }
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    if (isOpen && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, countdown]);


  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-brutalist-steel"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Brutalist Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-brutalist-concrete/20"></div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            className="text-center max-w-4xl mx-auto px-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Welcome Text */}
            <motion.h1
              className="text-brutalist-pure text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              مرحباً بك
              <br />
              <span className="text-brutalist-power">في منصة خطى</span>
            </motion.h1>

            {/* Welcome Subtitle */}
            <motion.p
              className="text-brutalist-concrete text-xl md:text-2xl font-medium mb-8 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              منصة التعليم المتقدم التي ستساعدك في رحلتك نحو التميز والنجاح
            </motion.p>

            {/* Countdown Timer */}
            <motion.div
              className="text-brutalist-power text-6xl font-black mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {countdown}
            </motion.div>

            {/* Auto-hide message */}
            <motion.p
              className="text-brutalist-concrete text-lg mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              ستختفي هذه الشاشة تلقائياً خلال {countdown} ثانية
            </motion.p>


          </motion.div>
        </div>

        {/* Brutalist Corner Accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-4 border-brutalist-power"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-4 border-brutalist-power"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-4 border-brutalist-power"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-4 border-brutalist-power"></div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingChallenge;
