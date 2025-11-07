// Utility function to ensure consistent number formatting for hydration
// Always uses English locale to avoid hydration mismatch between server and client
export const formatNumber = (num: number, options?: Intl.NumberFormatOptions): string => {
  // Always use 'en-US' locale to ensure consistent formatting
  // This prevents hydration errors when server uses Arabic locale and client uses different locale
  return new Intl.NumberFormat('en-US', options).format(num);
};

// Format number with locale string but force English digits
export const formatNumberLocale = (num: number, locale: string = 'en-US', options?: Intl.NumberFormatOptions): string => {
  return new Intl.NumberFormat(locale, options).format(num);
};

// Alternative approach: always use English digits
export const toEnglishDigits = (str: string | number): string => {
  const num = typeof str === 'number' ? str.toString() : str;
  return num.replace(/[٠-٩]/g, (match) => {
    const arabicToEnglish: { [key: string]: string } = {
      '٠': '0',
      '١': '1',
      '٢': '2',
      '٣': '3',
      '٤': '4',
      '٥': '5',
      '٦': '6',
      '٧': '7',
      '٨': '8',
      '٩': '9',
    };
    return arabicToEnglish[match] || match;
  });
};

// Safe number formatter that works on both server and client
// Use this instead of toLocaleString() to avoid hydration errors
export const safeFormatNumber = (num: number): string => {
  // Use formatNumber which always uses 'en-US' locale
  return formatNumber(num);
};
