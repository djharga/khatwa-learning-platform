import { NextRequest, NextResponse } from 'next/server';
import { storageService } from '@/lib/storage/storage-service';

/**
 * GET /api/storage/usage/[userId]
 * الحصول على إحصائيات استخدام التخزين
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

    const usage = await storageService.getStorageUsage(userId);

    return NextResponse.json({ usage });
  } catch (error) {
    console.error('Error fetching storage usage:', error);
    return NextResponse.json(
      { error: 'فشل جلب إحصائيات الاستخدام' },
      { status: 500 }
    );
  }
}

