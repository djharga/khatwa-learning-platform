import toast from 'react-hot-toast';

/**
 * Toast notification utilities for showing success, error, and info messages
 */
export const showToast = {
  /**
   * Show a success message
   * @param message - The message to display
   */
  success: (message: string) => {
    toast.success(message, {
      duration: 3000,
      style: {
        background: 'var(--color-success)',
        color: 'white',
        border: '1px solid var(--color-success-border)',
      },
      icon: '✅',
    });
  },

  /**
   * Show an error message
   * @param message - The message to display
   */
  error: (message: string) => {
    toast.error(message, {
      duration: 4000,
      style: {
        background: 'var(--color-error)',
        color: 'white',
        border: '1px solid var(--color-error-border)',
      },
      icon: '❌',
    });
  },

  /**
   * Show an info message
   * @param message - The message to display
   */
  info: (message: string) => {
    toast(message, {
      duration: 3000,
      style: {
        background: 'var(--color-info)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-accent)',
      },
      icon: 'ℹ️',
    });
  },

  /**
   * Show a loading message (returns a toast ID for dismissal)
   * @param message - The message to display
   * @returns Toast ID for dismissal
   */
  loading: (message: string) => {
    return toast.loading(message, {
      style: {
        background: 'var(--color-background)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-accent)',
      },
    });
  },

  /**
   * Dismiss a specific toast
   * @param toastId - The ID of the toast to dismiss
   */
  dismiss: (toastId: string) => {
    toast.dismiss(toastId);
  },

  /**
   * Dismiss all toasts
   */
  dismissAll: () => {
    toast.dismiss();
  },
};

/**
 * Predefined toast messages for common actions
 */
export const toastMessages = {
  formSubmitted: 'تم إرسال النموذج بنجاح',
  settingsSaved: 'تم حفظ الإعدادات بنجاح',
  profileUpdated: 'تم تحديث الملف الشخصي بنجاح',
  courseEnrolled: 'تم التسجيل في الدورة بنجاح',
  paymentSuccessful: 'تمت عملية الدفع بنجاح',
  loginSuccessful: 'تم تسجيل الدخول بنجاح',
  logoutSuccessful: 'تم تسجيل الخروج بنجاح',
  dataLoaded: 'تم تحميل البيانات بنجاح',
  error: 'حدث خطأ غير متوقع',
  networkError: 'خطأ في الشبكة، يرجى المحاولة مرة أخرى',
  validationError: 'يرجى تصحيح الأخطاء في النموذج',
} as const;
