import { NextRequest, NextResponse } from 'next/server';
import { storageService } from '@/lib/storage/storage-service';

/**
 * POST /api/storage/files/copy
 * إنشاء نسخة شخصية من ملف دورة للمتدرب
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, sourceFileId, targetFolderId, newName, createPersonalCopy } = body;

    if (!userId || !sourceFileId) {
      return NextResponse.json(
        { error: 'معرف المستخدم والملف المصدر مطلوبان' },
        { status: 400 }
      );
    }

    const personalFile = await storageService.createPersonalCopy(userId, {
      sourceFileId,
      targetFolderId,
      newName,
      createPersonalCopy: createPersonalCopy ?? true,
    });

    return NextResponse.json({ file: personalFile });
  } catch (error: any) {
    console.error('Error copying file:', error);
    return NextResponse.json(
      { error: error.message || 'فشل نسخ الملف' },
      { status: 500 }
    );
  }
}

