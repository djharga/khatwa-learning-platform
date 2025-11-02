import { NextRequest, NextResponse } from 'next/server';
import { storageService } from '@/lib/storage/storage-service';

/**
 * GET /api/storage/quota/[userId]
 * الحصول على حصة التخزين للمستخدم
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: 'معرف المستخدم مطلوب' },
        { status: 400 }
      );
    }

    const quota = await storageService.getUserQuota(userId);

    return NextResponse.json({ quota });
  } catch (error) {
    console.error('Error fetching storage quota:', error);
    return NextResponse.json(
      { error: 'فشل جلب حصة التخزين' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/storage/quota/[userId]
 * تحديث حصة التخزين للمستخدم (للأدمن فقط)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const body = await request.json();
    const { totalQuota } = body;

    if (!userId || !totalQuota) {
      return NextResponse.json(
        { error: 'معرف المستخدم وحصة التخزين مطلوبان' },
        { status: 400 }
      );
    }

    // TODO: التحقق من صلاحيات الأدمن
    // TODO: تحديث في قاعدة البيانات

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating storage quota:', error);
    return NextResponse.json(
      { error: 'فشل تحديث حصة التخزين' },
      { status: 500 }
    );
  }
}

