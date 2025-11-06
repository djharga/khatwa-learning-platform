import { NextRequest, NextResponse } from 'next/server';

/**
 * PUT /api/admin/courses/[courseId]
 * تحديث دورة
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const formData = await request.formData();
    
    // استخراج البيانات من FormData
    const body: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (key !== 'image') {
        body[key] = value;
      }
    });
    
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;
    
    if (imageFile) {
      // TODO: رفع الصورة إلى التخزين السحابي
      body.image = `/courses/uploaded/${Date.now()}-${imageFile.name}`;
    } else if (imageUrl) {
      body.image = imageUrl;
    }

    if (!body) {
      return NextResponse.json(
        { error: 'البيانات مطلوبة' },
        { status: 400 }
      );
    }

    // TODO: تحديث في قاعدة البيانات
    const updatedCourse = {
      id: courseId,
      ...body,
      lastModified: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      course: updatedCourse,
      message: 'تم تحديث الدورة بنجاح'
    });
  } catch (error: any) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { error: error.message || 'فشل تحديث الدورة' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/courses/[courseId]
 * حذف دورة
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;

    // TODO: حذف من قاعدة البيانات

    return NextResponse.json({
      success: true,
      message: 'تم حذف الدورة بنجاح'
    });
  } catch (error: any) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: error.message || 'فشل حذف الدورة' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/courses/[courseId]
 * تحديث حالة الدورة (قفل/فتح)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const body = await request.json();
    const { isLocked, status } = body;

    // TODO: تحديث في قاعدة البيانات
    const updatedCourse = {
      id: courseId,
      isLocked: isLocked !== undefined ? isLocked : undefined,
      status: status || undefined,
      lastModified: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      course: updatedCourse,
      message: 'تم تحديث حالة الدورة بنجاح'
    });
  } catch (error: any) {
    console.error('Error updating course status:', error);
    return NextResponse.json(
      { error: error.message || 'فشل تحديث حالة الدورة' },
      { status: 500 }
    );
  }
}
