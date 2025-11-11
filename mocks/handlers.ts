/**
 * MSW Handlers
 * Mock Service Worker handlers للـ API endpoints
 */

import { http, HttpResponse } from 'msw';
import { Course } from '../src/lib/apiTypes';

// بيانات وهمية للدورات
const fakeCourses: Course[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `c${i + 1}`,
  title: `دورة ${i + 1}`,
  slug: `course-${i + 1}`,
  description: `وصف دورة ${i + 1} - هذه دورة تعليمية شاملة تغطي جميع الجوانب المهمة`,
  coverUrl: `/images/course-${i + 1}.jpg`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  category: ['المحاسبة', 'المراجعة الداخلية', 'الإدارة المالية'][i % 3],
  level: ['beginner', 'intermediate', 'advanced'][i % 3] as 'beginner' | 'intermediate' | 'advanced',
  duration: (i + 1) * 10,
  instructor: `المدرب ${i + 1}`,
  price: (i + 1) * 100,
  isFree: i % 3 === 0,
}));

export const handlers = [
  // GET /api/courses - جلب جميع الدورات
  http.get('/api/courses', () => {
    return HttpResponse.json({
      data: fakeCourses,
    });
  }),

  // GET /api/courses/:id - جلب دورة واحدة
  http.get('/api/courses/:id', ({ params }) => {
    const { id } = params;
    const course = fakeCourses.find((c) => c.id === id);
    
    if (!course) {
      return HttpResponse.json(
        {
          error: {
            code: 'NOT_FOUND',
            message: 'Course not found',
          },
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      data: course,
    });
  }),

  // GET /api/courses/slug/:slug - جلب دورة بالـ slug
  http.get('/api/courses/slug/:slug', ({ params }) => {
    const { slug } = params;
    const course = fakeCourses.find((c) => c.slug === slug);
    
    if (!course) {
      return HttpResponse.json(
        {
          error: {
            code: 'NOT_FOUND',
            message: 'Course not found',
          },
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      data: course,
    });
  }),

  // POST /api/files/upload - رفع ملف
  http.post('/api/files/upload', async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return HttpResponse.json(
        {
          error: {
            code: 'MISSING_FILE',
            message: 'No file provided',
          },
        },
        { status: 400 }
      );
    }

    // محاكاة رفع الملف
    return HttpResponse.json({
      data: {
        id: `file-${Date.now()}`,
        filename: file.name,
        url: `/uploads/${file.name}`,
        size: file.size,
        mimeType: file.type,
        uploadedAt: new Date().toISOString(),
      },
    });
  }),
];

