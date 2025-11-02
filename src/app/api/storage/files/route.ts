import { NextRequest, NextResponse } from 'next/server';
import { storageService } from '@/lib/storage/storage-service';

/**
 * GET /api/storage/files
 * الحصول على ملفات المستخدم
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const folderId = searchParams.get('folderId') || undefined;
    const type = searchParams.get('type') || undefined;
    const search = searchParams.get('search') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined;

    if (!userId) {
      return NextResponse.json(
        { error: 'معرف المستخدم مطلوب' },
        { status: 400 }
      );
    }

    const files = await storageService.getUserFiles(userId, folderId, {
      type,
      search,
      limit,
      offset,
    });

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error fetching files:', error);
    return NextResponse.json(
      { error: 'فشل جلب الملفات' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/storage/files
 * رفع ملف جديد
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const userId = formData.get('userId') as string;
    const file = formData.get('file') as File;
    const folderId = formData.get('folderId') as string | null;
    
    let metadata;
    const metadataStr = formData.get('metadata') as string | null;
    if (metadataStr) {
      metadata = JSON.parse(metadataStr);
    }

    if (!userId || !file) {
      return NextResponse.json(
        { error: 'المستخدم والملف مطلوبان' },
        { status: 400 }
      );
    }

    const result = await storageService.uploadFile(userId, file, {
      folderId: folderId || undefined,
      metadata,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: error.message || 'فشل رفع الملف' },
      { status: 500 }
    );
  }
}

