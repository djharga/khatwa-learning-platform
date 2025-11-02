import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Heart, BarChart3 } from 'lucide-react';

/**
 * Props for the QuickActionButtons component.
 * @interface QuickActionButtonsProps
 * @property {boolean} isVisible - Whether buttons should be visible
 * @property {boolean} isWishlisted - Wishlist state
 * @property {boolean} isCompared - Compare state
 * @property {(e: React.MouseEvent) => void} onPreview - Preview handler
 * @property {(e: React.MouseEvent) => void} onWishlist - Wishlist handler
 * @property {(e: React.MouseEvent) => void} onCompare - Compare handler
 * @property {string} [className] - Optional additional CSS classes
 */
export interface QuickActionButtonsProps {
  isVisible: boolean;
  isWishlisted: boolean;
  isCompared: boolean;
  onPreview: (e: React.MouseEvent) => void;
  onWishlist: (e: React.MouseEvent) => void;
  onCompare: (e: React.MouseEvent) => void;
  className?: string;
}

/**
 * Quick action buttons overlay for course cards. Displays preview, wishlist, and compare buttons with animated entrance and hover effects. Buttons show active state with color changes.
 * @param props - The props for the component
 * @returns The QuickActionButtons component
 * @example
 * ```tsx
 * <QuickActionButtons
 *   isVisible={isHovered}
 *   isWishlisted={isWishlisted}
 *   isCompared={isCompared}
 *   onPreview={handlePreview}
 *   onWishlist={handleWishlist}
 *   onCompare={handleCompare}
 * />
 * ```
 */
const QuickActionButtons: React.FC<QuickActionButtonsProps> = ({
  isVisible,
  isWishlisted,
  isCompared,
  onPreview,
  onWishlist,
  onCompare,
  className = '',
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${className}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <motion.button
            className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg shadow-gray-500/20 border border-white/20 dark:border-gray-700/20 hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={onPreview}
            aria-label="معاينة الدورة"
          >
            <Eye className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </motion.button>
          <motion.button
            className={`p-2 rounded-full shadow-lg shadow-gray-500/20 border border-white/20 dark:border-gray-700/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 ${
              isWishlisted
                ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40'
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={onWishlist}
            aria-label={isWishlisted ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </motion.button>
          <motion.button
            className={`p-2 rounded-full shadow-lg shadow-gray-500/20 border border-white/20 dark:border-gray-700/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
              isCompared
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40'
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={onCompare}
            aria-label={isCompared ? "إزالة من المقارنة" : "إضافة إلى المقارنة"}
          >
            <BarChart3 className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickActionButtons;