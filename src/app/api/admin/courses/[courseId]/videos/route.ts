import { NextRequest, NextResponse } from 'next/server';
import type { UploadExplanationVideoRequest, ExplanationVideo } from '@/types/course-management';

/**
 * GET /api/admin/courses/[courseId]/videos
 * الحصول على فيديوهات الشرح
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'module' | 'word' | 'excel' | null;
    const moduleId = searchParams.get('moduleId');

    // TODO: جلب الفيديوهات من قاعدة البيانات

    const videos: ExplanationVideo[] = [];

    let filteredVideos = videos.filter((v) => v.courseId === courseId);
    if (type) {
      filteredVideos = filteredVideos.filter((v) => v.type === type);
    }
    if (moduleId) {
      filteredVideos = filteredVideos.filter((v) => v.moduleId === moduleId);
    }

    return NextResponse.json({ videos: filteredVideos }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: error.message || 'فشل جلب الفيديوهات' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/courses/[courseId]/videos
 * رفع فيديو شرح
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const formData = await request.formData();
    const videoFile = formData.get('video') as File;
    const moduleId = formData.get('moduleId') as string | null;
    const fileId = formData.get('fileId') as string | null;
    const type = formData.get('type') as 'module' | 'word' | 'excel';
    const title = formData.get('title') as string;
    const description = formData.get('description') as string | null;

    if (!videoFile || !title || !type) {
      return NextResponse.json(
        { error: 'ملف الفيديو والعنوان والنوع مطلوبون' },
        { status: 400 }
      );
    }

    // TODO: التحقق من صلاحيات الأدمن
    // TODO: رفع الفيديو إلى التخزين السحابي
    // TODO: حفظ معلومات الفيديو في قاعدة البيانات

    const video: ExplanationVideo = {
      id: `video-${Date.now()}`,
      courseId,
      moduleId: moduleId || undefined,
      fileId: fileId || undefined,
      title: title.trim(),
      description: description?.trim() || undefined,
      videoUrl: '/videos/placeholder.mp4', // TODO: URL الفيديو الفعلي
      thumbnailUrl: '/thumbnails/placeholder.jpg', // TODO: URL الصورة المصغرة
      duration: 0, // TODO: حساب المدة
      type,
      viewCount: 0,
      uploadedAt: new Date().toISOString(),
      uploadedBy: 'admin-1', // TODO: من session
    };

    return NextResponse.json({ video }, { status: 201 });
  } catch (error: any) {
    console.error('Error uploading video:', error);
    return NextResponse.json(
      { error: error.message || 'فشل رفع الفيديو' },
      { status: 500 }
    );
  }
}

