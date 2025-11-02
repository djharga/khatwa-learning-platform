export type ValidationRule = (value: string) => string | null;

export type ValidationErrors = Record<string, string>;

export type FieldValidators = Record<string, ValidationRule[]>;

export const validateEmail = (email: string): string | null => {
  if (!email) return 'البريد الإلكتروني مطلوب';
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) return 'البريد الإلكتروني غير صالح';
  return null;
};

export const validatePassword = (
  password: string,
  minLength = 8
): string | null => {
  if (!password) return 'كلمة المرور مطلوبة';
  if (password.length < minLength)
    return `كلمة المرور يجب أن تكون ${minLength} أحرف على الأقل`;
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone) return null; // الهاتف اختياري
  const phoneRegex = /^(\+966|0)?[5][0-9]{8}$/;
  if (!phoneRegex.test(phone))
    return 'رقم الهاتف غير صالح (يجب أن يكون رقم سعودي)';
  return null;
};

export const validateRequired = (value: string): string | null => {
  if (!value || value.trim() === '') return 'هذا الحقل مطلوب';
  return null;
};

export const validateMatch = (
  value1: string,
  value2: string
): string | null => {
  if (value1 !== value2) return 'القيم لا تتطابق';
  return null;
};

export const validateForm = <T extends Record<string, unknown>>(
  data: T,
  validators: FieldValidators
): ValidationErrors => {
  const errors: ValidationErrors = {} as ValidationErrors;

  for (const [field, rules] of Object.entries(validators)) {
    for (const rule of rules) {
      const error = rule(String(data[field]));
      if (error) {
        errors[field] = error;
        break; // نأخذ أول خطأ فقط
      }
    }
  }

  return errors;
};
