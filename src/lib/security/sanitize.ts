/**
 * Input Sanitization Utilities
 * تنظيف المدخلات من محتوى خطر (XSS prevention)
 */

import DOMPurify from 'dompurify';

/**
 * تنظيف HTML من محتوى خطر
 * @param dirty - النص الخام الذي قد يحتوي على HTML
 * @returns نص نظيف وآمن
 */
export function sanitizeHtml(dirty: string): string {
  if (typeof window === 'undefined') {
    // Server-side: إزالة HTML tags بسيطة
    return dirty.replace(/<[^>]*>/g, '');
  }

  // Client-side: استخدام DOMPurify
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target'],
    ALLOW_DATA_ATTR: false,
  });
}

/**
 * تنظيف نص عادي (إزالة HTML tags)
 * @param text - النص المراد تنظيفه
 * @returns نص بدون HTML tags
 */
export function sanitizeText(text: string): string {
  if (!text) return '';
  
  // إزالة HTML tags
  let clean = text.replace(/<[^>]*>/g, '');
  
  // إزالة JavaScript event handlers
  clean = clean.replace(/on\w+="[^"]*"/gi, '');
  clean = clean.replace(/on\w+='[^']*'/gi, '');
  
  // إزالة script tags
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // إزالة style tags
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  return clean.trim();
}

/**
 * تنظيف اسم الملف من أحرف خطرة
 * @param filename - اسم الملف
 * @returns اسم ملف نظيف وآمن
 */
export function sanitizeFilename(filename: string): string {
  if (!filename) return 'file';
  
  // إزالة path separators
  let clean = filename.replace(/[\/\\]/g, '_');
  
  // إزالة أحرف خاصة خطرة
  clean = clean.replace(/[<>:"|?*\x00-\x1f]/g, '');
  
  // إزالة spaces من البداية والنهاية
  clean = clean.trim();
  
  // التأكد من وجود extension
  if (!clean.includes('.')) {
    clean = clean + '.txt';
  }
  
  // تحديد طول أقصى
  const maxLength = 255;
  if (clean.length > maxLength) {
    const ext = clean.substring(clean.lastIndexOf('.'));
    const name = clean.substring(0, maxLength - ext.length);
    clean = name + ext;
  }
  
  return clean;
}

/**
 * تنظيف URL من محتوى خطر
 * @param url - URL المراد تنظيفه
 * @returns URL نظيف أو null إذا كان خطيراً
 */
export function sanitizeUrl(url: string): string | null {
  if (!url) return null;
  
  try {
    const urlObj = new URL(url);
    
    // السماح فقط بـ http و https
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return null;
    }
    
    // منع javascript: و data: URLs
    if (url.toLowerCase().startsWith('javascript:') || url.toLowerCase().startsWith('data:')) {
      return null;
    }
  
    return urlObj.toString();
  } catch {
    // إذا كان URL غير صحيح، إرجاع null
    return null;
  }
}

/**
 * تنظيف email من محتوى خطر
 * @param email - البريد الإلكتروني
 * @returns بريد إلكتروني نظيف أو null
 */
export function sanitizeEmail(email: string): string | null {
  if (!email) return null;
  
  // تنظيف النص
  const clean = sanitizeText(email).toLowerCase().trim();
  
  // التحقق من صحة format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(clean)) {
    return null;
  }
  
  return clean;
}

/**
 * تنظيف رقم الهاتف
 * @param phone - رقم الهاتف
 * @returns رقم نظيف أو null
 */
export function sanitizePhone(phone: string): string | null {
  if (!phone) return null;
  
  // إزالة كل شيء ما عدا الأرقام و + و -
  const clean = phone.replace(/[^\d+\-]/g, '');
  
  if (clean.length < 9 || clean.length > 15) {
    return null;
  }
  
  return clean;
}

/**
 * تنظيف JSON من محتوى خطر
 * @param jsonString - JSON string
 * @returns JSON نظيف أو null
 */
export function sanitizeJson(jsonString: string): any | null {
  if (!jsonString) return null;
  
  try {
    const parsed = JSON.parse(jsonString);
    
    // تنظيف القيم النصية
    function cleanObject(obj: any): any {
      if (typeof obj === 'string') {
        return sanitizeText(obj);
      } else if (Array.isArray(obj)) {
        return obj.map(cleanObject);
      } else if (obj && typeof obj === 'object') {
        const cleaned: any = {};
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const cleanKey = sanitizeText(key);
            cleaned[cleanKey] = cleanObject(obj[key]);
          }
        }
        return cleaned;
      }
      return obj;
    }
    
    return cleanObject(parsed);
  } catch {
    return null;
  }
}

/**
 * Escape أحرف خاصة للـ HTML
 * @param text - النص المراد escape
 * @returns نص محمي
 */
export function escapeHtml(text: string): string {
  if (!text) return '';
  
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * تنظيف search query
 * @param query - نص البحث
 * @returns نص بحث نظيف
 */
export function sanitizeSearchQuery(query: string): string {
  if (!query) return '';
  
  // تنظيف النص
  let clean = sanitizeText(query);
  
  // إزالة أحرف SQL injection محتملة
  clean = clean.replace(/['";\\]/g, '');
  
  // تحديد طول أقصى
  return clean.substring(0, 100).trim();
}

