'use client';

import React, { JSX } from 'react';

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
const SkeletonLoader = ({
  variant,
  count = 1,
  className = '',
}: SkeletonLoaderProps) => {
  /**
   * Renders a single skeleton instance based on the selected variant. Each variant has specific dimensions and structure.
   * @returns JSX element representing the skeleton placeholder
   * @throws Error if variant is not supported
   */
  const renderSkeleton = (): JSX.Element => {
    switch (variant) {
      case 'card':
        return (
          <div className={`w-full h-64 skeleton rounded-2xl ${className}`}>
            <div className="p-6 space-y-4">
              <div className="h-4 skeleton rounded w-3/4"></div>
              <div className="h-4 skeleton rounded w-1/2"></div>
              <div className="h-32 skeleton rounded"></div>
              <div className="flex space-x-2">
                <div className="h-8 w-16 skeleton rounded"></div>
                <div className="h-8 w-16 skeleton rounded"></div>
              </div>
            </div>
          </div>
        );
      case 'text':
        return (
          <div className={`space-y-2 ${className}`}>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-4 skeleton rounded w-full"></div>
            ))}
          </div>
        );
      case 'avatar':
        return (
          <div className={`w-12 h-12 skeleton rounded-full ${className}`}></div>
        );
      case 'button':
        return (
          <div className={`h-10 skeleton rounded-lg w-24 ${className}`}></div>
        );
      default:
        throw new Error(`Unsupported skeleton variant: ${variant}`);
    }
  };

  return (
    <div role="status" aria-busy="true" aria-label="جاري التحميل">
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
