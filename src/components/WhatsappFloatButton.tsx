'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsappFloatButton = () => {
  const whatsappNumber = '+966501234567';
  const message = 'مرحباً، أريد الاستفسار عن خدمات خطى للتدريب والاستشارات';

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full transition-all duration-200 group"
      style={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)'
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.15)'
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
        delay: 0.5
      }}
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="w-6 h-6" strokeWidth={2} />

      {/* أداة التلميح */}
      <div
        className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
      >
        تواصل معنا عبر واتساب
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
      </div>
    </motion.button>
  );
};

export default WhatsappFloatButton;
