import { NextRequest, NextResponse } from 'next/server';
import { storageService } from '@/lib/storage/storage-service';

/**
 * GET /api/storage/files/[fileId]/download
 * الحصول على رابط تحميل مؤقت للملف
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'معرف المستخدم مطلوب' },
        { status: 400 }
      );
    }

    const downloadUrl = await storageService.getDownloadUrl(fileId, userId);

    return NextResponse.json({
      url: downloadUrl,
      expiresIn: 3600, // ساعة
    });
  } catch (error) {
    console.error('Error generating download URL:', error);
    return NextResponse.json(
      { error: 'فشل إنشاء رابط التحميل' },
      { status: 500 }
    );
  }
}

