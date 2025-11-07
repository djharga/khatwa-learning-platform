import { NextRequest, NextResponse } from 'next/server';

/**
 * PUT /api/admin/courses/schedule/[scheduleId]
 * تحديث جدولة
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { scheduleId: string } }
) {
  try {
    const { scheduleId } = params;
    const body = await request.json();
    const { scheduledDate } = body;

    if (!scheduledDate) {
      return NextResponse.json(
        { error: 'تاريخ الجدولة مطلوب' },
        { status: 400 }
      );
    }

    // TODO: تحديث الجدولة في قاعدة البيانات

    return NextResponse.json(
      {
        success: true,
        schedule: {
          id: scheduleId,
          scheduledDate,
          updatedAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating schedule:', error);
    return NextResponse.json(
      { error: error.message || 'فشل تحديث الجدولة' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/courses/schedule/[scheduleId]
 * إلغاء جدولة
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { scheduleId: string } }
) {
  try {
    const { scheduleId } = params;

    // TODO: حذف الجدولة من قاعدة البيانات

    return NextResponse.json(
      { success: true, message: 'تم إلغاء الجدولة بنجاح' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting schedule:', error);
    return NextResponse.json(
      { error: error.message || 'فشل إلغاء الجدولة' },
      { status: 500 }
    );
  }
}

