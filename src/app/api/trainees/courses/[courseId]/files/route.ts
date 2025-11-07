import { NextRequest, NextResponse } from 'next/server';
import type { CourseFileTree } from '@/types/course-management';

/**
 * GET /api/trainees/courses/[courseId]/files
 * الحصول على شجرة ملفات الدورة للمتدرب
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;

    // TODO: التحقق من صلاحيات المتدرب للوصول إلى الدورة
    // TODO: جلب شجرة الملفات من قاعدة البيانات

    // بيانات وهمية - سيتم استبدالها بالبيانات الحقيقية
    const fileTree: CourseFileTree = {
      courseId,
      rootNodes: [
        {
          id: 'folder1',
          name: 'المحور الأول',
          type: 'folder',
          path: '/المحور الأول',
          children: [
            {
              id: 'file1',
              name: 'ملف_الشرح.docx',
              type: 'file',
              fileType: 'word',
              size: 2048000, // 2MB
              path: '/المحور الأول/ملف_الشرح.docx',
              parentId: 'folder1',
              canEdit: true,
              explanationVideo: {
                id: 'video1',
                url: '/videos/explanation1.mp4',
                title: 'شرح ملف Word',
                duration: 300,
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              id: 'file2',
              name: 'جدول_البيانات.xlsx',
              type: 'file',
              fileType: 'excel',
              size: 512000, // 512KB
              path: '/المحور الأول/جدول_البيانات.xlsx',
              parentId: 'folder1',
              canEdit: true,
              explanationVideo: {
                id: 'video2',
                url: '/videos/explanation2.mp4',
                title: 'شرح ملف Excel',
                duration: 450,
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'file3',
          name: 'دليل_الدورة.pdf',
          type: 'file',
          fileType: 'pdf',
          size: 1536000, // 1.5MB
          path: '/دليل_الدورة.pdf',
          canEdit: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      totalFiles: 3,
      totalSize: 4096000, // ~4MB
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json({ fileTree }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching course files:', error);
    return NextResponse.json(
      { error: error.message || 'فشل جلب ملفات الدورة' },
      { status: 500 }
    );
  }
}

