import { NextRequest, NextResponse } from 'next/server';
import type { CreateModuleRequest, Module } from '@/types/course-management';

/**
 * GET /api/admin/courses/[courseId]/modules
 * الحصول على جميع محاور الدورة
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;

    // TODO: جلب المحاور من قاعدة البيانات

    // بيانات وهمية
    const modules: Module[] = [];

    return NextResponse.json({ modules }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching modules:', error);
    return NextResponse.json(
      { error: error.message || 'فشل جلب المحاور' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/courses/[courseId]/modules
 * إضافة محور جديد
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const body: CreateModuleRequest = await request.json();
    const { title, description, order } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: 'عنوان المحور مطلوب' },
        { status: 400 }
      );
    }

    // TODO: التحقق من صلاحيات الأدمن
    // TODO: إنشاء المحور في قاعدة البيانات

    const newModule: Module = {
      id: `module-${Date.now()}`,
      courseId,
      title: title.trim(),
      description: description?.trim() || '',
      lessons: [],
      order: order || 1,
      status: 'draft',
      estimatedDuration: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin-1', // TODO: من session
    };

    return NextResponse.json({ module: newModule }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating module:', error);
    return NextResponse.json(
      { error: error.message || 'فشل إضافة المحور' },
      { status: 500 }
    );
  }
}

