'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * Optimized Image Component - محسّن للأداء
 * Supports lazy loading, WebP/AVIF formats, and responsive images
 */

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  // Note: Next.js Image placeholder must be 'blur' or undefined
  loading?: 'lazy' | 'eager';
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  objectFit = 'cover',
  placeholder = 'empty',
  blurDataURL,
  loading,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Determine loading strategy
  const imageLoading = loading || (priority ? 'eager' : 'lazy');

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  if (hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-neutral-100 dark:bg-neutral-800',
          className
        )}
        style={fill ? undefined : { width, height }}
      >
        <span className="text-neutral-400 text-sm">فشل تحميل الصورة</span>
      </div>
    );
  }

  const imageProps = {
    src,
    alt,
    className: cn(
      'transition-opacity duration-200 ease-out',
      isLoading && 'opacity-0',
      !isLoading && 'opacity-100',
      className
    ),
    onLoad: () => setIsLoading(false),
    onError: () => {
      setIsLoading(false);
      setHasError(true);
    },
    priority,
    quality,
    sizes: !fill ? sizes : undefined,
    ...(fill
      ? { fill: true }
      : {
          width,
          height,
        }),
    style: objectFit !== 'cover' ? { objectFit } : undefined,
    ...(placeholder === 'blur' && blurDataURL ? { placeholder: 'blur' as const, blurDataURL } : {}),
    loading: imageLoading,
  };

  return (
    <div className="relative overflow-hidden">
      <Image {...imageProps} />
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
      )}
    </div>
  );
}

