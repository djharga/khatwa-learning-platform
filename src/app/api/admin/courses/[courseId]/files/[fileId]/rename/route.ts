import { NextRequest, NextResponse } from 'next/server';

/**
 * PUT /api/admin/courses/[courseId]/files/[fileId]/rename
 * تعديل اسم ملف
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { courseId: string; fileId: string } }
) {
  try {
    const { fileId } = params;
    const body = await request.json();
    const { newName } = body;

    if (!newName || !newName.trim()) {
      return NextResponse.json(
        { error: 'اسم الملف مطلوب' },
        { status: 400 }
      );
    }

    // TODO: التحقق من صلاحيات الأدمن
    // TODO: تحديث اسم الملف في قاعدة البيانات

    return NextResponse.json(
      { success: true, message: 'تم تعديل اسم الملف بنجاح' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error renaming file:', error);
    return NextResponse.json(
      { error: error.message || 'فشل تعديل اسم الملف' },
      { status: 500 }
    );
  }
}

