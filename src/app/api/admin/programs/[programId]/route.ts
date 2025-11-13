import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/admin/programs/[programId]
 * الحصول على تفاصيل برنامج معين
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { programId: string } }
) {
  try {
    const { programId } = params;

    // TODO: جلب من قاعدة البيانات
    // محاكاة
    const program = {
      id: programId,
      title: 'المراجعين الداخليين',
      description: 'برنامج زمالة شامل',
      type: 'fellowship',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      totalHours: 120,
      maxParticipants: 50,
      enrolledParticipants: 45,
      completedParticipants: 0,
      instructor: 'د. أحمد محمد',
      price: 15000,
      prerequisites: [],
      objectives: [],
      createdAt: '2023-12-01',
      lastModified: '2024-01-15',
    };

    return NextResponse.json({
      success: true,
      data: program,
    });
  } catch (error) {
    console.error('Error fetching program:', error);
    return NextResponse.json(
      { success: false, error: 'فشل جلب البرنامج' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/programs/[programId]
 * تحديث برنامج موجود
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { programId: string } }
) {
  try {
    const { programId } = params;
    const body = await request.json();

    // TODO: تحديث في قاعدة البيانات
    const updatedProgram = {
      id: programId,
      ...body,
      lastModified: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: updatedProgram,
      message: 'تم التحديث بنجاح',
    });
  } catch (error: any) {
    console.error('Error updating program:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'فشل تحديث البرنامج' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/programs/[programId]
 * حذف برنامج
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { programId: string } }
) {
  try {
    const { programId } = params;

    // TODO: حذف من قاعدة البيانات
    // TODO: التحقق من عدم وجود مشاركين نشطين

    return NextResponse.json({
      success: true,
      message: 'تم الحذف بنجاح',
    });
  } catch (error: any) {
    console.error('Error deleting program:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'فشل حذف البرنامج' },
      { status: 500 }
    );
  }
}
