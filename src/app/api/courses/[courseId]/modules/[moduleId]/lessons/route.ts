import { NextRequest, NextResponse } from 'next/server';
import type { CreateLessonRequest } from '@/types/course-management';

/**
 * POST /api/courses/[courseId]/modules/[moduleId]/lessons
 * إنشاء درس جديد
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  try {
    const { courseId, moduleId } = params;
    const body = await request.json();

    const lessonData: CreateLessonRequest = {
      courseId,
      moduleId,
      title: body.title,
      description: body.description,
      objectives: body.objectives,
      order: body.order,
      isPreview: body.isPreview || false,
    };

    if (!lessonData.title) {
      return NextResponse.json(
        { error: 'عنوان الدرس مطلوب' },
        { status: 400 }
      );
    }

    // TODO: حفظ في قاعدة البيانات
    // const lesson = await db.lessons.create({
    //   data: {
    //     ...lessonData,
    //     status: 'draft',
    //     content: [],
    //     estimatedDuration: 0,
    //     completedBy: 0,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   }
    // });

    const lesson = {
      id: `lesson-${Date.now()}`,
      ...lessonData,
      content: [],
      status: 'draft' as const,
      estimatedDuration: 0,
      completedBy: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'current-user-id',
    };

    return NextResponse.json({ lesson }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating lesson:', error);
    return NextResponse.json(
      { error: error.message || 'فشل إنشاء الدرس' },
      { status: 500 }
    );
  }
}

