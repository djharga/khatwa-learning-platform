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
        background: 'var(--color-success-600)',
        color: 'white',
        border: '1px solid var(--color-success-700)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-4) var(--spacing-5)',
        boxShadow: 'var(--shadow-elevation-2)',
        transition: 'all 200ms ease-out',
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
        background: 'var(--color-danger-600)',
        color: 'white',
        border: '1px solid var(--color-danger-700)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-4) var(--spacing-5)',
        boxShadow: 'var(--shadow-elevation-2)',
        transition: 'all 200ms ease-out',
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
        background: 'var(--color-info-600)',
        color: 'white',
        border: '1px solid var(--color-info-700)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-4) var(--spacing-5)',
        boxShadow: 'var(--shadow-elevation-2)',
        transition: 'all 200ms ease-out',
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
        background: 'var(--color-neutral-50)',
        color: 'var(--color-neutral-900)',
        border: '1px solid var(--color-neutral-200)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-4) var(--spacing-5)',
        boxShadow: 'var(--shadow-elevation-2)',
        transition: 'all 200ms ease-out',
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
