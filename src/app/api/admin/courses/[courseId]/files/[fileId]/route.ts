import { NextRequest, NextResponse } from 'next/server';

/**
 * DELETE /api/admin/courses/[courseId]/files/[fileId]
 * حذف ملف
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string; fileId: string } }
) {
  try {
    const { fileId } = params;

    // TODO: التحقق من صلاحيات الأدمن
    // TODO: حذف الملف من التخزين السحابي
    // TODO: حذف الملف من قاعدة البيانات

    return NextResponse.json(
      { success: true, message: 'تم حذف الملف بنجاح' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { error: error.message || 'فشل حذف الملف' },
      { status: 500 }
    );
  }
}

