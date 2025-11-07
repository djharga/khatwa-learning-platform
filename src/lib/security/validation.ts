/**
 * Client-Side Validation Schemas
 * استخدام Zod للـ schema validation
 */

import { z } from 'zod';

/**
 * Schema لتسجيل الدخول
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صحيح'),
  password: z
    .string()
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
    .max(100, 'كلمة المرور طويلة جداً'),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Schema للتسجيل
 */
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'الاسم يجب أن يكون حرفين على الأقل')
    .max(100, 'الاسم طويل جداً')
    .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, 'الاسم يجب أن يحتوي على أحرف فقط'),
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صحيح')
    .toLowerCase(),
  password: z
    .string()
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .max(100, 'كلمة المرور طويلة جداً')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'كلمة المرور يجب أن تحتوي على حرف صغير، حرف كبير، ورقم على الأقل'
    ),
  confirmPassword: z.string(),
  userType: z.enum(['student', 'company'], {
    message: 'نوع المستخدم غير صحيح',
  }),
  companyName: z.string().optional(),
  phone: z
    .string()
    .regex(/^(\+966|0)?[5][0-9]{8}$/, 'رقم الهاتف غير صحيح')
    .optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'يجب الموافقة على الشروط والأحكام',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمة المرور غير متطابقة',
  path: ['confirmPassword'],
}).refine((data) => {
  if (data.userType === 'company' && !data.companyName) {
    return false;
  }
  return true;
}, {
  message: 'اسم الشركة مطلوب',
  path: ['companyName'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Schema لتغيير كلمة المرور
 */
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'كلمة المرور الحالية مطلوبة'),
  newPassword: z
    .string()
    .min(8, 'كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل')
    .max(100, 'كلمة المرور طويلة جداً')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'كلمة المرور يجب أن تحتوي على حرف صغير، حرف كبير، ورقم على الأقل'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'كلمة المرور غير متطابقة',
  path: ['confirmPassword'],
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

/**
 * Schema لتحديث الملف الشخصي
 */
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'الاسم يجب أن يكون حرفين على الأقل')
    .max(100, 'الاسم طويل جداً')
    .optional(),
  email: z
    .string()
    .email('البريد الإلكتروني غير صحيح')
    .toLowerCase()
    .optional(),
  phone: z
    .string()
    .regex(/^(\+966|0)?[5][0-9]{8}$/, 'رقم الهاتف غير صحيح')
    .optional(),
  bio: z.string().max(500, 'الوصف طويل جداً').optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

/**
 * Schema للبحث
 */
export const searchSchema = z.object({
  query: z.string().min(1, 'نص البحث مطلوب').max(100, 'نص البحث طويل جداً'),
  filters: z.record(z.string(), z.any()).optional(),
});

export type SearchFormData = z.infer<typeof searchSchema>;

/**
 * Schema للتعليقات والمنشورات
 */
export const commentSchema = z.object({
  content: z
    .string()
    .min(1, 'المحتوى مطلوب')
    .max(1000, 'المحتوى طويل جداً'),
  postId: z.string().min(1, 'معرف المنشور مطلوب'),
});

export type CommentFormData = z.infer<typeof commentSchema>;

/**
 * Schema للتواصل
 */
export const contactSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب').max(100, 'الاسم طويل جداً'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  subject: z.string().min(3, 'الموضوع مطلوب').max(200, 'الموضوع طويل جداً'),
  message: z.string().min(10, 'الرسالة يجب أن تكون 10 أحرف على الأقل').max(2000, 'الرسالة طويلة جداً'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Helper function للتحقق من البيانات
 */
export function validateForm<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: Record<string, string> } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((err: z.ZodIssue) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { _general: 'حدث خطأ في التحقق من البيانات' } };
  }
}

/**
 * Helper function للتحقق من حقل واحد
 */
export function validateField<T extends z.ZodTypeAny>(
  schema: T,
  fieldName: string,
  value: unknown
): { valid: true } | { valid: false; error: string } {
  try {
    schema.parse(value);
    return { valid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return { valid: false, error: firstError.message };
    }
    return { valid: false, error: 'قيمة غير صحيحة' };
  }
}

