// ============================================
// 🎨 Color Contrast Utilities - WCAG Compliance
// ============================================
// Utilities للتحقق من تباين الألوان وفق WCAG AA/AAA standards

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.0 specification
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const sRGB = val / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns ratio between 1:1 (no contrast) and 21:1 (maximum contrast)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    throw new Error('Invalid color format. Use hex colors (e.g., #ffffff)');
  }

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA standard
 * @param ratio - Contrast ratio
 * @param isLargeText - Whether the text is large (18pt+ or 14pt+ bold)
 */
export function meetsWCAGAA(ratio: number, isLargeText = false): boolean {
  return isLargeText ? ratio >= 3.0 : ratio >= 4.5;
}

/**
 * Check if contrast ratio meets WCAG AAA standard
 * @param ratio - Contrast ratio
 * @param isLargeText - Whether the text is large (18pt+ or 14pt+ bold)
 */
export function meetsWCAGAAA(ratio: number, isLargeText = false): boolean {
  return isLargeText ? ratio >= 4.5 : ratio >= 7.0;
}

/**
 * Get WCAG compliance level for a contrast ratio
 */
export function getWCAGLevel(
  ratio: number,
  isLargeText = false
): 'fail' | 'AA (large)' | 'AA' | 'AAA (large)' | 'AAA' {
  if (isLargeText) {
    if (ratio >= 4.5) return 'AAA';
    if (ratio >= 3.0) return 'AA';
    return 'fail';
  } else {
    if (ratio >= 7.0) return 'AAA';
    if (ratio >= 4.5) return 'AA';
    return 'fail';
  }
}

/**
 * Check if a color combination is safe for text on background
 */
export function isSafeTextCombination(
  textColor: string,
  backgroundColor: string,
  isLargeText = false
): { safe: boolean; ratio: number; level: string } {
  const ratio = getContrastRatio(textColor, backgroundColor);
  const level = getWCAGLevel(ratio, isLargeText);
  const safe = meetsWCAGAA(ratio, isLargeText);

  return { safe, ratio, level };
}

/**
 * Find the best text color for a given background
 * Returns the darkest safe text color
 */
export function getBestTextColor(
  backgroundColor: string,
  isLargeText = false
): {
  color: string;
  ratio: number;
  level: string;
} {
  const textColors = [
    { color: '#1a202c', name: 'primary' }, // Darkest
    { color: '#4a5568', name: 'secondary' },
    { color: '#718096', name: 'tertiary' },
    { color: '#ffffff', name: 'inverse' }, // Lightest
  ];

  for (const textColor of textColors) {
    const ratio = getContrastRatio(textColor.color, backgroundColor);
    if (meetsWCAGAA(ratio, isLargeText)) {
      return {
        color: textColor.color,
        ratio,
        level: getWCAGLevel(ratio, isLargeText),
      };
    }
  }

  // Fallback to inverse (white) if no dark color works
  const ratio = getContrastRatio('#ffffff', backgroundColor);
  return {
    color: '#ffffff',
    ratio,
    level: getWCAGLevel(ratio, isLargeText),
  };
}

