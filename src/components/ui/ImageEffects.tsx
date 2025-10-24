import React from 'react';

// ImageWithOverlay Component
interface ImageWithOverlayProps {
  src: string;
  alt: string;
  overlay?: 'gradient' | 'solid' | 'none';
  overlayColor?: 'primary' | 'secondary' | 'accent' | string;
  className?: string;
  width?: number;
  height?: number;
}

export const ImageWithOverlay: React.FC<ImageWithOverlayProps> = ({
  src,
  alt,
  overlay = 'none',
  overlayColor = 'primary',
  className = '',
  width,
  height,
}) => {
  const getOverlayStyles = () => {
    if (overlay === 'none') return {};

    const colorMap = {
      primary: 'rgba(26, 54, 93, 0.7)', // --color-primary with opacity
      secondary: 'rgba(49, 130, 206, 0.7)', // --color-secondary-expert with opacity
      accent: 'rgba(59, 130, 246, 0.7)', // --color-accent with opacity
    };

    const backgroundColor = colorMap[overlayColor as keyof typeof colorMap] || overlayColor;

    if (overlay === 'gradient') {
      return {
        background: `linear-gradient(135deg, ${backgroundColor} 0%, rgba(0, 0, 0, 0.3) 100%)`,
      };
    }

    return {
      backgroundColor,
    };
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-smooth"
        loading="lazy"
        width={width}
        height={height}
      />
      {overlay !== 'none' && (
        <div
          className="absolute inset-0"
          style={getOverlayStyles()}
        />
      )}
    </div>
  );
};

// ImageWithZoom Component
interface ImageWithZoomProps {
  src: string;
  alt: string;
  zoomType?: 'hover' | 'click' | 'none';
  scale?: number;
  className?: string;
  width?: number;
  height?: number;
}

export const ImageWithZoom: React.FC<ImageWithZoomProps> = ({
  src,
  alt,
  zoomType = 'hover',
  scale = 1.2,
  className = '',
  width,
  height,
}) => {
  const [isZoomed, setIsZoomed] = React.useState(false);

  if (zoomType === 'none') {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-smooth"
          loading="lazy"
          width={width}
          height={height}
        />
      </div>
    );
  }

  const zoomClass = zoomType === 'hover' ? 'hover-scale-subtle' : (isZoomed ? 'scale-110' : '');
  const cursorClass = zoomType === 'click' ? 'cursor-pointer' : '';

  return (
    <div
      className={`overflow-hidden ${className} ${zoomClass} ${cursorClass} transition-smooth`}
      onClick={zoomType === 'click' ? () => setIsZoomed(!isZoomed) : undefined}
      style={zoomType === 'click' && isZoomed ? { transform: `scale(${scale})` } : {}}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        width={width}
        height={height}
      />
    </div>
  );
};

// ImageWithFilter Component
interface ImageWithFilterProps {
  src: string;
  alt: string;
  filter?: 'none' | 'grayscale' | 'sepia' | 'vintage' | 'blur' | 'brightness' | string;
  className?: string;
  width?: number;
  height?: number;
}

export const ImageWithFilter: React.FC<ImageWithFilterProps> = ({
  src,
  alt,
  filter = 'none',
  className = '',
  width,
  height,
}) => {
  const getFilterStyles = () => {
    switch (filter) {
      case 'grayscale':
        return 'grayscale(100%)';
      case 'sepia':
        return 'sepia(100%)';
      case 'vintage':
        return 'sepia(50%) contrast(1.2) brightness(0.9) saturate(1.3)';
      case 'blur':
        return 'blur(2px)';
      case 'brightness':
        return 'brightness(1.2)';
      case 'none':
        return 'none';
      default:
        return filter; // Allow custom filter strings
    }
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-smooth"
        style={{ filter: getFilterStyles() }}
        loading="lazy"
        width={width}
        height={height}
      />
    </div>
  );
};

// ImageReveal Component
interface ImageRevealProps {
  src: string;
  alt: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
  width?: number;
  height?: number;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  direction = 'left',
  className = '',
  width,
  height,
}) => {
  return (
    <div className={`overflow-hidden animate-fadeIn ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        width={width}
        height={height}
      />
    </div>
  );
};

// ImageFrame Component
interface ImageFrameProps {
  src: string;
  alt: string;
  frameColor?: 'primary' | 'secondary' | 'accent' | string;
  frameWidth?: number;
  className?: string;
  width?: number;
  height?: number;
}

export const ImageFrame: React.FC<ImageFrameProps> = ({
  src,
  alt,
  frameColor = 'primary',
  frameWidth = 4,
  className = '',
  width,
  height,
}) => {
  const getFrameColorValue = () => {
    const colorMap = {
      primary: '#1a365d', // --color-primary
      secondary: '#3182ce', // --color-secondary-expert
      accent: '#3b82f6', // --color-accent
    };

    return colorMap[frameColor as keyof typeof colorMap] || frameColor;
  };

  return (
    <div
      className={`relative ${className}`}
      style={{
        border: `${frameWidth}px solid ${getFrameColorValue()}`,
        borderRadius: '8px',
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded transition-smooth"
        loading="lazy"
        width={width}
        height={height}
      />
    </div>
  );
};

// Main ImageEffects component that exports all image effects
const ImageEffects = {
  ImageWithOverlay,
  ImageWithZoom,
  ImageWithFilter,
  ImageReveal,
  ImageFrame,
};

export default ImageEffects;
