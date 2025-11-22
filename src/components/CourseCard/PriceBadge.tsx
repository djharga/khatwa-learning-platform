import { formatCoursePrice } from '@/utils/courseUtils';

/**
 * Price badge with glass morphism effect. Displays formatted course price with configurable positioning and currency.
 * 
 * @example
 * ```tsx
 * <PriceBadge price={99} currency="ريال" position="bottom-right" />
 * ```
 */
export interface PriceBadgeProps {
  /** Course price */
  price: number;
  /** Currency symbol (default: 'ريال') */
  currency?: string;
  /** Badge position (default: 'bottom-right') */
  position?: 'bottom-right' | 'top-right' | 'custom';
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * PriceBadge component for displaying course price with glass morphism styling.
 */
const PriceBadge = ({
  price,
  currency = 'ريال',
  position = 'bottom-right',
  className = '',
}: PriceBadgeProps) => {
  const positionClasses = {
    'bottom-right': 'absolute bottom-3 right-3',
    'top-right': 'absolute top-3 right-3',
    'custom': '',
  };

  return (
    <div
      className={`bg-white/90 rounded-lg px-3 py-2 shadow-lg border border-white/20 transition-all duration-200 ${positionClasses[position]} ${className}`}
    >
      <span className="text-sm font-bold text-gray-900 drop-shadow-sm">
        {formatCoursePrice(price, currency)}
      </span>
    </div>
  );
};

export default PriceBadge;