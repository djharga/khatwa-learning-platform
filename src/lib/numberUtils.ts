// Utility function to ensure consistent number formatting for hydration
export const formatNumber = (num: number): string => {
  // Force English digits to avoid hydration mismatch
  return num.toString().replace(/[٠-٩]/g, (match) => {
    const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
    const englishDigits = '0123456789';
    return englishDigits[arabicDigits.indexOf(match)];
  });
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
