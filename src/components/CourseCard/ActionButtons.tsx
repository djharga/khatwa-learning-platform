import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Heart, Share } from 'lucide-react';

/**
 * Props for the ActionButtons component.
 */
export interface ActionButtonsProps {
  /** Display variant: 'compact' (full-featured card) or 'default' (simplified horizontal layout). Default: 'compact'. */
  variant?: 'compact' | 'default';
  /** Bookmark state. */
  isBookmarked: boolean;
  /** Wishlist state. */
  isWishlisted: boolean;
  /** Loading state. */
  isLoading: boolean;
  /** Action loading state. */
  isLoadingAction: boolean;
  /** Ripple animation state. */
  showRipple: boolean;
  /** Enroll handler. */
  onEnroll: (e: React.MouseEvent) => void;
  /** Bookmark handler. */
  onBookmark: (e: React.MouseEvent) => void;
  /** Wishlist handler. */
  onWishlist: (e: React.MouseEvent) => void;
  /** Share handler. */
  onShare: (e: React.MouseEvent) => void;
  /** Optional additional CSS classes. */
  className?: string;
}

/**
 * Action buttons for course cards including enroll, bookmark, wishlist, and share.
 * Supports compact and default variants with different layouts.
 * Features ripple effect on enroll button and loading states.
 *
 * @example
 * ```tsx
 * <ActionButtons
 *   variant="compact"
 *   isBookmarked={false}
 *   isWishlisted={true}
 *   isLoading={false}
 *   isLoadingAction={false}
 *   showRipple={false}
 *   onEnroll={handleEnroll}
 *   onBookmark={handleBookmark}
 *   onWishlist={handleWishlist}
 *   onShare={handleShare}
 * />
 * ```
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({
  variant = 'compact',
  isBookmarked,
  isWishlisted,
  isLoading,
  isLoadingAction,
  showRipple,
  onEnroll,
  onBookmark,
  onWishlist,
  onShare,
  className = '',
}) => {
  const isCompact = variant === 'compact';

  return (
    <motion.div
      className={`flex ${isCompact ? 'gap-3 pt-2' : 'gap-2'} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.15 }}
    >
      {/* Enroll button */}
      <motion.button
        className={`relative ${
          isCompact
            ? 'flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-150 hover:shadow-lg focus:ring-4 focus:ring-blue-500/50 overflow-hidden'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-150 hover:shadow-lg focus:ring-2 focus:ring-blue-500/50 overflow-hidden'
        }`}
        whileTap={{ scale: 0.99 }}
        onClick={onEnroll}
        disabled={isLoading}
      >
        {/* Ripple Effect - minimized */}
        <AnimatePresence>
          {showRipple && (
            <motion.div
              className={`absolute inset-0 bg-white/20 ${isCompact ? 'rounded-xl' : 'rounded-lg'}`}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        {isLoadingAction ? (
          <div className="flex items-center justify-center gap-2">
            <motion.div
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            جاري التسجيل...
          </div>
        ) : (
          'سجل الآن'
        )}
      </motion.button>

      {/* Bookmark button (compact only) */}
      {isCompact && (
        <motion.button
          className={`relative p-3 rounded-xl border-2 transition-all duration-300 hover:shadow-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:ring-offset-2 ${
            isBookmarked
              ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
              : 'border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
          whileTap={{ scale: 0.95 }}
          onClick={onBookmark}
          disabled={isLoading}
          aria-label={isBookmarked ? "إزالة من المفضلة" : "إضافة للمفضلة"}
          aria-pressed={isBookmarked}
        >
          <Bookmark
            className={`w-5 h-5 transition-all duration-300 ${isBookmarked ? 'fill-current' : ''}`}
            aria-hidden="true"
          />
        </motion.button>
      )}

      {/* Wishlist button (compact only) */}
      {isCompact && (
        <motion.button
          className={`relative p-3 rounded-xl border-2 transition-all duration-300 hover:shadow-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 ${
            isWishlisted
              ? 'bg-red-50 border-red-300 text-red-700'
              : 'border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
          whileTap={{ scale: 0.95 }}
          onClick={onWishlist}
          disabled={isLoading}
          aria-label={isWishlisted ? "إزالة من قائمة الأمنيات" : "إضافة إلى قائمة الأمنيات"}
          aria-pressed={isWishlisted}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${isWishlisted ? 'fill-current' : ''}`}
            aria-hidden="true"
          />
        </motion.button>
      )}

      {/* Share button (compact only) */}
      {isCompact && (
        <motion.button
          className="relative p-3 rounded-xl border-2 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:shadow-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2"
          whileTap={{ scale: 0.95 }}
          onClick={onShare}
          disabled={isLoading}
          aria-label="مشاركة الدورة"
        >
          <Share className="w-5 h-5" aria-hidden="true" />
        </motion.button>
      )}

      {/* Bookmark button (default variant) */}
      {!isCompact && (
        <motion.button
          className={`relative p-2 rounded-lg border transition-all duration-300 hover:shadow-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:ring-offset-2 ${
            isBookmarked
              ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
              : 'border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBookmark}
          disabled={isLoading}
          aria-label={isBookmarked ? "إزالة من المفضلة" : "إضافة للمفضلة"}
          aria-pressed={isBookmarked}
        >
          <Bookmark
            className={`w-4 h-4 transition-all duration-300 ${isBookmarked ? 'fill-current scale-110' : ''}`}
            aria-hidden="true"
          />
        </motion.button>
      )}
    </motion.div>
  );
};

export default ActionButtons;