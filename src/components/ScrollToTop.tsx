'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="group fixed bottom-8 left-8 z-50 p-5 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 focus:ring-4 focus:ring-purple-300 focus:ring-offset-2 backdrop-blur-sm border border-white/20 overflow-hidden"
          aria-label="العودة إلى أعلى الصفحة"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <ArrowUp
            className="relative w-7 h-7 transition-transform duration-300 group-hover:-translate-y-1"
            aria-hidden="true"
          />
          <span className="sr-only">العودة إلى أعلى الصفحة</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
