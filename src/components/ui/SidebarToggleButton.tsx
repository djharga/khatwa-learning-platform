'use client';

import { motion } from 'framer-motion';
import { PanelLeft, X, Sidebar } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SidebarToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  variant?: 'default' | 'floating' | 'inline';
}

export default function SidebarToggleButton({
  isOpen,
  onClick,
  className = '',
  variant = 'floating',
}: SidebarToggleButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  // زر عائم في أقصى اليمين (الافتراضي) - تصميم احترافي محسّن
  if (variant === 'floating') {
    return (
      <motion.button
        onClick={onClick}
        className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 ${className}`}
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8, y: -20 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.1, y: -1 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        transition={prefersReducedMotion ? { duration: 0 } : { 
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
        aria-label={isOpen ? 'إغلاق القائمة الجانبية' : 'فتح القائمة الجانبية'}
      >
        <div className="relative group">
          {/* حلقة خارجية متوهجة - Pulse Effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.3, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: 'easeInOut',
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 blur-md" />
          </motion.div>

          {/* خلفية متوهجة متعددة الطبقات - أصغر */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
          <div className="absolute -inset-0.5 bg-gradient-to-br from-primary-400/20 via-primary-500/20 to-primary-600/20 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
          
          {/* الزر الرئيسي - Glassmorphism Design - حجم أصغر */}
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 shadow-xl shadow-primary-500/40 flex items-center justify-center group-hover:shadow-primary-500/60 transition-all duration-500 backdrop-blur-sm border border-white/10 group-hover:border-white/20 overflow-hidden">
            {/* خلفية داخلية متدرجة */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 rounded-xl" />
            
            {/* تأثير لامع متحرك محسّن */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={prefersReducedMotion ? {} : {
                background: [
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
                  'linear-gradient(270deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
                ],
                backgroundPosition: ['0% 50%', '100% 50%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: 'linear',
              }}
            />

            {/* أيقونة متطورة - PanelLeft بدلاً من Menu */}
            <motion.div
              animate={isOpen ? { 
                rotate: 180,
                scale: [1, 1.1, 1]
              } : { 
                rotate: 0,
                scale: 1
              }}
              transition={prefersReducedMotion ? { duration: 0 } : { 
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="relative z-10"
            >
              <motion.div
                animate={prefersReducedMotion ? {} : {
                  filter: isOpen ? 'drop-shadow(0 0 6px rgba(255,255,255,0.7))' : 'drop-shadow(0 0 3px rgba(255,255,255,0.4))',
                }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-white" strokeWidth={2.5} />
                ) : (
                  <PanelLeft className="w-5 h-5 text-white" strokeWidth={2.5} />
                )}
              </motion.div>
            </motion.div>

            {/* نقاط زخرفية في الزوايا */}
            <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white/40 rounded-full blur-sm" />
            <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-white/30 rounded-full blur-sm" />
          </div>
          
          {/* حلقة خارجية متحركة - Orbit Effect - أصغر */}
          <div className="absolute -inset-2 flex items-center justify-center pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary-400 rounded-full"
                style={{
                  transform: `rotate(${i * 90}deg) translateY(-28px)`,
                }}
                animate={prefersReducedMotion ? {} : {
                  opacity: [0.2, 0.5, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Tooltip - تلميح عند hover */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute left-full ml-4 px-3 py-1.5 bg-neutral-900/90 dark:bg-neutral-100/90 text-white dark:text-neutral-900 text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none backdrop-blur-sm border border-white/10 shadow-xl"
          >
            {isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-r-4 border-r-neutral-900/90 dark:border-r-neutral-100/90 border-b-4 border-b-transparent" />
          </motion.div>
        </div>
      </motion.button>
    );
  }

  // زر مضمن في الصفحة - تصميم محسّن
  if (variant === 'inline') {
    return (
      <motion.button
        onClick={onClick}
        className={`inline-flex items-center justify-center p-2.5 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 border border-white/10 hover:border-white/20 ${className}`}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -1 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        aria-label={isOpen ? 'إغلاق القائمة الجانبية' : 'فتح القائمة الجانبية'}
      >
        <motion.div
          animate={isOpen ? { rotate: 180, scale: [1, 1.1, 1] } : { rotate: 0, scale: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { 
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="relative"
        >
          {isOpen ? (
            <X className="w-5 h-5" strokeWidth={2.5} />
          ) : (
            <PanelLeft className="w-5 h-5" strokeWidth={2.5} />
          )}
        </motion.div>
      </motion.button>
    );
  }

  // الزر الافتراضي (في الزاوية) - تصميم محسّن
  return (
    <motion.button
      onClick={onClick}
      className={`fixed start-6 top-20 z-50 ${className}`}
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.1, y: -2 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
      transition={prefersReducedMotion ? { duration: 0 } : { 
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      aria-label={isOpen ? 'إغلاق القائمة الجانبية' : 'فتح القائمة الجانبية'}
    >
      <div className="relative group">
        {/* خلفية متوهجة متعددة الطبقات */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-full blur-xl opacity-40"
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: 'easeInOut',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
        
        {/* الزر الرئيسي - حجم أصغر */}
        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 shadow-xl shadow-primary-500/40 flex items-center justify-center group-hover:shadow-primary-500/60 transition-all duration-500 backdrop-blur-sm border border-white/10 group-hover:border-white/20 overflow-hidden">
          {/* خلفية داخلية */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 rounded-xl" />
          
          {/* تأثير لامع متحرك */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            animate={prefersReducedMotion ? {} : {
              background: [
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
                'linear-gradient(270deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: 'linear',
            }}
          />

          <motion.div
            animate={isOpen ? { 
              rotate: 180,
              scale: [1, 1.1, 1]
            } : { 
              rotate: 0,
              scale: 1
            }}
            transition={prefersReducedMotion ? { duration: 0 } : { 
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="relative z-10"
          >
            <motion.div
              animate={prefersReducedMotion ? {} : {
                filter: isOpen ? 'drop-shadow(0 0 5px rgba(255,255,255,0.6))' : 'drop-shadow(0 0 3px rgba(255,255,255,0.3))',
              }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X className="w-5 h-5 text-white" strokeWidth={2.5} />
              ) : (
                <PanelLeft className="w-5 h-5 text-white" strokeWidth={2.5} />
              )}
            </motion.div>
          </motion.div>

          {/* نقاط زخرفية */}
          <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white/40 rounded-full blur-sm" />
          <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-white/30 rounded-full blur-sm" />
        </div>
      </div>
    </motion.button>
  );
}

