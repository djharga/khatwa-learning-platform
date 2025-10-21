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
            className="p-2 bg-white/90 rounded-full shadow-lg border border-white/20 hover:bg-white transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPreview}
          >
            <Eye className="w-4 h-4 text-gray-700" />
          </motion.button>
          <motion.button
            className={`p-2 rounded-full shadow-lg border border-white/20 transition-all duration-200 ${
              isWishlisted
                ? 'bg-red-50 text-red-600'
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onWishlist}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </motion.button>
          <motion.button
            className={`p-2 rounded-full shadow-lg border border-white/20 transition-all duration-200 ${
              isCompared
                ? 'bg-blue-50 text-blue-600'
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCompare}
          >
            <BarChart3 className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickActionButtons;