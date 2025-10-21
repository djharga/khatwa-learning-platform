'use client';

import React from 'react';

/**
 * Skeleton loader component for displaying placeholder content while data is loading. Supports multiple variants with customizable count and styling.
 * @note Requires 'use client' directive for client-side rendering
 */

/**
 * Props for the SkeletonLoader component.
 * @property {('card' | 'text' | 'avatar' | 'button')} variant - Type of skeleton to render (card, text, avatar, button)
 * @property {number} [count=1] - Number of skeleton instances to render (default: 1)
 * @property {string} [className] - Additional CSS classes for customization
 */
interface SkeletonLoaderProps {
  variant: 'card' | 'text' | 'avatar' | 'button';
  count?: number;
  className?: string;
}

/**
 * Flexible skeleton loader component that renders placeholder content based on variant type. Each variant has a predefined structure optimized for its content type.
 * @example <SkeletonLoader variant="card" count={3} />
 * @example <SkeletonLoader variant="text" />
 * @example <SkeletonLoader variant="avatar" count={5} />
 * @example <SkeletonLoader variant="button" count={2} />
 * 
 * Variant structures:
 * - card: Full card structure with image placeholder, text lines, and action buttons
 * - text: Three lines of text placeholders with varying widths
 * - avatar: Circular avatar placeholder
 * - button: Button-shaped placeholder
 * 
 * Usage patterns:
 * - Use while fetching data to show placeholder content
 * - Increase count to show multiple skeletons (e.g., for lists)
 * - Use className to customize spacing, margins, or other styles
 */
const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant,
  count = 1,
  className = '',
}) => {
  /**
   * Renders a single skeleton instance based on the selected variant. Each variant has specific dimensions and structure.
   * @param key - Unique key for React list rendering
   * @returns JSX element representing the skeleton placeholder
   */
  const renderSkeleton = () => {
    switch (variant) { // Render different skeleton structures based on variant type
      case 'card': // Card variant: 256px height with image, text lines, and button placeholders
        return (
          <div className={`w-full h-64 skeleton rounded-2xl ${className}`}> {/* 'skeleton' class provides the animated shimmer effect (defined in global CSS) */}
            {/* Card skeleton structure */}
            <div className="p-6 space-y-4">
              <div className="h-4 skeleton rounded w-3/4"></div>
              <div className="h-4 skeleton rounded w-1/2"></div>
              <div className="h-32 skeleton rounded"></div> {/* Different border radius for different variants (rounded-2xl for cards, rounded-full for avatars) */}
              <div className="flex space-x-2">
                <div className="h-8 w-16 skeleton rounded"></div>
                <div className="h-8 w-16 skeleton rounded"></div>
              </div>
            </div>
          </div>
        );
      case 'text': // Text variant: 3 lines of text with full width
        return (
          <div className={`space-y-2 ${className}`}>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-4 skeleton rounded w-full"></div>
            ))}
          </div>
        );
      case 'avatar': // Avatar variant: 48px circular placeholder
        return (
          <div className={`w-12 h-12 skeleton rounded-full ${className}`}></div> {/* Different border radius for different variants (rounded-2xl for cards, rounded-full for avatars) */}
        )
      case 'button': // Button variant: 40px height, 96px width button-shaped placeholder
        return (
          <div className={`h-10 skeleton rounded-lg w-24 ${className}`}></div>
        );
      default:
        return null;
    }
  };

  return (
    <div role="status" aria-busy="true" aria-label="جاري التحميل"> {/* ARIA attributes for accessibility - announces loading state to screen readers */}
      {/* role="status" and aria-busy="true" inform screen readers about loading state */}
      {/* aria-label provides Arabic text for screen reader announcement */}
      {Array.from({ length: count }, (_, i) => ( {/* Render multiple skeleton instances based on count prop */}
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  )
};

export default SkeletonLoader;
