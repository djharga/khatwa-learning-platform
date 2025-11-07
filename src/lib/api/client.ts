/**
 * API Client آمن للتواصل مع Backend
 * 
 * المميزات:
 * - تضمين CSRF tokens تلقائياً
 * - معالجة httpOnly cookies
 * - Retry logic وError handling موحد
 * - Request/Response interceptors
 */

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// الحصول على API URL من environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * قراءة CSRF token من cookie
 */
function getCsrfToken(): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrf-token' || name === 'XSRF-TOKEN') {
      return decodeURIComponent(value);
    }
  }
  return null;
}

/**
 * إنشاء Axios instance مخصص
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 ثانية
  withCredentials: true, // إرسال cookies تلقائياً (httpOnly cookies)
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * يضيف CSRF token تلقائياً لكل request
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // إضافة CSRF token إذا كان موجوداً
    const csrfToken = getCsrfToken();
    if (csrfToken && config.headers) {
      config.headers['X-CSRF-Token'] = csrfToken;
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    // إضافة timestamp لمنع caching للطلبات الحساسة
    if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
      config.headers['X-Request-Time'] = Date.now().toString();
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * معالجة الأخطاء بشكل موحد
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // معالجة 401 Unauthorized - محاولة refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // محاولة refresh token (سيتم تنفيذها من Backend)
        await apiClient.post('/auth/refresh');
        // إعادة المحاولة
        return apiClient(originalRequest);
      } catch (refreshError) {
        // إذا فشل refresh، توجيه المستخدم لصفحة تسجيل الدخول
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    // معالجة 403 Forbidden
    if (error.response?.status === 403) {
      // يمكن إضافة منطق خاص هنا
      console.error('Access forbidden: You do not have permission to access this resource');
    }

    // معالجة 429 Too Many Requests (Rate Limiting)
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      console.error(`Rate limit exceeded. Please try again after ${retryAfter} seconds`);
    }

    return Promise.reject(error);
  }
);

/**
 * Helper functions للـ API calls
 */
export const api = {
  /**
   * GET request
   */
  get: <T = any>(url: string, config?: AxiosRequestConfig) => {
    return apiClient.get<T>(url, config);
  },

  /**
   * POST request
   */
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return apiClient.post<T>(url, data, config);
  },

  /**
   * PUT request
   */
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return apiClient.put<T>(url, data, config);
  },

  /**
   * PATCH request
   */
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return apiClient.patch<T>(url, data, config);
  },

  /**
   * DELETE request
   */
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => {
    return apiClient.delete<T>(url, config);
  },

  /**
   * Upload file with progress tracking
   */
  upload: <T = any>(
    url: string,
    formData: FormData,
    onProgress?: (progress: number) => void
  ) => {
    return apiClient.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
  },
};

export default apiClient;

