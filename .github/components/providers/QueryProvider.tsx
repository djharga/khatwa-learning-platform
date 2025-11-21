'use client';

/**
 * React Query Provider
 * Provider لـ React Query لإدارة حالة البيانات
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // مع الوقت الافتراضي للبيانات القديمة
            staleTime: 60 * 1000, // دقيقة واحدة
            // إعادة المحاولة
            retry: 1,
            // إعادة المحاولة عند فقدان الاتصال
            refetchOnWindowFocus: false,
            // عدم إعادة الجلب عند إعادة الاتصال
            refetchOnReconnect: true,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

