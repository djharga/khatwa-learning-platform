import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/admin/content
 * الحصول على قائمة الملفات والمحتوى مع الفلاتر
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || 'all';
    const courseId = searchParams.get('courseId') || 'all';

    // TODO: استدعاء قاعدة البيانات
    // محاكاة مؤقتة
    const mockFiles = [
      {
        id: '1',
        name: 'مقدمة في المراجعة الداخلية.pdf',
        type: 'pdf',
        size: 2048000, // 2MB
        courseId: '1',
        courseName: 'دورة المراجعة الداخلية المستوى الأول',
        uploadedAt: '2024-01-15T10:30:00Z',
        uploadedBy: 'أحمد محمد',
        downloads: 127,
        lastModified: '2024-01-20T14:20:00Z',
        folder: 'documents',
        path: '/courses/1/documents/introduction.pdf'
      },
      {
        id: '2',
        name: 'ملخص القوانين.xlsx',
        type: 'excel',
        size: 512000, // 512KB
        courseId: '1',
        courseName: 'دورة المراجعة الداخلية المستوى الأول',
        uploadedAt: '2024-01-16T09:15:00Z',
        uploadedBy: 'أحمد محمد',
        downloads: 89,
        lastModified: '2024-01-20T10:45:00Z',
        folder: 'documents',
        path: '/courses/1/documents/laws-summary.xlsx'
      },
      {
        id: '3',
        name: 'شرح الفيديو الأول.mp4',
        type: 'video',
        size: 52428800, // 50MB
        courseId: '1',
        courseName: 'دورة المراجعة الداخلية المستوى الأول',
        uploadedAt: '2024-01-17T11:00:00Z',
        uploadedBy: 'أحمد محمد',
        downloads: 234,
        lastModified: '2024-01-19T16:30:00Z',
        folder: 'videos',
        path: '/courses/1/videos/intro-video.mp4'
      }
    ];

    // تطبيق الفلاتر
    let filteredFiles = mockFiles;

    if (search) {
      filteredFiles = filteredFiles.filter(file =>
        file.name.toLowerCase().includes(search.toLowerCase()) ||
        file.courseName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type !== 'all') {
      filteredFiles = filteredFiles.filter(file => file.type === type);
    }

    if (courseId !== 'all') {
      filteredFiles = filteredFiles.filter(file => file.courseId === courseId);
    }

    return NextResponse.json({
      success: true,
      files: filteredFiles,
      total: filteredFiles.length
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'فشل جلب المحتوى' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/content
 * رفع ملف جديد
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const courseId = formData.get('courseId') as string;
    const folder = formData.get('folder') as string || 'documents';

    if (!file) {
      return NextResponse.json(
        { error: 'الملف مطلوب' },
        { status: 400 }
      );
    }

    if (!courseId) {
      return NextResponse.json(
        { error: 'معرف الدورة مطلوب' },
        { status: 400 }
      );
    }

    // TODO: رفع الملف إلى التخزين (S3, local storage, etc.)
    // TODO: حفظ معلومات الملف في قاعدة البيانات

    // محاكاة - في الحقيقة يجب رفع الملف وحفظ معلوماته
    const newFile = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type.startsWith('video') ? 'video' : 
            file.name.endsWith('.pdf') ? 'pdf' :
            file.name.endsWith('.xlsx') || file.name.endsWith('.xls') ? 'excel' :
            file.name.endsWith('.docx') || file.name.endsWith('.doc') ? 'word' : 'other',
      size: file.size,
      courseId,
      courseName: 'دورة غير معروفة', // TODO: جلب من قاعدة البيانات
      uploadedAt: new Date().toISOString(),
      uploadedBy: 'مدير النظام', // TODO: من session
      downloads: 0,
      lastModified: new Date().toISOString(),
      folder,
      path: `/courses/${courseId}/${folder}/${file.name}`
    };

    return NextResponse.json(
      { success: true, file: newFile },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: error.message || 'فشل رفع الملف' },
      { status: 500 }
    );
  }
}
