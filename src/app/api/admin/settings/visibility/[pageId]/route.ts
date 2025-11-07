import { NextRequest, NextResponse } from 'next/server';
import type { PageVisibilityUpdate } from '@/types/admin';

/**
 * PUT /api/admin/settings/visibility/[pageId]
 * تحديث إعدادات رؤية الصفحة
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { pageId: string } }
) {
  try {
    const { pageId } = params;
    const body: PageVisibilityUpdate = await request.json();

    // TODO: التحقق من صلاحيات الأدمن
    // TODO: تحديث الصفحة في قاعدة البيانات

    return NextResponse.json(
      {
        success: true,
        page: {
          id: pageId,
          ...body,
          updatedAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating page:', error);
    return NextResponse.json(
      { error: error.message || 'فشل تحديث الصفحة' },
      { status: 500 }
    );
  }
}

