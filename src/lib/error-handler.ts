/**
 * Error Handler - معالجة الأخطاء بشكل آمن
 * عدم كشف معلومات حساسة للمستخدمين
 */

import { AxiosError } from 'axios';

/**
 * أنواع الأخطاء
 */
export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

/**
 * رسالة خطأ آمنة
 */
export interface SafeError {
  type: ErrorType;
  message: string;
  code?: string;
  details?: Record<string, any>;
}

/**
 * معالجة الأخطاء من API
 */
export function handleApiError(error: unknown): SafeError {
  // Axios errors
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data;

    // Network errors
    if (!error.response) {
      return {
        type: ErrorType.NETWORK,
        message: 'حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت',
        code: 'NETWORK_ERROR',
      };
    }

    // 401 Unauthorized
    if (status === 401) {
      return {
        type: ErrorType.AUTHENTICATION,
        message: 'غير مصرح لك بالوصول. يرجى تسجيل الدخول',
        code: 'UNAUTHORIZED',
      };
    }

    // 403 Forbidden
    if (status === 403) {
      return {
        type: ErrorType.AUTHORIZATION,
        message: 'ليس لديك صلاحية للوصول إلى هذا المورد',
        code: 'FORBIDDEN',
      };
    }

    // 404 Not Found
    if (status === 404) {
      return {
        type: ErrorType.NOT_FOUND,
        message: 'المورد المطلوب غير موجود',
        code: 'NOT_FOUND',
      };
    }

    // 422 Validation Error
    if (status === 422) {
      return {
        type: ErrorType.VALIDATION,
        message: data?.message || 'البيانات المدخلة غير صحيحة',
        code: 'VALIDATION_ERROR',
        details: data?.errors,
      };
    }

    // 429 Rate Limit
    if (status === 429) {
      return {
        type: ErrorType.SERVER,
        message: 'تم تجاوز الحد المسموح. يرجى المحاولة لاحقاً',
        code: 'RATE_LIMIT',
      };
    }

    // 500+ Server Errors
    if (status && status >= 500) {
      return {
        type: ErrorType.SERVER,
        message: 'حدث خطأ في الخادم. يرجى المحاولة لاحقاً',
        code: 'SERVER_ERROR',
      };
    }

    // رسالة خطأ من Backend (إذا كانت آمنة)
    const backendMessage = data?.message;
    if (backendMessage && typeof backendMessage === 'string') {
      // التحقق من أن الرسالة لا تحتوي على معلومات حساسة
      if (!containsSensitiveInfo(backendMessage)) {
        return {
          type: ErrorType.UNKNOWN,
          message: backendMessage,
          code: data?.code || 'UNKNOWN_ERROR',
        };
      }
    }
  }

  // JavaScript errors
  if (error instanceof Error) {
    // في production، لا نكشف تفاصيل الخطأ
    if (process.env.NODE_ENV === 'production') {
      return {
        type: ErrorType.UNKNOWN,
        message: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى',
        code: 'UNKNOWN_ERROR',
      };
    }

    // في development، نعرض رسالة أكثر تفصيلاً
    return {
      type: ErrorType.UNKNOWN,
      message: error.message,
      code: 'JAVASCRIPT_ERROR',
    };
  }

  // Unknown errors
  return {
    type: ErrorType.UNKNOWN,
    message: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى',
    code: 'UNKNOWN_ERROR',
  };
}

/**
 * التحقق من وجود معلومات حساسة في الرسالة
 */
function containsSensitiveInfo(message: string): boolean {
  const sensitivePatterns = [
    /password/i,
    /token/i,
    /secret/i,
    /key/i,
    /api[_-]?key/i,
    /database/i,
    /connection[_-]?string/i,
    /sql/i,
    /query/i,
    /stack[_-]?trace/i,
    /file[_-]?path/i,
    /directory/i,
  ];

  return sensitivePatterns.some((pattern) => pattern.test(message));
}

/**
 * تسجيل الخطأ بشكل آمن (للمطورين فقط)
 */
export function logError(error: unknown, context?: string): void {
  if (process.env.NODE_ENV === 'production') {
    // في production، إرسال الخطأ إلى service logging
    // يمكن إضافة integration مع Sentry أو أي service آخر
    console.error('Error occurred:', {
      context,
      timestamp: new Date().toISOString(),
      // لا نرسل تفاصيل الخطأ الكاملة
    });
  } else {
    // في development، عرض تفاصيل كاملة
    console.error('Error occurred:', {
      context,
      error,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * معالجة أخطاء Validation
 */
export function handleValidationError(errors: Record<string, string>): SafeError {
  const firstError = Object.values(errors)[0];
  return {
    type: ErrorType.VALIDATION,
    message: firstError || 'البيانات المدخلة غير صحيحة',
    code: 'VALIDATION_ERROR',
    details: errors,
  };
}

/**
 * إنشاء رسالة خطأ مخصصة
 */
export function createError(
  type: ErrorType,
  message: string,
  code?: string,
  details?: Record<string, any>
): SafeError {
  return {
    type,
    message,
    code,
    details,
  };
}

/**
 * Helper function لعرض رسالة خطأ للمستخدم
 */
export function getErrorMessage(error: SafeError | unknown): string {
  if (isSafeError(error)) {
    return error.message;
  }

  const safeError = handleApiError(error);
  return safeError.message;
}

/**
 * Type guard للـ SafeError
 */
function isSafeError(error: unknown): error is SafeError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    'message' in error
  );
}

