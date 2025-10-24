// Constants for common image sizes
export const IMAGE_SIZES = {
  thumbnail: '150px',
  small: '300px',
  medium: '600px',
  large: '800px',
  xlarge: '1200px',
} as const;

// Function to get optimized src with format support (WebP/AVIF)
export const getOptimizedSrc = (src: string, format?: 'webp' | 'avif') => {
  if (format) {
    // Replace common image extensions with the specified format
    return src.replace(/\.(jpg|jpeg|png|gif)$/i, `.${format}`);
  }
  return src;
};

// New function that accepts an options object for flexibility
export const getImageProps = (options: {
  src: string;
  alt: string;
  priority?: boolean;
  quality?: number;
  format?: 'webp' | 'avif';
}) => ({
  src: getOptimizedSrc(options.src, options.format),
  alt: options.alt,
  priority: options.priority ?? false,
  quality: options.quality ?? 75,
  placeholder: 'blur' as const,
  blurDataURL: 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQU5JTQYAAAAAAAD/////AABBTkSuSmCC', // Improved WebP-based blur placeholder for better performance
  sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw', // More precise sizes for various devices
});

// Updated original function with optional parameters for compatibility
export const getOptimizedImageProps = (
  src: string,
  alt: string,
  options?: { priority?: boolean; quality?: number; format?: 'webp' | 'avif' }
) => getImageProps({ src, alt, ...options });
