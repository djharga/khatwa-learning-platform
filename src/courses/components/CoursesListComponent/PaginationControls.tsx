import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Props for the PaginationControls component.
 * @property {number} currentPage - Current page number (1-based)
 * @property {number} totalPages - Total number of pages
 * @property {(page: number) => void} onPageChange - Page change handler
 * @property {() => void} onPrevious - Previous page handler
 * @property {() => void} onNext - Next page handler
 * @property {boolean} canGoPrev - Whether previous button is enabled
 * @property {boolean} canGoNext - Whether next button is enabled
 * @property {number} [maxVisiblePages=5] - Maximum page buttons to show
 */
export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  maxVisiblePages?: number;
}

/**
 * Pagination controls with previous/next buttons and numbered page buttons. Supports configurable maximum visible pages and disabled states. Features smooth animations and hover effects.
 *
 * @example
 * ```tsx
 * <PaginationControls
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={(page) => console.log(page)}
 *   onPrevious={() => console.log('prev')}
 *   onNext={() => console.log('next')}
 *   canGoPrev={false}
 *   canGoNext={true}
 * />
 * ```
 *
 * @note All page numbers are 1-based for user display
 * @note Buttons automatically disable at boundaries (first/last page)
 */
const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  canGoPrev,
  canGoNext,
  maxVisiblePages = 5,
}) => {
  const visiblePages = Math.min(maxVisiblePages, totalPages);
  const pages = Array.from({ length: visiblePages }, (_, i) => i + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      viewport={{ once: true }}
      className="flex items-center justify-center gap-4 mt-12"
    >
      <motion.button
        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        whileHover={{ scale: canGoPrev ? 1.05 : 1 }}
        whileTap={{ scale: canGoPrev ? 0.95 : 1 }}
        disabled={!canGoPrev}
        onClick={onPrevious}
      >
        <ChevronRight className="w-4 h-4" />
        السابق
      </motion.button>

      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <motion.button
            key={page}
            className={
              page === currentPage
                ? "w-10 h-10 rounded-lg bg-blue-600 text-white shadow-lg"
                : "w-10 h-10 rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(page)}
          >
            {page}
          </motion.button>
        ))}
      </div>

      <motion.button
        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        whileHover={{ scale: canGoNext ? 1.05 : 1 }}
        whileTap={{ scale: canGoNext ? 0.95 : 1 }}
        disabled={!canGoNext}
        onClick={onNext}
      >
        التالي
        <ChevronLeft className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};

export default PaginationControls;