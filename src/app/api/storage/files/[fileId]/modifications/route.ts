import { NextRequest, NextResponse } from 'next/server';
import type { FileModificationHistory, FileModificationTree } from '@/types/storage';

/**
 * GET /api/storage/files/[fileId]/modifications
 * الحصول على سجل التعديلات لملف معين أو جميع التعديلات للمستخدم
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');

    if (!userId) {
      return NextResponse.json(
        { error: 'معرف المستخدم مطلوب' },
        { status: 400 }
      );
    }

    // TODO: التحقق من صلاحيات المستخدم
    // TODO: جلب سجل التعديلات من قاعدة البيانات

    // بيانات وهمية - سيتم استبدالها بالبيانات الحقيقية
    if (fileId === 'all') {
      // إرجاع شجرة التعديلات لجميع الملفات
      const tree: FileModificationTree = {
        userId,
        courseId: courseId || undefined,
        rootNodes: [
          {
            fileId: 'file1',
            fileName: 'ملف_الشرح.docx',
            fileType: 'word',
            currentPath: '/المحور الأول/ملف_الشرح.docx',
            modifications: [
              {
                id: 'mod1',
                fileId: 'file1',
                userId,
                courseId: courseId || undefined,
                action: 'rename',
                oldName: 'ملف_الشرح_القديم.docx',
                newName: 'ملف_الشرح.docx',
                createdAt: new Date(Date.now() - 86400000).toISOString(),
                createdBy: userId,
              },
              {
                id: 'mod2',
                fileId: 'file1',
                userId,
                courseId: courseId || undefined,
                action: 'copy',
                newName: 'ملف_الشرح.docx',
                newPath: '/مساحتي الشخصية/ملف_الشرح.docx',
                metadata: {
                  reason: 'نسخ للاستخدام الشخصي',
                },
                createdAt: new Date(Date.now() - 172800000).toISOString(),
                createdBy: userId,
              },
            ],
          },
        ],
        totalModifications: 2,
      };

      return NextResponse.json({ tree }, { status: 200 });
    } else {
      // إرجاع سجل التعديلات لملف معين
      const history: FileModificationHistory = {
        fileId,
        userId,
        modifications: [
          {
            id: 'mod1',
            fileId,
            userId,
            courseId: courseId || undefined,
            action: 'rename',
            oldName: 'ملف_الشرح_القديم.docx',
            newName: 'ملف_الشرح.docx',
            oldPath: '/المحور الأول/ملف_الشرح_القديم.docx',
            newPath: '/المحور الأول/ملف_الشرح.docx',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            createdBy: userId,
          },
          {
            id: 'mod2',
            fileId,
            userId,
            courseId: courseId || undefined,
            action: 'copy',
            newName: 'ملف_الشرح.docx',
            newPath: '/مساحتي الشخصية/ملف_الشرح.docx',
            metadata: {
              reason: 'نسخ للاستخدام الشخصي',
              sourceFileId: fileId,
            },
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            createdBy: userId,
          },
        ],
        totalModifications: 2,
        lastModified: new Date(Date.now() - 86400000).toISOString(),
      };

      return NextResponse.json({ history }, { status: 200 });
    }
  } catch (error: any) {
    console.error('Error fetching modifications:', error);
    return NextResponse.json(
      { error: error.message || 'فشل جلب سجل التعديلات' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/storage/files/[fileId]/modifications
 * تسجيل تعديل جديد على ملف
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params;
    const body = await request.json();
    const { userId, action, oldName, newName, oldPath, newPath, metadata } = body;

    if (!userId || !action) {
      return NextResponse.json(
        { error: 'معرف المستخدم ونوع الإجراء مطلوبان' },
        { status: 400 }
      );
    }

    // TODO: التحقق من صلاحيات المستخدم
    // TODO: تسجيل التعديل في قاعدة البيانات

    const modification: FileModification = {
      id: `mod-${Date.now()}`,
      fileId,
      userId,
      action,
      oldName,
      newName,
      oldPath,
      newPath,
      metadata,
      createdAt: new Date().toISOString(),
      createdBy: userId,
    };

    return NextResponse.json(
      {
        success: true,
        modification,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error recording modification:', error);
    return NextResponse.json(
      { error: error.message || 'فشل تسجيل التعديل' },
      { status: 500 }
    );
  }
}

