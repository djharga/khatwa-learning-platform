import { NextRequest, NextResponse } from 'next/server';
import type { CourseFileNode } from '@/types/course-management';

/**
 * GET /api/admin/courses/[courseId]/files
 * الحصول على ملفات الدورة
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const { searchParams } = new URL(request.url);
    const moduleId = searchParams.get('moduleId');

    // TODO: جلب الملفات من قاعدة البيانات

    const files: CourseFileNode[] = [];

    return NextResponse.json({ files }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching files:', error);
    return NextResponse.json(
      { error: error.message || 'فشل جلب الملفات' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/courses/[courseId]/files
 * رفع ملفات جديدة
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const moduleId = formData.get('moduleId') as string | null;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'لا توجد ملفات للرفع' },
        { status: 400 }
      );
    }

    // TODO: رفع الملفات إلى التخزين السحابي
    // TODO: حفظ معلومات الملفات في قاعدة البيانات

    return NextResponse.json(
      { success: true, message: 'تم رفع الملفات بنجاح' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error uploading files:', error);
    return NextResponse.json(
      { error: error.message || 'فشل رفع الملفات' },
      { status: 500 }
    );
  }
}

