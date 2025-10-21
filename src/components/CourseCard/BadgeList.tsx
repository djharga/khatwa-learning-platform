import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Gift } from 'lucide-react';

/**
 * Props for the BadgeList component
 */
export interface BadgeListProps {
  /** Show "جديد" badge */
  isNew: boolean;
  /** Show "شائع" badge */
  isPopular: boolean;
  /** Show "شهادة" badge */
  hasCertificate: boolean;
  /** Show "الأكثر مبيعاً" badge */
  isBestseller: boolean;
  /** Show "عرض محدود" badge */
  isLimitedTime: boolean;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Displays animated status badges for course cards including new, popular, certificate, bestseller, and limited-time indicators. Uses AnimatePresence for smooth enter/exit animations with staggered delays.
 *
 * @param props - The props for the BadgeList component
 * @returns The BadgeList component
 *
 * @example
 * ```tsx
 * <BadgeList
 *   isNew={true}
 *   isPopular={false}
 *   hasCertificate={true}
 *   isBestseller={false}
 *   isLimitedTime={true}
 * />
 * ```
 */
const BadgeList = ({
  isNew,
  isPopular,
  hasCertificate,
  isBestseller,
  isLimitedTime,
  className = '',
}: BadgeListProps) => {
  return (
    <div className={`absolute top-3 left-3 flex flex-col gap-2 ${className}`}>
      <AnimatePresence>
        {isNew && (
          <motion.span
            className="bg-white/90 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20"
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            ✨ جديد
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isPopular && (
          <motion.span
            className="bg-white/90 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20"
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            🔥 شائع
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {hasCertificate && (
          <motion.span
            className="bg-white/90 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20"
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            🏆 شهادة
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isBestseller && (
          <motion.span
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20"
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Zap className="w-3 h-3 inline mr-1" />
            الأكثر مبيعاً
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isLimitedTime && (
          <motion.span
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20"
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Gift className="w-3 h-3 inline mr-1" />
            عرض محدود
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BadgeList;