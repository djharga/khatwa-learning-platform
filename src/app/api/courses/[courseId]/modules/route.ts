import { NextRequest, NextResponse } from 'next/server';
import type { CreateModuleRequest } from '@/types/course-management';

/**
 * GET /api/courses/[courseId]/modules
 * الحصول على محاور الدورة
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;

    // TODO: جلب من قاعدة البيانات
    // const modules = await db.modules.findMany({
    //   where: { courseId },
    //   include: {
    //     lessons: {
    //       include: { content: true },
    //       orderBy: { order: 'asc' }
    //     }
    //   },
    //   orderBy: { order: 'asc' }
    // });

    return NextResponse.json({ modules: [] });
  } catch (error) {
    console.error('Error fetching modules:', error);
    return NextResponse.json(
      { error: 'فشل جلب المحاور' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/courses/[courseId]/modules
 * إنشاء محور جديد
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const body = await request.json();

    const moduleData: CreateModuleRequest = {
      courseId,
      title: body.title,
      description: body.description,
      order: body.order,
    };

    if (!moduleData.title) {
      return NextResponse.json(
        { error: 'عنوان المحور مطلوب' },
        { status: 400 }
      );
    }

    // TODO: حفظ في قاعدة البيانات
    // const module = await db.modules.create({
    //   data: {
    //     ...moduleData,
    //     status: 'draft',
    //     lessons: [],
    //     estimatedDuration: 0,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   }
    // });

    const courseModule = {
      id: `module-${Date.now()}`,
      ...moduleData,
      lessons: [],
      status: 'draft' as const,
      estimatedDuration: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'current-user-id',
    };

    return NextResponse.json({ module: courseModule }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating module:', error);
    return NextResponse.json(
      { error: error.message || 'فشل إنشاء المحور' },
      { status: 500 }
    );
  }
}

